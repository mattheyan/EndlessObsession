---
date: '2011-01-10 10:28:34'
layout: post
slug: into-to-client-server-mapping-in-exoweb
status: publish
title: Intro to Client-Server Mapping in ExoWeb
wordpress_id: '187'
excerpt: An introduction to client-server mapping in ExoWeb.
categories:
- exoweb
- javascript
- programming
tags:
- exoweb
- javascript
- programming
---



As a follow up to my [Brief Introduction to ExoWeb](www.google.com), I would like to go into more detail about the communications between client and server.

The client interacts with the server in two basic ways.



	
  1. Pulling information: type and instance data.

	
  2. Pushing information: changes to the model and/or instructions to do something.


The first type, pulling information, is pretty straightforward. Type information doesn’t change (frequently) so it is actually cached on the client if possible. Querying for instance data is similar to querying a database. You request an object of a particular type with a particular id, but you can also include a set of paths that tell the services what additional related data you are interested in. The primary component of a query might look something like this.







    
    { from: "Person", id: "1", and: ["this.Additional.Properties.To.Load"] }








The second type, pushing information, gets a little more interesting. If you’re going to sync data between two disconnected systems there are two primary approaches that you might take. First, you could send simple data from point A to point B, manipulate it, then send it back from point B to point A in the same form. As you could imagine this can get pretty expensive and tedious. Of course, you might just send the portions of data that have changed to cut down on overhead. The bigger problem, I think, is that you don’t really know what has happened unless you do full graph comparisons. Another approach is to keep track of _changes_ as they occur and send those back and forth. This is what ExoWeb does.







    
    changes: [ { type: "ValueChange", instance: { id: "1", type: "Person" }, property: "FirstName", oldValue: "Rob", newValue: "Robert" }, ... } ]








The client can also raise events, for example “save”, a built-in event. In response, the server can send back additional changes to the model.







    
    changes: [ { type: "Save", idChanges: [ { type: "Person", from: "?4", to: "644" } ] }, ... ]








The payload isn’t limited to data. It can also include conditions, for example, permissions, or invalid data conditions. More on that later.

This has been a very basic introduction to the way client-server communication works in ExoWeb. Look out for more updates in the future.


