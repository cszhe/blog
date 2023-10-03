---
id: 10649
title: write once, run everywhere! everywhere?
date: 2011-07-22T16:24:01+00:00
author: omale
layout: post
guid: http://hezongjian.com/blog/?p=10649
permalink: /2011/07/22/write-once-run-everywhere-everywhere/
category:   工作和学习  
---
給香港地鐵寫了一週的java代碼，真是受罪。怪不得Java的Desktop編程不行，感覺連MFC都不如，UI上的控件要一點一點用代碼寫出來，人家MFC至少還有個Dialog可以所見即所得的拖拽。而且還沒有AbsoluteLayout，都是相對佈局，累死人了。對於習慣了Android的XML來構造的人來說，簡直是一覺回到解放前啊。

不管怎麽說，還是小有成果的。寫完代碼之後，打成个jar包，要發佈給Customer。發郵件之前好奇，從虛擬機裏面出來，跑到mac下面double click了一下我的程序，除了啟動速度很慢之外，居然還真跑起來了。Chart，Table等復雜控件，Derby database都沒問題。是不是突然感覺java的巨大優勢。

[<img class="aligncenter size-medium wp-image-10650" height="218" src="/uploads/2011/07/java-300x218.png" title="java" width="300"  />](/uploads/2011/07/java.png)

這個就是java一直標榜的run everywhere，當然我們都知道這個不過是廣告語。忽悠不明真相群眾的。以前我在一本C語言教材上，還看到說C語言的優點是移植性好，跨平臺呢。人家是跟匯編比較的。java可以用虛擬機屏蔽一部分OS的差異，但是不能屏蔽所有差異。比方說下面這個UI：

[<img class="aligncenter size-medium wp-image-10651" height="212" src="/uploads/2011/07/COM-300x212.png" title="COM" width="300" />](/uploads/2011/07/COM.png)

我們的無線傳感器採集到的數據，是通過USB轉串口傳過來的，到Mac上傻眼了吧，木有COM口。要用＊nix風格的/dev/ttyUSB*這種了。

順便，上面這個圖上是Java Swing的Bug麽？把COM口的下拉菜單打開，然後拖動一下窗口，下拉菜單沒有消失，也沒有跟著窗口走，居然還停留在原位置，比較不可思議。