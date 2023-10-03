---
id: 9796
title: Windows CE下的错误报告
date: 2005-07-01T16:10:08+00:00
author: omale
layout: post
guid: http://hezongjian.com/blog/?p=9796
permalink: '/2005/07/01/windows-ce%e4%b8%8b%e7%9a%84%e9%94%99%e8%af%af%e6%8a%a5%e5%91%8a/'
category:   嵌入式  
tags:   Windows CE
---
错误报告是Windows CE 5.0中添加的新功能，它是操作系统的一个可选组件。与我们熟悉的Windows XP的错误报告类似，在应用程序崩溃的时候，错误报告可以自动收集崩溃时的系统和应用程序的状态信息（通常叫做Dump File），并允许把收集的错误信息发送给微软或者OEM商，来更好的改善系统的可靠性。  
 <a href='http://images.blogcn.com/2005/7/1/8/omale,20050701155741.jpg'  target='_blank' ><img src='http://images.blogcn.com/2005/7/1/8/omale,20050701155741.jpg' border='0' onload='if(this.width>screen.width/2)this.width=screen.width/2;&#8217; ></img></a>  
图：Windows CE下的发送错误报告对话框  
Windows CE提供两种获取Dump File的方式。自动模式和手动模式，在自动模式中，系统会抓取应用程序没有捕捉的异常（Second Chance Exception），然后自动生成Dump文件，然后打包提交到服务器。在手动模式中，我们可以调用系统提供的API函数，手动创建某个程序某一时刻的Dump File，以利于程序的调试。最常用的情况是某个程序造成了死锁，我们可以使用函数手动创建该称序的Dump文件，然后查看死锁发生的原因。Windows CE提供了一个函数CaptureDumpFileOnDevice来手动的获得Dump，其声明如下：  
BOOL CaptureDumpFileOnDevice(  
  DWORD dwProcessId,// 要抓取dump的进程的ID  
  DWORD dwThreadId, // 要抓取dump的线程的ID  
  LPCWSTR pwzExtraFilesPath// 可选，包含dump的目录  
);  
Windows CE提供了四种类型的Dump文件，不同的Dump文件的大小不同，包含的内容也不同。一般来说Dump文件越大，包含的信息也越多。  
Dump File类型大小描述  
上下文dump4 KB, 64 KB.

崩溃系统的信息  
- 导致崩溃的异常  
- 出错线程的上下文  
- 进程所加载的模块列表  
- 进程的线程列表  
- 出错线程的调用栈  
- 出错时候指令指针（IP，Instruction Pointer）前后的64字节数据  
- 64KB的出错线程的栈  
系统dump64 KB – 几MB- 上下文dump中的所有信息  
- 所有线程的上下文和调用栈记录  
- 整个设备的完整模块，进程，线程列表   
- 出错时候指令指针（IP，Instruction Pointer）前后的2048字节数据  
- 出错时候当前进程的全局变量  
完整dump物理内存的大小加上至少64KB- 上下文dump中的所有信息  
- 所有使用内存的完整映像

Windows CE的错误报告体系结构如图所示。整个错误报告系统分为四个模块：错误报告生成模块，错误报告传输驱动程序，错误报告上传客户端和错误报告控制面板插件。  
   
<a href='http://images.blogcn.com/2005/7/1/8/omale,20050701155823.jpg'  target='_blank' ><img src='http://images.blogcn.com/2005/7/1/8/omale,20050701155823.jpg' border='0'></img></a>  
图：错误报告的结构  
用户可以在控制面板中通过错误报告控制面板插件来对错误报告系统进行配置。当有用户未捕捉的错误发生时，首先，错误报告生成模块可以捕捉到这个错误，然后通过错误报告生成模块生成dump文件，接着，通过错误报告驱动程序把错误报告保存为文件系统上的一个文件，最后，根据用户的选择，把错误报告发送到微软的服务器上。