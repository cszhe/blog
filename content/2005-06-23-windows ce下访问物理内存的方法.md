---
id: 9792
title: Windows CE下访问物理内存的方法
date: 2005-06-23T21:19:32+00:00
author: omale
layout: post
guid: http://hezongjian.com/blog/?p=9792
permalink: '/2005/06/23/windows-ce%e4%b8%8b%e8%ae%bf%e9%97%ae%e7%89%a9%e7%90%86%e5%86%85%e5%ad%98%e7%9a%84%e6%96%b9%e6%b3%95/'
category:   嵌入式  
tags:   Windows CE
  - 嵌入式
---
嵌入式设备与桌面PC的一个显著不同是它的应用程序中通常需要直接访问某一段物理内存，这在驱动程序中对物理内存的访问尤为重要，尤其是像ARM体系结构下，I/O端口也被映射成某一个物理内存地址。因此，与桌面版本Windows相比，Windows CE提供了相对简单的物理内存访问方式。无论是驱动程序还是应用程序都可以通过API访问某一段物理内存。  
Windows CE的有些函数中需要用到物理内存结构体PHYSICAL\_ADDRESS， Windows CE在ceddk.h中定义了PHYSICAL\_ADDRESS，它其实是LARGE_INTEGER类型，其定义如下：  
<font color='#008000' >// in ceddk.h</font>  
<font color='#0000ff' >typedef</font> LARGE\_INTEGER PHYSICAL\_ADDRESS, *PPHYSICAL_ADDRESS;  
<font color='#008000' >// in winnt.h</font>  
<font color='#0000ff' >typedef</font> <font color='#0000ff' >union</font> \_LARGE\_INTEGER{  
  <font color='#0000ff' >struct</font>{  
    DWORD LowPart;  
    <font color='#0000ff' >LONG</font> HighPart;  
  };  
  LONGLONG QuadPart;  
} LARGE_INTEGER;  
可见，Windows CE中用64个Bit来代表物理地址，对于大多数32位的CPU而言，只需要把它的HighPart设置为0就可以了。  
如果要直接访问某一个地址的物理内存，Windows CE提供了VirtualAlloc()和VirtualCopy()函数，VirtualAlloc负责在虚拟内存空间内保留一段虚拟内存，而VirtualCopy负责把一段物理内存和虚拟内存绑定，这样，最终对物理内存的访问还是通过虚拟地址进行。它们的声明如下：  
<font color='#008000' >// 申请虚拟内存</font>  
LPVOID VirtualAlloc(  
  LPVOID lpAddress,         <font color='#008000' >// 希望的虚拟内存起始地址</font>  
  DWORD dwSize,                 <font color='#008000' >// 以字节为单位的大小</font>  
  DWORD flAllocationType,     <font color='#008000' >// 申请类型，分为Reserve和Commit</font>  
  DWORD flProtect             <font color='#008000' >// 访问权限</font>  
);  
<font color='#008000' >// 把物理内存绑定到虚拟地址空间</font>  
<font color='#0000ff' >BOOL</font> VirtualCopy(   
  LPVOID lpvDest,             <font color='#008000' >// 虚拟内存的目标地址</font>  
  LPVOID lpvSrc,             <font color='#008000' >// 物理内存地址</font>  
  DWORD cbSize,                 <font color='#008000' >// 要绑定的大小</font>  
  DWORD fdwProtect             <font color='#008000' >// 访问权限</font>  
);  
VirtualAlloc对虚拟内存的申请分为两步，保留MEM\_RESERVE和提交MEM\_COMMIT。其中MEM\_RESERVE只是在进程的虚拟地址空间内保留一段，并不分配实际的物理内存，因此保留的虚拟内存并不能被应用程序直接使用。MEM\_COMMIT阶段才真正的为虚拟内存分配物理内存。  
下面的代码显示了如何使用VirtualAlloc和VirtualCopy来访问物理内存。因为VirtualCopy负责把一段物理内存和虚拟内存绑定，所以VirtualAlloc的时候只需要对内存保留，没有必要提交。  
FpDriverGlobals =   
(PDRIVER_GLOBALS) VirtualAlloc(  
    0,   
    DRIVER\_GLOBALS\_PHYSICAL\_MEMORY\_SIZE,   
    MEM_RESERVE,   
    PAGE_NOACCESS);  
 <font color='#0000ff' >if</font> (FpDriverGlobals == NULL) {  
    ERRORMSG(DRIVER\_ERROR\_MSG, (TEXT(<font color='#ff00ff' >&#8221; VirtualAlloc failed!\r\n&#8221;</font>)));  
    <font color='#0000ff' >return</font>;  
 }  
 <font color='#0000ff' >else</font> {  
    <font color='#0000ff' >if</font> (!VirtualCopy(  
    (PVOID)FpDriverGlobals,   
    (PVOID)(DRIVER\_GLOBALS\_PHYSICAL\_MEMORY\_START),   
    DRIVER\_GLOBALS\_PHYSICAL\_MEMORY\_SIZE,   
    (PAGE\_READWRITE | PAGE\_NOCACHE))) {  
       ERRORMSG(DRIVER\_ERROR\_MSG, (TEXT(<font color='#ff00ff' >&#8220;VirtualCopy failed!\r\n&#8221;</font>)));  
       <font color='#0000ff' >return</font>;  
    }  
 }  
CEDDK还提供了函数MmMapIoSpace用来把一段物理内存直接映射到虚拟内存。用MmMapIoSpace申请的内存要用MmUnmapIoSpace释放，此函数的原形如下：  
PVOID MmMapIoSpace(   
  PHYSICAL_ADDRESS PhysicalAddress,     <font color='#008000' >// 起始物理地址</font>  
  ULONG NumberOfBytes,                     <font color='#008000' >// 要映射的字节数</font>  
  BOOLEAN CacheEnable                     <font color='#008000' >// 是否缓存</font>  
);

<font color='#0000ff' >VOID</font> MmUnmapIoSpace(   
  PVOID BaseAddress,                     <font color='#008000' >// MmMapIoSpace返回的起始虚拟地址</font>  
  ULONG NumberOfBytes                     <font color='#008000' >// </font>  
);  
其实，MmMapIoSpace函数内部也是调用VirtualAlloc和VirtualCopy函数来实现物理地址到虚拟地址的映射的。MmMapIoSpace函数的原代码是公开的，我们可以从%_WINCEROOT%\<font color='#0000ff' >PUBLIC</font>\COMMON\OAK\DRIVERS\CEDDK\DDK\_MAP\ddk\_map.c得到。从MmMapIoSpace的实现我们也可以看出VirtualAlloc和VirtualCopy的用法：  
PVOID MmMapIoSpace (  
    <font color='#0000ff' >IN</font> PHYSICAL_ADDRESS PhysicalAddress,  
    <font color='#0000ff' >IN</font> ULONG NumberOfBytes,  
    <font color='#0000ff' >IN</font> BOOLEAN CacheEnable  
    )  
{  
PVOID pVirtualAddress; ULONGLONG SourcePhys;   
ULONG SourceSize; <font color='#0000ff' >BOOL</font> bSuccess;

    SourcePhys = PhysicalAddress.QuadPart & ~(PAGE_SIZE &#8211; 1);  
    SourceSize = NumberOfBytes + (PhysicalAddress.LowPart & (PAGE_SIZE &#8211; 1));

    pVirtualAddress = VirtualAlloc(0, SourceSize, MEM\_RESERVE, PAGE\_NOACCESS);  
    <font color='#0000ff' >if</font> (pVirtualAddress != NULL)  
    {  
        bSuccess = VirtualCopy(
  
  
            pVirtualAddress, (PVOID)(SourcePhys >> 8
  
), SourceSize,  
            PAGE\_PHYSICAL | PAGE\_READWRITE | (CacheEnable ? 0 : PAGE_NOCACHE));

        <font color='#0000ff' >if</font> (bSuccess) {  
            (ULONG)pVirtualAddress += PhysicalAddress.LowPart & (PAGE_SIZE &#8211; 1);  
        }  
        <font color='#0000ff' >else</font> {  
            VirtualFree(pVirtualAddress, 0, MEM_RELEASE);  
            pVirtualAddress = NULL;  
        }  
    }  
    <font color='#0000ff' >return</font> pVirtualAddress;  
}  
此外，Windows CE还供了AllocPhysMem函数和FreePhysMem函数，用来申请和释放一段连续的物理内存。函数可以保证申请的物理内存是连续的，如果函数成功，会返回虚拟内存的句柄和物理内存的起始地址。这对于DMA设备尤为有用。在这里就不详细介绍了，读者可以参考Windows CE的联机文档。