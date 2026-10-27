---
id: translation-5
title: "原文中文译文 5 稀疏多项式方程公共零点的计数"
kind: translation
group: 原文中文译文
source_label: "5"
order: 104
publish: true
status: 原文中文译文（已审校）
---

## 5 稀疏多项式方程公共零点的计数

^sec-setup

现在证明定理 [[translation-2#^thm-overview-sparse-polynomials|2.2]]。输入是一个系统 $\mathcal P$，由 $n$ 个布尔变量上的 $m_{\mathrm{test}}\le cn$ 个 $\mathbb F_2$ 上的多项式方程 $P_i(x)=0$ 组成。对固定的 $k,c$，每个 $P_i$ 是一个至多含 $(\log n)^c$ 个、次数至多为 $k$ 的单项式的列表。我们的目标是整数

$$
N(\mathcal P)=\#\{x\in\{0,1\}^n:P_i(x)=0\text{ 对每个 }i\}.\tag{5.1}
$$

^eq-common-zero-count

首先，我们构造一个乘积，每个方程对应一个因子，其在布尔立方体上的值记录公共零点示性函数。困难在于使其总输入次数保持为关于 $n$ 的线性量。接下来，我们为这些因子构造替代形式，并使用第 [[translation-3#^sec-counting|3]] 节对该乘积求和。第 [[translation-6#^sec-hashes|6]] 节将所得算法用于任意给定的系统，包括仍然接受某个公式的不满足赋值的系统。

### 5.1 单个方程的整数多项式

^subsec-rational-lift

在布尔输入上，我们可以将每个正整数次幂 $x_v^j$ 替换为 $x_v$。模二合并重复的单项式。如果 $\mathcal M_i$ 是由此得到的 $P_i$ 的变量集合列表，则将其整数提升定义为

$$
L_i(\vec X)=\sum_{M\in\mathcal M_i}\prod_{v\in M}X_v .
$$

空单项式为 $1$，空和为 $0$。值 $L_i(x)$ 计数取值为一的单项式，因此 $P_i(x)=0$ 当且仅当 $L_i(x)$ 为偶数。记 $I_i=\bigcup_{M\in\mathcal M_i}M$。虽然 $L_i$ 可以读取 $k(\log n)^c$ 个变量，但其次数仍至多为 $k$。

令 $\ell=n+1$。由于 $0\le N(\mathcal P)\le2^n<2^\ell$，只需求出其模 $2^\ell$ 的余数。我们首先用一个整数多项式在模这一二的幂的意义下表示偶数示性函数。直接将 $m_{\mathrm{test}}$ 个这样的示性函数相乘，只能给出一个关于变量数的二次量级的次数界；下一个引理的形式将使我们能够同时控制所有方程的次数。

令 $h(Y)=Y(Y-1)$。对每个整数 $Y$，其值都是偶数。将示性函数写成 $h$ 的幂的形式，就能显露出乘积中每个 $h$ 副本所带来的一个因子二。

> ##### 引理 5.1
>
> 
> 
> ^lem-rational-idempotent
> 
> 
>
> 对每个整数 $\ell\ge1$，都可以构造多项式 $e_0,\ldots,e_{\ell-1}\in\mathbb Z[Y]$，每个的次数至多为一，使得
>
> $$
> p_\ell(Y)=\sum_{j=0}^{\ell-1}e_j(Y)h(Y)^j,
>  \qquad
>  p_\ell(y)\equiv\mathbb{1}_{\{2\mid y\}}\pmod{2^\ell}
>  \quad(y\in\mathbb Z).\tag{5.2}
> $$
> 
> ^eq-idempotent-expansion
> 
> 
>
> $e_j$ 的系数有 $\operatorname{poly}(\ell)$ 位，构造使用 $\operatorname{poly}(\ell)$ 次位运算和 $\operatorname{poly}(\ell)$ 位空间。

**证明。**

^proof-lem-rational-idempotent

令 $F_\ell$ 为 Beigel 和 Tarui 的模数放大多项式 〔[BT94](https://doi.org/10.1007/BF01263423 "原引用键 BT94")，第 2.3 节〕。Chan 和 Williams 将 $F_\ell$ 应用于子句违反示性函数之和，以确定性地计数满足赋值 〔[CW21](https://doi.org/10.1145/3402926 "原引用键 CW21")，定理 2.5 及定理 1.6 的证明〕。我们需要表示偶性的示性函数，因此取其补：

$$
p_\ell(Y)=1-F_\ell(Y)=(1-Y)^\ell
       \sum_{j=0}^{\ell-1}\binom{\ell+j-1}{j}Y^j.\tag{5.3}
$$

^eq-binary-indicator

该有限和是 $(1-Y)^\ell$ 模 $Y^\ell$ 的逆。事实上，$(1+Y+Y^2+\cdots)^\ell$ 中 $Y^j$ 的系数计数将 $j$ 分为 $\ell$ 个非负整数之和的有序分拆，等于 $\binom{\ell+j-1}{j}$。因此

$$
p_\ell(Y)\equiv1\pmod{Y^\ell},
 \qquad
 p_\ell(Y)\equiv0\pmod{(1-Y)^\ell}.
$$

对于偶数 $y$，第一个同余式给出 $p_\ell(y)\equiv1\pmod{2^\ell}$。对于奇数 $y$，第二个给出 $p_\ell(y)\equiv0\pmod{2^\ell}$。

多项式 $p_\ell$ 具有整数系数，且次数小于 $2\ell$。用首一二次多项式 $h=Y^2-Y$ 连续相除，可将其唯一写成 $\sum_{j<\ell}e_jh^j$，其中整数余式 $e_j$ 的次数小于二。引理 [[translation-B#^lem-rational-lift-height|B.1]]（位于附录 [[translation-B#^app-arithmetic|B]]）给出这些余式的系数界，并证明该构造的 $\operatorname{poly}(\ell)$ 位运算界。

∎

### 5.2 使乘积次数保持线性

完整乘积 $\prod_{i=1}^{m_{\mathrm{test}}} p_\ell(L_i(\vec{X}))$ 的次数至多为 $km_{\mathrm{test}}(2\ell-1)$。在整数自变量处，每个因子 $h(y)$ 都提供一个因子二，因此含有至少 $\ell$ 个这样的因子的项可以在模 $2^\ell$ 的意义下舍弃。这使我们能够仅保留跨所有方程的 $h$ 的总幂次小于 $\ell$ 的项。引入形式变量 $V$ 来记录该幂次，对每个方程使用同一个 $V$。它的指数记录在整数自变量处保证整除对应项的二的幂。它并不是一个需要求和的额外布尔变量。 我们在此选择第 [[translation-3#^subsec-product-interface|3.1]] 节中的系数代数：

$$
\mathcal A_\ell=\mathbb Q[V]/(V^\ell).
$$

在这一代数中，每次乘法都舍弃满足 $s\ge\ell$ 的幂 $V^s$。乘积形成之后，我们使用线性映射将保留的系数相加：

$$
\mathcal S_\ell\!\left(\sum_{s=0}^{\ell-1}b_sV^s\right)
 =\sum_{s=0}^{\ell-1}b_s .
$$

该映射不必保持乘积，因此只在各因子相乘之后应用。对于多项式系数 $b_s$，我们也使用同样的记号。

> ##### 引理 5.2
>
> 
> 
> ^lem-total-order
> 
> 
>
> 设 $m_{\mathrm{test}}\ge0$ 和 $\ell\ge1$ 为整数。对于整数 $y_1,\ldots,y_{m_{\mathrm{test}}}$，令
>
> $$
> B_i(V)=\sum_{j=0}^{\ell-1}e_j(y_i)h(y_i)^jV^j.
> $$
>
> 则
>
> $$
> \mathcal S_\ell\!\Bigl(\prod_{i=1}^{m_{\mathrm{test}}} B_i(V)\bmod V^\ell\Bigr)
>  \equiv\prod_{i=1}^{m_{\mathrm{test}}}\mathbb{1}_{\{2\mid y_i\}}\pmod{2^\ell}.
> $$
>
> 对于任意非负整数 $d_*$，如果将 $y_i$ 改为 $\mathbb Q$ 上总次数至多为 $d_*$ 的多项式，那么每个保留的 $V^s$ 的系数，因而也包括它们的和，其总输入次数均至多为 $d_*(m_{\mathrm{test}}+2(\ell-1))$。

**证明。**

^proof-lem-total-order

截断之前，对 $V^s$ 的系数有贡献的一个项具有形式

$$
\prod_{i=1}^{m_{\mathrm{test}}} e_{j_i}(y_i)h(y_i)^{j_i},
 \qquad \sum_{i=1}^{m_{\mathrm{test}}} j_i=s.
$$

在整数自变量处，它可被 $2^s$ 整除。因此，删去每个满足 $s\ge\ell$ 的系数，不会改变系数和模 $2^\ell$ 的值。若不截断，该和为 $\prod_i p_\ell(y_i)$，由引理 [[translation-5#^lem-rational-idempotent|5.1]] 可知它满足所需同余式。

对于多项式自变量，每个保留项都满足 $\sum_i j_i\le\ell-1$。由于 $\deg e_{j_i}\le1$ 且 $\deg h=2$，其次数至多为

$$
\sum_{i=1}^{m_{\mathrm{test}}} d_*(1+2j_i)
 \le d_*(m_{\mathrm{test}}+2(\ell-1)).
$$

该界对每个系数以及它们的和都成立。

∎

为理解为何截断使用跨所有方程的总阶数，取 $\ell=2$。则

$$
p_2(Y)=1-3Y^2+2Y^3=(1-Y)+(2Y-1)h(Y).
$$

对于两个方程，模 $V^2$ 相乘后再应用 $\mathcal S_2$，保留

$$
(1-y_1)(1-y_2)
 +(2y_1-1)h(y_1)(1-y_2)
 +(1-y_1)(2y_2-1)h(y_2).
$$

其次数至多为四。被略去的项 $(2y_1-1)(2y_2-1)h(y_1)h(y_2)$ 的次数为六，但在整数输入处可被四整除。

### 5.3 利用给定替代形式计数

^subsec-count-polynomial

对于方程 $i$，向第 [[translation-3#^sec-counting|3]] 节提供因子

$$
\mathcal B_i((X_v)_{v\in I_i},V)
 =\sum_{j=0}^{\ell-1}e_j(L_i(\vec X))h(L_i(\vec X))^j V^j
 \quad\text{在 }\mathcal A_\ell[(X_v)_{v\in I_i}]\text{ 中}.\tag{5.4}
$$

^eq-lifted-factor

在一个因子内部，$X_v$ 的每次出现都使用同一个替代形式；不同因子可以对 $X_v$ 使用不同的形式。即使每个因子都接收各自独立的输入，$L_i$ 关于这些输入的次数仍至多为 $k$。引理 [[translation-5#^lem-total-order|5.2]] 将乘积*在 $\mathcal A_\ell$ 中*的输入次数限制为 $d=k(m_{\mathrm{test}}+2(\ell-1))$。因此，该乘积恰好满足通用过程的次数假设 [[translation-3#^eq-general-product-degree|（3.2）]]。添加作用域为 $\{v\}$、取值为一的因子，可保证所有声明变量都出现在构造中。

令 $H(T)\in\mathcal A_\ell[T]$ 为对这些因子定义的 [[translation-3#^eq-general-count-polynomial|（3.3）]]。其在 $T=0$ 处的 $V$-系数为整数，因为所有替换都在零点恢复其布尔输入。由同一个引理，将这些系数的值相加得到

$$
\deg_T H\le d_H:=kR(m_{\mathrm{test}}+2(\ell-1)),\qquad
 \mathcal S_\ell(H(0))\equiv N(\mathcal P)\pmod{2^\ell}.\tag{5.5}
$$

^eq-origin-residue

因此，$\mathcal S_\ell(H(0))$ 的最小非负余数就是精确计数。插值在有理数上进行；仅在 $T=0$ 处的布尔输入上需要该同余关系。

### 5.4 因子求值的成本

^subsec-one-query-cost

> ##### 命题 5.3
>
> 
> 
> ^prop-count
> 
> 
>
> 给定 $n$ 个变量上次数至多为 $k$ 的多项式方程列表，以及一个对这些方程的因子满足定义 [[translation-3#^def-layout|3.1]] 的设计。令 $S\ge1$ 为单项式列表和因子作用域总长度的上界，并使用任意满足 $2^\ell>2^n$ 的 $\ell$。取 [[translation-5#^eq-origin-residue|（5.5）]] 中的 $d_H$ 和 [[translation-3#^eq-hasse-order|（3.5）]] 中的 $q,J$，则 $N(\mathcal P)$ 可以确定性地在
>
> $$
> \operatorname{poly}(n,m_{\mathrm{test}},\ell,D,Q,R,J,r,k,S)\,
>  C_q(2D+1)^{2\tau n}2^{2n/r}
> $$
>
> 次位运算和 $\operatorname{poly}(n,m_{\mathrm{test}},\ell,D,Q,R,J,r,k,S)$ 位工作空间内计算出来。

**证明。**

^proof-prop-count

应用命题 [[translation-3#^prop-general-count|3.4]]，系数取自 $\mathcal A_\ell$。在求值点 $t$ 处，该过程使用 $\mathcal A_\ell[z]/(z^J)$，因此一个被储存的元素只有 $J\ell$ 个有理系数。为在式 [[translation-3#^eq-jet-substitution|（3.7）]] 中固定的布尔代入 $\vec X=\mathbf1_U$ 处计算因子 $i$，首先将列表中每个单项式的至多 $k$ 个代入后的输入相乘来计算该单项式，再将结果相加，得到 $L_i$。在式 [[translation-5#^eq-lifted-factor|（5.4）]] 中使用这个值，通过连续乘以 $h(L_i)$ 来得到它的各次幂。这所需的有理数运算次数为所列参数的多项式，并且从不枚举整个作用域 $I_i$ 上的赋值。多项式 $e_j$ 由引理 [[translation-5#^lem-rational-idempotent|5.1]] 一次性计算。

对于位复杂度，各行具有公分母 $d_{\mathrm{den}}=(R-1)!Q!$。每个代入后的单项式的分母整除 $\Delta=d_{\mathrm{den}}^k$，每个提升后的因子的分母整除 $\Gamma=\Delta^{2\ell-1}$，而它们的乘积的分母整除 $\Omega=\Gamma^{m_{\mathrm{test}}}$。因此，可以在同一个分母下累加指数多个加项。附录 [[translation-B#^app-arithmetic|B]] 将这些求和中的位长度限制为

$$
B_{\mathrm{sum}}=\operatorname{poly}(n,m_{\mathrm{test}},\ell,k,Q,\log(D+2),\log(S+2)).\tag{5.6}
$$

^eq-sum-bit-bound

对于每个 $0\le s<\ell$，我们根据有理多项式 $[V^s]H(T)$ 的 $QJ$ 个 Taylor 系数对它进行插值。附录验证该插值以及式 [[translation-5#^eq-origin-residue|（5.5）]] 中最终的整数取余都具有多项式位运算成本。储存的 $O(QJ\ell)$ 个系数、该设计以及命题 [[translation-3#^prop-general-count|3.4]] 中的顺序枚举给出了所述空间界。

∎

### 5.5 构造形式并完成证明

^subsec-sparse-queries

每个稀疏多项式读取的变量很少，但同一个变量可能出现在许多方程中。我们首先固定少数出现次数最多的变量的值。在所得的每个分支上，我们都能构造命题 [[translation-5#^prop-count|5.3]] 所需的设计。

**定理 [[translation-2#^thm-overview-sparse-polynomials|2.2]] 的证明。**

^proof-thm-overview-sparse-polynomials

设 $\mathcal P$ 为给定的多项式系统。方程列表为空时有 $2^n$ 个公共零点；常数方程 $1=0$ 意味着没有公共零点。舍弃方程 $0=0$。对每个声明变量 $v$，加入一个取值为一、作用域为 $\{v\}$ 的中性因子，并记

$$
M=\sum_{f\in\mathcal F}|I_f|
$$

为因子–变量关联的总数。输入界蕴含 $M=n(\log n)^{O_{k,c}(1)}$，且每个作用域有 $(\log n)^{O_{k,c}(1)}$ 个变量。但是，某个特定变量可能出现在许多这样的作用域中。

令 $\lambda=\lceil\log_2 n\rceil$，并令

$$
b_0=\left\lceil\frac Mn\right\rceil\lceil\sqrt\lambda\rceil.
$$

设 $S\subseteq[n]$ 为属于超过 $b_0$ 个作用域的变量集合。对每个 $b\in\{0,1\}^S$，我们固定 $x|_S=b$ 并计数 $[n]\setminus S$ 上的补全赋值；我们称这一受限问题为一个分支。由于 $|S|\le M/b_0\le n/\sqrt\lambda$，分支至多有 $2^{n/\sqrt\lambda}$ 个。每个分支的自由变量个数均为同一个 $n'$，且

$$
n'\ge n-\frac n{\sqrt\lambda}\ge\frac n2
 \qquad(n\ge20).
$$

在 $\mathbb F_2$ 上，将固定的位代入每个 $P_i$，并在形成其整数提升之前模二合并重复的单项式。次数和单项式个数均不会增加。常数方程同样可以立即处理。各分支划分了布尔立方体，因此它们的公共零点计数之和为 $N(\mathcal P)$。

为应用第 [[translation-4#^sec-construction|4]] 节，从作用域中移除已固定的变量，并将自由变量重新标记为 $[n']$。用 $I'_f\subseteq[n']$ 表示受限后的作用域，用 $M'=\sum_f|I'_f|$ 表示其关联总数。令 $b$ 为一个自由变量的最大因子关联次数，并令 $w=\max_f|I'_f|$。则 $b\le b_0$，且 $b$ 和 $w$ 都由 $\log n'$ 的某个固定次幂所限制。剩余的中性因子保证 $M'\ge n'$。令

$$
\lambda'=\lceil\log_2 n'\rceil,\qquad
 \nu'=\lceil\log_2\lambda'\rceil,
$$

并选取满足 $b,w\le(\lambda')^\beta$ 的最小整数 $\beta\ge1$。对于固定的 $k,c$，在所有充分大的 $n$ 下，$\beta$ 的可能取值由一个常数所限制。我们将引理 [[translation-4#^lem-incidence-parameters|4.8]] 应用于 $[n']$ 上的受限作用域 $(I'_f)$，其关联数为 $M'$，使用

$$
r=\left\lfloor\frac{\sqrt{\lambda'}}{(\nu')^2}\right\rfloor,
 \qquad Q=\left\lfloor\frac{\lambda'}{128\nu'}\right\rfloor,
 \qquad R=(\beta+3)\lceil\sqrt{\lambda'}\rceil.
$$

如果 $r<2$ 或 $Q\le R$，则在形成 $\tau$、$\epsilon$ 或奇偶插值区间 $\mathcal I$ 之前，使用下述穷举搜索后备方案。否则，令

$$
\tau=\frac1{r\lambda'},\qquad
 \epsilon=\frac1{br^2\lambda'},\qquad D=r^{2Q},
$$

并执行该引理中的其余可行性检查。对于所有充分大的 $n$，引理 [[translation-4#^lem-layout|4.7]] 提供所需的行和测量矩阵，满足

$$
r=\Theta\!\left(\frac{\sqrt{\log n'}}{(\log\log n')^2}\right),
 \qquad Q=\Theta\!\left(\frac{\log n'}{\log\log n'}\right),
 \qquad R=O_{k,c}(\sqrt{\log n'}),
 \qquad D\le(2n')^{1/128}.
$$

在每个分支上，我们都可以使用原始精度 $\ell=n+1$，因为即使是未受限制的计数也小于 $2^\ell$。由于 $n'\ge n/2$，$\ell$ 和 $m_{\mathrm{test}}$ 都是 $O_c(n')$。因此，$d_H=O_{k,c}(n'R)$，$J=O_{k,c}(n'R/Q)+1$，而 [[translation-3#^eq-three-costs|（3.16）]] 在维数 $n'$ 下的指数为

$$
O_{k,c}\!\left(\frac{n'(\log\log n')^2}{\sqrt{\log n'}}\right)
 =O_{k,c}\!\left(\frac{n(\log\log n)^2}{\sqrt{\log n}}\right).
$$

所有代入数据、系数数组和插值系统的总表示长度为 $n^{O_{k,c}(1)}$ 位。将每个分支的运行时间乘以至多 $2^{n/\sqrt\lambda}$，不会改变上面显示的指数界，因此将各分支答案相加即可得到所要求的运行时间。

为使该构造适用于每一种输入大小，算法用整数算术检查其数值假设。除上述预先检查外，它还检查引理 [[translation-4#^lem-incidence-labels|4.5]] 中的 $2(b+w)D^2\le M'$ 和 $2Qr^2\le n'$、$\mathcal I$ 的端点、$R\ge32$、$6R\le Q$，以及式 [[translation-4#^eq-incidence-tail|（4.8）]] 中可以精确检验的二项分布尾概率界。如果任何检查失败，算法便放弃分支计算，直接在全部 $2^n$ 个赋值上检查原始方程。对于固定的 $k,c$，刚刚证明的界以及引理 [[translation-4#^lem-incidence-parameters|4.8]] 表明，只有有限多个 $n$ 会发生失败。因此，该后备方案被吸收在定理中的常数内。

为在所述空间界内合并分支计数，我们逐个处理分支。初始化整数累加器 $Z=0$，并将每个分支的答案加到其中。在每个分支上，该构造和命题 [[translation-5#^prop-count|5.3]] 使用 $n^{O_{k,c}(1)}$ 位空间。不交性保证始终有 $0\le Z\le2^n$，而最终值为 $N(\mathcal P)$，如所断言。

∎
