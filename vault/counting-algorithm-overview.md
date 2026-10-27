---
id: counting-algorithm-overview
title: "共享线性摘要计数：工作示例与Taylor恢复"
kind: support
group: 定义与构造
publish: false
status: 完整证明整合稿
---

# 共享线性摘要计数：工作示例与Taylor恢复

本页给出一个完整的计数算法示例，先处理每个变量至多出现在三个子句中的 $3$-CNF，再推广到固定宽度的 CNF。内容依次为输入与编码、替代形式、求和与恢复恒等式、运行时间，以及保持计数的归约。

## 计算任务

^sec-technical-overview

输入公式 $F$ 附带完整的布尔变量集合 $\{x_1,\ldots,x_n\}$，并有 $m$ 个输入子句。声明变量即这个集合中的变量；未出现在子句中的变量也参与计数。记 $\#F$ 为这 $n$ 个变量上的满足赋值数。下面先研究每个子句至多含三个文字、每个变量至多出现在三个子句中的情形，最后给出对每个固定 $k\ge2$ 的一般 $k$-CNF 计数算法。

### 有界出现次数的设定

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

### 直接表示计数的多项式

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

该乘积的总次数至多为 $M\le3n$。这个线性次数界来自每个变量至多出现三次的假设。

等式 [[counting-algorithm-overview#^eq-overview-direct-count|（2.2）]] 是计数的一个精确表达式，但计算其中的 $2^n$ 个求和项就相当于穷举搜索。为说明算法的动机，假设我们得到一个将变量划分为 $r$ 个组 $S_1,\ldots,S_r$ 的划分，并且它同时满足以下两个条件：

1.  每组至多包含 $2n/r$ 个变量。

2.  对每个子句，它的所有变量都属于同一个组。

这只是一个假想的、限制很强的假设；我们并不假设输入公式存在这样的划分。

在这一假设下，我们可以独立地计算每组中的满足赋值数。令 $N_g$ 为组 $S_g$ 中满足该组全部子句的布尔赋值数。任何这样的赋值都可以与其他组中的任意满足赋值组合，因为没有子句连接不同的组。每个全局满足赋值都以恰好一种这样的方式产生。因此，

$$
\#F=\prod_{g=1}^r N_g.
$$

通过在各组内穷举搜索计算每个 $N_g$，总共检查的局部赋值数至多为

$$
\sum_{g=1}^r 2^{|S_g|}\le r\,2^{2n/r}
$$

且每个赋值所需的工作量为多项式。当 $r$ 很大时，这远快于枚举所有 $2^n$ 个全局赋值。

下面构造子句输入的多项式替代，并给出不要求原子句各自位于单组内的求和条件。

### 在特定点更易求值的多项式族

^subsec-preview-deformation

引入形式参数 $T$，并取整数 $Q\ge1$、$R\ge0$。在 $T=0$ 处，替代必须恢复原始子句输入；在整数点 $T=1,\ldots,Q$ 处，我们将计算用于插值的数据。$Q$ 是所选点的数量，$R$ 是替代系数次数的上界。先定义替代形式，再列出每个采样点所需的设计条件；具体参数稍后选择。

用 $\vec{X}=(X_1,\ldots,X_n)$ 表示形式变量向量。对于每次出现 $v\in I_e$，使用多项式系数向量 $\vec{P}_{e,v}(T)=(p_{e,v,1}(T),\ldots,p_{e,v,n}(T))\in\mathbb Q[T]^{1\times n}$，将子句 $e$ 中的 $X_v$ 替代为标量内积

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

在 $T=0$ 处，每个替代都恢复原始变量。对于每个固定的布尔赋值 $x$，替代后的子句因子关于 $T$ 的次数至多为 $R|I_e|$。因此

$$
H(0)=\#F,\qquad \deg H\le MR\le3nR.\tag{2.4}
$$

^eq-overview-value-degree

我们将从 $t=1,\ldots,Q$ 处的 Taylor 系数恢复 $H(0)$。如第 [[counting-algorithm-overview#^subsec-preview-interpolation|2.5]] 节所解释的，这个次数界意味着每个点只需 $O(1+nR/Q)$ 个系数。因此，我们的目标是使 $R/Q$ 较小。在次数界 $R$ 保持不变时，增加采样点数 $Q$ 不会增加每个点所需的系数数量；这些采样点还需满足下面的设计条件。

在非零的 $t$ 处，即使 $x$ 是布尔向量，替代线性形式的值 $\langle\vec{P}_{e,v}(t),x\rangle$ 也未必属于 $\{0,1\}$。因此，变换后的子句多项式未必仍起满足性示性函数的作用。

### 固定求值点的共享测量接口

固定 $t\in[Q]$。[[shared-linear-design#^def-overview-measurement-structure|定义 2.1]] 的设计使用整数 $r\ge2$、$D\ge1$ 及实数 $0<\tau\le1/2$，并提供以下数据：

- 将变量下标划分为 $[n]=S_1\sqcup\cdots\sqcup S_r$，其中 $|S_g|\le2n/r$，允许空组。
- 为每个子句或虚拟子句 $e$ 指定一个组编号 $\sigma_e(t)\in[r]$；该因子的所有输入 $v\in I_e$ 使用同一个指定组。
- 给定整数矩阵 $C_g\in\mathbb Z^{[c_g]\times S_g}$，其中 $c_g\ge0$ 为整数，$\sum_g c_g\le2\tau n$，每一行的系数绝对值之和至多为 $D$。对 $x\in\mathbb Q^n$，写 $x_g=x|_{S_g}$、$y_g=C_gx_g$ 和 $\vec y=(y_1,\ldots,y_r)$。
- 若 $g=\sigma_e(t)$，则对每个 $v\in I_e$ 和 $h\ne g$ 存在有理系数向量 $\lambda_{e,v,h}\in\mathbb Q^{c_h}$，使所有 $x\in\mathbb Q^n$ 都满足

$$
\langle\vec P_{e,v}(t),x\rangle
 =\langle\vec P_{e,v}(t)|_{S_g},x_g\rangle
 +\sum_{h\ne g}\langle\lambda_{e,v,h},y_h\rangle.
$$

因此，固定全部测量值 $\vec y$ 后，分配给组 $g$ 的整个子句多项式只依赖 $x_g$。相应的赋值限制也分别属于各组：$x_g\in\{0,1\}^{S_g}$ 且 $C_gx_g=y_g$。各组的局部赋值可独立组合成完整赋值。

固定测量算法遍历所有整数元组 $\vec y\in\prod_g\{-D,\ldots,D\}^{c_g}$。对每个元组和每个组，它枚举满足该组测量限制的布尔赋值，将分配给该组的全部子句多项式相乘后求和，再将各组的和相乘，最后对 $\vec y$ 求和。该算法返回 $H(t)$，所需算术操作次数为 $(2D+1)^{2\tau n}2^{2n/r}$ 乘以关于输入设计规模的多项式因子；完整算法和分解恒等式的证明见 [[shared-linear-design#^eq-outline-separated-sum|共享线性测量]]。具体构造下的位成本在下面的运行时间分析中计入。

### 代数求和与插值恢复

^subsec-related-algebraic

上述替代将原计数表示为 $H(0)$，并在选定的采样点提供按变量组求和的结构：固定共享测量值 $\vec y$ 后，先在各组内枚举布尔赋值，再将各组的贡献相乘。这也是 [[3.4|通用计数算法]] 和 [[parity-check-reduction|稀疏公式计数]] 所使用的求和方式。

为恢复 $H(0)$，我们将在每个允许这种快速求和的点计算多个 Taylor 系数，再用 Hermite 插值恢复 $H$。对于一元多项式 $g$，它在点 $t$ 处的 $j$ 阶 Hasse 导数就是 $g(t+z)$ 中 $z^j$ 的系数。下一部分给出所需的阶数，并在截断多项式环中一次计算这些系数。

将所有替代行 $\vec P_{e,v}(T)$ 按关联 $(e,v)$ 排列，可视为一个有理多项式矩阵。[[replacement-form-construction|替代形式构造]] 给出这样的矩阵，使这些行具有低次数，并在每个采样点满足刚才列出的设计条件。这样，原计数与可按组计算的 Taylor 数据通过同一个多项式族 $H(T)$ 联系起来。

### 从 Taylor 系数恢复计数

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

这同时恢复全部 $J=q+1$ 个 Taylor 系数。引理 [[3.3#^lem-boolean-differences|3.3]] 给出了这里使用的一般恒等式。

每个和 $\mathcal Z_{t,E,U}$ 都可以用第 [[shared-linear-design#^subsec-preview-separation|2.4]] 节的算法求值。固定 $\vec X=\mathbf1_U$ 后，每个修正项 $\langle\Delta\vec P_{e,v}(z),\mathbf1_U\rangle$ 都与 $x$ 无关。对 $x$ 的所有依赖都通过形式 $\langle\vec P_{e,v}(t),x\rangle$ 体现，因此固定 $\vec y$ 仍可分离子句多项式。限制 $x_i=1$ 对各组都是局部的。分离恒等式只使用加法、乘法和分配律，所以也适用于这些截断多项式值。在代入 $\vec X=\mathbf1_U$ 后对每个子句求值，仅使用关于 $z$ 的次数小于 $J$ 的一元多项式，并在每次乘法之后丢弃更高次幂。多元展开及其系数 $a_E(x,z)$ 仅用于证明恒等式；算法从不构造它们。

在 $t=1,\ldots,Q$ 处重复这一计算，就提供了上述插值所需的全部 Taylor 系数，进而恢复 $H(0)=\#F$。

### 三项成本与运行时间

^subsec-preview-parameters

对于这里每个变量至多出现三次的实例，[[replacement-form-construction#^subsec-preview-auxiliary|替代形式构造]] 在 $n$ 充分大时，用 $n^{O(1)}$ 时间构造上述替代行和设计。替代行在 $T=0$ 处恢复原始变量，次数至多为 $R$，并在每个 $t\in[Q]$ 处满足该设计的条件，参数同时满足：

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

下面将这些参数代入求和与恢复算法，估计三项枚举成本。

回顾 $q=J-1=\lfloor3nR/Q\rfloor$。对于每个求值点 $t$，第 [[counting-algorithm-overview#^subsec-preview-interpolation|2.5]] 节对每一对满足 $|E|\le q$ 的 $U\subseteq E$ 计算一个受限的和。大小为 $j$ 的 $E$ 有 $\binom nj$ 种选择，然后 $U$ 有 $2^j$ 种选择。每个受限的和都枚举测量元组以及各个组内的赋值。因此，忽略多项式因子，三项成本相乘给出

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

由于 $q=\Theta(nR/Q)$，这一成本的对数为 $O(n(R/Q)\log(2Q/R))$。因此，对 [[counting-algorithm-overview#^eq-overview-three-costs|（2.11）]] 中全部三项成本取对数，得到

$$
O\!\left(n\left[
       \frac RQ\log\frac{2Q}{R}
       +\tau\log(2D+1)+\frac1r\right]\right).
$$

在 [[counting-algorithm-overview#^eq-overview-parameter-bounds|（2.10）]] 下，每一项都很小：

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

点数 $Q$、组数 $r$ 和截断阶数 $J=O(1+nR/Q)$ 均为 $n^{O(1)}$。因此，遍历点与组的循环、次数小于 $J$ 的多项式上的算术，以及最终的插值，都只会使上述三种枚举的每次迭代增加多项式次运算。

位复杂度与空间界见附录 [[exact-arithmetic#^subsec-overview-arithmetic|B.4]]。

一般作用域版本的替代形式构造与参数核查分别见 [[4.7]] 和 [[4.8]]。

## 一般 $\#k$-SAT 的一个较弱算法

^subsec-preview-general-sat

现在固定 $k\ge2$，考虑具有 $n$ 个声明变量、$m$ 个输入子句的一般 $k$-CNF。先将其满足赋值集划分为若干稀疏公式的满足赋值集，再将每个所得公式转换为每个变量至多出现三次的 $3$-CNF。下面给出这两个步骤的计数保持性质和成本。

我们使用保持计数的版本 〔[DHM$^{+}$14](https://arxiv.org/abs/1206.1775 "原引用键 DHMTW")，附录 A〕 来进行稀疏化 〔[IPZ01](https://doi.org/10.1006/jcss.2001.1774 "原引用键 IPZ")〕，并采用来自 〔[CIP06](https://cseweb.ucsd.edu/~paturi/myPapers/pubs/CalabroImpagliazzoPaturi_2006_ccc.pdf "原引用键 CIP")，第 6 节〕 和 〔[Cal09](https://cseweb.ucsd.edu/~ccalabro/dissertation_single_spaced.pdf "原引用键 CalabroThesis")，引理 5.14 及 式 (5.4)〕 的定量界。引理 [[6.3#^lem-sparsify|6.3]] 提供如下统一算法接口。给定有理参数 $0<\sigma\le1$，令 $L_\sigma$ 为其分子、分母的总二进制编码长度。算法构造一棵节点数至多为 $\operatorname{poly}_k(n,\sigma^{-1})2^{\sigma n}$ 的公式树；叶子的满足赋值集合两两不交，且其并集是输入的满足赋值集合。每个叶子公式 $G$ 使用原来的全部 $n$ 个声明变量。算法计算出一个整数 $B\ge1$，它只依赖 $k,\sigma$，且每个变量在 $G$ 中至多出现 $B$ 次，其中

$$
B=O_k\!\left((\sigma^{-1}\log(2/\sigma))^{k-1}\right)
$$

因此每个叶子至多有 $Bn$ 个非空子句。如果有空子句，该叶子的计数立即为零。

这棵树可按深度优先顺序逐节点生成：输入规范化需要 $\operatorname{poly}_k(n,m)$ 次位运算，数值参数构造需要 $\operatorname{poly}_k(L_\sigma)$ 次位运算，每个节点的生成与输出需要 $\operatorname{poly}_k(n,\log(2/\sigma))$ 次位运算。包括全部节点输出在内的总生成时间至多为

$$
\operatorname{poly}_k(n,m)+\operatorname{poly}_k(L_\sigma)
 +\operatorname{poly}_k(n,\sigma^{-1})2^{\sigma n},
$$

工作空间为 $\operatorname{poly}_k(n,m,\sigma^{-1},L_\sigma)$ 位。该空间不包括只读输入和已经流式写出的输出。算法和这些界对每个所给有理 $\sigma$ 统一成立，因此可以选择随 $n$ 变化的 $\sigma$。

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

对每个 $\widehat G$ 应用 [[counting-algorithm-overview#^eq-overview-bounded-time|（2.12）]] 并将计数相加。当 $\sigma^{-1}$ 和 $L_\sigma$ 都以 $\log n$ 的固定次幂为界时，$B$ 也关于 $n$ 呈多对数级增长。生成树、构造归约实例和求解各个叶子的总时间为

$$
(n+m)^{O_k(1)}
 2^{O_k\!\left(\sigma n+
          Bn(\log\log n)^2/\sqrt{\log n}\right)}.
$$

例如，对充分大的 $n$，令 $\lambda_n=\lceil\log_2 n\rceil$，取满足 $s^{2k}\le\lambda_n$ 的最大正整数 $s$，并令 $\sigma=1/s$。用整数比较即可找到 $s$；于是 $\sigma=\Theta((\log n)^{-1/(2k)})$，且 $L_\sigma=O_k(\log\log n)$。代入得到

$$
(n+m)^{O_k(1)}
 2^{O_k\!\left(n(\log\log n)^{k+1}/(\log n)^{1/(2k)}\right)}
   = (n+m)^{O_k(1)}2^{o(n)}
$$

且只需关于 $n+m$ 的多项式位空间。具体地，按上述深度优先顺序生成公式树，在到达叶子 $G$ 时构造并求解一个 $\widehat G$，将结果加入总计数后释放该归约实例及求值工作空间，再继续遍历。当前路径的存储由引理 6.3 的工作空间界控制；每个归约实例有 $N=O_k(Bn)$ 个变量，其构造和单次计数也使用多项式空间。总计数至多为 $2^n$，只需 $n+1$ 位。对这里选择的 $\sigma$，$\sigma^{-1}$、$B$ 和 $L_\sigma$ 均为多对数规模，因而这些空间界合起来仍为 $(n+m)^{O_k(1)}$。有限多个较小的变量规模用穷举处理，读取和检验原输入的时间仍计入 $(n+m)^{O_k(1)}$。

本页采用的指数时间假设（ETH）断言：对于 $n$ 个变量、$m$ 个子句的 $3$-CNF，不存在运行时间为 $2^{o(n)}(n+m)^{O(1)}$ 的确定性可满足性判定算法。取 $k=3$，用上述算法精确计数，再检查结果是否为正，即得到这样的判定算法。

上述复制归约保持满足赋值的计数。另一种方法是在原变量上构造稀疏 $\mathbb F_2$ 多项式方程组，再计算其布尔公共零点，从而避免复制变量带来的 $B$ 因子；具体归约与计数算法见 [[2.2|定理 2.2]]。对于 $n\ge20$，令 $\rho(n)=n(\log\log n)^2/\sqrt{\log n}$，其中 $\log$ 为自然对数；这条路线经 [[6.4|命题 6.4]] 的联合分析，得到 $(n+m)^{O_k(1)}2^{O_k(\rho(n))}$ 的位时间界。

