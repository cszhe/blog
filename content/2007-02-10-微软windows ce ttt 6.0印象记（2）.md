---
title: 微软Windows CE TTT 6.0印象记（2）
date: 2007-02-10T22:48:50+00:00
author: omale
layout: post
category:   嵌入式  
tags:   C++  , Google  , Windows CE
---
<meta content="MSHTML 6.00.5730.11" name=GENERATOR>

<body leftMargin=3 topMargin=2>

<div>
  <div>
    <div>
      <div>
         
      </div>
      
      <div>
      </div>
      
      <div>
        6日，是培训的第二天，培训进入正轨了。上课的内容依然轻松。讲了Windows CE的内核体系结构，只有进程线程模型是变化最大的东西。Windows CE老的32 x 32的限制已经不复存在了。新的进程模型几乎可以容纳无穷多个进程。微软说是32000个，其实这个只是理论值，因为Handle table有64K大，每个进程最少也要占据2个handle，所以就算出来一个32k个进程。其实这么多进程，也只有理论上的意义了。随着进程模型变化的是虚拟内存模型，现在每个进程都有了自己的1GB可用私有空间，剩下3GB是一样的。但是无论如何，进程地址空间立体起来了，也由此引发了更多的变化。以后可能我会写专门的文章来阐述把，这里点到即止。其他的调度算法什么的基本没变。
      </div>
      
      <div>
         
      </div>
      
      <div>
        晚上去了我陆大伯家，陆大伯是我爸爸的好友，我爸爸年轻的时候整天去广东出差跑业务，认识了陆大伯，他跟我爸可是几十年的老交情，当年我高考的时候，我爸爸就一直想让我考中山大学，这样在广东还有个熟人可以依靠，后来还是没有去广东。我从上海机场买了无锡排骨，苏州豆腐干和上海点心，带过来给大伯，然后又在地摊上买了一些水果。打车不是很远就到了他家，一开始到他家之前还有点担心，担心会不会因为不太熟悉而尴尬，结果开始聊天之后，很快就进入状态了，他们很客气。我也跟他们聊了一些家常，不经意就10点钟了，我打车回到住处，大爷还特意把我送到了楼下，真是客气。
      </div>
      
      <div>
         
      </div>
      
      <div>
        7日，今天讲了BSP和Device Driver，只有用户泰驱动程序是新内容，其中的buffer marshal还是比较令人疑惑的，要回去好好钻研以下。究其原因，驱动程序的改变，也是由于进程模型的改变所致。如果还像以前一样的用户态驱动，呵呵，效率肯定必然一定是不敢恭维的。前科之鉴还是有的。用户态驱动的marsh问题也是比较不容易解决的。因为是C/C++这种非自描述的语言编程，又没有metadata来描述buffer的内容，所以微软现在采取的方法是只marshal first level的指针，如果指针指向结构体里面再套指针，对不起，不surpport。这也是无奈之举啊，如果要对嵌套指针进行支持，估计又要弄出一种自描述数据类型或者机制来，又走回了COM的老路。
      </div>
      
      <div>
         
      </div>
      
      <div>
        晚上下课之后，ICOP又要请日本Sato桑吃饭，又要让我当翻译，无奈，只能去当一次翻译了。那几个日本人去超市买了茶叶，果然是不会买，买了一些没听说过的xx茶，还自以为是好茶，我顺便给他们普及了一下茶的分类以及中国几大名茶的基本知识。8点钟他们逛超市回来。这次请他们去了川菜馆。饭前点了茶，倒茶小伙子的倒茶水平让日本人们饱了眼福。点菜后，吃了几个经典的川菜，喝了扎啤。我不能喝酒，只看着日本人跟ICOP的工程师喝得爽，我在旁边陪衬。ICOP邱工打来电话，跟Sato寒暄了几句。没想到吃完饭已经十点了。
      </div>
      
      <div>
         
      </div>
      
      <div>
        8日，今天是培训的扫尾阶段了，基本上将的内容都是比较白痴的内容，例如什么catalog view了，什么IDE了，什么pbcxml文件了，都是以前知道的东西，虽然有一些变化，比以前更加合理，但是只是开发的简化，并没有什么重要的内容。知道了解了就好。下午Sato桑跟老师说要明天再课堂上演示eBox，就是给ICOP一个做广告的机会，但是好像ICOP的那两个工程师反倒是不太热情。
      </div>
      
      <div>
         
      </div>
      
      <div>
        晚上陆大伯突然打电话，告诉我要请我吃晚饭，虽然今天晚上MS要请客，而且还有聚餐，还有smartphone抽奖，当然是家事为重了。放了MS的鸽子。陆大伯全家出动，他的儿子开了一辆广州本田奥德赛，请我吃了一顿丰盛的晚宴，临走还给了我两包广式糖果跟点心，让我带回去，送给我的父亲跟女友，真的是很好客。
      </div>
      
      <div>
         
      </div>
      
      <div>
        9日是TTT的最后一天，其实已经没有实质的内容了，十点上课，就介绍了一个CETK，然后就没有内容了。不过对于我来说，还有责任给所有参与会议的人介绍一下eBox。早上一大早就来到ICOP广州Office，Sato已经在那里开始干活了，他build了一个很好的image，然后打算在ebox2上跑，结果后来也没有运行起来。Sato介绍完了之后，就轮到我在中文那里介绍。顶多花了10分钟吧，驾轻就熟。不过好像没有几个人想听的。上午吃完饭之后，TTT正式培训就结束了。最后有个lucky draw抽奖，两台smartphone，这种事情，当然没有我的份了。
      </div>
      
      <div>
        <img style="WIDTH: 710px; HEIGHT: 598px" height=934 src="http://lh4.google.com/image/hezongjian/Rc3Y_ALqGLI/AAAAAAAAARA/EX5uKC7nKjY/CIMG0500.JPG" width=1186>
      </div>
      
      <div>
         
      </div>
      
      <div>
         
      </div>
      
      <div>
         
      </div>
    </div>
  </div>
</div>