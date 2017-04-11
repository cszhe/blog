---
id: 9742
title: 一次Windows CE下调试内存泄露的经历
date: 2004-11-03T00:41:00+00:00
author: omale
layout: post
guid: http://hezongjian.com/blog/?p=9742
permalink: '/2004/11/03/%e4%b8%80%e6%ac%a1windows-ce%e4%b8%8b%e8%b0%83%e8%af%95%e5%86%85%e5%ad%98%e6%b3%84%e9%9c%b2%e7%9a%84%e7%bb%8f%e5%8e%86/'
category:   未分类  
tags:   Windows CE
  - 嵌入式
---
上周二，软院的万老师打电话告诉我，说汽车学院以前写的一个Windows CE程序内存泄露比较严重。想让我帮忙调试一下。结果上一周都没有时间，昨天周一到软院上课的时候，听王老师说那个泄露程序已经惊动了同济大学校长万钢，因为他要拿那个程序给领导演示，不能再拖了。偶颇有点临危受命的感觉。晚上下了课，就一头扎到研发中心的机器前，开始工作。
	  
这是一个电子仪表程序，代码从串口读取汽车数据，包括车速，油亮，车轮转速等等，然后解析数据，并把数据显示在屏幕上。在研华7230的开发板上运行，结果不出10秒钟就弹出对话框，Out of Memory! Win CE这个小嵌入式系统，每个进程只有32M的虚拟地址空间。他那个程序本身就有4M的样子（因为有太多的图片）。
	  
我首先想到的是把这个程序在Windows上重新编译运行，因为毕竟这段代码没有用到什么Windows CE特有的函数，全是通用的Win32 API。而且在Windows下调试内存泄露还有大量的工具和经验可以利用。说干就干，打开VC6，新建一个工程，Copy文件，编译，几个小Error拦不住我，马上一个Executable File就出来了。下面安装在GTEC时候常用的LeakDiag和Numega的BoundsChecker。但是，出乎我意料的是，这个程序无论是用LeakDiag还是BoundsChecker，都没有检测到大规模的内存泄露，只有一个HBRUSH的HANDLE没有释放，这个不可能成为Out Of Memory的原因。而且使用Windows的任务管理器和Performance Monitor查看，进程的物理内存，虚拟内存和GDI句柄数都很稳定，没有上升。第一次尝试失败了。
	  
但是，这个程序在Windows CE开发板上跑，的确是会内存泄露的。下面，我想到既然在Windows下面不会泄露，那么会不会是研华提供的BSP的显示驱动程序有内存泄露呢？这个主意马上被我否决了。如果是显示驱动有内存泄露，根本不用等到跑这个程序才会Out of Memory。单单跑Windows CE就足以让整个系统Crash了。
	  
走到这步，内存泄漏的原因我也说不清了。那就先看看到底是哪些代码在泄。好在Microsft为Windows CE提供了Remote Performance Monitor工具，通过ActiveSync，我们可以在PC机上远程查看Windows CE上的一些信息。这样，通过查看那个程序的Heap Memory使用情况，不就可以找到内存泄露的地方了么？
	  
我打开Platform Builder，使用研华的BSP重新编译了一个支持ActiveSync的平台，然后在这个平台上跑了一下那个程序，泄漏依旧。打开EVC，终于，现在可以借助ActiveSync一步一步地在远程开发板上调试了。首先启动应用程序，然后再打开Remote Performance Monitor监测进程的Heap Memory。经过几个回合的查找，我终于找到是在这个程序的计时器重画的时候，有五个函数导致内存泄露，五个函数的代码差不多，大致都像下面一样：

void CEvcFCVDlg::ClockPainting_N(double dblClockStartData, double dblClockEndData, double dblClockStartAngel, double dblClockEndAngel, double dblClockData, int nClockLength, int nClockLengthOffset, int nStartWidth, int nEndWidth, int nColorRGB, int nPicture, CPoint CPOrintalOffset)
	  
{
	  
int nWidth;
	  
 int nHeight;
	  
 
	  
 int nPenWidth=0;
	  
 CRect crecXY;
	  
 CRect rect;
	  
 int xLength=0;
	  
     int yLength=0;
	  
 
	  
    CWnd* pWnd=GetDlgItem(nPicture);
	  
 CDC* pDC=pWnd->GetDC();
	  
 pWnd->UpdateWindow();
	  
 pWnd->GetWindowRect(rect);
	  
 pWnd->GetWindowRect(crecXY);
	  
 
	  
 nWidth=rect.Width();
	  
 nHeight=rect.Height();
	  
     
	  
 CDC  MemDC;
	  
 CBitmap  MemBitmap;
	  
 
	  
 MemDC.CreateCompatibleDC (NULL);
	  
 MemBitmap.CreateCompatibleBitmap(pDC,nWidth,nHeight);
	  
     
	  
 CBitmap *pOldBit=MemDC.SelectObject(&MemBitmap);
	  
     MemDC.FillSolidRect(0,0,nWidth,nHeight,RGB(255,255,255));
	  
 
	  
     //////////////////////////////////////////////   
	  
 pWnd->GetClientRect(rect);

 BITMAP bm;
	  
 CDC dcMem;

 m_bmpN.GetObject(sizeof(bm),&bm);    
	  
 dcMem.CreateCompatibleDC(pDC);
	  
 
	  
    CBitmap \*pOldBMP =(CBitmap\*)dcMem.SelectObject(&m_bmpN);
	  
     
	  
 MemDC.BitBlt( (rect.right-bm.bmWidth)/2,(rect.bottom-bm.bmHeight)/2,bm.bmWidth,bm.bmHeight,&dcMem,0,0,SRCCOPY);
	  
     
	  
 dcMem.SelectObject(pOldBMP);
	  
   
	  
 /////////////////////////////////////////
	  
 double dblADk=-1;//计算作图角度时的系数。
	  
 double dblClockAngel;
	  
 if((dblClockEndAngel-dblClockStartAngel)<0){
	  
 dblADk=(360+(dblClockEndAngel-dblClockStartAngel))/(dblClockEndData-dblClockStartData);
	  
 }
	  
 else{
	  
 dblADk=(dblClockEndAngel-dblClockStartAngel)/(dblClockEndData-dblClockStartData);
	  
 }
	  
 
	  
 nClockLength=(nClockLength)/(nStartWidth-nEndWidth);
	  
 
	  
 //计算dblClockAngel,最后化成弧度;
	  
 dblClockAngel=(3.1416/180)\*((dblClockData-dblClockStartData)\*dblADk+dblClockStartAngel);
	  
 
	  
     
	  
 xLength=crecXY.Width()/2+CPOrintalOffset.x;
	  
     yLength=crecXY.Height()/2+CPOrintalOffset.y;
	  
 
	  
 for(int i=nStartWidth;i>nEndWidth;&#8211;i)
	  
 {
	  
 nPenWidth=i;
	  
 CPen newPen(PS_SOLID,nPenWidth,nColorRGB);//RGB(0,0,255)
	  
     CPen* pOldPen=MemDC.SelectObject(&newPen);
	  
     MemDC.MoveTo(xLength+nClockLengthOffset\*cos(dblClockAngel),yLength+nClockLengthOffset\*sin(dblClockAngel));
	  
 MemDC.LineTo((nClockLength\*(nStartWidth-i)+nClockLengthOffset)\*cos(dblClockAngel)+xLength,(nClockLength\*(nStartWidth-i)+nClockLengthOffset)\*sin(dblClockAngel)+yLength);    
	  
 
	  
 if(i==nStartWidth)
	  
 MemDC.SetPixel(xLength+nClockLengthOffset\*cos(dblClockAngel),yLength+nClockLengthOffset\*sin(dblClockAngel),nColorRGB);
	  
    
	  
 MemDC.SelectObject(pOldPen);
	  
 }
	  
     //////////////////////////////////////////////
	  
 
	  
 pDC->BitBlt(0,0,nWidth,nHeight,&MemDC,0,0,SRCCOPY);
	  
 pWnd->ReleaseDC (pDC);    
	  
 MemBitmap.DeleteObject();
	  
 MemDC.DeleteDC();
	  
}

然后，我又调试了几轮，最后终于把泄漏的代码定位到了这一行：
	  
MemBitmap.CreateCompatibleBitmap(pDC,nWidth,nHeight);
	  
也就是说，创建的Bitmap没有被释放掉。但是，这段代码的最后面，的确有MemBitmap.DeleteObject();来释放bitmap阿。我打开Windows CE的MSDN，查找CreaeteCompatibleBitmap和DeleteObject的解释，一会儿，我的目光锁定在了DeleteObject的解释上：Zero indicates that the specified handle is not valid or that the handle is currently selected into a device context. 对！会不会是DeleteObject失败了呢？我把那句话改成了BOOL fRet = MemBitmap.DeleteObject(); 果然，返回值是0！再仔细查看一下上面的代码，我发现这个时候MemBitmap的确被MemDC占用！好，既然是这样，在
	  
pDC->BitBlt(0,0,nW idth,nHeight,&MemDC,0,0,SRCCOPY);
	  
pWnd->ReleaseDC (pDC);
	  
两句之间添加一行MemDC->SelectObject(pOldBit); 然后再跑一下，果然，DeleteObject成功了！那么，内存泄漏是否就此解决了呢？我把代码编译成Release版本，然后在开发板上重新跑了起来，结果真没让人失望，10分钟过去了，那个讨厌的Out of Memory对话框还没有跳出来。搞定！这个时候，机房关门的时间也到了。颇有点最后一刻投篮中的扭转乾坤的感觉！
	  
回招待所的路上，我都很兴奋，好久都没有从Coding中体会到成就感的乐趣了，记得刚刚转到软院，写那个简单的扫雷和画图的时候，当实现了扫雷的递归翻开和画图的Redo， UnDo的时候，曾经有过这样的感觉。回到招待所，给GF发了条短信，希望她也能分享我的快乐。
	  
总结一下，可以有这么一些经验教训：
	  
1．Windows CE和Windows虽然都使用Win 32 API作为编程接口，但是API内部的实现是不一样的。同样的代码，那个程序在Windows下Bitmap可以正常删除，但是在CE下，DeleteObject就失败了。
	  
2．Windows下的调试技巧，还是可以拿来Windows CE上用的。就像那本书上说的&ldquo;It&rsquo;s still Windows Programming&rdquo;
	  
3．不要轻易去怀疑是操作系统的bug，遇到问题先从自己那里着手。
	  
4．Enjoy the joy of coding！