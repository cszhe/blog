---
title: Windows CE Error Reporting
lang: en
date: 2005-07-01T16:10:08+00:00
author: omale
layout: post
category: embedded
tags:
  - Windows CE
slug: windows-ce-error-reporting
original: /2005-07-01-windows ce下的错误报告
ai_translated: true
---

Error reporting is a new feature added in Windows CE 5.0, an optional OS component. Similar to the familiar Windows XP error reporting, when an application crashes, it automatically collects system and application state information (usually called a Dump File) and allows sending the collected information to Microsoft or the OEM to improve system reliability.

Windows CE provides two ways to obtain Dump Files: automatic mode and manual mode. In automatic mode, the system captures unhandled application exceptions (Second Chance Exception), automatically generates a dump file, and submits it to the server. In manual mode, we can call system API functions to manually create a dump file for a program at a certain moment, helpful for debugging. The most common use case: when a program deadlocks, we can use the function to manually create a dump file and analyze the cause.

Windows CE provides the function `CaptureDumpFileOnDevice` for manual dump capture:

```cpp
BOOL CaptureDumpFileOnDevice(
  DWORD dwProcessId,         // Process ID to capture dump for
  DWORD dwThreadId,          // Thread ID to capture dump for
  LPCWSTR pwzExtraFilesPath  // Optional, directory containing dump
);
```

Windows CE provides four types of Dump files, varying in size and content. Generally, larger dumps contain more information:

| Dump Type | Size | Description |
|---|---|---|
| Context dump | 4 KB, 64 KB | Crashed system info: exception, faulting thread context, loaded module list, thread list, call stack, 64 bytes around IP, 64KB faulting thread stack |
| System dump | 64 KB – several MB | All context dump info + all thread contexts/call stacks + full device module/process/thread list + 2048 bytes around IP + global variables of faulting process |
| Full dump | Physical memory size + at least 64 KB | All context dump info + complete映像 (image) of all used memory |

The Windows CE error reporting architecture is shown in the diagram. The system consists of four modules: Error Report Generation module, Error Report Transport Driver, Error Report Upload Client, and Error Report Control Panel Plug-in.

Users can configure the error reporting system through the Control Panel plug-in. When an unhandled exception occurs, the generation module captures it, generates a dump file, saves it to the file system via the transport driver, and finally sends it to Microsoft's server based on user choice.

