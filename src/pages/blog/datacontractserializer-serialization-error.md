---
date: '2010-07-12 17:55:36'
pubDate: 2010-07-12
layout: ../../layouts/MarkdownPostLayout.astro
slug: datacontractserializer-serialization-error
status: publish
excerpt: I recently encountered an exception with a message that looked something like this - "There was an error deserializing the object of type Foo.  No set method for property '' in type ''." Huh?
title: DataContractSerializer Read-Only Property Serialization Error
wordpress_id: '69'
---

I recently encountered an exception with a message that looked something like this:


There was an error deserializing the object of type Foo.  No set method for property '' in type ''.


Huh?

This was coming out of WriteObject (or a similar method) of DataContractSerializer (or DataContractJsonSerializer, or some other flavor).

If you see this error, don't be thrown off by the bizarre error message.  If my experience holds true this error is in fact caused by a read-only property.  Unfortunately, the error message won't give you any clues to what the property is, and the offending type is probably NOT the type Foo, as the error message suggests.

Description of my scenario:



	
  * Attempt to serialize an object with a property that is a list of WCF serializable objects (base type).

	
  * The last item in the list is a sub type, "Foo", that contains a property WITHOUT a setter. Serialization is ok.

	
  * After the item of type "Foo", another item of type "Bar" (a different sub type) is added. This type does NOT have any properties without a setter. Attempting to serialize the parent object now fails with message "There was an error deserializing the object of type Bar, My Assembly. No set method for property '' in type ''."


See this [ticket](https://connect.microsoft.com/wcf/feedback/details/525090/wcf-serialization-error-message-does-not-specify-type-and-method?wa=wsignin1.0#tabs) and this [stackoverflow post](http://stackoverflow.com/questions/1731572/error-using-wcf-and-datacontractserializer) (author describes a slightly different scenario) for more information.

Good luck! :)
