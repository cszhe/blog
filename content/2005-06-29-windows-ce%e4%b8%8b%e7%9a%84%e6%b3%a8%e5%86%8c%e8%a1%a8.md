---
id: 9794
title: Windows CE下的注册表
date: 2005-06-29T18:22:56+00:00
author: omale
layout: post
guid: http://hezongjian.com/blog/?p=9794
permalink: '/2005/06/29/windows-ce%e4%b8%8b%e7%9a%84%e6%b3%a8%e5%86%8c%e8%a1%a8/'
category:   嵌入式  
tags:   Windows CE
  - 嵌入式
---
与桌面Windows一样，Windows CE也使用注册表（Registry）来保存应用程序、驱动程序和用户的设定以及其他一些配置信息。Windows CE注册表也采用树形结构来管理配置信息，由于Windows CE注册表的结构和功能与桌面Windows几乎一样，在这里就不详细介绍了，读者可以参考其它关于注册表的资料。  
Windows CE支持四个根键，描述如下：  
键名描述  
HKEY\_LOCAL\_MACHINE硬件和驱动配置数据  
HKEY\_CURRENT\_USER用户配置数据  
HKEY\_CLASSES\_ROOTOLE和文件类型匹配配置数据  
HKEY_USERS适用于所有用户的数据  
由于嵌入式系统的特点，一些嵌入式设备是没有外存的。因此Windows CE的注册表提供了两种实现方式：基于RAM的注册表（RAM-Based Registry）和基于Hive的注册表（Hive-Based Registry）。我们可以选择在Windows CE中使用任何一种注册表，注册表类型对于用户和应用程序来说是透明的。  
&#61548;基于RAM的注册表  
正如其名，基于RAM的注册表把整个注册表作为一个对象存储堆存放在系统的内存中。这意味着如果对系统进行冷启动或者系统断电，对注册表的所有改动都会丢失。  
如果使用基于RAM的注册表，对注册表的读写访问操作会变得非常高效。因此基于RAM的注册表比较适用于没有外部存储，而且有电池保存内存数据（battery-backed RAM）的设备。如果有外存且经常冷启动的设备采用基于RAM的注册表，则需要在系统断电的时候对注册表进行保存，等系统再次启动时对保存的注册表进行还原。  
Windows CE提供了两种方法用来断电保存基于RAM的注册表：  
1. Windows CE提供了两个系统API用来保存和还原整个注册表，它们的原形如下：  
BOOL RegCopyFile(   
  LPCWSTR lpszFile // 保存注册表信息的文件的名字  
);  
BOOL RegRestoreFile(   
  LPCWSTR lpszFile // 保存注册表信息的文件的名字  
);  
如果要保存和恢复注册表，我们只需要在系统断电的时候调用RegCopyFile函数将整个注册表保存为外存上的一个文件。当系统重新启动时，我们再调用RegRestoreFile函数将文件全部读出RAM中，然后再热启动系统，我们保存得注册表就可以生效了。值得注意的是这次热启动是必须的，因为只有在系统启动的时候才会去检测RegRestoreFile放在RAM里的注册表信息。这种方法的优点是完全可以使用应用程序来实现基于RAM的注册表的保存，而且这种方法相对简单。但是此方法的缺点是需要两次启动。因此效率相对比较低。  
2. 第二种方法需要OEM的参与，OEM可以在BSP的OAL层中实现WriteRegistryToOEM和ReadRegistryFromOEM两个函数，它们的声明为：  
DWORD ReadRegistryFromOEM(  
  DWORD dwFlags, // 参数， REG\_READ\_BYTES_START表示读新的注册表  
  LPBYTE lpData, // 指向注册表数据的缓冲区，由OS分配  
  DWORD cbData // 缓冲区的大小  
);  
BOOL WriteRegistryToOEM(   
  DWORD dwFlags, // 参数，REG\_WRITE\_BYTES_START表示写新的注册表  
  LPBYTE lpData, // 指向注册表数据的缓冲区，由OS分配  
  DWORD cbData // 缓冲区的大小，0表示到达注册表尾部  
);  
Windows CE会在系统启动和关闭的时候调用这两个函数来保存和恢复注册表。此种方法虽然可以避免两次启动，但是困难的地方是ReadRegistryFromOEM函数的实现比较困难，因为在系统启动的时候，块设备驱动和文件系统的驱动都还没有加载，因此不能使用CreateFile，ReadFile这样的文件系统API来实现ReadRegistryFromOEM函数，只能使用一些更底层的操作来实现。  
&#61548;基于Hive的注册表  
自从Windows CE 4.0之后，Windows CE提供了基于Hive的注册表。基于Hive的注册表把注册表数据存放在文件系统的文件上，这种文件被称作蜂箱Hive。这就意味着不再需要在系统断电和启动时进行保存恢复注册表操作。  
Hive是注册表中的一组键，子键和值。Hive是文件系统上表现为单个文件。Windows CE中有三种Hive。  
类型文件描述  
Boot hiveROM中的Boot.hvHKEY\_LOCAL\_MACHINE, HKEY\_CLASSES\_ROOT, HKEY_USERS中的所有数据。只在启动时使用。  
System hive由OEM决定  
（通常是System.hv）HKEY\_LOCAL\_MACHINE, HKEY\_CLASSES\_ROOT, HKEY_USERS中的所有数据。包含设备范围内不随着用户改变而改变的数据。  
User hiveUser.hvHKEY\_CURRENT\_USER下的所有数据。 包含用户特有的设置，每个用户都有一个单独的User.hv。  
基于Hive的注册表适用于对于有永久存储并且需要经常冷启动的设备。我们也可以看到，基于Hive的注册表把系统数据和用户数据分开存放，这就意味着基于Hive的注册表还提供多用户支持。对于每一个用户，可以提供不同的User.hv，当用户登录时加载相应的User.hv，从而达到多用户目的。