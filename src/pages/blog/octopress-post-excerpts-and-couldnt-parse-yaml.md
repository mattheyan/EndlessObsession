---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Octopress post excerpts and 'couldn't parse YAML'"
slug: "octopress-post-excerpts-and-couldnt-parse-yaml"
date: 2013-10-15 21:14
pubDate: 2013-10-15
excerpt: This evening I noticed a syntax error in my blog's ATOM feed. The error seemed to stem from the text in one of my more recent posts, what exactly I didn't bother to determine. However, I also noticed that the post summaries were rather large and didn't appear to do a good job of summarizing post content in any case. So, it seemed the best thing to do was to figure out how I could get Octopress to use a better summary and kill 2 birds with one stone.
comments: true
categories: 
---

This evening I noticed a syntax error in my blog's ATOM feed. The error seemed to stem from the text in one of my more recent posts, what exactly I didn't bother to determine. However, I also noticed that the post summaries were rather large and didn't appear to do a good job of summarizing post content in any case. So, it seemed the best thing to do was to figure out how I could get Octopress to use a better summary and kill 2 birds with one stone.

I discovered that the YAML that lives in each post's header (more on that later) [could include an "excerpt" property](https://github.com/imathis/octopress/issues/1146) where I could write my own summary of the post.

For example, here's the header of this post:


	---
	layout: ../../layouts/MarkdownPostLayout.astro
	title: "Octopress post excerpts and 'couldn't parse YAML'"
	date: 2013-10-15 21:14
	excerpt: This evening I noticed a syntax error in my blog's ATOM feed. The error seemed to stem from the text in one of my more recent posts, what exactly I didn't bother to determine. However, I also noticed that the post summaries were rather large and didn't appear to do a good job of summarizing post content in any case. So, it seemed the best thing to do was to figure out how I could get Octopress to use a better summary and kill 2 birds with one stone.
	comments: true
	categories: 
	---


This worked so well that I promptly went through all of my posts and threw up some quick excerpts without much thought. Unfortunately I soon ran into an error: ['parse': couldn't parse YAML](https://github.com/imathis/octopress/issues/57).

I hadn't thought about it until now, but the configuration at the head of each post is YAML. I don't know much about YAML, but apparently something was wrong with one of my excerpts.

Fortunately I was able to track it down to the ":" character, which is somehow significant in YAML syntax. [YAML Lint](http://yamllint.com/) was an invaluable resource.
