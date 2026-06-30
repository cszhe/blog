---
title: "Android Running Successfully on a Board"
lang: en
date: 2010-12-01T23:05:02+00:00
author: omale
layout: post
category:   Embedded
slug: android-running-on-board
original: /androidzai-ban-zi-shang-yun-xing-cheng-gong
ai_translated: true
---
After a night of effort, I finally got Android running on some company's board. As shown below:

[<img class="aligncenter size-medium wp-image-10512" height="209" src="/uploads/2010/12/android-300x209.jpg" title="android" width="300" />](/uploads/2010/12/android.jpg)

Since I started learning Android development this year, I've been preparing for next semester's Android course. I've learned and built a lot of application-level stuff. But as an embedded person, not being able to touch the底层, just doing上层 Java development, hasn't felt very rewarding. I've heard that Android modified both Linux and Java significantly, but had no way to verify it. That's how application development works: the platform is already built, you just write against the API docs. Java doesn't involve much deep technology. Being able to call a C library feels pretty advanced. Of course, if you build a large enough, impressive enough, creative enough application, you can still leverage your advantages.

One reason Android is more popular with山寨 companies than Windows Mobile, besides being free, is the lower barrier to entry. Of course, this "low" depends on your perspective. It doesn't mean you need zero底层 knowledge. Rather, if you can run Linux on the board, 70% of Android is done. The rest is tuning, optimization, writing drivers, etc. The development workload isn't huge. Many domestic board manufacturers use "can it run Linux" as the measure of stability. So almost all国产山寨 boards, if they support only one OS, it's Linux, not WinCE or vxWorks. This greatly推动了 Android adoption.

&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;插播: Rant &#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;

This year, Google's sponsorship money was supposed to buy Android phones. But Tongji University's Equipment Office has a one-size-fits-all rule: funds cannot be used to buy phones. However, Google explicitly specified phones. No wonder Google got pissed off and left &#8212; they can't beat the bureaucrats. We ordered 21 Android phones in October, but still haven't paid the vendor. It's全靠 my personal reputation holding it together there. Now I'm being squeezed by the school, Google, and the phone vendor, having to bow and scrape to everyone. Sometimes I want to return Google's donation and tell them: donate to MIT or UC Berkeley instead. Or donate this 120K to Pyongyang's Kim Il-sung University. Let them buy mobile phones. Of course, North Korea can't use phones, but at least they could trade Android phones for rice. Might be better than this. Maybe Larry Page could even get a Kim Il-sung medal. The bureaucrats here think Google donating money to buy equipment is Google causing them trouble. Not allowing phone purchases, but Google insists. Definitely causing trouble. Half the money is still coming next year. Maybe instead of phones, I'll buy these山寨 boards. They can run Android too, can do development. Just heavier to carry.

Now Google's 100K+ yuan is stuck in the school's finance office (after deducting some "management fees" with Chinese characteristics. What did you manage? Taking money to solve problems, but taking the money and then creating obstacles). The remaining money earns no interest. As everyone knows, unlike abroad, Chinese university financial information isn't公开. We can only guess where the interest goes. We all know PayPal and Alipay make money by holding funds, profiting from the time value of money. But the money universities hold is no less than Alipay's. Where does that time value go? You won't tell us, and there's no channel to ask. So we have to use our imagination. If our imagination goes wild, don't blame us.

&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212; Rant ends &#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8211;

This board has a 400MHz Atmel ARM CPU, 128MB RAM. Too low-end, even lower than the cheapest Android phones on the market. Can't handle Android's demands well. It runs, but performance is poor. Flicking through home screens is laggy (my 1.5-year-old son can already swipe pages on the iPad). Currently only useful as a porting practice board. Could also be unoptimized drivers &#8212; needs further investigation.

Although I got 2.1 running, I didn't write a single line of code. The board vendor did all the work. Not very satisfying. When I have time, I'll port Android 2.2. My HTC Legend can't run 2.2 officially, so I'll port it myself for a taste. But I won't have time until winter break. Too busy with school administrative crap. Regret getting stuck with admin work.

Next semester's Android course won't cover these底层 topics. Mostly application development, maybe mentioned in Advanced Topics. If I taught porting Android, everyone would drop the course. Even if you learn porting, you'd probably only find work at a Shenzhen山寨 company making山寨 iPads. Application development offers brighter prospects &#8212; many companies like eBay are porting their stuff to Android. Speaking of which, the college has another ridiculous rule: if 1/3 (or some threshold) of students drop a course, the teacher's pay gets docked. Who came up with that&#8230;
