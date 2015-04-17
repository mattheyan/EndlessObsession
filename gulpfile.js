var gulp = require('gulp');
var wintersmith = require('wintersmith');

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
