---
id: replacement-form-construction
title: "替代形式的辅助坐标与构造思路"
kind: support
group: 定义与构造
publish: false
status: 完整证明整合稿
---

# 替代形式的辅助坐标与构造思路

本页给出低次数替代线性形式的构造。先陈述输入和目标，再以有界出现次数的 CNF 为例完成五步构造，最后给出一般因子作用域的接口和一个四坐标算例。

## 输入与构造目标

先处理一个附带完整变量集合 $\{X_1,\ldots,X_n\}$、$n\ge1$ 的 $3$-CNF 公式 $F$，每个变量的正、负出现次数合计至多为三。赋值域为 $\{0,1\}^n$，包括公式中未出现的声明变量；记 $\#F$ 为该域内满足 $F$ 的赋值数。删除重言式子句和子句内的重复文字；若有空子句，计数直接为零。令 $I_e\subseteq[n]$ 是其余子句 $e$ 中的变量下标集合。对未出现的变量 $v$，另加一个作用域为 $\{v\}$、值恒为 $1$ 的中性因子，称为虚拟子句。以有限集合 $\mathcal F$ 索引实际子句和虚拟子句，并令

$$
M=\sum_{e\in\mathcal F}|I_e|,\qquad
|I_e|\le3,\qquad \#\{e:v\in I_e\}\le3,\qquad n\le M\le3n.
$$

关联 $(e,v)$ 指 $e\in\mathcal F$、$v\in I_e$，也称变量在该子句中的一次出现。以下先把整数 $r\ge2$、$1\le R<Q$ 及实数 $0<\tau\le1/2$ 作为待选参数。$T$ 是形式参数，$[Q]=\{1,\ldots,Q\}$ 是采样点集，另记 $D=r^{2Q}$。构造所需的数值不等式将在各步列出，最后对充分大的 $n$ 给出一组满足它们的明确取值。

我们要构造以下数据：

- 对每个 $t\in[Q]$，给出变量下标划分 $[n]=S_{t,1}\sqcup\cdots\sqcup S_{t,r}$，每组大小至多为 $2n/r$；每个因子 $e$ 有一个指定组编号 $\sigma_e(t)\in[r]$。
- 给出整数测量矩阵 $C_{t,g}\in\mathbb Z^{[c_{t,g}]\times S_{t,g}}$，其中 $c_{t,g}$ 为非负整数。对 $x\in\mathbb Q^n$，它的组测量为 $C_{t,g}(x|_{S_{t,g}})$。所有组的总行数至多为 $2\tau n$，且每行的系数绝对值之和至多为 $D$。
- 对每个关联给出多项式行 $\vec P_{e,v}(T)\in\mathbb Q[T]^{1\times n}$。在子句 $e$ 中，以 $\langle\vec P_{e,v}(T),x\rangle$ 替代原输入 $x_v$。要求 $\vec P_{e,v}(0)=\delta_v$、$\deg\vec P_{e,v}\le R$，其中 $\delta_v$ 是第 $v$ 个标准基行。在 $T=t$ 处，这个替代输入必须是指定组 $x|_{S_{t,\sigma_e(t)}}$ 的坐标与其余各组测量值的有理线性组合。一个子句的全部替代输入使用同一个指定组。

这些条件就是 [[shared-linear-design#^def-overview-measurement-structure|定义 2.1]] 中所用的设计。它们限制了变换后的子句对其他组变量的依赖：固定各组测量值后，该子句只依赖其指定组内的变量。

### 构造在计数中的用途

将 $X_v$ 也作为对应变量的形式不定元。对实际子句 $e$，正文字取 $L_{e,v}(X_v)=X_v$，负文字取 $L_{e,v}(X_v)=1-X_v$，并令 $\Phi_e=1-\prod_{v\in I_e}(1-L_{e,v}(X_v))$；虚拟子句取 $\Phi_e=1$。将上面的替代用于这些因子，得到

$$
H(T)=\sum_{x\in\{0,1\}^n}\prod_{e\in\mathcal F}
\Phi_e\bigl((\langle\vec P_{e,v}(T),x\rangle)_{v\in I_e}\bigr).
$$

替代在 $T=0$ 处恢复各个原输入，所以 $H(0)=\#F$；各因子的总次数之和至多为 $M$，因而 $\deg H\le MR\le3nR$。在整数点 $t=1,\ldots,Q$ 处，各取 $H(t+z)$ 中从 $z^0$ 到 $z^{\lfloor3nR/Q\rfloor}$ 的系数，就足以通过有理 Hermite 插值恢复 $H(0)$。这说明为什么要使 $R/Q$ 较小：它控制每个点所需的系数数目。系数的计算与恢复证明见 [[3.3]] 和 [[counting-algorithm-overview#^subsec-preview-interpolation|计数算法示例]]。

## 五步构造

^subsec-preview-auxiliary

考虑 $X_v$ 在某个子句中的一次出现。在 $T=0$ 处，它的替代必须等于 $X_v$。在每个 $t=1,\ldots,Q$ 处，该子句必须能够仅利用分配给它的组和少量共享测量来求出同一个替代的值。在每个点选择不同的线性形式再进行插值，通常需要次数为 $Q$ 的多项式。为了降低 Taylor 恢复的成本，我们需要次数 $R$ 远小于 $Q$。

假设替代中的某一项仅在 $t=2$ 处使用了子句所属组之外的变量。将该项乘以 $1-T/2$，会使它在 $T=0$ 处保持不变，而在 $t=2$ 处消失。在其他每个求值点，该变量都属于子句的指定组。对于多个这样的点，同样的技巧也有效：每个点对应一个因子，每个因子使多项式次数增加一。因此，难点在于把每个输入写成一个和，其中一部分由共享测量确定，而其余每一项仅在少数点使用所属组之外的变量。我们先在记录分组选择的辅助坐标上构造这样的分解，然后代入公式的变量。

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

令 $\vec\zeta=(\zeta_w)_{w\in\mathcal B}$ 为辅助形式坐标向量；这些坐标暂时独立，步骤 4 再把原变量填入。以下矩阵、行空间和核均在 $\mathbb Q$ 上考虑，线性恒等式也可对任意 $\vec\zeta\in\mathbb Q^{\mathcal B}$ 求值。在点 $t$ 处，坐标 $\zeta_w$ 属于组 $a_w(t)$，而 $\zeta_u$ 的替代被分配给组 $d_u(t)$。因此，该替代可以自由使用的坐标是

$$
\mathcal S_{t,d_u(t)},\qquad
 \mathcal S_{t,g}:=\{w\in\mathcal B:a_w(t)=g\}.
$$

特别地，$\zeta_w$ 属于所分配的组，当且仅当 $a_w(t)=d_u(t)$。各集合 $\mathcal S_{t,g}$ 将 $\mathcal B$ 划分为若干组，每组有 $D/r$ 个坐标。

我们的辅助目标是构造系数行 $\vec P_u(T)\in\mathbb Q[T]^D$ 和一个有 $c$ 行的矩阵，其中 $c$ 为非负整数：

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

同一组测量 $C\vec\zeta$ 服务于每一行和每个求值点。这是第 [[shared-linear-design#^subsec-preview-separation|2.4]] 节设计中依赖条件的辅助版本。

**步骤 2：构造常数矩阵。**

对于待构造的 $M_0\in\mathbb Q^{D\times D}$，先考虑以下恒等式，其中 $I_D$ 是 $D$ 阶单位矩阵：

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

其中我们将选择一个次数至多为 $R-1$ 的有理多项式 $f\in\mathbb Q[z]$。完全交换 $V_0$ 已经符合每个分组要求：它在行 $u$ 中的非零元位于满足下式的列 $w$：

$$
(a_w(s),d_w(s))=(d_u(s),a_u(s))\quad\text{对每个 }s.
$$

特别地，$E_{u,w}$ 为空。

乘以 $f(W_0)$ 可以撤销某些交换，但 $f$ 的次数限制了可撤销的数量。将 $f(W_0)$ 展开，可写成若干交换矩阵乘积的线性组合，其中每个乘积至多含 $R-1$ 个交换矩阵。重复的交换会因 $\Pi_s^2=I_D$ 而抵消。因此，乘以 $V_0$ 后得到

$$
M_0=\sum_{\substack{S\subseteq[Q]\\|S|\le R-1}}
             \gamma_S\prod_{s\notin S}\Pi_s
 \qquad\text{对某些 }\gamma_S\in\mathbb Q.\tag{2.15}
$$

^eq-overview-partial-swaps

由 $S$ 索引的加项中的置换会交换 $S$ 之外的每一对。因此，其非零元对于每个 $s\notin S$ 都满足 $a_w(s)=d_u(s)$，从而 $E_{u,w}\subseteq S$。只要 $|E_{u,w}|>R-1$，每个加项都为零，因而它们的和也为零。这就证明了，对于任意次数至多为 $R-1$ 的多项式 $f$，[[replacement-form-construction#^eq-outline-matrix-conditions|（2.14）]] 中的第二个条件均成立。

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

*测量异常方向。* 用其余基向量的转置作为 $C$ 的各行。它们的元素属于 $\{0,1,-1\}$；由正交性，$\ker C$ 由上面被固定的基向量张成。这证明了 [[replacement-form-construction#^eq-outline-matrix-conditions|（2.14）]] 中的第一个条件。

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

这个多项式在 $T=0$ 处等于一，并在 $\zeta_w$ 位于所分配组之外的每个点处为零。用以下恒等式定义系数行 $\vec P_u(T)$：

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

所以，该替代使用的恰好是 [[replacement-form-construction#^eq-overview-auxiliary-requirement|（2.13）]] 所允许的那些类型的数据。

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

令 $h$ 为获得同一个标签的出现次数的最大值。我们既需要变量组小，也需要 $h$ 小。对于我们这个每个变量至多出现三次、子句宽度至多为三的公式，引理 [[4.5#^lem-incidence-labels|4.5]] 可以在多项式时间内确定性地选择调度，使得

$$
|S_{t,g}|\le2n/r,\qquad h\le2M/D,
$$

条件是

$$
12D^2\le M,\qquad 2Qr^2\le n.\tag{2.17}
$$

^eq-overview-balance-requirements

其思路是将随机选择调度的过程去随机化。如果所有 $a_v$ 和 $d_e$ 都从 $[r]^Q$ 中独立、均匀地选取，则每个标签的期望重数为 $M/D$，而每个组 $S_{t,g}$ 的期望大小为 $n/r$。在 [[replacement-form-construction#^eq-overview-balance-requirements|（2.17）]] 的假设下，标准的条件期望方法可以在多项式时间内将此选择去随机化，保证每个标签的重数至多为 $2M/D$，且每组大小至多为 $2n/r$。步骤 5 将验证我们的参数选择满足这些假设。

不同的出现可以获得相同的标签，却要求在该坐标放置不同的原变量。使用 $\mathcal B$ 的 $h$ 个副本，将标签相同的出现放在不同副本中。令 $j(e,v)\in[h]$ 表示 $(e,v)$ 所用的副本；在其坐标 $u(e,v)$ 处放置 $X_v$，并在未使用的位置放置零。用 $\vec\zeta^{(j)}(\vec X)$ 表示副本 $j$ 中填入这些值后所得的向量。每个分量都是零或一个原变量。$X_v$ 重复出现时使用相同的值，因此这些副本没有引入新的布尔变量。

将辅助行应用于包含该次出现的副本：

$$
\langle\vec P_{e,v}(T),\vec X\rangle
 =\left\langle\vec P_{u(e,v)}(T),
                  \vec\zeta^{(j(e,v))}(\vec X)\right\rangle.\tag{2.18}
$$

^eq-overview-transferred-row

在 $T=0$ 处，右侧等于被填入 $X_v$ 的那个坐标的值；代入变量会保持次数上界 $R-1$。在点 $t$ 处，除共享测量外，它所依赖的坐标只对应满足 $a_{v'}(t)=d_e(t)$ 的原变量 $v'$。这些恰好是分配给该子句的组 $S_{t,d_e(t)}$ 中的变量。子句 $e$ 的所有出现都使用同一个所分配的组。

其余依赖通过 $h$ 个副本中的 $hc$ 个线性测量 $C\vec\zeta^{(j)}(\vec X)$ 产生。这些测量可能涉及多个原变量组。固定一个诸如 $x_1+x_2$ 的总和，仍然会使分别包含 $x_1$ 和 $x_2$ 的两个组相互耦合。因此，我们将每个测量拆成各个组的贡献。对于每个测量 $\ell(\vec X)$，写成

$$
\ell(\vec X)=\sum_{g=1}^r
        \ell|_{S_{t,g}}(\vec X|_{S_{t,g}}),
$$

并将这些限制的系数行收集到 $C_{t,g}$ 中。现在，每个辅助测量都是组测量的和。对于分配给组 $g$ 的子句，来自 $S_{t,g}$ 的部分是局部线性形式，而其他每一部分都是相应组的测量的线性组合。这正是 [[shared-linear-design#^eq-outline-separation|（2.5）]] 中的条件。

总共有 $rhc$ 行。由于 $hD\le2M\le6n$，

$$
\sum_{g=1}^r c_{t,g}
 =rhc\le rh\frac{D\tau}{3r}\le2\tau n.
$$

$C$ 的每一行有 $D$ 个属于 $\{0,1,-1\}$ 的元素。代入变量后，在每一行内合并对应同一原变量的坐标系数，再限制到某个组，都不会增加该行系数的绝对值之和。因此，$C_{t,g}$ 的每一行都是整数行，且系数绝对值之和至多为 $D$。再结合组大小上界，就证明了这些替代形式在每个点都具有一个 $(r,\tau,D)$-设计。

**步骤 5：验证所承诺的参数界。**

这一构造需要两个平衡不等式 [[replacement-form-construction#^eq-overview-balance-requirements|（2.17）]] 以及尾界 $2e^{-R^2/(8Q)}\le\tau/(3r)$。现在我们选择具有 [[counting-algorithm-overview#^eq-overview-parameter-bounds|（2.10）]] 中所述数量级的参数，并验证这些要求。

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

这些参数具有 [[counting-algorithm-overview#^eq-overview-parameter-bounds|（2.10）]] 中所述的数量级。对于充分大的 $n$，有 $r\ge2$、$R\ge32$ 以及 $6R\le Q$，因为 $R/Q=O(\nu/\sqrt\lambda)\to0$。我们依次检查其余要求：

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

最后，所有构造维数都以 $n$ 的多项式为界。引理 [[4.6#^lem-row-coefficients|4.6]] 给出步骤 2–3 中矩阵与行的多项式构造时间，引理 [[4.5#^lem-incidence-labels|4.5]] 则给出步骤 4 中调度的多项式构造时间。转移过程仅使用 $hD\le6n$ 个坐标位置。因此，我们已经在多项式时间内构造出替代形式，它们在 $T=0$ 处恢复每个原输入，次数至多为 $R-1\le R$，并且在每个 $t\in[Q]$ 处都具有所承诺的 $(r,\tau,D)$-设计。这给出了第 [[counting-algorithm-overview#^subsec-preview-parameters|2.6]] 节所用的界；引理 [[4.8#^lem-incidence-parameters|4.8]] 记录了完整证明中更一般情形的参数检查。



### 矩阵的秩与支撑分别控制什么

^subsec-related-spectral

原计数是多项式乘积对布尔赋值的总和；不同因子共享变量时，一般不能将它直接写成不交变量组上的独立求和之积。上述构造给出依赖插值参数 $T$ 的线性替代，使得固定各组的整数测量值后，变换后的因子分别只依赖其指定组内的变量。

辅助有理方阵 $M_0$ 同时承担两个作用：$I_D-M_0$ 的各行属于 $C$ 的行空间，因此 $\operatorname{rank}(I_D-M_0)\le c$，这部分依赖由少量测量 $C\vec\zeta$ 确定；$M_0$ 的非零条目只连接在至多 $R-1$ 个点上不匹配的标签，因而消去这些依赖所用的多项式次数至多为 $R-1$。

步骤 2 在短整数区间上插值 $f(j)=(-1)^j$，再将 $f$ 作用于由两两交换的置换矩阵组成的 $W_0$。同一个多项式的插值条件控制被固定的基方向数量，而它的次数控制非零条目的位置。这两项性质的一般版本分别由 [[4.1]] 和 [[4.2]] 证明，辅助替代行的性质由 [[4.3]] 证明。

## 一般因子作用域的构造接口

^sec-construction

现在将子句索引 $e$ 换成一般因子索引 $f$。给定有限因子族 $(\Phi_f)_{f\in\mathcal F}$ 及每个因子的指定输入下标集合 $I_f\subseteq[n]$，称 $I_f$ 为其作用域。因子是这些输入变量上的多项式，可以不实际依赖作用域中的某些变量。构造只读取各个集合 $I_f$，不使用多项式的系数。对于 [[2.2|稀疏多项式方程计数]] 的应用，一个因子对应一个多项式方程，其作用域是各个单项式所含变量下标集合的并。

对每个关联 $(f,v)$，即 $f\in\mathcal F$、$v\in I_f$，需要构造一条替代行 $\vec P_{f,v}(T)$。它在因子 $f$ 中将输入 $x_v$ 替换为 $\langle\vec P_{f,v}(T),x\rangle$。我们还构造变量划分 $S_{t,g}$、指定组编号 $\sigma_f(t)$ 和整数测量矩阵 $C_{t,g}$，其输入、输出及分离条件与前面对子句列出的目标相同；精确条件和系数表示要求见 [[shared-linear-design#^def-layout|定义 3.1]]。

主要困难仍是在 $R$ 远小于 $Q$ 时保持 $\deg\vec P_{f,v}\le R$。前面已经说明，计数多项式 $H$ 的次数界随 $R$ 线性增长，因此较小的 $R/Q$ 能降低每个点所需的 Taylor 系数数目。若在 $T=0,1,\ldots,Q$ 处独立选择各行再插值，通常会得到次数为 $Q$ 的多项式；构造因而联合安排所有这些点处的值。

与五步示例相同，先在完整的辅助坐标数组上构造多项式行，再将每个关联放入该数组的一个副本。多个位置可以包含同一个布尔变量 $x_v$，但都取同一个值，因此不增加计数求和中的独立变量。

### 一般作用域、标签与辅助坐标

^subsec-incidence-layout

先记录作用域及其关联次数的界，再定义辅助坐标集。对于给定的作用域 $(I_f)_{f\in\mathcal F}$，记

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

下述一般辅助坐标构造始终假设 $r\ge2$ 和 $1\le R<Q$ 为整数，且 $0<\tau\le1/2$。

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

这里把五步示例中由 $Q$ 对条目组成的标签，改写成两条长度为 $Q$ 的序列，两个坐标集自然对应。辅助向量 $\zeta\in\mathbb Q^{\mathcal B}$ 对每个二元组 $u$ 都有一个有理数坐标 $\zeta_u$。当 $\zeta$ 变化时，标签 $u$ 保持固定。对 $t\in[Q]$ 和 $g\in[r]$，定义

$$
S^{\mathcal B}_{t,g}=\{u\in\mathcal B:a_u(t)=g\}.\tag{4.3}
$$

^eq-auxiliary-groups

对于固定的 $t$，这些集合将 $\mathcal B$ 划分成 $r$ 个大小为 $D/r$ 的集合。

令 $\delta_u$ 表示第 $u$ 个标准基行，即提取坐标 $\zeta_u$ 的行。对每个 $u\in\mathcal B$，我们寻求一个次数至多为 $R-1$、满足 $\vec{P}_u(0)=\delta_u$ 的多项式行 $\vec{P}_u(T)\in\mathbb Q[T]^{1\times\mathcal B}$。在 $T=t$ 处，值 $\langle \vec{P}_u(t), \zeta\rangle$ 应由

$$
\zeta|_{S^{\mathcal B}_{t,d_u(t)}}
 \quad\text{和}\quad C^{\mathcal B}\zeta
$$

确定，其中 $C^{\mathcal B}$ 是一个与 $u,t$ 无关的整数矩阵，其元素属于 $\{0,1,-1\}$，并且行数很少。之后，使用 $u_{f,v}=(a_v,d_f)$ 将使因子 $f$ 的每个输入都使用组 $d_f(t)$。$a_v,d_f$ 的选取以及它们在各副本中的放置，分别留待第 [[4.5#^subsec-choosing-labels|4.4]] 节和第 [[4.7#^subsec-embedding|4.5]] 节处理。

一般参数下仍采用步骤 2 中的交换矩阵：$\Pi_s$ 交换标签中第 $s$ 对条目，$V_0=\prod_s\Pi_s$，$W_0=\frac12\sum_s(I-\Pi_s)$。取一个含 $R$ 个连续整数的区间 $\mathcal I\subseteq\{0,\ldots,Q\}$，令 $f_{\mathcal I}$ 为次数至多 $R-1$、在每个 $j\in\mathcal I$ 处满足 $f_{\mathcal I}(j)=(-1)^j$ 的插值多项式，并令 $M_0=V_0f_{\mathcal I}(W_0)$。

若正数 $\epsilon$ 满足

$$
\Pr\!\left[\operatorname{Bin}\!\left(Q,\frac{r-1}{2r}\right)\notin\mathcal I\right]\le\epsilon,
$$

则 [[4.1]] 给出一个行数至多为 $\epsilon D$ 的矩阵 $C^{\mathcal B}$，其条目属于 $\{0,1,-1\}$，且 $M_0$ 在它的核上恒等作用。[[4.2]] 给出非零条目所连接标签的不匹配位置数上界 $R-1$；[[4.3]] 由这两个性质构造并证明辅助行 $\vec P_u(T)$。标签选择与重数平衡见 [[4.5]]，辅助坐标向原变量的转移见 [[4.7]]。

下面给出一个仅含四个坐标的具体计算。它单独取 $Q=R=2$，用于展示替代和测量的关系，不用于满足 $R<Q$ 的运行时间参数选择。

> ##### 注 4.4
>
> 我们说明式 [[4.3#^eq-swaps-row|（4.10）]] 如何将对指定组以外的依赖限制为一个线性测量。取 $Q=R=2$，它不在运行时间界所用的 $R<Q$ 范围内，并取 $r=2$。以 $\{0,1\}$ 为组指标，并取 $\mathcal I=\{0,1\}$，于是 $f_{\mathcal I}(z)=1-2z$。标签 $(a,d)$ 的 $a,d$ 现在各为两个比特组成的序列；$\Pi_s$ 交换 $a$ 和 $d$ 的第 $s$ 个比特，其他比特不变。从标签 $(00,11)$ 出发，交换 $\Pi_1$、$\Pi_2$ 生成四个坐标：
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
> 它在 $T=0$ 处等于 $\zeta_0$，而
>
> $$
> \langle \vec{P}_u(1), \zeta\rangle=c(\zeta)+\frac12\zeta_1-\zeta_{12},\qquad
>  \langle \vec{P}_u(2), \zeta\rangle=c(\zeta)-\zeta_2-\zeta_{12}.
> $$
>
> 在 $t=1$ 处，$\zeta_1,\zeta_{12}$ 的标签满足 $a_y(1)=1=d_u(1)$。在 $t=2$ 处，$\zeta_2,\zeta_{12}$ 的标签满足 $a_y(2)=1=d_u(2)$。因此，固定 $c(\zeta)$ 后，$\langle \vec{P}_u(t), \zeta\rangle$ 就只依赖于其指定组中的坐标。这里，在四坐标限制上，$c(\zeta)$ 起到 $C^{\mathcal B}\zeta$ 的作用。在运行时间所用的一般参数范围中，完整构造必须以至多 $\epsilon D$ 个测量行，为每个 $u\in\mathcal B$ 提供这一性质；这里 $\epsilon$ 是上面给出的二项分布尾概率上界。

