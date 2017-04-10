---
id: 9736
title: 使用Windows CE .NET 测试包 (CETK)构建和测试设备
date: 2004-08-22T12:10:02+00:00
author: omale
layout: post
guid: http://hezongjian.com/blog/?p=9736
permalink: '/2004/08/22/%e4%bd%bf%e7%94%a8windows-ce-net-%e6%b5%8b%e8%af%95%e5%8c%85-cetk%e6%9e%84%e5%bb%ba%e5%92%8c%e6%b5%8b%e8%af%95%e8%ae%be%e5%a4%87/'
categories:
  - 嵌入式
  - 未分类
tags:
  - Windows CE
  - 嵌入式
  - 软件
---
James&nbsp;Zwygart
	  
微软公司
	  
2003年一月&nbsp;
	  
适用于:
	  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Microsoft&reg;&nbsp;Windows&reg;&nbsp;CE&nbsp;.NET
	  
概述:&nbsp;Windows&nbsp;CE&nbsp;.NET测试包（CETK）是一个可以极大的增强平台可靠性的强大工具。此工具可以普遍的被用在开发中的平台和已发布的设备。本文描述了使用Windows&nbsp;CE&nbsp;.NET测试包的使用，板级支持包（BSP）的认证，和驱动程序验证。
	  
内容
	  
介绍&nbsp;
	  
Windows&nbsp;CE&nbsp;.NET&nbsp;测试包&nbsp;
	  
使用Windows&nbsp;CE&nbsp;.NET测试包&nbsp;
	  
BSP认证
	  
驱动程序验证&nbsp;
	  
结论
	  
更多信息
	  
介绍
	  
Microsoft&reg;&nbsp;Windows&reg;&nbsp;CE&nbsp;.NET测试包（CETK）是一个可以用来测试单个驱动程序或整个平台的工具。CETK中的测试工具可以提供你的驱动程序的功能的反馈，这可以用来进一步增强你的设备的可靠性。更多的测试可以被添加到Windows&nbsp;CE&nbsp;.NET测试包中用来测试单个驱动程序。
	  
Windows&nbsp;CE&nbsp;.NET测试包
	  
Windows&nbsp;CE&nbsp;.NET&nbsp;测试包（CETK）为Windows&nbsp;CE&nbsp;.NET社区提供了用来测试基于Windows&nbsp;CE&nbsp;.NET嵌入式设备和驱动程序通用的测试平台。Windows&nbsp;CE&nbsp;.NET测试包提供与微软内部使用的用来检验平台和驱动程序的可靠性和稳定性同样的工具。创建Windows&nbsp;CE&nbsp;.NET测试包是为了为OEM提供一种快速和有效的测试驱动程序的方法。Windows&nbsp;CE&nbsp;.NET测试包的主要目的是：
	  
&middot;创建一种可以快速和简单的使用的工具。&nbsp;
	  
&middot;为OEM最大可能的让测试过程自动化，这样测试就可以更快更准确。&nbsp;
	  
&middot;创建一个可以用作BSP和驱动程序认证的工具。&nbsp;
	  
谁应该使用CETK
	  
CETK可以被任何想测试和检验设备，BSP或特定的驱动程序的稳定性和可靠性的人使用。CETK测试可以保证设备或驱动程序达到了稳定性和兼容性的最小标准。使用CETK来测试驱动或设备的OEM可以保证它与Windows&nbsp;CE&nbsp;.NET操作系统兼容。
	  
运行CETK测试所需的PC和设备端的硬件要求&nbsp;
	  
Windows&nbsp;CE&nbsp;.NET测试包使用设备端（客户）和桌面（服务器）应用程序，它们使用套接子交互信息。运行在Windows&nbsp;CE&nbsp;.NET设备上的客户端与主机应用程序交互信息，主机应用程序通常在运行Platform&nbsp;Builder的开发工作站上。目标设备需要可以工作的以太网和显示支持来运行Windows&nbsp;CE&nbsp;.NET测试包。
	  
如何使用CETK才能提高平台的可靠性
	  
CETK考虑了多年Windows&nbsp;CE&nbsp;.NET的测试经验，目的是为社区提供最有价值，最全面，易于自动化的嵌入式测试。使测试人员既使用简单又易于理解在CETK的任务里有很高的优先级。CETK测试验证驱动程序和运行Windows&nbsp;CE&nbsp;.NET操作系统的设备符合标准的可靠性和稳定性。设备标准的可靠性和稳定性可以从标准开发板（SDB）规约得到。这个规约是用来帮助OEM构建与Windows&nbsp;CE&nbsp;.NET操作系统相兼容的硬件和软件的。Windows&nbsp;CE&nbsp;.NET测试包帮助测试人员确保设备和驱动程序遵循规范。开发人员通常为新硬件设计开发自定义的设备驱动程序。CETK设计成用来帮助开发人员构建强健的驱动程序和可靠的设备。设计者一直努力扩展测试包使之更全面，可以测试更多的东西并可以用在调试时和已发布的设备上。
	  
CETK和桌面WHQL测试的异同
	  
CETK不是Windows硬件质量实验室（WHQL）的一部分。熟悉WHQL的用户可以把CETK看作Windows&nbsp;CE&nbsp;.NET上的WHQL程序。WHQL测试是工作在桌面操作系统上的。WHQL的体系和结构与Windows&nbsp;CE&nbsp;.NET不兼容，这也是为什么创建Windows&nbsp;CE&nbsp;.NET测试包的原因。微软提供了两种某种程度上与WHQL测试相似的程序：BSP认证程序和驱动验证程序。这两个程序都使用CETK来测试和验证驱动程序和BSP。
	  
当前支持的测试
	  
CETK当前测试的是一系列Windows&nbsp;CE&nbsp;.NET的最通用的驱动程序和设备。CETK一直努力扩展支持更多和更广类型的测试。每种测试测试什么，如何使用都在CETK的帮助文档里有详细描述。
	  
Windows&nbsp;CE&nbsp;.NET测试包&mdash;发布的测试
	  
&middot;蓝牙测试&nbsp;
	  
&middot;CD/DVD-ROM&nbsp;块驱动测试&nbsp;
	  
&middot;CD/DVD-ROM&nbsp;文件系统驱动程序测试
	  
&middot;Direct3D&nbsp;基本光栅测试
	  
&middot;Direct3D&nbsp;雾化测试
	  
&middot;Direct3D&nbsp;多纹理测试
	  
&middot;Direct3D&nbsp;Z缓冲比较测试
	  
&middot;DirectDraw测试
	  
&middot;DirectSound音频驱动程序测试
	  
&middot;文件系统驱动程序测试
	  
&middot;图形设备接口（GDI）测试
	  
&middot;IR&nbsp;端口测试(Winsock&nbsp;1.1)&nbsp;
	  
&middot;IR&nbsp;端口测试(Winsock&nbsp;2.0)&nbsp;
	  
&middot;键盘映射测试
	  
&middot;键盘测试
	  
&middot;鼠标测试
	  
&middot;单卡网卡Miniport驱动程序测试
	  
&middot;并口测试
	  
&middot;分区驱动程序测试
	  
&middot;PCMCIA控制器驱动测试
	  
&middot;打印机驱动测试
	  
&middot;串行通讯测试
	  
&middot;串口驱动程序测试
	  
&middot;智能卡资源管理器测试
	  
&middot;存储设备块驱动程序API测试
	  
&middot;存储设备块驱动程序基准测试
	  
&middot;存储设备块驱动程序读/写测试
	  
&middot;Telephony&nbsp;API&nbsp;客户端测试
	  
&middot;Telephony&nbsp;API&nbsp;服务端测试
	  
&middot;触摸板测试
	  
&middot;双卡网卡Miniport驱动程序测试
	  
&middot;Waveform音频驱动程序测试
	  
&middot;Winsock&nbsp;2.0测试(v4/v6)&nbsp;
	  
&middot;Winsock&nbsp;压力测试
	  
使用Windows&nbsp;CE&nbsp;.NET测试包
	  
测试包可以在开发平台的任何时候和发布的设备上使用。CETK能被用来测试整个系统的稳定性或者能用来测试正在开发的某个驱动程序。
	  
把CETK组件添加到平台
	  
使用CETK之前，你需要为你的平台增加CETK支持。可以通过两种方式之一实现：可以在Platform&nbsp;Builder里面向平台增加CETK组件，也可以在运行CETK测试之前把文件复制到平台。
	  
CETK需要一条从目标设备到开发工作站所在的网络的以太网连接。你不能从在一个调试的以太网连接上运行CETK。注意你可以在一个Windows&nbsp;CE&nbsp;.NET的测试映像上运行CETK。如果是这样，你的平台需要完整的网络驱动程序，而不是调试版的以太网驱动程序。
	  
注意&nbsp;&nbsp;&nbsp;为了使用CETK，不要从小内核配置开始构建你的平台。你不能从小内核配置运行CETK。
	  
为了在Platform&nbsp;Builder里面增加CETK的支持：&nbsp;
	  
1.在目录中，展开Device&nbsp;Drivers节点，右击Windows&nbsp;CE&nbsp;Test&nbsp;Kit,，然后点击Add&nbsp;to&nbsp;Platform。&nbsp;
	  
2.在Build菜单中，单击Build&nbsp;Platform&nbsp;来构建你的操作系统映像。&nbsp;
	  
3.当Windows&nbsp;CE&nbsp;.NET操作系统的映像构建完成后，下载操作系统映像到合适的基于Windows&nbsp;CE&nbsp;.NET的设备。&nbsp;
	  
注意&nbsp;&nbsp;&nbsp;从目录中添加CETK组件并不向你的操作系统镜像中添加附加的文件。一些CETK必需的文件会被放置到你得release目录中，包括clientside.exe。
	  
因为CETK组件并没有包含在你的操作系统映像中，你必须下载和运行叫做clientside.exe的客户端CETK应用程序。
	  
为了在你的操作系统映像上运行CETK客户端软件(clientside.exe)：&nbsp;
	  
1.在Platform&nbsp;Builder的Target&nbsp;菜单下，单击Run&nbsp;Programs。&nbsp;
	  
2.单击&nbsp;Clientside.exe，然后单击Run。
	  
注意Run&nbsp;Programs对话框会列举出你的Platform&nbsp;Builder的release目录下发现的所有可执行代码。这个列表有可能包括不是正在运行的操作系统映像（nk.bin）一部分的应用程序。
	  
你现在可以在你的开发工作站上运行CETK工具了。
	  
为了在你的开发工作站上运行CETK工具：&nbsp;
	  
1.单击Start，指到All&nbsp;Programs，指到Microsof t&nbsp;Windows&nbsp;CE&nbsp;.NET，然后单击Windows&nbsp;CE&nbsp;.NET&nbsp;Test&nbsp;Kit。
	  
2.为了在没有添加CETK客户端软件的OS映像上运行CETK工具，下载Clientside.exe文件到你的Windows&nbsp;CE&nbsp;.NET设备上。&nbsp;
	  
在开发工作站上，Clientside.exe位于与目标设备CPU通明的目录中，在%_WINCEROOT%\Others\Wcetk目录。
	  
3.在基于Windows&nbsp;CE&nbsp;.NET的设备上，在Start菜单，单击Run&nbsp;然后输入Clientside.exe的位置然后跟着输入CETK服务器的名称和端口。
	  
例如，输入clientside&nbsp;/n=machine1&nbsp;/p=5555，你可以运行Clientside.exe可执行文件并使用5555端口号连接到machine1。你也可以编辑位于Clientside.exe所在的目录中的Wcetk.txt文件如果你在构建平台之前就增加了CETK支持。
	  
你也可以修改目标设备上的下列的注册表键：&nbsp;HKEY\_LOCAL\_MACHINE\SOFTWARE\Microsoft\CETT。当没有找到命令行参数和Wcetk.txt时，Clientside.exe从注册表中读取设置。如果你使用Windows&nbsp;CE&nbsp;.NET&nbsp;Platform&nbsp;Builder构建自定义的操作系统映像，你可以通过编辑你平台的product.reg文件来修改目标设备上的注册表，包括HKEY\_LOCAL\_MACHINE\SOFTWARE\Microsoft\CETT注册表键。当你构建操作系统映像的时候，Product.reg文件中的信息被构建到操作系统中。或者，你可以使用远程注册表编辑器在目标设备运行的时候来修改目标设备上的注册表。
	  
PC端软件
	  
CETK的PC端或者主机端完成所有的工作。所有的测试都存储在PC端，那是控制设备的地方。主机端的用户界面给用户简单灵活的测试环境。你可以使用很多特性来帮助你管理对单个驱动程序或者完整设备的测试。
	  
Test&nbsp;Suite&nbsp;Editor对话框允许你为CETK创建和管理测试套件。测试套件是一系列被选择的存储在CETK内的测试，能被用来在CETK窗口内测试任何目标设备。
	  
你可以使用Test&nbsp;Suite&nbsp;Editor来建立一个包含你想运行的测试的测试套件。而不是在目标设备上选择每一个单独的测试，你可以把测试套件应用于你的目标设备来自动的选择你在Test&nbsp;Suite&nbsp;Editor中选择的测试。
	  
用户还可以更改默认的命令行来改变测试如何运行以及测试什么。每个测试通常都有增加更多功能测试的其他选项。
	  
设备端软件
	  
设备端的CETK叫做Clientside.exe。Clientside.exe是个小程序，负责呼叫主机电脑来建立连接，设备检测，运行测试，然后把结果发送回主机。
	  
Tux和Kato
	  
Tux是在Windows&nbsp;CE&nbsp;.NET设备上标准的编写和执行测试代码的方法。Tux模型的主要组件是可执行文件tux.exe，它负责运行和控制tux.dll。
	  
CETK提供给用户构建自定义测试所需要的所有必需的文件和指令，可以从主机图形界面的User&nbsp;Test&nbsp;Wizard来把它添加到CETK。
	  
Tux客户端，tux.exe，是Tux的主要组件。它可以以单独模式运行或者与CETK一起运行。Tux客户端是个控制台应用程序，使用下面的语法：
	  
tux&nbsp;[-b]&nbsp;[-e]&nbsp;[-s&nbsp;file\_name&nbsp;|&nbsp;-d&nbsp;test\_dll]&nbsp;[-c&nbsp;parameters]&nbsp;[-r&nbsp;seed]
	  
[-x&nbsp;test\_case]&nbsp;[-l]&nbsp;[-t&nbsp;address]&nbsp;[-h]&nbsp;[-k&nbsp;address]&nbsp;[-o]&nbsp;[-f&nbsp;file\_name]
	  
&nbsp;&nbsp;&nbsp;[-a]
	  
下表显示了各种Tux的参数。
	  
参数&nbsp;描述&nbsp;
	  
-b每个Tux&nbsp;DLL加载后中断。
	  
-e禁用异常处理。
	  
-s&nbsp;file_name指定要加载/执行的Tux套件文件。
	  
-d&nbsp;test_dll指定要加载/执行的Tux测试DLL&nbsp;
	  
-c&nbsp;parameters&nbsp;要传给Tux&nbsp;DLL的命令行。&nbsp;
	  
-r&nbsp;seed指定初始的随机数种子。
	  
-x&nbsp;test_case&nbsp;指定要运行的测试用例
	  
-l&nbsp;列出Tux&nbsp;DLLs中的所有测试用例。&nbsp;
	  
-t&nbsp;address&nbsp;指定运行&nbsp;Tux&nbsp;服务器的计算机。使用不带参数的&nbsp;-t&nbsp;指定本地服务器。
	  
-h&nbsp;生成Tux参数列表。
	  
Tux&nbsp;也可以使用叫做Kato的日志记录.dll文件，它提供通用的日志记录接口。Kato日至记录引擎（Kato）是32位的，面向对象的，客户端/服务器日至记录引擎，它允许应用程序记录单个接口并把他们输出到多个用户定义的设备上。Kato是完全的线程安全和进程安全的。Kato为基于Windows的桌面版本操作系统提供ANSI和UNICODE版本。
	  
CETK&nbsp;自动将&nbsp;Kato&nbsp;用作日志记录的方法，以便所有&nbsp;CETK&nbsp;测试的结果都相似，从而更加便于理解。
	  
解释CETK的测试结果&nbsp;
	  
想要查看任何一个已经运行的测试的结果，右击该测试然后点击View&nbsp;Result。这样会打开所选择的测试的最新的结果。显示的第一条信息是测试的概要。每个测试其实是一系列测试。有可能在某些测试套件里一些测试通过了而另外一些失败了。如果套件中的任何测试失败了，CETK将会使整个测试套件失败。例如，如果你在某个设备上运行IPV4的Winsock测试，如果两个测试通过两个测试失败，测试将显示为失败。这两个失败是由于设备不包含IPV6，所以这种情况下失败是可以预计的。为了使Winsock测试完全通过，你必须包含IPV4和IPV6。
	  
测试失败和如何解释
	  
由于&nbsp;CETK&nbsp;中的每个测试都是一个测试套件，因此套件中可能有些测试会失败，有些测试会通过。图1显示了Winsock的测试结果。Winsock测试套件含有四个测试。在这种情况下，两个通过两个失败。如果你选择失败的测试，测试列表下面的窗口会显示指定的测试。结果说明了测试了什么和预期的返回结果。测试的源代码可以为你进一步研究失败提供帮助。源代码在Platform&nbsp;Builder的最后一张CD上，在一个叫做CETK_Sources的目录上。

图1.&nbsp;Winsock测试结果
	  
BSP认证
	  
板级支持包（BSP）认证程序是为了创建有可靠性和稳定性的Windows&nbsp;CE&nbsp;.NET第三方设备和软件的标准。
	  
微软Windows&nbsp;CE&nbsp;.NET&nbsp;BSP和CPU认证过程是用来保证BSP和CPU的兼容性的。经由微软认证有下列好处：
	  
&middot;它保证BSP和CPU满足微软Windows&nbsp;CE.NET操作系统标准开发板规约，而更乐于被客户和OEM接受。&nbsp;
	  
&middot;当BSP和CPU通过认证测试，他们会被添加到支持的BSP和支持的CPU列表中。&nbsp;
	  
&middot;能包含在该列表中是营销的质量保证和在业界提供正面影响。&nbsp;
	  
创建该程序的目的就是使它简单有效。CETK提供所有的用来认证的测试。这样使OEM和设备制造商可以在递交给微软来认证之前简单的测试他们的设备和BSP。有关该程序的更多信息，请访问BSP&nbsp;and&nbsp;CPU&nbsp;Certification&nbsp;Process&nbsp;for&nbsp;Windows&nbsp;CE&nbsp;.NET.
	  
如何提交硬件进行认证
	  
当你准备提交硬件认证时，你需要填写你的设备所运行的Windows&nbsp;CE版本的申请表。表哥可以从BSP认证网站获取。
	  
请把如下物品提交到下列地址：
	  
&middot;两份相同的设备。&nbsp;
	  
&middot;一个可以被加载到设备上的操作系统映像和要认证的BSP。&nbsp;
	  
&middot;一个所有可应用的CETK测试列表。这是你完整的BSP和CPU认证申请表。&nbsp;
	  
&middot;测试费用：每个BSP测试费1500美元，再提交申请时支付。此费用最多可以测试两次。如果需要重新测试，还需要另外支付1000美元。&nbsp;
	  
注意&nbsp;&nbsp;&nbsp;请在申请表或支票上的适当位置填写定单号。请确保您的支票有效，可以支付给微软公司，并将支票、板卡以及填好的&ldquo;BSP&nbsp;和&n bsp;CPU&nbsp;认证申请表&rdquo;一起提交。
	  
Microsoft&nbsp;Corporation
	  
One&nbsp;Microsoft&nbsp;Way
	  
Redmond&nbsp;WA,&nbsp;98052
	  
ATTN:&nbsp;James&nbsp;Zwygart
	  
如果你对BSP/CPU认证程序有更多的问题或意见，请发送邮件到bspcert@microsoft.com。
	  
申请认证前要运行什么测试
	  
用来认证的测试取决于你提交的设备。因为每个设备有可能配置不同，CETK为你干了大量的工作，会自动检测设备上有什么外设。确保在你的硬件上所有可用的测试都被选择依然很重要。
	  
如何解释BSP认证测试的结果
	  
BSP&nbsp;认证程序使用&nbsp;CETK&nbsp;作为测试方法，因此可以用解释&nbsp;CETK&nbsp;测试通过或失败的方法来解释其结果。
	  
认证时如何同时获得可靠性
	  
设备或BSP的认证保证你的设备符合微软对稳定性和可靠性的标准。要了解&nbsp;微软设置的基准，请访问标准开发板规约。Windows&nbsp;CE&nbsp;测试包遵循标准开发板规约，因此可以验证你的板级支持包符合标准开发板基线。
	  
驱动程序验证
	  
驱动程序验证程序（DVP）的目的是提供给开发者，独立硬件供应商（IHV）或OEM验证在Windows&nbsp;CE&nbsp;.NET操作系统上使用他们的驱动程序的机会。
	  
验证程序提供下列好处：&nbsp;
	  
&middot;可以根据提交的测试结果，确认驱动程序在提交时与指定的&nbsp;Windows&nbsp;CE&nbsp;.NET&nbsp;操作系统兼容。
	  
&middot;当驱动程序通过验证测试时，它就会被添加到Windows&nbsp;CE&nbsp;.NET支持的设备驱动程序列表中。&nbsp;
	  
能包括在此列表中表明通过验证的设备驱动程序符合&nbsp;Microsoft&nbsp;标准，与&nbsp;Windows&nbsp;CE&nbsp;.NET&nbsp;兼容，在业界提供正面影响。
	  
为了提交要验证的驱动程序
	  
提交过程非常简单容易。驱动程序验证程序网站网站介绍了提交过程并提供了提交申请表。
	  
1.测试你的驱动程序。&nbsp;你必须通过运行&nbsp;Platform&nbsp;Builder&nbsp;4.0&nbsp;for&nbsp;Windows&nbsp;CE&nbsp;.NET&nbsp;中包含的&nbsp;CETK&nbsp;中的相关测试来测试驱动程序。这种测试必须根据&nbsp;CETK&nbsp;附带的说明和原则来进行。
	  
2.填写提交表格。&nbsp;下载驱动程序验证提交表并填写完整。
	  
如果要将驱动程序提交到&nbsp;Microsoft&nbsp;Corporation&nbsp;以便存储在&nbsp;Microsoft&nbsp;网站上并分发给最终用户，则必须将设备驱动程序作为&nbsp;.msi&nbsp;文件（通过&nbsp;Windows&nbsp;CE&nbsp;.NET&nbsp;Platform&nbsp;Builder&nbsp;创建）提交。还必须为&nbsp;MSI&nbsp;程序包中的设备驱动程序创建&nbsp;.cec&nbsp;文件。.MSI&nbsp;和&nbsp;.cec&nbsp;文件能够将设备驱动程序更容易地集成到&nbsp;Platform&nbsp;Builder&nbsp;IDE&nbsp;目录中，最终用户只需一个单击操作即可完成操作。有关&nbsp;Platform&nbsp;Builder&nbsp;中提供的、有助于为设备驱动程序创建&nbsp;.cec&nbsp;和&nbsp;.msi&nbsp;文件的工具的详细信息，请参阅&nbsp;Platform&nbsp;Builder&nbsp;文档中的&ldquo;Device&nbsp;Driver&nbsp;Integration&nbsp;into&nbsp;the&nbsp;IDE&rdquo;。
	  
注意&nbsp;&nbsp;Microsoft&nbsp;不负责确认驱动程序的最终用户许可条款。您应该在驱动程序文件中包括一个自述文件或最终用户许可协议&nbsp;(EULA)，来规定驱动程序可以在何种情况下使用。您必须完全为您的驱动程序负责。Microsoft&nbsp;对驱动程序的任何技术或客户支持、更新、市场或其他方面的事宜概不负责。
	  
3.发送表格。&nbsp;向&ldquo;Windows&nbsp;CE&nbsp;驱动程序验证程序提交&rdquo;发送电子邮件并附加您的提交表、驱动程序和&nbsp;CETK&nbsp;日志。
	  
驱动程序验证在系统的可靠性中扮演什么角色
	  
设备驱动程序的验证能够确保设备驱动程序符合&nbsp;Microsoft&nbsp;的稳定性和可靠性标准。要了解&nbsp;Microsoft&nbsp;设置的基准，建议您阅读&nbsp;Windows&nbsp;CE&nbsp;.NET&nbsp;附带的设备驱动程序文档。
	  
结论
	  
微软致力于提供工具和文档，帮助开发人员构建可靠的设备和设备驱动程序。微软提供了&nbsp;BSP&nbsp;认证程序和驱动程序验证程序，OEM&nbsp;厂商可以使用这些程序验证设备是否符合微软稳定性和可靠性标准。
	  
Microsoft&nbsp;欢迎广大客户提供有关&nbsp;BSP&nbsp;和驱动程序测试工具当前版本的反馈信息。要提供反馈信息，请向以下地址发送电子邮件：
	  
BSP&nbsp;验证&mdash;bspcert@microsoft.com
	  
驱动程序认证&mdash;cedvpsub@microsoft.com
	  
更多信息
	  
有关&nbsp;Windows&nbsp;CE&nbsp;.NET&nbsp;的最新信息，请访问&nbsp;Windows&nbsp;Embedded&nbsp;网站（英文）。
	  
Windows&nbsp;CE&nbsp;.NET&nbsp;附带的联机文档和上下文相关帮助也提供了有关使用&nbsp;Windows&nbsp;CE&nbsp;.NET&nbsp;的全面的背景信息和说明。
	  
此外，还可以访问&nbsp;Windows&nbsp;Embedded&nbsp;网站（英文）上有关&nbsp;Windows&nbsp;CE&nbsp;.NET&nbsp;的产品文档。
	  
&nbsp;