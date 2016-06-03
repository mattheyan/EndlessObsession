---
layout: post
title: ".NET: Getting the Project Root Directory at Runtime"
slug: "dotnet-project-root-at-runtime"
date: 2016-06-02 21:15
comments: true
categories: dotnet, asp
---

When developing in .NET, whether it be an ASP.NET website, or a console
application, you usually don't have to access the file-system directly. One
reason that you would is to read a configuration file, but, .NET
configuration management handles this for you via 'Web.config' or 'App.config'
and the `ConfigurationManager`. Another scenario is loading a resource, like an
image or document, from disk. But, again, the framework provides a nice solution
via embedded resources.

If you're considering accessing the file-system you would do well to consider
if there are better ways to do what you're trying to do. That being said, you
may occasionally have a legitimate reason to access the file-system directly.

Here are a few simple examples of how to do this:

**ASP.NET**

```csharp
var root = HttpContext.Current.Server.MapPath("~/");
```

**WinForms**

```csharp
var root = Application.ExecutablePath;
```

**WPF, Console Application, etc.**

```csharp
var assembly = System.Reflection.Assembly.GetEntryAssembly();
var assemblyPath = new Uri(assembly.CodeBase).AbsolutePath;
var root = System.IO.Path.GetDirectoryName(assemblyPath);
```

So, why would you even want to do this?

## Dev-Mode Overrides

The most useful example that comes to mind for me is overriding behavior in a
development setting.

A few reasons that I've personally encountered...

1. Avoid merge conflicts by keeping branch-specific config out of source control
2. Avoid password leaking by keeping sensitive config out of source control
3. Facilitate local testing via a "developer mode" triggered by a local file
4. Track unit test data in source control and access files from tests

Merge conflicts are no fun. If you're working in different branches you don't
want to have to hand-edit files when merging just because a file path, database
name, website name, etc. varies by branch. Keep that stuff in non-tracked files.

It's hard to keep passwords out of source control. Making it easy to provide
them via files that are not tracked in source control is one way you could try
to prevent that problem. A secure credential store of some kind would be even
better, but ya know, KISS.

In some cases, real-world testing is hard, or nearly impossible. The presence
of a local file is one way you could switch into a *dev mode* in order to
simulate real-world conditions. Of course, just to be safe, you'll probably
want to toggle that based on 'Debug' mode or a custom build flag as well.

If your unit tests require some data to run, like the kind of stuff you might
find in a database, you may want to consider source controlled files instead.
This gives you the benefit of portability, the test data comes with the source
code. Also, you can track changes over time if it's in a human-readable format.

## Bringing it Home

With that in mind, here's an example of code that you can use to find the root
directory of your **project** from your running application.

<script src="https://gist.github.com/mattheyan/042bc4979140a406b1abcdfb6097573b.js"></script>

**References**:

* [Finding my main executable's path using Assembly vs AppDomain]( http://stackoverflow.com/questions/1642827/finding-my-main-executables-path-using-assembly-vs-appdomain)
