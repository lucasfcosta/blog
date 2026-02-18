---
layout: post
title: "Design docs are waterfall wearing a hoodie"
author: Lucas Fernandes da Costa
place: São Paulo, Brazil
flag: 🇧🇷
tags: agile rfcs design-docs continuous-improvement planning
---

Somewhere in your company's Google Drive, there's a design doc from six months ago. It describes a system that doesn't exist. It was outdated by the second sprint and abandoned by the third. Fourteen people commented on it. Nobody updated it. It sits there, perfectly formatted, describing a parallel universe where the project went according to plan.

We used to have a name for this: waterfall. We spent decades killing it. Then we put it in a Google Doc with a nicer template and called it "best practice."

## Why do design docs exist?

Design docs don't exist because they make software better. They exist because they make organizations feel safer. I realize that sentence could appear in any AI-written LinkedIn post from the last five years, but that doesn't make it wrong.

When a team writes a design doc, the implicit promise is: "we've thought about this carefully, so it will go according to plan." That promise is comforting for managers, directors, and VPs who need to report progress upward. It turns an inherently uncertain activity (writing software) into something that *looks* like a predictable manufacturing process.

That's because design docs serve the same organizational function that waterfall's requirements phase served in the 1970s: they create an artifact that can be reviewed, approved, and blamed. If the project goes sideways, someone can point to the doc and say "well, the design was approved", shifting accountability from the organization's inability to handle uncertainty to the engineer's inability to predict the future.

Don't believe me? Ask yourself how many design docs at your company get updated after implementation starts. If the doc were genuinely useful as a design tool, you'd update it as you learn. Nobody does. The doc's job was never to guide the implementation. Its job was to get sign-off.

## Why detailed pre-specification fails

The fundamental problem with design docs is the same one that killed waterfall: **you have the least information at the beginning of a project, which is exactly when design docs ask you to make the most decisions.**

This isn't a hot take. It's the entire intellectual foundation of iterative development. The reason we stopped writing 200-page requirements specs is that we discovered, through decades of painful experience, that you can't fully understand a problem until you start solving it.

Writing a detailed design doc before coding is like writing a detailed travel itinerary before visiting a country you've never been to. You'll plan to spend three hours at a museum that turns out to be closed on Tuesdays. You'll allocate one day for a city that deserves a week. You'll miss the best restaurant in town because it's not in any guidebook.

The itinerary wasn't useless because you're bad at planning. It was useless because the information you needed to plan well didn't exist until you arrived.

That's exactly what happens with design docs. You specify the database schema before you understand the query patterns. You diagram the API before you know which calls are actually performance-critical. You enumerate edge cases before you've seen real data. Then you start coding and discover that reality disagrees with your document on every interesting dimension.

At that point, one of two things happens. Either you update the doc (which nobody does) or you diverge from it silently. Doesn't matter. The doc did its real job weeks ago when it got someone to say "yes".

## Design docs slow down the wrong thing

What bothers me most about design docs is that they delay the one activity that actually reduces uncertainty: writing code.

A design doc review cycle at most companies takes one to two weeks. Sometimes longer if a staff engineer is on vacation or the doc gets stuck in "one more round of comments." During that entire period, nobody is writing code, nobody is learning from implementation, and nobody is discovering the real problems.

Two weeks of coding would have told you more about your system than two weeks of writing about it. You'd have a prototype. You'd know which parts are hard and which are trivial. You'd have *real* questions to ask instead of hypothetical ones.

"But what if the design is wrong and nobody catches it until code review?" That's what the one-pager is for. A problem statement and a boundary sketch give your team everything they need to say "wait, this won't work." If someone can't spot a bad direction from a one-page intent doc, fourteen more pages of API schemas aren't going to help them.

**The irony is that design docs are supposed to save time, but they front-load the slowest, least informative phase of development and delay the fastest, most informative one.**

It's like spending two weeks reading restaurant reviews instead of just going to dinner. By the time you've finished reading, the restaurant has changed its menu.

## "But big companies use RFCs!"

They do. And the comparison flatters your design doc.

An IETF RFC coordinates strangers. Mozilla, Google, and some developer in Siberia need to implement HTTP independently and have their systems interoperate. Detailed upfront specification is the only way to make that work. **You can't iterate your way to compatibility between parties who will never share a codebase**.

Your team shares a Slack channel and a few repositories on GitHub. The coordination problem that justifies an RFC doesn't exist at your company. What exists is three engineers who could just talk to each other.

If you genuinely have 50 teams shipping to a public API that external partners integrate against: sure, you might need something closer to an IETF RFC. But you also probably have a 12-week release cycle and strong opinions about Microsoft Teams, so your problems are bigger than document format.

To be clear, my point here is pretty simple: most companies writing long design docs do _not_ have that coordination problem. They have a team of eight sharing a deploy pipeline.

So what *is* worth writing? There's a useful document buried under all the ceremony: a one-pager that captures intent and ontology. What are the nouns and verbs in this domain? What talks to what? "We're splitting the payments service because latency is killing us. We'll model transactions as events, not rows. Here are the three concepts the new service cares about and how they flow." That aligns people on *why* and *in what terms* without pretending you've already solved the problem. Which you haven't. You haven't even told Claude what to do yet.

Some upfront thinking genuinely earns its keep, like articulating the problem you're solving, identifying which decisions are hard to reverse, and sketching where system boundaries should go. But none of that requires a 15-page doc. It fits on a napkin.

The problem is that the napkin never stays a napkin. It metastasizes into API schemas, database models, and sequence diagrams for every edge case. At that point you're not aligning on direction. You're writing code in English, which is a strictly worse programming language, unless you're typing it into Opus 4.6.

## What to do instead

I'm not arguing against thinking before building. The problem is the format and granularity of that thinking.

**Write down the problem, not the solution.** Rich Hickey has been saying this for years. The most critical bugs come from misunderstanding the problem, not from implementation mistakes. A one-paragraph problem statement forces you to confront whether you even agree on what you're building. What's broken, for whom, and why it matters now. That paragraph is worth more than every sequence diagram ever drawn.

**Identify your one-way doors.** Jeff Bezos's framing is useful here: some decisions are irreversible (one-way doors) and deserve careful thought. Most are reversible (two-way doors) and deserve speed. A public API contract is a one-way door. Once external consumers depend on it, you're stuck. Your database schema is a one-way door. Migrating production data is brutal. Service boundaries are a one-way door. Re-merging services is even worse. But your internal function signatures, your folder structure, your choice of test framework? Two-way doors. Walk through, and if you don't like what's on the other side, walk back. The problem with design docs is that they apply one-way-door scrutiny to every decision, including which JSON serialization library to use.

**Sketch boundaries, not implementations.** John Ousterhout recommends spending roughly 10-20% of your time on upfront design, but specifically on *system decomposition and interface design*, not implementation details. Where are the public interfaces? Where do modules meet? What gets braided together that'll be expensive to untangle later? Rich Hickey calls this "complecting." Once you've woven two concerns together, separating them is disproportionately painful. Everything *inside* the boundaries is a refactoring problem. Everything *between* them is a rewrite.

**Spike first, document after.** Spend two days building a rough prototype. Then write a short document capturing what you *learned*: the real constraints, the surprising parts, the decisions that actually matter. This document is ten times more useful than a pre-implementation design doc because it's grounded in reality, not speculation.

**Review code, not prose.** Code review *is* the design review. A pull request is a design doc that actually compiles. If the design is wrong, you'll see it in the code, and you'll see it sooner than you would have caught it in a Google Doc full of sequence diagrams nobody reads past page three.

If you're reading this and thinking "so your advice is to write a short design doc," yes. That's the advice. I just spent 2,000 words arguing you should write a one-pager instead of a fifteen-pager. The irony is not lost on me.

The difference is what goes in it and what stays out. Capture intent, hard-to-reverse decisions, and shared context. Leave out the implementation details you'll get wrong anyway.

To put it another way, your travel itinerary should say "we're going to Portugal for two weeks, mostly Lisbon and Porto, and we want to eat a lot of seafood." It should not include a minute-by-minute schedule for day seven. The best meal of the trip will be at a tiny place with no menu that someone at the hostel told you about. You can't plan for that. You can only show up.
