---
title: "Porting Direct3D to Direct3D Mobile"
lang: en
date: 2010-05-06T23:22:12+00:00
author: omale
layout: post
category:   Embedded
slug: porting-direct3d-to-direct3d-mobile
original: /direct-3dyi-zhi-dao-direct-3d-mobile
ai_translated: true
---
Recently I had a project to port programs originally written with Direct3D 8 and Direct3D 9 to Windows CE-based embedded devices. The DirectX version used on embedded devices is completely different from desktop, called Direct3D Mobile (D3DM for short). As the name suggests, it's one of the features ported from Windows Mobile to Windows CE. Actually, before D3DM, I recall that back in the Windows CE .NET 4.2 era, Microsoft once had desktop DX support on CE, with identical API names. They probably realized that wasn't a good idea and started fresh.

Microsoft claims Direct3D Mobile was completely rewritten for embedded devices. Its interfaces differ from any desktop Direct3D version. But really, how could they reinvent the wheel? The interfaces are somewhat similar to desktop DirectX. Basically, D3DM sits somewhere between DX8 and DX9. Let me summarize the differences:

<p style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 13px; ">
  Features in Direct3D Mobile but NOT in desktop D3D:
</p>

<ul style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 2.5em; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 13px; ">
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">
    Support for 16.16 fixed point data: vertex position, normal, texture coords, material colors, and matrices. All D3DM drivers must support both float and fixed point data, and reveal which of the two data types they prefer.
  </li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">
    Device Profiles, which should make it easier for ISVs to target a particular category of devices rather than having to write a lot of complex caps checking code.
  </li>
</ul>

<p style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 13px; ">
  <br style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; " /><br /> Features in Direct3D8 but NOT in D3DM:
</p>

<ul style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 2.5em; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 13px; ">
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">Programmable vertex/pixel shaders</li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">Cube maps</li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">Multiple swap chains</li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">Volume textures</li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">Spotlights</li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">Emissive lighting</li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">User clip planes</li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">Geometry blending</li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">Scissoring</li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">Render state blocks</li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">Higher-Order primitives</li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">DrawPrimitiveUP</li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">Point sprites</li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">D3D cursors</li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">Pure devices</li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">HEL TnL fallback</li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">D3DM supports a max of 4 texture stages</li>
</ul>

<p style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 13px; ">
  <br style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; " /><br /> Features in both Direct3D9 and D3DM:
</p>

<ul style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 2.5em; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 13px; ">
  <li>StretchRect</li>
  <li>ColorFill</li>
  <li>Depth slope/scale bias</li>
</ul>

* * *

From a code perspective, the porting was mind-numbing. Let me summarize the key points:

1. Data structure and interface names. To emphasize the difference, Direct3D Mobile renamed desktop interfaces, structs, and enums:

  * IDirect3DDevice8 -> IDirect3DMobileDevice
  * D3DFORMAT -> D3DMFORMAT
  * D3DCOLOR_ARGB -> D3DMCOLOR_ARGB
  * D3DMATRIX -> D3DMMATRIX
  * D3DBLEND_SRCCOLOR -> D3DMBLEND_SRCCOLOR (the worst one&#8230;)

Step one: rename all these damned things. It will drive you crazy. If you survive, read on:

2. Data types. Embedded devices don't have powerful desktop CPUs. Floating point isn't always available. Many poor embedded devices simulate floating point in software, which is painfully slow. Even worse, some have no floating point support at all &#8212; writing "float x = 3.2 / 2.1;" in C causes inexplicable errors. D3DM supports both floating-point and integer data structures to accommodate the masses.

At first I was puzzled. All D3DM data structures are of type D3DMVALUE, defined in the header as:

`typedef signed int D3DMVALUE;`

I thought D3DM only supported fixed-point. But actually, although this macro is defined as integer, you can use it as float through an inline conversion function:

`inline D3DMVALUE D3DM_MAKE_D3DMVALUE(float Value)`
`{`
`    typedef int float_and_D3DMVALUE_arent_of_the_same_size[sizeof(D3DMVALUE) == sizeof(float)];`
`    return *reinterpret_cast<D3DMVALUE *>(&Value);`
`}`

This function also provides double, char versions, etc. If D3DMVALUE isn't the same size as int, the zero-size array typedef triggers a compile error. If it matches, the cast goes through C++'s most powerful conversion &#8212; reinterpret_cast.

For code: if you want fixed point, change all floats in your original code (tedious!). If you're lazy or have an FPU, you still can't compile directly. Every assignment to D3DMVALUE needs a D3DM_MAKE_D3DMVALUE wrapper. Otherwise, the compiler gives a warning but runtime will error, because the compiler will truncate the float to int.

3. To be continued.
