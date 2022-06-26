---
layout: post
title: "It's better to control queue size than to control cycle-time"
author: Lucas Fernandes da Costa
place: London, United Kingdom
flag: 🇬🇧
tags: agile project-management queue-sizes
---

// TODO double check alts

> _In product development, our greatest waste is not unproductive engineers, but work products sitting idle in process queues._
>
> — Reinertsen, Donald G. The Principles of Product Development Flow: Second Generation Lean Product Development.


This is [Beigel Bake](https://bricklanebeigel.co.uk), in Brick Lane, London.

<img style="margin-bottom: -18px;" src="/assets/queue-behaviour/beigel-bake.jpg" alt="Beigel Bake's store front, in Brick Lane, London.">
<center style="font-size: 0.8em; margin-bottom: 32px;"><i><a href="https://www.flickr.com/photos/schimonski/">Schimonski</a> <a href="https://creativecommons.org/licenses/by-nc/2.0/">[CC BY-NC 2.0]</a>, <a href="https://www.flickr.com/photos/schimonski/5863739374">via Flickr</a></i></center>

Beigel Bake is notorious for its salt beef [beigels](https://www.mashed.com/265131/whats-the-difference-between-beigels-and-bagels/) and humongous queues.

> MAYBE - In this post, we'll look at Beigel Bake to understand ....

To decide whether you should join Beigel Bake's queue, there are two questions you could ask:

1. How long did it take for the last customer to be served
2. How long the queue is

Imagine you decide to take the first approach. In that case, you go ahead and ask someone just leaving Beigel Bake: "how long did it take you to get a bagel?". "Ah, just two minutes" — they tell you.

Sweet! Two minutes for an mouth-watering salt-beef bagel? That's definitely a deal worth taking.

Yet, after joining the queue, quite a few minutes go by, and you're nowehere near the counter. Why did that happen?

That happened because the person you asked joined the queue before you did. At the time, the queue was shorter. Therefore, they took less time to get to the front of the queue.

Someone that joined a 2-people long queue gets their beigel quite quickly. On the other hand, someone who joins a 20-people queue takes way more time to be served. In other words, the time it takes for people to get a beigel is a lagging indicator. It doesn't tell you anything about how long _you_ will take to be served. That is, not unless you consider the size of the queue you're joining.

On the other hand, if you know there are twenty people in front of you, and each beigel takes thirty seconds to prepare, you can estimate you'll take ten minutes to be served.

<img style="margin-bottom: -18px;" src="/assets/queue-behaviour/cycle-time-queue-beigel.png" alt="A diagram showing that you take more time to be served the further back into the queue you are.">
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>If every beigel takes thirty seconds to prepare, every person in front of you adds at least 30 seconds to the time it will take you to be served.</i></center>

As you could see, **Beigel Bake's queue-size is a leading indicator of cycle-time** — of how long it will take to get a beigel.

If you were to plot the cumulative number of customers leaving and arriving over time, the effect of queue sizes becomes easy to observe.
In the chart below, you can see that the rate of people arriving is greater than the rate of beigels served. Therefore, the shop's queue starts to grow as evidenced by the difference between the cumulative number of arrivals and the cumulative number of departures, which represents the queue size. Besides the queue's growth, the chart below demonstrates how customers joining a bigger queue take longer to be served because they take longer to get to the front of the queue.

<img style="margin-bottom: -18px;" src="/assets/queue-behaviour/queue-time-vs-size.png" alt="A diagram showing that you take more time to be served the further back into the queue you are.">
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>A queue grows when servers can't keep up with arrivals. Customers joining a longer queue then take longer to be served.</i></center>

**This type of chart is known as a cumulative flow diagram, or, in short, CFD**.

In real life, most of us already follow this heuristic. If we see a massive queue, we're less likely to join it. Instead, we can decide to go do something else and come back later, when Beigel Bake is less busy.

By contrast, in software development we often make the mistake of looking at how long it takes for each task to be done — a lagging indicator — instead of looking at the number of tasks we have to do — a leading indicator of total cycle-time.

When it comes to software, our queues easily become invisible because they're bytes on a hard-drive, not people on the sidewalk. That's why most engineers are blind to queue sizes, but adamant about continuously measuring cycle-time, and trying to diminish it.

The problem with trying to influence total cycle-time is that total cycle-time itself is determined by how long your task queue is. The longer your queue, the longer your lead times will be.

"But what is the problem with long lead times?", asks the perspicaceous reader.

The first problem with lead times is that they amplify variability: the longer the lead times, the greater cycle-times will get. That's because issues which join the queue later take longer to complete, even if they're as complex as another issue which joined the queue earlier.

The second problem with long lead times is that they cause specifications to rot.

Imagine, for example, that you've written detailed stories for implementing a new discount coupon system for your online Beigel Shop. Three months later, when a developer finally picks-up the coupon system's stories, it may be the case that they're not even worth implementing because you discovered customers are just as happy to pay the full price. Even in the best case scenario, you'll have to revisit those stories to ensure the assumptions you've made at the time still make sense.

It's even worse when engineers implement these rotten specifications. In that case, they'll have spent time writing useless features, which don't generate profit. Instead, each feature increases the software's bug surface, making it more expensive to maintain.

Either way, you've wasted time, effort, and money to create those specifications ahead of time.

Besides delaying feedback and producing economic waste, long queues demotivate engineers, and make status reporting more complex, increasing management costs. Conversely, as queues get shorter, planning horizons shorten too. Consequently, we create more up-to-date specifications, which don't need as much rework, and are more likely to generate profit, because they have been created atop fresh pieces of information. Furthermore, in case your customers don't like the new feature, shorter queues will allow you to start reworking it sooner.

> Queues are the root cause of the majority of economic waste in product development.
>
> — Reinertsen, Donald G. The Principles of Product Development Flow: Second Generation Lean Product Development.

Now that you understand the damages caused by queues, let's look at how queues behave, so that we can diminish their impact.

<br>

## Understanding a queue's behaviour

In this section, we'll simulate a queues behaviour so that we can understand it. Then, we'll look at how to make queues smaller, so that we can gain the economic benefits produced by shorter queues.

Beigel Bake has a single queue, and, usually, two employees serving beigels. Each of those employees take anywhere from one to two minutes to serve each beigel. On Sundays, when Beigel Bake is the busiest, one to three people join the queue each minute.

Using this data we can write a program that simulates the queue's size over an hour. Our program will do the following:

1. It will simulate one second at a time.
2. Every second, any arriving customers will be matched to a beigel server available.
    * If no servers are available, the customer will join the end of the queue.
3. Whenever a server delivers the customer a beigel, it will move on to serving the first person in the queue.

After the simulation finishes, the program will plot an area chart. This chart tracks seconds on the X axis. The Y axis tracks the cumulative number of customer arrivals and beigels served.

Here's the result for one run of the simulation.

<img style="margin-bottom: -18px;" src="/assets/queue-behaviour/beigels-vs-arrivals.png" alt="Simulation of beigels served versus arrivals.">
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>When the employees can't serve beigels as quickly as customers arrive, a queue forms.</i></center>

Similarly to the arrivals and departures chart I showed before, the vertical distance between the two bands represents the queue's size and the horizontal distance between them represents cycle-time. Just like before, as the queue grows, cycle-time grows too.

To diminish the time it takes for customers to be served, the beigel shop needs to reduce the vertical distance between the two bands. For that, they must either hire more servers, increase the rate at which employees serve beigels, or both.

First, let's see what happens when we halve the time it takes for each employee to prepare a beigel.

<img style="margin-bottom: -18px;" src="/assets/queue-behaviour/beigels-vs-arrivals-more-quickly.png" alt="Simulation of beigels served versus arrivals when servers are twice as fast.">
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>A simulation in which employees take half the time to prepare a beigel.</i></center>
When employees can prepare beigels more quickly, customers are more likely to find a free employee when they arrive. Therefore, they are less likely to join the queue, so the average queue length over time is smaller. Consequently, cycle times decrease. Customers are happy.

Now, let's simulate a scenario in which the employees aren't as quick, but there are twice as many employees working.

<img style="margin-bottom: -18px;" src="/assets/queue-behaviour/beigels-vs-arrivals-more-quickly.png" alt="Simulation of beigels served versus arrivals when servers are twice as fast.">
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>A simulation in which employees still take the same time to prepare beigels, but there are twice as many employees.</i></center>

In this scenario, similarly to the previous one, there is barely anyone in the queue at any given moment. Because there are more employees working, the likelyhood of an arriving customer finding all servers busy is also smaller.

In both scenarios, there's one common factor which reduces the queue formation: arriving customers are less likely to find all servers busy. That could be either because there are more servers working, or because servers are quicker, and, therefore, free themselves up sooner.

This likelyhood of finding all servers busy is determined by one variable: **capacity utilisation**. **Capacity utilisation represents what's the percentage of busy servers at a given time**. The more free servers, the smaller the capacity utilisation. As servers get busier, the capacity utilisation increases.

In the first simulation, where we've seen queues forming, our average capacity utilisation throughout the simulation was 99%. In the other two simulations, the average capacity utilisation was 72% and 77%, respectively.

That leads us to the conclusion that the more capacity we add, the less likely queues are to form. That's because customers are less likely to find all servers busy, and, therefore, less likely to have to join a queue.

To see how our simulation behaves at different levels of capacity utilisation, let's run this very same simulation (2 servers, 1 to 2 minutes per beigel) 100 times. For every time the simulation runs, we'll increase the the number of servers, thus leading to less capacity utilisation. After all simulations run, we'll create a scatterplot correlating the average queue size and the average capacity utilisation for each simulation.

<img style="margin-bottom: -18px;" src="/assets/queue-behaviour/cap-vs-queue-size-low-res.png" alt="Simulation of beigels served versus arrivals when servers are twice as fast.">
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>A scatterplot for the average queue size of 100 simulations at different levels of capacity utilisation. </i></center>

This scatterplot shows that the average queue sizes increases as the average capacity utilisation increases, just as we expected.

The effect of capacity utilisation in queue size can be even more obvious if we change our simulations parameters and increase the rate at which people join the queue. This time, will make eight to ten people join the queue every twenty seconds. That will diminish the impact each server has on capacity utilisation, thus causing us to have more granular data at high levels of utilisation.

<img style="margin-bottom: -18px;" src="/assets/queue-behaviour/cap-vs-queue-size-high-res.png" alt="Simulation of beigels served versus arrivals when servers are twice as fast.">
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>Causing every server to have less impact in capacity utilisation leads to more granular results in the higher ranges of utilisation.</i></center>

There's yet a third lever the beigel shop could pull to diminish capacity utilisation: reduce the number of arrivals. In this case, however, that's not a productive alternative because it diminishes their profit.

Finally, another important factor to notice in our simulations is that it wouldn't make sense to force spare capacity by asking a few employees to remain idle. If we were to do that, queues would still form because there would be fewer employees working. **The only ways to drive average capacity utilisation down were to make employees faster, increase the number of employees, or reduce the rate of arriving customers**.

The beigel shop would only benefit from having spare employees if they were designated to serve high paying customers. Those high paying customers would then have a shorter cycle time, but that would be at the expense of longer cycle-times for other customers.

<br>

### Queues and variability

As you've seen, when the beigel shop operates at high levels of capacity utilisation, queues form. Therefore, if the shop's goal is to serve customers predictably, it must have excess capacity.

If the shop wanted to avoid having to have excess capacity, they'd only have one option: eliminate variability. If every beigel takes the exact same amount of time to prepare and customers arrive at uniform intervals, the shop's owner can hire the exact amount of servers needed to produce beigels at the same rate customers arrive.

The cumulative flow diagram below illustrates what happens in a simulation in which each customer arrives at a 30 second interval and a single server always takes 30 seconds to prepare a beigel.

<img style="margin-bottom: -18px;" src="/assets/queue-behaviour/cap-vs-queue-size-deterministic.png" alt="Simulation of beigels served versus arrivals when servers are twice as fast.">
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>In a deterministic process in which the arrival rate is the same as the departure rate, cycle-times remain constant.</i></center>

As the chart shows, when there's no variability and arrival rates match departure rates, there's no chance that the next customer will find all servers busy when they arrive. In such a deterministic process, the server is always free by the time the next customer arrives. Therefore, cycle-times remain constant and the queue size is always zero.

The problem is that most processes are not deterministic. There is either elastic demand, or variability in the time it takes for tasks to be done. Consequently, in the real-world, if we optimise for efficiency, that is, for keeping people busy all the time, queues will form. That's the exact problem with [Taylorism](https://en.wikipedia.org/wiki/Scientific_management): it worships efficiency, and thus allows for no spare capacity. This lack of excess capacity causes queues to grow, and cycle-times to vary.

<br>

## Queue sizes, capacity utilisation and software development

Now let's compare how software development queues compare to the beigel shop's queue. As we compare both, let's look at what levers we could pull to diminish queues, and, therefore, reduce cycle times and make them more uniform.

First, let's recap what we've learned with the beigel shop:

1. As capacity utilisation increases, queues are more likely to form because customers are less likely to find any free servers.
2. To diminish capacity utilisation, we can:
    1. Increase the number of servers
    2. Reduce the time it takes to complete tasks
    3. Reduce arrival rates


### Increasing the number of developers

Increasing the number of developers is the first obvious alternative for any team because more developers add capacity. Therefore, our team will be able to complete more tasks.

The problem with simply adding more capacity is that it only works if the extra developers bring capacity utilisation below 100%.

Imagine, for example, that you already have a long queue of tasks in your backlog. Because that queue of tasks is excessively long, developers are already always busy. In that case, adding an extra developer will only be helpful if it allows your long queue of tasks to eventually come down to zero. Otherwise, you'll remain at 100% capacity utilisation, and any new tasks will still go into the queue, increasing the variability of cycle-times.







# Alternatives

* Reduce impact of queues, not only reduce queues
*
