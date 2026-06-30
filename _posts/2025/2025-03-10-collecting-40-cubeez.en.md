---
layout: post
title: "Sequel: How Hard Is It to Collect 40 Cubeez?"
lang: en
date: 2025-03-10 14:06
category: Work and Study
tags:
  - Geek
slug: collecting-40-cubeez
original: /xu-shou-ji-40ge-fang-kuai-you-duo-nan
ai_translated: true
---

A year later, Woolworths is running another collectible promotion. Last time it was Disney, this time it's Minecraft. Still the same formula to hook kids. Spend $30 to get a pack of Minecraft Cubeez, assemble them into little cubes — very on-brand for Minecraft. There are 40 types total, and they come with a display box that looks pretty nice when full.

Qian used to be a huge Minecraft fan. Back in China, I bought him the game and he built all sorts of worlds. He even sent his creations to video bloggers so they could play on his maps. Later he got into Minecraft Dungeons — a Diablo-like game with Minecraft characters.

Let's apply the same math as last time. How much do you need to spend to collect all 40?

Assume you already have $n$ unique cubes. The probability of getting a new one is $\frac{40-n}{40}$. The expected number of packs to get a new one is $\frac{40}{40-n}$. So the total expected number of packs for all 40 is:

$$\sum_{n=0}^{39} \frac{40}{40-n} = 40 \sum_{n=1}^{40} \frac{1}{n} \approx 171.14$$

Looks familiar, right? It's the harmonic series. I'm sure there's an approximate formula. Qian's high school curriculum won't teach this, but that didn't stop him from figuring it out himself.

So on average, you'd need to spend $171.14 \times 30 = 5134.20 NZD at Woolworths to collect them all. Problem solved.

Here's the final collection:

![Finally complete](uploads/2025/cubeez.jpg)

Of course, we didn't actually spend $5000+ at the supermarket. We traded on a Facebook group, and colleagues who knew we were collecting gave us some. Total actual cost: about $100.

One last thing — a gripe about Minecraft's Chinese translation. It's called "我的世界" (My World), which completely misses the point of the original name — mining and crafting. Found an article that might explain why:

[Why Minecraft is translated as "My World" in Chinese](https://www.163.com/dy/article/FBT6CO09054450UT.html)
