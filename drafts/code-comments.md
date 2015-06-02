Code Comments
=============

The topic of comments in code has been covered extensively by many smart people.
I am not under the illusion that I can add anything novel or ground-breaking to
the discussion. What I will do is re-state the wisdom of others in my own way,
in hopes that it adds just a little bit to the collective weight of those words.

"Wait, are comments even worth writing about?", you may be wondering. "Couldn't
you write about something more important?"

I'll concede that code comments are not the greatest challenge of our
profession. But, yes, I think it is worth writing about.

Good comments are an important complement to good code, making it much more
clear and easy to understand.

Bad comments can make any code confusing, contradictory, misleading, and messy.

So, given that comments matter, what is the best way to use them?

A Conceptual Model
------------------

There's a great quote on the topic that you'll see parroted over and over again
in one form or another, courtesy of Steve McConnell from his excellent book
"Code Complete".

> Comments should explain the why instead of the how or what.
> 
> \- Steve McConnell, "[Code Complete](http://en.wikipedia.org/wiki/Code_Complete)"

The "how or what" should be adequately conveyed by the code itself. On the other
hand, "why" often cannot be gleaned from the code, which is where comments
provide their value.

Steve categorizes comments into 6 basic types:

1. Repeat of the Code

	```
	// set i equal to 5    
	var i = 5;
	```

2. Explanation of the Code

	```
	// set the initial batch size to 5
	var s = 5;
	```

3. Marker in the Code

	```
	// TODO: Really fix this!
	```

4. Summary of the Code

	```
	// Do the first thing, then the second thing, and finally
	// the third thing, but only if the second thing succeeded.
	```

5. Description of the Code's Intent

	```
	// Determine the default access level
	// based on the current user's role
	```

6. Information that Cannot Possibly be Expressed by the Code Itself

	```
	// The native 'map' did not perform well in this case,
	// so use a loop instead (as an optimization).
	```

According to Steve, the last three are OK, but the first three are bad news.

A repeat of the code is pointless. It adds no new information, so at best it is
just useless noise.

A comment that is an explanation of the code is an indication that the code
could be written more clearly.
