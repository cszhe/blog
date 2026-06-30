---
title: Building Managed C# with PB 5.0 Command Line
lang: en
date: 2005-08-01T18:31:38+00:00
author: omale
layout: post
category: uncategorized
tags:
  - C++
  - Microsoft
slug: building-managed-csharp-with-pb5-command-line
original: /2005-08-01-用platform builder 5.0命令行编译托管c#代码
ai_translated: true
---

Microsoft's MSDN documentation doesn't介绍 (introduce) using command-line tools to compile managed code — it only covers compiling C/C++ with sources and dirs. But every time we compile code through the command line, we eventually see a listing like this:

```
BUILD: [00:00000000PROGC ] Files
BUILD: [00:00000000PROGC ] Midl                    0
BUILD: [00:00000000PROGC ] Resource                1
BUILD: [00:00000000PROGC ] Message                 0
BUILD: [00:00000000PROGC ] Precomp Header          1
BUILD: [00:00000000PROGC ] C/Cpp/Cxx              1
BUILD: [00:00000000PROGC ] Assembler               0
BUILD: [00:00000000PROGC ] Static Libraries        0
BUILD: [00:00000000PROGC ] Dll's                   0
BUILD: [00:00000000PROGC ] Exe's                   0
BUILD: [00:00000000PROGC ] Resx                    0
BUILD: [00:00000000PROGC ] Csharp Targets          0
BUILD: [00:00000000PROGC ] Other                   0
BUILD: [00:00000000PROGC ]
BUILD: [00:00000000PROGC ] Total                   3
```

Notice this line: "Csharp Targets — 0" — C# Target? Yes! If the Build System really didn't support compiling managed code, why would this提示 (prompt) exist? I had a hunch that Microsoft added something in Windows CE 5.0.

Today I stumbled upon the makefile.def file — which every makefile includes and plays a critically important role in the build system. I found大量 (extensive) descriptions of managed code:

```
RELEASETYPE=DEFAULT
!ELSEIF "$(RELEASETYPE)" == "SDK"
!ELSEIF "$(RELEASETYPE)" == "OAK"
!ELSEIF "$(RELEASETYPE)" == "DDK"
!ELSEIF "$(RELEASETYPE)" == "MANAGED"     // Note this!!
!ELSEIF "$(RELEASETYPE)" == "PLATFORM"
!ELSEIF "$(RELEASETYPE)" == "LOCAL"
!ELSEIF "$(RELEASETYPE)" == "CETK"
!ELSEIF "$(RELEASETYPE)" == "CUSTOM"
```

After careful theoretical deduction, I believe Windows CE 5.0's Build System can directly compile C# code. Time to try it myself.

Created a directory called "manage" under a platform, wrote hello.cs at lightning speed:

```csharp
using System;

namespace Hello
{
    class Hello
    {
        public static void Main(String [] args)
        {
            System.Console.WriteLine("Hello World");
        }
    }
}
```

Then created the makefile — just the one eternal line:

```
!INCLUDE $(_MAKEENVROOT)\makefile.def
```

The sources file is the key:

```
__PROJROOT= E:\WINCE500\PBWorkspaces\Test\manage
RELEASETYPE=MANAGED
TARGETTYPE=MANAGED_EXE
TARGETNAME=Hello
MANAGED_REFERENCES = mscorlib.dll;System.dll

SOURCES= \
  hello.cs \
```

Both RELEASETYPE and TARGETTYPE must be set to undocumented types: MANAGED and MANAGED_EXE. MANAGED_REFERENCES lists other DLL references — must include mscorlib.dll and System.dll, separated by semicolons.

Then opened the Release Directory in PB, CD'd to the Manage directory, ran `build -c` — 0 errors, 0 warnings. Found Hello.exe in the `\oak\target\MANAGED\debug` directory.

Done! Although undocumented, compiling managed code under Platform Builder is indeed feasible.

