---
id: "D.2"
title: "引理 D.2：以张量缩并计数稀疏多项式共零点"
group: "张量缩并"
kind: "引理"
status: 完整证明整合稿
source_label: "D.2"
tex_label: "lem:tensor-sparse-query"
publish: false
source_pages: [54, 55, 56, 57]
depends_on: ["5.1", "5.2", "D.1"]
---

# 引理 D.2：以张量缩并计数稀疏多项式共零点

本页对系数取自 $\mathbb F_2$、按单项式列表给出的多项式方程组进行精确计数，计数范围是输入指定的全部布尔变量。证明先处理出现次数过高的变量，再构造布尔张量网络，并调用 [[D.1|缩并定理]]。

> ##### 引理 D.2　通过缩并对稀疏多项式方程组计数
>
> 
> 
> ^lem-tensor-sparse-query
> 
> 
>
> 固定整数 $k,c\ge1$。设 $P_1,\ldots,P_a$ 是以指定的 $n\ge20$ 个布尔变量为自变量、系数取自 $\mathbb F_2$ 的多项式。假设 $a\le cn$， 且每个 $P_i$ 都以至多 $\lceil\log_2 n\rceil^c$ 个次数至多为 $k$ 的单项式列表给出。公共零点的个数可以确定性地用 $n^{O_{k,c}(1)}2^{O_{k,c}(n\log\log n/\sqrt{\log n})}$ 次位运算 以及 $n^{O_{k,c}(1)}$ 位空间计算出来。

**证明。**

^proof-lem-tensor-sparse-query

令 $\lambda=\lceil\log_2 n\rceil$ 且 $\nu=\lceil\log_2\lambda\rceil$。 在每个单项式内部，将变量的正整数次幂替换为其一次幂，并在模二下合并重复单项式。 将方程 $P_i(x)=0$ 称为检验 $i$。其作用域由剩余单项式中的变量组成，大小至多为 $k\lambda^c$。 令 $N_0$ 为作用域大小之和：若变量 $v$ 属于检验 $i$，就将二元组 $(i,v)$ 计入一次。因此 $N_0\le ak\lambda^c$。以所有可能方式固定那些属于超过

$$
D_*=\max\{1,\lceil N_0/n\rceil\}\lceil\sqrt{\lambda}\rceil
$$

个作用域的变量。这样的变量至多有 $n/\sqrt{\lambda}$ 个。 它们的赋值将原计数划分为至多 $2^{n/\sqrt{\lambda}}$ 个分支计数。 在每个分支上，代入固定的比特并再次合并重复单项式。 检验 $i$ 的自由变量作用域 $I_i$ 的大小仍至多为 $k\lambda^c$， 且每个自由变量至多出现在 $D_*=\lambda^{O_{k,c}(1)}$ 个作用域中。 不出现在任何作用域中的自由变量仍计入自由变量集合。若某个剩余多项式化为常数 $1$，则该分支无解。我们可以丢弃恒成立的方程 $0=0$；如果不剩任何方程，则该分支的答案为二的自由变量数次幂。 下面用 $a$ 表示剩余方程数，$n$ 仍表示原变量数。

##### 关联上的多项式。

为每个满足 $v\in I_i$ 的二元组 $(i,v)$ 指定独立的不定元 $z_{iv}$。 记 $z_i=(z_{iv})_{v\in I_i}$。将规范化后的分支多项式的剩余单项式 用整数系数相加，并用 $z_{iv}$ 代替 $x_v$，得到 $\widetilde L_i(z_i)$。 我们使用环

$$
\mathcal B=(\mathbb Z/2^p\mathbb Z)[V]/(V^\ell),
 \qquad p=\ell=n+1 .
$$

取 $h(Y)=Y(Y-1)$。引理 [[5.1#^lem-rational-idempotent|5.1]] 提供整数系数多项式 $e_j(Y)$（$0\le j<\ell$），满足 $\deg e_j\le1$，且 $p_\ell(Y)=\sum_{j<\ell}e_j(Y)h(Y)^j$ 在整数输入处模 $2^\ell$ 等于偶数示性值。[[B.1|引理 B.1]] 保证这组系数能在关于 $\ell$ 的多项式位时间和空间内构造。

所需共享截断性质来自 [[5.2|引理 5.2]]：对于任意整数输入 $y_i$，将各个 $\sum_{j<\ell}e_j(y_i)h(y_i)^jV^j$ 在同一个 $V$ 中相乘并模 $V^\ell$ 截断后，再将保留的系数求和，结果模 $2^\ell$ 为“所有 $y_i$ 都是偶数”的示性值。这里取 $p=\ell=n+1$，所以这一同余适用于当前系数环。将 $e_j$ 的系数模 $2^p$ 约化，构造因子

$$
B_i(z_i,V)=\sum_{j=0}^{\ell-1}
   e_j(\widetilde L_i(z_i))\,h(\widetilde L_i(z_i))^j V^j .
$$

令 $\overline B_i$ 为其关于 $z_i$ 的多重线性代表，具体是在各个 $V^j$ 的系数中， 将每个关联不定元的正整数次幂替换为其一次幂。 它在 $z_i$ 的每个布尔赋值上都与 $B_i$ 一致。 在 $\mathcal B[z]$ 中定义 $F(z,V)=\prod_i\overline B_i(z_i,V)$。 不同检验使用的关联不定元集合两两不交，因此即使尚未将变量 $v$ 的所有副本都替换为 同一个布尔变量 $x_v$，$F$ 也已经是多重线性的。

$\overline B_i$ 中 $V^j$ 的系数关于关联不定元的次数至多为 $k(1+2j)$， 因为 $\deg e_j\le1$、$\deg h=2$，而多重线性化只会降低单项式次数。 $\mathcal B$ 中的乘法只保留满足 $\sum_i j_i\le\ell-1$ 的项。 因此，$F$ 中每个关联单项式的次数至多为

$$
K=k\bigl(a+2(\ell-1)\bigr)=O_{k,c}(n).\tag{D.1}
$$

^eq-sharp-incidence-degree

令 $\mathcal S_\ell$ 对 $\mathcal B$ 中 $1,V,\ldots,V^{\ell-1}$ 的系数求和。 在 $z_{iv}=x_v$ 处，多重线性化后的因子 $\overline B_i$ 与规范化分支多项式 对应的 $B_i$ 一致。整数 $\widetilde L_i((x_v)_{v\in I_i})$ 的奇偶性， 与原 $P_i$ 在 $x$ 及固定比特处的求值相同。 对这些整数应用引理 [[5.2#^lem-total-order|5.2]]，可知分支计数在模 $2^p$ 下同余于

$$
\mathcal S_\ell\left(\sum_x F\bigl((z_{iv}=x_v)_{iv},V\bigr)\right),\tag{D.2}
$$

^eq-sharp-branch-residue

其中 $x$ 遍历所有自由布尔赋值。我们先在截断环中将检验因子相乘， 再应用系数求和映射。

##### 为单项式编制索引。

将检验与自由变量分别划分为 $J=\lceil n^{1/4}\rceil$ 组， 每一侧各组的大小相差至多一。用 $\mathcal T_g$ 表示检验组， 用 $\mathcal X_h$ 表示变量组。每组包含 $O_c(n^{3/4})$ 个对象， 因此无论在哪一侧，该组的关联数都至多为 $n^{3/4}\lambda^{O_{k,c}(1)}$。 令 $N_{gh}$ 为从 $\mathcal T_g$ 到 $\mathcal X_h$ 的关联数，并令 $N=\sum_{g,h}N_{gh}\le N_0$。

对于一个关联单项式，令 $d_{gh}$ 表示其所选关联中连接组 $g,h$ 的关联数。 枚举满足 $0\le d_{gh}\le N_{gh}$ 以及 $\sum_{g,h}d_{gh}\le K$ 的整数数组 $(d_{gh})$。这样的数组至多有

$$
(K+1)^{J^2}=2^{O_{k,c}(\sqrt n\log n)}
$$

个，可以用 $J^2$ 个计数器枚举。固定一个数组后，对每一对组 $(g,h)$，大小为 $d_{gh}$ 的关联子集共有

$$
C_{gh}=\binom{N_{gh}}{d_{gh}}
$$

个。在两个组顶点间设置 $\lceil\log_2 C_{gh}\rceil$ 条布尔连线， 按字典序为这些子集编制索引。当 $C_{gh}=1$ 时，两个端点都使用唯一的子集 （它可能是整个关联集），不需要连线。任何未使用的比特串都给出零张量条目。 要解码一个有效索引，依次考察各关联，用二项式系数计算选取或不选取该关联时 可能的补全方式数。这些数的位长为多项式，因此解码使用多项式时间和空间。

所有组对所选子集的并集，在 $N$ 个不定元中指定一个次数至多为 $K$ 的无平方因子单项式。 将满足该次数界的所有单项式都包括在内，隔板法给出上界 $\binom{N+K}{K}$。 因此，这个数组对应网络中的连线数 $M$ 满足

$$
\begin{aligned}
M &\le J^2+\log_2\prod_{g,h} C_{gh}
      \le J^2+\log_2\binom{N+K}{K} \\
   &\le J^2+K\log_2\!\left(\frac{\mathrm e(N+K)}{K}\right)
      = O_{k,c}(n\nu).
\end{aligned}\tag{D.3}
$$

^eq-sharp-wire-budget

这里 $K=\Theta_{k,c}(n)$ 且 $N\le n\lambda^{O_{k,c}(1)}$。 此外，$\lceil\log_2 C_{gh}\rceil\le N_{gh}$，所以每个顶点的度 至多为其关联数，即 $n^{3/4}\lambda^{O_{k,c}(1)}$。

##### 张量条目与缩并。

连线比特的一个有效赋值为每个检验确定一个子集 $S_i\subseteq I_i$。 记 $z_{i,S_i}=\prod_{v\in S_i}z_{iv}$。检验组 $g$ 处的条目是 $\prod_{i\in\mathcal T_g}\overline B_i(z_i,V)$ 中由其指示的单项式的系数。 由于各元组 $z_i$ 所含的不定元集合两两不交，该系数为

$$
\prod_{i\in\mathcal T_g}[z_{i,S_i}]\overline B_i(z_i,V)
 \qquad\text{在 }\mathcal B\text{ 中}.
$$

对于变量组 $h$，对 $v\in\mathcal X_h$ 令 $b_v=|\{i:v\in S_i\}|$。 其条目为

$$
\sum_{x\in\{0,1\}^{\mathcal X_h}}
        \prod_{v\in\mathcal X_h}x_v^{b_v}
   =2^{|\{v\in\mathcal X_h:b_v=0\}|}\pmod{2^p}.
$$

事实上，正指数要求 $x_v=1$，而零指数使 $x_v$ 可自由取值。 这也包括所有检验作用域之外的变量。

$F$ 的每个单项式都恰好出现在一个数组中，并且在每个组对处恰好有一个有效索引。 其在 $F$ 中的系数是各检验组系数之积。将具有相同 $v$ 的关联变量设为相等后， 该单项式在所有布尔赋值上的和就是各变量组条目之积。 由 [[D.2#^eq-sharp-incidence-degree|（D.1）]]，对这些数组求和会遍历所有单项式。 因此，[[D.2#^eq-sharp-branch-residue|（D.2）]] 中 $\mathcal S_\ell$ 内部的 $\mathcal B$ 元素就是这些二分网络的缩并之和。

为求出检验侧的一个系数，令 $\mathbf1_T$ 为 $I_i$ 上支撑集为 $T\subseteq S_i$ 的布尔向量。在 $\mathbf1_T$ 处，多重线性多项式的值 等于由 $T$ 的子集索引的各系数之和，且它在该处与 $B_i$ 一致。 对这个子集求和关系进行反演，得到

$$
[z_{i,S_i}]\overline B_i(z_i,V)=
 \sum_{T\subseteq S_i}(-1)^{|S_i|-|T|}B_i(\mathbf1_T,V)
 \qquad\text{在 }\mathcal B\text{ 中}.
$$

每一项耗费多项式次位运算。从所列单项式求出 $\widetilde L_i(\mathbf1_T)$， 并使用引理 [[5.1#^lem-rational-idempotent|5.1]] 中可在多项式时间内构造的多项式 $e_j$。 将 $B_i(\mathbf1_T,V)$ 的 $\ell$ 个系数模 $2^p$ 存储。 至多有 $2^{|S_i|}\le 2^{k\lambda^c}$ 个子集需要处理。 每次对一个检验求和，再在 $\mathcal B$ 中将该组所得的系数相乘。 这样，用 $2^{\lambda^{O_{k,c}(1)}}$ 次位运算以及多项式空间即可求出一个检验组条目。 变量侧条目以及无效连线索引检查都需要多项式时间。 图、次数数组及条目计算过程都有多项式大小的描述。

应用定理 [[D.1#^thm-tensor-contraction|D.1]]，取规模参数 $s=n\nu$、系数模数参数 $p=n+1$ 以及截断阶数 $\ell=n+1$。 由 [[D.2#^eq-sharp-wire-budget|（D.3）]]，该图有 $2J$ 个顶点和 $O_{k,c}(s)$ 条连线。 对于所有充分大的 $n$，其最大度至多为 $\lceil s^{9/10}\rceil$， 精度和截断阶数为 $O(s)$，且条目求值时间至多为 $2^{O_{k,c}(s^{9/10})}$。 于是每次缩并耗费 $n^{O_{k,c}(1)}2^{O_{k,c}(s/\sqrt{\log s})}$ 次位运算 以及多项式空间。这里 $s/\sqrt{\log s}=O(n\nu/\sqrt\lambda)$。 高关联数变量的分支与次数数组使运行时间至多乘上

$$
2^{\,n/\sqrt{\lambda}+O_{k,c}(\sqrt n\log n)}.
$$

这一指数中的两项均为 $O_{k,c}(n\nu/\sqrt{\lambda})$。 依次处理各分支和数组。在每个分支上，于 $\mathcal B$ 中对缩并求和并应用 $\mathcal S_\ell$。将各分支计数的余数相加，再模 $2^{n+1}$ 取最小非负代表，就得到原计数， 因为原计数介于 $0$ 与 $2^n$ 之间。对有界的例外规模使用直接枚举， 即证明了所述界。

∎

### 在任意子句密度情形中的应用

^subsec-sharp-dense

本引理用于原变量数为 $n$ 的任意子句密度 $k$-CNF 的精确计数。[[6.3|不交稀疏化]] 保持原来的变量集，将满足赋值互斥、穷尽地分到稀疏叶子；[[6.1|初始校验]] 与 [[6.2|贪心行选择]] 对每片叶子提出公共零点计数查询：系统由至多 $6n$ 个系数取自 $\mathbb F_2$ 的多项式方程组成，求值域是原来的 $n$ 个变量的全部布尔赋值。宽度 $k$ 固定时，方程次数至多为 $k$，每式单项式数由 $\log n$ 的一个仅依赖于 $k$ 的固定次幂界定，符合本引理的输入条件。最终查询的公共零点恰是该叶子的满足赋值，叶子计数之和即原公式计数；具体参数代入与资源合并见 [[1.1|定理 1.1 的任意密度证明]]。

本证明使用 [[5.1]] 的奇偶提升和 [[5.2]] 的共享总阶截断。上面已经证明，这使独立检验—变量关联上的单项式总次数为 $O_{k,c}(n)$，从而可将单项式编码为这些关联的子集，所需布尔连线数为 $O_{k,c}(n\log\log n)$。

