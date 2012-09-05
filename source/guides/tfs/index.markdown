---
layout: page
title: "Team Foundation Server"
comments: true
sharing: true
footer: true
---

## Command-Line 

[MSDN](http://msdn.microsoft.com/en-us/library/z51z7zy0.aspx)


#### Determine status in all users' workspaces

```
tf status $/path/to/item /recursive /user:*
```

```
tf status $/path/to/item.txt /user:*
```


#### Get a list of merge candidates

```
tf merge /candidate /recursive $/source $/target
```


#### Completely destroy a folder

```
tf destroy $/path/to/item /noprompt /silent
```
