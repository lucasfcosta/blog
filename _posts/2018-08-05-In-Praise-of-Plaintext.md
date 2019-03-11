---
layout: post
title: In Praise of Plain Text
author: Lucas Fernandes da Costa
place: London, United Kingdom
flag: 🇬🇧
tags: plain-text terminal interfaces
---

I often joke that **graphical interfaces are bloatware**.

GUIs are, of course, very useful for a great variety of applications and plain-text is not always appropriate for every kind of information. However, [**graphical interfaces are far from being optimal when it comes to what we do as software engineers**](https://brandur.org/interfaces).

[**Graphical interfaces limit your actions to the extent of what their creators envisioned you would want to do**](http://www.danieldavis.com/what-the-gui-cost-architecture/). Thus limiting your creativity, your range of possibilities and discouraging thinking outside the box.

To mitigate this problem **GUIs tend to contain features that many of their users don't need**.

> "Bloatware is software that has unnecessary features that use large amounts of memory and RAM. Software comes to be known as bloatware when it becomes so unwieldy that its functionality is drowned out by its useless features. This is also known as software bloat."
> <br>— [Techopedia](https://www.techopedia.com/definition/4237/bloatware)

[On the other hand, the terminal encourages people to write programs that do one thing and do it well and programs that work together](https://homepage.cs.uri.edu/~thenry/resources/unix_art/ch01s06.html).

Smaller programs combined allow you to perform a wider range of tasks than a single big program.

[Text streams are the universal interface which enables this](https://en.wikiquote.org/wiki/Doug_McIlroy). Text streams are simple and elegant. Even if you cannot find a program that does what you want, it becomes easy for you to write one.

Due to this, you are virtually able to do anything as long as you know which programs to combine.

Now you may argue that knowing how to use these programs is, most of the times, more difficult than knowing how to use a graphical interface. I completely agree with that. 

GUIs tend to be better for performing actions one or very few times because you can simply explore menus and find-out which button does what you want.

In the meanwhile, the terminal allows less exploration. You have to read manuals and figure out which are the "magic words" you need to use to make something happen.

However, due to the fact that we use few tools very frequently, it pays off to learn these textual commands. [As time goes by these commands become easier to remember than clicking around on graphical interfaces](https://brandur.org/interfaces). This is why **the efficiency of graphical interfaces is inversely proportional to the frequency you use them**.

**Graphical interfaces are more costly to develop** for a variety of reasons:

1. They need way more thought than a text-based interface. Textual commands are more precise than other visual elements, so there is less room for ambiguity.
2. They take more time to test and are harder to automate. Even when it is possible to write automated tests, they tend to be less reliable: we still need human eyes to detect certain problems. Okay, machine learning and computer vision can help us with that, but let's be real: we're not quite there yet. Even if we were, that would still be more expensive.
3. If you want to design a truly great application you will either need to study usability, graphical design, interaction design or pay someone to do that.

**Graphical interfaces become obsolete much more quicker**. As the cost of maintaining a GUI-based application is higher it will usually take more time and require more work to be updated.

As graphic design evolves it will eventually not only "look bad", but might even present the wrong visual abstractions if it is not constantly updated. Try naming one GUI based application that has been around for longer than `grep`, `sed` or `awk` with so few changes. Spoiler: you can't, no matter how small that application is.

I'm not saying that graphical interfaces are useless, far from that. What I'm saying is that they tend to not be optimal for an engineer's job.

**Text is timeless, precise and elegant, we should use it more**.
