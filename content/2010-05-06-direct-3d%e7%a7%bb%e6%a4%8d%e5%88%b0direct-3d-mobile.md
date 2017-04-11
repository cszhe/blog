---
id: 10382
title: Direct 3D移植到Direct 3D Mobile
date: 2010-05-06T23:22:12+00:00
author: omale
layout: post
guid: http://hezongjian.com/blog/?p=10382
permalink: '/2010/05/06/direct-3d%e7%a7%bb%e6%a4%8d%e5%88%b0direct-3d-mobile/'
category:   嵌入式  
---
最近有个项目，要把原本用Direct 3D 8和Direct 3D 9写的程序移植到基于Windows CE的嵌入式设备上去。嵌入式设备上用的Direct X版本与桌面截然不同，名字叫做Direct 3D Mobile（简称D3DM），顾名思义，是从Windows Mobile上挪到Windows CE上的feature之一。其实在D3DM之前，偶记得在遥远的Windows CE .NET 4.2时期，微软曾经在CE上做过桌面dx的支持，那时候api名字什么完全一样，估计后来发现实在不是个好主意，才另起炉灶了。

微软声称Direct 3D Mobile是针对嵌入式设备完全重写过的。其接口与桌面任何一个版本的Direct 3D版本都不大。其实呢，怎么可能重新发明轮子，接口跟桌面Direct X还是有些神似的。基本而言，D3DM其实是介于Dx8和dx9之间的一个接口。总结了一下，具体两者差距如下：

 

<p style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 13px; ">
  Direct3D Mobile上有，而桌面D3D没有的特性:
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
  <br style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; " /><br /> Direct3D8上有，而D3DM里面没有的特性:
</p>

<ul style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 2.5em; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 13px; ">
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">
    Programmable vertex/pixel shaders
  </li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">
    Cube maps
  </li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">
    Multiple swap chains
  </li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">
    Volume textures
  </li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">
    Spotlights
  </li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">
    Emissive lighting
  </li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">
    User clip planes
  </li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">
    Geometry blending
  </li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">
    Scissoring
  </li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">
    Render state blocks
  </li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">
    Higher-Order primitives
  </li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">
    DrawPrimitiveUP
  </li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">
    Point sprites
  </li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">
    D3D cursors
  </li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">
    Pure devices
  </li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">
    HEL TnL fallback
  </li>
  <li style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; ">
    D3DM supports a max of 4 texture stages
  </li>
</ul>

<p style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 0px; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 13px; ">
  <br style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; " /><br /> Direct3D9上有，D3DM里面也有的特性:
</p>

<ul style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0.5em; margin-right: 0px; margin-bottom: 1em; margin-left: 2.5em; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 13px; ">
  <li>
    StretchRect
  </li>
  <li>
    ColorFill
  </li>
  <li>
    Depth slope/scale bias
  </li>
</ul>

 

* * *

 

从代码层面上来说，改代码改得头昏脑胀，也总结一下，大概有如下要点：

1. 数据结构跟接口的名称。为了凸显不同，Direct 3D Mobile把桌面的接口，结构体，枚举体都改了名字，例如：

  * IDirect3DDevice8 -> IDirect3DMobileDevice // 接口
  * D3DFORMAT -> D3DMFORMAT // 枚举
  * D3DCOLOR\_ARGB -> D3DMCOLOR\_ARGB // 宏
  * D3DMATRIX -> D3DMMATRIX // 结构体
  * D3DBLEND\_SRCCOLOR -> D3DMBLEND\_SRCCOLOR // 枚举体中的项，这个最恶了&#8230;..

代码移植第一步就是改这些该死的东西，绝对会让你崩溃。如果你还没有崩溃，那接着往下看：

2. 数据类型。由于嵌入式设备不像桌面CPU那么牛叉，浮点数是必备单元。很多可怜的嵌入式设备上都是软件模拟浮点数，那个速度就提也不要提了。更可怜的软件模拟浮点都没有，C语言里面写个WhatAMess = 3.2 / 2.1; 就莫名其妙报错了。D3DM为了照顾广大贫下中农，同时支持浮点数和整形数据结构。

一开始看着比较纳闷，D3DM里面所有的数据结构都是D3DMVALUE类型的，而在头文件里面，这个宏是这么定义的：

`typedef signed int D3DMVALUE<br />
` 

还以为D3DM只支持定点运算，后来发现，原来虽然这个宏被定义成了整形，但是其实可以把它当成浮点型来用。方法是通过一个inline函数来变换的。

 

`inline D3DMVALUE D3DM_MAKE_D3DMVALUE(float Value)`

`{`

`typedef int float_and_D3DMVALUE_arent_of_the_same_size[sizeof(D3DMVALUE) == sizeof(float)];`

`return *reinterpret_cast<D3DMVALUE *>(&Value);`

`}`

当然，这个函数还提供了double，char等不同的版本，都差不多。可以看出来，如果不跟int大小一样，就会定义一个大小为0的数组，编译器肯定报错了，如果跟int大小一样，就直接用c++里面最牛叉的转换&mdash;&mdash;<span class="Apple-style-span" style="font-family: monospace; ">reinterpret_cast给转过去了。所以float是可以安全转成<span class="Apple-style-span" style="font-family: Arial, Verdana, sans-serif; ">D3DMVALUE类型的。</span></span>

所以在代码层面，如果你打算用定点，那好，把所有的原代码中的float型都改掉，累吧！如果你怕累，或者机器上有浮点单元，也不能直接编译，需要在所有的给D3DMVALUE赋值的语句中加一行函数，<span class="Apple-style-span" style="font-family: monospace; ">D3DM_MAKE_D3DMVALUE。否则编译器虽然报的是warning，但是跑起来必定是error，因为编译器帮你把float强转成int了。</span>

3. 未完待续。