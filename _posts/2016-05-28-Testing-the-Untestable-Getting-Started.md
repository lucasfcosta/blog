---
layout: post
title : Testing the Untestable: Getting started
author: Lucas Fernandes da Costa
tags : coding javascript testing stubs spies
---

This is the first article of a series I called "Testing the Untestable". In these articles I am going to talk about how to test things that were previously "untestable" or at least hard to test. I'm going to share some techniques with you as well as interesting libraries and helpful modules.

Since I became a member of the [Chai](https://github.com/chaijs/chai) core team I have been reading and answering lots of questions related to software testing and this made me realize how important it is to test things right.

But before we jump into technical content, let me convince you how important is this. I want you to realize that **your testing code is as important as your application code**.

<br>

# ***Okay, how important is this?***

**This is very, very important.** In software engineering there is something called [the Boehm's Curve](paulhammant.com/2012/11/01/testability-and-cost-of-change/), a phenomena which correlates the cost of bugs with the time taken to find them. In it, Barry Boehm states that the more time is taken to find a bug the more expensive it will end up costing.

This means that if you are able to spot bugs earlier your company will also save more money and therefore will be able to spend it making better software, instead of paying for errors.

To improve your chances of spotting bugs earlier we need to have as much code coverage as possible and this is why it's important to "test the untestable".

<br>

# ***Seems good, is this all I should know?***

Actually not. There's much more involved.

Detecting bugs early is just the tip of the iceberg. When writing tests there are other things you should be concerned about, let's talk about them.

**You should write tests to prove your code does not work**. Yes, that is right, write tests to prove your code fails, not to prove it works. If you do this you will increase the chances of finding bugs, because you will focus more on the fragile parts instead of the ones you already know that work.

**Writing adequate assertions** is probably the most important part of every test. Without adequate assertions you could have 100% code coverage and still find lots and lots of bugs. 100% of code coverage doesn't necessarily mean your code is totally bug free, it just means that none of the assertions you wrote have failed. Keep this in mind when writing tests, if you aren't looking at the right places you are may be missing a bug.

**Keep your tests modular and independent**. Test as little as possible on each test and make sure one test does not depend on another. If you do this you will be able to find the exact point of failure instead of going through a cascade of errors until you find what went wrong. Thrust me, this will save you a lot of time (keep your eyes open for my next post on Spies and Stubs).

**Your tests should be as easy to understand as your application code is**. Creating readable testing code also ensures that your teammates will be able to understand what is the goal of the test and keep it into the scope. This will also make it easier for them to add new assertions to the right places instead of creating duplicated code. I also recommend that you use [Chai's BDD interface](http://chaijs.com/api/bdd/) to write your assertions, this will help you to keep things simple since it has a nice API which is very close to the english language.

> Any fool can write code that a computer can understand. Good programmers write code that humans can understand.

**Go through every single branch of execution**. This is probably the most obvious advice of this list. When testing your code, go through every execution branch and don't forget to [check the boundaries](https://en.wikipedia.org/wiki/Boundary_testing) of conditions too.

<br>

# ***Whoa, that's a lot. What is going to be covered into these posts?***

These are some of the topics I plan on covering on this series of posts:

* Stubs and Spies
* Testing HTTP/Server responses
* Testing HTML pages and client side testing
* Testing on multiple platforms
* Minor Interesting topics
    * Fake Timers
    * Benchmark Tests
    * Load Testing
    * Useful assertions and other testing tools
* Notes on Black Box Testing 

<br>

# *** I can't wait for it! ***

So keep your eyes open for further posts! I plan on posting the first article of this series on next week.

For now you can follow me on [GitHub](https://github.com/lucasfcosta) and [Twitter](https://twitter.com/lfernandescosta).

See you on the next post :)
