---
id: 9727
title: Windows CE .NET 高级内存管理
date: 2004-03-31T22:26:19+00:00
author: omale
layout: post
guid: http://hezongjian.com/blog/?p=9727
permalink: '/2004/03/31/windows-ce-net-%e9%ab%98%e7%ba%a7%e5%86%85%e5%ad%98%e7%ae%a1%e7%90%86/'
category:   嵌入式  
tags:   Windows CE, 嵌入式, 程序员
---
Windows CE .NET 高级内存管理
	  
Douglas Boling, 嵌入式 Windows MVP
	  
Boling Consulting
	  
2002年八月
	  
适用于:
	  
    Microsoft&reg; Windows&reg; CE .NET
	  
    Microsoft Windows CE 3.0
	  
    Pocket PC 2002
	  
内容
	  
摘要 
	  
在盒子里生活
	  
动态连接库（DLL）加载问题
	  
摘要
	  
Microsoft Windows CE的优势之一是它支持Win32 应用程序接口(API)。 成千上万的windows程序员就可以利用他们的Win32 API和MFC知识而几乎没有困难的转移到Windows CE上来。Windows CE实现了Win32 API的一个子集，但是程序员不应该忘记Windows CE与Windows XP是完全不同的两个操作系统，他们有着不同的需求和实现。知道Windows CE如何实现与Win32的兼容性有利于我们在设计应用程序和诊断问题时对两者区别对待。
	  
内存管理的实现在Windows CE 和Windows XP上有比较明显的不同之处。尽管Windows CE支持几乎所有的Win32内存管理函数，除了已经舍弃的全局堆函数，这些内存管理API的实现是完全不同的。这些不同有可能会阻碍不了解Windows CE和Windows桌面版本的细微不同的人。为了了解问题的所在，你必须首先了解Windows CE是如何对内存进行管理的。
	  
系统内存映射图
	  
Windows XP和Windows CE都是32位的操作系统，因此支持4GB的虚拟地址空间。Windows XP把这些地址空间分成两个2GB的区域。上面的一半地址空间是为系统保留的。下面的一半地址空间复制给每个正在运行的应用程序。
	  
 
	  
<a href="http://msdn.microsoft.com/library/en-us/dncenet/html/advmemmgmtfig01.gif" target="_blank"><img border="0" onload="if(this.width>screen.width/2)this.width=screen.width/2;" src="http://msdn.microsoft.com/library/en-us/dncenet/html/advmemmgmtfig01.gif" /></a>
	  
图 1. Windows XP 虚拟内存空间
	  
乍看之下，Windows CE的虚拟地址空间是以同样的方式组织的，一个系统保留区和一个应用程序区。图2显示了Windows CE的地址空间。在这种情况下，上面的2GB地址空间同样是系统保留区。下面的一半地址空间被分成多个区域。这块范围的主要部分，几乎是一半的空间，被定义为大内存区（Large Memory Area）。这个区域被用来分配大块内存空间。典型的应用是内存映射文件。
	  
在大内存区下面是另外一块大区域，在这张图里被标为保留（Reserved）。保留区之下的非常低的地址空间是一块64兆（MB）的区域。这64MB区域就，更精确地说，最低的32M区域，是为每一个运行的应用程序准备的。

图 2. Windows CE虚拟内存空间
	  
Windows CE应用程序内存映射图
	  
最低位的64MB虚拟地址空间是Windows CE应用程序所在地。图3展示了这块应用程序虚拟地址空间。应用程序的代码被加载到虚拟地址空间为0x10000的地方，就像在Windows XP应用程序中一样。当应用程序启动的时候，系统会在地址空间内为所有的代码保留足够的空间，真正的代码就可以在需要的时候被页交换到这块地址空间上。
	  
在代码保留区之上，是为只读和读/写的静态（static）数据保留的内存页。除此之外，系统还为每个执行的应用程序的每个线程保留一块区域，用作本地堆和栈。为每个线程保留的栈的大小在线程启动的时候已经被确定。实际的RAM仅仅在栈增长的时候才被提交。另一方面，堆保留了一块区域，它可以随着在堆上分配的RAM数量而按需增长。
	  
当现场执行（Execute in place、XIP，译者注：指的是直接在Flash Memory里面执行代码）的动态链接库被加载的时候，他们从64MB的高位到低位加载。每个现场执行的动态链接库的地址（在地址空间中的位置）当ROM被制造时就已经确定。当一个非现场执行（Non-XIP）的动态链接库被加载时，他会被加载到低于32MB的空间内。非现场执行的动态链接库，也被称作基于RAM（RAM-based）的动态链接库，会被从对象存储加载，从ROM解压缩，或者从外部的像压缩闪存卡一样的文件系统加载。应用程序的虚拟内存空间的高32MB仅仅被现场执行的动态链接库使用。
	  
 
	  
<a href="http://msdn.microsoft.com/library/en-us/dncenet/html/advmemmgmtfig03.gif" target="_blank"><img border="0" onload="if(this.width>screen.width/2)this.width=screen.width/2;" src="http://msdn.microsoft.com/library/en-us/dncenet/html/advmemmgmtfig03.gif" /></a>
	  
图 3. A Windows CE .NET 应用程序虚拟内存空间
	  
任何其他应用程序分配的内存，无论建立单独的堆还是（在默认堆上）直接调用VirtualAlloc API，系统都会从低地址往高地址搜索，直到发现第一块未分配的可以满足此次分配的区域。
	  
在盒子里生活
	  
虽然应用程序可用RAM的数量是Windows CE上的应用程序的制约因素之一，应用程序相对较小的32MB虚拟地址空间也是另外一个主要的制约因素。尽管现场执行DLL被加载到高于32MB的空间内，所有其它的内存分配和任何基于RAM的DLL都必须被装配在应用程序的32MB地址空间内。这个32MB的&ldquo;盒子&rdquo;对Windows CE程序员来说还算不上是问题，而不过是一个需要克服的挑战。
	  
为了理解为什么这看似比较大的内存会成为一种制约，你必须理解VirtualAlloc API所进行的操作。VirtualAlloc在所有的微软Win 32操作系统上都是最基本的内存分配调用。他在页级别上分配内存。页是CPU可以分配和释放的内存最小单元。在Windows CE .NET上，CPU的页大小依据CPU的不同是1024或4096字节。4KB是最常用的大小。
	  
VirtualAlloc调用分两步分配内存。首先，保留（reserve）一块虚拟内存空间。这种保留并不消费任何RAM。它只是阻止一块虚拟地址空间被其他方式使用。当内存空间被保留以后，这块空间的一部分或整个空间可以被提交（Commit）。这样就把真正的物理内存映射到保留区域。VirtualAlloc函数既可以用来保留内存空间，也可以用来提交内存。VirtualAlloc的函数原型如下所示：
	  
LPVOID VirtualAlloc (LPVOID lpAddress, DWORD dwSize,
	  
                     DWORD flAllocationType,
	  
                     DWORD flProtect);
	  
VirtualAlloc的第一个参数是要分配的内存区域的虚拟地址。当使用VirtualAlloc来提交一块以前保留的内存时，LpAddress参数被用来确定以前保留的内存块。如果这个参数是NULL，系统来决定从什么位置来分配内存，并把大小按照64KB边界取整。第二个参数是dwSize，是要分配或保留的区域大小。因为这个参数的单位是字节而不是页，所以系统会把申请的大小取整到下一个页的边界。
	  
flAllocationType参数指定了分配的类型。你可以指定下面标记的组合：MEM\_COMMIT, MEM\_AUTO\_COMMIT 和 MEM\_RESERVE。MEM\_COMMIT参数为程序分配可以使用的内存。MEM\_RESERVE保留一段虚拟地址空间以备将来提 交。被保留的页不能被访问，直到再次使用VirtualAlloc指定这块区域并使用MEM\_COMMIT标志。MEM\_AUTO_COMMIT标志是Windows CE所特有的，它非常简单方便，但不是本篇文章要讨论的主题。
	  
因此，为了使用VirtualAlloc来分配可用RAM，应用程序必须或者两次调用VirtualAlloc，一次保留内存空间，再提交物理RAM，或者调用它一次，并给flAllocationType参数传递MEM\_RESERVE 和 MEM\_COMMIT标志的组合。
	  
把保留和提交标志组合使用可以减少代码量，并且快速和简单。这个技术在Windows XP应用程序中经常使用但是在Windows CE应用程序中并不是个好主意。下面的这段代码可以展示问题的所在：
	  
INT i;
	  
PVOID pMem[512];

for (i = 0; i < 512; i++) {
	  
   pMem[i] = VirtualAlloc (0, PAGE\_SIZE, MEM\_RESERVE | MEM_COMMIT,
	  
                           PAGE_READWRITE);
	  
}
	  
这段代码似乎没什么损害。它分配了512块内存，每块一个页大小。问题就是在Windows CE系统上，这段代码永远会失败。即使在一个有几兆可用内存系统上。这个问题的原因是Win 32操作系统如何保留一块内存。
	  
在Win32操作系统上，包括Windows CE .NET，当一块虚拟内存空间被保留的时候，他把保留区域按照64KB边界对齐。因此，上面的代码试图保留了512块按照64KB边界对齐的空间。Windows CE应用程序的问题是他们必须位于32MB虚拟地址空间内。这块空间在整个应用程序空间也内只有512个64KB边界，并且一些空间还需要被程序代码、本地堆、栈、和应用程序加载的DLL使用。上面的代码一般在经过大约470次调用VirtualAlloc就会失败。
	  
上述问题的解决方案是首先保留一块足够整个分配使用的区域，然后按需提交RAM，如下所示：
	  
INT i;
	  
PVOID pBase, pMem[512];

pBase = VirtualAlloc (0, 512*PAGE\_SIZE, MEM\_RESERVE, PAGE_READWRITE);

for (i = 0; i < 512; i++) {
	  
   pMem[i] = VirtualAlloc (pBase + (i * PAGE\_SIZE), PAGE\_SIZE,
	  
                           MEM\_COMMIT, PAGE\_READWRITE);
	  
}
	  
我们已经明白了解决这个问题的关键。但是这仅仅是Windows CE应用程序的512块区域对程序的若干影响之一。
	  
分配大块内存
	  
另外一个生活在Windows CE .NET应用程序的32MB地址空间内的问题是如何分配大块内存。如果一个应用程序因特殊需求需要一块8，16或者32MB大小的RAM，而整个应用程序的的地址空间被限制为32MB，该如何分配内存？答案是安装一个首先被用在早期Windows CE.NET的图形驱动上的补丁。它的作用是如果Windows CE. NET检测到VirtualAlloc保留了一块大于2MB的地址空间，那么这块地址空间并不会被保留在32MB的&ldquo;盒子&rdquo;内。这块内存会被保留在大内存区，它位于2GB的系统保留空间之下。
	  
当内存空间被保留以后，应用程序可以通过调用VirtualAlloc在保留空间内提交某些特定页面。这允许应用程序或驱动使用大块内存。尽管它们仍然生活在32MB的&ldquo;盒子&rdquo;的限制中。下面的代码展示了分配64MB空间，然后在保留区中提交了一个页。
	  
   PVOID ptrVirt, ptrMem;
	  
   ptrVirt = VirtualAlloc (0, 1024 \* 1024 \* 64, MEM_RESERVE,
	  
                        PAGE_NOACCESS);
	  
   if (!ptrVirt) return 0;

   ptrMem = VirtualAlloc ((PVOID)((int)ptrVirt+4096),
	  
                          4096, MEM\_COMMIT, PAGE\_READWRITE);
	  
   if (!ptrMem) {
	  
      VirtualFree (ptr, 0, MEM_RELEASE);
	  
      return 0;
	  
   }
	  
   return ptrMem;
	  
上述代码也展示了如何直接使用虚拟内存API的技巧之一。你可以建立巨大的数组而不必消耗大量的RAM。在上述的代码中，64MB的保留区域并不消耗任何的物理内存。在这个例子中，唯一的内存消耗是一个页，4096字节，当这个页被第二次调用VirtualAlloc提交的时候。
	  
动态链接库加载问题
	  
现在有大量的Windows CE程序员在Pocket PC 2002上写程序。先暂且不管更改到Windows CE .NET的内存架构需要调整。仍然有很多应用程序加载DLL的问题在影响Pocet PC 2002程序员。为了理解这个问题，你必须首先理解Windows CE .NET与Windows CE 3.0的区别和这两个版本的Windows CE如何加载和管理DLL。
	  
Windows CE .NET的新特点之一是应用程序的虚拟地址空间从较早版本的32MB扩大到了64MB。高位的为现场执行DLL准备的32MB虚拟地址空间在Windows CE 3.0上是不可用的。正因如此，在基于Windows CE 3.0的系统上运行的应用程序必须把现场执行的DLL，代码和所有数据加载到32MB的虚拟地址空间中。图4展示了Windows CE 3.0应用程序的内存空间。图4展示了Windows CE 3.0应用程序内存空间的图表。

<a href="http://msdn.microsoft.com/library/en-us/dncenet/html/advmemmgmtfig04.gif" target="_blank"><img border="0" onload="if(this.width>screen.width/2)this.width=screen.width/2;" src="http://msdn.microsoft.com/library/en-us/dncenet/html/advmemmgmtfig04.gif" /></a>
	  
图 4. 一个Windows CE 3.0 应用程序的虚拟地址空间
	  
因为Pocket PC 2002是基于Windows CE 3.0的，这个虚拟内存空间的限制对运行在那个平台上的应用程序都有效。
	  
动态链接库的加载
	  
Windows CE用来加载DLL的技术与Windows CE .NET是一样的。除了早期的Windows CE不能使用Windows CE .NET加载现场执行DLL的额外32MB空间。
	  
当加载DLL的请求发起的时候，内核首先检测这个DLL是否已经被其他的应用程序加载，如果没有，并且这个DLL不是现场执行DLL，内核使用修改过的从高到低搜索算法在32MB虚拟内存映射中找出第一个可用的空间。搜索算法之所以被认为是修改过的，因为内核避开任何被其他DLL使用的地址，即使这个DLL没有被当前进程加载。这个搜索技术保证了系统中的每个DLL都被加载到一个唯一，不重叠的地址。
	  
唯一的地址是必要的因为如果一个DLL被不止一个进程加载，它必须在多个进程中位于同一个虚拟地址空间。通过把不同的DLL每一个加载到唯一的地址空间，内核可以保证如果一个应用程序希望加载一个已经被其他进程加载的DLL，请求加载DLL的进程就可以使用已经加载这个DLL的进程的虚拟地址。图5展示了三个进程，每个都加载了一系列DLL。在这幅图中，DLL A被所有三个进程加载到同一个地址。进程2加载了DLL C，它的地址比被进程1加载的DLL B和DLL A要低。进程C后来加载了DLL A和它自己的DLLＤ。请注意在每一个进程中，相同的DLL被加载到了同样的� �址，不同的DLL被加载到了单独的地址。
	  
<a href="http://msdn.microsoft.com/library/en-us/dncenet/html/advmemmgmtfig05.gif" target="_blank"><img border="0" onload="if(this.width>screen.width/2)this.width=screen.width/2;" src="http://msdn.microsoft.com/library/en-us/dncenet/html/advmemmgmtfig05.gif" /></a>  
	  
图 5. 三个进程加载一系列动态链接库
	  
现在考虑一下遇到潜在的问题该怎么办。假设进程2加载的DLL C非常大，如图6所示。进程3如果是个大的.exe文件或者在进程2加载了巨大的DLL C之后再DLL就倒了霉。显然，进程3如果尝试加载任何没有被其他进程加载的DLL就会遇上麻烦。这是一个比较做作的例子因为除非DLL C出奇的大，或者进程2加载了大量DLL，这样这个问题才会自然的出现。

图 6. 三个进程加载了一系列动态链接库，进程2加载了一个很大的动态链接库
	  
从普通的DLL加载，现在我们要讨论比较复杂的处理现场执行和非现场执行的DLL。每一个现场执行DLL的地址都在ROM被原始设备制造商（OEM）制造出来的时候唯一确定。这样，所有的现场执行DLL能被彼此没有任何冲突的加载。因为它们是现场执行，包含DLL代码的ROM可以被直接映射到需要他们的应用程序的虚拟地址空间。现场执行的DLL被一个进程加载的时候不能被重定位（rebase）到其他地址，因为重定位要牵扯到修改只读的代码。
	  
当内核为非现场执行的DLL寻找空闲的虚拟地址空间的时候，它从现场执行DLL的最低地址开始搜索。这不是你的应用程序加载的现场执行DLL的最低地址，而是整个系统中的现场执行DLL的最低地址，不管它是否被应用程序加载。这里又一次强调，这个技术可以保证每一个当前加载的DLL能被其他进程加载。尽管这样系统工作的不错，有时候有些DLL无法加载，原因就是Windows CE .NET在Pocekt PC 2002上独特的实现。
	  
Windows CE .NET在Pocket PC 2002上的实现利用了Windows CE 3.0的一个特征。它允许在一个设备上使用多于一个的ROM。这个特征允许在一个系统中使用多于一个的ROM，即使他们没有连续的物理地址。
	  
像上文所述，DLL经过特殊处理才能现场执行。因为为DLL定基址（basing）需要改变DLL的代码，DLL必须在ROM被制造时就进行定址。当第一个ROM被制造时，制造ROM的工具为每一个DLL定址，这样，它就不会与其它同在一个ROM的DLL重叠。
	  
要使用多个现场执行区域意味着内核设计者需要重新审阅DLL加载机制。为了保证现场执行DLL载多个现场执行区域上从不重叠，在第二个ROM中的DLL的虚拟地址必须被定在比第一个ROM中最低地址的DLL还要低的地方。如果还有其他的ROM被使用，在那些现场执行区域中的DLL也必须被定址在比前一个ROM地址要低的地方。
	  
使用多个ROM映像可以使某些方面十分便利。如果一个OEM或者微软想要升级部分Windows CE的映像，他们可以为某个ROM发布一个升级包，而不是升级整个系统。为了保证升级一个ROM不需要对其他ROM做出改变，微软建议这样做：位于低地址的映像中的DLL不要把地址定位在前一个映像中地址最低的DLL处。而是定位到更低的地址，人工载DLL之间留出一些虚拟内存空隙（gap）。
	  
微软内部负责Pocket PC 2002（它是基于Windows CE 3.0的）的开发者把多个现场执行区的优点发挥到了极致。大多数Pocket PC的实现有五个或五个以上的现场执行区。问题是这些区域之间的空隙太大了。在Pocket PC 2002映像中，最低的现场执行DLL的基址比较典型的位于0x0100000以下。因为Windows CE把基于RAM的DLL放在最低的现场执行DLL之下，可以被基于RAM的DLL使用的空间，应用程序代码，它的堆和栈并不是被限制在32MB的虚拟地址空间内，而是比最低的现场执行DLL还要低的空间内，还不到16MB。
	  
图7中描述了Pocket PC 2002的问题。请注意在虚拟内存中为现场执行DLL准备的区域非常大。事实上，这张图非常的保守因为在典型的Pocket PC 2002上，为现场执行DLL准备的区域通常占据了虚拟内存空间的一半，而这张图并没有显示这一点。请注意基于RAM的DLL的加载情况；A,B,C和D占的地址在虚拟地址空间中非常的低
	  
 
	  
图 7. 在Pocket PC 2002上加载DLL，现场执行的DLL占据了大块虚拟地址空间。
	  
为了使应用程序合作处理大量的数据，合作的开发者不得不在Windows CE应用程序中使用大型数据库。通常大型数据库引擎被实现为一个DLL并且通常它非常大。在上面的例子中，数据库DLL就是制造麻烦的DLL C。Pocket PC 2002应用程序上面只有不到16MB的可用虚拟内存空间，并且还需要大型的，基于RAM的DLL，很多开发者发现他们的应用程序因为空间不足而无法运行了&mdash;&mdash;不是因为缺少RAM，而是虚拟内存空间。

合并动态链接库
	  
很多技术都可以用来在Pocket PC 2002上减轻这个痛苦。首先，开发者可以通过把小的DLL合并成大的而减少DLL的数量。每个DLL至少要占据64KB的空间。如果一个应用程序有四个DLL每个占据20KB。这些DLL使用的总共内存空间是256KB。通过合并三个DLL（译者注：原文是四个DLL，显然后面的60KB是矛盾的），得到的大的DLL只需要消费64KB虚拟内存空间&mdash;&mdash;代码只占了60KB，但是最小的脚印也要64KB。作为一个通用的规则，把DLL合并，总的大小接近，但是不要超过64KB的倍数。在一些小DLL过多的应用程序中，通过简单的把小DLL合并成一些大DLL就可以解决他们应用程序的DLL加载问题。
	  
把DLL代码搬到应用程序中
	  
另外一个在Pocket PC 2002上减少这个问题的的方法是把DLL中的代码移到应用程序中。即使这些代码是在多个进程中共享的。有时候在多个进程中复制这些代码同样是有利的，因为不同的进程是独立加载（译者注：到不同的虚拟地址空间）的。
	  
起初，把代码搬到应用程序中看起来没什么帮助&mdash;&mdash;代码仍然在应用程序的32MB虚拟空间中。然而，这里的关键是构造一些不需要大的，基于内存的DLL的大应用程序和小的加载和使用基于RAM的DLL的应用程序。使用这种技术，大的应用程序实现大多数的业务逻辑然后小的应用程序加载大的DLL。如果大的应用程序需要大的DLL提供的服务，它必须使用进程间通讯机制使小进程调用DLL并且把返回的数据再通过进程间通讯传给大的应用程序。
	  
定义DLL的加载顺序
	  
当减少DLL的数量和把代码传递给应用程序都还不够，就是该考虑一种更激进的方法的时候了：手工指定DLL的加载顺序。加载的顺序很重要，因为如果大的DLL被过早的加载，就会压低所有后来加载的小DLL的加载位置。典型的，大的DLL只被一个应用程序使用。但是如果他过早的加载，它就会影响其他的应用程序，因为它会把其他应用程序的加载地址压低到他们不能被加载的位置。
	  
解决方案是首先加载小DLL，然后甚至是最后加载令人不愉快的大DLL。这就引起了另外一个话题，如何强行设置DLL的加载顺序。一种方法是顺序的启动不同的进程，但是这样也会有问题。
	  
另外一个定义DLL加载顺序的方法是写一个小应用程序，让它在主应用程序运行之前开始运行，并且通过连续调用Win32 API LoadLibrary来按照一定的顺序加载基于RAM的DLL。这个DLL加载器可以在主应用程序的生命周期内持续运行。它甚至可以通过调用CreateProcess来启动主应用程序并且通过在CreateProcess返回的进程句柄上等待来等待主应用程序推出 。这个DLL加载器不会使用很多RAM因为这些被加载的DLL最终将会被其他进程加载。
	  
所有这些讨论的在Pocket PC 2002上解决DLL加在问题的方法都有点类似于黑客行为。没有一个算得上优雅，也没有一个比较容易维护。然而，这些就是开发者用来开发产品的解决方案。以后的Pocket PC发行版本应该会解决这些问题，但是对于Pocket PC 2002上的开发者，创造性是首要的。
	  
通过了解Windows CE是如何管理内存的，开发者可以避免缺陷并且更快的诊断问题。知道了Windows CE如何管理DLL可以避免在Pocket PC 2002应用程序中存在的潜在问 &#8230;