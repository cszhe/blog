---
layout: post
title: "How to Design a Theft-Proof Phone"
lang: en
date: 2022-09-26 21:47 +00:00
category: Apple
tags:
  - Apple
slug: how-to-design-theft-proof-phone
original: /ru-he-she-ji-bu-pa-tou-de-shou-ji
ai_translated: true
---

Back in 2011, I led a group of Tongji students to Apple's WWDC 2011 in the US. We witnessed Steve Jobs' last public appearance before his death, where he introduced iCloud.

<p style="text-align: center;">
  <a href="/uploads/2022/wwdc2011.jpg"><img class="aligncenter size-medium" src="/uploads/2022/wwdc2011.jpg" width="600" height="400" /></a><br /> Jobs' last public appearance at WWDC 2011, photo by me
</p>

I won't go into the conference itself — I'm not an iPhone developer and didn't understand most of it. My mission was to chaperone students. But many memorable things happened. One was queuing — so many people wanted to see Jobs that the line wrapped around the venue multiple times. Two armed police officers came by and warned us: "Watch your iPhones. We've had several theft reports already." Criminals knew where Apple developers gathered.

That evening, Apple hosted a dinner for student attendees. An Apple employee sat next to me and asked what improvements I wanted in the iPhone. I had two suggestions (this was the iPhone 4 era):

- First, a 9-key (T9) Chinese input method. I showed him my jailbroken iPhone — I'd jailbroken it just to install Sohu's T9 keyboard. The iPhone screen was too small for full-keyboard Chinese input.
- Second, theft prevention. The police had just warned us about iPhone thefts. If you can design a theft-proof iPhone, that'd be incredible.

---

Over a decade later, T9 input is built into iPhones, and third-party keyboards are supported. Let's talk about theft prevention: how to make people *dare not*, *cannot*, and *do not want* to steal.

First, what does a thief do with a stolen phone? They fence it. A $1000 iPhone sold as second-hand at 70% = $700. For that to work, the buyer must be able to use it. How does iPhone prevent this? With high-strength 3D Face ID — sampling many facial points, latest version can't even be fooled by twins. The passcode? 6 digits, 10 attempts — one in a hundred thousand chance. Otherwise:

<p style="text-align: center;">
  <a href="/uploads/2022/wrongpwd.jpg"><img class="aligncenter size-medium" src="/uploads/2022/wrongpwd.jpg" width="600" height="400" /></a><br /> iPhone is disabled
</p>

What about bypassing the lock by factory resetting? Blocked — must unlock first. What about DFU restore? Need the iCloud password. Both dead ends.

OK, selling the whole phone won't work. What about selling parts? iPhone parts are valuable — $1000 phone might yield $300 in parts: motherboard, screen, camera, battery (some "original" iPhone batteries on Taobao allegedly come from stolen phones), even storage (iPhone 6 16GB modded to 128GB). How to block this? Since last year, Apple serializes all components. If serial numbers don't match, the device may malfunction or refuse to boot:

<p style="text-align: center;">
  <a href="/uploads/2022/parts.jpg"><img class="aligncenter size-medium" src="/uploads/2022/parts.jpg" width="600" height="400" /></a><br /> iPhone components
</p>

This is a double-edged sword — prevents thieves from selling parts, but also blocks DIY repairs. Many see this as Apple's money grab. Apple's compromise: the Self Service Repair program, letting you order parts directly.

With these measures, stolen iPhones can't be sold whole or as parts. The incentive to steal is greatly reduced — "do not want to steal" is achieved.

What about "dare not steal"? How to recover a lost phone? Find My is common on modern phones — Android has Google's Find My Device. But two problems:

- Power off: once off, can't report location
- SIM removal: no network, no remote access

How does iPhone solve these?

- Power off: Find My is baked into the bootloader. Even when the phone is off, it can still be located. I was surprised when I first saw this. Even with battery drained to zero, residual power can still connect and report location.
- SIM removal: iPhone has been pushing eSIM. US iPhone 14 models don't even have physical SIM trays. As more carriers support eSIM, the SIM becomes software — can't be removed.

Solve these two, and you can always locate your phone — as long as it hasn't been physically smashed.

After years of effort, I think Apple has done an excellent job on the technical front. Thieves have no incentive to steal, and lost phones can be recovered.

But real-world problems are more complex than technical ones. Two forum posts document a Kiwi who lost his wallet, tracked it via an AirTag, but couldn't get police to enter the house without a warrant. Eventually paid the thief to get it back.

[Really disappointed with NZ Police](http://bbs.skykiwi.com/forum.php?mod=viewthread&tid=4111776)

[Update: Really disappointed with NZ Police](http://bbs.skykiwi.com/forum.php?mod=viewthread&tid=4112046)

At first, it feels unfair. But maybe that's the price of "The wind may enter, the rain may enter, but the king may not."

<p style="text-align: center;">
  <a href="/uploads/2022/quote.jpg"><img class="aligncenter size-medium" src="/uploads/2022/quote.jpg" width="600" height="400" /></a><br /> The wind may enter, the rain may enter, but the king may not
</p>
