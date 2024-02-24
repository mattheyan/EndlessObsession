---
date: '2011-07-08 08:14:52'
pubDate: 2011-07-08
layout: ../../layouts/MarkdownPostLayout.astro
slug: tfs-rollback-2
status: publish
title: Tfs Rollback
excerpt: How to rollback all or part of a checkin in TFS using the commandline tool.
wordpress_id: '202'
---

Using the tf command line tool you can rollback all or part of a tfs checkin.  This is useful for two reasons: 1) If you at least want to roll back all changes in one or more file (not some changes in a file) then it saves you from having to manually revert changes (I'm a firm believer in not giving yourself the opportunity to goof up) , and 2) the checkin is actually marked as a _rollback_, so you don't have to rely on checkin notes to identify it as such.

As a side note, based on what I've seen in the way that tfs represents changes, this rollback changeset is simply an add, edit or delete, with the additional information that it was a rollback of a prior change.  The original checkin is still in the tfs history.

To do a rollback, first open up the visual studio command prompt.  You should have a shortcut in your start menu.  On my machine the command is: _**%comspec% /k ""c:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\vcvarsall.bat"" x86**_.

Here's the help for tf rollback (using the command _tf rollback /?_):

```
TF - Team Foundation Version Control Tool, Version 10.0.30319.1

Copyright (c) Microsoft Corporation.  All rights reserved.

Rolls back the changes in a single or a range of changesets:

tf rollback /changeset:changesetfrom~changesetto [itemspec] [/recursive]

            [/lock:none|checkin|checkout] [/version:versionspec]

            [/keepmergehistory] [/noprompt] [/login:username,[password]]

tf rollback /toversion:versionspec itemspec [/recursive]

            [/lock:none|checkin|checkout] [/version:versionspec]

            [/keepmergehistory] [/noprompt] [/login:username,[password]]

Versionspec:

    Date/Time         D"any .Net Framework-supported format"

                      or any of the date formats of the local machine

    Changeset number  Cnnnnnn

    Label             Llabelname

    Latest version    T

    Workspace         Wworkspacename;workspaceowner
```

First, we need to make sure we are working within our workspace.

```bat
C:\> cd workspace
```

So, for example, we could rollback an entire changeset:

```bat
C:\workspace> tf rollback /changeset:12345
```
Or, we can rollback a single item in the changeset:

```bat
C:\workspace> tf rollback /changeset:12345 $/Path/To/Item
```

There is also a login param that you can pass if needed:

```bat
C:\workspace> tf rollback /changeset:12345 /login:domain\username,
password
```

Enjoy!
