---
id: 9922
title: 六度之离，Wallop及其他
date: 2005-01-30T00:00:00+00:00
author: omale
layout: post
guid: http://hezongjian.com/blog/?p=9922
permalink: '/2005/01/30/%e5%85%ad%e5%ba%a6%e4%b9%8b%e7%a6%bb%ef%bc%8cwallop%e5%8f%8a%e5%85%b6%e4%bb%96/'
category:   未分类
tags:   软件
---
去年软院的某个MM给了我Wallop的邀请，后来我又邀请了几个朋友，加上后来勾搭上的几个wallop友，人际网络可以说已经铺开了，但是使用度却一直上不去。不光是我，我所见之处几乎遍地荒芜，除了一些横七竖八的测试贴。

据说类似Wallop这类软件统称为“社会性网络服务（SNS）”，特别喜欢猜英文简称的我估计SNS应该是Social Network Service的缩写。“人与人之间存在信任传递关系，这个所谓的信任传递层次是有限的。个体与社会的成功互动必须建立在这个信任链条上。” 这是一个曾经获得诺贝尔奖的一个Social Network模型，也是Wallop此类社群软件的理论根基。

说来挺好玩，最早接触这个社会网络模型是上个学期不久帮助某个老师在US留学的女儿做vb.net的作业，那个作业大概的意思是如果要在好莱坞的一大群演员中找到与某一个演员的关系，只需要少于或等于六步，让我们写程序测试。这东西听起来可能挺难理解（这也是为啥当时我向那位教授妈妈解释了三五遍她仍然一头雾水的原因），也是到了后来我才知道，这个小程序的背后原来还隐藏着一个社会学的理论――六度之离（Six Degree of Separation）。再插一句，从这个小题目就可以看出美国的大学在教育理科学生Coding的时候，都不忘穿插一些人文理论知识。相比之下，国内的学生在大学上C语言等课程的时候，更多的是在谭爷爷的教导下写Student->Name = “LiMing”;

六度之离又叫小世界。35年以前，美国的一位心理学家米尔格伦（Stanley Milgram）在《今日心理学》杂志上提出了他的“六级分离”（Six Degrees of Separation）的理论。他认为，任何两个陌生人都可以通过“朋友的朋友”建立联系，而这两个人之间的朋友数量大约是五。通过朋友之链，世界就是如此之小。

Wallop的Network功能似乎就是在演示和验证这样的理论[如下图]。在flash的界面下，展开的Network的比较确赏心悦目，每个与自己有关系的人都可以被连在一起，然后还可以“顺藤摸瓜”的找下去。在浏览任何一个人的内容时，都可以使用快捷菜单中的“Point to me”功能查看此人与你的关系（不难想象，算法肯定是图的最短路径算法，应该再次感谢大侠Dijkstra）。但是我觉得这个样子还是不能完全表现出人与人之间的关系的。  
<img src=http://images.blogcn.com/2005/1/30/8/omale,20050130144445.jpg vspace=2 hspace=2 border=0 onload="javascript:if(this.width>screen.width/2)this.width=screen.width/2&#8243; onclick=&#8221;window.open(http://images.blogcn.com/2005/1/30/8/omale,20050130144445.jpg,_blank);&#8221;>

第一，人际关系应该是矢量而不是标量。也就是说，如果两个人有关系，有可能是单向的，也有可能是双向的。就像某句话说的“诗画双绝的风流才子唐伯虎谁不认识啊，只不过他不认识我而已”。但是目前Wallop只用一条线来表示人际关系，也就不能表达“我认识他，他不认识我”这一层意思。

第二，人际关系应该还有类别之分，例如师生关系，朋友关系，同学关系，亲戚关系，同事关系，情敌关系等等等。说得再白一点，Wallop的Network应该有分组功能。这点QQ，MSN都做的很不错了，Wallop却没有实现这个功能，不能不说是一大遗憾。想象当一个人的关系越来越复杂，然后把所有的关系都展现在同一个平面内，就不是什么赏心不赏心，悦目不悦目的问题了。

第三，人际不但应该是向量，而且还应该有权重，有优先级。比如朋友还应该分为亲密朋友，一般朋友，半面之交的朋友。仇人还可以分成一般仇人，老死不相往来的仇人，看见就想痛扁的仇人，杀父之仇……

总之呢，我觉得合理的人际关系的建模应该是可分类的，带权有向矢量。如下图所示。  
<img src=http://images.blogcn.com/2005/1/30/8/omale,2005013014468.gif vspace=2 hspace=2 border=0 onload="javascript:if(this.width>screen.width/2)this.width=screen.width/2&#8243; onclick=&#8221;window.open(http://images.blogcn.com/2005/1/30/8/omale,2005013014468.gif,_blank);&#8221;>

家里机器破，打开Wallop占用系统资源高总是busy hang。没法给MS发mail。哪个好心人把这篇文章整理成E文，当proposal发给MS，感激不尽了。

<font class=diary_poster>