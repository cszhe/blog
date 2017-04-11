---
id: 9693
title: Windows CE，你妈吗喊你在多核上玩玩
date: 2010-01-24T22:23:45+00:00
author: omale
layout: post
guid: http://hezongjian.com/blog/?p=9693
permalink: '/2010/01/24/windows-ce%ef%bc%8c%e4%bd%a0%e5%a6%88%e5%90%97%e5%96%8a%e4%bd%a0%e5%9c%a8%e5%a4%9a%e6%a0%b8%e4%b8%8a%e7%8e%a9%e7%8e%a9/'
category:   嵌入式  
tags:   Windows CE
  - 嵌入式
  - 软件
---
众所周知，CE的内核是完全重新写的，与9x根nt没有任何关系，这给CE带来了较好的实时性及灵活性。从诞生之日起，CE的内核改过两次，第一次是3.0，极大的增强了实时性，第二次是6.0，去除了内存/应用32 / 32的限制。如此看来，貌似已经比较完美了。从6.0发布以来，我一直乐观的觉得6.0的内核应该可以至少再顶三个版本了，下次更新内核大概要到CE 9.0了（猴年马月&#8230;.）。但是计划不如变化快，信息产业瞬息万变，很多预言都会被证明是很可笑的。我的这个&ldquo;预言&rdquo;也不例外（对在08年TechEd上听我演讲的听众说声抱歉，当时我还极力鼓吹多余的Kernel feature都是没必要的）。短短几年时间，如果现在你再问我新版本的CE要不要改内核。我会一口咬定，改，最好马上改。

个人观点，欠改的地方有两个，内存映射和SMP支持。

首先说内存映射。CE从诞生之日起就在Kernel的3GB起始处映射了2个512MB的虚拟地址。一个是有cache的，一个是没cache的。这使得CE最大的物理内存就只有512MB，512已经是理论极限了，再多了就不认了。512这个数字在嵌入式系统上一直是天文数字，几年前还是。谁知道随着智能手机软件（应用复杂化）跟硬件（内存白菜价）的飞速发展，在手机上装个512MB的内存也没什么大不了的。在CE上，如果装了512MB内存，麻烦还真不小。这个限制应该改了。倒也不是难事，只是向下兼容性要打折扣了。

其次说一下SMP。CE诞生以来一直是针对单CPU的，即使在PC机上，多核技术已经兴盛很长时间了，但是依然没有能够打动CE加入SMP支持，因为用CEPC的人，一般也不会找个多核CPU。时代又不同了，CE支持的主流平台──ARM，这几年也跟着玩起了多核。ARM11， ARM Cortex A9都玩起了MPCore。这一玩，不得了了。如果CE不跟着玩，几年后，可能移动设备上就看不到CE的影子了。\*nix系统（iphone和android）可是原生支持SMP的。虽然\*nix系统实时性没有CE高，但是人家毕竟支持smp，可以把CPU的能力都发挥出来。CE啊，抓紧把spinlock，CPU Affinity这些Desktop Windows上的东西搬过来吧（BSP的实现又复杂化了，当然这些东西要BSP支持）。

其它还有没有要改的呢，可能有。例如Windows消息机制，现在的WM_LBUTTONDOWN, RBUTTONDOWN消息已经远远不适合multi touch了。当然这个可能不需要改内核，driver和API改改就可以，魅族的手机已经实现了。

下一个版本的CE大概今年就会发布吧。新的CE里面这两点会不会改进，目前还没有官方的消息。拭目以待吧。

<span style="font-family: Times; -webkit-border-horizontal-spacing: 2px; -webkit-border-vertical-spacing: 2px;">（参考资料，ARM的多核：http://www.arm.com/products/CPUs/ARM11MPCoreMultiprocessor.html）</span>