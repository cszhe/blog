---
title: "My First Android Program"
lang: en
date: 2010-06-17T15:46:54+00:00
author: omale
layout: post
category:   Embedded
slug: my-first-android-app
original: /wo-de-di-yi-ge-androidcheng-xu
ai_translated: true
---
Last week I went to Hangzhou for Google's Android training. Three days covering UI development, hardware development, and more. The barrier to Android development isn't that high. But just learning without practice won't cut it. Time to write some code.

What to write? Let's go with the classic game "Link Game" (连连看). But this Link Game is different &#8212; it fully leverages Android's features. Current特色 features:

1. Multi-touch: Link Game is about connecting two images. On Windows, you select one, then another, then eliminate. Too primitive. With multi-touch, just use two fingers to tap the two images you want to eliminate. Done.

2. Shake to shuffle: If you can't find matching pairs, shake your phone vigorously. The intensity of shaking determines how many tiles get reshuffled. No limit on reshuffles like on Windows. Keep shaking until your arms get sore.

3. Freely choose images. Online you see NBA Link Game, Beauty Link Game, Pet Link Game, etc. The only difference is the images. Why not let users choose freely? Pull from contact photos, Camera, Google Image Search &#8212; anywhere with photos. For example, search for "Sister Feng," and the app will use Google's搜索结果 for Sister Feng photos to create a custom Sister Feng Link Game.

I wanted to put it on Android Market, but the Market isn't open to China. And I, a law-abiding citizen, never think of circumventing controls. So I created a project on Google Code where source code and binaries can be downloaded. Only tested on HTC Legend. Other devices unknown because I don't have them.

http://code.google.com/p/photogame/
