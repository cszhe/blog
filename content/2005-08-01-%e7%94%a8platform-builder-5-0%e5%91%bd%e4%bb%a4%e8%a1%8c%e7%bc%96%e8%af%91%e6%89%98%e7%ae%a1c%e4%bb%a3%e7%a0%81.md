---
id: 9800
title: '用Platform Builder 5.0命令行编译托管C#代码'
date: 2005-08-01T18:31:38+00:00
author: omale
layout: post
guid: http://hezongjian.com/blog/?p=9800
permalink: '/2005/08/01/%e7%94%a8platform-builder-5-0%e5%91%bd%e4%bb%a4%e8%a1%8c%e7%bc%96%e8%af%91%e6%89%98%e7%ae%a1c%e4%bb%a3%e7%a0%81/'
category:   未分类
tags:   C++  , 微软
---
在微软的MSDN文档中，并没有介绍使用命令行工具编译托管代码，仅仅介绍了如何使用sources,&nbsp;dirs编译C/C++代码。但是我们每次通过命令行编译代码，最终都会列出一个这样的清单：  
BUILD:&nbsp;[00:0000000029<img src='http://sys2.blogcn.com/images/tongue.gif' border='0' onload='if(this.width>screen.width/2)this.style.width=screen.width/2;&#8217;>ROGC&nbsp;]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Files  
BUILD:&nbsp;[00:0000000030<img src='http://sys2.blogcn.com/images/tongue.gif' border='0' onload='if(this.width>screen.width/2)this.style.width=screen.width/2;&#8217;>ROGC&nbsp;]&nbsp;Midl&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0  
BUILD:&nbsp;[00:0000000031<img src='http://sys2.blogcn.com/images/tongue.gif' border='0' onload='if(this.width>screen.width/2)this.style.width=screen.width/2;&#8217;>ROGC&nbsp;]&nbsp;Resource&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1  
BUILD:&nbsp;[00:0000000032<img src='http://sys2.blogcn.com/images/tongue.gif' border='0' onload='if(this.width>screen.width/2)this.style.width=screen.width/2;&#8217;>ROGC&nbsp;]&nbsp;Message&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0  
BUILD:&nbsp;[00:0000000033<img src='http://sys2.blogcn.com/images/tongue.gif' border='0' onload='if(this.width>screen.width/2)this.style.width=screen.width/2;&#8217;>ROGC&nbsp;]&nbsp;Precomp&nbsp;Header&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1  
BUILD:&nbsp;[00:0000000034<img src='http://sys2.blogcn.com/images/tongue.gif' border='0' onload='if(this.width>screen.width/2)this.style.width=screen.width/2;&#8217;>ROGC&nbsp;]&nbsp;C/Cpp/Cxx&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1  
BUILD:&nbsp;[00:0000000035<img src='http://sys2.blogcn.com/images/tongue.gif' border='0' onload='if(this.width>screen.width/2)this.style.width=screen.width/2;&#8217;>ROGC&nbsp;]&nbsp;Assembler&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0  
BUILD:&nbsp;[00:0000000036<img src='http://sys2.blogcn.com/images/tongue.gif' border='0' onload='if(this.width>screen.width/2)this.style.width=screen.width/2;&#8217;>ROGC&nbsp;]&nbsp;Static&nbsp;Libraries&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0  
BUILD:&nbsp;[00:0000000037<img src='http://sys2.blogcn.com/images/tongue.gif' border='0' onload='if(this.width>screen.width/2)this.style.width=screen.width/2;&#8217;>ROGC&nbsp;]&nbsp;Dll&#8217;s&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0  
BUILD:&nbsp;[00:0000000038<img src='http://sys2.blogcn.com/images/tongue.gif' border='0' onload='if(this.width>screen.width/2)this.style.width=screen.width/2;&#8217;>ROGC&nbsp;]&nbsp;Exe&#8217;s&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0  
BUILD:&nbsp;[00:0000000039<img src='http://sys2.blogcn.com/images/tongue.gif' border='0' onload='if(this.width>screen.width/2)this.style.width=screen.width/2;&#8217;>ROGC&nbsp;]&nbsp;Resx&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0  
BUILD:&nbsp;[00:0000000040<img src='http://sys2.blogcn.com/images/tongue.gif' border='0' onload='if(this.width>screen.width/2)this.style.width=screen.width/2;&#8217;>ROGC&nbsp;]&nbsp;Csharp&nbsp;Targets&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0  
BUILD:&nbsp;[00:0000000041<img src='http://sys2.blogcn.com/images/tongue.gif' border='0' onload='if(this.width>screen.width/2)this.style.width=screen.width/2;&#8217;>ROGC&nbsp;]&nbsp;Other&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0  
BUILD:&nbsp;[00:0000000042<img src='http://sys2.blogcn.com/images/tongue.gif' border='0' onload='if(this.width>screen.width/2)this.style.width=screen.width/2;&#8217;>ROGC&nbsp;]  
BUILD:&nbsp;[00:0000000043<img src='http://sys2.blogcn.com/images/tongue.gif' border='0' onload='if(this.width>screen.width/2)this.style.width=screen.width/2;&#8217;>ROGC&nbsp;]&nbsp;Total&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3  
我们可以注意到有一项这样的提示：  
BUILD:&nbsp;[00:0000000040<img src='http://sys2.blogcn.com/images/tongue.gif' border='0' onload='if(this.width>screen.width/2)this.style.width=screen.width/2;&#8217;>ROGC&nbsp;]&nbsp;Csharp&nbsp;Targets&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0  
C#&nbsp;Target？对！C#&nbsp;Target，如果Build&nbsp;System真的不支持编译托管代码，那么怎么会有这项提示呢，直觉中感觉似乎微软在Windows&nbsp;CE&nbsp;5.0中增加了点什么。  
今天无意浏览了每个makefile都会包含的在编译系统中地位极为重要makefile.def文件，发现其中有大量的关于managed代码的描述。例如：  
RELEASETYPE=DEFAULT  
!ELSEIF&nbsp;&#8220;＄(RELEASETYPE)&#8221;&nbsp;==&nbsp;&#8220;SDK&#8221;  
!ELSEIF&nbsp;&#8220;＄(RELEASETYPE)&#8221;&nbsp;==&nbsp;&#8220;OAK&#8221;  
!ELSEIF&nbsp;&#8220;＄(RELEASETYPE)&#8221;&nbsp;==&nbsp;&#8220;DDK&#8221;  
!ELSEIF&nbsp;&#8220;＄(RELEASETYPE)&#8221;&nbsp;==&nbsp;&#8220;MANAGED&#8221;&nbsp;&nbsp;&nbsp;注意注意！！  
!ELSEIF&nbsp;&#8220;＄(RELEASETYPE)&#8221;&nbsp;==&nbsp;&#8220;PLATFORM&#8221;  
!ELSEIF&nbsp;&#8220;＄(RELEASETYPE)&#8221;&nbsp;==&nbsp;&#8220;LOCAL&#8221;  
!ELSEIF&nbsp;&#8220;＄(RELEASETYPE)&#8221;&nbsp;==&nbsp;&#8220;CETK&#8221;  
!ELSEIF&nbsp;&#8220;＄(RELEASETYPE)&#8221;&nbsp;==&nbsp;&#8220;CUSTOM&#8221;  
经过精密的理论推导，觉得Windows&nbsp;CE&nbsp;5.0的Build&nbsp;System应该是可以直接编译C#代码的。那就自己动手来一把。  
随便在某个平台下建立一个目录，就叫manage，然后用迅雷不及掩耳盗铃的速度就写好了hello.cs，内容当然是HelloWorld：  
using&nbsp;System;

namespace&nbsp;Hello  
{  
&nbsp;&nbsp;&nbsp;&nbsp;class&nbsp;Hello  
&nbsp;&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;Main(String&nbsp;[]&nbsp;args)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.Console.WriteLine(&#8220;Hello&nbsp;World&#8221;);  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
&nbsp;&nbsp;&nbsp;&nbsp;}  
}

然后建立makefile文件，内容当然只有永远的一行：  
!INCLUDE&nbsp;＄(_MAKEENVROOT)\makefile.def  
然后sources文件是重点，内容如下：

__PROJROOT=&nbsp;E:\WINCE500\PBWorkspaces\Test\manage  
RELEASETYPE=MANAGED  
TARGETTYPE=MANAGED_EXE  
TARGETNAME=Hello  
MANAGED_REFERENCES&nbsp;=&nbsp;mscorlib.dll;System.dll

SOURCES=&nbsp;\  
&nbsp;&nbsp;hello.cs&nbsp;\

RELEASETYPE和TARGETTYPE都要设置成文档中没有说明的类型，MANAGED和MANAGED\_EXE。（文档没说你怎么知道的？…我是看makefile.def里面看到的）。MANAGED\_REFERENCES是其他DLL引用。要把mscorlib.dll和System.dll加进去，否则会抱错。中间是用分号间隔。

然后在PB里面Open&nbsp;Release&nbsp;Directory，CD到Manage目录，然后build&nbsp;–c，呵呵0&nbsp;error&nbsp;0&nbsp;warning。然后再\oak\target\MANAGED\debug目录下顺利地找到的Hello.exe。  
大功告成，事实证明。虽然文档没记载，在Platform&nbsp;Builder下编译managed&nbsp;Code还是可行的。