Keyboard-Friendly UIs on the Web
================================

For most of the history of computing the keyboard has been one of the best and
most effecient ways for us to interact with computers. Today we have a veritable
cornicopia of options (touch, movement, voice, visuals, etc.) but I contend that
for many users and in many situations the keyboard is still king.

Whether you agree or not, it's easy to ignore the keyboard when you're building
web applications. Most of us basically click or touch our way around the web, so
you could be forgiven for thinking that it doesn't matter (for anything other
than typing text anyway).

Hopefully I can convince you that it does matter, and then give you some tips on
how to make your web app or website more keyboard-friendly. 

If you're already convinced that being keyboard-friendly is important, then you
can [skip to the good stuff](#info).

Why the Keyboard Matters
------------------------

There are at least two major categories of user's who would benefit from
keyboard-friendly UIs, and I'll throw in a third for good measure.

* People with disabilities, particularly those that affect their ability to see
  or to operate a mouse
* Power-users, or those who just prefer to use the keyboard to get things done
  faster
* BONUS: People using a tablet or laptop with a lousy trackpad

OK, so I threw in that last one for personal reasons. I don't know how many
other people experience this, but keyboard-friendly apps and websites are so
much easier to use when I'm on my surface or laptop and I don't have a USB mouse
handy.

For users with disabilities, whether or not a website or app is
keyboard-friendly could mean the difference between being able to use it, or
having to move on to something else (if there is an alternative, that is) [1].

The ability to get things done with a keyboard is just one part of the bigger
concept of accessiblity (also know as "a11y" on Twitter and such). I won't
cover that topic in-depth here, but suffice it to say if you're not paying
attention to accessibility you're neglecting an under-served population. We can,
and should, do better so that everyone can experience the web to the fullest. 

A keyboard-friendly UI can also help power-users get things done more
efficiently. They'll love you for it, and it could mean the difference in
choosing your app over another.

How to be Keyboard-Friendly
---------------------------

In my opinion, a keyboard-friendly app or site should strive to meet the
following criteria:

* Able to "tab" through fields in a logical sequence
* It should be clear where tab focus is at any time
* Set and maintain focus appropriately
* Able to interact with all controls using only the keyboard
* Implements custom keyboard shortcuts to improve usability

### Tab Order of Fields

Web browsers allow you to move from field to field by hitting the `Tab` key (or
`Shift` + `Tab` to move backwards). Power users love this feature, and people
who can't use a mouse depend on it.

This works automatically in most cases, however, there are a few things that you
can do which cause this to break down.

#### Positioning that Doesn't Match Document Order

By default, fields are visited in the order that they appear in the page source.
If you use CSS to re-position elements in such a way that the order in the
source code doesn't match the order in which they appear visually, then the tab
order may be unexpected or even illogical.

One example of this is [using CSS 'float' to achieve a 2-column layout](https://jsfiddle.net/mattheyan/wvbax0tw/1/embedded/result/) - ([source](https://jsfiddle.net/mattheyan/wvbax0tw/1/)).

Notice that after you `Tab` a few times, focus is initially set to field #1,
which is on the right hand side of the form. After tabbing a few times more, you
reach field #4, which is on the left hand side of the form, at the same level as
field #1.

This is unexpected behavior, since tabbing should occur top to bottom and left
to right (i.e. following the direction that text is read).

The form may still be useable, but if nothing else it will probably be harder
for someone who is blind to understand the flow of the form. Also, in more
complex scenarios the impact could be more substantial.

The ideal way to address this problem would be to structure your markup so that
it matches the logical flow of the document. Not only does this help with
keyboard usability (especially for users who can't see the visual layout of the
page), but it also makes the markup easier to understand.

If you can't adjust the markup structure, it may be possible to use 'tabindex'
as a workaround. This is not recommended though, not only because a logical
structure is preferred, but also because it may be hard to use properly [2].

### Clear Visual Focus

---------------------------------------

**References**:

[1]: http://webaim.org/techniques/keyboard/
[2]: http://webaim.org/techniques/keyboard/tabindex

https://api.jqueryui.com/tabbable-selector/
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex
