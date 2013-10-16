---
date: '2010-12-07 19:07:12'
layout: post
slug: exo-suite-and-client-scripts-on-github
status: publish
title: The Exo-suite (and client scripts on Github)
excerpt: The ExoWeb client scripts are now hosted on Github...
wordpress_id: '127'
categories:
- exoweb
- javascript
- programming
tags:
- exograph
- exorule
- exoweb
- github
- jasmine
- javascript
- rake
---

Off and on at [work](http://vc3.com/) over the last year or so I have been working on an open-source project called [ExoWeb](http://exoweb.codeplex.com/), as well as supporting projects called [ExoGraph](http://exograph.codeplex.com/) and ExoRule.  ExoWeb and ExoGraph are hosted on [Codeplex](http://codeplex.com/), though they are somewhat stale at this point.

Before I go any farther I'll give you (and future self) my take on the purpose of these projects.



### ExoGraph


...is essentially an enabler.

From the codeplex site:


> ExoGraph is a graph library that leverages type information to optimize graph operations and notifications. The library exposes type-level events for object initialization, property retrieval, property path changes, and custom domain events within a graph context.



This doesn't sound very useful in and of itself, right?  Well, it's not supposed to be.  It's an enabler, remember?  That's where ExoWeb and ExoRule come in...



### ExoRule


...is a rules framework that leverages ExoGraph.  That is all for now.



### ExoWeb


...is a JavaScript framework, basically.  It also relies on a supporting server-side web request handler as well as a working ExoGraph implementation.

From the codeplex site, ExoWeb...


> ...aims to provide a rich JavaScript object model, intuitive UI code based on the fundamental languages of the web (HTML, CSS, and JavaScript), model- and UI-driven validation, and seamless synchronization of changes between client and server.



That may not be crystal-clear, but fortunately you can browse the source, which is what I really want to write about anyway.

The JavaScript source is now [hosted on Github](http://github.com/mattheyan/exoweb).  If you take a look at the [source on Codeplex](http://exoweb.codeplex.com/SourceControl/list/changesets) you'll notice that there are 8 script files: exoweb.js, exoweb.model.js, exoweb.mapper.js, exoweb.view.js, exoweb.ui.js, exoweb.mock.js, exoweb.jquery.js, and start.debug.js.  The source on Github, however, has many more script files as well as specs (using jasmine) and a build process (using rake) that produces the scripts listed above.  It is loosely modeled after the [jquery source](http://github.com/jquery/jquery).

I have a few goals in hosting the project on Github.




  1. Isolate classes and related functions in order to make it easier to manage, illuminate code structure, improve architecture and design, and limit dependencies.


  2. Allow for (hopefully) isolated testing of individual classes and functions.


  3. Isolate the bulk of the code which is not dependent on any particular JavaScript library or server-side technology.


  4. Take advantage of github's popularity in open source software collaboration, and...well, I just like Github.



At the time of this writing the project produces the destination scripts that more or less match the scripts in the original project (not the ones on codeplex, they're old).  Also, a few of the source files have corresponding specs that pass, using [nodejs](http://nodejs.org/) to run them.

Finally, in writing the build script, I got the chance to learn a little [rake](http://rake.rubyforge.org/) (ruby make), which I highly recommend.

One of my other goals is to create working ExoGraph/ExoWeb implementations for django and rails.  The beginnings of the django implementation is currently [hosted on Github](http://github.com/mattheyan/django-exoweb) as well.
