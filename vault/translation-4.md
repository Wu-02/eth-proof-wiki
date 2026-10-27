---
id: translation-4
title: "原文中文译文 4 构造低次数替代形式"
kind: translation
group: 原文中文译文
source_label: "4"
order: 103
publish: true
status: 原文中文译文（已审校）
---

## 4 构造低次数替代形式

^sec-construction

计数过程需要为每个因子 $f$ 读取变量 $v$ 的二元组 $(f,v)$ 提供一个替代形式。对于第 [[translation-5#^sec-setup|5]] 节中的应用，$f$ 是一个多项式方程，其作用域是各单项式的变量集合的并。本节只使用这些作用域。 我们构造定义 [[translation-3#^def-layout|3.1]] 中的行 $\vec{P}_{f,v}(T)$ 和测量矩阵 $C_{t,g}$，以及划分 $S_{t,g}$ 和因子分配 $\sigma_f$。主要困难在于，在 $R$ 远小于 $Q$ 的同时保持 $\deg \vec{P}_{f,v}\le R$。$H$ 的次数界随 $R$ 线性增长，因此较小的 $R/Q$ 能减少每个点所需的 Taylor 系数个数。若在 $T=0,1,\ldots,Q$ 处独立选择各行再进行插值，通常会得到次数 $Q$。我们转而联合构造它们在所有这些点处的值。

该构造首先在一个完整的辅助坐标数组上给出多项式行。然后，我们将每个因子–变量二元组放入该数组的一个副本中。多个位置可以包含同一个布尔变量 $x_v$；它们的值始终相等，并不会成为计数求和中的独立变量。

### 4.1 辅助坐标

^subsec-incidence-layout

我们首先指定辅助行 $\vec{P}_u(T)$ 将作用于其上的较大坐标集 $\mathcal B$，以及将实际二元组 $(f,v)$ 放入其副本所需的关联次数界。设 $(I_f)_{f\in\mathcal F}$ 为因子的作用域，其中 $I_f\subseteq[n]$，并记

$$
\begin{gathered}
 \mathcal A=\{(f,v):f\in\mathcal F,\ v\in I_f\},\qquad M=|\mathcal A|,\\
 |I_f|\le w\quad(f\in\mathcal F),\qquad
 \#\{f:v\in I_f\}\le b\quad(v\in[n]).
 \end{gathered}\tag{4.1}
$$

^eq-factor-incidences

因此，$w$ 限制一个因子作用域中的变量个数，而 $b$ 限制包含同一变量的因子个数。作用域界 $w$ 不必是因子多项式次数的上界。作用域为空的因子是常数，不需要辅助位置；在每个点处都将这样的因子分配到第一组。如有必要，对每个 $v\in[n]$ 添加一个单独的、作用域为 $\{v\}$ 的常数一因子。这既不改变乘积，也不改变计数，并且使最大关联次数至多增加一。令 $b$ 表示添加之后的界，我们假设

$$
n\ge1,\qquad b,w\ge1,\qquad n\le M\le bn.
$$

本节始终假设 $r\ge2$ 和 $1\le R<Q$ 为整数，且 $0<\tau\le1/2$。

在每个点 $t\in[Q]$ 处，变量 $x_v$ 将属于某一组，而包含 $v$ 的因子可能被分配到另一组。我们将选取

$$
a_v\in[r]^Q\quad(v\in[n]),\qquad
 d_f\in[r]^Q\quad(f\in\mathcal F),
$$

其中 $a_v(t)$ 指定包含 $x_v$ 的组，$d_f(t)$ 指定分配给因子 $f$ 的组。$(f,v)$ 所在位置的标签将为 $(a_v,d_f)$。特别地，所有包含 $x_v$ 的位置都有相同的第一序列 $a_v$。

在选择 $a_v$ 和 $d_f$ 之前，先取所有可能标签组成的完整集合：

$$
\mathcal B=([r]^Q)^2,\qquad u=(a_u,d_u),\qquad D=|\mathcal B|=r^{2Q}.\tag{4.2}
$$

^eq-auxiliary-labels

辅助向量 $\zeta\in\mathbb Q^{\mathcal B}$ 对每个二元组 $u$ 都有一个有理数坐标 $\zeta_u$。当 $\zeta$ 变化时，标签 $u$ 保持固定。对 $t\in[Q]$ 和 $g\in[r]$，定义

$$
S^{\mathcal B}_{t,g}=\{u\in\mathcal B:a_u(t)=g\}.\tag{4.3}
$$

^eq-auxiliary-groups

对于固定的 $t$，这些集合将 $\mathcal B$ 划分成 $r$ 个大小为 $D/r$ 的集合。

对每个 $u\in\mathcal B$，我们寻求一个次数至多为 $R-1$、满足 $\vec{P}_u(0)=\delta_u$ 的多项式行 $\vec{P}_u(T)\in\mathbb Q[T]^{1\times\mathcal B}$。在 $T=t$ 处，值 $\langle \vec{P}_u(t), \zeta\rangle$ 应由

$$
\zeta|_{S^{\mathcal B}_{t,d_u(t)}}
 \quad\text{和}\quad C^{\mathcal B}\zeta
$$

确定，其中 $C^{\mathcal B}$ 是一个与 $u,t$ 无关的整数矩阵，其元素属于 $\{0,1,-1\}$，并且行数很少。之后，使用 $u_{f,v}=(a_v,d_f)$ 将使因子 $f$ 的每个输入都使用组 $d_f(t)$。$a_v,d_f$ 的选取以及它们在各副本中的放置，分别留待第 [[translation-4#^subsec-choosing-labels|4.4]] 节和第 [[translation-4#^subsec-embedding|4.5]] 节处理。

### 4.2 矩阵 $M_0$ 与 $C^{\mathcal B}$

为构造行 $\vec{P}_u(T)$，我们寻求一个在 $\ker C^{\mathcal B}$ 上恒等作用、并满足下式的矩阵 $M_0\in\mathbb Q^{\mathcal B\times\mathcal B}$：

$$
M_0[u,y]\ne0\quad\Longrightarrow\quad
 \bigl|\{s\in[Q]:a_y(s)\ne d_u(s)\}\bigr|\le R-1.\tag{4.4}
$$

^eq-matrix-support-target

恒等式

$$
\zeta_u=((I-M_0)\zeta)_u+
          \sum_{y\in\mathcal B}M_0[u,y]\zeta_y\tag{4.5}
$$

^eq-coordinate-decomposition

解释了这两个要求。如果 $M_0$ 在 $\ker C^{\mathcal B}$ 上恒等作用，那么第一项由 $C^{\mathcal B}\zeta$ 确定；我们将使它与 $T$ 无关。在求和中，将每个非零的 $M_0[u,y]$ 乘以一个在零点取值为一、并在每个满足 $a_y(t)\ne d_u(t)$ 的 $t$ 处消失的多项式。界 [[translation-4#^eq-matrix-support-target|（4.4）]] 允许其次数至多为 $R-1$。这样，在 $T=t$ 处，该和将只使用坐标 $y\in S^{\mathcal B}_{t,d_u(t)}$。

对 $s\in[Q]$，令 $\vartheta_s:\mathcal B\to\mathcal B$ 交换条目 $a_u(s)$ 和 $d_u(s)$，其余条目保持不变。将其置换矩阵 $\Pi_s$ 定义为

$$
(\Pi_s\zeta)_u=\zeta_{\vartheta_s(u)}.
$$

交换后的二元组 $\vartheta_s(u)$ 属于 $\mathcal B$，因为该集合包含 $[r]^Q$ 中序列的每一种配对。矩阵 $\Pi_s$ 两两交换，并满足 $\Pi_s^2=I$。它们的乘积

$$
V_0=\prod_{s=1}^Q\Pi_s
$$

交换完整序列 $a_u$ 和 $d_u$。因此，$V_0[u,y]\ne0$ 蕴含对每个 $s$ 都有 $a_y(s)=d_u(s)$；它在没有任何不匹配的情况下满足 [[translation-4#^eq-matrix-support-target|（4.4）]]。我们将修改 $V_0$，使所得矩阵还在一小组整数测量的核上恒等作用。

定义

$$
W_0=\frac12\sum_{s=1}^Q(I-\Pi_s).\tag{4.6}
$$

^eq-swap-weight

对于 $\Pi_s$ 的一个共同特征向量 $\psi$，令 $j$ 为满足 $\Pi_s\psi=-\psi$ 的指标 $s$ 的个数。则对每个多项式 $p$，有

$$
W_0\psi=j\psi,\qquad V_0\psi=(-1)^j\psi,
 \qquad V_0p(W_0)\psi=(-1)^jp(j)\psi
$$

因此，只要 $p(j)=(-1)^j$，$V_0p(W_0)$ 就保持 $\psi$ 不变。我们将显式构造一组共同特征基，其中具有给定 $j$ 的向量所占比例为 $\Pr[W=j]$，这里 $W\sim\operatorname{Bin}(Q,(r-1)/(2r))$。

对于一个区间 $\mathcal I=\{A_0,\ldots,A_0+R-1\}\subseteq\{0,\ldots,Q\}$，我们可以用一个次数至多为 $R-1$ 的多项式，强制对 $j\in\mathcal I$ 成立等式 $f_{\mathcal I}(j)=(-1)^j$。我们使用显式插值公式

$$
f_{\mathcal I}(z)=(-1)^{A_0}\sum_{j=0}^{R-1}(-2)^j
                         \binom{z-A_0}{j},
 \qquad M_0=V_0f_{\mathcal I}(W_0),\tag{4.7}
$$

^eq-swap-matrix-definition

其中

$$
\binom{z-A_0}{j}=\frac1{j!}\prod_{a=0}^{j-1}(z-A_0-a)
$$

且空积为一。对于 $0\le q<R$，二项式定理给出 $f_{\mathcal I}(A_0+q)=(-1)^{A_0}(1-2)^q=(-1)^{A_0+q}$。

> ##### 引理 4.1
>
> 
> 
> ^lem-swaps-matrix
> 
> 
>
> 对上述 $\mathcal B$、$\mathcal I$ 和 $M_0$，存在矩阵 $C^{\mathcal B}\in\{0,1,-1\}^{[c_{\mathcal B}]\times\mathcal B}$，使得
>
> $$
> c_{\mathcal B}\le D\Pr[W\notin\mathcal I],\qquad
>  W\sim\operatorname{Bin}\!\left(Q,\frac{r-1}{2r}\right),
> $$
>
> 且对每个 $\xi\in\ker C^{\mathcal B}$ 都有 $M_0\xi=\xi$。

**证明。**

^proof-lem-swaps-matrix

对 $(\alpha,\delta)\in[r]^2$，令 $e_{\alpha\delta}$ 为该有序对的示性函数。交换其两个条目的算子具有如下正交特征基：

$$
e_{\alpha\alpha}\quad(\alpha\in[r]),\qquad
 e_{\alpha\delta}+e_{\delta\alpha},\quad
 e_{\alpha\delta}-e_{\delta\alpha}\quad(1\le\alpha<\delta\le r).
$$

前两类的特征值为 $+1$，第三类的特征值为 $-1$。特征值为 $+1$ 的向量有 $r(r+1)/2$ 个，特征值为 $-1$ 的有 $r(r-1)/2$ 个。

对每个 $s\in[Q]$，选择这些函数中的一个 $\psi_s:[r]^2\to\{0,1,-1\}$，并定义

$$
\psi(u)=\prod_{s=1}^Q\psi_s(a_u(s),d_u(s))
 \qquad(u\in\mathcal B).
$$

这 $D=r^{2Q}$ 种选择给出非零的正交向量：它们的内积可分解为各函数 $\psi_s$ 的内积的乘积。它们构成 $\mathbb Q^{\mathcal B}$ 的一组基，各基向量的条目属于 $\{0,1,-1\}$。如果所选的 $\psi_s$ 中恰有 $j$ 个的特征值为 $-1$，那么 $W_0\psi=j\psi$ 且 $V_0\psi=(-1)^j\psi$。因此，只要 $j\in\mathcal I$，$M_0$ 就保持 $\psi$ 不变。

为使 $\ker C^{\mathcal B}$ 成为 $M_0$ 恒等作用的空间，我们将 $C^{\mathcal B}$ 的各行定义为满足 $j\notin\mathcal I$ 的基向量的转置。在每个位置上，特征值为 $-1$ 的选择所占比例为 $(r-1)/(2r)$，且各位置之间相互独立。因此，在 $D$ 个基向量中保留为行的比例为 $\Pr[W\notin\mathcal I]$，这证明了行数界。如果 $C^{\mathcal B}\xi=\vec{0}$，那么 $\xi$ 与每个保留的基向量正交。它是满足 $j\in\mathcal I$ 的基向量的线性组合，而 $M_0$ 保持所有这些基向量不变。

∎

对于界 $\epsilon>0$，条件

$$
\Pr\!\left[\operatorname{Bin}\!\left(Q,\frac{r-1}{2r}\right)
                         \notin\mathcal I\right]\le\epsilon\tag{4.8}
$$

^eq-incidence-tail

因而给出 $c_{\mathcal B}\le\epsilon D$。放置各因子输入之后，我们将使用 $\epsilon=\tau/(rb)$。接下来证明对 $M_0$ 的另一个要求。

> ##### 引理 4.2
>
> 
> 
> ^lem-swaps-support
> 
> 
>
> 对所有 $u,y\in\mathcal B$，如果 $M_0[u,y]\ne0$，那么
>
> $$
> \bigl|\{s\in[Q]:a_y(s)\ne d_u(s)\}\bigr|\le R-1.
> $$

**证明。**

^proof-lem-swaps-support

将 $f_{\mathcal I}(W_0)$ 按照两两交换的矩阵 $\Pi_s$ 展开。由于 $\deg f_{\mathcal I}\le R-1$ 且 $\Pi_s^2=I$，所得的每个单项式都是某个 $\prod_{s\in J}\Pi_s$ 的标量倍数，其中 $J\subseteq[Q]$ 且 $|J|\le R-1$。乘以 $V_0$ 得到

$$
V_0\prod_{s\in J}\Pi_s=\prod_{s\notin J}\Pi_s.
$$

该置换矩阵的 $(u,y)$ 元素非零，要求对每个 $s\notin J$ 都有 $a_y(s)=d_u(s)$。其他位置至多有 $R-1$ 个。如果有超过 $R-1$ 个位置不一致，那么每个加项的 $(u,y)$ 元素都为零，因此也有 $M_0[u,y]=0$。

∎

### 4.3 多项式行

现在，我们使用 $M_0$ 构造第 [[translation-4#^subsec-incidence-layout|4.1]] 节中所求的辅助行 $\vec{P}_u(T)$。引理 [[translation-4#^lem-swaps-matrix|4.1]] 使 $(I-M_0)\zeta$ 成为 $C^{\mathcal B}\zeta$ 的函数。引理 [[translation-4#^lem-swaps-support|4.2]] 限制了非零项 $M_0[u,y]\zeta_y$ 使用 $S^{\mathcal B}_{t,d_u(t)}$ 外坐标的点的个数。现在，我们将该项乘以一个在这些点处消失、且在零点等于一的多项式。

对 $M_0[u,y]\ne0$，定义

$$
E_{u,y}=\{s\in[Q]:a_y(s)\ne d_u(s)\},\qquad
 \varphi_{u,y}(T)=\prod_{s\in E_{u,y}}\left(1-\frac Ts\right).\tag{4.9}
$$

^eq-coefficient-correction

空积为一。于是 $\deg\varphi_{u,y}\le R-1$，$\varphi_{u,y}(0)=1$，且只要 $a_y(t)\ne d_u(t)$ 就有 $\varphi_{u,y}(t)=0$。定义

$$
\vec{P}_u(T)=\delta_u(I-M_0)+
 \sum_{\substack{y\in\mathcal B\\M_0[u,y]\ne0}}
 M_0[u,y]\varphi_{u,y}(T)\delta_y.\tag{4.10}
$$

^eq-swaps-row

该行作为关于 $\zeta$ 的线性形式起作用，其系数是单个参数 $T$ 的多项式。

> ##### 引理 4.3
>
> 
> 
> ^lem-swaps-forms
> 
> 
>
> 式 [[translation-4#^eq-swaps-row|（4.10）]] 中的行次数至多为 $R-1$，并且对每个 $u\in\mathcal B$ 都满足 $\vec{P}_u(0)=\delta_u$。对 $t\in[Q]$ 和 $g\in[r]$，令 $C^{\mathcal B}_{t,g}$ 为 $C^{\mathcal B}$ 在列 $S^{\mathcal B}_{t,g}$ 上的限制。对于每个满足 $g\ne d_u(t)$ 的 $u,t,g$ 和每个 $\xi\in\mathbb Q^{S^{\mathcal B}_{t,g}}$，将其以零扩展到 $\mathcal B$ 所得的 $\widetilde\xi$ 满足
>
> $$
> C^{\mathcal B}_{t,g}\xi=\vec{0}
>  \quad\Longrightarrow\quad \langle \vec{P}_u(t), \widetilde\xi\rangle=0.
> $$
>
> 更一般地，$\langle \vec{P}_u(t), \zeta\rangle$ 由 $\zeta|_{S^{\mathcal B}_{t,d_u(t)}}$ 和 $C^{\mathcal B}\zeta$ 确定。

**证明。**

^proof-lem-swaps-forms

次数界由 $\varphi_{u,y}$ 的次数界得到。在零点处，

$$
\vec{P}_u(0)=\delta_u(I-M_0)+\delta_uM_0=\delta_u.
$$

将式 [[translation-4#^eq-swaps-row|（4.10）]] 作用于 $\zeta$，得到

$$
\langle \vec{P}_u(T), \zeta\rangle=((I-M_0)\zeta)_u+
 \sum_{\substack{y\in\mathcal B\\M_0[u,y]\ne0}}
 M_0[u,y]\varphi_{u,y}(T)\zeta_y.\tag{4.11}
$$

^eq-swaps-form-decomposition

在 $T=t$ 处，所有满足 $a_y(t)\ne d_u(t)$ 的加项都消失。如果 $\widetilde\xi$ 的支撑集包含于 $S^{\mathcal B}_{t,g}$，其中 $g\ne d_u(t)$，那么每个剩余加项在 $\widetilde\xi$ 上都为零。假设 $C^{\mathcal B}_{t,g}\xi=\vec{0}$ 还给出 $C^{\mathcal B}\widetilde\xi=\vec{0}$，因此由引理 [[translation-4#^lem-swaps-matrix|4.1]] 可知 $(I-M_0)\widetilde\xi=\vec{0}$。这就证明了该蕴含关系。

对于最后一项断言，在 $C^{\mathcal B}$ 下具有相同测量值的两个向量之差属于其核。因此，$(I-M_0)\zeta$ 由 $C^{\mathcal B}\zeta$ 确定。在 $T=t$ 处，式 [[translation-4#^eq-swaps-form-decomposition|（4.11）]] 中的剩余项只使用 $\zeta|_{S^{\mathcal B}_{t,d_u(t)}}$。

∎

固定 $t$，并记 $\zeta_g=\zeta|_{S^{\mathcal B}_{t,g}}$。$C^{\mathcal B}$ 的各限制满足

$$
C^{\mathcal B}\zeta=\sum_{g=1}^r C^{\mathcal B}_{t,g}\zeta_g.\tag{4.12}
$$

^eq-auxiliary-measurements

因此，固定每个向量 $C^{\mathcal B}_{t,g}\zeta_g$ 就固定了 $C^{\mathcal B}\zeta$，同时在 $r$ 个辅助坐标组上施加彼此分离的条件。当所有向量 $C^{\mathcal B}_{t,g}\zeta_g$ 都被固定时，$\langle \vec{P}_u(t), \zeta\rangle$ 由 $\zeta|_{S^{\mathcal B}_{t,d_u(t)}}$ 确定。通过将 $(f,v)$ 放在标签为 $(a_v,d_f)$ 的坐标上，我们将在实际布尔变量上获得相应的分离。

> ##### 注 4.4
>
> 我们说明式 [[translation-4#^eq-swaps-row|（4.10）]] 如何将对指定组以外的依赖限制为一个线性测量。取 $Q=R=2$，它不在运行时间界所用的 $R<Q$ 范围内，并取 $r=2$。以 $\{0,1\}$ 为组指标，并取 $\mathcal I=\{0,1\}$，于是 $f_{\mathcal I}(z)=1-2z$。从标签 $(00,11)$ 出发，这两种交换生成四个坐标：
>
> $$
> \zeta_0=\zeta_{(00,11)},\quad \zeta_1=\zeta_{(10,01)},\quad
>  \zeta_2=\zeta_{(01,10)},\quad \zeta_{12}=\zeta_{(11,00)}.
> $$
>
> 两种交换都保持这四个坐标组成的集合不变，因此我们可以将计算限制在该集合上。在这一限制下，$M_0=\Pi_1+\Pi_2-\Pi_1\Pi_2$ 在
>
> $$
> c(\zeta)=\zeta_0-\zeta_1-\zeta_2+\zeta_{12}
> $$
>
> 的核上恒等作用。指标为 $u=(00,11)$ 的行给出
>
> $$
> \langle \vec{P}_u(T), \zeta\rangle=\zeta_0-\frac T2\zeta_1-T\zeta_2.
> $$
>
> 它在零点等于 $\zeta_0$，而
>
> $$
> \langle \vec{P}_u(1), \zeta\rangle=c(\zeta)+\frac12\zeta_1-\zeta_{12},\qquad
>  \langle \vec{P}_u(2), \zeta\rangle=c(\zeta)-\zeta_2-\zeta_{12}.
> $$
>
> 在 $t=1$ 处，$\zeta_1,\zeta_{12}$ 的标签满足 $a_y(1)=1=d_u(1)$。在 $t=2$ 处，$\zeta_2,\zeta_{12}$ 的标签满足 $a_y(2)=1=d_u(2)$。因此，固定 $c(\zeta)$ 后，$\langle \vec{P}_u(t), \zeta\rangle$ 就只依赖于其指定组中的坐标。这里，在四坐标限制上，$c(\zeta)$ 起到 $C^{\mathcal B}\zeta$ 的作用。完整构造必须以至多 $\epsilon D$ 个测量行，为每个 $u\in\mathcal B$ 提供这一性质。

### 4.4 选择变量组与因子组

^subsec-choosing-labels

现在，我们选取第 [[translation-4#^subsec-incidence-layout|4.1]] 节中的族 $(a_v)_{v\in[n]}$ 和 $(d_f)_{f\in\mathcal F}$，并令

$$
u_{f,v}=(a_v,d_f)\qquad((f,v)\in\mathcal A).
$$

这些选择有两个要求。第一，如果一个标签出现 $c_u$ 次，其对应的关联需要辅助数组各副本中的 $c_u$ 个不同位置。因此，所需的副本数为

$$
c_u=\#\{(f,v)\in\mathcal A:u_{f,v}=u\},\qquad
 h=\max_{u\in\mathcal B}c_u.
$$

第二，实际变量组 $\{v:a_v(t)=g\}$ 必须足够小。仅限制 $h$ 只能限制一组中的关联个数，不能给出该组布尔变量个数所需的界。下一个引理同时控制这两个量。

> ##### 引理 4.5
>
> 
> 
> ^lem-incidence-labels
> 
> 
>
> 设 $(I_f)_{f\in\mathcal F}$ 满足 [[translation-4#^eq-factor-incidences|（4.1）]]，其中 $n\le M\le bn$，并对整数 $r\ge2$ 和 $Q\ge1$ 令 $D=r^{2Q}$。假设
>
> $$
> 2(b+w)D^2\le M,\qquad 2Qr^2\le n.\tag{4.13}
> $$
> 
> ^eq-incidence-balance-hypotheses
> 
> 
>
> 可以确定性地选择 $a_v,d_f\in[r]^Q$，对作用域为空的因子取 $d_f(t)=1$，使得
>
> $$
> \begin{aligned}
>  \max_{u\in\mathcal B}\#\{(f,v)\in\mathcal A:(a_v,d_f)=u\}
>  &\le\frac{2M}{D},\\
>  \#\{v\in[n]:a_v(t)=g\}&\le\frac{2n}{r}
>  \qquad(t\in[Q],\ g\in[r]).
>  \end{aligned}
> $$
>
> 该构造需要 $\operatorname{poly}(n,M,|\mathcal F|,D,Q,r,b,w)$ 次位运算。

**证明。**

^proof-lem-incidence-labels

我们首先估计随机标签的效果；随后将确定性地固定它们的值。在该估计中，所有 $a_v$ 以及所有 $I_f$ 非空的 $d_f$ 都相互独立，并在 $[r]^Q$ 上均匀分布。对于空的 $I_f$，我们令 $d_f$ 恒为一。每个关联标签 $u_{f,v}=(a_v,d_f)$ 都在 $\mathcal B$ 上均匀分布。令 $n_{t,g}=\#\{v:a_v(t)=g\}$，并考虑

$$
\Phi=\sum_{u\in\mathcal B}(c_u-M/D)^2,
 \qquad
 \Xi=\sum_{t=1}^Q\sum_{g=1}^r(n_{t,g}-n/r)^2.
$$

将它们展开为示性函数之和，得到

$$
\begin{aligned}
 \Phi&=\sum_{(f,v),(f',v')\in\mathcal A}
       \mathbb{1}_{\{(a_v,d_f)=(a_{v'},d_{f'})\}}-\frac{M^2}{D},\\
 \Xi&=\sum_{t=1}^Q\sum_{v,v'\in[n]}
       \mathbb{1}_{\{a_v(t)=a_{v'}(t)\}}-\frac{Qn^2}{r}.
 \end{aligned}
$$

除非共享一个因子或一个变量，否则两个关联标签相互独立。对于每个 $(f,v)$，与它共享 $f$ 或 $v$ 的关联至多有 $b+w$ 个，其中包括 $(f,v)$ 自身。独立配对的相等概率为 $1/D$；其他配对的概率至多为一。因此

$$
\mathbb E\Phi\le M(b+w).
$$

对于每个 $t$ 和 $v\ne v'$，值 $a_v(t),a_{v'}(t)$ 相互独立，并在 $[r]$ 上均匀分布。因此，第二个展开式给出

$$
\mathbb E\Xi=Qn(1-1/r)\le Qn.
$$

为确定性地得到这些标签，我们逐一固定各 $a_v$ 和 $I_f$ 非空的各 $d_f$。每一步都选择一个不增加

$$
\frac{\Phi}{M(b+w)}+\frac{\Xi}{Qn}
$$

的条件期望的值。这样的选择存在，因为当前期望是对下一个 $a_v$ 或 $d_f$ 的所有可能取值求得的平均值。最终值至多为二。由于两个加项都非负，

$$
c_u\le\frac MD+\sqrt{2M(b+w)},\qquad
 n_{t,g}\le\frac nr+\sqrt{2Qn}.
$$

式 [[translation-4#^eq-incidence-balance-hypotheses|（4.13）]] 中的两个不等式使两个平方根项分别至多为 $M/D$ 和 $n/r$。

下面的枚举可在 $\operatorname{poly}(n,M,|\mathcal F|,D,Q,r,b,w)$ 次位运算内计算这些条件期望。令 $K=r^Q$，于是 $D=K^2$。$\Phi$ 的展开式中的每个示性函数至多依赖于四个独立选择 $a_v,d_f,a_{v'},d_{f'}$；重复指标只对应一个选择。$\Xi$ 中的每个示性函数至多依赖于 $a_v,a_{v'}$。在任意部分固定之后，对一个示性函数中尚未固定的选择枚举至多 $K^4=D^2$ 种赋值。其条件概率的分母整除 $K^4$。对 $M^2+Qn^2$ 个示性函数求和即可计算两个期望。包括归一化因子 $M(b+w)$ 和 $Qn$ 在内，这些计算中的所有有理数值，其分子和分母的位数均为

$$
O\!\left(\log(2D)+\log(2M)+\log(2n)+\log(2Q)+\log(2+b+w)\right).
$$

需要固定的选择至多有 $n+|\mathcal F|$ 个，每个有 $K$ 个候选值。由于 $K^4=D^2$，整个构造需要 $\operatorname{poly}(n,M,|\mathcal F|,D,Q,r,b,w)$ 次位运算。

∎

### 4.5 将变量的副本放入辅助数组

^subsec-embedding

现在，我们将辅助行 $\vec{P}_u(T)$ 和矩阵 $C^{\mathcal B}$ 转移为定义 [[translation-3#^def-layout|3.1]] 所要求的、作用于原始变量上的行 $\vec{P}_{f,v}(T)$ 和矩阵 $C_{t,g}$。假设 [[translation-4#^eq-incidence-balance-hypotheses|（4.13）]] 成立，并应用引理 [[translation-4#^lem-incidence-labels|4.5]]。令 $h=\max_u c_u$，用 $[h]\times\mathcal B$ 标记辅助坐标的 $h$ 个副本。对每个 $(f,v)\in\mathcal A$，我们指定 $c(f,v)\in[h]$，使所有二元组 $(c(f,v),u_{f,v})$ 互不相同。这是可行的，因为没有任何标签出现超过 $h$ 次，并且

$$
hD\le2M\le2bn.
$$

定义线性映射 $\iota:\mathbb Q^n\longrightarrow\mathbb Q^{[h]\times\mathcal B}$ 为

$$
(\iota x)_{c,u}=
 \begin{cases}
 x_v,&(c,u)=(c(f,v),u_{f,v})\text{ 对某个 }(f,v)\in\mathcal A,\\
 0,&\text{否则}.
 \end{cases}
$$

被占用的位置互不相同，因此该定义没有歧义。不同位置可以包含同一个 $x_v$，而未使用的位置固定为零。对 $c\in[h]$，定义投影

$$
\pi_c:\mathbb Q^{[h]\times\mathcal B}\longrightarrow\mathbb Q^{\mathcal B},
 \qquad (\pi_c\eta)_u=\eta_{c,u}.
$$

现在令

$$
\begin{gathered}
 \vec{P}_{f,v}(T)=\vec{P}_{u_{f,v}}(T)\pi_{c(f,v)}\iota,\\
 S_{t,g}=\{v\in[n]:a_v(t)=g\},\qquad \sigma_f(t)=d_f(t).
 \end{gathered}\tag{4.14}
$$

^eq-actual-rows

行 $\vec{P}_{f,v}(T)$ 作用于实际变量 $x\in\mathbb Q^n$。在 $T=0$ 处，它提取位置 $(c(f,v),u_{f,v})$ 中的值，即 $x_v$。因此，$\vec{P}_{f,v}(0)=\delta_v$，且其次数至多为 $R-1$。引理 [[translation-4#^lem-incidence-labels|4.5]] 给出 $|S_{t,g}|\le2n/r$。

定义测量矩阵为

$$
\widetilde C=\operatorname{diag}
   \bigl(\underbrace{C^{\mathcal B},\ldots,C^{\mathcal B}}_{h\text{ 个副本}}\bigr),
 \qquad \widehat C=\widetilde C\iota,
 \qquad C_{t,g}=\widehat C|_{S_{t,g}}.\tag{4.15}
$$

^eq-actual-measurements

该限制保留 $S_{t,g}$ 中的列和所有行，包括零行。因此，$\widehat Cx$ 记录每个副本的坐标由 $x$ 填充之后的辅助测量值。矩阵 $C_{t,g}$ 为整数矩阵。其元素不一定属于 $\{0,1,-1\}$，因为包含同一个 $x_v$ 的多个位置上的系数会相加。$\widetilde C$ 的每一行至多有 $D$ 个非零元素，均等于 $1$ 或 $-1$。乘以 $\iota$ 会将同一列中的元素相加，并舍弃未使用的位置，因此不会增加这些元素的绝对值之和。于是，$C_{t,g}$ 的每一行的绝对值行和至多为 $D$，且该行在布尔赋值上的值属于 $[-D,D]\cap\mathbb Z$。

如果 [[translation-4#^eq-incidence-tail|（4.8）]] 成立，则每个 $C_{t,g}$ 有 $c_{t,g}=hc_{\mathcal B}$ 行。因此

$$
\sum_{g=1}^r c_{t,g}=rh c_{\mathcal B}
 \le rh\epsilon D\le2r\epsilon M\le2r\epsilon bn.\tag{4.16}
$$

^eq-incidence-measurement-count

令 $\epsilon=\tau/(rb)$ 即使其至多为 $2\tau n$。

为验证分离性，固定 $t\in[Q]$、$g\in[r]$ 以及满足 $g\ne\sigma_f(t)$ 的 $(f,v)\in\mathcal A$。假设 $\xi\in\mathbb Q^{S_{t,g}}$ 满足 $C_{t,g}\xi=\vec{0}$，并将其以零扩展为 $\widetilde\xi\in\mathbb Q^n$。式 [[translation-4#^eq-actual-measurements|（4.15）]] 给出 $\widetilde C\iota\widetilde\xi=\vec{0}$。因此，对每个 $c\in[h]$，

$$
C^{\mathcal B}\pi_c\iota\widetilde\xi=\vec{0}.
$$

$\pi_c\iota\widetilde\xi$ 的每个非零坐标都包含一个满足 $a_{v'}(t)=g$ 的变量 $v'$。其辅助标签的第一序列为 $a_{v'}$，因此该向量的支撑集包含于 $S^{\mathcal B}_{t,g}$。在副本 $c(f,v)$ 中应用引理 [[translation-4#^lem-swaps-forms|4.3]]，其中 $d_{u_{f,v}}(t)=d_f(t)=\sigma_f(t)$，得到

$$
\langle \vec{P}_{f,v}(t), \widetilde\xi\rangle
 =\langle \vec{P}_{u_{f,v}}(t), \pi_{c(f,v)}\iota\widetilde\xi\rangle=0.
$$

这正是定义 [[translation-3#^def-layout|3.1]] 中的核条件。因子 $f$ 的所有输入都使用同一个指定组 $d_f(t)$，而计数求和仍恰好遍历这 $n$ 个布尔位。

### 4.6 系数界与完整构造

式 [[translation-4#^eq-actual-rows|（4.14）]] 中的代入行 $\vec{P}_{f,v}(T)\in\mathbb Q[T]^{1\times n}$ 的元素是具有有理系数的多项式。现在，我们限制储存这些系数所需的位数；这些界将在第 [[translation-5#^subsec-one-query-cost|5.4]] 节中控制精确算术。我们首先为式 [[translation-4#^eq-swaps-row|（4.10）]] 定义的辅助行 $\vec{P}_u(T)$ 给出一个公分母和系数界。通过式 [[translation-4#^eq-actual-rows|（4.14）]] 从 $\vec{P}_u(T)$ 转到 $\vec{P}_{f,v}(T)$，只会将同一列中的系数相加或舍弃未使用的列，因此同一个分母和同一个绝对值和的界仍然适用。

> ##### 引理 4.6
>
> 
> 
> ^lem-row-coefficients
> 
> 
>
> 令 $d_{\mathrm{den}}=(R-1)!Q!$。则对每个 $u\in\mathcal B$，都有 $d_{\mathrm{den}}\vec{P}_u(T)\in\mathbb Z[T]^{1\times D}$。每行 $d_{\mathrm{den}}\vec{P}_u(T)$ 中所有系数的绝对值之和至多为 $2^{O(Q\log Q)}$。同一界也适用于 $d_{\mathrm{den}}\vec{P}_{f,v}(T)$。矩阵 $M_0,C^{\mathcal B}$ 和行 $\vec{P}_u(T)$ 可在 $\operatorname{poly}(D,Q,r)$ 次位运算内构造出来。

**证明。**

^proof-lem-row-coefficients

对 $0\le j<R$，$f_{\mathcal I}(W_0)$ 中对应的加项等于

$$
(-1)^{A_0}(-2)^j\binom{W_0-A_0I}{j}
 =\frac{(-1)^{A_0+j}}{j!}
   \prod_{a=0}^{j-1}\bigl(2W_0-2(A_0+a)I\bigr).
$$

右侧的每个矩阵因子都是整数矩阵，因为 $2W_0=QI-\sum_s\Pi_s$。并且 $j!$ 整除 $(R-1)!$。因此，乘以置换矩阵 $V_0$ 可知 $(R-1)!M_0$ 为整数矩阵。$\varphi_{u,y}$ 的系数分母整除 $\prod_{s\in E_{u,y}}s$，后者又整除 $Q!$。式 [[translation-4#^eq-swaps-row|（4.10）]] 证明了所断言的公分母性质。

对于系数估计，我们使用矩阵范数 $\|A\|_\infty=\max_i\sum_j|A[i,j]|$ 和多项式范数 $\|\sum_j a_jT^j\|_1=\sum_j|a_j|$。由于 $\|W_0\|_\infty\le Q$，且上述所有因子中均有 $0\le A_0+a\le Q$，每个 $2W_0-2(A_0+a)I$ 的范数至多为 $4Q$。由此得到

$$
\|M_0\|_\infty\le R(4Q)^{R-1},\qquad
 \|\varphi_{u,y}\|_1
 \le\prod_{s\in E_{u,y}}(1+1/s)\le2^Q.
$$

因此，行 $d_{\mathrm{den}}\vec{P}_u$ 中所有系数的绝对值之和至多为

$$
d_{\mathrm{den}}\bigl(1+(1+2^Q)R(4Q)^{R-1}\bigr).
$$

由于 $R<Q$，其对数为 $O(Q\log Q)$。对 $u=u_{f,v}$，将 $d_{\mathrm{den}}\vec{P}_u(T)$ 乘以 $\pi_{c(f,v)}\iota$，会将同一列中的系数相加并舍弃未使用的列。根据式 [[translation-4#^eq-actual-rows|（4.14）]]，所得行为 $d_{\mathrm{den}}\vec{P}_{f,v}(T)$，因此它满足同一界。

枚举引理 [[translation-4#^lem-swaps-matrix|4.1]] 中的特征基、计算 $f_{\mathcal I}(W_0)$ 以及形成多项式 $\varphi_{u,y}$，需要 $\operatorname{poly}(D,Q,r)$ 次算术运算。使用上述公分母，这些矩阵和多项式计算过程中所储存系数的分子和分母均有 $O(Q\log Q)$ 位。因此，该构造需要 $\operatorname{poly}(D,Q,r)$ 次位运算。

∎

该构造有三个定量要求。式 [[translation-4#^eq-incidence-balance-hypotheses|（4.13）]] 中的两个不等式分别限制辅助副本的个数和每组实际变量的个数。取 $\epsilon=\tau/(rb)$ 的尾概率界通过式 [[translation-4#^eq-incidence-measurement-count|（4.16）]] 给出测量总数界。我们将这些结果汇总，以供计数算法使用。

> ##### 引理 4.7
>
> 
> 
> ^lem-layout
> 
> 
>
> 设 $n,b,w\ge1$ 为整数，$(I_f)_{f\in\mathcal F}$ 为 $[n]$ 的子集族，各集合大小至多为 $w$，且每个 $v\in[n]$ 至多属于 $b$ 个集合。令 $M=\sum_f|I_f|$，并假设 $n\le M\le bn$。设 $r\ge2$ 和 $1\le R<Q$ 为整数，$0<\tau\le1/2$，并令 $D=r^{2Q}$。假设
>
> $$
> 2(b+w)D^2\le M,\qquad 2Qr^2\le n,
> $$
>
> 且某个区间 $\mathcal I=\{A_0,\ldots,A_0+R-1\}\subseteq\{0,\ldots,Q\}$ 满足
>
> $$
> \Pr[W\notin\mathcal I]\le\frac{\tau}{rb},\qquad
>  W\sim\operatorname{Bin}\!\left(Q,\frac{r-1}{2r}\right).
> $$
>
> 可以在 $\operatorname{poly}(n,M,|\mathcal F|,D,Q,r,b,w)$ 次位运算内，确定性地构造定义 [[translation-3#^def-layout|3.1]] 中的全部数据。

**证明。**

^proof-lem-layout

引理 [[translation-4#^lem-swaps-matrix|4.1]] 构造满足 $c_{\mathcal B}\le\tau D/(rb)$ 的 $C^{\mathcal B}$。引理 [[translation-4#^lem-swaps-support|4.2]] 和 [[translation-4#^lem-swaps-forms|4.3]] 给出辅助多项式行。引理 [[translation-4#^lem-incidence-labels|4.5]] 选择变量组和因子组，使得 $hD\le2M$ 且 $|S_{t,g}|\le2n/r$。随后，式 [[translation-4#^eq-actual-rows|（4.14）]] 和 [[translation-4#^eq-actual-measurements|（4.15）]] 中的映射给出满足 $\vec{P}_{f,v}(0)=\delta_v$、次数至多为 $R-1\le R$ 以及所需核蕴含关系的行。$C_{t,g}$ 的每一行的绝对值行和至多为 $D$，而式 [[translation-4#^eq-incidence-measurement-count|（4.16）]] 给出对每个 $t\in[Q]$ 都有 $\sum_{g=1}^r c_{t,g}\le2\tau n$。引理 [[translation-4#^lem-row-coefficients|4.6]] 提供公分母和系数界。合在一起，这些构造需要 $\operatorname{poly}(n,M,|\mathcal F|,D,Q,r,b,w)$ 次位运算，所得数组占用 $\operatorname{poly}(n,M,|\mathcal F|,D,Q,r,b,w)$ 位。

∎

### 4.7 选择参数

^subsec-incidence-parameters

在应用中，最大作用域大小 $w$ 和包含同一变量的因子个数上界 $b$ 都将由 $\log n$ 的某个固定次幂所限制。现在，我们在这一范围内选择满足引理 [[translation-4#^lem-layout|4.7]] 的参数。计数成本的指数取决于以下三个量：

$$
\frac RQ\log\frac{2Q}{R},\qquad
 \tau\log(2D+1),\qquad \frac1r.
$$

它们分别对应于恢复 Taylor 系数、枚举测量值，以及枚举一个组内的赋值。下面的选择同时限制这三个量。

> ##### 引理 4.8
>
> 
> 
> ^lem-incidence-parameters
> 
> 
>
> 固定整数 $\beta\ge1$。设 $n\ge20$，令 $\lambda=\lceil\log_2 n\rceil$ 和 $\nu=\lceil\log_2\lambda\rceil$，并假设 $b,w\le\lambda^\beta$ 且 $n\le M\le bn$。对于所有充分大的 $n$，参数
>
> $$
> r=\left\lfloor\frac{\sqrt\lambda}{\nu^2}\right\rfloor,
>  \qquad Q=\left\lfloor\frac{\lambda}{128\nu}\right\rfloor,
>  \qquad R=(\beta+3)\lceil\sqrt\lambda\rceil,\tag{4.17}
> $$
> 
> ^eq-parameter-QR
> 
> 
>
> $$
> \tau=\frac1{r\lambda},\qquad
>  \epsilon=\frac1{br^2\lambda},\qquad D=r^{2Q},
> $$
>
> 连同证明中指定的区间，满足引理 [[translation-4#^lem-layout|4.7]] 的所有数值假设。它们还满足
>
> $$
> R\ge32,\qquad 6R\le Q,\qquad D\le2^{\lambda/128},
> $$
>
> 以及
>
> $$
> \frac RQ\log\frac{2Q}{R}+\tau\log(2D+1)+\frac1r
>  =O_\beta\!\left(\frac{\nu^2}{\sqrt\lambda}\right).\tag{4.18}
> $$
> 
> ^eq-balanced-cost
> 
> 
>
> 给定数值 $n,M,b,w$，这些参数和数值假设可以在 $\operatorname{poly}_\beta(\log n)$ 次位运算内精确计算并核查。对于固定的 $\beta$，只有有限多个 $n$ 无法通过这些检查。

**证明。**

^proof-lem-incidence-parameters

对于充分大的 $n$，这些参数的数量级为

$$
r=\Theta(\sqrt\lambda/\nu^2),\qquad
 Q=\Theta(\lambda/\nu),\qquad R=\Theta_\beta(\sqrt\lambda).
$$

特别地，最终有 $r\ge2$、$R\ge32$ 和 $6R\le Q$。由于 $\log_2 r\le\nu/2$，

$$
\log_2 D=2Q\log_2 r
 \le2\frac{\lambda}{128\nu}\frac\nu2=\frac{\lambda}{128}.
$$

对于充分大的 $n$，两个平衡不等式随之成立：

$$
2(b+w)D^2\le4\lambda^\beta2^{\lambda/64}\le n\le M,
 \qquad 2Qr^2\le n.
$$

对于第二个不等式，$Q,r$ 由 $\lambda$ 的固定次幂所限制，而 $n>2^{\lambda-1}$。第一个不等式由同样的比较得到。

令

$$
\mu=\frac{Q(r-1)}{2r},\qquad
 A_0=\left\lfloor\mu-\frac{R-1}{2}\right\rfloor,
 \qquad \mathcal I=\{A_0,\ldots,A_0+R-1\}.
$$

这里 $Q/4\le\mu\le Q/2$。由于 $R\le Q/6$，该区间包含于 $\{0,\ldots,Q\}$。其中心与 $\mu$ 之差小于一，而 $R\ge32$ 保证它包含与 $\mu$ 距离在 $R/4$ 以内的每个整数。对 $W\sim\operatorname{Bin}(Q,(r-1)/(2r))$，Hoeffding 不等式给出

$$
\Pr[W\notin\mathcal I]
 \le2e^{-R^2/(8Q)}
 \le2e^{-16(\beta+3)^2\nu}
 \le2^{-(\beta+2)\nu}
 \le\lambda^{-(\beta+2)}
 \le\frac1{br^2\lambda}.
$$

最后一个不等式使用了 $b\le\lambda^\beta$ 和 $r^2\le\lambda$。这就证明了取 $\epsilon=\tau/(rb)$ 时的 [[translation-4#^eq-incidence-tail|（4.8）]]。并且，一旦 $r\ge2$，便有 $0<\tau\le1/2$。

最后，

$$
\frac RQ=O_\beta(\nu/\sqrt\lambda),\qquad
 \log(2Q/R)=O(\nu),\qquad
 \tau\log(2D+1)=O(1/r).
$$

结合 $1/r=O(\nu^2/\sqrt\lambda)$，这些关系证明了 [[translation-4#^eq-balanced-cost|（4.18）]]。

最后，我们说明式 [[translation-4#^eq-parameter-QR|（4.17）]] 中的参数可以在所述位运算界内精确构造。算法将 $\lambda=\lceil\log_2 n\rceil$ 求为满足 $n\le2^\lambda$ 的最小整数，然后用同样的方法求得 $\nu=\lceil\log_2\lambda\rceil$。它将 $r$ 求为满足 $r^2\nu^4\le\lambda$ 的最大整数，用整数除法计算 $Q$，并通过整数平方根搜索求得 $\lceil\sqrt\lambda\rceil$，以获得 $R$。如果 $r<2$ 或 $Q\le R$，算法在此阶段报告失败。否则，它使用整数或有理数算术构造 $\tau,\epsilon,D$ 和 $\mathcal I$ 的端点。随后检查 $\mathcal I\subseteq\{0,\ldots,Q\}$、两个平衡不等式、$R\ge32$ 以及 $6R\le Q$。式 [[translation-4#^eq-incidence-tail|（4.8）]] 中的尾概率分母为 $(2r)^Q$，因此所需的界也可以用整数算术检查。这些计算需要 $\operatorname{poly}_\beta(\log n)$ 次位运算。前面的估计表明，对于充分大的 $n$，所有检查都会通过。

∎
