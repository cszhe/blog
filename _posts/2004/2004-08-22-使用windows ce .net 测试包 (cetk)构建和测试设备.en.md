---
title: Using Windows CE .NET Test Kit (CETK) to Build and Test Devices
lang: en
date: 2004-08-22T19:38:24+00:00
author: omale
layout: post
category: embedded
tags:
  - Windows CE
  - Embedded
slug: using-cetk-to-build-and-test-devices
original: /shi-yong-windows-ce-net-ce-shi-bao-cetk-gou-jian-he-ce-shi-she-bei
ai_translated: true
---

The Windows CE .NET Test Kit (CETK) is a testing tool for device drivers and system features. It includes various test cases for different driver types such as display drivers, audio drivers, keyboard drivers, touch screen drivers, etc.

CETK can run tests on both Windows CE devices and their emulators. Test results are logged and can be viewed on the development workstation.

CETK's testing approach includes:

1. Client-Server Architecture: CETK uses a client-server model. The development workstation runs the CETK server, and the Windows CE device runs the CETK client. The server sends test commands to the client, and the client executes them and returns results.

2. Test Modules: CETK includes test modules for various driver types. Each module contains multiple test cases covering different aspects of driver functionality, stress testing, and boundary conditions.

3. Automated Testing: CETK supports automated testing through scripts and command-line tools, allowing tests to be run without manual intervention.

4. Result Analysis: Test results are stored in a SQL database, making it easy to query, analyze, and compare results across different test runs.

Using CETK helps ensure driver quality and system stability for Windows CE devices.
