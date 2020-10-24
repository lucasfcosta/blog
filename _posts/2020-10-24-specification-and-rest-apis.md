---
layout: post
title: How much specification does a developer need?
author: Lucas Fernandes da Costa
place: London, United Kingdom
flag: 🇬🇧
tags: software-development rest api restful
---

Specifications work in two ways: they inform developers what needs to be built, and they constrain the problem space so that tasks become approachable.

Without clear specifications, developers may build the wrong software, or they may take too long building more software than the customers actually need.

On the other hand, specifications which include too much detail can be damaging to the software's architecture and the program's usability. When specifications include too much detail, they constrain the problem space in such a way as to limit the user's actions unnecessarily. Excessive detail also requires programmers to handle edge-cases in complicated ways, often adding unnecessary indirections, which make the program's execution flow more complex, and thus harder to debug.

Imagine you're implementing an operating system, for example. If specifications for its filesystem describe which actions users would like to perform, programmers can create elegant abstractions to solve the problem. On the other hand, if specifications include too many edge-cases, the system becomes inflexible and limits user interaction. Additionally, it's harder to create non-[leaky abstractions](https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/).

**Good specification is short and concise and needs to be complemented by giving developers the necessary amount of context about who the software's users are and what these users want.**

In general, the more developers distance themselves from users, the more difficult it becomes to build software which fulfils those users' needs.

If you look at companies like [Stripe](https://stripe.com), for example, you'll see that their engineers deeply care about their users, and are kept close to them. That's why Stripe's built such a brilliant product.

Keeping developers close to users means that, given a minimal amount of specification, those developers can figure out what are the boundaries of what they need to build.

Instead of describing every minimal detail and edge-case, **good specification focuses on intents and outcomes**. It relies on the developer to think about possible edge-cases and empower their users with flexible functionality, which usually leads to software that's more elegant and useful.

Additionally, outcome-focused specifications reduce communication overhead between product and software development teams. Instead of having to ask product about every single edge-case, this kind of specification empowers developers to think about what's best for the user.

However, depending on what developers will build, they may need specifications which go beyond intents and outcomes.

When developing, back-end services, for example, text-based stories are enough. On the other hand, developers working on front-end applications need designs so that they can build pleasant experiences, and schema definitions so that they can interface with data-provider services.

That's why I'd recommend teams to use tools like [Zeplin](https://zeplin.io) or [Figma](https://figma.com) to smoothen design handover, or [mock-api tools like Mockoon](https://mockoon.com/) (whose tutorials are available [here](https://mockoon.com/tutorials/)) to smoothen the development process of applications which fetch data from a RESTful API.

Useful and elegant software understands their users and is [built upon their language](https://www.youtube.com/watch?v=pMuiVlnGqjk), not on a vacuum.

All code needs a purpose.

<br>

# Postscriptum

This post's title is a reference to Tolstoy's [_"How much land does a man need?"_](https://www.goodreads.com/book/show/21206786-how-much-land-does-a-man-need).
