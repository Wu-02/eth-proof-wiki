---
id: "B.1"
title: "整数提升系数的高度界"
group: "公共代数工具"
kind: "引理"
status: 完整证明整合稿
publish: false
source_label: "B.1"
tex_label: "lem:rational-lift-height"
source_pages: [47, 48]
depends_on: []
---

# 引理B.1｜整数提升系数的高度界

本页估计 [[5.1|奇偶示性多项式]] 及其首一除法展开中整数系数的大小，不改变其奇偶同余性质。对整数或有理多项式 $G$，记 $\|G\|_1$ 为全部系数绝对值之和。所得系数界供 [[5.3|单次查询位代价]] 与 [[exact-arithmetic|精确算术分析]] 使用。

### B.1 提升后示性多项式的整数系数

^subsec-rational-lift-height

首先，我们估计引理 [[5.1#^lem-rational-idempotent|5.1]] 所提供的奇偶多项式的系数大小。它们出现在 [[5.3#^eq-lifted-factor|（5.4）]] 的每个方程因子 $\mathcal B_i$ 中，因此其大小进入这些因子求值的位代价界。对于整数 $\ell\ge1$，回顾 $h(Y)=Y(Y-1)$ 和引理 [[5.1#^lem-rational-idempotent|5.1]] 中的多项式：

$$
p_\ell(Y)=(1-Y)^\ell\sum_{j=0}^{\ell-1}
                    \binom{\ell+j-1}{j}Y^j
          =\sum_{j=0}^{\ell-1}e_j(Y)h(Y)^j,
 \qquad \deg e_j\le1.
$$

该引理证明了奇偶同余关系，并通过连续以首一多项式 $h$ 作除法来构造 $e_j$。这里我们给出该构造中出现的整数的绝对值上界。

> ##### 引理 B.1
>
> 
> 
> ^lem-rational-lift-height
> 
> 
>
> 对于 $0\le j<\ell$，写成 $e_j(Y)=a_j+b_jY$。则 $a_j,b_j\in\mathbb Z$，且对于某个绝对常数 $C$，
>
> $$
> |a_j|,|b_j|\le2^{C\ell^2}\qquad(0\le j<\ell)
> $$
>
> 连续用 $h$ 除 $p_\ell$ 可以构造这些多项式，使用 $\operatorname{poly}(\ell)$ 次位运算和同样数量的工作空间位。

**证明。**

^proof-lem-rational-lift-height

系数范数不等式 $\|fg\|_1\le\|f\|_1\|g\|_1$，连同二项式恒等式

$$
\sum_{j=0}^{\ell-1}\binom{\ell+j-1}{j}
 =\binom{2\ell-1}{\ell-1}
$$

给出

$$
\|p_\ell\|_1\le2^\ell\binom{2\ell-1}{\ell-1}\le2^{3\ell}.
$$

以首一多项式 $h=Y^2-Y$ 作除法保留整数系数。每次消去首项时，当前商与余式的系数范数之和至多变为原来的三倍。所有连续除法中总共有 $O(\ell^2)$ 次消去。因此，每个中间系数的绝对值至多为 $2^{O(\ell^2)}$，这证明了所声称的 $a_j,b_j$ 的界。所以，其带符号二进制编码使用 $O(\ell^2)$ 位。每个系数向量有 $O(\ell)$ 个元素。连续除法对 $O(\ell^2)$ 位的整数使用 $O(\ell^2)$ 次整数算术运算，从而给出所声称的 $\operatorname{poly}(\ell)$ 位运算和空间界。

∎

