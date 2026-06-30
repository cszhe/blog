---
title: Windows Mobile 5 Phone Experience - Three Flashes in Two Days
lang: en
date: 2007-06-12T02:32:00+00:00
author: omale
layout: post
category:   嵌入式
tags:
  - Windows CE
  - 嵌入式
  - 软件
slug: windows-mobile-5-three-flashes-in-two-days
original: /windows-mobile-5shou-ji-shi-yong-jing-li-liang-tian-san-shua
ai_translated: true
---

Don't be surprised by the title. You work with Windows CE — how come you've only used Windows Mobile for two months? Let me explain slowly. This isn't a technical post, just some stories. Read for leisure.

Actually, I started using Windows CE-based phones early on. Back in 2003, I bought the Windows CE 4.2-based smartphone Dopod 515 for nearly 4000 yuan. The Dopod 515 was the first smartphone available in China. It's long been discontinued. So I was among the first batch of people in China to try it. True to one of embedded systems' characteristics — slow replacement cycles — my Dopod 515 ran flawlessly for 4 years (including one incident where it fell into a toilet, and another where the charger cord fell into water and short-circuited, but I had a spare). Finally, on April 15, it completely stopped working. About 10 seconds after booting to the home screen, the keyboard would stop responding to any input — I could only pull the battery. Suspected GWES failure. After a factory reset, the problem persisted. After repeated battery pulls and reboots, the phone finally gave up entirely — couldn't even boot. Definitely hardware damage. Though I had deep feelings for my 515, smartphones had already entered the 6.0 era while I was still using a 4.2 product. Too outdated. I gritted my teeth and decided to upgrade!

I already had my heart set on a grey-market 577w — it supported WM 5.0 and had WiFi. Speaking of WiFi, I read an article in Southern Weekly about "technological nationalism." Due to domestic regulations, a device can't have both WiFi and a phone module. Reasons: 1) China was promoting the competing standard WiMax, which has basically failed, but still no good graces for WiFi. 2) Fear that everyone would use WiFi for VoIP, reducing carriers' profits or inviting foreign competition. So foreign phones entering the Chinese market through official channels must have WiFi阉割ed. This actually created an opportunity for grey-market phones — cheaper AND more feature-rich. Sigh.

On April 16, I braved the rain to go to Buynow near the train station, Shanghai's grey-market phone hub. One word: chaos. The layout, transactions, merchandise, people — all chaotic. In the midst of the chaos, I picked a random shop, spent 1900 yuan on a 577w, and left.

Little did I know, I'd flash the ROM three times in the next two days.

"Flashing" just means using a loader to update the OS image in flash memory. Not technically demanding — just follow online tutorials and you can't go wrong. The real technical work is in the loader. (Back when I was developing the Elastos phone at my boss's place, I'd flash it dozens of times a day... but that was just a bare board. This one I paid nearly 2000 yuan for.) The tool is called ROM Update Utility, easy to find online.

<img height=358 src="http://images.blogcn.com/2007/6/12/2/omale,20070612023211143.JPG" width=560 border=0>

First flash: For the thrill of it, I replaced the default old ROM with one featuring Microsoft YaHei font — supposedly super beautiful, from Vista. It did look better than SimSun, but it took up too much space. I didn't have a mini SD card yet, so everything had to go on internal flash. For the sake of precious space, I switched back to SimSun.

Second flash: Flashed a SimSun ROM. More storage space available. Satisfying. But then, again for the thrill, I installed a Windows Live Messenger app extracted by some enthusiasts from the newly released Windows Mobile 6 emulator ROM (gotta admire those guys — given a nk.bin, they can write tools to extract files and repackage them into new ROMs). This time — who knows what Microsoft was thinking — Windows Live Mobile, upon login, automatically added all my MSN contacts to my phonebook. My poor MSN contacts list, never cleaned, had accumulated hundreds of people I didn't know. My contacts exploded and the phone became very slow. No way to delete them individually, and no rollback. On to the next step.

Third flash: Just to get rid of the contacts Windows Live Mobile had added. I could've just factory reset, but I was so annoyed I flashed without thinking. It worked — those annoying contacts were gone.

And so I used it peacefully for a while. Some reflections:

WiFi drains battery like crazy. But much faster than GPRS — great for browsing during boring meetings.

QVGA screen makes many older SP apps feel awkward, unable to go full screen. Ha, I always emphasize UI resolution design in my classes. :-)

Third-party apps and enthusiast-created software are increasing, and quality keeps improving. Gone are the days when I could write a simple matching game and get download counts. That's the恐怖 of platform standardization and openness.
