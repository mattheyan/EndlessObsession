---
date: '2010-06-10 18:55:00'
layout: post
slug: pdf-embed-weirdness
status: publish
title: PDF Embed Weirdness
wordpress_id: '8'
categories:
- pdf
tags:
- documents
- internet explorer
- pdf
- programming
---

_Originally posted April 5 2010_

The other day I was working on a web page where the user does some stuff and then as the result a nice, shiny PDF is embedded in the page.  I noticed that in Internet Explorer (I was using IE8) the embedded region showed up as a blank rectangle with a little icon in the upper left-hand corner.  Weird…

One of my co-workers suggested that I try embedding a static PDF file.  In my case the source URL was an aspx page that dynamically renders the PDF.  But that can’t possibly matter, right?  I mean, as long as the content type is correct and the file is intact.  I guess it does.

I won’t bore you with the details, but I determined through trial and error that the following conditions had to be met for the embedded PDF to display in IE8:

1)  The “type” attribute must be specified as “application/pdf”, regardless of the fact that the external resource has the correct content type header.  Because of my own ignorance I freely accept that there is probably a good reason for this.  Besides, its good practice anyway – especially in my case (“what does this Page.aspx render as???”).

2)  The URL must include “pdf” or “.pdf” (not sure if the “.” is necessary), even if on the query string!  Really?  I didn’t believe it myself, but I tested a gratuitous number of times and eventually disbelief gave way to sheer exhaustion.

3)  Embed tag must be injected into the page with all attribute values at once (using jQuery) rather than injecting the tag and then setting attribute values (like type and src).  This may be a jQuery issue, but its worth mentioning anyway.

So, the moral of the story is…

If it doesn’t work then first reduce the problem to its simplest form.
