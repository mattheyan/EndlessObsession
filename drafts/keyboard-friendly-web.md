Keyboard-Friendly UIs on the Web
================================

The keyboard is one of the most versatile input devices in computing. It's been
around for as long as the personal computer (longer, in fact), and to this day
it's usually the most efficient way to get work done on a computer.

That being said, it's easy to ignore the keyboard when you're building web
applications. Most of us basically click or touch our way around the web, so
you could be forgiven for thinking that it doesn't matter, for anything other
than typing text at least.

Hopefully I can convince you that it does matter, and then give you some tips on
how to make your web app or website more keyboard-friendly.

Why the Keyboard Matters
------------------------

There are at least two major categories of users who would benefit from
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
concept of accessibility (also known as "a11y" on Twitter and such). I won't
cover that topic in-depth here, but suffice to say, if you're not paying
attention to accessibility you're neglecting an under-served population. We can,
and should, do better so that everyone can experience the web to the fullest. 

A keyboard-friendly UI can also help power-users get things done more
efficiently. They'll love you for it, and it could mean the difference between
choosing your app over another.

Finally, if you need a selfish reason, your own testing will go much smoother if
you make your site keyboard-friendly and learn to use the keyboard efficiently.

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
`Shift` + `Tab` to move backwards). In addition to fields, buttons and links
can also be visited in the same way. Because of this, you _*should*_ be able to 
use most forms and applications online without taking your hands off of the
keyboard.

Power users love this feature; people who can't use a mouse depend on it.

Fortunately, this works automatically in most cases; however, there are a few
things that you can do which cause this to break down.

**Positioning that Doesn't Match Document Order**

By default, fields are visited in the order that they appear in the page source.
If you use CSS to re-position elements in such a way that the order in the
source code doesn't match the order in which they appear visually, then the tab
order may be unexpected or even illogical.

One example of this is [using CSS 'float' to achieve a 2-column layout](https://jsfiddle.net/mattheyan/wvbax0tw/1/embedded/result/) - ([source](https://jsfiddle.net/mattheyan/wvbax0tw/1/)).

Notice that after you `Tab` a few times, focus is initially set to field #1,
which is on the right hand side of the form. After tabbing a few times more, you
reach field #4, which is on the left hand side of the form, at the same level as
field #1.

This is unexpected behavior since tabbing should occur top to bottom and left
to right (i.e. following the direction that text is read).

The form may still be useable, but it will probably be harder for someone who is
blind to understand the flow of the form. Also, in more complex scenarios the
impact could be more substantial.

The ideal way to address this problem would be to structure your markup so that
it matches the logical flow of the document. Not only does this help with
keyboard usability - especially for users who can't see the visual layout of the
page - but it also makes the markup easier to understand.

If you can't adjust the markup structure, it may be possible to use 'tabindex'
as a workaround. This is not recommended though, not only because a logical
structure is preferred, but also because it may be hard to use properly [2].

**Elements that are not "tabbable"**

While unexpected tab order can cause confusion, the _*inability*_ to tab through
elements of a form is even more damaging to user experience. 

It may seem odd that this would be a problem, given that I just said that web
browsers give us tabbable fields by default. However, not all elements are
tabbable, and what you see is not always what you get. Sometimes a button isn't
really a button.

A pattern that I've seen often (you might even call it an anti-pattern) is to
use generic elements like `div` and `span` to act as buttons. While it may be
easy to attach a click event handler to a div, that convenience comes at the
price of accessibility [3], not to mention semantics [4].

Elements like `div` and `span` are not tabbable by default since the browser
doesn't view them as form elements that the user can interact with [5]. So,
unless you anticipate this and plan accordingly [6], your users will tab past
those "buttons". Screen reader users would still be able to click the button
using some fancy keyboard shortcuts, but if they're blind or otherwise visually
impaired, how would they even know that the button exists? For other
keyboard-dependent users this may be virtually impossible to overcome.

To avoid these problems, use the elements that make sense for what you're trying
to do: links to take you somewhere, buttons to perform an action, input types
for gathering user input, etc.

If that fails for some reason, you should at least use a combination of
`tabindex="0"`, the `role` attribute, and `aria-*` attributes to make your
`div` look like and behave like a `button`.

### Clear Visual Focus

Ok, so you've done the work to make sure that users can `Tab` through your app.
That's a huge improvement already. But, what if the user doesn't know where they
are because they can't **see** the focus (for sighted users obviously)?

This is usually not a problem with some inputs; for example, text fields have a
blinking cursor when they're focused as well as some sort of change in
outline/border in most cases. Others may not be quite as obvious: select fields,
radio buttons, and check boxes all have some sort of outline around them when
focused.

In general, browser do a good job of conveying focus with the default styling.
However, if you're styling your fields and buttons in a special way, you may be
undermining the default focus style that the browser provides.

An example that I recently encountered at work hard to do with button focus.
We're using shades of blue for the background and borders of some of our buttons.
As it happens, the browser was using a blue outline as the focus indicator,
which was really had to distinguish from the blue of the button. For our green
buttons, on the other hand, focus was very obvious.

The moral of the story is this: if you're custom styling your form elements,
keep in mind how it might impact focus styling, and if needed, include custom
`:focus` styles to compensate.

### Set and Maintain Focus as Needed

Occasionally the user will take some action that will affect element focus, and
if you're not careful you could end up throwing away their place in the document.
If the user clicks a link or button that causes a part of the page to be hidden
or shown in such a way that the currently focused element is no longer visible,
they will lose their place in the document and have to start over from the top.
I'm sure you can understand why this is a source of endless frustration for
users who depend on keyboard navigation.

If the user click's an 'Edit' button and that causes the button to be hidden and
a form shown in its place, then you should set focus to the first field in that
form.

Likewise, if they click the 'Cancel' button of the form, you should return focus
to the 'Edit' button that they originally clicked.

Modal dialogs can also cause issues with unexpected focus. When a dialog is
opened, focus should be set to the first focusable element in the dialog.
Likewise, when it is closed, focus should be set to the element that caused it
to be opened if possible, or at least somewhere nearby as an alternative.

This all boils down to a simple concept: make sure the user's focus behaves
in the way that they would expect.

And whatever you do - don't let the user's focus return unexpectedly to the top
of the document.
 
### Able to Interact With **All** Controls

This one is pretty simple: if you use custom controls in your web app, make sure
that they're keyboard accessible, otherwise you're going to prevent some users
from being able to use your app at all.

Many high-profile UI libraries do a good job of this; for example, jQuery UI is
generally pretty good about taking care of accessibility as much as it can. That
random jQuery plugin that you found on the net may not be quite that robust.

### Custom Keyboard Shortcuts

After you've taken care of the basics so that keyboard-only users can at least
function, you can move on to value-add features to make your power-users happy.
Keyboard shortcuts are a great way to do that.

The first rule of keyboard shortcuts is to follow the principle of least surprise:
don't do stuff that will surprise your users; do what they expect.

In this case we're not talking about the "Happy birthday!" or "You won a new car!"
sort of surprise. We're talking about the curse-evoking sort of surprise. "Oh, you
thought that keyboard shortcut would do something innocuous, well it actually
deletes all of your data and sets the computer on fire!"

When you implement keyboard shortcuts, choose shortcuts that the user already
expects to work because they've seen them before. Beyond that, make sure that
your shortcuts follow some sort of logical pattern. For example, use the first
letter of the action being performed, like `Ctrl` + `O` for **open**. Or, use
a sequence of keys that match a phase, like `G` then `N` for **go** to
the **next** thing, and `G` then `P` for **go** to the **previous** thing.

The second rule is one that you shouldn't break or risk the wrath of a thousand
angry users: **don't conflict with existing shortcuts**.

* Avoid overriding common [browser-supported shortcuts].
* Avoid conflicting with any known operating system shortcuts. Fortunately, these
  often use a meta key (like the Windows key) that you shouldn't need to use anyway.
* In general, avoid using arbitrary modifier keys (`Ctrl`, `Shift`, etc.)
  shortcuts unless you have to.

There are times that the second rule may be trumped by the first rule. In some
cases the user will **expect** a browser, or even OS, shortcut to be overridden
in a particular context.

An example that I recently encountered was a form that allows the user to save
what they've done but continue editing the form (as opposed to the traditional
POST to the server). In this case, it made sense to override `Ctrl` + `S` to
save (and continue). After implementing this feature it was remarkable how much
this improved the user-experience, in my opinion at least.

You should also look to see what other apps are doing and follow suite. Remember
the principal of least surprise. If you think your users will expect a particular
shortcut to work because they've used it elsewhere, then you should make sure
that it works in your app as well.

Here are some common shortcuts supported by many web apps that you should
consider supporting as well.

* `Ctrl` + `Enter` to submit a form from a WYSIWYG editor or any field that has
  another use for the `Enter` key (taking the place of just Enter). Or, if the
* `Escape` to close dialogs or pop-ups when possible.
* Forward-slash (`/`) to go to a global search or filter box.
* Question mark (`?`) to open a dialog that shows the keyboard shortcuts that
  are available.
* `Enter` to perform an action on the current focused element, for example
  select something or expand a panel.

This is by no means an exhaustive list, and is subject to change. Take a look at
popular, modern apps like Facebook, Twitter, Trello, and GMail, and try to apply
the patterns that have emerged.

In Conclusion
-------------

It matters that your web app is keyboard-friendly. It might take a little extra
effort, but your users will love you for it (even if they never tell you).

The single best thing you can do to make your app more keyboard-friendly is
actually pretty simple: test your app by using **only** the keyboard. When you
encounter a problem...fix it.

Here are a few other resources on the topic that you might find useful:

* https://medium.com/@sashika/j-k-or-how-to-choose-keyboard-shortcuts-for-web-applications-a7c3b7b408ee
* http://www.hanselman.com/blog/TheWebIsTheNewTerminalAreYouUsingTheWebsKeyboardShortcutsAndHotkeys.aspx
* http://www.howtogeek.com/211680/web-apps-have-keyboard-shortcuts-too-and-many-work-almost-everywhere/

What are your thoughts on the topic? Does keyboard support matter to you? Have
any useful tips or tricks to add? Let me know in the comments.

[1]: http://webaim.org/techniques/keyboard/
[2]: http://webaim.org/techniques/keyboard/tabindex
[3]: http://www.karlgroves.com/2013/05/14/links-are-not-buttons-neither-are-divs-and-spans/
[4]: http://davidwalsh.name/html5-buttons
[5]: https://api.jqueryui.com/tabbable-selector/
[6]: http://websiteaccessibility.donaldevans.com/2011/06/22/tabindex-to-control-focus-tab-order/
[browser-supported shortcuts]: http://www.howtogeek.com/114518/47-keyboard-shortcuts-that-work-in-all-web-browsers/
