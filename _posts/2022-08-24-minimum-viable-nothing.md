---
layout: post
title: "The Minimum Viable Nothing: ideas to validate products without building them"
author: Lucas Fernandes da Costa
place: London, United Kingdom
flag: 🇬🇧
tags: agile process practices
---

Let me be clear: if they tell you it's a great idea but don't give you their credit card, they don't want it.

To validate an idea, you need to sell it. To sell an idea, you should, ideally, show people the _product_. Not a slide deck, not a video, not a landing page, not a clickable prototype. The _product_.

You need to show them the product and get them to pay for it.

Testing willingness to pay is paramount for product development because **pricing is part of the product**. Therefore, it influences product-market fit. Even Uber wouldn't have product-market fit if every ride cost ten times as much. Conversely, if the iPhone were twice as cheap, maybe it wouldn't be seen as a premium product and, consequently, wouldn't be as profitable.

Showing people a product and its pricing is a [forcing function](https://www.interaction-design.org/literature/book/the-glossary-of-human-computer-interaction/forcing-functions). When you show people the product and tell them its price, you give people all the information they need to make a decision.

At that stage, people can't get away with telling you that the idea "sounds promising" or that "they'd definitely buy if it existed". Instead, people must act. There's nothing to wait for.

That happens because people:

1. Understand precisely how the product works
2. Can determine whether it provides value
2. Can compare the product's benefit to its cost

Furthermore, the only people who smile at a slide deck are investors. Customers smile at products.

**When you show people a demo, you get more genuine reactions**, so you're better able to gauge interest.

The problem with a demo is that it requires something to be built, and building things is expensive, especially when the people building them are software engineers.

So how do you reap the benefits of a demo while paying as little as you would for a slide deck, landing page, or video?

That's what I'm going to explain in this post.

First, I'll define a concept I call the "Minimum Viable Nothing". Then, I'll explain why I believe it's more effective to test hypotheses using a "Minimum Viable Nothing" than a "Minimum Viable Product".

> I was told the tech industry loves acronyms because it makes things sound more elaborate than they actually are. If you love those too, you can call the "Minimum Viable Nothing" an "MVN".

The second part of this post contains three practical approaches to test hypotheses without having to build an actual product and when to use each.

Finally, at the end of this post, I've included a small summary to help you decide which strategy to use.

<br>

## What is the "Minimum Viable Nothing"

The Minimum Viable Nothing is the minimum amount of functionality necessary to illustrate what your product does and how it does it.

A good MVN must meet three criteria:

1. It makes the value proposition obvious
2. It illustrates _how_ it delivers that value
3. It's convincing enough for people to be able to decide whether they'll pay for it

The interesting thing about an MVN is that it doesn't actually need to deliver value, although it might.

A slide deck, video, or landing page are just different ways of _presenting_ an MVN, but none of those alternatives beats an actual demo.

In the startup world, the slide deck that could've been a demo is the meeting that could've been an email. It's shorter, more convincing, and more effective because it provides you and the customer with more information. You see more genuine reactions, and the customer sees a more accurate depiction of what they'll possibly buy.

Your Minimum Viable Nothing will depend on your product, what it does, and to whom you're selling. It's _your_ job to think through what your MVN will be. There's no formula for determining it. Still, there are helpful heuristics and prior art from which you can draw inspiration, as you'll notice in the next section.

<br>

## Three ways to build an MVN

If I were to build an MVN today, I'd probably take one of these three paths:

1. The [vaporware](https://en.wikipedia.org/wiki/Vaporware) — Building a product which doesn't do anything but pretends it does
2. The [mechanical Turk](https://en.wikipedia.org/wiki/Mechanical_Turk) — Building a product that depends on humans to do actual the work
3. The automatable agency — Selling consulting engagements which you can gradually automate

These options are ranked from least to most laborious and from least to most value delivered.

Now, I'll explain how these approaches work and the circumstances in which you should consider or avoid them.

<br>

### 1. The vaporware

The "vaporware" strategy consists of a product that doesn't do anything but pretends it does. This strategy is an evolution of the "clickable prototype".

Imagine, for example, that you're building a service which lets people manage their Kubernetes clusters through a GUI.

In that case, building a clickable prototype probably won't convince people that the product exists, thus leading to less genuine reactions. That's because the prototype will likely be static, and only a few buttons will be clickable.

Instead of having a clickable prototype, you could build a web app with fake data that generates random events. Considering you'll be scrappy enough, it will take you roughly the same amount of work.

That way, you can demo it through a browser and allow customers to interact with it themselves if they want to do so.

Notice that you don't need an actual Kubernetes cluster to manage for the prototype to give you the information you need.

You could even use service workers to provide canned API responses and replace those canned responses with an actual API later, accelerating further product development.

The "vaporware" strategy also applies to CLI-based products. In the case of CLIs, it's even easier to build a tool which doesn't do anything but pretends it does.

Imagine you're building a new CI service, for example. In that case, you could implement a pretty CLI that doesn't actually produce anything or report any results, as I did in the example below.

<a target="_blank" class="image-link" href="/assets/mvn/ci.svg"><img style="margin-bottom: -18px;" src="/assets/mvn/ci.svg" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>The Minimum Viable Nothing for a CLI-based CI service</i></center>

You want to buy it already, don't you?

> When following the vaporware approach, there's the danger of selling something you can't execute. That's why you need to be careful with the commitments you ask for and ensure you're being ethical and responsible about your delivery obligations.

<br>

#### When to use or not to use the "ghost in the shell" strategy

I recommend following this strategy when you're already confident that you have found a problem worth solving but haven't yet validated _how_ people want it to be solved or how much they're willing to pay for the solution.

If you haven't found a problem yet, you're better off just [talking to customers](https://lucasfcosta.com/2022/08/03/talk-to-your-customers.html). That's cheaper, quicker, and more effective than building vaporware.

<br>

### 2. The mechanical Turk

The [mechanical turk](https://en.wikipedia.org/wiki/Mechanical_Turk) is, in a way, an evolution of the "ghost in the shell" approach. The difference is that instead of pretending your product does something, you make it _do_ something, but not through a piece of software. Instead, you use human labour.

<a target="_blank" class="image-link" href="/assets/mvn/mechanical-turk.jpg"><img style="margin-bottom: -18px;" src="/assets/mvn/mechanical-turk.jpg" alt=""></a>
<center style="font-size: 0.8em; margin-bottom: 32px;"><i>The original mechanical Turk: a fraudulent chess-playing machine in which a human would control the "robotic" Turk against which people would play</i></center>

Imagine, for example, that you're building a service to transcribe audio into text. Instead of wasting months of research and tens of thousands of dollars to develop it, you could hire a human to do the transcription.

In that case, whenever someone uploads a file to your server, you send an email to someone who'll transcribe it. If you're low on time, you could even pay for [Amazon's Mechanical Turk service](https://www.mturk.com/) — yes, that exists.

That way, you can test hypotheses in a day, not in a few months. Given the service works, you can even start selling it straightaway to subsidize the R&D costs of the actual transcription software.

<br>

#### When to use or not to use the "mechanical Turk" strategy

The mechanical Turk is the natural next step of the vaporware approach. It assumes you've found a problem worth solving and that you're reasonably confident in _how_ you're solving it.

If that's your case, this strategy will allow you to gauge whether the product delivers value in the long run. The mechanical Turk is a great strategy to estimate churn and enables you to test whether you can charge customers more. After all, they're getting _some_ value out of the product.

The problem with this approach is that this strategy may not be profitable depending on how complex the task is and how much you're paying people to do it. Therefore, you should be careful not to sell to too many people if you aren't sure about whether and when you can automate the product.

If the product you're selling is profitable despite the cost of human labour, this strategy is great for subsidizing further R&D because it brings revenue forward. That way, you can go "all-in" on sales and marketing as you develop the product.

<br>

### 3. The automatable agency

If people are willing to pay you for a particular service, they'll likely pay for a piece of software to do the same, providing your software is as effective as your manual labour.

This third approach consists of selling people a productized service, not a product. That service is a consultancy engagement for a limited amount of time to solve one particular problem.

Ideally, those engagements should be as short as possible, and you should ensure you get to retain the intellectual property of the tools you might eventually build.

As you engage with clients, take notes of the similarities and differences between the challenges they face. That way, you'll have a larger sample size and can avoid overfitting your future product to a single company's problem.

Once you create a tool to provide customers with a similar service, you can then turn consultancy engagements into subscriptions. That probably will be much easier than selling a subscription straightaway.

In that case, sales are easier because you already have a highly qualified lead whose problem you understand and have already solved, and to whom you have already provided a similar service.

<br>

#### When to use or not to use the "automatable agency" strategy

This approach is helpful if you haven't yet found a small enough problem to solve. When you engage with customers as a consultant, you'll see patterns they all face and have a broader view of the ecosystem they deal with, including the tools they like, the tools they don't, and why.

This strategy is the most productive for founders who want to create B2B products. That's because you'll see how people at different hierarchical levels use and evaluate your product. Furthermore, you'll better understand who the buyers are, how they differ from a user, and their motivation and criteria for purchasing.

Given that B2B sales tend to be high-touch, another advantage of acting as an agency is that it generates highly qualified leads to whom it will probably be easier to sell services at a higher price point.

Yet another advantage of acting as a consultant is that you can charge more for each consultancy engagement. Consequently, you can subsidize further R&D with a substantial amount of money.

You should think twice about adopting this strategy if time-to-market is crucial or if you're a solo founder.

Each of these engagements will consume a large amount of your time. Therefore, you may take too long to deliver a product if you don't have anyone with whom you can share the workload.

<br>

## Putting it all together

Pricing is part of your product, and it influences product market fit. Therefore, to validate a product, you must test whether people are willing to pay for it.

To validate people's willingness to pay, showing them a product is much more effective than showing them a video, landing page, or slide deck.

A demo is often the best way to assess willingness to pay because it acts as a forcing function: it gives people all the information they need to make a purchasing decision.

Furthermore, demos allow you to see genuine reactions. The only people who slide at slide decks are investors. Customers smile at products.

To build demos quickly and inexpensively, you can create a piece of _"minimum viable nothing"_ (an "MVN") rather than a "minimum viable product".

The Minimum Viable Nothing is the minimum amount of functionality you need to illustrate what your product does and how it does it.

A good MVN meets three criteria:

1. It makes the value proposition obvious
2. It illustrates _how_ it delivers that value
3. It's convincing enough for people to be able to decide whether they'll pay for it

An MVN doesn't necessarily need to deliver value, although it can.

To build your MVN, there are three main paths I'd suggest:

1. The vaporware — Building a product which doesn't do anything but pretends it does
2. The mechanical Turk — Building a product that depends on humans to do actual the work
3. The automatable agency — Selling consulting engagements which you can gradually automate

Each path has pros and cons, so you should consider _your_ situation before choosing one.

Try the vaporware approach if you've found a problem worth solving but are unsure whether people like your solution or how much they'd pay for it.

If you've validated your problem and are confident in your solution, go for the mechanical Turk strategy. That strategy is also valid for funding R&D, but you must be careful not to sell to too many people if the necessary human labour causes the product to be unprofitable.

When selling to businesses or when you don't yet know exactly which problem you're solving, you can sell a productized service. Then, you can build software on the side to provide the same services as you do. Besides helping generate ideas, this approach generates highly qualified leads, prevents overfitting solutions, and, consequently, makes sales easier.

<br>

# Wanna talk?

**If you'd like to have a chat, <a onclick="sa_event('calendly-mvn')" target="_blank" href="https://calendly.com/lucasfcosta/1-1-with-lucas">you can book a slot with me here</a>**.

You can also [send me a tweet or DM @thewizardlucas](https://twitter.com/thewizardlucas) or [an email at lucas@lucasfcosta.com](mailto:lucasfcosta.com).
