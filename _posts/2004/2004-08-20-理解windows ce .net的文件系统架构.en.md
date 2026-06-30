---
title: Understanding Windows CE .NET File System Architecture
lang: en
date: 2004-08-20T17:38:35+00:00
author: omale
layout: post
category: embedded
tags:
  - Windows CE
slug: understanding-windows-ce-net-file-system-architecture
original: /li-jie-windows-ce-net-de-wen-jian-xi-tong-jia-gou
ai_translated: true
---

I translated an article today. The original text is from MSDN. I've been studying Windows CE file system architecture lately. The Object Store, RAM-based file system, and the file system that supports multiple block devices — it's really quite complex. I read a great article and wanted to save it for future reference. But it was in English, so I read it. My English is poor, so I translated it into Chinese. This also served as a reading exercise. The gist is below.

Windows CE .NET File System Architecture

Windows CE .NET includes a flexible file system that supports multiple storage media in multiple formats, including FATFS, UTFS, and TFAT. The file system architecture is layered, with each layer providing different services to applications and to other file system components.

File System Layer Components

Applications access files through the file system API. File system API calls are routed by the File System Manager (FSDMGR) to the appropriate file system driver. The File System Driver (FSD) Manager manages all file system drivers.

Figure 1. File System Architecture

The Object Store

When Windows CE boots, it creates the object store in RAM. The object store consists of the file system, the registry, and Windows CE databases. Although they all share the same heap (called the object store heap), data from each is stored independently.

The object store file system stores all files in the RAM-based file system by default. If an application does not specify a path (or uses a path without a storage card prefix), the object store file system is used. The RAM-based file system provides temporary file storage but is not persistent. When the system loses power, all data in the object store is lost unless the OEM provides a backup mechanism. The object store file system supports directories and files, and provides file filtering functionality. Through its implementation of Windows CE databases, it also supports database-like data access. The object store file system manages all data in the object store heap, allocating and freeing storage as needed.

External File Systems

To make Windows CE devices more useful, most Windows CE devices include additional storage media such as PC Card storage cards, CompactFlash cards, SmartMedia cards, or Microdrives. Windows CE supports these external media through installable file system drivers (FSDs).

To support external media, Windows CE includes:

- A block driver that provides block-level access to the underlying storage media.
- An FSD that provides file system-level support to the operating system and applications.

When a new storage card is inserted, the block driver detects the insertion and informs the FSD Manager. The FSD Manager dynamically loads the appropriate FSD. The FSD then mounts the storage media. This allows applications to access files on external storage devices just like files on the object store.

Windows CE .NET also supports the TFAT (Transaction-Safe FAT) file system, which adds transaction safety to the standard FAT file system. TFAT prevents data corruption and maintains data integrity even when power is lost during file system operations.

The RAM and ROM File System (Continued)

Since ROM is read-only, files stored in ROM cannot be modified. To work around this, Windows CE .NET implements a file system that combines RAM and ROM. This mechanism is a bit different from the object store file system. It provides read-only access to files stored in ROM modules.

XIP (Execute In Place) Technique

Windows CE supports XIP — executing code directly from ROM without copying it to RAM. This saves RAM space and improves performance. The file system also uses XIP to map ROM files directly into memory.

Summary

Windows CE .NET's file system architecture is flexible and modular, supporting various storage media through a layered approach. Understanding this architecture helps developers make better use of storage resources in Windows CE devices.
