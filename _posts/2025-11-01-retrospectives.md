---
layout: post
title: "Retrospectives"
author: Lucas Fernandes da Costa
place: São Paulo, Brazil
flag: 🇧🇷
tags: agile devops retrospectives continuous-improvement
---

Every team must believe in improvement, even when it no longer happens. That’s what retrospectives are for.

Besides keeping people's hopes alive, most teams also use retrospectives for documenting problems that nobody has time to fix. That way, when the retrospective comes, they can all nod in agreement that yes, the problem is real, and yes, it should be fixed someday, but not today.

Sometimes, we even go as far as assigning someone to "investigate" the problem, just to show we care. But of course, that "investigation" never goes anywhere because we're not sure what do after that, and we have more important things to do right now.

But hey, we've got it all written down! Now there's also plausible deniability. If the problem ever blows up, we can all say "well, we documented it months ago! We even assigned someone to investigate it, we just didn't have time to fix it yet."

It sounds dysfunctional, but that's exactly how most retrospectives work.

If that's your case, I hope this blog post can help clear up the confusion between what retrospectives are supposed to be and what they actually are.

# Toyota

The Toyota Production System, TPS, is the origin of "continuous improvement", or "kaizen" (_改善_) in Japanese. In TPS, workers can pull an [andon cord](https://en.wikipedia.org/wiki/Andon_(manufacturing)) to stop the production line when they see a broken windshield, for example. Then, they work together to find what caused the crack and implement a solution to prevent it from _ever happening again.

Notice how I didn't say "the workers document the defect for future reference" or "the team investigates the issue when they have time". The problem is addressed immediately, and a fix is implemented before production resumes.

Naturally, not every stop leads to a long problem-solving session on the spot. Depending on the severity, the team leader might come right away, assess whether production can keep going, and then trigger a structured root cause analysis later that same day. The key part is that the feedback loop is tight — hours, not weeks — and the people who spotted the problem are directly involved in fixing it.

Finally, it's worth noticing that the root cause analysis leads to concrete actions with deadlines and owners. Those actions are aimed at ensuring that it's _impossible_ for the same defect to happen again.

Does that resemble your team's retrospectives? Probably not, for many reasons. Let's explore each reason and how to fix it.

## Reason 1: The ability to stop the line

At Toyota, workers are empowered to stop the line. In our teams, nobody has that power. The closest we get is raising an issue in a retrospective, which might happen weeks after the problem was first noticed.

Obviously, in software, there's no need to completely stop the software from running. But our labour is not the software itself; it's the development process. And that process can and should be stopped, probably not for the whole team, but at least one or two people.

Now, here comes a problem: _who_ gets to stop and work on the problem?

Without a clear answer to that question, nobody will ever stop. People will keep hoping someone else will do it, or that the problem will go away on its own. That happens because badly trained management often measures their engineers by whether new things are coming out of the door, as long as their back-end is barely functional.

So, how do we make someone stop and work on the problem?

We need to assign that person explicitly and measure that person by whether they're solving the problem, not by whether new features are being delivered.

Personally, I love the way that [Resend](https://resend.com) does it.

Every week, someone gets assigned to be ["The Fixer"](https://resend.com/handbook/engineering/who-is-the-fixer).

If anything happens, everyone expects the fixer to take care of it, and the fixer knows that's exactly what they should do, regardless of whether it's a delayed SQS queue or a broken button on the dashboard.

In addition to ensuring someone will fix the problem, this approach also helps developers understand the infrastructure their product runs on. Another equally important effect is that it allows cloud engineers to understand the product their platform powers.

In terms of how long someone should be the fixer, I believe one week is a good balance between allowing enough time to fix problems and not burning out the person in charge.

I've heard of teams randomly assigning someone to be "the fixer" each time a problem arises, but I don't like that approach. It creates a lot of context switching and makes it hard for the person to focus on solving the problem at hand, effectively defeating the purpose of having a dedicated fixer.

Personally, I think whoever came up with this idea at Resend did a great job.

## Reason 2: Immediate action and early postmortems

In TPS, when a defect is noticed, it's addressed immediately. In most teams, they tend to apply the quickest patch and pinky-promise to uncover and fix the root cause _later_.

The problem with that approach is that _"later"_ is never _"now"_. Right _now_, people are busy with features, and they know they'll get a chance to discuss the problem in the next retrospective.

And that's how the retrospective is born: a meeting to discuss all the problems that were pushed down the list of priorities and shuffle them around again.

But what about tackling the priorities we just shuffled? Will we stop something that's already in progress to fix those problems? Of course not. That's not what the retrospective is for!

So what's a better way to do it?

A better way to do it is to set a clear acceptable timeframe for when the postmortem should happen. By "set" I mean hire people who care enough to agree on a sensible target date when the postmortem should happen. Then, have the leaders continuously reinforce that expectation and set a high bar for quality.

There's no one-size-fits-all answer in terms of how soon that postmortem should happen. The only rule is that if you're pre-product market fit you're probably reading the wrong blog post.

Now that we have both clarity on who's responsible and a target SLA, we can avoid the common pitfall of pushing the problem down the list of priorities indefinitely.


## Reason 3: Concrete actions with owners and deadlines

In TPS, the result's of the root cause analysis are concrete actions with deadlines and owners.

In most teams, retrospectives lead to vague action items that start with verbs whose meaning is open to interpretation, like "investigate", "improve", or "document". Words matter.

Stop and think for a minute: what do you get when someone "investigates"? Well, you get an "investigation". And what does that mean? Well, nobody knows.

It could mean anything. It could mean understanding the problem and moving on with your life. Or it could mean detecting the root cause and implementing a fix that makes it impossible for the problem, and maybe a whole class of problems, to ever happen again.

Most people mean the second, but they write down the first.

So here's a lesson: instead of "investigating the bug", write down that you need to _"make the delta-wave splitter idempotent"_. That way, duplicate messages won't cause problems downstream.

Once you've written _exactly_ what you mean, assign an owner and a target date. Then, if you care, follow up with that person to ensure the fix gets done.

In a way, you'll get better at writing these tasks if you do what I mentioned about doing postmortems in a short timeframe.

When the situation is fresh in your mind, you'll be more likely to understand what concrete things you need to do to prevent the problem from happening again. Consequently, you'll be more likely to write clear tasks.

In fact, the reason we write unclear tasks is not that we're incompetent; it's that we don't know what needs to be done! Whenever we know exactly what needs to be done, we write clear tasks.

## Reason 4: Permanent fixes

In TPS, the actions implemented after a root cause analysis prevent the same defect from ever happening again.

In most teams, retrospectives lead to temporary fixes that only address the symptoms of the problem, like increasing the number of retries or beefing up the servers.

I'm not saying that beefing up the servers is not a good choice. It's actually a great choice if it solves the immediate problem. That way, you can keep making customers happy while you work on splitting that function into another service.

In other words, the problem here is _not_ that teams should avoid temporary fixes. Teams _should_ apply quick temporary fixes. The problem is that teams often stop at the temporary fix and never get around to implementing the permanent one.

By permanent fix, I mean a fix that makes it impossible for the _same_ problem to ever happen again. Sure, other problems will appear as our system evolves, but the _same_ problem should never happen again.

When we're good, we can even prevent a whole class of problems from happening again.

Then, if we're excellent, we can even design the system so that problems _can_ happen and it will fix itself automatically, in the shortest possible time, with the least impact to the business.

# If you put all these ideas together

If you put all these ideas together, you'll notice that most of what people call "DevOps culture" is actually just continuous improvement, and it's very similar to what people were doing on the factory floor at Toyota decades ago.

It boils down to this:

1. Empower people to stop the line (or at least part of it) when they notice a problem.
2. Set clear expectations for who should fix problems in which timeframe.
3. Ensure that the postmortem leads to concrete actions with owners and deadlines.
4. Implement permanent fixes that prevent the same issues from ever happening again.

Notice how I didn't mention anything about getting together for a recurring retrospective meeting. That's because recurring retrospectives are not necessary if the team is continuously improving.

In fact, I often find that retrospectives are counterproductive because they create the illusion that there's a specific slot scheduled for improvement, and that improvement can't happen outside of it.

Retrospectives also make people believe that, if we have an hour other week to talk about improvement, then improvement will magically happen.

In reality, improvement should be happening all the time, ideally as soon as we notice a problem, as I've explained above.

Now, note I'm not saying you should immediately cancel your recurring retrospectives. They can still be useful to reflect on how well the team is doing continuous improvement and whether the process needs to be adjusted. Still, you might want to consider doing them less frequently.

# There's always something broken

Before we wrap up, I want to make one last point: there's always something broken.

Sure, [Chaos engineering](https://en.wikipedia.org/wiki/Chaos_engineering) and automatic rollbacks are probably the pinnacle of reliability engineering, but let's be honest: most teams won't get there. Startups need to move fast and most old companies are difficult to change.

At startups, you have to find creative ways to build reliable infrastructure at a pace that allows you to stay ahead of your competitors. On the other hand, at old companies you'll have to learn how to navigate bureaucracy and convince people that change is necessary.

Things will _never_ be perfect, but it's our responsibility to make them better if we want to do great work alongside people who care as much about the craft as we do.

In reality, continuous improvement is as much about fixing organizations as it's about admitting that **there will always be something broken**.

You can only create a _system_ for continuous improvement when you believe that there will never be a day when everything is perfect.
