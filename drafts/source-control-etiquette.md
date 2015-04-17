---
layout: post
title: "Source Control Etiquette"
slug: "source-control-etiquette"
comments: true
categories: 
---

http://www.codingblocks.net/podcast/episode3/

According to it's [Wikipedia article](http://en.wikipedia.org/wiki/Revision_control),
source control is "essential for the organization of multi-developer projects".
I'm going to assume that you not only know what source control is, but also agree
wholeheartedly with that statement.

-- the question is, "how to use it"

* Commit (or at least stash/shelve) early and often
* Commit granularity
	- Keep checkins small!!!
	- Commit in logical chunks
* Commit notes
	- Describe your commit as clearly as possible.
	- Don't leave anything out.
	- Subject line & details
* Branching?
	- Don't modify source for the branch
	- Why/when to branch
	- Delete old/merged branches
* Make sure it works
	- Make sure it builds (obviously)
	- Run any applicable tests
	- Get a code review (usually) and attribute the reviewer
* Don't check in unrelated changes
