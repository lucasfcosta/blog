---
layout: post
title: "Make haste slowly: quantify economics"
author: Lucas Fernandes da Costa
place: London, United Kingdom
flag: 🇬🇧
tags: product-development deterministic management
---

In the past thousand sprints, you've been consistently delivering plenty of code. By now, your caffeine intake is on the thousands of milligrams, and you've forgotten whether your yellowish keycaps have ever had characters imprinted in them.

Yet, as you sit through the sprint's retrospective, your manager says they aren't happy that there's still too much in the backlog to go through. "We must _'code faster'_", the manager says.

Despite knowing next week's retrospective will be just like this one, everyone in the room nods and says they'll do better next sprint.

You look at the calendar on the wall, and it's February the 2nd, just like last time. It's [Groundhog Day](https://en.wikipedia.org/wiki/Groundhog_Day_(film)) all over again, and you don't even get to play the piano like Bill Murray.

In this post, I'll explain the two main problems with the "code faster" approach. Then, I'll present a much healthier and logical alternative.

<br />


# The problems with the "code faster" approach

There are two main problems with the "code faster" approach.

First, the "code faster" approach assumes that shipping features twice as fast will generate twice as much profit. This assumption is _incorrect_. **Shipping useless software twice as fast just means you're producing waste at twice the speed**.

This first problem, the failure to quantify economics, is directly linked to the second: neglecting the team's capacity.

Because "code faster" managers can't quantify the value of each piece of work in their pipeline, they'll erroneously focus on shipping _more_ features instead of maximising the **profit** their team can generate with its current resources.

These two problems, failing to quantify economics and thus neglecting the team's capacity, lie at the root of most inefficient management.

<br />


## Failing to quantify economics

Ultimately, companies exist to make profit¹, not to ship features. If anything, more features accrue more cost because they take expensive resources to produce and maintain.

Therefore, a manager's goal is not to maximise the number of features shipped but to maximise revenue with as few features as possible.

Think about the UK's COVID vaccination programme, for example. There are 66.5 million people in the UK, but there aren't enough vaccines or health professionals to vaccinate all these people in a day. No matter how much the government improves the vaccination programme, it's impossible to vaccinate the whole country in a day.

Considering resources are scarce, making the vaccination programme as successful as possible requires the government to determine who are the most critical people to vaccinate first. Despite younger people having to wait longer, this prioritisation ensures that the system is always vaccinating the most vulnerable people at the time. Therefore, this prioritisation criterion maximises the system's positive net outcome.

Similarly, engineering teams have limited resources. Thus, to maximise revenue while accruing the minimum possible cost, managers must ensure their engineers are constantly working on the most financially important tasks.

When managers lack a financial framework, every story in their infinitely long backlog will be equally important. Consequently, the manager won't be able to determine on which items their team should work, hence why the manager asks their team to ship all items as quickly as possible despite it being an unattainable goal.

In general, the scarcer the resources, the more critical it is to have a robust financial framework to drive prioritisation. Such a framework enables the team to use its finite capacity to produce the most positive net outcome.

<br />


## Neglecting the team's capacity

Begging engineers to "code faster" is a futile effort. It's just like expecting a program to "run faster" by cheering for your processor to increase its clock speed. *A system will produce what it _can_ produce, regardless of whether you set a goal*.

You can't expect a system to process more items in less time while maintaining the same high-quality output.

Similarly, an engineer will deliver as many stories as possible, regardless of how big the sprint or the backlog is.

Consider, for example, that you ask an engineer to write in two workdays (sixteen hours), a feature which would usually take an entire workweek (forty hours). Assuming that the engineer cannot bend time to meet this deadline, they have two options. They can take compromising shortcuts so that the 40-hour feature fits into sixteen or put in extra hours so that they'll work forty hours in two days. Both of these alternatives lead to poor outcomes.

In case the engineer chooses to take compromising shortcuts, the pressure for "coding faster" _now_, will cause coding to be slower _later_. These shortcuts will cause the code to be unscalable, unreadable, and often poorly tested. Consequently, in the future, engineers will take longer to complete tasks and spend more time fixing bugs.

Engineers who care about the quality of their craft will thus choose the second option: working extra hours. These craftspeople will then feel discontented and, if this situation often repeats, are likely to burnout and quit.

Therefore, managers who take the "code faster" approach should at least be honest and call it "care less" or "work longer". Furthermore, these managers are shrugging off their responsibility for the unmaintainable systems and processes they've created. Whenever a manager asks their engineers to "code faster", they fail to acknowledge that their engineers are _already_ coding as fast as possible.

In his book "Out of the Crisis", the American engineer and management consultant W. Edwards Deming, deemed one of the inspirations for the Japanese post-war economic miracle, shares a similar view:

> Any substantial improvement must come from action on the system, the responsibility of management. Wishing and pleading and begging the workers to do better was totally futile.
>
> — Deming, W. Edwards. Out of the Crisis, reissue (p. 6). MIT Press.

<br />


# An alternative to the "code faster" approach

There are two ways of increasing the value generated by a processing system with limited resources:

1. Ensuring the system processes prioritises the work with the highest revenue to cost ratio
2. Increasing the speed at which the system processes each item

By tackling the first, you can generate more resources to invest in the second. Additionally, by calculating how valuable it is to deliver an item earlier, you can determine how much to invest in expediting it. Therefore, any valid alternatives to the "code faster" approach begin with a financial framework.

To build this financial framework, I'd recommend following Donald Reinertsen's advice to use cost-of-delay.

Cost-of-delay is effective yet easy to understand. An item's cost of delay is how much it costs to delay a project per unit of time.

After you've put a price to the feature's delivery time, you can judge choices by comparing how much they cost and by how much they expedite the feature's delivery.

To understand how to use cost-of-delay to make sound economic decisions, I'll present a practical example.

Assume you have three features on which your team could be working. Given you have limited engineering resources, your job as a manager is to determine how to allocate those resources to produce as much profit as possible.

To make that decision, you'll need to gather information about each feature's cost and the revenue they expect it to generate.

In this example, we'll assume feature one takes one unit of time and is expected to generate three thousand dollars a month. Feature two takes three units of time and is expected to generate twelve thousand dollars a month. Finally, feature three takes twelve units of time and is expected to generate eighteen thousand dollars a month.

|               | Time | Expected Monthly Revenue |
|---------------|------|--------------------------|
| Feature One   | 1    | $3.000                   |
| Feature Two   | 3    | $12.000                  |
| Feature Three | 12   | $18.000                  |

With this financial information, you'll then calculate each feature's daily cost-of-delay by dividing its expected monthly revenue by thirty.

|               | Time | Expected Monthly Revenue | Daily Cost-of-Delay |
|---------------|------|--------------------------|---------------------|
| Feature One   | 1    | $3.000                   | $100                |
| Feature Two   | 3    | $12.000                  | $400                |
| Feature Three | 12   | $18.000                  | $600                |

Now, to decide which features to tackle first, you'll divide each feature's cost-of-delay by the expected time it would take to complete them. Such a calculation reveals the feature's weight: its ratio of revenue to cost, allowing you to prioritise the ones that are the most profitable.

|               | Time | Expected Monthly Revenue | Daily Cost-of-Delay | Weight |
|---------------|------|--------------------------|---------------------|--------|
| Feature One   | 1    | $3.000                   | $100                | 100    |
| Feature Two   | 3    | $12.000                  | $400                | 133.3  |
| Feature Three | 12   | $18.000                  | $600                | 50     |

In this example, feature two has the biggest ratio of revenue to cost. Therefore, that's the feature your team should tackle first.

This scheduling policy is also known as "weighted shortest job first". It's similar to what your operating system does to decide to which processes it should allocate the system's resources.

These simple mathematics have three profound implications for software development and product management processes.

First and foremost, this method acknowledges the system has limited processing capacity. Therefore it focuses on allocating this limited capacity to maximise profit. In other words, it makes the team "code smarter", not "faster".

Second, it eliminates the need for absolute estimations.

Notice how I didn't specify a unit of time on the calculations above. That's because the time it takes to develop a feature doesn't matter when we're trying to compare features to one another.

When calculating feature three's weight, for example, it doesn't matter whether that "twelve" represents twelve days or twelve months. What matters is that it takes four times as long as feature two and twelve times as long as feature one.

Remember, you're _not_ trying to determine how much the system can get done per unit of time. Instead, you're trying to allocate resources to process the most important items.

Additionally, it's much easier to determine how much more difficult features are compared to one another than to guess how long they will take, no matter how good you are at guessing.

Third, it informs managers how much money they can invest in expediting an individual feature and what's the most economically sound option for doing so.

Consider, for example, that you've decided to work on feature two as per our previous explanation. In that case, delivering that feature ten days earlier represents a $4.000 saving. Therefore, if you spend $3.000 to hire a contractor, you're making $1.000. Suddenly, you have created a budget for adding resources to the system instead of asking engineers to "code faster".

Now, look at the calendar again. You still can't play the piano, but it's February the 3rd.

<br />


# Postscriptum

[1] Not _all_ organisations exist to make a profit. But even non-profit organisations, whose raison d'être is to deliver _value_, accrue costs. Therefore, they still look to increase their value to cost ratio.

As Donald Reinertsen references in _"Principles of Product Development Flow"_, the title of this blog post is inspired by [the Latin adage "Festina Lente", about which you can read in Wikipedia](https://en.wikipedia.org/wiki/Festina_lente).
