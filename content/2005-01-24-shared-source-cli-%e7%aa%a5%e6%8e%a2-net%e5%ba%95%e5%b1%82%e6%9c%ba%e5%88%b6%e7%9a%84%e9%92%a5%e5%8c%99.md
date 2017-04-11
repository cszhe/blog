---
id: 9760
title: Shared Source CLI——窥探.NET底层机制的钥匙
date: 2005-01-24T19:32:58+00:00
author: omale
layout: post
guid: http://hezongjian.com/blog/?p=9760
permalink: '/2005/01/24/shared-source-cli-%e7%aa%a5%e6%8e%a2-net%e5%ba%95%e5%b1%82%e6%9c%ba%e5%88%b6%e7%9a%84%e9%92%a5%e5%8c%99/'
category:   未分类
tags:   C++  , 微软  , 软件
---
编者按：Microsoft于2002年2月发布了Visual Studio.NET，揭开了.NET时代的序幕。几乎是与此同时，2002年3月27日，微软发布了Shared Sourced Common Language Infrastructure(共享源代码的通用语言基础设施，以下简称SSCLI)。两年过去了，国外已经有不少的大学和机构在研究SSCLI，也做出了一些比较不错的项目。但是反观国内，关于SSCLI的讨论和研究却乏善可陈。本文简单的介绍一下SSCLI的内容，希望能引起广大.NET爱好者的兴趣。

 

什么是SSCLI

 

2000年8月，微软，HP和Intel共同向国际标准化组织ECMA（欧洲计算机制造商协会）提交了通用语言基础设施(CLI)和C#编程语言的规范，希望能借此使CLI和C#成为国际标准。2001年12月13日，ECMA会员大会批准C#和通用语言基础设施（CLI）规范成为国际标准。在ECMA标准中，它们的名字是ECMA-334（C#）和ECMA-335（CLI）。SSCLI就是ECMA-334和ECMA-335的实现。SSCLI是非商业化且共享源代码的软件，它可以在FreeBSD, Mac OS X和Windows上编译运行。并且在非商业化的前提下，我们可以对它进行编译，修改和重新发布。其实，在具体的实现细节方面，SSCLI与微软商业的.NET Framework还是有细微差别的。

 

SSCLI包括什么

 

SSCLI的官方下载地址是http://msdn.microsoft.com/net/sscli。下载得到的是15M的压缩包，根据微软的资料，它包括3,600,000行代码（按每十秒钟读一行，每天八小时，每周五天，要花掉六十个月），其中有27M C / C++代码，8M C#代码和少量的汇编代码。这些代码大概包含4个大模块：

l         编译器和工具

l         .NET Framework类库 (部分)

l         通用语言运行时 (CLR)和执行引擎 (Execution Engine)

l         平台适应层，测试代码和编译工具

这几个模块之间还有SSCLI和外部环境之间的关系，大体可以用图1来表示。下面我们就来一起看看这些模块到底包括什么内容。

 

平台适应层 (Platform Adaptation Layer 简称PAL)

 

平台适应层的主要目的是为了解决不同平台之间的API或系统调用的不同，为不同的平台建立统一的抽象编程接口。这部分的代码可以在解压缩后的sscli/pal目录下得到。PAL被定义为Win32 API的非常小的一个子集，只有397个函数，其中包括155个C运行时函数和242个Win32 API。这些API涵盖了进程 / 线程管理，内存管理，线程同步，文件管理，I/O管理，Socket等函数。SSCLI上层的所有代码都是通过这397个API而实现的。

sscli/pal包括unix和win32两个子目录，分别对应PAL在FreeBSD/Mac OS以及Windows上的实现。在Windows下，PAL只是简单的调用同名的Win32 API。而在unix下，则使用unix的系统调用来把Win32 API重新实现。比较值得关注的是对Win 32句柄的处理以及结构化异常处理（SEH）的实现。

值得一提的是sscli/palrt目录。这个模块的全称是PAL Runtime。是为了使开发更加的简单而实现的一套工具库。其中包括一些简单的COM API，用来支持强命名(Strong Name)的Crypt API，数学运算和URL、文件路径解析等功能。它的目的其实和C Runtime类似，都是为了提供简单易用一些功能函数。

 

通用语言运行时 (CLR)和执行引擎 (Execution Engine)

 

这个模块是CLI的核心实现。涵盖了CLI若干关键技术的实现。这部分的代码在sscli/clr/src/vm目录下。

这部分包括了垃圾收集器(garbage collector)，类加载器(class loader)，类型系统(Type System)，应用程序域(AppDomain)，程序集(Assembly)，反射(Reflection)，即时编译(JIT Compile)等。

笔者认为这个模块是SSCLI最有价值的部分。我们从中不仅可以看到若干内部算法的实现，更重要的是可以看这些数据结构和算法是如何协同工作，共同构成了CLI整体。这几个模块的大致工作流程如图2所示。

<a href="http://images.blogcn.com/2005/1/24/10/omale,2005012419326.gif" target="_blank"><img border="0" onload="if(this.width>screen.width/2)this.width=screen.width/2;" src="http://images.blogcn.com/2005/1/24/10/omale,2005012419326.gif" /></a>

       .NET Framework类库

 

这个模块是.NET Framework开源部分类库的实现，包括了System.Text.RegularExpressions，System.Net，System.Xml等命名空间。本部分类库完全用C#语言编写。关于本部分类库包含的具体内容，也可以从图1上得到。（可惜最吸引人的ASP.net，ADO.net和Winform都不在此列，大概这几部分跨平台比较困� ��）类库的源代码位于sscli/fx/src目录。

 

编译器和工具

 

SSCLI还包含C#编译器和JScript引擎的完整代码，其中C#编译器使用C++编写，源代码在sscli/clr/src/csharp目录下。JScript编译器和引擎是完全用C#实现的。所以这不仅是一个大型C#项目的例子，也可以演示如何把代码编译成MSIL中间代码。

SSCLI还包括一些.NET开发中常用的工具，例如用来调试托管代码的CorDBG，IL汇编的编译器ILASM和反编译器ILDASM，和用于原理全局程序缓存(GAC)的GACUtil等。

 

我们能做什么

 

SSCLI中包括了很多开发编程以及相关的技术，在很多方面都可以引起我们的兴趣。

l         软件工程师可能会对JIT 编译器和内存回收器的工作原理，或者.NET Framework的工作机制感兴趣，那么他们可以深入研究CLI的实现机制。

l         软件架构师和系统分析师可以通过SSCLI学习如何创建一个大型的，跨平台的应用程序，以及应用程序的层次结构。

l         教师可以将此代码库作为示例开发相关的主题课件。

l         如果你想实现自己的基于.net Framework的编译器或自己的CLI，那么这是不可或缺的参考资源。

 

一些资源

l         Shared Source CLI Essentials   O&rsquo;REILLY出版社  唯一一本介绍SSCLI的书，在国内似乎比较难买到。

l         http://discuss.develop.com/dotnet-rotor.html 网上关于SSCLI的邮件讨论组，包含以往的讨论归档。

l         ECMA-334和ECMA-335的官方文档

n         http://www.ecma-international.org/publications/standards/Ecma-334.htm

n         http://www.ecma-international.org/publications/standards/Ecma-335.htm

l         微软的讨论组：microsoft.public.shared_source.cli

l         https://mailserver.di.unipi.it/mailman/listinfo/dotnet-sscli 另外一个难度中等的SSCLI邮件讨论组
	  
</a>