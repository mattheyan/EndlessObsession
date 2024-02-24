---
layout: ../../layouts/MarkdownPostLayout.astro
title: "So Long Octopress, Hello Wintersmith"
slug: "so-long-octopress-hello-wintersmith"
date: 2015-04-18 15:20
pubDate: 2015-04-18
comments: true 
categories: 
---

[Octopress](http://octopress.org/) has been a popular hacker's blog for quite a
while, and so I made the switch a few years ago in order to escape the clutches
of Wordpress. Now I have a hack-able blog that also costs me nothing to host.

Unfortunately, Octopress isn't a good long-term fit. At the end of the day the
deal-breaker for me is the fact that it runs on ruby.

Don't get me wrong, ruby itself is just fine. But, if you've worked with ruby on
Windows you know that its full of pain all the way down. If you're thinking
about it, do yourself a favor and just don't do it.

Sure, I could have run Linux on a separate partition, or on a VM, or in the
cloud, etc. I have no problem doing that, except that it requires managing yet
another machine/OS. I'm already investing enough time automating Windows-based
workstations, so why ~~waste~~ spend my time on it if I don't have to?

So I set out to find an alternative that would work reliably on Windows, and
**run on node.js**. I targeted node because it generally *just works* on Windows,
and node and JavaScript in general are skills that I'm more interested in developing.
What I found was [Wintersmith](https://github.com/jnordberg/wintersmith).

--------------------------------------------------------------------------------

### What is Wintersmith?

Withersmith is described as a "flexible static site generator". Much like Jekyll
and Octopress, it automates creating a static site from separate templates and
content. For my purposes, content means primarily markdown files for blog posts.

From what I can tell, Wintersmith is closer to Jekyll than it is to Octopress.
In other words, its not focussed on being a blog, but due to its flexibility you
can easily use it to build your blog.

### Taking Wintersmith for a Test Drive

Before I migrated my blog, I first had to determine if it would meet my needs,
and whether I'd want to use it. The first step is to install Wintersmith.

```cli
npm install wintersmith -g
```

Since Wintersmith is a tool, it should be installed globally, thus the `-g` flag.

Next, use wintersmith to scaffold a new site.

```cli
wintersmith new <path>
```

At this point you can `cd` into the new directory that was created, and run
`wintersmith preview`, then navigate to the URL that prints out on the console.

Conveniently, the starter site that is generated is a simple blog, so it looks
like a good starting point. However, it will take some work to make it more or
less on-par with the Octopress version. And I'm only going to go as far as
"good enough".

### A Fresh Start

Before I dive into the nitty gritty of the migration, I want to make a quick note
about source control. Since I was using Octopress previously, my blog had been
a fork of the Octopress repository. As you might imagine, not only is this a
terrible way to distribute a blog generator, but it also meant that my repository's
history was a mess.

In order to get a fresh start, I chose to move to an orphan branch and seed it
with the existing Octopress repository files. From there I could create a branch
for the migration, and then merge that into master when complete.

The end result would be two different branch graphs. One would be the old Octopress
blog, and the other would be my new Wintersmith blog. The new wintersmith blog
history would look something like this:

	* d4e924a	[master] Add new post '...
	|\
	| * 043ed82  [octopress-to-wintersmith] Update templates and styles
	| * 5a51c39  Migrate content to Wintersmith structure
	|/
	* 8de24a8	Import files from Octopress

Alternatively I could have chosen to re-create the master branch from the
beginning of my fork of Octopress, but that would have been more difficult so I
decided against it. After all, I do need to start writing content again...

### Migrating the Site

1) Remove old Octopress files

Once I had my new orphan branch set up, the first thing to do is remove a bunch
of files and directories that will no longer be needed. For me this was:
`.themes/`, `sass/`, `_config.yml`, `.rbenv-version`, `.rvmrc`, `.slugignore`,
`CHANGELOG.markdown`, `README.markdown`, `Rakefile`, `Gemfile`, `Gemfile.lock`,
`config.rb`, and `config.ru`. You might also have stuff in `.gitignore` that is
no longer needed.

2) Add new Wintersmith files

Assuming that you have node and wintersmith installed, and have created a
wintersmith site using the `wintersmith new <path>` command, copy everything
that wintersmith generated (except for the readme) into your repository.

3) Basic configuration

Fill in the `name`, `owner`, and description fields in `config.json`.

4) Move content (posts) to the new location

Octopress puts post markdown files in the `source\_posts` directory. Wintersmith,
on the other hand, looks in the `contents\articles` directory. In my case, I
was prefixing my URLs with 'blog', and so the posts will end up in `contents\blog`
instead, so you may need to tweak the commands below to fit your scenario.

You could try `remove \contents\articles` or `rm .\contents\articles -r -force`
in the case of PowerShell.

Then, to preserve source control history to some extent, `git mv source\_posts
contents\blog`.

5) Tweak the 'Paginator' Plugin

At this point, the paginator won't find any articles to list out, because it
expects to find sub-directories, each with a single `index.md` file. This makes
sense because it closely aligns with the way that the desired URLs will ultimately
map to the '.htm[l]' files that wintersmith generates, but it is slightly
inconvenient in a number of ways, so I chose to preserve the Octopress approach
of a list of '.md' files at the top-level. In order to accomplish this, you have
to customize the process a bit.

Edit the `getArticles` function in `plugins\paginator.coffee` so that it looks
like this (based on
[Marco Carag's blog](http://marcocarag.com/2014/03/30/migrating-my-blog-s-content-to-wintersmith/)):

```coffeescript
getArticles = (contents) ->
	# helper that returns a list of articles found in *contents*
	articles = []
	for key, value of contents[options.articles]
		articles.push value if value instanceof env.plugins.Page
	
	articles.sort (a, b) -> b.date - a.date
	return articles
```

You should now have a functional site, however there are many differences
between the old site and the new site (including URLs), so unless you want a
bunch of links to break, there is still work left to do.

6) Customize URLs

Article URLs look something like '/articles/yyyy-mm-dd-some-slug/', but I want
them to be '/blog/some-slug' for backwards compatibility.

Create a file `plugins\blog.coffee` and paste in the following code (based on
[Marco Carag's blog](http://marcocarag.com/2014/03/30/migrating-my-blog-s-content-to-wintersmith/)):

```coffeescript
path = require 'path'
slugify = require 'slugg'

replaceAll = (string, map) ->
  re = new RegExp Object.keys(map).join('|'), 'gi'
  return string.replace re, (match) -> map[match]

	module.exports = (env, callback) ->

  defaults =
    postsDir: 'articles' # directory containing blog posts
    template: 'article.jade'
    filenameTemplate: '/:year/:month/:day/:file/index.html'
    stripTrailingSlash: false

  # assign defaults for any option not set in the config file
  options = env.config.blog or {}
  for key, value of defaults
    options[key] ?= defaults[key]

  class BlogpostPage extends env.plugins.MarkdownPage
    ### DRYer subclass of MarkdownPage ###

    getUrl: (base) ->
      result = super(base)
      if (options.stripTrailingSlash and result[result.length - 1] == '/')
        return result.substr(0, result.length - 1)
      else
        return result

    getTemplate: ->
      @metadata.template or options.template or super()

    @property 'rawFilenameTemplate', 'getRawFilenameTemplate'
    getRawFilenameTemplate: ->
      @metadata.filenameTemplate or options.filenameTemplate or super()

    getFilenameTemplate: ->
      raw = @rawFilenameTemplate

      if raw[0] is '/'
        # already an absolute path
        return raw
      else
        # prevent base page class from resolving paths
        return '/' + raw

    getFilename: ->
      rawFileNameTemplate = @rawFilenameTemplate

      dirname = path.dirname @filepath.relative

      filename = super()

      # enable custom 'slug' metadata propery
      filename = replaceAll filename,
        ':slug': @slug

      if rawFileNameTemplate[0] is '/'
        # remove leading slash from filename template
        filename = '/' + filename

      if filename[0] is '/'
        # filenames starting with a slash are absolute paths in the content tree
        return filename.slice(1)
      else
        # otherwise they are resolved from their directory in the tree
        return path.join dirname, filename

    @property 'slug', 'getSlug'
    getSlug: ->
      @metadata.slug or slugify(@title+'')

  # register the plugin
  prefix = if options.postsDir then options.postsDir + '/' else ''
  env.registerContentPlugin 'posts', prefix + '**/*.*(markdown|mkd|md)', BlogpostPage

  # done!
  callback()
```

You'll also need to add it to the 'plugins' key in `config.json`. This will
allow you to customize features of your blog posts, including URLs, default jade
template, etc. You'll also need to install the 'slugg' module via npm (and save
it in your package.json file) -> `npm install slugg --save-dev`.

Add this to `config.json` to set a default template:

```javascript
"blog": {
	"template": "article.jade"
}
```

This also enables URL customization, and the default template is
"/:year/:month/:day/:file/index.html", so your article URLs will now look like
'/yyyy/mm/dd/some-slug/'.

For backwards compatibility I need by URLs to look like '/blog/some-slug', so I
changed the template to "/blog/:slug/index.html" (:slug is an optional 'slug'
key in the markdown file, or the slug based on the title, I needed a 'slug'
option b/c some of my Octopress slugs were different from what Wintersmith would
generate, its a good idea to hard-code them all for the import, and I will
probably do this moving forward as well, so that I have more control over the
URLs).

```javascript
"blog": {
	"template": "article.jade",
	"filenameTemplate": "/blog/:slug/index.html"
}
```

There is a trailing slash in the URL links to posts, so use the
'stripTrailingSlash' option to remove it. This is not a functional change, but
it helps to be able to more easily compare the old and new output.

```javascript
"blog": {
	"template": "article.jade",
	"filenameTemplate": "/blog/:slug/index.html",
	"stripTrailingSlash": true
}
```

7) Fix Archive and Paging Links

My article URLs are correct, but the archive and "paging" links are
'/archive.html' and '/page/1/', respectively. I want them to be '/blog/archives'
and '/blog/page/1' instead.

Before making these changes, I want the contents structure to more accurately
match the generated site structure, so move the blog files that I currently have
into a 'blog' folder.

```javascript
"blog": {
	"postsDir": "blog",
	"template": "article.jade",
	"filenameTemplate": "/blog/:slug/index.html",
	"stripTrailingSlash": true
},
"paginator": {
	"articles": "blog",
	"filename": "blog/page/%d/index.html",
	"perPage": 3
}
```

Move the archive template into the 'blog folder': `mv .\contents\archive.json
.\contents\blog\archives\index.json`.

In 'index.jade': change `a(href='/archive.html')` to `a(href='/blog/archives')`.

Finally, I renamed the 'article.jade' template to 'post.jade'.

```javascript
"blog": {
	"postsDir": "blog",
	"template": "post.jade",
	"filenameTemplate": "/blog/:slug/index.html",
	"stripTrailingSlash": true
}
```

8) Atom Feed and Sitemap

Now the last couple of things to take care of are generating an Atom feed, and
generating a sitemap.

The sitemap is relatively easy:

`npm install wintersmith-contents --save`

`npm install wintersmith-sitemap --save`

Add 'wintersmith-contents' and 'wintersmith-sitemap' to the 'plugins' key in
`config.json`.

The Atom feed will be a bit trickier, so we'll need to create a custom template
for it: `templates\atom.jade`.

	<?xml version="1.0" encoding="utf-8"?>
	- var articles = _.first(env.helpers.getArticles(contents), 20);
	- var canonicalUrl = locals.url.lastIndexOf('/') === locals.url.length - 1 ? locals.url : locals.url + '/';
	feed(xmlns='http://www.w3.org/2005/Atom')
	  title= '' + locals.title + ''
	  link(href=canonicalUrl + 'atom.xml', rel='self')
	  link(href=canonicalUrl)
	  updated= moment(articles[0].date).format()
	  id= canonicalUrl
	  author
	    name
	        | <![CDATA[
	        = locals.owner
	        | ]]>
	  generator(uri='http://wintersmith.io/') Wintersmith
	  for article in articles
	    - var permalink = canonicalUrl + (article.url.indexOf('/') === 0 ? article.url.substring(1) : article.url)
	    entry
	        title(type='html')
	            | <![CDATA[
	            = article.title
	            | ]]>
	        link(href=permalink)
	        updated= moment(article.date).format()
	        id= permalink
	        //- passing locals.url resolves all relative urls to absolute
	        content(type='html')
	            | <![CDATA[
	            = article.metadata.excerpt || article.getHtml(locals.url)
	            | ]]>


### Wrap Up

I'm sure I left out a few details, but that should get you 80% of the way there.
If you have questions feel free to hit up the comments below.
