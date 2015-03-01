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
