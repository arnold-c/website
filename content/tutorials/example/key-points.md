---
date: "2019-05-05T00:00:00+01:00"
draft: false
linktitle: 3. Key Points
menu:
  example:
    parent: Chapter 1 - The Basics for All
    weight: 1
title: Key Points
toc: true
type: docs
weight: 3
---

- Use a version control system such as Git to track changes in your code.
- Data isn't touched one collected:
    - Do all *data munging* within your program i.e. no editing the excel spreadsheets!!!
    - You should have an untouched copy of your data on your `H:\` drive **and** the shared team drives
- Your outputs should be reproducible from the code you have:
    - Make sure this is the case by routinely clearing your programming environment and re-running the code in a clean environment to ensure your results aren't contingent on *'hidden'* packages/modules that were [loaded erroneously](https://onunicornsandgenes.blog/2017/04/02/using-r-dont-save-your-workspace/)
- Never set explicit file paths (e.g. `setwd()`) if you can avoid it
    - Try and use a package that allows you to set relative paths e.g. `here_here` in R. This allows the project to be passed to someone else in its entirety and the code won't break because they don't have the same folder names and set up as you (also if you work on multiple computers/OS)
- Format your filenames properly
