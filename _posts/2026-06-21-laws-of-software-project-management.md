---
layout: post
title: Lucas' Laws of Project Management
author: Lucas Fernandes da Costa
place: São Paulo, Brazil
flag: 🇧🇷
tags: software engineering, project management, engineering management
---

<Law num="1" title="A project succeeds when it solves the problem. Compliance with the original specification is merely one possible way to get there.">

A project's goal rarely has anything to do with implementing a list of features. It is usually about solving a problem for users, the business, or both.

The original specification is a guess about what will solve that problem. It is almost certainly wrong, and it will change as the team learns more about the problem and the solution, as explained in Law 2.

Considering that the original specification is likely wrong, the only way to materially influence the outcome of a project is to understand the problem it is trying to solve so that you can adapt the solution as you uncover more information. If the team does not understand the problem, it cannot change the solution without risking failure.

**Recommendation:** Make sure the team understands the problem before it starts working on the solution. Keep the problem in mind as the work progresses, and be willing to change the solution when new information is discovered.

</Law>

<Law num="2" title="Scope cannot be known before the work begins. It can only become less wrong as the work proceeds.">

A project's initial scope is based on what the team knows _before_ it starts doing the work. That's when the team knows the least about the problem it is trying to solve. The initial scope is therefore a guess, and it is almost certainly wrong.

As the project progresses, the team will discover constraints, missing requirements, and incorrect assumptions. Some parts of the solution may be more expensive than expected, while others may turn out to be unnecessary.

The scope must change to account for those learnings. Otherwise, the project remains committed to decisions made without enough information.

**Recommendation:** Don't plan for too long before starting the work. You will uncover more information as you go, and the scope _will_ change. The team should be able to adapt the solution to what it learns.

</Law>

<Law num="3" title="A fixed date requires variable scope. A fixed scope requires a variable date. Pretending both variables are fixed does not make it so.">

Committing to a particular scope and an exact date may seem reasonable at the start of a project. However, if you accept that you don't know the scope before the work begins, you must also accept that it's impossible to know how long it will take to complete that scope. The target date is therefore a guess, and it is almost certainly as wrong as the scope.

Consequently, if you must meet a fixed date, like a product launch or a marketing campaign, the scope must be flexible. The team must be able to reduce the work to meet the date.

On the other hand, if the project must meet a fixed scope, like a legal requirement or a database migration, the date must be flexible. The team must be able to take as long as necessary to complete the work.

If you insist on both a fixed date and a fixed scope, the only variable left to trade will be quality because that's the only way to deliver the same amount of scope in less time.

**Recommendation:** Decide which variable is more important: the date or the scope. Make the other variable flexible so that the team can adapt to what it learns as it works.

</Law>

<Law num="4" title="A product built as successive working versions works every day. A product built as parallel parts works on the last day, if you're lucky.">

The first version of a product should be the smallest version that works from beginning to end. It does not need every interface, safeguard, or improvement. It only needs to perform one useful action, even if some of the surrounding steps are still manual.

Assume you are building a system to import contacts from a CSV file, for example. In that case, the first version might be a single consumer that processes a file uploaded manually to S3. There is no API or dashboard yet, but the system can already import contacts.

This lets the team test the most important parts of the solution first. It can find out whether the file can be processed correctly, whether the expected volume is viable, and where the real difficulties are before building the rest of the product around it.

Each following version should preserve that working path and improve it. The team may add an API, validation, retries, and a user interface, but the product remains functional after every step.

The alternative is to build several parts in parallel and connect them near the end. Until that happens, the team does not know whether the product works as a whole. Problems are discovered later, feedback arrives later, and there may not be enough time to turn all the unfinished parts into something that can ship by a reasonable date.

To summarise: **you can always ship a working product, even if it is small and incomplete. You cannot ship a product that does not work, no matter how enterprise-ready it looks.**

**Recommendation:** Build the product in a way that it can be used from the start. Add features and improvements to that working version instead of building several unfinished parts in parallel.

</Law>

<Law num="5" title="An engineering decision that works for engineering but fails sales, marketing, pricing, support, or operations is not a good engineering decision.">

A product must do more than work. It must also be possible to explain, sell, price, support, and operate.

Engineering decisions shape all of those things. A feature may work but be too difficult to explain. A product may be flexible but impossible to price. A system may be easy to build but too expensive to run.

These are not separate business problems. They are consequences of how the product was designed.

Engineering must therefore consider who will have to sell, support, and operate what it builds. A solution is only viable when the rest of the company can work with it.

Law 1 defines the user problem the project must solve. This law adds another constraint: the solution must also work for the business responsible for bringing it to users.

**Recommendation:** Have regular check-ins with the teams responsible for selling, supporting, and operating the product. During those check-ins, listen to their concerns (not necessarily to their solutions) and make sure the engineering decisions take them into account.

</Law>

<Law num="6" title="Operations are not what happens after the project. An operable product is one of the things the project must deliver.">

The project must provide the means to deploy, monitor, maintain, and repair the product.

The team needs to know whether the product is working, understand why it is failing, and make changes without creating unnecessary risk.

This may require monitoring, alerts, documentation, administrative tools, or a way to reverse a bad deployment. The exact requirements depend on the product, but they must be treated as part of the work rather than postponed until after launch.

Otherwise, the project delivers something that works only while nothing goes wrong, which is rarely the scenario in the real world. The missing operational work is then discovered during incidents, when it is most expensive and difficult to complete.

This is especially important when the product is delivered through successive working versions, as described in Law 4. Those versions will be used before the project is complete, so the team must be able to monitor them and fix the problems it finds. Doing this at every step makes the final product better.

**Recommendation:** Plan for operability from the start and make time for it. Ideally, observability should come in early so that the team can fix issues surfaced by a small subset of alpha users.

</Law>

<Law num="7" title="An assumption's importance is the cost of it being wrong, not the ease of proving it right.">

Every project depends on assumptions. The assumptions that could make the project unviable or require major changes should be tested first.

Teams often test the easiest assumptions because doing so creates visible progress. This can leave the most important questions unanswered while more of the product is built on top of them.

Testing the riskiest assumptions early gives the team time to change the solution, reduce the scope, or discuss the necessary trade-offs with stakeholders.

If the project cannot be made viable, it can be stopped before more time and money are spent on it.

**Recommendation:** It's unlikely you will identify all risky assumptions upfront, but whenever you discover one, test it as soon as possible. If the assumption is wrong, the team will have more time to adapt the solution or reduce the scope.

</Law>

<Law num="8" title="Backlogs don't preserve plans. They preserve the ignorance the team had when the plans were written.">

The backlog should contain enough work for the team to understand what is coming next, identify dependencies, and avoid running out of useful work.

Planning much further ahead is usually wasteful. As explained in Law 2, the scope will change as the team learns more. By the time distant tasks are reached, some will be unnecessary and others will need to be rewritten.

A smaller backlog is also easier to keep accurate. Do not be afraid to change or delete items when they no longer reflect what the project needs. I delete items from the backlog all the time.

Keeping the backlog small also means that tasks can be written closer to when they will be done. At that point, the team understands more about the project, so the tasks need fewer instructions and the remaining decisions can be made with better information.

You may still want to record work that could matter later. Just keep it off the board so it does not compete with work that matters now. In Linear, I put those notes in a separate milestone and keep the Kanban board limited to actual upcoming tasks.

**Recommendation:** Keep the backlog small and focused on what matters next. Write tasks when they are about to be worked on instead of when they are first imagined. Anything beyond that is likely to change before the team reaches it.

</Law>

<Law num="9" title="If the state of the project lives in people's heads, every head holds a different project.">

The board should give everyone the same understanding of the project. It should show what matters next, what is being worked on, and what is preventing that work from moving forward.

This shared state keeps the team focused. When everyone has agreed that one task is the next priority, people should not quietly work on something else. If another task has become more important, the board should change to reflect that decision.

The board also makes problems visible. A task that remains in progress for too long may be blocked by a missing decision, an external dependency, or work that turned out to be larger than expected. Once that is visible, the team can address it, split the work, or change the plan.

This is more useful than asking people to work harder or with more urgency. When you do that, you're forcing an increase in `time` to fit in more unnecessary scope. Instead, you should remove the unnecessary scope so that the work can be completed in the same time.

Of course, this only works if everyone looks at the goddamn board. I like to pull it up during most project syncs (or stand-ups, whatever you call them) so the conversation stays grounded in the actual state of the work rather than in assumptions about what may be happening.

If you prefer something other than a Kanban board, that's fine too, as long as you have a single place where you can see the project's current state.

**Recommendation:** Create a single place where everyone can see the current state of the project. Keep it up-to-date, and make sure that everyone looks at it regularly. That way, the team can tackle blockers and knows what's happening _now_ and what's happening _next_. If anyone is working on something that's not on the board, either the board needs to change or that piece of work should be canceled.

</Law>

<Law num="10" title="A project that solves the problem early can only get better. A project that saves the solution for last can only get late.">

The safest way to meet a deadline is to solve the problem before the deadline arrives.

As explained in Law 1, the project does not need to satisfy every requirement imagined at the start. It needs to produce a solution that works.

The team should build that solution first. Once it exists, the project can already ship if the date moves forward or the remaining work takes longer than expected.

The rest of the time can then be spent improving the product: adding safeguards, handling more cases, refining the interface, and making the release better for more users.

If the plan is for the final piece of essential work to finish on the target date, any delay makes the project late. Finishing the essential work early turns the remaining schedule into time for improvement instead of time the project depends on to succeed.

**Recommendation:** Start every project with the goal of producing a minimal viable solution as early as possible. Any iteration after that should be focused on improving the solution so that it's in the best possible state when the deadline comes.

</Law>
