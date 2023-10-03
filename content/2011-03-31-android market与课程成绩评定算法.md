---
id: 10599
title: Android Market与课程成绩评定算法
date: 2011-03-31T10:54:53+00:00
author: omale
layout: post
guid: http://hezongjian.com/blog/?p=10599
permalink: '/2011/03/31/android-market%e4%b8%8e%e8%af%be%e7%a8%8b%e6%88%90%e7%bb%a9%e8%af%84%e5%ae%9a%e7%ae%97%e6%b3%95/'
category:   工作和学习  
---
本学期开设Android课程，要求所有同学的软件都要上传到Android Market里面，并且根据Market的表现占课程成绩的一部分。虽然学院很多课程都要做项目，但是课程项目要全球发布，接受全球考验却是第一回。绞尽脑汁想了一个评估算法，今年先尝试一下，是否合理，课程项目考核要求如下：

 

 



<div style="mso-element:para-border-div;border:none;border-bottom:solid #4F81BD 1.0pt;
mso-border-bottom-themecolor:accent1;padding:0in 0in 4.0pt 0in">
  </p> 
  
  <p class="MsoTitle">
    <span lang="ZH-CN" style="font-family:微软雅黑;mso-hansi-font-family:
微软雅黑;mso-fareast-language:ZH-CN">移</span><span lang="ZH-CN" style="font-family:
微软雅黑;mso-hansi-font-family:微软雅黑;mso-bidi-font-family:宋体;mso-fareast-language:
ZH-CN">动应</span><span lang="ZH-CN" style="font-family:微软雅黑;mso-hansi-font-family:
微软雅黑;mso-fareast-language:ZH-CN">用开</span><span lang="ZH-CN" style="font-family:
微软雅黑;mso-hansi-font-family:微软雅黑;mso-bidi-font-family:宋体;mso-fareast-language:
ZH-CN">发课</span><span lang="ZH-CN" style="font-family:微软雅黑;mso-hansi-font-family:
微软雅黑;mso-fareast-language:ZH-CN">程</span><span lang="ZH-CN" style="font-family:
微软雅黑;mso-hansi-font-family:微软雅黑;mso-bidi-font-family:宋体;mso-fareast-language:
ZH-CN">项</span><span lang="ZH-CN" style="font-family:微软雅黑;mso-hansi-font-family:
微软雅黑;mso-fareast-language:ZH-CN">目</span>
  </p>
</div>

<p align="right" class="MsoNormal" style="text-align:right">
  <span style="font-family:
微软雅黑;mso-hansi-font-family:微软雅黑;mso-fareast-language:ZH-CN">2011<span lang="ZH-CN">年春季学期</span></span>
</p>

<p class="MsoNormal">
  <span lang="ZH-CN" style="font-family:微软雅黑;mso-hansi-font-family:
微软雅黑;mso-fareast-language:ZH-CN">亲爱的同学们：</span>
</p>

<p class="MsoNormal">
  <span lang="ZH-CN" style="font-family:微软雅黑;mso-hansi-font-family:
微软雅黑;mso-fareast-language:ZH-CN">你可知道，</span>
</p>

<p class="MsoNormal">
  <span style="font-family:微软雅黑;mso-hansi-font-family:微软雅黑;
mso-fareast-language:ZH-CN">Angry Birds<span lang="ZH-CN">的开发人员只有</span>55<span lang="ZH-CN">人（</span>2011<span lang="ZH-CN">）</span></span>
</p>

<p class="MsoNormal">
  <span style="font-family:微软雅黑;mso-hansi-font-family:微软雅黑;
mso-fareast-language:ZH-CN">Fruit Ninja<span lang="ZH-CN">的开发者</span>Half Brick<span lang="ZH-CN">只是一个</span>Studio</span>
</p>

<p class="MsoNormal">
  <span style="font-family:微软雅黑;mso-hansi-font-family:微软雅黑;
mso-fareast-language:ZH-CN">Plants VS Zombies<span lang="ZH-CN">的</span>PopCap<span lang="ZH-CN">只有</span>180<span lang="ZH-CN">人（</span>2011<span lang="ZH-CN">）</span></span>
</p>

<p class="MsoNormal">
  <span style="font-family:微软雅黑;mso-hansi-font-family:微软雅黑;
mso-fareast-language:ZH-CN">Talking Tom<span lang="ZH-CN">的</span>Outfit7<span lang="ZH-CN">只有不到</span>20<span lang="ZH-CN">个斯洛文尼亚人</span></span>
</p>

<p class="MsoNormal">
  <span style="font-family:微软雅黑;mso-hansi-font-family:微软雅黑;
mso-fareast-language:ZH-CN">OpenFeint<span lang="ZH-CN">成立于</span>2008<span lang="ZH-CN">年，</span>CEO<span lang="ZH-CN">今年才</span>25<span lang="ZH-CN">岁。</span></span>
</p>

<p class="MsoNormal">
  <span lang="ZH-CN" style="font-family:微软雅黑;mso-hansi-font-family:
微软雅黑;mso-fareast-language:ZH-CN">&hellip;&hellip;&hellip;&hellip;</span>
</p>

<p class="MsoNormal">
  <span style="font-family:微软雅黑;mso-hansi-font-family:微软雅黑;
mso-fareast-language:ZH-CN">Bill Gates<span lang="ZH-CN">，</span>Dennis Richie<span lang="ZH-CN">，求伯君、王江民式的&ldquo;个人英雄&rdquo;在移动设备上已经回归。</span></span>
</p>

<p class="MsoNormal">
  <span lang="ZH-CN" style="font-family:微软雅黑;mso-hansi-font-family:
微软雅黑;mso-fareast-language:ZH-CN">而你，还在等什么呢？拿起</span><span style="font-family:
微软雅黑;mso-hansi-font-family:微软雅黑;mso-fareast-language:ZH-CN">Android<span lang="ZH-CN">手机，出发吧！</span></span>
</p>

<p class="MsoNormal">
  <span lang="ZH-CN" style="font-family:微软雅黑;mso-hansi-font-family:
微软雅黑;mso-fareast-language:ZH-CN">让下一个</span><span style="font-family:微软雅黑;
mso-hansi-font-family:微软雅黑;mso-fareast-language:ZH-CN">Angry Birds, PvZ<span lang="ZH-CN">从你的手中诞生！</span></span>
</p>

<p class="MsoNormal">
  <span style="font-family:微软雅黑;mso-hansi-font-family:微软雅黑;
mso-fareast-language:ZH-CN"> </span>
</p>

## <span lang="ZH-CN" style="font-family:宋体;mso-hansi-font-family:宋体;mso-bidi-font-family:
宋体;mso-fareast-language:ZH-CN">项</span><span lang="ZH-CN" style="font-family:
宋体;mso-ascii-font-family:Calibri;mso-ascii-theme-font:major-latin;mso-fareast-font-family:
宋体;mso-fareast-theme-font:major-fareast;mso-fareast-language:ZH-CN">目要求：</span>

<p class="MsoNormal">
  <span lang="ZH-CN" style="font-family:微软雅黑;mso-hansi-font-family:
微软雅黑;mso-fareast-language:ZH-CN">基于</span><span style="font-family:微软雅黑;
mso-hansi-font-family:微软雅黑;mso-fareast-language:ZH-CN">Android<span lang="ZH-CN">的应用程序开发，游戏、应用等类型不限。</span></span>
</p>

<p class="MsoNormal">
  <span lang="ZH-CN" style="font-family:微软雅黑;mso-hansi-font-family:
微软雅黑;mso-fareast-language:ZH-CN">可独立开发，可团队开发。如果团队开发小组不得大于</span><span style="font-family:微软雅黑;mso-hansi-font-family:微软雅黑;mso-fareast-language:ZH-CN">4<span lang="ZH-CN">人。</span></span>
</p>

## <span lang="ZH-CN" style="font-family:宋体;mso-ascii-font-family:Calibri;
mso-ascii-theme-font:major-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:
major-fareast;mso-fareast-language:ZH-CN">成</span><span lang="ZH-CN" style="font-family:宋体;mso-hansi-font-family:宋体;mso-bidi-font-family:宋体;
mso-fareast-language:ZH-CN">绩评</span><span lang="ZH-CN" style="font-family:&quot;MS Mincho&quot;;
mso-bidi-font-family:&quot;MS Mincho&quot;;mso-fareast-language:ZH-CN">定要求</span><span lang="ZH-CN" style="font-family:宋体;mso-ascii-font-family:Calibri;mso-ascii-theme-font:
major-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:major-fareast;
mso-fareast-language:ZH-CN">：</span>

<p class="MsoNormal">
  <span lang="ZH-CN" style="font-family:微软雅黑;mso-hansi-font-family:
微软雅黑;mso-fareast-language:ZH-CN">主观分数：</span><span style="font-family:微软雅黑;
mso-hansi-font-family:微软雅黑;mso-fareast-language:ZH-CN">50%</span>
</p>

<p class="MsoNormal">
  <span lang="ZH-CN" style="font-family:微软雅黑;mso-hansi-font-family:
微软雅黑;mso-fareast-language:ZH-CN">客观分数：</span><span style="font-family:微软雅黑;
mso-hansi-font-family:微软雅黑;mso-fareast-language:ZH-CN">20%</span>
</p>

<p class="MsoNormal">
  <span style="font-family:微软雅黑;mso-hansi-font-family:微软雅黑;
mso-fareast-language:ZH-CN">Android Market<span lang="ZH-CN">中的表现：</span>30%</span>
</p>

<p class="MsoNormal">
  <span lang="ZH-CN" style="font-family:微软雅黑;mso-hansi-font-family:
微软雅黑;mso-fareast-language:ZH-CN">其中：</span>
</p>

<p class="MsoNormal">
  <span style="font-family:微软雅黑;mso-hansi-font-family:微软雅黑;
mso-fareast-language:ZH-CN">Android Market<span lang="ZH-CN">的表现算法如下：</span></span>
</p>

<p class="MsoNormal">
  <span style="font-family:微软雅黑;mso-hansi-font-family:微软雅黑;
mso-fareast-language:ZH-CN">Min(1, Di / Avg(D1..Dn) ) * (1 + (n &ndash; 3)/10) * 100</span>
</p>

<p class="MsoNormal">
  <span lang="ZH-CN" style="font-family:微软雅黑;mso-hansi-font-family:
微软雅黑;mso-fareast-language:ZH-CN">其中</span><span style="font-family:微软雅黑;mso-hansi-font-family:微软雅黑;
mso-fareast-language:ZH-CN">Di<span lang="ZH-CN">为你的下载量。</span>n<span lang="ZH-CN">为你的游戏的评级，取值为</span>1-5<span lang="ZH-CN">。</span>Avg<span lang="ZH-CN">（</span>D1..Dn<span lang="ZH-CN">）为所有同学提交程序的平均下载量。</span> <br /> </span>
</p>

重点说一下这个评价算法吧。主要有两个考量指标，一个是下载量，一个是用户评星。下载量来作为基础打分依据，用户评星用来作为附加奖励/惩罚。

基本想法是这样的：

分母是班上所有作品的平均下载量，分子是你的项目的下载量。这样得出你的项目的基础分，之所以用平均下载量作为分母，不用最高下载量作为分母，是为了防止某些太差的项目被甩开好几条街，或者第一名太强大拉低整体分数。比方第一名下载10000份，而其它项目基本都在1000份左右，那大多数人基础分只能得10分，太杯具。当然，如果基础分大于1，也就是超过平均下载量，那么就按1来算。

用户评星作为奖惩附加标准，以3星作为基本评星。多一颗星，基础分就上浮10%，少一颗星，基础分就下浮10%。

不知道这个评价标准是否可行，今年7月所有作品上架之后见分晓吧。或者大家有没有啥更科学合理的算法，拿出来分享一下。

 