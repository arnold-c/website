---
date: "2019-08-12T00:00:00Z"
draft: false
linktitle:
menu:
  repro-research:
    parent: Chapter 2 - Notebooks
    weight: 7
title: Output Documents
toc: true
type: docs
weight: 7
---

We've covered a lot of information up until now about setting up your projects and your code, but a big part of reproducible research is the creation of nice-looking and transparent documents. The reason we've gone to such effort to install Jupyter notebooks and connect them with our language of choice is that not only do they allow for excellent data exploration, but they also make documents that look professional.

In scientific articles, whilst it's not essential, LaTeX is a nice touch, and Jupyter can give you a LaTeX formatted pdf documents. To do this, you will first need to install LaTeX. If you are on Windows, I would recommend the [MiKTeX](https://miktex.org/download) distribution, and if you use a Mac, then I would recommend the [MacTeX](http://www.tug.org/mactex/mactex-download.html) distribution. You will also need the "swiss-army knife" of file conversion, [pandoc](https://pandoc.org/installing.html). Pandoc is not *needed* for creating LaTeX-formatted pdfs, but if you have documents with unsupported characters and you need to use a different `pdf-engine` you'll need to use pandoc.

During the installation process, LaTeX should have been added automatically to the PATH. To test this, enter `pdflatex` into a command line/terminal. If you get the output `This is pdfTeX ...` then you are good to go. If not, please add the executable to the PATH<a id = "env-variables"></a>. In Windows you do this by navigating to `Environment Variables` from the Windows key and editing the PATH in `User Variables`. In Mac, you should open the terminal and enter `touch ~/.bash_profile; open ~/.bash_profile`, which opens (or creates if missing) the file that stores your PATH. From here, type `export PATH="path-to-latex-executable:$PATH"` to add the executable to the path. Now save and exit the text editor, run `source ~/.bash_profile` in your terminal, and you're good to go. The executable location can be found by opening the MiKTeX/MacTeX console and looking at the bin directory under settings. For me, on a Windows computer where I don't have administrator privileges it reads  `C:\Users\owner\AppData\Local\Programs\MiKTeX 2.9\miktex/bin/x64`. If you are still having issues, please consult [this document](http://sachaepskamp.com/wp-content/uploads/2011/10/Install.pdf).

Now you're ready to create a LaTeX-formatted pdf document. All you need to do is click *File -> Download as -> PDF via LaTeX (.pdf)*.

Unfortunately, when creating pdf documents, code is not hard wrapped. This means that if you have a very long line of code (> 80 characters), it will run out of the formatted area, and at worst, off the page. At present, I do not know a way to force Jupyter notebooks to wrap the output automatically, so instead you have to write clean code and start new lines using `,` and `\n` if it's too long.

If you would rather not produce a pdf via LaTeX, instead wanting an arguably more readable output, you could create an html file. This is done in the same manner as pdf documents.
