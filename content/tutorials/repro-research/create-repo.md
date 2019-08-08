---
date: "2019-05-05T00:00:00+01:00"
draft: false
linktitle:
menu:
  repro-research:
    parent: Chapter 2 - Git
    weight: 8
title: Creating a Repositories
toc: true
type: docs
weight: 8
---

\**This section will need to be updated after figuring out the PHO system*\*

If everything has gone well until now, you're ready to create a project repository. This is where all your code, all your data, all your output files, everything, should live. Whilst you can create a repository directly on your computer, I would advise against this as it causes additional headaches when you want to connect it with GitHub. Instead, create the remote repository first on GitHub.

- Go to www.Github.com and click the `+` and *"New repository"*.
- Choose a project name
- Decide whether you want it to be a public or private project (choose private if working on PHO data and research, as you can always convert it to public later)
- Initialize with a README file

## Connecting to GitHub

\**This section will need to be updated after figuring out the PHO system*\*

If you are using SourceTree, there are two ways to connect your computer to your GitHub repositories. I would recommend the first option, as it makes *cloning* repositories (making a copy on your local computer) easier in the future, as you don't have to go to GitHub each time to find the *HTTPS/SSH* address.

**Method 1**

1. Go to *Tools -> Options -> Authentication* in SourceTree and add your GitHub account details
2. Leave the preferred protocol at *"HTTPS"* for the moment, unless you know what you're doing with SSH keys
3. Now open a new tab, click on *Remote*, and you should see your repositories listed
4. Clone the repositories that you'd like to work on

> **Note:** Now SourceTree and GitHub are connected, you shouldn't have to do the first few steps - just go to step 3.

**Method 2**

1. Go to your repository on GitHub and click on the green *"Clone or download"* button
2. Copy the *HTTPS* address (your settings should say *"Clone with HTTPS"* above it, otherwise click *"Use HTTPS"*)
3. Go to SourceTree, open a new tab, and click on *"Clone"*
4. Paste the *HTTPS* address into the *"Source Path / URL:"* box
5. Click on the *"Clone"* button at the bottom

**Method 3** (*not recommended*)

If you would like to do it the hard way and use the Git Bash, read the instructions [here](https://happyGitwithr.com/push-pull-Github.html)

**Note:** if you would like to use SSH keys, read the instructions [here](https://help.Github.com/articles/connecting-to-Github-with-ssh/)