---
title: Random Thoughts on Windows CE and Windows Mobile Upgrades
lang: en
date: 2007-04-15T13:21:32+00:00
author: omale
layout: post
category:   嵌入式
tags:
  - Windows CE
slug: windows-ce-windows-mobile-upgrade-thoughts
original: /windows-ce-windows-mobilesheng-ji-de-za-tan
ai_translated: true
---

Backward compatibility is probably a universal pain for all product companies. You need to keep old customers from complaining their stuff is obsolete, while continuing to develop new things to attract new customers. Backward compatibility is the best choice.

Today we're still talking about Microsoft's Windows CE and Windows Mobile.

Since its birth, Windows CE has undergone two major kernel rewrites. The first was Windows CE 3.0, rewritten to enhance real-time performance and modularity. I was probably still doing accounting back then, so I missed it. The second rewrite was last year's Windows CE 6.0, rewritten to solve the 32/32 limit of previous versions. The new kernel supports 32K processes (theoretical — the kernel's handle table has 65563 entries, each process takes 2 entries, so 65536/2). For more details, see my other articles.

OS upgrades at the bottom layer cause a chain reaction upward. Today I'll discuss two reactions: its上层 solution Windows Mobile, and how third-party BSPs need to change.

Windows Mobile is undoubtedly the biggest driver of Windows CE's market success. Microsoft wisely chose phones/PDAs as the official demonstration application area for Windows CE (theoretically xBox would work too), and has achieved great success. Not long ago, Windows Mobile 6.0 was released, quickly cracked, and ROMs spread everywhere. Application developers and grey-market phone sellers celebrated. But from a system底层 perspective, there was probably a complex博弈 — because setting aside Windows Mobile 6's new features, its underlying OS still uses Windows CE 5.x!

Since Microsoft launched the Windows Mobile platform, it basically kept the Mobile version number aligned with the underlying Windows CE version. For example, we never saw Windows Mobile 2.0 or 3.0, because CE was at 2.0 when Mobile was born. But with Mobile 6's release, this convention was broken. The underlying OS didn't change.

What? Don't believe me? Look at the screenshot. Taken from a new Smartphone. First line: Windows Mobile 6, second line: OS: 5.2.318. So strictly speaking, Windows Mobile 6 uses an unreleased Windows CE 5.x version. Just as Windows Mobile 5 used Windows CE 5.1, Windows Mobile 6 uses Windows CE 5.2.

<img id=img20070415124015.jpeg alt="mobile 6" src="http://images.blogcn.com/2007/4/15/7/omale,20070415132126.jpeg" align=baseline border=0>

What? How do I know CE 5.2 and CE 6 aren't the same version? Let me show you another screenshot:

<img id=img20070415124522.jpg alt=mobile6 src="http://images.blogcn.com/2007/4/15/7/omale,20070415132131.jpg" align=baseline border=0>

This is a remote process viewer — let's see through the interface to the essence. Check out Windows Mobile 6's processes. Familiar nk.exe, filesys.exe, gwes.exe, and device.exe are all there. Under Windows CE 6's new architecture, these processes don't exist. Ironclad evidence.

Since CE has upgraded to 6.0, and when CE6 was released Microsoft claimed they had verified the new kernel's usability by running Windows Mobile on it successfully, why do we still see Windows CE 5's kernel in Mobile 6?

I speculate the following possibilities. Pure personal conjecture, not representing any organization:

1. Backward compatibility, of course. Although CE6 claims maximum backward compatibility for applications and drivers, "maximum" isn't 100%. So switching to CE6 would break many applications — input methods being the first casualty — causing unnecessary disruption.

2. Workload issues. Porting Windows Mobile to CE 6 would be a significant effort for Microsoft's Windows Mobile team, possibly无法 delivering the new platform quickly. To reduce time to market, they had to make the sacrifice. If Microsoft internally believes CE6 is the future, there might be a Windows Mobile 6 2nd Edition based on Windows CE 6 in the near future.

3. Efficiency and other issues. This is probably what Microsoft and developers least want to see. After porting to CE 6, they encountered new problems — efficiency, OS size, stability... Continuing with CE 5 was a necessary compromise. If this is true, it would be a significant blow to the newly released CE 6's adoption...

I've written a lot without realizing it. I'll talk about third-party BSP upgrades another day. Another unfinished piece, another unfinished piece (why did I say "another"?).
