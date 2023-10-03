---
id: 9843
title: Windows CE、Windows Mobile升级的杂谈
date: 2007-04-15T13:21:32+00:00
author: omale
layout: post
guid: http://hezongjian.com/blog/?p=9843
permalink: '/2007/04/15/windows-ce%e3%80%81windows-mobile%e5%8d%87%e7%ba%a7%e7%9a%84%e6%9d%82%e8%b0%88/'
category:   嵌入式  
tags:   Windows CE
---
<meta content="MSHTML 6.00.6000.16414" name=GENERATOR>

<body leftMargin=3 topMargin=2>

<div>
  向下兼容估计是所有做产品的公司不大不小的痛。为了保住以前的老客户不抱怨自己的东西被淘汰。东西又要一直往下做来忽悠新客户。向下兼容是最好的选择。
</div>

<div>
   
</div>

<div>
  今天我们说的还是微软的Windows CE和Windows Mobile。
</div>

<div>
   
</div>

<div>
  Windows CE自从诞生之日起，总共经历了两次大的内核重写。第一次是Windows CE 3.0，为了增强系统的实时性，为了使系统更加模块化，Windows CE的内核经过了重新改写。那个时候估计我还在会计系做帐呢。所以没有赶上。这第二次内核重写，就是去年发布的Windows CE 6.0。Windows CE 6为了解决以前版本32/32的限制，把内核重新编写过。新的内核支持32K个进程（理论值，至于这个理论是如何得出来的呢？因为kernel有个handle table，一共65563项，而每个进程要在handle table里面占两项，所以65536/2就得出来了），还有更好的内存保护……更详细介绍请参看本人的其它文章。呵呵。
</div>

<div>
   
</div>

<div>
  底层的OS升级肯定会导致上层一系列的连锁反映。今天要说的两个反映一个是其上层解决方案Windows Mobile，另外一个是第三方BSP该如何改动。
</div>

<div>
   
</div>

<div>
  Windows Mobile无疑是Windows CE可以占领市场的最大推动力。微软很有见地的选择了手机/PDA作为Windows CE的官方示范应用领域（理论上xBox也是可以的啊），目前已经获得了巨大的成功。前不久，Windows Mobile刚刚推出了6.0版本，而且迅速被破解然后ROM到处传。应用程序开发人员与水货手机销售人员欢呼雀跃。但是从系统底层观点来看，估计经历了复杂的博弈。因为撇开Windows Mobile 6的新功能不谈，其底层的操作系统，却依然使用的是Windows CE 5.x ! !
</div>

<div>
   
</div>

<div>
  微软自从推出Windows Mobile平台以来，基本把Windows Mobile的版本号与底层Windows CE的版本号保持一致。例如我们看不到Windows Mobile 2.0和3.0，这是因为CE在2.0的时候Mobile还没有降生。但是在Mobile 6发布的这一刻，这个约定却被打破了。底层的操作系统居然没变。
</div>

<div>
   
</div>

<div>
  什么？不信？不信看抓下来的图。这是从新的Smartphone上抓拍下来的。第一行大标题Windows Mobile 6，第二行注意，OS：5.2.318。所以，严格地说，Windows Mobile 6使用的是一个没有公开发行的Windows CE 5.x版本。正如Windows Mobile 5使用的是Win CE 5.1一样，Windows Mobile 6使用的是Windows CE 5.2。 
</div>

<div>
   
</div>

<div>
  <img id=img20070415124015.jpeg alt="mobile 6-中国博客网" src="http://images.blogcn.com/2007/4/15/7/omale,20070415132126.jpeg" align=baseline border=0>
</div>

<div>
   
</div>

<div>
  什么？你怎么知道CE 5.2跟CE 6不是同一个版本？好吧，我再抓一张图看看：
</div>

<div>
   
</div>

<div>
  <img id=img20070415124522.jpg alt=mobile6-中国博客网 src="http://images.blogcn.com/2007/4/15/7/omale,20070415132131.jpg" align=baseline border=0>
</div>

<div>
   
</div>

<div>
  这个是远程进程查看器，我们透过界面看本质。查看一下Windows Mobile 6的进程。熟悉的nk.exe，filesys.exe，gwes.exe和device.exe一个不少，都出现在这个列表里面，而Windows CE 6的新架构下，是没有这些进程的。这下铁证如山了。
</div>

<div>
   
</div>

<div>
  既然CE已经升级到6.0，而且当时CE6发布的时候，微软号称为了验证CE 6的内核的可用性，已经把Windows Mobile在新的内核下完好的运行起来了，但是mobile 6面世的时候，为什么我们看到的依然是Windows CE 5的Kernel？
</div>

<div>
   
</div>

<div>
  我猜测，大概有如下几种可能性。纯属个人臆测，不代表任何组织的观点。
</div>

<div>
   
</div>

<div>
  1. 当然是向下兼容。虽然CE6号称内核改变的同时，最大程度的保证应用程序和驱动程序的向下兼容。但是最大程度的保证并不是100%的保证。所以如果内核改成CE 6，必然有很多应用程序没法继续使用。输入法等首当其冲。会导致一些不必要的波动。
</div>

<div>
   
</div>

<div>
  2. 工作量问题。如果把Windows Mobile移植到CE 6，微软Windows Mobile Team本身的工作量也是比较大的，可能无法在短期内推出新的Windows Mobile 6平台。为了降低Time to Market。只能忍痛了。如果微软内部真的觉得CE6是未来。估计在不久的将来，可能会有Windows Mobile 6 2nd Edition会基于Windows CE 6也说不定。
</div>

<div>
   
</div>

<div>
  3. 效率问题和其它问题。这恐怕是微软和广大开发人员最不希望看到的。把Windows Mobile移植到新的 CE 6之后，遇到了一些新的问题，例如效率，例如OS体积，例如稳定性……继续使用CE 5是一个不得不采用的折衷方案。如果真的是这样。恐怕对新出炉CE 6的推广是一个不小的打击……
</div>

<div>
   
</div>

<div>
  不知不觉又写了这么多，第三方的BSP如何升级改天再说吧。又烂尾了，又烂尾了（为什么要说又呢）……
</div>

<div>
   
</div>

<div>
   
</div>