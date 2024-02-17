---
date: '2011-01-10 07:54:17'
pubDate: 2011-01-10
layout: ../../layouts/MarkdownPostLayout.astro
slug: a-brief-introduction-to-exoweb
status: publish
title: A Brief Introduction to ExoWeb
excerpt: A Brief Introduction to ExoWeb. What it is and what it can do.
wordpress_id: '186'
categories:
- exoweb
- javascript
- programming
tags:
- exoweb
- javascript
- programming
---

[A while back](https://mattheyan.github.io/EndlessObsession/blog/exo-suite-and-client-scripts-on-github) I talked about the ExoWeb project and scripts that are now hosted on github.  That post was a little vague because not much has been documented about what you can actually do with ExoWeb.  That’s what I hope to do here.

First off, let me restate the purpose of ExoWeb as simply as I can.  ExoWeb exists to bridge the gap between the client and server.  You can think of it as a combination client-server mapper and model-view mapper.

## Client Server Mapping

When I say that ExoWeb is a client-server mapper what I mean is that it handles mapping from an object model on the server to the client (and vice versa) in much the same way that an ORM maps from a database schema to an object model.  The general idea is that you’re persisting objects and that you would like to be able to easily manipulate those objects in JavaScript code, without any extra work.

For example, say you have a C# class that is persisted to a database using your choice of ORM.

```cs   
public class Person
{
	public string FirstName { get; set; }
	public string LastName { get; set; }
	public string FullName
	{
		get
		{
			return FirstName + " " + LastName;
		}
	}
}
```

You would want to be able to write JavaScript code to modify this object like so (ignoring the details of the syntax [1]).

```javascript
person.set_FirstName("Bob");
```
ExoWeb aims to let you do this with very little effort.

What are some of the things that you might want to do with the model?
	
* Have the full name automatically reflect the fact that the first name is now “Bob”
* Save these changes by simply calling a method
* “Round trip” to the server to perform complex or sensitive operations
* Display the person’s information in a view

…which leads us to the next primary area of functionality.

## View Model Mapping

You have a model on the client, so now you want to display some information to the user and possibly accept input.  What are some of the tools that you might want to have at your disposal?

* Create regions in your form that correspond to lists in the model
* Two-way binding of properties to inputs elements and form regions
* Respond to changes and redraw parts of the form as needed
* Attach behavior to the form such as clicking links, toggling regions, etc
* Take advantage of model metadata like formats, allowed values, validation rules, etc
* Allow for lazy loading of certain information when it is needed on the form

That’s a glance at the basic features that we want from ExoWeb.  So, what does it actually look like?

_Disclaimer:  ExoWeb is under heavy development, so this stuff is always changing.  Feedback is welcome._

## Setting up a Page

First off we have to include the ExoWeb script(s).  Take a look at the [github repo](http://github.com/mattheyan/exoweb) to see what’s available.  The “dist” folder contains 3 scripts: exoweb-msajax.js, exoweb-msajax-nojquery.js, and jquery.exoweb-msajax.js.  For now we’ll just include exoweb-msajax.js.  ExoWeb currently also requires jQuery (1.3 or 1.4) and the MsAjax client libraries (specifically, MicrosoftAjax.js and MicrosoftAjaxTemplates.js).  These will be included in the repo in the near future.

_Side note:  ExoWeb currently uses the MsAjax client libraries, primarily for two purposes: observer and integrated template rendering.  In the near future these dependencies should be isolated so that other implementations could be used.  For example, better integration with jQuery is a personal goal of mine._

Now that we have the right scripts included we need to set up the page’s context.  This tells ExoWeb what data to load and what to do before and after it is loaded.  We do this by calling the $exoweb function.  It accepts a JavaScript object with any of the following properties.

* model: A JavaScript object that defines the data to load from the server.
* types: An array of types to load.  This is usually not needed since types are automatically loaded based on the “model” parameter.
* init:  A function that is invoked as soon as model or type data has been requested.
* contextReady: A function that is invoked as soon as the model or type data has been loaded, but before the UI is rendered.
* domReady: A function that is invoked after the UI has been rendered.

You can call $exoweb any number of times, and as an example our query might look something like this (please forgive the contrived example).

```javascript
$exoweb({
	init: function() {
		ExoWeb.UI.Template.load("/path/to/template");
	},
	types: [
		{
			from: "CustomWidget",
			and: ["this.CustomInformation"]
		}
	],
	model: {
		widget: {
			from: "Widget",
			id: "1",
			and: ["this.Type.DefaultPrice"]
		}
	},
	contextReady: function() {
		context.model.widget.doSomething();
	},
	domReady: function() {
		$(".widget input[type=button].save").click(function() {
			context.server.save(context.model.widget);
		});
	}
});
```

During init we want to load an external template file.  I will talk more about this in the future, but for now I will say that ExoWeb allows you to bind parts of your form to a dynamic template that is selected based on the HTML element and the data that will be rendered.  This allows you to break out reusable templates for common display scenarios, but it also allows your form to be dynamic in the sense that the markup can change automatically based on user input.

The types and model portions are what trigger requests to the server.  This will load up all of the metadata that is needed, as well as the instance data for the instances and paths that you specify.  When the context is ready it will have a model property that contains a property for each thing that you requested (in this case, the widget).

Context ready allows you to perform custom operations after all of your data is loaded.  For example, if you have an add/edit page you can perform setup logic that may be needed only in the add scenario.

DOM ready is a good place to put any DOM manipulation code that is specific to your page and it’s data and templates.  For general UI behavior I would recommend using jQuery to attach behavior as needed based on css selectors (a topic for another day).  Notice here the use of the “server” object, which is found on the context.  The server object allows you to save, round trip, raise events, and inspect the changes that have occurred.

Now, to display this on the form we might write something like this.

```html
<div class="sys-template widget" sys:attach="dataview"
	dataview:data="{~ context.model.widget, source={{ window }} }">
	<h3>Editing <span>{binding Name}</span></h3>
	<div class="sys-template" sys:attach="dataview" dataview:data="{@ Type }">
		<label>Type:</label>
		<select class="sys-template" sys:value="{binding systemValue}"
			sys:attach="dataview" dataview:data="{binding options}">
			<option value="{binding systemValue}">{binding displayValue}
				</option>
		</select>
	</div>
	<div class="sys-template" sys:attach="dataview" dataview:data="{@ Price }">
		<label>Price:</label>
		<input type="text" sys:value="{binding displayValue}" />
	</div>
	<input type="button" class="save" value="Save" />
</div>
```

The form is not rendered until the “widget” object has been loaded.  Also, notice the “@” extension that is used to incorporate metadata in the form.  For a pick list it will give you the list of options for a particular property.  Also, for other properties it allows you to automatically convert from and to a “system” or “display” format.  In a nutshell, the “display” format is a human-readable form of the underlying data that also includes format conditions for things like email, phone number, etc, while the “system” format is not intended to be shown to a user but instead can be used to uniquely identify an object.

This has been a very brief introduction to ExoWeb.  There is much more to talk about and you can expect follow up posts in the near future.
