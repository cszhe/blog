---
id: 9858
title: 在boot loader中加入启动画面及插值算法
date: 2007-10-24T10:13:00+00:00
author: omale
layout: post
guid: http://hezongjian.com/blog/?p=9858
permalink: '/2007/10/24/%e5%9c%a8boot-loader%e4%b8%ad%e5%8a%a0%e5%85%a5%e5%90%af%e5%8a%a8%e7%94%bb%e9%9d%a2%e5%8f%8a%e6%8f%92%e5%80%bc%e7%ae%97%e6%b3%95/'
category:   嵌入式  
tags:   Windows CE
  - 软件
---
最近有个朋友希望我帮忙给他的一块板子加一个启动画面。板子是用烂了的三星2410处理器。 不同之处就在于他的板子是640 x 480 VGA输出，而不是通常的240 x 320的LCD。

在Windows CE中，通常加入启动画面的方法很土，因为OS没有启动，所以没有什么BitBlt，StretchBlt等方法可以贴图，唯一的方法就是在启动的过程中，直接往显卡的Framebuffer里面写数据。这个工作一般在Boot Loader里面做，如果在OS启动的时候一般就太晚了，如果不加入人为的延时，启动画面刚一显示，就到了OS画面了。做法一般是这样，在Boot Loader里面：

BOOL OEMPlatformInit()  
{  
…………………………  
      
      
    // Init the Display  
    InitDisplay();

…………………………  
}

然后是InitDisplay函数一般如下所示：  
static void InitDisplay()  
{  
    int i = 0;  
 int j = 0;  
    volatile IOPreg *s2410IOP;  
    volatile LCDreg *s2410LCD;

    s2410IOP = (IOPreg *)IOP_BASE;  
    s2410LCD = (LCDreg *)LCD_BASE; 

    // LCD port initialize.  
    s2410IOP->rGPCUP  = 0xFFFFFFFF;  
    s2410IOP->rGPCCON = 0xAAAAAAAA;  
    s2410IOP->rGPCCON = 0xAAAAAAAA;

    s2410IOP->rGPDUP  = 0xFFFFFFFF;  
    s2410IOP->rGPDCON = 0xAAAAAAAA;

    s2410IOP->rGPGCON &= ~(3 << 8);                 /\* Set LCD_PWREN as output                          \*/  
    s2410IOP->rGPGCON |=  (1 << 8);

    s2410IOP->rGPGDAT |=  (1 << 4);                 /\* Backlight ON                                     \*/

 s2410LCD->rLCDCON1=(1<<8)|(MVAL_USED<<7)|(3<<5)|(12<<1)|0;  
        // TFT LCD panel,16bpp TFT,ENVID=off  
 s2410LCD->rLCDCON2=(VBPD<<24)|(LINEVAL_TFT<<14)|(VFPD<<6)|(VSPW);  
 s2410LCD->rLCDCON3=(HBPD<<19)|(HOZVAL_TFT<<8)|(HFPD);  
 s2410LCD->rLCDCON4=(MVAL<<8)|(HSPW);  
 s2410LCD->rLCDCON5=(1<<11)|(1<<9)|(1<<8)|(1<<3)|(1<<0); //FRM5:6:5,HSYNC and VSYNC are inverted  
 s2410LCD->rLCDSADDR1=((FRAMEBUF\_DMA\_BASE>>22)<<21)|M5D(FRAMEBUF\_DMA\_BASE>>1);  
 s2410LCD->rLCDSADDR2=M5D( (FRAMEBUF\_DMA\_BASE+(LCD\_XSIZE\_TFT\*LCD\_YSIZE\_TFT\*2))>>1 );  
 s2410LCD->rLCDSADDR3=(((LCD\_XSIZE\_TFT-LCD\_XSIZE\_TFT)/1)<<11)|(LCD\_XSIZE\_TFT/1);  
 //s2410LCD->rLCDINTMSK|=(3); // MASK LCD Sub Interrupt  
 s2410LCD->rLPCSEL&=(~7); // Disable LPC3600  
 s2410LCD->rTPAL=0; // Disable Temp Palette  
   
 s2410LCD->rLCDCON1 |= 1;

   
 // Display a bitmap image on the LCD&#8230;  
    //memcpy((void *)FRAMEBUF\_BASE, ScreenBitmap, ARRAY\_SIZE\_TFT\_16BIT);

 // Jason : Interpolation

 EdbgOutputDebugString(&#8220;+Interpolation\r\n&#8221;);

 for(i = 0; i < 320 * 240; i++)  
 {  
  PWORD pWord = (PWORD)ScreenBitmap;  
  PWORD pFrmBuf = (PWORD)FRAMEBUF_BASE;

  pFrmBuf[4 \* i &#8211; 2 \* (i % 320)] = pWord[i];  
  pFrmBuf[4 \* i &#8211; 2 \* (i % 320) + 1] = pWord[i];  
  pFrmBuf[4 \* i &#8211; 2 \* (i % 320) + 320 * 2] = pWord[i];  
  pFrmBuf[4 \* i &#8211; 2 \* (i % 320) + 1 + 320 * 2] = pWord[i];

 }

前面初始化硬件的代码没什么好看的。  
注意到memcpy((void *)FRAMEBUF\_BASE, ScreenBitmap, ARRAY\_SIZE\_TFT\_16BIT);这一句，这就是显示启动画面的关键了，直接调用memcpy函数，把一个大数组，复制到了FRAMEBUF_BASE这个地址。这个其实就是直接往显卡缓冲区里面填东西了。至于这个大数组，可以用Image2LCD等类似软件生成，也就是直接把一张位图转成C语言数组的软件，这东西在游戏开发中用的比较多。

一般情况下，这种方法都是OK的，但是现在遇到什么问题呢？

因为目标设备的显示分辨率是640 x 480 x 16位的，所以这个大数组需要多大的存储空间是可以算出来的：640 \* 480 \* 2 = 600KB。但是对于一般的boot loader而言，板子上不会划分这么大的空间给boot loader用，一般boot loader的空间只有256KB。（其实可以人为改，只不过这个板子用linux的loader 引导CE的loader，才产生这么多问题）。所以解决方法只能有下面两条：

1. 压缩，然后在运行时候解压缩，然后再memcpy。可以找一些最基本的通用开源压缩算法来完成。  
2. 插值，弄一张小图片，把它插值到640 x 480。

两者权衡，偶还是决定采用插值的办法，这样的工作量还是小一些的。其实也就是自己把StretchBlt函数实现了。

哎，本科的时候没有开设图形学，所以也不知道插值有没有具体的公式，只能自己推导了。好在这个不是一个通用的算法，只是放大4倍的这样一个特例。一个点变四个点，还是很容易的。自己拿着纸笔比划了一阵子，终于得出个公式来，公式不好帖，直接帖代码就是下面这样：

 for(i = 0; i < 320 * 240; i++)  
 {  
  PWORD pWord = (PWORD)ScreenBitmap;  
  PWORD pFrmBuf = (PWORD)FRAMEBUF_BASE;

  pFrmBuf[4 \* i &#8211; 2 \* (i % 320)] = pWord[i];  
  pFrmBuf[4 \* i &#8211; 2 \* (i % 320) + 1] = pWord[i];  
  pFrmBuf[4 \* i &#8211; 2 \* (i % 320) + 320 * 2] = pWord[i];  
  pFrmBuf[4 \* i &#8211; 2 \* (i % 320) + 1 + 320 * 2] = pWord[i];  
 }

只不过这次准备的是一张320 x 240的照片，然后采用一重的循环，把它写到framebuffer相应的位置去。

最终的效果还是不错的，不知道插值有没有更好的公式。如果有，也请告诉偶。呵呵。