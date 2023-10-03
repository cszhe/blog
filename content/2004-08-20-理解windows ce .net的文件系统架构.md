---
id: 9735
title: 理解Windows CE .NET的文件系统架构
date: 2004-08-20T23:21:37+00:00
author: omale
layout: post
guid: http://hezongjian.com/blog/?p=9735
permalink: '/2004/08/20/%e7%90%86%e8%a7%a3windows-ce-net%e7%9a%84%e6%96%87%e4%bb%b6%e7%b3%bb%e7%bb%9f%e6%9e%b6%e6%9e%84/'
category:   未分类
tags:   Windows CE
---
概述: 在本月的文章中，我们来看一下Windows CE .NET的文件系统，它的组件，以及如何扩展文件系统。
	  
  如果你是微软Windows CE .NET的新闻组的常客，你会发现反复有关与文件系统，尤其是关于基于蜂箱（hive-based）的注册表的问题（如果你不经常阅读那些新闻组，鄙视你！）。本月的文章中，我们将深入到与这些特性的实现相关的系统的不同部分中。首先，我们看一下Windows CE .NET的文件系统结构，因为它是我们要研究的其他特性的基础。在剩下的文章中，我们会讨论对象存储和系统注册表示如何工作的。
	  
Windows CE .NET文件系统是灵活的模块化设计的，它允许自定义的文件系统，过滤器，和大量不同的块设备。文件系统和所有文件系统相关的API都在FileSys.exe进程的管理下。这个模块实现了对象存储和存储管理器（一会我们就稍微研究一下对象存储）并把所有的文件系统统一为在一个根下的单一的系统，&ldquo;\&rdquo;。在Windows CE .NET中，所有的文件和文件系统存在于一个以&ldquo;\&rdquo;作为根开始的单一命名空间内。所有的文件都以从根开始的树形层次结构的单一路径来确定。这与桌面版的Windows很相近，除了没有驱动器名。在Windows CE中，驱动器被挂接为根目录下的文件夹。因此，一个新添加到系统中的存储卡被以类似&ldquo;\Storage Card&rdquo;这样的名字挂接到根目录树下。
	  
FileSys.exe包括一些组件：
	  
&middot;ROM文件系统 
	  
&middot;存储管理器 
	  
&middot;对象存储 
	  
对象存储是一个被FileSys.exe控制的内存堆。对象存储包括RAM系统注册表，RAM文件系统，和属性数据库。每一个模块都是FileSys.exe的可选组件。RAM文件系统和属性数据库是完全可选的或许在某些系统中完全不存在。注册标在一些Windows CE设备中是必需的。在Windows CE 4.0之前，它总是位于对象存储中。从Windows CE .NET开始，它可以作为一个文件存在与外部挂接的文件系统上，例如硬盘。我们一会就去看看这是如何做到的。
	  
基于RAM的文件系统通常直接连接到文件系统的唯一的根。也就是说，一个文件&ldquo;\MyFile.txt&rdquo;位于系统的根目录，也是基于RAM的文件系统的根。基于ROM的文件系统通常被连接到唯一的文件系统的&ldquo;\Windows&rdquo;目录。也就是说在ROM里面的所有文件都是&rdquo;\Windows&rdquo;目录下的只读文件。
	  
存储管理器是Windows CE .NET中的新事物。就像它的名字所暗示的，它负责管理系统中的存储设备和文件系统的访问。存储管理其主要负责四件事：
	  
&middot;存储驱动程序. 这是物理存储介质的设备驱动程序。有时候也被叫做&ldquo;块设备&rdquo;因为它们提供对块数据的随机地址访问。
	  
&middot;分区驱动程序. 它管理一个存储设备上的多个分区。Windows CE .NET允许一个物理的磁盘包括多个格式化成不同文件系统的分区。分区驱动程序是存储驱动程序的有效翻译者。它暴露相通的存储驱动程序接口，把分区的块地址翻译成存储设备上的真实块地址。然后，它把调用转给存储驱动程序。
	  
&middot;文件系统驱动程序. 这些驱动程序把存储设备上的数据组织成文件和文件夹。Windows CE .NET内建对一些文件不同文件系统的支持，包括为CD和DVD准备的UDFS，还有FATFS（包括对FAT32的支持）。4.2版本之后又引入了新的文件系统叫做事务安全的FAT文件系统（TFAT）。（我们在以后的文章中有可能会讨论这个，如果你有兴趣，请告诉我们）
	  
&middot;文件系统过滤器. 文件系统过滤器在对文件系统的调用接触到文件系统之前事先处理它们。这样就允许一些特殊的处理，访问加密、压缩的数据或使用统计监视器。
	  
就像谚语说的，百闻不如一见，所以下面的图就描述了文件系统中各种组件的关系。

图 1. Windows CE 文件系统概貌
	  
这个结构中值得注意的是文件系统过滤器只在存储管理器下并不能作用于ROM文件系统或对象存储中的RAM文件系统。目前为止，微软还没有提供过滤这些文件系统的方法。因此，本文详细讨论这幅图的右边部分。下图就对该部分放大仔细看看。

<a href="http://msdn.microsoft.com/library/en-us/dnembedded/html/embedded06172003_fig2.gif" target="_blank"><img border="0" onload="if(this.width>screen.width/2)this.width=screen.width/2;" src="http://msdn.microsoft.com/library/en-us/dnembedded/html/embedded06172003_fig2.gif" /></a>
	  
图 2. 存储管理器和相关组件
	  
就像你在图上看到的，不是所有的文件系统驱动程序都使用物理设备，即使它们使用，也不一定使用分区驱动程序。这样就极大增强了灵活性，例如，网络重定向器，负责提供网络共享访问，使用WinSock与远程服务器通过网络交流，它就在Windows CE的设备中没有物理的磁盘。
	  
现在我们已经知道大多数模块的作用和它们之间的关系了。我们下一步看看系统是如何把它们都加载起来的。当操作系统启动的时候，NK.exe直接从ROM文件系统加载FileSys.exe。FileSys.exe然后使用ROM文件系统中的默认注册表来初始化注册表。（这里遇到一个鸡生蛋、蛋生鸡的问题，我们使用在磁盘上作为一个文件的蜂箱注册表，但是文件系统还没有被挂接。当我们后面谈到蜂箱注册表的时候，我们会研究操作系统是如何解决这个问题的。）
	  
FileSys.exe然后会读取注册表项来开始一系列的操作。罗列在注册表中的应用程序之一通常是Device.exe，设备管理器。设备管理器从HKEY\_LOCAL\_MACHINE\Driver\BuiltIn键下加载驱动程序。一般来说，所有内建的磁盘设备，例如硬盘，都在这个键下，所以块驱动就被加载了。块驱动带有一个特定的设备类标记，BLOCK\_DRIVER\_GUID {A4E7EDDA-E575-4252-9D6B-4195D48BB865}.
	  
FileSys.exe中的存储管理器注册了设备管理器的提醒系统来获取块设备加载和卸载的提醒。然后，存储管理器打开块设备来询问描述信息（profile）名称。每个块设备类型都有一个与之相关联的描述信息名称。PROFILE就是一个指定分区驱动程序和某类设备的默认文件系统的注册表键。（我们稍后马上就讨论描述信息注册表项）
	  
存储管理器读取关于设备分区驱动程序的信息然后加载合适的驱动程序。（微软提供了一个叫做&ldquo;mspart&rdquo;的分区驱动程序，通过标准的硬盘分区通过磁盘主引导记录上的分区表进行分区，当然你也可以自由的建立你自己的分区，或者什么都不用。）
	  
一旦分区驱动程序被加载，存储管理器就请求分区驱动程序枚举磁盘上的分区并识别分区上的文件系统。分区驱动程序从主引导纪录（MBR）上读取分区和文件系统信息，然后把它提供给存储管理器。存储管理器使用它为每个分区加载文件系统驱动程序然后把文件系统挂接到统一文件系统的根目录。虽然这看起来步骤繁多，但是这也增加了让网络重定向器，FATFS和DVD ROMs在同一个框架内的灵活性。
	  
现在我们已经理解了FileSys.exe如何一步步把各种组件加载起来的，现在我们来仔细看看文件系统驱动程序和文件系统驱动程序管理器（FSDMG R）所扮演的角色。FSDMGR是存储管理器的一部分（在以前版本的操作系统中他是设备管理器的一部分），负责为文件系统驱动程序提供服务。因为文件系统不需要知道数据是来自磁盘上的分区还是直接来自磁盘，FSDMGR封装文件系统驱动程序，为驱动程序的上下边提供接口。下图显示了这是如何工作的。
	  
 

<a href="http://msdn.microsoft.com/library/en-us/dnembedded/html/embedded06172003_fig3.gif" target="_blank"><img border="0" onload="if(this.width>screen.width/2)this.width=screen.width/2;" src="http://msdn.microsoft.com/library/en-us/dnembedded/html/embedded06172003_fig3.gif" /></a>
	  
图 3. 存储管理器
	  
存储管理器调用文件系统驱动程序（FSD），然后FSD使用FSDMGR\_API来从设备接收数据。像对CD这种没有分区的设备来说，设备通过FSDMGR与块驱动交流。如果是个有多个分区的硬盘，它就以同样的方式使用FSDMGR\_API。然而，FSDMGR把工作转给合适的分区驱动程序。
	  
我们已经看了存储管理器，FSDMGR，FSDs，分区驱动程序和块设备是如何交户和协作的。让我们返回到他们是如何加载的，然后看看注册表中的描述信息细节。一个描述信息，像前面所提到的，就是定义关于块设备和应该如何使用它们的一系列注册表值。描述信息位于：HKEY\_LOCAL\_MACHINE\System\StorageManager\Profiles。
	  
每一个描述信息都是位于基本描述信息键下面的键。例如，如果我们的Windows CE .NET设备里面有一个硬盘，并且它确定使用硬盘描述信息，那么描述信息位于：HKEY\_LOCAL\_MACHINE\System\StorageManager\Profiles\Hard Disk。所有的描述信息都是profile键下的名字和值。各种各样的名字和它们的作用如下表所示：
	  
表 1. Profile 注册表键
	  
值类型描述
	  
FolderREG_SZ在 Windows 资源管理器中显示给用户的文件夹名称。对于多个实例，将自动追加整数。（例如，Storage Card、Storage Card2 等等。）
	  
FileSystemREG_SZ用作磁盘的默认文件系统的名称。（如果使用了分区驱动程序，则通常不使用它。）
	  
PartitionDriverREG_SZ列出如果默认驱动程序不合适时要使用的分区驱动程序。如果该字符串为空，则不加载任何分区驱动程序。如果该值不出现，则使用默认分区驱动程序。
	  
AutoFormatREG_DWORD如果磁盘还没格式化，就自动格式化。
	  
AutoPartREG_DWORD如果磁盘还没有分区，就自动分成一个占有最大可用磁盘空间的区。
	  
AutoMountREG_DWORD当存储设备驱动程序加载时，自动挂接文件系统。
	  
NameREG_SZ显示在控制面板 UI 中的配置文件名称。
	  
MountFlagsREG_DWORD用于确定如何装入文件系统的标志。（详细信息下面叙述）
	  
需要特别注意 MountFlags 值。它是下表中的值的位掩码。
	  
表 2. MountFlags 注册表键的标记
	  
标记描述
	  
1隐藏的文件系统。
	  
2可能包含蜂箱注册表
	  
4挂接为文件系统的根 ("\").
	  
8隐藏ROM文件系统 (只与[4]一起使用.)
	  
把文件系统隐藏阻止它被任何正常的对文件和文件夹的枚举找到（例如FindFirstFile等等）。存储管理器独立完成该操作，以便设备驱动程序和应用程序可以检测到是否特定系统正在使用存储管理器。（由于较旧版本的操作系统没有它，所以某些驱动程序可能需要与旧的 LoadFSD(Ex) 机制相兼容，以用于加载文件系统。）虽然无法使用 FindFirstFile 来枚举任意的隐藏系统，但如果知道文件系统的名称，则可以在任何会使用文件路径的地方使用它。以下示例显示了如何检测存储管理器是否正在使用某个系统。
	  
BOOL IsStorageManagerRunning()
	  
{
	  
    DWORD attr = GetFileAttributes( _T("\\StoreMgr") );
	  
    if( (attr != -1) && (attr & FILE\_ATTRIBUTE\_TEMPORARY) )
	  
        return TRUE;
	  
    return FALSE;
	  
}
	  
MountFlags的下一位指示文件系统是否包含基于蜂箱的注册表。这允许FileSys.exe解决前面提到的鸡生蛋，蛋生鸡的问题。（因为需要注册表才能加载访问可能在磁盘上的注册表配置单元文件所需的组件&hellip;）我们呆会再看这一位是怎么用在基于蜂箱的注册表上的。
	  
下面两位是相关联的用在当你希望把外部文件系统挂接为单一文件系统的根时。回忆一下通常单一文件系统的根是RAM文件系统。这对于电池供电的手持设备来说非常好，但是对经常断电的A/C电线供电的设备来说却不太好，因为每次断电RAM的内容就丢了。把文件系统挂接为根允许你把外部的存储设置为根来解决这个问题，所以文件\MyDateFile.TXT将会存在与外部的存储设备上。隐藏ROM文件系统将会隐藏ROM文件系统的数据文件（但是不隐藏现场执行的EXE和DLL）允许你升级所有的ROM里面的文件。这样允许你在FLASH里面使用非常小的操作系统映像，然后把主要的可执行文件放在磁盘上并在使用时加载。（与现在桌面系统很类似）。
	  
如果特定的描述信息的值不存在，存储管理器会从HKEY\_LOCAL\_MACHINE\System\StorageManager\Profiles键下使用默认的设置。你可以重写的默认设置位于COMMON.REG。你可以用你的PLATFORM.REG或者PROJECT.REG来重写（记住你不应该修改COMMON.REG）。下表显示了默认的COMMON.REG。
	  
表 3. COMMON.REG 的默认值
	  
值默认值
	  
FolderLOC\_STORE\_DEFAULT_FOLDER (在.STR文件中的设备的标识；在英文版本中通常是&ldquo;Storage Card&rdquo;)
	  
FileSystemFATFS
	  
PartitionDriverMspart.dll
	  
AutoFormat0
	  
AutoPart0
	  
AutoMount1
	  
MountFlags0
	  
概述
	  
Windows CE文件系统架构非常灵活和可扩展，并支持： 
	  
&middot;多个块设备
	  
&middot;每个块设备上多个分区
	  
&middot;每个分区上不同的文件系统 
	  
&middot;把外部设备文件系统挂接到系统的根 
	  
注册表是让加载和运行文件系统的过程具有正确的（期望的）行为的关键。基于蜂箱的注册表把它们粘合在一起。为了缓解你对&ldquo;加载&ldquo;它的恐怖，我们会在后面几个月的文章中使用一些实际的例子详细讨论基于蜂箱的注册表，但是现在，我们是要&ldquo;卸载&rdquo;这个月的文章的时候了。