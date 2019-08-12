---
date: "2019-05-05T00:00:00+01:00"
draft: false
linktitle:
menu:
  repro-research:
    parent: Chapter 2 - Notebooks
    weight: 6
title: Using Jupyter Notebooks
toc: true
type: docs
weight: 6
---
Now you have set up Jupyter to run with the programming language of your choice, we should start using it. How you do that is detailed in this section.

## Creating a notebook

You can either open up the Anaconda navigator and then Jupyter notebooks, or open Jupyter notebooks directly. Once open, navigate to the directory you would like to create the notebook in (*If you are using a version control system like Git, then you should be within the project's repository*)

Select the **New** button in the top right corner, and then select the language you would like to program in (*this assumes that you have downloaded an appropriate kernel if you would like to use a language other than Python*)

## Running a Jupyter notebook

Now you have the notebook open in your chosen language, it's time to start doing some data exploration and analysis. Here, we'll cover some basic commands that will get you started, but to fully leverage the power of the notebook, you should read the [Jupyter documentation](https://jupyter-notebook.readthedocs.io/en/stable/notebook.html#code-cells), along with the documentation of your preferred kernel, particularly sections relating to `magic` commands (which are language-specific).

When you are writing in a cell (‘Edit’ mode), you can use these commands:

| **Keyboard shortcut** |                                                                     |
|:----------------------|:--------------------------------------------------------------------|
| `Shift + Enter`       | Executes the current cell and enters you into the next one          |
| `Ctrl/Cmd + Enter`    | Executes the current cell, but does not enter you into the next one |
| `Esc`                 | This exits 'Edit' mode without executing the cells                  |
| `Tab`                 | Code completion or indent                                           |

If you are not in 'Edit' mode ('Command' mode), and therefore at least one cell is selected, you can use these commands:

| **Keyboard shortcut** |                                                        |
|:----------------------|:-------------------------------------------------------|
| `Ctrl/Cmd + a`        | Add an empty cell above your current cell              |
| `Ctrl/Cmd + b`        | Add an empty cell below your current cell              |
| `dd`                  | Delete the selected cell                               |
| `Ctrl/Cmd + m`        | Change the cell type to 'Markdown' so you can add text |
| `Ctrl/Cmd + y`        | Change the cell type to 'Code' so you can add code     |
| `Enter`               | Enter 'Edit' mode                                      |
