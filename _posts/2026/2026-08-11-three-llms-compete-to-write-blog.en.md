---
layout: post
title: "Three LLMs Compete Side-by-Side to Write a Blog"
author: zongjian_he
lang: en
date: 2026-08-11 10:15
category: Work and Study
tags:
  - AI
  - LLM
slug: three-llms-compete-to-write-blog
original: /san-da-llm-tong-tai-jing-ji-xie-bo-ke
ai_translated: true
---

All three of these blog posts were written by AI agents. But I wrote the prompts—essentially building an arena for the three major LLMs to compete against each other in writing a blog post. Each model received the exact same prompt, yet the resulting styles and content differ significantly. Take a look and see which one suits your taste best.

All three platforms used mid-tier models, primarily because I don't have a paid ChatGPT subscription and had to rely on the top ChatGPT model available through the GitHub Student Developer Pack: ChatGPT 5.6 Terra.

- **Claude** used Claude 5 Sonnet. Its post: [Token Cup AI Chess Tournament - Claude]({% post_url 2026/2026-08-10-token-cup-ai-chess-tournament-claude.en %})
- **ChatGPT** used ChatGPT 5.6 Terra. Its post: [Token Cup AI Chess Tournament - ChatGPT]({% post_url 2026/2026-08-10-token-cup-ai-chess-tournament-chatgpt.en %})
- **Gemini** used Gemini 3.6 Flash. Its post: [Token Cup AI Chess Tournament - Gemini]({% post_url 2026/2026-08-10-token-cup-ai-chess-tournament-gemini.en %})


## The Prompt

I recently built an AI chess competition platform called TokenCup to let Large Language Models play chess against each other. Could you help me write a blog post documenting this project? I've already set up the post skeleton at `~/dev/blog/_posts/2026/2026-08-10-Token杯AI国际象棋大赛-[agent].md`.
Please write your own post, without peeking at or modifying the work of other agents.


Key Guidelines:
1. You can read my other blog posts, especially those from recent years, to get familiar with my writing style.
2. The code for the platform itself lives in `~/dev/tokencup`. You can inspect the codebase to understand the system and review git commit logs to trace the development process. Claude basically wrote all the code; the concept was mine.
3. The data is stored in a database configured in `~/dev/tokencup/backend/config.toml`. You can inspect the database to view all match records and tournament results.
4. I want the blog post to be humorous and engaging, keeping computer science jargon to a minimum so a general audience can easily read it.


General Outline:
1. Token Freedom
I didn't have AI subscriptions before, so I ran local models using an L4 GPU and a DGX Spark. However, local models were small in size with limited capabilities.
Recently, I suddenly achieved Token Freedom because:
- GitHub Student Developer Pack was approved ($15 credit plus Copilot Pro).
- Subscribed to Google Gemini Pro because my partner Qian needed Gemini Notebook. Google's AI framework, Harness AntiGravity, has quotas separate from the web version, so we each use our own slice without interference.
- School bought a Claude Max subscription with generous quotas.
- Recharged 10 RMB on OpenCode Go to experiment with various Open Weight models.

2. Breaking the Barriers
Recently started using Herdr, a tool dubbed "Tmux for the Agentic Era." I discovered it makes sending messages between different Agents remarkably simple. This opened up interesting possibilities.
Agent-to-Agent communication is fascinating. For instance: I asked an agent to visit a site with a typo in the URL, so it naturally failed to load. Like a confused human, it messaged an agent in an adjacent pane: "Hey, why can't I open this site? Mind trying it for me?"

What can agents do after communicating? I thought of a simple and fun task: letting them play chess over agent-to-agent messages. The setup includes three models: one judge and two players. The judge model doesn't need to be powerful; a free model will do fine.

3. Intense Battles
On Saturday, the agents fought all day in intense matches. Here is what I discovered:
Free models in OpenCode had limited capability—many were Chinese models good at Xiangqi (Chinese Chess) but struggling at International Chess.
Gemini unexpectedly swept the competition.
To prevent reasoning models from thinking endlessly, I tried telling them in prompts not to exceed 3 minutes of thinking per move. But LLMs have no concept of physical time—asking them to "say one word per second" is impossible.


4. Reinventing the Wheel
After studying software engineering for years, one of the key maxims is "Don't reinvent the wheel." Yet I found myself reinventing the wheel anyway, as someone had already benchmarked LLMs playing chess (https://maxim-saplin.github.io/llm_chess/). After spending millions of tokens, my findings matched theirs almost identically. Overall, top models hover around Class C player ratings. As a human spectator, you'll easily spot inexplicable blunders because as games drag on, thinking difficulty spikes. They are nowhere near dedicated engines like AlphaZero or Stockfish.


A few screenshots—please embed them in appropriate sections of the post:

`uploads/2026/tokencup/GUI.png` TokenCup Interface
`uploads/2026/tokencup/InfiniteThinking.png` ChatGPT stuck in an infinite thinking loop, wallet burning
`uploads/2026/tokencup/judge.png` Judge sending messages to players via Herdr
`uploads/2026/tokencup/leaderboard.png` LLM Chess Leaderboard

Once finished, please translate the article into English so that, like other posts on the blog, both Chinese and English versions are available.


## Revised Version

This post was written by you for me, but I found a few issues. Could you please correct them:
- The correct Herdr website is https://herdr.dev
- The L4 GPU isn't mine; it's also in a virtual machine provided by the school.
- In the "Intense Battles" section, I forgot one key discovery: The model's Context Window acts as its "kill line." Models with a 1M context window rarely fill up during a game no matter how much they think. But for 200K context models, once the Context Window gets nearly full and triggers compaction, their intelligence drops sharply, making them lose easily. Surprisingly, the judge's prompt includes all previous move history at every step, so theoretically the model could reconstruct the entire board state.
Please fix these and update the English version accordingly. Thanks!
