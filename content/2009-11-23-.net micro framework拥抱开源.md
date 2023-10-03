---
id: 9698
title: .net Micro Framework拥抱开源
date: 2009-11-23T10:25:38+00:00
author: omale
layout: post
guid: http://hezongjian.com/blog/?p=9698
permalink: '/2009/11/23/net-micro-framework%e6%8b%a5%e6%8a%b1%e5%bc%80%e6%ba%90/'
category:   嵌入式  
tags:   Windows CE
  - 嵌入式
  - 程序员
---
首先引新浪：

<span style="font-family: Simsun; line-height: 23px;"></p> 

<p style="margin-top: 15px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; font-size: 14px; line-height: 23px; padding: 0px; border: 0px initial initial;">
  &#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8211;
</p>

<p style="margin-top: 15px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; font-size: 14px; line-height: 23px; padding: 0px; border: 0px initial initial;">
  11月16日消息，据国外媒体报道，微软今日在洛杉矶微软专业开发者大会(PDC)上发布了.NET Micro Framework 4.0版本，这款产品是开源的，基于Apache 2.0许可发布，并将广泛使用到嵌入式领域。
</p>

<p style="margin-top: 15px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; font-size: 14px; line-height: 23px; padding: 0px; border: 0px initial initial;">
  　　在.NET Micro Framework的环境下，开发和执行环境资源限制的设备，最初是由微软内部的业务加速器启动，但最近移到开发部，以便更密切地与微软的发展努力的方向一致。
</p>

<p style="margin-top: 15px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; font-size: 14px; line-height: 23px; padding: 0px; border: 0px initial initial;">
  　　这样可使.NET Micro Framework成为一个无缝的体验，使开发人员为一个单一的解决方案的广度编程模型和工具链，从小型智能设备，服务器和云。
</p>

<p style="margin-top: 15px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; font-size: 14px; line-height: 23px; padding: 0px; border: 0px initial initial;">
  　　其中包括几乎所有的产品的源代码，包括.NET Micro Framework和CLR代码本身，开发人员都可以访问基类库那些实施了。
</p>

<p style="margin-top: 15px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; font-size: 14px; line-height: 23px; padding: 0px; border: 0px initial initial;">
  　　不过嵌入式领域的程序员们无需高兴的太早，完整的代码并没有提供，例如关键的来自第三方EBSNet的TCP/IP协议栈以及密码系统库都无法被释放。至于Cyptography库，目前并不包括在源代码内，微软表示，因为它们的使用超出了.NET Micro Framework的范围。客户如果需要访问的密码函数的代码就会发现，这些库可以更换。
</p>

<p style="margin-top: 15px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; font-size: 14px; line-height: 23px; padding: 0px; border: 0px initial initial;">
  &#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;-
</p>

<p style="margin-top: 15px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; font-size: 14px; line-height: 23px; padding: 0px; border: 0px initial initial;">
  经过了4个版本，微软终于想通了，.NET MF终于开了。在.NET Micro Framework还在1.0的时候俺就曾经预言。这种跟硬件紧密相关的东西，不开是不行的，自己一个人玩不转。
</p>

<p style="margin-top: 15px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; font-size: 14px; line-height: 23px; padding: 0px; border: 0px initial initial;">
  就像Windows CE一样，Kernel的代码一定要开，否则其它第三方在porting到硬件平台的时候困难重重，经常代码跑到别人的函数里面，挂了，如果有代码，自己看两眼，问题就解决了。没有代码，就要打微软的support电话了。而打电话技术支持，先不谈钱的问题，效率肯定是低的，效率一慢，android, iphone就赶上来了。没办法，微软想做开放平台，不做硬件么。
</p>

<p style="margin-top: 15px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; font-size: 14px; line-height: 23px; padding: 0px; border: 0px initial initial;">
  这也又一次验证了一个&ldquo;潜规则&rdquo;吧：微软出的东西，不到3.0是绝对不要去用的。4.0一般是比较成熟的。看来.NET MF经过这几年的折腾，终于算是成熟了，现在网上还找不到source，找到之后自己下载一个下来玩玩吧。
</p>

<p style="margin-top: 15px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; font-size: 14px; line-height: 23px; padding: 0px; border: 0px initial initial;">
   
</p>

<p style="margin-top: 15px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; font-size: 14px; line-height: 23px; padding: 0px; border: 0px initial initial;">
   
</p>

<p>
  </span>
</p>