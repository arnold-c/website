---
date: "2019-05-05T00:00:00+01:00"
draft: false
linktitle:
menu:
  repro-research:
    parent: Chapter 3 - Git
    weight: 15
title: Git and Jupyter
toc: true
type: docs
weight: 15
---

Unfortunately, Git and Jupyter don't always play nicely, so we have to do a few things to try and get around the issues. Due to the way the notebooks create and store the outputs from the code, `diffs` become unreadable. There are a few ways to get around this. The first option is the simplest, but the others provide a little more control over what you see in the `diffs`. This is here to serve as an introduction to the tools, but not as a tutorial, so only the links to the documentation have been provided for you to read.

1. Clear all outputs before you save and commit the files. That way, Git only tracks changes to the input
2. Download the notebook as a markdown file allowing `diffs` to be tracked in Git as normal
3. [nbdime](https://nbdime.readthedocs.io/en/latest/index.html)
4. [ReviewNB](https://www.reviewnb.com/)
5. [Nextjournal](https://nextjournal.com/) is a promising take on notebooks that simplifies the  process of making reproducible research. Currently it is only in beta, and for private research, but if it has a free version when it becomes established it would be a good option allowing a 'Google Docs' style of version control.
