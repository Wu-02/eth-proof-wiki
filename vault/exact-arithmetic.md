---
id: exact-arithmetic
title: "精确算术、分母与流式求值"
kind: support
group: 定义与构造
publish: false
status: 完整证明整合稿
---

# 精确算术、分母与流式求值

本页分析精确计数中有理数运算的位成本：先给出方程输入、替代设计和计算对象，再证明固定分母下的中间值界与 Hermite 插值成本，最后说明它们在有界出现次数的 $3$-CNF 算法中的应用。

## 输入、计算对象与算术结论

^app-arithmetic

### 方程、整数提升与截断因子

输入是 $n$ 个变量上的方程列表 $P_i=0$（$1\le i\le m_{\mathrm{test}}$），其中 $P_i\in\mathbb F_2[X_1,\ldots,X_n]$ 的次数至多为 $k$。等式在 $\mathbb F_2$ 中判断，解域是 $\{0,1\}^n$；记全部方程的公共解数为 $N(\mathcal P)$。先分别在每个 $P_i$ 中将相同单项式模二合并，并删去零系数项。将剩余系数 $1\in\mathbb F_2$ 取整数代表 $1$，得到整数多项式 $L_i$；因此 $P_i(x)=0$ 当且仅当 $L_i(x)$ 为偶数。

取正整数 $\ell$ 满足 $2^\ell>2^n$。令 $h(Y)=Y(Y-1)$，并用 [[5.1]] 的多项式

$$
p_\ell(Y)=(1-Y)^\ell\sum_{j=0}^{\ell-1}\binom{\ell+j-1}{j}Y^j
 =\sum_{j=0}^{\ell-1}e_j(Y)h(Y)^j,
 \qquad e_j(Y)=a_j+b_jY\in\mathbb Z[Y].
$$

其在整数输入处模 $2^\ell$ 等于偶数示性值。[[B.1]] 给出 $|a_j|,|b_j|\le2^{C\ell^2}$，其中 $C$ 为绝对常数，并保证所有 $e_j$ 可用 $\operatorname{poly}(\ell)$ 次位运算和同样数量的工作空间位构造。

使用截断代数 $\mathcal A_\ell=\mathbb Q[V]/(V^\ell)$。对每个方程，定义因子

$$
\mathcal B_i((X_v)_{v\in I_i},V)
 =\sum_{j=0}^{\ell-1}e_j(L_i(\vec X))h(L_i(\vec X))^jV^j
 \in\mathcal A_\ell[(X_v)_{v\in I_i}],
$$

其中 $I_i\subseteq[n]$ 是该方程列出的变量索引集合。每个因子都附带一个指定输入索引集合，称为作用域；因子只允许依赖其中的变量，但可以不实际依赖某些输入。方程因子的作用域取 $I_i$。对未出现在任何 $I_i$ 中的声明变量 $v$，加入一个作用域为 $\{v\}$、值恒为一的中性因子。令 $\mathcal F$ 为所有这些因子的索引集，$\Phi_f$ 为因子，$I_f$ 为其作用域。关联指 $f\in\mathcal F$、$v\in I_f$ 的一对 $(f,v)$。

用 $S\ge1$ 表示单项式列表和指定作用域列表总长度的上界。列表记录单项式及其中的变量索引；特别地，单项式总数不超过 $S$。方程因子有 $m_{\mathrm{test}}$ 个，中性因子至多有 $n$ 个，故 $|\mathcal F|\le m_{\mathrm{test}}+n$。

### 替代设计及待恢复的多项式

给定满足 [[shared-linear-design#^def-layout|定义 3.1]] 的以下数据。参数 $r\ge2$、$D\ge1$、$1\le R<Q$ 为整数，$0<\tau\le1/2$，求值点为 $t\in[Q]=\{1,\ldots,Q\}$。

- 对每个 $t$，给定允许空组的划分 $[n]=S_{t,1}\sqcup\cdots\sqcup S_{t,r}$，且 $|S_{t,g}|\le2n/r$。因子 $f$ 在该点的指定组编号是 $\sigma_f(t)\in[r]$。
- 组 $g$ 的测量矩阵为 $C_{t,g}\in\mathbb Z^{[c_{t,g}]\times S_{t,g}}$。每行系数绝对值之和至多为 $D$，总行数满足 $\sum_g c_{t,g}\le2\tau n$。对全局赋值 $x\in\mathbb Q^n$，记 $x_g=x|_{S_{t,g}}$；该组的测量值是向量 $C_{t,g}x_g$。
- 每个关联有替代行 $\vec P_{f,v}(T)\in\mathbb Q[T]^{1\times n}$，次数至多为 $R$，且 $\vec P_{f,v}(0)=\delta_v$，其中 $\delta_v$ 是第 $v$ 个标准基行。在点 $t$，因子 $f$ 的第 $v$ 个输入替换为标量 $\langle\vec P_{f,v}(t),x\rangle$。对 $g\ne\sigma_f(t)$ 和 $\xi\in\mathbb Q^{S_{t,g}}$，若 $C_{t,g}\xi=0$，则 $\langle\vec P_{f,v}(t),\widetilde\xi\rangle=0$；$\widetilde\xi$ 表示在其他坐标补零。因此，对每个非指定组 $g$，其坐标 $x_g$ 对该替代标量的影响仅取决于该组的测量值 $C_{t,g}x_g$。
- 令 $d_{\mathrm{den}}=(R-1)!Q!$。每行 $d_{\mathrm{den}}\vec P_{f,v}(T)$ 的系数均为具有 $O(Q\log Q+\log D)$ 位的整数。

上述公分母、系数位长和 $R<Q$ 都是所引用设计的条件；其构造见 [[4.7]]，系数估计见 [[4.6]]。

定义

$$
H(T)=\sum_{x\in\{0,1\}^n}\prod_{f\in\mathcal F}
 \Phi_f\bigl((\langle\vec P_{f,v}(T),x\rangle)_{v\in I_f}\bigr)
 \in\mathcal A_\ell[T].
$$

为每个关联 $(f,v)$ 引入独立形式变量 $Y_{f,v}$，将因子 $\Phi_f$ 的第 $v$ 个输入改名为 $Y_{f,v}$，并在 $\mathcal A_\ell[(Y_{f,v})_{f\in\mathcal F,\,v\in I_f}]$ 中形成乘积

$$
\prod_{f\in\mathcal F}\Phi_f((Y_{f,v})_{v\in I_f}).
$$

这里的总输入次数只对全部 $Y_{f,v}$ 计算；$V$ 属于已截断的系数代数 $\mathcal A_\ell$。引理 [[5.2]] 给出这个乘积的总输入次数上界 $k(m_{\mathrm{test}}+2(\ell-1))$。将每个 $Y_{f,v}$ 替换为次数至多为 $R$ 的标量多项式 $\langle\vec P_{f,v}(T),x\rangle$，再对布尔向量 $x$ 求和，得到

$$
\deg_T H\le d_H:=kR\bigl(m_{\mathrm{test}}+2(\ell-1)\bigr),\qquad
 q=\left\lfloor\frac{d_H}{Q}\right\rfloor,\qquad J=q+1.
$$

在 $T=0$ 处，各替代输入恢复为布尔变量，因子由整数系数多项式构成，所以 $H(0)$ 的全部 $V$-系数均为整数。定义 $\mathcal S_\ell(\sum_{s<\ell}a_sV^s)=\sum_{s<\ell}a_s$；先在 $\mathcal A_\ell$ 中计算乘积，再取这个系数和。[[5.2]] 的计数同余给出

$$
\mathcal S_\ell(H(0))\equiv N(\mathcal P)\pmod{2^\ell}.
$$

因此，恢复 $H(0)$ 后取系数和模 $2^\ell$ 的最小非负余数，就得到精确计数。

### 本页证明的位复杂度界

计算过程先在每个点求得 $\mathcal H_t(z)=H(t+z)\bmod z^J$，再用有理 Hermite 插值恢复 $H(0)$。所有局部计算在 $\mathbb Q[z,V]/(z^J,V^\ell)$ 中进行，保存 $z$ 次数小于 $J$、$V$ 次数小于 $\ell$ 的唯一代表。下面将写出实际的分组求和与累加过程。

记 $C_q=\sum_{a=0}^{\min(q,n)}2^a\binom na$。在上述输入和设计条件下，本页证明：

1. 因子求值、各组求和及 Taylor 数据累加中的有理系数，可以用固定共同分母表示；分子和分母的位长均不超过
   $$
   B_{\mathrm{sum}}=\operatorname{poly}(n,m_{\mathrm{test}},\ell,k,Q,\log(D+2),\log(S+2)).
   $$
2. 每次有理算术运算的位代价，以及最终插值和取余的总位代价，均以 $n,m_{\mathrm{test}},\ell,D,Q,R,J,r,k,S$ 的某个多项式为上界。整个计算只需这些参数的多项式位工作空间。
3. 所用 [[3.4]] 过程检查的布尔向量总数至多为 $2QrC_q(2D+1)^{2\tau n}2^{2n/r}$，每个向量至多求值 $|\mathcal F|$ 个因子，每次求值及该向量的额外运算所需位时间均为所列参数的多项式。因此，将上述布尔向量数量界乘以每个向量所需的多项式位时间，得到总位时间
   $$
   \operatorname{poly}(n,m_{\mathrm{test}},\ell,D,Q,R,J,r,k,S)
   C_q(2D+1)^{2\tau n}2^{2n/r}.
   $$

各项多项式上界同时适用于所有满足上述条件的参数取值。证明依次估计单个替代输入、因子、各组的和及累加器，然后分析插值。对有限多个不定元上的多项式 $G=\sum_\alpha c_\alpha\vec X^\alpha$，记系数范数 $\|G\|_1=\sum_\alpha|c_\alpha|$。关键是先给通分后每个加项的分子一个统一上界：若各项分子绝对值至多为 $A$，则 $N$ 项之和的绝对值至多为 $NA$，累加额外增加的位长至多为 $\log_2N+O(1)$。



### B.2 布尔赋值求和的位复杂度

^subsec-rational-streaming-height

下面估计替代输入、因子、组和与 Taylor 数据累加器中间值的分子分母位长。

所有关于 Taylor 变量 $z$ 和共享截断标记 $V$ 的多项式，都存储为模 $(z^J,V^\ell)$ 的唯一代表元。删除这些次数范围之外的项不会增大系数范数。

替代行有公分母

$$
d_{\mathrm{den}}=(R-1)!Q!.
$$

我们使用一个整数 $B_P\ge1$，使每行 $d_{\mathrm{den}}\vec{P}_{f,v}(T)$ 的每个整数系数的绝对值至多为 $2^{B_P}$。定义 [[shared-linear-design#^def-layout|3.1]] 给出 $B_P=O(Q\log Q+\log D)$。在固定节点 $t\in[Q]$ 和固定修正集 $U\subseteq[n]$ 处，因子 $f$ 在变量 $v$ 处的输入为

$$
\theta_{f,v}(z;x)=\langle \vec{P}_{f,v}(t), x\rangle+
       \bigl\langle \vec{P}_{f,v}(t+z)-\vec{P}_{f,v}(t),\mathbf1_U\bigr\rangle,
 \qquad x\in\{0,1\}^n.
$$

其中 $\mathbf1_U$ 是集合 $U$ 的布尔示性向量。令 $L_i(z;x)$ 为方程 $i$ 中所列单项式在这些替代之后的和。每个 $d_{\mathrm{den}}\theta_{i,v}(z;x)$ 都是整数多项式，其系数范数至多为

$$
B_0=d_{\mathrm{den}}+3n(R+1)2^{B_P}(Q+1)^R .
$$

事实上，$\theta_{i,v}$ 中三次行求值的每一次在清除分母后贡献至多 $n(R+1)2^{B_P}(Q+1)^R$。

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

则 $\Gamma\mathcal B_i(z,V;x)$ 的每个系数都是整数。为估计所得整数分子的系数范数，令

$$
E_\ell=\max\{1,\|e_0\|_1,\ldots,\|e_{\ell-1}\|_1\},\qquad
 B_1=\ell E_\ell(B+\Delta+2)^{2\ell-1}.
$$

令 $A_i=\Delta L_i$。以分母 $\Delta$ 表示 $e_j(L_i)$，其整数分子为 $\Delta e_j(L_i)$，范数至多为 $E_\ell(B+\Delta)$。由 $h(Y)=Y(Y-1)$，以分母 $\Delta^2$ 表示 $h(L_i)$ 时，整数分子为 $A_i(A_i-\Delta)$，范数至多为 $B(B+\Delta)$；取 $j$ 次幂时，分母为 $\Delta^{2j}$。因此，将每项通分至分母 $\Gamma$，得到

$$
\|\Gamma\mathcal B_i\|_1\le B_1,\qquad B_1\ge\Gamma,
 \qquad
 \log B_1=O\!\left(\ell^2+
       \ell\log(B+\Delta+2)+\log(\ell+1)\right).
$$

接下来，我们将这些估计应用于实际的各组求和。写成 $S_g=S_{t,g}$ 和 $C_g=C_{t,g}$，并令 $c_g$ 为 $C_g$ 的行数。于是 $c=\sum_g c_g\le2\tau n$，对 $x_g\in\{0,1\}^{S_g}$，测量 $C_gx_g$ 的每个坐标都属于 $[-D,D]\cap\mathbb Z$。令 $m_{\mathrm{test},g}$ 为在 $t$ 处分配给组 $g$ 的方程因子的个数，则 $\sum_g m_{\mathrm{test},g}=m_{\mathrm{test}}$。固定本次修正集合 $U$，将分配给组 $g$ 的方程因子相乘，定义

$$
A_{g,U}(x;z)=\prod_{i:\,\sigma_i(t)=g}\mathcal B_i(z,V;x)
 \quad\text{在 }\mathbb Q[z,V]/(z^J,V^\ell)\text{ 中}.
$$

空乘积取一。其分母整除 $\Gamma^{m_{\mathrm{test},g}}$，而以该分母表示时的分子范数至多为 $B_1^{m_{\mathrm{test},g}}$。恒为一的中性因子不影响此界。

对于满足 $|E|<J$ 的一对 $U\subseteq E\subseteq[n]$，枚举测量元组 $\vec y=(y_1,\ldots,y_r)$，其中 $y_h\in\{-D,-D+1,\ldots,D\}^{c_h}$。称该元组可达到，是指对每个组 $h$ 都存在 $\bar x_h\in\{0,1\}^{S_h}$ 使 $C_h\bar x_h=y_h$。对可达到的元组，各选一个这样的布尔代表元；其他元组直接跳过。将各组代表元或局部赋值拼接后仍是一个布尔向量，所以前面对 $\theta_{i,v}(z;x)$ 的范数估计同样适用。[[3.2#^eq-group-sum|（3.4）]] 中的组和为

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

令 $T_t(z,V)$ 为累加器，它对所有集合对及测量元组，按符号 $(-1)^{|E|-|U|}$ 累加这些完整贡献。在上述设计和截断条件下，[[3.3]] 的 Taylor 求和恒等式 [[3.3#^eq-full-taylor-sum|（3.13）]] 保证其最终值等于 $\mathcal H_t(z)=H(t+z)\bmod z^J$，系数取自已定义的 $\mathcal A_\ell$。单个节点的带符号更新次数 $M_*$ 满足

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

位。这个估计也是此前所有组和与部分乘积在各自固定分母下的整数分子位长上界。分母满足

$$
\log\Omega
 =k m_{\mathrm{test}}(2\ell-1)\log d_{\mathrm{den}}
 =O\!\left(k(m_{\mathrm{test}}\ell+1)Q\log(Q+2)\right).
$$

每个完整贡献是各组和的乘积；将它展开后，每一项至多含 $m_{\mathrm{test}}$ 个提升后的方程因子。处理更多集合对或测量元组时，只将新的完整贡献加到累加器中，不将它们乘入先前的贡献。因此，即使迭代次数呈指数增长，固定分母下的累加也只会使分子的位长额外增加 $O(\log(M_*+1))$ 位。每个存储的多项式至多有 $J\ell\le(d_H+1)\ell$ 个系数。枚举过程只保留当前编号和布尔代表元、一个组和、一个部分乘积以及累加器 $T_t$，而不存储包含全部赋值或全部测量元组的表。结合 $R<Q$、$c\le2\tau n\le n$ 及上面的范数估计，得到本页所述 $B_{\mathrm{sum}}=\operatorname{poly}(n,m_{\mathrm{test}},\ell,k,Q,\log(D+2),\log(S+2))$ 的分子分母位长界，也就是 [[5.3#^eq-sum-bit-bound|（5.6）]]。因此，每次精确有理运算都具有所列参数的多项式位代价。$QJ\ell$ 个 Taylor 系数和工作状态可以存于 $\operatorname{poly}(n,m_{\mathrm{test}},\ell,D,Q,R,J,r,k,S)$ 位之内。

### B.3 插值与整数答案

^subsec-rational-readout

对于 $0\le s<\ell$，令 $H_s(T)=[V^s]H(T)\in\mathbb Q[T]$。前面的位长分析已给出所计算数据的分子分母上界；这些数据是 $[z^jV^s]\mathcal H_t(z)=[z^j]H_s(t+z)$，其中 $t\in[Q]$、$0\le j<J$。固定 $s$。我们对该坐标进行插值，对全部 $\ell$ 个坐标使用同一个有理 Hermite 矩阵。令 $M_H=QJ>d_H$。在单项式基 $1,T,\ldots,T^{M_H-1}$ 下，Hermite 插值矩阵是整数矩阵

$$
\mathsf V_{(t,j),u}=
 \begin{cases}\binom uj t^{u-j},&u\ge j,\\0,&u<j,\end{cases}
 \qquad t\in[Q],\quad 0\le j<J,\quad 0\le u<M_H.
$$

由第 [[3.4#^sec-counting|3]] 节的 Hermite 插值陈述，它是非奇异的。其元素有 $O(M_H\log(Q+2))$ 位。令 $\mathbf y$ 为按 $(t,j)$ 排序的已计算系数 $[z^jV^s]\mathcal H_t(z)$ 的向量，令 $\mathbf h$ 为 $H_s$ 的单项式系数向量，补零至长度 $M_H$。于是 $\mathsf V\mathbf h=\mathbf y$。向量 $\mathbf b=\Omega\mathbf y$ 为整数向量；用 $B_{\mathrm{data}}$ 表示其元素位长度的上界。第 [[exact-arithmetic#^subsec-rational-streaming-height|B.2]] 节中的界给出

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

我们通过无分数 Gaussian 消元 〔[Bar68](https://doi.org/10.1090/S0025-5718-1968-0226829-0 "原引用键 Bareiss68")，第 I–II 和 IV–V 节〕 计算这两个行列式。对于一个 $M_H\times M_H$ 整数矩阵，该算法使用 $O(M_H^3)$ 次整数算术运算；选主元也使其能够处理奇异矩阵。消元中保留的元素是输入矩阵的带符号子式。每次更新先对这些元素形成乘积与差，再进行一次精确的整数除法。因此，对 $\mathsf V$ 和 $\mathsf V^{(0)}$ 的子式给出的界，也能据以估计计算 $D_H$ 和 $N_H$ 时所用中间整数的位长。$(\mathsf V\mid\mathbf b)$ 的每个子式的绝对值至多为

$$
2^{O\left(M_H\left(B_{\mathrm{data}}+
                M_H\log(Q+2)+\log(M_H+1)\right)\right)}.
$$

事实上，每个子式都可展开为至多 $M_H!$ 个带符号的乘积之和，每个乘积包含至多 $M_H$ 个元素。因此，无分数消元中的中间整数用带符号二进制记法表示时有

$$
O\!\left(M_H\bigl(B_{\mathrm{data}}+
                   M_H\log(Q+2)+\log(M_H+1)\bigr)\right)
$$

位。所以计算 $N_H,D_H$ 使用 $\operatorname{poly}(M_H,B_{\mathrm{data}})$ 次位运算和同样数量的工作空间位。

在 $T=0$ 处，根据构造，每个 $H_s(0)$ 都是整数，因此 [[exact-arithmetic#^eq-exact-readout|（B.1）]] 中的除法对每个 $s$ 都是整除。计算这 $\ell$ 个整数后，令 $u=\sum_{s=0}^{\ell-1}H_s(0)$。由 [[5.3#^eq-origin-residue|（5.5）]]，最小非负余数

$$
u-2^\ell\left\lfloor\frac{u}{2^\ell}\right\rfloor=N(\mathcal P)
$$

就是精确计数。依次处理各个坐标，并复用同一工作空间，则全部 $\ell$ 次插值、求和及取余使用 $\operatorname{poly}(M_H,B_{\mathrm{data}},\log(\Omega+1),\ell)$ 次位运算和多项式位工作空间。


因而，Taylor 数据的生成、插值与整数恢复都满足本页开头陈述的位长和空间界。由 [[3.4]] 的布尔向量数量界、每个向量至多 $|\mathcal F|$ 次因子求值，以及每次求值和有理运算的多项式位成本，总位时间为 $\operatorname{poly}(n,m_{\mathrm{test}},\ell,D,Q,R,J,r,k,S)C_q(2D+1)^{2\tau n}2^{2n/r}$；顺序枚举并复用插值工作区给出同一组参数的多项式位空间。

### 有界出现次数的 3-CNF 应用

^subsec-overview-arithmetic

下面讨论 [[counting-algorithm-overview|计数算法概述]] 中的另一种输入：$F$ 是含 $n$ 个声明变量的 $3$-CNF，每个变量的正、负出现次数合计至多为三。删除重言式和子句内重复文字后，若出现空子句，就直接返回零。对其余子句 $e$，令 $I_e$ 为变量索引集合；对没有出现的变量 $v$，添加一个作用域为 $\{v\}$、值为一的中性因子。令 $\mathcal F$ 索引子句与这些中性因子，则

$$
n\le M:=\sum_{e\in\mathcal F}|I_e|\le3n.
$$

正文字的取值多项式为 $L_{e,v}(X_v)=X_v$，负文字的取值多项式为 $L_{e,v}(X_v)=1-X_v$。真实子句的因子为 $\Phi_e=1-\prod_{v\in I_e}(1-L_{e,v}(X_v))$，中性因子为一。这些因子的乘积在布尔输入处直接等于 $F$ 的满足示性值；用 $\#F$ 表示 $F$ 的满足赋值数。因子输入采用替代行 $\vec P_{e,v}(T)$，满足 $\vec P_{e,v}(0)=\delta_v$ 和 $\deg\vec P_{e,v}\le R$。这一应用的求和多项式为

$$
H(T)=\sum_{x\in\{0,1\}^n}\prod_{e\in\mathcal F}
 \Phi_e\bigl((\langle\vec P_{e,v}(T),x\rangle)_{v\in I_e}\bigr)
 \in\mathbb Q[T],\qquad
 H(0)=\#F,\quad \deg H\le MR\le3nR.
$$

在本节取 $q=\lfloor3nR/Q\rfloor$、$J=q+1$，局部计算在 $\mathbb Q[z]/(z^J)$ 中进行。对充分大的 $n$，概述中的[[counting-algorithm-overview#^eq-overview-parameter-bounds|参数选择]]给出 $Q,R,r,D,J\le n^{O(1)}$，求值点仍为整数 $1,\ldots,Q$；每个点上的变量划分、因子分组及整数测量矩阵满足前述分离条件。[[4.6]] 给出替代行系数的多项式位长界。因子—变量关联有 $M\le3n$ 个，每行有 $n$ 个坐标、次数至多 $R$，故所需替代系数总数也以 $n$ 的某个多项式为上界。有限多个较小的 $n$ 可直接枚举。

固定点 $t$，写 $S_h=S_{t,h}$、$C_h=C_{t,h}$，并令 $c_h$ 为 $C_h$ 的行数。如果因子 $e$ 的指定组为 $g=\sigma_e(t)$，对 $h\ne g$ 求一个有理列向量 $\vec\lambda_{e,v,h}\in\mathbb Q^{c_h}$，使

$$
C_h^{\mathsf T}\vec\lambda_{e,v,h}
   =\bigl(\vec P_{e,v}(t)|_{S_h}\bigr)^{\mathsf T}.
$$

设计的核条件保证该系统相容。这个等式表示，该替代行对 $S_h$ 中变量的依赖可以写成测量 $C_hx_h$ 的线性组合。系统的行列数均以 $n$ 的某个多项式为上界；系数矩阵是整数测量矩阵，其条目的绝对值至多为 $D$。右端由替代行在整数点 $t\in[Q]$ 处的取值组成。替代行的有理系数具有多项式位长，次数至多为 $R$；结合 $R,Q,D\le n^{O(1)}$，可知右端各坐标及矩阵条目都具有多项式位长。精确有理消元因此可以在多项式位时间和空间内选出多项式位长的解。这样的系统只有多项式多个。

令 $\delta$ 为所有求值点上这些测量组合系数和全部替代系数的分母之积。分母的数量与各分母的位长都有关于 $n$ 的多项式上界，因此 $\delta$ 的位长也有多项式上界。固定 $U\subseteq E\subseteq[n]$、$|E|<J$ 后，使用上文的 $\theta_{e,v}(z;x)$ 替代输入，并对满足 $x_v=1$（$v\in E$）的布尔赋值求和。固定各组测量值后，该受限和按前述代表元与组和公式计算。

每个子句乘积使用的线性输入总数至多为 $M\le3n$，所以受限和的所有系数可以通分到固定分母 $\delta^{3n}$。每项分子的因子数量与各因子的位长都有多项式上界，因此该项分子的位长仍有多项式上界。各轮只相加新的贡献，不把它们乘入已累积的贡献；所枚举赋值、集合对和测量元组的数量至多为 $\exp(\operatorname{poly}(n))$，故固定分母求和只额外增加多项式位数。

由于节点数 $Q$、截断阶数 $J$、节点编码位长及所有 Taylor 数据位长均有多项式上界，上面的有理 Hermite 插值分析给出关于 $n$ 的多项式位成本。依次进行各项枚举，仅保存构造出的设计数据、当前索引、系数数组、累加器以及多项式个 Taylor 系数。因而该应用使用多项式位空间，且总位运算次数至多是其算术运算次数乘以 $n^{O(1)}$。

