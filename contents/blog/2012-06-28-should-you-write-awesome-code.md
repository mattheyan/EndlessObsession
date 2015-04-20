---
layout: post
title: "Should you write awesome code?"
date: 2012-06-28 22:48
comments: true
excerpt: My reaction to a post entitled "Should you write awesome code?"
categories: 
---

I ran across this provacative post on the tubes: [How I stopped writing awesome code](http://jhovgaard.net/how-i-stopped-writing-awesome-code). The following is my reaction and thoughts (hastily thrown together). Go to the link and read it first or what follows probably won't make much sense.

I certainly agree that some of the practices he mention can have little benefit in the short term. Many people pointed out in the comments that the short term gains of "trimming the fat" can come back to haunt you on long term projects, and I'll second that.

Someone in the comments described how they have frequently inherited projects where it looked like the developer(s) had this mindset and it usually turned out to be a mess/headache to maintain. I think the mental burden he described to understand concepts/tools like IOC, ORMs, etc. is only one side of the coin. The other side is that not following best practices and using powerful tools that are available can be just as frustrating to a developer who inherits the project (or even your future self), especially in the event that the app has to be significantly enhanced or changed. That said, I have also had the experience where I found that I had over-engineered a project too early and ended up "stuck" with some of those poor decisions later on. I think the key is to not try to over-engineer too early, but rather follow only tried and true best practices that require little added effort and could yield future gains, improve and refactor as the project grows, and never be satisfied with where things are today. For what it's worth, in the case where I made regrettable engineering decisions early on, I was also deviating from common/best practices, i.e. trying to be clever.

As for F12, I don't think you can ever really get around the limitations of the IDE with respect to interfaces and abstract/virtual members. I have been in the habit lately of using Shift+F12 (symbol search) rather than "Go to Definition" unless I know for sure that there is a single implementation of the member that I'm trying to get at. Resharper is also a good choice to improve the IDE experience. As irritating as F12 can be, I wouldn't use that as reason to avoid using useful language features.

Finally, to tie it together with an anecdote: I can think of two projects off the top of my head that seem to fall into the too extremes. One was hastily thrown together by a freelance developer to meet a client need. The source control wasn't hosted on a popular OSS hosting services, it was just offered up for download on the blog.  There were no unit tests.  Most of the code was in a single class file with a number of supporting classes that were essentially just data containers.  On the one hand, I ended up having to significantly enhance that project and found it to be very frustrating and painful.  On the other hand, if he hadn't thrown it together it may be that nothing like it would have existed at all and I would have been forced to start from square 1 (and making my own mistakes as a result).  The other project was a highly engineered and conformed to a highly detailed open specification, complete with interfaces, IOC, and unit tests galore.  On the one hand, when I discovered a bug I was able to easily verify the bug via unit test, fix it, and see it go green.  On the other hand, the project is not very active now (has been somewhat superseded by other technology) so you could argue that the effort was wasted.

Its all about balance...

Also, someone pointed out that its possible to write tests as UI acceptance tests that actually interact with the web browser (using Selenium) and mimic user behavior. I happen to use WatiN instead in my day-to-day, but what's important is that you can verify the behavior that your clients are going to be looking for in an automated fashion. Do it!

Thanks to Jonas for provoking critical thought!  :)