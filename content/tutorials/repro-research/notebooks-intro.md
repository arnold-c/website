---
date: "2019-05-05T00:00:00+01:00"
draft: false
linktitle:
menu:
  repro-research:
    parent: Chapter 3 - Notebooks
    weight: 11
title: Notebooks - An Introduction
toc: true
type: docs
weight: 11
---

This chapter is aimed at those who are able to download the programming language Python. This should hopefully be everyone, as it does not currently require administrative privileges, but we cannot guarantee this will be the case in the future.

There are many different types of notebooks, but we will only explore Jupyter notebooks. The reason why we won't look at other options is because Jupyter notebooks are very well established and have numerous kernels available that allow for the use of many different statistical and programming languages. **Note:** if you are using R, you should be using RStudio in combination with R Notebooks or Rmd files (or using `#'` in your `.R` scripts to insert markdown comments), which are far more suited to R than Jupyter is.

But first, what is a notebook, and why should we use them?

A notebook is a way of producing documents that mix plain text and code, which was one of the key goals at the beginning of this guide! Whilst [they are not perfect](https://docs.google.com/presentation/d/1n2RlMdmv1p25Xy5thJUhkKGvjtV-dkAIsUXP-AL4ffI/edit#slide=id.g3a428e2eb8_0_305) (though read [this](https://yihui.name/en/2018/09/notebook-war/) to see some rebuttals), and should not be used for doing heavy coding and scripting, they are excellent for data exploration and producing output documents. You just need to be careful to run all the code in a fresh environment often enough to ensure you don't have any *hidden* packages/modules loaded in the background that aren't part of your code.
