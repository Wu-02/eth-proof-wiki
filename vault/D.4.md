---
id: "D.4"
title: "引理 D.4：Cauchy 变形的二进整性"
group: "张量缩并"
kind: "引理"
status: 完整证明整合稿
source_label: "D.4"
tex_label: "lem:tensor-integrality"
publish: false
source_pages: [59, 60]
depends_on: []
---

# 引理 D.4：Cauchy 变形的二进整性

本页证明 [[D.1|张量缩并]] 中 Cauchy 变形的局部整性。全局 $s\ge2$、$\lambda=\lceil\log_2s\rceil$、$e=4\lambda$；$f\in\mathbb Z[U]$ 是次数 $e$ 的首一多项式，首项以下系数为 $0$ 或 $1$，模二约化不可约。令

$$\mathcal O=\mathbb Z_{(2)}[U]/(f),\qquad \mathcal K=\mathbb Q[U]/(f),\qquad \mathcal A=\mathcal O[V]/(V^\ell).$$

其中 $\mathbb Z_{(2)}$ 由分母为奇数的有理数组成，$\ell\ge1$ 为 $V$ 的截断阶；$\mathcal O$ 以 $1,U,\ldots,U^{e-1}$ 为坐标基。对非零元素，$v_2$ 是这些有理坐标的2-进赋值最小值。整性和模 $2^p$ 的精度均逐坐标理解。

固定递归中的当前二分张量网络。它有行侧顶点集 $\mathcal R$、列侧顶点集 $\mathcal C_{\mathrm{vert}}$ 和 $M$ 条编号边。每条边连接一个行端口与一个列端口，所以两侧各有 $M$ 个真实布尔端口；平行边仍使用不同的端口。用原边编号 $j\in[M]$ 同时编号两侧端口，从而原边配对就是两侧同编号端口的配对。对每个顶点 $v$，以有序集合 $I_v\subseteq[M]$ 记录其关联端口；其张量为这些端口的每个布尔取值指定一个条目。

固定 [[D.3]] 给出的分包：每条边分配一个包号 $\kappa(j)$ 和一个包内槽号 $\sigma(j)\in\{0,\ldots,L-1\}$，其中 $a\ge0$ 为整数且 $L=2^a\le s^{1/1000}$。同一包中不同真实边占据不同槽位；一条边的两端有相同的包号和槽号，空槽位不产生端口。全局行、列索引用 $j,k\in[M]$，相应的局部槽号为 $x=\sigma(j)$、$y=\sigma(k)$。

令 $S=\{-L,-L+1,\ldots,L-1\}$、$\alpha=2^{a+1}$、$\mathcal C(T)=\prod_{t\in S}(T-t)$。当 $\kappa(j)=\kappa(k)$ 时定义

$$W_{jk}(T)=\frac{\mathcal C(T)}{\mathcal C'(0)(T-(\sigma(k)-\sigma(j)))};$$

不同包之间的条目为零。也将同包条目按局部槽号记为 $W_{xy}(T)$。分母中的 $T-(y-x)$ 与分子约去，所以这是多项式，而不是在网格点有未定义值的有理函数。槽位不重复保证在原边配对下 $W(0)=I_M$。

每个张量 $T_v$ 的原条目属于商环 $\mathcal A_{p_c(v)}=\mathcal A/(2^{p_c(v)})$，其中正整数 $p_c(v)$ 是其创建精度。将条目在坐标基 $U^iV^h$（$0\le i<e$、$0\le h<\ell$）下的每个剩余类，选为 $0,\ldots,2^{p_c(v)}-1$ 中的整数代表，得到条目取值于 $\mathcal A$ 的提升张量 $\widehat T_v$。本次调用的所有后续求值都固定使用这些逐条目提升；该选择不要求保持环的加法或乘法。

对于相互独立的行端口赋值 $Y\in\{0,1\}^M$ 和列端口赋值 $X\in\{0,1\}^M$，令

$$A(Y)=\prod_{v\in\mathcal R}\widehat T_v(Y|_{I_v}),\qquad B(X)=\prod_{v\in\mathcal C_{\mathrm{vert}}}\widehat T_v(X|_{I_v}).$$

孤立顶点的 $I_v$ 为空，其张量贡献相应的标量条目。于是 $A(Y),B(X)\in\mathcal A$。再令 $l_0(z)=1-z$、$l_1(z)=z$，并定义

$$F(T)=\sum_{X,Y\in\{0,1\}^M}A(Y)B(X)\prod_{j=1}^M l_{Y_j}((W(T)X)_j).$$

它属于 $(\mathcal K[V]/(V^\ell))[T]$，次数至多为 $M(2L-1)$。在 $T=0$ 处，乘积为 $X=Y$ 的指示值，所以 $F(0)$ 是所选提升张量沿原边配对的缩并。下述引理对每个网格点 $t\in S$ 使用局部坐标 $T=t+\alpha z$；求值输入 $\zeta\in\mathcal O$ 以模 $2^p$ 的 $e$ 个坐标给出，$p\ge1$ 是该次求值的精度。

> ##### 引理 D.4
>
> 
> 
> ^lem-tensor-integrality
> 
> 
>
> 对于每个 $t\in S$，$W(t+\alpha z)$ 的条目属于 $\mathcal O[z]$， 且 $F(t+\alpha z)$ 属于 $\mathcal A[z]$。 给定 $\zeta$ 模 $2^p$ 的 $e$ 个坐标， 每个条目 $W_{xy}(t+\alpha\zeta)\bmod 2^p$ 都可以用 关于 $s,p$ 的多项式次位运算计算出来。

**证明。**

^proof-lem-tensor-integrality

网格 $S$ 是模 $2^{a+1}$ 的一个完全剩余系。 对于 $S$ 中的 $t\ne q$，有 $v_2(t-q)\le a$， 且在每个2-进赋值层级上的非零差数目都与 $t$ 无关。 因此 $v_2(\mathcal C'(t))=v_2(\mathcal C'(0))$。 在

$$
\frac{\mathcal C(t+\alpha z)}{\mathcal C'(0)}
  =\frac{\alpha z\prod_{q\in S\setminus\{t\}}
                         (t-q+\alpha z)}{\mathcal C'(0)},
$$

中，每个由 $q\ne t$ 索引的因子均逐系数可被 $2^{v_2(t-q)}$ 整除。 将这些幂与分母约去后，上式中的多项式可被 $2^{a+1}$ 整除。 要得到 [[D.1#^eq-tensor-cauchy|（D.7）]]，只需去掉由 $y-x$ 索引的因子。 若 $y-x=t$，则去掉的是 $\alpha z$，剩下一个具有整性的多项式。 否则，$\alpha z$ 仍保留，而所去掉因子的二进系数公因子为 $2^{v_2(t-y+x)}$，其中 $v_2(t-y+x)\le a$，所以结果仍可被二整除。 将这些条目代入本页给出的 $F$ 的定义（式 [[D.1#^eq-tensor-deformed-contraction|（D.8）]]）。每个 $A(Y),B(X)$ 都属于 $\mathcal A$，而 $\mathcal A[z]$ 对有限次加法和乘法封闭，故 $F(t+\alpha z)\in\mathcal A[z]$。

求值时，首先将每个满足 $q\ne t$ 的因子 $t-q+\alpha z$ 除以已知整数 $2^{v_2(t-q)}$。所得一次多项式的两个系数都是整数。 然后如上所述，将剩余的显式二的幂与分母约去，并对分母的奇数部分模 $2^p$ 求逆。 将给定的 $\zeta$ 模 $2^p$ 的剩余类代入该乘积，即可计算其值，包括 $\zeta=0$ 的情形。 输入有 $ep$ 位，而乘积有 $O(L)$ 个因子。 所有坐标运算都使用关于 $s,p$ 的多项式时间。

∎

