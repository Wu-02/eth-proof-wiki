---
id: translation-6
title: "原文中文译文 6 将#k-SAT归约为公共零点计数"
kind: translation
group: 原文中文译文
source_label: "6"
order: 105
publish: true
status: 原文中文译文（已审校）
---

## 6 将$\#k$-SAT归约为公共零点计数

^sec-hashes

^subsec-sparse-hashes

给定一个至多有 $Bn$ 个子句的稀疏 $k$-CNF $F$，其中 $B$ 关于 $n$ 呈多对数级增长，我们在其原来的 $n$ 个变量上构造 $O(n)$ 个稀疏多项式方程，使它们的公共零点恰好是其满足赋值。若每个子句对应一个方程，可能需要 $Bn$ 个方程。这里改为让每个方程检验一个短子句列表中违反情况的奇偶性。我们既使用定理 [[translation-2#^thm-overview-sparse-polynomials|2.2]] 来选择这些方程，也使用它得到最终计数。

设 $m$ 为已编号子句的个数，$v_e(x)$ 为子句 $e$ 的违反位。作为 $\mathbb F_2$ 上的多项式，$v_e$ 是正文字对应的因子 $1+x_v$ 和负文字对应的因子 $x_v$ 的乘积。重言式子句满足 $v_e=0$，空子句满足 $v_e=1$。去除重复文字后，$\deg v_e\le k$，且 $v_e$ 展开后至多有 $2^k$ 个单项式。令 $v(x)=(v_1(x),\ldots,v_m(x))$。对于一个有 $m$ 列的二元矩阵 $A$，第 $i$ 行指定方程

$$
P_i(x):=\sum_{e:A_{ie}=1} v_e(x)=0\qquad\text{在 }\mathbb F_2\text{ 上}.\tag{6.1}
$$

^eq-hash-query

用 $\mathcal P_A$ 表示此方程组，用 $N(A)=N(\mathcal P_A)$ 表示其公共零点数。每个满足赋值都通过每一行的检验。因此 $N(A)=\#F+D(A)$，其中 $D(A)$ 计数仍然通过检验的非满足赋值。我们不知道 $\#F$，但对于下一行的每个候选，它都相同：使 $N$ 最小的行也使 $D$ 最小。

我们用一个二元组 $(e,c)$ 的列表表示检验行，其中 $e\in[m]$ 且 $c\in\{0,1\}$；若某个子句编号重复，则将其系数按模 $2$ 相加。列表长度计入全部二元组，包括重复编号及系数为零的二元组。因此，一个列表长度为 $s$ 的行在抵消之前至多读取 $ks$ 个变量。

### 6.1 排除小违反集的初始检验

如果一个赋值在许多子句中只违反一个子句，那么抽取一个短子句列表的检验不大可能发现它。因此，我们先构造一个矩阵 $A^{(0)}$，拒绝每个支撑集较小的非零违反向量。通过这些初始检验的每个非满足赋值都必然违反许多子句。于是，再增加一个抽取短子句列表的检验，就能以常数概率拒绝每个这样的赋值。

我们使用标准的基于边的 Tanner 码：将位赋给扩展图的边，并要求与每个顶点关联的位构成某个预定局部线性码的码字（局部约束见 Tanner 〔[Tan81](https://doi.org/10.1109/TIT.1981.1056404 "原引用键 Tanner81")，第 II 节〕，扩展图构造见 Sipser 和 Spielman 〔[SS96](https://doi.org/10.1109/18.556667 "原引用键 SS96")，第 IV 和 VI 节〕）。通常的局部距离与扩展性论证给出了所需的非零码字重量下界。下面的证明以确定性方式构造图和局部码，所用参数满足我们对检验数量和长度的界。

> ##### 引理 6.1
>
> 
> 
> ^lem-sparse-checks
> 
> 
>
> 设 $n,m,B$ 为正整数，满足 $m\le Bn$，并令
>
> $$
> \mu=\lfloor\log_2 m\rfloor+1,\qquad
>  P=20000B^2\mu^2,\qquad D_0=320000B^2\mu^3.
> $$
>
> 存在一个确定性构造，产生一个有 $m$ 列、至多 $3n$ 行的二元矩阵 $A^{(0)}$，使每行至多有 $D_0$ 个非零元素，且
>
> $$
> z\in\{0,1\}^m\setminus\{\vec{0}\},\quad
>  A^{(0)}z=\vec{0}\pmod2
>  \quad\Longrightarrow\quad
>  |\operatorname{supp}z|\ge m/P.
> $$
>
> 该构造使用 $\exp(\operatorname{poly}(B,\log(m+2)))$ 次位运算和 $\operatorname{poly}(n,m,B)$ 位工作空间。

**证明。**

^proof-lem-sparse-checks

我们构造一个边数介于 $m$ 与 $2m$ 之间的二分图，以其边作为临时的二元坐标。每个顶点处的检验将迫使每个与非零边相接的顶点都有许多关联的非零边；随后，一个混合界将迫使总重量很大。最后，我们保留 $m$ 个边坐标，并将其余坐标固定为零。令

$$
d_G=\min(m,D_0),
 \qquad
 q_G=\min\{2^a:a\in\mathbb Z_{\ge0},\ 2^a d_G\ge m\}.
$$

于是 $m\le q_Gd_G<2m$。写成 $q_G=2^{\ell_G}$，并取 $\{0,1\}^{\ell_G}$ 的两个副本作为顶点集。对每个左侧顶点 $u$ 和每个端口 $j\in[d_G]$，从 $u$ 向 $u\oplus s_j$ 放置一条边，其中 $\oplus$ 表示逐位模 $2$ 加法，而移位 $s_1,\ldots,s_{d_G}\in\{0,1\}^{\ell_G}$ 将在下面选择。边以二元组 $(u,j)$ 编号；平行边仍视为不同的边。任一侧的每个顶点在每个端口 $j$ 都恰有一条关联边，因此该图是 $d_G$-正则的。

为了得到混合估计 [[translation-6#^eq-hash-mixing|（6.3）]]，我们选择移位，使每个非空坐标集的奇偶性都接近平衡。对于非零向量 $b\in\{0,1\}^{\ell_G}$，位 $b\cdot s_j\bmod2$ 是 $s_j$ 中那些 $b$ 等于 $1$ 的坐标的奇偶性。取 $\varepsilon=1/(200B\mu)$，我们要求

$$
\Bigl|\sum_{j=1}^{d_G}(-1)^{b\cdot s_j}\Bigr|
 \le\varepsilon d_G
 \qquad
 \bigl(b\in\{0,1\}^{\ell_G}\setminus\{\vec{0}\}\bigr).\tag{6.2}
$$

^eq-hash-walsh

[[translation-6#^eq-hash-walsh|（6.2）]] 中的和是奇偶和为偶数的编号 $j$ 的个数减去奇偶和为奇数的编号个数。因此，对每个非零 $b$，每种奇偶性出现的编号比例都介于 $(1-\varepsilon)/2$ 和 $(1+\varepsilon)/2$ 之间。具有此性质的移位列表称为 $\varepsilon$-偏置的 〔[NN93](https://doi.org/10.1137/0222053 "原引用键 NN93")，定义 2.1–2.2〕。

如果 $q_G=1$，则没有需要检验的条件。否则 $d_G=D_0$。为证明合适的移位存在，我们独立均匀地随机选择它们。对每个固定的非零 $b$，符号 $(-1)^{b\cdot s_j}$ 独立且均匀地分布于 $\{-1,1\}$。Hoeffding 不等式将此 $b$ 违反 [[translation-6#^eq-hash-walsh|（6.2）]] 的概率界为 $2\exp(-\varepsilon^2d_G/2)$。对 $b$ 使用并合界，得到总失败概率至多为

$$
2q_G\exp(-\varepsilon^2d_G/2)
 =2q_G\exp(-4\mu)<1,
$$

其中 $q_G<2m<2^{\mu+1}$。因此，穷举移位元组并检验 [[translation-6#^eq-hash-walsh|（6.2）]]，可以在 $\exp(O(d_G\log(m+2)))$ 时间内找到一个有效元组。

接下来，我们由 [[translation-6#^eq-hash-walsh|（6.2）]] 推导混合估计。设 $\mathsf A_G$ 为 $q_G\times q_G$ 矩阵，其元素为 $\mathsf A_G[u,v]=|\{j\in[d_G]:u\oplus s_j=v\}|$；其元素计数从左侧顶点 $u$ 到右侧顶点 $v$ 的边。两侧都有相同的索引集 $\{0,1\}^{\ell_G}$，其上的函数 $\chi_b(u)=(-1)^{b\cdot u}$ 构成一组正交基。对每个 $b,u\in\{0,1\}^{\ell_G}$，

$$
(\mathsf A_G\chi_b)(u)
 =\sum_{j=1}^{d_G}\chi_b(u\oplus s_j)
 =\chi_b(u)\sum_{j=1}^{d_G}(-1)^{b\cdot s_j}.
$$

因此每个 $\chi_b$ 都是特征向量：常函数 $\chi_{\vec{0}}$ 的特征值为 $d_G$，而 [[translation-6#^eq-hash-walsh|（6.2）]] 将所有其他特征值的绝对值界为 $\varepsilon d_G$。对于左侧顶点集 $U$ 和右侧顶点集 $V$，令 $e_G(U,V)$ 计数二者之间的边，并计入重数。将 $U,V$ 的示性向量分解为常数部分和与其正交的部分，再应用 Cauchy–Schwarz 不等式，得到

$$
e_G(U,V)\le
 \frac{d_G|U||V|}{q_G}
 +\varepsilon d_G\sqrt{|U||V|}.\tag{6.3}
$$

^eq-hash-mixing

为了指定局部码，我们令

$$
c_G=\left\lceil\frac{d_G}{8B}\right\rceil,
 \qquad \delta=\frac1{100B\mu}.
$$

我们需要一个有 $c_G$ 行、$d_G$ 列的二元矩阵 $A_{\mathrm{loc}}$，使其模 $2$ 的核中的每个非零字都有至少 $\delta d_G$ 的重量。为证明这样的矩阵存在，我们考虑元素为独立均匀位的矩阵。对于每个固定的非零字，它的某个非零坐标使每行中的奇偶性均匀；因此，各行的独立性给出该字落在核中的概率为 $2^{-c_G}$。令 $h=\lceil\delta d_G\rceil-1$。若 $h=0$，则不存在重量小于 $\delta d_G$ 的非零字。否则，这些字的数量至多为

$$
\sum_{j=1}^{h}\binom{d_G}{j}
 \le(h+1)(2d_G)^h
 \le(2d_G)^{2h}
 <2^{d_G/(25B)}.
$$

最后一个不等式使用了 $h<\delta d_G$、$d_G\le m<2^\mu$ 以及 $\mu+1\le2\mu$。由于 $c_G\ge d_G/(8B)$，并合界表明存在合适的 $A_{\mathrm{loc}}$。枚举 $2^{c_Gd_G}$ 个二元矩阵，并检验所有重量小于 $\delta d_G$ 的字，可在 $\exp(\operatorname{poly}(B,\log(m+2)))$ 次位运算内找到这样的矩阵。

在两侧的每个顶点上，将 $A_{\mathrm{loc}}$ 的 $c_G$ 行施加于按端口排序的关联边坐标。这些约束定义了一个局部码为 $C_{\mathrm{loc}}=\ker_{\mathbb F_2}A_{\mathrm{loc}}$ 的 Tanner 码。其关联图对我们的图中的每条边设置一个位节点，对每个顶点设置一个局部码节点；每个位都参与其两个端点上的约束。考虑一个被所有这些检验接受的非零边字。令 $U,V$ 为两侧与其非零边相接的顶点集，令 $h'$ 为其重量。$U\cup V$ 中的每个顶点都至少关联 $\delta d_G$ 条非零边，因此 $h'\ge\delta d_G\max(|U|,|V|)$。于是

$$
\delta d_G\sqrt{|U||V|}
 \le h'\le e_G(U,V)
 \le\frac{d_G|U||V|}{q_G}
       +\varepsilon d_G\sqrt{|U||V|}.
$$

$U$ 和 $V$ 均非空。除以 $d_G\sqrt{|U||V|}$，得到 $\sqrt{|U||V|}\ge(\delta-\varepsilon)q_G$，因此

$$
h'\ge\delta(\delta-\varepsilon)q_Gd_G
 =\frac{q_Gd_G}{20000B^2\mu^2}\ge\frac mP.
$$

将这个 Tanner 码缩短：在 $q_Gd_G$ 个边坐标中保留任意 $m$ 个，将它们与 $[m]$ 对应，并把其余坐标设为零。将所有顶点检验限制到保留的坐标上，就得到 $A^{(0)}$。任何被 $A^{(0)}$ 接受的字都可以补零扩展为一个被接受的边字，因此具有所要求的重量。每行至多有 $d_G\le D_0$ 个非零元素。行数为 $2q_Gc_G$。如果 $q_G=1$，则 $d_G=m$，且

$$
2c_G\le\frac{m}{4B}+2\le\frac n4+2\le3n.
$$

如果 $q_G>1$，则 $d_G=D_0\ge8B$，且

$$
2q_Gc_G\le\frac{q_Gd_G}{4B}+2q_G
 \le\frac{q_Gd_G}{2B}<\frac mB\le n.
$$

对移位、局部矩阵和检验字的搜索均依次进行。存储当前选择和最终各行使用 $\operatorname{poly}(n,m,B)$ 位工作空间。

∎

### 6.2 通过公共零点计数选择额外方程

初始检验之后，每个仍通过检验的非满足赋值都至少违反 $m/P$ 个子句。这使得一个短随机检验能够以常数概率发现每个这样的赋值。为使选择具有确定性，我们使用条件期望法所依据的平均原理 〔[Rag88](https://doi.org/10.1016/0022-0000(88)90003-7 "原引用键 Raghavan88")〕。

> ##### 引理 6.2
>
> 
> 
> ^lem-greedy-hashes
> 
> 
>
> 取引理 [[translation-6#^lem-sparse-checks|6.1]] 中的 $P,D_0$ 和 $A^{(0)}$，一个确定性过程添加 $3n$ 个列表长度为 $P$ 的行，得到满足 $N(A)=\#F$ 的矩阵 $A$。它至多使用 $3n(2m)^P$ 次公共零点计数。每个候选方程组至多有 $6n$ 个方程，每个方程涉及至多 $2^k\max(D_0,P)$ 个次数至多为 $k$ 的单项式。

**证明。**

^proof-lem-greedy-hashes

在当前矩阵为 $A$ 的某一阶段，枚举有序列表

$$
\gamma=((e_1,c_1),\ldots,(e_P,c_P))
 \in\mathcal C:=([m]\times\{0,1\})^P.
$$

列表 $\gamma$ 表示二元行 $h_\gamma$，其满足

$$
(h_\gamma)_e=
 \Bigl(\sum_{j:e_j=e}c_j\Bigr)\bmod2
 \qquad(e\in[m]).
$$

共有 $(2m)^P$ 个列表；即使不同列表表示同一行，仍分别计数。用 $A;h_\gamma$ 表示在 $A$ 后添加 $h_\gamma$ 所得到的矩阵。

固定一个被 $A$ 接受的非满足赋值 $x$。初始各行仍在 $A$ 中，所以 $|\operatorname{supp}v(x)|\ge m/P$。对于均匀的列表 $\gamma$，$e_1,\ldots,e_P$ 都不属于该支撑集的概率至多为

$$
(1-1/P)^P\le e^{-1}<1/2.
$$

以编号命中支撑集为条件，选择一个命中位置 $j$。固定除 $c_j$ 以外的每个系数后，均匀位 $c_j$ 使 $h_\gamma\cdot v(x)$ 在模 $2$ 下均匀。某些子句编号重复时，这一点仍然成立。因此，对每个这样的 $x$，至少四分之一的候选列表给出的行会拒绝 $x$。

对仍通过检验的非满足赋值求和，我们得到

$$
\mathbb E_\gamma D(A;h_\gamma)\le\tfrac34 D(A).
$$

对每个候选，通过计算其多项式方程组的公共零点数来计算 $N(A;h_\gamma)$。添加一个达到最小值的候选，并按枚举顺序打破平局。由于对每个 $\gamma$ 都有 $N(A;h_\gamma)=\#F+D(A;h_\gamma)$，选中的行留下的非满足赋值至多为 $\tfrac34 D(A)$。经过 $3n$ 轮后，至多剩下 $(3/4)^{3n}2^n=(27/32)^n<1$ 个；其数量为整数，因此为零。该过程运行固定的轮数，始终不需要知道 $D(A)$ 或 $\#F$。

初始矩阵至多有 $3n$ 行，每个候选求值时额外的行数也至多为 $3n$。由 [[translation-6#^eq-hash-query|（6.1）]]，一个列出 $s$ 个子句的行在原变量上展开后至多有 $2^k s$ 个单项式；重复项在 $\mathbb F_2$ 上抵消。这些观察给出了所声称的规模界和查询次数界。

∎

### 6.3 对一个稀疏公式计数

^subsec-count-sparse

假设 $n\ge20$ 且 $1\le m\le Bn$，其中 $B$ 由仅依赖于 $k$ 的一个固定次幂的 $\log n$ 所界。根据引理 [[translation-6#^lem-sparse-checks|6.1]] 构造初始矩阵。这使用 $\exp((\log n)^{O_k(1)})$ 次位运算和多项式空间。$P$ 和 $D_0$ 均为 $(\log n)^{O_k(1)}$，因此引理 [[translation-6#^lem-greedy-hashes|6.2]] 中的每个候选都是定理 [[translation-2#^thm-overview-sparse-polynomials|2.2]] 的一个实例，且使用同一个固定的 $c=c(k)$。这既适用于被丢弃的候选，也适用于最终方程组：计数器只要求方程的数量、次数和稀疏度符合条件。对固定的 $k$，展开每行并合并单项式需要多项式时间和空间。

包括一次最终计数在内，至多 $3n(2m)^P+1=\exp((\log n)^{O_k(1)})$ 次调用就足够。每次调用使用 $2^{O_k(n(\log\log n)^2/\sqrt{\log n})}$ 次位运算。由于 $\log n$ 的任何固定次幂都是 $o(n(\log\log n)^2/\sqrt{\log n})$，包括构造和候选比较在内的总时间为

$$
(n+m)^{O_k(1)}2^{O_k(n(\log\log n)^2/\sqrt{\log n})}.\tag{6.4}
$$

^eq-sparse-formula-cost

由贪心引理，最终计数为 $\#F$。没有子句或包含空子句的公式直接处理。候选依次检查；除计数器的多项式工作空间外，只需保留当前各行、一个候选、最优行及其计数。

### 6.4 回到一般公式

^subsec-general-reduction

我们使用不交稀疏化，将满足赋值划分给同样以 $n$ 个声明变量为变量的稀疏公式。前面的算法对这些公式逐一计数。参数 $\sigma$ 控制一种权衡：使它更小会减少公式数量，但会增大其出现次数界 $B$。我们的求解器允许 $B$ 按 $\log n$ 的固定次幂增长，因此可以令 $\sigma$ 趋于零，同时使公式数量和每个公式的代价都保持在所需的时间界内。

> ##### 引理 6.3
>
> 
> 
> ^lem-sparsify
> 
> 
>
> 固定 $k\ge2$。给定一个有 $n$ 个声明变量、$m$ 个子句的 $k$-CNF，以及一个有理数 $0<\sigma\le1$，存在一个确定性算法，构造一棵变量相同的 $k$-CNF 树。令 $L_\sigma$ 为所提供的 $\sigma$ 的分子和分母的总二进制编码长度。一个赋值满足输入，当且仅当它满足某个叶子公式；且它不可能满足两个不同的叶子。该树有
>
> $$
> \operatorname{poly}_k(n,\sigma^{-1})\,2^{\sigma n}
> $$
>
> 个节点，深度为 $\operatorname{poly}_k(n,\sigma^{-1})$。在每个叶子中，每个变量至多出现 $B$ 次，其中 $B$ 是一个显式计算的整数，满足
>
> $$
> B=O_k\!\Bigl(\bigl[\sigma^{-1}\log(2/\sigma)\bigr]^{k-1}\Bigr).
> $$
>
> 输入规范化使用 $\operatorname{poly}_k(n,m)$ 次位运算。构造数值参数使用 $\operatorname{poly}_k(L_\sigma)$ 次位运算。之后，每个节点的处理使用 $\operatorname{poly}_k(n,\log(2/\sigma))$ 次位运算。输入计数等于各叶子计数之和。

附录 [[translation-A#^app-sparsify|A]] 证明了该引理，包括保证各叶子计数可相加的不交性。

> ##### 命题 6.4
>
> 
> 
> ^prop-interpolation-bound
> 
> 
>
> 对每个固定的 $k\ge2$，插值算法在 $(n+m)^{O_k(1)}2^{O_k(\rho(n))}$ 次位运算和 $(n+m)^{O_k(1)}$ 位空间内，计算具有 $n\ge20$ 个声明变量、$m$ 个子句的 $k$-CNF 的满足赋值数。

**证明。**

^proof-prop-interpolation-bound

我们首先在 $(n+m)^{O_k(1)}$ 时间内规范化输入，删除重复文字、重言式子句、重复子句以及包含另一个子句的子句。保留全部 $n$ 个声明变量。空子句使计数为零，没有子句的公式使计数为 $2^n$。当 $n<20$ 时，我们使用穷举搜索。对于 $n\ge20$，接下来选择稀疏化参数。定义

$$
\lambda_n=\lceil\log_2 n\rceil,\qquad
 \nu_n=\lceil\log_2\lambda_n\rceil,\qquad
 s=\left\lfloor\frac{\sqrt{\lambda_n}}{\nu_n^2}\right\rfloor.
$$

我们通过整数比较计算 $s$，取满足 $s^2\nu_n^4\le\lambda_n$ 的最大非负整数。如果 $s<2$，则使用穷举搜索；$\sqrt{\lambda_n}/\nu_n^2$ 趋于无穷大，因此这样的规模只有有限多个。否则，以 $\sigma=1/s$ 应用引理 [[translation-6#^lem-sparsify|6.3]]。树至多有 $2^{n/s}\operatorname{poly}_k(n,s)$ 个节点，其叶子的出现次数界为

$$
B=O_k\bigl((s\log s)^{k-1}\bigr)=(\log n)^{O_k(1)}.
$$

每个叶子使用原来的 $n$ 个变量，且至多有 $Bn$ 个非空子句。我们使用第 [[translation-6#^subsec-count-sparse|6.3]] 节的稀疏公式算法对每个叶子计数，其运行时间由 [[translation-6#^eq-sparse-formula-cost|（6.4）]] 给出。没有子句或包含空子句的叶子直接处理。在该应用中，子句数指叶子中的子句数；最终界中的 $m$ 仍是输入子句数。

对于 $s\ge2$，其定义中的向下取整给出

$$
\frac ns=O\!\left(\frac{n\nu_n^2}{\sqrt{\lambda_n}}\right)
 =O(\rho(n)).
$$

因此，叶子数量和对每个叶子计数的时间的指数均为 $O_k(\rho(n))$。它们的多项式因子连同规范化及树节点处的工作量，均由 $(n+m)^{O_k(1)}$ 所界。因此总位运算次数为

$$
(n+m)^{O_k(1)}2^{O_k(\rho(n))}.
$$

有限多个穷举搜索情形被吸收到常数中。所有参数、初始检验和额外的行都由上面的确定性过程计算；每次计数查询都使用定理 [[translation-2#^thm-overview-sparse-polynomials|2.2]] 的公共零点算法。

为界定完整算法使用的空间，我们深度优先遍历稀疏化树，每次只对一个叶子计数。当前路径有 $\operatorname{poly}_k(n,s)$ 个节点，每个规范化公式都有一个 $\operatorname{poly}_k(n)$ 位的编码。由于 $s\le\sqrt{\lceil\log_2 n\rceil}$，存储该路径并对一个叶子计数使用 $\operatorname{poly}_k(n,m)$ 位。不交性使已处理叶子的计数之和保持在零与 $2^n$ 之间，因此累加器至多使用 $n+1$ 位。所以总空间为 $\operatorname{poly}_k(n,m)$ 位。

∎
