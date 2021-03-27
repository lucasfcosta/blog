---
layout: post
title: The price you pay for those JIRA tickets you never touch
author: Lucas Fernandes da Costa
place: London, United Kingdom
flag: 🇬🇧
tags: product-development queues cost-of-delay flow
---

In the past thousand sprints, you've been consistently delivering plenty of code. By now, your caffeine intake is on the thousands of miligrams and you've forgotten whether your yellowish keycaps have ever had characters imprinted in them.

Yet, when you sit down for the retrospective, your manager isn't happy that the team couldn't complete all of the sprint's stories. The manager then tells the team that, for the company to succeed, engineers must, "estimate better", "focus more", and "code faster".

Despite knowing next week's retrospective is going to be just like this one, everyone in the room nods and says they'll do better.

You look at the calendar on the wall and it's February the 2nd, just like last time. It's [Groundhog Day](https://en.wikipedia.org/wiki/Groundhog_Day_(film)) all over again, and you don't even get to play piano like Bill Murray.

In this post, I'll explain the problems with the "code faster" approach. Then, I'll propose a much healthier and logical alternative.

I'll leave "estimating better", and "focusing more" for another post.


## The problems with the "code faster" approach

First and foremost, the "code faster" approach assumes that engineers aren't already coding as fast as they can. If you think they're slacking off, you should hire new engineers.

Consider, for example, that you ask an engineer to write in a week a feature which would usually take an entire month. Assuming that they cannot bend time, to meet this deadline, the engineer has two choices: take shortcuts or work extra hours. Both of these choices lead to poor outcomes.

In case the engineer chooses to take shortcuts, the pressure for "coding faster" _now_, will cause coding to be slower _later_. These shortcuts will cause the code to be unscalable, unreadable, and often badly tested. Therefore, in the future, engineers will take longer to complete tasks and spend more time fixing bugs.

Engineers who care about the quality of their craft will thus choose the second option: working extra hours. These craftspeople, will then feel discontented, and, if the situation persists, are likely to burnout and quit.

Therefore, managers who take the "code faster" approach should at least be honest and call it "work longer" or "care less".

The only valid alternative to "code faster" requires investment in improving the team's underlying systems and processes. You can, for example,






> An omelette, promised in two minutes, may appear to be progressing nicely. But when it has not set in two minutes, the customer has two choices—wait or eat it raw. Software customers have had the same choices. The cook has another choice; he can turn up the heat. The result is often an omelette nothing can save—burned in one part, raw in another.
> — Frederick P. Brooks Jr., The Mythical Man-Month: Essays on Software Engineering


> Any substantial improvement must come from action on the system, the responsibility of management. Wishing and pleading and begging the workers to do better was totally futile.
> — Deming, W. Edwards. Out of the Crisis, reissue (p. 6). MIT Press.


// However the biggest problem with the codefaster approach is that it fails to acknowledge the relationship between coding faster and making a profit. If you ship twice as fast, how much money will you make? If you don't know that, you can't invest in shipping faster.

The problem with the "code faster" approach is that most of its proponents can't quantify the financial benefits of "being faster".

// TODO

> In product development, our greatest waste is not unproductive engineers, but work products sitting idle in process queues.
> Reinertsen, Donald G. The Principles of Product Development Flow: Second Generation Lean Product Development (p. 33).

You look at the calendar again. It's February 3rd.
