# gulp-debug-cleaner
A gulp plugin which allows you to clean your code of blocks debug code.

##**DISCLAIMER**
**This plugin is still in experimental stages - use at your own risk.**

##Example
This gulp task will remove blocks of code surrounded with the `//#START-DEBUG` and `//#END-DEBUG` lines
```javascript
var gulp = require('gulp');
var debugCleaner = require('gulp-debug-cleaner');

gulp.task('clean:debug-code', function() {
	return gulp
			.src('./src', { base: '.' })
			.pipe(debugCleaner({
				startTag: '#START-DEBUG',
				endTag: '#END-DEBUG'
			}))
			.pipe(gulp.dest('.'));
});
```
###Sample Source Code
Before using the `debugCleaner`.
```javascript
function greetings() {
	//#START-DEBUG
	console.log('entered greetings...');
	//#END-DEBUG
	for(var x = 0; x < 10; x++) {
		console.log('Hello, World!');
	}
	//#START-DEBUG
	console.log('exiting greetings...');
	//#END-DEBUG
};
```
After using the `debugCleaner`.
```javascript
function greetings() {
	
	for(var x = 0; x < 10; x++) {
		console.log('Hello, World!');
	}
	
};
```
