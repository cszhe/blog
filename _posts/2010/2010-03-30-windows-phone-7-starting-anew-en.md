---
title: "Windows Phone 7: Starting from Scratch"
lang: en
date: 2010-03-30T16:36:40+00:00
author: omale
layout: post
category:   Embedded
tags:
  - Windows CE
  - Microsoft
  - Software
slug: windows-phone-7-starting-anew
original: /ling-qi-lu-zao-de-windows-phone-7
ai_translated: true
---
As an MVP, I knew the contents of Microsoft's MIX conference and the latest news about Windows Phone 7 Series before it even started. Although rumors had been flying around under attack from rising stars like iPhone and Android, the truth still came as a shock.

When releasing new software versions, "scrap everything and start over" and "patch things up for another three years" are the two most common approaches. For a big company like Microsoft with software versions often reaching 10+, cases of starting from scratch are rare. Windows NT has been continuously releasing for years. Office follows a consistent lineage from previous versions. Visual Studio is the same. This time, Windows Phone 7 is the exception.

Since Stinger, I've been following Microsoft's moves in the mobile space and believed this was the future direction. Nearly 10 years have passed. Witnessing countless milestones: Pocket PC, Pocket PC Phone Edition, Smartphone, Windows Mobile, Windows Mobile Classic/Standard/Professional&#8230; Many were just old wine in new bottles &#8212; the architecture never changed, just tweaks on the same code tree. But with Windows Phone 7, they mean business. Online rumors have been confirmed: Windows Phone 7's code tree is based on Zune HD. What's Zune? Many Chinese probably don't know.

A few days ago, an e-book called "Programming Windows Phone 7 Series" appeared in my inbox, written by the "godfather" Charles Petzold. Most probably don't know him, so here's a photo. The cover image is on his chest.

[<img class="alignnone size-medium wp-image-10242" title="petzold" src="/uploads/2010/03/petzold-251x300.jpg" width="251" height="300" />](/uploads/2010/03/petzold.jpg)

After downloading and reading the table of contents, the earth-shattering changes were confirmed. Traditional Windows Mobile programming involves introducing CE OS, Win32 API, and .NET Compact Framework. This book is completely different &#8212; starting with Hello World, then Silverlight, then XNA. For a die-hard Windows Mobile developer, these two "main courses" &#8212; Silverlight and XNA &#8212; might be terms they've never even heard of. That's a shock.

First concern: backward compatibility. There are many programs based on Windows Mobile UI. Although Zune is also based on Windows CE, the upper-level components are completely different. Programs developed for Windows Mobile running unchanged on Windows Phone 7? Impossible.

Second: managed code. Due to its limitations, managed code was resisted by many developers even in the Windows Mobile era, especially for low-level things like input methods and driver-interfacing programs, which preferred native code. This fully managed code environment might upset some people, potentially facing the same dilemma as the early iPhone. At least I don't yet know how to write a framebuffer-capturing program with Silverlight or XNA. But I trust Microsoft won't keep it this way forever. One day, a Windows Phone 7 native SDK will be released.

Regardless, new technology, new systems, new applications are always a programmer's delight. Let's all wait and see for the first Windows Phone 7 device.
