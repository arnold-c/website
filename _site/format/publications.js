(function (global) {
  const CATEGORY_ORDER = ["articles", "preprints", "theses", "posters"];

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function cleanLatex(value) {
    return String(value || "")
      .replace(/\{\$<\$\}/g, "<")
      .replace(/\{\$>\$\}/g, ">")
      .replace(/\\&/g, "&")
      .replace(/\\%/g, "%")
      .replace(/\\_/g, "_")
      .replace(/\\#/g, "#")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/~/g, " ")
      .replace(/--/g, "–")
      .replace(/[{}]/g, "")
      .replace(/\\/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function isWhitespace(char) {
    return /\s/.test(char || "");
  }

  function findTopLevelComma(text) {
    let depth = 0;
    let inQuotes = false;
    let escaped = false;

    for (let index = 0; index < text.length; index += 1) {
      const char = text[index];

      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === '"') {
        inQuotes = !inQuotes;
        continue;
      }

      if (inQuotes) {
        continue;
      }

      if (char === "{") {
        depth += 1;
      } else if (char === "}") {
        depth = Math.max(0, depth - 1);
      } else if (char === "," && depth === 0) {
        return index;
      }
    }

    return -1;
  }

  function readBalancedValue(text, startIndex, openingChar, closingChar) {
    let depth = 0;
    let index = startIndex;
    let inQuotes = false;
    let escaped = false;

    while (index < text.length) {
      const char = text[index];

      if (escaped) {
        escaped = false;
        index += 1;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        index += 1;
        continue;
      }

      if (char === '"') {
        inQuotes = !inQuotes;
      }

      if (!inQuotes) {
        if (char === openingChar) {
          depth += 1;
        } else if (char === closingChar) {
          depth -= 1;
          if (depth === 0) {
            return {
              value: text.slice(startIndex + 1, index),
              nextIndex: index + 1
            };
          }
        }
      }

      index += 1;
    }

    return {
      value: text.slice(startIndex + 1),
      nextIndex: text.length
    };
  }

  function readQuotedValue(text, startIndex) {
    let index = startIndex + 1;
    let escaped = false;

    while (index < text.length) {
      const char = text[index];

      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === '"') {
        return {
          value: text.slice(startIndex + 1, index),
          nextIndex: index + 1
        };
      }

      index += 1;
    }

    return {
      value: text.slice(startIndex + 1),
      nextIndex: text.length
    };
  }

  function readBareValue(text, startIndex) {
    let index = startIndex;
    while (index < text.length && text[index] !== "," && text[index] !== "\n") {
      index += 1;
    }

    return {
      value: text.slice(startIndex, index).trim(),
      nextIndex: index
    };
  }

  function parseFields(text) {
    const fields = {};
    let index = 0;

    while (index < text.length) {
      while (index < text.length && (isWhitespace(text[index]) || text[index] === ",")) {
        index += 1;
      }

      if (index >= text.length) {
        break;
      }

      const nameStart = index;
      while (index < text.length && /[A-Za-z0-9_:-]/.test(text[index])) {
        index += 1;
      }

      const fieldName = text.slice(nameStart, index).trim().toLowerCase();

      while (index < text.length && isWhitespace(text[index])) {
        index += 1;
      }

      if (text[index] !== "=") {
        while (index < text.length && text[index] !== ",") {
          index += 1;
        }
        continue;
      }

      index += 1;
      while (index < text.length && isWhitespace(text[index])) {
        index += 1;
      }

      let parsedValue;
      if (text[index] === "{") {
        parsedValue = readBalancedValue(text, index, "{", "}");
      } else if (text[index] === '"') {
        parsedValue = readQuotedValue(text, index);
      } else {
        parsedValue = readBareValue(text, index);
      }

      if (fieldName) {
        fields[fieldName] = parsedValue.value.trim();
      }

      index = parsedValue.nextIndex;
    }

    return fields;
  }

  function parseBibtex(text) {
    const entries = [];
    let index = 0;

    while (index < text.length) {
      const atIndex = text.indexOf("@", index);
      if (atIndex === -1) {
        break;
      }

      index = atIndex + 1;
      while (index < text.length && isWhitespace(text[index])) {
        index += 1;
      }

      const typeStart = index;
      while (index < text.length && /[A-Za-z]/.test(text[index])) {
        index += 1;
      }

      const entryType = text.slice(typeStart, index).trim().toLowerCase();
      while (index < text.length && isWhitespace(text[index])) {
        index += 1;
      }

      const openingChar = text[index];
      if (openingChar !== "{" && openingChar !== "(") {
        continue;
      }

      const closingChar = openingChar === "{" ? "}" : ")";
      const body = readBalancedValue(text, index, openingChar, closingChar);
      const bodyText = body.value.trim();
      const firstComma = findTopLevelComma(bodyText);

      if (firstComma !== -1) {
        entries.push({
          entryType,
          citationKey: bodyText.slice(0, firstComma).trim(),
          fields: parseFields(bodyText.slice(firstComma + 1))
        });
      }

      index = body.nextIndex;
    }

    return entries;
  }

  function splitAuthors(authorField) {
    return cleanLatex(authorField)
      .split(/\s+and\s+/i)
      .map((author) => author.trim())
      .filter(Boolean);
  }

  function parseStructuredName(author) {
    const fields = {};
    author.split(/\s*,\s*/).forEach((part) => {
      const match = part.match(/^([A-Za-z]+)\s*=\s*(.+)$/);
      if (match) {
        fields[match[1].toLowerCase()] = cleanLatex(match[2]);
      }
    });

    if (!fields.family && !fields.given) {
      return null;
    }

    return {
      given: fields.given || "",
      family: fields.family || "",
      prefix: fields.useprefix === "true" ? fields.prefix || "" : fields.prefix || ""
    };
  }

  function parseName(author) {
    if (author.includes("=")) {
      const structured = parseStructuredName(author);
      if (structured) {
        return structured;
      }
    }

    if (author.includes(",")) {
      const parts = author.split(/\s*,\s*/);
      return {
        family: cleanLatex(parts[0] || ""),
        given: cleanLatex(parts.slice(1).join(" ")),
        prefix: ""
      };
    }

    const nameParts = author.trim().split(/\s+/);
    return {
      family: cleanLatex(nameParts.pop() || ""),
      given: cleanLatex(nameParts.join(" ")),
      prefix: ""
    };
  }

  function formatInitials(givenName) {
    const cleaned = cleanLatex(givenName)
      .replace(/-/g, " ")
      .trim();

    if (!cleaned) {
      return "";
    }

    return cleaned
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => `${part[0].toUpperCase()}.`)
      .join(" ");
  }

  function formatDisplayName(parsedName) {
    const familyName = [parsedName.prefix, parsedName.family]
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    const initials = formatInitials(parsedName.given);

    if (familyName && initials) {
      return `${familyName}, ${initials}`;
    }

    return familyName || initials;
  }

  function isHighlightedAuthor(parsedName) {
    const family = parsedName.family.toLowerCase().replace(/[^a-z]/g, "");
    const given = parsedName.given.toLowerCase().replace(/[^a-z]/g, "");
    return family === "arnold" && (given.startsWith("callum") || given.startsWith("calum"));
  }

  function formatAuthorsHtml(authorField) {
    const authors = splitAuthors(authorField);
    const formattedAuthors = authors.map((author) => {
      const parsedName = parseName(author);
      const displayName = escapeHtml(formatDisplayName(parsedName));

      if (isHighlightedAuthor(parsedName)) {
        return `<span class="publication-author-highlight"><strong>${displayName}</strong></span>`;
      }

      return displayName;
    });

    if (formattedAuthors.length === 0) {
      return "";
    }

    return formattedAuthors.join(", ");
  }

  function extractYear(dateValue) {
    const match = String(dateValue || "").match(/\d{4}/);
    return match ? match[0] : "n.d.";
  }

  function buildSortValue(dateValue) {
    const parts = String(dateValue || "")
      .match(/\d+/g);

    if (!parts || parts.length === 0) {
      return 0;
    }

    const year = Number(parts[0] || 0);
    const month = Number(parts[1] || 12);
    const day = Number(parts[2] || 31);
    return year * 10000 + month * 100 + day;
  }

  function categorizeEntry(entry) {
    const entryType = entry.entryType.toLowerCase();
    const subtype = (entry.fields.type || "").toLowerCase();
    const annotation = (entry.fields.annotation || "").toLowerCase();
    const pubstate = (entry.fields.pubstate || "").toLowerCase();
    const eprinttype = (entry.fields.eprinttype || "").toLowerCase();
    const isInPress = /\bin[ -]?press\b/.test(annotation) || /\bin[ -]?press\b/.test(pubstate);

    if (entryType === "thesis" || /thesis|phd|mchem|msc/.test(subtype)) {
      return "theses";
    }

    if (subtype === "poster") {
      return "posters";
    }

    if (entryType === "article" && (!/under review|in review/.test(annotation) || isInPress)) {
      return "articles";
    }

    if (isInPress) {
      return "articles";
    }

    if (
      entryType === "online" ||
      pubstate === "prepublished" ||
      /pre-?print/.test(annotation) ||
      Boolean(eprinttype)
    ) {
      return "preprints";
    }

    return null;
  }

  function formatThesisType(type) {
    const normalizedType = cleanLatex(type || "").toLowerCase();

    if (!normalizedType) {
      return "Thesis";
    }

    if (normalizedType === "phdthesis" || normalizedType === "phd thesis") {
      return "PhD thesis";
    }

    if (normalizedType === "mchem") {
      return "MChem thesis";
    }

    if (normalizedType === "msc" || normalizedType === "msc thesis") {
      return "MSc thesis";
    }

    if (normalizedType.includes("thesis")) {
      return cleanLatex(type);
    }

    return `${cleanLatex(type)} thesis`;
  }

  function buildSource(entry) {
    const fields = entry.fields;
    const parts = [];

    if (entry.category === "articles") {
      const journalBits = [];
      if (fields.journaltitle) {
        journalBits.push(`<em>${escapeHtml(fields.journaltitle)}</em>`);
      }

      let issueBits = "";
      if (fields.volume) {
        issueBits += escapeHtml(fields.volume);
      }
      if (fields.number) {
        issueBits += `(${escapeHtml(fields.number)})`;
      }
      if (issueBits) {
        journalBits.push(issueBits);
      }
      if (fields.pages) {
        journalBits.push(escapeHtml(fields.pages));
      }
      if (fields.publisher) {
        journalBits.push(escapeHtml(fields.publisher));
      }
      parts.push(journalBits.join(", "));
    } else if (entry.category === "preprints") {
      if (fields.eprinttype) {
        parts.push(`${escapeHtml(fields.eprinttype)} preprint`);
      } else {
        parts.push("Preprint");
      }
    } else if (entry.category === "theses") {
      const thesisBits = [];
      thesisBits.push(escapeHtml(formatThesisType(fields.type)));
      if (fields.institution) {
        thesisBits.push(escapeHtml(fields.institution));
      }
      if (fields.location) {
        thesisBits.push(escapeHtml(fields.location));
      }
      parts.push(thesisBits.join(", "));
    } else if (entry.category === "posters") {
      const posterBits = [];
      if (fields.eventtitle) {
        posterBits.push(escapeHtml(fields.eventtitle));
      }
      if (fields.venue) {
        posterBits.push(escapeHtml(fields.venue));
      }
      parts.push(posterBits.join(", "));
    } else {
      const otherBits = [fields.journaltitle, fields.eventtitle, fields.institution, fields.venue]
        .filter(Boolean)
        .map((value) => escapeHtml(value));
      if (otherBits.length > 0) {
        parts.push(otherBits.join(", "));
      }
    }

    if (entry.category === "other" && fields.annotation) {
      parts.push(escapeHtml(fields.annotation));
    }

    return parts.filter(Boolean).join(". ");
  }

  function buildLinks(entry) {
    const links = [];
    const fields = entry.fields;

    if (fields.url) {
      links.push(`<a href="${escapeHtml(fields.url)}">link</a>`);
    }

    if (fields.doi) {
      links.push(`<a href="https://doi.org/${escapeHtml(fields.doi)}">doi</a>`);
    }

    return links.join(" · ");
  }

  function normalizeEntry(entry) {
    const fields = {};
    Object.entries(entry.fields).forEach(([key, value]) => {
      fields[key] = cleanLatex(value);
    });

    const normalized = {
      ...entry,
      fields,
      year: extractYear(fields.date || fields.year || ""),
      sortValue: buildSortValue(fields.date || fields.year || ""),
      category: null
    };

    normalized.category = categorizeEntry(normalized);
    return normalized;
  }

  function sortEntries(entries) {
    return [...entries].sort((left, right) => {
      if (right.sortValue !== left.sortValue) {
        return right.sortValue - left.sortValue;
      }

      return (left.fields.title || "").localeCompare(right.fields.title || "");
    });
  }

  function formatAbstractHtml(value) {
    return escapeHtml(value || "")
      .replace(/&lt;br\s*\/?&gt;/gi, "<br>")
      .replace(/&lt;(\/?)(strong|em)&gt;/gi, "<$1$2>")
      .replace(/&lt;(\/)b&gt;/gi, "<$1strong>")
      .replace(/&lt;b&gt;/gi, "<strong>")
      .replace(/&lt;(\/)i&gt;/gi, "<$1em>")
      .replace(/&lt;i&gt;/gi, "<em>");
  }

  function buildAbstractHtml(entry) {
    const abstractText = entry.fields.abstract
      ? formatAbstractHtml(entry.fields.abstract)
      : "No abstract available for this publication.";

    return `
      <details class="publication-abstract">
        <summary>Abstract</summary>
        <p class="publication-abstract-text">${abstractText}</p>
      </details>
    `;
  }

  function buildPublicationHtml(entry) {
    const title = escapeHtml(entry.fields.title || entry.citationKey);
    const titleLink = entry.fields.url || (entry.fields.doi ? `https://doi.org/${entry.fields.doi}` : "");
    const titleHtml = titleLink
      ? `<a class="publication-title" href="${escapeHtml(titleLink)}">${title}</a>`
      : `<span class="publication-title">${title}</span>`;
    const authorsHtml = formatAuthorsHtml(entry.fields.author || "");
    const source = buildSource(entry);
    const links = buildLinks(entry);
    const abstractHtml = buildAbstractHtml(entry);

    const bits = [];
    if (authorsHtml) {
      bits.push(authorsHtml);
    }
    bits.push(`(${escapeHtml(entry.year)}).`);
    if (source) {
      bits.push(`${source}.`);
    }
    if (links) {
      bits.push(`<span class="publication-links">${links}</span>.`);
    }

    return `
      <li class="publication-entry">
        <p class="publication-title-line">${titleHtml}.</p>
        <p class="publication-citation">${bits.join(" ")}</p>
        ${abstractHtml}
      </li>
    `;
  }

  function groupEntries(entries) {
    const groups = {
      articles: [],
      preprints: [],
      theses: [],
      posters: []
    };

    entries.forEach((entry) => {
      if (entry.category && Object.prototype.hasOwnProperty.call(groups, entry.category)) {
        groups[entry.category].push(entry);
      }
    });

    CATEGORY_ORDER.forEach((category) => {
      groups[category] = sortEntries(groups[category]);
    });

    return groups;
  }

  function setSectionVisibility(category, isVisible) {
    const heading = document.getElementById(category);
    const container = document.getElementById(`publications-${category}`);

    if (heading) {
      heading.style.display = isVisible ? "" : "none";
    }

    if (container) {
      container.style.display = isVisible ? "" : "none";
    }
  }

  function renderGroups(groups) {
    let visibleSectionCount = 0;

    CATEGORY_ORDER.forEach((category) => {
      const container = document.getElementById(`publications-${category}`);
      if (!container) {
        return;
      }

      const entries = groups[category] || [];
      if (entries.length === 0) {
        container.innerHTML = "";
        setSectionVisibility(category, false);
        return;
      }

      visibleSectionCount += 1;
      setSectionVisibility(category, true);

      const entriesHtml = entries.map(buildPublicationHtml).join("\n");
      const countLabel = `${entries.length} ${entries.length === 1 ? "item" : "items"}`;

      container.innerHTML = `
        <div class="publication-section">
          <p class="publication-count">${countLabel}</p>
          <ol class="publication-list">
            ${entriesHtml}
          </ol>
        </div>
      `;
    });

    return visibleSectionCount;
  }

  async function init() {
    const root = document.getElementById("publications-list");
    if (!root) {
      return;
    }

    const bibliographyPath = root.dataset.bibliography || "files/My%20Publications.bib";
    root.innerHTML = '<p class="publication-status">Loading publications…</p>';

    try {
      const response = await fetch(bibliographyPath);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const bibliographyText = await response.text();
      const entries = parseBibtex(bibliographyText).map(normalizeEntry);
      const visibleSectionCount = renderGroups(groupEntries(entries));

      if (visibleSectionCount === 0) {
        root.innerHTML = '<p class="publication-empty">No publications were found in the bibliography file.</p>';
      } else {
        root.innerHTML = "";
      }
    } catch (error) {
      root.innerHTML = `<p class="publication-error">Could not load publications from <code>${escapeHtml(bibliographyPath)}</code>: ${escapeHtml(error.message)}</p>`;
    }
  }

  const api = {
    parseBibtex,
    normalizeEntry,
    groupEntries,
    categorizeEntry,
    formatAuthorsHtml,
    cleanLatex
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  if (typeof window !== "undefined") {
    window.PublicationsPage = api;
    window.addEventListener("DOMContentLoaded", init);
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
