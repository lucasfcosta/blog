---
layout: post
title: Don't write software like you write books and other product building advice
author: Lucas Fernandes da Costa
place: London, United Kingdom
flag: 🇬🇧
tags: software-engineering continuous-delivery cd process
---

If you are not delivering early and delivering often, you might as well start a book publishing business.

Publishing books is hard because the feedback loop is long and slow. You can't validate a book unless you have already written it. When a publisher signs an author, they are taking an enormous risk because they have to get the entire book written, edited, printed, and distributed before they can profit. All of these steps take a long time and have very high costs, which can't be broken down. The book publisher only discovers whether their assumptions were right once the book is already at bookstores.

**Writing software is much easier because you don't have to build an entire product before you can sell it**. Distributing software usually takes a few seconds and costs virtually nothing. The fact that you can ship software several times a day at zero-cost allows you to make fewer assumptions when building it. You can validate one hypothesis at a time.

Now take e-books as an example. **E-books are, essentially, software**. Shipping an e-book has zero cost, no one needs to print or send e-books to physical bookstores. Yet, e-books are not much cheaper than physical books.

The price of an e-book can be justified because the *process* of creating an e-book is still very similar to the process of creating a physical book. It's possible to cut the printing and distribution costs, but it's not possible to de-risk it. Authors still need to write an entire book, and publishers still need to edit it before it can be sold. It's still a product which can't be validated up to the point it's on sale.

For the same reason, it's easier to sign J.K. Rowling for her thousandth Harry Potter book than it is to sign any new author. J.K. Rowling is guaranteed to sell; the new author isn't.

If companies build software the same way publishers sell books, they are not taking advantage of what makes their industry thrive.

**Building the wrong product is not a problem; the problem is finding that out too late**.

[Companies fail for building too much of the wrong product far more often than for building too little of the right one. Having a simple product that solves someone's problem is better than having a complex one that no one needs](https://www.cbinsights.com/research/startup-failure-reasons-top/).

When creating the right product, the only certainty you have is that, [eventually, you are going to fail](https://blog.ycombinator.com/author/yevgeniy-brikman/). You cannot prevent failure, but you can reduce its cost.

Embracing failure is a concept which is already present in many other areas of software development. Netflix knows it's not possible to write bug-free systems, so [they build fault-tolerant systems instead](https://www.youtube.com/watch?v=vu4Xkb1q8Tc). They also know that it's impossible to have perfect deploy processes, so [they deploy more often and in smaller increments](https://www.youtube.com/watch?v=7oEvlcUMqpE). Even if it were possible to write bug-free code, and have the ideal deploy process, maybe it would just be less costly to tolerate failure than to it would be to eliminate it.

**You cannot build the perfect product, but you can make the process of creating a fantastic product cheaper and faster**.

In the realm of software engineering, there is one major practice which impacts your ability to deliver the right product in a reasonable amount of time: delivering early and delivering often. Enterprises call it Continous Delivery. I don't wear suits, so I call it *"ship it"*.


## Delivering often de-risks projects

Delivering early and delivering often shortens the feedback loop between product building and product validation, and shortening the feedback loop helps you de-risk your product development process.

If you are building products for customers, they are the only ones who can tell you whether the product you are making is what they need. It's also fair to say that, sometimes, not even customers themselves will be able to tell you that. However, the best you can do is show it to them and [learn how to listen](https://www.youtube.com/watch?v=FG1Fa-t4AEQ).

If you start building a product on day 0 and show it to customers on day 89, it means that you have accumulated 90 days of risk. If you start building a product on day 0 and show it to customers on day 4, you have only accumulated five days of risk.

It may be the case that you only got about half of your decisions wrong, but even then it's cheaper to waste two days than two months. Delivering earlier and delivering often is more economical, not only because you have invested less time in it, but also because you have less to undo.

Delivering early decreases risk because it allows you to make fewer assumptions at a time. When you build a product in small steps, you take less time to find out whether you were wrong. [When you fail, it happens faster and costs less](https://www.bloomberg.com/news/articles/2007-06-24/fail-fast-fail-cheap).


## Delivering often generates more value

Code that sits in your VCS produces absolutely zero value until it's in production.

You are not paid to write code; you are paid to increase revenue. You increase revenue by making customers happy, and you make customers happy so that you will have more customers or so that they will pay you more.

You don't make customers happy by pushing commits to GitHub or by marking tasks as done on JIRA (*ugh*). You only make customers happy when you put your product in their hands.

By delivering earlier, your code provides value for more time. Delivered code produces value until the day someone deletes it. If you have two-week long sprints and you deploy once every sprint, your work takes up to 13 days to deliver any value.

Anyone who thinks passive income is a great idea should also believe that delivering early is a great idea. Allowing your code to rot in a VCS is the same as letting your money [lose its value](https://www.independent.co.uk/news/business/news/pound-v-euro-dollar-live-sterling-low-brexit-a9053586.html) in your bank account. Your money can work for you while you sleep in the same way that your code can deliver value to your customers without you having to do anything other than deploying it.


## Delivering often makes planning easier and better

When having code in production is your standard for completeness, you are forced to focus on delivering value instead of writing code.

**If you don't have to put a product in the hands of customers, any specification makes sense**. Shifting your goal towards having your work deployed rather than towards having it merged forces you to spend more time debugging requirements. More time spent debugging requirements means fewer bugs [[1]](https://dl.acm.org/citation.cfm?id=808430)[[2]](https://ieeexplore.ieee.org/document/1702333) and less time spent writing code.

Because you need to ensure tasks will be shippable when they're done, you are forced to break tasks down more carefully. When programmers have small and precise tasks, it's easier to foresee obstacles and do estimations.

Smaller tasks have fewer hidden requirements, which makes programmers have to revisit work less often. When work is more streamlined, programmers become happier, and having happy programmers is important too. Happy programmers don't quit, so you won't have to spend money on hiring and training someone to replace them.


## Delivering often makes deploys less risky

**It's a fallacy to say that delivering once every sprint leads to fewer bugs. Delivering once every sprint simply means you deliver less often.** In terms of bugs, there's absolutely no difference between deploying twenty commits at once or deploying one commit at a time, twenty times.

Assuming that the probability of having faulty code is evenly distributed, the risk of breaking production is much higher when you do a big deploy once every two weeks than when you do small incremental deploys several times day.

Delivering often makes you deliver less work at a time. Delivering less work at a time makes it easier to roll back changes in case something goes wrong, and makes it easier to spot what went wrong. If a one-commit deploy introduces a bug, you instantly know which commit is faulty. If a twenty-commit deploy introduces a bug, you have, in the worst case, log(20) steps ahead to find the defective commit.

Smaller deliveries also reduce the context needed for deployments, which also reduces the chances of breaking your application.

**Humans are not good at remembering things; humans are good at solving problems. Optimise for humans. Machines can't code yet.**


## Delivering often makes you focus on what matters

**Features don't matter, happy customers do.**

When you focus on delivering value as early as possible, you are forced to remove clutter, because the less clutter you have, the quicker you deliver.

Building less helps you prove that what you have made is valuable before spending more time and money improving it. There is no point in creating a fantastic feature if no one wants it.

Don't be concerned about not having time to optimise or change a feature later. **If you didn't go back to it, it's because it didn't matter**. Every time you don't go back to improve something, you win. It's evidence that it would have been a waste of time to have it done in the first place.


## If you are in the book publishing business

[Send me an email, I'd like to write one](mailto:lucas@lucasfcosta.com).
