---
layout: post
title: "How to decide who makes decisions"
author: Lucas Fernandes da Costa
place: London, United Kingdom
flag: 🇬🇧
tags: agile process practices
---

Large enterprises aren't slow because they're large. They're slow because whenever a decision needs to be made, information travels eight thousand layers of management up and then eight thousand layers back down.

By the same token, startups aren't fast because they're small. They're fast because the people making decisions are the ones closest to the problem. When the founder is writing the code, controlling the budget, and talking to customers, there isn't anyone else from whom they need approval.

Still, there is value in centralizing some decision-making up top. As a company grows, it has a broader array of liabilities and more resources to manage and distribute across many teams. Therefore, to prevent harm and ensure different teams' decisions align with the company's goal, information travels up to someone with the broader picture and decision-making power.

To succeed, a company must rally their teams in the same direction and allocate its resources efficiently and responsibly without harming the speed at which decisions are made.

**In this post, I'll explain how to allocate decision-making power throughout the organization to make customers happier and its bottom-line mightier.**

First, I'll expound on the dynamics of decision-making. I'll show how information travels throughout organizations and what happens as it moves up, down, or sideways.

Then, I'll cover the advantages and disadvantages of making decisions at the top of the organization versus at its bottom and the heuristics you should use to decide whether to push decisions up, down or sideways.

Finally, I'll advise on how to decentralize effectively. In this section, I'll illustrate how to effectively push decision-making power toward a company's borders while maintaining teams aligned to the organization's higher goal and without compromising legal and financial stability.

As usual, I've included a small summary at this post's end to ensure you've got it all right.

<br>

# The dynamics of decision-making

Here's an F16 fighter jet. Grab your helmet and take the pilot's seat. To explain the dynamics of decision-making, you'll have to join the fleet. Welcome, captain.

<a target="_blank" class="image-link" href="/assets/decision-making/f16.jpeg"><img style="margin-bottom: -18px;" src="/assets/decision-making/f16.jpeg" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>A Royal Norwegian Air Force F-16 fighter jet</i></center>

When you and your fleet engage in aerial warfare, you must locate your target and bring it down. Hopefully, you'll never have to do that, and neither will anyone, but for the sake of this example, we'll go with that analogy.

As you fly, your plane is equipped with sensors to detect an enemy's position so that you can act accordingly to attack or defend yourself and your fleet.

In aerial warfare, reaction times are crucial. The quickest you can locate your target, make a decision, and act, the greater your chances of success. That's not me saying it. I have zero practical military experience. That's an observation made by colonel John Boyd, which created [the OODA loop](https://en.wikipedia.org/wiki/OODA_loop).

<a target="_blank" class="image-link" href="/assets/decision-making/ooda-loop.png"><img style="margin-bottom: -18px;" src="/assets/decision-making/ooda-loop.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>The four parts of the OODA loop</i></center>

According to him, the quickest you can close OODA loops, the greater your advantage. That's because the enemy will have less time to move from the observed position, and you will have made your decision with fresh information about the battlefield.

As the diagram below shows, when the fleet acts autonomously, they can sense the enemy and act almost immediately. That's because information goes through only one processing layer.

<a target="_blank" class="image-link" href="/assets/decision-making/one-level-decision-plane.png"><img style="margin-bottom: -18px;" src="/assets/decision-making/one-level-decision-plane.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>Because it acts autonomously, there's only a small delay between collecting information and acting on it</i></center>

When developing software, the same principle applies. Software development teams must collect information about the customers to which they cater, decide what to deliver, and deliver it as quickly as possible to gather feedback. Once they collect feedback, they should restart the loop and incorporate that feedback into the product.

Closing that loop quickly helps these teams deliver better products. That's because customers' wants may change, competitors may appear, and because it's unlikely you'll hit the target on your first delivery attempt.

In other words, quickly closing the OODA loops creates a competitive advantage in product development too.

Now, back to your pilot seat, imagine what would happen if you had to talk to a commander on the ground before attacking the enemy. In that case, you'd have a delayed response time because you'd have to provide the commander with information from the battlefield and wait for their response before acting. The greater latency allows the enemy more time to move away from the previously observed position and act against you.

Furthermore, by the time your commander receives the battlefield's information, it may be out-of-date, causing them to provide you with inefficacious instructions.

We can represent such a communication structure using a tree of command, which represents the airforce hierarchy.

<a target="_blank" class="image-link" href="/assets/decision-making/two-levels-decision-plane.png"><img style="margin-bottom: -18px;" src="/assets/decision-making/two-levels-decision-plane.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>When the fleet must report to the commander and wait for its response before they act, more time passes between collecting the information and acting on it</i></center>

In the graph above, each arrow increases the delay between collecting information and acting on it. That's because every time communication needs to happen, in whichever direction it is, it takes time.

To ensure these first principles will land smoothly, let me take it [a knot](https://en.wikipedia.org/wiki/Knot_(unit)) further.

This time, we'll illustrate what happens if the commander needs to talk to their boss, the sergeant, before they tell the fleet what to do. In that case, there will be one extra hop, delaying response time even further.

<a target="_blank" class="image-link" href="/assets/decision-making/three-levels-decision-plane.png"><img style="margin-bottom: -18px;" src="/assets/decision-making/three-levels-decision-plane.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>Adding yet a third level of hierarchy to decision-making increases the fleet's response time</i></center>

Want to make things even worse? Just think about what would happen if, before making a decision, the sergeant had to contact the slowest decision-making structure in the world: a committee.

<a target="_blank" class="image-link" href="/assets/decision-making/four-levels-decision-plane.png"><img style="margin-bottom: -18px;" src="/assets/decision-making/four-levels-decision-plane.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>A fourth hop, the committee, increases the fleet's response time even further</i></center>

At this point, by the time the fleet receives a response, the enemy might as well be on a whole different continent.

Does this sound like an inefficient decision-making structure? That's because it is. Still, software companies do it all the time.

The more extra hops are necessary for decision-making, the greater the delay between collecting information and acting on it. This larger latency allows the target more time to move and position itself.

Furthermore, the greater the distance between the sensors and the decision-maker, the more likely it is for the decision-maker's information to be out-of-date, leading to poor outcomes.

The same principles apply to product developers. If every product decision needs to be escalated all the way up to the CEO, the more likely it will be for the CEO to make decisions based on out-of-date information. Additionally, by the time the CEO's decision reaches the developers themselves, it may be that this decision is not optimal anymore.


<br>

## Likelihood of corrupting information

Besides delaying response times, an increase in communication hops also increases the likelihood of information getting corrupted between the sender and the receiver.

That's the case in computer networks, for example. When machines talk to each other, they must implement redundancy mechanisms, like [CRCs](https://en.wikipedia.org/wiki/Cyclic_redundancy_check) or other communication protocols, which add to the amount of information which needs to be transmitted and delay the transmission itself.

In the case of computer networks, these mechanisms may not add significant time to transmitting information, but that's because machines are incredibly fast and exceptionally good a following instructions without making mistakes. That capability allows them to follow rigorous communication protocols flawlessly in no time.

Unfortunately — or fortunately, depending on your point of view — our human world is nothing like the elegant world of computers. In human communication, there's ambiguity and, consequently, a lot more room for error.

As you add hops in human communication, the more likely it is for the receiver to either misunderstand the information or receive incomplete information. To fix this, you'd have to add more redundancy mechanisms, which would add to the response time.

<a target="_blank" class="image-link" href="/assets/decision-making/redundancy-decision-plane.png"><img style="margin-bottom: -18px;" src="/assets/decision-making/redundancy-decision-plane.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>Each communication hop adds latency. Therefore, extra hops for redundancy create even more latency.</i></center>

By now, you're solving a problem you've created yourself by adding too many communication hops. Instead, it would be much better if you avoided unnecessary communication so that you don't have to add redundancy mechanisms.


<br>

# When to centralize and when to decentralize

There are three factors to consider when deciding whether to move decision-making up, down, or sideways:

1. Response time
2. Resource pricing
3. Demand variability

In this section, I'll cover each of them and use a few illustrative examples to demonstrate how to apply each of these heuristics.


<br>

## 1. Response time

By now, it should be clear that as communication hops increase, response times increase, and so does the likelihood of corrupting information and acting on outdated information.

Therefore, you must consider decentralizing decision-making power when response time and accuracy are critical.

In the airforce, that means allowing the fleet to decide when to attack and defend themselves.

In product development teams, that means enabling teams closer to the customer to make decisions which shape the product and its features.

As response time becomes less important, you can push decision-making power up.

Pilots don't have to decide the countries to which they fly in a matter of seconds, for example. For that, they rely on the military's strategists to set plans in a matter of hours or maybe even days. These plans, in turn, align with the country's foreign policy, which the country's bureaucrats take many weeks to decide — when they're quick.

Similarly, a product developer's goals should align with the company goals set by the CEO and strategists up top. However, it should not be the CEO's job to decide how to respond to each customer's feedback.

In any case, it may be helpful to bring CEOs and other high-level executives closer to the customer more frequently. That way, they can collect precise and uncorrupted information about the product's performance and customer satisfaction and incorporate that into their high-level strategy. Stripe does this brilliantly, for example.


<br>

## 2. Resource pricing

An F16's fuel is cheap compared to an F16 itself. An aircraft carrier, however, is even more expensive. Now imagine how much a whole fleet of carriers would cost. A lot, right?

Because of the difference in these resources' costs, access to them is restricted to different levels in the military's hierarchy.

A pilot can decide how to manoeuvre their F16 in the heat of battle without worrying about fuel, for example. Yet, they can't decide where to allocate the F16s themselves. That's their boss's job. Their boss, in turn, can't independently decide where to position aircraft carriers. For that, they must talk to yet another boss.

Similarly, in product development, a product team (ideally) doesn't have access to the whole company's cloud budget. Instead, they're given a limited amount of resources. Then, if they need access to more, they must send a request upwards.

The larger the price of the requested resources, the further up top the request must go.

Conversely, when a request is cheap, the team should be autonomous enough to buy it. Imagine, for example, having to send a business plan to your CEO to acquire an EC2 micro. Painful, isn't it?


<br>

## 3. Demand variability

Resources which aren't frequently needed can be pushed sideways. Not every product development team needs a lawyer in it, for example. Still, when launching a new product (an infrequent event), the team will have to contact the company's lawyer for them to craft the product's terms of service and privacy notice, for example.

Furthermore, different parts of the organization, like the HR department, may need access to a legal resource, for example.

Because requests occur infrequently and may come from different places, the demand for legal resources is highly variable. Therefore, it makes sense to push these resources sideways to somewhere multiple teams can access.

In that way, the company will create a pool of lawyers who can be assigned different tasks as demand comes in.

<a target="_blank" class="image-link" href="/assets/decision-making/variable-demand-resource.png"><img style="margin-bottom: -18px;" src="/assets/decision-making/variable-demand-resource.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>A fourth hop, the committee, increases the fleet's response time even further</i></center>

I like to call this model of collaboration "X-as-a-service", as Matthew Skelton and Manuel Pais do when describing certain types of teams in their brilliant book ["Team Topologies"](https://teamtopologies.com/).

One last thing to note about these decentralized resources is that one must also consider response times when determining these teams' size and performance metrics.

If the time it takes to get a response from the legal team is critical, it would be wise for organization designers to prioritize having a larger team, even if that team is idle or working on unimportant items most of the time. That "oversizing" allows teams to start working on requests as soon as they come in.

On the other hand, when legal decisions aren't time-sensitive, and resources are too expensive, you should consider prioritizing efficiency (high capacity utilization) over response time. For that, you'd hire fewer resources and have to accept that requests may have to enter a queue more frequently, increasing the request's lead time.

Two alternatives are:

1. **Breaking the legal team into a fast-response team with cheaper resources and a slow response team with expensive resources**. That's what computers do with memory hierarchies, for example.
2. **Establishing classes of service so that critical requests jump to the front of the queue**. Just be careful not to make everything "critical". In that case, _nothing_ would be critical.

If you don't mind adding complexity, mixing both strategies is possible, although I'd advise against adding this much complexity unless extremely necessary.

<a target="_blank" class="image-link" href="/assets/decision-making/variable-demand-resource-multi-latency.png"><img style="margin-bottom: -18px;" src="/assets/decision-making/variable-demand-resource-multi-latency.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>A high-latency and a low-latency legal team which may receive requests with different priorities (classes of service)</i></center>

> To understand how capacity utilization impacts response times, read [_"How high capacity utilization hurts a team's performance"_](https://lucasfcosta.com/2022/06/12/measure-queues-not-cycle-time.html).

Conversely, when a resource's demand is frequent, it's worth bundling that resource into the team so that one can cut unnecessary communication channels and thus reduce response time. That's the principle behind multi-disciplinary teams.


<br>


# How to decentralize decision-making successfully

As organizations decentralize decision-making power, they face a common challenge: ensuring each node down the tree aligns with the organization's overall strategy. Now, the most challenging part of solving this problem is not to do the alignment itself but to ensure alignment with as few communication hops as possible.

It's easy for a company to be aligned if every single decision goes through the CEO. On the other hand, that alignment is costly because it decreases response time, increasing the likelihood of failure. Furthermore, the CEO has only so much bandwidth for dealing with every small decision that reaches them.

To decentralize successfully, organizations must control two variables depending on a node's hierarchical position:

1. Prescriptiveness
2. Resource allocation

There's also a third control variable which must be consistent across all levels and is often underestimated: culture.

In this section, I'll cover these three control variables.

<br>

## 1. Prescriptiveness

In the military, alignment starts with bureaucrats at the top who shape the country's foreign policy in a slow and gradual fashion. The country's foreign policy is reasonably abstract and tends not to be too prescriptive. Still, it's the highest impact decision that must be made because it impacts all nodes down the tree.

The country's foreign policy then propagates down to high-patent officials, who use it to drive their strategic goals. These officials' plans are more prescriptive than the country's foreign policy plan. Yet, they don't tell troops on the ground how they must act. Instead, they set constraints and create a more precise definition of success. These plans aren't as high-impact as the country's foreign policy because it impacts fewer nodes.

As plans move down the military's hierarchy, detail is added, and overall influence decreases. Furthermore, as the action unravels, information travels up only by as much as it needs to adapt to the current state of battle. Officials at the top don't need to know about every single marine's step, but they do need to know about major successes and accomplishments to adapt their plans.

Similarly, a product development organization shouldn't tell product developers at its extremities exactly how they must behave when customer feedback comes in. Still, executives at the top need to know about significant accomplishments and failures.

These executives must also ensure that plans get gradually more prescriptive as they travel through the organization's hierarchy, and they must set constraints to prevent critical failures.

Successful organizations trust that people at their borders can respond adequately, thus avoiding taxing those with too many communication hops.

In a fintech, for example, the executives up-top don't need to know about every design decision, such as the colour of a particular button or how information is displayed. Instead, executives up top trust the product developers to make good product and design decisions. Still, these executives need to know whether those teams succeed at acquiring a large number of customers and generating revenue to drive the company's direction accordingly.

<a target="_blank" class="image-link" href="/assets/decision-making/prescriptiveness-hierarchy.png"><img style="margin-bottom: -18px;" src="/assets/decision-making/prescriptiveness-hierarchy.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>How prescriptiveness and information detail resolution change depending on a node's hierarchical position</i></center>

> That's precisely how OKRs are supposed to work. Organizations which make good use of OKRs will ensure that the OKRs at the top will feed into the more granular and prescriptive OKRs at the bottom.
> Although I'm not necessarily a big fan of prescriptive methods such as this, its principles are sound.

<br>

## 2. Resource allocation

For teams to act autonomously, they should be able to tap into local resources without communication overhead.

For example, it would be detrimental to the airforce's performance if a pilot had to ask their commander for permission to use each gallon of fuel. Similarly, as I mentioned before, it would be detrimental for teams to have to speak to the CFO whenever they need a new EC2 micro instance.

By defining gradually smaller budgets as one goes from the top of an organization to its bottom, organization designers enable teams to manage their own resources in the best possible way to achieve a fast and satisfactory response.

Conversely, by allowing these teams to tap into gradually budgets from above, a team doesn't need to ask for CFO permission as soon as it needs to acquire a slightly more expensive resource.

One example from [a Reinertsen's talk I really like (_Decentralizing Control: How Aligned Initiative Overcomes Uncertainty_](https://vimeo.com/45947817) is the Boeing 777 weight reduction decision authority.

According to Reinertsen, because of a particular deal, Boeing aimed to reduce the plane's weight so that it could spend less fuel. For that, Boeing allowed the engineers at the extremities of the organization to make decisions that would reduce the plane's cost per pound without asking for permission as long as the cost of that decision was smaller than $300 dollars per pound. As the price of reducing the plane's weight increased, they needed to reach for someone of a higher hierarchy to get approval.

<a target="_blank" class="image-link" href="/assets/decision-making/budget-hierarchy.png"><img style="margin-bottom: -18px;" src="/assets/decision-making/budget-hierarchy.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>How budgets change depending on a node's hierarchical position</i></center>

<br>

## 3. Culture

Culture is the one single element which aligns behaviour patterns across the entire organization.

In the military, a marine knows precisely how another marine will react to a particular situation. Therefore, when combat gets intense, they can act in unison without having to communicate as much.

Similarly, in organizations whose culture is pervasive throughout all hierarchical levels, employees know how their fellow will react given different circumstances.

It's also worth highlighting that culture is not only about how employees behave towards one another. It's also how they behave towards their goals.

Organizations with a customer-centric culture, for example, will focus on their customer's feedback above all else. Therefore, they'll ship sooner, talk to their customers more often, and, consequently, will probably make more money.


<br>

# Putting it all together

To succeed at product development, developers must continuously gather customer feedback, decide what to deliver, and deliver it as quickly as possible. The higher the frequency at which they can close this loop, the more significant the team's competitive advantage.

As the number of communication hops necessary for decision-making increases, so does the delay between gathering feedback and responding to it. These slow responses hinder a team's chance of success.

Furthermore, increasing the number of communication hops also increases the likelihood of information getting corrupted as it travels up top and back down.

Besides high latency and the likelihood of corrupted information, more communication hops may also cause decision-makers to act on outdated information, leading to poor outcomes.

There are three factors to consider when deciding whether to move decision-making up, down, or sideways:

1. Response time
2. Resource pricing
3. Demand variability

When response time is critical, organization designers must consider decentralizing resources so that the decision makers are closer to the environment's feedback and thus can act more quickly.

As resource prices decrease, leaders can push these resources towards the extremities of the organization so that people closer to the customer can tap into these resources more quickly and achieve low-latency responses.

When the demand for a resource is variable, it's worth centralizing that resource so that multiple teams can access resources from the pool, optimizing efficiency. Just don't forget to prioritize response times over capacity utilization as response times become more critical.

To decentralize resources successfully, there are three levers to which leaders must pay attention:

1. Prescriptiveness
2. Resource allocation
3. Culture

The higher a node's hierarchical position, the least prescriptive its plans should be. High-level plans must have gradually higher levels of detail as they propagate down. Such a technique allows teams to be aligned to the organization's overall goals while still allowing nodes at the bottom to act autonomously so they can respond quickly.

Plans at the top are more impactful because they influence more child nodes.

The lower a node's hierarchical position, the fewer resources they receive. Such gradual allocation of resources allows nodes to act autonomously when the decision-making cost is low and enables them to reach gradually higher in the hierarchy as those needs become more expensive.

An organization's culture drives each employee's behaviour and allows them to make decisions aligned to the organization's strategy and predict how fellow employees will behave, enhancing collaboration. Organizations with a customer-centric culture, for example, will focus on their customer's feedback above all else. Therefore, they'll ship sooner, talk to their customers more often, and, consequently, will probably make more money.

<br>

# Recommended content

* [The Principles of Product Development Flow: Second Generation Lean Product Development — Donald G. Reinertsen](https://www.amazon.co.uk/dp/B00K7OWG7O) (a brilliant book — it's the usual recommendation)
* [LSSC12 : Decentralizing Control: How Aligned Initiative Conquers Uncertainty — Donald G. Reinertsen](https://vimeo.com/45947817)
* [Second Generation Lean Product Development Flow — Donald G. Reinertsen](https://www.youtube.com/watch?v=L6v6W7jkwok&ab_channel=AdventureswithAgile)
* [How high capacity utilisation hurts a team's performance](https://lucasfcosta.com/2022/06/12/measure-queues-not-cycle-time.html) — [Lucas da Costa](https://twitter.com/thewizardlucas)

<br>

# Wanna talk?

You can [send me a tweet or DM @thewizardlucas](https://twitter.com/thewizardlucas) or [an email at lucas@lucasfcosta.com](mailto:lucasfcosta.com).
