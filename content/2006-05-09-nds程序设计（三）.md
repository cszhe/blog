---
id: 9822
title: NDS程序设计（三）
date: 2006-05-09T11:00:20+00:00
author: omale
layout: post
guid: http://hezongjian.com/blog/?p=9822
permalink: '/2006/05/09/nds%e7%a8%8b%e5%ba%8f%e8%ae%be%e8%ae%a1%ef%bc%88%e4%b8%89%ef%bc%89-2/'
category:   未分类  
tags:   Google  , 程序员  , 软件
---
3.1开发环境杂谈
	  
要想给NDS开发程序，最好的选择当然是买任天堂公司提供的开发套件了，任天堂的套件非常好，开发调试一条龙俱全（我没见过）。但是这个东西相当贵不说，它也不是有钱就卖的。还必须跟任天堂搞好关系才可以。所以呢一般的平民百姓想玩是不可能了，除非练好身手加入Konami，Namoco&hellip;&hellip;开发工具的网址是：http://www.warioworld.com
	  

	  
当御林军当不成，就只好当民间高手了。国外有一群高人不甘寂寞，就自己动手丰衣足食，DIY了一套开发环境，这帮人自称Homebrew（为什么这个单词金山词霸里面没有&hellip;&hellip;）这套开发环境叫做devkitPro。我们下面的开发工作，全都是在devkitPro下进行的。

devkitPro是一个为多种游戏机开发程序的开发环境，不只可以为NDS开发程序，还可以为GBA，PSP，NGC和GP32（据传说GP32是韩国人开发的一个掌机&hellip;&hellip;）编写代码。那些游戏机有的是MIPS有的是PowerPC，就不在我们的瞎扯范围之内了。我们就关注NDS。

3.2安装和配置开发环境
	  
devkitPro是sourceforge.net上的一个项目，所以最新的东西都可以从sourceforge上下载，老家在这里：http://sourceforge.net/projects/devkitpro</a> 。但是google一下应该可以找到不少链接。

devkitPro是完全开源的，可以从sourceforege网站上下载到几乎所有的类库和工具的源代码。如果你是个想对任何细节都穷根究底的程序员（就像我&hellip;&hellip;），读devkitPro里面的代码是一个不错的选择。同时，与其它开源项目一样，devkitPro中关于NDS部分的文档是悲惨的可怜。想了解怎么写程序和一些库函数的作用功能参数，基本上就一个办法&mdash;&mdash;读代码。

下载下来应该是一个名字类似于这个的exe文件：devkitProUpdater-1.2.7.exe。这个不是直接的安装文件，但是通过它可以在线安装最新版本的devkitpro。如果速度不慢，硬盘不小，保险就是所有选项全选，这是我的一贯作风。一般把它安装在磁盘跟目录，例如我把它安装在D:\devkitPro目录。

安装完了之后是配置环境变量，有三个环境变量要设置，一个是DEVKITARM，把它指向devkitARM目录，（因为要用到ARM的工具么）。还有DEVKITPRO，把它设置成devkitpro根目录。注意注意！这两个变量的路径必须用类UNIX路径，也就是目录要用&ldquo;/&rdquo;斜杠而不是Windows的&ldquo;\&rdquo;斜杠，而且D盘不能写成D冒号，要写成&ldquo;/d/&rdquo;，也是仿照UNIX单根目录来的。另外就是要设置一下PATH路径，把编译器等几个重要的工具所在目录加进去，这样Windows就可以自动搜索到它们。当然设置环境变量可以在&ldquo;我的电脑&rdquo;右键&#8230;&#8230;去设置，我比较习惯自己写一个批处理程序，设置这些变量，这样既不会影响到整个系统的环境变量，又不耽误一个命令行窗口正常使用这些环境变量。

我写的批处理程序如下：

@echo off

REM
	  
REM Written by Jason He; Set up NDS development enviorment
	  
REM 4/19/2006
	  
REM

REM set environment
	  
set DEVKITARM=/D/devkitPro/devkitARM
	  
set DEVKITPRO=/D/devkitPro

REMset path
	  
set PATH=%PATH%D:\devkitPro\devkitARM\arm-elf\bin;D:\devkitpro\devkitarm\bin;D:\devkitpro\msys\bin;

cd /d D:\devkitPro\examples\nds\

echo Welcome to enter NDS development world!

把这些东西复制到一个文本文件里面，然后保存成nds.bat（注意，有些内容可能要修改哈）。然后再建立一个快捷方式，快捷方式指向的内容是：%SystemRoot%\system32\cmd.exe /K D:\devkitPro\nds.bat。这样，只要双击这个快捷方式，就可以打开我们以后要一直面对的开发环境了。（用惯了Visual Studio的同志也不要失落，命令行也不一定就坏）

3.3编译NDS版Hello World

在写我们自己的程序之前，还是先编译运行devkitPro中自带的示例程序。让大家有个感性的认识。

编译还是挺简单的。在上一节创建好的命令行开发环境中cd到D:\devkitPro\examples\nds\Graphics\2D\hello\_world目录（终于看到Hello World了）。代码的组织结构和含义我们以后再看，编译只需要输入make，就可以看到编译开始了。编译结束之后，可以看到hello\_world目录下多了几个文件，最重要的也就是hello\_world.nds文件了。如果读者用过烧录卡，就知道.nds文件也就是NDS可以运行的ROM文件了。这里的hello\_world.nds也是NDS可以直接运行的二进制文件。

3.4让Hello World运行起来

如果你有NDS + 烧录卡，想运行这个程序，那么只需要直接把这个文件复制到烧录卡上就可以直接像运行其他NDS游戏一样运行hello world了。在我的Super Card SD版上，无需转化就可以直接运行。

如果你只有NDS并没有烧录卡，想运行这个程序，那么国外有一个软件叫WifiMe，据说用这个软件可以通过NDS自带的Wifi无线网络把hello_world.nds文件从PC机下载到NDS上运行。但是据说这种方法对PC端的wifi网卡要求挺高。我没有试过WifiMe，所以这种方法我就不详细介绍了。

如果你连NDS游戏机都没有，也想运行这个游戏。也行！到网上下载几个NDS模拟器来，用NDS模拟器来运行这个例子也可以。由于NDS的硬件比较复杂，所以目前NDS模拟器目前还都处于比较原始的状态，基本上不能运行商业游戏，但是用来运行这些示例代码已经是绰绰有余了。

我觉得比较有前途的一个模拟器是ideas，作者还在不断的对这个模拟器进行更新。此外，据说是任天堂开发的内部泄漏的模拟器ensata也不错，但是这个模拟器已近不会更新了。此外还有几个模拟器也不错，读者可以自行选择。

下面是分别在我的爱机NDSL和模拟器上运行这个程序的图片。
	  
 
	  
<a href="http://images.blogcn.com/2006/5/9/6/omale,20060509105825.jpg" target="_blank"><img border="0" onload="if(this.width>screen.width/2)this.width=screen.width/2;" src="http://images.blogcn.com/2006/5/9/6/omale,20060509105825.jpg" /></a>

 

以后我们自己开发的游戏都可以通过这种方式运行调试。

3.5项目代码分析
	  
3.5.1hello world目录结构

好了，Hello World终于在NDS上跑起来了。鲜也尝过了，其然也知了，是该回头来看看这些代码，知其所以然的时候了。

让我们来看看刚才编译过的hello_world目录，看看这个� ��录下的一些文件组织结构。经过make之后，这个目录的组织结构如下（省略了几个Programmers Notepad的工程文件），我在文件和目录后面加了解释：

|   hello_world.arm9// 编译之后生成，似乎是ARM二进制代码
	  
|   hello_world.elf// elf文件格式的二进制
	  
|   hello_world.nds// 可执行的NDS ROM
	  
|   Makefile// 构建脚本，稍后详细介绍
	  
|
	  
+&#8212;build// 编译生成的目录，用来存放编译生成的临时文件
	  
|       hello_world.map// 编译生成的map文件
	  
|       main.d// 编译生成的文件，main.cpp所包含的文件列表
	  
|       main.o// main.cpp编译生成的目标文件
	  
|
	  
+&#8212;include// 存放头文件的目录，为空
	  
\&#8212;source// 存放源代码的目录
	  
        main.cpp// 源代码文件

我们可以看到，其实这个目下的大多数文件都是make之后才生成的，make之前这个目录中只有两个文件：makefile和main.cpp。也就是说，如果我们要自己新建一个项目，其实最少只要makefile和main.cpp就够了。网上看到有网友问如何从0开始一步一步创建一个新项目，其实只要把D:\devkitPro\examples\nds\templates\目录下的arm9或combined目录复制一份就好了。也可以复制这个hello_world目录，都无所谓。下面就分别介绍main.cpp和makefile这两个文件。

3.5.2main.cpp

main.cpp内容很短，一行汇编都没看到，热衷于ASM的人是不是会有一丝丝失望呢。代码分成几大段：

第一段，包含头文件。main.cpp中包含了三个头文件，其中nds.h一般是所有nds程序都需要包含的。console.h包含一些命令行相关的函数声明。stdio.h就不用我多介绍了。

#include <nds.h>

#include <nds/arm9/console.h>
	  
#include <stdio.h>

第二段，全局变量和Vblank()函数，Vblank的作用就是把全局变量加一，系统是借此来统计桢数。工作原理我们后面会介绍。

volatile int frame = 0;

//&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;-
	  
void Vblank() {
	  
frame++;
	  
}

第三段，大戏上演，main()函数，这也是代码的入口函数。首先main()函数会对硬件进行一些初始化，我在代码中做了一些注释。这些初始化工作读者暂时可以当它没有，具体的详细技术细节我们以后再介绍。读者可以从iprintf()一句开始读，相信这样剩下的代码就不难懂了。首先打印几句话，然后通过一个死循环读取触摸屏的信息，然后打印显示。

//&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;
	  
int main(void) {
	  
touchPosition touchXY;

irqInit();// 初始化中断
	  
irqSet(IRQ_VBLANK, Vblank);// 设置画图中断处理函数为vblank()
	  
irqEnable(IRQ_VBLANK);// 打开VBLANK中断
	  
videoSetMode(0);// 下面几行初始化显示屏
	  
videoSetModeSub(MODE\_0\_2D | DISPLAY\_BG0\_ACTIVE);
	  
vramSetBankC(VRAM\_C\_SUB_BG); 

SUB\_BG0\_CR = BG\_MAP\_BASE(31);

BG\_PALETTE\_SUB[255] = RGB15(31,31,31);

// 初始化控制台
	  
consoleInitDefault((u16\*)SCREEN\_BASE\_BLOCK\_SUB(31), (u16\*)CHAR\_BASE\_BLOCK\_SUB(0), 16);

// 打印Hello信息
	  
iprintf("      Hello DS dev'rs\n");
	  
iprintf("     www.devkitpro.org\n");
	  
iprintf("   www.drunkencoders.com");

// 下面是轮询死循环
	  
while(1) {
	  
swiWaitForVBlank();// BIOS调用，等待vblank中断
	  
touchXY=touchReadXY();// 读取当前触摸屏的X Y坐标

iprintf("\x1b[10;0HFrame = %d",frame);// 打印桢数
	  
// 打印触摸屏触摸信息
	  
iprintf("\x1b[16;0HTouch x = %04X, %04X\n", touchXY.x, touchXY.px);
	  
iprintf("Touch y = %04X, %04X\n", touchXY.y, touchXY.py);
	  
}
	  
return 0;
	  
}

读者如果心痒手痒，可以尝试着自己修改一下这些代码，然后再编译运行一下，看看会有什么结果。给各位布置各作业了，默认打印的字是白色的，能不能想办法让它变变颜色？

3.5.3makefile
	  
makefile是进行自动编译的脚本。make.exe会读取makefile，然后根据makefile的内容来决定如何编译整个系统，从而简化整个构建过程。正是因为makefile的存在，所以我们在构建的时候，只需要在该目录敲一个make命令，系统就可以帮我们自动构建。

虽然说是简化，但是由于在Windows上有大批被IDE给&ldquo;惯坏&rdquo;了的程序员，对makefile不了解，看到makefile就害怕，所以在windows下makefile通常不但起不到简化的作用，还经常成为程序员的&ldquo;拦路虎&rdquo;。不能不说是可叹可叹阿。

关于makefile的详细内容我想我就不介绍了。如果你看到makefile也心虚，那就要自己google搜索一下教程，自己补习了。

那我们就分析一下hello_world目录中的makefile，其实这个makefile是一个典型的makefile的模板，读者在新建立文件的时候，通常只需要在这个makefile的基础上把几个宏稍作修改就可以了。我们只介绍关键部分，说明都在代码里了，如下：

（略）

# 下面这行包含了另外一个文件，它包含通用的NDS构建规则。
	  
include ＄(DEVKITARM)/ds_rules

#&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8211;
	  
# 下面几个宏比较重要：
	  
# TARGET 是输出的文件名，默认被设置成了当前目录名
	  
# BUILD 是obj和其他中间文件的存放目录，默认叫build
	  
# SOURCES是包含源代码的目录列表
	  
# INCLUDES包含头文件的目录列表
	  
#&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8211;
	  
TARGET:=＄(shell basename ＄(CURDIR))
	  
BUILD:=build
	  
SOURCES:=gfx source data  
	  
INCLUDES:=include build

（略）

#&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8211;
	  
# 这里是额外链接的库，设置成nds9意味着链接了libnds9.a，也就是libnds提供的一个库
	  
#&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;-
	  
LIBS:= -lnds9

（略）

#&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;
	  
# 这里是要build的所有文件列表，默认是这个目录下的所有文件。
	  
CFILES:=＄(foreach dir,＄(SOURCES),＄(notdir ＄(wildcard ＄(dir)/*.c)))
	  
CPPFILES:=＄(foreach dir,＄(SOURCES),＄(notdir ＄(wildcard ＄(dir)/*.cpp)))
	  
SFILES:=＄(foreach dir,＄(SOURCES),＄(notdir ＄(wildcard ＄(dir)/*.s)))
	  
BINFILES:=＄(foreach dir,＄(SOURCES),＄(notdir ＄(wildcard ＄(dir)/*.bin)))

（略）

通过上面的介绍，基本上makefile要编译哪些文件，链接哪些库，生成的文件叫什么名字我们都知道了，新建项目的时候，只需要把上述的东西改改基本就可以了。