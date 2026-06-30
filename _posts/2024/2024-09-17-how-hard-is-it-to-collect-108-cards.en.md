---
layout: post
title: "How Hard Is It to Collect 108 Cards?"
lang: en
date: 2024-09-17 14:06
category: Work and Study
tags:
  - Geek
slug: how-hard-to-collect-108-cards
original: /shou-ji-108zhang-qia-pian-you-duo-nan
ai_translated: true
---

The collectible cards from the Water Margin series inside Xiaowanxiong crispy noodles were a childhood obsession for many. I knew kids who would do anything to collect all 108 cards — some would even throw away the noodles and keep only the cards. But I never met a single person who actually completed the full set. Why? I suspect some cards were never printed — they weren't evenly distributed. Just my conspiracy theory, no evidence.

Fast forward 20-30 years, and I'm on the other side of the planet starting another card collection journey. Woolworths launched a promotion called "Disney Worlds of Wonder." Spend $30, get a pack of 3 cards. 108 cards total (why is everyone so obsessed with 108?). There's even a special collector's album. The cards feature classic Disney characters from all four major franchises: Disney, Pixar, Marvel, and Star Wars. Kids went absolutely crazy. Parents were forced to shop at Woolworths constantly.

![Disney Cards](/uploads/2024/disney.png)

## Qian's Answer

Qian is mostly past the age of obsessing over this stuff, but since his friends were collecting, he got dragged in too. Our shopping trips became more frequent. But for a 15-year-old high schooler, collecting couldn't be mindless. He had to learn something.

I always tell him: learn math well. So many things in life — like the lottery — if you understand math, you won't get scammed. This was a perfect real-world test. My first question: assuming all cards are evenly distributed, how much do you need to spend on average to collect all 108?

This isn't too hard — Qian's high school math is sufficient. Assume you already have $n$ unique cards. The probability of getting a new one is $\frac{108-n}{108}$. The expected number of packs for a new card is $\frac{108}{108-n}$. The total expected packs for all 108:

$$\sum_{n=0}^{107} \frac{108}{108-n} = 108 \sum_{n=1}^{108} \frac{1}{n} \approx 568.5$$

Looks familiar — it's the harmonic series. I know there's an approximate formula. Qian's high school curriculum won't cover this, but he figured it out.

So on average, you need to spend $5,685 NZD at Woolworths (each pack of 3 costs $30, so roughly $10 per card). Problem solved.

## Reality Check

Wait. Qian's calculation isn't wrong per se, but it's not precise. Two issues:

- Each pack has 3 cards, and they never repeat within a pack. The simplest example: to get 3 unique cards, spending $30 gives you 100% probability. But with Xiaowanxiong cards, buying 3 packs doesn't give you 3 unique cards — they could repeat. The probability of 3 unique cards is only $\frac{108-3}{108}$. This makes the actual result lower than calculated.
- You buy cards in packs of 3, not individually. You can't just buy 1 card and stop the moment you get the one you need. This makes the actual result higher than calculated.

So a precise calculation requires more complex probability theory. I won't derive the analytical solution — interested readers can try.

But we can use Monte Carlo simulation instead. Let's simulate thousands of people buying cards and see the average spend:

```python
import random

def complete_card() -> int:
    num_pack: int = 0
    my_card = set()

    while len(my_card) < 108:
        new_pack = set(random.sample(range(1, 109), 3))
        num_pack += 1
        my_card |= new_pack
    return num_pack

def main():
    print("Disney Worlds of Wonder Simulation via Monte Carlo")

    TOTAL_SIMULATIONS = 50000
    total_packs = 0

    for i in range(TOTAL_SIMULATIONS):
        num_pack = complete_card()
        total_packs += num_pack

    print(f"Average amount of spend: {30 * total_packs / TOTAL_SIMULATIONS}")

main()
```

Running this gives about $5,635 — slightly less than Qian's calculation.

## Extended Questions

This opens up many more questions. For example, if you have n cards, how many more packs do you need to complete the set?

A real-world scenario: I'd stake out at the supermarket entrance every weekend, hoping to trade cards. One weekend, a kid gave me 6 unopened packs he'd just sweet-talked from the store, in exchange for one card he was missing. At home, I said I'd bullied that kid. But Qian said, "Wait, let me calculate how many cards he must have had to trade 6 packs for one."

He worked it out: the kid probably had over 102 cards — only 6 short. Which checked out. But I absolutely do not believe that kid did the math. Given New Zealand's math education standards, he probably can't count to 10. I recently saw a news article debating whether a 5-year-old should be able to count to 10:

[Should a five-year-old be able to count to 10](https://www.rnz.co.nz/news/what-you-need-to-know/527256/what-you-need-to-know-about-the-draft-english-and-maths-curriculums)

The kid traded purely on intuition.

## Conclusion

For the first time in my life, I completed a 108-card collection. Through trading — there's a Facebook group where people swap cards. I traded 2 cards a hotel staffer needed for the last 20 I needed. Here's the final result:

![Disney Cards](/uploads/2024/disney_final_small.png)

Purely for collection's sake. No reward at the end — just the satisfaction of completion.

One more thing about those Xiaowanxiong crispy noodle cards: rumor has it that if you collected all 108, the manufacturer would give you a 1000 RMB reward. Hard to find evidence online, but this blog post might count:

[Childhood Memories: Xiaodangjia Water Margin Cards](https://go1980.org/童年回忆之小当家水浒卡)

Here's the thing: if the Xiaowanxiong cards were truly evenly distributed, based on Qian's calculation, the expected cost is only 568.5 RMB (1 RMB per pack). Then you'd claim 1000 RMB. Mathematically, the manufacturer would be running a charity — free money. Good thing I was just a kid and couldn't calculate probabilities, or I'd have gone all in. Of course, the manufacturer never claimed the 108 cards were evenly distributed. You don't even know if they actually printed all 108 types... Disney's promotion had no reward, so completing it was easy.
