---
date: '2010-02-10 17:26:00'
pubDate: 2010-02-10
layout: ../../layouts/MarkdownPostLayout.astro
slug: encryption-and-varbinary
status: publish
title: Encryption and VARBINARY
wordpress_id: '6'
excerpt: A tale of encrypted data in SQL server and the "TrimTrailingSpace" option.
categories:
- database
tags:
- database
- encryption
- programming
- sql
- sql server
---

Data loss is a scary thing.  In one of the apps I have worked on it is particularly scary since some of the data is encrypted.  In the beginning it was encrypted in such a way that it would be (hopefully) impossible to retrieve without the proper authorization.  Essentially, the data would be junk if a finite number of users forgot their passwords.  This was always lurking in the back of my mind.  (You've never forgotten your password, have you?)  Luckily we dropped that approach, but I didn't anticipate how we would actually lose data.

One day I discovered an interesting error was occurring.  (Only in hindsight can I refer to it as "interesting".)  It was a _CryptographicException_:  Length of the data to decrypt is invalid.  The application was attempting to load some encrypted data from the database and was repeatedly failing on a particular record.  This is not good.

At first I thought:  "Maybe there is a character or combination of characters in the source text that is causing the problem."  Looking back I can see that it was a poor attempt at an explanation.  To be fair, I was alerted to the problem by a user who also informed me that he had used a random text generation feature (possibly for the first time), so I was a little biased.  I was able to verify that the data was an odd size (as expected) and the encryption algorithm expected blocks of a certain number of bytes.  However, I could not reproduce the bug since I had no idea what the original source text was.

Fast-forward a week or two.  The problem occurs again, but this time the user is working with a known value.  I crack open the test system and, lo and behold, the error is reproducible!  After doing some debugging and tracing I come to the conclusion that SQL Server is truncating my data.  (How rude!?)  From there it didn't take long for me to discover an interesting property of the column in question.  Getting info on the table told me that the "TrimTrailingSpace" property was true (which corresponds to [_ANSI PADDING_](http://msdn.microsoft.com/en-us/library/ms187403.aspx)).  It doesn't take a genius to figure out that something is wrong with that.

Luckily I found [_this article_](http://support.microsoft.com/kb/296559), which indicates that any alter of the column will turn off "TrimTrailingSpace", just what I wanted.  So, what did I do?  Something like this:

```sql
ALTER TABLE MyTable
ALTER COLUMN MyColumn VARBINARY(xxx);
```

Problem solved!
