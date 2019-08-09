---
date: "2019-05-05T00:00:00+01:00"
draft: false
linktitle:
menu:
  repro-research:
    parent: Chapter 2 - Git
    weight: 7
title: Remote Repositories
toc: true
type: docs
weight: 7
---

It is not essential, but one of the best things about Git is that online repositories create an easier way to sync your work between computers and colleagues, avoiding much of the mess caused when this work happens simultaneously/(insert file sharing system of choice) isn't syncing properly. In this section, I will explain the correct way to utilize this, and the other way ...

## GitHub - the Good

\**This section will need to be updated after figuring out the PHO system*\*

GitHub is built for this. You should take full advantage of the effort and troubleshooting that has gone into the platform. **Don't try and recreate the wheel**

With GitHub now offering [unlimited free private repositories](https://Github.com/pricing), I would recommend that you set up an account with GitHub. The reason why I suggest GitHub over a different purpose-built platform (such as Bitbucket or GitLab) is the community. Previously, I would have recommended Bitbucket due to the unlimited free private repositories, but this is no longer a restriction with GitHub. With GitHub, if you ever want to make your code open-source, you immediately have access to the largest community of programmers who can help you improve your code, as well as putting it to good use. And isn't that why we do research?

Now that you've decided to use GitHub, it's very easy to register. Just click the link above and select the package you'd like. If you have an academic email address, consider making this your primary email address on the account, as it gives you a **PRO** account unlimited collaborators on private repositories, unlike the standard account that limits it to 3 collaborators.

Be sure to choose a user name that is easy to remember, and easy to find. I would suggest just using your name.

Now you have a GitHub account set up, this is your *remote*. If you work on a project with collaborators, this can be shared with them. That way, collaborators can work on their own versions of the code on their *local* machine (computer), and when it's ready for other people to use/help write, they can `push` it to the *remote* where others can access it. Don't worry if you don't know what `push` is - we'll cover that [soon](#basic-commands)

## Private server

It is possible to use and get the benefits of Git without a purpose-made online repository such as GitHub, but it's not as simple and it's not as stable. Because services like Dropbox and OneDrive are not built for storing and tracking changes in code and *dot* files, it can go wrong, especially when more than one author is involved. Of all the file syncing systems, Dropbox seems to be the best option due to the [git-remote-dropbox extension](https://github.com/anishathalye/git-remote-dropbox), but this is still inferior to GitHub etc. With these home-made systems, corruption of the project repository is a matter of "when", not "if". If you insist on using this option, go read the [git basic commands](#basic-commands) first, come back, and read on ...

### Dropbox - the Bad

#### git-remote-dropbox
Install the git-remote-dropbox extension. The instructions were copied from the [documentation](https://github.com/anishathalye/git-remote-dropbox) and \**have not been tested*\*.

1. Install the helper with `pip install git-remote-dropbox`.
2. Generate an OAuth 2 token by going to the app console, creating a Dropbox API app with "Full Dropbox" access (or "App folder" access if you prefer, if you're not going to be using Dropbox's sharing features to use git-remote-dropbox in a multi-user setup), and generating an access token for yourself.
3. Save your OAuth token in `~/.config/git/git-remote-dropbox.json` or `~/.git-remote-dropbox.json`. The file should look something like this:

```
{
    "default": "xxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxx"
}
```

- git-remote-dropbox supports using multiple Dropbox accounts. You can create OAuth tokens for different accounts and add them all to the config file, using a user-defined username as the key:

```
{
    "alice": "xxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxx",
    "ben": "xxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxx",
    "charlie": "xxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxx"
}
```

- You can tell git-remote-dropbox to use the token corresponding to username by specifying a URL like `dropbox://username@/path/to/repo`.

- You can also specify the token inline by using a URL like `dropbox://:token@/path/to/repo`.

#### Creating a Dropbox repository

Now you've installed the helper extension, you can start using Dropbox for your *remote* repositories. Unless a project already exists with a Dropbox repository (i.e. you've been added to the project and were not the one to set it up), I would recommend that you first create the repositories on your local machine using the steps below.

1. Create a project folder on your computer **(not in your Dropbox folder)**, and open up the Git Bash within the folder
2. Enter `git init` to initialize your folder as a Git repository
3. Enter `git remote add origin "dropbox:///path/to/repo"`

If a repository already exists in a Dropbox folder, and you want to make a local copy, you can do the following:

1. Create a project folder on your computer, and open up the Git Bash within the folder
2. Enter `git clone "dropbox:///path/to/repo" -b master`

You are now set up to use Dropbox as your remote repository and can `commit`, `push`, and `pull` changes using the Git Bash commands:

- `git add .` This *stages* the changes to your files, and it is essential to do before you `commit`
- `git commit -m "your commit message"`
- `git push origin master`
- `git pull origin master`

### OneDrive/Google Drive/Network Drive/others - the Ugly

\**The instructions for this are based off the following articles and have not been tested*\*.

https://blog.geekforbrains.com/how-to-use-dropbox-and-git-for-private-repos-e1d304d5ff79

http://autchen.github.io/guides/2016/03/10/git-onedrive.html

http://tony.halcyonlane.com/blog/2011/09/22/Using-git-at-work-on-a-Windows-network-drive//

https://medium.com/@techstreams/git-google-drive-simple-git-host-3a84db4fc1fd


If you want to use a different file syncing system, then you need to create a *bare* remote repository. This is structured differently than a normal git repository, which makes it *slightly* better for use as a remote repository ... but it's still a bad idea and can corrupt the project.

1. Create/open an existing project folder on your computer **(not in your OneDrive folder)**, and open up the Git Bash within the folder
2. Enter `git init` to initialize your folder as a Git repository
3. Assuming you have files already in the directory, you should commit them using

```
git add --all
git commit -m "your commit message"
```

4. Create the bare repo in OneDrive etc using
    - `git init --bare . ~/OneDrive///path/to/repo/project.git`
5. Configure your remote using
    - `git remote add origin ~/OneDrive///path/to/repo/project.git`
6. `push`/`pull` your commits using
    - `git push origin master`

You can share the OneDrive repository (folder) so that multiple people can work on the project. However, if you do this, **it is essential you coordinate your `push`/`pull` commands to avoid corrupting the repository.**
