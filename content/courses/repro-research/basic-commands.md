---
date: "2019-08-12T00:00:00Z"
draft: false
linktitle:
menu:
  repro-research:
    parent: Chapter 3 - Git
    weight: 13
title: Basic Commands
toc: true
type: docs
weight: 13
---

There are many commands that you could learn in Git, but these are the basics, and will be sufficient for pretty much everything you'll need to do at the moment.

- `commit`: this standings for *committing* a change to your file in Git. Think of it as saving a document, but instead of saving the whole document as-is, Git saves just the changes since the last version. This makes it very efficient, especially when it comes to backing up your work.
**Key points:**
    - `commit` often. By making and saving small changes, your code versions becomes more readable in case you need to go back and find out exactly what and where it went wrong.
    -  Always write helpful messages - keep them succinct, but make sure they describe what the change you made was.
- `pull`: this commands copies the version of the code from your remote to your local machine. Use this when you want to get the most up-to-date version of your code to work on (assuming your local version isn't the most up-to-date)
- `push`: the opposite of `pull`. If your local version is the most up-to-date version, `push` your version to the remote.
