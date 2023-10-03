---
id: 9749
title: Pascal-S编译系统实现简析
date: 2004-12-10T12:20:20+00:00
author: omale
layout: post
guid: http://hezongjian.com/blog/?p=9749
permalink: '/2004/12/10/pascal-s%e7%bc%96%e8%af%91%e7%b3%bb%e7%bb%9f%e5%ae%9e%e7%8e%b0%e7%ae%80%e6%9e%90-2/'
category:   未分类  
---
一、Pascal-S及Pascal-S编译程序
	  
Pascal-S是Pascal语言的真子集，由著名的计算机科学家N.Wirth开发。它保留了Pascal语言的大部分功能。
	  
Pascal-S支持整形，实形，布尔形和字符型四种基本的数据类型。Pascal-S还支持数组和记录两种构造类型和用户自定义类型。Pascal-S支持函数和过程，并且支持值形参和变量形参。支持函数递归。Pascal-S还支持控制台输入输出函数，但是不支持文件输入输出。
	  
Pascal-S的编译程序也是由Pascal编写而成。由五十多个函数构成。大致分为词法分析，语法分析，代码生成，错误处理和解释执行几大模块。Pascal-S的编译程序与普通Pascal不同的是，Pascal-S采用解释执行，也就是说，Pascal-S被编译成了中间代码，然后由解释器解释执行。本文介绍词法分析，语法分析和解释执行部分，错误处理不做重点介绍。
	  
二、表格管理
	  
表格是编译程序不可缺少的一部分，Pascal-S编译程序包含符号表（tab），块表（btab），数组表（atab），实常量表（rconst），字符串常量表（stab）以及生成的中间代码表（code）。Pascal-S的代码中，使用一系列ENTER打头的函数往这些表中添加信息。
	  
2.1 符号表tab
	  
符号表由变量t作为索引，它主要用来存储在编译的时候发现的代码中的标志符的信息。他的数据结构定义和成员的意义解释如下：
	  
tab: array [0..tmax] of
	  
packed record
	  
name: alfa;{标识符的名字}
	  
link: index;{链表，链向同一块中的上一个标识符}
	  
obj: object;{种类，可以是常量，函数，变量等}
	  
typ: types;{数据类型，可以是整形，布尔形等}
	  
ref: index;{当为数组或者函数时，指向atab或者btab的索引}
	  
normal: boolean;{没太搞明白，标识符是变量形参为false}
	  
lev: 0..lmax;{嵌套的级别}
	  
adr: integer;{地址，变量是相对地址，函数是入口地址}
	  
end;
	  
2.2程序块表btab
	  
程序块表用变量b索引，程序中每个程序块都在该表对应一个入口。记录也被看作是一个块。它的数据结构定义和成员的意义解释如下：
	  
btab: array [1..bmax] of
	  
packed record
	  
last,{指向tab表，该块中最后的一个标识符在tab表中的位置}
	  
lastpar,{过程或者函数最后一个参数在tab中的位置}
	  
psize,{参数和保留区的大小}
	  
vsize: index{总大小}
	  
end;
	  
2.3数组表atab
	  
数组表用变量a索引，程序中每个数组都在该表对应一个入口。多维数组被看成数组的数组。它的数据结构定义和成员的意义解释如下：
	  
atab: array [1..amax] of
	  
packed record
	  
inxtyp,{索引下标的类型}
	  
eltyp: types;{数组元素的类型}
	  
elref, {指向atab或btab，数组的数组则指向atab索引，记录则指向btab的索引}
	  
low, high, {数组上下界}
	  
elsize, {数组元素的大小}
	  
size: index;{数组大小}
	  
end;
	  
另外，其他几种表的数据定义相对简单，在此就不做详细介绍了。
	  
三、词法分析程序
	  
Pascal-S一共定义了51个symbol，放在TYPE symbol构造类型中。词法分析的功能就是从文本文件中读取字符，识别为51个符号中的一个。
	  
词法分析程序主要有下面几个函数构成，它们的功能分别是：
	  
nextch：读取下一个字符
	  
insymbol：读取下一个符号
	  
readscale：读取浮点型的指数部分
	  
adjustscale：调整实数
	  
词法分析程序采用了缓冲技术，每次从文件中读取一行，放进缓冲中，然后再作处理。词法分析程序的总体功能是：跳过所有的空格和注释，读取一个symbol，然后把它放入id变量中，它的类型放入sy变量中。在查找关键字的时候，由于关键字已经事先排序，因此使用二分查找提高速度。
	  
处理注释的时候，发现了Pascal-S程序的两个隐藏的选项。以{或者(*开头，后面可以跟t+，t-，s+或者s-。分别表示是否打印表格和栈。
	  
词法分析程序就这样被组织成了一个子程序，供语法分析程序调用。当语法分析程序需要得到下一个symbol的时候，就调用insymbol函数，然后新得到的symbol的类型从sy中找，名字从id中找。
	  
四、语法分析程序
	  
语法分析是Pascal-S的重点，也占据了代码的最大篇幅。总体来说，Pascal-S的编译程序采用语法制导的翻译。词法分析，代码生成都是围绕语法分析展开的。语法分析子程序采用了自顶向下的递归子程序法，语法分析同时也根据程序的语意生成相应的代码，并提供了出错处理的机制。
	  
4.1 Pascal-S文法
	  
Pascal-S程序由block，statement, expression, term, factor等等构成，本部分试图描述Pascal-S的文法结构。描述方法参考ANSI C语言规范，tab表示and，换行表示or，opt下标表示可选，星号表示重复0次或若干次。
	  
Program:
	  
ProgramHeaderBlock

Block:
	  
(Declaration) optStatement

Declaration:
	  
(ConstDeclaration )opt(TypeDeclaration)opt(VaraiableDeclaration)optBlock

ConstDeclaration:
	  
CONSTIdentifier = Constant (; Identifier = Constant)*;

TypeDeclaration:
	  
TYPEIdentifier = Type (; Identifier = Type)*;

VaraiableDeclaration:
	  
VARIdentifier (, Identifier)\* : Type; (Identifier (, Identifier)\* : Type)*;

Statement:
	  
Variable := Expression
	  
BEGIN Statement (; Statment) END
	  
IF Expression THEN Statement (ELSE Statement) opt
	  
CASE Expression OF (Constant (, Constant) : Statement, )* END
	  
WHILE Expression Do Statement
	  
REPEAT Statement (, Statement)* Until Expression
	  
FOR Variable := Expression TO | DOWNTO Expression DO Statement

Expression:
	  
SimpleExpression (= | < | > | <> | >= | <= SimpleExpression) opt

SimpleExpression:
	  
(+ | -) opt Term (+ | &#8211; | OR Term)*

Term:
	  
Factor ( \* | / | DIV | MOD | AND Factor)\*

Factor:
	  
Constant
	  
Variable
	  
FunctionCall
	  
( Expression )
	  
NOT Factor

Constant:
	  
(+ | -) opt Identifier | Figure
	  
&lsquo; Character(Character)* &lsquo;

Identifier:
	  
Character(Character | Number)*

Figure:
	  
Number(Number)\*(.Number(Number)\*) opt (E(+ |-) opt Number(Number)*)) opt

五、代码生成和解释执行
	  
Pascal-S的编译系统并不直接生成机器码，而是生成类似于四元式的中间代码生成的代码被放在code数组中，Pascal-S共定一个59个四元式指令，编译没有错误后解释执行。
	  
这个过程模拟了一台可以运行中间代码指令的栈式计算机。它拥有一个栈式数据段用于存放运行期数据、拥有一个代码段用于存放中间代码。同时还拥用数据段分配指针、指令指针、指令寄存器、局部段基址指针等寄存器。
	  
解释执行类PCODE代码时，数据段存储分配方式如下：
	  
对于源程序的每一个Block（包括主程序），在被调用时，首先在数据段中开辟五个空间，存放静态链，动态链，返回地址，函数返回值和过程名在tab表中的位置。静态链记录了定义该过程的直接外过程（或主程序）运行时最新数据段的基地址。动态链记录调用该过程前正在运行的过程的数据段基址。返回� ��址记录了调用该过程时程序运行的断点位置。静态链的功能是在一个子过程要引用它的直接或间接父过程（这里的父过程是按定义过程时的嵌套情况来定的，而不是按执行时的调用顺序定的）的变量时，可以通过静态链，跳过个数为层差的数据段，找到包含要引用的变量所在的数据段基址，然后通过偏移地址访问它。 
	  
在过程返回时，解释程序通过返回地址恢复指令指针的值到调用前的地址，通过当前段基址恢复数据段分配指针，通过动态链恢复局部段基址指针。实现子过程的返回。对于主程序来说，解释程序会遇到返回地址为0的情况，这时就认为程序运行结束。
	  
四元式代码解释执行的部分通过循环和简单的case判断不同的指令，做出相应的动作。当遇到主程序中的返回指令时，指令指针会指到0位置，把这样一个条件作为终至循环的条件，保证程序运行可以正常的结束。
	  
六、后记
	  
花了半个多月的时间，终于算是把PL0和Pascal-S的源代码读了一遍。由于以前没有接触过Pascal代码，所以最初似乎无从下手，后来读源代码之前先学习了一下Pascal语言。
	  
PL0的源代码比较简单，也读得比较透彻。我以一个简单的PL0程序，从头到尾把PL0模拟执行了一遍。但是Pascal-S就没有那么幸运了。它比较复杂，不太可能去模拟Pascal-S编译程序执行，所以在阅读过程中很多地方都是猜的。肯定有这样那样的错误理解。
	  
不管怎么说，收获还是很大的。以前上编译课，词法分析语法分析的概念，理论，方法听了好多，但是还是对编译器没有什么概念。通过分析这两个小的编译器源代码，终于明白了编译器大概是个什么样子。也使编译的知识不再局限于书本。