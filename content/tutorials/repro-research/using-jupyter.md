---
date: "2019-05-05T00:00:00+01:00"
draft: false
linktitle:
menu:
  repro-research:
    parent: Chapter 3 - Notebooks
    weight: 13
title: Using Jupyter Notebooks
toc: true
type: docs
weight: 13
---
Now you have set up Jupyter to run with the programming language of your choice, we should start using it. How you do that is detailed in this section.

## Creating a notebook

You can either open up the Anaconda navigator and then Jupyter notebooks, or open Jupyter notebooks directly. Once open, navigate to the directory you would like to create the notebook in (*If you are using a version control system like Git, then you should be within the project's repository*)

Select the **New** button in the top right corner, and then select the language you would like to program in (*this assumes that you have downloaded an appropriate kernel if you would like to use a language other than Python*)

## Running a Jupyter notebook

\**Update this section*\*

Now you have the notebook open in your chosen language, it's time to start doing some data exploration and analysis. Here, we'll cover some basic commands that will get you started, but to fully leverage the power of the notebook, you should read the [Jupyter documentation](https://jupyter-notebook.readthedocs.io/en/stable/notebook.html#code-cells), along with the documentation of your preferred kernel, particularly sections relating to `magic` commands (which are language-specific).

- `Shift + Enter`
- `Command + Enter`
- `Esc`
    - `Ctrl/Cmd + a`
    - `Ctrl/Cmd + b`
    - `dd`
    - `Ctrl/Cmd + m`
    - `Ctrl/Cmd + y`
- `Enter`
    - `Tab`

## Git and Jupyter

Unfortunately, Git and Jupyter don't always play nicely, so we have to do a few things to try and get around the issues. Due to the way the notebooks create and store the outputs from the code, `diffs` become unreadable. There are a few ways to get around this. The first option is the simplest, but the others provide a little more control over what you see in the `diffs`.

\****Test out the other options!**\**

1. Clear all outputs before you save and commit the files. That way, Git only tracks changes to the input
2. Download the notebook as a markdown file allowing `diffs` to be tracked in Git as normal
3. [nbdime](https://nbdime.readthedocs.io/en/latest/index.html)
4. [ReviewNB](https://www.reviewnb.com/)
5. [Nextjournal](https://nextjournal.com/) is a promising take on notebooks that simplifies the  process of making reproducible research. Currently it is only in beta, and for private research, but if it has a free version when it becomes established it would be a good option allowing a 'Google Docs' style of version control

## Customizing Jupyter notebook's UI

**The following section is not essential and can be ignored if you want to keep things as simple as possible.**

Because I do not like the `In[]` `Out[]` text showing in documents, along with centering plots/figures, I have customized the Jupyter notebook settings. If you would like to do the same, this section should help you. It is not necessary, but I feel that it gives cleaner documents (including pdf documents via LaTeX). If you do this, it is essential that you **routinely restart the kernel to run everything again in a fresh environment** as it is incredibly easy to run code blocks out of order and forget how this changes the output and introduces *hidden* packages.

If you would like to customize the look of the notebook, [jupyterthemes](https://Github.com/dunovank/jupyter-themes) is a great package that can be installed. I have also edited the `custom.css` file (`C:\Users\owner\.jupyter\custom\`), adding `display: None;` under the section

```
div.prompt,
 .prompt {
```

so that it now reads

```
div.prompt,
 .prompt {
 font-family: monospace, monospace;
 font-size: 9pt !important;
 font-weight: normal;
 display: None;
 .
 .
 .
}
```

This removes the `In[]` `Out[]` text. To centre the output of tables/figures, add

```
.output_png {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
```
to the `custom.css` file, right after the `.prompt {..}` section.

To enable soft wrapping in the notebook, you need to edit the `notebook.json` file (`C:\Users\callum arnold\.jupyter\nbconfig\`). If it does not exist, you need to create it. Once open, add

```
{
  "MarkdownCell": {
    "cm_config": {
      "lineWrapping": true
    }
  },
  "CodeCell": {
    "cm_config": {
      "lineWrapping": true
    }
  }
}
```

before restarting Jupyter.
