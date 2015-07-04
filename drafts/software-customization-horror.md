Software Customization Horror Stories
=====================================

Today I bring you two tales of horror due to unsanctioned customization of a
software product. Names have been changed and details omitted in order to
protect the innocent (or, guilty is more like it). Anyway, I hope that these
stories will serve as a cautionary tale, and help you to avoid making the same
mistakes.

The first story is from my early days as a software developer. I was very young,
and also very green, and had yet to learn the vital lesson of this story. That's
my excuse anyway...

I'm a little fuzzy on the details, but essentially I was tasked with making some
"style" changes to a web-based software product that the client had purchased.
I say "style" because I'm fairly certain that some of the changes went a bit
farther than tweaking colors.

Anyway, I was a young, ambitious developer, so there was no way I was going to
back down from this challenge. Also, because of my youth and inexperience, I was
happy to comply with whatever requirements were handed down from on high. Sure,
it may have been a bit odd, but they were given to me for good reason, I assumed.
And so I set about making the changes, and over the course of a few days I had
accomplished most of it.

At this point I'll address the question you may be asking yourself. How, exactly,
were these customizations actually accomplished?

Ah, therein lies the problem...

This was a web-based product, so naturally I was editing HTML markup and CSS for
the most part, maybe some JavaScript sprinkled in for good measure. But, it
didn't really matter what changes I made, this wasn't going to fly. I was 
modifying the source code of a software product, and there's no way that those
changes would be incorporated back into the product. Whenever the software was
updated my changes would disappear. Or worse, I could inadvertently cause a bug
in the product that might be blamed on the vendor's product team.

At one point I ended up on the phone with an individual at the vendor company,
picking his brain about how I might go about making some of the final, more
tricky, changes. As a most decidedly introverted person, I was proud of my
assertiveness in cold calling, getting them to put me on the phone with someone
who could help, and proceeding to take care of business. I did something that
required talking to a person, and it wasn't terrible.

I later found out that this individual was a VP at that company, and was
probably a bit perplexed by our conversation.

At the end of the day I wasted a bunch of my time, and his, doing something that
shouldn't have been done in the first place. In hindsight, I really should have
known better.

The second story is a more recent one, and since I now work on a software
product team, the shoe is on the other foot.

It's just a normal weekday morning, and me and my supervisor (yes I know,
*my supervisor and I*)... anyway, we're digging into an interesting bug report.

Based on the symptoms we we're seeing it would seem that the product's install
process didn't quite do its job. There was a file (at least one that we knew of)
that didn't match the version in the software package, and the differences in
that file were causing the error. We manually updated the files and chalked it
up to solar wind or something. Yeah, right.

The next day, the same problem resurfaces.

At this point it's clear that something is periodically updating the files...on
a schedule. So, we check the scheduled tasks on the server. Sure enough, there's
a task called "update the whiz bang file" that runs every morning in the early
AM hours. And what does it do? Well, it copies over the file that is causing
the problem. Hmm...

To make a short story even shorter, one of the customer's people had set up this
task in order to make a tiny customization to the product. I can see my past
self in this situation. I imagine that he was given orders, and, in much the
same way, set about making the changes that were requested without thinking
twice. Whereas in my case time had been wasted needlessly, in his case users
were unhappy to encounter errors, as they usually are.

So here's the lesson that I take away from these stories: when you're asked to
make a customization to a software product, take a moment to stop and consider
the impact. Maybe you can spare yourself, and others, the trouble it might cause.

And to take it one step futher, this same lesson can be applied to any request
or requirements that you're given. Take a moment and consider the implications
of the request. Is there a disaster looming that only you can see? Provide the
appropriate feedback when needed. After all, you're the expert.

Have you ever experienced something similar? What's the craziest thing you've
been asked to do at work? I'd love to hear about it.
