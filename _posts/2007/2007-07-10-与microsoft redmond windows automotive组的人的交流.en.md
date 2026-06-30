---
title: Exchange with Microsoft Redmond Windows Automotive Group
lang: en
date: 2007-07-10T17:40:33+00:00
author: omale
layout: post
category:   嵌入式
tags:
  - Windows CE
  - 嵌入式
slug: exchange-with-microsoft-automotive-group
original: /yu-microsoft-redmond-windows-automotivezu-de-ren-de-jiao-liu
ai_translated: true
---

A few weeks ago, I received notice from Microsoft MSRA's Xiangwen that someone from Microsoft's Automotive department would visit our school. I was very excited. My first接触 with embedded systems and Windows CE started with a major automotive electronics project for the Shanghai Science and Technology Commission, collaborating with the School of Automotive Engineering. Who would've thought I was working for the Minister of Science and Technology back then?

Last Friday, rainy. Around 9am, I was waiting in my office. Suddenly my phone rang — I was shocked to see a +01 US number. I hesitated whether to say "Wei" or "Hello," but the other person spoke first — the MS person had arrived. I hurried to greet them. It was a female colleague from Microsoft Redmond who could speak Chinese.

We had a meeting. She introduced Microsoft's work in the Automotive field, then we went to the School of Automotive Engineering to visit Tongji's self-IP fuel cell vehicle and electronic仪表 and in-car information system.

Let me introduce Microsoft's Automotive products. Although Microsoft started early in the automotive space, it's not well known in China because Windows Automotive and related products have no OEMs doing them domestically. Due to Automotive's专业性, Microsoft's website doesn't offer evaluation downloads (probably because even if you download it, you have no car to run it on...). Microsoft has about a thousand people on the Automotive team in Redmond. In their words: the world's major car manufacturers can be counted on one hand, so in-car systems don't need to be very public and通用.

Currently there are two main products: Windows Automotive and Microsoft Auto. (Windows Mobile for Automotive on the official site wasn't discussed in this meeting, so I'll skip it.) Windows Automotive is more of a通用 in-car platform. Microsoft Auto is a专用 platform customized for certain Ford and Fiat models — it won't run on other cars or hardware. Basically, the former is a product, the latter is a project. See how hard it is entering a new field? Even a company like Microsoft has to humble itself and operate like a third-tier company, just like when CE entered the PDA space. If it grows big, there's no doubt Microsoft Auto will disappear, leaving only the通用 platform for car manufacturers to adapt to. So I won't详细介绍 Microsoft Auto — I only saw a demo video with voice recognition, navigation, dialing, music playback, etc. To experience Microsoft Auto, buy a Ford xxx model yourself.

Windows Automotive is based on the Windows CE platform, with special components for automotive use added on top. (This思路 is exactly the same as the Science Commission project I did back then — using CE to build a通用 in-car platform supporting automotive industry standards.) On top of CE, there are two main components: AUI and AST. AUI stands for Automotive User Interface. It provides UI elements suitable for in-car computers — dashboards, odometers, tachometers, fuel gauges, etc., along with powerful graphics rendering for 3D navigation. AST stands for Automotive System Tool, providing tools for diagnosing the in-car computer and vehicle operation, fault diagnosis, etc. (This涉及 a lot of automotive domain knowledge — diagnostics have industry standards.)

Interestingly, Windows Automotive doesn't use standard Windows CE 5.0 — it uses a modified version from the Windows Automotive Team. The default CE 5 only supports 32MB virtual memory per process. I'd already encountered the 32MB limit during my project. According to Microsoft, here's the internal story (based on true events):

Automotive Team: "Dude, we've felt 32MB is not enough for ages. Just change it already."
CE Team: "We're working on it. CE 6 will remove the 32MB limit. You'll be able to use it happily then."
Automotive Team: "When will that be? We have products to ship! How do we report to BillG?"
CE Team: "We're busy. CE 6 is on a tight schedule, and Windows Mobile 6 is waiting for CE 5.2. Here, take the code and fix it yourselves. Don't bother us."
Automotive Team: "It's just virtual memory. Chairman Mao taught us: self-reliance, abundant food. We'll do it ourselves!"

And thus, the version of CE supporting 96MB virtual memory was born (which you've only heard about, never seen).

Through this, you can see Automotive doesn't have much influence inside Microsoft — probably because it's not yet profitable. When Windows Mobile needs new features, the CE team makes CE 5.1 and 5.2. But the Automotive team has to modify things themselves — this version probably doesn't even have an official version number.

At lunch, I asked Microsoft for 20 Windows Automotive licenses for research and teaching. They readily agreed. If successful, I'd be among the first in mainland China to play with Windows Automotive. A week passed — the business side seems fine, but the concern is China's疯狂 imitation and piracy. They know how cheap Chinese MP3/MP4 players have eaten into iPod's market, and how Chinese山寨 phones use Windows Mobile OS. Their biggest fear is that if it leaks, some underground Chinese tech company will quickly clone something identical to Windows Automotive and sell it to Chery for one-tenth the price, and Automotive will never enter the Chinese market... (Hope this doesn't激发 your entrepreneurial spirit.)

No pictures to show. Here are some reference links:

Windows Automotive official site:
<a href="http://www.microsoft.com/windowsautomotive/">http://www.microsoft.com/windowsautomotive/</a>

Channel 9 cool video: Inside Microsoft Automotive
<a href="http://channel9.msdn.com/ShowPost.aspx?PostID=15096">http://channel9.msdn.com/ShowPost.aspx?PostID=15096</a>
