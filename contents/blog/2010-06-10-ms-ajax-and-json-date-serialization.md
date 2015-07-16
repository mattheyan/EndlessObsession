---
date: '2010-06-10 19:25:00'
layout: post
slug: ms-ajax-and-json-date-serialization
status: publish
title: MS AJAX and JSON Date Serialization
excerpt: One of the nice little features in MS AJAX is the ability to invoke a web service, passing in some arbitrary JavaScript object(s), and it just works! Well, mostly of the time anyway. Today I found out that you have to be careful with dates. When I called a web service in this manner, and the object was a Date or contained a Date, the deserialized DateTime object on the server was off by several hours.
wordpress_id: '11'
categories:
- msajax
tags:
- ajax
- javascript
- msajax
- programming
---

I'm making heavy use of Microsoft AJAX right now at work.  No, not the webforms controls, the [JavaScript library](http://asp.net/ajax/).  That' s a little better, right?

Anyway, one of the nice little features in MS AJAX is the ability to invoke a web service, passing in some arbitrary JavaScript object(s), and it just works!  Well, mostly of the time anyway.  Today I found out that you have to be careful with dates.  When I called a web service in this manner, and the object was a [Date](https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Date) or contained a Date, the deserialized DateTime object on the server was off by several hours.

At this point you're probably thinking, "I know what the problem is, you idiot!  It's local time!"  Hopefully you're more polite than that, but you would be right, of course.  Since [JSON doesn't account for dates](http://www.json.org/), we're forced to improvise.  Check out [this link](http://weblogs.asp.net/bleroy/archive/2008/01/18/dates-and-json.aspx) for a discussion of the JSON date format that the AJAX team decided on using.  You'll notice that he mentions several time that the string format represents a **UTC** date & time.  In my own defense, I simply provided a Date object and the rest was supposed to be magic (as we developers are so fond of saying).  After all, the Date object does include [time zone information](https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Date/getTimezoneOffset).  Unfortunately, the serialization code doesn't take that into account.

```javascript
if (Date.isInstanceOfType(object)) {
	stringBuilder.append('"\\/Date(').
	append(object.getTime()).
	append(')\\/"');
	break;
}
```

Since the date was going to be converted to a string anyway I went ahead and did the conversion ahead of time.  Something like this...

```javascript
var offset = obj.getTimezoneOffset() * 100 / 60;
var offsetText = offset >= 1000 ? offset.toPrecision(4) : "0" +
offset.toPrecision(3);
return "/Date(" + (+obj).toString() + "-" + offsetText + ")/";
```

There are, of course, other ways to do this.  You could convert the date to a UTC date and let the serialization code do its thing.  This was my first solution, but I scrapped it in favor of the code above since it's more consistent with how the dates were formatted when sent from the server.  You could also parse out the offset from the date string with a regex, but that just didn't feel right.

Moral of the story:  either make sure your dates are UTC or serialize with the offset yourself.  I could think of cases where both would be inconvenient or impractical.  Hopefully you don't have to face that problem.
