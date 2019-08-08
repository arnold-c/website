---
date: "2019-05-05T00:00:00+01:00"
draft: false
linktitle: 4. Output Documents
menu:
  repro-research:
    parent: Chapter 3 - Notebooks
    weight: 3
title: Output Documents
toc: true
type: docs
weight: 14
---
We've covered a lot of information up until now about setting up your projects and your code, but a big part of reproducible research is the creation of nice-looking documents. The reason we've gone to such effort to install Jupyter notebooks and connect them with our language of choice is that not only do they allow for excellent data exploration, but they also make documents that look professional.

In scientific articles, whilst it's not essential, LaTeX is a nice touch, and Jupyter can give you a LaTeX formatted pdf documents. To do this, you will first need to install LaTeX. If you are on Windows, I would recommend the [MiKTeX](https://miktex.org/download) distribution, and if you use a Mac, then I would recommend the [MacTeX](http://www.tug.org/mactex/mactex-download.html) distribution. You will also need the "swiss-army knife" of file conversion, [pandoc](https://pandoc.org/installing.html). Pandoc is not *needed* for creating LaTeX-formatted pdfs, but if you have documents with unsupported characters and you need to use a different `pdf-engine` you'll need to use pandoc.

During the installation process, LaTeX should have been added automatically to the PATH. To test this, enter `pdflatex` into a command line/terminal. If you get the output `This is pdfTeX ...` then you are good to go. If not, please add the executable to the PATH as listed [above](#env-variables). The executable location can be found by opening the MiKTeX/MacTeX console and looking at the bin directory under settings. For me, on a Windows computer where I don't have administrator privileges it reads  `C:\Users\owner\AppData\Local\Programs\MiKTeX 2.9\miktex/bin/x64`. If you are still having issues, please consult [this document](http://sachaepskamp.com/wp-content/uploads/2011/10/Install.pdf).

Now you're ready to create a LaTeX-formatted pdf document. All you need to do is click *File -> Download as -> PDF via LaTeX (.pdf)*.

Unfortunately, when creating pdf documents, code is not hard wrapped. This means that if you have a very long line of code (> 80 characters), it will run out of the formatted area, and at worst, off the page. At present, I do not know a way to force Jupyter notebooks to wrap the output automatically, so instead you have to write clean code and start new lines using `,` and `\n` if it's too long.

If you would rather not produce a pdf via LaTeX, instead wanting an arguably more readable output, you could create an html file. This is done in the same manner as pdf documents.
