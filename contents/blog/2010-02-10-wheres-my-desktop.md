---
date: '2010-02-10 17:28:00'
layout: post
slug: wheres-my-desktop
status: publish
title: Where's My Desktop!
wordpress_id: '7'
categories:
- windows
tags:
- desktop
- windows
---

The other day I got into work really early, hoping to have a productive morning.  Unfortunately, my computer had other ideas.  When it finished booting up I was greeted by an empty desktop and a host of applications complaining about needing a password.  Geez, I don't even have coffee yet, how am I supposed to deal with this?!  (not that I drink coffee...)

Anyway, being the lazy developer that I am, I promptly notified the IT staff and then fired up Google.  I found a few posts mentioning the fact that my profile was mapped to a different location on disk (C:\windows\system32\config\systemprofile), but not much in the way of an explanation.  They suggested copying files into that location, but that didn't seem like a good idea to me.  Eventually I was contacted by one of my helpful coworkers who helped me resolve the issue by running the disk error checking utility (chkdsk.exe) and rebooting.  Simple, huh?

So, what did I learn from all of this?  Apparently, if Windows discovers that your profile is corrupted it will allow you to log in using a temporary profile so that you can fix the problem.  Running chkdsk (with both options selected) may work, as it did for me, or it may also be possible to backup your files and have Windows regenerate some of the files that may be corrupt (but don't take my word for it).

I'll keep that info filed away for future reference, but I will probably never have this problem again *crosses fingers*...
