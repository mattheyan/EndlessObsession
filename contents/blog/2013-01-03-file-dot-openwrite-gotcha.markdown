---
layout: post
title: "File.OpenWrite Gotcha"
slug: "file-dot-openwrite-gotcha"
date: 2013-01-03 12:29
comments: true
excerpt: An odd problem when writing a text file to disk using .NET's "File.OpenWrite".
categories: 
---

Recently I ran into an odd problem when writing a text file to disk using .NET's `File.OpenWrite`.

	using (var fileWriter = new StreamWriter(File.OpenWrite(outputFilePath)))
	{
		fileWriter.WriteLine("abc");
	}

You might expect that after executing this code the text in the file would be "abc".  Not quite.  In my case I was sometimes seeing results like this...

	abc
	some other text

...where "some other text" is the last bit of text in the file before writing.

It turns out that the [documentation for File.OpenWrite](http://msdn.microsoft.com/en-us/library/system.io.file.openwrite.aspx "System.IO.File.OpenWrite") contains the answer.

> If you overwrite a longer string (such as "This is a test of the OpenWrite method") with a shorter string (such as "Second run"), the file will contain a mix of the strings ("Second runtest of the OpenWrite method").

`OpenWrite` behaves much like the dreaded insert mode in word processors and text editors.

The solution that I chose is pretty simple.  Just [clear the file's contents](http://stackoverflow.com/questions/2695444/clearing-content-of-text-file-using-c-sharp "Stack Overflow - Clearing content of text file using C#") beforehand.
