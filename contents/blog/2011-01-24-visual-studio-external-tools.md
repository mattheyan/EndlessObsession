---
date: '2011-01-24 10:49:32'
layout: post
slug: visual-studio-external-tools
status: publish
title: Visual Studio External Tools
wordpress_id: '199'
---

Here’s a neat visual studio tip.  You can run any external command from within visual studio, and add a button to the command bar or map it to a keyboard shortcut.  This is really important to me because I rely heavily on keyboard shortcuts.  I love that I can hit a combination of keys and perform a repetitive task automatically, plus the result can be incorporated into visual studio by way of the output window.

 

Some examples of what you might use this for:

 

  * Get latest on several team projects to start your day.
  * Check out a specific set of files.
  * Automate various git commands from within visual studio.
  * Run a batch file with a set of arguments that you define when you run it.
  * Launch another application (i.e.: web browser).
  

What follows is inspired by Rob Conery's Git series on tekpub.  You'll have to watch the full video to see how he uses external tools to incorporate git in Visual Studio.

 

* * *

 

To get started from the menu go to Tools -> External Tools.

 

[![](http://farm6.static.flickr.com/5216/5384927410_e1d55e1e57.jpg)](http://www.flickr.com/photos/mattheyan/5384927410/)

 

Then you should see a dialog that looks like this:

 

[![](http://farm6.static.flickr.com/5215/5384323203_efb55aba83.jpg)](http://www.flickr.com/photos/mattheyan/5384323203/)

 

Some of the options are pretty self-explanatory.

 

  * Title is obvious.
  * Command is the path to the command to execute, also obvious.
  * Arguments is pretty simple on the surface, but we have some interesting options at our disposal, which you can use to make the command contextual.
  

[![](http://farm6.static.flickr.com/5216/5384366343_e368894d46.jpg)](http://www.flickr.com/photos/mattheyan/5384366343/)

 

  * We have similar options for the initial directory.
  

[![](http://farm6.static.flickr.com/5217/5384366357_d33e12f2fa.jpg)](http://www.flickr.com/photos/mattheyan/5384366357/)

 

In this example I'm using the file name and extension of the current item (open document) to run using node, assuming it's a JavaScript file.  I selected "Use Output window" so that the output will show up in visual studio, rather than launching a separate window.  This is handy if you don't need to perform any additional tasks after the fact.

 

So, now that you have your external command, you can run it from the "Tools" menu.

 

[![](http://farm6.static.flickr.com/5217/5385120864_b21ca90a5b.jpg)](http://www.flickr.com/photos/mattheyan/5385120864/)

 

You can also add buttons to the toolbar, map keyboard shortcuts (search for "ExternalCommand1, "ExternalCommand2", etc.), and maybe even add context menu items (though I haven't figured that one out completely).
