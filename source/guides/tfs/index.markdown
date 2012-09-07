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

#### Checkin with code reviewer

*From notes in "Community Content" on the [MSDN documentation page (2005 version)](http://msdn.microsoft.com/en-us/library/c327ca1z.aspx)*

```
tf checkin /notes:"Code Reviewer=Some person" $/path/to/item
```

#### List merge conflicts

*Note: if there are merge conflicts then this operation will return a non-zero exit code.*

```
tf resolve /recursive /preview
```
