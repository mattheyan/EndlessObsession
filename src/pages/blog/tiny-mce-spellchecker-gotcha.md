---
date: '2010-06-10 19:13:00'
pubDate: 2010-06-10
layout: ../../layouts/MarkdownPostLayout.astro
slug: tiny-mce-spellchecker-gotcha
status: publish
title: Tiny MCE Spellchecker Gotcha
wordpress_id: '10'
excerpt: Today I ran into a problem with the spell checking feature. I'll go ahead and state up front - this was **NOT** a problem with tinymce. This was my own doing. It seemed that, although the spell checker was able to report misspellings in the editor, when you clicked on a misspelled word the highlighting would disappear and no context menu was shown. Strange...
categories:
- javascript
tags:
- javascript
- programming
- UI
---

In hindsight this should have been a lot easier...

If you're not familiar with [tinymce](http://tinymce.moxiecode.com/) you should go [check it out](http://tinymce.moxiecode.com/examples/full.php).  Its a solid rich text editor for the web, which can be easily initialized and manipulated via JavaScript.  And best of all, [its free](http://tinymce.moxiecode.com/download.php)!

Today I ran into a problem with the spell checking feature.  I'll go ahead and state up front:  this was **NOT** a problem with tinymce.  This was my own doing.  It seemed that, although the spell checker was able to report misspellings in the editor, when you clicked on a misspelled word the highlighting would disappear and no context menu was shown.  Strange...

First off, tinymce's source code can be downloaded from [their site](http://tinymce.moxiecode.com/download.php) (see "Deveopment package"), which made debugging **_really_** easy.  I noticed while inspecting the page using [firebug](http://getfirebug.com/) that when I triggered spell checking the misspelled word(s) in the editor were wrapped in a span with a special class name.  I tracked down the spot in the code where the text was wrapped happened, and more importantly unwrapped, and then set breakpoints so that I could intercept when this was happening.  I found that it was ultimately being called from a "mousedown" event, which was in turn creating a new undo operation in the editor and firing the editor's custom "change" event.

This took me back a few month to when I was integrating the editor into the website.  We basically use the editor to replace text areas on the page, which I gather is the norm.  Believe it or not, tinymce is kind enough to keep the original text area up to date as you make changes.  Unfortunately it doesn't seem to fire the native browser events that we needed to detect that these changes were occurring.  The editor has its own [events](http://wiki.moxiecode.com/index.php/Editor), some which mimic native browser events.

One in particular that I was interested in was the "[onChange](http://wiki.moxiecode.com/index.php/TinyMCE:API/tinymce.Editor/onChange)" event.  The documentation states that the event is raised "_when contents inside the editor gets changed_."  If you look at the event handler arguments (Parameters) you'll see that it makes mention of "undo levels" and "undo managers".  As I understand it, the event actually fires when an "undo level" is added, some atomic action that can be reverted.  This explains why changes were being picked up at seemingly arbitrary times while editing the text.

Anyway, what does any of this have to do with the spell checking results disappearing?  Well, it turns out there were a couple of factors at work here.  The first I have already hinted at.  We were watching for "change" events on the editor and reacting accordingly.  These change events were also firing when you click inside of the editor, which is something that you would obviously do if you were trying to fix a typo to get rid of that nasty red underlining.  I presume this is because when the user has clicked, the text that they have typed can be viewed as an atomic action.  This can be slightly confusing if you don't know what to expect, but it does make some sense in that it follows Microsoft Word behavior (a worthy goal for a rich text editor).

At any rate, the second factor was even more tricky.  The behavior that depends on knowing when the editor changes  (the reason we're subscribing to the onChange event in the first place) also has to know what the current value is.  It is essentially a property change eventing mechanism.  This is all well and good, except that I was getting the editor's value through the editor object's [getContent](http://wiki.moxiecode.com/index.php/TinyMCE:API/tinymce.Editor/getContent) method, without so much as skimming the documentation for it (it seemed pretty straightforward).  The documentation states that the function will "_cleanup the content before it gets returned using the different cleanup rules options_."

If you think about it for a minute, you can see why this is a problem.  The editor's content is essentially going to be the html that is displayed, right?  So, if the function is going to return the editor's content, then it seems reasonable for it to "_cleanup the content_" first.  And what would cleaning up the content involve?  That's right!  It removes the html that wraps the text to signify that a word is misspelled.  After all, we wouldn't want to store that in the database.

So at this point I've determined what the problem is.  Luckily, it doesn't appear that I need to call the getContent method after all.  The original text area's value is updated anyway, so I just read the value directly from the text area.  Problem solved!  Now I can go home...
