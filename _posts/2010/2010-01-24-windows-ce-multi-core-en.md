---
title: "Windows CE, Your Mom's Calling You to Play on Multi-Core"
lang: en
date: 2010-01-24T22:23:45+00:00
author: omale
layout: post
category:   Embedded
tags:
  - Windows CE
  - Embedded
  - Software
slug: windows-ce-your-mom-calling-you-on-multi-core
original: /windows-ceni-ma-ma-han-ni-zai-duo-he-shang-wan-wan
ai_translated: true
---
As everyone knows, CE's kernel was completely rewritten from scratch, unrelated to 9x or NT, which gives CE good real-time performance and flexibility. Since its birth, the CE kernel has been revised twice: first with version 3.0 which greatly enhanced real-time capabilities, and second with version 6.0 which removed the 32/32 application/memory limit. From that perspective, it seems fairly complete. Since 6.0 was released, I'd been optimistic that the 6.0 kernel could last at least three more versions, with the next kernel update around CE 9.0 (who knows when&#8230;.). But plans change faster than expected. The IT industry changes rapidly, and many predictions prove laughable. My "prediction" is no exception (apologies to those who heard my talk at TechEd 08, where I was still advocating that extra kernel features were unnecessary). In just a few short years, if you ask me now whether the new version of CE needs a kernel change, I'd firmly say yes, and ASAP.

In my opinion, there are two things that need changing: memory mapping and SMP support.

First, memory mapping. Since its inception, CE has mapped two 512MB virtual addresses starting at 3GB in the kernel &#8212; one cached, one uncached. This caps CE's maximum physical memory at 512MB. 512MB was once an astronomical number for embedded systems. But with the rapid development of smartphone software (increasingly complex apps) and hardware (memory cheaper than cabbage), having 512MB of RAM on a phone is no big deal. On CE, if you install 512MB, you're in for trouble. This limitation needs to go. It's not particularly difficult to fix, but backward compatibility would take a hit.

Second, SMP. CE has always been single-CPU. Even as multi-core thrived on PCs for years, it never motivated CE to add SMP support &#8212; people using CEPC generally weren't running multi-core CPUs. Times have changed. CE's primary platform &#8212; ARM &#8212; has jumped on the multi-core bandwagon too, with ARM11 and ARM Cortex A9 both supporting MPCore. This is a game changer. If CE doesn't follow suit, it might disappear from mobile devices in a few years. *nix systems (iPhone and Android) natively support SMP. Even though *nix systems don't have CE's real-time capabilities, they support SMP and can fully utilize CPU power. CE, hurry up and port spinlock, CPU affinity, and other desktop Windows features over (which complicates BSP implementation, but those require BSP support anyway).

What else might need changing? Possibly the Windows messaging mechanism. WM_LBUTTONDOWN and WM_RBUTTONDOWN are nowhere near adequate for multi-touch. But that might not require kernel changes &#8212; driver and API modifications might suffice. Meizu's phones have already implemented it.

The next version of CE should be released this year. Whether these two improvements will be included is still unconfirmed officially. We'll wait and see.

<span style="font-family: Times; -webkit-border-horizontal-spacing: 2px; -webkit-border-vertical-spacing: 2px;">(Reference: ARM Multi-Core: http://www.arm.com/products/CPUs/ARM11MPCoreMultiprocessor.html)</span>
