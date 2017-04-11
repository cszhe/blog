---
id: 10359
title: Android开发学习笔记
date: 2010-05-02T20:30:34+00:00
author: omale
layout: post
guid: http://hezongjian.com/blog/?p=10359
permalink: '/2010/05/02/android%e5%bc%80%e5%8f%91%e5%ad%a6%e4%b9%a0%e7%ac%94%e8%ae%b0/'
category:   嵌入式  
---
买了Android手机，经过了一天的尝鲜期之后，开始学习Android编程开发了。毕竟以后学院的《移动设备开发》这门课将由我来上。没办法，三十岁的老程序员又开始学习编程了。

记录一些学习笔记，持续更新中。

================================================================

Part 1 基础部分

Android分层：Hardware -> Linux Kernel -> Dalvik VM -> Android Libraries -> App

Dalvik不是标准java实现，增加了自有的指令，基于寄存器的虚拟机，很多代码来自Apache Harmony (这个和谐啊)

  * 单个可执行文件：.class -> .dex的文件。
  * 打包后的文件：.jar -> .apk（其实就是zip，这导致android汉化没难度了，连PE文件格式解析器都不用了，直接unzip + notepad就行了）

Android Libraries都以android namespace开头，包括view, app, util, widget, webkit等。

Android支持多任务，系统同时可以运行6个任务，超过6个将会被杀死，长按home按钮可以看到正在运行的6个任务。

Android每个任务都运行在独立的linux进程中，有独立的dalvik实例，并且有独立的用户ID。（这个太狠了，比.NET啥的都狠）不过也有办法让多个任务运行在同一个instance中，共享同一个 vm instance。

Android的设备不可能做到iphone一样只有一个按钮，至少要有home, back和context menu三个按键。

盈利模式：Android Market分成 + Google Service

* * *

Part 2 开发环境搭建

所需内容：JDK + eclipse + Android SDK + ADT(Google开发的Eclipse扩展插件)

编程语言：SDK支持java，NDK支持C/C++，另外开发还可以用Simple语言，类BASIC（Bill Gates内牛满面&#8230;.）

* * *

Part 3 开发起步

一个由IDE生成的Android项目包括如下文件：

`|   .classpath<span class="Apple-tab-span" style="white-space: pre"> </span>// xml路径文件`

`|   .project<span class="Apple-tab-span" style="white-space: pre"> </span>// xml项目文件`

`|   AndroidManifest.xml<span class="Apple-tab-span" style="white-space: pre"> </span>// android程序配置文件`

`|   default.properties<span class="Apple-tab-span" style="white-space: pre"> </span>// android的build system用的`

`+---.settings   // 设置信息`

`+---assets<span class="Apple-tab-span" style="white-space: pre"> </span>// 目前暂时为空`

`+---bin<span class="Apple-tab-span" style="white-space: pre"> </span>// 编译生成的东西`

`|   |   classes.dex<span class="Apple-tab-span" style="white-space: pre"> </span>// delvik vm的可执行文件`

`|   |   HelloAndroid.apk<span class="Apple-tab-span" style="white-space: pre"> </span>// android的可执行文件`

`|   |   resources.ap_<span class="Apple-tab-span" style="white-space: pre"> </span>// 资源文件`

`|   \---com`

`|       \---hezongjian<span class="Apple-tab-span" style="white-space: pre"> </span>// java编译生成的class`

`|               MyActivity.class`

`|               R.class         `

`+---gen<span class="Apple-tab-span" style="white-space: pre"> </span>// R.java，类似于resource.h`

`|   \---com<span class="Apple-tab-span" style="white-space: pre"> </span>// IDE自动管理，定义一些常量`

`|       \---hezongjian`

`|               R.java`

`|               `

`+---res<span class="Apple-tab-span" style="white-space: pre"> </span>// 资源`

`|   +---drawable-hdpi<span class="Apple-tab-span" style="white-space: pre"> </span>// 各种分辨率的资源     `

`|   +---drawable-ldpi`

`|   +---drawable-mdpi    `

`|   +---layout<span class="Apple-tab-span" style="white-space: pre"> </span>// 界面UI布局`

`|   |       main.xml     // 主界面布局xml文件`

`|   \---values`

`|           strings.xml     // 字符串资源 `

`\---src<span class="Apple-tab-span" style="white-space: pre"> </span>// 源代码目录`

`    \---com`

`        \---hezongjian`

`                MyActivity.java<span class="Apple-tab-span" style="white-space: pre"> </span>// 主程序java文件`

 

android程序UI采用流行的xml文件定义，例如main.xml，可以在xml中设定各个控件。

 

主java文件的内容

 

`public class MyActivity extends Activity {  // 从Activity继承一个自己的行动`

`    public void onCreate(Bundle savedInstanceState) {  // 重写onCreate`

`        super.onCreate(savedInstanceState);`

`        setContentView(R.layout.main);  // 根据xml文件来设置view的内容`

`    }`

`}`

<font class="Apple-style-span" face="monospace">下面是增加messagebox的内容，方法是用android.widget.Toast中的方法。这个对话框过一会儿自己会消失，跟Windows上的不一样。</font>

`public boolean onTouchEvent(MotionEvent event) {`

`Toast.makeText(this, "Hello", Toast.LENGTH_SHORT).show();`

`return super.onTouchEvent(event);`

<span class="Apple-style-span" style="font-family: monospace">}</span>

或者也可以这样：

 

`AlertDialog.Builder alert = new AlertDialog.Builder(this)`

`alert.setTitle("Title");  `

`alert.setMessage("Hello World");`

`alert.show();`

用android.app下的AlertDialog来实现，不过AlertDialog功能比较强大，在这里是大炮打蚊子了。

 

Android应用程序由如下几个部分构成，但都不是必须的：

  * Activity: 就是一个window，当然和window不一样。
  * Broadcast Receiver:就是接受系统广播的东西
  * Content Provider:向其他程序提供数据，例如你是一个杀毒软件，你要向其它程序提供当前系统安全级别
  * Service: 就是一个service。

Android的task就是一个Activity的stack。一个task可以调用其他程序中的activity，然后放在自己的task stack里面，这样看起来其它任务就成了自己的一部分。这个设计比树形的windows tree要新颖多了。

这些部分需要由Intent来组合。Intent是一个非常抽象的东西。看了很多中文解释或翻译都不明白。而英文原版网页被GFW给Ban了。无奈翻墙看developer.android.com上的东西，哎呀，再清楚明白不过了。估计需要文章再详细解释了。

 

* * *