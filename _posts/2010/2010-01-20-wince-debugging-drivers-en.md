---
title: "[Repost] General Methods for Debugging Drivers under WINCE"
lang: en
date: 2010-01-20T23:51:53+00:00
author: omale
layout: post
category:   Embedded
tags:
  - Embedded
  - Software
slug: general-methods-for-debugging-wince-drivers
original: /zhuan-tie-wincexia-diao-shi-qu-dong-de-yi-ban-fang-fa
ai_translated: true
---
<span style="font-family: verdana; line-height: 21px;"></p> 

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
  I don't normally repost (except for Dean Wan's classic of classics). Today I stumbled upon an article that reminded me of my own days fumbling with driver development on CE. For those new to embedded development, some basic methods and mindsets do require a "brain reset."
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
  This article is clearly the author's experience summary. Although I don't fully agree with some points, I'll keep it as-is. It will definitely help those who are still exploring.
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
   
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
  Original URL: <a href="http://blog.csdn.net/xqhrs232/archive/2009/11/27/4888577.aspx">http://blog.csdn.net/xqhrs232/archive/2009/11/27/4888577.aspx</a>
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
  <br />1. Print messages via serial port &#8212; only suitable for general messages. Don't print in real-time critical sections because serial printing is slow. If you must print, keep it minimal and selective &#8212; e.g., print once every 100 times.
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
      // Serial printing can also roughly analyze inter-thread lock contention on shared resources<br />    <br />
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
  2. Write LOG files &#8212; file writing is faster than serial printing. LOGs are suitable for analyzing large amounts of data.
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
  3. Use static variables flexibly &#8212; static variables have memory retention. Use this to diagnose program reliability &#8212; especially in interrupt reception. Storing tens of KB of data then writing to a LOG file is a good debugging method.
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
  4. Driver development often requires precise delays &#8212; correctly implementing US/MS delays is important.
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
  // WINCE microsecond delay function
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
  void delay_us(int n)<br />{
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    LARGE_INTEGER litmp; <br />  LONGLONG QPart1,QPart2; <br />  double dfMinus, dfFreq, dfTim;
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    if(QueryPerformanceFrequency(&litmp)==FALSE) <br />  { <br />       MessageBox(NULL,TEXT("Error: QueryPerformanceFrequency"),TEXT("Error"),MB_OK); <br />       return;
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
     }
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
     dfFreq = (double)litmp.QuadPart; <br />   QueryPerformanceCounter(&litmp); <br />   QPart1 = litmp.QuadPart;
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
    do <br />  { <br />   QueryPerformanceCounter(&litmp); <br />   QPart2=litmp.QuadPart; <br />   dfMinus=(double)(QPart2-QPart1); <br />   dfTim=dfMinus/dfFreq;
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
     }while(dfTim <0.000001*n);
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
  }
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
  // WINCE millisecond delay function
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
  void   delay_ms(DWORD   tmp_time)   <br />{   <br /> DWORD   start;   <br /> DWORD   time_i=0;   <br /> start=GetTickCount(); <br />  <br /> while(time_i<=tmp_time)   <br />  {   <br />     time_i=GetTickCount()-start;   <br />  }  
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
  }
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
  <br />5. Driver development usually involves interrupt handling &#8212; correctly implementing interrupt enable/disable at both AP and driver levels is essential.
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
  <br />   Especially when analyzing whether interrupts are working properly &#8212; capture a certain amount of interrupt data then disable interrupts to ensure received data isn't corrupted, so your analysis reflects reality.<br />   <br />   <br />   <br />6. Measure code execution time &#8212; use GetTickCount to roughly measure how long a section of code takes to execute, finding program hotspots.<br />   <br />    dwStartTickCount=GetTickCount( );<br />    <br />    <br />    <br />    ......XXXXXX<br />    <br />     // code snippet to measure<br />   <br />   <br />   dwEndTickCount=GetTickCount( );<br />   <br />   <br />7. Drivers require high real-time performance, so keep code streamlined and optimized.
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
      1》First, good algorithm selection and optimization<br />    2》Prefer addition/subtraction over multiplication/division<br />    3》Use bit-shift operations instead of multiplication/division<br />    4》Remove unnecessary variables in function calls, as each call involves push/pop operations; align variables to 32-bit<br />    5》Reduce multiple function calls; group related functionality into one function<br />    6》Memory COPY is faster than looped assignment<br />    7》Reduce nesting depth and iteration count<br />    8》Lower computational complexity<br />    9》Prefer library functions over custom ones; library functions are generally more reliable<br />    10》Proper selection of processes, threads, critical sections, message queues, and mutexes can simplify program logic and optimize resource contention<br />    11》Minimize compiler warnings and reduce forced type casting<br />    <br />    <br />    <br />8. Using the volatile qualifier &#8212; prevents unwanted optimization, forces re-read from memory. Many detailed articles online.
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
     <br />     Commonly used in interrupt handlers, where a variable switch is controlled by the AP at any time.
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
  <br />9. Check system error messages, analyze MAP files and COD files from compilation.
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
       1》For DATA ABORT errors, analyzing MAP files can pinpoint the offending function.<br />     2》Analyzing COD files can pinpoint the exact statement, though COD files are in assembly.<br />     <br />     <br />     <br />10. Using VIEWBIN/DUMPBIN/SET tools.
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        1》VIEWBIN is used to inspect NK contents, check if a driver is included in NK.<br />      2》DUMPBIN can show what function interfaces a driver exports.<br />      3》SET tool checks system environment variables.<br />      <br />      <br />11. WINCE Remote Tools.
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        1》Check memory status for leaks.<br />      2》Check registry to see if the driver has been loaded.<br />      3》Check CPU usage to understand system performance and whether your driver is consuming excessive CPU.<br />      4》File copy back and forth.<br />      <br />   <br />12. Using KITL &#8212; the KITL debugging approach.
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
       DEBUG can locate many issues &#8212; you can inspect variables, memory, and function call stacks.<br /> <br /> <br /> <br /> <br />13. Use GlobalMemoryStatus to periodically diagnose system memory status for insufficient memory or leaks.
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
        1》Pair malloc and free.<br />      2》Pair new and delete.<br />      3》Use delete[] for arrays allocated with new[].<br />      4》Properly release bitmaps/resources; correctly use DeleteObject/DeleteDC/ReleaseDC.<br />      5》Prevent wild pointers; safely use/release pointers; always check pointer validity before use.<br />      6》Prevent array access out of bounds.
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
  14. Variable and buffer placement &#8212; consider holistically whether to place on heap, stack, or globally.
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
  <br />15. Minimize dynamic and repeated memory allocation/deallocation &#8212; prone to fragmentation. For fixed-size allocations, consider using arrays instead.
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
  <br />16. When creating events bound to threads, it's best to name them &#8212; named events can be manipulated from the AP layer, allowing simulation of driver operations without actual hardware.
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
          Named events are unique system-wide; multiple opens reference the same event.
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
  <br />17. Flexibly define IOCTL macros for AP operations, allowing AP to simulate driver data formats and operations, making it possible to exercise the entire driver flow without actual hardware.
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
  18. WINCE Driver Debugging Assistant &#8212; very convenient to use, no need to update NK every time.
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
  19. CETK tool is worth a try, though I haven't used it much!
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
  20. There's also a tool by the talented we-hjb &#8212; <span style="line-height: 21px; text-decoration: underline;"><span style="line-height: 21px; color: #800080;">Register Read/Write Tool</span></span>, available for both WINCE50 and WINCE60.
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
      Allows you to inspect SFR configuration at any time. A very handy tool.
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
  21. Compile switches and debug code.
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
      1》Flexibly use #if/#else/#endif to switch between debug and production code.<br />    2》There's a school of thought: test-first. Write test code before writing production code. Code without tests is just garbage.
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
  <br />22. Flexible use of hardware tools:
</p>

<p style="margin-top: 1em; margin-right: 0px; margin-bottom: 0.5em; margin-left: 0px; padding: 0px;">
      1》Multimeter<br />    2》Oscilloscope &#8212; check waveform for interference, decide on pull-up resistors and their values.<br />    3》Logic analyzer &#8212; capture several KB of data for analysis; can analyze common bus protocols.<br />    4》Spectrum analyzer
</p>

<p>
  </span>
</p>
