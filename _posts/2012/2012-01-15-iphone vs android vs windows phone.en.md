---
title: iPhone vs Android vs Windows Phone
lang: en
date: 2012-01-15T16:55:01+00:00
author: omale
layout: post
category:   嵌入式  
tags:
  - Apple
  - Android
slug: iphone-vs-android-vs-windows-phone
original: /iphone-vs-android-vs-windows-phone
ai_translated: true
---

Yesterday I bought Google's third son, the Galaxy Nexus, for 4500 HKD. After using it for a day, it feels fantastic. I posted on Weibo yesterday saying I finally don't have to put up with WP7 anymore, which sparked some discussion—there must be WP7 fans out there. So let me elaborate on my views in detail. This is one opinion from someone who's been in Mobile Computing research and development for nearly 10 years. The article was originally titled "Why I Switched to Android," but I thought, if we're going to play, let's play big—let me critique all the platforms.

The other day I saw a phone showcase feature on Xiaomi's website and spent some time making this image (click for full size).

[<img class="aligncenter size-medium wp-image-10698" height="228" src="/uploads/2012/01/myphones-300x228.jpg" title="myphones" width="300" />](/uploads/2012/01/myphones.jpg)

Over a decade, I've used this many phones. Apart from the first Motorola which was a so-called feature phone, the rest could all be considered smartphones. The vast majority of them ran Windows CE. Of course, this has something to do with my four years as a Microsoft Windows CE MVP. My journey in mobile computing also started with Windows CE. In recent years, though, I've played more with Android. As for the research side, that's beyond the scope of this article.

Making predictions is easy—anyone can call themselves an expert or a "brick expert." Whether the predictions are accurate is another matter. Four years ago in 2008, I wrote a similar article:

iPhone V.S. Windows Mobile V.S. Symbian

<http://hezongjian.com/blog/?p=9871>

iPhone V.S. Windows Mobile V.S. Symbian (continued)

<http://hezongjian.com/blog/?p=9872>

Feel free to check them out. I made some so-called predictions in those articles—some came true, some didn't. For instance, the tragic fate of Symbian, once at its peak, was predicted almost spot-on (declining market share → embracing open source → abandoning Symbian → embracing Microsoft). My judgment about Microsoft was based on Palm embracing Microsoft, and I was overly optimistic about Windows Mobile, even predicting its market share would rise. Today that's just laughable.

The background for that article was that Apple invited me to a conference in the US. Free meals make for soft words, so naturally I had to speak well of Apple. Writing today, it's hard to be entirely free of personal bias either, so in the spirit of full disclosure, let me explain my tangled connections with these platforms and companies. Readers can judge for themselves whether personal feelings are involved.

Microsoft and me: I interned at Microsoft's Shanghai Technology Center in 2002 for a year, then was a Windows CE MVP for four years (I resigned myself). Since starting work, I've been in close contact with Microsoft Research Asia, with two Microsoft excellent courses and joint projects. Personally, I have the deepest emotional connection with MS. In fact, my decision to abandon accounting and transfer to the software school was inspired by Gates' wealth and a lecture by Zhang Yaqin at a Microsoft campus event in 2001.

Google and me: Starting in 2007, we had a joint lab and a joint excellent course. Google donated 200,000 RMB to Tongji University to support our courses and the joint lab. Some of the Android phones mentioned above weren't bought by me but borrowed from the lab. We also held joint teacher training and served as judges for an Android student competition. We planned joint research in cloud computing and mobile computing, but that was搁浅 (shelved) when I came to Hong Kong. Personally, I find Google very pragmatic.

Apple and me: Tongji had a club, but I wasn't very involved—I still can't do Apple programming. My only benefits were leading teams twice to WWDC in San Francisco, where I heard Steve Jobs' legendary忽悠 (hype) twice. Although I'd never touched any Apple products before my first meeting with Jobs, after hearing his talks, I was忽悠ed into buying quite a few Apple products with my own money. BTW, I also heard Gates speak live. He had a cold that day and kept coughing throughout his speech. It made me realize that even the richest man gets sick—unbelievable. After it ended, all I remembered was Gates coughing, nothing else. But Jobs' every move, every word, every glance (I was only 50 meters away, could see his eyes clearly) was perfectly executed. He was also sick, but with cancer. That's professional-level showmanship, transcending life and death.

Since 2008, so much has changed. Of the three systems discussed in that article, one has died, one has changed its skin, and one system hasn't died but its leader has. So you can treat this as a new piece. As a coder, I'll definitely discuss technology. For a system to succeed, technology is important but not everything, so I'll avoid too much technical detail and stick to high-level observations. For specifics, refer to my "Mobile Application Development" lecture notes. Alright, here we go.

———————————————分割线 (Divider)———————————————

**Technology:**

From a technical perspective, I personally appreciate Android the most. Of course, some say Android copied iPhone's UI—superficial! They don't see that Android's architecture was also copied—a modified Linux running a modified Java VM, isn't that just copying early BlackBerry? Regardless of its origins, this is what it is today. I appreciate Android because its software architecture is beautifully designed—installation, uninstallation, notifications, broadcasts, component invocation, message passing, permission management, asynchrony—all implemented elegantly in a way that surprises Windows, Linux, and even .NET/Java programmers. iPhone's architecture is similar to Mac OS X. Native code development's biggest problem is resource management, which raises the barrier for coders—quite a pity in today's era of flattering developers. Windows Phone bears deep Microsoft traces, with managed code based on .NET, and many implementations showing shadows of past Microsoft technologies.

Let's take just one issue: dialog boxes. The MessageBox API is heavily used on desktops, but on phones, too many dialogs aren't a good thing. There should be other ways to notify users besides dialogs. On Android, popping up a traditional Windows-like dialog takes about 10 lines of code. On iOS I don't know, but on Windows Phone, it takes just one line. Is one line for a feature a good thing? Not necessarily—it easily leads to abuse. So in Windows Phone apps, you frequently see dialogs: on exit, "Are you sure you want to exit, dear?" on save, "Are you sure you want to save, dear?" on send, "Are you sure you want to send, dear?" Of course I want to exit, of course I want to save, of course I want to send—so annoying, stop treating me like an idiot. But then they put a search button that, if accidentally touched, opens the browser to Bing. Why don't you pop up a dialog asking "Do you want to search?" No, I don't want to search, and even if I did, I wouldn't use Bing—but that stupid search button gets pressed by accident. Shit! And who designed this—on WP7, the dialog box appears at the top of the screen. When one-handing the phone, reaching up to tap yes/no requires such stretching that people with short fingers struggle. Much more annoying than iPhone and Android's centered dialogs. On Android, while various dialogs exist, they're fewer because coders can use Toast, which only needs one line and is much less annoying. iOS—I don't know much about it, but iOS 5 copied Android's pull-down notification panel. Even Apple realizes too many dialog alerts are bad.

[<img class="aligncenter size-medium wp-image-10705" height="300" src="/uploads/2012/01/Emulator_Running_File_Demand-158x300.jpg" title="Emulator_Running_File_Demand" width="158" />](/uploads/2012/01/Emulator_Running_File_Demand.jpg)

Caption: Of course I want to replay—why else would I press the replay button? And why put OK so far away? Who has fingers that long?

Of course, every design has tradeoffs. Android's "elegant" design sometimes comes at the cost of performance, like with intents.

Just from a software architecture perspective, if I give Android 100 points, I'd give iPhone and Windows Phone 70 points each.

**Strategy:**

Let's discuss strategy in terms of openness versus closedness.

With a new set of competitors, iPhone remains the most closed, consistent with Apple's strategy. Apple wants to control the entire chain—market, hardware, sales. Any software competing with Apple can't be sold in the store. The downside of closedness is that no single player can dominate. Proof by contradiction: imagine if only one phone company—Apple—remained. Hardware vendors Apple chooses would thrive; those it doesn't would wither. Carriers Apple selects would have mobile users; those it doesn't would lose them. This can't happen—governments wouldn't allow it. The benefits of closedness are also numerous—the barrel principle: hardware and software are co-designed very well. The closed market protects developers, letting coders profit from their work. Platform uniformity also reduces development difficulty.

Android is the most open. Code is open for all to see—no secrets. All kinds of山寨 phones have switched to Android. MTK has too. Of course, openness has its problems. Some hardware vendors are truly disappointing. I've seen a几百-yuan Android phone with single-touch screen. Someone using that phone declared Android is crushed by iPhone. Conversely, someone using Galaxy Nexus declared Android crushes iPhone. Both a 500-yuan and a 5000-yuan phone run Android—but which best represents Android? Hard to say. Android's openness isn't good for developers either—far fewer programmers make money in Android Market than in the iPhone store. With Wandoujia, all software is free without the hassle of jailbreaking. Great for users, but what about the hardworking coders?

Windows Phone takes the middle path. Small manufacturers can't get Windows Phone licenses from Microsoft—only big manufacturers qualify. The market is also closed, requiring Microsoft approval.

Since different companies have different strategies, it's impossible to score them. If I had to, I'd give all 100 points.
