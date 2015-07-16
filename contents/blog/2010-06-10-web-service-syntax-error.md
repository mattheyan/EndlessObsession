---
date: '2010-06-10 20:37:00'
layout: post
slug: web-service-syntax-error
status: publish
title: Web Service Syntax Error???
wordpress_id: '12'
excerpt: Ok, I'll start this post off with some background. A couple of years ago I wrote a SOAP web service that manages printing for multiple users through a web application. Sounds familiar, right?
categories:
- asp.net ajax
tags:
- ajax
- asp.net
- javascript
- programming
- soap
- web services
---

_Originally posted April 7 2010_

Ok, I'll start this post off with some background.  A couple of years ago I wrote a SOAP web service that manages printing for multiple users through a web application.  Sounds familiar, right?  Anyway, the client that interacts with the web service uses the Microsoft AJAX JavaScript framework (version 1).  The web service is hosted on a different server and domain.  However, since this is an internal application with a small number of users they were content to enable cross-domain data access and be done with it.

A few weeks ago one of my coworkers was revisiting the client portion, which just happened to be upgraded to the [beta version of the AJAX JavaScript framework](http://ajax.codeplex.com/).  He started to see a syntax error, which I determined was occurring when handling the web service response.  I knew that the client framework supported JSONP in some form, and I also noticed an interesting "jsonp" query string argument in the web service call.  Believe it or not, the client was trying to use JSONP, even though the web service response was XML!  This obviously would result in a syntax error when trying to deserialize.

After looking over the JavaScript code I determined that the WebServiceProxy was using JSONP if either the protocol or host of the request was different than the current page.  I now know in hindsight that the documentation (at least in code) of WebServiceProxy.invoke clearly states this.  Luckily, the "enableJsonp" parameter can be set to _false_ to override this behavior.

So, the bottom line is:  if you're accessing a web service across domains and you don't want to use JSONP, you have to set the  "enableJsonp" argument to _false_.  Here's the method signature and documentation...

```javascript
WebServiceProxy.invoke(servicePath, methodName, useGet, params, onSuccess, onFailure, userContext, timeout, enableJsonp, jsonpCallbackParameter) {
	/// <summary locid="M:J#Sys.Net.WebServiceProxy.invoke"></summary>
	/// <param name="servicePath" type="String">Path to the webservice</param>
	/// <param name="methodName" type="String" mayBeNull="true" optional="true">Method to invoke</param>
	/// <param name="useGet" type="Boolean" optional="true" mayBeNull="true">Controls whether requests use HttpGet</param>
	/// <param name="params" mayBeNull="true" optional="true">Method args.</param>
	/// <param name="onSuccess" type="Function" mayBeNull="true" optional="true">Success callback</param>
	/// <param name="onFailure" type="Function" mayBeNull="true" optional="true">Failure callback</param>
	/// <param name="userContext" mayBeNull="true" optional="true">Success callback</param>
	/// <param name="timeout" type="Number" optional="true" mayBeNull="true">Timeout in milliseconds</param>
	/// <param name="enableJsonp" type="Boolean" optional="true" mayBeNull="true">Whether to use JSONP if the servicePath is for a different domain (default is true).</param>
	/// <param name="jsonpCallbackParameter" type="String" optional="true" mayBeNull="true">The name of the callback parameter for JSONP request (default is callback).</param>
	/// <returns type="Sys.Net.WebRequest" mayBeNull="true">Returns the request that was sent (null for JSONP requests).</returns>
}
```
