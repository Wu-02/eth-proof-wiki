---
id: notation
title: "记号与全局约定"
kind: support
group: 定义与构造
publish: false
status: 完整证明整合稿
---

# 记号与全局约定

除各节点另有说明外，采用以下全局约定。布尔变量、辅助坐标与形式不定元分别处理；复杂度分析区分多项式次数与作用域大小，也区分算术运算次数与位运算次数。

### 1.2 记号

^subsec-notation

对于整数 $s\ge0$，记 $[s]=\{1,\ldots,s\}$，且 $[0]=\varnothing$。对于条件 $E$，标量 $\mathbb{1}_{\{E\}}$ 在 $E$ 成立时等于一，否则等于零。我们使用自然对数，底数为二时写作 $\log_2$。在复杂度界中，$\operatorname{poly}(t_1,\ldots,t_s)$ 表示形如 $(1+t_1+\cdots+t_s)^{O(1)}$ 的界，其隐含常数为绝对常数。下标（例如 $\operatorname{poly}_{k,c}(t_1,\ldots,t_s)$）允许这些常数依赖于所标明的固定参数。整数以带符号二进制记法存储，因此一个整数 $z$ 使用 $O(\log(|z|+2))$ 位。有理数存储为一个整数分子和一个正整数分母；所述位长度界分别适用于两者。空间以位计量。算术运算次数与位运算次数加以区分。

对于有限集合 $S$，$\mathbb Q^S$ 中的向量以 $S$ 为坐标索引，除非另有说明，否则均为列向量。对于 $U\subseteq S$，示性向量 $\mathbf1_U\in\{0,1\}^S$ 的各分量为 $(\mathbf1_U)_v=\mathbb{1}_{\{v\in U\}}$，其中 $v\in S$。我们用 $\vec{0}$ 表示零向量。对于 $v\in S$，行 $\delta_v\in\mathbb Q^{1\times S}$ 选取坐标 $v$，因而 $\delta_vx=x_v$。一个以 $U\subseteq S$ 为索引的向量，通过在 $S\setminus U$ 的每个坐标处置零，扩展为以 $S$ 为索引的向量。

我们用 $\vec{X}=(X_1,\ldots,X_n)$ 表示形式变量向量，并对 $\vec{P}_{f,v}(T)$ 这样的多项式系数向量使用箭头。对于系数行 $\vec{p}=(p_i)_{i\in S}$ 和向量 $z=(z_i)_{i\in S}$，我们将它们的标量配对写作 $\langle\vec{p},z\rangle=\sum_{i\in S}p_i z_i$。特别地，$\langle\vec{P}_{f,v}(T),\vec{X}\rangle$ 是变量 $X_i$ 的一个标量线性形式。

对于关于变量 $\vec{X}$ 和变量 $z$ 的多项式 $P(\vec{X},z)$，$[z^j]P$ 表示 $z^j$ 的系数，将其视为关于 $\vec{X}$ 的多项式；$\deg_{\vec{X}} P$ 表示关于 $\vec{X}$ 的总次数。一行多项式的次数，是其中各元素次数的最大值。除非另有说明，多项式系数均为有理数，矩阵的核均在 $\mathbb Q$ 上取。

