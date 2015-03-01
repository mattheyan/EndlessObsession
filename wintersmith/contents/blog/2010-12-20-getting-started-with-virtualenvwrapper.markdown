---
date: '2010-12-20 21:22:33'
layout: post
slug: getting-started-with-virtualenvwrapper
status: publish
title: Getting started with virtualenvwrapper
excerpt: A while back I toyed with using virtualenv and virtualenvwrapper to manage isolated python packages for development, but I didn't get very far at the time. Recently I've been dabbling in ruby and have used RVM to manage ruby environments and gems. This experience has been a positive one, so I decided to revisit virtualenvwrapper to see how it would compare.
wordpress_id: '160'
---

A while back I toyed with using [virtualenv](http://pypi.python.org/pypi/virtualenv) and [virtualenvwrapper](http://www.doughellmann.com/projects/virtualenvwrapper/) to manage isolated python packages for development, but I didn't get very far at the time.  Recently I've been dabbling in ruby and have used [RVM](http://rvm.beginrescueend.com/) to manage ruby environments and gems.  This experience has been a positive one, so I decided to revisit virtualenvwrapper to see how it would compare.



## Installing


_Note that I have tested this process on Ubuntu 10.04 and 11.04.  I have not tested on other environments.  Windows setup may follow in a later post._

**The basic steps that I used are...**




  * Install python


  * Install virtualenv


  * Install virtualenvwrapper


  * Configure virtualenvwrapper


  * Create a new virtual environment


  * Install packages



A script to accomplish most of this can be found [here](http://github.com/mattheyan/environment) @_/linux/virtualenvwrapper.sh_.



#### 1) Make sure that the script can be executed:



`sudo chmod +x virtualenvwrapper.sh`



#### 2) Execute the script:



`./virtualenvwrapper.sh`



#### 3) Initialize virtualenvwrapper:



The script mentioned above adds the following to ~/.bashrc, but will not take effect until you open a new terminal window.  I'm sure there's a way to avoid having to do this.  In the code below, ~/.virtualenvs can be changed to any path you wish.  Also, the path may vary ([link](http://www.doughellmann.com/docs/virtualenvwrapper/install.html#comment-83318419)).

`export WORKON_HOME=~/.virtualenvs
source /usr/local/bin/virtualenvwrapper.sh
`



#### 4) Create a new environment:



`mkvirtualenv env`



#### 5) Begin working on your new environment:



`workon env`



#### 6) Install packages



This can be done using pip (or easy_install, I believe) and the packages are installed in $WORKON_HOME/env/...

You can list all of your required packages in a single pip requirements file and install at once.

**Example:**



Django==1.1.2
django-tagging==0.3.1
South==0.7.1



Then, use pip to install the packages:

`pip install -r /path/to/requirements`



_Update 12/29/2010:  Using a specific version of python would be nice, especially since it's something that can be done easy enough with [RVM](http://rvm.beginrescueend.com/).  I will be investigating this so look out for a future post on the topic._
