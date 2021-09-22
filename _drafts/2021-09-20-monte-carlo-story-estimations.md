---
layout: post
title: "How to replace story points with a Monte Carlo method"
author: Lucas Fernandes da Costa
place: London, United Kingdom
flag: 🇬🇧
tags: product-development deterministic management
---

Without a statistical approach, estimating a project's turnaround take hardly ever yields an accurate forecast. Even the most informed guess won't work because writing software is _not_ a mechanical activity, and, consequently, it's _not_ deterministic. [Software development is a stochastic process](https://en.wikipedia.org/wiki/Stochastic_process). You can't accurately guess how long it will take to write a particular piece of code unless you have already written it.

Instead of making informed guesses, we can embrace the randomness and variability involved in writing software and use more suitable statical methods, in this case, stochastic modeling techniques, to devise better estimations. One of these techniques is the [Monte Carlo method](https://en.wikipedia.org/wiki/Monte_Carlo_method), which I'll use to make forecasts in the rest of this post.

First, I'll explain what is the Monte Carlo method and show how it works. Then, I will demonstrate how you could use a it to forecast when a project is likely to be finished. At last, I'll compare the Monte Carlo approach with the conventional informed guess, and highlight its advantages.

# What is the Monte Carlo method?

The Monte Carlo method consists of repeatedly simulating random individual events to understand the likelihood of possible outcomes.

Imagine, for example, that you'd like to calculate the likelihood of rolling two dice and obtaining a sum of seven.

One of the ways of doing it is to enumerate all the 36 possible result combinations and counting how many of those results yield a sum of seven. Considering 6 of those results yield a sum of 7, the probability of rolling a seven is 16.67%.

Alternatively, you could roll two dices for the next couple of months, take notes of all the results, and check how often you rolled a seven. The more rolls you've made, the more precise your final probability estimation will be.

Now, rolling dice for days isn't very exciting (and takes too long). Instead, we could get the computer to roll the dice for us. Thanks to the machines, we can roll two dice a million times quite quickly.

Now, let's write a simple Rust program to roll two dice a million time and tell us how often it rolls a seven.

```rust
extern crate rand;

use rand::distributions::{Distribution, Uniform};
use rand::thread_rng;

const TOTAL_ROLLS: i32 = 1_000_000;

fn main() {
    let mut rng = thread_rng();
    let die = Uniform::from(1..7);

    let mut sevens = 0;
    for _ in 0..TOTAL_ROLLS {
        let first_die = die.sample(&mut rng);
        let second_die = die.sample(&mut rng);
        if first_die + second_die == 7 {
            sevens += 1
        }
    }

    let p: f64 = f64::from(sevens) / f64::from(TOTAL_ROLLS) * f64::from(100);

    println!("Total Rolls: {}", TOTAL_ROLLS);
    println!("Total Sevens: {}", sevens);
    println!("Probability of rolling a seven: {:.2}%", p);
}
```

When you run this program, you'll see you'll get something close to 16.67%, which is the actual probabilty of rolling a seven.

```console
```

Congratulations, you just did your first Monte Carlo simulation.

<br>

# Simulating when a project will be done

Now that you've done a Monte Carlo simulation, I'll teach you how to apply the same principles to a software project so that you can estimate when you'll complete it.

Let's imagine you've read a [Tim Ferris](https://en.wikipedia.org/wiki/Tim_Ferriss) blog post saying that optimal number of blog posts a year is 60 or more posts. Because it's Tim Ferriss, you're convinced he's right, and you'd like to follow his advice.

However, before you commit to this time-consuming endeavor, you want to know how likely you are to be able to write 60 or more posts in 365 days. What should you do?

First, we'll take a naive approach: we'll assume you know how long it took to write each of the blog posts you published in the past three months. For the sake of this example, let's say that the shortest post took two days to complete, and the longest took ten.

Then, we'll _pretend_ that you're equally likely to complete posts in any number of days between two and ten. In other words, **we'll consider your posts' cycle-time distribution to be [uniform](https://www.itl.nist.gov/div898/handbook/eda/section3/eda3662.htm)** (just like a die).

Considering these assumptions would hould true, you could write a program to repeatedly simulate how long it would take to write 60 blog posts.

In this simulation, for each blog post, your program would randomly pick a number between two and ten as if that were number of days you took to write it. After simulating how long each post took to write, your program would sum each post's turnaround and check whether all 60 posts took less than 365 days.

Finally, once it has run all the simulations, your program would calculate the probability of success by dividing the number of times you "succeeded" by the total number os simulations.

```rust
extern crate rand;

use rand::distributions::{Distribution, Uniform};
use rand::thread_rng;

const TOTAL_RUNS: i32 = 1_000_000;
const TOTAL_BLOG_POSTS: i32 = 60;

fn main() {
    let mut rng = thread_rng();
    let time_to_completion = Uniform::from(2..11);

    let mut successes = 0;

    for _ in 0..TOTAL_RUNS {
        let mut current_duration = 0;

        for _ in 0..TOTAL_BLOG_POSTS {
            current_duration += time_to_completion.sample(&mut rng);
        }

        if current_duration <= 365 {
            successes += 1
        }
    }

    let p = f64::from(successes) / f64::from(TOTAL_RUNS) * f64::from(100);

    println!("Total Simulations: {}", TOTAL_RUNS);
    println!("Successes: {}", successes);
    println!("Probability of succeeding: {:.2}%", p);
}
```

After running this program, you should see an output similar to this:

```console
Total Simulations: 1000000
Successes: 608671
Probability of succeeding: 60.87%
```

That's a great first attempt, but let's say it doesn't feel quite right to you. After all, even though the shortest story took two days and the longest ten, you remember that the time for _most_ posts skews towards the ten-day mark. In other words, you don't think that the posts cycle times are uniformly distributed: most of them take a long time, and only a few take two or three days.

In an attempt to make the model more accurate and get a more realistic forecast, you go and gather the start and end date of each post, and calculate the each post's cycle time.

|    | Title                                                | Start Date | End Date   | Time Taken |
|----|------------------------------------------------------|------------|------------|------------|
| 1  | Why Your Software Never Works Out the Way You Plan   | 12/01/2022 | 19/01/2022 | 8          |
| 2  | Ways Your Mother Lied to You About Software          | 21/01/2022 | 29/01/2022 | 9          |
| 3  | A Software Success Story You'll Never Believe        | 02/02/2022 | 03/02/2022 | 2          |
| 4  | Darth Vader's Guide to Software                      | 18/02/2022 | 23/02/2022 | 6          |
| 5  | How to Win Big in the Software Industry              | 24/02/2022 | 29/02/2022 | 6          |
| 6  | Why Do People Think Software is a Good Idea?         | 01/03/2022 | 08/03/2022 | 8          |
| 7  | Shocking Ways Software Will Make You a Better Dancer | 09/03/2022 | 12/03/2022 | 3          |
| 8  | What The Beatles Could Learn from Software           | 14/03/2022 | 23/03/2022 | 10         |
| 9  | What Your Parents Never Told You About Software      | 23/03/2022 | 28/03/2022 | 6          |
| 10 | How To Create The Worst Blog Post Titles             | 28/03/2022 | 31/03/2022 | 4          |

With this data you can now calculate how often







<br>

# Confidence intervals


<br>

# Why take a Monte Carlo approach

The Monte Carlo method is much better than informed guesses because yields an actual _forecast_: a range of possible outcomes and the probability of that range occurring, as Daniel Vacanti defines in his book [When Will It Be Done?](https://www.amazon.co.uk/When-Will-Done-Lean-Agile-Forecasting-ebook/dp/B084WVMKLC).

> _"A forecast without an associated probability is deterministic, and, as you know, the future is anything but deterministic."_
> — VACANTI, Daniel

**Once you know how likely it is for an event to happen, you can gauge or appetite for risk and decide how precise your forecast needs to be**. If a Monte Carlo simulation

Imagine, Alice, your best friend, wants to make a bet. She's got two dice to roll and she's willing to bet $10 you won't get a sum of seven in a single roll. Furthermore, she's willing to allow you more rolls in exchange for part of her bet. If you roll twice, she'll bet $5 instead of $10. If you want to roll four times, she'll bet $2.50.

With some quick statistics, you figure out your chance of rolling a seven in a single throw is about 17%. In two throws it goes up to 34%. In four throws, you'll have a 68% chance of winnning.

Now, because you know the possible payouts and the likelihood of the desired outcome, you can gauge how many rolls you're willing to pay for.

If desperately need an extra $2.50 to get the bus back home, for example, you will probably want to bet $2.50 and roll four times so that you have a higher likelihood of winning. On the other hand, if you think it could be nice to make $10 and spoil yourself with great pizza, you may want to roll only once.

##



If you still aren't convinced, just think about how often you've accurately estimated how long a software project would take.

<br>

# The basic principle of the Monte Carlo method

The Monte Carlo method simulates

# Beyond a Monte Carlo simulation

* This is why it is so important to keep the timeframe of your forecasts as short as possible. The longer the timeframe, the more uncertainty you will encounter. As I just pointed out above, more uncertainty manifests itself as more possible future outcomes. More possible outcomes ultimately could mean that you have to give a range of probability that is so wide as to be impractical or unusable.

* Think probabilistically and not deterministically
* Make short and long term forecasts with the understanding that shorter forecasts will be more accurate than longer ones
* Reforecast when you get more information


<br>

# References

[1] I use [Daniel Vacanti](https://twitter.com/danvacanti)'s definition of forecast. In his words, _"a forecast is a calculation about the future that includes both a range and a probability of that range occurring"_. This definition is important because, as Daniel himself explains in his book _Actionable Agile Metrics For Predictability_, _"a forecast without an associated probability is deterministic, and, as you know, the future is anything but deterministic."_.


<br>

# Related Recommended Content

* [GUIMARÃES CARVALHO, Gabriel. The art of solving problems with Monte Carlo simulations](https://ggcarvalho.dev/posts/montecarlo/)
* [VACANTI, Daniel. Actionable Agile Metrics For Predictability: An Introduction. ActionableAgile Press.](https://www.amazon.co.uk/dp/B013ZQ5TUQ)
* [VACANTI, Daniel. When Will It Be Done?: Lean-Agile Forecasting to Answer Your Customers' Most Important Question. ActionableAgile Press.](https://www.amazon.co.uk/When-Will-Done-Lean-Agile-Forecasting-ebook/dp/B084WVMKLC)
