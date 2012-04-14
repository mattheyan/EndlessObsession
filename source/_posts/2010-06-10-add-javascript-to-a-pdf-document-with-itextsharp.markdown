---
date: '2010-06-10 18:58:00'
layout: post
slug: add-javascript-to-a-pdf-document-with-itextsharp
status: publish
title: Add JavaScript to a PDF Document with iTextSharp
wordpress_id: '9'
categories:
- pdf
tags:
- adobe javascript
- documents
- iTextSharp
- javascript
- pdf
- programming
---

_Originally posted June 8 2010_

As you might have guessed from the title, this post is of the “get it done” variety.  So, the code may be a little rough.  Its the sort of code that works, but isn’t fully understood (by me at least).  I wasn’t able to find a clear example on the net, so I pieced together examples and guesses based on reading the code and interpreting method and class names.

Why guess?  Well, [iTextSharp](http://sourceforge.net/projects/itextsharp/) is a pretty robust open source project which is useful for creating and manipulating PDF documents.  The problem is, it doesn’t seem to have any useful documentation online.  It **_is_** open source, so you can read the code all day.  Also, there are some tutorials that you can download from the [files page](http://sourceforge.net/projects/itextsharp/files/) (in the examples folder).

The goal was to have a PDF document print automatically from a web page.  I decided to pass on coming up with a cross-browser (read: works in IE) method for automatically printing the document on the client, and instead decided to insert JavaScript into the generated PDF document that would cause it to print when opened.  This is what I came up with.





PdfReader reader = new PdfReader(inputStreamOrFile);




int pageCount = reader.NumberOfPages;




Rectangle pageSize = reader.GetPageSize(1);




// Setup writer




PdfDocument document = new PdfDocument(pageSize);




PdfWriter writer = PdfWriter.GetInstance(document, outputStreamOrFile);




document.Open();




// Copy each page




PdfContentByte content = writer.DirectContent;




for (int i = 0; i < pageCount; i++)




{




document.NewPage();




PdfImportedPage page = writer.GetImportedPage(reader, i + 1); // page numbers are one-based




content.AddTemplate(page, 0, 0); // x and y correspond to position on the page?




}




// Insert JavaScript to print the document after a fraction of a second (allow time to become visible).




string jsText = "var res = app.setTimeOut('var pp = this.getPrintParams();pp.interactive = pp.constants.interactionLevel.full;this.print(pp);', 200);";




//string jsTextNoWait = "var pp = this.getPrintParams();pp.interactive = pp.constants.interactionLevel.full;this.print(pp);";




PdfAction js = PdfAction.JavaScript(jsText, writer);




writer.AddJavaScript(js);


document.Close()




As for the JavaScript, the call to setTimeOut is there so that the PDF is rendered before the print dialog is shown.  Otherwise, the users will see the print dialog and a blank page, which may be confusing.  If the PDF is not visible anyway (as in my case) then you don’t really need the timeout.  The actual printing is based on the documentation of Acrobat JavaScript from [Adobe’s website](http://livedocs.adobe.com/acrobat_sdk/9.1/Acrobat9_1_HTMLHelp/wwhelp/wwhimpl/js/html/wwhelp.htm?href=JS_API_AcroJSPreface.87.6.html&accessible=true).  In this example, the [iteration level](http://livedocs.adobe.com/acrobat_sdk/9.1/Acrobat9_1_HTMLHelp/wwhelp/wwhimpl/js/html/wwhelp.htm?href=JS_API_AcroJSPreface.87.6.html&accessible=true) is set to “full”, meaning that the user will get the print dialog and progress feedback.  You can also use “automatic” (no dialog, includes progress) and “silent” (no dialog or progress).
