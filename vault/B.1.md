---
id: "B.1"
title: "引理 B.1：按 $h$ 的幂展开后的整数系数上界"
group: "公共代数工具"
kind: "引理"
status: 完整证明整合稿
publish: false
source_label: "B.1"
tex_label: "lem:rational-lift-height"
source_pages: [47, 48]
depends_on: []
---

# 引理 B.1：按 $h$ 的幂展开后的整数系数上界

本页估计奇偶示性多项式按 $h(Y)=Y(Y-1)$ 的幂展开后，各个整数系数的大小，并证明计算这些系数所需的位运算次数和工作空间位数都有多项式上界。对整数或有理系数多项式 $G$，用 $\|G\|_1$ 表示其全部系数的绝对值之和。

### B.1 示性多项式展开后的整数系数

^subsec-rational-lift-height

给定整数 $\ell\ge1$，定义

$$
p_\ell(Y)=(1-Y)^\ell\sum_{j=0}^{\ell-1}
                    \binom{\ell+j-1}{j}Y^j
          =\sum_{j=0}^{\ell-1}e_j(Y)h(Y)^j,
 \qquad \deg e_j\le1.
$$

右侧的展开可以通过反复除以 $h$ 得到。从 $q_0=p_\ell$ 开始，每一步作带余除法

$$
q_j=hq_{j+1}+e_j,\qquad \deg e_j<2.
$$

由于 $h$ 是首一二次多项式，且 $\deg p_\ell\le2\ell-1$，经过 $\ell$ 次除法后便有 $q_\ell=0$。依次代回各步等式，就得到所需展开。

> ##### 引理 B.1
>
> ^lem-rational-lift-height
>
> 对 $0\le j<\ell$，将展开中的余式写成 $e_j(Y)=a_j+b_jY$。则 $a_j,b_j\in\mathbb Z$，并且存在绝对常数 $C$，使
>
> $$
> |a_j|,|b_j|\le2^{C\ell^2}\qquad(0\le j<\ell).
> $$
>
> 反复以 $h$ 作除法，可以用 $\operatorname{poly}(\ell)$ 次位运算和 $\operatorname{poly}(\ell)$ 位工作空间构造全部 $e_j$。

**证明。**

^proof-lem-rational-lift-height

先估计 $p_\ell$ 的系数大小。由系数范数的不等式 $\|fg\|_1\le\|f\|_1\|g\|_1$，以及二项式恒等式

$$
\sum_{j=0}^{\ell-1}\binom{\ell+j-1}{j}
 =\binom{2\ell-1}{\ell-1},
$$

可得

$$
\|p_\ell\|_1\le2^\ell\binom{2\ell-1}{\ell-1}\le2^{3\ell}.
$$

再考察除法过程中系数的变化。除式 $h=Y^2-Y$ 的首项系数为一，所以从整数系数多项式出发，所得商和余式仍有整数系数。在一次多项式长除法中，每消去一个首项，当前商与尚未处理完的余式的系数范数之和至多增大到原来的三倍。接下来以所得商继续除以 $h$ 时，初始系数范数不会超过上一轮已有的界。

所有除法总共只需消去 $O(\ell^2)$ 个首项。因此，每个中间系数的绝对值都不超过

$$
2^{3\ell}\,3^{O(\ell^2)}=2^{O(\ell^2)}.
$$

这也给出了各个 $a_j,b_j$ 的上界，其带符号二进制表示只需 $O(\ell^2)$ 位。

最后估计算法的位代价。先计算定义 $p_\ell$ 时出现的二项式系数，再将 $(1-Y)^\ell$ 与相应的和式相乘，得到 $p_\ell$ 的全部系数。这些步骤只需 $\operatorname{poly}(\ell)$ 次位运算和 $\operatorname{poly}(\ell)$ 位工作空间。之后各步处理的多项式都有 $O(\ell)$ 个系数，长除法总共对 $O(\ell^2)$ 位整数进行 $O(\ell^2)$ 次整数算术运算。因此，构造全部 $e_j$ 所需的位运算次数和工作空间位数均为 $\operatorname{poly}(\ell)$。

∎

### 在方程计数中的用途

由 [[5.1|奇偶示性多项式]]，对任意整数 $y$，当 $y$ 为偶数时，$p_\ell(y)$ 模 $2^\ell$ 等于一；当 $y$ 为奇数时，则等于零。

设方程 $P_i(x)=0$ 的求解域为 $\{0,1\}^n$，其中 $P_i\in\mathbb F_2[X_1,\ldots,X_n]$。将 $P_i$ 的单项式系数取为整数代表 $0,1$，得到整数多项式 $L_i$。对布尔赋值 $x$，$P_i(x)=0$ 当且仅当 $L_i(x)$ 为偶数。因此，$p_\ell(L_i(x))$ 可以在模 $2^\ell$ 的意义下表示该赋值是否满足方程。

为在计数时截断高次项，引入不定元 $V$ 和截断代数 $\mathcal A_\ell=\mathbb Q[V]/(V^\ell)$，并定义每个方程对应的多项式因子

$$
\mathcal B_i(\vec X,V)
  =\sum_{j=0}^{\ell-1}e_j(L_i(\vec X))h(L_i(\vec X))^jV^j
  \in\mathcal A_\ell[X_1,\ldots,X_n].
$$

其中 $e_j(L_i)=a_j+b_jL_i$。本引理说明，每个整数常数 $a_j,b_j$ 的编码长度为 $O(\ell^2)$ 位；预先算出全部系数只需 $\operatorname{poly}(\ell)$ 次位运算和 $\operatorname{poly}(\ell)$ 位工作空间。这就给出了精确求值 $\mathcal B_i$ 时，这些固定系数所需的编码长度和生成成本。

在 [[D.2]] 的方程编码中，$n$ 表示输入指定的变量总数，包括没有出现在任何方程中的变量；取 $p=\ell=n+1$。上述整数系数先模 $2^p$ 约化，再用于计算张量条目。
