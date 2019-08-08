---
date: "2019-05-05T00:00:00+01:00"
draft: false
linktitle:
menu:
  repro-research:
    parent: Chapter 2 - Git
    weight: 5
title: Setting Up Git
toc: true
type: docs
weight: 5
---

There are many ways to get Git running on your computer. Depending on your OS and the version you have, Git may come pre-installed on your computer. However, it is a good idea to update it to the latest version, so I'd recommend you follow the steps below anyway.

## Windows

1. Install [Git for Windows](https://Gitforwindows.org/)
    - This gives you Git Bash, which is a much nicer way of interfacing with Git than the command line.
    - **Note:** when asked about "*Adjusting your PATH environment*", be sure to select "*Git from the command line and also from 3rd-party software*". The other default options should be fine. For more details about the installation settings, please click [here](https://Github.com/jennybc/happy-Git-with-r/issues/105)
2. Open up Git Bash and enter `where git`. Open up the command line and enter `where git`. Depending on whether you have administrator privileges, the outputs should look something like this, respectively
    1. `which git` : `/mingw64/bin/git`
    2. `where git` : `C:\Users\owner\AppData\Local\Programs\git\bin\git.exe` (User privileges)
        1. `where git` : `C:\Program Files\git\bin\git.exe` (administrator privileges)
    - If you see `cmd` instead of `bin`, then you need to edit the PATH in your environment variables <a id = "env-variables"></a>. You can do this by typing `environment variables` into the Start box and scrolling to the PATH section of User/System variables (depending on whether you have administrator privileges), and changing `cmd` to `bin` in the `git.exe` path.

## Mac

There are more (workable) ways to install Git on OSX than on Windows, but I think this is the best option as it gives you a great package manager for the future.

1.  Open the terminal and enter `/usr/bin/ruby -e "$(curl -fsSL https:/raw.Githubusercontent.com/Homebrew/install/master/install)"`
2. Enter `brew install git` into the terminal

## Final Git set up steps

Now that you have Git running, you need to tell it who you are. This allows multiple people to make changes to code, and the correct names will be attached to the changes.

Open up the Git Bash and enter
```
git config --global user.name 'Firstname Lastname'
git config --global user.email 'my_email@gmail.com'
```

Typing in `git config --global --list` is a way to check that your details have been saved correctly.

**Note:** it is essential that you enter the same **email** as your GitHub account information. This way you can connect the two. If you would prefer to use a different user name than your GitHub user name you can. This would help show you which computer you completed the work on, but it is not important to most people.


## Installation problems

If you followed the instructions above, Git should be ready to go. However, sometimes you still end up with errors. This is far more likely with Windows that Mac, but if you find that the next steps don't work for you, see if the other installation options [here](https://happyGitwithr.com/install-Git.html) work for you, or the trouble shooting tips [here](https://happyGitwithr.com/troubleshooting.html) (and [here](https://Github.com/jennybc/happy-Git-with-r/issues/67) if you're on Windows), which are useful when trying to connect Git with RStudio
