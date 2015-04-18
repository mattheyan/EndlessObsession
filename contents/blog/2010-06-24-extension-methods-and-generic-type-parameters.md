---
date: '2010-06-24 03:40:28'
layout: post
slug: extension-methods-and-generic-type-parameters
status: publish
title: Extension Methods and Generic Type Parameters
wordpress_id: '14'
categories:
- csharp
tags:
- asp.net
- c#
- csharp
- dotnet
- programming
---

Edit 2010-06-29:  [question on stackoverflow](http://stackoverflow.com/questions/3118898/c-extension-method-on-type-with-generic-type-argument)

Edit 2010-07-01:  [question answered](http://stackoverflow.com/questions/3118898/c-extension-method-on-type-with-generic-type-argument/3159532#3159532)

This is going to be a short post, and I’ll get right to the point.

I’m looking at ways to improve the consistency, brevity, and readability of some code in the application I’m working on.  The starting code looked something like this:






	
  * context.GetGraphType<Bar>().Subscribe<Fizz>(

	
  * (instance, evt) => e.Execute((Bar)instance.Instance)

	
  * );





It breaks down like this:



	
  * Get some type

	
  * Subscribe to an event

	
  * When the event happens, do something


It just so happens that we have all followed an unspoken convention: an Execute method with a single parameter that is of the type that is subscribing to the event (Bar).  You can imagine that once you have over a dozen of these subscriptions it can start to look a little silly.  More on that later.

So, I wanted to rewrite it to look something like this:






	
  * typeof(Bar).SubscribeTo<Fizz>(context);





My hope was that it now reads something like “bar subscribes to the fizz event on the given context”, rather than “the context gets the bar type and subscribes to fizz and then does some stuff.”  Hopefully I’m not totally off base here.  I did check with a co-worker and he confirmed my thoughts.

In order to accomplish the above I wanted to make use of an abstract generic base class for the events, something like:






	
  * public abstract class Event<T>

	
  * {

	
  * public abstract void Execute(T arg);

	
  * }





In the example, T is Bar - the type that subscribes to the event.  I implemented the SubscribeTo method as a local extension method.  Unfortunately, I got stuck when I tried to set up a generic type parameter that would be of type Bar.  Something like this:






	
  * public static void SubscribeTo<TEvent>(this Type type, Context context)

	
  * where TEvent : Event<the value of parameter 1>

	
  * {

	
  * // do stuff...

	
  * }





If this were possible, one would be able to implement the change I proposed with type checking.  The compiler would verify that Fizz was a subclass of Event<Bar> and the extension method could treat it as such.

Do you know of a way to implement what I have proposed, or an alternative that is very similar?

Back to the convention I mentioned earlier.  In the spirit of utilizing conventions, I ended up using reflection to take advantage of it.  It isn’t checked by the compiler, but we have the next best thing.  The code runs on application start-up and the Execute method is retrieved when the event is subscribed to, not raised.  So, it will fail very early if there is a problem.
