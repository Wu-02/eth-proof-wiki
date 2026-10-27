---
id: translation-2
title: "原文中文译文 2 技术概述"
kind: translation
group: 原文中文译文
source_label: "2"
order: 101
publish: true
status: 原文中文译文（已审校）
---

## 2 技术概述

^sec-technical-overview

我们首先计算一个 $3$-CNF 的满足赋值数，其中每个变量至多出现在三个子句中。它的各子句多项式的乘积次数至多为 $3n$，因此我们可以利用插值，从对小变量组的求和中恢复精确计数。随后，第 [[translation-2#^subsec-preview-general-sat|2.8]] 节使用不交稀疏化和变量复制，对每个固定的 $k\ge2$，在 $(n+m)^{O_k(1)}2^{o(n)}$ 时间内计算任意 $k$-CNF 的满足赋值数。取 $k=3$ 就已经否定了 ETH。第 [[translation-2#^subsec-preview-full-case|2.9]] 节说明如何在原始变量上计数，从而得到命题 [[translation-6#^prop-interpolation-bound|6.4]] 中的指数 $O_k(\rho(n))$。

### 2.1 有界出现次数的设定

^subsec-preview-setting

设 $F$ 有 $n$ 个声明布尔变量。每个子句至多含有三个文字，每个变量至多出现在三个子句中，正、负出现次数合并计算。我们的任务是精确计算 $F$ 的满足赋值数。

我们删除重言子句以及同一子句中重复的文字。若存在空子句，立即得到计数为零。这些操作保持出现次数界。对于每个剩余子句 $e$，令 $I_e\subseteq[n]$ 为其变量集合。对于每个未出现在任何子句中的变量，添加一个作用域为 $\{v\}$、值等于一的因子。这样的因子不改变计数，并确保每个变量在构造中都有一个指定位置。我们称这些恒等于一的项为*虚拟子句*。令 $\mathcal F$ 为所有子句的索引集，包括虚拟子句。于是

$$
|I_e|\le3,\qquad
 \#\{e\in\mathcal F:v\in I_e\}\le3,\qquad
 n\le M:=\sum_{e\in\mathcal F}|I_e|\le3n.\tag{2.1}
$$

^eq-overview-incidences

下文所有求和仍遍历原始的 $n$ 个布尔变量。

### 2.2 直接表示计数的多项式

^subsec-preview-encoding

对正文字，记 $L_{e,v}(X_v)=X_v$；对负文字，记 $L_{e,v}(X_v)=1-X_v$。子句 $e$ 的满足多项式为

$$
\Phi_e((X_v)_{v\in I_e})
 =1-\prod_{v\in I_e}(1-L_{e,v}(X_v)).
$$

例如，$x_a\vee\neg x_b\vee x_c$ 给出

$$
\Phi_e(X_a,X_b,X_c)=1-(1-X_a)X_b(1-X_c).
$$

在布尔输入上，这个多项式在子句被满足时等于一，否则等于零。对于虚拟子句 $e$，令 $\Phi_e=1$。因此

$$
\#F=\sum_{x\in\{0,1\}^n}\prod_{e\in\mathcal F}
                   \Phi_e((x_v)_{v\in I_e}).\tag{2.2}
$$

^eq-overview-direct-count

该乘积的总次数至多为 $M\le3n$。这个线性次数界是三次出现假设带来的有用结果。

等式 [[translation-2#^eq-overview-direct-count|（2.2）]] 是计数的一个精确表达式，但计算其中的 $2^n$ 个求和项就相当于穷举搜索。为说明算法的动机，假设我们得到一个将变量划分为 $r$ 个组 $S_1,\ldots,S_r$ 的划分，并且它同时满足以下两个条件：

1.  每组至多包含 $2n/r$ 个变量。

2.  对每个子句，它的所有变量都属于同一个组。

这只是一个假想的、限制很强的假设；我们并不假设输入公式存在这样的划分。

在这一假设下，我们可以独立地计算每组中的满足赋值数。令 $N_g$ 为对 $S_g$ 中变量的赋值中满足该组所有子句的赋值数。任何这样的赋值都可以与其他组中的任意满足赋值组合，因为没有子句连接不同的组。每个全局满足赋值都以恰好一种这样的方式产生。因此，

$$
\#F=\prod_{g=1}^r N_g.
$$

通过在各组内穷举搜索计算每个 $N_g$，总共检查的局部赋值数至多为

$$
\sum_{g=1}^r 2^{|S_g|}\le r\,2^{2n/r}
$$

且每个赋值所需的工作量为多项式。当 $r$ 很大时，这远快于枚举所有 $2^n$ 个全局赋值。

我们将替代子句的输入，使不同组之间仅通过少量共享线性摘要发生相互作用。一旦这些摘要的值固定，就又能对每个组分别求和。

### 2.3 具有更易求值点的多项式族

^subsec-preview-deformation

我们引入参数 $T$。在 $T=0$ 处，替代必须恢复原始子句输入。在选定的非零点 $T=1,\ldots,Q$ 处，替代应使我们能够通过固定共享线性摘要来分离各组。这里，$Q$ 是所选点的数量，$R$ 将作为替代系数次数的上界。我们稍后选择这两个参数。

用 $\vec{X}=(X_1,\ldots,X_n)$ 表示形式变量向量。对于每次出现 $v\in I_e$，使用多项式系数向量 $\vec{P}_{e,v}(T)=(p_{e,v,1}(T),\ldots,p_{e,v,n}(T))$，将子句 $e$ 中的 $X_v$ 替代为标量内积

$$
\langle \vec{P}_{e,v}(T),\vec{X}\rangle
 =\sum_{i=1}^n p_{e,v,i}(T)X_i.
$$

我们称这个表达式为变量 $v$ 在子句 $e$ 中这次出现的*替代线性形式*。它替代子句多项式 $\Phi_e$ 中的输入 $X_v$。我们要求

$$
\langle \vec{P}_{e,v}(0),\vec{X}\rangle=X_v,
 \qquad \deg \vec{P}_{e,v}\le R.
$$

不同子句可以对同一变量使用不同的替代线性形式。定义

$$
H(T)=\sum_{x\in\{0,1\}^n}\prod_{e\in\mathcal F}
       \Phi_e\bigl((\langle \vec{P}_{e,v}(T), x\rangle)_{v\in I_e}\bigr)
       \in\mathbb Q[T].\tag{2.3}
$$

^eq-simple-counting-polynomial

在零点处，每个替代都恢复原始变量，而每个子句多项式的次数至多增长到原来的 $R$ 倍。因此

$$
H(0)=\#F,\qquad \deg H\le MR\le3nR.\tag{2.4}
$$

^eq-overview-value-degree

我们将从 $t=1,\ldots,Q$ 处的 Taylor 系数恢复 $H(0)$。如第 [[translation-2#^subsec-preview-interpolation|2.5]] 节所解释的，这个次数界意味着每个点只需 $O(1+nR/Q)$ 个系数。因此，我们的目标是使 $R$ 相对于 $Q$ 较小：若有很多具有低次数替代的点，则每个点所需的系数更少。

在非零的 $t$ 处，即使 $x$ 是布尔向量，替代线性形式的值 $\langle\vec{P}_{e,v}(t),x\rangle$ 也未必属于 $\{0,1\}$。因此，变换后的子句多项式未必仍起满足性示性函数的作用。

### 2.4 通过固定测量分离求和

^subsec-preview-separation

固定 $t\in[Q]$。给定系数向量 $\vec{P}_{e,v}(t)$，其各元素现在都是常数。我们说明什么样的结构使我们能够快速计算 $H(t)$，以及如何使用这种结构。在本小节中，记 $S_g=S_{t,g}$、$C_g=C_{t,g}$。

> ##### 定义 2.1　$(r,\tau,D)$-设计
>
> 
> 
> ^def-overview-measurement-structure
> 
> 
>
> 对于给定的系数向量 $\vec{P}_{e,v}(t)$，一个*在 $t$ 处的 $(r,\tau,D)$-设计*由组 $S_g$、子句分配 $\sigma_e(t)$ 以及测量矩阵 $C_g$ 构成，并满足以下四个条件：
>
> 1.  *小组。* 将变量划分为不交的组 $[n]=S_1\sqcup\cdots\sqcup S_r$，且 $|S_g|\le2n/r$。
>
> 2.  *每个子句分配一个组。* 将每个子句 $e$ 分配到一个组 $\sigma_e(t)\in[r]$。对于子句 $e$ 的每个替代线性形式，条件4必须对同一个所分配的组成立。
>
> 3.  *少量有界测量。* 每个组 $g$ 都有一个整数矩阵 $C_g$，其列以 $S_g$ 为索引，行数为 $c_g$。每行指定对 $S_g$ 中变量的一次线性测量。所有矩阵的总行数至多为 $2\tau n$，每行系数的绝对值之和至多为 $D$。对于赋值 $x$，记
>
>     $$
>     x_g=x|_{S_g},\qquad y_g=C_gx_g,\qquad
>      \vec{y}=(y_1,\ldots,y_r).
>     $$
>
> 4.  *仅通过测量依赖其他组。* 假设子句 $e$ 被分配到组 $g=\sigma_e(t)$。该子句的每个替代线性形式可以自由地依赖于 $S_g$ 中的变量。它对任何其他组 $S_h$ 的依赖，必须是该组测量 $y_h$ 的一个线性组合。准确地说，对于每个 $v\in I_e$，必须存在系数向量 $\vec{\lambda}_{e,v,h}\in\mathbb Q^{c_h}$，其中 $h\ne g$，使得对于每个 $x\in\mathbb Q^n$，都有
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

矩阵 $C_h$ 由所有子句共享。一个子句被分配的组未必包含其原始变量。然而，一旦 $\vec{y}$ 固定，整个变换后的子句多项式就只依赖于其所分配的组中的变量。

**算法。** 给定一个在 $t$ 处的 $(r,\tau,D)$-设计，首先求解条件4保证存在的线性方程组，以求出系数向量 $\vec{\lambda}_{e,v,h}$。对于固定的 $\vec{y}$，令 $\mathcal X_{t,g}(y_g)$ 为对 $S_g$ 中变量的赋值中测量等于 $y_g$ 的赋值集合：

$$
\mathcal X_{t,g}(y_g)
 =\{u\in\{0,1\}^{S_g}:C_gu=y_g\}.
$$

对于这样的赋值 $u$，按如下方式计算组 $g$ 的贡献。对于每个分配到 $g$ 的子句 $e$，先使用 [[translation-2#^eq-outline-separation|（2.5）]]，根据 $u$ 和固定的测量计算其替代线性形式的值。接着，将这些值代入子句多项式 $\Phi_e$ 求值。最后，将分配到 $g$ 的所有子句所得到的值相乘。以 $A_{t,g}(u;\vec{y})$ 表示这一乘积。这项计算不需要其他组的赋值。

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

为说明该过程为何返回 $H(t)$，固定 $\vec{y}$，并从每个集合 $\mathcal X_{t,g}(y_g)$ 中选择一个赋值。由于各组包含的变量集合互不相交，这些选择组合成一个完整赋值。每个测量为 $\vec{y}$ 的完整赋值都以恰好一种这样的方式产生。其子句多项式的乘积，就是各组贡献 $A_{t,g}$ 的乘积。因此，将各组内和的乘积展开，再对 $\vec{y}$ 求和，便得到

$$
H(t)=\sum_{\vec{y}\in\mathcal Y}\prod_{g=1}^r
       \left(\sum_{u\in\mathcal X_{t,g}(y_g)}
                         A_{t,g}(u;\vec{y})\right).\tag{2.6}
$$

^eq-outline-separated-sum

每个布尔赋值恰有一个测量元组，因此这个和将每个赋值的贡献恰好计入一次。

测量元组的数量至多为 $(2D+1)^{2\tau n}$。对于每个元组，该算法至多尝试 $\sum_g2^{|S_g|}\le r2^{2n/r}$ 个各组的赋值。因此，忽略多项式因子，运行时间为

$$
(2D+1)^{2\tau n}2^{2n/r}
$$

其中第一个因子界定测量元组的数量；第二个因子界定一个组内的赋值数量。算法每次扫描一个组，仅保存当前测量元组、当前赋值以及累积的和与乘积；参见引理 [[translation-3#^lem-measurement-separation|3.2]]。

对于第 [[translation-2#^subsec-preview-parameters|2.6]] 节中的参数选择，我们可以构造次数至多为 $R$ 的替代形式，它们在零点恢复原始变量，并且在每个 $t\in[Q]$ 处都允许一个 $(r,\tau,D)$-设计。第 [[translation-2#^subsec-preview-auxiliary|2.7]] 节给出该构造。我们先说明这些性质如何使我们能够高效地恢复计数。

### 2.5 从 Taylor 系数恢复计数

^subsec-preview-interpolation

我们的目标是从点 $t=1,\ldots,Q$ 处的信息恢复 $H(0)=\#F$。由于 $\deg H\le3nR$，仅有 $Q$ 个值 $H(t)$ 可能不足以确定 $H$。我们改为在每个点计算多个 Taylor 系数。取

$$
q=\left\lfloor\frac{3nR}{Q}\right\rfloor,\qquad J=q+1.
$$

假设对于每个 $t\in[Q]$，我们都知道 $H(t+z)$ 中 $z^0,\ldots,z^q$ 的系数。这些数据唯一确定 $H$：若两个次数至多为 $3nR$ 的多项式具有相同的数据，则它们的差对每个 $t\in[Q]$ 都可被 $(T-t)^J$ 整除，从而可被 $\prod_{t=1}^Q(T-t)^J$ 整除。这个乘积的次数为 $QJ>3nR$，所以该差必为零。每个 Taylor 系数给出一个关于 $H$ 的系数的线性方程。求解这一有理线性方程组即可恢复 $H$，其常数项系数就是所求计数 $H(0)$。

剩下的任务是计算这些 Taylor 系数。固定 $t\in[Q]$；我们要得到 $H(t+z)$ 关于 $z$ 直至 $q$ 次的各项。设计控制了 $t$ 处的替代形式，却未必控制它们从 $t$ 到 $t+z$ 的变化。我们首先为这些变化引入一个单独的输入，使得固定该输入后仍保持各组的分离。

**将移位输入分开处理。** 记

$$
\Delta\vec P_{e,v}(z)=\vec P_{e,v}(t+z)-\vec P_{e,v}(t).
$$

保持 $x$ 作为求和所遍历的布尔赋值，并为这些变化引入一个单独的形式向量 $\vec X$。定义

$$
\mathcal G_x(\vec X,z)=
 \prod_{e\in\mathcal F}\Phi_e\bigl(
       (\langle\vec P_{e,v}(t),x\rangle+
        \langle\Delta\vec P_{e,v}(z),\vec X\rangle)_{v\in I_e}\bigr).\tag{2.7}
$$

^eq-outline-taylor-product

这里，$x$ 是该多项式的索引，而 $\vec X$ 和 $z$ 是它的形式变量。令 $\vec X=x$ 就恢复了每个移位输入 $\langle\vec P_{e,v}(t+z),x\rangle$，所以

$$
H(t+z)=\sum_{x\in\{0,1\}^n}\mathcal G_x(x,z).
$$

另一方面，对于某个 $U\subseteq[n]$ 固定 $\vec X=\mathbf1_U$，便使每个修正项 $\langle\Delta\vec P_{e,v}(z),\mathbf1_U\rangle$ 都与 $x$ 无关。此时对 $x$ 的所有依赖仍然通过 $\langle\vec P_{e,v}(t),x\rangle$ 体现，设计在这里适用。因此，我们的任务是从 $\vec X$ 固定时的求和，恢复 $\vec X=x$ 时的求和。

次数界使得仅用少量固定代入就能做到这一点。$\Delta\vec P_{e,v}(z)$ 的每个元素都可被 $z$ 整除，因此展开项中每出现一个 $X_i$，就至少贡献一个 $z$ 因子。于是

$$
\deg_{\vec X}([z^j]\mathcal G_x(\vec X,z))\le j.
$$

因此，丢弃 $z$ 的次数高于 $q$ 的幂之后，每个单项式涉及 $\vec X$ 中至多 $q$ 个不同变量。

**通过容斥恢复移位后的和。** 在模 $z^J$ 下运算，因而只保留直至 $z^q$ 的系数。将 $\mathcal G_x$ 中 $X_i$ 的每个正整数次幂都替换为 $X_i$。这保持了它在布尔输入上的值。上述次数界给出，对布尔向量 $\vec X$ 有

$$
\mathcal G_x(\vec X,z)\equiv
 \sum_{\substack{E\subseteq[n]\\|E|\le q}}
       a_E(x,z)\prod_{i\in E}X_i\pmod{z^J},
$$

其中 $a_E(x,z)$ 是经过这一替换后所示单项式的系数。在 $\mathbf1_U$（恰在 $U$ 中取一的向量）处求值，会将以 $U$ 的子集为索引的系数相加。容斥可以提取出每一个系数：

$$
a_E(x,z)\equiv
 \sum_{U\subseteq E}(-1)^{|E|-|U|}
                 \mathcal G_x(\mathbf1_U,z)\pmod{z^J}.
$$

当令 $\vec X=x$ 时，单项式 $\prod_{i\in E}x_i$ 等于一，当且仅当 $E$ 中的所有位都为一。因此，它对关于 $x$ 的求和的贡献是 $\sum_{x:\,x_i=1\ (i\in E)}a_E(x,z)$，其中 $x$ 为布尔向量。代入上述系数公式，即将它归约为形式输入固定时的求和。

**计算受限的和。** 对于满足 $|E|\le q$ 的 $U\subseteq E\subseteq[n]$，定义

$$
\mathcal Z_{t,E,U}(z)=
 \sum_{\substack{x\in\{0,1\}^n\\x_i=1\ (i\in E)}}
                    \mathcal G_x(\mathbf1_U,z)
       \quad\text{在 }\mathbb Q[z]/(z^J)\text{ 中}.\tag{2.8}
$$

^eq-outline-restricted-taylor-sum

这里，$U$ 固定形式输入 $\vec X=\mathbf1_U$，而 $E$ 将求和变量 $x$ 的若干位固定为一。对各单项式的贡献求和，得到

$$
H(t+z)\equiv
 \sum_{\substack{E\subseteq[n]\\|E|\le q}}
       \sum_{U\subseteq E}(-1)^{|E|-|U|}
                         \mathcal Z_{t,E,U}(z)\pmod{z^J}.\tag{2.9}
$$

^eq-outline-taylor-recovery

这同时恢复全部 $J=q+1$ 个 Taylor 系数。引理 [[translation-3#^lem-boolean-differences|3.3]] 给出了这里使用的一般恒等式。

每个和 $\mathcal Z_{t,E,U}$ 都可以用第 [[translation-2#^subsec-preview-separation|2.4]] 节的算法求值。固定 $\vec X=\mathbf1_U$ 后，每个修正项 $\langle\Delta\vec P_{e,v}(z),\mathbf1_U\rangle$ 都与 $x$ 无关。对 $x$ 的所有依赖都通过形式 $\langle\vec P_{e,v}(t),x\rangle$ 体现，因此固定 $\vec y$ 仍可分离子句多项式。限制 $x_i=1$ 对各组都是局部的。分离恒等式只使用加法、乘法和分配律，所以也适用于这些截断多项式值。在代入 $\vec X=\mathbf1_U$ 后对每个子句求值，仅使用关于 $z$ 的次数小于 $J$ 的一元多项式，并在每次乘法之后丢弃更高次幂。多元展开及其系数 $a_E(x,z)$ 仅用于证明恒等式；算法从不构造它们。

在 $t=1,\ldots,Q$ 处重复这一计算，就提供了上述插值所需的全部 Taylor 系数，进而恢复 $H(0)=\#F$。

### 2.6 三项成本与运行时间

^subsec-preview-parameters

提前说明，第 [[translation-2#^subsec-preview-auxiliary|2.7]] 节将构造替代形式，使其在零点恢复原始变量、次数至多为 $R$，并且在每个 $t\in[Q]$ 处都允许一个 $(r,\tau,D)$-设计。对于充分大的 $n$，该构造耗时为多项式，并实现以下参数界：

$$
\begin{aligned}
 r&=\Theta\!\left(\frac{\sqrt{\log n}}{(\log\log n)^2}\right),
 &Q&=\Theta\!\left(\frac{\log n}{\log\log n}\right),\\
 R&=\Theta(\sqrt{\log n}),
 &\tau&=\Theta\!\left(\frac1{r\log n}\right),\qquad
 D=r^{2Q}\le(2n)^{1/128}.
 \end{aligned}\tag{2.10}
$$

^eq-overview-parameter-bounds

我们先说明这些界如何给出一个快速计数算法；下一小节将证明它们能够同时实现。

回顾 $q=J-1=\lfloor3nR/Q\rfloor$。对于每个求值点 $t$，第 [[translation-2#^subsec-preview-interpolation|2.5]] 节对每一对满足 $|E|\le q$ 的 $U\subseteq E$ 计算一个受限的和。大小为 $j$ 的 $E$ 有 $\binom nj$ 种选择，然后 $U$ 有 $2^j$ 种选择。每个受限的和都枚举测量元组以及各个组内的赋值。因此，忽略多项式因子，三项成本相乘给出

$$
\underbrace{\sum_{j=0}^{\min(q,n)}2^j\binom nj}_{\text{Taylor 数据}}
 \ \cdot\
 \underbrace{(2D+1)^{2\tau n}}_{\text{测量}}
 \ \cdot\
 \underbrace{2^{2n/r}}_{\text{单个组}}.\tag{2.11}
$$

^eq-overview-three-costs

为界定第一项成本，注意由于 $R/Q\to0$，对充分大的 $n$ 有 $1\le q\le n/2$。利用 $\binom nj\le(en/j)^j$ 以及 $(2en/j)^j$ 在 $1\le j\le n$ 上递增这一事实，我们得到

$$
\sum_{j=0}^q2^j\binom nj
 \le(q+1)\left(\frac{2en}{q}\right)^q.
$$

由于 $q=\Theta(nR/Q)$，这一成本的对数为 $O(n(R/Q)\log(2Q/R))$。因此，对 [[translation-2#^eq-overview-three-costs|（2.11）]] 中全部三项成本取对数，得到

$$
O\!\left(n\left[
       \frac RQ\log\frac{2Q}{R}
       +\tau\log(2D+1)+\frac1r\right]\right).
$$

在 [[translation-2#^eq-overview-parameter-bounds|（2.10）]] 下，每一项都很小：

$$
\begin{aligned}
 \frac RQ\log\frac{2Q}{R}
   &=O\!\left(\frac{\log\log n}{\sqrt{\log n}}
                      \cdot\log\log n\right),\\
 \tau\log(2D+1)&=O\!\left(\frac1{r\log n}\cdot\log n\right)
                  =O(1/r),\\
 \frac1r&=O\!\left(\frac{(\log\log n)^2}{\sqrt{\log n}}\right).
 \end{aligned}
$$

因此，对有界出现次数实例的计数可在

$$
n^{O(1)}2^{O(n(\log\log n)^2/\sqrt{\log n})}\tag{2.12}
$$

^eq-overview-bounded-time

次位运算和多项式空间内完成。有限多个规模较小的输入通过穷举搜索处理。

点数 $Q$、组数 $r$ 和截断阶数 $J=O(1+nR/Q)$ 都是关于 $n$ 的多项式。因此，遍历点与组的循环、次数小于 $J$ 的多项式上的算术，以及最终的插值，都只会使上述三种枚举的每次迭代增加多项式次运算。

位复杂度与空间界见附录 [[translation-B#^subsec-overview-arithmetic|B.4]]。

### 2.7 构造低次数替代线性形式

^subsec-preview-auxiliary

考虑 $X_v$ 在某个子句中的一次出现。在 $T=0$ 处，它的替代必须等于 $X_v$。在每个 $t=1,\ldots,Q$ 处，该子句必须能够仅利用分配给它的组和少量共享测量来求出同一个替代的值。在每个点选择不同的线性形式再进行插值，通常需要次数为 $Q$ 的多项式。为了降低 Taylor 恢复的成本，我们需要次数 $R$ 远小于 $Q$。

假设替代中的某一项仅在 $t=2$ 处使用了子句所属组之外的变量。将该项乘以 $1-T/2$，会使它在零处保持不变，而在 $t=2$ 处消失。在其他每个求值点，子句都可以从自己的组中读取该变量。对于多个这样的点，同样的技巧也有效：每个点对应一个因子，每个因子使多项式次数增加一。因此，难点在于把每个输入写成一个和，其中一部分由共享测量确定，而其余每一项仅在少数点使用所属组之外的变量。我们先在记录分组选择的辅助坐标上构造这样的分解，然后代入公式的变量。

**步骤 1：设置辅助坐标。**

在每个求值点，一次出现 $(e,v)$ 有两个分组选择：包含变量 $v$ 的组，以及分配给子句 $e$ 的组。在全部 $Q$ 个点上，这些选择构成由 $Q$ 个有序对组成的序列。因此，我们使用坐标集

$$
\mathcal B=([r]\times[r])^Q,\qquad D=|\mathcal B|=r^{2Q}.
$$

将一个索引写成

$$
u=\bigl((a_u(1),d_u(1)),\ldots,(a_u(Q),d_u(Q))\bigr).
$$

我们将为每个这样的索引构造一个替代行，因此，无论之后为公式作出何种分组选择，都可以使用它。

令 $\vec\zeta=(\zeta_w)_{w\in\mathcal B}$ 为原变量的形式占位符；我们将在步骤 4 中把原变量填入。在点 $t$ 处，坐标 $\zeta_w$ 属于组 $a_w(t)$，而 $\zeta_u$ 的替代被分配给组 $d_u(t)$。因此，该替代可以自由使用的坐标是

$$
\mathcal S_{t,d_u(t)},\qquad
 \mathcal S_{t,g}:=\{w\in\mathcal B:a_w(t)=g\}.
$$

特别地，$\zeta_w$ 属于所分配的组，当且仅当 $a_w(t)=d_u(t)$。各集合 $\mathcal S_{t,g}$ 将 $\mathcal B$ 划分为若干组，每组有 $D/r$ 个坐标。

我们的辅助目标是构造系数行 $\vec P_u(T)\in\mathbb Q[T]^D$ 和一个矩阵

$$
C\in\{0,1,-1\}^{c\times D},\qquad c\le\frac{D\tau}{3r},
$$

使得

$$
\langle\vec P_u(0),\vec\zeta\rangle=\zeta_u,
 \qquad \deg\vec P_u\le R-1,
$$

并且在每个 $t\in[Q]$ 处，替代线性形式 $\langle\vec P_u(t),\vec\zeta\rangle$ 都是以下可用数据的线性组合：

$$
\vec\zeta|_{\mathcal S_{t,d_u(t)}}\quad\text{和}\quad C\vec\zeta.\tag{2.13}
$$

^eq-overview-auxiliary-requirement

同一组测量 $C\vec\zeta$ 服务于每一行和每个求值点。这是第 [[translation-2#^subsec-preview-separation|2.4]] 节设计中依赖条件的辅助版本。

**步骤 2：构造常数矩阵。**

我们从以下恒等式出发：

$$
\zeta_u=((I_D-M_0)\vec\zeta)_u+
                   \sum_{w\in\mathcal B}M_0[u,w]\zeta_w.
$$

我们希望第一项由 $C\vec\zeta$ 确定。在求和中，每个非零系数都应仅在少数点连接不相容的组，以便用一个低次数多项式消除这些依赖。将这些点定义为

$$
E_{u,w}=\{t\in[Q]:a_w(t)\ne d_u(t)\}.
$$

对 $M_0\in\mathbb Q^{D\times D}$ 的两个要求是

$$
\begin{gathered}
 M_0\vec\xi=\vec\xi\quad\text{对每个 }\vec\xi\in\ker C,\\
 M_0[u,w]\ne0\quad\Longrightarrow\quad |E_{u,w}|\le R-1.
 \end{gathered}\tag{2.14}
$$

^eq-outline-matrix-conditions

第一个要求表明 $I_D-M_0$ 在 $\ker C$ 上为零。等价地，它的每一行都属于 $C$ 的行空间，因此 $(I_D-M_0)\vec\zeta$ 是测量 $C\vec\zeta$ 的线性函数。第二个要求将给出步骤 3 所用多项式的次数上界。

*通过保持 $f$ 的低次数来限制支撑集。* 令 $\Pi_s$ 为在每个索引中交换第 $s$ 对的两个分量、保持其他所有对不变的置换矩阵。这些矩阵两两可交换，并且满足 $\Pi_s^2=I_D$。令

$$
V_0=\prod_{s=1}^Q\Pi_s,\qquad
 W_0=\frac12\sum_{s=1}^Q(I_D-\Pi_s),\qquad
 M_0=V_0f(W_0),
$$

其中我们将选择一个次数至多为 $R-1$ 的多项式 $f$。完全交换 $V_0$ 已经符合每个分组要求：它在行 $u$ 中的非零元位于满足下式的列 $w$：

$$
(a_w(s),d_w(s))=(d_u(s),a_u(s))\quad\text{对每个 }s.
$$

特别地，$E_{u,w}$ 为空。

乘以 $f(W_0)$ 可以撤销某些交换，但 $f$ 的次数限制了可撤销的数量。展开 $f(W_0)$ 得到至多 $R-1$ 个交换的乘积。重复的交换会因 $\Pi_s^2=I_D$ 而抵消。因此，乘以 $V_0$ 后得到

$$
M_0=\sum_{\substack{S\subseteq[Q]\\|S|\le R-1}}
             \gamma_S\prod_{s\notin S}\Pi_s
 \qquad\text{对某些 }\gamma_S\in\mathbb Q.\tag{2.15}
$$

^eq-overview-partial-swaps

由 $S$ 索引的加项中的置换会交换 $S$ 之外的每一对。因此，其非零元对于每个 $s\notin S$ 都满足 $a_w(s)=d_u(s)$，从而 $E_{u,w}\subseteq S$。只要 $|E_{u,w}|>R-1$，每个加项都为零，因而它们的和也为零。这就证明了，对于任意次数至多为 $R-1$ 的多项式 $f$，[[translation-2#^eq-outline-matrix-conditions|（2.14）]] 中的第二个条件均成立。

*选择 $f$ 以固定大多数基方向。* 现在我们选择 $f$，使 $M_0$ 固定大多数基方向。先考虑一个位置，其坐标由 $[r]\times[r]$ 索引。令 $\vec e_{ab}$ 为在 $(a,b)$ 处为一、在其他位置为零的向量。交换这一对的变换具有如下正交特征基：

$$
\begin{array}{ll}
 \vec e_{aa}\quad(a\in[r]),\quad
 \vec e_{ab}+\vec e_{ba}\quad(a<b),
     &\text{特征值 }+1,\\[2pt]
 \vec e_{ab}-\vec e_{ba}\quad(a<b),
     &\text{特征值 }-1.
 \end{array}
$$

具有特征值 $+1$ 的向量有 $r(r+1)/2$ 个，具有特征值 $-1$ 的向量有 $r(r-1)/2$ 个。所有元素都属于 $\{0,1,-1\}$。

对于每个位置 $s\in[Q]$，选择一个这样的向量 $\vec\psi_s$，并逐坐标定义 $\vec\psi\in\mathbb Q^{\mathcal B}$：

$$
\psi_u=\prod_{s=1}^Q\psi_s(a_u(s),d_u(s)).
$$

这 $D=(r^2)^Q$ 种选择给出一个正交基：内积可以分解成 $Q$ 个位置处内积的乘积。交换 $\Pi_s$ 作用于 $\vec\psi$ 时，乘上的正是 $\vec\psi_s$ 的特征值。如果恰有 $j$ 个选择具有特征值 $-1$，则

$$
W_0\vec\psi=j\vec\psi,\qquad
 V_0\vec\psi=(-1)^j\vec\psi,\qquad
 M_0\vec\psi=(-1)^jf(j)\vec\psi.
$$

因此，令 $f(j)=(-1)^j$ 就可以使 $M_0$ 固定这些向量。

对于均匀选取的基向量，数目 $j$ 服从分布

$$
W\sim\operatorname{Bin}(Q,p),\qquad p=\frac{r-1}{2r},
$$

因为在每个位置，$r^2$ 种选择中有比例 $p$ 的选择具有特征值 $-1$。因此，大多数基向量的 $j$ 都接近 $Qp$。在 $Qp$ 附近选择一个由 $R$ 个连续整数组成的区间 $\mathcal I$，并对 $j\in\mathcal I$ 插值条件 $f(j)=(-1)^j$。这给出 $\deg f\le R-1$，并使 $M_0$ 固定每个满足 $j\in\mathcal I$ 的基向量。步骤 5 将指定端点，并检查该区间包含在 $\{0,\ldots,Q\}$ 中。

*测量异常方向。* 用其余基向量的转置作为 $C$ 的各行。它们的元素属于 $\{0,1,-1\}$；由正交性，$\ker C$ 由上面被固定的基向量张成。这证明了 [[translation-2#^eq-outline-matrix-conditions|（2.14）]] 中的第一个条件。

现在可以看出如何选择 $R$。$W$ 的标准差为 $\sqrt{Qp(1-p)}=\Theta(\sqrt Q)$。取 $R$ 远大于 $\sqrt Q$，就能使大多数基向量落在该区间内，从而只需测量很小的一部分。同时，仍可以取 $R$ 远小于 $Q$，使 Taylor 恢复在每个点仅需要 $1+\lfloor 3nR/Q\rfloor=o(n)$ 个系数。对于步骤 5 中的选择，二项分布尾界给出

$$
c=D\Pr[W\notin\mathcal I]
      \le 2D\exp\!\left(-\frac{R^2}{8Q}\right)
      \le\frac{D\tau}{3r},
$$

正如所需。因此，低次数给出受限的支撑集，而插值使修正项 $I_D-M_0$ 仅依赖这些少量测量。

**步骤 3：定义辅助替代行。**

现在将步骤 2 中 $\zeta_u$ 的分解转化为它的替代。保持由测量确定的那一项不变。对于每个 $M_0[u,w]\ne0$，将另一项中它的系数乘以

$$
\varphi_{u,w}(T)=\prod_{s\in E_{u,w}}(1-T/s).
$$

这个多项式在零处等于一，并在 $\zeta_w$ 位于所分配组之外的每个点处为零。用以下恒等式定义系数行 $\vec P_u(T)$：

$$
\langle\vec P_u(T),\vec\zeta\rangle
 =((I_D-M_0)\vec\zeta)_u+
   \sum_{\substack{w\in\mathcal B\\M_0[u,w]\ne0}}
                M_0[u,w]\varphi_{u,w}(T)\zeta_w.\tag{2.16}
$$

^eq-outline-auxiliary-row

这直接给出全部三个所需性质：

- 在 $T=0$ 处，每个乘子均为一，因此两项之和为 $\zeta_u$。

- 每个乘子的次数为 $|E_{u,w}|\le R-1$，所以 $\deg\vec P_u\le R-1$。

- 在 $T=t$ 处，第一项是 $C\vec\zeta$ 的线性函数。在求和中，一个系数只有在 $a_w(t)=d_u(t)$ 时才可能保留下来，因此只剩下 $\mathcal S_{t,d_u(t)}$ 中的坐标。

所以，该替代使用的恰好是 [[translation-2#^eq-overview-auxiliary-requirement|（2.13）]] 所允许的那些类型的数据。

**步骤 4：代入原变量。**

辅助行现已构造完毕。为了将其用于公式，选择调度

$$
a_v\in[r]^Q\quad(v\in[n]),\qquad
 d_e\in[r]^Q\quad(e\in\mathcal F).
$$

在点 $t$ 处，将变量 $v$ 放入组 $a_v(t)$，并将子句 $e$ 分配给组 $d_e(t)$：

$$
S_{t,g}=\{v:a_v(t)=g\},\qquad \sigma_e(t)=d_e(t).
$$

出现 $(e,v)$ 使用辅助标签

$$
u(e,v)=\bigl((a_v(s),d_e(s))\bigr)_{s\in[Q]}\in\mathcal B.
$$

令 $h$ 为获得同一个标签的出现次数的最大值。我们既需要变量组小，也需要 $h$ 小。对于我们这个每个变量至多出现三次、子句宽度至多为三的公式，引理 [[translation-4#^lem-incidence-labels|4.5]] 可以在多项式时间内确定性地选择调度，使得

$$
|S_{t,g}|\le2n/r,\qquad h\le2M/D,
$$

条件是

$$
12D^2\le M,\qquad 2Qr^2\le n.\tag{2.17}
$$

^eq-overview-balance-requirements

其思路是将随机选择调度的过程去随机化。如果所有 $a_v$ 和 $d_e$ 都从 $[r]^Q$ 中独立、均匀地选取，则每个标签的期望重数为 $M/D$，而每个组 $S_{t,g}$ 的期望大小为 $n/r$。在 [[translation-2#^eq-overview-balance-requirements|（2.17）]] 的假设下，标准的条件期望方法可以在多项式时间内将此选择去随机化，保证每个标签的重数至多为 $2M/D$，且每组大小至多为 $2n/r$。步骤 5 将验证我们的参数选择满足这些假设。

不同的出现可以获得相同的标签，却要求在该坐标放置不同的原变量。使用 $\mathcal B$ 的 $h$ 个副本，将标签相同的出现放在不同副本中。令 $j(e,v)\in[h]$ 表示 $(e,v)$ 所用的副本；在其坐标 $u(e,v)$ 处放置 $X_v$，并在未使用的位置放置零。用 $\vec\zeta^{(j)}(\vec X)$ 表示副本 $j$ 中填入这些值后所得的向量。每个分量都是零或一个原变量。$X_v$ 重复出现时使用相同的值，因此这些副本没有引入新的布尔变量。

将辅助行应用于包含该次出现的副本：

$$
\langle\vec P_{e,v}(T),\vec X\rangle
 =\left\langle\vec P_{u(e,v)}(T),
                  \vec\zeta^{(j(e,v))}(\vec X)\right\rangle.\tag{2.18}
$$

^eq-overview-transferred-row

在零处，右侧读取包含 $X_v$ 的坐标；代入变量会保持次数上界 $R-1$。在点 $t$ 处，它自由使用的坐标仅包含满足 $a_{v'}(t)=d_e(t)$ 的变量 $v'$。这些恰好是分配给该子句的组 $S_{t,d_e(t)}$ 中的变量。子句 $e$ 的所有出现都使用同一个所分配的组。

其余依赖通过 $h$ 个副本中的 $hc$ 个线性测量 $C\vec\zeta^{(j)}(\vec X)$ 产生。这些测量可能涉及多个原变量组。固定一个诸如 $x_1+x_2$ 的总和，仍然会使分别包含 $x_1$ 和 $x_2$ 的两个组相互耦合。因此，我们将每个测量拆成各个组的贡献。对于每个测量 $\ell(\vec X)$，写成

$$
\ell(\vec X)=\sum_{g=1}^r
        \ell|_{S_{t,g}}(\vec X|_{S_{t,g}}),
$$

并将这些限制的系数行收集到 $C_{t,g}$ 中。现在，每个辅助测量都是组测量的和。对于分配给组 $g$ 的子句，来自 $S_{t,g}$ 的部分是局部线性形式，而其他每一部分都是相应组的测量的线性组合。这正是 [[translation-2#^eq-outline-separation|（2.5）]] 中的条件。

总共有 $rhc$ 行。由于 $hD\le2M\le6n$，

$$
\sum_{g=1}^r c_{t,g}
 =rhc\le rh\frac{D\tau}{3r}\le2\tau n.
$$

$C$ 的每一行有 $D$ 个属于 $\{0,1,-1\}$ 的元素。代入变量、合并重复副本以及限制到某个组，都不会增加系数绝对值之和。因此，$C_{t,g}$ 的每一行都是整数行，且系数绝对值之和至多为 $D$。再结合组大小上界，就证明了这些替代形式在每个点都具有一个 $(r,\tau,D)$-设计。

**步骤 5：验证所承诺的参数界。**

这一构造需要两个平衡不等式 [[translation-2#^eq-overview-balance-requirements|（2.17）]] 以及尾界 $2e^{-R^2/(8Q)}\le\tau/(3r)$。现在我们选择具有 [[translation-2#^eq-overview-parameter-bounds|（2.10）]] 中所述数量级的参数，并验证这些要求。

令 $\lambda=\lceil\log_2 n\rceil$ 和 $\nu=\lceil\log_2\lambda\rceil$，并选择

$$
\begin{aligned}
 r&=\left\lfloor\frac{\sqrt\lambda}{\nu^2}\right\rfloor,
 &Q&=\left\lfloor\frac{\lambda}{128\nu}\right\rfloor,
 &R&=4\lceil\sqrt\lambda\rceil,\\
 \tau&=\frac1{r\lambda},
 &D&=r^{2Q}.
 \end{aligned}\tag{2.19}
$$

^eq-overview-explicit-parameters

这些参数具有 [[translation-2#^eq-overview-parameter-bounds|（2.10）]] 中所述的数量级。对于充分大的 $n$，有 $r\ge2$、$R\ge32$ 以及 $6R\le Q$，因为 $R/Q=O(\nu/\sqrt\lambda)\to0$。我们依次检查其余要求：

- *插值区间。* 取步骤 2 中的 $p=(r-1)/(2r)$，并令

  $$
  A_0=\left\lfloor Qp-\frac{R-1}{2}\right\rfloor,\qquad
   \mathcal I=\{A_0,\ldots,A_0+R-1\}.
  $$

  由于 $Q/4\le Qp\le Q/2$ 且 $6R\le Q$，该区间包含在 $\{0,\ldots,Q\}$ 中。此外，$R\ge32$ 保证该区间包含与 $Qp$ 的距离不超过 $R/4$ 的每个整数。因此，二项分布尾界给出步骤 2 中使用的估计 $\Pr[W\notin\mathcal I]\le2e^{-R^2/(8Q)}$。

- *多项式维数与平衡调度。* 由于 $\log_2 r\le\nu/2$，

  $$
  \log_2 D=2Q\log_2 r\le\lambda/128,\qquad
   D\le(2n)^{1/128}.
  $$

  对于充分大的 $n$，这给出

  $$
  12D^2\le12(2n)^{1/64}\le n\le M,\qquad
   2Qr^2=O(\lambda^2)\le n,
  $$

  满足步骤 4 的要求。

- *测量数少。* 有 $R^2/(8Q)\ge256\nu$。由于 $\lambda\le2^\nu$ 且 $r^2\le\lambda$，

  $$
  2e^{-R^2/(8Q)}\le2e^{-256\nu}
   \le\frac1{3\lambda^2}
   \le\frac1{3r^2\lambda}=\frac{\tau}{3r}.
  $$

  因此，步骤 2 给出了步骤 4 所用的辅助测量数上界。

最后，所有构造维数都以 $n$ 的多项式为界。引理 [[translation-4#^lem-row-coefficients|4.6]] 给出步骤 2–3 中矩阵与行的多项式构造时间，引理 [[translation-4#^lem-incidence-labels|4.5]] 则给出步骤 4 中调度的多项式构造时间。转移过程仅使用 $hD\le6n$ 个坐标位置。因此，我们已经在多项式时间内构造出替代形式，它们在零处恢复每个原输入，次数至多为 $R-1\le R$，并且在每个 $t\in[Q]$ 处都具有所承诺的 $(r,\tau,D)$-设计。这给出了第 [[translation-2#^subsec-preview-parameters|2.6]] 节所用的界；引理 [[translation-4#^lem-incidence-parameters|4.8]] 记录了完整证明中更一般情形的参数检查。

### 2.8 一般 $\#k$-SAT 的一个较弱算法

^subsec-preview-general-sat

上面的算法已经给出了一般 $\#k$-SAT 的一个次指数时间算法：经过不交稀疏化后，我们将每个实例直接归约为一个每个变量至多出现三次的 $3$-CNF。这两个步骤都保持计数，具体如下。

固定 $k\ge2$。我们使用保持计数的版本 〔[DHM$^{+}$14](https://arxiv.org/abs/1206.1775 "原引用键 DHMTW")，附录 A〕 来进行稀疏化 〔[IPZ01](https://doi.org/10.1006/jcss.2001.1774 "原引用键 IPZ")〕，并采用来自 〔[CIP06](https://cseweb.ucsd.edu/~paturi/myPapers/pubs/CalabroImpagliazzoPaturi_2006_ccc.pdf "原引用键 CIP")，第 6 节〕 和 〔[Cal09](https://cseweb.ucsd.edu/~ccalabro/dissertation_single_spaced.pdf "原引用键 CalabroThesis")，引理 5.14 及 式 (5.4)〕 的定量界。如引理 [[translation-6#^lem-sparsify|6.3]] 所记录，这会将输入的计数表示为至多 $\operatorname{poly}_k(n,\sigma^{-1})2^{\sigma n}$ 个公式 $G$ 的计数之和。每个 $G$ 都有相同的 $n$ 个声明变量，每个变量的出现次数至多为

$$
B=O_k\!\left((\sigma^{-1}\log(2/\sigma))^{k-1}\right)
$$

因此至多有 $Bn$ 个非空子句。如果有空子句，则计数立即为零。

首先，在不改变计数的前提下，将 $G$ 转换为 $3$-CNF。保留大小至多为三的子句。对于每个更长的子句，使用二输入 OR 门计算其析取，并要求最终输出为一。对于门 $z=u\vee v$，施加

$$
(\neg u\vee z)\ \wedge\ (\neg v\vee z)\ \wedge\
 (u\vee v\vee\neg z).
$$

这里 $u,v$ 是输入文字或先前门的输出，而 $z$ 是新变量。这些子句强制其等于该 OR 运算结果，因此各门的值由原赋值唯一确定。于是，$G$ 的一个满足赋值恰好有一种扩展成为新公式的满足赋值，而一个不满足 $G$ 的赋值则没有这样的扩展。每个子句需要使用 $O(k)$ 个门。

接着减少出现次数。如果某个变量 $x$ 在这个 $3$-CNF 中出现 $s\ge2$ 次，则用互不相同的副本 $x_1,\ldots,x_s$ 替换它的各次出现，保持其正负号，并加入 Tovey 的蕴含环 〔[Tov84](https://doi.org/10.1016/0166-218X(84)90081-7 "原引用键 Tov84")，第 86 页〕：

$$
(\neg x_1\vee x_2)\ \wedge\cdots\wedge\
 (\neg x_{s-1}\vee x_s)\ \wedge\ (\neg x_s\vee x_1).
$$

该环强制所有副本取值相同。每个副本都出现在一个继承自该 $3$-CNF 的子句和两个环子句中，因此恰好出现在三个子句中。至多出现一次的变量保持不变，包括未使用的声明变量。因此，这个标准的变量复制归约 〔[Gol08](https://www.wisdom.weizmann.ac.il/~oded/CC/bc-1.pdf "原引用键 Gol08")，命题 4.7〕 也给出了满足赋值之间的双射。最终公式 $\widehat G$ 满足 $\#\widehat G=\#G$，并且

$$
n\le N:=\#\{\widehat G\text{ 的变量}\}=O_k(Bn).
$$

它的所有子句大小至多为三，包括那些含两个文字的环子句；每个变量都至多出现三次。因此，它恰好属于本概述所讨论的实例情形。

对每个 $\widehat G$ 应用 [[translation-2#^eq-overview-bounded-time|（2.12）]] 并将计数相加。当 $\sigma^{-1}$ 以 $\log n$ 的某个固定次幂为界时，$B$ 也是如此，所得时间为

$$
(n+m)^{O_k(1)}
 2^{O_k\!\left(\sigma n+
          Bn(\log\log n)^2/\sqrt{\log n}\right)}.
$$

例如，选择与 $(\log n)^{-1/(2k)}$ 相差常数因子的 $\sigma$，得到

$$
(n+m)^{O_k(1)}
 2^{O_k\!\left(n(\log\log n)^{k+1}/(\log n)^{1/(2k)}\right)}
   = (n+m)^{O_k(1)}2^{o(n)}
$$

且只需多项式空间，方法是每次处理稀疏化树和归约所得实例中的一个。参数 $\sigma$ 可以取为有理数。

### 2.9 通过对 $\mathbb F_2$ 上稀疏低次数多项式方程的解计数，获得更快的 $\#k$-SAT 算法

^subsec-preview-full-case

第 [[translation-2#^subsec-preview-general-sat|2.8]] 节中的运行时间指数为 $O_k(\sigma n+B\rho(n))$，其中 $\rho(n)=n(\log\log n)^2/\sqrt{\log n}$。如果稀疏化在 $\sigma=\Theta(\rho(n)/n)$ 时能给出 $B=O_k(1)$，那么忽略多项式因子，我们就已经得到了用于一般 $\#k$-SAT 的 $2^{O_k(\rho(n))}$ 时间算法：每个叶子上的复制只会使用 $O_k(n)$ 个变量，叶子数也符合相同的上界。然而，在这一 $\sigma$ 选择下，所能保证的仅有 $B=(\log n)^{O_k(1)}$。

我们通过两个步骤获得 $2^{O_k(\rho(n))}$ 的界。首先，本概述中的计数算法可以推广到由 $\mathbb F_2$ 上 $O(n)$ 个多项式方程组成的系统，其中每个方程次数至多为 $k$，单项式数量为多对数级（定理 [[translation-2#^thm-overview-sparse-polynomials|2.2]]）。其次，即使一个叶子 $G$ 有 $Bn$ 个子句，我们仍可以在原来的 $n$ 个变量上构造这样一个系统，使其公共零点恰好是 $G$ 的满足赋值。我们先用一个自包含的随机化构造说明这一归约，再解释计数算法。

**到稀疏多项式方程的随机化归约。** 当 $x$ 违反子句 $e$ 时记 $v_e(x)=1$，否则记为 $0$。子句集 $S$ 上的一个*奇偶检验*是 $\mathbb F_2$ 上的多项式方程 $\sum_{e\in S}v_e(x)=0$：当 $x$ 违反 $S$ 中偶数个子句时，它接受。每个满足赋值都会通过，因此我们只需捕获每个非满足赋值。如果 $G$ 有 $m_G\le n$ 个子句，则每个子句使用一个检验就足够。以下假设 $m_G>n$。

一个短检验很容易漏掉唯一被违反的子句，但所有仅违反该子句的赋值给出的答案都相同。因此，需要捕获的单元素模式仅有 $m_G$ 个。使用 $8n$ 个独立检验。对每个检验，均匀、有放回地抽取 $L=2B\lceil\log_2(2m_G)\rceil$ 个子句。每次抽取后，都独立地以概率 $1/2$ 将该子句的违反位加入奇偶和；同一子句的两个被纳入副本会相互抵消。由于 $m_G\le Bn$，从总体期望来看，每个子句至少会被抽取对数级次数。对于一个固定的、含 $w\ge1$ 个被违反子句的集合，令 $u=Lw/m_G$ 为每个检验命中该集合的期望次数。如果样本命中了该集合，那么即使固定所有其他硬币结果，首次命中处的硬币也会以概率 $1/2$ 使奇偶和为奇数。因此，拒绝概率为

$$
p_w=\tfrac12\bigl(1-(1-w/m_G)^L\bigr)\ge\tfrac12(1-e^{-u}).
$$

对于少量违反，我们计算*集合*的数量；对于大量违反，则计算*赋值*的数量：

- 如果 $u\le1$，则 $p_w\ge u/4$。大小为 $w$ 的集合至多有 $m_G^w$ 个，因此至少有一个集合逃过所有检验的概率至多为 $m_G^w e^{-8np_w}\le m_G^w e^{-2nLw/m_G}\le16^{-w}$。对 $w\ge1$ 求和，得到失败概率至多为 $1/15$。

- 如果 $u>1$，则 $p_w>1/4$。对 $2^n$ 个赋值使用联合界，可将这一情形中任意赋值逃脱的概率上界为 $2^n(3/4)^{8n}<1/4$。

因此，以大于 $2/3$ 的概率，公共零点恰好是 $G$ 的满足赋值。每个 $v_e$ 都是至多 $k$ 个形如 $x_j$ 或 $1+x_j$ 的因子的乘积，因此每个检验的次数至多为 $k$，且单项式至多有 $2^kL$ 个，是 $n$ 的多对数级。第 [[translation-6#^sec-hashes|6]] 节将确定性地构造具有相同解集的短检验。我们先使用来自扩展图码的奇偶校验，保证任何仍能通过的非满足赋值必然违反许多子句。于是，一个随机短检验以至少 $1/4$ 的概率捕获每个这样的赋值。对于每个候选检验，我们计算同时通过该检验和此前所有已选检验的赋值数。我们追加一个使该计数最小的候选检验：每个满足赋值都会通过每个候选检验，因此，这至少消除了剩余非满足赋值中的四分之一。

**对公共零点计数。** 回顾第 [[translation-2#^subsec-preview-encoding|2.2]] 节，若 $x$ 满足子句 $e$，则 $\Phi_e(x)$ 为 $1$，否则为 $0$。当我们一次检验整个子句集 $S_i$ 时，应当用什么来替换这个因子？首先，用普通整数加法计算*这个检验*中被违反的子句数：

$$
L_i(x)=\sum_{e\in S_i}v_e(x)=\sum_{e\in S_i}\bigl(1-\Phi_e(x)\bigr).
$$

检验通过，当且仅当 $L_i(x)$ 为偶数。选择 $\ell=n+1$，使至多为 $2^n$ 的计数可由其模 $2^\ell$ 的余数确定。取补的 Beigel–Tarui 多项式 $p_\ell$（引理 [[translation-5#^lem-rational-idempotent|5.1]]）在偶整数上模 $2^\ell$ 为 $1$，在奇整数上为 $0$。例如，违反 $S_i$ 中两个子句仍然会通过检验：$p_\ell(2)\equiv1\pmod{2^\ell}$。以 $m_{\mathrm{test}}$ 表示检验数，我们的计数表达式变为

$$
\underbrace{\sum_x\prod_{e\in G}\Phi_e(x)}_{\text{每个子句一个因子}}
 \qquad\longrightarrow\qquad
 \underbrace{\sum_x\prod_{i=1}^{m_{\mathrm{test}}} p_\ell(L_i(x))}_{\text{每个检验一个因子}}.
$$

左侧是 $\#G$。右侧模 $2^\ell$ 的最小非负余数，是通过每个检验的赋值数。当这些检验捕获每个非满足赋值时，这恰好就是 $\#G$。相同的编码也适用于 $\mathbb F_2$ 上任意稀疏多项式方程 $P_i(x)=0$：取 $L_i(x)$ 为其列出的各单项式在整数上的和。同样，该方程成立，当且仅当这个和为偶数。

为了复用 Taylor 步骤，我们需要一个输入次数为 $O(n)$ 的乘积。直接将 $m_{\mathrm{test}}$ 个检验因子相乘，只能得到 $O(km_{\mathrm{test}}\ell)$ 的界，这可能是 $n$ 的二次量级。关键在于*对所有检验统一*截断乘积。第 [[translation-5#^subsec-rational-lift|5.1]] 节将 $p_\ell(y)$ 写成若干项 $e_j(y)h(y)^j$ 的和，其中 $e_j$ 的次数至多为一，而 $h(y)=y(y-1)$ 在每个整数处均为偶数。因此，包含 $\ell$ 个或更多 $h$ 副本的乘积项，在布尔赋值处模 $2^\ell$ 为零，即使这些副本来自不同的检验也一样。我们只保留总共含有少于 $\ell$ 个副本的项，并在相乘过程中跟踪这一数目。每个保留下来的项，在各 $L_i$ 上至多包含 $m_{\mathrm{test}}$ 个线性因子和 $\ell-1$ 个二次因子。由于 $\deg L_i\le k$，其输入次数至多为 $k(m_{\mathrm{test}}+2(\ell-1))=O(n)$。

对于替代形式，重要的是每个因子读取哪些变量。第 [[translation-2#^subsec-preview-deformation|2.3]] 节为子句中的每个变量使用一个形式，而现在我们为检验中的每个变量使用一个形式，并在整个检验中复用它。每个稀疏方程只读取多对数个变量。对出现最频繁的 $O(n/\sqrt{\log n})$ 个变量的取值进行分支后，每个剩余变量都只会出现在多对数个检验中，符合第 [[translation-4#^sec-construction|4]] 节的要求。在每个分支上，固定共享测量再次使我们可以一次对一个组求和。由于截断后的乘积具有 $O(n)$ 的输入次数，次数为 $R$ 的替代给出 $\deg_T H=O(nR)$：同样，每个点的 $O(1+nR/Q)$ 个 Taylor 系数可恢复 $T=0$ 处分别含有 $0,1,\ldots,\ell-1$ 个 $h$ 副本的贡献。它们之和模 $2^\ell$ 的最小非负余数就是该分支的精确计数。将各分支的计数相加，就得到公共零点的数量。

> ##### 定理 2.2　稀疏多项式的公共零点计数
>
> 
> 
> ^thm-overview-sparse-polynomials
> 
> 
>
> 固定整数 $k\ge2$ 和 $c\ge1$。令 $P_1,\ldots,P_{m_{\mathrm{test}}}$ 为 $n\ge20$ 个布尔变量上的 $\mathbb F_2$ 多项式，其中 $m_{\mathrm{test}}\le cn$。每个 $P_i$ 以一个列表给出，含有至多 $(\log n)^c$ 个次数至多为 $k$ 的单项式。可以用 $2^{O_{k,c}(n(\log\log n)^2/\sqrt{\log n})}$ 次位运算和 $n^{O_{k,c}(1)}$ 空间，确定性地计算 $\{0,1\}^n$ 中公共零点的精确数量。

第 [[translation-3#^sec-counting|3]] 节和第 [[translation-4#^sec-construction|4]] 节给出计数例程和替代形式；第 [[translation-5#^sec-setup|5]] 节利用它们，直接针对多项式方程证明该定理。

对于为 $G$ 构造的最终系统，其公共零点数量为 $\#G$。第 [[translation-6#^sec-hashes|6]] 节在每个叶子上只调用计数器 $2^{(\log n)^{O_k(1)}}$ 次，这保持了定理 [[translation-2#^thm-overview-sparse-polynomials|2.2]] 中的运行时间指数。最后，在第 [[translation-6#^subsec-general-reduction|6.4]] 节将 $\sigma$ 选为 $(\log\log n)^2/\sqrt{\log n}$ 的量级，可使 $B$ 保持多对数级，并使叶子数保持在 $2^{O_k(n(\log\log n)^2/\sqrt{\log n})}$ 以内。它们的满足赋值两两不交，因此将计数相加即得到命题 [[translation-6#^prop-interpolation-bound|6.4]] 中的界。
