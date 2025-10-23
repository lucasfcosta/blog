---
layout: post
title: "The curious case of forgotten mistakes and pointless processes"
author: Lucas Fernandes da Costa
place: São Paulo, Brazil
flag: 🇧🇷
tags: estimations
---

Every process is a little reminder of someone's mistake.

Somebody messed up, and their boss was like, _"hey, we gotta make sure this doesn't happen again!"_. And that's how the process was born.

Think about it. Why do we have all these rules, procedures, and checklists? It's because somebody somewhere screwed up and caused a mess, and now the back end is throwing 500s at everyone. Maybe the developer forgot to set an environment variable, didn't communicate properly, or just didn't pay enough attention. Whatever the reason, something went wrong, and the company had to figure out a way to prevent it from happening again.

So now the company has all these processes to make sure everyone knows _what_ they're supposed to do and _how_ they're supposed to do it. We have QA analysts, three JIRA boards, GANTT charts, deployment protocols that end in `.pdf`, you name it. And all because somebody messed up once, and the company had to scramble to fix it.

And it's not just big failures that lead to new processes either. Sometimes it's the little things too.

For example, maybe someone forgot to reply to an important email, and it caused a delay in a project. So, the company decides to implement a new process where team members must acknowledge receipt of all important emails within a specific timeframe.

**In culture that's afraid of failure, heavy-weight processes are inevitable**. It's a never-ending cycle. As soon as one failure gets addressed, another one is bound to happen sooner or later, and a new process will have to be put in place.

And there's something else that's funny about processes. After a few months or years, they can become so ingrained in our way of doing things that we start to forget why they even exist in the first place.

Have you ever found yourself following a process that seems completely pointless? Like, you're just going through the motions, updating JIRA cards, checking off boxes, and writing RFCs, but you have no idea why you're doing any of it?

Let me tell you: you're doing that because someone made a mistake, but now they're gone, and it's been too long, and no one remembers why the company does things this way.

That's precisely what happens most of the time: the process outlives the people whose mistakes gave birth to it.

<br>

## Why processes must die

Processes are great when they work, but they rely on us humans, flawed creatures. Have you ever seen someone forget to put gas in their car? That's like a process breaking down because someone forgot a step.

And don't even get me started on following directions. It's like when you buy a desk from IKEA and try to put it together, but you end up with extra screws, missing pieces, and a wobbly table top. That's what happens when humans try to follow a process.

It's not that humans are dumb. It's just that we inevitably make mistakes. We forget things. We get distracted. We bake a cake and accidentally put too much sugar in it. That's the kind of mistake that can ruin a process.

Think about it this way: any event with a non-zero chance of happening will eventually happen, and the truth is: you can't make it impossible for people to make mistakes by creating processes, no matter how detailed those processes are.

Also, it's not just the processes themselves that are problematic; it's the _culture_ they create. Suddenly, everyone's afraid to take risks or try new things because they're scared of breaking some arbitrary rule or getting in trouble for not following the "correct" process.

In that case, engineers will be too afraid to ship. They'll ship less, and they won't learn as much. They'll obsess about foreseeing edge cases rather than preparing for when they happen.


<br>

## What to do instead

There are only two ways to deal with failure, none of which involves creating a new process. You either make systems that can handle failure, or you ensure that the chances of failure are zero.

The first option, handling failure, is like building a car with airbags and other safety features. In that case, you're less likely to get hurt even if you get in an accident. It's better to be prepared for an accident than to hope it'll never happen. Companies should do the same thing with their systems.

When you design a system that's resilient to failure, you don't have to worry about every possible scenario. You can trust that the system will work as intended, and if something does go wrong, it won't be catastrophic.

The second option, making failure impossible, is like working remotely instead of trying to find a way to escape traffic on the way to the office. You can work from the comfort of your own home and avoid the headache of commuting altogether. Sometimes, this option needs you to redesign the system in such a way as to [cut its Gordian Knot](https://en.wikipedia.org/wiki/Gordian_Knot). Other times, it just requires a strong enough type-system, which [makes impossible states impossible](https://www.youtube.com/watch?v=IcgmSRJHu_8).

And in the scenarios in which technology can't solve it, try creating small constraints instead.

Think about a team that's slow and unpredictable, for example. In that case, try limiting the team's "WIP" instead of opening up whatever flowchart software you have and trying to design a brand-new complex process. Yes, you heard me right. Stop your cursor right there. You're not going to draw another arrow somewhere. You're just going to tell people: "hey, you can't have more than two tasks in progress, okay?".

That approach, creating small constraints, is easier for humans to follow and doesn't instill a bureaucratic culture into the team.

Furthermore, when you start making these small changes over time, you end up with a more predictable system, and productive patterns emerge rather than being forced upon people.

Finally, if you already have too many processes, revise them all. Tell people to be candid and ask them which processes they think you should discontinue. Use your good judgement to pick which ones to throw in the bin.

It's very easy to fall into the trap of fixing process problems by creating more processes. Be careful with that.

<br>

### Should we kill _all_ processes?

No. You shouldn't.

_Some_ processes are helpful, but that's not the majority.

Usually, you want to have _some_ regularity in your _development_ process so that you can make minor adjustments over time and measure how you're performing. You cannot improve a system that's not repeatable.

This rant is mostly about processes for deployments, fixing bugs, communicating with others, or coming up with new feature ideas.

Honestly, I shouldn't have had to write this section, but if I didn't, there'd be too many comments here and there with this obvious remark.

If you've read this blog, you should know that I have some love for processes — especially the ones that work and that are lightweight enough, like Kanban.

Also, this blog post is about _software_, not law or medicine.

<br>

## Wanna talk?

**You can <a onclick="sa_event('calendly-processes')" target="_blank" href="https://calendly.com/lucasfcosta/1-1-with-lucas">book a call here</a>**. Really, that's it.

Alternatively, you can [send me a tweet or DM @thewizardlucas](https://twitter.com/thewizardlucas) or [an email at lucas@lucasfcosta.com](mailto:lucas@lucasfcosta.com).
