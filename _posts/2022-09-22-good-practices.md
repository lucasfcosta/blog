---
layout: post
title: "Books about good practices are just books about someone's opinion"
author: Lucas Fernandes da Costa
place: London, United Kingdom
flag: 🇬🇧
tags: books reading good-practices
---

Good practices don't exist. There are practices you agree with and practices you don't. Everything else is subjective.

Clean Code, for example, is not a book about clean code. It's a book about what the author considers to be clean code. Even Bob Martin himself acknowledges that.

> _[...] Don't make the mistake of thinking that we are somehow "right" in any absolute sense. There are other schools and other masters that have just as much claim to professionalism as we. It would behoove you to learn from them as well._

Therefore, I will not accept "because Uncle Bob said so" as a valid argument in a technical discussion, and neither should you.

Don't get me wrong. It's okay to have opinions. In fact, opinions are great, especially when you agree with them. That doesn't mean opinions with which you disagree are useless.

When languages try not to be opinionated, for example, they try to please an audience that's too large and end up pleasing no one. Most of those languages also create competing standards (if any), causing their adopters to engage in endless meaningless discussions.

Take Go, for example. I love Go, even though I hate it sometimes. I don't agree with Rob Pike's opinions all the time, but the fact that he's got an opinion and built it into the language makes it easier for me to write it.

I hate how Go deals with Dates, for example, but I love that there's only one way of doing it.

Prettier is another excellent example. I don't agree with all of its conventions. Still, I prefer not to spend five hours debating whether to use semicolons.

The problem with opinions is when they're taken at face value and used as an [appeal to authority fallacy](https://en.wikipedia.org/wiki/Argument_from_authority) in an attempt to disguise them as facts.

I'm saying that because [the fact that a particular statement appears in print has no relationship to its likelihood of being correct](https://spacecraft.ssl.umd.edu/akins_laws.html).

Fellow authors will understand what I'm saying. As I was writing the 500-pages of [Testing JavaScript Applications](https://www.manning.com/books/testing-javascript-applications), I was forced to confront my own premises to articulate why I considered a particular practice to be better than another. I must also admit that, in a few instances, I realized I was wrong. When that happened, I pressed backspace (actually, `dd` because I wrote that book in `vim`) and moved on.

I firmly stand behind everything I wrote in that book. Still, I don't expect everyone to agree with every single word I've written. I don't expect everyone to agree with this blog post, either.

That's because every discussion involving subjective criteria must be driven by two principles.

The first is that a solution's effectiveness depends on the constraints of the particular instance of the problem it aims to solve. For example, although I'm a TDD devotee, I won't practice TDD when experimenting with a new framework. Similarly, it doesn't matter how much of a Haskell fanboy I am; sometimes, I'll choose TypeScript simply because it's easier to find contributors who know it.

In other words, opinions are contingent on constraints.

The second principle to which debaters must abide is that there is never a single possible solution. For any problem, there's always more than one possible solution. The difference between solutions is only the variables for which they optimize.

Although some may claim that [engineering is done with numbers and that analysis without numbers is only an opinion](https://spacecraft.ssl.umd.edu/akins_laws.html), sometimes it's possible for numbers to be measuring irrelevant aspects of the problem at hand.

Take benchmarks, for example. Whenever someone says that language A is faster than language B, your first question should be: "under which circumstances?"

That's because every benchmark will choose a particular finite set of examples to measure a programming language's "speed." Only in the examples measured can you firmly affirm one language is faster than another. It also goes without saying that sometimes you're not even optimizing for speed when choosing a programming language.

A more mundane example could be podcast recording, for example. If you were to start a podcast, you could either buy a pair of airpods and pay your editor a bit more, or you could buy [a $10,000 Brauner VM1S](https://mynewmicrophone.com/top-20-most-expensive-microphones-on-the-market-today/#List1) and edit it yourself. The first option could be optimal for two dudes who desperately need an editor to cut out all the nonsense they discuss about politics. The second would be more suited for reasonable people discussing music and whose audience is audiophiles.

To summarise, opinions are valuable tools to avoid discussing aspects of a problem that are not critical to its solution. Still, when subjective aspects are critical, you must consider the differences between _your_ problem and the problems other recommendations aim to solve. Furthermore, you should also be aware that any problem has multiple possible solutions; the only difference between them is the variables for which they optimize.
