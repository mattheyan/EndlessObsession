var slugg = require('slugg'),
	moment = require('moment'),
	minimist = require('minimist'),
	fs = require('fs'),
	wintersmith = require('wintersmith'),
	gulp = require('gulp');

gulp.task('build:release', function(callback) {
	var env = wintersmith('./config-release.json');
	env.build(function(error) {
		if (error) {
			throw new Error(error);
		}
		callback();
	});
});

gulp.task('preview', function(callback) {
	var env = wintersmith('./config-dev.json');
	env.preview(function(error) {
		if (error) {
			throw new Error(error);
		}
		callback();
	});
});

gulp.task('create:post', function(callback) {
	// https://github.com/gulpjs/gulp/blob/master/docs/recipes/pass-arguments-from-cli.md
	var knownOptions = { string: 'title', default: { title: 'New Post' } };
	var options = minimist(process.argv.slice(2), knownOptions);

	var title = options.title;
	var slug = slugg(title);
	var date = moment().format("YYYY-MM-DD HH:mm");
	var fileContents = "---\r\n" +
		"layout: post\r\n" + 
		"title: \"" + title + "\"\r\n" + 
		"slug: \"" + slug + "\"\r\n" + 
		"date: " + date + "\r\n" + 
		"comments: true \r\n" + 
		"categories: \r\n" + 
		"---\r\n";

	var postsDir = __dirname + '\\contents\\blog';
	var fileName = moment().format("YYYY-MM-DD") + "-" + slug + ".md";
	var filePath = postsDir + '\\' + fileName;
	fs.writeFile(filePath, fileContents, function(error) {
		if(error) {
			throw new Error(error);
		}
		callback();
	});
});
