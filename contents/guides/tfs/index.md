---
template: page.jade
title: Team Foundation Server
comments: disabled
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

#### Undo change in another user's workspace
```
tf undo /workspace:WORKSPACE;USER $/path/to/item
```

#### Delete a user's workspace

http://msdn.microsoft.com/en-us/library/ms245474.aspx#TFWorkspace

```
tf workspace /delete OtherWorkspace;DOMAIN\OtherUser
```
