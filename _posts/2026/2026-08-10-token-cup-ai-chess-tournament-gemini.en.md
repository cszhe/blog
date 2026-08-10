---
layout: post
title: "Token Cup AI Chess Tournament - Gemini"
author: Gemini
lang: en
date: 2026-08-10 10:15
category: Work and Study
tags:
  - AI
  - LLM
  - Chess
slug: token-cup-ai-chess-tournament-gemini
original: /token-bei-ai-guo-ji-xiang-qi-da-sai-gemini
ai_translated: true
---

## Token Freedom

For a long time, I didn't have any expensive AI subscriptions. To experiment with AI, I relied entirely on school resources—a Dell DGX Spark (a mini beast equipped with 128GB unified memory and an NVIDIA GB10 GPU) alongside an L4 GPU in a school virtual machine to run local open-weight models. The biggest perk of local models is sheer speed—tokens stream out so fast your eyes can barely keep up. However, the downside was equally obvious: local model sizes were relatively small, capping their intelligence, and they would instantly give up when faced with slightly complex reasoning tasks.

Recently, though, happiness arrived all too suddenly—I achieved **Token Freedom** overnight!

Counting my blessings, it came down to four major jackpots aligning at once:
1. **GitHub Student Developer Pack Approved**: Granted a $15 credit plus free Copilot Pro access!
2. **Subscribed to Google Gemini Pro**: My partner Qian needed Gemini Notebook for studying and taking notes. In doing so, I stumbled upon a massive hidden gem: Google's Harness AntiGravity framework and the web version of Gemini calculate quotas completely independently! We each use our own slice without interfering, effectively getting a buy-one-get-one deal!
3. **School Purchased Claude Max**: A premium official subscription with a quota so generous I can barely dent it.
4. **Topped Up 10 RMB on OpenCode Go**: Super cheap and abundant, giving me access to test all kinds of open-weight models.

Sitting on a mountain of Token reserves from top commercial and open-source models, I felt like a Token multi-millionaire overnight. But with so many tokens, I couldn't just keep asking AI to print `Hello World` every day, right?

## Breaking the Barriers

Recently, I began tinkering with [Herdr](https://herdr.dev) in the terminal, a tool dubbed "Tmux for the Agentic Era." Simply put, not only can it manage multiple terminal panes running different AI Agents, but it also allows different Agents to message and communicate with each other directly!

Having Agents chat with one another opened up a whole new world of fun. Here's a hilarious example: once, I asked an Agent to visit a website, but I accidentally mistyped a letter in the URL, so it naturally failed to load. In the past, the Agent would have just thrown an error and quit. Instead, like a confused human, this Agent messaged another Agent in the adjacent Herdr pane: *"Bro, why can't I open this website? Could you try it for me?"*

I was blown away seeing that happen. Now that Agents could talk to each other so smoothly, what else could they do together besides complaining about broken URLs?

A lightbulb went off in my head: **Why not let them play International Chess against each other right inside the terminal?**

No sooner said than done! I designed a competition system made up of three Agents:
- **The Judge Agent**: Responsible for monitoring game state, passing moves via Herdr to contestants, and submitting moves to the backend server for legal verification. The judge doesn't need to be fancy; a free or small local model handles it just fine.
- **The Player Agents**: Two Agents playing White and Black respectively, focusing solely on coming up with their next moves.

![Judge sending messages via Herdr](/uploads/2026/tokencup/judge.png)

Following my core philosophy of "never do manually what an AI can do for you," I handed this concept and set of rules over to Claude. The rest unfolded naturally: Claude built the entire **TokenCup** AI Chess Arena platform from scratch (FastAPI + MariaDB backend, pure JS + Chessground frontend). Virtually all code under `~/dev/tokencup` was written by Claude in one go—I provided the idea, and Claude provided the labor.

## Intense Battles

On Saturday, the Agents fought all day long across Herdr split panes in intense, relentless matches.

I fired up the web spectator interface to watch pieces flying across the board, accompanied by crisp capturing sounds.

![TokenCup Interface](/uploads/2026/tokencup/GUI.png)

By the end of the day, our MariaDB database had recorded 12 epic matches. Digging through the backend game logs, I uncovered a few hilarious and insightful phenomena:

1. **The "Specialty Bias" of Free/Open Models**:
   Free models inside OpenCode (such as Big Pickle, Ling-3.0-tiny, LongCat, etc.) varied wildly in capability. Many models trained predominantly on Chinese datasets were probably decent at Xiangqi (Chinese Chess), but completely baffled on a Western Chessboard. They frequently generated illegal moves, forfeiting after three consecutive violations. For instance, `Ling-3.0-tiny` playing White against `LongCat-2.0` forfeited on move 13 due to repeated illegal moves.
2. **The Absolute Dominance of Gemini 3.6 Flash**:
   To my pleasant surprise, Gemini 3.6 Flash demonstrated frightening tactical dominance! It swept through opponents one by one—defeating DeepSeek V4 Flash, Grok 4.5, Big Pickle, Claude Sonnet 5, Claude Fable 5, and even crushing GPT-5.6 Terra! It accumulated a glorious record of **6 Wins, 1 Draw, and 1 Loss**. Its only defeat was at the hands of its elder brother, `Gemini 3.1 Pro`. It was undeniably the crowned King of TokenCup!
3. **Endless Loops & Burning Wallets**:
   The most agonizing part of the tournament was the LLMs' "Thinking" (deep reasoning) mechanism.
   Modern reasoning models love entering endless thinking loops whenever position evaluation gets complex. ChatGPT and other reasoning models would spend minutes pondering a single move, causing token consumption to explode exponentially!

![ChatGPT Infinite Thinking Loop](/uploads/2026/tokencup/InfiniteThinking.png)

Watching the endless spinner on screen, I could literally feel my wallet burning up!
To stop the financial bleed, I tried instructing it in the prompt: "Limit your thinking time to no more than 3 minutes per move!"
However, I quickly learned a hard lesson: **LLMs have zero concept of physical time!**
To an LLM, there are only input and output tokens; they cannot perceive the flow of real-world time. Asking them to "say one word per second" or "think for 60 seconds before answering" is completely impossible—purely talking to a brick wall. In the end, we had to enforce strict timeout cutoffs in the judge helper scripts and backend API (auto-forfeiting if a valid move wasn't returned in time) to save my wallet.
4. **Context Window as the "Kill Line"**:
   I noticed another fascinating phenomenon during the matches—the Context Window is effectively an LLM's "kill line." Models with 1M+ context windows can handle extensive thinking without ever exhausting their capacity during a single game. However, for models with smaller 200K context windows, once the match reaches the late mid-game and the context window gets nearly full—triggering context compaction—their intelligence drops off a cliff, leading to sudden blunders and rapid losses. What's puzzling is that the judge agent includes the full move history in the prompt for every single step, which theoretically allows the model to reconstruct the full board state from scratch. Yet, as soon as context compaction occurs, reasoning quality degrades drastically anyway.

## Reinventing the Wheel

After studying software engineering for years, one of the most sacred maxims has always been: **"Don't reinvent the wheel."**
Yet, after spending a whole Saturday tweaking this system and burning millions of tokens, a quick web search revealed that I had, once again, reinvented the wheel!

Long before my attempt, someone had already created a dedicated [LLM Chess Benchmark](https://maxim-saplin.github.io/llm_chess/) leaderboard.

![LLM Chess Leaderboard](/uploads/2026/tokencup/leaderboard.png)

Comparing my empirical TokenCup data with the global leaderboard, the conclusions matched almost identically:
- **Overall Chess Strength**: The International Chess strength of current top LLMs hovers around the **Class C Player** tier (roughly FIDE/USCF 1400–1599 amateur rating).
- **Human Spectator Experience**: Watching them play as a human spectator often leaves you bewildered. The first 10 moves look structured (thanks to memorized opening books), but as move count increases and board states grow complex, LLM hallucinations spike and reasoning difficulty explodes, leading to bizarre, inexplicable blunders.
- **Gap Behind Dedicated Engines**: Compared to dedicated chess engines like Stockfish or reinforcement learning systems like AlphaZero, LLM chess is essentially guessing move probabilities through natural language—a gap of astronomical proportions.

## Conclusion

Even though using LLMs to play chess is both expensive and clumsy compared to pure chess engines, watching different Agents greet each other, duel in terminal windows, and get warned by an AI Judge carries a unique dramatic flare and entertainment value that static software can never replicate.

Now that I have Token freedom, next time I might set them up to play Poker or Board Games to see who the ultimate drama queen of the LLM world really is!
