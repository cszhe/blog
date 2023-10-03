---
id: 9789
title: Windows CE下的Flat Virtual Address space
date: 2005-06-13T09:08:54+00:00
author: omale
layout: post
guid: http://hezongjian.com/blog/?p=9789
permalink: '/2005/06/13/windows-ce%e4%b8%8b%e7%9a%84flat-virtual-address-space/'
category:   嵌入式  
tags:   Windows CE, 嵌入式
---
On 6/10/05, song titan  wrote:  
>  
>  
>  
> 常看到书上这么说：Flat虚拟地址空间。加上上次聊到的，WINCE下进程里的私有数据保护。这个&#8221;平板式&#8221;的意思，我刚想了一下，是不是可以这么理解？  
>  
> 因为嵌入式的存储 介质有很多：RAM，ROM  
> ，FLASH等，所以MMU把这些都映射到一个flat的虚拟地址空间上。这样不连续的内存就可以通过页表连续起来。所以称之为  
> flat  
>  
> 还有上次的你说如果选了Enable kernel  
> debug，就没有了slot的边界，进程的私有数据也就无法保护了。我记得在桌面版的WINDOWS下，是MMU来控制这种权限的读写的吧，那这里就是把这种权限机制解除掉了？

我觉得平板的意思就是所有的进程都共享一个地址空间吧。  
Enable Full Kernel  
Mode之后Slot之间的界限就解除了，就像所有的32个进程其实是一个进程一样，但是MMU的保护还存在。例如某段内存在进程A里面是只读的，那么所有的进程都可以去读这段内存。但是如果有进程去写这段内存，那么就会违例。