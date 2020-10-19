---
layout: post
title: Why does package-lock.json exist, and how does it work?
author: Lucas Fernandes da Costa
place: London, United Kingdom
flag: 🇬🇧
tags: package-lock.json lockfiles javascript npm
---

When writing JavaScript applications, you describe its dependencies using a `package.json` file. This file contains all of your applications direct dependencies and their versions.

If you're building a RESTful API using Express, for, example, your `package.json` file will probably list `express` as a dependency.

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "express": "4.0.0"
  }
}
```

Whenever you ask others to clone and run your application, they need to install its dependencies using `npm install`. Doing so will cause them to download the version `4.0.0` of Express.

<img style="margin-bottom: -18px;" src="/assets/package-lock1.png" alt="An image showing that your application points to the Express pacakge, meaning it depends on it.">
<center><i>Your application's direct dependency on Express.</i></center>

When installing Express, a package upon which your application depends, you will also download all of the packages upon which Express itself depends. Among the packages upon which Express depends, you can find, for example, [`send`](https://github.com/pillarjs/send), a package which provides a [static file server](https://stackoverflow.com/questions/28918845/what-exactly-does-serving-static-files-mean).

<img style="margin-bottom: -18px;" src="/assets/package-lock2.png" alt="Your application points to the Express package, which in turn points to the send package.">
<center><i>Express depends on `send`, which causes it to be downloaded when installing your application's dependencies.</i></center>

Additionally, when installing Express and, consequently, `send`, you will have to install the dependencies of `send`. Because `send` depends on [`mime-types`](https://github.com/jshttp/mime-types), , a utility package to handle [mime-types](https://en.wikipedia.org/wiki/Media_type), NPM will install also install `mime-types`.

<img style="margin-bottom: -18px;" src="/assets/package-lock3.png" alt="Your application points to the Express package, which points to the send package, which then points to the mime-types package.">
<center><i>The `send` package depends upon `mime-types`.</i></center>

Finally, when installing `mime-types`, NPM will notice that `mime-types` depends on [`mime-db`](https://github.com/jshttp/mime-db), and will install `mime-db` too.

<img style="margin-bottom: -18px;" src="/assets/package-lock4.png" alt="The dependency chain pointing from your application to express, then to send, then to mime-types, and, finally, pointing to mime-db.">
<center><i>NPM downloads the `mime-db` package when installing your application's dependencies because it's a dependency of other dependencies.</i></center>

The process of recursively downloads all of your packages' dependencies and the dependencies of those dependencies is what causes your `node_modules` folder to get heavy so quickly.

Even though you only listed `express` as a dependency, if you check your `node_modules` folder — the folder in which NPM stores dependencies — you will see that there are many more packages there.

```
▾ node_modules/
  ▸ accepts/
  ▸ array-flatten/
  ▸ body-parser/
  ▸ bytes/
  ▸ content-disposition/
  ▸ content-type/
  ▸ cookie-signature/
  ▸ cookie/
  ▸ debug/
  ▸ depd/
  ▸ destroy/
  ▸ ee-first/
  ▸ encodeurl/
  ▸ escape-html/
  ▸ etag/
  ▸ express/
  ▸ finalhandler/
  ▸ forwarded/
  ▸ fresh/
  ▸ http-errors/
  ▸ iconv-lite/
  ▸ inherits/
  ▸ ipaddr.js/
  ▸ media-typer/
  ▸ merge-descriptors/
  ▸ methods/
  ▸ mime-db/
  ▸ mime-types/
  ▸ mime/
  ▸ ms/
  ▸ negotiator/
  ▸ on-finished/
  ▸ parseurl/
  ▸ path-to-regexp/
  ▸ proxy-addr/
  ▸ qs/
  ▸ range-parser/
  ▸ raw-body/
  ▸ safe-buffer/
  ▸ safer-buffer/
  ▸ send/
  ▸ serve-static/
  ▸ setprototypeof/
  ▸ statuses/
  ▸ toidentifier/
  ▸ type-is/
  ▸ unpipe/
  ▸ utils-merge/
  ▸ vary/
  package-lock.json
  package.json
```

These packages are not only Express' dependencies, but also the dependencies of _all_ dependencies.

This dependency download process would be beautiful if it weren't for the fact that **`npm install` doesn't necessarily install the same dependencies given the same `package.json` file**.

Running `npm install` in the afternoon can cause you to get different dependencies when compared to the `npm install` your colleague ran in the morning, even though none of you changed the version of Express upon which the application depends, for example.

**Having different dependencies is a problem because it can cause the application to present inconsistent behaviour across different environments, which is yet another cause for headaches when you're trying to build reliable software**.

<br>

# Why the same `package.json` can cause `npm install` to download different dependencies

When listing dependencies in your `package.json` file, you can prefix their versions with a `^` or `~`. Each of these symbols will tell NPM that it doesn't necessarily need to download the exact version you specified. Instead, it will try to download a version which is "compatible" or "equivalent" to the one in `package.json`.

Imagine, for example, that you prepended `^` to Express' version number in your `package.json`.

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "express": "^4.0.0"
  }
}
```

In that case, if Express' maintainers release a fix and bump their version number to `4.0.1`, running `npm install` would install the `4.0.1` version, not the `4.0.0` as you've written in `package.json`.

Similarly, when Express' maintainers release a new feature and bump their version number to `4.1.0`, the `npm install` command will download `4.1.0`, which _should_ be compatible with the `4.0.0` version you listed in your `package.json`.

Most of the time, using `^` or `~` should _not_ cause problems, because, according to [semantic versioning](https://semver.org/), bumping `minor` — the middle version number — or `patch` — the rightmost version number — means that there are no breaking changes.

<img style="margin-bottom: -18px;" src="/assets/package-lock5.png" alt="In a 4.1.2 version, 4 is the major version number, which indicates breaking changes, 1 is the minor version number, which indicates new features, and 2 is the patch version number, which indicates fixes.">
<center><i>Bumping the leftmost version number indicates there have been breaking changes. The middle version number indicates a release contains new features. The rightmost number indicates fixes.</i></center>

However, given enough time, all humans make mistakes. They may, for example, bump the `minor` or `patch` when there's a breaking change, causing builds to break like I once did when I incorrectly released breaking changes to [Chai](https://www.chaijs.com/) and [bumped the wrong version number](https://github.com/chaijs/chai/issues/862), causing millions of builds to break around the world.

So does this mean that _not_ using `^` or `~` causes `npm install` to _always_ download the same dependency tree? No, it doesn't 🙃

**Even though you may not add `^` or `~` in front of your dependencies' versions, your dependencies may list _their_ dependencies using `^` or `~`, which can cause `npm install` to download different versions depending on the time you've run it.**

If you've specified Express' `4.0.0` version as a dependency, but Express itself listed `send` as a dependency using `^1.0.0`, for example, you could end-up downloading the version `1.0.1` of `send` in the morning, and version `1.0.2` in the afternoon.

Therefore, if the `send` package's maintainers release breaking changes and incorrectly tag them as `1.0.2`, your application could break even though you locked _your application's_ dependencies by avoiding `^` and `~`.

<br>

# How `package-lock.json` solves the unstable dependency problem

The `package-lock.json` file lists your application's dependencies and the dependencies of all its dependencies. In other words, it describes which version of every single package you have installed. That's why it's so much longer than `package.json`.
Whenever you use `package-lock.json` to install dependencies, you will get the exact same packages, it doesn't matter whether you're installing them now or in a thousand years when we'll hopefully not be using keyboards anymore.

To install dependencies based on your `package-lock.json` file, you should use `npm ci` instead of `npm install`.

By using `npm ci` you will be able to avoid problems which happen when an application works in your machine, but doesn't work in someone else's because they ended up downloading different dependencies due to using `npm install`.

That's why, whenever running your builds in a [continuous integration server](https://www.jamesshore.com/v2/blog/2006/continuous-integration-on-a-dollar-a-day), you should install dependencies using `npm ci` instead of `npm install`. Doing so will cause the CI server's build to run just like it had run in your machine.

**The reason `package-lock.json` may change automatically when you run `npm install` is because NPM is updating the `package-lock.json` file to accurately reflect all the dependencies it has downloaded since it may have gotten more up-to-date versions of some of them.** Once NPM updates the `package-lock.json` file, others can get those exact same versions by using `npm ci` if they want.

<br>

# Security and `npm ci`

Sometimes, [evil human-beings will obtain control of other people's NPM credentials and release new versions of packages by bumping the package's `patch` version number, causing millions of dependants to download the malicious piece of code](https://snyk.io/blog/a-post-mortem-of-the-malicious-event-stream-backdoor/).

It's enough for a single package in your entire dependency tree to be compromised for you to end-up downloading the malicious code. Sometimes, the compromised package will not even be a direct dependency of your application or even a dependency of one of your application's dependencies. It may be, for example, a dependency of a dependency of a dependency of a dependency.

Because `npm ci` will cause you to download the exact same packages every time, it will be less likely for you to install malicious code given you have taken the necessary security precautions.

<br>

# Why does `npm install` exist if we have `npm ci`?

_Most of the time_, package maintainers will bump the correct version numbers when releasing features or fixes, and there is no harm in having these features and fixes in. If anything, they may make your application faster or solve a bug you have.

In other words, having `npm install` makes it easier to get the "best" versions of packages: the ones with more features and fixes.

Essentially, `npm install` and `npm ci` exist for slightly different purposes. While the former installs the latest possible versions of your dependencies, the latter installs the exact same versions you had when you last used `npm install`.

An additional advantage of using `npm ci` is its quicker execution. The `npm ci` command runs faster than `npm install` because it doesn't need to check what's the latest compatible version of a package. Instead, it knows exactly which version to fetch thanks to the exhaustive dependency list in `package-lock.json`. [In some cases, dependency installations can happen twice as fast](https://blog.npmjs.org/post/171556855892/introducing-npm-ci-for-faster-more-reliable).

The fact that `install` doesn't by default use `package-lock.json`, is somewhat controversial, though. Some people would advocate that updating dependencies by default is significantly dangerous and that one should be very explicit when doing it.

<br>

# Should I use `npm install` or `npm ci`?

Personally, I like to use `npm install` whenever I'm installing dependencies myself, and `npm ci` in all my scripts.

I use `npm install` when installing dependencies myself because, in that case, I can vet which versions I get and make sure that I'll be using the latest versions of packages, which can include bug fixes, performance improvements, and new features.

On the other hand, I don't want any of my scripts to update dependencies because machines running automated builds can't vet the packages they get. Instead, I want these scripts to reproduce the dependencies I had during development time.

Additionally, I want machines' builds to be deterministic. Given the same commit hash, I want today's build to yield the same results as next month's build.

In regards to pinning dependencies, I only pin those dependencies whose `minor` or `patch` version bumps cause my application not to work as it should. On other cases, I'm okay to get automatic updates and vet them myself.

<br>

# An analogy with analogue photography

A `package-lock.json` file is the equivalent of a negative film.  If you want others to reproduce the exact same photo you've taken, you can handle them your negative film, and every print from that negative will look precisely the same.

Similarly, when others install your application's dependencies using a `package-lock.json` file, they will get the exact same dependencies, every single time.

The `package.json` file, on the other hand, is like a list of instructions on describing how you've taken a particular photo. It may include, for example, the camera you've used, the location from which the photo was taken, and the time of day you did the click.
Even though others may follow your instructions to the letter, their photos will be slightly different depending on the weather or the surrounding environment.

In the same way, when others install dependencies using a `package.json` file, their dependency tree will be similar to yours, but not exactly the same.

<br>

# A note on `^` and `~`

Throughout this post, I've used `^` and `~` interchangeably; however, they have slightly different semantics.

The `~` character downloads the latest possible version with _fixes_. If you have specified a version using `~1.0.1`, for example, you may get the packages' `1.0.2` or `1.0.11` versions, but not `1.1.0`.

The `^` character, on the other hand, allows you to download any _non-breaking_ versions. In case you specify a version using `^1.1.0`, you may get, for example, `1.2.0`, or `1.1.2`.

You can find the complete documentation for how semantic versioning works in NPM [in this link](https://docs.npmjs.com/misc/semver).
