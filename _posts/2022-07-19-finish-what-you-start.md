---
layout: post
title: "How finishing what you start makes teams more productive and predictable"
author: Lucas Fernandes da Costa
place: London, United Kingdom
flag: 🇬🇧
tags: agile project-management
---

Let's be honest. When you read this post's title, you thought it was obvious. Yet, most people don't follow this simple piece of advice. You know that too, and that's probably what led you here.

What you _don't_ know is _why_ so many people won't finish what they start and **how to illustrate and quantify the impact of unfinished work**. That's what I'll explain in this post.

First, I'll expound on the reasons why finishing one piece of work before starting the next makes products better, cycle times shorter, and teams more productive.

Then, I'll expose why some teams choose to work on multiple tasks concurrently despite that approach being suboptimal most of the time. In this section, I'll also explain when to batch tasks, when not to, and what you should do instead.

Finally, I'll use a few Monte Carlo simulations and cumulative flow diagrams to demonstrate how unfinished work makes teams unpredictable — statistically speaking.

At the end of this post, I have included a small summary for you to paste on Slack or Microsoft Teams and **convince your team to stop starting and start finishing**.

> If you're reading on a phone, click images to expand them.

<br>

## How finishing what you start increases productivity

I like burgers. Do you? I don't like them when they're cold, though, and it makes me unhappy to wait too long for one.

When I'm the only person at the burger shop, it's not a challenge for its cooks to assemble a burger quickly and for waiters to deliver it to me while it's still hot.

Here's what happens when I'm the only person in the shop.

<a target="_blank" class="image-link" href="/assets/finish-what-you-start/one-burger-flow.png"><img style="margin-bottom: -18px;" src="/assets/finish-what-you-start/one-burger-flow.png" alt="The production process of a single burger."></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>The production process of a single burger.</i></center>

In this case, considering each burger demands four steps of preparation, and each step takes one minute, my burger gets to me in four minutes.

When _you_ arrive at this burger shop, the cook's job gets a bit more difficult. Now, they have to choose between preparing our burgers concurrently or one at a time (serially).

To illustrate these approaches, I'll assume there's a single cook and that they can only prepare one burger at a time. We'll revisit this assumption later. For now, bear with me.

First, let's see what happens when the cook prepares one burger at a time.

<a target="_blank" class="image-link" href="/assets/finish-what-you-start/two-burger-flow-sequential.png"><img style="margin-bottom: -18px;" src="/assets/finish-what-you-start/two-burger-flow-sequential.png" alt="Preparing burgers in series causes both their cycle-times to be the same."></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>Preparing burgers in series causes both their cycle-times to be the same.</i></center>

Assuming I ordered only a bit before you, my burger still takes four minutes. Yours, however, takes eight.

Now, let's compare the serial to the concurrent approach. In the image below, you'll see what happens when the cook tries to prepare our burgers concurrently.

<a target="_blank" class="image-link" href="/assets/finish-what-you-start/two-burger-flow-concurrent.png"><img style="margin-bottom: -18px;" src="/assets/finish-what-you-start/two-burger-flow-concurrent.png" alt="Preparing burgers concurrently elongates the burgers' cycle times."></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>Preparing burgers concurrently elongates the burgers' cycle times.</i></center>

This time, you still had to wait the same amount of time for your burger, but I've had to wait almost twice as long for mine! Outrageous.

To make matters worse, let me show what happens if a friend of yours comes in, places an order, and the cook decides to take the same shortsighted approach to burger-making.

<a target="_blank" class="image-link" href="/assets/finish-what-you-start/three-burger-flow-concurrent.png"><img style="margin-bottom: -18px;" src="/assets/finish-what-you-start/three-burger-flow-concurrent.png" alt="The more burgers the cook prepares concurrently, the longer cycle times become."></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>The more burgers the cook prepares concurrently, the longer cycle times become.</i></center>

In this scenario, I took ten minutes to taste my burger, and you took twelve. Thanks to your friend, I had to wait an extra six minutes, and you had to wait for an extra three.

Such a disappointing burger-preparing performance demands vigorous action to be taken.

Personally, I'd prefer to educate the cook rather than kick you and your friend out of the shop because I believe every hard-working engineer deserves a succulent burger on a Friday night.

Here's what we'll do. First, we'll illustrate what would've happened had the cook decided to prepare each of our burgers in series. Then, we'll enter the kitchen, hand them the schematics, and explain the optimal approach.

Come join my table, grab a pen, and let's get drawing.

<a target="_blank" class="image-link" href="/assets/finish-what-you-start/three-burger-flow-serial.png"><img style="margin-bottom: -18px;" src="/assets/finish-what-you-start/three-burger-flow-serial.png" alt="Preparing three burgers in series ensures that all burgers' cycle times remain equal, and that the first two will be delivered earlier."></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>Preparing three burgers in series ensures that all burgers' cycle times remain equal, and that the first two will be delivered earlier.</i></center>

As our drawing shows, had the cook prepared our three burgers in series, you and I would have had to wait the same amount of time for our burgers as before — 4 and 8 minutes. Your friend's burger would still have taken twelve minutes, but that's what they deserve for being late for dinner.

Now, before showing our drawing to the cook, let's take a moment to compare burger-making with the equally noble activity of software development.

Imagine you have features A and B in your backlog, for example.

If each feature takes three units of time to deliver, working on them in parallel makes A take two units of time longer to deliver than it would have taken had you finished it before starting B.

Furthermore, working on these features concurrently demands B's specifications to be written earlier than they would have been otherwise.

<a target="_blank" class="image-link" href="/assets/finish-what-you-start/features-concurrent.png"><img style="margin-bottom: -18px;" src="/assets/finish-what-you-start/features-concurrent.png" alt="Working on features concurrently causes features to take longer."></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>Working on features concurrently causes features to take longer.</i></center>

On the other hand, if you finish A before starting B, you'll deliver A earlier, and you'll buy yourself more time to work on B's specifications. During that time, you can collect more information to boost B's chance of success.

<a target="_blank" class="image-link" href="/assets/finish-what-you-start/features-in-series.png"><img style="margin-bottom: -18px;" src="/assets/finish-what-you-start/features-in-series.png" alt="Working on features in series shortens each feature's cycle time, and allows the first to be delivered earlier."></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>Working on features in series shortens each feature's cycle time, and allows the first to be delivered earlier.</i></center>

As you can see, **in the software industry, both tasks take longer to deliver whenever you start a new feature before finishing the first. Moreover, the first task will be delivered later than it could have been.**

Furthermore, the likelihood of the second feature succeeding is smaller because you were working on top of specifications that were older than they could have been. Had you waited a bit longer, you'd have had more time to digest customer feedback and incorporate new information into the second feature's specification.

That's what just-in-time means: **instead of starting each feature as early as possible, you start it as late as you can afford to**, and incorporate as much feedback and information into the spec in the meantime.

This same effect happens when a critical bug appears. [As I've previously explained](/2022/07/15/long-term-plans-dont-work.html), such urgent work stops you from finishing your current task, delays it, and causes all other tasks in progress to take longer _on average_.

We can summarise this behaviour using [Little's Law](https://en.wikipedia.org/wiki/Little%27s_law), which, when expressed in terms of throughput (deliveries per unit of time), looks like this:

<br>

<center>
{% katex %}
{Avg.\ Cycle\ Time} = \cfrac{Avg.\ Work\ In\ Progress}{Avg.\ Throughput}
{% endkatex %}
</center>

<br>

As I've explained using the burger shop example, and as Little's Law dictates, cycle times elongate when work in progress increases and throughput remains the same. It's a straightforward mathematical fact. Nonetheless, many managers are unaware of it.

Despite the simple mathematics, when some managers see that work is taking longer to finish, they start _more_ work hoping that starting tasks earlier causes them to finish earlier. This attitude leads to the exact _opposite_ of the result they'd like to achieve: it _increases_ cycle times.

**If you wish to keep cycle-times low, you should limit work in progress**.

You can argue with me, your team, or your manager as much as you want, but you can't argue with mathematics. **Limit work in progress**.

<br>

### The cost of context switching

There's yet a third crucial aspect to consider in the world of software development: the cost of context switching.

When preparing burgers, it's effortless to shift from working on one burger to another. When writing software, on the other hand, context-switching incurs a high cost.

Working on tasks concurrently delays their cycle times not only because of the interleaving activities but also because every time an engineer has to switch context, they take more time to get back into a "flow state".

Here's a more accurate representation of what happens when working on software development tasks concurrently:

<a target="_blank" class="image-link" href="/assets/finish-what-you-start/features-concurrent-context-switch.png"><img style="margin-bottom: -18px;" src="/assets/finish-what-you-start/features-concurrent-context-switch.png" alt="There's a cost for switching from working on a feature to working on another."></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>There's a cost for switching from working on a feature to working on another.</i></center>

<br>

Enough talking. Let's bring our plan into the kitchen.

<br>

## When to start without having finished

You and I delve into the kitchen with our drawing in our hands, the power of mathematics under our arms and tell the cook:

> "Hey, look, here's why you should prepare one burger at a time" _*points to drawing*_

The cook seems abhorred and goes on to explain:

> No matter how rare you like your patties, they all take significant time to prepare.<br>
> It's quicker for me to prepare them in larger batches than to wait for one patty to be ready before I toss another on the grill.

The cook has a point. Neither you nor I know anything about the craft of burger-making; how could we expect to be right?

Nevertheless, there's a lesson to be taught here — one about batch sizes and transaction costs.

Whenever it's expensive to move a work product, in this case, a patty, from one stage of the production process to the next, that transition will happen less often so that you can pay the transaction cost only once by moving multiple items at a time.

<a target="_blank" class="image-link" href="/assets/finish-what-you-start/small-batches-vs-large-batches-patties.png"><img style="margin-bottom: -18px;" src="/assets/finish-what-you-start/small-batches-vs-large-batches-patties.png" alt="When it's costly to move items from one stage to the next, items batch-up."></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>When it's costly to move items from one stage to the next, items batch-up.</i></center>

That's why you don't buy a single egg whenever you go to the supermarket. Going to the supermarket has a significant transaction cost, so you purchase eggs in larger batches. In fact, the farther from your home the supermarket is, the more likely it is for the batch of eggs you bring home to be larger.

It's only when the cost of keeping the patties in the grill exceeds the cost of sending them to the counter that the cook will do so.

To summarise: whenever a transaction's cost goes up, that transaction happens less frequently.

Furthermore, if the cost of holding items at a particular stage of the process is lower than the cost of pushing those items forward, it's better to hold them.

That's also the reason why [Martin Fowler and Jez Humble](https://martinfowler.com/bliki/FrequencyReducesDifficulty.html) advocate that ["if something is painful, you should do it more often"](https://www.goodreads.com/quotes/1314241-if-it-hurts-do-it-more-frequently-and-bring-the), especially when it comes to deploying software. If you're forced to do something often, you'll naturally gravitate towards decreasing the cost of doing it.

You can notice the same effect happens with automated tests. If you have to manually test your software for a few hours before you ship it, you'll hold changes for longer and test larger batches at once.

In the software industry, there are several problems with large batch transferrals:

1. They delay feedback because features take longer to get to customers
2. They make it more difficult to trace bugs because the delta between each version is larger
3. They increase the overhead of change management because they make versioning and automatic rollbacks more difficult to do

These problems exponentially increase the costs of holding software tasks as opposed to pushing them forward.

The reason many people fail to acknowledge and act upon transaction costs in the software industry is that they compare software — a design process — to manufacturing processes.

In manufacturing, the cost of holding pieces in a factory is linear. The holding cost for a piece is just the cost of keeping it in storage multiplied by the number of days it will be there. On the other hand, in software development, when holding a particular piece of work, you'll experience a negative compounding effect due to the lack of feeback, the larger deltas between versions, and the overall harm to the overall system reliability.

Now that we understand the burger and the software variations of the problem, we can make a recommendation to both cooks and software engineers alike:

**Reducing transaction costs enables small batches. Small batches, in turn, reduce average cycle times, diminish risk, and enhance reliability**.

**You should only start without having finished when transaction costs are high, and it wouldn't make economic sense to spend time decreasing them, either because you have agreed to a particular delivery date or because you don't have the capital to invest.**

That said, I'd be careful to avoid falling into a situation where "you're too busy draining the flood to be able to fix the leak". The earlier you decrease transaction costs, the earlier you'll be reaping the benefits from having done it.


<br>

## How finishing what you start makes teams more predictable

Despite coming into the kitchen to offer unsolicited advice, you and I have become good friends with the cook. Now, it's time for them to teach us a thing or two about how we can deliver software more predictably.

In the burger shop's kitchen, there's a limit to how many patties you can put on the grill. Furthermore, zero burgers are in progress at the end of the day. "These constraints allow me to provide burger-eaters with predictable delivery times", — says the cook.

To understand why those constraints help the cook, let's plot the burger shop's arrivals and departures using [a cumulative flow diagram](https://en.wikipedia.org/wiki/Cumulative_flow_diagram).

First, let's plot a cumulative flow diagram illustrating what happens when the cook prepares many burgers at once — a large batch.

<a target="_blank" class="image-link" href="/assets/finish-what-you-start/cfd-large-batches.png"><img style="margin-bottom: -18px;" src="/assets/finish-what-you-start/cfd-large-batches.png" alt="With large batches, there's more variability in cycle times."></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>With large batches, there's more variability in cycle times.</i></center>

As the diagram shows, a customer who arrives early waits for a long time for their burger, while a customer who comes later waits much less. In other words, there's a significant amount of variability in the time customers have to wait until they get their burger — shown by the area in blue.

Now, let's see what happens when the cook prepares fewer burgers at a time.

<a target="_blank" class="image-link" href="/assets/finish-what-you-start/cfd-small-batches.png"><img style="margin-bottom: -18px;" src="/assets/finish-what-you-start/cfd-small-batches.png" alt="Smaller batches decrease cycle time variability."></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>Smaller batches decrease cycle time variability.</i></center>

This time, a customer who arrived early doesn't have to wait much longer than the customer who came later. As shown by the area in blue, there's less variability in the time it takes for customers to get burgers.

After looking at these two diagrams, we can conclude that the larger the batch size, the more variability there is in waiting times.

Additionally, if batch sizes vary, not only will the waiting time within a particular batch of customers be more variable, but also distinct batches of customers will see different waiting times. Customers who arrive earlier may see cycle times from 1 to 10 minutes, while customers who come later might see their burgers taking anywhere from 1 to 30 minutes, for example.

<a target="_blank" class="image-link" href="/assets/finish-what-you-start/cfd-different-batch-sizes.png"><img style="margin-bottom: -18px;" src="/assets/finish-what-you-start/cfd-different-batch-sizes.png" alt="If batch sizes also vary over time, distinct batches of customers see different variations of cycle time."></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>If batch sizes also vary over time, distinct batches of customers see different variations of cycle time.</i></center>

That's why the cook mentioned it's helpful to limit how many burgers they can fit on a grill: it makes batch sizes uniform.

The same principle is valid for software development. The larger your batch sizes — the more tasks you work on in parallel — the more variability in cycle times you will see.

In the software industry, however, we don't have a "finite grill". In other words, there's no physical upper cap on how many tasks can be in progress at a time. Therefore, you must be adamant about creating work in progress limits yourself.

**The lower you make WIP limits and stick to them, the less variability you'll see in cycle times**.

Besides making your cycle-times unpredictable, the lack of WIP limits will also impact your ability to do forecasts.

Imagine, for example, that your team tends to work on many tasks concurrently. In that case, most days they'll split their attention between tasks. Then, there will be a day in which they'll complete all those tasks, doing a large batch transferral.

Let's simulate such a team assuming that their throughput over ten days looks like the following:

```js
// Each item represents the number of tasks delivered that day
const TEN_DAY_THROUGHPUT = [ 0, 0, 0, 0, 5, 0, 0, 0, 5, 0 ];
```

If we go ahead and [use a Monte Carlo algorithm to simulate how many tasks this team can deliver](/2021/09/20/monte-carlo-forecasts.html) in 30 days, we'll obtain the following histogram.

<a target="_blank" class="image-link" href="/assets/finish-what-you-start/histogram-concurrent-team.png"><img style="margin-bottom: -18px;" src="/assets/finish-what-you-start/histogram-concurrent-team.png" alt="Teams that deliver many tasks at once are less predictable because there's a wider range of possible outcomes when simulating their performance."></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>Teams that deliver many tasks at once are less predictable because there's a wider range of possible outcomes when simulating their performance.</i></center>

In this histogram, you can see a significant number of possible outcomes for this team: they may deliver anywhere from 0 to 90 tasks. Furthermore, there are plenty of likely scenarios in this distribution.

Now, let's change the throughput samples we used in our simulation. **This time, we'll consider the team working on one task at a time, delivering in more regular intervals**, instead of working on plenty of tasks in parallel and delivering them all on the same day.

```js
// Each item represents the number of tasks delivered that day
const TEN_DAY_THROUGHPUT = [1, 1, 1, 1, 1, 2, 0, 1, 1, 1];
```

Please notice that the team still delivered the same amount of tasks in those ten days. The only difference between these teams is that the second delivered tasks more uniformly.

Simulating such a team's performance yields the histogram below.

<a target="_blank" class="image-link" href="/assets/finish-what-you-start/histogram-serial-team.png"><img style="margin-bottom: -18px;" src="/assets/finish-what-you-start/histogram-serial-team.png" alt="Teams which consistently deliver a small number of tasks are more preditable because there's a smaller range of possible outcomes when simulating their performance."></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>Teams that deliver many tasks at once are less predictable because there's a wider range of possible outcomes when simulating their performance.</i></center>

If you compare these two histograms, you'll see that the second histogram's distribution has fewer possible outcomes — 20 to 41 tasks instead of 0 to 90 —and results are more clustered towards the centre. In other words, its standard deviation is smaller.

To make my point even more obvious, let's see what happens if we assume the team always delivers one task each day.

```js
// Each item represents the number of tasks delivered that day
const TEN_DAY_THROUGHPUT = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
```

Assuming our team will remain hyper-consistent, there's only one possible outcome in the next 30 days: they'll deliver 30 tasks.

<a target="_blank" class="image-link" href="/assets/finish-what-you-start/histogram-uniform-team.png"><img style="margin-bottom: -18px;" src="/assets/finish-what-you-start/histogram-uniform-team.png" alt='A team which always delivers the same number of tasks each day will yield a "deterministic" forecast (days times throughput).'></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>A team which always delivers the same number of tasks each day will yield a "deterministic" forecast (days * throughput).</i></center>

The comparison between those three histograms leads to the conclusion that teams which deliver tasks more uniformly are more predictable, even if they deliver the same number of tasks within the period we're using as the sample for our simulations.


<br>

## Putting it all together

When you start a new task before finishing the previous, average cycle times will increase. That happens because you'll increase the number of items in progress but maintain the same throughput.

Little Law illustrates this behaviour by establishing a clear relationship between cycle time, work in progress, and throughput.

<center>
{% katex %}
{Avg.\ Cycle\ Time} = \cfrac{Avg.\ Work\ In\ Progress}{Avg.\ Throughput}
{% endkatex %}
</center>

Additionally, there's a cost to context-switching when it comes to software development tasks.

Teams which start tasks earlier than they should must also write specifications earlier. Therefore, they'll waste an opportunity to gather feedback, digest it, and incorporate it into a feature's specification, diminishing its chance of success.

Many times, teams will have multiple tasks in progress because moving a task from one stage to the next is costly. Consequently, these teams will attempt to transfer tasks from one stage to another in large batches to pay this high transaction cost only once.

The problem with large batch transferrals in the software industry is that the cost of holding these tasks increases exponentially because their specifications perish, and change deltas increase, making it more difficult to find bugs. This increase in deltas also complicates change management, harming the system's reliability.

One last benefit of working on smaller batches of tasks at a time is that it makes teams more predictable. Delivering the same number of tasks uniformly is better than delivering multiple tasks at once because it makes cycle times uniform too. In turn, those uniform cycle times help you make better forecasts, as there will be fewer possible outcomes when simulating (or estimating) the team's performance.


<br>

## Further reading

* [The Principles of Product Development Flow: Second Generation Lean Product Development](https://www.amazon.co.uk/dp/B00K7OWG7O) — [Donald G. Reinertsen](http://reinertsenassociates.com/about/)
* [Actionable Agile Metrics for Predictability](https://www.amazon.com/dp/B013ZQ5TUQ) — [Daniel Vacanti](https://twitter.com/danvacanti)
* [When Will It Be Done?: Lean-Agile Forecasting to Answer Your Customers' Most Important Question](https://www.amazon.co.uk/dp/B084WVMKLC) — [Daniel Vacanti](https://twitter.com/danvacanti)
* [How high capacity utilisation hurts a team's performance](https://lucasfcosta.com/2022/06/12/measure-queues-not-cycle-time.html) — [Lucas da Costa](https://twitter.com/thewizardlucas)
* [Why long-term plans don't work and how to fix them](https://lucasfcosta.com/2022/07/15/long-term-plans-dont-work.html) — [Lucas da Costa](https://twitter.com/thewizardlucas)


<br>

## I have questions, but I need a burger First

If you have questions or comments, send me a tweet at [@thewizardlucas](https://twitter.com/thewizardlucas) or an email at [lucas@lucasfcosta.com](mailto:lucas@lucasfcosta.com).

If you're in London and need a burger, go for [Honest Burgers' "Tribute"](https://www.honestburgers.co.uk/food/burgers/tribute/) (and don't forget the rosemary salted chips).

In São Paulo, Brazil, order [Tradi's](https://www.instagram.com/hamburgueriatradi) ["oráculo"](https://www.hamburgueriatradi.com.br/wp-content/uploads/2018/09/ORACULO.jpg).

These are all personal recommendations. Probably none of these burger shops know this post even exists.
