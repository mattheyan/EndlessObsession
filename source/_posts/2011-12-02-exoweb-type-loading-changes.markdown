---
date: '2011-12-02 09:19:55'
layout: post
slug: exoweb-type-loading-changes
status: publish
title: ExoWeb type loading changes
excerpt: Types are now batch loaded in ExoWeb. The following is an explanation of the changes.
wordpress_id: '215'
---

I recently [posted a message](http://groups.google.com/group/exosuite/browse_thread/thread/83ed447767348b75) to the ExoSuite Google Group in regards to type loading in ExoWeb.


## Batch loading


Types are now batch loaded. This means that prior to type caching your pages should only send a single type request (or very few depending on your usage). This was implemented to cut down on the large number of requests sent from the browser, since browsers have limits on the number of concurrent request.

You don’t have to do anything to enable this functionality.


## Type loading and rules


We noticed that a surprisingly large number of types were being requested, and some of them didn’t seem like types that should be needed. I was able to track this down to the “AllowedValues” rule, which was force loading types when instantiated. Since this rule is very common, and often spans types, this would result in a cascading type loading effect. I changed the rule’s active type loading behavior to a passive approach: it becomes enabled when the relevant types are loaded.

There are two possible side-effects of this change that come to mind.

First, if you happen to have an allowed values property on a type that is neither the containing type of the property or the property type, then the rule may never be enabled, even if the data is all loaded and editable. This is an odd scenario that shouldn’t happen in practice. To illustrate, if type Person has a property Org of type Organization, and its allowed values are World.AllOrganizations, and type World is not used, then the rule will never be activated. The only way that this example makes sense is if the type World is a required type for the entire app (or feature area), and so will always be available.

Second, if you are not actually referencing a type in your query paths but subsequently used that type in templates/scripts or expected a $extend to fire when the type was loaded, then in the past you may gotten away with this because of the overly aggressive nature of type loading. Now, types are only loaded because they are referenced in your queries or are otherwise required for object loading (i.e. due to lazy loading). One caveat: several other rules (e.g. CompareRule) may still force type loading to occur. They are less likely to actually change the nature of type loading, but still this behavior may also be changed in the future for other rules.

The moral of the story: don’t depend on rules to perform type loading.
