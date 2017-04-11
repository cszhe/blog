---
id: 9850
title: 与Microsoft Redmond Windows Automotive组的人的交流
date: 2007-07-10T17:40:33+00:00
author: omale
layout: post
guid: http://hezongjian.com/blog/?p=9850
permalink: '/2007/07/10/%e4%b8%8emicrosoft-redmond-windows-automotive%e7%bb%84%e7%9a%84%e4%ba%ba%e7%9a%84%e4%ba%a4%e6%b5%81/'
category:   嵌入式  
tags:   Windows CE
  - 嵌入式
---
<meta content="MSHTML 6.00.6000.16481" name=GENERATOR>

<body leftMargin=3 topMargin=2>

<div>
  几周前就接到微软MSRA湘雯的通知，说有一个微软Automotive部门的人要来学校沟通。很是期待。偶最早接触嵌入式，接触Windows CE，就是从跟汽车学院一起做上海市科委的重大汽车电子项目开始的。呵呵，没想到当年是在给科技部长同志打工。
</div>

<div>
   
</div>

<div>
  上周五，下雨。早上九点左右，一直在办公室等。突然手机响起，一看大惊失色，居然是一个+01打头的美国号码，接听之后正犹豫是说“喂”还是说“Hello”，对方先说话了，原来是MS的人已经到了。赶忙去迎接。原来是来自微软Redmond的女同胞，可以讲中文。
</div>

<div>
   
</div>

<div>
  然后是碰头开会，她介绍了微软在Automotive领域的工作，然后我们一起到汽车学院，参观了同济自主知识产权的燃料电池车和电子仪表以及车载信息系统。
</div>

<div>
   
</div>

<div>
  这里就顺便介绍一下微软的Automotive产品了。微软在车载领域虽然开始很早，但是在国内一直不为人所知，原因是Windows Automotive以及相关产品国内并没有OEM公司在做。而由于Automotive的专业性，微软的网站上也并不提供相关评估版下载（可能是即使下载了也没有汽车运行吧……）。微软在Redmond大概有一千人的团队在做Automotive。按照他们的话说：目前世界上的主要的汽车厂商，十个手指就可以数过来，所以车载没必要做成非常公众和通用的东东。
</div>

<div>
   
</div>

<div>
  目前主要有两个产品：Windows Automotive和Microsoft Auto，至于官网上的Windows Mobile for Automotive这次会面没谈到，暂且不表 了。Windows Automotive更偏向与一个车载的通用平台。而Microsoft Auto则是为Ford和Fiat某几种车型特制的专用平台，放在别的车，别的硬件上就跑不了。基本上就是前者是产品，后者是项目。哎，看到进入一个领域初期打拼的不易了吧，连微软这种公司都要妄自菲薄当三流公司做产品，就像当年CE进入掌上电脑领域的时候一样。如果以后做大，哼，想都不用想肯定是Microsoft Auto自行消亡，只留一个通用平台，让汽车厂商来适应它。所以呢，Microsoft Auto就不介绍了，偶也只是看她放了一段演示Video而已，有一些语音识别，导航，拨号，听歌等功能。要想亲身体验Microsoft Auto，请自行购买Ford xxx型号汽车。
</div>

<div>
   
</div>

<div>
  Windows Automotive是基于Windows CE平台的。只不过它在Windows CE平台上面搭建了一些适合于车载领域使用的特殊组件。（感觉跟当年偶做的那个科委项目思路还真是一模一样：用CE做一个通用的车载平台，支持汽车行业的标准）在CE的基础上，主要有两大组件，一个叫AUI，另外一个叫AST。AUI 是 Automotive User Interface的缩写。其实主要就是一些适合于车载电脑的图形界面，例如仪表盘啊，里程表转速表油量表什么的，同时还提供了强大的图形render功能，来画一些3D导航什么的。AST是 Automotive System Tool的缩写，主要提供了一些工具，用来诊断车载电脑以及汽车的运行情况，可以实现故障诊断等等（这个东东涉及了太多汽车领域的知识，原来诊断什么的都是有行业标准的）。
</div>

<div>
   
</div>

<div>
  此外比较感兴趣的是，Windows Automotive用的CE不是标准的Windows CE 5.0，而是被Windows Automotive Team动了刀的CE。默认的CE 5每进程只支持32MB虚拟内存，这个不用说了，我当时在做那个项目的时候都已经出现过32MB耗尽的事情了。按照微软的说法，发生在微软内部的故事（根据部分事实改编）：
</div>

<div>
   
</div>

<div>
  Automotive Team：老兄，早就觉得32MB不够用了，你们就把它改了吧。
</div>

<div>
  CE Team：我们正在改啊，等CE 6出来了32MB限制就不存在了，你们就可以用的很high了。
</div>

<div>
  Automotive Team：那要等到猴年马月啊……我们东西不做了？如何向billg交差？
</div>

<div>
  CE Team：我们很忙的，CE 6进度催的也紧，Windows Mobile 6那边还等着用CE 5.2，那把代码给你们，你们自己改好了，不要来烦我拉。
</div>

<div>
  Automotive Team：丫的不就是操作系统虚拟内存么，毛主席教导我们：自己动手，丰衣足食。我改！
</div>

<div>
  然后，目前大家看到（肯定没看到，只是听到）的支持96MB虚拟内存的CE就诞生了。
</div>

<div>
   
</div>

<div>
  哎，通过这个事情，也可以看到Automotive在MS内部影响力还不是很够哦，可能是还没盈利吧。Windows Mobile组要用新Feature，CE组就要做CE 5.1和5.2。但是Windows Automotive组就只能自己改，估计这个版本的CE连正式的版本号都没有吧。
</div>

<div>
   
</div>

<div>
  中午去酒店腐败的时候，顺便跟微软要了20套Windows Automotive的license，用于科研和教学目的。他们居然爽快答应。如果能成功，估计偶就成了中国大陆首批玩上Windows Automotive的人了。一周过去了，好像business上不是问题，问题是中国的仿造和D太疯狂了，他们知道中国大陆产的廉价MP3，MP4抢了iPod多少市场，也知道中国的山寨手机如何用上了Windows Mobile OS。他们最怕的是如果流传出去，中国某技术牛人开的地下小公司快速模仿一个跟Windows Automotive一模一样的东西，然后以十分之一的价格卖给奇瑞等公司，这样Automotive这辈子也别想进中国市场了……（希望看到这里，没有激发你的创业热情吧）
</div>

<div>
   
</div>

<div>
  没有图可以看，附上几个参考链接吧：
</div>

<div>
   
</div>

<div>
  Windows Automotive的官网
</div>

<div>
  <a href="http://www.microsoft.com/windowsautomotive/">http://www.microsoft.com/windowsautomotive/</a>
</div>

<div>
   
</div>

<div>
  Channel 9的酷视频：Inside Microsoft Automotive
</div>

<div>
  <a href="http://channel9.msdn.com/ShowPost.aspx?PostID=15096">http://channel9.msdn.com/ShowPost.aspx?PostID=15096</a>
</div>

<div>
   
</div>

<div>
   
</div>