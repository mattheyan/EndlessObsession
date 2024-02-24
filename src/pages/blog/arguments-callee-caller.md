---
date: '2010-06-10 20:40:00'
pubDate: 2010-06-10
layout: ../../layouts/MarkdownPostLayout.astro
slug: arguments-callee-caller
status: publish
title: arguments...callee...caller...
excerpt: Recently I spent some time looking at generating a stack trace in JavaScript for the purpose of error reporting. As a result of this I came across some odd behavior in JavaScript.
wordpress_id: '13'
categories:
- javascript
tags:
- functions
- javascript
- programming
---

_Originally posted May 3 2010_

Recently I spent some time looking at generating a stack trace in JavaScript for the purpose of error reporting.  There are plenty of [existing](http://eriwen.com/javascript/stacktrace-update/) [projects](http://helephant.com/2007/05/diy-javascript-stack-trace/) out there that solve this problem, so I wouldn't recommend rolling your own.

As a result of this I came across some odd behavior in JavaScript.  The code I was working with takes advantage of the special "arguments" variable (the "array" of arguments passed to the current function), which has a special "callee" property (the function that was called), which also has a special "caller" property (the function that called this function).  You can probably see how this would be tempting if you're trying to construct a stack trace.  Unfortunately, this information is attached to the function object rather than some sort of "function invocation" object.  There are at least two cases where this makes constructing an accurate stack trace impossible.
	
1. Function recursively calls itself.
	* Since the caller property is attached to the function itself there is no
	  way of knowing (through this information alone) how many times the function was called.
2. Function A calls function B, which then calls function A...
	* Even if there are terminating condition, the code that attempts to
	  reconstruct the stack trace (using "callee" and "caller") will not
	  terminate.  There is a good description of this behavior
	  [here](https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Function/caller).

I was primarily interested in scenario 2, since this can cause errors.  To get around this you can detect that you have already encountered a given function and simply stop.  Of course this means that you lose any information that follows, but at least you won't hang the browser.

Conclusion:  always check MDC :)

[http://eriwen.com/javascript/stacktrace-update/](http://eriwen.com/javascript/stacktrace-update/)

[http://helephant.com/2007/05/diy-javascript-stack-trace/](http://helephant.com/2007/05/diy-javascript-stack-trace/)

[http://bytes.com/topic/javascript/answers/470251-recursive-functions-arguments-callee-caller](http://bytes.com/topic/javascript/answers/470251-recursive-functions-arguments-callee-caller)

[http://msdn.microsoft.com/en-us/library/7t96kt3h](http://msdn.microsoft.com/en-us/library/7t96kt3h)

[https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Function/caller](https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Function/caller)
