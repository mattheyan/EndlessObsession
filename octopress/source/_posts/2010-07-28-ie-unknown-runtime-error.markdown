---
date: '2010-07-28 11:58:58'
layout: post
slug: ie-unknown-runtime-error
status: publish
title: IE "Unknown runtime error"
wordpress_id: '99'
excerpt: I received a wonderful error from Internet Explorer today - "Unknown runtime error"...
categories:
- programming
tags:
- html
- ie
---

I received a wonderful error from Internet Explorer today:  "Unknown runtime error".

It seemed to be an Internet Explorer issue only, since it worked fine in other browsers.  I was able to track this down to where the innerHTML for an element was being set.

I found out [here](http://piecesofrakesh.blogspot.com/2007/02/ies-unknown-runtime-error-when-using.html) that the problem was because my HTML was invalid.  As the poster notes, IE is actually enforcing [the spec](http://www.w3.org/TR/html4/struct/text.html#h-9.3.1), which is good.  However, the error message is completely worthless, which is not good.  Sadly, this is what I expect from IE.

In his example, he was attempting to inject an "li" into a "p", which is obviously invalid.  He noted that IE's behavior seemed to be inconsistent, since it was ok with an "ul".  However, in my case I found that injecting an "ul" into a "p" caused the same problem.  This may have been changed recently, a la Windows Update...
