---
layout: post
title: "Why long-term plans don't work and how to fix them"
author: Lucas Fernandes da Costa
place: London, United Kingdom
flag: 🇬🇧
tags: agile project-management
---

**Yearly software development plans are my favourite genre of fiction**. In the fabulous world of yearly plans, product developers assume they know exactly what product they must build and how long each task will take.

There are two sub-genre of long-term plans: the "imaginative" and the "naive" ones. The "imaginative" sub-genre assumes nothing unplanned will happen. The "naive" one presumes that you can plan for unexpected events by adding a long enough buffer to the plan (fillers).

Regardless of the sub-genre, _long-term plans simply don't work_.

**In this blog post, I'll explain why long-term plans are pernicious, how they cause products to fail and provide alternatives for producing useful, profitable products.**


<br>

## Why are long-term plans pernicious?

The fundamental problem with a long-term plan is that it misaligns incentives. Instead of rewarding teams for delivering useful, profitable features, companies which worship conformance to plan reward developers for features on time and within budget; it doesn't matter how useless or broken those features are.

Furthermore, any long-term plans with dates attached are doomed to fail because they rely on three fundamentally broken assumptions. These plans assume that:

1. Nothing will go wrong
2. Product developers know precisely what they must build
3. Product developers know exactly how long each task is going to take

Whenever each of these assumptions break — which they inevitably will — delays happen.

Now, I'll explain why each of these assumptions is flawed and how they wreak havoc upon your product.


<br>

### Assuming nothing will go wrong

The problem with this first assumption is that it's impossible to write bug-free code. _[No one has ever done it, and it's unlikely you will be the first](https://twitter.com/codewisdom/status/958037113307623438)_. It doesn't matter how many tests you write or how strict your types are, _there will be bugs_, and your team will have to fix them.

Whenever a bug appears, someone will either have to delay the next task or stop their current task to fix it. In other words, each bug will inevitably delay the schedule.

<br>

<img style="margin-bottom: -18px;" src="/assets/long-term-plans/bugs.png" alt="">
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>Whenever bugs happen, they push other tasks forward</i></center>

<br>

Consequently, to make up for these delays, teams are pressured to deliver the next feature in less time than they originally estimated.

When that happens, teams face two choices: cut scope or cut corners. Because the all-knowing long-term plan deems scope immutable, engineers will cut corners, leading to more bugs and creating a vicious cycle of delivering broken features.

This cascade of broken features will eventually bring the team to a halt because they'll be too busy draining the flood to actually fix the leak that's causing it.

A further problem with the assumption that nothing will go wrong is that it implies there will be no mistakes to learn from. Therefore, teams will continue operating with broken, costly, inefficient processes.

Besides bugs, there are also unforeseen events which affect an employee's productivity. Someone may get sick and not be able to work, for example. Once again, your plan goes down the drain.


<br>

### Assuming you know exactly how long each task is going to take

There's simply no way you can make a deterministic forecast in the stochastic world of software development.

For example, if you're using robots for manufacturing cars, each part of the process takes roughly the same time. Therefore, it's significantly easier to make accurate forecasts.

Furthermore, in the world of car manufacturing, value is created by producing more cars in less time for lower prices. In that world, car companies estimate and optimise manufacturing, _not design_.

In the world of software development, manufacturing is not a challenge. In fact, replicating and distributing software is virtually free.

The problem with software development is that we try to forecast how long it will take for us to _design_ features, not to replicate them. Because every new feature is — obviously — new, there's just no way of knowing how long feature development will take unless we actually do it.

Moreover, while manufacturing poses operational risks, design poses product risks. When manufacturing is poorly managed, you have fewer products to sell or narrower profit margins, but you still have a product people are willing to buy because you're past the design stage.

On the other hand, when a product is poorly designed, it doesn't matter how efficient its manufacturing and distribution are because no one is willing to buy it.

Of all three assumptions, this is likely to be the most treacherous because it's the one that compounds the fastest.

Considering that each task in your project has an associated probability of being delayed, the more tasks your plan has, the more likely you are to deliver the project late.

Additionally, as the number of tasks in your project increases, the greater the magnitude of the delay will be because there will be more opportunities for your estimations to have been wrong.

In other words, a 1-week project which takes twice as long is an inconvenience; a 1-year project which takes twice as long is a disaster.

Even if you are exclusively trying to deliver a product on time and on budget, no matter how useless and unprofitable that product is, this assumption will lead you the wrong way because you _will_ get estimates wrong.


<br>

### Assuming you know exactly what to build

You can't predict how long it will take to act on your customer's feedback. Hence long-term plans don't allow space for working on feedback. They don't do so because feedback adds variability and uncertainty.

In other words, **feedback corrupts the beautiful, deterministic, omniscient plan**.

Consequently, long-term plans either force you to stick to useless features or pressure the team to accelerate the following features to compensate for the delay created by listening to feedback. By the way, the latter rarely happens.

This lack of room for feedback does diminish the likelihood of being late or over budget. Yet, it increases the possibility of delivering an on-time and on-budget useless product that should not have been delivered at all.

[As Donald Reinertsen has said](https://www.youtube.com/watch?v=zy2OHNIBA20&ab_channel=AgileByExample), the long-term plan approach is comparable to placing a bet on a horse race. When you go to the hippodrome, you must choose a horse _before_ the race even starts, and you must stick to it all the way until the end. Besides cheering and praying, you can do nothing to help the chosen horse win the race.

Just like winning the pot in a horse race, when the long-term plan succeeds, it's not because of its competent executors; it's because of a sheer stroke of luck.

Products don't succeed because of carefully crafted long-term planning. They succeed _despite_ of it.


<br>

# The alternative to long-term plans

Before I enumerate alternatives to a long-term plan, first, let me tell you shouldn't do:

1. Plan more carefully
2. Add a larger margin of error

The problem with planning more carefully is that no matter how carefully you plan, you will still get estimates wrong because of the reasons listed above. If anything, planning more carefully will yield greater cost and frustration. Greater cost because you'll spend time planning and preparing for a wide variety of events, and greater frustration because you'll get those events wrong anyway.

The future is nothing but deterministic, and the number of a project's possible outcomes is way larger than you can even imagine. If you think you can predict the future, you should go play the lottery. It's more lucrative.

The second alternative, adding a larger margin of error, is only valid if your goal is to deliver _anything_ on budget and on time. As I've explained, none of these goals is worth achieving without a useful and profitable product.

When you add a larger margin of error, you're exchanging the possibility of being late for the certainty of being late just so that you can say you were "on time" and get a pat on the back. Sure, if you have a boss asking you for a date, it's better to underpromise and overdeliver. Yet, it's even better to have a boss who's more concerned about the company's bottom line than they are about empty promises of delivering something by a particular date.

<br>

## The one valid alternative to a long-term plan

Now that you know what you shouldn't do, I'll tel you the one valid alternative to a long-term plan:

**Instead of making your plan better, make it shorter**.

Making plans shorter was the part of the Agile manifest everyone missed. Remember _"responding to change over following a plan"_?

The whole point of Agile was to run into walls as quickly as you could, just so that you could map out where the walls were and stop hitting your head against them.

Notice I'm _not_ telling you to break your long-term plan into smaller increments. A long-term plan broken down into sprints is still a long-term plan!

Instead, I'm telling you to either scrap your long-term plan altogether or avoid adding detail to longer-term goals. Moreover, I'm telling you to be open to changing those long-term goals as new pieces of information arise, either good or bad.

As your planning horizons diminish, your risks do too.

Think about buying 3-digit lottery tickets, for example. As Reinertsen explains, paying $1 for each digit as numbers are drawn is better than paying $3 for all three digits at once.

If you have to buy all three digits at once, the likelihood of guessing all three is only 1%, and each attempt costs you $3.

<br>

<img style="margin-bottom: -18px;" src="/assets/long-term-plans/lottery-3-digits.png" alt="">
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>When paying for all digits at once, each attempt always costs $3 and there's only a 1% chance of success</i></center>

<br>

On the other hand, if you pay $1 per digit, you can decide whether to continue as soon as the first number is drawn. If you get it right, you can pay for the next; if not, you can give up sooner and lose less money.

In this case, there's only a 10% chance you'll buy the second number and a 1% chance you'll buy the third. Therefore, each failed attempt will cost you less, but the overall likelihood of winning is still the same.

<br>

<img style="margin-bottom: -18px;" src="/assets/long-term-plans/lottery-1-digit.png" alt="">
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>When paying for one digit at a time, there's only a 10% chance you'll buy the second digit, and a 1% chance you'll buy the third.</i></center>

<br>

In addition to reducing costs and risks, short-term plans also expose how pointless it is to estimate stories.

If you have a short planning horizon, you don't need to estimate because you'll try to deliver small batches of stories as early as possible to get feedback on those stories. In this case, you're not trying to deliver the agreed features by a particular date. Instead, you're trying to deliver a valuable product as soon as possible.

Furthermore, estimating stories doesn't change how long these stories take to be delivered. If anything, it makes them take longer because teams will spend hours playing planning poker instead of actually coding.


<br>

# Situations in which it's okay to have a long-term plan

No blog post would be complete without mentioning at least one of the situations in which a long-term _is_ actually a good idea. Otherwise, I'd get way too many "what if" comments on HackerNews.

Long-term plans are a good idea if you're an agency or outsourcing software development in some way. In that case, a long-term plan's incentives are actually well aligned.

As an agency, you're paid to deliver whatever your customer wants within a particular time and budget. It doesn't matter how useless the product you're going to deliver is. In general, agencies will get paid regardless of whether their customer succeeds in selling that particular product.

If you're an agency, it's your customer's job to tell you what to build, and it's _your_ job to make it on time and within budget.

In that case, it's also fine to add a buffer to your plan as it helps you project revenue and costs and align with your clients on when they'll be able to launch.

Despite all these advantages, which only exist if you're an agency, I still think it's overall better for an agency's customers and capitalism as a whole not to bill for complete projects.

Instead, if I were running an agency, I'd bill by the hour and make sure to provide my customers with product management resources to help them gather feedback and shape the product along the way.

With this approach, I'd reap two benefits. First, I'd de-risk my agency business as I wouldn't have to commit to a particular timeline. Second, I'd increase my customer's chance of succeeding with their product, which, in turn, leads them to hire me again, for longer, at higher prices.

<br>

# A summary on making plans shorter, not "better"

Long-term plans misalign incentives. Instead of rewarding teams for delivering a valuable product, it rewards teams for conforming to the plan and delivering features on time and within budget, regardless of whether those features are useful.

Besides misaligning incentives, long-term plans are doomed to fail because of three fundamentally broken assumptions:

1. Nothing will go wrong
2. Product developers know precisely what they must build
3. Product developers know exactly how long each task is going to take

Whenever each of these assumptions inevitably breaks, the plan will be delayed.

The only way to avoid the damage caused by these plans is not to plan more carefully or have a larger margin of error. The way to prevent them is to shorten planning horizons so that you can give up on bad ideas earlier and de-risk the product by listening to feedback.


<br>

## Wanna talk?

**If you're a CEO, CTO, or manage software development teams, I'm interested to hear about the tools you use, the problems you face, and how you solve them.** For that, I've opened plenty of 25-minute slots to chat with my readers. To book a slot, <a onclick="sa_event('calendly-long-term-plans')" target="_blank" href="https://calendly.com/lucasfcosta/1-1-with-lucas">you can click here</a>.

Alternatively, you can [send me a tweet or DM @thewizardlucas](https://twitter.com/thewizardlucas) or [an email at lucas@lucasfcosta.com](mailto:lucasfcosta.com).
