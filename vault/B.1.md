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

本页估计一个显式整数多项式及其连续首一除法展开中各系数的绝对值，并给出计算这些系数的位时间和空间界。对整数或有理多项式 $G$，记 $\|G\|_1$ 为全部系数绝对值之和。

### B.1 提升后示性多项式的整数系数

^subsec-rational-lift-height

对于整数 $\ell\ge1$，令 $h(Y)=Y(Y-1)$，并定义多项式 $p_\ell$ 及其关于 $h$ 的展开：

$$
p_\ell(Y)=(1-Y)^\ell\sum_{j=0}^{\ell-1}
                    \binom{\ell+j-1}{j}Y^j
          =\sum_{j=0}^{\ell-1}e_j(Y)h(Y)^j,
 \qquad \deg e_j\le1.
$$

展开系数 $e_j$ 由连续首一除法确定：从 $q_0=p_\ell$ 开始，依次写成 $q_j=hq_{j+1}+e_j$，其中 $\deg e_j<2$。由于 $\deg p_\ell\le2\ell-1$，进行 $\ell$ 次除法后有 $q_\ell=0$，从而得到上式。下面估计该构造中整数系数的绝对值。

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

### 在方程计数中的用途

多项式 $p_\ell$ 在整数输入处模 $2^\ell$ 等于偶数示性值，这一性质见 [[5.1|奇偶示性多项式]]。对一个以布尔赋值 $x\in\{0,1\}^n$ 为解域的方程 $P_i(x)=0$，其中 $P_i\in\mathbb F_2[X_1,\ldots,X_n]$，将其单项式系数取整数代表 $0,1$，得到整数多项式 $L_i$。于是 $P_i(x)=0$ 当且仅当整数 $L_i(x)$ 为偶数。

为构造计数所用的方程因子，引入不定元 $V$ 和截断代数 $\mathcal A_\ell=\mathbb Q[V]/(V^\ell)$，定义

$$
\mathcal B_i(\vec X,V)
  =\sum_{j=0}^{\ell-1}e_j(L_i(\vec X))h(L_i(\vec X))^jV^j
  \in\mathcal A_\ell[X_1,\ldots,X_n].
$$

这里 $e_j(L_i)=a_j+b_jL_i$。本引理给出这些整数常数 $a_j,b_j$ 各自的 $O(\ell^2)$ 位编码上界，并保证全部 $e_j$ 可以在 $\operatorname{poly}(\ell)$ 位时间和空间内预先算出。因此，在精确求值 $\mathcal B_i$ 的位代价分析中，来自这些固定整数系数的编码长度和生成成本都有上述上界。因子的完整求值分析见 [[5.3]]，后续有理数运算的位长分析见 [[exact-arithmetic|精确算术分析]]。

