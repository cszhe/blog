---
title: "Summer Vacation Works"
lang: en
date: 2010-09-03T17:36:24+00:00
author: omale
layout: post
category:   Embedded
slug: summer-vacation-works
original: /shu-jia-zuo-pin
ai_translated: true
---
The so-called summer vacation is almost over again. Like every year, it's called a vacation but there was almost no rest, just a mountain of miscellaneous tasks.

What did I accomplish this summer?

First, the college's Android course officially received Google funding, becoming a "Google精品课程." The course homepage is:

Mobile Application Development

http://hezongjian.com/android/

Finally independent, not hanging off http://sse.tongji.edu.cn. Why? The service was terrible. Being under the college website meant only HTML pages. Any tiny update required modifying HTML code and re-uploading the entire site. After several rounds of torture, I couldn't take it anymore. Might lack that official air, but as long as the content is good, it'll be useful.

I set up Drupal, creating a beautiful page in 20 minutes. Powerful and great (I've always thought the college website could use CMS like Drupal or Joomla instead of making students code from scratch, with at most some secondary development. Otherwise it's twice the work for half the result). Now I just need to fill in content for the semester.

Second, I ported a 3D game engine to Windows CE &#8212; probably the first decent game engine on CE (or should I call it EC). Hope it's useful to others. Here's a screenshot using a Quake 3 map, demonstrating lighting, particle systems, etc.

[<img class="aligncenter size-medium wp-image-10436" height="300" src="/uploads/2010/09/aa-223x300.png" title="GameEngine" width="223" />](/uploads/2010/09/aa.png)

Through this project, I systematically learned about 3D development on embedded devices and its current state. Microsoft's Direct3D Mobile is quite tragic. Almost nobody uses it on embedded devices, probably due to its host OS relationship. D3D is practically standard on desktops, thanks to Microsoft colluding with graphics card and game companies. But this doesn't work on mobile. OpenGL ES 1.x and 2.0 sweep across embedded devices because embedded graphics chip companies collude with OpenGL ES instead. Naturally, we use it too. APIs tightly coupled to hardware must evolve with hardware. If the API can't keep up with powerful hardware, it's tragic. D3DM is exactly that kind of tragedy. But you can't be too ahead either &#8212; you can't directly port desktop interfaces to embedded devices, which are still resource-constrained.

Visual quality largely depends on hardware. But embedded hardware constantly balances performance and power consumption. Until nuclear batteries are invented, you won't see desktop-level graphics on handheld devices.

Third, damn Tongji has blocked eMule and Xunlei. The days of downloading at 3MB/s with Xunlei are gone forever.
