---
layout: post
title: "Why backlogs are useless, why they never shrink, and what to do instead"
author: Lucas Fernandes da Costa
place: São Paulo, Brazil
flag: 🇧🇷
tags: agile process practices
---

Do you remember your backlog ever shrinking? Of course you don't. Backlogs _never_ shrink.

Backlogs never shrink because the list of things we'd _eventually_ like to do never shrinks, and **that's what backlogs are: a bunch of unimportant tasks that we'll _eventually_ get to, but not today.**

Important tasks never go into the backlog. We create them, we work on them, and we ship them. Don't believe me? Ask your product manager when was the last time they had to take something out of the backlog because they ran out of things to do. I'm sure the answer will be a resounding _"never"_.

The truth is, **we always know what task is most important, and we work on it until it's done**. If you or your team don't know what's the most important thing to do, a backlog will not solve the problem. Context-sharing and organization alignment will. Everything else is a grim theatre to signal you're working hard enough.

At [Ergomake](https://www.ergomake.dev), my co-founder and I do _not_ have a backlog, and we couldn't be happier.

In this blog post, I'll elucidate why backlogs exist and why they never shrink. Then, I'll expound on why they're useless and harmful. Finally, I'll demonstrate how one can work without a backlog and explain why it's much more productive to do so.

<br>

## Why do backlogs exist, and why don't they ever shrink?

Backlogs exist because they're a great way to avoid difficult conversations and shift blame away from product to engineering.

Whenever anyone asks a product manager for a shiny new feature, for example, it's much easier to say "you'll add it to the backlog," than to spend an hour explaining why the suggestion is irrelevant.

This strategy is great because it creates the illusion that the task will eventually be done, even though engineers know it won't. Sometimes, even the requestors themselves know the task won't be done, but once they've gotten it into "the backlog," all of a sudden, it's someone else's responsibility.

But "what if it doesn't get done?" asks the perspicacious reader, "will they complain?". No, they won't. In a month, they'll have forgotten about their suggestion. In case they ask any questions before those thirty days, say "it's in the backlog," and they'll smile, nod, and walk away.

Besides avoiding difficult conversations, backlogs are an excellent way for product managers not to be fired. That's because long backlogs create the illusion that the product manager is "managing the product" by adding tickets to the backlog, filling them with detail, and constantly moving them up and down.

In reality, a product manager's job is _not_ to create as many tickets as possible but to _delete_ as many as they can and avoid unnecessary work at all costs.

In other words, a product manager's job is to prioritize ruthlessly, and maintaining a long backlog is anything but good prioritization.

Additionally, a backlog is a great way for all blame to fall upon engineering. As long as there is enough work, it's engineering's fault for not getting it done sooner.

<br>

## Why are backlogs harmful?

A factory that produces cars faster than it can sell them is _not_ producing cars. It's producing waste.

By the same token, a product manager creating more tasks than its engineers can deliver is also producing waste.

The only difference between the two is that the first type of waste is easy to see: there will be many rusting cars on the factory floor. On the other hand, the second type of waste is just bytes on a hard drive — or tasks on a backlog.

<a target="_blank" class="image-link" href="/assets/backlogs/waste.png"><img style="margin-bottom: -18px;" src="/assets/backlogs/waste.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>Whenever the backlog's input rate is greater than its output rate, teams produce waste.</i></center>

Similarly to the rusting cars, those tasks also rot. That's because the backlog will grow faster than the team can process it.

Therefore, cycle-times will elongate. Then, by the time an engineer picks-up a task, it is more likely to be "rotten" unless a product manager spent a significant amount of time keeping it up-to-date until it gets picked up.

<a target="_blank" class="image-link" href="/assets/backlogs/cycle-times.png"><img style="margin-bottom: -18px;" src="/assets/backlogs/cycle-times.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>As the backlog grows, cycle-times elongate, increasing the chance that an engineer will pick-up a "rotten" task unless a product manager has spent significant time keeping that task up-to-date.</i></center>

Besides generating waste and demanding a significant effort from the product team to be kept up-to-date, a long backlog also creates noise and diminishes visibility. Either case is terrible when considering those tasks will never get done.

Furthermore, maintaining a long backlog means exchanging quick and cheap processing for a slow and expensive one. When product is not doing their job of protecting the backlog, the team's input rate will be greater than its output rate, causing tasks to accumulate. That happens because it's more expensive to refine a task and implement it, than it is to refuse doing that task due to good prioritization and goal alignment.

<a target="_blank" class="image-link" href="/assets/backlogs/backlogs-bad.png"><img style="margin-bottom: -18px;" src="/assets/backlogs/backlogs-bad.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>Whenever product allows any task to go into the backlog, they ensure engineering will be a bottleneck. Besides being an expensive resource, processing tasks at a lower level of abstraction is slower.</i></center>

Conversely, when there's a prioritization buffer in front of the team's "task list", prioritization will happen at a higher-level of abstraction, and in a much quicker fashion. It's quicker to refuse tasks because they don't align with the business goals, than to allow them to enter the team's process and have an engineer implement them. That way, product teams can protect expensive resources which process tasks more slowly. Essentially, that's not but rate-matching two parts of the process so that the bottleneck is moved to where it's cheaper.

<a target="_blank" class="image-link" href="/assets/backlogs/backlogs-good.png"><img style="margin-bottom: -18px;" src="/assets/backlogs/backlogs-good.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>By adding a buffer in front of the teams "task list", teams move the bottleneck to where it's cheaper. That's because refusing tasks at a higher level of abstraction is quicker and easier than implementing them.</i></center>

The only way to make a backlog even more harmful is to require engineers to "refine" the tasks there. That way, you'll be wasting time from product managers _and_ engineers, ensuring everything comes to a grinding halt by increasing the system's input rate while decreasing its output rate.

Another reason backlogs create an insurmountable amount of overhead is that they're built at the wrong level of abstraction. It's much easier to run a business when you're looking at a high-level roadmap than when you're scrambling amongst a thousand tickets in JIRA (_ugh_).

That's because instead of elucidating high-level goals and critical outcomes for the business, backlogs contain too much low-level detail. That way, reprioritizing and getting information at a glance becomes much more difficult, as well as moving items around.

That noise and low visibility lead to much more dire consequences because it makes it more difficult for founders and executives to make decisions. When those folks realize how far behind the backlog a team is, it might be too late to do anything about it.

<br>

## If backlogs are bad, what should I do instead?

Do not maintain a backlog unless it's the backlog for your next few weeks of work.

If you'd need more than two or three weeks to get rid of everything on your backlog, you're planning too far ahead, at the wrong level of abstraction.

Everything further away than two or three works of work should go into a high-level roadmap. You should revisit that roadmap regularly, and product managers should share it with engineers and explain why each item is important. That way, the product and engineering teams can strategize how to tackle those items to reconcile technical concerns and business goals.

If you can't keep track of bugs anywhere else, it's fine to keep them on your backlog as long as you can filter them out if you need to visualize what's on your pipeline quickly. Furthermore, there should be no bugs more than a few months old. If a bug's been in the backlog for more than three months, it's already a feature. Therefore, you should schedule periodic bug cleanup sessions to fix or delete the bug immediately.

Finally, whenever an item in the backlog ages beyond a particular threshold, have your task management system highlight it in red and use your daily stand-up meeting to decide whether there's anything you can do to close it immediately, like reducing its scope or removing any blockers.

<br>

## Wanna talk?

**If you'd like to have a chat, <a onclick="sa_event('calendly-backlogs')" target="_blank" href="https://calendly.com/lucasfcosta/1-1-with-lucas">you can book a slot with me here</a>**. I'd love to talk about ephemeral environments, what we're building at [Ergomake](https://www.ergomake.dev), or simply Agile in general.

Alternatively, you can [send me a tweet or DM @thewizardlucas](https://twitter.com/thewizardlucas) or [an email at lucas@lucasfcosta.com](mailto:lucas@lucasfcosta.com).
