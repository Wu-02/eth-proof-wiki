---
id: translation-3
title: "原文中文译文 3 通过共享线性摘要实现的快速计数算法"
kind: translation
group: 原文中文译文
source_label: "3"
order: 102
publish: true
status: 原文中文译文（已审校）
---

## 3 通过共享线性摘要实现的快速计数算法

^sec-counting

第 [[translation-3#^sec-counting|3]]–[[translation-5#^sec-setup|5]] 节证明定理 [[translation-2#^thm-overview-sparse-polynomials|2.2]]。我们从第 [[translation-2#^subsec-preview-encoding|2.2]] 节的求和式开始：对于每个布尔赋值，将各因子相乘，再对所有赋值的乘积求和。这里，因子可以是任意有理系数多项式。我们将说明，在给定替代形式和测量时如何计算这一和式。第 [[translation-4#^sec-construction|4]] 节仅利用每个因子所读取的变量来构造这些替代形式和测量。第 [[translation-5#^sec-setup|5]] 节为每个稀疏多项式方程提供一个因子。

### 3.1 多项式因子与待恢复的值

^subsec-product-interface

令 $\mathcal F$ 为各因子的索引集，并令 $I_f\subseteq[n]$ 为 $\Phi_f$ 所读取的变量。对于有理系数，我们的目标为

$$
Z=\sum_{x\in\{0,1\}^n}\prod_{f\in\mathcal F}\Phi_f((x_v)_{v\in I_f}).\tag{3.1}
$$

^eq-general-product-sum

对于子句满足示性函数，$Z$ 就是满足赋值的数量。该证明也适用于系数位于任意交换 $\mathbb Q$-代数 $\mathcal A$ 中的情形：此时求和与乘积都在 $\mathcal A$ 中进行，而插值仅使用有理标量。读者在本节中始终取 $\mathcal A=\mathbb Q$ 即可。

不同因子可以为同一个变量使用不同的替代。给每个关联 $(f,v)$ 分配其专属的不定元 $Y_{f,v}$，并假设

$$
\deg_{\{Y_{f,v}\}}\!
    \left(\prod_{f\in\mathcal F}\Phi_f((Y_{f,v})_{v\in I_f})\right)\le d .\tag{3.2}
$$

^eq-general-product-degree

这是在 $\mathcal A$ 上计算的整个乘积的次数。选择次数至多为 $R$ 且满足 $\vec P_{f,v}(0)=\delta_v$ 的替代行 $\vec P_{f,v}(T)$，并形成

$$
H(T)=\sum_{x\in\{0,1\}^n}\prod_{f\in\mathcal F}
   \Phi_f\bigl((\langle\vec P_{f,v}(T),x\rangle)_{v\in I_f}\bigr)
   \in\mathcal A[T].\tag{3.3}
$$

^eq-general-count-polynomial

这些替代在零处恢复输入，并使次数至多乘以 $R$。因此，$H(0)=Z$ 且 $\deg_T H\le d_H:=dR$。与有界出现次数的例子一样，我们的应用将满足 $d=O(n)$。

### 3.2 所需的行、划分与测量

^subsec-layout-interface

我们使用与第 [[translation-2#^subsec-preview-separation|2.4]] 节相同的设计，只是将每个子句的组分配换为每个因子的组分配。下面的最后一个条件记录了精确算术所需的系数界。这里，$\widetilde\xi$ 表示从一个组向全部 $n$ 个坐标作零扩展。

> ##### 定义 3.1
>
> 
> 
> ^def-layout
> 
> 
>
> 对于因子作用域 $(I_f)_{f\in\mathcal F}$，令 $r\ge2$、$D\ge1$ 和 $1\le R<Q$ 为整数，并令 $0<\tau\le1/2$。我们要求以下数据和性质。
>
> 1.  对于每个 $t\in[Q]$，有一个划分 $[n]=S_{t,1}\sqcup\cdots\sqcup S_{t,r}$，允许空的部分，且满足 $|S_{t,g}|\le2n/r$。
>
> 2.  对于每个因子 $f\in\mathcal F$，有一个序列 $\sigma_f\in[r]^Q$。值 $\sigma_f(t)$ 将因子 $f$ 在点 $t$ 处分配给一个组。
>
> 3.  对于每个 $t\in[Q]$ 和 $g\in[r]$，有一个整数矩阵 $C_{t,g}\in\mathbb Z^{[c_{t,g}]\times S_{t,g}}$，其中 $c_{t,g}$ 为非负整数。每行元素的绝对值之和至多为 $D$，并且
>
>     $$
>     \sum_{g=1}^r c_{t,g}\le2\tau n.
>     $$
>
>     对于一个赋值 $x$，$C_{t,g}(x|_{S_{t,g}})$ 的各分量就是组 $g$ 上的测量。
>
> 4.  对于每个 $f\in\mathcal F$ 和 $v\in I_f$，有一个行 $\vec{P}_{f,v}(T)\in\mathbb Q[T]^{1\times n}$，满足 $\vec{P}_{f,v}(0)=\delta_v$ 和 $\deg \vec{P}_{f,v}\le R$。对于每个 $t\in[Q]$、$g\in[r]\setminus\{\sigma_f(t)\}$ 以及 $\xi\in\mathbb Q^{S_{t,g}}$，要求
>
>     $$
>     C_{t,g}\xi=\vec{0}\quad\Longrightarrow\quad
>      \langle \vec{P}_{f,v}(t), \widetilde\xi\rangle=0,
>     $$
>
>     其中 $\widetilde\xi\in\mathbb Q^n$ 是 $\xi$ 的零扩展。
>
> 5.  令 $d_{\mathrm{den}}=(R-1)!Q!$，则 $d_{\mathrm{den}} \vec{P}_{f,v}$ 的每个系数都是具有 $O(Q\log Q+\log D)$ 位的整数，其中隐含常数为绝对常数。

为解释核条件，固定 $t$、$f$ 和 $v\in I_f$，并令 $g=\sigma_f(t)$。记 $x_h=x|_{S_{t,h}}$。如果对于某个 $h\ne g$，$x,x'\in\mathbb Q^n$ 在 $S_{t,h}$ 之外相同，并且满足 $C_{t,h}x_h=C_{t,h}x'_h$，则 $x'_h-x_h\in\ker C_{t,h}$。该条件给出

$$
\langle \vec{P}_{f,v}(t), x'\rangle=\langle \vec{P}_{f,v}(t), x\rangle.
$$

逐组应用这一结论，可知元组 $(\langle \vec{P}_{f,v}(t), x\rangle)_{v\in I_f}$ 由 $x_g$ 和 $(C_{t,h}x_h)_{h\ne g}$ 确定。因此，固定所有测量向量，就使整个因子成为 $x_g$ 的函数。这适用于每个多项式因子 $\Phi_f$，包括系数位于 $\mathcal A$ 中的因子。

布尔向量的每个测量值都属于 $[-D,D]\cap\mathbb Z$。我们约束矩阵元素绝对值之和，是因为该构造可以将同一个布尔坐标放在多个辅助位置上。在将这些位置识别为同一坐标之后，$C_{t,g}$ 的元素不一定属于 $\{0,1,-1\}$。仅有秩的上界并不能控制可能的测量值数量：单独一行 $(1,2,4,\ldots,2^{n-1})$ 就能区分全部 $2^n$ 个布尔向量。

### 3.3 通过固定测量来分离求和

^subsec-measurement-factorization

固定测量后，每个因子只依赖分配给它的组。下面的引理在交换环上陈述由此得到的计算，因此，它既适用于取有理数值的因子，也适用于 $\mathcal A$ 中的因子。计算 Taylor 系数时将需要限制 $x_i=1$，而这些限制是各个组内部的局部条件。

> ##### 引理 3.2
>
> 
> 
> ^lem-measurement-separation
> 
> 
>
> 令 $[n]=S_1\sqcup\cdots\sqcup S_r$ 为一个划分，允许空的部分。对于每个 $g\in[r]$，令 $C_g$ 为一个有 $c_g$ 行、列由 $S_g$ 索引的整数矩阵。假设每行元素的绝对值之和至多为某个整数 $D\ge0$，并记 $c=\sum_g c_g$。令 $\mathcal A$ 为有单位元的交换环，并令 $A_g:\mathbb Q^n\to\mathcal A$ 满足
>
> $$
> A_g(x+\xi)=A_g(x)
>  \qquad
>  (x\in\mathbb Q^n,\ \xi\in\ker C_h,\ h\ne g),
> $$
>
> 其中在 $S_h$ 之外对 $\xi$ 作零扩展。对于任意 $E\subseteq[n]$，和式
>
> $$
> Z_E=\sum_{\substack{x\in\{0,1\}^n\\x_i=1\ (i\in E)}}
>            \prod_{g=1}^r A_g(x)
> $$
>
> 可通过检查至多
>
> $$
> 2(2D+1)^c\sum_{g=1}^r2^{|S_g|}
> $$
>
> 个布尔向量求值；对每个向量，至多进行一次 $A_g$ 求值、$\operatorname{poly}(n,r,c,\log(D+2))$ 次额外位运算，以及 $O(1)$ 次环运算。除求值器自身的存储和 $O(1)$ 个环元素之外，该过程使用 $\operatorname{poly}(n,r,c,\log(D+2))$ 位空间。

**证明。**

^proof-lem-measurement-separation

对于 $y_g\in\mathbb Z^{c_g}$，定义

$$
\mathcal X_g(y_g)=\{u\in\{0,1\}^{S_g}:C_gu=y_g\},
 \qquad
 \mathcal Y=\prod_{g=1}^r\{-D,\ldots,D\}^{c_g}.
$$

布尔赋值的每个测量元组都属于 $\mathcal Y$，且 $|\mathcal Y|=(2D+1)^c$。我们先确定一个固定测量元组 $\vec y=(y_1,\ldots,y_r)$ 的贡献。如果每个 $\mathcal X_g(y_g)$ 都非空，则为每个 $g$ 选一个代表元 $\bar x_g\in\mathcal X_g(y_g)$，并令

$$
\mathcal X_{g,E}(y_g)=
 \{u\in\mathcal X_g(y_g):u_i=1\text{ 对所有 }i\in E\cap S_g\}.
$$

如果对于每个 $h$ 都有 $x_h\in\mathcal X_h(y_h)$，则 $x_h-\bar x_h\in\ker C_h$。对 $h\ne g$ 依次应用不变性假设，得到

$$
A_g\Bigl(\sum_{h=1}^r x_h\Bigr)
 =A_g\Bigl(x_g+\sum_{h\ne g}\bar x_h\Bigr).
$$

具有测量元组 $\vec y$ 且在 $E$ 所索引的位上取固定值的赋值，构成 $\prod_g\mathcal X_{g,E}(y_g)$。定义

$$
\Sigma_g(\vec y)=\sum_{x_g\in\mathcal X_{g,E}(y_g)}
       A_g\Bigl(x_g+\sum_{h\ne g}\bar x_h\Bigr).\tag{3.4}
$$

^eq-group-sum

分配律表明，这些赋值对 $Z_E$ 的贡献为 $\prod_g\Sigma_g(\vec y)$。如果 $\mathcal X_{g,E}(y_g)$ 为空，则 $\Sigma_g(\vec y)=0$。代表元 $\bar x_g$ 本身不必满足由 $E$ 索引的固定位条件。每个布尔赋值都具有唯一的测量元组，因此

$$
Z_E=\sum_{\vec y\in\mathcal Y}\prod_{g=1}^r\Sigma_g(\vec y),
$$

其中，只要任意一个 $\mathcal X_g(y_g)$ 为空，就将乘积取为零。

算法从 $Z=0_{\mathcal A}$ 开始，每次处理一个测量元组以求出这一恒等式的值。对于每个 $\vec y\in\mathcal Y$，先扫描每个 $\{0,1\}^{S_g}$，寻找一个代表元 $\bar x_g\in\mathcal X_g(y_g)$；如果任意这样的集合为空，则算法跳过该元组。否则，将 $p=1_{\mathcal A}$ 初始化。为计算 $\Sigma_g(\vec y)$，先初始化 $s=0_{\mathcal A}$，再一次扫描 $u\in\{0,1\}^{S_g}$。只要

$$
C_gu=y_g,\qquad u_i=1\quad(i\in E\cap S_g),
$$

算法就执行更新

$$
s\leftarrow s+A_g\Bigl(u+\sum_{h\ne g}\bar x_h\Bigr).
$$

此次扫描结束时，$s=\Sigma_g(\vec y)$，算法令 $p\leftarrow ps$。处理完所有组之后，令 $Z\leftarrow Z+p$。所有元组 $\vec y$ 都处理完毕后，便有 $Z=Z_E$。

对于每个 $\vec y$，寻找代表元的扫描和计算 $\Sigma_g(\vec y)$ 的扫描，都各自检查至多 $\sum_g2^{|S_g|}$ 个布尔向量。这就给出所述上界。检查一个向量的测量值与固定位需要 $\operatorname{poly}(n,r,c,\log(D+2))$ 次位运算：每个矩阵行的绝对值之和至多为 $D$，因此它的部分和具有 $O(\log(D+2))$ 位。每个向量至多需要一次因子求值。保留的状态为 $\vec y$、$(\bar x_1,\ldots,\bar x_r)$、$g$、$u$、$s$、$p$ 和 $Z$。元组 $\vec y$ 包含 $c$ 个位于 $[-D,D]$ 中的整数，各代表元合计包含 $n$ 位，且 $s,p,Z\in\mathcal A$。

∎

为在固定的 $t$ 处计算 [[translation-3#^eq-general-count-polynomial|（3.3）]]，按 $\sigma_f(t)$ 将变换后的因子分组，并在 $\mathcal A$ 中以 $E=\varnothing$ 应用该引理。定义 [[translation-3#^def-layout|3.1]] 给出其不变性假设，因此所得和为 $H(t)$。与概述中一样，两项指数成本分别来自测量值的选择，以及单个组中的布尔赋值。

### 3.4 通过固定的布尔代入求 Taylor 系数

^subsec-fixed-boolean-substitutions

$Q$ 个值 $H(1),\ldots,H(Q)$ 不一定能够确定 $H$。令

$$
q=\left\lfloor\frac{d_H}{Q}\right\rfloor,\qquad J=q+1.\tag{3.5}
$$

^eq-hasse-order

由于 $QJ>d_H$，只需计算

$$
\mathcal H_t(z)=\sum_{j=0}^{J-1}([z^j]H(t+z))z^j
 \qquad(t\in[Q]).\tag{3.6}
$$

^eq-taylor-truncation

Hermite 插值可从这 $QJ$ 个位于 $\mathcal A$ 中的系数恢复 $H$，从而恢复 $Z=H(0)$。事实上，次数小于 $QJ$ 的多项式所对应的有理 Hermite 矩阵在 $\mathbb Q$ 上可逆。其逆矩阵通过有理线性组合作用于 $\mathcal A$ 的元素。

固定 $t$。在 $t+z$ 处的替代形式不一定遵守 $t$ 处的设计。记

$$
\Delta\vec P_{f,v}(z)=\vec P_{f,v}(t+z)-\vec P_{f,v}(t).
$$

每个分量都可被 $z$ 整除。对于固定的 $x\in\mathbb Q^n$，引入独立不定元 $\vec X$，并将每个输入替换为

$$
\langle\vec P_{f,v}(t),x\rangle
       +\langle\Delta\vec P_{f,v}(z),\vec X\rangle.\tag{3.7}
$$

^eq-jet-substitution

令

$$
\mathcal G_x(\vec X,z)=\prod_{f\in\mathcal F}
 \Phi_f\!\left(
  (\langle\vec P_{f,v}(t),x\rangle+
   \langle\Delta\vec P_{f,v}(z),\vec X\rangle)_{v\in I_f}\right).\tag{3.8}
$$

^eq-auxiliary-polynomial

令 $\vec X=x$，得到 $\sum_x\mathcal G_x(x,z)=H(t+z)$。如果改为保持 $\vec X$ 固定，则每个修正项都与 $x$ 无关，因此 $t$ 处的设计仍能将各因子分离。此外，$\vec X$ 的每次出现都带有一个 $z$ 因子，故

$$
\deg_{\vec X}([z^j]\mathcal G_x(\vec X,z))\le j.\tag{3.9}
$$

^eq-degree-cost

下面的恒等式将通过固定的布尔代入以及对求和赋值施加限制，来恢复代入 $\vec X=x$ 的结果。

> ##### 引理 3.3
>
> 
> 
> ^lem-boolean-differences
> 
> 
>
> 令 $q\ge0$ 为整数，并令 $\mathcal A$ 为有单位元的交换环。对于每个 $x\in\{0,1\}^n$，令 $p_x(X_1,\ldots,X_n)$ 为 $\mathcal A$ 上次数至多为 $q$ 的多项式。则
>
> $$
> \begin{aligned}
> \sum_{x\in\{0,1\}^n}p_x(x)
>  &=\sum_{\substack{E\subseteq[n]\\|E|\le q}}
>    \sum_{U\subseteq E}(-1)^{|E|-|U|}
>    \sum_{\substack{x\in\{0,1\}^n\\x_i=1\ (i\in E)}}
>                   p_x(\mathbf1_U).
> \end{aligned}\tag{3.10}
> $$
> 
> ^eq-boolean-differences
> 
> 
>
> 这里 $\mathbf1_U$ 为 $U$ 的示性向量。

**证明。**

^proof-lem-boolean-differences

对于固定的 $x$，将 $X_i$ 的每个正整数次幂都替换为 $X_i$。这样既保持布尔点上的求值不变，也不会增加次数。由子集上的 Möbius 反演，所得多线性多项式具有展开式

$$
\widetilde p_x(\vec{X})=\sum_{E\subseteq[n]}c_{x,E}\prod_{i\in E}X_i,
 \qquad
 c_{x,E}=\sum_{U\subseteq E}(-1)^{|E|-|U|}p_x(\mathbf1_U).
$$

次数上界表明，只要 $|E|>q$，就有 $c_{x,E}=0$。现在令 $\vec{X}=x$ 并对 $x$ 求和，即得到所声称的恒等式：单项式 $\prod_{i\in E}x_i$ 选出的恰好是对每个 $i\in E$ 都满足 $x_i=1$ 的赋值。

∎

对于每个 $j<J$，将引理 [[translation-3#^lem-boolean-differences|3.3]] 应用于 $\mathcal A$ 上的 $[z^j]\mathcal G_x$。所有系数都可以使用同一批满足 $U\subseteq E$、$|E|\le q$ 的有序对，因此在下列环中将它们一并计算：

$$
\mathcal R=\mathcal A[z]/(z^J).
$$

对于一个固定的有序对 $(E,U)$，令 $\Phi_{f,U}(x;z)$ 为 [[translation-3#^eq-auxiliary-polynomial|（3.8）]] 中代入 $\vec X=\mathbf1_U$ 后的因子 $f$。按所分配的组将这些因子分组：

$$
A_{g,U}(x;z)=\prod_{f:\sigma_f(t)=g}\Phi_{f,U}(x;z).\tag{3.11}
$$

^eq-group-polynomial

它们的乘积为 $\mathcal G_x(\mathbf1_U,z)$。对于 $h\ne g$，给 $x$ 加上一个 $\ker C_{t,h}$ 中的向量，既不会改变这些因子的原输入，也不会改变其固定修正项。因此，引理 [[translation-3#^lem-measurement-separation|3.2]] 可以通过检查至多

$$
2r(2D+1)^{2\tau n}2^{2n/r}\tag{3.12}
$$

^eq-boolean-enumeration

个布尔向量，计算在 $i\in E$ 时要求 $x_i=1$ 的受限和。合并所有有序对，得到

$$
H(t+z)\equiv
 \sum_{\substack{E\subseteq[n]\\|E|\le q}}
 \sum_{U\subseteq E}(-1)^{|E|-|U|}
 \sum_{\substack{x\in\{0,1\}^n\\x_i=1\ (i\in E)}}
       \mathcal G_x(\mathbf1_U,z)\pmod{z^J}.\tag{3.13}
$$

^eq-full-taylor-sum

各组的乘积与和都在 $\mathcal R$ 中形成。所得结果为 $\mathcal H_t(z)$；在所有 $t$ 处重复这一过程，就得到插值数据。算法从不存储含有全部 $n$ 个不定元的多项式：它先代入 $\vec X=\mathbf1_U$，仅存储 $\mathcal A$ 中的 $J$ 个系数。

### 3.5 三项指数成本

^subsec-three-costs

对于每个 $t\in[Q]$，满足 $|E|\le q$ 的有序对 $U\subseteq E\subseteq[n]$ 的数量为

$$
C_q=\sum_{s=0}^{\min(q,n)}2^s\binom ns.\tag{3.14}
$$

^eq-pair-count

特别地，$C_0=1$，并且当 $q\ge n$ 时有 $C_q=3^n$。对于每个 $0<\eta\le1$，

$$
\eta^qC_q\le\sum_{s=0}^n\binom ns(2\eta)^s=(1+2\eta)^n,\tag{3.15}
$$

^eq-finite-difference-cost

因为对于每个保留的索引 $s\le q$，都有 $\eta^q\le\eta^s$。

> ##### 命题 3.4　通用计数例程
>
> 
> 
> ^prop-general-count
> 
> 
>
> 令 $\mathcal A$ 为一个交换 $\mathbb Q$-代数。假设 [[translation-3#^eq-general-product-sum|（3.1）]] 中各因子在 $\mathcal A$ 上计算的乘积满足次数上界 [[translation-3#^eq-general-product-degree|（3.2）]]，并且替代行、划分与测量满足定义 [[translation-3#^def-layout|3.1]]。取 [[translation-3#^eq-hasse-order|（3.5）]] 中的 $q,J$，该例程可通过检查至多
>
> $$
> 2Qr\,C_q(2D+1)^{2\tau n}2^{2n/r}
> $$
>
> 个布尔向量来计算 $Z$。对于每个向量，它在 $\mathcal A[z]/(z^J)$ 中对至多 $|\mathcal F|$ 个因子求值。每个向量的额外操作以及最后的插值，需要的 $\mathcal A$ 中和 $\mathbb Q$ 上的运算次数，对于参数 $n,|\mathcal F|,D,Q,R,J,r$ 和总作用域长度而言为多项式。除因子求值器自身的存储之外，该例程仅保留多项式数量的代数元素、有理数和索引位。

**证明。**

^proof-prop-general-count

共有 $Q$ 个点，每个点有 $C_q$ 个有序对，每个有序对至多对应 [[translation-3#^eq-boolean-enumeration|（3.12）]] 个布尔向量。形成每个组的乘积至多需要 $|\mathcal F|$ 次因子求值。模 $z^J$ 的加法和乘法需要在 $\mathcal A$ 中的系数上进行 $O(J^2)$ 次运算。前述 Taylor 恒等式和插值证明了正确性。按顺序处理各点、有序对、测量元组以及局部赋值，保留它们当前的索引和累加器。再加上 $QJ$ 个插值系数，就得到所述存储界。位复杂度还取决于因子求值成本与系数大小；第 [[translation-5#^subsec-one-query-cost|5.4]] 节将对稀疏多项式应用验证这些内容。

∎

当 $d=O(n)$ 时，有 $d_H=O(nR)$ 和 $q=O(nR/Q)$。在 [[translation-3#^eq-finite-difference-cost|（3.15）]] 中取 $\eta=R/Q$，得到

$$
\log C_q\le q\log(Q/R)+n\log(1+2R/Q)
     =O\!\left(n\frac RQ\log\frac{2Q}{R}\right).
$$

因此，如果因子求值与系数算术都具有多项式位成本，则运行时间为一个多项式因子乘以

$$
2^{O\left(n\left[
       \frac RQ\log\frac{2Q}{R}
       +\tau\log(2D+1)+\frac1r\right]\right)}.\tag{3.16}
$$

^eq-three-costs

这恰好就是概述中的三项成本。当因子作用域大小及其最大关联次数都以 $\log n$ 的某个固定次幂为界时，引理 [[translation-4#^lem-incidence-parameters|4.8]] 中的参数选择使它们的和为 $O((\log\log n)^2/\sqrt{\log n})$。该例程也适用于 $d$ 更大的情形；这时在命题 [[translation-3#^prop-general-count|3.4]] 的界中，保留实际值 $q=\lfloor dR/Q\rfloor$ 即可。

到目前为止，我们一直假设设计已经给定。下一节将从因子作用域出发构造这一设计。余下两节将使用所得例程，先对给定多项式系统的零点计数，再为一个公式选择这样的系统。
