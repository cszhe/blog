---
id: 9780
title: Windows CE的步进电机驱动终于搞定了！
date: 2005-05-21T13:26:28+00:00
author: omale
layout: post
guid: http://hezongjian.com/blog/?p=9780
permalink: '/2005/05/21/windows-ce%e7%9a%84%e6%ad%a5%e8%bf%9b%e7%94%b5%e6%9c%ba%e9%a9%b1%e5%8a%a8%e7%bb%88%e4%ba%8e%e6%90%9e%e5%ae%9a%e4%ba%86%ef%bc%81/'
category:   嵌入式  
tags:   Windows CE
---
今天虽然是周末，但是还是跑到了嘉定校区工作。头等大事就是搞步进电机的驱动。以前虽然只是理论上推导，应该可以写成功，但是由于缺乏硬件，始终没有动过手。不免心虚。这次终于，硬件设备，代码，人都有了，开始写。  
代码并不复杂。一个感觉HHARM的BSP可真够烂的！几乎什么都不支持，居然Windows CE能在这个板子上跑起来，真是奇迹。把driver相对应的注册表放到project.reg里面，Driver居然Load不起来。又没有registry editor可以查看，我只好摸黑操作。后来，后来，居然work了。  
按一下Button，看着开发板上的那个小电风扇转圈，“成就感油然而生”&#8230;

剩下的，就是为六月底的Windows CE培训会议作准备了。打开了“熟悉的”Microsoft Word。继续工作&#8230;&#8230;