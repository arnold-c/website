---
date: "2019-05-05T00:00:00+01:00"
draft: false
linktitle:
menu:
  repro-research:
    parent: Chapter 2 - Notebooks
    weight: 5
title: Setting Up Jupyter Notebooks
toc: true
type: docs
weight: 5
---

This section will give you a brief overview of what a Jupyter notebook is and how to use them, but if you would like a more detailed understanding, please read the official [documentation](https://jupyter-notebook.readthedocs.io/en/stable/notebook.html). Jupyter Labs has now been released as a newer version of notebooks, giving you a full IDE (integrated development environment) and more control over the notebooks and working environment. This guide will not explore these features, as we are more interested in how to use the notebook.

> **Note:** throughout this section you can substitute the phrase *"Jupyter notebooks"* with *"Jupyter Labs"* if you would prefer to have a full IDE allowing you more control over the system.

Jupyter notebooks are run on Python, though additional things can be downloaded to allow you to use your programming language of choice. For an example of what you can do with Jupyter notebooks, click [here](https://nbviewer.jupyter.org/github/CamDavidsonPilon/Probabilistic-Programming-and-Bayesian-Methods-for-Hackers/blob/master/Chapter1_Introduction/Ch1_Introduction_PyMC3.ipynb), and [here](https://github.com/jupyter/jupyter/wiki/A-gallery-of-interesting-Jupyter-Notebooks#programming-and-computer-science) for a collection of neat and applied notebooks.

## Installing Jupyter notebooks

Mac's come shipped with a version of Python, but it is most likely outdated, and it doesn't contain everything we want. In order to get running, I strongly recommend downloading the Anaconda distribution over other distributions, or even just directly from Python's website. The instructions below will be enough to get you up and running with Jupyter notebooks in your language of choice.

- Download the full [Anaconda](https://www.anaconda.com/download/) distribution i.e. not miniconda
    - Be sure to choose `Python 3.x`, not `Python 2.x`, as it's the newer version and is forwards-compatible.
    - Be sure to only install for one user, not the whole system
    - Be sure to select `Add Anaconda to my PATH environment variable` under Advanced Options
    - Be sure to install Anaconda to the drive where your data lives. To do this you will need to manually edit the installation path within the Anaconda installer wizard, otherwise it will automatically end up in the `C:\` drive
- Use `kernels` to connect your programming language of choice with python and the notebook
    - To see how to get a particular language to work in Jupyter Notebooks, please click on the appropriate language:
        - [Stata](#installing-the-stata-kernel)
        - [SAS](#installing-the-sas-kernel)
        - [R](#connecting-r-with-jupyter)

## Kernels

A kernel is program that allows the notebook to connect with, and run, your code. Jupyter comes with the Python code pre-installed, but if you want to use a different language, you will need to download a specific kernel.

Below, the installation instructions are described for common languages used in epidemiology. To see a full list of kernels available for Jupyter, along with the appropriate documentation and installation instructions, follow [this link](https://github.com/jupyter/jupyter/wiki/Jupyter-kernels).

### Installing the Stata kernel

The instructions for installing the `stata_kernel` are based from the original documentation [here](https://kylebarron.github.io/stata_kernel/getting_started/). It should work with `Stata 12` (I have tested it). If these instructions do not work for you, it may be that there has been an update to the kernel, at which point, please refer to the original documentation linked above.

Open a command prompt (Windows) / terminal (linux/mac) and type/copy-paste the following commands, pressing enter after each line

- `pip install stata_kernel`
- `python -m stata_kernel.install`

**Windows-specific steps**

In order to let `stata_kernel` talk to Stata, you need to link the Stata Automation library:

1. In the installation directory (most likely `C:\Program Files (x86)\Stata12` or similar), right-click on the Stata executable, for example, `StataSE.exe` (this will just show as `StataSE`, but is listed as an application). Choose `Create Shortcut`. Placing it on the Desktop is fine.
2. Right-click on the newly created `Shortcut to StataSE.exe`, choose `Properties`, and append` /Register` to the end of the Target field. So if the target is currently `"C:\Program Files\Stata12\StataSE.exe"`, change it to `"C:\Program Files\Stata12\StataSE.exe" /Register` (note the space before `/`). Click OK.
3. Right-click on the updated `Shortcut to StataSE.exe`; choose Run as administrator.

### Installing the SAS kernel

\**This has not yet been tested here. The instructions for installing the `sas_kernel` are based from the original documentation [here](https://github.com/sassoftware/sas_kernel)*\*

Open a command prompt (Windows) / terminal (linux/mac) and type/copy-paste the following commands, pressing enter after each line. First we need to install a dependency called `saspy` that helps the kernel connect `SAS` to `python`

- `pip install saspy`
- `pip install sas_kernel`

You should now see something like this.

```
Available kernels:
python3    /home/sas/anaconda3/lib/python3.5/site-packages/ipykernel/resources
sas        /home/sas/.local/share/jupyter/kernels/sas
```

Now verify that the SAS Executable is correct

- find the `sascfg.py` file -- it is currently located in the install location (see above) `[install location]/site-packages/saspy/sascfg.py`. To query `pip` for the location of the file, type `pip show saspy`. Failing that, this command will search the OS for the file location: `find / -name sascfg.py`
- edit the file with the correct path the SAS executable and include any options you wish it include in the SAS invocation. See examples in this [file](https://github.com/sassoftware/saspy/blob/master/saspy/sascfg.py)

### Connecting R with Jupyter

If you are hoping to make nice documents and reproducible work using R, I would highly recommend that you use the R Markdown or R Notebook through [RStudio](https://www.rstudio.com/products/rstudio/download/) application instead. However, if you would prefer Jupyter, then please read on.

It is possible to download an R kernel, much like for Stata and SAS, but it can be a bit fickle, so a different approach is described below. It is important to note that with this method you are installing a fresh version of R, so you will not have access to the packages you have previously installed - you will need to reinstall them in this R environment, which could be done within a Jupyter notebook.

Open a command prompt (Windows) / terminal (Linux/Mac) and enter the following commands:

- `conda install r-essentials r-igraph`
- `Rscript -e 'install.packages("languageserver")'`

If you would rather install an R kernel than a fresh install of R within the Anaconda distribution, you can follow the instructions [here](https://richpauloo.github.io/2018-05-16-Installing-the-R-kernel-in-Jupyter-Lab/). The advantage of this is that it allows the notebook to access previously installed packages as they are not running off a fresh version of R.

## Customizing Jupyter notebook's UI

**The following section is not essential and can be ignored if you want to keep things as simple as possible.**

Because I do not like the `In[]` `Out[]` text showing in documents, along with centering plots/figures, I have customized the Jupyter notebook settings. If you would like to do the same, this section should help you. It is not necessary, but I feel that it gives cleaner documents (including pdf documents via LaTeX). If you do this, it is essential that you **routinely restart the kernel to run everything again in a fresh environment** as it is incredibly easy to run code blocks out of order and forget how this changes the output and introduces *hidden* packages.

If you would like to customize the look of the notebook, [jupyterthemes](https://github.com/dunovank/jupyter-themes) is a great package that can be installed. I have also edited the `custom.css` file (`C:\Users\owner\.jupyter\custom\`), adding `display: None;` under the section

```
div.prompt,
 .prompt {
```

so that it now reads

```
div.prompt,
 .prompt {
 font-family: monospace, monospace;
 font-size: 9pt !important;
 font-weight: normal;
 display: None;
 .
 .
 .
}
```

This removes the `In[]` `Out[]` text. To centre the output of tables/figures, add

```
.output_png {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
```
to the `custom.css` file, right after the `.prompt {..}` section.

To enable soft wrapping in the notebook, you need to edit the `notebook.json` file (`C:\Users\owner\.jupyter\nbconfig\`). If it does not exist, you need to create it. Once open, add

```
{
  "MarkdownCell": {
    "cm_config": {
      "lineWrapping": true
    }
  },
  "CodeCell": {
    "cm_config": {
      "lineWrapping": true
    }
  }
}
```

before restarting Jupyter.
