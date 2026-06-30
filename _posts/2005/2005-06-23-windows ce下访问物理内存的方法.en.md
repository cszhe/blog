---
title: Accessing Physical Memory under Windows CE
lang: en
date: 2005-06-23T21:19:32+00:00
author: omale
layout: post
category: embedded
tags:
  - Windows CE
  - Embedded
slug: accessing-physical-memory-windows-ce
original: /2005-06-23-windows ce下访问物理内存的方法
ai_translated: true
---

A significant difference between embedded devices and desktop PCs is that applications often need to directly access physical memory. This is especially important in drivers, particularly under ARM architecture where I/O ports are also mapped to physical memory addresses. Compared to desktop Windows, Windows CE provides relatively simple physical memory access methods. Both drivers and applications can access physical memory through APIs.

Some Windows CE functions require the PHYSICAL_ADDRESS structure. Windows CE defines PHYSICAL_ADDRESS in ceddk.h as a LARGE_INTEGER type:

```cpp
// in ceddk.h
typedef LARGE_INTEGER PHYSICAL_ADDRESS, *PPHYSICAL_ADDRESS;
// in winnt.h
typedef union _LARGE_INTEGER{
  struct{
    DWORD LowPart;
    LONG HighPart;
  };
  LONGLONG QuadPart;
} LARGE_INTEGER;
```

So Windows CE uses 64 bits to represent a physical address. For most 32-bit CPUs, set HighPart to 0.

To directly access physical memory, Windows CE provides VirtualAlloc() and VirtualCopy(). VirtualAlloc reserves virtual memory space; VirtualCopy binds physical memory to that virtual memory. Ultimately, physical memory is still accessed through virtual addresses.

```cpp
// Reserve virtual memory
LPVOID VirtualAlloc(
  LPVOID lpAddress,         // Desired starting virtual address
  DWORD dwSize,             // Size in bytes
  DWORD flAllocationType,   // Allocation type: Reserve and Commit
  DWORD flProtect           // Access protection
);
// Bind physical memory to virtual address space
BOOL VirtualCopy(
  LPVOID lpvDest,           // Destination virtual address
  LPVOID lpvSrc,            // Physical memory address
  DWORD cbSize,             // Size to bind
  DWORD fdwProtect          // Access protection
);
```

VirtualAlloc has two steps: MEM_RESERVE (reserve virtual address space without allocating physical memory) and MEM_COMMIT (actually allocate physical memory). Since VirtualCopy handles the physical binding, VirtualAlloc only needs MEM_RESERVE, not MEM_COMMIT.

```cpp
FpDriverGlobals =
(PDRIVER_GLOBALS) VirtualAlloc(
    0,
    DRIVER_GLOBALS_PHYSICAL_MEMORY_SIZE,
    MEM_RESERVE,
    PAGE_NOACCESS);
if (FpDriverGlobals == NULL) {
    ERRORMSG(DRIVER_ERROR_MSG, (TEXT("VirtualAlloc failed!\r\n")));
    return;
}
else {
    if (!VirtualCopy(
    (PVOID)FpDriverGlobals,
    (PVOID)(DRIVER_GLOBALS_PHYSICAL_MEMORY_START),
    DRIVER_GLOBALS_PHYSICAL_MEMORY_SIZE,
    (PAGE_READWRITE | PAGE_NOCACHE))) {
       ERRORMSG(DRIVER_ERROR_MSG, (TEXT("VirtualCopy failed!\r\n")));
       return;
    }
}
```

CEDDK also provides MmMapIoSpace to directly map physical memory to virtual memory. Memory allocated with MmMapIoSpace must be freed with MmUnmapIoSpace:

```cpp
PVOID MmMapIoSpace(
  PHYSICAL_ADDRESS PhysicalAddress,     // Starting physical address
  ULONG NumberOfBytes,                  // Bytes to map
  BOOLEAN CacheEnable                   // Whether to cache
);

VOID MmUnmapIoSpace(
  PVOID BaseAddress,                    // Virtual address returned by MmMapIoSpace
  ULONG NumberOfBytes
);
```

In fact, MmMapIoSpace internally calls VirtualAlloc and VirtualCopy. Its source code is公开 (public), available at `%_WINCEROOT%\PUBLIC\COMMON\OAK\DRIVERS\CEDDK\DDK_MAP\ddk_map.c`. From MmMapIoSpace's implementation, we can see how VirtualAlloc and VirtualCopy are used:

```cpp
PVOID MmMapIoSpace (
    IN PHYSICAL_ADDRESS PhysicalAddress,
    IN ULONG NumberOfBytes,
    IN BOOLEAN CacheEnable
    )
{
    PVOID pVirtualAddress; ULONGLONG SourcePhys;
    ULONG SourceSize; BOOL bSuccess;

    SourcePhys = PhysicalAddress.QuadPart & ~(PAGE_SIZE - 1);
    SourceSize = NumberOfBytes + (PhysicalAddress.LowPart & (PAGE_SIZE - 1));

    pVirtualAddress = VirtualAlloc(0, SourceSize, MEM_RESERVE, PAGE_NOACCESS);
    if (pVirtualAddress != NULL)
    {
        bSuccess = VirtualCopy(
            pVirtualAddress, (PVOID)(SourcePhys >> 8), SourceSize,
            PAGE_PHYSICAL | PAGE_READWRITE | (CacheEnable ? 0 : PAGE_NOCACHE));

        if (bSuccess) {
            (ULONG)pVirtualAddress += PhysicalAddress.LowPart & (PAGE_SIZE - 1);
        }
        else {
            VirtualFree(pVirtualAddress, 0, MEM_RELEASE);
            pVirtualAddress = NULL;
        }
    }
    return pVirtualAddress;
}
```

Additionally, Windows CE provides AllocPhysMem and FreePhysMem for allocating and freeing contiguous physical memory — especially useful for DMA devices. These are not详细 (detailed) here; readers can refer to Windows CE online documentation.

