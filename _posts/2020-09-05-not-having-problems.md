---
layout: post
title: "The most efficient way to solve problems: not having them"
author: Lucas Fernandes da Costa
place: London, United Kingdom
flag: 🇬🇧
tags: problem-solving
---

It's Monday. The first of the seven alarms you've set on your phone soars louder than the Big Ben. It sends chills down your spine announcing the impending doom: your 8 AM commute. You put on that white shirt you're sick of, and head to the most crowded place on earth: the [northern line](https://www.cityam.com/londons-most-crowded-tube-lines-revealed/).

Your commute is a problem, and you want to solve it. **The challenge with _solving_ problems is that it's usually harder to find a solution than it is _not_ to have that particular issue in the first place**.

"Why didn't I buy that used Toyota Prius for half the price?". "It's time to start cycling; perhaps it will get me in shape too". "Does Tim Ferris _really_ wake up at five? I bet no one takes the tube at that time".

Buying a car, commuting by bike, or waking up earlier are all _solutions_ to the problem of having an uncomfortable commute. Nevertheless, they're imperfect because they are _patches_.

If you buy a car, you'll still get stuck in traffic. If you buy a bike, you'll get sweaty, and you'll have to change clothes when you get to work. Personally, I love waking up at five, and at that time there's definitely no one in the tube, but it doesn't matter how early I get out of bed, I still have to face a thirty-minute commute.

**It's rare, if not impossible, to apply patches which completely resolve the problems you have. More often than not, applying patches creates new problems.**

When faced with a problem, instead of immediately trying to patch it, I'd recommend you to take a step back and think about whether you could avoid it altogether.

Just because you _hate_ commuting, it doesn't mean you should look for ways to make it more pleasant. The most efficient way to solve the commute problem is _not_ to commute at all.

If you work from home, you won't need to spend any money in a car, put any effort in cycling, or ruin your circadian rhythm by waking up too early.

Now think about managing a website which depends on a particular RESTful API, for example. Every time you make changes to the underlying API, you'll have to update your client. These updates are time-consuming, and they need to happen immediately. Otherwise, you won't be able to deploy either your back-end or front-end.

In this case, instead of trying to patch the problem by finding more complicate and suboptimal solutions, like, for example, synchronising deployments, you could avoid the problem altogether by _not_ making breaking changes to your API's routes.

If you version your API by prefixing each of its routes, you won't break the client. Therefore, you won't have to synchronise deployments or immediately schedule work to update your front-end as soon as you start changing the server.

Instead of _patching_ the problem, you eliminated it.

Yet, you can't _always_ completely eliminate all obstacles. There is a third kind of solution, which is a mix of the previous two. Even though it involves a patch, its patch entirely eliminates the problem.

You can't, for example, solve every software problem by _not_ creating any software. Even though software creates issues, it makes our lives significantly better most of the time.

Instead of trying to eliminate software altogether, you should find ways to write _less_ software.

UNIX streams are an excellent example of this kind of solution. Because streams allow programs to communicate with each other, they enable you to combine existing programs instead of creating new ones.

Even though we've had to create software for streams to work, we didn't have to write _too much_ of it. We've written a little bit of code so that we could write less of it in the future.

These kinds of solutions are interesting because they're usually winners in the market.

When we had problems managing our own data-centres, for example, the winner products weren't the ones which made it more efficient to manage your own hardware. The winners were those who allowed you not to have a data-centre altogether. That was the birth of VPS's.

Now, we're seeing the exact same process happening on the cloud computing space because running program's in someone else's hardware creates yet another problem.

Even though companies don't have to maintain their own data-centres anymore, they still have to manage the machines in which they host their software.

Again, we're faced with the choice to patch the problem or find a solution which eliminates it altogether.

We can create complex programs to [provision servers](https://github.com/chef/chef), [monitor their resources](https://www.nagios.org/), and [orchestrate our system's components](https://kubernetes.io/), or we can avoid using these "virtual machines" altogether by using Lambdas, for example.

I bet that cloud-native architectures will win.

In the same way that we chose not to maintain data-centers instead of making it easier to manage them, we'll decide not to manage any servers instead of making it more efficient to do so.

<br>

-----

<br>

# Postscriptum

I do _not_ necessarily think that cloud-native architectures are objectively better.

These services have dozens of disadvantages about which I could write entire posts. The most significant of them is probably vendor lock-in.

What I'm saying instead is that I believe the majority of the market will end up adopting these kinds of services.
