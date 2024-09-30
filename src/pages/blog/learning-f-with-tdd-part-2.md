---
date: '2012-01-11 21:50:53'
pubDate: 2012-01-11
layout: ../../layouts/MarkdownPostLayout.astro
slug: learning-f-with-tdd-part-2
status: publish
title: 'Learning F# with TDD: Part 2'
wordpress_id: '247'
excerpt: Last time I talked about setting up F# testing using NUnit, TestDriven.Net, and NaturalSpec. This time around I'll elaborate a little bit on the testing aspects, and also talk about active patterns.
---

[Last time](http://endlessobsession.com/2011/08/21/learning-fsharp-with-tdd-part-1/) I talked about setting up F# testing using NUnit, TestDriven.Net, and NaturalSpec.  This time around I'll elaborate a little bit on the testing aspects, and also talk about active patterns.

<!--more-->

## Running tests


First, I noticed a little problem with running the tests.  If I right-clicked on a test method and selected "Run Test(s)", then the test would run as expected.  However, if I selected "Run Test(s)" for a project or solution, the tests would not be found as described in the [getting started post](http://www.navision-blog.de/2009/11/08/getting-started-with-naturalspec/), so I would see something like "0 passed, 0 failed, 0 skipped, ...".

The solution for me was to transition from using local spec methods to defining a "Tests" class, with the "TestFixtureAttribute", and define my specs as static methods (they could be instance methods if needed of course).

    
    [<TestFixture>]
    type Tests = class
        new() = {}
    
        [<Scenario>]
        static member When_... () =
            // test body
    
    end




Voila, tests run as expected!

Now, a little explanation of how you write the specs...


## Writing specs


From  [Introducing NaturalSpec – A Domain-specific language (DSL) for testing – Part I](http://www.navision-blog.de/2009/02/23/introducing-naturalspec-a-dsl-for-testing-part-i/)


> With the Keyword “**Given**” I can create a test context (the objects I want to test). In this sample I created a list with 5 elements. With the keyword “**When**” I call a function which does something with my test context. In this case I want to remove the value 3. In the Assert section (keywords “**It should**” or “**It shouldn’t**”) I can give some observations, which should hold for my manipulated test context.





	
  * Create the object(s) to be tested using "Given"

	
  * Pipe into "When" to call functions (or do other things)

	
  * Pipe into "It should/shouldn't" to set up assertions

	
  * Finally, pipe into the "Verify" method to run the tests and print the output


Here's an example:

    
    [<TestFixture>]
    type Tests = class
        new() = {}
    
        [<Scenario>]
        static member When_getting_the_state_of_a_new_connection_it_should_be_closed () =
            Given NewConnection()
                |> When getting DbConnection.State
                |> It should equal "Closed"
                |> Verify
    
    end




The NewConnection() method call is entirely fabricated. It serves as the test context in the example.

"When getting" is followed by a method that takes as input the test context object type (presumably a connection object) and returns some value (string).

The "equal" method, based on the previous information, takes in two strings and asserts that they are equals.

And here's the output:


> 

> 
> Scenario: When getting the state of a new connection it should be closed
> 
> 

> 
>   - Given <fun:When_getting_the_state_of_a_new_connection_it_should_be_closed...
> 
> 

> 
>      - When getting 
> 
> 

> 
>       => It should equal "Closed"
> 
> 

> 
>   ==> Result is: "Closed"
> 
> 

> 
>   ==> OK
> 
> 

> 
>   ==> Time: 0.2060s
> 
> 

> 
> 

> 
> 

> 
> 1 passed, 0 failed, 0 skipped, took 0.61 seconds (NUnit 2.5.10).




There's room for improvement, but it's good enough for now, so on to active patterns!


## Active Patterns


From [MSDN](http://msdn.microsoft.com/en-us/library/dd233248.aspx):


> Active patterns enable you to define named partitions that subdivide input data, so that you can use these names in a pattern matching expression just as you would for a discriminated union. You can use active patterns to decompose data in a customized manner for each partition.




One example they give is even and odd.  You can define a pattern for "Even" or "Odd" and use that in pattern matching like so:

    
    match input with
        | Even -> // do something if even...
        | Odd -> // do something if odd...




Compare that with:

    
    if (input % 2 === 0) {
        // do something if even...
    }
    else {
        // do something if odd...
    }




Of course, you could do something like this:

    
    if (isEven(input)) {




...but that still doesn't read quite as well in my opinion.

Even more interesting, you can define partial active patterns that might match the given input, and if so, can transform the result in some way.  The example they gave was number parsing.

    
    let (|Integer|_|) (str: string) =
        let mutable i = 0
        if System.Int32.TryParse(str, &i) then Some(i)
        else None
    
    let (|Float|_|) (str: string) =
        let mutable f = 0.0
        if System.Double.TryParse(str, &f) then Some(f)
        else None
    
    // Consuming code somewhere...
    match str with
        | Integer i -> printfn "%d : Integer" i
        | Float f -> printfn "%f : Floating point" f
        | _ -> printfn "%s : Not matched." str




This illustrates what makes pattern matching different from traditional control structures. It's actually a **_reusable_** control structure plus potential augmentation of the input.

Here's a post where someone who really digs pattern matching [attempts to explain why](http://lorgonblog.wordpress.com/2008/04/17/an-example-of-the-interplay-between-language-features-and-library-design-part-two/), if you're interested.
