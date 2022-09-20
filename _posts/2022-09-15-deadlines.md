---
layout: post
title: "Why deadlines are pointless and what to do instead"
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
      uri: 'spotify:episode:4BO7T3x0riD98vKeEK3x6o',
      height: 100,
    };
  let callback = (EmbedController) => {};
  IFrameAPI.createController(element, options, callback);
};
</script>

Deadlines are the bane of every software engineer's existence. We've all been there: the project is "due" in two weeks, and we're nowhere near done. So we pull all-nighters, do poor testing, and cut corners just to get it done. And what happens? The project is buggy, the customers are unhappy, and we're all exhausted.

Sometimes, the software will be too buggy even for a software engineer's standard. When that happens, managers set a new deadline, revealing the first one shouldn't have existed in the first place. Now, guess what happens if you miss the second deadline? Exactly right, you get a new one. Don't you love deadlines?

**It's about time we start calling deadlines by their real name: pressure.**

Deadlines don't make engineers code faster. They just cause them to work longer hours. In less dysfunctional teams, deadlines act as a forcing function to cut scope and ship whatever you have, revealing you could've shipped earlier and acted on feedback sooner.

**In this post, I'll explain why deadlines are _not_ a necessary evil and how they harm productivity, morale, and software quality.**

Then, I'll suggest a more productive and less stressful alternative: preemption points. I'll explain what preemption points are, why they work, and their advantages compared to deadlines.

After covering preemption points, I'll also expound on queueing disciplines and how they help you deliver value earlier, making deadlines useless.

At the end of this blog post, there's a small summary to help convince your team to ditch deadlines and make work more pleasant for everyone, including those who used to think deadlines were helpful.

<br>

## Why deadlines are pointless

At the root of deadlines' pointlessness is the fact that you can't control outcomes. You can only control the processes that generate those outcomes.

You can't simply start training today and run a half marathon tomorrow, for example. You can, however, create a system in which you consistently increase the number of miles you run.

There will be days you won't want to get out of bed. In those days, you won't run as much. On other days, you'll wake up and run as if your life depended on it. There _will_ be variability. Still, as long as you consistently improve each week, you'll eventually run a marathon.

Once you've reached a stable rate of improvement, then you might be able to forecast whether you'll be able to run next year's marathon. Until then, any deadline is an uninformed guess.

Sure, if you know when the marathon will be, you can time your carbohydrate intake and fine-tune your training routine so that you're ready to run on that particular day. Nonetheless, unless you're consistently improving and already capable of running a marathon significantly before its date, setting deadlines is a recipe for injury and overtraining. If you can't run a marathon on that date, then you can't.

If you're going to take one thing away from this post, take this: **long-term objectives demand consistent short-term action and predictable performance improvements, not one big mindless push**.

Besides being pointless, deadlines are also harmful because:

1. **Deadlines don't improve a team's performance**. Setting a goal doesn't cause the team to ship faster. It either causes them to ship less or work more.
2. **Deadlines misalign incentives and discourage long-term thinking**. They incentivize teams to prioritize short-term gains to meet deadlines instead of long-term predictable and sustainable performance.
3. **Deadlines are not actionable**. By the time the team misses a deadline, it's too late to do anything productive about it.

In this section, I'll explain each statement in more detail.

<br>

### Deadlines don't improve performance

No one cheers for their computer to perform better, tells it to "work harder," or "develop a greater sense of urgency." The computer doesn't care. It will crunch numbers at the same speed it's always done.

You may be able to overclock it, sure, but it will only be a matter of time until your motherboard turns into coal and your energy bills turn into a bankruptcy statement.

If you want your computer to run programs at a particular speed, you should either buy new hardware or write better code. Setting a goal doesn't influence the system's results.

**A system will produce what it can produce, regardless of whether you set a goal**.

Similarly, deadlines do not improve an engineering team's performance.

For a team to perform better, managers must improve the system. They must hire more people, make deployments frictionless, or implement automated tests to reduce the need for manual inspection, for example.

The only way a deadline may accelerate deliveries is by "overclocking" the team through pressure, making its members work longer hours. Although that may work once or twice, overwork is an unsustainable practice in the long run because it will cause people to leave.

It's only through consistent and systematic improvements that teams can create a baseline for performance, identify the levers they can pull, and continuously improve their results.

<br>

### Deadlines misalign incentives and discourage long-term thinking

Imagine you have two sales teams. One produces unreproducible and unpredictable revenue spikes, while the other generates consistent and continuously improving results.

In a system that awards bonuses to those who reach a $50,000 deadline, an erratic team that meets the deadline will receive rewards, regardless of whether they met the deadline by pure luck or working extra hours.

<a target="_blank" class="image-link" href="/assets/deadlines/erratic-sales-team.png"><img style="margin-bottom: -18px;" src="/assets/deadlines/erratic-sales-team.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>An erratic team which meets a $50,000 dollar deadline</i></center>

Because that team hasn't set a consistent baseline for performance, you can't simply increase its sales targets quarter by quarter. Doing that would be a recipe for failure. In that case, you'd rely on luck to achieve your goals because you don't have a predictable revenue machine.

Additionally, if that team was already doing long hours to meet the deadline, they may not be able to work even longer, and some might quit.

That inconsistency is often caused by setting deadlines. Due to them, teams will prioritize short-term gains over long-term consistency and continuous improvement.

As [W.E. Deming](https://en.wikipedia.org/wiki/W._Edwards_Deming) would put it:

> Short-term profits are not a reliable indicator of the performance of management. Anybody can pay dividends by deferring maintenance, cutting out research, or acquiring another company.
> — Deming, W. Edwards. Out of the Crisis, reissue (p. 19). MIT Press. Kindle Edition.

Now, compare that erratic team with a predictable team that continuously improves its performance but misses the $50,000 deadline.

<a target="_blank" class="image-link" href="/assets/deadlines/consistent-sales-team.png"><img style="margin-bottom: -18px;" src="/assets/deadlines/consistent-sales-team.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>A consistent and predictable team which doesn't meet the $50,000 dollar deadline</i></center>

Which team would you rather have in your organization?

I'd definitely prefer the second. Even though it missed the deadline, that team demonstrated it can consistently improve its performance, allowing me to forecast sales with much more accuracy and without relying on luck. That way, I can make decisions upon solid foundations.

Furthermore, in the long run, the consistent team will eventually exceed the performance of the erratic one if it keeps applying continuous improvement principles.

> As a side note, that's the reason I don't like "snapshot metrics." Instead, I prefer metrics that look at a team's momentum and control for consistency and continuous improvement, as I've outlined [in this other post](/2022/08/31/engineering-metrics.html).

<br>

### Deadlines are not actionable

When teams miss a deadline, it's too late to take any productive actions.

Think about the actions you can take once your team misses a deadline:

1. Set a new deadline
2. Fire someone
3. Cut scope

The first action, setting a new deadline, reveals that the initial deadline was already useless and thus unnecessary. If that was the case for the first, it might as well be the case for the second and all other deadlines after that.

The second action, firing someone, doesn't help the team deliver the software which is already late. If anything, it makes the software later because there will be fewer people to write it.

The third action, cutting scope, reveals you were doing unnecessary work and that you could've shipped earlier. Cutting scope is beneficial, but deadlines cause it to happen too late.

Name whichever other actions you want. All of them are unproductive because they've been triggered too late.

<br>

### "But Lucas, without deadlines, we wouldn't ship anything. Haven't you heard of Parkinson's Law?"

If your team can't ship without deadlines, the lack of deadlines is not the problem. Your team's careless attitude about customer feedback is.

When teams obsess about customer feedback, they ship as early as possible so that they can listen to their customers.

For customer-centric teams, artificial deadlines are useless because the only "deadline" that matters already exists: "as soon as possible, as long as it's valuable."

Now that I've gotten that out of the way, let me address Parkinson's Law, which states that "work expands to fill the time available for its completion."

Whether the law holds true doesn't matter. It doesn't matter because it doesn't say that work expands infinitely if no deadlines are set.

Furthermore, according to Parkinson's law, adding a safety buffer to the deadline will cause the work to expand. Therefore, you'll exchange the possibility of being late for the certainty of being late — maybe even later than you'd initially be if work expands slightly too much.

That's not to mention the Stock-Sanford corollary to Parkinson's law:

> "If you wait until the last minute, it only takes a minute to do."

And, if it only takes a minute to do, you can imagine how fantastic the results will be.

Good software takes time.

<br>

## If not deadlines, then what?

To operate without deadlines, teams must adopt preemption points and be mindful of their queueing disciplines.

The former helps teams create short and synchronous actionable feedback so they can correct course earlier. The latter allows the team to deliver the most valuable pieces of work early and with lower costs.

In this section, I'll explain each of those strategies in detail.

<br>

### Preemption points

Your operating system doesn't know when a particular program will finish. In fact, [there's no way it could determine that ahead of time](https://en.wikipedia.org/wiki/Halting_problem). Therefore, it establishes a quota of time for the program to run. If the program takes too long, it gets preempted, meaning it will stop running so that another program can get CPU time. Additionally, the operating system will terminate programs that misbehave and consume too much memory.

In product development, we can emulate our operating system's heuristics to get better results. As a developer works on a particular task, there can be fixed amounts of time at which we'll evaluate whether we should cut scope or cut losses. Those are _preemption points_.

Preemption points are different from deadlines because they're synchronous and uniform.

Instead of arbitrarily setting a deadline for each task, we create synchronous deterministic feedback by regularly checking the task's status.

One way to do that is to use your task manager to highlight tasks with different colors once their duration exceeds three, five, or ten days, for example. At each of those points in time, we review whether there's something we could improve to ship the task earlier, cut its scope, or scrap it altogether.

Daily stand-ups are one way to introduce that synchronous preemptive feedback. During them, you can discuss the aforementioned approaches with the team.

Preemption points work well because they help you correct deviation from the desired end-state by regularly bringing variation back to baseline — the desired end-state — instead of allowing variation to accumulate.

Unless there are regular checks and interventions, these minor deviations will accumulate. When that happens, features become entirely different from what they were initially intended to be. Therefore, you will either ship the wrong features or spend extra time correcting them.

<a target="_blank" class="image-link" href="/assets/deadlines/back-to-baseline.png"><img style="margin-bottom: -18px;" src="/assets/deadlines/back-to-baseline.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>Preemption points bring variation back to baseline regularly</i></center>

One way to illustrate how these slight deviations accumulate over time is with a coin toss experiment, as Donald Reinertsen does in his book, Principles of Product development flow. In this experiment, you'll flip a coin plenty of times. For every toss, you'll add one to your total whenever heads come up and subtract one from it whenever tails come up.

As you can see in the simulations below, which use increasingly greater numbers of tosses, the more tosses, the further above or below the zero axis the total will go — differently from what many people would expect.

<a target="_blank" class="image-link" href="/assets/deadlines/coin-tosses-over-time.png"><img style="margin-bottom: -18px;" src="/assets/deadlines/coin-tosses-over-time.png" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>As the number of tosses increase, the total goes further and further from the baseline</i></center>

Preemption points act as if you were breaking down the number of coin tosses into smaller series of tosses. After each series, you work to bring the accumulated deviation back to baseline forcefully.

Deadlines, in comparison, often allow for too much variation to accumulate. That happens because we either check a task's status too late or too irregularly, making it more difficult and time-consuming to bring the current state back to the baseline.

Besides their greater effectiveness in handling variability, preemption points are better than deadlines because:

1. They’re actionable and predictable.
2. They eliminate the need for estimations.
3. They incentivize continuous improvement over short-term gains.

Preemption points are actionable and predictable because regularly checking tasks’ statuses ensures you’ll detect problems early enough to course-correct. If you're checking on tasks daily, you'll be at most one day late to take action.

Preemption points also eliminate the need for estimations because you shift your focus from getting something done at a particular date to delivering small incremental pieces of value as soon as possible, regardless of when "as soon as possible" is.

When using preemption points, you don't have to hold three-hour meetings to uncover all possible scenarios in which things could go wrong. Instead, you adapt to new information and react to it quickly.

Besides making you more agile in the true sense of the word, you're more likely to succeed when using preemption points because even the most detailed planning can't foresee all possible edge cases.

Finally, preemption points also incentivize continuous improvement over short-term gains. That's because as a deadline approaches, developers will feel pressured to cut corners to meet the deadline, no matter what happens later.

When developers cut corners, bugs arise, and software becomes more difficult to maintain, causing further tasks to take longer and predictability to go down the drain.

Differently from deadlines, preemption points naturally create space for solutions to be designed incrementally and collaboratively with the rest of the team because those solutions don't need to be delivered by a particular date.

Therefore, instead of cutting corners, developers and product managers agree on cutting scope and devise alternative strategies that won't hurt long-term predictability and performance.

<br>

### Queueing disciplines

[We can model every software development process as a queueing system](https://lucasfcosta.com/2022/08/31/engineering-metrics.html). In such a system, tasks come in on one end, and software comes out on the other.

This system's performance is determined by a function of value over time. The more value it delivers and the shortest the time it takes to deliver it, the better.

There are two ways to increase the value this system delivers.

The first is to increase the system's processing rate, accelerating the speed at which software comes out.

The second is to feed the system with the shortest, most valuable task at any given time. That way, regardless of the processing rate, you ensure the system is always processing the most valuable items.

The difference between these two approaches is that the first — increasing processing rates — is often costly because it requires hiring more engineers and improving processes.

The second approach, however, is virtually free. It simply requires the team to review their queues regularly and ruthlessly prioritize tasks.

In the same way a hospital treats patients depending on how critical their health issues are, we must process tasks depending on how valuable each task is instead of their arrival order.

FIFO — first in, first out — is rarely the best queueing discipline for an engineering system. In other words, working on tasks in the same order they were created rarely yields satisfactory results.

Instead of adopting a FIFO queueing discipline, I urge managers to adopt a "weighted shortest job" heuristic.

This heuristic consists of choosing the shortest, most valuable job as the next job.

When managers adopt this heuristic, they stop worrying about delivering value at a particular date. Instead, they acknowledge the system's limited processing capacity and focus on allocating that capacity to process the most valuable item.

In other words, given a system will output as much as it can, regardless of whether a goal exists, the best use of the system's processing power is to feed it with the most valuable tasks possible.

<br>

## Putting it all together

We must start calling deadlines by their real name: pressure.

Deadlines don't make engineers ship faster. They just make engineers work longer hours or ship incomplete and buggy features.

The pointlessness of deadlines stems from the fact that you can't control results. You can only control the processes that generate those results.

Besides the fact that you can't control results, only the processes generating them, there are three other reasons which reveal the pointlessness of deadlines:

1. Deadlines don't improve a team's performance. A system will produce what it can produce, regardless of whether a goal is set.
2. Deadlines prioritize short-term gains over continuous and consistent improvement.
3. Deadlines are not actionable. By the time the team misses a deadline, it's too late to do anything productive about it.

Even Parkinson's Law, which states that "work extends to fill the time allotted," doesn't change the fact that deadlines are pointless.

It doesn't do so because the law doesn't state that work extends indefinitely when deadlines don't exist. If anything, it acknowledges that setting deadlines will cause the work to extend until that deadline, no matter how big the safety buffer you added.

Instead of setting deadlines, managers should take two actions: introduce preemption points to their processes and be mindful of their queueing disciplines, performing ruthless and regular prioritization.

Preemption points are regular time intervals at which the team will review a task's progress and decide whether they should cut scope, change their strategy, or drop the task and cut losses altogether.

Preemption points are better than deadlines because they're actionable, predictable, better at handling variability, and incentivize long-term continuous improvement.

Finally, when it comes to queueing disciplines, FIFO — first in, first out — is rarely the best queueing discipline to use in an engineering system. Instead, we must ensure the system is always processing the shortest, most valuable items.

That way, even if we can't improve the system's processing rate, we can increase the value it delivers by feeding it with the best possible items at that given time.


<br>

## Wanna talk?

**If you'd like to have a chat, <a onclick="sa_event('calendly-deadlines')" target="_blank" href="https://calendly.com/lucasfcosta/1-1-with-lucas">you can book a slot with me here</a>**.

Alternatively, you can [send me a tweet or DM @thewizardlucas](https://twitter.com/thewizardlucas) or [an email at lucas@lucasfcosta.com](mailto:lucasfcosta.com).

<br>

## Related content

* [Simon Sinek: Purpose should be prioritized over metrics](https://www.youtube.com/watch?v=PhuKJWm1_fQ&ab_channel=DenkProducties)
* [The Principles of Product Development Flow: Second Generation Lean Product Development](https://www.amazon.co.uk/dp/B00K7OWG7O) — [Donald G. Reinertsen](http://reinertsenassociates.com/about/)
* [Actionable Agile Metrics for Predictability](https://www.amazon.com/dp/B013ZQ5TUQ) — [Daniel Vacanti](https://twitter.com/danvacanti)
* [When Will It Be Done?: Lean-Agile Forecasting to Answer Your Customers' Most Important Question](https://www.amazon.co.uk/dp/B084WVMKLC) — [Daniel Vacanti](https://twitter.com/danvacanti)
* [Useful engineering metrics and why velocity is not one of them](https://lucasfcosta.com/2022/08/31/engineering-metrics.html) — [Lucas da Costa](https://twitter.com/thewizardlucas)
* [Why long-term plans don't work and how to fix them](https://lucasfcosta.com/2022/07/15/long-term-plans-dont-work.html) — [Lucas da Costa](https://twitter.com/thewizardlucas)
