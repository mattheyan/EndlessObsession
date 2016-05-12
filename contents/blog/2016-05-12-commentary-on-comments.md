---
layout: post
title: "A Commentary on Comments"
slug: "code-comments"
date: 2016-05-12 12:00
comments: true
categories: coding, comments
---

```javascript
// TODO: Improve post intro before publishing to the interwebs.
```

Comments are probably one of the most boring topics you can imagine.

Plus, they're so easy to write?

And yet, somehow I get the feeling we're doing it wrong.

Have you ever tried in vain to understand why a bit of code was doing something
that made no sense, and wished that the author had left you a clue as to their
intentions at the time (in the comments, perhaps)?

Or, have you ever looked at a bit of code, and then the comments attached to it,
and then back at the code, and then the comments... and wondered, "Am I not
getting something about this code, or is this comment just plain wrong?" (Hint:
the comment is *probably* wrong.)

Finally, think back to the last time you looked at a comment and thought to yourself,
"hmm, that was actually useful".

--------------------------------------------------------------------------------

"Wait a minute, are comments even worth writing about?", you may be wondering. "Couldn't
you write about something more important, like how to run a web server on your
wi-fi connected refrigerator using icecream.js?"

And this, I think, is part of the problem. We're too quick to write it off as unimportant. We just don't seem to care all that much, because, you know, it's not code.

Sure, I'll concede that code comments are not the greatest challenge of our
profession. You're not going to win a Turing award for your great comments. And
you won't win any cool points with your friends either. But, I do think its
worth writing about, because its an important part of the *craft* of writing
good software.

> Software spend only 10% time of its life in development and rest of 90% in
> maintenance. This 90% part of maintaining the code is where comment can help
> you immensely.
> 
> \- [10 Best Practices to Follow while writing Code Comments]

In my opinion, good comments are an important complement to good code, making it
much more clear and easy to understand.

Conversely, bad comments can be confusing, contradictory,
misleading, or just plain messy.

So, if comments really do make a difference, what should we do about it? How can we use them
to make our software better instead of worse?

What, How, and Why
------------------

There's a great quote on the topic that's referenced over and over again
in one form or another, courtesy of Steve McConnell from his excellent book
"Code Complete" (a must-read if you haven't already).

> Comments should explain the why instead of the how or what.
> 
> \- Steve McConnell, "[Code Complete](http://en.wikipedia.org/wiki/Code_Complete)"

Take a moment and let that sink in...

This distinction between what, how, and why is the foundation for writing
useful comments. And that's really the crux of it all, you
have to stop and think about whether the comment you're writing is as useful as
it could be, or if its even useful at all. Because...

> The best kind of comments are the ones you don't need.
> 
> \- [Coding Horror - When Good Comments Go Bad]

Comments shouldn't be concerned with the questions of "what" or "how".
Those topics fall squarely in the realm of the code. Well-crafted code should
make it clear what it's doing and how it's doing it.

> You should always write your code as if comments didn't exist.
> 
> \- [Coding Horror - Coding Without Comments]

Now, I don't want to give you the impression that I hate comments. They can be
quite invaluable in some cases. Specifically, when the "why" cannot be gleaned
from the code.

> You must at least write comments explaining the **why** of a chunk of code.
> 
> \- [Code Comments Should Explain ‘Why’ Instead Of ‘What’]

This is important for a number of reasons: describing your thought process,
preventing well-meaning people from breaking the code, documenting unwritten
assumptions, describing the rationale for something based on customer demands,
etc...

Essentially this all comes down to the fallibility of human memory and
communication. The computer (i.e. compiler, interpreter) can read your code five
years from now and determine what it should do, and if you've written it well
enough it will still function as intended. But, when **you** read your code five
years later and try to ascertain why you wrote it the way you did, you're
probably going to end up scratching your head and wondering what that guy was
thinking. Now imagine how your future self's coworkers will fare at the same
task. Oh, and you probably also neglected to share or document an important
detail of the customer's requirements. Good luck suckers!

This is the hard part of the day to day work of software development. The algorithms
aren't so complex that we can't understand them. The requirements aren't too
difficult. What **is** difficult is managing the accumulation of complexity over
time, and doing things in such a way that each team member has the knowledge
that they need to make the software better with each change,
[without breaking things].

Now, back to "Code Complete"...

The 6 Types of Comments
-----------------------

Steve categorizes comments into 6 basic types:

1. Repeat of the Code

	```javascript
	// set i equal to 5    
	var i = 5;
	```

	A repeat of the code is pointless. It adds no new information, so at best it
	is just useless noise. Please, don't parrot your code in English.

2. Explanation of the Code

	```javascript
	// set the initial batch size to 5
	var s = 5;
	```
	A comment that is an explanation of the code is an indication that the code
	could be written more clearly. This might be a great [opportunity to clean
	up the code] by extracting a well-named and documented method, or, renaming
	a variable so that the name more adequately conveys what it is
	(e.g. `var initialBatchSize = 5;`).

3. Marker in the Code

	```javascript
	// TODO: Really fix this!
	```

	Do you really think that anyone is going to fix this? This sort of thing
	really belongs in a bug tracker. The source code is where TODOs go to die.
	*CAVEAT*: Tools can make this better...

4. Summary of the Code

	```javascript
	// Do the first thing, then the second
	// thing, and finally the third thing,
	// but only if the second thing succeeded.
	```

	A summary of the code **may** be useful to describe a high-level algorithm
	in a way that humans can better understand it, and then refer back to when
	they're digesting the code. I'm on the fence about this one, but I'll
	concede that it has it's place.

5. Description of the Code's Intent

	```javascript
	// Determine the default access level
	// based on the current user's role
	// because X, Y, and Z.
	```

	In my opinion, this is a really good use for code comments. Explain what you
	intend for the code to do at a high-level, and write it in such a way that
	it's useful and cannot be easily ignored. This often incorporates the "why"
	that we've been talking about. Again, this information **cannot** be
	expressed in code, and the code **cannot** be fully understood without it.

6. Other Information that Cannot Possibly be Expressed by the Code Itself

	```javascript
	// The native 'map' did not perform well
	// in this case, so use a loop instead
	// (as an optimization).
	```

	This finally category covers other factors that may not be obvious in the
	code and have nothing to do with its intent: obscure optimizations,
	workarounds for libraries that don't do quite what they say they do,
	compromises due to tight deadlines or temporary limitations in technology.
	Once again, the code **cannot** be fully understood without these comments.
	And when the code is not fully understood we make avoidable mistakes.

In Conclusion
-------------

Comments definitely have their place. Follow these two simple rules and your 
code will be better off with the comments that you write (or don't write).

1. Write your code so that it doesn't require comments in order to understand
   it. There are plenty of patterns and practice that can help with this. Find what works for you.

2. When you write comments, use them to express the "why". Imagine that your
   future coworker is a homicidal maniac who knows where you live, and make sure
   he or she has all the information that they need to understand your code and
   not hate you for it. Leave the questions of "how" and "what" to the code,
   given that it can be fully understood (see point #1 above).

What do you think about it? Let me know in the comments.

[10 Best Practices to Follow while writing Code Comments]: http://javarevisited.blogspot.com/2011/08/code-comments-java-best-practices.html
[Coding Horror - When Good Comments Go Bad]: http://blog.codinghorror.com/when-good-comments-go-bad/
[Coding Horror - Coding Without Comments]: http://blog.codinghorror.com/coding-without-comments/
[Code Comments Should Explain ‘Why’ Instead Of ‘What’]: http://sandmoose.com/post/16414516163/code-comments-should-explain-why-instead-of
[without breaking things]: http://9gag.com/gag/aGwRXOZ
[opportunity to clean up the code]: http://simpleprogrammer.com/2015/04/13/why-comments-are-stupid-a-real-example/
