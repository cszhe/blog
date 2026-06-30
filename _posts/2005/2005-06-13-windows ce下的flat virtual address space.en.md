---
title: Flat Virtual Address Space under Windows CE
lang: en
date: 2005-06-13T09:08:54+00:00
author: omale
layout: post
category: embedded
tags:
  - Windows CE
  - Embedded
slug: flat-virtual-address-space-windows-ce
original: /2005-06-13-windows ce下的flat virtual address space
ai_translated: true
---

On 6/10/05, song titan wrote:
>
> I often read in books about "flat virtual address space." Combined with what we discussed last time about private data protection within processes in WinCE — I just thought about it, can I understand it this way?
>
> Because embedded storage media includes many types: RAM, ROM, FLASH, etc., the MMU maps all of these to a flat virtual address space. This way, non-contiguous memory can be made contiguous through page tables. Hence the name "flat."
>
> Also, last time you mentioned that if "Enable kernel debug" is selected, there's no slot boundary, and process private data can't be protected. I recall that in desktop Windows, the MMU controls this read/write permission — so here, is this permission mechanism just disabled?

I think "flat" means all processes share a single address space. After enabling Full Kernel Mode, the boundaries between slots are removed — it's as if all 32 processes are actually one process. However, MMU protection still exists. For example, if a memory region is read-only in process A, then all processes can read it. But if any process tries to write to that memory, it will cause an access violation.

