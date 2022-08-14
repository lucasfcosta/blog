---
layout: post
title: "Deciding who decides what, and when"
author: Lucas Fernandes da Costa
place: London, United Kingdom
flag: 🇬🇧
tags: agile process practices
---

Large enterprises aren't slow because they're large. They're slow because whenever a decision needs to be made, information travels eight thousand layers of management up, and then eight thousand layers of management back down.

By the same token, startups aren't fast because they're small. They're fast because decisions are made by the team closest to the problem. When the founder is writing the code, controlling the budget, and talking to customers, there isn't anyone else from whom they need approval.

Still, there is value in centralizing some decision-making up top. As a company grows, it has wider array of liabilities, and more resources to manage and distribute across a vast number of teams. Therefore, to prevent harm, and ensure different team's decisions align to the company's goal, information travels up to someone with the broader picture and decision-making power.

To succeed, a company must rally their teams towards the same direction, and allocate its resources efficiently and responsibly, without harming the speed at which decisions are made.

**In this post, I'll explain how to allocate decision-making power throughout the organisation for it to make customers happier, and its bottom-line mightier.**

First, I'll expound on the dynamics of decision-making. I'll show how information travels throughout organisations and what happens to it as it moves up and down.

Then, I'll cover the advantages and disadvantages of making decisions at the top of the organisation versus at its bottom, and the heuristics you should use to decide whether to push decisions up, down or sideways.

Finally, I'll advise on how to decentralize effectively. In this section I'll illustrate how to effectively push decision-making power towards a company's borders while maintaining teams aligned to the organisation's higher goal, and without compromising legal and financial stability.

As usual, I've included a small summary at the end of this post to make sure you've got it all right.

<br>

# The dynamics of decision-making

Here's an F16 fighter-jet. To explain the dynamics of decision making, I'll put you in the pilot's seat, and have you join the fleet. Welcome, captain.

<a target="_blank" class="image-link" href="/assets/decision-making/f16.jpeg"><img style="margin-bottom: -18px;" src="/assets/decision-making/f16.jpeg" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>A Royal Norwegian Air Force F-16 fighter jet</i></center>

When you and your fleet engage in aereal warfare, you must locate your target, and bring it down. Hopefully you'll never have to do that, and neither will anyone, but, for the sake of this example, we'll go with that analogy.

As you fly through the sky, your plane is equipped with sensors to detect an enemy's position, so that you can act accordingly to attack or defend yourself and your fleet.

In aerial warfare, reaction times are crucial. The quickest you can locate your target, make a decision, and act, the greater your chances of success. That's not me saying it. I have zero military experience. That's an observation made by colonel John Boyd, which created [the OODA loop](https://en.wikipedia.org/wiki/OODA_loop).

<a target="_blank" class="image-link" href="/assets/decision-making/ooda-loop.png"><img style="margin-bottom: -18px;" src="/assets/decision-making/ooda-loop.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>The four parts of the OODA loop</i></center>

According to him, the quickest you can close OODA loops, the greater your advantage. That's because the enemy will have less time to move from the observed position, and your decision will have been made with fresh information about the battefield.

As the diagram below shows, when the fleet acts autonomously, they can sense the enemy and act immediately.

<a target="_blank" class="image-link" href="/assets/decision-making/one-level-decision-plane.png"><img style="margin-bottom: -18px;" src="/assets/decision-making/one-level-decision-plane.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>Because it acts autonomously, there's only a small delay between collecting information and acting on it</i></center>

When developing software, the same principle applies. Software development teams must collect information about the customers to which they catter, decide what to deliver, and deliver it as quickly as possible to collect feedback and react to the moving target of making something customers want. That's because customers wants may change over time, and because it's unlikely you'll hit the target on your first delivery attempt.

In other words, quickly closing the OODA loops creates a competitive advantage in product development.

Now, back to your pilot seat, imagine what would happen if you had to talk to a commander on the ground before shooting the enemy. In that case, you'd have a delayed response time because you'd have to provide the commander with information from the battlefield, and wait for their response before acting. Given this delay is larger, it allows the enemy more time to move away from the previously observed position, and act against you.

Furthermore, by the time your commander receives the battlefield's information, it may be out-of-date, causing them to provide you with inefficacious instructions.

We can represent such a comunication structure using a tree of command, which represents the airforce hierarchy.

<a target="_blank" class="image-link" href="/assets/decision-making/two-levels-decision-plane.png"><img style="margin-bottom: -18px;" src="/assets/decision-making/two-levels-decision-plane.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>When the fleet must report to the commander and wait for its response before they act, more time passes between collecting the information and acting on it</i></center>

In the graph above, each of the arrows increases the delay between collecting information and acting on it. That's because every time communication needs to happen, in whichever direction it is, it takes time.

To ensure these first principles will land smoothly, let me take it [a knot](https://en.wikipedia.org/wiki/Knot_(unit)) further.

This time, we'll illustrate what happens if the commander needs to talk to their boss, the sargeant, before they tell the fleet what to do. In that case, there will be one extra hop, delaying response time even further.

<a target="_blank" class="image-link" href="/assets/decision-making/three-levels-decision-plane.png"><img style="margin-bottom: -18px;" src="/assets/decision-making/three-levels-decision-plane.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>Adding yet a third level of hierarchy to decision-making increases the fleet's response time</i></center>

Want to make things even worse? Just think about what would happen if, before making a decision, the sargeant had to contact the slowest decision-making structure in the world: a committee.

<a target="_blank" class="image-link" href="/assets/decision-making/four-levels-decision-plane.png"><img style="margin-bottom: -18px;" src="/assets/decision-making/four-levels-decision-plane.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>A fourth hop, the committee, increases the fleet's response time even further</i></center>

At this point, by the time the fleet gets a response, the enemy might as well be in whole different continent.

Does this sound like a stupid decision-making structure? That's because it is. Still, software companies do it all the time.

The more extra hops necessary for decision making, the greater the delay between collecting information and acting on it. This larger delay allows the target more time to move and position itself. Furthermore, the greater the distance between the sensors and the decision-maker, the more likely it is for the decision-maker's information to be out-of-date, thus leading to poor outcomes.

The same principles apply to product developers. If every product-decision needs to be escalated all the way up to the CEO, the more likely it will be for the CEO to be making decisions based on out-of-date information. Additionally, by the time the CEOs decision reaches the developers themselves, it may be the case that this decision is not optimal anymore.


<br>

## Likelihood of corrupting information

Besides delaying response times, an increase in communication hops also increases the likelihood of information being corrupted between the sender and the receiver.

That's the case in computer networks, for example. When machines talk to each other, they must implement redundancy mechanisms, like [CRCs](https://en.wikipedia.org/wiki/Cyclic_redundancy_check) or other communication protocols, which add to the amount of information which needs to be transmitted and delay the transmission itself.

In the case of computer networks, these mechanisms may not add significant time to transmitting information, but that's because machines are extremely fast and exceptionally good a following instructions without making mistakes.

Unfortunately — or fortunately, depending on your point-of-view — our human world is nothing like the elegant world of computers. In human communication, there's ambiguity, and, consequently, a lot more room for error.

As you add hops in human communication, the more likely it is for the receiver to either misunderstand the information or receive incomplete information. To fix this, you'd have to add more redundancy mechanisms, which would add to the response time.

<a target="_blank" class="image-link" href="/assets/decision-making/redundancy-decision-plane.png"><img style="margin-bottom: -18px;" src="/assets/decision-making/redundancy-decision-plane.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>Each communication hop adds latency. Therefore, extra hops for redundancy create even more latency.</i></center>

By now, you're solving a problem you've created yourself by adding too many communication hops. Instead, it would be much better if you avoided unnecessary communication so that you don't even have to add redundancy mechanisms.


<br>

# When to centralize and when to decentralize

There are three factors to consider when deciding whether to move decision-making up, down, or sideways:

1. Response time
2. Resource pricing
3. Demand variability

In this section, I'll cover each one of them, and use a few illustrative examples to demonstrate how to apply each of these heuristics.


<br>

## 1. Response time

By now, it should be clear that as communication hops increase, response times increase, and so does the likelihood of corrupting information and acting on outdated information.

Therefore, you must consider decentralizing decision-making power when response-time and accuracy are critical.

In the airforce, that means allowing the fleet to make decisions with regards to when to attack, and when to defend themslves.

In product development teams, that means enabling teams closer to the customer to make decisions which shape the product and its features.

As response time becomes less important, you can push decision-making power up.

Pilots don't have to decide the countries to which they fly in a matter of seconds, for example. For that, they rely on the military's strategists to set plans in a matter of hours or maybe even days. These plans, in turn, align with the country's foreign policy, which the contry's bureaucrats take many weeks to decide — when they're quick.

Similarly, a product developers' goals should align with the company goals, set by the CEO and strategists up top. It's not the CEO's job, however, to decide how to respond to each customer's feedback.


<br>

## 2. Resource pricing

An F16's fuel is cheap compared to an F16 itself. An aicraft carrier, however, is even more expensive. Now imagine how much a whole fleet of carriers would cost. A lot, right?

It's because of the difference in these resource's cost that the access to them is controlled at different levels in the military's hierarchy. Although a pilot can make decisions on how to maneuver their F16 in the heat of battle, they can't decide where to allocate the F16s too. That's their boss job. Their boss, in turn, can't decide on their own where to position aircraft carriers. For that, they must talk to yet another boss.

By the same token, in product development, a product team (ideally) doesn't have access to the whole company's cloud budget. Instead, they're given a limited amount of resources. Then, if they need access to more, they must send a request upwards.

The larger the price of the requested resources, the further up top the request must go.

Conversely, when a request is cheap, the team should be autonomous enough to buy it. Imagine, for example, having to send a business plan to your CEO just to acquire an EC2 micro. Painful, isn't it?


<br>

## 3. Demand variability

Resources which aren't frequently needed can be pushed sideways. Not every product development team needs a lawyer in it, for example. Still, when launching a new product, an infrequent event, the team will have to contact the company's lawyer for them to craft the product's terms of service and privacy notices, for example.

Furthermore, different parts of the organisation may need access to legal resource, like the HR department, for example.

Because requests occur significantly infrequent, and may come from different places, the demand for legal resources is highly variable. Therefore, it makes sense to push these resources sideways to somewhere multiple teams can access.

In that way, the company will create a pool of lawyers which can be assigned to different tasks as demand comes in.

<a target="_blank" class="image-link" href="/assets/decision-making/variable-demand-resource.png"><img style="margin-bottom: -18px;" src="/assets/decision-making/variable-demand-resource.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>A fourth hop, the committee, increases the fleet's response time even further</i></center>

I like to call this model of collaboration as "X-as-a-service", as Matthew Skelton and Manuel Pais do when describing certain types of teams in their brilliant book ["Team Topologies"](https://teamtopologies.com/).

One last thing to note about these decentralised resources is that one must also consider response times when determining the size and performance metrics for these teams.

If the time it takes to get a response from the legal team is critical, it would be wise for organisation designers to prioritise having a larger team, even if that team is idle or working on unimportant items most of the time. That "oversizing" allows for requests to be serviced as soon as they come in.

On the other hand, when legal decisions aren't time-sensitive and resources are too expensive, you should consider prioritising efficiency (high capacity utilisation) over response time. For that, you'd hire fewer resources, and you'd be aware that requests may have to enter a queue more frequently, increasing the response time for those requests.

Two alternatives are:

1. Breaking the legal team down into a fast-response team with cheaper resources, and a slow response team with expensive resources.
2. Establishing classes of service so that critical requests jump to the front of the queue. Just be careful not to make everything "critical" — which would cause _nothing_ to be critical.

If you don't mind adding complexity, it's also possible to mix both strategies, although I'd advise against adding this much complexity unless extremely necessary.

<a target="_blank" class="image-link" href="/assets/decision-making/variable-demand-resource-multi-latency.png"><img style="margin-bottom: -18px;" src="/assets/decision-making/variable-demand-resource-multi-latency.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>A high-latency and a low-latency legal team which may receive requests with different priorities (classes of service)</i></center>

> To understand how capacity utilisiation impacts response times, read [_"How high capacity utilisation hurts a team's performance"_](https://lucasfcosta.com/2022/06/12/measure-queues-not-cycle-time.html).

Conversely, when a resource's demand is frequent, it's worth bundling that resource into the team, so that one can cut unnecessary communication channels and thus reduce response time. That's the principle behind multi-disciplinary teams.


<br>


# How to decentralize decision-making successfully

As organisations decentralise decision-making power, they face a common challenge: ensuring that the each node down the tree is aligned to the organisation's overall strategy. Now, the most difficult part of solving this problem is not to do the alignment itself, but to ensure there will be alignment with as little communication hops as possible.

It's easy for a company to be aligned if every single decision goes through the CEO. On the other hand, that align is costly because it decreases response time, increasing the likelihood of failure. Furthermore, there's only so much bandwidth the CEO has for dealing with every single small decision that reaches them.

To decentralize successfully, organisations must control two variables depending on a node's hierarchical position:

1. Prescriptiveness
2. Resource allocation

There's also a third control variable which must be consistent across all levels, and is often underestimated: culture.

In this section, I'll cover these three control variables.

<br>

## 1. Prescriptiveness

In the military, alignment starts with bureaucrats at the top who shape the country's foreign policy in a slow and gradual fashion. The country's foreign policy is reasonably abstract, and tends not to be too prescriptive.

The country's foreign policy then propagates down to high-patent officials, which use it to drive their strategic goals. These official's plans are more prescriptive than the country's foreign policy plan. Yet, they don't tell troops on the ground how they must act. Instead, they set constraints, and create a clearer definition of success.

As plans move down the military's hierarchy, detail is added. Furthermore, as the action unravels, information travels up only by as much as it needs to adapt to the current state of battle. Officials at the top don't need to know about every single marine's step, but they do need to know about major successes and accomplishments.

Similarly, product development organisations shouldn't tell product developers at its extremities exactly how they must behave when customer feedback comes in. Still, they do need to know about major successes, and provide the teams at the leaves with gradually more prescriptive information, and useful constraints to prevent critical failures.

Such organisations trust that people at its boundaries are capable of responding adequately, and thus avoid taxing those people with too many communication hops.

In a fintech, for example, the executives up-top don't need to know about every design decision such as the colour of a particular button, or how information is displayed. Executives up top trust the product developers to make adequate product and design decisions. Yet, they need to know whether those teams succeed at acquiring a large number of customers and generating revenue, so that they can drive the company's direction accordingly.

<a target="_blank" class="image-link" href="/assets/decision-making/prescriptiveness-hierarchy.png"><img style="margin-bottom: -18px;" src="/assets/decision-making/prescriptiveness-hierarchy.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>How prescriptiveness and information detail resolution change depending on a node's hierarchical position</i></center>

> That's exactly how OKRs are supposed to work. Organisations which make good use of OKRs will ensure that the OKRs at the top will feed into the more granular and prescriptive OKRs at the bottom.
> Although I'm not necessarily a big fan of prescriptive methods such as this, its principles are sound.

<br>

## 2. Resource allocation

For teams to act autonomously, they should be able to tap into local resources without communication overhead.

For example, it would be detrimental to the airforce's performance if a pilot had to ask their commander for permission to use each gallon of fuel. Similarly, as I mentioned before, it would be detrimental for teams to have to speak to the CFO whenever they need a new EC2 micro instance.

By defining gradually smaller budgets as one goes from the top of an organisation's to its bottom, organisation designers enable teams to manage their own resources in the best possible way to achieve a fast and satisfactory response.

Conversely, by allowing these teams to tap into gradually budgets from above, a team doesn't need to ask for CFO permission as soon as it needs to acquire a slightly more expensive resource.

One example from [a Reinertsen's talk I really like (_Decentralizing Control: How Aligned Initiative Overcomes Uncertainty_](https://vimeo.com/45947817), is the Boeing 777 weight reduction decision authority. According to Reinertsen, because of a particular deal, Boeing had the goal of reducing the plane's weight so that it could spend less fuel. For that, Boeing allowed the engineers at the extremities of the organisation to make decisions which would reduce the plane's cost per pound without having to ask for permission as long as the cost of that decision was smaller than $300 dollars per pound. As the cost of reducing the plane's became higher, they needed to reach for someone of higher hierarchy to get approval.

<a target="_blank" class="image-link" href="/assets/decision-making/budget-hierarchy.png"><img style="margin-bottom: -18px;" src="/assets/decision-making/budget-hierarchy.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>How budgets change depending on a node's hierarchical position</i></center>

<br>

## 3. Culture

Culture is the one single element which aligns behaviour patterns across the entire organisation.

In the military, a marine knows exactly how another marine will react to a particular situation. Therefore, when combat gets intense, they can act in unison without having to communicate as much.

Similarly, in organisations whose culture is pervasive throughout all hierarchical levels, every employee knows how its fellow will react given different circumstances.

It's also worth highlighting that culture is not only about how employees behave towards one another. It's also how they behave towards their goals.

Organisations which have a customer-centric culture, for example, will focus on their customer's feedback above all else. Therefore, they'll ship sooner, talk to their customers more often, and, consequently, will probably make more money.


<br>

# Putting it all together

To succeed at product development, developers must continuously gather customer feedback, decide what to deliver, and deliver it as quickly as possible. The higher the frequency at which they can close this loop, the larger the team's competitive advantage.

As the number of communication hops necessary for decision making increases, so does the delay between gathering feedback and responding to it. These slow responses, hinder a team's chance of success.

Furthermore, an increase in the number of communication hops also increases the likelihood of information being corrupted as it travels up top and back down.

Besides high latency and likelihood of corrupted information, more communication hops may also cause decision-makers to act on outdated information, leading to poor outcomes.

There are three factors to consider when deciding whether to move decision-making up, down, or sideways:

1. Response time
2. Resource pricing
3. Demand variability

When response time is critical, organisation designers must consider decentralising resources, so that the decision makers are closer to the environment's feedback, and thus can act more quickly.

As resource prices decrease, leaders can push these resources towards the extremities of the organisation, so that people closer to the customer can tap into these resources more quickly and achieve low-latency responses.

When the demand for a resource is variable, it's worth centralising that resource, so that multiple teams can access resources from the pool, optimising efficiency. Just don't forget to prioritise response times over capacity utilisation as response times become more critical.

To decentralise resources successfully, there are three levers to which leaders must pay attention:

1. Prescriptiveness
2. Resource allocation
3. Culture

The higher in the hierarchy a node is, the least prescriptive its plans should be. High level plans must have gradually higher levels of detail as they propagate down. Such a technique allows for teams to be aligned to the organisation's overall goals, while still allowing nodes at the bottom to act autonomously so that they can respond quickly.

The further down in the hierarchy a node is, the least resources are allocated to them. Such gradual allocation of resources allow for nodes to act autonomously when the decision-making cost is low, and allows them to reach gradually higher in the hierarchy as those needs become more expensive.

An organisation's culture drives each employee's behaviour and allows them to make decisions aligned to the organisation's strategy, and predict how fellow employees will behave, enhancing collaboration. Organisations which have a customer-centric culture, for example, will focus on their customer's feedback above all else. Therefore, they'll ship sooner, talk to their customers more often, and, consequently, will probably make more money.

<br>

# Recommended content

* [The Principles of Product Development Flow: Second Generation Lean Product Development — Donald G. Reinertsen](https://www.amazon.co.uk/dp/B00K7OWG7O) (a brilliant book — it's the usual recommendation)
* [LSSC12 : Decentralizing Control: How Aligned Initiative Conquers Uncertainty — Donald G. Reinertsen](https://vimeo.com/45947817)
* [Second Generation Lean Product Development Flow — Donald G. Reinertsen](https://www.youtube.com/watch?v=L6v6W7jkwok&ab_channel=AdventureswithAgile)
* [How high capacity utilisation hurts a team's performance](https://lucasfcosta.com/2022/06/12/measure-queues-not-cycle-time.html) — [Lucas da Costa](https://twitter.com/thewizardlucas)

<br>

# Wanna talk?

You can [send me a tweet or DM @thewizardlucas](https://twitter.com/thewizardlucas) or [an email at lucas@lucasfcosta.com](mailto:lucasfcosta.com).
