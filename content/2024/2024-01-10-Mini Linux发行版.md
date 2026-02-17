---
layout: post
title: Mini Linux发行版
date: 2024-01-10 18:06
category: 工作和学习
tags:
  - Geek
  - Linux
---
发行版跟内核比, 复杂多了. 你得有个安装程序, 有个包管理器, 有个软件仓库, 有个GUI, 有个桌面, 有个窗口管理器, 有个登录管理器, 有个网络管理器, 有个音频管理器, 有个电源管理器, 有个文件管理器, 有个文本编辑器, 有个终端模拟器, 有个浏览器, 有个邮件客户端, 有个音乐播放器, 有个视频播放器, 有个图片查看器, 有个PDF阅读器, 有个打印机管理器, 有个截图工具, 有个录屏工具, 有个截屏工具, 有个系统监控工具, 有个系统设置工具, 有个系统日志工具, 有个系统更新工具, 有个系统备份工具, 有个系统还原工具...... 但是核心的东西其实就三块:

- Boot loader
- Kernel
- 用户态程序

把这三个弄齐了, 你就可以号称有发行版了. 所以我们现在开始吧, 所有操作都是在一台Ubuntu 22.04的虚拟机上完成的.

## 1. install prerequisite 

```bash
apt install build-essential flex libncurses5-dev bc libelf-dev bison libssl-dev
```

这些包待会编译的时候都用得到. 

## 2. build the source

内核编译反倒比较简单, 且这20年几乎没变过. 不过源代码可以直接互联网上check out了, 不用从光盘拷贝了.

```bash
git clone --depth=1 https://github.com/torvalds/linux.git

make menuconfig
make -j 32
```

我这台虚拟机有32个vCPU, 所以启动32个并行进程编译. 一般来说, 你的CPU有多少个核, 就启动多少个并行进程. 不得不说, 计算机的发展还是可以看得见的, 基本上10几分钟就编译完了. 我基本上是默认设置, 就是禁用了两个配置

```bash
root@jason-builder:/data/linux# ./scripts/config --disable SYSTEM_TRUSTED_KEYS
root@jason-builder:/data/linux# ./scripts/config --disable SYSTEM_REVOCATION_KEYS
```

## 3. build busybox

有了内核, 还要有用户态程序, 一般来说就是shell, 我选了busybox, 因为它的功能很全, 而且体积很小. 你可以把它当成一个超级shell, 里面有很多命令. 以前嵌入式Linux都用它. 我就改了一个配置, 把它编译成了静态链接的可执行文件, 这样就不用担心依赖问题了.

```bash
git clone --depth=1 https://git.busybox.net/busybox/
make -j 32
mkdir /data/boot/initramfs
make CONFIG_PREFIX=/data/boot/initramfs install
cd /data/boot/initramfs
vi init # add shebang
chmod +x init
rm linuxrc
/data/boot/initramfs# find | cpio -o -H newc > ../init.cpio
```

## 4. boot loader

最后, 你得有个引导程序来启动你的内核. 当年我们的引导程序是LILO, 现在基本已经挂了, 都用GRUB. 我们自己的发行版用不到那么高大上, 用最简单的引导程序syslinux就可以了.

```bash
apt install syslinux
dd if=/dev/zero of=boot bs=1M count=50
mkfs.fat boot
syslinux boot
mkdir m
mount boot m
cp bzImage init.cpio ./m/
umount m
```

这样启动的话, 会失败, 需要手工输入内核和initramfs的路径. 为了方便, 我们可以用syslinux的配置文件来启动. syslinux.cfg的内容如下:

```
DEFAULT linux
LABEL linux
    KERNEL bzImage
    APPEND initrd=init.cpio
```

## 5. boot

启动的话, 必须要用个有图形界面的虚拟机, 用VMWare, VirtualBox都可以. 用qemu也行. 我就用的是macos上的QEMU. 直接输入指令:

```bash
qemu-system-x86_64 boot
```

然后系统就会跳出图形界面, 然后你就可以看到你自己的Linux启动了.

![mini-linux](/uploads/2024/linuxdistribution1.png)

![mini-linux-2](/uploads/2024/linuxdistribution2.png)

可以看到, 是最新的内核. 也可以运行一些简单的命令跟shell脚本. 但是网络是没有的, 所以没法ssh进去. 好了, 这基本上就是发行版的第一步了. 一些Raspberry Pi的发行版就是这么做的. 但是这样的发行版太简单了, 你连个网络都没有, 包管理器都没有, 你连个软件都装不上. 没人会用.

