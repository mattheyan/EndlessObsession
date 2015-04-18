---
date: '2010-08-16 18:00:24'
layout: post
slug: resize-jquery-dialog
status: publish
title: Resize jQuery Dialog
excerpt: If you ever need to resize and reposition a jQuery dialog, the following script should do the trick...
wordpress_id: '106'
---

If you ever need to resize and reposition a jQuery dialog, the following script should do the trick:










  * function setDialogSize($dialogEl, width, height) {


  * $dialogEl.dialog("option", "width", width);


  * $dialogEl.dialog("option", "height", height);


  * $dialogEl.dialog("option", "position", $dialogEl.dialog("option", "position"));


  * }








If you change a UI component's option it should respond by updating immediately to reflect the change.  If it doesn't, it's a bug.  I read that somewhere :)
