---
title: Windows CE .NET Advanced Memory Management
lang: en
date: 2004-03-31T22:26:19+00:00
author: omale
layout: post
category: embedded
tags:
  - Windows CE
  - Embedded
  - Programmer
slug: windows-ce-net-advanced-memory-management
original: /windows-ce-net-gao-ji-nei-cun-guan-li
ai_translated: true
---

Windows CE .NET Advanced Memory Management

Douglas Boling, Embedded Windows MVP

Boling Consulting

August 2002

Applies to:
    Microsoft Windows CE .NET
    Microsoft Windows CE 3.0
    Pocket PC 2002

Contents

Abstract
Living in a Box
Dynamic Link Library (DLL) Loading Issues

Abstract

One of the advantages of Microsoft Windows CE is its support for the Win32 API. Thousands of Windows programmers can leverage their Win32 API and MFC knowledge to transition to Windows CE with little difficulty. Windows CE implements a subset of the Win32 API, but programmers should not forget that Windows CE and Windows XP are two completely different operating systems with different requirements and implementations. Understanding how Windows CE implements Win32 compatibility helps us treat them differently when designing applications and diagnosing problems.

Memory management implementation differs significantly between Windows CE and Windows XP. Although Windows CE supports almost all Win32 memory management functions (except the deprecated global heap functions), the implementation of these memory management APIs is completely different. These differences can trip up those who don't understand the nuances between Windows CE and Windows desktop versions. To understand the issues, you must first understand how Windows CE manages memory.

System Memory Map

Both Windows XP and Windows CE are 32-bit operating systems, supporting 4GB of virtual address space. Windows XP divides this address space into two 2GB regions. The upper half is reserved for the system. The lower half is given to each running application.

Figure 1. Windows XP Virtual Memory Space

At first glance, Windows CE's virtual address space appears similarly organized, with a system reserved area and an application area. Figure 2 shows Windows CE's address space. In this case, the upper 2GB is also system reserved. The lower half is divided into multiple regions. The main portion, almost half the space, is defined as the Large Memory Area. This region is used for allocating large blocks of memory, typically memory-mapped files.

Below the Large Memory Area is another large region, marked as Reserved in the diagram. Below the Reserved area, at very low addresses, is a 64MB region. This 64MB region — more precisely, the lowest 32MB — is prepared for each running application.

Figure 2. Windows CE Virtual Memory Space

Windows CE Application Memory Map

The lowest 64MB of virtual address space is where Windows CE applications live. Figure 3 shows this application virtual address space. Application code is loaded at virtual address 0x10000, just like in Windows XP applications. When an application starts, the system reserves enough space for all code in the address space, and actual code can be paged into this address space as needed.

Above the code reserve area are memory pages reserved for read-only and read/write static data. Additionally, the system reserves an area for each thread of each executing application, used for the local heap and stack. The stack size reserved for each thread is determined at thread creation. Actual RAM is only committed as the stack grows. The heap, on the other hand, reserves an area that can grow on demand as RAM is allocated on the heap.

When Execute-in-Place (XIP) DLLs are loaded, they are loaded from the high end of the 64MB area downward. The address of each XIP DLL is determined when the ROM is manufactured. When a non-XIP DLL is loaded, it is loaded into the space below 32MB. Non-XIP DLLs, also called RAM-based DLLs, are loaded from the object store, decompressed from ROM, or loaded from external file systems like CompactFlash cards. The upper 32MB of the application's virtual memory space is used exclusively by XIP DLLs.

Figure 3. A Windows CE .NET Application Virtual Memory Space

Any other memory allocated by the application, whether creating separate heaps or calling VirtualAlloc directly, searches from low to high addresses until finding the first unallocated region that can satisfy the allocation.

Living in a Box

While the amount of available RAM is one constraint for Windows CE applications, the relatively small 32MB virtual address space is another major constraint. Although XIP DLLs are loaded above 32MB, all other memory allocations and any RAM-based DLLs must fit within the application's 32MB address space. This 32MB "box" isn't so much a problem for Windows CE programmers as it is a challenge to overcome.

To understand why this seemingly large memory becomes a constraint, you must understand how the VirtualAlloc API works. VirtualAlloc is the fundamental memory allocation call on all Microsoft Win32 operating systems. It allocates memory at the page level. A page is the smallest unit of memory the CPU can allocate and free. On Windows CE .NET, the CPU page size is 1024 or 4096 bytes depending on the CPU. 4KB is the most common size.

VirtualAlloc allocates memory in two steps. First, it reserves a region of virtual memory. This reservation does not consume any RAM; it merely prevents that virtual address space from being used in other ways. After the memory space is reserved, part or all of it can be committed, which maps real physical memory to the reserved region. VirtualAlloc can both reserve and commit memory. Its function prototype is:

LPVOID VirtualAlloc (LPVOID lpAddress, DWORD dwSize,
                     DWORD flAllocationType,
                     DWORD flProtect);

The first parameter of VirtualAlloc is the virtual address of the region to allocate. When using VirtualAlloc to commit previously reserved memory, the LpAddress parameter identifies the previously reserved block. If this parameter is NULL, the system decides where to allocate from, rounding the size to a 64KB boundary. The second parameter, dwSize, is the size of the region to allocate or reserve. Since this parameter is in bytes rather than pages, the system rounds the requested size up to the next page boundary.

The flAllocationType parameter specifies the allocation type. You can specify combinations of: MEM_COMMIT, MEM_AUTO_COMMIT, and MEM_RESERVE. MEM_COMMIT allocates usable memory for the program. MEM_RESERVE reserves a range of virtual address space for future commitment. Reserved pages cannot be accessed until VirtualAlloc is called again with MEM_COMMIT on that region. MEM_AUTO_COMMIT is Windows CE-specific and convenient, but is not the subject of this article.

Therefore, to allocate usable RAM with VirtualAlloc, an application must either call VirtualAlloc twice (once to reserve, once to commit), or call it once with both MEM_RESERVE and MEM_COMMIT flags combined.

Combining reserve and commit flags reduces code and is quick and simple. This technique is common in Windows XP applications but is not a good idea in Windows CE applications. The following code demonstrates the problem:

INT i;
PVOID pMem[512];

for (i = 0; i < 512; i++) {
   pMem[i] = VirtualAlloc (0, PAGE_SIZE, MEM_RESERVE | MEM_COMMIT,
                           PAGE_READWRITE);
}

This code seems harmless. It allocates 512 blocks of one page each. The problem is that on Windows CE, this code will always fail, even on a system with several megabytes of free memory. The reason is how Win32 operating systems reserve memory.

On Win32 operating systems, including Windows CE .NET, when virtual memory is reserved, the reserved region is aligned to 64KB boundaries. Therefore, the code above attempts to reserve 512 regions aligned to 64KB boundaries. The problem is that Windows CE applications must fit within a 32MB virtual address space. This space has only 512 64KB boundaries total, and some space is used by program code, the local heap, stack, and loaded DLLs. The code above typically fails after about 470 calls to VirtualAlloc.

The solution is to first reserve an entire region sufficient for the allocation, then commit RAM as needed:

INT i;
PVOID pBase, pMem[512];

pBase = VirtualAlloc (0, 512*PAGE_SIZE, MEM_RESERVE, PAGE_READWRITE);

for (i = 0; i < 512; i++) {
   pMem[i] = VirtualAlloc (pBase + (i * PAGE_SIZE), PAGE_SIZE,
                           MEM_COMMIT, PAGE_READWRITE);
}

We now understand the key to solving this problem. But this is just one of several impacts of the 512-region limit on Windows CE applications.

Allocating Large Memory Blocks

Another issue with living in the 32MB address space of Windows CE .NET applications is how to allocate large blocks of memory. If an application needs 8, 16, or 32MB of RAM for special requirements, but the entire application address space is limited to 32MB, how is memory allocated? The answer is a patch first used in early Windows CE .NET graphics drivers. If Windows CE .NET detects that VirtualAlloc has reserved a region larger than 2MB, that region is not reserved within the 32MB "box." It is reserved in the Large Memory Area, located below the 2GB system reserved space.

After the memory space is reserved, the application can commit specific pages within it by calling VirtualAlloc. This allows applications or drivers to use large blocks of memory, even while still living within the 32MB "box" constraint. The following code demonstrates allocating 64MB of space, then committing one page in the reserved region:

   PVOID ptrVirt, ptrMem;

   ptrVirt = VirtualAlloc (0, 1024 * 1024 * 64, MEM_RESERVE,
                        PAGE_NOACCESS);

   if (!ptrVirt) return 0;

   ptrMem = VirtualAlloc ((PVOID)((int)ptrVirt+4096),
                          4096, MEM_COMMIT, PAGE_READWRITE);

   if (!ptrMem) {
      VirtualFree (ptr, 0, MEM_RELEASE);
      return 0;
   }

   return ptrMem;

The code above also demonstrates a trick for using the virtual memory API directly. You can create huge arrays without consuming significant RAM. In the code above, the 64MB reserved region does not consume any physical memory. The only memory consumed in this example is one page, 4096 bytes, committed by the second call to VirtualAlloc.

Dynamic Link Library Loading Issues

Many Windows CE programmers are writing applications for Pocket PC 2002. Setting aside the memory architecture changes needed when moving to Windows CE .NET, there are still many DLL loading issues affecting Pocket PC 2002 programmers. To understand these, you must first understand the differences between Windows CE .NET and Windows CE 3.0, and how both versions load and manage DLLs.

One new feature of Windows CE .NET is the expansion of the application's virtual address space from 32MB to 64MB. The upper 32MB virtual address space for XIP DLLs was not available in Windows CE 3.0. Therefore, applications on Windows CE 3.0 systems had to load XIP DLLs, code, and all data into the 32MB virtual address space. Figure 4 shows the Windows CE 3.0 application memory space.

Figure 4. A Windows CE 3.0 Application Virtual Address Space

Because Pocket PC 2002 is based on Windows CE 3.0, this virtual memory limitation applies to all applications running on that platform.

DLL Loading

The technique Windows CE uses to load DLLs is the same as Windows CE .NET, except earlier Windows CE could not use the additional 32MB space for XIP DLLs that Windows CE .NET provides.

When a request to load a DLL is made, the kernel first checks if the DLL is already loaded by another application. If not, and the DLL is not an XIP DLL, the kernel uses a modified top-down search algorithm within the 32MB virtual memory map to find the first available space. The search algorithm is considered modified because it avoids addresses used by other DLLs, even those not loaded by the current process. This ensures every DLL in the system is loaded at a unique, non-overlapping address.

Unique addresses are necessary because if a DLL is loaded by more than one process, it must reside at the same virtual address in multiple processes. By loading each DLL at a unique address, the kernel ensures that if an application wants to load a DLL already loaded by another process, it can use the already-loaded DLL's virtual address. Figure 5 shows three processes, each loading a set of DLLs. DLL A is loaded at the same address by all three processes. Process 2 loads DLL C at a lower address than DLL B and DLL A in process 1. Process 3 later loads DLL A and its own DLL D. Note that in each process, the same DLL is loaded at the same address, and different DLLs are loaded at separate addresses.

Figure 5. Three Processes Loading a Set of DLLs

Now consider a potential problem. Suppose DLL C loaded by process 2 is very large, as shown in Figure 6. Process 3 would be unlucky if it is a large .exe file or tries to load DLLs after process 2 loads the huge DLL C. Obviously, process 3 will have trouble trying to load any DLL not already loaded by another process. This is a somewhat contrived example since the problem would only occur naturally if DLL C is unusually large or if process 2 loads many DLLs.

Figure 6. Three Processes Loading DLLs, Process 2 Loading a Very Large DLL

From ordinary DLL loading, we now turn to the more complex handling of XIP and non-XIP DLLs. Each XIP DLL's address is uniquely determined when the ROM is manufactured by the OEM. Thus, all XIP DLLs can be loaded without conflicts. Because they are XIP, the ROM containing the DLL code can be directly mapped into the virtual address space of any application that needs them. An XIP DLL cannot be rebased to another address when loaded by a process, because rebasing would require modifying read-only code.

When the kernel searches for free virtual address space for a non-XIP DLL, it starts searching from the lowest address of XIP DLLs. This is not the lowest address of XIP DLLs loaded by your application, but the lowest address of any XIP DLL in the entire system, regardless of whether it is loaded by your application. Again, this technique ensures every currently loaded DLL can be loaded by other processes. While this works well, sometimes DLLs cannot load due to Windows CE .NET's unique implementation on Pocket PC 2002.

Windows CE .NET's implementation on Pocket PC 2002 leverages a feature of Windows CE 3.0 that allows more than one ROM on a device. This permits multiple ROMs in a system even if they don't have contiguous physical addresses.

As mentioned earlier, DLLs are specially processed for XIP. Since basing a DLL requires changing its code, DLLs must be based when the ROM is manufactured. When the first ROM is manufactured, the ROM tool bases each DLL so it doesn't overlap with other DLLs in the same ROM.

Using multiple XIP regions means kernel designers had to revisit the DLL loading mechanism. To ensure XIP DLLs on multiple XIP regions never overlap, DLLs in the second ROM must be based at lower virtual addresses than the lowest DLL in the first ROM. If additional ROMs are used, DLLs in those XIP regions must also be based at even lower addresses.

Using multiple ROM images can be convenient in some ways. If an OEM or Microsoft wants to upgrade part of a Windows CE image, they can publish an upgrade package for a specific ROM rather than upgrading the entire system. To ensure upgrading one ROM doesn't require changes to other ROMs, Microsoft recommends that DLLs in lower-addressed images not be based at the lowest DLL address in the previous image. Instead, they should be based at even lower addresses, manually leaving virtual memory gaps between DLLs.

Microsoft's developers responsible for Pocket PC 2002 (based on Windows CE 3.0) took full advantage of multiple XIP regions. Most Pocket PC implementations have five or more XIP regions. The problem is that the gaps between these regions are too large. In Pocket PC 2002 images, the lowest XIP DLL is typically based below 0x0100000. Because Windows CE places RAM-based DLLs below the lowest XIP DLL, the space available for RAM-based DLLs, application code, its heap and stack is not the full 32MB virtual address space, but rather the space below the lowest XIP DLL — less than 16MB.

Figure 7 describes the Pocket PC 2002 problem. Note that the area reserved for XIP DLLs in virtual memory is very large. In fact, this diagram is conservative because on typical Pocket PC 2002 devices, the XIP DLL area usually occupies half the virtual memory space, which this diagram doesn't show. Note the loading of RAM-based DLLs A, B, C, and D occupy very low addresses in the virtual address space.

Figure 7. Loading DLLs on Pocket PC 2002 - XIP DLLs Occupy Large Virtual Address Space

To enable applications to handle large amounts of data cooperatively, developers had to use large databases in Windows CE applications. Large database engines are typically implemented as DLLs and are often very large. In the example above, the database DLL is the troublesome DLL C. With less than 16MB of available virtual memory space on Pocket PC 2002, and needing large RAM-based DLLs, many developers found their applications couldn't run — not due to lack of RAM, but lack of virtual memory space.

Consolidating DLLs

Several techniques can alleviate this pain on Pocket PC 2002. First, developers can reduce the number of DLLs by consolidating small DLLs into larger ones. Each DLL occupies at least 64KB. If an application has four 20KB DLLs, the total memory used is 256KB. By consolidating three DLLs into one larger DLL, the resulting DLL only consumes 64KB of virtual memory — the code is only 60KB, but the minimum footprint is 64KB. As a general rule, consolidate DLLs to a total size close to, but not exceeding, a multiple of 64KB. In applications with too many small DLLs, simply consolidating them into larger DLLs can solve DLL loading issues.

Moving DLL Code into the Application

Another technique is to move code from DLLs into the application itself, even if the code is shared among multiple processes. Sometimes replicating code across multiple processes is advantageous since different processes load independently (into different virtual address spaces).

Initially, moving code into the application might seem unhelpful — the code is still in the application's 32MB virtual space. However, the key is to create large applications that contain most business logic, and small applications that load and use RAM-based DLLs. If the large application needs services from a large DLL, it must use inter-process communication to have the small process call the DLL and pass return data back to the large application.

Defining DLL Load Order

When reducing DLL count and moving code into applications aren't enough, it's time for a more radical approach: manually specifying DLL load order. Load order matters because if a large DLL is loaded too early, it pushes down all subsequently loaded smaller DLLs. Typically, large DLLs are only used by one application. But if loaded too early, they affect other applications by pushing their load addresses too low.

The solution is to load small DLLs first, and the troublesome large DLL last, or even at the very end. This raises the question of how to force DLL load order. One method is to start different processes sequentially, but this also has problems.

Another way to define DLL load order is to write a small application that starts before the main application runs and loads RAM-based DLLs in a specific order by calling the Win32 API LoadLibrary. This DLL loader can persist for the main application's lifetime. It can even start the main application via CreateProcess and wait for it to exit using the returned process handle. This DLL loader won't use much RAM since the loaded DLLs will eventually be used by other processes.

All these methods for solving DLL loading issues on Pocket PC 2002 are somewhat hacky. None are elegant or easy to maintain. However, these are the solutions developers use in production. Future Pocket PC releases should address these issues, but for Pocket PC 2002 developers, creativity is paramount.

By understanding how Windows CE manages memory, developers can avoid pitfalls and diagnose problems faster. Knowing how Windows CE manages DLLs helps avoid potential problems in Pocket PC 2002 applications...
