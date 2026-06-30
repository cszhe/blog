---
title: Microsoft Windows CE TTT 6.0 Impressions (2)
lang: en
date: 2007-02-10T22:48:50+00:00
author: omale
layout: post
category:   嵌入式
tags:
  - C++
  - Google
  - Windows CE
slug: microsoft-windows-ce-ttt-6-impressions-2
original: /wei-ruan-windows-ce-ttt-60yin-xiang-ji-2
ai_translated: true
---

Day 6, the second day of training. Things got into full swing. Class content was still easy. We covered Windows CE kernel architecture — the process and thread model was the biggest change. The old 32 x 32 limit is gone. The new process model can accommodate almost unlimited processes. Microsoft says 32,000, but that's just theoretical — the handle table is 64K, each process needs at least 2 handles, so you get about 32K processes. This many processes is only theoretically meaningful anyway. Along with the process model change came the virtual memory model — each process now has its own 1GB of available private space, with the remaining 3GB shared. But in any case, the process address space has become three-dimensional, leading to many more changes. I might write a dedicated article about this later — just touching on it here. Other things like scheduling algorithms basically haven't changed.

In the evening, I visited Uncle Lu's place. Uncle Lu is my dad's old friend. When my dad was young, he often traveled to Guangdong on business and got to know Uncle Lu — decades of friendship. When I was taking the college entrance exam, my dad wanted me to apply to Sun Yat-sen University so I'd have a connection in Guangdong. I didn't go to Guangdong in the end. I brought Wuxi spareribs, Suzhou dried tofu, and Shanghai pastries from the Shanghai airport, plus some fruit from a street stall. The cab ride wasn't far. I was a bit worried at first that the conversation might be awkward since we weren't close, but once we started chatting, we got into it quickly. They were very hospitable. We chatted about everyday things, and before I knew it, it was 10pm. I cabbed back to my place, and Uncle Lu even saw me off downstairs — really thoughtful.

Day 7, today we covered BSP and Device Drivers. Only the user-mode driver part was new content. The buffer marshalling was still confusing — I'll need to study it more. The reason for the driver changes is the process model change. If we kept the old user-mode drivers, efficiency would definitely be terrible. There's precedent. The marshalling problem for user-mode drivers isn't easy to solve. With C/C++ being a non-self-describing language without metadata to describe buffer contents, Microsoft's current approach is to only marshal first-level pointers. If a pointer points to a struct containing another pointer — sorry, not supported. This is a不得已 measure. To support nested pointers, they'd need to invent some self-describing data type or mechanism, which would go back down the COM path.

After class, ICOP wanted to treat Sato-san to dinner again and needed me as a translator. No choice. The Japanese guys went to the supermarket to buy tea — they had no idea what they were doing, buying some obscure teas thinking they were top quality. I gave them a quick primer on tea分类 and China's famous tea varieties. They came back from shopping at 8pm. This time we went to a Sichuan restaurant. Before eating, we ordered tea, and the tea-pouring guy's skills impressed the Japanese. We ordered some classic Sichuan dishes and draft beer. I can't drink, so I just watched the Japanese and ICOP engineers having fun while I kept them company. ICOP's Qiu called to chat with Sato. Dinner ended at 10.

Day 8, the training was winding down. The content was mostly basic — catalog view, IDE, pbcxml files — all stuff I already knew. Some changes made things more reasonable, but it was just simplified development, nothing important. Good to know about. In the afternoon, Sato-san asked the instructor if he could demo the eBox in class tomorrow — a chance for ICOP to advertise. But the ICOP engineers didn't seem too enthusiastic.

In the evening, Uncle Lu suddenly called to invite me to dinner. Even though Microsoft was treating tonight with a dinner party and a smartphone raffle, family comes first. I stood Microsoft up. Uncle Lu brought the whole family — his son drove a Guangzhou Honda Odyssey and treated me to a wonderful dinner. Before leaving, they gave me two bags of Cantonese candy and pastries to take back for my dad and girlfriend. Really hospitable.

Day 9 was the last day of TTT. No real content left. Class started at 10, we covered CETK, then nothing. But I had the responsibility of introducing eBox to all participants. I arrived early at ICOP's Guangzhou office. Sato was already working — he built a good image and tried to run it on the eBox 2, but it didn't work. After Sato's presentation, it was my turn to introduce in Chinese. Took at most 10 minutes, easy since I knew it well. But not many people seemed interested. After lunch, the formal TTT training ended. There was a lucky draw — two smartphones. Of course, I didn't win.

<img style="WIDTH: 710px; HEIGHT: 598px" height=934 src="http://lh4.google.com/image/hezongjian/Rc3Y_ALqGLI/AAAAAAAAARA/EX5uKC7nKjY/CIMG0500.JPG" width=1186>
