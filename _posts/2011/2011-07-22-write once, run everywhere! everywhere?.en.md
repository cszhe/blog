---
title: Write Once, Run Everywhere! Everywhere?
lang: en
date: 2011-07-22T16:24:01+00:00
author: omale
layout: post
category:   工作和学习  
slug: write-once-run-everywhere-everywhere
original: /write-once-run-everywhere-everywhere
ai_translated: true
---

I spent a week writing Java code for the Hong Kong MTR. What a pain. No wonder Java desktop programming is dead — it's worse than MFC. You have to write every single UI control manually in code, while MFC at least has a Dialog editor for WYSIWYG drag-and-drop. And there's no AbsoluteLayout — everything is relative layouts. Exhausting. For someone used to Android's XML-based UI construction, it feels like being sent back to the Stone Age.

That said, I did make some progress. After writing the code, I packaged it into a JAR to send to the customer. Before sending the email, out of curiosity, I hopped out of the VM, double-clicked my program on my Mac, and — aside from the sluggish startup — it actually ran. Charts, tables, Derby database — all worked fine. For a moment, I could feel Java's supposed advantage.

[<img class="aligncenter size-medium wp-image-10650" height="218" src="/uploads/2011/07/java-300x218.png" title="java" width="300"  />](/uploads/2011/07/java.png)

This is Java's famous "run everywhere" promise. Of course, we all know it's just marketing to fool the uninitiated. I once saw a C textbook that claimed C's advantage was good portability and cross-platform support — compared to assembly language. Java's VM can abstract away some OS differences, but not all. For example, this UI:

[<img class="aligncenter size-medium wp-image-10651" height="212" src="/uploads/2011/07/COM-300x212.png" title="COM" width="300" />](/uploads/2011/07/COM.png)

Our wireless sensor data comes through a USB-to-serial adapter. On the Mac, I was dumbfounded — no COM port. You have to use the *nix-style /dev/ttyUSB* instead.

By the way, is this a Java Swing bug in the image above? Open the COM port dropdown, then drag the window. The dropdown doesn't disappear and doesn't follow the window — it just stays in its original position. Pretty unbelievable.
