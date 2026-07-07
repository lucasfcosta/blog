---
layout: post
title: Lucas' Laws of Project Management
author: Lucas Fernandes da Costa
place: São Paulo, Brazil
flag: 🇧🇷
tags: software engineering, project management, engineering management
---

# 1. A project succeeds when it solves the problem. Compliance with the original specification is merely one possible way to get there.

# 2.Scope cannot be known before the work begins. It can only become less wrong as the work proceeds.

A project's initial scope is based on what the team knows _before_ it starts doing the work. That's when the team knows the least about the problem they are trying to solve. The initial scope is therefore a guess, and it is almost certainly wrong.

As the project progresses, the team will discover constraints, missing requirements, and incorrect assumptions. Some parts of the solution may be more expensive than expected, while others may turn out to be unnecessary.

The scope must change to account for those learnings. Otherwise, the project remains committed to decisions made without enough information.

This is why Principle 1 matters. When the team understands the problem it must solve, it can change the scope while preserving the outcome the project is meant to produce. Without that understanding, you risk changing the scope in a way that prevents the project from solving the problem. Conversely, if the team understands the problem, it can change the scope to solve it even if that means deviating from the original specification.

# 3. A fixed date requires variable scope. A fixed scope requires a variable date. Pretending both variables are fixed does not make it so.

Committing to a particular scope and an exact date may seem reasonable at the start of a project. However, if you accept that you don't know the scope before the work begins, you must also accept that it's impossible to know how long it will take to complete that scope. The target date is therefore a guess, and it is almost certainly as wrong as the scope.

Consequently, if you must meet a fixed date, like a product launch or a marketing campaign, the scope must be flexible. The team must be able to reduce the work to meet the date.

On the other hand, if the project must meet a fixed scope, like a legal requirement or a database migration, the date must be flexible. The team must be able to take as long as necessary to complete the work.

If you insist on both a fixed date and a fixed scope, the only variable left to trade will be quality because that's the only way to deliver the same amount of scope in less time.

# 4. A product should grow through successive working versions, not through the accumulation of unfinished parts.

The first version of a product should be the smallest version that works from beginning to end. It does not need every interface, safeguard, or improvement. It only needs to perform one useful action, even if some of the surrounding steps are still manual.

Suppose you are building a system to import contacts from a CSV file. The first version might be a single consumer that processes a file uploaded manually to S3. There is no API or dashboard yet, but the system can already import contacts.

This lets the team test the most important parts of the solution first. It can find out whether the file can be processed correctly, whether the expected volume is viable, and where the real difficulties are before building the rest of the product around it.

Each following version should preserve that working path and improve it. The team may add an API, validation, retries, and a user interface, but the product remains functional after every step.

The alternative is to build several parts in parallel and connect them near the end. Until that happens, the team does not know whether the product works as a whole. Problems are discovered later, feedback arrives later, and there may not be enough time to turn all the unfinished parts into something that can ship by a reasonable date.

# 5. An engineering decision that works for engineering but fails sales, marketing, pricing, support, or operations is not a good engineering decision.

A product must do more than work. It must also be possible to explain, sell, price, support, and operate.

Engineering decisions shape all of those things. A feature may work but be too difficult to explain. A product may be flexible but impossible to price. A system may be easy to build but too expensive to run.

These are not separate business problems. They are consequences of how the product was designed.

Engineering must therefore consider who will have to sell, support, and operate what it builds. A solution is only viable when the rest of the company can work with it.

Principle 1 defines the user problem the project must solve. This principle adds another constraint: the solution must also work for the business responsible for bringing it to users.

# 6. Operations are not what happens after the project. An operable product is one of the things the project must deliver.

The project must provide the means to deploy, monitor, maintain, and repair the product.

The team needs to know whether the product is working, understand why it is failing, and make changes without creating unnecessary risk.

This may require monitoring, alerts, documentation, administrative tools, or a way to reverse a bad deployment. The exact requirements depend on the product, but they must be treated as part of the work rather than postponed until after launch.

Otherwise, the project delivers something that works only while nothing goes wrong, which is rarely the scenario in the real world. The missing operational work is then discovered during incidents, when it is most expensive and difficult to complete.

This is especially important when the product is delivered through successive working versions, as described in Principle 4. Those versions will be used before the project is complete, so the team must be able to monitor them and fix the problems it finds. Doing this at every step makes the final product better.

# 7. Assumptions should be tested in order of the cost of being wrong, not the ease of testing them.

Every project depends on assumptions. The assumptions that could make the project unviable or require major changes should be tested first.

Teams often test the easiest assumptions because doing so creates visible progress. This can leave the most important questions unanswered while more of the product is built on top of them.

Testing the riskiest assumptions early gives the team time to change the solution, reduce the scope, or discuss the necessary trade-offs with stakeholders.

If the project cannot be made viable, it can be stopped before more time and money are spent on it.

# 8. Plan the backlog only far enough ahead to manage the work. Anything beyond that is likely to change before the team reaches it.

The backlog should contain enough work for the team to understand what is coming next, identify dependencies, and avoid running out of useful work.

Planning much further ahead is usually wasteful. As explained in Principle 2, the scope will change as the team learns more. By the time distant tasks are reached, some will be unnecessary and others will need to be rewritten.

A smaller backlog is also easier to keep accurate. Do not be afraid to change or delete items when they no longer reflect what the project needs. I delete items from the backlog all the time.

Keeping the backlog small also means that tasks can be written closer to when they will be done. At that point, the team understands more about the project, so the tasks need fewer instructions and the remaining decisions can be made with better information.

You may still want to record work that could matter later. Just keep it off the board so it does not compete with work that matters now. In Linear, I put those notes in a separate milestone and keep the Kanban board limited to actual upcoming tasks.

# 9. The board should make the state of the project observable: where the work is, where it is accumulating, and what is preventing it from moving.

The board should give everyone the same understanding of the project. It should show what matters next, what is being worked on, and what is preventing that work from moving forward.

This shared state keeps the team focused. When everyone has agreed that one task is the next priority, people should not quietly work on something else. If another task has become more important, the board should change to reflect that decision.

The board also makes problems visible. A task that remains in progress for too long may be blocked by a missing decision, an external dependency, or work that turned out to be larger than expected. Once that is visible, the team can address it, split the work, or change the plan.

This is more useful than asking people to work harder or with more urgency. Work moves faster when the team works on the right things and removes the obstacles preventing them from finishing.

Of course, this only works if everyone looks at the goddamn board. I like to pull it up during every project sync so the conversation stays grounded in the actual state of the work rather than in assumptions about what may be happening.

# 10. Solve the problem early; spend the remaining time polishing

The safest way to meet a deadline is to solve the problem before the deadline arrives.

As explained in Principle 1, the project does not need to satisfy every requirement imagined at the start. It needs to produce a solution that works.

The team should build that solution first. Once it exists, the project can already ship if the date moves forward or the remaining work takes longer than expected.

The rest of the time can then be spent improving the product: adding safeguards, handling more cases, refining the interface, and making the release better for more users.

If the plan is for the final piece of essential work to finish on the target date, any delay makes the project late. Finishing the essential work early turns the remaining schedule into time for improvement instead of time the project depends on to succeed.



---


# 1. Option A: The only success criterion is to ship a product that solves the problem, no / Option B: The most important  is to ship a product that solves the problem, not to ship a product that ticks all the boxes of the original specification.



# 2. Scope can't be defined up front, it can only be defined in the process of building the product.

# 3. You either change the scope to meet a target date, or you change the target date to meet the scope.

# 4. At any given time, the next best step is to ship the smallest possible change that is complete on its own. (needs better phrasing: the idea is that we shouldn't stack a bunch of changes before the product does anything, it's like the scooter, motorcycle, car graph, every step needs to work).

# 5. Pricing, marketing, and sales are as important as engineering.

# 6. Operating the product after it's shipped is part of the project, not a separate phase of the project.

# 7. The riskiest assumptions should be tested as early as possible.

# 8. Keep the backlog small.

# 9. Look at the goddamn board. If it's not in the board, it does not exist.

# 10. "Plenty of time" becomes "not enough time" in a very short time. So deliver the smallest possible increment that solves a problem as soon as you can. Most of the iterations should happen after the problem is solved.
