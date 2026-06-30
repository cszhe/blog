---
title: Android Market and the Course Grading Algorithm
lang: en
date: 2011-03-31T10:54:53+00:00
author: omale
layout: post
category:   工作和学习  
slug: android-market-and-course-grading-algorithm
original: /android-marketyu-ke-cheng-cheng-ji-ping-ding-suan-fa
ai_translated: true
---

This semester I'm teaching an Android course. All students are required to upload their apps to the Android Market, and their Market performance counts toward their final grade. Although many courses at our school require projects, this is the first time a course project has to be published globally and face worldwide scrutiny. I racked my brain to design an evaluation algorithm. We'll try it out this year and see if it's reasonable. Here are the course project requirements:

Mobile Application Development Course Project — Spring Semester 2011

Dear students,

Did you know:
Angry Birds was developed by just 55 people (2011).
Fruit Ninja's developer Half Brick is just a small studio.
Plants vs. Zombies developer PopCap had only 180 people (2011).
Talking Tom's Outfit7 had fewer than 20 Slovenians.
OpenFeint was founded in 2008, and its CEO is only 25 years old.

...... The era of "individual heroes" — Bill Gates, Dennis Ritchie, QiuboJun, Wang Jiangmin — has returned on mobile devices.

So what are you waiting for? Pick up your Android phone and go! Let the next Angry Birds or PvZ be born from your hands!

Project requirements: Android application development, games or utilities, any type allowed. Can be individual or team development. Teams must not exceed 4 people.

Grading requirements:
Subjective score: 50%
Objective score: 20%
Android Market performance: 30%

The Android Market performance algorithm is:
Min(1, Di / Avg(D1..Dn)) * (1 + (n – 3)/10) * 100

Where Di is your download count, n is your app's rating (1-5), and Avg(D1..Dn) is the average download count across all submitted apps.

Let me explain this evaluation algorithm. There are two main metrics: download count and user rating. Download count provides the base score, and user rating serves as an additional bonus/penalty factor.

The basic idea: The denominator is the average download count of all works in the class, and the numerator is your project's download count, giving you a base score. I used the average rather than the maximum as the denominator to prevent weaker projects from being completely left in the dust, or if one project dominates too much and drags everyone else's scores down. For example, if the top project has 10,000 downloads but most others are around 1,000, most people would only get 10 points — that would be tragic. Of course, if your base score exceeds 1 (meaning you surpassed the average), it gets capped at 1.

For user ratings, 3 stars is the baseline. Each additional star raises the base score by 10%, and each missing star lowers it by 10%.

I'm not sure if this evaluation standard will work. We'll find out in July when all projects go live. Or if anyone has a more scientific and reasonable algorithm, feel free to share.
