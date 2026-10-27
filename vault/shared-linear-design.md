---
id: shared-linear-design
title: "共享线性测量与分组设计"
kind: support
group: 定义与构造
publish: false
status: 完整证明整合稿
---

# 共享线性测量与分组设计

本页给出将布尔变量分组并用线性测量分离求和的方法：先以子句多项式为例，定义所需设计并证明固定测量算法；再推广到一般多项式因子，说明核条件和系数界的作用。

## 子句多项式与固定测量

^subsec-preview-separation

先考虑变量 $X_1,\ldots,X_n$ 上的一个 3-CNF 公式 $F$。预先删除每个子句中的重复文字，并删除恒真的子句。以有限集合 $\mathcal F$ 为子句的索引集，令 $I_e\subseteq[n]$ 是子句 $e$ 中出现的变量下标集合。对 $v\in I_e$，正文字和负文字分别对应多项式 $L_{e,v}(X_v)=X_v$ 和 $L_{e,v}(X_v)=1-X_v$；子句的满足示性多项式为

$$
\Phi_e((X_v)_{v\in I_e})
 =1-\prod_{v\in I_e}(1-L_{e,v}(X_v)).
$$

在布尔输入上，$\Phi_e$ 在子句满足时等于 $1$，否则等于 $0$。也允许在 $\mathcal F$ 中加入值恒为 $1$ 的中性因子，并为其指定一个变量下标集合 $I_e$；这不改变因子的乘积。中性因子可以不实际依赖所指定的输入。以下将子句示性多项式和中性项统称为因子，均以 $e\in\mathcal F$ 索引。

取整数 $Q\ge1$ 和 $R\ge0$，以 $T$ 为形式变量。对每个 $e\in\mathcal F$ 和 $v\in I_e$，给定多项式行向量 $\vec P_{e,v}(T)\in\mathbb Q[T]^{1\times n}$，其次数至多为 $R$，且 $\vec P_{e,v}(0)=\delta_v$；这里 $\delta_v$ 是第 $v$ 个标准基行向量。在因子 $e$ 中，将输入 $X_v$ 替换为标量 $\langle\vec P_{e,v}(T),x\rangle$，其中 $x\in\{0,1\}^n$。不同因子可对同一变量使用不同的替代行。定义

$$
H(T)=\sum_{x\in\{0,1\}^n}\prod_{e\in\mathcal F}
\Phi_e\bigl((\langle\vec P_{e,v}(T),x\rangle)_{v\in I_e}\bigr)
\in\mathbb Q[T].
$$

由替代行在 $T=0$ 处的初值，$H(0)$ 等于 $F$ 的满足赋值数。下面固定一个采样点 $t\in[Q]=\{1,\ldots,Q\}$，把各个有理行 $\vec P_{e,v}(t)$ 作为输入，给出计算 $H(t)$ 所需的设计及算法。各采样点的设计可以不同；下面的设计和算法均针对这个固定的 $t$。

> ##### 定义 2.1　$(r,\tau,D)$-设计
>
> 
> 
> ^def-overview-measurement-structure
> 
> 
>
> 取整数 $r\ge1$、$D\ge0$ 和实数 $\tau\ge0$。对于给定的系数向量 $\vec{P}_{e,v}(t)$，一个*在 $t$ 处的 $(r,\tau,D)$-设计*由变量组 $S_g=S_{t,g}$、因子分配 $\sigma_e(t)$ 以及测量矩阵 $C_g=C_{t,g}$ 构成，并满足以下四个条件：
>
> 1.  *小组。* 将变量划分为不交的组 $[n]=S_1\sqcup\cdots\sqcup S_r$，且 $|S_g|\le2n/r$。
>
> 2.  *每个因子分配一个组。* 将每个因子 $e\in\mathcal F$ 分配到一个组 $\sigma_e(t)\in[r]$。对于因子 $e$ 的每个替代线性形式，条件4必须对同一个所分配的组成立。
>
> 3.  *少量有界测量。* 每个组 $g$ 都有一个整数矩阵 $C_g$，其列以 $S_g$ 为索引，行数 $c_g$ 为非负整数。每行指定对 $S_g$ 中变量的一次线性测量。所有矩阵的总行数至多为 $2\tau n$，每行系数的绝对值之和至多为 $D$。对于赋值 $x\in\mathbb Q^n$，记
>
>     $$
>     x_g=x|_{S_g},\qquad y_g=C_gx_g,\qquad
>      \vec{y}=(y_1,\ldots,y_r).
>     $$
>
> 4.  *仅通过测量依赖其他组。* 假设因子 $e\in\mathcal F$ 被分配到组 $g=\sigma_e(t)$。该因子的每个替代线性形式可以自由地依赖于 $S_g$ 中的变量。它对任何其他组 $S_h$ 的依赖，必须是该组测量 $y_h$ 的一个线性组合。准确地说，对于每个 $v\in I_e$，必须存在系数向量 $\vec{\lambda}_{e,v,h}\in\mathbb Q^{c_h}$，其中 $h\ne g$，使得对于每个 $x\in\mathbb Q^n$，都有
>
>     $$
>     \langle\vec{P}_{e,v}(t),x\rangle
>      =\langle\vec{P}_{e,v}(t)|_{S_g},x_g\rangle
>        +\sum_{h\ne g}\langle\vec{\lambda}_{e,v,h},y_h\rangle.\tag{2.5}
>     $$
>     
>     ^eq-outline-separation
>     
>     
>
>     等价地，对每个 $h\ne g$，$\vec{P}_{e,v}(t)|_{S_h}$ 都属于 $C_h$ 的行空间。

矩阵 $C_h$ 由所有因子共享。一个因子被分配的组未必包含其原始输入变量。然而，一旦 $\vec{y}$ 固定，变换后的因子就只依赖于其所分配的组中的变量。

**算法。** 给定一个在 $t$ 处的 $(r,\tau,D)$-设计，先对每个 $e\in\mathcal F$、$v\in I_e$ 和每个非指定组 $h\ne\sigma_e(t)$ 建立线性方程组 $C_h^{\mathsf T}\vec\lambda_{e,v,h}=(\vec P_{e,v}(t)|_{S_h})^{\mathsf T}$。条件4保证它有解，用有理数上的高斯消元求出一个系数向量 $\vec\lambda_{e,v,h}$。对于固定的 $\vec{y}$，令 $\mathcal X_{t,g}(y_g)$ 为组 $S_g$ 中所有满足 $C_gu=y_g$ 的布尔赋值所成的集合：

$$
\mathcal X_{t,g}(y_g)
 =\{u\in\{0,1\}^{S_g}:C_gu=y_g\}.
$$

对于这样的赋值 $u$，按如下方式计算组 $g$ 的贡献。对于每个分配到 $g$ 的因子 $e$，先使用 [[shared-linear-design#^eq-outline-separation|（2.5）]]，根据 $u$ 和固定的测量计算其替代线性形式的值。接着，将这些值代入因子多项式 $\Phi_e$ 求值。最后，将分配到 $g$ 的所有因子所得到的值相乘。以 $A_{t,g}(u;\vec{y})$ 表示这一乘积。这项计算不需要其他组的赋值。

布尔赋值的每个测量都是 $[-D,D]$ 中的整数。初始化 $Z=0$，并执行以下步骤：

1.  尝试每个测量元组 $\vec{y}\in\mathcal Y:=\prod_{g=1}^r\{-D,\ldots,D\}^{c_g}$。对于每个元组，执行步骤2和3。

2.  对每个组 $g$，尝试其变量的每个布尔赋值 $u$。仅当 $C_gu=y_g$ 时保留该赋值。将对应的乘积 $A_{t,g}(u;\vec{y})$ 相加，得到组内和

    $$
    B_{t,g}(\vec{y})=
     \sum_{u\in\mathcal X_{t,g}(y_g)}A_{t,g}(u;\vec{y}).
    $$

    若没有赋值满足 $C_gu=y_g$，则令 $B_{t,g}(\vec{y})=0$。

3.  将各组内和相乘，并将结果 $\prod_{g=1}^r B_{t,g}(\vec{y})$ 加到 $Z$ 上。

处理完所有测量元组后，返回 $Z$。

为说明该过程为何返回 $H(t)$，固定 $\vec{y}$，并从每个集合 $\mathcal X_{t,g}(y_g)$ 中选择一个赋值。由于各组包含的变量集合互不相交，这些选择组合成一个完整赋值。每个测量为 $\vec{y}$ 的完整赋值都以恰好一种这样的方式产生。其所有因子值的乘积，就是各组贡献 $A_{t,g}$ 的乘积。因此，将各组内和的乘积展开，再对 $\vec{y}$ 求和，便得到

$$
H(t)=\sum_{\vec{y}\in\mathcal Y}\prod_{g=1}^r
       \left(\sum_{u\in\mathcal X_{t,g}(y_g)}
                         A_{t,g}(u;\vec{y})\right).\tag{2.6}
$$

^eq-outline-separated-sum

每个布尔赋值恰有一个测量元组，因此这个和将每个赋值的贡献恰好计入一次。

**运算次数与存储。** 在本段的算术模型中，一次有理数运算或比较计作一次操作。输入给出各行 $\vec P_{e,v}(t)$、矩阵 $C_g$、子句的文字列表及各因子的组分配；子句多项式按前面的乘积公式求值，中性因子直接返回 $1$。记

$$
c=\sum_{g=1}^r c_g,\qquad
N_{\mathrm{ar}}=1+n+r+c+|\mathcal F|+\sum_{e\in\mathcal F}|I_e|.
$$

线性方程组的建立和求解需要 $\operatorname{poly}(N_{\mathrm{ar}})$ 次有理数操作。测量元组的数量至多为 $(2D+1)^{2\tau n}$。对于每个元组，算法至多尝试 $\sum_g2^{|S_g|}\le r2^{2n/r}$ 个局部赋值；对每个局部赋值，计算测量、替代输入和组内乘积所需的操作次数均为 $\operatorname{poly}(N_{\mathrm{ar}})$。因此总算术操作次数至多为

$$
(2D+1)^{2\tau n}2^{2n/r}\operatorname{poly}(N_{\mathrm{ar}}).
$$

第一个指数因子给出测量元组的数量上界，第二个给出单组布尔赋值的数量上界。算法逐组扫描，保存输入设计、求出的组合系数、当前测量元组、当前赋值和累积的和与乘积，需要保存 $\operatorname{poly}(N_{\mathrm{ar}})$ 个有理数；枚举索引所需位数为 $\operatorname{poly}(N_{\mathrm{ar}},\log(D+1))$。引理 [[3.2#^lem-measurement-separation|3.2]] 给出了这种逐项计算的通用形式。实际构造中的有理数位长，以及将算术操作界转为位时间、位空间界的分析，见 [[exact-arithmetic|精确算术、分母与流式求值]]。

采用 [[counting-algorithm-overview#^subsec-preview-parameters|计数算法概述中的参数选择]]，可以构造次数至多为 $R$ 的替代形式，使它们在 $T=0$ 处恢复原始变量，并在每个 $t\in[Q]$ 处具有上述设计；构造见 [[replacement-form-construction#^subsec-preview-auxiliary|替代形式构造]]。下面先将设计推广到一般多项式因子，并解释核条件。进一步阅读：[[3.3|布尔有限差分与 Taylor 系数]]；[[3.4|通用计数算法]]。

## 一般因子的替代行与测量设计

^subsec-layout-interface

现在将子句多项式推广为一般多项式因子。令 $\mathcal A$ 为有单位元的交换 $\mathbb Q$-代数；可取 $\mathcal A=\mathbb Q$。给定有限因子索引集 $\mathcal F$，对每个 $f\in\mathcal F$ 指定输入下标集合 $I_f\subseteq[n]$ 和多项式

$$
\Phi_f\in\mathcal A[(X_v)_{v\in I_f}].
$$

集合 $I_f$ 称为该因子的作用域，表示为它指定的输入坐标；因子不必实际依赖其中每个坐标。一个关联是满足 $f\in\mathcal F$、$v\in I_f$ 的有序对 $(f,v)$。为每个关联选取多项式行向量 $\vec P_{f,v}(T)\in\mathbb Q[T]^{1\times n}$；在点 $t$ 和赋值 $x\in\mathbb Q^n$ 处，变换后的因子值为

$$
\Phi_f\bigl((\langle\vec P_{f,v}(t),x\rangle)_{v\in I_f}\bigr)\in\mathcal A.
$$

这些有理标量通过 $\mathbb Q$-代数的标量作用参与求值。下述定义规定替代行、变量分组和测量矩阵之间的关系，并给出精确算术所需的系数界。仍以 $\delta_v$ 表示第 $v$ 个标准基行向量；组内向量 $\xi$ 的零扩展 $\widetilde\xi\in\mathbb Q^n$ 在该组之外的坐标均为零。

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
> 2.  对于每个因子 $f\in\mathcal F$，有一个序列 $\sigma_f\in[r]^Q$。$\sigma_f(t)$ 表示因子 $f$ 在采样点 $t$ 处分配到的组编号。
>
> 3.  对于每个 $t\in[Q]$ 和 $g\in[r]$，有一个整数矩阵 $C_{t,g}\in\mathbb Z^{[c_{t,g}]\times S_{t,g}}$，其中 $c_{t,g}$ 为非负整数。每行元素的绝对值之和至多为 $D$，并且
>
>     $$
>     \sum_{g=1}^r c_{t,g}\le2\tau n.
>     $$
>
>     对于一个赋值 $x\in\mathbb Q^n$，$C_{t,g}(x|_{S_{t,g}})$ 的各分量就是组 $g$ 上的测量。
>
> 4.  对于每个 $f\in\mathcal F$ 和 $v\in I_f$，有一个多项式行向量 $\vec{P}_{f,v}(T)\in\mathbb Q[T]^{1\times n}$，满足 $\vec{P}_{f,v}(0)=\delta_v$ 和 $\deg \vec{P}_{f,v}\le R$。对于每个 $t\in[Q]$、$g\in[r]\setminus\{\sigma_f(t)\}$ 以及 $\xi\in\mathbb Q^{S_{t,g}}$，要求
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

布尔向量的每个测量值都属于 $[-D,D]\cap\mathbb Z$。这里约束的是矩阵**每一行**的元素绝对值之和。这个条件也适用于将同一布尔坐标复制到多个辅助位置的构造：设辅助位置构成有限集合 $U$，映射 $\pi:U\to\{0\}\cup[n]$ 指定各位置所用的原坐标，约定 $x_0=0$，并令辅助坐标 $\zeta_a=x_{\pi(a)}$。设 $c_a\in\mathbb Z$，则辅助空间的一行测量 $\sum_{a\in U}c_a\zeta_a$ 在原坐标中写为

$$
\sum_{v=1}^n\left(\sum_{a\in U:\,\pi(a)=v}c_a\right)x_v.
$$

因此，即使辅助行的各个 $c_a$ 都属于 $\{0,1,-1\}$，合并映到同一原坐标的位置后，所得行的系数也未必仍在此集合内。这一复制并合并坐标的构造见 [[4.7]]。逐行的绝对值之和可以控制每个测量的取值范围；仅有秩的上界则不能控制可能的测量值数量：单独一行 $(1,2,4,\ldots,2^{n-1})$ 就能区分全部 $2^n$ 个布尔向量。

