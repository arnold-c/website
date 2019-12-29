---
date: "2019-08-12T00:00:00Z"
draft: false
linktitle:
menu:
  repro-research:
    parent: Chapter 1 - The Basics for All
    weight: 2
title: Structuring a Project
toc: true
type: docs
weight: 2
---

The first step in creating reproducible research is creating self-contained projects. Everything that goes in to, and comes out of, the project, should be contained within a single folder (directory). I would recommend that you create a folder called `repos/` that your project folders live in, e.g. `C:/User/owner/Documents/repos/proj/`. This way your project folders are neatly separated from other files. Whilst we will discuss version control with Git [later](#git), I would suggest that you also routinely back up your project folder to separate drives (cloud and/or external hard drives), using a [3-2-1 system](https://www.nakivo.com/blog/3-2-1-backup-rule-efficient-data-protection-strategy/).

Now you have set up your `repos/` folder, it is time to create the project folder. This is the structure that I find works for me. You may want to find a variation on it that works for you, but the basic premise of keeping repositories self-contained should remain.

```
C:/
└── Documents/
    └── repos/
        └── proj/
            ├── data/
            ├── docs/
            ├── figs/
            ├── funs/
            ├── out/
            ├── cleaning.R
            └── analysis.R
```



As you can see, the project repository contains separate directories that you can use to store different file types. Importantly, the analysis and cleaning files are stored in the project root, allowing easy use of relative paths over explicit paths e.g. `read_csv(here('data', 'data_file.csv'))` rather than `read_csv('C:/Users/owner/Documents/Repos/my_project/data/data_file.csv')`. The reason why relative paths are preferable is that they allow projects to be used by multiple people without the need to re-write code. If you use explicit paths and change computer, or the project is opened by another person, the code will break as they will not have the same directory structure as the computer that the code was created on.

> **Note:** the example above used an R package called `here_here`, calling the function `here()`. Similar solutions may exist for other languages, and you should try and find them for the language of your choice.

## `data/`

An important idea is that you should **treat your data as read-only**. You and your team have likely worked hard to collect the data and it's easy to make a changes along the way that you either forget about, or need to reverse. As most projects span a long time between the data collection and analysis stages, if that happens to you it will take a lot of work to figure out exactly which changes you are interested in reversing etc. To save yourself this hassle, and help make your work reproducible, **once the data is collected it should not be edited**; all the work should happen in your code, allowing it to be easily checked.

If you are following good data practices and treating your data as read-only, all your cleaning will happen within your code (create a cleaning file in your project e.g. `proj-cleaning.R`). However, if you do need to edit the files manually (**and I strongly recommend against it** as it makes it harder to reproduce as there isn't a good way to track exactly what changes were made), you should create a save a new (separate) copy of the dataset (using file [naming conventions](#how-to-name-files)) in your project directory (e.g. `H:/repos/proj/2019-01-24_data-file.csv`). Additionally, you should create a word document where you can list the changes you made with each new file. When we get to the section on [Git](#git), you will see how we can set it up to track all the changes within a project folder (including the create/deletion/movement of files!) so we don't have to remember what changes we make. This means we can just have one copy of each document, and track the changes through time.

## Other subdirectories

- `docs/`: this contains the output documents. For example, if you are using R Markdown to create a pdf via LaTeX, you could place them here.
- `funs/`: this contains the functions you write and might want to reference. The idea is to create functions so that can give code a meaningful name. It also helps if you need to repeat a code chunk multiple times, especially if you need to edit it at some point, as you can just call the function rather than typing it out each time.
- `out/`: this contains files that are produced from the original data e.g. cleaned data files. You can then call them in your analysis scripts.
- `figs/`: this contains figures that may be generated from your scripts.

Importantly, if you follow the principle that your `data/` files are read-only, all of the files in these directories (with the exception of `funs/`) *should* be reproducible and could be deleted at any time without concern of generating them again. In order to revert to previous figures and output versions, you will need to be able to track changes in your code. This is where a *version control system* like Git comes in, which we will discuss at the end.

## How to name files and directories

How you name files and directories may not seem like an important point, but it can cause quite a headache if you try and use code to automate processes, and at best, it just slows things down. To quote Aaron Quinlan, a bioinformatician, ["a space in a filename is a space in one's soul"](https://twitter.com/aaronquinlan/status/711593127551733761).

Instead try and use something like [this](https://speakerdeck.com/jennybc/how-to-name-files):

- KISS (*Keep It Simple Stupid*): use simple and consistent file names
    - It needs to be machine readable
    - It needs to be human readable
    - It needs to order well in a directory
- No special characters and **no spaces**!
- Use YYYY-MM-DD date format
- Use `-` to delimit words and `_` to delimit sections
    - i.e. `2019-01-19_my-data.csv`
- Left-pad numbers
    - i.e. `01_my-data.csv` vs `1_my-data.csv`
    - If you don't, file orders get messed up when you get to double-digits