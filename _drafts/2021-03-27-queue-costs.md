---
layout: post
title: Why "beg and plead" management doesn't work
author: Lucas Fernandes da Costa
place: London, United Kingdom
flag: 🇬🇧
tags: product-development deterministic management
---

In the past thousand sprints, you've been consistently delivering plenty of code. By now, your caffeine intake is on the thousands of miligrams and you've forgotten whether your yellowish keycaps have ever had characters imprinted in them.

Yet, when you sit down for the retrospective, your manager isn't happy that there's still too much in the backlog to go through. "We must _'code faster'_", the manager says.

Despite knowing next week's retrospective is going to be just like this one, everyone in the room nods and says they'll do better next sprint.

You look at the calendar on the wall and it's February the 2nd, just like last time. It's [Groundhog Day](https://en.wikipedia.org/wiki/Groundhog_Day_(film)) all over again, and you don't even get to play piano like Bill Murray.

In this post, I'll explain the problems with the "code faster" approach. Then, I'll propose a much healthier and logical alternative.


## The problem with the "code faster" approach

Begging engineers to "code faster" is a futile effort. It's just like expecting a program to "run faster" by cheering for your processor increase its clock speed. *A system will produce what it _can_ produce, regardless of whether you set a goal*.

You can't expect a system to process more items in less time while maintaining the same high-quality output.

Similarly, an engineer will deliver as many stories as possible, regardless of how big the sprint or the backlog is.

Consider, for example, that you ask an engineer to write in two work days (sixteen hours) a feature which would usually take an entire work week (forty hours). Assuming that the engineer cannot bend time, to meet this deadline, they have two options. They can take compromising shortcuts so that the 40-hour feature fits into sixteen, or put in extra hours so that they'll work forty hours in two days. Both of these alternatives lead to poor outcomes.

In case the engineer chooses to take compromising shortcuts, the pressure for "coding faster" _now_, will cause coding to be slower _later_. These shortcuts will cause the code to be unscalable, unreadable, and often badly tested. Consequently, in the future, engineers will take longer to complete tasks and spend more time fixing bugs.

Engineers who care about the quality of their craft will thus choose the second option: working extra hours. These craftspeople, will then feel discontented, and, if this situation often repeats, are likely to burnout and quit.

Therefore, managers who take the "code faster" approach should at least be honest and call it "care less" or "work longer". Furthermore, these managers are shrugging off the responsibility they have for the unmaintainable systems and processes they've created.

That's what W. Edwards Deming learned when he went to Japan to study why Toyota's manufacturing practices were so successful. In his book "Out of the Crisis", Deming writes:

> Any substantial improvement must come from action on the system, the responsibility of management. Wishing and pleading and begging the workers to do better was totally futile.
> — Deming, W. Edwards. Out of the Crisis, reissue (p. 6). MIT Press.


# The alternative to "code faster"

Good managers don't roll dice. They measure their team's output, update their processes and systems, and verify the impact of those updates on the team's performance. Successful updates are maintained, while failed ones are abandoned.

Ultimately, companies exist to make profit, not code. Therefore, the alternative to "code faster" is to ensure your engineering teams produce more revenue than they accrue cost. The bigger the ratio of revenue versus cost, the more money you can invest in improving the system.

// However the biggest problem with the codefaster approach is that it fails to acknowledge the relationship between coding faster and making a profit. If you ship twice as fast, how much money will you make? If you don't know that, you can't invest in shipping faster.

The problem with the "code faster" approach is that most of its proponents can't quantify the financial benefits of "being faster".

// TODO

> In product development, our greatest waste is not unproductive engineers, but work products sitting idle in process queues.
> Reinertsen, Donald G. The Principles of Product Development Flow: Second Generation Lean Product Development (p. 33).

You look at the calendar again. It's February 3rd.
