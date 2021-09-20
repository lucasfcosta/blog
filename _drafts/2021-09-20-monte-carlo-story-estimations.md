---
layout: post
title: "How to replace story points with a Monte Carlo method"
author: Lucas Fernandes da Costa
place: London, United Kingdom
flag: 🇬🇧
tags: product-development deterministic management
---

Guessing how long a story will take is a useless practice. It's useless because writing software is _not_ a mechanical activity, and, consequently, it's not deterministic. You can't accurately guess how long it will take to write a particular piece of code unless you have already written it.

Furthermore, software development is highly variable. The time it takes to write software doesn't scale linearly with the amount of code you write. Writing a single-line fix can take as long as implementing a thousand-line feature, but, until you have done both, you can't really tell which is more time-consuming.

Therefore, we can consider software development to be a [stochastic](https://en.wikipedia.org/wiki/Stochastic) process, and, consequently, use stochastic modeling techniques to devise better estimations. One of these techniques is the [Monte Carlo method](https://en.wikipedia.org/wiki/Monte_Carlo_method), which I'll use in the rest of this post.

Hopefully, this post will save you and your colleagues from ever having to argue about whether something is worth two or three story points only to find out later that it was actually worth twenty-one (whatever that means).
