---
date: "2019-05-05T00:00:00+01:00"
draft: false
linktitle: 1. Reproducible Work - An Introduction
menu:
  repro-research:
    parent: Chapter 1 - The Basics for All
    weight: 1
title: Reproducible Work - An Introduction
toc: true
type: docs
weight: 1
---

This chapter focusses on what everyone can and should be doing. The guidelines here do not require anything to be downloaded, so can be implemented immediately and easily. If you follow the principles laid out here, you are well on your way to making reproducible research.


Before we can discuss how we should structure our projects and manage our data, we need to first talk about reproducible research.

## What is reproducible work?

- Contains relevant code, including which packages were used, and which programming language was used
- Contains enough text, either via markdown or comments, to be able to understand the purpose of the code chunks and code document
    - Ideally integrates code and results, along with text, into a single document (**literate programming!**)
- Applying good data quality control techniques to ensure that projects are self-contained so that all files and everything necessary to produce the output documents are easily accessible and accounted for

## Why is it important?

Simply put, mistakes happen. Projects also move between PHO employees. If your project is structured properly, you will have a code document that contains all of the relevant information, and it is easy to recreate the outcomes. Importantly, you will also have the necessary input files (and tracking of **all** their changes) stored within the project folder. That way, if you move computers, delete a document by accident, or hand over the project to another person, everything is neatly contained and can be reproduced without hassle.

## How do I make reproducible work?

There are many different ways to make reproducible work. The information listed here should give you the foundations upon which you can build your own systems. However, the principles are the same and largely revolve around project structures and a version control system, such as Git.