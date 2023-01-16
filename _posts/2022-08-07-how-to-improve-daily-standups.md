---
layout: post
title: "Why your daily stand-ups don't work and how to fix them"
author: Lucas Fernandes da Costa
place: London, United Kingdom
flag: 🇬🇧
tags: agile process practices
---

<div id="embed-iframe"></div>

<script>
window.onSpotifyIframeApiReady = (IFrameAPI) => {
  let element = document.getElementById('embed-iframe');
  let options = {
      uri: 'spotify:episode:2rVlKyMDnz9Fe4gEd6hNix',
      height: 100,
    };
  let callback = (EmbedController) => {};
  IFrameAPI.createController(element, options, callback);
};
</script>

Daily stand-ups are a classic example of [learned helplessness](https://en.wikipedia.org/wiki/Learned_helplessness). We all know they're useless, but we tell ourselves "that's just how things are" and do nothing about it.

These days, we do stand-ups because that's what we're told to, not because they solve any particular problems.

The software industry has been doing daily stand-ups for so long that it doesn't remember why they exist. At some point along the way, stand-ups went from a solution to a meaningless dogmatic ritual.

Here are symptoms which indicate you're doing your stand-ups in the wrong way, for the wrong reasons:

1. Stand-ups take more than 15-minutes
2. People talk about their work instead of talking about goals
3. People stop showing up regularly
4. People talk to their manager (or "scrum master") instead of talking to their peers
5. If the manager or "scrum master" can't show up, the stand-up doesn't happen

**If your team is experiencing three or more of these symptoms, the diagnostic is clear: your stand-ups are useless**.

In this post, I'll explain the actual goal of a stand-up and why it's a productive meeting to have, providing teams it right. Furthermore, I'll explain what "right" means and the nuance involved in tailoring the stand-up meeting to suit your needs. As usual in Software Engineering, there's no such thing as "one size fits all".

<br>

## How did we get here?

As it happened with every single tenet of the Agile manifesto, we turned a set of principles into a set of prescriptive rules. We forgot that _"our highest priority is to satisfy the customer through early and continuous delivery of valuable software"_, and started thinking that being agile meant adopting rigid frameworks like Scrum and Extreme Programming. We turned our means into ends.

Why did we do that? We did it because it's easier to blindly follow a set of rules than to understand the principles behind them and tune them to _your_ goal.

The daily stand-up is perhaps the best example of a solution with solid principles turned into a pointless dogma. In fact, with daily stand-ups, we did even worse; we misunderstood the dogma!

Here's [what `Scrum.org` says the purpose of a daily stand-up is](https://www.scrum.org/resources/what-is-a-daily-scrum):

> As described in the Scrum Guide, the purpose of the Daily Scrum is to inspect progress toward the Sprint Goal and **adapt the Sprint Backlog as necessary**, **adjusting the upcoming planned work**.
>
> **The Developers can select whatever structure and techniques they want, as long as their Daily Scrum focuses on progress toward the Sprint Goal and produces an actionable plan for the next day of work**. This **creates focus and improves self-management**.

Now think about your daily stand-ups:

* Do you ever adjust the backlog or the sprint's goal because of them, or do you just tell people to "work harder" so that you don't have to change the plan?
* Do you focus on progress towards the sprint's goal or people's busyness?
* Do you create an actionable plan to respond to new information?
* Do these stand-ups incentivize teams to collaborate and self-manage, or do they instil a bureaucratic culture of fear?

What happened to stand-ups is that we shifted our focus from "getting things" done to "ensuring people are working".

The truth is that many managers weaponized their stand-up so that they could keep people busy. These types of managers believe in efficiency rather than effectiveness, which also usually leads them to [load their team to maximum capacity utilization thinking it will accelerate deliveries, when in fact it just slows their teams down](/2022/06/12/measure-queues-not-cycle-time.html).

A classic example of the weaponized stand-up is the stand-up at the very first minute of the work day.

"We have flexible working hours", they say. Sure, but there's also a stand-up meeting at exactly 8:30 AM to ensure everyone will be online early.

To fix our stand-ups, we must repurpose them. We must drive stand-ups so that they focus on our goals and adjust these goals as new information comes up.

Stand-up meetings can be valuable: they're an excellent way of creating cadence for a low cost. When there's a fixed time in everyone's calendar every day, folks will organize themselves around it, reducing the overhead of scheduling meetings with busy people.

Furthermore, when a system produces synchronous preemptive feedback daily, problems will take a maximum of one day to be surfaced.

Finally, stand-ups help different functions align their schedules around a goal, improve your metric's precision, and incentivize self-management.

<br>

## How to make stand-ups work

Here's what I recommend teams do to improve their stand-ups:

1. Stop rambling. Go through a Kanban board.
2. Prioritize aging issues.
3. Focus on blockers.
4. Invite the entire team, including PMs and Designers.
5. Move detailed discussions asynchronously.
6. Incentivize self-management and instil psychological safety.

Except for the last item, I don't consider the others mandatory. These are recommendations.

Now, I'll explain why each recommendation usually works and their caveats.

<br>

### Stop rambling. Go through a Kanban board

What did you do yesterday? What are you going to do today? These are possibly the worst questions one could ask during the stand-up.

"How are things going?" is not a good question either. This question is the embodiment of MBWA [(management by walking around)](https://en.wikipedia.org/wiki/Management_by_wandering_around), and it's equally as useless, although it's twice as loathsome.

These questions tell nothing about your progress towards the sprint's goal. Instead, they create a culture of fear and waste everyone's time, especially because they incentivize people to ramble to prove they've been productive.

Going through a Kanban board solves all of these problems. It incentivizes people to be concise because it focuses on the sprint's goal, not on someone's productivity. Instead of explaining what they've done and all the nitty gritty technical details, engineers focus on whether they need help and what they must do to move a particular item towards the right of the board: the "finished" column.

Furthermore, it incentivizes teams to track work which would otherwise be invisible. If a critical bug comes up, people will add it to the board so that they can ask others for help and alert everyone that there's something concerning going on.

One last benefit of using a Kanban board is that it makes metrics more precise. In software development, our metrics are usually measured in "days". Therefore, when you go through the board daily, you'll update the tasks at least once a day, preventing the "I forgot to move it to done" situation.

Just be careful not to manage by metrics exclusively! Metrics help detect anomalies, but they don't tell you anything about how to fix these anomalies or why they happened, although they can provide helpful insight.

> _Figures on productivity in the United States do not help to improve productivity in the United States. Measures of productivity are like statistics on accidents: they tell you all about the number of accidents in the home, on the road, and at the workplace, but they do not tell you how to reduce the frequency of accidents._ — Deming, W. Edwards. Out of the Crisis, reissue (p. 13). MIT Press. Kindle Edition.

<br>

### Prioritize aging issues

Take a moment to look at [the United States actuarial life table](https://www.ssa.gov/oact/STATS/table4c6.html). As you can see, as age increases, the size of the population that age obviously decreases.

The longer someone lives, the more of an outlier they are because they survived a larger number of fatal events that could've happened.

Similarly, the longer an issue lives, the more of an outlier it becomes. Therefore, the more attention it deserves.

An issue that has just started doesn't deserve as much attention because it's still within our process' cycle time bounds. Why would we waste time discussing something which isn't a problem?

Issues that live longer, on the other hand, are outliers. For them to have lived so long, it must mean there's something inherently difficult about them or one or more events preventing it from being completed.

By focusing your stand-ups on aging issues, you'll naturally stop wasting time on easy tasks and start investing time into solving the difficult ones.

That doesn't mean you shouldn't talk about issues which just started. It just means that aging issues should raise an alert.

Once this alert is raised, the team should debate whether they need to clarify requirements, cut scope, or ask someone for the piece of input that's missing to complete the task.

It's also crucial for this to be a blameless process. If certain types of tasks keep taking longer, the team should discuss which processes or policies they should change to prevent the problem from happening again. Instilling fear in the name of "accountability" will just cause people to hide that which makes them look bad.

> TIP: JIRA and most other project management software allows you to highlight issues above a particular age. Take advantage of that feature to make your stand-up's Kanban board more intuitive.

<br>

### Focus on blockers

Focusing on blockers has a similar effect as focusing on aging issues. It directs time investment to issues that matter.

If an issue has just started, it may not be worth it for an engineer to report anything except for a blocker or the possibility of a blocker appearing soon.

Once blockers are reported, the team should discuss what they must do to unblock the task. The longer a task remains blocked, the larger average cycle times get, and the less predictable teams become. Remember: [finishing what you start makes teams more productive and predictable](/2022/07/19/finish-what-you-start.html).

In my experience, as soon as teams start focusing on blockers and aging issues, their status updates go from [technobabble](https://en.wikipedia.org/wiki/Technobabble) like:

> I'm detecting nano wave frequency shift in the plasma gluon crystal. Today I'll re-invert the ion transporter and replace the torsional neogenic casing. I wonder whether there's a temporal anomaly in the dorsal bipolar thruster bracket. What does everyone think? _[insert long meaningless discussion here]_

To:

> Everything is going well. No blockers.

How much better is that?

When you focus on goals and impediments to those goals, everyone wastes less time proving they're productive and more time actually _being_ productive.

<br>

### Invite the entire team, including PMs and Designers

The folks you call Salespeople, Product Managers, Designers, and Software engineers I call team. Product is a combination of all those functions. Therefore, if you want to build a successful product, you must do it in a multi-disciplinary way.

Tasks are not only blocked by complicated technical issues. They're often blocked due to complex specifications, missing designs, and an unsound business opportunity.

Including folks with different roles in your stand-ups makes it easier to solve blockers which depend on functions other than software engineering — and that happens very often.

By having those people regularly attend your stand-up meetings, they can provide input on blockers, and they may even be able to tell you when a particular requirement isn't worth meeting.

Suppose you've discovered that implementing a particular feature would take at least a few extra weeks due to its complexity, for example. In that case, these folks may be able to discuss which compromises could be made to enable an early delivery for a fraction of the cost without significantly impacting your bottom line.

Furthermore, it helps sales, marketing, and design adjust their priorities to match the software team's speed. Multi-disciplinary stand-ups help everyone.

Please notice that I'm not saying all these people should _always_ attend every stand-up. I'm just saying small multi-disciplinary teams tend to be more Agile because these stand-up meetings will shorten the feedback loop between the different teams.

Not everyone has to say something either. Sometimes just listening is a huge benefit, especially given that you follow my previous advice, which will keep the meeting short and thus reduce its cost.

<br>

### Move detailed discussions asynchronously

Whenever engineers fall into the trap of discussing deep technical issues, move those discussions asynchronously and include in the follow-up discussion only those that are interested.

If they have to hear about uninteresting topics that don't contribute to the progress towards the team's goal, people will — rightfully — stop coming to the stand-up (or complain about it, as we do now).

Think of the stand-up as the moment to identify issues, not necessarily as the moment to solve them.

Responsible teams are self-organizing, which means that once an issue surfaces, they'll go after what they need to solve it, provided they're given guidelines on the desired outcome.

If something can be solved right on the spot, ideally in less than three or four minutes, that's fine. The cost of scheduling another meeting and coordinating with different people is higher than using everyone's time to solve the problem. If that's not the case, it's more costly to keep everyone listening to something that doesn't matter to them.

Please notice I'm not saying you should exclude people from these discussions. In fact, it's quite the opposite. I'm just saying you should _not_ assume everyone is interested. Instead, you should assume they aren't interested but give everyone the chance to participate in the follow-up meeting.

<br>

### Incentivize self-management and instil psychological safety

This last piece of advice is the only one I consider to be mandatory to follow.

When folks get penalized for surfacing issues, they won't do so. Consequently, problems will only appear when they become too costly or nearly impossible to solve. Instead, you should incentivize the team to raise issues as soon as they appear.

When raised early, problems are usually easy to solve. For example, altering a problematic specification is usually much less costly than scrambling to fix a critical bug in production.

By instilling a sense of psychological safety in the team, they'll know that _any_ questions are valid. Then, instead of assuming they know the answer and causing problems down the line, they'll simply ask, given there's no penalty for doing so.

Furthermore, I believe psychological safety is a worker's right. No one deserves to live in fear and anxiety because of things they didn't understand, particularly because most of the time it's not a fault of their own. Even if it were, it doesn't matter. Product development is not about blame. Blaming others doesn't help you achieve your goals. Answering questions and solving problems do.

[Teams that feel psychologically safe are more innovative and productive](https://hbr.org/2017/08/high-performing-teams-need-psychological-safety-heres-how-to-create-it) and, therefore, are capable of self-organizing.

Psychological safety helps people focus on the goal at hand, which means they know what they must do and will go after solutions even when their manager or "scrum master" is not present.

> The best architectures, requirements, and designs emerge from self-organizing teams. — The Agile Manifesto


<br>

## Putting it all together

Daily stand-ups are a classic example of self-learned helplessness. We all know they suck. Yet, we don't do anything about them. These days, we do stand-ups because that's what we're told to do, not because they solve any particular problems.

Stand-ups themselves are not a waste of time. They've become a waste of time because of how most teams do them.

Focusing on people's work and using busyness as a proxy for productivity hinders a stand-up meeting's benefits. Instead, stand-ups should be short, concise, and focus on the team's collective goal.

When done right, stand-ups diminish the time it takes to get feedback, reduce communication overhead, and allow different functions to align their priorities.

For teams to improve their stand-ups and consequently achieve their goals, I recommend that they:

1. Stop rambling and go through a Kanban board instead.
2. Prioritize aging issues.
3. Focus on blockers.
4. Invite the entire team, including PMs and Designers.
5. Move detailed discussions asynchronously.
6. Incentivize self-management and instil psychological safety.

<br>

## Wanna talk?

**I currently offer mentorship and consulting packages for individuals and startups wishing to ship more software in less time and with less stress. If you're interested in improving your processes and pipelines, <a onclick="sa_event('calendly-exploiting-uncertainty')" target="_blank" href="https://calendly.com/lucasfcosta/1-1-with-lucas">book a free introduction call here</a>**. I'd love to help you solve any problems you might be facing or answer any questions you might have.

Alternatively, you can [send me a tweet or DM @thewizardlucas](https://twitter.com/thewizardlucas) or [an email at lucas@lucasfcosta.com](mailto:lucasfcosta.com).
