---
date: '2010-02-10 17:20:00'
layout: post
slug: the-new-asp-net-ajax-part-1-getting-started-with-the-script-loader
status: publish
title: 'The New ASP.NET AJAX: Part 1 - Getting Started with the Script Loader'
wordpress_id: '5'
excerpt: I had an existing ASP.NET AJAX-enabled application and wanted to use the Script Manager control in conjunction with the new client-only Script Loader. I wasn’t quite sure how they would work together and there is (understandably) precious little in the way of documentation. Here is what I have found so far...
categories:
- msajax
tags:
- ajax
- asp.net
- javascript
- microsoft
- msajax
- web
---

**Background**:  I had an existing ASP.NET AJAX-enabled application and wanted to use the Script Manager control in conjunction with the new client-only Script Loader.  I wasn’t quite sure how they would work together and there is (understandably) precious little in the way of documentation.  Here is what I have found so far…  
_By the way, if you haven’t heard of the Script Loader then you can read about it _[_here_](http://weblogs.asp.net/scottgu/archive/2009/10/15/announcing-microsoft-ajax-library-preview-6-and-the-microsoft-ajax-minifier.aspx)_ and _[_here_](http://weblogs.asp.net/bleroy/archive/2009/11/23/enabling-the-asp-net-ajax-script-loader-for-your-own-scripts.aspx)_, or Google it (with Bing…)!_







## Include the Script Loader




My first thought was to just include the script loader’s script file (“start.js”) early, before the page scripts that would use it.  Unfortunately, this line of code gave me grief.



    
    if(typeof(Sys) !== "undefined") Sys.Application.notifyScriptLoaded();




It's automatically appended to script references so we’re stuck with it.  This line of code predates the Script Loader, unfortunately.  When it was written the AJAX JavaScript library lived in one big JavaScript file, so you either had it or you didn't.  Today, the start script defines _Sys_ (so that you can do things like _Sys.require_), but it doesn’t define the _Application_ namespace.  Therefore, the above line of code causes a “null or not an object” error.  In order to get around this you just have to make sure that the start script is injected farther down the page than other script references that may include the offending line of code.  In my case I used the ScriptManagerProxy control.




## Define Your Scripts




This step is optional if you are just using the scripts from Microsoft or jQuery.



    
    Sys.loader.defineScripts(   {      releaseUrl: "%/{0}.js",      debugUrl: "%/{0}.debug.js"   },   [      {         name: "MyScript",         executionDependencies: ["WebServices"],         isLoaded: !!(MyControl)      }   ]);




The first argument is named _defaultScriptInfo_, in case you’re wondering.  Sounds interesting, doesn’t it?  This is where you can put the common settings for all of the scripts that you are defining here.  No need to repeat yourself.  If you want you can pass _null_ and be done with it.




The second argument is an array of JavaScript objects that tell the Script Loader everything it needs to know about each individual script(s).  Here’s a breakdown of the properties:




**name**:  This one is pretty obvious.  I assume that you can use any arbitrary text here, but you may want to be selective since it will ultimately be used in JavaScript code.  This is the name that you will use in other script definitions to indicate that it is a dependency (“WebServices” in the above example).  It is also the attribute name that is tacked on to the Sys.scripts object.  
**releaseUrl**:  This is the url (sort of) that can be used to load our script in release mode.  This is the literal url, with two exceptions.  First, the special “%” character is a placeholder for “the place that I got this script from” (the script loader script).  This means that if you downloaded the start script form CDN, then all of the other scripts that you request will also come from CDN.  If you download it from your web server, then all of the other scripts will come from your web server.  Also, “{0}” is replaced with the script name.  This is useful if you’re defining a common url scheme.




**debugUrl**:  Same as _releaseUrl_, except that this url is used in debug mode.




**dependencies **and** ****executionDependencies**:  An array of script names.  These are the scripts that must be present before your script can function.  These two attributes accomplish this in slightly different ways.  (_**Disclaimer**_:  my current understanding of these options is based on reading through code as well as some guess work.)  As I understand it, dependencies indicates that the script loader should wait for the dependencies before it attempts to load the script, whereas executionDependencies indicates that the script loader can fetch scripts in parallel and then execute them in the correct order (more on this later).




**isLoaded**:  Tells the script loader whether or not your script is already loaded.  This is useful for things like jQuery that may be commonly included as a static script reference, or for scripts that may or may not be included by the Script Manager.




## Fix Your Script Files




If you have existing scripts that you want to load using the Script Loader, they probably look something like this:



    
    <start of file>bunch o' code...<end of file>




In order to take full advantage of the script loader you will need to change your files to looks something like this:



    
    <start of file>;(function() {   function execute () {      bunch o' code...   }
    
       if (window.Sys && Sys.loader) {      Sys.loader.registerScript("MyScript", null, execute);   }   else {      execute();   }}) ();<end of file>




That bit at the end looks for the Script Loader and if it is found it tells the Script Loader that it is ready to execute whenever its dependency are loaded.  Otherwise, it simply executes on the spot.  That way it can function with or without the Script Loader.




With this in mind the distinction between _dependencies_ and _executionDependencies_ makes more sense.  You may not be able to change a script to match this format.  If that is the case, then the scripts cannot be fetched in parallel.




## Using Your Scripts






    
    Sys.require([Sys.scripts.MyScript], function() {   bunch o' code...});




It's as simple as that!  The function that you provide as the second argument is executed whenever the required scripts have been loaded.



