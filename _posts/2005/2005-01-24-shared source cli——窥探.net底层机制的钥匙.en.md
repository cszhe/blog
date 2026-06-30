---
title: Shared Source CLI — Key to .NET Internals
lang: en
date: 2005-01-24T19:32:58+00:00
author: omale
layout: post
category: uncategorized
tags:
  - C++
  - Microsoft
  - Software
slug: shared-source-cli-key-to-dotnet-internals
original: /2005-01-24-shared source cli——窥探.net底层机制的钥匙
ai_translated: true
---

**Editor's Note:** Microsoft released Visual Studio .NET in February 2002, ushering in the .NET era. Almost simultaneously, on March 27, 2002, Microsoft released the Shared Source Common Language Infrastructure (SSCLI). Two years on, many universities and institutions abroad have studied SSCLI and produced noteworthy projects. Domestically, however, discussion and research on SSCLI has been scarce. This article provides a brief introduction to SSCLI, hoping to spark interest among .NET enthusiasts.

**What is SSCLI?**

In August 2000, Microsoft, HP, and Intel jointly submitted the Common Language Infrastructure (CLI) and C# specifications to ECMA for international standardization. On December 13, 2001, the ECMA General Assembly approved C# (ECMA-334) and CLI (ECMA-335) as international standards. SSCLI is the implementation of these standards. It is non-commercial, shared-source software that compiles and runs on FreeBSD, Mac OS X, and Windows. Under non-commercial terms, we can compile, modify, and redistribute it. Note that SSCLI has minor implementation differences from Microsoft's commercial .NET Framework.

**What Does SSCLI Include?**

The official download is at http://msdn.microsoft.com/net/sscli — a 15MB archive containing 3,600,000 lines of code (by Microsoft's count: 27MB C/C++, 8MB C#, and some assembly). It consists of four major modules:

- Compilers and tools
- .NET Framework class libraries (partial)
- Common Language Runtime (CLR) and Execution Engine
- Platform Adaptation Layer, test code, and build tools

**Platform Adaptation Layer (PAL)**

The PAL provides a unified abstraction layer across different platforms. Code is in `sscli/pal`. PAL is a minimal subset of the Win32 API with only 397 functions, including 155 C runtime functions and 242 Win32 APIs covering process/thread management, memory management, thread synchronization, file management, I/O, and sockets. All upper-layer SSCLI code is implemented through these 397 APIs.

The `sscli/palrt` directory (PAL Runtime) provides a utility library including simple COM APIs, Crypt APIs for strong naming, math functions, URL/file path parsing — similar to the C Runtime library.

**Common Language Runtime (CLR) and Execution Engine**

This is the core CLI implementation at `sscli/clr/src/vm`, covering garbage collector, class loader, type system, AppDomain, assembly, reflection, and JIT compilation. This is arguably SSCLI's most valuable part — showing not just internal algorithms but how they work together.

**.NET Framework Class Libraries**

Partial open-source implementations of .NET framework classes including System.Text.RegularExpressions, System.Net, System.Xml — all written in C#. (ASP.NET, ADO.NET, and WinForms are unfortunately not included, probably due to cross-platform difficulties.) Source is in `sscli/fx/src`.

**Compilers and Tools**

SSCLI includes the full C# compiler (C++, `sscli/clr/src/csharp`) and JScript engine (C#). It also includes tools like CorDBG (managed code debugger), ILASM/ILDASM (IL assembler/disassembler), and GACUtil (Global Assembly Cache utility).

**What Can We Do?**

- Software engineers interested in JIT, GC, or .NET Framework internals can study CLI implementation.
- Architects can learn how to build large, cross-platform applications.
- Teachers can use the codebase for courseware.
- If you want to implement your own .NET-based compiler or CLI, this is an essential reference.

**Resources**

- *Shared Source CLI Essentials* (O'Reilly) — the only book on SSCLI, hard to find domestically.
- http://discuss.develop.com/dotnet-rotor.html — online discussion group with archives.
- ECMA-334 and ECMA-335 official specifications.
- Microsoft discussion group: microsoft.public.shared_source.cli
- https://mailserver.di.unipi.it/mailman/listinfo/dotnet-sscli — intermediate-level SSCLI mailing list.

