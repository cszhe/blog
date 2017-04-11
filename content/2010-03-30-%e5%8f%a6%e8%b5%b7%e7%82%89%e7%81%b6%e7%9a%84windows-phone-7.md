---
id: 10240
title: 另起炉灶的Windows Phone 7
date: 2010-03-30T16:36:40+00:00
author: omale
layout: post
guid: http://hezongjian.com/blog/?p=10240
permalink: '/2010/03/30/%e5%8f%a6%e8%b5%b7%e7%82%89%e7%81%b6%e7%9a%84windows-phone-7/'
category:   嵌入式  
tags:   Windows CE
  - 微软
  - 软件
---
作为MVP，在MIX会议还没有召开之前，就第一时间知道了微软MIX会议的内容。以及Windows Phone 7系列的最新消息。虽然之前在iPhone, Android等后起之秀的群起而攻之下，谣言四起，当事实真的来临时，不免还是唏嘘不已。

软件新版本发布中，“推倒重来，另起炉灶”和“缝缝补补又三年”是两种最常见的模式。对微软这种大公司，软件版本动辄就可以做到10以上，推倒重来的案例还真的不是很多。Windows NT这么多年了，还依然在不断发布；Office也是与以前的版本一脉相承；Visual Studio等也是一样。这次的Windows Phone 7是个例外。

从Stinger起，我就一直关注微软在手机领域的作为，并且从那时起就认定这必定是未来发展的方向，将近10年过去了。这十年中见证了无数的足迹，Pocket PC, Pocket PC phone edition, smartphone, Windows Mobile, Windows Mobile Classic/Standard/Professional……其实很多东西都是换汤不换药，架构没有变，还是在那棵代码树上修修改改。唯独这次的Windows Phone 7，动真格了。网上的谣言再一次得到论证，Windows Phone 7的代码树是基于Zune HD的。Zune是什么，估计很多国人都还不了解。

前几天邮箱里多了一本Programming Windows Phone 7 Series的电子书，还是“教父级”人物Charles Petzold写的。估计大家都不认识他，贴靓照一张。胸部图片就是书的封面。

[<img class="alignnone size-medium wp-image-10242" title="petzold" src="/uploads/2010/03/petzold-251x300.jpg" width="251" height="300" />](/uploads/2010/03/petzold.jpg)

下载看完目录，再次验证了这次翻天覆地变化。以往的Windows Mobile编程，无外乎介绍一下CE OS，介绍一下Win32 API，再介绍一下.NET Compact Framework，基本就差不多了。这本书则内容迥异，先介绍Hello world，再介绍Silverlight，最后介绍XNA。对于一个铁杆Windows Mobile开发者而言，可能这本书的两个“正餐”Silverlight和XNA连名字都没听说过，这下刺激了。

首先想到的是向下兼容问题，毕竟基于Windows Mobile UI开发出来的程序还是很多的。虽然Zune也是基于Windows CE的，但是上层组件完全不同。基于Windows Mobile开发的程序，想原封不动在Windows Phone 7上跑，恐怕是不可能。

其实，是托管代码的问题。托管代码由于其局限性，在Windows Mobile时代就受到不少开发人员的抵制，尤其是一些偏底层的东西，例如输入法，与驱动交互的程序，更是倾向于本机代码。这次微软提供的全托管代码开发环境，恐怕会造成一些人的不满，可能会遇到与iPhone发布初期一样的窘境。至少目前我还不知道如何用Silverlight或XNA开发一个抓取显卡framebuffer的程序。但是相信微软不会一直这样，总有一天，Windows Phone 7 native SDK会发布的。

无论如何，新技术、新系统、新应用总是程序员的最爱。对Windows Phone 7的第一款手机，大家一起拭目以待吧。