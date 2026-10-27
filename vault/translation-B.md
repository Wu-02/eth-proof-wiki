---
id: translation-B
title: "原文中文译文 B 精确算术与空间"
kind: translation
group: 原文中文译文
source_label: "B"
order: 107
publish: true
status: 原文中文译文（已审校）
---

## B 精确算术与空间

^app-arithmetic

第 [[translation-4#^sec-construction|4]] 节给出了替代行 $\vec{P}_{f,v}(T)$ 的有理系数界。我们通过界定提升后的因子、用于计算 $H$ 的 Taylor 多项式的各个和以及最终插值，来补全命题 [[translation-5#^prop-count|5.3]] 中的位代价和空间估计。关键在于每个和使用固定分母。其分子随加数数量增长，因此其位长度只随该数量的对数增长。对有限多个不定元上的任意多项式 $G=\sum_\alpha c_\alpha \vec{X}^{\alpha}$，用 $\|G\|_1=\sum_\alpha|c_\alpha|$ 表示其系数范数。

### B.1 提升后示性多项式的整数系数

^subsec-rational-lift-height

首先，我们界定引理 [[translation-5#^lem-rational-idempotent|5.1]] 所提供的奇偶多项式的系数。它们出现在 [[translation-5#^eq-lifted-factor|（5.4）]] 的每个方程因子 $\mathcal B_i$ 中，因此其大小进入这些因子求值的位代价界。对于整数 $\ell\ge1$，回顾 $h(Y)=Y(Y-1)$ 和引理 [[translation-5#^lem-rational-idempotent|5.1]] 中的多项式：

$$
p_\ell(Y)=(1-Y)^\ell\sum_{j=0}^{\ell-1}
                    \binom{\ell+j-1}{j}Y^j
          =\sum_{j=0}^{\ell-1}e_j(Y)h(Y)^j,
 \qquad \deg e_j\le1.
$$

该引理证明了奇偶同余关系，并通过连续以首一多项式 $h$ 作除法来构造 $e_j$。这里我们界定该构造中出现的整数。

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

### B.2 布尔赋值求和的位复杂度

^subsec-rational-streaming-height

现在，我们界定由 [[translation-3#^eq-full-taylor-sum|（3.13）]] 计算 $\mathcal H_t(z)=H(t+z)\bmod z^J$ 过程中每个中间值的大小。从替代行 $\vec{P}_{f,v}(T)$ 出发，我们界定替代后的因子、它们在每组布尔变量上的和，以及命题 [[translation-5#^prop-count|5.3]] 中用于 Taylor 数据的累加器 $T_t$。固定一个关于 $n$ 个布尔变量的多项式方程组 $\mathcal P$，它有 $m_{\mathrm{test}}$ 个次数至多为 $k$ 的方程、满足 $2^\ell>2^n$ 的精度 $\ell$，以及其方程因子的一个替代设计。假设行 $\vec{P}_{f,v}$、划分 $S_{t,g}$ 和矩阵 $C_{t,g}$ 满足定义 [[translation-3#^def-layout|3.1]]，参数为 $Q,R,r,D,\tau$。回顾 $H$ 的次数界和每个节点处保留的 Taylor 系数个数：

$$
d_H=kR\bigl(m_{\mathrm{test}}+2(\ell-1)\bigr),\qquad
 J=\left\lfloor\frac{d_H}{Q}\right\rfloor+1.
$$

所有关于 Taylor 变量 $z$ 和共享截断标记 $V$ 的多项式，都存储为模 $(z^J,V^\ell)$ 的唯一代表元。删除这些次数范围之外的项不会增大系数范数。

替代行有公分母

$$
d_{\mathrm{den}}=(R-1)!Q!.
$$

我们使用一个整数 $B_P\ge1$，使每行 $d_{\mathrm{den}}\vec{P}_{f,v}(T)$ 的每个整数系数的绝对值至多为 $2^{B_P}$。定义 [[translation-3#^def-layout|3.1]] 给出 $B_P=O(Q\log Q+\log D)$。在固定节点 $t\in[Q]$ 和固定修正集 $U\subseteq[n]$ 处，因子 $f$ 在变量 $v$ 处的输入为

$$
\theta_{f,v}(z;x)=\langle \vec{P}_{f,v}(t), x\rangle+
       \bigl\langle \vec{P}_{f,v}(t+z)-\vec{P}_{f,v}(t),\mathbf1_U\bigr\rangle,
 \qquad x\in\{0,1\}^n.
$$

令 $L_i(z;x)$ 为方程 $i$ 中所列单项式在这些替代之后的和。每个 $d_{\mathrm{den}}\theta_{i,v}(z;x)$ 都是整数多项式，其系数范数至多为

$$
B_0=d_{\mathrm{den}}+3n(R+1)2^{B_P}(Q+1)^R .
$$

事实上，$\theta_{i,v}$ 中三次行求值的每一次在清除分母后贡献至多 $n(R+1)2^{B_P}(Q+1)^R$。该界对各组求和中的代表元也成立。

令 $\Delta=d_{\mathrm{den}}^k$。对于次数为 $u\le k$ 的单项式，将替代后的值乘以 $\Delta$，得到一个范数至多为 $d_{\mathrm{den}}^{k-u}B_0^u\le B_0^k$ 的整数多项式，这也包括常数单项式。由于 $S$ 是总列表长度的上界，

$$
B=\max\{\Delta,SB_0^k\}
 \quad\text{满足}\quad \|\Delta L_i(z;x)\|_1\le B .
$$

因此，$\log d_{\mathrm{den}}=O(Q\log(Q+2))$、$\log B_0=O(Q\log(Q+2)+\log(nD+2))$，且 $\log B=O(k\log B_0+\log(S+2))$。

方程 $i$ 替代后的因子为

$$
\mathcal B_i(z,V;x)=\sum_{j=0}^{\ell-1}
       e_j\bigl(L_i(z;x)\bigr)h\bigl(L_i(z;x)\bigr)^jV^j
       \pmod{(z^J,V^\ell)}.
$$

由于 $e_j$ 具有整数系数且次数至多为一，替代后的分母整除 $\Delta$；$h(L_i)^j$ 的分母整除 $\Delta^{2j}$。因此，令

$$
\Gamma=\Delta^{2\ell-1},
$$

则 $\Gamma\mathcal B_i(z,V;x)$ 的每个系数都是整数。为界定得到的整数分子，令

$$
E_\ell=\max\{1,\|e_0\|_1,\ldots,\|e_{\ell-1}\|_1\},\qquad
 B_1=\ell E_\ell(B+\Delta+2)^{2\ell-1}.
$$

对于 $A_i=\Delta L_i$，两个替代后的因子的整数分子分别为 $\Delta e_j(L_i)$ 和 $A_i(A_i-\Delta)$，其范数分别至多为 $E_\ell(B+\Delta)$ 和 $B(B+\Delta)$。因此，将每项通分至分母 $\Gamma$，得到

$$
\|\Gamma\mathcal B_i\|_1\le B_1,\qquad B_1\ge\Gamma,
 \qquad
 \log B_1=O\!\left(\ell^2+
       \ell\log(B+\Delta+2)+\log(\ell+1)\right).
$$

接下来，我们将这些估计应用于实际的各组求和。写成 $S_g=S_{t,g}$ 和 $C_g=C_{t,g}$，并令 $c_g$ 为 $C_g$ 的行数。于是 $c=\sum_g c_g\le2\tau n$，布尔测量 $C_gx_g$ 的每个坐标都属于 $[-D,D]\cap\mathbb Z$。令 $m_{\mathrm{test},g}$ 为在 $t$ 处分配给组 $g$ 的方程因子的个数，则 $\sum_g m_{\mathrm{test},g}=m_{\mathrm{test}}$。它们在 [[translation-3#^eq-group-polynomial|（3.11）]] 中的乘积 $A_{g,U}(x;z)$ 表示为 $\mathbb Q[z,V]/(z^J,V^\ell)$ 中的元素。其分母整除 $\Gamma^{m_{\mathrm{test},g}}$，而以该分母表示时的分子范数至多为 $B_1^{m_{\mathrm{test},g}}$。恒为一的中性因子不影响此界。

对于满足 $|E|<J$ 的一对 $U\subseteq E\subseteq[n]$，以及可达到的测量元组 $\vec y=(y_1,\ldots,y_r)$，选择满足 $C_h\bar x_h=y_h$ 的布尔代表元 $\bar x_h$。[[translation-3#^eq-group-sum|（3.4）]] 中的组和为

$$
\Sigma_g(\vec y)=
 \sum_{\substack{x_g\in\{0,1\}^{S_g}\\ C_gx_g=y_g\\
                  (x_g)_v=1\ (v\in E\cap S_g)}}
 A_{g,U}\!\Bigl(x_g+\sum_{h\ne g}\bar x_h;z\Bigr).
$$

这里，单个组上的向量在其他坐标补零。该和至多有 $2^{|S_g|}$ 项，且所有项具有同一个分母，因此

$$
\left\|\Gamma^{m_{\mathrm{test},g}}\Sigma_g(\vec y)\right\|_1
 \le 2^{|S_g|}B_1^{m_{\mathrm{test},g}}.
$$

对于 $1\le g\le r$，定义部分乘积 $\Pi_g(\vec y)=\prod_{h=1}^g\Sigma_h(\vec y)$，在每次乘法后截断。其分母整除

$$
\Gamma^{\sum_{h\le g}m_{\mathrm{test},h}}.
$$

因此，每个完整贡献 $\Pi_r(\vec y)$ 都可以通分至固定分母

$$
\Omega=\Gamma^{m_{\mathrm{test}}},
$$

并满足

$$
\|\Omega\Pi_r(\vec y)\|_1
 \le2^nB_1^{m_{\mathrm{test}}}.
$$

令 $T_t(z,V)$ 为累加器，它对所有集合对及测量元组，按符号 $(-1)^{|E|-|U|}$ 累加这些完整贡献。由 [[translation-3#^eq-full-taylor-sum|（3.13）]]，其最终值是取值于 $\mathcal A_\ell$ 的 Taylor 多项式 $\mathcal H_t(z)$。单个节点的带符号更新次数 $M_*$ 满足

$$
M_*\le
 \biggl(\sum_{s=0}^{\min(J-1,n)}2^s\binom ns\biggr)(2D+1)^c
 \le3^n(2D+1)^c.
$$

因此，$T_t$ 的每个中间值，而不仅是其最终值，都满足

$$
\|\Omega T_t\|_1
 \le M_*\,2^nB_1^{m_{\mathrm{test}}}.
$$

整数多项式 $\Omega T_t$ 的每个系数有

$$
O\!\left(\log(M_*+1)+n+m_{\mathrm{test}}\log B_1\right)
$$

位。这个估计也界定了以此前给定的固定分母表示的所有组和与部分乘积的整数分子。分母满足

$$
\log\Omega
 =k m_{\mathrm{test}}(2\ell-1)\log d_{\mathrm{den}}
 =O\!\left(k(m_{\mathrm{test}}\ell+1)Q\log(Q+2)\right).
$$

每个贡献至多将 $m_{\mathrm{test}}$ 个提升后的方程因子相乘。处理更多集合对或测量元组会加入新的贡献，而不会将它们乘入先前的贡献中。这就是指数多次迭代只在位估计中贡献 $\log(M_*+1)$ 的原因。每个存储的多项式至多有 $J\ell\le(d_H+1)\ell$ 个系数。枚举过程只保留当前编号和布尔代表元、一个组和、一个部分乘积以及累加器 $T_t$，而不存储包含全部赋值或全部测量元组的表。这些估计给出了 [[translation-5#^eq-sum-bit-bound|（5.6）]]，以及每次有理运算的多项式位代价。$QJ\ell$ 个 Taylor 系数和工作状态可以存于 $\operatorname{poly}(n,m_{\mathrm{test}},\ell,D,Q,R,J,r,k,S)$ 位之内。

### B.3 插值与整数答案

^subsec-rational-readout

对于 $0\le s<\ell$，令 $H_s(T)=[V^s]H(T)\in\mathbb Q[T]$。第 [[translation-B#^subsec-rational-streaming-height|B.2]] 节界定了计算出的数据 $[z^jV^s]\mathcal H_t(z)=[z^j]H_s(t+z)$，其中 $t\in[Q]$、$0\le j<J$。固定 $s$。我们对该坐标进行插值，对全部 $\ell$ 个坐标使用同一个有理 Hermite 矩阵。令 $M_H=QJ>d_H$。在单项式基 $1,T,\ldots,T^{M_H-1}$ 下，Hermite 插值矩阵是整数矩阵

$$
\mathsf V_{(t,j),u}=
 \begin{cases}\binom uj t^{u-j},&u\ge j,\\0,&u<j,\end{cases}
 \qquad t\in[Q],\quad 0\le j<J,\quad 0\le u<M_H.
$$

由第 [[translation-3#^sec-counting|3]] 节的 Hermite 插值陈述，它是非奇异的。其元素有 $O(M_H\log(Q+2))$ 位。令 $\mathbf y$ 为按 $(t,j)$ 排序的已计算系数 $[z^jV^s]\mathcal H_t(z)$ 的向量，令 $\mathbf h$ 为 $H_s$ 的单项式系数向量，补零至长度 $M_H$。于是 $\mathsf V\mathbf h=\mathbf y$。向量 $\mathbf b=\Omega\mathbf y$ 为整数向量；用 $B_{\mathrm{data}}$ 表示其元素位长度的上界。第 [[translation-B#^subsec-rational-streaming-height|B.2]] 节中的界给出

$$
B_{\mathrm{data}}
 \le\operatorname{poly}(n,m_{\mathrm{test}},\ell,k,Q,\log(D+2),\log(S+2)).
$$

只需要常数系数 $h_0=H_s(0)$。令 $\mathsf V^{(0)}$ 由 $\mathsf V$ 将编号为 $u=0$ 的列替换为 $\mathbf b$ 得到，并令

$$
N_H=\det\mathsf V^{(0)},\qquad D_H=\det\mathsf V\ne0.
$$

对 $\mathsf V(\Omega\mathbf h)=\mathbf b$ 应用 Cramer 法则，得到

$$
H_s(0)=h_0=\frac{N_H}{\Omega D_H}.\tag{B.1}
$$

^eq-exact-readout

我们通过无分数 Gaussian 消元 〔[Bar68](https://doi.org/10.1090/S0025-5718-1968-0226829-0 "原引用键 Bareiss68")，第 I–II 和 IV–V 节〕 计算这两个行列式。对于一个 $M_H\times M_H$ 整数矩阵，该算法使用 $O(M_H^3)$ 次整数算术运算；选主元也使其能够处理奇异矩阵。消元中保留的元素是输入矩阵的带符号子式。每次更新先对这些元素形成乘积与差，再进行一次精确的整数除法。因此，对 $\mathsf V$ 和 $\mathsf V^{(0)}$ 的子式给出的界，也界定了计算 $D_H$ 和 $N_H$ 所使用的中间整数。$(\mathsf V\mid\mathbf b)$ 的每个子式的绝对值至多为

$$
2^{O\left(M_H\left(B_{\mathrm{data}}+
                M_H\log(Q+2)+\log(M_H+1)\right)\right)}.
$$

事实上，其行列式是至多 $M_H!$ 个乘积之和，每个乘积包含至多 $M_H$ 个元素。因此，无分数消元中的中间整数用带符号二进制记法表示时有

$$
O\!\left(M_H\bigl(B_{\mathrm{data}}+
                   M_H\log(Q+2)+\log(M_H+1)\bigr)\right)
$$

位。所以计算 $N_H,D_H$ 使用 $\operatorname{poly}(M_H,B_{\mathrm{data}})$ 次位运算和同样数量的工作空间位。

在 $T=0$ 处，根据构造，每个 $H_s(0)$ 都是整数，因此 [[translation-B#^eq-exact-readout|（B.1）]] 中的除法对每个 $s$ 都是整除。计算这 $\ell$ 个整数后，令 $u=\sum_{s=0}^{\ell-1}H_s(0)$。由 [[translation-5#^eq-origin-residue|（5.5）]]，最小非负剩余

$$
u-2^\ell\left\lfloor\frac{u}{2^\ell}\right\rfloor=N(\mathcal P)
$$

就是精确计数。对连续的坐标复用同一工作空间，则全部 $\ell$ 次插值、求和及取余使用 $\operatorname{poly}(M_H,B_{\mathrm{data}},\log(\Omega+1),\ell)$ 次位运算和多项式位工作空间。

### B.4 技术概述中的算术

^subsec-overview-arithmetic

我们还证明第 [[translation-2#^sec-technical-overview|2]] 节中有界出现次数算法的位复杂度和空间界。引理 [[translation-4#^lem-row-coefficients|4.6]] 将替代系数的位长度界为 $n$ 的多项式。求解第 [[translation-2#^subsec-preview-separation|2.4]] 节中多项式规模的有理线性方程组，得到的测量系数 $\vec\lambda_{e,v,h}$ 也具有多项式位长度。令 $\delta$ 为所有求值点上这些系数及所有替代系数的分母的乘积。它们只有多项式多个，因此 $\delta$ 也有多项式位长度。每个子句乘积至多使用 $M\le3n$ 个线性输入；所以，受限和中的所有系数都可以用公分母 $\delta^{3n}$ 累加。多项式多个多项式位长输入系数的乘积，以及在该公分母下指数多个这种项的和，仍具有多项式位长度。因此，对这些 Taylor 数据，上面的精确 Hermite 插值也具有多项式位代价。最后，各种枚举可以依次进行，只保留构造、当前编号、系数数组、累积和，以及插值所需的多项式多个 Taylor 系数。这给出了多项式空间和仅为多项式的位运算开销。
