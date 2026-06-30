---
title: A Windows CE Memory Leak Debugging Experience
lang: en
date: 2004-11-03T00:41:00+00:00
author: omale
layout: post
category: uncategorized
tags:
  - Windows CE
  - Embedded
slug: debugging-windows-ce-memory-leak
original: /yi-ci-windows-cexia-diao-shi-nei-cun-xie-lu-de-jing-li
ai_translated: true
---

Last Tuesday, Professor Wan from the Software Institute called me. An electronic dashboard program written for the Automotive Institute had a serious memory leak. It had gotten so bad that Tongji's President Wan Gang needed it for a demo to leadership — it couldn't wait any longer.

This was an electronic instrument program that read car data (speed, fuel level, wheel RPM, etc.) from a serial port, parsed it, and displayed it on screen. Running on an Advantech 7230 dev board, it would pop up "Out of Memory!" within 10 seconds. In Windows CE, each process only has 32MB of virtual address space, and the program itself was about 4MB (lots of images).

I first tried compiling and running it on Windows (since it used standard Win32 APIs). Using LeakDiag and BoundsChecker from my GTEC days — no significant leaks detected. Only one un-released HBRUSH handle, which couldn't cause OOM. Process memory and GDI handles were stable. First attempt failed.

Since it leaked on CE but not Windows, I briefly suspected the BSP display driver, but dismissed it — if the display driver leaked, the whole system would crash.

Microsoft provides Remote Performance Monitor for CE via ActiveSync. I rebuilt the platform with ActiveSync support, ran the program, and used the monitor to track heap memory. After several rounds, I found five timer repaint functions causing leaks.

The code looked like this (simplified):

```cpp
void CEvcFCVDlg::ClockPainting_N(...)
{
    // ... setup code ...
    CDC MemDC;
    CBitmap MemBitmap;
    MemDC.CreateCompatibleDC(NULL);
    MemBitmap.CreateCompatibleBitmap(pDC, nWidth, nHeight);
    CBitmap *pOldBit = MemDC.SelectObject(&MemBitmap);
    // ... drawing operations ...
    pDC->BitBlt(0, 0, nWidth, nHeight, &MemDC, 0, 0, SRCCOPY);
    pWnd->ReleaseDC(pDC);
    MemBitmap.DeleteObject();
    MemDC.DeleteDC();
}
```

I traced the leak to `MemBitmap.CreateCompatibleBitmap()`. The bitmap wasn't being freed. But `DeleteObject()` was called! Checking MSDN: "Zero indicates the specified handle is not valid or is currently selected into a device context." Sure enough, `MemBitmap.DeleteObject()` returned 0 — the bitmap was still selected into `MemDC`.

I added `MemDC.SelectObject(pOldBit)` before `ReleaseDC`, and `DeleteObject()` succeeded. I rebuilt, deployed — 10 minutes later, no "Out of Memory" dialog. Fixed!

Walking back to the guesthouse, I felt exhilarated. It had been a long time since I felt that joy from coding.

Lessons learned:
1. Windows and Windows CE share Win32 APIs, but implementations differ
2. Windows debugging techniques can transfer to CE
3. Don't blame the OS — check your own code first
4. Enjoy the joy of coding!
