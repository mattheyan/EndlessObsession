Automated UI Testing
====================

I've been writing automated user interface tests at work since early 2009 -
that's over 6 years to date. I won't claim that I know everything about the
subject, but in that time I have learned a few things that I think are worth
sharing.

But first, a little background.

An Introduction to Automated UI Testing
---------------------------------------

The concept of UI testing is pretty self-explanatory. It's simply the act of
testing the application by leveraging the UI in the same way that a user would.
If you work on a website, for example, then you're probably already doing UI
testing by default. You make a change to the site, then open it up in your
browser and click around to confirm that the changes had the desired effect.

This is a very attractive, and even natural, way to test. For many applications
the UI is everything and whatever is happening "under the hood" is a secondary
concern. In fact, often times only the programmers care about it at all. I
mention this because there are other ways to test, and you should consider this
when weighing the pros and cons of each. More on that later...

Automated UI testing takes things a step further: make the process repeatable so
that you don't have to do the same tests manually each time you make a change.

### Why automate?

Automated testing can be a huge improvement over manual testing, for many
reasons.

For one thing, it can save you time in the long-run. This is one of the main
reasons why we automate anything. But there are other, less obvious, advantages
as well.

Automated tests can find regressions that you didn't think to look for. This can
really save your bacon when it helps you avoid releasing a broken build to
production. This isn't just a theory, I've seen it happen plenty of times.

Finally, they can act as a sort of documentation for the way that the UI should
behave in different scenarios. This is more of a theoretical benefit in my
opinion, since I haven't seen it happen very often. I definitely wouldn't
recommend doing automated UI testing for this reason alone.

### How to automate

Automating a user interface might seem a bit like magic. You don't know how it
works and it might not even be obvious that it would be possible until someone
told you about it.

In fact, I'm sure that there are UIs that really can't be automated, at least
not without a great deal of effort. But for my purposes I'm going to focus on
the web, and browsers can definitely be automated. In fact, there are many tools
to choose from, which different advantages and disadvantages.

Automated UI testing is typically broken down into two types: "recorded" tests,
and "coded" tests. To create recorded tests you use a tools that tracks where
you click and what you type while it's recording. This information is stored as
a script that can be replayed. Coded tests, on the other hand, require a
programmer to hand-write code or scripts to automate the UI.

It seems that recorded tests have fallen out of favor and many people contend
that they're fools gold. They are incredibly brittle by their very nature, since
any signficant change to the UI renders the test obsolete, requiring you to
record again. Also, they typically only test very basic conditions, which won't
catch every type of failure.

Coded tests are harder to implement, since they require programming. However,
the advantages may outweigh the cost. They're not quite as sensitive to change
as recorded tests. In fact, minor changes to the UI may have no impact on the
tests (depending on how the tests are implemented). Also, the tests can be very
specific about what they're looking for, and as a result they can detect errors
that might otherwise go unnoticed.

Given these pros and cons I would recommend this approach:

* "Testers" should consider using recorded tests if it helps them eliminate some
  of the repetative work of testing the same things over and over. Re-recording
  isn't such a big deal, since you would be doing the test manually otherwise.
* Developers should participate in the testing process by writing automated
  tests.
