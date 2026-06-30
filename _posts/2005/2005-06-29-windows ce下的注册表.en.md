---
title: Windows CE Registry
lang: en
date: 2005-06-29T18:22:56+00:00
author: omale
layout: post
category: embedded
tags:
  - Windows CE
  - Embedded
slug: windows-ce-registry
original: /2005-06-29-windows ce下的注册表
ai_translated: true
---

Like desktop Windows, Windows CE uses the registry to save application, driver, and user settings, along with other configuration information. The Windows CE registry also uses a tree structure to manage configuration data. Since its structure and functionality are almost identical to desktop Windows, I won't详细介绍 (detail it) here — readers can参考 (refer to) other resources on the registry.

Windows CE supports four root keys:

| Key | Description |
|---|---|
| HKEY_LOCAL_MACHINE | Hardware and driver configuration data |
| HKEY_CURRENT_USER | User configuration data |
| HKEY_CLASSES_ROOT | OLE and file type association configuration data |
| HKEY_USERS | Data applicable to all users |

Due to embedded system characteristics, some devices have no external storage. Therefore Windows CE provides two registry implementations: RAM-Based Registry and Hive-Based Registry. Either can be used; the type is transparent to users and applications.

**RAM-Based Registry**

As the name suggests, the RAM-based registry stores the entire registry as an object store heap in system memory. This means all changes are lost on cold boot or power loss.

RAM-based registry read/write access is very efficient, making it suitable for devices without external storage that have battery-backed RAM. For devices with external storage that frequently cold boot, the registry must be saved on power loss and restored on next boot.

Windows CE provides two methods to save the RAM-based registry on power loss:

1. Two system APIs for saving and restoring the entire registry:
   ```cpp
   BOOL RegCopyFile(LPCWSTR lpszFile);      // File to save registry info
   BOOL RegRestoreFile(LPCWSTR lpszFile);   // File with saved registry info
   ```
   Call RegCopyFile on power loss to save the registry to a file, then RegRestoreFile on restart to load it into RAM, followed by a warm boot. The warm boot is necessary because the system only detects RegRestoreFile's registry data at startup. This method is simple but requires two boots, making it relatively inefficient.

2. OEMs can implement `WriteRegistryToOEM` and `ReadRegistryFromOEM` in the BSP's OAL layer:
   ```cpp
   DWORD ReadRegistryFromOEM(DWORD dwFlags, LPBYTE lpData, DWORD cbData);
   BOOL WriteRegistryToOEM(DWORD dwFlags, LPBYTE lpData, DWORD cbData);
   ```
   Windows CE calls these at system startup and shutdown to save/restore the registry. This avoids double booting, but implementing ReadRegistryFromOEM is difficult — at startup, block device and file system drivers aren't loaded yet, so file system APIs like CreateFile/ReadFile can't be used; only lower-level operations work.

**Hive-Based Registry**

Since Windows CE 4.0, the hive-based registry has been available. It stores registry data in file system files called hives. This eliminates the need for save/restore operations on power loss or startup.

A hive is a group of keys, subkeys, and values in the registry, appearing as a single file on the file system. Windows CE has three types of hives:

| Type | File | Description |
|---|---|---|
| Boot hive | Boot.hv in ROM | Contains HKEY_LOCAL_MACHINE, HKEY_CLASSES_ROOT, HKEY_USERS. Used only at boot. |
| System hive | Determined by OEM (usually System.hv) | Contains HKEY_LOCAL_MACHINE, HKEY_CLASSES_ROOT, HKEY_USERS. Device-scoped data that doesn't change with user. |
| User hive | User.hv | Contains HKEY_CURRENT_USER. User-specific settings; each user has a separate User.hv. |

The hive-based registry is suitable for devices with permanent storage that frequently cold boot. It separates system and user data, providing multi-user support — different User.hv files can be loaded when different users log in.

