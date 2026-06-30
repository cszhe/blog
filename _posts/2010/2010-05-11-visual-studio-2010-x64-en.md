---
title: "Visual Studio 2010 on Windows 7 x64: First Impressions"
lang: en
date: 2010-05-11T19:31:44+00:00
author: omale
layout: post
category:   Uncategorized
slug: visual-studio-2010-on-windows-7-x64
original: /visual-studio-2010-on-windows-7-x64ti-yan-zhong
ai_translated: true
---
Note: This article contains many occurrences of the number 64. But it's a pure tech article, unrelated to any political incident (I was only 8 that year, just ate and slept, very naive. It didn't affect me much, except I learned: "Mom, if you don't buy me a toy, I won't eat!"). Hope this doesn't get my IP blocked. Censorship patch has been activated. This is the only time the word appears. Really, I swear!

&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;- Article begins &#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8211;

Embarrassingly, although 64-bit Windows has been out for a long time, I never had the chance to try it. The first 64-bit OS I experienced was actually Mac. Mac OS X Snow Leopard boots into 64-bit mode when you hold the 6 and 4 keys at startup. Amazing! I've always wanted to try 64-bit Windows, but feared compatibility issues affecting my work. I could only eye the free software on MSDNAA with envy. Last weekend I realized my Mac had 360GB of free disk space. I heard VMWare Fusion 3 has good support for 64-bit simulation, so why not try it virtually? And so I did.

The main reason I was hesitant: concerns about application and driver incompatibility. After installing on VMWare, everything went smoothly. The sound card didn't have drivers, but after installing VMWare tools, all peripherals worked fine. No major obstacles.

As for applications, 64-bit Windows's major advantage is backward compatibility with 32-bit Windows programs. In Task Manager, 32-bit programs have *32 next to them. For example, "iexplore.exe" is the 64-bit IE, while "iexplore.exe *32" is 32-bit. Of course, only 64-bit programs can fully leverage 64-bit systems. Major software from big companies already have 64-bit versions: Office, Google Pinyin, WinRAR, etc. But many domestic Chinese software don't. For example, Xunlei, various media players, etc. Open Task Manager and you'll see a bunch of *32's. The most ironic is Microsoft itself: the freshly baked Visual Studio 2010 is only 32-bit. Microsoft gave many excuses on their blog about pointer size increasing causing slowdowns, etc., but it feels like lip service. When your own IDE doesn't come in 64-bit, how can you expect programmers using it to have confidence compiling their code as 64-bit?

One last funny thing about backward compatibility. The old Windows directory has a folder called "system" for 16-bit system files. In the 32-bit era, Microsoft created "system32" for 32-bit files. Logically, for 64-bit, they should create "system64." But things didn't work out that way. "system32" is too deeply ingrained in many programs' code. It's hardcoded in installers and scripts. So for maximum backward compatibility, Microsoft made a stunning decision: on 64-bit systems, "system32" still exists but now holds 64-bit system files. A new folder called "SysWOW64" holds 32-bit system files (WOW = Windows on Windows, a compatibility abstraction layer). So now: the folder named *32 actually contains 64-bit programs; the folder with *64 in its name actually contains 32-bit programs. Total confusion.
