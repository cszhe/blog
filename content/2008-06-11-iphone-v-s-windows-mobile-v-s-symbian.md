---
id: 9871
title: iphone V.S. Windows Mobile V.S. Symbian
date: 2008-06-11T05:33:00+00:00
author: omale
layout: post
guid: http://hezongjian.com/blog/?p=9871
permalink: /2008/06/11/iphone-v-s-windows-mobile-v-s-symbian/
category:   嵌入式  
---
现在正在美国参加Apple的WWDC（World Wide Developer Conference）开发者大会，虽然我一直想参加的是微软的MEDC（Mobile Embedded Developer Conference）。但是无奈06年参加MEDC申请签证的时候被拒签，而这次由于是因公护照，签证官几乎什么都没问就pass了。第一次美国之旅，就献给了Apple。见到了Bill Gates的难兄难弟Steve Jobs，见证了3G iphone的发布，还听了很多Session，吃了很多难吃的美国菜。收受了apple的这么多&ldquo;好处&rdquo;，不写点东西实在对不起美国人民和苹果公司的一片苦心。于是就有了下面的文章。

<o:p> </o:p>

不得不承认，Apple的演讲非常精彩，PPT（应该不是用的PowerPoint，但是说习惯了）做的极为精致，很能煽动人，Steve Jobs两个小时的key notes演讲就像做梦一样，自己不断的跟着周围的人群欢呼、大笑、鼓掌、吹流氓哨。只有一个词:Fantastic。或许Bill Gates在MEDC上的Key notes也很精彩，但是我不知道，要怪就怪那个大光头拒绝我的签证吧。

<o:p> </o:p>

写下这个题目，就知道肯定是要挨骂滴，平台和产品之间的对比文章互联网上已经太多太多了。我无意再为这样的平台之争点上一把火，甚至都不想卷入平台优劣之争。写这个文章的目的，只是希望以一个局外人的观点，以自己的理解，分析一下这几个现今流行的几个移动开发平台。不一定全对，毕竟是自己的理解，各位读者权当茶余饭后的笑料吧。

<o:p> </o:p>

说到移动开发平台，为什么没有Linux？因为目前而言，虽然Linux在移动上有应用，但是没有统一的标准，各家的应用程序尤其是带UI的应用程序很难兼容。为什么没有Antroid?因为现在还没有Android的手机。为什么没有BlackBerry?因为BlackBerry从架构上其实跟Antroid很像（或许应该反过来说，毕竟有先后，呵呵），以后等Gphone面世之后再说。为什么有Symbian？因为去年Symbian公司也邀请偶们到北京某度假村&ldquo;学习&rdquo;过一把，受人恩惠了 :-)。为什么没有Elastos？你知道Elastos是什么吗？虽然我很了解，但是我只能说I&rsquo;m very sorry，我很抱歉。

<o:p> </o:p>

要说对比，总得有个对比标准。咱们这个文章不是对比手机优劣，所以咱不会对比摄像头多少像素，彩屏发色数，待机时间，联系人，收件箱容量等。咱是把它们作为一个移动开发平台来看。

<o:p> </o:p>

一、平台的开放性：

<o:p> </o:p>

在讨论开放性之前，先说一个自己的观点。大概很多人都觉得作为一个平台，那肯定是越开放越好，最好就是源代码都开放，毫无遮掩一览无余。最近几天分析了iPhone之后，现在觉得从技术发展和商业运作等多方面来说，封闭也有封闭的好处。

<o:p> </o:p>

三个平台里，iPhone应该算是最封闭的。软件是Apple写的，硬件是Apple设计的，卖是在Apple自己的Store里卖的，在公布SDK之前，连上面的应用都是Apple自己做的。如果三星、Moto、波导想做一款手机，也是运行iPhone系统，那简直是白日做梦。Apple OS的源代码也不公开，想给iPhone写驱动也不可能。Apple还自己做这个平台上的增值服务，MobileMe就是一个。不止如此，Apple还把触手伸到了产业链的运营商那里，方法是跟移动的运营商绑定，从运营商那里抽取运营收入。我在想，如果条件允许，恐怕苹果很想做的是自己成立一个苹果移动或者苹果联通，然后通信协议都是自己做一个iCDMA或者iGSM。我们一直讲产业链产业链，Hardware Vendor, Platform Provider, Mobile Operator, Design House, ISV等等各司其职，但是Apple却很想反其道而行之。为啥iPhone在中国上不了市，就是因为Apple遇到了一个同样牛X同样坚挺的China Mobile。

<o:p> </o:p>

与iPhone相反，Windows Mobile应该是最开放的。微软只想做操作系统卖软件，硬件由不同厂商提供，运营商我也care，所以现在我们能看到各种公司的Windows Mobile手机，却唯独没有微软牌Windows Mobile手机。Windows Mobile底层的Windows CE操作系统源代码核心部分是共享的（我没说开源哈）。无论移动、联通还是T-Mobile，Cingular，都可以支持Windows Mobile。Windows Mobile上的软件和服务也很丰富，这也得益于Windows Mobile开发与Windows开发的相似性。

<o:p> </o:p>

其实微软和Apple做的，都是想克隆自己在台式机上的成功经验，在台式机时代，微软只做OS，不做硬件（微软鼠标等可以忽略不计）。正是由于PC这个开放的大平台，不管买哪家的硬件，都要装Windows OS。因此成就了微软的霸主地位。而Apple以前一直是自己做硬件，CPU都用与PC不兼容的Power系列，只是近几年革命形势所迫，才转向了Intel平台，但是还是留了一手，固件采用UEFI而非BIOS，所以还是不完全兼容。

<o:p> </o:p>

说到这里就要说说开放和封闭的对比了。iPhone比Windows Mobile封闭得多。但是不得不承认，iPhone比Windows Mobile的发展快很多。Windows Mobile平台就算不算Windows CE, Pocket PC而从Stinger算起，也得有5年历史了，但是iPhone满打满算才刚刚一岁，就吸引了这么多开发者和普通用户的目光，今天，又趁热打铁、火上浇油，成功发布了第二代产品3G iPhone。似乎Microsoft苦心经营的业绩要被一扫光了。为啥，效率很重要，这里说的效率不是算法O(logn)这个效率，而是Time To Market的效率。从有一个idea，到实现这个idea，然后迅速把这个idea变为产品。这个时间非常重要，第一个推出的是独创，后来者就是拾人牙慧。

<o:p> </o:p>

在这方面，iPhone可以说比Windows Mobile占尽优势。由于iPhone所有的东西都是自己做的，所以不存在于第三方沟通问题，也不存在硬件平台兼容不兼容问题，只需要迅速实现，然后发布。反观Windows Mobile，假设我想做某个feature而这个feature又依赖于硬件（例如加速度传感器或者multi-touch）。Microsoft怎么办？要找个第三方Design house，说：我要做这个，你给我设计个样机？设计好了之后，微软开发，开发完了之后，要交给所有的第三方测试，看看在摩托的手机上没问题了，在三星的手机上是否一样没问题？在xScale CPU上正确了，在三星的CPU上行不行，CPU不够快怎么办？在这个分辨率上对了，换一个分辨率可不可以？如果某个硬件厂家没有这个外设，我怎么也同时兼容？&hellip;&hellip;不但流程复杂，工作量也大了很多。这就是为什么微软老早就说要做啥啥啥，现在还没有影子，估计还在3rd party alpha test吧。Apple则开心多了，同样的硬件，同样的CPU，同样的摄像头，同样的分辨率，同一个公司，做起来当然更快更爽更安心。

<o:p> </o:p>

最后说说Symbian，其实这个的开放程度介于iPhone和Windows Mobile两者之间，Nokia是既搭台，又在台上唱戏，但是Nokia也允许别人在这个台上唱戏。而Windows Mobile是只搭台不唱戏。iPhone是又搭台又唱戏，还不让别人在这个台上唱戏。