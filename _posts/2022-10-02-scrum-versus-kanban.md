---
layout: post
title: "How to fix Scrum by using Kanban"
author: Lucas Fernandes da Costa
place: London, United Kingdom
flag: 🇬🇧
tags: agile process practices
---

Why did you choose Scrum instead of Kanban? If you can't answer that question, you didn't choose Scrum. Someone else chose it for you.

Even in the rare case people can answer this question, they reveal their deep misunderstanding of Kanban by mentioning one or more of these reasons:

1. Scrum makes teams more responsive
2. Scrum makes estimations easier
3. Scrum makes work visible
4. Scrum reduces waste
5. Scrum creates cadenced meetings

_All_ of the reasons above apply to Kanban as much as they apply to Scrum. The difference is that Scrum completely ignores your process' nuances and tells you exactly what to do and _how_ to do it. In a way, Scrum is a manager's training wheels: it prevents them from bruising their knees, but also prevents their teams from being as fast and dynamic as they could be.

Kanban, on the other hand, establishes principles. Once you understand these principles, you can tailor them to your particular situation and obtain much better results. Managers who master Kanban's principles don't need training wheels. Whether they're riding a bike or a motorcycle, they'll just need a few laps to understand the circuit, optimize their strategy, and overtake competitors.

And, no, I'm not saying Scrum doesn't work. I'm saying the exact opposite. Scrum _does_ work, but it works for the same reasons Kanban does. The difference between them is that Scrum is slower and more prescriptive, and thus less adaptable (or "agile", whatever you wanna call it).

Scrum becomes even more harmful when managers create their flavor of Scrum, trying to shoehorn prescriptive guidelines into a context in which they don't fit. When that happens, managers turn an inefficient yet sound framework into an inefficient _and_ defective process. That's because they ignored the Kanban dynamics which made "by-the-book Scrum" work.

**In this post, I'll expound on the reasons I prefer Kanban over Scrum, and explain the ways in which Scrum hinders a team's performance**.

Additionally, I'll also explain why each of the aforementioned benefits of adopting Scrum also apply to Kanban, and how Kanban amplifies those benefits.

<br>

## How Kanban amplifies Scrum's benefits

<br>

### Scrum makes teams more responsive

Scrum makes teams more responsive because when sprints are two-week long, you'll take no longer than two weeks to respond to feedback.

Still, teams that perform Kanban can respond to feedback even more quickly because they don't have to wait until the next sprint planning meeting to decide what the next steps are and take action.

Furthermore, because Kanban focuses on tasks rather than sprint-sized batches, it pushes responsibility to the edges of the team, meaning engineers are responsible for going after the pieces of information they need to move forward.

When that happens, instead of designing features by committee, which demands a significant amount of back-and-forth discussions, decisions happen locally, and thus are easier to make.

Additionally, fewer people making decisions lead to fewer assumptions. Fewer assumptions, in turn, lead to shipping smaller pieces of software more quickly, allowing teams to truncate bad paths earlier.

<br>

### Scrum makes estimation easier

Scrum shortens planning horizons by limiting batch-sizes to two week sprints. These two-week long batches are better than year-long batches because it's there's less room for error when estimation fewer tasks. Furthermore, errors become less critical because you can course-correct earlier.

Still, because Scrum is a push-based system, it still requires you to do some form of estimation so that you know how large will be the batch you must push.

This demand for estimations leads to unproductive and unnecessary estimation meetings. These meetings are unproductive because they cause developers to spend time debating whether something is worth two or three story points instead of actually writing code. They're also unnecessary because if you feed the system with more work as soon as software comes out, estimations don't matter.

That's not to say you can't accurately estimate software tasks unless they know exactly what pieces of code must be written, in which case it would be probably better to write that code instead of thinking about it and doing useless planning.

Kanban, on the other hand, is a pull-based system. In Kanban, processors pick new work items whenever they're ready for more work.

Therefore, instead of having to estimate tasks, you simply focus on ensuring tasks come into the system at the same rate tasks come out. When that happens, all you need to do is prevent the system from starving, which is much easier to do than estimating tasks accurately.

<br>

### Scrum makes work visible

I find this reason to adopt Scrum extremely ironic. It's ironic because the way Scrum makes work visible is by adopting a Kanban board.

I don't think this topic would need any further explanation because the simple fact that Kanban boards were made for practicing Kanban should be a strong enough argument. Still, it's worth highlighting that making work visible by itself doesn't make any difference if you don't actually use that visualisation to take action.

In Kanban, practitioners use the board to visualise which tasks have been stuck in a particular column for too long, assess why that's happening, and either cut scope or take further action to remove the bottleneck.

There's no particular structures in Scrum that incentivise that to happen because Scrum is an opaque framework. It hides from its practitioners the fact that the more items you have on the board, the longer average cycle times will be. It also offers no advice on how to handle those aging items.

<br>

### Scrum reduces waste

Imagine you own a car factory. In that factory, there are three production stages. First, you make the vehicle's tires, then, you attach them to the car's chassis, and, finally, you assemble the body parts.

If you produce tires faster than you can attach them to the chassis, you'll end up cluttering the factory floor with useless ruber. Conversely, if you can't produce tires fast enough, the chassis production will starve. The same problem would happen if you produce chassis faster than you can send them forward to assemble and attach body parts and vice-versa.

In Scrum, you must ensure that each part of the process will perform uniformly throughout the whole sprint because you'll push a two-week large batch at once. Otherwise, you may create tires more quickly than you product the chassis to which you'll attach them, or produce too few tires for further stages of the process to consume.

In Kanban, instead of carefully measuring each part of the process and ensuring it works uniformly, you simply focus on rate matching processes from right to left, meaning you will only start working on the next set of tires once the chassis-mounting stage has signaled its ready for more work.

That way, you can dynamically adapt to problems that may happen temporarily at any part of the process. If your deployment process breaks, for example, you'll be able to focus on fixing it instead of starting new tasks and causing everything to take longer on average, both because of the sheer amount of pending tasks and because of the cost of context switching.

<br>

### Scrum creates cadenced meetings

In Scrum, teams will usually have regular stand-ups, sprint planning meetings, and retrospective sessions. Except for the sprint planning meeting, those are all productive meetings to have. Still, you don't need to practice Scrum to be able to put regular meetings in everyone's calendar. Additioanlly, it may not be productive for these meetings to happen on a fixed cadence.

As I mentioned before, sprint planning meetings are unproductive because they lead to "designing by committee" and focus on getting estimations right, which is not only a waste of time, but also impossible to do in a stochastic process such as software development.

Daily stand-ups and retrospective sessions, however, are useful and productive.

Regular daily stand-ups help teams cut scope earlier and coordinate to move aging tasks forward, keeping their cycle-times more uniform and predictable. In Kanban, these meetings become even more useful because practitioners have clearer intervention points due to setting work-in-progress limits and going through the Kanban board itself to ensure team members focus on outcomes, not implementation details.

Retrospective sessions are also fundamental for a team to continuously improve the way it works. The problem with these sessions in Scrum is that they either happen too early or late. Although it's good for teams to discuss their practices and look for ways to improve them, it may not be necessary to hold a retrospective session if everything is going fantastically well. Conversely, it may be harmful to wait for two or more weeks to discuss systemic problems impacting the current pieces of work or the overall goal the team is working towards.

In Kanban, there's nothing preventing teams from scheduling regular meetings. Yet, teams have the flexibility to schedule meetings whenever they're necessary.

<br>

## Putting it all together

Scrum is not necessarily a bad framework to adopt. It works. However, Scrum is a manager's training wheels. It helps managers get started quickly without having to spend too much time designing processes in detail. Still, Scrum prevents teams from moving as fast as they could because of its prescriptiveness.

Teams could reap all of Scrum's benefits without having to adhere to its prescriptive practices which may not work for their particular scenario.

Kanban is an excellent way to design those processes because it's a simpler and less-prescriptive pull-based system whose sound principles establish the dynamics for creating efficient system. In fact, those very principles are built into Scrum, and are what makes Scrum work.

Teams that do Kanban can still be responsive, size work effectively, make it visible, reduce waste, and create cadenced continuous improvement and adaptative meetings.

Kanban helps teams be more responsive because it allows them to respond to customer feedback and adapt to week in a time-frame shorter than two weeks.

Furthermore, it enables teams to size work effectively because it relies on rate matching instead of accurate accurate estimations, which are almost impossible to do given the stochastic nature of the software development process.

Such focus on rate-matching, when combined when principles such as limiting work in progress, reduces waste because it incentivises just-in-time scoping, allowing teams to create stories closer to the time at which they'll be implemented and shipped.

Finally, Kanban makes work visible as much as Scrum does because the Kanban board was made, obviously, specifically for Kanban, which also determines good practices for reviewing the board and taking action.

Most of Scrum's cadenced meetings, with the exception of the planning meeting are also useful. Still, teams don't need Scrum to be able to schedule regular events such as daily stand-ups. In some cases, teams may not even want to have such regular events. Retrospectives, for example, may be useless if everything is working fantastically well, and the team needs to focus on shipping a particular feature instead of meeting to say everything is going great.

<br>

## Wanna talk?

**If you'd like to have a chat, <a onclick="sa_event('calendly-scrum-vs-kanban')" target="_blank" href="https://calendly.com/lucasfcosta/1-1-with-lucas">you can book a slot with me here</a>**. I'd love to help you solve any problems you might be facing or answer any questions you might have.

Alternatively, you can [send me a tweet or DM @thewizardlucas](https://twitter.com/thewizardlucas) or [an email at lucas@lucasfcosta.com](mailto:lucas@lucasfcosta.com).
