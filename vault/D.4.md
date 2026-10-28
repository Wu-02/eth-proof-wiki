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

本页证明 [[D.1|张量缩并]] 所用 Cauchy 变形的局部整性，并说明如何在给定精度下计算其条目。取全局规模 $s\ge2$，令 $\lambda=\lceil\log_2s\rceil$、$e=4\lambda$。选择次数为 $e$ 的首一多项式 $f\in\mathbb Z[U]$，使其余系数均为 $0$ 或 $1$，且模二约化不可约。令

$$\mathcal O=\mathbb Z_{(2)}[U]/(f),\qquad \mathcal K=\mathbb Q[U]/(f),\qquad \mathcal A=\mathcal O[V]/(V^\ell).$$

这里 $\mathbb Z_{(2)}$ 是分母为奇数的有理数所成的环，$\ell\ge1$ 是 $V$ 的截断阶数。用基 $1,U,\ldots,U^{e-1}$ 表示 $\mathcal K$ 中的元素；对非零元素，$v_2$ 是各坐标的通常 2-进赋值的最小值。整性和模 $2^p$ 的精度都按各坐标理解。

固定当前递归调用的二分张量网络，记行侧顶点集为 $\mathcal R$，列侧顶点集为 $\mathcal C_{\mathrm{vert}}$。网络有 $M$ 条边，每条边在两侧各对应一个张量端口，所以两侧各有 $M$ 个端口；平行边使用不同端口。用边的编号 $j\in[M]$ 同时编号它两端的端口，则原网络要求两侧同编号的端口取相同比特值。对每个顶点 $v$，用 $I_v\subseteq[M]$ 记录其端口编号，并为这些端口固定次序。给定各端口的比特值后，张量 $T_v$ 就给出相应条目。

按 [[D.3]] 的方法将边分组并编号。用 $\kappa(j)$ 记录边 $j$ 所属的组，用 $\sigma(j)\in\{0,\ldots,L-1\}$ 记录它在组内的编号，其中 $a\ge0$ 为整数，$L=2^a\le s^{1/1000}$。同组中不同边的编号互不相同，每条边两端的端口使用相同的 $\kappa(j)$ 和 $\sigma(j)$。组内可以有编号未分配给任何边，这些编号不对应端口。全体行、列端口仍用 $j,k\in[M]$ 编号，对应的组内编号记为 $x=\sigma(j)$、$y=\sigma(k)$。

令 $S=\{-L,-L+1,\ldots,L-1\}$、$\alpha=2^{a+1}$、$\mathcal C(T)=\prod_{t\in S}(T-t)$。当 $\kappa(j)=\kappa(k)$ 时，定义

$$W_{jk}(T)=\frac{\mathcal C(T)}{\mathcal C'(0)(T-(\sigma(k)-\sigma(j)))};$$

不同组的端口之间，条目设为零。对同组端口，也用组内编号把条目记为 $W_{xy}(T)$。由于 $y-x\in S$，分母中的 $T-(y-x)$ 可与分子中的同一因子约去，所以 $W_{xy}(T)$ 是多项式，在 $S$ 中的各点都有定义。同组中不同边的编号互不相同，因此按原边编号配对两侧端口时，有 $W(0)=I_M$。

每个张量 $T_v$ 的条目原本属于商环 $\mathcal A_{p_c(v)}=\mathcal A/(2^{p_c(v)})$，其中正整数 $p_c(v)$ 是张量创建时的精度。将条目在基 $U^iV^h$（$0\le i<e$、$0\le h<\ell$）下的每个坐标取为 $0,\ldots,2^{p_c(v)}-1$ 中的整数代表，就得到取值于 $\mathcal A$ 的张量 $\widehat T_v$。本次调用始终使用这些固定的整数代表；逐条目提升不要求保持加法或乘法。

给行、列端口分别赋值 $Y\in\{0,1\}^M$、$X\in\{0,1\}^M$，暂不要求两侧同编号端口的值相同。令

$$A(Y)=\prod_{v\in\mathcal R}\widehat T_v(Y|_{I_v}),\qquad B(X)=\prod_{v\in\mathcal C_{\mathrm{vert}}}\widehat T_v(X|_{I_v}).$$

孤立顶点的 $I_v$ 为空，它的张量是标量，也作为因子计入相应乘积。因而 $A(Y),B(X)\in\mathcal A$。再令 $l_0(z)=1-z$、$l_1(z)=z$，并定义

$$F(T)=\sum_{X,Y\in\{0,1\}^M}A(Y)B(X)\prod_{j=1}^M l_{Y_j}((W(T)X)_j).$$

$F$ 属于 $(\mathcal K[V]/(V^\ell))[T]$，次数至多为 $M(2L-1)$。在 $T=0$ 处，最后的乘积在 $X=Y$ 时为 $1$，否则为 $0$，所以 $F(0)$ 等于提升后的张量沿原边缩并的结果。

对每个节点 $t\in S$，下面使用局部坐标 $T=t+\alpha z$。求值时，输入 $\zeta\in\mathcal O$ 以模 $2^p$ 的 $e$ 个坐标给出，其中整数 $p\ge1$ 为求值精度。

> ##### 引理 D.4
>
> ^lem-tensor-integrality
>
> 对每个 $t\in S$，$W(t+\alpha z)$ 的各条目都属于 $\mathcal O[z]$，且 $F(t+\alpha z)\in\mathcal A[z]$。给定 $\zeta$ 模 $2^p$ 的 $e$ 个坐标，就能求出每个条目 $W_{xy}(t+\alpha\zeta)\bmod2^p$，所需位运算次数以 $s,p$ 的某个多项式为上界。

**证明。**

^proof-lem-tensor-integrality

$S$ 是模 $2^{a+1}$ 的完全剩余系。固定 $t\in S$，对所有 $q\in S\setminus\{t\}$，都有 $v_2(t-q)\le a$。对每个 $j=0,\ldots,a$，满足 $v_2(t-q)=j$ 的 $q$ 的个数都与 $t$ 无关。因此 $v_2(\mathcal C'(t))=v_2(\mathcal C'(0))$。考虑

$$
\frac{\mathcal C(t+\alpha z)}{\mathcal C'(0)}
  =\frac{\alpha z\prod_{q\in S\setminus\{t\}}
                         (t-q+\alpha z)}{\mathcal C'(0)}.
$$

对每个 $q\ne t$，因子 $t-q+\alpha z$ 的两个系数都可被 $2^{v_2(t-q)}$ 整除。把这些二的幂与分母中的二的幂约去后，分母只剩奇数，而分子还含有 $\alpha z$。因此，上式的所有系数都属于 $2^{a+1}\mathcal O$。

要得到 [[D.1#^eq-tensor-cauchy|（D.7）]] 中的 $W_{xy}(t+\alpha z)$，还需从分子中去掉 $q=y-x$ 对应的因子。若 $y-x=t$，去掉的是 $\alpha z$，剩下的多项式仍属于 $\mathcal O[z]$。否则，$\alpha z$ 仍在，去掉的因子所含的二的幂为 $2^{v_2(t-y+x)}$，而 $v_2(t-y+x)\le a$，所以剩下的多项式甚至仍属于 $2\mathcal O[z]$。这就证明了 $W$ 的局部整性。

将这些条目代入本页定义的 $F$，也就是式 [[D.1#^eq-tensor-deformed-contraction|（D.8）]]。由于 $A(Y),B(X)\in\mathcal A$，而定义式只作有限次加法和乘法，可得 $F(t+\alpha z)\in\mathcal A[z]$。

求值可以沿用上述约分过程。先将每个保留的因子 $t-q+\alpha z$（$q\ne t$）除以 $2^{v_2(t-q)}$，所得一次多项式的两个系数都是整数。再约去分子、分母中剩余的二的幂，对分母的奇数部分模 $2^p$ 求逆。最后代入给定的 $\zeta\bmod2^p$，即可求出条目值；$\zeta=0$ 也不例外。输入的坐标共占 $ep$ 位，乘积中只有 $O(L)$ 个因子，全部坐标运算只需关于 $s,p$ 的多项式时间。

∎
