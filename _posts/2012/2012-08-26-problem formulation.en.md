---
title: Problem Formulation
lang: en
date: 2012-08-26T00:42:09+00:00
author: omale
layout: post
geo_latitude:
  - "22.304584"
geo_longitude:
  - "114.185295"
geo_public:
  - "1"
category:   工作和学习  
tags:
  - 教育
slug: problem-formulation
original: /problem-formulation
ai_translated: true
---

One year into my PhD, one of my gains is learning how to describe a problem using rigorous, scientific, unambiguous formal language—including what's given, what's assumed, what needs to be done, and what constraints apply. We call this process Problem Formulation. Only after formulating a problem do we evaluate and solve it. This article won't discuss academic problem formulation—otherwise nobody would read it. As they say,曲高和寡 (lofty songs find few singers). A paper cited a few hundred times is impressive; a few thousand makes it legendary. Google's seminal paper on MapReduce at OSDI has only been cited a few thousand times. In this article, we'll formulate the problems of China's higher education.

Since graduating in 2007 and joining academia, until I went abroad to study last year, it's been four years without me noticing. During this time, I've observed many problems in China's education—teachers not teaching seriously, students not doing research properly, administrative staff with terrible attitudes, etc. But I never thought about exploring solutions—that's not my job, it's the Education Minister's. This summer, I was "exchanged" back to Tongji as an exchange student. Talking with some classmates about education issues and hearing students' perspectives on the causes, I suddenly felt inspired to find the root of the problems.

So I opened Word and listed every problem I'd observed from the student perspective. I had hundreds of entries. Then I categorized them, merged duplicates, and identified dependency relationships. With basic graph theory knowledge, I could solve the problem.

Now the problem formulation begins. Denote each怪现状 (absurd situation) as a vertex in a graph, and each dependency between them as an edge. If the dependencies form a tree, just grab the tree root and everything is solved—that's called Root Cause Analysis, a term many programmers like. After drawing the whole graph, I carefully examined it and found the problem wasn't as simple as I'd imagined. The dependencies don't form a tree—they form a graph. Even a graph would be fine if it were a Directed Acyclic Graph (DAG)—we could still find vertices with only in-degree, which would be the root cause. But then I discovered that the dependencies form cycles. Now it's really a problem.

The diagram below is just a small part. If I showed everything, someone would come after me. As for why cycles form—Rome wasn't built in a day. Let's not go there.

[<img class="aligncenter size-medium wp-image-10790" title="xsq" src="/uploads/2012/08/xsq-300x268.png" width="300" height="268"  />](/uploads/2012/08/xsq.png)

Another lesson from research: if a problem can be reduced or transformed into a known problem, solving it becomes much easier. What known problem can this be reduced to? In通俗 (layman's) terms, it's a **deadlock detection** problem. A bunch of processes holding resources in their bowls while wanting resources in the pot—they lock each other out. Anyone in CS knows this, so I won't repeat it.

Speaking of deadlock detection reminds me of a tragic story from three years ago. After years of折腾 (struggle), Microsoft finally released the Windows Research Kernel, including Windows Server 2003 kernel source code that could be modified, compiled, and run. Microsoft distributed it to Chinese teachers in Hangzhou on little CDs. I was so excited that I skipped the banquet Microsoft hosted at Louwailou and went straight to my hotel to study the code, thinking about what I could do with it. Later, discussing with students, we identified random program crashes as a major Windows problem. Some crashes were due to coders' poor skills causing access violations—can't fix that. But others were caused by deadlocks. We planned to develop a deadlock detection algorithm and insert it into the Windows kernel. Before locking any resource, check whether the lock would cause a deadlock. If it would, forcibly reclaim the resource. That way, you wouldn't be browsing the web and suddenly get "xxx has stopped responding—do you want to force close it?" So we modified the kernel, added a deadlock detection algorithm, and figured out how to surface messages to user mode. When a lock would cause a deadlock, a dialog would pop up: "This operation may cause a deadlock. Cancel it?" After months of development and debugging, when our test programs A.exe and B.exe were replaced with iexplore.exe and winword.exe, the sense of achievement was overwhelming. I thought releasing this kernel would solve deadlock problems once and for all—how amazing! Then I thought again: something wasn't right. If such a powerful feature could be implemented by a few students, why hadn't Microsoft's engineers done it? The idea wasn't that hard to come up with. I looked up the literature and discovered that deadlock detection is a classic NP-Hard problem—more precisely, NP-Complete—long proven. Microsoft is powerful, but not powerful enough to tackle NP-Hard problems inside the OS kernel. I felt so naive and ashamed.

What is an NP-Hard problem? In通俗 (layman's) terms, it's a problem where the computational complexity makes it very difficult to find an efficient solution. Two approaches: brute force (time-consuming) or heuristic solutions—Genetic Algorithm, Ant Colony Algorithm, Neural Networks, etc. These algorithms essentially "go with the feeling" or "shoot from the hip." Whether they're good, and how good, cannot be proven. Take genetic algorithms—they simulate genetic evolution, but can you prove humans are better than monkeys? In some aspects, we might be worse—like climbing trees.

Since China's higher education problem is already NP-Hard, don't expect it to be solved anytime soon. Don't expect education officials to unlock it like resolving a deadlock. When will NPC be solved? Quantum computers, supposedly. We're still in the early stages. Wait until quantum computers are born.

Of course, maybe officials realize this problem is hard to solve, so they shoot from the hip when making decisions. The baffling policies we see are just various heuristic algorithms they've dreamed up.
