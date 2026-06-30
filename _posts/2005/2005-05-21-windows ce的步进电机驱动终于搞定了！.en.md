---
title: Stepper Motor Driver on Windows CE — Done!
lang: en
date: 2005-05-21T13:26:28+00:00
author: omale
layout: post
category: embedded
tags:
  - Windows CE
slug: stepper-motor-driver-on-windows-ce
original: /2005-05-21-windows ce的步进电机驱动终于搞定了！
ai_translated: true
---

Even though it's the weekend, I came to the Jiading campus to work. Top priority: getting the stepper motor driver working. I'd done the theoretical推导 (derivation) before and knew it should work, but without hardware, I never got my hands dirty. Always felt uncertain. This time, finally — hardware, code, and the right person — all together. Started writing.

The code wasn't complex. But wow, Huanheng's BSP is truly terrible! It supports almost nothing. It's a miracle Windows CE can even boot on this board. I put the driver's corresponding registry entries into project.reg, but the driver wouldn't load. No registry editor to check either — I was working in the dark. But then, eventually, it worked.

Pressed the button, watched the little fan on the dev board spin around. "A sense of achievement welled up"...

What's left: preparing for the Windows CE training conference at the end of June. Opened the "familiar" Microsoft Word. Continued working...

