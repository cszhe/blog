---
id: 10539
title: 探索一下Windows Phone 7的xde和image
date: 2010-12-29T23:31:14+00:00
author: omale
layout: post
guid: http://hezongjian.com/blog/?p=10539
permalink: '/2010/12/29/%e6%8e%a2%e7%b4%a2%e4%b8%80%e4%b8%8bwindows-phone-7%e7%9a%84xde%e5%92%8cimage/'
category:   嵌入式  
---
今天又玩了一下windows phone 7的sdk，发现模拟器改名叫xde.exe了，不是以前的device emulator了。对于喜欢穷根究底的我，第一希望研究的不是复杂的.NET类库及API，而是WP7到底是怎么回事。那就做个小测试，深度探索一下这个xde，以及sdk中自带的image映像吧。

一、关于XDE

官方关于xde介绍的文档应该就是这篇：

Windows Phone Emulator

http://msdn.microsoft.com/en-us/library/ff402563(v=VS.92).aspx

但是它介绍的资料非常少，少到你几乎看不到什么内容。以前的Device Emulator是个开源项目(准确的说应该叫共享源代码，Shared source，下载地址参见：http://www.microsoft.com/downloads/en/details.aspx?FamilyID=FAA8C81D-7316-4461-A0ED-6C95B261DDCD&displaylang=en)，可惜XDE没有继承Device Emulator的光荣传统，闭源了。为了揭开深层次秘密，我们只有自己挖掘了。

XDE的默认安装目录是C:\Program Files (x86)\Microsoft XDE\1.0，看着眼熟么？跟以前的Device Emulator挺像，尤其是那个文件夹里面的1.0目录，device emulator发展到3.0的时候，安装目录的文件夹名字依然是&ldquo;1.0&rdquo;，很容易混淆视听。如果要重新做个模拟器，这点早就应该改掉，怎么还留着，看看两个emulator的help吧。(点击看大图，下同)

[<img class="aligncenter size-medium wp-image-10541" height="214" src="/uploads/2010/12/help-300x214.png" title="emulator help" width="300"  />](/uploads/2010/12/help.png)

左面的是XDE.exe的help，右面是device emulator的help，不难看出，其实80%是一样的。唯一的变化是可以模拟arm处理器不同的版本（v4, v5,v6）。貌似<span style="color:#(color);">xde也是基于arm的模拟器。甚至有可能是传统Device Emulator的升级改进版。真是这样么？看表象就被MS给骗了。命令行的方式启动一下xde，直接xde.exe [image name]，就可以启动模拟器。试几个参数，发现/c /z等参数全然无效。哈原来是挂羊头卖狗肉，忽悠纯情少年。</span>

再仔细挖掘下目录里的东西，两个文件比较有意思，D3DCompiler_42.dll和X86CoreSystem.dll，令人浮想联翩。WP7要用到Silverlight，再用以前的ARM模拟器，绝对是老牛拉破车，以前在CE6 R3里面做过sliverlight开发的，谁做谁知道。WP7模拟器要想摆脱效率问题，肯定要另起炉灶，怎么提高模拟器的效率呢？单靠拼了命的想通过算法提高，累死人。比较有效的途径，一个是GPU加速，另一个就是硬件虚拟化，WP7模拟器这两个东东都用上了。这两个技术好虽好，不过用了以后，最大的问题，那，那那模拟器不是只能模拟x86了么？对WP7，似乎问题不大，因为现在只允许托管代码开发，管你模拟x86还是arm还是什么架构，反正对应用程序来说，都是中间代码，都是一样的。那么到底模拟器是不是x86呢？就再探究竟吧。

二、关于模拟器自带的OS映像

大家知道WP7是基于Windows CE的，但是把CE包了一层又一层，包得看不出CE的样子来了，几乎跟Android和Linux的关系一样。但是到底是基于CE哪个版本，到底里头有些啥，我们就深度探个究竟。

模拟器自带的ROM在C:\Program Files (x86)\Microsoft SDKs\Windows Phone\v7.0\Emulation\Images目录下，叫WM70c1.enus.bin。恩，虽然没叫nk.bin，但是也符合Windows CE OS Image的命名规则，有120多MB，看来在纯净CE的基础上（大概也就20-30MB）真是加了不少东西阿。下面就把这个文件解包，看看里头有啥东西。用到的工具就是Platform Builder for Windows CE 6(新的CE7还没有最终发布)。PB6最大的好处是可以直接图形化的方式打开bin文件，省了以前的viewbin.exe了。顺便说一句，用viewbin看一下这个bin文件，可以再次确认，它的architecture是x86!!!过程就不贴了。

我们也来试一下吧，当然，我们用官方工具，不用民间工具。用装了pb扩展的vs2005直接打开这个bin文件，解包成功！<span style="color:#f00;"><strong>说明WP7还是用的CE的标准bin文件格式</strong></span>。在实际设备上，应该也会用nb0或者nbh这种格式。哎，MS啊MS，这个bin格式已经被一群别有用心的人给研究得底裤都不剩了，怪不得模拟器出来几天就被人家给unlock。

[<img class="aligncenter size-medium wp-image-10546" height="187" src="/uploads/2010/12/bin-300x187.png" title="rom content" width="300" />](/uploads/2010/12/bin.png)

从ROM内容来看，是个典型的CE OS。先看注册表有什么好玩的东东。

先看HKEY\_LOCAL\_MACHINE\Drivers\BuiltIn，这里是所有的Driver，当然这个Driver都是给模拟器写的，都是模拟器虚拟出来的外设，没啥实际意义。

再看看启动项，也就是HKEY\_LOCAL\_MACHINE\init，如下图：

[<img class="aligncenter size-medium wp-image-10547" height="237" src="/uploads/2010/12/boot-300x237.png" title="boot" width="300" />](/uploads/2010/12/boot.png)

这个是WP7启动的顺序，gwes.dll, device.dll自然不必多说，系统组件。熟悉的explorer.exe不在里面，当然不能在里面了。否则就弹出来标准Windows桌面了。猜一下，大概wp7的主界面应该叫telshell.exe。当然也可能不是，毕竟没有真实设备。最后加载的那个东西有意思，k.mscoree3_7.dll，大家知道k.打头的都在kernel里，微软终于把.NET虚拟机做到OS内核里了？这样也好，可以解决以前的NETCF不能解决的问题。

后面还有一些好玩的东西，要问这个.NET Compact Framework是啥版本，也可以知道答案，注册表里面写着：3.7版。官方有这个版本么？有么？没有么？

看到很熟悉的很多文件，dumpbin一下，也是x86版，看来模拟器是基于x86的确信无疑。至于CE是哪个版本，得到的版本号是7.0.xxx，由于CE7没发布，WP7倒发布了，所以肯定又是所谓的&ldquo;内部版本&rdquo;。

还有就是IE浏览器，IE浏览器居然是native code，微软太不厚道了，只准州官放火，不许百姓点灯啊。允许微软用native code写代码，不允许我们用pInvoke啊。。

当然，更多的是managed code，都是所谓NETCF37的类库，dump出来之后可以直接用reflector反编译，在反编译代码里面，又看到了不厚道的pInvoke。哎，无语啊。

不写了，不玩了，写多了看上去越来越接近hacking了，本人不干hacking，一没时间，二没动力。有些内容写的很不详细，因为写详细了就做坏事了。见谅。

总结一下，可能很多人早就知道了，不过俺是实践出真知：

1. XDE是x86模拟器，采用了硬件虚拟化，并通过DX实现GPU加速。

2. 模拟器ROM还是标准CE的bin文件。OS是内部版本CE7，装了.NET Compact Framework 3.7。

3. 所谓WP7的Sandbox应该是在NETCF虚拟机一层，而不是在OS一层。能绕过虚拟机，你手上就是个标准CE!

4. 个人感觉，WP7的model跟android比有些像（其实觉得WP7底下的OS其实用linux也可以么&#8230;），但是更封闭，无论从哪个层面来讲都是这样。当然这年头封闭并不是贬义词。.

5.有一台真机器多好，可以玩的东西更多啊。