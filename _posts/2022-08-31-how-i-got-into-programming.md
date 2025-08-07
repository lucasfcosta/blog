---
layout: post
title: "How creating a bot farm in an MMORPG got me into programming"
author: Lucas Fernandes da Costa
place: London, United Kingdom
flag: 🇬🇧
tags: programming story personal life ragnarok-online mmorpg accidental-programming
---

> *If you have played Ragnarok Online before, you might want to listen to [this song](https://www.youtube.com/watch?v=SvJ6rlvDLm4) while reading.*

I got into programming at the age of 14. At that time, my friends and I used to play an online MMORPG called Ragnarok Online, which was extremely popular in Brazil.

<YouTube videoId="2sQ5j8ZoY8Y" startTime={108} />


Although Ragnarok Online was fun, it required a significant amount of commitment.

For your character to be competitive against other players and monsters, you'd have to spend quite a few months collecting, trading, and selling items so that you could buy powerful swords, shields, and pieces of armor.

There must be a better way. I thought to myself.

That's when I discovered a piece of Open Source Software called [OpenKore](https://github.com/OpenKore/openkore). OpenKore is an automatable Ragnarok Online client, or, as many people would call it: a bot.

I had no idea how OpenKore worked, but I was determined to use it to become a Ragnarok Online millionaire in little time, with little effort — little *manual* effort, I mean.

I then started traversing underground forums for tutorials and configuration files that I could use to set up my first few bots. It was somewhat time-consuming, but it worked. Once I knew how to configure bots, I set up a bunch of them to collect the game's rarest items: cards, items whose drop-rate was 0.01%; Slim odds, but not for three or four bots running 24/7.

<BlogImage src="/assets/thara-frog.png" alt="A screenshot of Ragnarok Online showing a Wizard killing Thara frogs and obtaining a card" caption="Obtaining a Thara Frog card in Ragnarok Online ([Source](https://www.youtube.com/watch?v=AeKdszUTIxw))" />

Every few days, I'd then log into each of these bots to transfer cards to my main account.

The problem with this process is that it was manual and too time-consuming. Furthermore, as I created more bots, the problem only got worse. Unfortunately, there was no way to configure OpenKore to do that automatically. Not out of the box, at least...

To automate the process of collecting and selling these cards, I'd have to extend OpenKore myself. That's when I discovered I could write a little bit of Perl and make my bots behave exactly how I wanted them to.

I went on to learn the basics of Perl. Just enough so that I could continue to grow my empire. After a few weeks, armed with my limited knowledge of Perl and the vision and business skills of a 14-year-old, I managed to create a business that worked on its own.

Now, my bots would collect the cards, transfer them to merchants in different cities, and those merchants would create a shop (like the one in the image below) to sell the cards.

<BlogImage src="/assets/ragnarok-online/merchant-shop.png" alt="A merchant with its shop in Ragnarok Online" caption="A merchant with its shop in Ragnarok Online" />

To collect my money, I just had to send a DM to one of the merchants with a particular keyword and location, and they'd bring the Zenys to me.

I felt powerful. At the time, only one thing could stop me: my parents.

When my parents noticed my computer would still be on when they woke up, they imposed strict regulations on my fantasy online business.

> _"By the time we wake up, your computer must be off"_ — they said.

At first, I tried to circumvent the house's legislation by programming my computer to shut down half an hour before they woke up and used lower performance settings so that my machine's fans would make less noise.

This strategy worked well for quite a while. However, it disrupted my operation in two significant ways. First, having to turn off my computer meant my bots would not be grinding until I came back from school to turn them on. And second, using lower performance settings meant I could run fewer bots simultaneously.

I then decided to do [what billionaires](https://www.theguardian.com/commentisfree/2019/jan/23/james-dyson-brexiteer-elite-brexit-rees-mogg) do when regulations prevent them from scaling: I moved my medieval operations abroad.

In 2009, EC2 wasn't a big thing yet, so I bought a random VPS using a pre-paid card. With this VPS, I could run many more bots, for 24 hours, seven days a week.

At this point, the card market began to saturate, and items started taking longer to sell. That's when I started making deals with entire clans to sell my cards in bulk. I knew, however, that this business model wasn't sustainable because no one needs more than a single card. No recurring revenue equals bad bot-farm business.

Furthermore, anyone could go collect cards manually, so I couldn't simply control the supply in the way I wanted. If it weren't for that, I could've been Ragnarok Online's [De Beers](https://en.wikipedia.org/wiki/De_Beers).

As the market for rare cards saturated and my profits narrowed, I decided to expand my fantasy business. Thanks to my previous successful endeavours, I had enough capital to invest.

My first expansion was into the D2C consumables market. I programmed my bots so that they would buy potions and other consumables from the cheapest non-playable characters in distant cities and resell them in popular hunting areas where people actually needed them.

<BlogImage src="/assets/ragnarok-online/white-potion.png" alt="A flask with a white liquid representing the white potion" caption="A white potion used for healing characters in Ragnarok Online" />

Differently from cards and pieces of equipment, these consumables could only be used once (as the name implies). Therefore, as long as players were hunting, they'd continue to buy from my in-game merchant characters.

I must highlight this was a much more complex operation. To avoid going out of stock, I always had bots on their way to buy items while others were selling. I was pretty happy to have come up with my own silk road — no, definitely not [that one](https://en.wikipedia.org/wiki/Silk_Road_(marketplace)) — but there were many more competitors in the consumables market.

Because my costs were lower and my operation more efficient, I could support narrower profit margins for a longer time, which drove most competitors away. In this business, I just had to sell a lot; I didn't need to sell for much.

Once again, I succeeded.

In the following year, as a much more experienced 15-year-old, I was writing regular expressions better than I could write in Portuguese. By then, I could virtually retire and go live the rest of my online life hunting Porings and listening to bards' songs.

<BlogImage src="/assets/ragnarok-online/bard.png" alt="A 2D character of a bard holding a guitar" caption="A bard playing a magical song" />

But, as billionaires do, I too couldn't retire that easily. Not without one last good deed.

My last triumph and the end of my career in Ragnarok Online came after investing many weeks in research and development so that my bots could complete entire quests on their own.

These quests were incredibly long, and, sometimes, their rewards were random. A high quantity of particular quest rewards could be used to make what we called "godly items".

These quest items were so expensive, and so many were needed for a single godly item that, at that time, no one had enough time or money to gather everything that was necessary to create a piece of godly equipment.

Many people dreamed of having godly items. One of them was my friend Donald (pseudonym), a 30-something-year-old psychoanalist from northeast Brazil. His dream godly item was, more specifically, the Manteau of Asprika.

<BlogImage src="/assets/ragnarok-online/asprika.png" alt="A 2D picture of the manteau of Asprika and its in-game description" caption="The Manteau of Asprika, a godly item in Ragnarok Online" />

I then decided I'd make Donald's dream come true and officially quit Ragnarok Online. It only took me a couple of days to have tens of bots collecting [Rose Quartz stones](https://ragnarok.fandom.com/wiki/Rose_Quartz) and the other items necessary for the manteau.

In about a month, I gave Donald all the items he needed for the manteau.

A few hours later, he sent me a message which read something like:

> _"Lucas, thanks for your hard work. This is one of the most impressive pieces of work I've ever seen. When it comes to programming, you're the most skilled person I know. If that's what you decide to do with your life, I'm sure you will be successful. Thank you very much!"_

To this day, Donald doesn't know, but with a few words, he's given me a career and a lifetime passion.

I hope that Asprika Manteau was enough to pay for all of this, but I'd have given him three if I could.
