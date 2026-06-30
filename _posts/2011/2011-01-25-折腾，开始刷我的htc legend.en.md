---
title: Tinkering — Rooting My HTC Legend
lang: en
date: 2011-01-25T20:24:44+00:00
author: omale
layout: post
category:   未分类 
tags:
  - Android
slug: rooting-my-htc-legend
original: /zhe-teng-kai-shi-shua-wo-de-htc-legend
ai_translated: true
---

I bought my HTC Legend in April 2010 and have been using it for nearly a year. Everything's fine, except the battery module is dying. It can't measure the charge properly — it never charges past 70%, and when it discharges to 5%, it somehow lasts half a day more. At first I thought it was the battery, so I bought a new one. Same problem. Looks like it's the phone itself. But lately it's gotten worse — as soon as it hits 5%, it auto-shuts down. Turn it back on, and it works fine for quite a while. The frequent random shutdowns are driving me crazy. After searching online, I found out I need to calibrate the battery — but calibration requires root first.

Since buying this phone, I've just been using it as a phone, without the constant flashing and tinkering I did back in my WM days. The only update was an official 2.2 OTA. This time, I figured I'd treat the dead horse as alive and give it a go — at least I won't be caught off guard when my Android course students ask me about rooting.

Rooting this thing was a huge hassle. It took two days to get it working, all thanks to the XDA forums. The level of phone modding knowledge in China is honestly disappointing — on several domestic forums, bad advice is about as common as good advice. Here's roughly what I went through:

1. Making a gold card for the SD. I dug too deep trying to understand what a gold card actually does. Ended up having to post my SD card ID on some Japanese site, which then generated an SD-card-specific image and emailed it to me. Then I had to write it directly to the boot sector.

2. Downgrading. Upgrading to 2.2 was a tragedy — can't root, so I had to downgrade. That took a while too. The official downgrade method failed. Eventually I found a one-click root APK online, used it to get temporary root, and then managed to downgrade.
