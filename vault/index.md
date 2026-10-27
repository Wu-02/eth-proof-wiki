---
id: index
title: 指数时间假设论文证明导航
kind: home
group: 导航
status: 证明思路梳理
publish: true
---

# 指数时间假设论文证明导航

## 中文译文

[[translation-1|1 引言]] · [[translation-2|2 技术概述]] · [[translation-3|3 通过共享线性摘要实现的快速计数算法]] · [[translation-4|4 构造低次数替代形式]] · [[translation-5|5 稀疏多项式方程公共零点的计数]] · [[translation-6|6 将#k-SAT归约为公共零点计数]]

[[translation-A|A 划分满足赋值]] · [[translation-B|B 精确算术与空间]] · [[translation-C|C 反驳ETH的进一步推论]] · [[translation-D|D 精确计数的更尖锐界]]

## 要计算什么

对有 $n$ 个声明变量、$m$ 个子句的固定宽度 $k$-CNF 公式 $F$，目标是精确计算

$$
\#F=\bigl|\{x\in\{0,1\}^n:F(x)=1\}\bigr|.
$$

计数为正当且仅当公式可满足。因此，只要在每个固定 $k$ 下给出 $2^{o(n)}(n+m)^{O_k(1)}$ 时间的确定性计数算法，就能得到相应的 SAT 判定算法。论文还要求工作空间保持为多项式规模。

主结果是 [[1.1|定理 1.1]]。它给出一般密度下指数为 $O_k(n\log\log n/\sqrt{\log n})$ 的界；当 $m\le Dn$ 且 $D$ 固定时，指数进一步为 $O_{k,D}(n/\sqrt{\log n})$。

## 两条证明路线

[[route-a|路线 A：有理插值]]先建立一个稀疏多项式公共零点计数器。其关键是固定少量共享线性测量后，将全局求和拆成小组内的计算，再由插值恢复所求计数。与 SAT 工具链组合后得到 [[6.4|命题 6.4]] 的较弱指数

$$
O_k\!\left(\frac{n(\log\log n)^2}{\sqrt{\log n}}\right).
$$

这个界已经是 $o(n)$，足以得到论文对 ETH 的否定结论。

[[route-b|路线 B：张量缩并]]使用另一种计数引擎，得到定理 1.1 中更强的界。核心是 [[D.1|定理 D.1]]：在有限精度的系数环上，通过变形、插值和递归计算布尔张量网络的缩并。固定密度的 SAT 可直接编码成这种网络；一般密度则经 [[D.2|引理 D.2]] 和共享的 SAT 工具链处理。

两条路线共用代数编码与 SAT 归约，分别采用有理插值和张量缩并作为计数引擎。

## 五个入口

- [[route-a|有理插值路线]]：从分组求和、替代线性形式到公共零点计数。
- [[shared-algebra|公共代数工具]]：奇偶性提升、多项式总次数及系数大小。
- [[shared-sat|SAT 稀疏化与奇偶校验]]：把任意公式的精确计数交给受控规模的计数器。
- [[route-b|张量缩并路线]]：有限精度恢复、跨组模态与递归成本。
- [[outputs|主定理与推论]]：计数、近似、图问题、电路下界与局部映射求逆。

完整图见 [[dependency-graph|证明依赖图]]。初次阅读可按 [[reading-route|建议阅读路线]] 选择目标。

## 来源与版本

依据：[原论文 PDF](https://github.com/openai/math/blob/main/preprints/The-Exponential-Time-Hypothesis-is-False-October-25-2026/paper.pdf)，2026 年 10 月 25 日修订版。各页面保留原命题编号和原页码，便于回查。原文作者为 OpenAI，原仓库采用 Apache License 2.0。

