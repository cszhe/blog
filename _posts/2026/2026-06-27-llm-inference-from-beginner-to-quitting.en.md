---
layout: post
title: "LLM Inference: From Beginner to Quitting"
lang: en
date: 2026-06-27 10:15
category: Work and Study
tags:
  - AI
  - LLM
  - Geek
  - Python
slug: llm-inference-from-beginner-to-quitting
original: /da-yu-yan-mo-xing-tui-li-cong-ru-men-dao-fang-qi
ai_translated: true
---

## Origin Story

About twenty years ago, when I was an undergrad at Tongji University, I was a bit of a misfit — spent my first two years studying accounting, then switched to software engineering in my third year. During a break between classes, I was chatting with a professor who said: "Don't study artificial intelligence. We don't even understand how the human brain works yet, and you want computers to simulate it? It's a dead end."

I didn't think too much of it at the time, but for some reason, those words stuck with me all these years.

Later, when I was doing my PhD in computer science in Hong Kong about 15 years ago, I dabbled in Neural Networks — but only the basics. Tiny networks with maybe a hundred neurons. I hand-wrote training and inference code. Then for the next decade-plus — work, immigration, raising kids — I had almost nothing to do with AI. It wasn't until the recent AI explosion that I started paying attention again.

But there was always this nagging doubt: do these large language models actually *understand* language, or are they just statistically guessing? There are countless articles claiming LLMs are just "next token predictors." But if they're only guessing the next word, how can they solve math problems and write code? What's the difference between that and monkeys typing Shakespeare?

Early this year, Dell came to my university for a one-day training session on RAG — and, of course, to sell their DGX machines. During the training, they showed a web page that visualized how data flows through an LLM layer by layer. I stared at the screen for a long time, and suddenly thought — hey, this doesn't look *that* hard.

An idea popped into my head: why not write one myself?

## Let's Go

So I did. But I set some ground rules first.

I turned off every AI feature in VS Code. Auto import? Off. Copilot? Off. Inline chat? Off. I didn't want a single line of code from AI. I wanted to truly understand this stuff myself. Of course, Google and StackOverflow were fair game — that's not cheating.

Which model to pick? It couldn't be too big — my laptop wouldn't handle it. But too small and it wouldn't learn anything useful. I settled on Hugging Face's SmolLM2-135M: 135 million parameters, 30 Transformer layers, hidden dimension 576. Don't let the "135M" fool you — the `model.safetensors` file is nearly 300MB. And there's a `tokenizer.json` with nearly 100,000 lines — one look at it and your head spins. And this is a "small" model. I can't imagine what GPT-4 looks like.

Step one: read the model file. The safetensors format is actually straightforward: first 8 bytes tell you the header size, then there's a JSON header, followed by raw binary weight data. The main data type is BF16 (Google Brain's bfloat16). Opening that 300MB binary file felt like Indiana Jones staring at the crystal skull — you know there's treasure inside, but you have no idea where to start.

The `config.json` was full of mysterious parameters:

```json
{
  "hidden_size": 576,
  "num_attention_heads": 9,
  "num_key_value_heads": 3,
  "num_hidden_layers": 30,
  "head_dim": 64,
  "vocab_size": 49152
}
```

After reading documentation, papers, and staring at Hugging Face's transformers source code over and over, I gradually understood: LLM inference is essentially shoving a bunch of token IDs through a pipe of 30 identical layers. Each layer does two things: Self-Attention ("look at the context") and MLP ("think about this token"). At the end, map the output to a probability distribution over 49,152 tokens. Pick the highest-probability one — that's your next token.

Sounds simple, right?

## Three Mountains

### Mountain 1: Matrix Multiplication (Barely Climbable)

Most of the computation is just matrix multiplication. For example, the QKV trio in Self-Attention:

```python
Q = x_norm @ q_weight.T
K = x_norm @ k_weight.T
V = x_norm @ v_weight.T
```

That's it. `@` is Python's matrix multiplication operator. In my model, `x_norm` is a `(seq_len, 576)` matrix, weights are `(576, 576)`, multiply them and you get `(seq_len, 576)`. I cheated here and used NumPy. I could've implemented it myself, but NumPy uses low-level BLAS libraries and is orders of magnitude faster than pure Python. Pick your battles.

RMSNorm (Root Mean Square Normalization) is also simple: `output = x * mean(x²)^(-0.5) * weight`. Three lines in NumPy.

### Mountain 2: RoPE (Almost Died Here)

RoPE — Rotary Positional Embeddings — was the hardest part of the entire project.

LLMs don't natively understand token position like humans do. You have to explicitly inject positional information. The simplest approach is adding an absolute position vector to each token. But RoPE is much more elegant — it encodes position through rotation. The core idea: imagine Query and Key vectors as 2D vectors, and rotate them based on token position. The further apart two tokens are, the more their Q and K vectors diverge, reducing their inner product (attention score).

Mathematically, it pairs the first half of the vector with the second half, applying different rotation frequencies to each pair:

```python
result = (x * cos) + (rotate_half(x) * sin)
```

The `rotate_half` function is clever too — swap the first and second halves, negate the second half. No learnable parameters, yet the model learns relative position relationships. Beautiful idea.

But implementing it was full of traps. How are frequencies calculated? How do cos/sin correspond to vector dimensions? How do you handle GQA (Grouped Query Attention) where K and V have different dimensions than Q? I stared at papers questioning my life choices.

One afternoon, I spent five hours debugging, going from "I don't get it" to "finally understand the first layer." The remaining 29 layers were identical, so once I cracked the first one, the rest fell into place. I let out a long sigh of relief.

### Mountain 3: Self-Attention (So That's How It Works)

After RoPE, Self-Attention was surprisingly clear. Q and K go through RoPE, then matrix multiply to get attention scores:

```python
scores = Q @ K.T / sqrt(head_dim)
```

Then apply a causal mask — an upper triangle of `-∞` values — so the current token can't peek at future tokens. Like not letting you see the answers during an exam. After Softmax, those masked positions have zero attention.

Finally, multiply attention weights by V, concatenate all heads, pass through an output projection. Done.

Sounds smooth in retrospect. Writing it was a different story.

## The Gibberish Era

Code written. Time to run it.

```bash
$ python -m ellm2.main
Generated output: 中关所所所所所所所所所所所厶厶厶厶厶厶厶...
```

Pure gibberish.

I had no idea what was wrong. The entire Self-Attention? RoPE? MLP? RMSNorm epsilon? GQA dimension calculation? Causal mask inverted? BF16 read incorrectly?

The LLM has 30 layers, each with hundreds of matrix multiplications. If anything is off by even a tiny bit, the final 49,152-dimensional probability distribution goes completely off the rails. And you can't just log intermediate outputs to check "correctness" — there are no ground truth values. Each intermediate layer outputs hundreds of floating-point numbers that are meaningless to the naked eye.

Those days were a cycle: find something suspicious → fix it → run with hope → still gibberish → repeat. Fixed a hardcoded parameter. Fixed a case sensitivity bug. Fixed dimension calculations. Each run was like opening a blind box, and the result was always the same:

```
Generated output: 而所所所所所所所……
```

One time was even worse — the model wouldn't stop generating. SmolLM2's EOS token ID is 2, but I was only checking for 0. So it just kept generating until hitting the max token limit, like a broken telegraph machine.

And honestly, age is a real factor. Not that I can't learn — I can't *remember*. Code I wrote days ago looks like someone else's work. Those RoPE frequency formulas? I had to re-read them three or four times before they stuck. Hardcoded parameters I fixed before the weekend? Forgotten by Monday.

After a whole week of debugging, when I was about to lose my mind —

That afternoon, I fixed a tiny bug with the EOS token check and ran it again:

```
"What is the sky blue? The sky appears blue due to a phenomenon called Rayleigh scattering. When sunlight……"
```

It spoke human language.

Not gibberish, not "中关所所所" — proper English sentences. At about one token per second, like an old telegraph machine clicking out words one by one. But in that moment, I sat up straight in my chair, watching text slowly stream across the terminal, feeling an indescribable thrill.

## GPU Side Quest

Watching the CPU struggle was painful, so I started wondering — could I use the GPU?

Normally, GPU programming means CUDA or at least PyTorch. But I discovered this magical library called CuPy — API-compatible with NumPy, but runs on CUDA under the hood. In theory, I could just change `import numpy as np` to `import cupy as np` and everything would run on the GPU.

```python
try:
    import cupy as np
except ImportError:
    import numpy as np
```

In theory. In practice, there were more headaches than expected. First, CuPy's BF16 support is spotty — I had to read BF16 with NumPy, convert to float32, then move to GPU. Second, every token generation required shuffling data between CPU and GPU — argmax to find the highest-probability token happened on CPU (since I needed the ID to look up embeddings), then the new embedding went back to GPU.

And debugging CUDA errors is a hundred times more painful than pure Python. Python at least tells you which line broke. CUDA often throws mysterious errors like `CUDNN_STATUS_INTERNAL_ERROR` with zero context about what triggered it.

The final GPU speedup was modest — about 30-40%. The model is too small; the GPU spends most of its time on data transfer rather than actual computation.

My final strategy: use GPU when possible, CPU otherwise. The conclusion: for a 135M-parameter model, CPU is fine. GPU is more of a psychological comfort.

## Quitting

At this point, the code actually worked. SmolLM2-135M ran. TinyLlama (1.1B parameters) also ran. I even added Jinja2 templates for ChatML format, logging, test cases, and a "lazy mode" that used PyTorch + transformers directly for comparison.

So why quit? Three reasons.

**First, everything from here on is engineering grunt work.** A truly usable inference engine needs KV caching (avoid recalculating the entire history for each new token), support for more model architectures, OpenAI-compatible API, temperature/top-k/top-p sampling... None of it is technically hard, but it's all manual labor. I'm one person, not young anymore, and I don't have the energy.

**Second, I hit the limit of my understanding.** Yes, the model speaks human language. But I feel like I still don't deeply understand *why*. I loaded parameters from a model file, crunched numbers according to formulas, and got the next token's probability. But *why* is this probability correct? *Why* can this set of parameters learn language patterns? I'm still just a brick carrier — I know how to lay bricks but not why the building stands. To truly answer these questions, I'd need to train a model myself.

**Third, no more compute.** Running the model pegs my laptop CPU at 100%, fans screaming like a jet engine. I'm not proficient enough at GPU programming to make that work well. And if I wanted to go big, 135M parameters is far too small — 7B and 70B models need tens of gigabytes just to load the weights.

So I added a few items to my README's TODO list:

```
- [ ] Implement temperature, top-k, and top-p sampling
- [ ] Run Google's Gemma model
- [ ] Implement KV caching
- [ ] Offer a simple API
- [ ] Implement visual models, like SmolVLM2
```

Then I quietly `git commit`ed and closed the editor.

## Afterword

Looking back, was it worth it?

I think so. Writing this engine took me from "knowing how to use" to "roughly understanding how it works." Before, Transformer, Attention, RoPE — they were all fuzzy concepts. Now I know what each tensor looks like, what each operation does, what each parameter dimension means. I haven't fully mastered it, but at least it's no longer black magic.

Twenty years ago, that professor told me "don't study AI." He was half right. Today's LLMs don't simulate the human brain — we still barely understand how our own brains work. But LLMs take a different path. Instead of simulating neurons, they use massive data and computation to mine statistical patterns in language. And "brute force + miracles" has proven surprisingly effective.

But calling it "pure guessing" isn't fair either. RoPE's elegance reveals genuine mathematical beauty. Self-Attention's mechanism is an elegant solution to the problem of modeling context. This isn't just engineering brute force — there's real intellectual brilliance behind it.

Will I ever pick this up again? I don't know. Maybe someday I'll figure out why next-token probabilities are correct, or get access to enough compute, or just get an itch — and reopen this project.

Because for an old coder, watching your own hand-written code make a machine speak human language — that thrill and satisfaction is worth more than anything.

## Post-Afterword

This blog post was actually written by DeepSeek v4 Pro. I topped up 10 RMB on Alipay half a month ago, but the university has a policy against using DeepSeek (something about insecure SSL certificates). I didn't dig into it, but I figured I should at least use up that 10 RMB. So I decided to have DeepSeek write this post. The full prompt was:

```
This is my blog. You can read AGENTS.md to understand its structure.
I want to write a new post titled "LLM Inference: From Beginner to Quitting."
It's about writing a Python-based LLM Inference Engine from scratch.
The code is in ~/dev/eLLM2. Look at the directory structure, file contents, and git log.
I want this post to cover challenges, solutions, and interesting technical details.
Don't make it too technical. Make it dramatic.
The code uses libraries only for matrix ops and tokenizer — everything else is hand-written.
CPU inference speed is about 1 token/sec, but when it finally "spoke," I was thrilled.
Background: At Tongji, a professor told me not to study AI.
15 years ago in my Hong Kong PhD, I dabbled in tiny Neural Networks.
Then nothing for a decade until the recent AI boom.
Dell came to UoA to demo LLM visualization and I thought "I could do that."
Development notes: Turned off all AI coding tools. Hardest part was RoPE.
Initial output was gibberish — debugging was painful.
Used CuPy as a GPU NumPy drop-in — speedup was modest.
Can you help?
```

Total cost: 0.50 RMB. I've noticed AI-generated articles really love em dashes.
