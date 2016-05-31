---
layout: post
title: "Removing a Password from a Git Repository"
slug: "removing-password-from-repo"
date: 2016-05-30 14:29
comments: true
categories: vcs, git, security
---

It's generally considered a bad idea to commit passwords, api keys, etc. to your
source code repository. There are various ways you can try to avoid this
(and you should), but sooner or later its going to happen. Someone will add some
"sensitive" data to a repository.

For some projects it doesn't matter quite so much. If they're not hosted
publicly on a site like github and never make it out of your company's internal
network, then its not that big of a deal. For others, it is important, and it
could be that your only option is to reset the passwords, revoke the API keys,
or something to that effect. What a pain!

There is another option to consider if you're using git. Since git allows you to
rewrite history, you can rewrite the repo to make it look like the password leak
never even happened. This should only be done if you know the data hasn't been
leaked and the repo isn't propogated all over your organization
(rewriting history will cause people grief if they have the repo already).

Let's say your history looks something like this:

```
c6 = add test cases
c5 = tweak theme colors
c4 = add password to config * <- commit of the data leak
c3 = fix spelling error
c2 = prototype * <- last commit to config before the data leak
c1 - add README

* = involves the offending file

```

Start by getting the last version of **the config file** before the password was
added to the config file.

`git checkout c2 /path/to/config`

...or, remove it manually.

Then, commit that change:

`git commit -m "remove password from config"`

Now your history looks like this:

```
c7 = remove password from config
c6 = add test cases
c5 = tweak theme colors
c4 = add password to config * <- commit of the data leak
c3 = fix spelling error
c2 = prototype * <- last commit to config before the data leak
c1 - add README

* = involves the offending file

```

Now, rebase the commit where the password was introduce (`c4` in this example):

`git rebase c4~1 -i`

This opens up vim, or whatever your configured editor is.

```
pick c4 add password to config
pick c5 tweak theme colors
pick c6 add test cases
pick c7 remove password from config

A bunch of other stuff...

```

Move the "fix" commit (`c7` in our case) to the line **below** the one where the
password was **added** (`c4`), and change the prefix from 'pick' to 'fixup'.

```
pick c4 add password to config
fixup c7 remove password from config
pick c5 tweak theme colors
pick c6 add test cases
```

From [github's rebase documentation](https://help.github.com/articles/about-git-rebase/#commands-available-while-rebasing),
this tells git to use this commit to "fix" the prior commit, and then discard it.

The result is that the history looks like it did before, but the password is no
longer in the config file on disk, or *in git's history*. Also, if the only
change to that file in the offending commit was the password which you removed,
then the file will no longer show up in that commit (as you would expect).

**References**:

* [Github's rebase documentation](https://help.github.com/articles/about-git-rebase/#commands-available-while-rebasing)
* [Stack Overflow: Remove files from Git commit](http://stackoverflow.com/a/28173964/170990)
