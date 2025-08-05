---
layout: post
title : "Open Source Contributions Made Easy"
author: Lucas Fernandes da Costa
place: Florianópolis, Brazil
flag: 🇧🇷
tags : opensource OSS GitHub contributing
---



Hi, friends! Sorry for taking too long to post something new, but I have come back from the UK recently, where I've had a great day with some friends at [Voxxed Days Bristol](https://voxxeddays.com/bristol/).

Recently, I have also been dealing with some rough situations in my life so I thought it would be good for me to start writing about something that is not too technical and is one of my greatest passions in life: contributing to Open Source projects.

In this blog post I will teach you **how to find projects to contribute to**, **how to find issues to solve**, **how to actually solve them** and finally I will also give you some **tips about open source etiquette**.



## [**The Myth of the Genius Programmer**](https://www.youtube.com/watch?v=0SARbwvhupQ)

This is a very popular myth among developers. Many of us believe that we're inferior and that we're not great developers because we will never be "that guy" who has all of those awesome projects with more than 5,000 stars on GitHub or because we do not work at Google, Facebook, Microsoft and so on. But we're not.

In order to contribute to an Open Source project you just need time and disposition to dive into a codebase you don't know yet. It's just like any other job you would ever have.

**The more you contribute to Open Source projects, the better you will get at it.** This will help you decrease the time you need to send your first contribution as time goes by and this also applies to real world jobs™.

**Don't worry, you are good enough!**



## **Finding a Project to Contribute to**

Obviously, the first thing we must do is find a cool project to contribute to. So here goes a few criteria I recommend you to take into account when choosing a project to contribute to.



#### 1. Choose something you already use

By choosing something you already use you will be saving a lot of time just by not having to read all of its docs again to understand its API and how it is supposed to work.

This helps you write tests, since all you gotta do is use the same API you already know to check if it has the expected output.

You will also be able to dive into the code with more confidence since you will be able to see how it does what you already know it does instead of trying to figure out why those methods, checks and special cases exist.



#### 2. Look for "easy-fix" or "good-for-beginners" labels

Many projects have labels to identify issues that are easy for beginners to solve.

These issues will be the first ones you will probably want to solve, but if you can't find any "easy" issues, go for the "medium" ones. These categories are too subjective and sometimes "medium" issues may be a lot easier than they seem to be.

**The important thing here is that you choose an issue to solve.** If you start reading the codebase randomly you will probably get confused and lose your motivation very fast since you will have trouble finding changes to do and then you will probably feel like you are doing nothing and that you never will.

**When you have a problem to solve this will guide the way you read the code and you will be rewarded when you finish it.**

Human brain demands rewards after doing its tasks in order to keep us motivated, use this to your advantage.

I also highly recommend you to take a look at this repository which has a catalog of projects with these kinds of labels.

If you need help finding a project with these labels, take a look at [this Github repo](https://github.com/MunGell/awesome-for-beginners).



#### 3. Check if a project is active

After finishing coding your first contribution you will want someone to review and merge your code into the project, so make sure you find an active project.

In order to make sure a project is active, take a look at their issues and see the time it takes for maintainers to answer them and check if there are many open PRs that have not been answered.

If you find a project that is not active but you want to contribute to the community anyway you can always fork that project and maintain a version of it by yourself.



## **Writing Code**

It is really hard to tell people how they should solve problems, especially because there's no such thing as a silver bullet. Every problem is different and every project has its own structure so I'll try to be as generic as possible in this section and give you tips that will probably be useful for every project you find.



#### 1. Read code from top down

When diving into problems, start from the beginning. This might seem obvious, but many people let emotions and assumptions that are not backed by solid facts to get in their way.

Start by reading the example or test provided and dive into the code one method at a time. You will want your brain to act like a call stack. You read the first function called, then you read the function that one calls, then you read the function this last function calls and so on until no more functions are called, so you can come back and continue reading the first function's body.

This is what I'd do if I found this code, for example:

```javascript
// This is the example provided:
a();

// This is the library's code:
function a() {
    var boolOne = b();
    var boolTwo = c();
    return boolOne || boolTwo;
}

function b() {
    return d() && f();
}

function c() {
    e();
}

function d() {
    return true;
}

function e() {;
    return false;
}

function f() {
    return false;
}
```

1. Read the `a` function
2. Function `a` calls `b`, so I'll read `b`
3. Function `b` calls `d`, so I'll read `d`
4. Function `d` does not call any other functions, so now I can go back to the `b` function which called it
5. Function `b` calls `f`, so I'll read `f`
6. Function `f` does not call any other functions, so now I can go back to the `b` function again
7. Function `b` does not call any other functions, so I can go back to the `a` function
8. Function `a` calls `c`, so I'll read `c`
9. Function `c` calls `e`, so I'll read `e`
10. Function `e` does not call any other functions, so I can go back to `c`, which called it
11. Function `c` does not call any other functions, so I can go back to `a`

You don't necessarily need to follow this order if you are already sure any parts of the code are working. In the example above, if you were sure `b` was working you could just go straight to `c` and continue from there.

Also, in order to make sure `b` was working and then proceed from `c` you could add a `console.log` statement after it (or use a debugger) and make sure its output is correct.



#### 2. Read the stack trace

If you know in which method you can detect a bug or if you want to understand how a piece of code gets reached you can simply read the stack trace and then see which calls were made from where.

If you don't know how to read Stack Traces I highly recommend you to do read [my latest blog post on this matter](detect a problem) and get to know it deeply. Being able to read, understand and use them effectively is a very useful knowledge.

In order to get the stack trace until somewhere in the code, at least in JavaScript, all you need to do is use `console.trace`. If you are using an IDE you can also take a look at the stack it may display somewhere. Many people ignore this information but it is really useful.



#### 3. Don't try to understand it all at once

You will probably face a piece of code you do not understand when trying to solve a problem, but if you try to understand the whole project before writing any code you will get lost and lose motivation. Try to understand just the parts related to what you are doing and do one thing at a time.

If you can't understand something related to the problem you're solving, even after doing some research, try to see the values of variables and outputs produced throughout each part of that algorithm. Breaking a big problem into smaller problems almost always helps.



### 4. Start by writing tests

The easiest way to prove your code works is to provide a test for it. This will make it faster for you to spot the bug or check if the feature you just implemented works the way it is supposed to.

I won't describe all the advantages of writing tests first in this blog post, but, if you want to read more about it, you can see [my talk at JSDay Recife 2016](/talks/2016-11-26-Testes-em-JS-como-voce-nunca-viu-antes.html) (if you can understand Brazilian Portuguese) and read [this blog post about how to write good assertions](http://lucasfcosta.com/2017/01/02/How-to-Write-Assertions-Right.html).

**Writing tests is something most projects demand from their contributors and sometimes you will not get your Pull Request accepted if you don't write them.**.



#### 5. Read the contribution guidelines

Most projects (at least the big ones) have a file called `CONTRIBUTING.md` where they write general guidelines for their contributions, telling contributors how to run tests, how to build the project and what are all the necessary pieces of information for a Pull Request to get accepted. Also, make sure you read the `README.md` file, which is one of the main sources of knowledge about a project and may contain links to other interesting material.

Pay attention to this file because doubts may have their answers here. If `CONTRIBUTING.md` is not updated it is also another good opportunity for a Pull Request. It is very important to keep this file always up to date.



## **Creating your Pull Request**



#### 1. Putting your changes online

After you're done with your changes you must commit them to [your own fork of the repository](https://help.github.com/articles/fork-a-repo/) in order to be able to open a Pull Request. I highly recommend you to create a new branch with a reasonable name which identifies the change you've made. If you solved a typo in an error message, for example, you might want to call your branch: `fix-typo-on-<error_name>`.

In order to create a new branch and do a checkout right after it, you can use the command: `git branch -b BRANCH_NAME`. Then commit it with `git commit -m "YOUR MESSAGE HERE"` and finally push it to your remote fork with `git push --set-upstream <REMOTE_NAME> <BRANCH_NAME>`. If you need help understanding how Git or GitHub works take a look at [these videos from their YouTube channel](https://www.youtube.com/watch?v=HwrPhOp6-aM&list=PL0lo9MOBetEHhfG9vJzVCTiDYcbhAiEqL).



#### 2. Writing the body of your Pull Request

I like to use [`Sinon`'s Pull Request Template](https://github.com/sinonjs/sinon/pull/1208) to write the body of my Pull requests and I highly recommend you to do so.

If you don't want to follow that, here is what I think are the most important pieces of information to include:

* Short description of what is the problem you are solving or the feature you are implement
* Examples of how you could reproduce it before or examples of how the new syntax explaining how your changes work in depth
* An explanation of how you chose to fix it and (if you can) why you did it this way

I always consider it very important to thank the ones reading and reviewing your Pull Request. These people are doing a great job for a community and (in my opinion) we must always be thankful for having them around and pushing the project forward on their own free time. This is not mandatory, but why would you not do it?

When explaining how your code works, make sure you add links to the lines of code you are referring to, this makes it easier for other people to see what you're talking about and this also speeds up the review process. To get the link to a line of code in your Pull Request you just need to click on its number and copy the address in your browser. When referring to code outside of your Pull Request you can do the same, but make sure that you press `y` before doing it. By pressing `y` you can make sure you will always be referring to a single commit and not the last commit in a branch (which will probably change as time goes by).



#### 3. Doing further changes

As you may imagine, sometimes you will make mistakes and your code will need to be corrected, but don't be afraid to fail.

When making changes to your code make sure you understand what your reviewer meant and, if you still don't, just ask him whatever doubts you may have. Communication is a very important part of the Open Source community, specially because most of the time people won't be able to meet in person or have video conferences or anything like this, so their last resort is plain text, which may not be as expressive as the previously mentioned options.

When committing changes that can be joined with the last commit in your Pull Request you can add files to the staging area by using `git add <FILE_NAME>` (as you would do normally) and then use `git commit --amend`, which will merge those changes into your last commit.

If you need to make changes that are related to a commit other than the last one and need to merge them into that commit you can simply commit your changes as you would normally do and then do a `git rebase -i HEAD~<NUMBER OF COMMITS BACK>`. The `git rebase -i` command allows you to move, edit, merge (squash or fixup) or reword commits. If you are not used to `git rebase` I highly recommend that you see [this material](https://git-scm.com/book/id/v1/Branching-Pada-Git-Rebasing).

If someone asks you to rebase your last commit into master (or any other branch) you just gotta get the latest version of the `master` branch, for example, checkout to your Pull Request's branch and then do a `git rebase master`. In order to fix conflicts, you can run `git status` to see conflicting files and edit them with your favorite text editor.



## **Open Source Etiquette**

Being polite is as important on the internet as it is in real life (even though many people don't think that way). So here go a few tips to avoid unnecessary conflicts and make everyone happier.



#### 1. When tackling an issue, let other people know

If you plan on solving an issue, make sure you leave a comment in it to let everyone know you will be working on it. This avoids duplication of work, which means you will not make someone else's work useless by sending your contribution first and neither will they do the same to you.



#### 2. Don't "steal" issues

I know that the goal of an Open Source project is to move it forward by adding features, fixing bugs and improving performance, but by solving an issue other people are already working on you might be ruining their chance to get involved and start contributing more often. Even if you can do it faster, give them a chance to learn and get involved.

My first pull requests were very simple and I'd have felt very bad if everytime I was about to send a contribution someone would have already done so.

If you feel like an issue is not moving forward or you don't know its status, just ask. Most times other people will just tell you they didn't have time to finish it yet and you will get your chance to tackle that issue.



#### 3. Ask before implementing something no one asked for

Even if you think a feature is an absolutely must-have and you can't live without it, ask project maintainers if they really want it incorporated into their code. This will help you avoid wasting your time doing changes that won't be used by anyone. All you gotta do if you think a project needs a feature or change is open an issue and explain why you think that is important.

Sometimes that feature may have implications you didn't think about or it may be outside the scope of the project.

Even if maintainers don't want it merged into their project, you can always create your own fork of it.



## Get in touch!

**If you have any doubts, thoughts or if you disagree with anything I've written, please share it with me in the comments below or reach me at [@thewizardlucas on twitter](https://twitter.com/thewizardlucas)**. I'd love to hear what you have to say.

**Thanks for reading this!**

