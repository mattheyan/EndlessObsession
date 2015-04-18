---
date: '2011-08-21 15:59:03'
layout: post
slug: learning-fsharp-with-tdd-part-1
status: publish
title: 'Learning F# with TDD: Part 1'
wordpress_id: '206'
---

I decided to dive into a few languages I've been meaning to learn by way of the [calculator kata](http://osherove.com/tdd-kata-1/).  First up: F#.

First, some prerequisites.



	
  * F#, obviously.  This comes with VS 2010 so you probably already have it.

	
  * We're doing TDD, so we need some sort of testing framework.  I decided to go with [NaturalSpec](http://www.navision-blog.de/2009/11/08/getting-started-with-naturalspec/).  This means we'll need to download the package from [github](https://github.com/forki/NaturalSpec), build it, and also download and install [NUnit](http://www.nunit.org/index.php?p=download) and [TestDriven.NET](http://testdriven.net/default.aspx).  The author has a good [blog post](http://www.navision-blog.de/2009/11/08/getting-started-with-naturalspec/) on setting up and running the test project.


Keep in mind that I'm extremely new to the language, so the code I ended up with probably doesn't reflect what a seasoned F# programmer would write.  I tried to follow conventions that I could pick out as much as possible.  The first part of the kata is an add function.  Pretty simple.  In the interest of not getting bogged down in one language I didn't take if very far, so I will only be able to make very broad observations at this point.

Two positive things that I took away from it:  pattern matching and pipe.

Pattern matching is something that I knew was popular in functional programming circle but had never experienced first hand.  Now that I have a taste of it I think it's a handy abstraction, but I have a feeling that I haven't even begun to scratch the surface of what it could mean.

    
    let addNumbers (numbers : List) =
        match numbers.Length with
        | 0 -> 0
        | 1 -> numbers.[0]
        | _ -> numbers |> Seq.reduce (fun a b -> a + b)


This is simply an alternative form of the familiar if-else branching logic, nothing special really, but it is pleasantly terse.

Pipe is even more exciting.  Take the following for example.

    
    numbers.Split ',' |> Array.toList |> List.map int |> addNumbers


Using the pipe operator (that's "|>") you can stream a value through a series of transformations, in this case splitting the string, converting the array to a list, converting the items in the list to integers, and finally passing the list to a method called "addNumbers".

In any other language this would probably read similarly if your transformations are all instance methods, however, that breaks down as soon as you have to use global or static/class methods.  The pipe form always reads nicely from the beginning to the end.  Of course, this example could be a little simpler since our function can technically accept an array as its argument.

To be continued...
