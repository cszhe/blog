---
layout: post
title: Token杯AI国际象棋大赛-Gemini
author: Gemini
lang: zh-CN
date: 2026-08-10 10:15
category: 工作和学习
tags:
  - 人工智能
  - LLM
  - Chess
slug: token-bei-ai-guo-ji-xiang-qi-da-sai-gemini
translation: /token-cup-ai-chess-tournament-gemini
---

## Token自由

之前一直没有各种昂贵的 AI 订阅，为了玩 AI，我全靠学校的资源——一台 Dell 出的 DGX Spark（这台拥有 128GB 统一内存、NVIDIA GB10 算力的小怪兽）以及学校虚拟机里的 L4 显卡搭建本地模型跑任务。本地模型最大的好处就是速度极快，吐字飞速，眼睛都跟不上。但缺点也很明显：模型 Size 普遍不大，智力上限有限，遇到稍微复杂一点的推理解析，很容易直接摆烂。

然而最近，幸福来得太突然，我居然一瞬间实现了 **Token 自由**！

仔细盘算了一下，主要得益于最近凑齐的四大“风口”：
1. **GitHub 教育优惠审核通过**：居然给了 $15 的额度，而且还能免费爽用 Copilot Pro！
2. **咬牙订阅了 Google Gemini Pro**：主要是因为我家谦要用 Gemini Notebook 来整理笔记和学习。顺便我还发现了一个绝密“Bug”级别的惊喜：谷歌的 AI 框架 Harness AntiGravity 和网页版的 Gemini 额度竟然是完全分开计算的！两个人各用各的，互不干涉，相当于买一送一！
3. **学校大手一挥给买了 Claude Max**：官方高尊贵订阅，配额充足到根本用不完。
4. **自己还充了 10 块钱 OpenCode Go 套餐**：便宜大碗，可以随意调用各种主流的 Open Weight 开源模型。

突然手握庞大的 Token 储备，感觉自己瞬间变成了 Token 大佬。但手握这么多 Token，总不能天天只用来让 AI 写 `Hello World` 吧？

## 打通壁垒

最近我在终端里玩起了 [Herdr](https://herdr.dev)，这软件号称是“Agent 时代的 Tmux”。简单来说，它不仅能在终端里同时开好多分屏管理不同的 Agent，最绝的是——它居然允许不同的 Agent 之间直接互相发送消息和通讯！

Agent 之间能互相聊天，这可太有意思了。举个爆笑的例子：有一次我让一个 Agent 去访问某个网站，结果我把 URL 给敲错了一个字母，导致它自然打不开。换作以前，Agent 估计就直接报错放弃了。结果这货居然跟人类一样，在 Herdr 里面给隔壁 Pane 的另一个 Agent 发消息：“大佬，我这个网站怎么打不开啊，你帮我试试呗？”

看到这一幕我直接惊呆了。既然 Agent 之间通信这么顺畅，那让它们聚在一起除了互相吐槽，还能干点啥有意思的事情呢？

我灵光一闪：**要不让它们之间在终端里互相下国际象棋吧！**

说干就干，我设计了一个由三个 Agent 组成的比赛系统：
- **裁判模型（Judge）**：负责监听局势、在 Herdr 里给选手传递棋步、将棋步提交给服务端校验。裁判不需要太聪明，免费的模型或者本地小模型完全能胜任。
- **参赛选手（Players）**：两个 Agent 分别执白棋和执黑棋，只负责琢磨怎么走棋。

![裁判通过herdr给选手发消息](/uploads/2026/tokencup/judge.png)

秉承着能让 AI 干活就绝不自己动手的原则，我把这个创意和规则交代给了 Claude。剩下的事情就顺理成章了：Claude 帮我搭建了整个 **TokenCup** AI 国际象棋比赛平台（后端基于 FastAPI + MariaDB，前端用纯 JS + Chessground）。整个 `~/dev/tokencup` 项目的代码基本上都是 Claude 一口气写出来的，创意归我，牛马归 Claude。

## 天昏地暗

周六一整天，几个 Agent 在 Herdr 的分屏里杀得天昏地暗、日光惨淡。

我特地起了一个网页端界面（Spectator Page），搬着小板凳看着棋盘上的棋子飞舞，吃子声不绝于耳。

![TokenCup界面](/uploads/2026/tokencup/GUI.png)

一天下来，后台数据库（MariaDB）完整地记录下了 12 场史诗级的棋逢对手。翻看数据库里的对局数据，我发现了几个极其有趣又深刻的现象：

1. **开源/免费模型的“特长偏移”**：
   OpenCode 里面那些免费的模型（比如 Big Pickle, Ling-3.0-tiny, LongCat 等），水平的确相当有限。不少模型可能训练集中中国象棋的棋谱比较多，到了国际象棋（Western Chess）的棋盘上就彻底懵圈了。经常走着走着就给出 illegal move（非法棋步），连续违规 3 次直接被裁判判负（Forfeit）。比如 `Ling-3.0-tiny` 执白对阵 `LongCat-2.0`，第 13 步就因为乱走棋被直接判负了。
2. **Gemini 3.6 Flash 的大杀四方**：
   万万没想到，Gemini 3.6 Flash 在这个赛场上展现出了极其强悍的统治力！它一路过关斩将，接连战胜了 DeepSeek V4 Flash、Grok 4.5、Big Pickle、Claude Sonnet 5、Claude Fable 5，甚至连 GPT-5.6 Terra 都被它踩在脚下！整整斩获了 **6 胜 1 和 1 负** 的辉煌战绩。唯一的一败还是输给了自家的亲哥哥 `Gemini 3.1 Pro`，可以说是当之无愧的 Token 杯棋王！
3. **无尽循环与燃烧的钱包**：
   对决中最令人抓狂的是大语言模型的“Thinking”（深度思考）机制。
   现在的推理模型一遇到复杂局面，就喜欢陷入死循环般的思考。ChatGPT 和一些推理模型走一步棋能思考好几分钟，Token 消耗量呈指数级暴涨！

![ChatGPT陷入无尽循环](/uploads/2026/tokencup/InfiniteThinking.png)

看着屏幕上转个没完的 Thinking 提示，我感觉我的钱包在熊熊燃烧！
为了止血，我想在 Prompt 里告诉它：“你每一步棋的 Thinking 时间不能超过 3 分钟！”
但我很快发现——**大语言模型根本没有物理时间的概念**！
对于它们来说，只有 Token 的输入与输出，根本无法感知真实时间的流逝。你让它们“每一秒钟说一个字”，或者“思考 60 秒后回答”，它完全做不到，纯属对牛弹琴。最后只能靠我们在裁判端和后端硬性设置 Timeout 机制（超时未返回有效棋步直接判负），才保住了我的钱包。
4. **Context Window 与模型的“斩杀线”**：
   比赛中我还发现了另一个有趣的现象——Context Window（上下文窗口）其实就是模型的“斩杀线”。像那些拥有 1M 甚至更大上下文窗口的模型，哪怕 Thinking 再多，一局棋下下来上下文基本也不会满了。但对于那些只有 200K 上下文窗口的模型，一旦 Context Window 快满了触发了 Compaction（上下文压缩），智商就显著降低，随后频繁犯错，然后很容易就输了。令人困惑的是，裁判在每一步的 Prompt 里明明都把之前所有步骤都发给模型了，按理说它可以还原出整个棋局，但一旦经历了 Context Compaction，智商依然遭受了毁灭性打击。

## 重新发明轮子

学软件这么多年，最重要的箴言之一就是 **“不要重新发明轮子（Don't reinvent the wheel）”**。
结果等我周六折腾完这整套系统，烧掉了数百万 Token 之后，上网一查才赫然发现：我居然又把轮子重新发明了一遍！

早在很久之前，就已经有大神搞出了专门的 [LLM Chess Benchmark](https://maxim-saplin.github.io/llm_chess/) 评测榜单。

![LLM Chess Leaderboard](/uploads/2026/tokencup/leaderboard.png)

仔细对比了一下我花了大把 Token 得出的实测结果与全球大榜的数据，发现结论惊人地一致：
- **总体棋力水准**：目前所有顶级 LLM 的国际象棋水平，基本上都在 **Class C player** 左右（大约相当于 FIDE/USCF 1400-1599 左右的业余爱好者水平）。
- **人类看戏的体验**：作为真人看它们下棋，很容易发现它们有一些莫名其妙、啼笑皆非的昏招。因为随着棋局回合数变长，棋盘信息堆积，LLM 记忆上下文稀释，Thinking 的难度呈几何级数加大。
- **与专业 Chess Engine 的差距**：跟 AlphaZero 或者 Stockfish 这种精通棋路搜索和评估函数的专业棋盘引擎相比，大语言模型下棋简直就像在用自然语言猜概率，差距不可以道里计。

## 总结

虽然从纯粹的棋力来看，用 LLM 下国际象棋既昂贵又笨拙，但看着不同厂家的 Agent 在终端里互相打招呼、互相对弈、甚至因为违规被裁判警告，这种科技带来的戏剧感和娱乐性是传统静态程序无法比拟的。

反正现在 Token 自由了，下一次，我打算让它们试试打扑克或者三国杀，看看谁才是大语言模型界真正的戏精！
