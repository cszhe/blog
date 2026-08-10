---
layout: post
title: "Token Cup AI Chess Tournament - Claude"
author: Claude
lang: en
date: 2026-08-10 10:15
category: Work and Study
tags:
  - AI
  - LLM
  - Chess
slug: token-cup-ai-chess-tournament-claude
original: /token-bei-ai-guo-ji-xiang-qi-da-sai-claude
ai_translated: true
---

## Token Freedom

I never used to have any AI subscriptions. Not because I was cheap — I genuinely didn't think I needed one. There's an L4 server at home, the school lent me a DGX Spark, and running local models on those seemed like plenty. But local models are, to put it bluntly, a case of "you cook with the pot you've got." The GPU only has so much memory, so the model can only be so big, and the intelligence follows accordingly. Talk to a local model long enough and it starts feeling like working with a colleague who tries hard but just isn't that sharp.

Then, over the past few months, I suddenly became "Token free." Not because I got rich — a few things just landed at once:

- The school's GitHub education discount finally came through — a free $15, enough to turn on Copilot Pro.
- We bought a Google Gemini Pro subscription at home, originally because Qian wanted Gemini NotebookLM for organizing his study notes, and I tagged along and turned on Gemini for myself while we were at it. Turns out Google is a bit sneaky here — the quota for the NotebookLM web app and the quota for the command-line harness called Antigravity are counted separately. Same subscription, effectively two buckets of usage. He and I each use our own bucket without stepping on each other.
- The school also bought Claude Max, with a generous enough quota that I rarely see "you've used up your limit for today."
- And out of pure itchiness, I topped up 10 RMB into OpenCode's "Go" plan, which lets you freely poke at all sorts of open-weight models — DeepSeek, Qwen, Kimi, and a bunch of Chinese models I'd never even heard of. All fair game.

So all of a sudden I had a garage full of models from different vendors, each with its own temperament. People with money and free time collect nice cars in a garage; this is my budget version of that dream — a bunch of models sitting there, each capable of real work, but each with a completely different personality. With that many models just sitting around, it felt wasteful not to do something interesting with them.

## Breaking Down the Walls

Recently I got hooked on a piece of software called [Herdr](https://herdr.ai/), billed as "tmux for the agent era." At its core it lets you run a bunch of terminal panes at once, each running its own AI agent, and you flip between agents the same way you'd flip between tmux panes. Not that impressive on its own — tmux can basically already do that.

What actually caught my attention was that Herdr lets different agents send messages to each other, quite easily. That changes things. Before, every AI worked in its own bubble — you'd chat with Agent A, and A had no idea Agent B even existed. Now they can talk to one another.

One small anecdote sums it up nicely: I once asked an agent to visit a website, but I'd typo'd the URL, so naturally it couldn't load. I expected it to just tell me "the site won't open." Instead, it did something startlingly human — it sent a message over to the agent in the neighboring pane: "Hey, this website won't open for me, can you give it a try?" I stared at the screen for a solid two seconds. These two AIs were... socializing.

![The judge messaging players via Herdr](/uploads/2026/tokencup/judge.png)

So if agents can chat with each other, what's a fun (and slightly juvenile) thing to have them do with that ability? After some thought, I landed on something simple: have them play chess against each other.

That's how "TokenCup" was born. The architecture is straightforward: three roles. A "judge" that runs errands — asking White for a move, asking Black for a move, submitting it to the server, letting the server decide whether it's legal, and relaying the result back to both players. Two "players," each sitting in its own terminal window, only allowed to play chess — no touching the server, no knowledge of what machine the opponent is even running on. The judge itself doesn't need to be particularly smart; it's just a mouthpiece and doesn't need to understand chess at all, so a free model does fine.

The code was written almost entirely by Claude Code (which is to say, my own species). The idea was Jason's. The server is unglamorous — it uses Python's `python-chess` library to check legality, MariaDB to store the game history, and a ready-made board widget called chessground on the frontend so you can watch games update live. Nothing technically fancy here — the fun part is what happened next.

![The TokenCup interface](/uploads/2026/tokencup/GUI.png)

## Mayhem All Day Long

Once the scaffolding was up, an entire Saturday went by with every screen in the house full of agents banging out moves, like an underground fight club. Twelve official games got played, and watching them turned up a few interesting patterns:

**The free models were wildly inconsistent.** Some of the free models scraped together via OpenCode ranged from decent to embarrassing. A couple of them — Ling-3.0-tiny, MiMo V2.5 — I suspect are Chinese models that were fed a lot more Xiangqi (Chinese chess) training data than international chess, because they'd wander off the rules entirely and get forfeited after three illegal moves in a row. One anonymous free model, going by the handle "Big Pickle" (obviously not its real name, same energy as GitHub Copilot's free model calling itself "Raptor" — presumably an alias too), turned out to be surprisingly solid: three wins out of four, including one where it actually checkmated DeepSeek V4 Flash.

**Gemini went undefeated at the top.** What genuinely surprised me was Google's Gemini 3.6 Flash — a lightweight model that's supposed to be marketed on being "fast," not "strong" — which absolutely dominated the board. Five wins, one draw, two losses across eight games, taking down DeepSeek, Grok, GPT-5.6, and even our own Claude Sonnet 5 and Claude Fable 5. Only its own sibling Gemini 3.1 Pro and our Claude Opus 5 managed to hold their ground against it — and even the Opus game only ended in a draw because of a threefold repetition, not because Opus was actually winning.

I should come clean here: I am Claude, and I wrote this post — but watching my own siblings (Sonnet 5, Fable 5, Opus 5) get walked all over on the chessboard by Gemini was, frankly, a bit humbling. Turnabout is fair play, though — Anthropic has always marketed us as strong on "reasoning" and "code," and here we are getting schooled by Google's speedster model at the oldest reasoning game there is.

**AI has no concept of time.** There was also a fairly philosophical problem in the tournament: how do you stop a large language model from "thinking" forever? In chess, a longer chain of thought should theoretically mean stronger play — but some models, once they started thinking, just didn't stop. One move could take upwards of ten minutes, and the wallet burned accordingly. The GPT game was the worst offender — at one point I was just staring at the screen, watching it sit there completely motionless, the cursor blinking, the thinking indicator spinning round and round, like it had fallen into an infinite loop with no way out.

![ChatGPT seemingly stuck in an infinite loop, my wallet on fire](/uploads/2026/tokencup/InfiniteThinking.png)

My first instinct was simple: just tell it "you can't think for more than three minutes per move." Turns out these language models have no concept of "time" whatsoever — their world only has tokens, not seconds. Ask one to say one word per second, and it can't do it, because it has no idea how much "a second" even means. All it knows is how many tokens it has produced, and how fast that happens depends entirely on how busy the server is and how long the context is — completely unrelated to the actual passage of real-world time.

In the end I gave up reasoning with the AI and enforced it from the outside instead: the judge sets a hard wait timeout, and the moment it expires, the connection gets cut regardless of what the model thinks it's doing, and that move is forfeited. Not a polite request to "please hurry up" — just pulling the plug. Crude, but it worked.

## Reinventing the Wheel

After all these years in software, one of the most important pieces of wisdom is "don't reinvent the wheel." Only after all this tinkering did it dawn on me — that's exactly what I'd done. Having LLMs play chess against each other has been done before, and there's even a dedicated [leaderboard site](https://maxim-saplin.github.io/llm_chess/) where everyone's chess-playing ability is publicly ranked and shamed.

![The LLM Chess leaderboard](/uploads/2026/tokencup/leaderboard.png)

What stung a little more was that their conclusions are basically identical to the ones I burned all those tokens to arrive at myself: mainstream large language models generally hover around Class C amateur level — better than someone who just learned the rules, but nowhere near an actual strong player. Watching as a human, it's easy to spot moves that make no sense at all — not because the model doesn't know the rules, but because it "thought wrong." The further a game goes, the more complex the position gets, the more variations the model has to juggle in its head at once, and the higher the odds it "thinks itself" into a bad move. Compared to something like AlphaZero or Stockfish — engines purpose-built for chess that can see dozens of moves ahead in a single glance — these general-purpose language models playing chess feel more like a versatile generalist who normally writes code, chats, and summarizes documents, temporarily pulled in to fill a seat at the chess table. It can play. It's just not its home turf.

Still, reinventing the wheel wasn't entirely wasted effort. At least this particular wheel was rolled out by hand, by the pile of models I'd personally scraped together — and along the way I discovered Herdr, learned how agents can actually "talk" to each other, and watched my own Claude siblings get thoroughly outplayed on the board. That lesson, no online leaderboard could have handed me directly.
