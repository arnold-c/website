---
date: "2019-05-05T00:00:00+01:00"
draft: false
linktitle:
menu:
  repro-research:
    parent: Chapter 1 - The Basics for All
    weight: 1
title: Reproducible Work - An Introduction
toc: true
type: docs
weight: 1
---

This chapter focuses on what everyone can and should be doing. The guidelines here do not require anything to be downloaded, so can be implemented immediately and easily. If you follow the principles laid out here, you are well on your way to making reproducible research.

## What is reproducible work?

At its core, reproducible research is about being transparent in how to produce the results you report. In doing so, this allows anyone with your data and code to reproduce the work you have produced. This includes you, as there will be many times you need to check results, and a reproducible workflow will allow you to spot mistakes easily, and give you confidence that the code and data you use give the reported outcome every time they are run.

Reproducible research:

- Contains relevant code, including which packages were used, and which programming language was used
- Contains enough text, either via markdown or comments, to be able to understand the purpose of the code chunks and code document
    - Ideally integrates code and results, along with text, into a single document (**literate programming!**)
- Applying good data quality control techniques to ensure that projects are self-contained so that all files and everything necessary to produce the output documents are easily accessible and accounted for

## Why is it important?

Simply put, mistakes happen.  If your project is structured properly, you will have a code document that contains all of the relevant information, and it is easy to recreate the outcomes. Importantly, you will also have the necessary input files (and tracking of **all** their changes) stored within the project folder. That way, if you move computers, delete a document by accident, or hand over the project to another person, everything is neatly contained and can be reproduced without hassle.

## How do I make reproducible work?

There are many different ways to make reproducible work. The information listed here should give you the foundations upon which you can build your own systems. However, the principles are the same and largely revolve around project structures, and dynamic documents that contain both the code and the results embedded in them. This way, updates to the code will automatically update results (including tables and figures), and you don’t need to worry about incorrectly copying the wrong version, or even retyping numbers in a table

In addition, a version control system like Git can prove to be an invaluable tool in making reproducible research. It is essential tracked changes for everything you do in a project: all the changes in your code, which files you produce, where you move files, the results your create … and the list goes on. We will talk through the basics of Git towards the end of this book, but if you would like a more in depth tutorial, you should read [this fantastic resource](https://happygitwithr.com/) by Jenny Bryan and co. It is aimed at R users, but much of it is generalizable. More resources are available at the end of the document.
