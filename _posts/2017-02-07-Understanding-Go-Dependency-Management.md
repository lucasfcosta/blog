---
layout: post
title : "Understanding Dependency Management in Go"
author: Lucas Fernandes da Costa
tags : go golang dependency godep
---


<br>

Hi, everyone! As you may have noticed I'm really interested into Go and since I fell in love with this language I'd like to write about it more frequently.

If you don't know Go yet I really think you should learn it. [Go is awesome](https://www.youtube.com/watch?v=rFejpH_tAHM)!

Go is a relatively young language and when it comes to vendoring and dependency management it still isn't really mature yet. The Go community, however, has been adopting some practices and creating tools to supply this demand. This is what we are going to talk about today.

<br>

## **Understanding The Go Ecosystem**

Go aims to use simplicity to achieve complex tasks and therefore make the language more fun and productive. Since the beginning of the language, the Go team chose that they would use string literals to make the import syntax arbitrary to describe what was being imported.

This is what is written in their own docs:

> An explicit goal for Go from the beginning was to be able to build Go code using only the information found in the source itself, not needing to write a makefile or one of the many modern replacements for makefiles. If Go needed a configuration file to explain how to build your program, then Go would have failed.

To achieve this goal, **the Go team favors conventions over configurations**. These are the conventions adopted when it comes to package management:

1. The import path is always derived in a known way from the source code's URL. This is why your imports look like: `github.com/author/pkgname`. By doing this we also get an automatically managed namespace, since these online services already manage unique paths for each package.
2. The place where we store packages in our file system is derived in a known way from the import path. If you search for where `go` stores the packages you download you will be able to relate it to the URL it was downloaded from.
3. Each directory in a source tree corresponds to a single package. This makes it easier for you to find source code for certain packages and helps you organize your code in a standardized way. By tying the folder structure to the package structure we don't need to worry about both at the same time, because file system tools become package management tools.
4. **The package is built using only information from the source code**. This means no `makefiles` and no `configuration` and frees you from having to adopt specific (and probably complicated) toolchains.

Now that we've said that, it is easy to understand why the `go get` command works the way it does.

<br>

## **Understanding Go Tools' Commands**

Before we get into these commands let's understand what is the "[`$GOPATH`](https://github.com/golang/go/wiki/GOPATH)".

The `$GOPATH` is an environment variable that points to a directory which can be considered as a workspace directory. It will hold your source codes, compiled packages and runnable binaries.

<br>

### `go get`

The `go get` command is simple and works almost like a `git clone`. The argument you must pass to `go get` is a simple repository URL. In this example, we will use the command: `go get https://github.com/golang/oauth2`.

When running this command, `go` will simply fetch the package from the URL you provided and put it into your `$GOPATH` directory. If you navigate to your `$GOPATH` folder you will now see that you've got a folder in `src/github.com/golang/oauth2` which contains the package's source files and a compiled package in the `pkg` directory (alongside its dependencies).

Whenever you run `go get` you should have in mind that any downloaded packages will be placed in a directory that corresponds to the URL you used to download it.

It also has a bunch of other flags available, such as `-u` which updates a package or `-insecure` which allows you to download packages using insecure schemes such as HTTP. You can read more about "advanced" usage the `go get` command at [this link](https://golang.org/cmd/go/#hdr-Download_and_install_packages_and_dependencies).

Also, according to `go help gopath`, the `go get` command also updates submodules of the packages you're getting.

<br>

### `go install`

When running `go install` in a package's source directory it will compile the latest version of that package and all of its dependencies in the `pkg` directory.

<br>

### `go build`

Go build is responsible for compiling the packages and their dependencies, **but it does not install the results!**

<br>

## **Understanding Vendoring**

As you might have noticed by the way Go saves its dependencies, this approach to dependency management has a few problems.

First of all, we are not able to determine which version of a package we need unless it is hosted in a completely different repository, otherwise `go get` will always fetch the latest version of a package. This means that if someone does a breaking change to their package and don't put it in another repo you and your team will end up in trouble because you might end up fetching different versions of the same package and this will then lead to "works on my machine" problems.

Another big problem is that, due to the fact that `go get` installs packages to the root of your `src` directory, you will not be able to have different versions of your dependencies for each one of your projects. This means that you can't have projects which depend on different versions of the same package, you will either have to have one version or the other at a time.

**In order to mitigate these problems, since Go 1.5, the Go team introduced a `vendoring` feature. This feature allows you to put your dependency's code for a package inside its own directory so it will be able to always get the same versions for all builds.**

Let's say you have a project called `awesome-project` which depends on `popular-package`. In order to guarantee everyone in your team will use the same version of `popular-package` you can put its source inside `$GOPATH/src/awesome-project/vendor/popular-package`. This will work because `Go` will then try to resolve your dependencies' path starting at its own folder's `vendor` directory (if it has at least one `.go` file) instead of `$GOPATH/src`. This will also make your builds deterministic (reproducible) since they will always use the same version of `popular-package`.

**It's also important to notice that the `go get` command won't put the downloaded packages into the `vendor` folder automatically.** This is a job for vendoring tools.

When using vendoring you will be able to use the same import paths as if you weren't, because `Go` will always try to find dependencies in the nearest `vendor` directory. There's no need to prepend `vendor/` to any of your import paths.

In order to be able to fully understand how vendoring works we must understand the algorithm used by Go to resolve import paths, which is the following:

1. Look for the import at the local `vendor` directory (if any)
2. If we can't find this package in the local `vendor` directory we go up to the parent folder and try to find it in the `vendor` directory there (if any)
3. We repeat step 2 until we reach $GOPATH/src
4. We look for the imported package at $GOROOT
5. If we can't find this package at $GOROOT we look for it in our $GOPATH/src folder

Basically, this means that **each package can have its own dependencies resolved to its own vendor directory**. If you depend on package `x` and package `y`, for example, and package `x` also depends on package `y` but needs a different version of it, you will still be able to run your code without trouble, because `x` will look for `y` in its own `vendor` folder while your package will look for `y` in your project's vendor folder.

Now, a practical example. Let's say you've got this folder structure:

```
$GOPATH
  src/
    github.com/user/package-one/
      one.go
    myproject
      main.go
      vendor/
        github.com/user/package-one/
          one.go
      client/
        client.go
        vendor/
          github.com/user/package-one/
      server/
        server.go
        vendor/
          github.com/user/package-one/
            one.go
```

If we imported `github.com/user/package-one` from inside main.go it would resolve to the version of this package in the `vendor` directory at the same folder:

```
$GOPATH
  src/
    github.com/user/package-one/
      one.go
    myproject
      main.go <-- Importing package-one from here
      vendor/
        github.com/user/package-one/ <-- resolves to here
          one.go
      client/
        client.go
        vendor/
          github.com/user/package-one/
      server/
        server.go
        vendor/
          github.com/user/package-one/
            one.go
```

Now if we import the same package in `client.go` it will also resolve this package to the `vendor` folder in its own directory:

```
$GOPATH
  src/
    github.com/user/package-one/
      one.go
    myproject
      main.go
      vendor/
        github.com/user/package-one/
          one.go
      client/
        client.go <-- Importing package-one from here
        vendor/
          github.com/user/package-one/ <-- resolves to here
      server/
        server.go
        vendor/
          github.com/user/package-one/
            one.go
```

The same happens when importing this package on the `server.go` file:

```
$GOPATH
  src/
    github.com/user/package-one/
      one.go
    myproject
      main.go
      vendor/
        github.com/user/package-one/
          one.go
      client/
        client.go
        vendor/
          github.com/user/package-one/
      server/
        server.go <-- Importing package-one from here
        vendor/
          github.com/user/package-one/ <-- resolves to here
            one.go
```

<br>

## **Understanding Dependency Management**

Now that we've learned all of these things about how `Go` handles imports and vendoring it's about time we finally talk about dependency management.

The tool I'm currently using to manage dependencies in my own projects is called [`godep`](https://github.com/tools/godep). It seems to be very popular and it works fine for me, thus I highly recommend you to use that too.

It is built around the way `vendoring` works. All you've gotta do to start using it is use the command `godep save` whenever you want to save your dependencies to your `vendor` folder.

When you run `godep save`, `godep` will save a list of your current dependencies in `Godeps/Godeps.json` and then copy their source code into the `vendor` folder. It's also important to notice that you need to have these dependencies installed on your machine in order for `godep` to be able to copy them.

Now you can commit the `vendor` folder and its contents to ensure everyone will have the same versions of the same packages whenever running your package.

Another interesting command is `godep restore`, which will install the versions specified in your `Godeps/Godeps.json` file to your `$GOPATH`.

In order to update a dependency all you've gotta do is update it using `go get -u` (as we've talked about earlier) and then run `godep save` in order for `godep` to update the `Godeps/Godeps.json` file and copy the needed files to the `vendor` directory.

<br>

## **A Few Thoughts on the Way Go Handles Dependencies**

At the end of this blog post, I would also like to add my own opinion about the way Go handles dependencies.

I think that Go's choice of using external repositories to handle package's namespaces was great because it makes the whole package resolution much more simple by joining the file system concepts with the namespace concepts. This also makes the whole ecosystem work independently because we've now got a decentralized way to fetch packages.

However, decentralized package management comes at a cost, which is not being able to control all the nodes which are part of this "network". If someone decides they're going to take their package out of `github`, for example, then hundreds, thousands or even millions of builds can start failing all of a sudden. Name changes could also have the same effect.

Considering Go's main goals this makes total sense and is a totally fair tradeoff. Go is all about convention instead of configuration and there is no simpler way to handle dependencies than the way it currently does.

Of course, a few improvements could be made, such as using git tags to fetch specific versions of packages and allowing users to specify which versions their packages will use. It would also be cool to be able to fetch these dependencies instead of checking them out on source control. This would allow us to avoid dirty diffs containing only changes to code in the `vendor` directory and make the whole repository cleaner and more lightweight.

<br>

## Get in touch!

**If you have any doubts, thoughts or if you disagree with anything I've written, please share it with me in the comments below or reach me at [@lfernandescosta on twitter](https://twitter.com/lfernandescosta)**. I'd love to hear what you have to say and do any corrections if I made any mistakes.

At last, but not least, make sure you take a look at [this awesome talk by Wisdom Omuya on GopherCon 2016](https://www.youtube.com/watch?v=6gdVhHMxNTo) in which he explains how Go Vendoring works and also points out some details about its inner workings.

**Thanks for reading this!**
