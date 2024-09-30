---
date: '2010-09-30 17:19:32'
pubDate: 2010-09-30
layout: ../../layouts/MarkdownPostLayout.astro
slug: installing-virtualbox-guest-addition
status: publish
title: Installing VirtualBox Guest Additions
excerpt: The VirtualBox guest additions. What they are and how to install them.
wordpress_id: '116'
---

First, a disclaimer:  you may not find this post useful unless you are interested in virtualbox or virtualization.  Also, there are plenty of other blogs that will tell you how to install the guest additions.  This is my personal reference.

According to the [virtualbox wiki](http://www.virtualbox.org/wiki/VirtualBox), virtualbox is _the only professional-quality virtualization solution that is also Open Source Software_.  Alright, a big +1 for open source!  Not that I have ever cracked open the source... :P

Another big plus for me is that it is cross-platform.  I use windows and linux machines, so this is very important to me.

_As an aside, VMware player appears to also be somewhat cross-platform (windows and linux, no OSX).  I have used it as well, but I feel better about my experience with virtualbox.  However, I don't have any real solid reasons to explain why.  Feel free to try to change my mind if you must..._

So what are the guest additions?  From the [wiki](http://www.virtualbox.org/wiki/VirtualBox), it is _special software that can be installed inside Windows, Linux and Solaris virtual machines to improve performance and make integration much more seamless_.  Things like _mouse pointer integration and arbitrary screen solutions (e.g. by resizing the guest window)_.  That's the kicker for me.  I install them in my linux guests so that the guest resolution will adjust to match the host window.

Anyway, the point of this is how to actually install them.  [Here is a link](http://digitizor.com/2009/05/26/how-to-install-virtualbox-guest-additions-for-a-linux-guest/) to a good set of instructions in case you don't find these sufficient.

First, mount the guest additions "disc" from the host window's menu:  Devices > Install Guest Additions.

![Mount Guest Additions Menu](http://endlessobsession.com/wp-content/uploads/2010/09/install_guest_additions-300x185.png)

Now you should see the disc mounted in nautilus.  The next step is to copy the appropriate file to your home folder (or some other location on the guest machine).

```sh
$ cp /media//VBoxLinuxAdditions-x86.run .
```

Now, make the file runnable.

```sh
$ sudo chmod +x VBoxLinuxAdditions-x86.run
```

Finally, run the installer.

```sh
$ sudo ./VBoxLinuxAdditions-x86.run
```

That's all!
