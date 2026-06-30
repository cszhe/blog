---
title: "Virtual Hosting Website Building Report"
lang: en
date: 2010-04-05T01:18:31+00:00
author: omale
layout: post
category:   Uncategorized
slug: virtual-hosting-website-building-report
original: /xu-ni-zhu-ji-jian-zhan-bao-gao
ai_translated: true
---
Two weeks ago on Friday night, I uploaded some baby photos to Kaixin001. Suddenly feeling nostalgic for my long-lost Picasa web albums, my class hatred toward the GFW surged like endless flowing water. If I stay, I die; if I tunnel, I also die; either way I die, why not emigrate? In a moment of impulse, I decided to buy a US-based virtual host. It was Friday and I had nothing else to do, so I went for it.

First I Googled around. Quite a lot of Chinese-language information, but most of it was paid ads, hard to tell good from bad. There were also proxy purchasing services, probably preying on people who don't understand English. I'm an IT professional, so I'll do it myself. Thanks to wenqinggu.net for some pointers. After looking around at providers like Bluehost, Hostmonster, and GoDaddy, I chose Justhost for one reason: cheap and generous. I found a coupon on another site: if you buy two years, it's only $3/month. But virtual hosts usually have shared IPs. If you're unlucky and the IP is already banned by the GFW, you're stuck and need to buy a dedicated IP. Justhost's dedicated IP isn't expensive either. So, mentally prepared for a possible ban, I went ahead and bought Justhost, paying online with my credit card. After payment, instead of immediately activating the account, they asked for my phone number for verification. I entered my number, and immediately received an international call. It was a TTS robot: "This is Just Host&#8230; your xxx code is: xxxx." Then they sent an email saying phone confirmation was needed to activate. I replied saying, "Hey, I'm in GMT+8, don't call me in the middle of the night." The next day at noon, I got another call. This time it was a real person, not TTS. "This is xxx calling from Australia." They needed to verify my info. I thought they'd ask about my motives for buying the site, what content I'd host, like a US visa interview. I was debating whether to be honest. Instead, just three questions: my address as filled in online, last 4 digits of my credit card, and my domain name. After answering truthfully, they said I was all set and to wait for the email with my login. Really? Asking these questions is like asking nothing at all. Foreigners really don't think sideways&#8230; Minutes later, I received my username and could log into Justhost. They even gave me a hezongjian.com domain for free. Pretty cool.

Justhost is a Linux virtual host supporting only classic LAMP (Linux + Apache + MySQL + PHP). I installed a Mac version on my machine called MAMP; apparently there's also a Windows version called WAMP. To be honest, I know nothing about PHP. My web skills are limited to ASP.NET/ASP and J2EE. But then again, these days nobody codes websites from scratch. Just find some open-source stuff and assemble it. Done. (The学院's unfinished website comes to mind &#8212; they'd have been better off using a CMS. Then I recalled studying ASP hard 10 years ago, making a personal site, which sparked my interest in switching to software engineering. Ah, how times have changed.) Then began the long website building process. It was both pain and pleasure. I never expected it to consume so much of my already limited time. Let me document the experience before I forget. Of course, the site is still under construction and may be updated irregularly.

## WordPress

<http://blog.hezongjian.com>

Hosting a blog is my primary goal, and WordPress is the natural choice. Justhost's Fantastico control panel includes a one-click WordPress installer. Very easy. It supports Chinese out of the box. But migrating the blog was the most painful part. Years ago I spent huge effort moving from Blogcn to Blogbus, and now I have to suffer again. Fortunately, many pioneers have migrated from Blogbus to WordPress. I found a PHP script by some "expert" that converts Blogbus backup XML to WordPress format. But it couldn't handle my XML backup. Desperate, I considered writing my own converter &#8212; it's just regex, right? In the end I didn't reinvent the wheel. Found someone's site offering conversion services. No errors, but some tags were lost. Regardless, the blog is safely migrated.

WordPress is all about themes and plugins. I spent a lot of time on these too &#8212; installed 5-6 themes, settled on this Mac-style one that matches my Snow Leopard. Several plugins too: FCKEditor for text editing, StatePress for analytics, SimpleTag for auto-tagging, etc. The blog is taking shape. Someday I'll pull back images from other sites and host them on my own blog for peace of mind.

## Gallery

[http://zhaopian.hezongjian.com](http://zhaopian.hezongjian.com)

Photos are the second priority. Google's Picasa gave me endless joy sharing photos. I hope this photo site can resurrect. Justhost includes one-click installers for Gallery, Coppermine, and 4ImageGallery. Unfortunately, none support Chinese out of the box &#8212; everything turned to ???. Hours of struggle, reinstalled Gallery countless times. Even after getting it working, uploaded images couldn't generate thumbnails, only showing full size. More hours of struggle, ultimately surrendered. Checked Gallery's official site &#8212; Gallery 3.0 RC1 was out. Since I'm doing it myself, might as well go all the way. Downloaded 3.0 and installed manually. It even has a Simplified Chinese language pack. Worked perfectly. Interesting how Gallery develops: 1.0 to 2.0 to 3.0, each time nearly a complete rewrite. 3.0 uses brand new Ajax, album management is very convenient.

As a law-abiding citizen, I reluctantly tunneled again to retrieve all my photos from Picasa and upload them to Gallery. Hope I never need to tunnel again. Just want to be a rule-abiding person.

Gallery 3 is still in development with many bugs. Some images just won't upload. Very few plugins. For the sake of novelty, I pulled all Gallery source code from GIT and installed several under-development plugins and themes, including a reCAPTCHA plugin (pretty funny). Looking at Gallery's source code, I found PHP impressive &#8212; it abstracts everything into events, uses OOP models well. No wonder it thrives under pressure from .NET and J2EE.

## MediaWiki

[http://hezongjian.com/wiki](http://hezongjian.com/wiki)

I've always wanted to set up a wiki. Used wikis for documentation and communication on several projects last year. They work great. Justhost doesn't offer one-click MediaWiki install, so I did it manually. Downloaded the installation package from MediaWiki's site. I'd installed it under WAMP before, so no difficulty. Also installed a cross-reference plugin. Hope to use it as the portal site for our Quality Engineering embedded systems direction, accumulating knowledge daily. When it's time for quality engineering acceptance, print out the content as a book and submit it. That would be impressive. Also hope this site can elevate the quality of Tongji University Software College's embedded systems teaching.

## Joomla 1.5

[http://hezongjian.com/cms](http://hezongjian.com/cms)

This is supposedly a powerful content management system, but hard to use. Justhost's default install doesn't support Chinese. Downloaded and installed manually. No issues. After much effort, I roughly figured out how to use it. Originally planned as a portal for my site, but I don't have enough to write about a personal site. Then thought of converting it to a精品课程 site, so I wouldn't be stuck with frequent学院 website updates. After more experimentation, I realized a single Joomla install can't host multiple sites the way WordPress MU can. If you have multiple courses, you'd need multiple Joomla instances. Disappointing. Currently sitting idle, not sure what to do with it.

## Moodle

[http://hezongjian.com/moodle](http://hezongjian.com/moodle)

This is an open-source online course site, developed by an Australian teacher, apparently. Since Joomla won't work as a course homepage, let's try this. Justhost's default Moodle install doesn't support Chinese. Downloaded the latest weekly build and Chinese language pack from Moodle's site. Works well. But it only makes sense if all students register. If the Software College adopted this, that'd be great. Me playing with it personally is just wishful thinking.

## SugarCRM

I've always wanted to set up a CRM system to digitize all the business cards I've collected, instead of losing them everywhere. I also want to share contacts with others. The most powerful CRM is supposedly SugarCRM. Downloaded and installed on my server, but the layout was completely broken. Works perfectly on my MAMP server, but I don't have time to debug the source code. Had to reluctantly abandon it.

## CiviCRM

[http://hezongjian.com/civicrm/standalone](http://hezongjian.com/civicrm/standalone)

This claims to be the best CRM for non-profits. Available as standalone, Joomla plugin, and Drupal plugin. Initially downloaded the standalone version, which requires OpenID login. Google is an OpenID provider, so naturally I used Google's OpenID. But then login stopped working. Checked CiviCRM's forums and learned that Google's OpenID implementation doesn't conform to standards. God, isn't Google usually all about standards? Why did they go their own way this time? Reinstalled, got a MyOpenID.com account. That worked fine. Yahoo's OpenID is supposedly non-standard too, but Yahoo login seemed to work. Haven't actually started using this CRM yet.

Did try the Joomla CiviCRM plugin though. When importing 400+ contacts from Outlook via CSV into CiviCRM, Chinese characters turned to garbled mess again. And I couldn't even delete them. Frustrating.

## Other Miscellany

### About Justhost

Justhost's service is decent. One night the database showed "too many connections" and the site was unreachable. Through online chat, they told me to email them. One email and the problem was quickly resolved. However, as a foreign virtual host, Chinese language support is a major issue. While they offer many pre-installed software packages, none support Chinese out of the box; you have to do it yourself. Also, Justhost supposedly allows adult content, which increases the chances of being blocked by the GFW. Hope the guys sharing my IP don't host porn, or I'll be screwed if the server gets banned.

### About Web Technologies

It's been a long time since I last paid attention to server-side tech. The last time I built a sizable site was under ASP.NET 1.1. Now ASP.NET has upgraded who-knows-how-many versions. After using these open-source CMS packages without writing a single line of code, I have to admit I'm behind the times. These installers are as easy as desktop software. Module and plugin ecosystems are very mature. Knowing HTML and JavaScript doesn't make you a web developer anymore. Individual HTML tags now feel like assembly instructions &#8212; knowing assembly doesn't qualify you to build desktop software. Similarly, knowing HTML alone won't let you build proper web applications. You need to understand web development frameworks and practice. This is the result of increasingly specialized division of labor in IT.
