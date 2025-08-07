---
layout: post
title : Code Coverage Made Easy
author: Lucas Fernandes da Costa
place: Florianópolis, Brazil
flag: 🇧🇷
tags : coverage tests javascript
---

Let's not get lost into all that "testing your software is important" thing. I really hope you already know that.

In this post I'm gonna teach you how to test your software using [Gulp](http://gulpjs.com/) and [gulp-mocha](https://www.npmjs.com/package/gulp-mocha) and then get code coverage reports using [gulp-istanbul](https://github.com/SBoudrias/gulp-istanbul). For assertions we're going to use [Chai](http://chaijs.com/).

You will also learn how to upload your code coverage to [coveralls.io](https://coveralls.io) so you can keep track of it and have a nice badge on your repository's README.md file.

<br />

# ***LET'S START THIS, FAST***

**Whoa, calm down champ, one thing at a time.**

First of all let's **create a module**, so we will have something to test. 

**If you already have something to test and don't want to waste your time creating a new dummy module please skip the next two chapters and go straight to "*Can we finally go on to gulp?*"**

Open your terminal and run `npm init`. Fill in all the requested information and it will generate a `package.json` file for you.

Now we're going to run these commands in order to **install every module we need**:

```console
$ npm install -g gulp
$ npm install --save-dev gulp
$ npm install --save-dev gulp-mocha   
$ npm install --save-dev gulp-istanbul
```

At this time you may be wondering: "*why did I install Gulp two times?*".  You did it because we need to have gulp available at the command line so we can run commands such as `gulp test`. Then you installed it using the `--save-dev` flag, which installs Gulp locally and saves it into your module's `devDependencies`, this means everyone who runs `npm install` at your module's directory will have Gulp downloaded so they can run the tasks you've created.

After installing Gulp itself we installed [gulp-mocha](https://www.npmjs.com/package/gulp-mocha) to run our tests and at last, but not least, we have also installed [gulp-istanbul](https://github.com/SBoudrias/gulp-istanbul) so we can check our code coverage data.

<br />

# ***Hey, wait, what about the module?***

Well observed, sir, we do not have the module's code yet. For this tutorial we will create a simple module that does sums and subtractions.

This is our module's code:

##### **coolModule.js**
```javascript
var coolModule = {};

coolModule.doSum = function(a, b) {
  return a + b;
}

coolModule.doSubtraction = function(a, b) {
  return a - b;
}

module.exports = coolModule;
```

Put your `coolModule.js` file inside a folder called `src`.

<br />

# ***Okay, but we still have no tests...***

Don't worry, we will have some very soon.

As we will use gulp-mocha to run tests, we're going to write a test file using mocha's features, obviously. These are our tests:

##### **tests.js**
```javascript
var coolModule = require('./index.js');
var assert = require('chai').assert;

describe('Cool Module', function() {
    it('should do sums correctly', function() {
        var result = coolModule.doSum(1, 2);
        assert.strictEqual(result, 3);
    });

    it('should do subtractions correctly', function() {
        var result = coolModule.doSubtraction(2, 1);
        assert.strictEqual(result, 1);
    });
});
```

Put this `tests.js` file inside a folder called `test`.

<br />

# ***Can we finally go on to gulp?***

**YES! We finally can!**

Now we've got our module and our tests ready to run we will create some gulp tasks to test our module and then get coverage information.

Before writing actual tasks we will need to `require` some modules.

##### **gulpfile.js**
```javascript
var gulp = require('gulp');

// Mocha, our test framework
var mocha = require('gulp-mocha');

// Istanbul, our code coverage tool
var istanbul = require('gulp-instanbul');
```

Okay, now let's create a task called "pre-test". This task will be responsible for piping our module's files into istanbul, by doing this we will be able to know which parts of our code were tested and which weren't.

##### **gulpfile.js**
```javascript
gulp.task('pre-test', function() {
    // This tells gulp which files you want to pipe
    // In our case we want to pipe every `.js` file inside any folders inside `test`
    return gulp.src('test/**/*.js')
      .pipe(istanbul())
      // This overwrites `require` so it returns covered files
      .pipe(istanbul.hookRequire());
});
```

All we've gotta do now is create a task (that depends on the `pre-test` task) to actually run our tests. This is it:

##### **gulpfile.js**
```javascript
gulp.task('test', ['pre-test'], function() {
    // Here we're piping our `.js` files inside the `lib` folder
    gulp.src('lib/**/*.js')
        // You can change the reporter if you want, try using `nyan`
        .pipe(mocha({reporter: 'spec'}))
        // Here we will create report files using the test's results
        .pipe(istanbul.writeReports());
});
```

Feel free to run your tests running `gulp test` on your terminal.
The results will be located at a folder called `coverage`.

<br />

# ***That's nice! How can I upload this to coveralls.io?***

First of all go to https://coveralls.io/sign-up and sign up. If this is your first time at coveralls and you logged in using GitHub you may need to authorize access to your GitHub account.

Now click on [`REPOS`](https://coveralls.io/repos) (at the upper left corner) and then on [`ADD REPOS`](https://coveralls.io/repos/new) (at the upper right corner).

Select your desired repository and turn on the activation button. When clicking on `DETAILS` you will be able to see what is your token. Save this token into a file called `.coveralls.yml` on your repository's root folder.

The last thing we should do is to create a very simple task using [gulp-coveralls](https://www.npmjs.com/package/gulp-coveralls) so we can send the coverage report to [coveralls.io](https://coveralls.io).

##### **gulpfile.js**
```javascript
// Don't forget to add this line to the top of your gulpfile.js
var coveralls = require('gulp-coveralls');

gulp.task('coveralls', ['test'], function() {
    // lcov.info is the file which has the coverage information we wan't to upload
    return gulp.src(__dirname + '/coverage/lcov.info')
      .pipe(coveralls());
});
```

Aaaaaaaaaaand we're finally done! Run `gulp coveralls` and you will get your coverage data uploaded to coveralls.

**Oh, and before I forget, here comes a nice tip:** if you want to upload your coverage results only when running the coveralls task from a CI service, like [travis-ci](http://travis-ci.org/), your `coveralls` task should be something like this:

```javascript
gulp.task('coveralls', ['test'], function() {
    // If not running on a CI environment it won't send lcov.info to coveralls
    if (!process.env.CI) {
        return;
    }

    return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
      .pipe(coveralls());
});
```

<br />

# ***What do these `branch`, `statement`, `function`, `line` criteria mean?***

* **Function Coverage** indicates how many functions were executed
* **Branch Coverage** indicates how many if/else branches were executed
* **Statement Coverage** indicates how many statements in the program were executed
* **Line Coverage** indicates how many lines were executed

<br />

# ***Is there anything else I should be aware of?***

Yes, there actually is!
Inside `coverage/lcov-report` there's a file called `index.html`, if you are having trouble getting 100% coverage on any possible criteria such as branches, functions or lines you should open this with your favorite browser and then you will be able to navigate through your project's files and see which parts aren't being tested.


<br />

**In this post you should've learned:**

- How to test your modules using Gulp, Mocha and Chai
- How to get coverage reports using Istanbul
- How to send your coverage reports to Coveralls
- The meaning of each coverage criteria
- How to spot what parts of your code aren't being tested
