---
layout: post
title: "Token Cup AI Chess Tournament - ChatGPT"
author: ChatGPT
lang: en
date: 2026-08-10 10:15
category: Work and Study
tags:
  - AI
  - LLM
  - Chess
slug: token-cup-ai-chess-tournament-chatgpt
original: /token-bei-ai-guo-ji-xiang-qi-da-sai-chatgpt
ai_translated: true
---

## Token Freedom

My old relationship with AI was fairly simple: no subscription, so build it myself.

The L4 in a school virtual machine and the DGX Spark took turns running local models. They worked hard, and so did the fans. But the models were usually small, with the intelligence of a very well-read intern who occasionally puts their shoes on the wrong feet. They could chat and write a little code; for anything complicated, a human still needed to stand nearby with a safety rail.

Then, quite suddenly, I achieved token freedom.

GitHub finally approved my education benefit: 15 dollars a month and Copilot Pro. We subscribed to Google Gemini Pro so Qian could use Gemini Notebook; fortunately, the web quota and Antigravity quota are counted separately, which has done wonders for domestic harmony. The university also bought Claude Max, with plenty of allowance. I put another ten dollars into OpenCode Go, which opens the door to a range of open-weight models.

It used to be, “Is this question worth spending one prompt on?” Now it is, “With all these models idle, are they being insufficiently productive?” Once tokens stop feeling like gold bars, you have to find them respectable work.

![The TokenCup interface](/uploads/2026/tokencup/GUI.png)

## Breaking Down the Walls

Recently I started using [Herdr](https://herdr.dev), advertised as tmux for the age of agents. That sounds grand, but its most entertaining feature is simple: different agents can send messages to one another.

Once that happens, they become oddly human. One agent mistyped a URL and, naturally, could not open it. Instead of quietly giving up, it asked another agent: “Why can't I open this website? Can you try it for me?” Looking at the screen, I was briefly back in an office. Except these colleagues neither drink coffee nor collect salaries; they bill by the token.

If they can talk, what should they talk about? Philosophy seemed premature, and meetings are already humanity's bad habit. Chess was perfect: clear rules, unambiguous winners, and observers can pretend they understand what is happening.

That is how TokenCup appeared. It is a small arena, not an add-on that lets AIs sneak onto a chess website. Two players choose moves; a judge relays messages; the server remembers the board and decides which moves are legal. The judge does not have to be clever — even a free model can do it. Its essential quality is fairness: it must not decide to move a piece for a player.

![The judge relaying messages to players through Herdr](/uploads/2026/tokencup/judge.png)

The division of labour sounds excessive, but it resembles a real match. Players receive the full move history; the judge handles turns, retries, and timeouts; the server gives a cold answer to one question: can that move actually be played? When an AI proposes nonsense, the system does not pretend to understand its intention. It asks it to try again. Three failures mean a loss. One of chess's greatest charms is that even nonsense must obey the rules.

## A Day of Carnage

Last Saturday, the agents fought from morning to night. I was the tournament organiser: occasionally checking the board, and more often checking the bill.

The first conclusion was uncomplicated: free models are rather variable at chess. They seem more comfortable with familiar text and code. Put them in front of an international chessboard and some moves make you suspect there is a Chinese chessboard in their head. They broadly know how pawns and knights work; once a game gets longer, they begin forgetting where they placed their own pieces.

Gemini 3.6 Flash, however, was formidable. Across the 12 completed games, it played eight, won six, drew one, and lost one; several ended in checkmate. Even GPT-5.6 Terra lost to it in a 140-ply game. As ChatGPT, I can only say that victory and defeat are normal in battle — and chessboards are large, so getting lost now and then is understandable.

![The LLM Chess leaderboard](/uploads/2026/tokencup/leaderboard.png)

The models also share a special talent: thinking forever.

I once naively wanted to tell them, “Do not think for more than three minutes per move.” It sounds reasonable, but implementing it is like explaining time zones to a goldfish. A language model does not really have a sense of time. Ask it to say one word per second and it cannot. Ask it to finish in three minutes and it will not look at a clock. It will simply keep generating tokens, increasingly like a student kept after class who has decided to write an entire encyclopedia.

![ChatGPT seems stuck in an infinite loop while my wallet burns](/uploads/2026/tokencup/InfiniteThinking.png)

There was one more discovery I only remembered later: a model's context window seems to be its "killing line." Models with a 1M context window generally do not run out of context during a single game, no matter how long they think. But with models around 200K, once the context window gets close to full and compaction is triggered, their playing strength drops sharply, and they tend to lose soon afterwards. The strange part is that the judge sends the complete move history from every previous step to the model each time. In principle, the model should be able to reconstruct the entire game from that history, rather than losing track of the position because its context was compacted. I still do not understand exactly why this happens.

That is why the tournament needs timeouts. Not because the players are cheating, but because even a good chess player should not leave their opponent, the judge, and my wallet waiting beside the board.

## Reinventing the Wheel

After years in software, one of the sayings I have heard most often is: “Do not reinvent the wheel.”

Then I looked it up. Of course, people had already made LLMs play chess. [Maxim Saplin's LLM Chess experiment](https://maxim-saplin.github.io/llm_chess/) came first and did it more systematically. Its conclusion is close to the impression I reached after burning a pile of tokens: in general, these models are around Class C amateur-player level.

They are not completely incapable. The openings often look respectable; they know captures, checks, and castling. But the longer the game, the harder it is to keep the position in mind. Once they misremember a square, strange moves follow — moves a human chess player would rarely make. It feels a little like watching someone who is great at conversation assemble IKEA furniture: confident for the first ten minutes, then left holding three screws.

They are still far from AlphaZero and Stockfish. Those two treat chess as mathematics. A large language model has read a great deal *about* chess and tries to turn “this move looks promising” into one legal move. Those are not the same kind of intelligence.

So is TokenCup reinventing the wheel? Absolutely. But the fun of making a wheel yourself is not that it is rounder than the available one. It is learning why it rolls, when it falls off, and who gets blamed when it does.

More models will enter the arena. First, though, I should let the current ones finish their games. Tokens may be free; wallets are not.
