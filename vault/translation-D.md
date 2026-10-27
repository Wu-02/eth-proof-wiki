---
id: translation-D
title: "原文中文译文 D 精确计数的更尖锐界"
kind: translation
group: 原文中文译文
source_label: "D"
order: 109
publish: true
status: 原文中文译文（已审校）
---

## D 精确计数的更尖锐界

^app-quantitative

我们通过缩并布尔张量网络来证明定理 [[translation-1#^thm-main|1.1]]。 两种运行时间反映了网络中的连线数。 一个含有 $m\le Dn$ 个子句的公式给出一个具有 $O_{k,D}(n)$ 条 连线的网络。对于任意公式，我们使用第 [[translation-6#^sec-hashes|6]] 节的奇偶检验。 引理 [[translation-5#^lem-total-order|5.2]] 的次数界使我们能够用 $O_k(n\log\log n)$ 条连线， 为这些检验的多项式提升之积中保留的单项式编制索引。 我们先给出这两种编码，再证明它们所使用的缩并定理。

### D.1 布尔张量缩并

^subsec-tensor-interface

布尔张量网络是一个二分多重图 $G$，其中每条边携带一个比特。 每个顶点 $v$ 都有一个关联边的有序列表 $\delta(v)$，以及一个张量 $T_v$， 它为这些边的每个布尔赋值指定一个环元素。平行边具有不同的端口。 网络的*缩并*为

$$
Z=\sum_{x\in\{0,1\}^{E(G)}}\prod_{v\in V(G)} T_v(x|_{\delta(v)}).
$$

孤立顶点贡献其标量条目。我们用网络的边数衡量其规模。

> ##### 定理 D.1　布尔张量缩并
>
> 
> 
> ^thm-tensor-contraction
> 
> 
>
> 固定正常数 $C,A,b$。设 $s\ge2$ 为整数，并设 $\mathcal L$ 是一个二分张量网络的图描述与张量描述的总长度； 该网络至多有 $Cs$ 条边，最大度至多为 $\lceil s^{9/10}\rceil$。 假设顶点数由 $s$ 的一个固定多项式所界定，且条目属于
>
> $$
> \mathcal B_{P_0,\ell}
>    =(\mathbb Z/2^{P_0}\mathbb Z)[V]/(V^\ell),
>  \qquad 1\le P_0,\ell\le Cs.
> $$
>
> 假设对于每个顶点及其端口的每个布尔取值，均能一致地由描述在时间 $(s+\mathcal L)^b2^{A s^{9/10}}$ 和空间 $(s+\mathcal L)^b$ 内计算其条目。那么该缩并可以确定性地用
>
> $$
> (s+\mathcal L)^{O(1)}
>   2^{O(s/\sqrt{\log s})}
> $$
>
> 次位运算以及 $(s+\mathcal L)^{O(1)}$ 位空间计算出来。 常数仅依赖于假设中的固定界。特别地，允许 $\ell=1$。

第 [[translation-D#^app-tensor|D.4]] 节的算法以对连线的递归取代单次全局 Taylor 展开。 在每次调用中，它对连线的识别关系进行变形，使得在选定的插值节点处， 只有同组内的端口相互作用。在该节点附近，组间相互作用用称为模态的变量展开。 权重为 $j$ 的模态的系数可被 $2^j$ 整除，因此只有总权重低于工作精度的 单项式才可能有贡献。根据节点的2-进赋值逐级递减 Hermite 重数，可以界定该精度。 当有 $M$ 条连线并保留 $u$ 个2-进赋值层级时，模态单项式的个数为 $2^{O(M/\sqrt{u})}$，且每个单项式都分解为若干至多具有 $M/8$ 条连线的缩并之积。 在递归深度 $d$ 处，$M=O(s8^{-d})$ 且 $u=\Theta((\log s)/2^d)$。 因此这些指数按几何级数求和，得到 $O(s/\sqrt{\log s})$。

### D.2 固定子句密度

^subsec-sharp-fixed-density

**定理 [[translation-1#^thm-main|1.1]] 中固定密度界的证明。**

^proof-thm-main-fixed-density

为每个子句设置一个携带其布尔满足性表的顶点，并为子句中每个不同的变量 设置一个端口。可以删去重言式，而空子句使计数为零。 对于具有 $d\ge1$ 个端口的变量，要求这些端口的比特一致。 当 $d=1$ 时，附接一元张量 $(1,1)$；当 $d=2$ 时，附接一个二元相等张量。 当 $d\ge3$ 时，取一棵具有 $d$ 个外部端口、内部顶点均为三价相等张量的树。 这样的树有 $d-2$ 个内部顶点，而且其端口上的每个共同取值都唯一地扩展到 所有内部边上。

子句端口至多有 $km$ 个。该图有 $O_k(n+m)$ 条边和顶点， 且最大度至多为 $\max\{k,3\}$。在每条边上插入一个二元相等张量， 将该边细分一次。旧顶点与新顶点组成二分网络的两侧。 细分后一条边上的两个比特必须相等，因此这种操作保持缩并不变。 出现的变量上的每个满足赋值贡献一，其他每个赋值贡献零。

令 $s=n+m$，在 $\mathbb Z/2^{n+1}\mathbb Z$ 上应用 定理 [[translation-D#^thm-tensor-contraction|D.1]]，取 $P_0=n+1$ 以及 $\ell=1$。 对于固定的 $k$，局部表的大小有界。对所有充分大的 $s$，度数界与精度界均成立， 而有界规模的实例可以直接枚举。若有 $u$ 个声明变量未被使用， 则将缩并在模 $2^{n+1}$ 下乘以 $2^u$。其最小非负剩余就是 $\#F$， 因为 $0\le\#F\le2^n$。这也包括空公式，此时空网络的缩并为一。 时间为 $s^{O_k(1)}2^{O_k(s/\sqrt{\log s})}$，空间为多项式。 当 $m\le Dn$ 时，我们有 $n\le s\le(1+D)n$，从而得到指数 $O_{k,D}(n/\sqrt{\log n})$。

∎

### D.3 任意子句密度

^subsec-sharp-dense

第 [[translation-6#^sec-hashes|6]] 节中的稀疏化与贪心行选择将这一情形归约为 稀疏多项式方程组的公共零点计数。我们保留第 [[translation-5#^sec-setup|5]] 节的奇偶提升。 其次数界使我们能够将单项式编码为检验与变量之间关联的一个子集， 所需布尔连线数为 $O(n\log\log n)$。

> ##### 引理 D.2　通过缩并对稀疏多项式方程组计数
>
> 
> 
> ^lem-tensor-sparse-query
> 
> 
>
> 固定整数 $k,c\ge1$。设 $P_1,\ldots,P_a$ 是定义在 $n\ge20$ 个 声明布尔变量上的 $\mathbb F_2$ 上的多项式。假设 $a\le cn$， 且每个 $P_i$ 都以至多 $\lceil\log_2 n\rceil^c$ 个次数至多为 $k$ 的单项式列表给出。公共零点的个数可以确定性地用 $n^{O_{k,c}(1)}2^{O_{k,c}(n\log\log n/\sqrt{\log n})}$ 次位运算 以及 $n^{O_{k,c}(1)}$ 位空间计算出来。

**证明。**

^proof-lem-tensor-sparse-query

令 $\lambda=\lceil\log_2 n\rceil$ 且 $\nu=\lceil\log_2\lambda\rceil$。 在每个单项式内部，将变量的正整数次幂替换为其一次幂，并在模二下合并重复单项式。 检验 $i$ 的作用域由其剩余单项式中的变量组成，大小至多为 $k\lambda^c$。 令 $N_0$ 为作用域大小之和：若变量 $v$ 属于检验 $i$，就将二元组 $(i,v)$ 计入一次。因此 $N_0\le ak\lambda^c$。以所有可能方式固定那些属于超过

$$
D_*=\max\{1,\lceil N_0/n\rceil\}\lceil\sqrt{\lambda}\rceil
$$

个作用域的变量。这样的变量至多有 $n/\sqrt{\lambda}$ 个。 它们的赋值将原计数划分为至多 $2^{n/\sqrt{\lambda}}$ 个分支计数。 在每个分支上，代入固定的比特并再次合并重复单项式。 检验 $i$ 的自由变量作用域 $I_i$ 的大小仍至多为 $k\lambda^c$， 且每个自由变量至多出现在 $D_*=\lambda^{O_{k,c}(1)}$ 个作用域中。 不出现在任何作用域中的自由变量仍保留为声明变量。常数一方程使分支计数为零。 我们可以丢弃常数零方程；如果不剩任何方程，则该分支的答案为二的自由变量数次幂。 下面用 $a$ 表示剩余方程数，$n$ 仍表示原变量数。

##### 关联上的多项式。

为每个满足 $v\in I_i$ 的二元组 $(i,v)$ 指定独立的不定元 $z_{iv}$。 记 $z_i=(z_{iv})_{v\in I_i}$。将规范化后的分支多项式的剩余单项式 用整数系数相加，并用 $z_{iv}$ 代替 $x_v$，得到 $\widetilde L_i(z_i)$。 我们使用环

$$
\mathcal B=(\mathbb Z/2^p\mathbb Z)[V]/(V^\ell),
 \qquad p=\ell=n+1 .
$$

取 $h(Y)=Y(Y-1)$，以及引理 [[translation-5#^lem-rational-idempotent|5.1]] 中的整数多项式 $e_j$。 将它们的系数模 $2^p$ 约化，构造因子

$$
B_i(z_i,V)=\sum_{j=0}^{\ell-1}
   e_j(\widetilde L_i(z_i))\,h(\widetilde L_i(z_i))^j V^j .
$$

令 $\overline B_i$ 为其关于 $z_i$ 的多重线性代表，具体是在每个 $V$ 的系数中， 将每个关联不定元的正整数次幂替换为其一次幂。 它在 $z_i$ 的每个布尔赋值上都与 $B_i$ 一致。 在 $\mathcal B[z]$ 中定义 $F(z,V)=\prod_i\overline B_i(z_i,V)$。 不同检验的关联不定元彼此不交，因此即使尚未将变量 $v$ 的所有副本都替换为 同一个布尔变量 $x_v$，$F$ 也已经是多重线性的。

$\overline B_i$ 中 $V^j$ 的系数关于关联不定元的次数至多为 $k(1+2j)$， 因为 $\deg e_j\le1$、$\deg h=2$，而多重线性化只会降低单项式次数。 $\mathcal B$ 中的乘法只保留满足 $\sum_i j_i\le\ell-1$ 的项。 因此，$F$ 中每个关联单项式的次数至多为

$$
K=k\bigl(a+2(\ell-1)\bigr)=O_{k,c}(n).\tag{D.1}
$$

^eq-sharp-incidence-degree

令 $\mathcal S_\ell$ 对 $\mathcal B$ 中 $1,V,\ldots,V^{\ell-1}$ 的系数求和。 在 $z_{iv}=x_v$ 处，多重线性化后的因子 $\overline B_i$ 与规范化分支多项式 对应的 $B_i$ 一致。整数 $\widetilde L_i((x_v)_{v\in I_i})$ 的奇偶性， 与原 $P_i$ 在 $x$ 及固定比特处的求值相同。 对这些整数应用引理 [[translation-5#^lem-total-order|5.2]]，可知分支计数在模 $2^p$ 下同余于

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

个，可以用 $J^2$ 个计数器枚举。固定一个数组后，对这一组对， 具有指定大小的子集有

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

连线比特的一个有效赋值为每个检验确定一个子集 $S_i\subseteq I_i$。 记 $z_{i,S_i}=\prod_{v\in S_i}z_{iv}$。检验组 $g$ 处的条目是 $\prod_{i\in\mathcal T_g}\overline B_i(z_i,V)$ 中由其指示的单项式的系数。 由于 $z_i$ 彼此不交，该系数为

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

$F$ 的每个单项式都恰好出现在一个数组中，并且在每个组对处恰好有一个有效索引。 其在 $F$ 中的系数是各检验组系数之积。将具有相同 $v$ 的关联变量设为相等后， 该单项式在所有布尔赋值上的和就是各变量组条目之积。 由 [[translation-D#^eq-sharp-incidence-degree|（D.1）]]，对这些数组求和会遍历所有单项式。 因此，[[translation-D#^eq-sharp-branch-residue|（D.2）]] 中 $\mathcal S_\ell$ 内部的 $\mathcal B$ 元素就是这些二分网络的缩并之和。

为求出检验侧的一个系数，令 $\mathbf1_T$ 为 $I_i$ 上支撑集为 $T\subseteq S_i$ 的布尔向量。在 $\mathbf1_T$ 处，多重线性多项式的值 等于由 $T$ 的子集索引的各系数之和，且它在该处与 $B_i$ 一致。 对这个子集求和关系进行反演，得到

$$
[z_{i,S_i}]\overline B_i(z_i,V)=
 \sum_{T\subseteq S_i}(-1)^{|S_i|-|T|}B_i(\mathbf1_T,V)
 \qquad\text{在 }\mathcal B\text{ 中}.
$$

每一项耗费多项式次位运算。从所列单项式求出 $\widetilde L_i(\mathbf1_T)$， 并使用引理 [[translation-5#^lem-rational-idempotent|5.1]] 中可在多项式时间内构造的多项式 $e_j$。 将 $B_i(\mathbf1_T,V)$ 的 $\ell$ 个系数模 $2^p$ 存储。 至多有 $2^{|S_i|}\le 2^{k\lambda^c}$ 个子集需要处理。 每次对一个检验求和，再在 $\mathcal B$ 中将该组所得的系数相乘。 这样，用 $2^{\lambda^{O_{k,c}(1)}}$ 次位运算以及多项式空间即可求出一个检验组条目。 变量侧条目以及无效连线索引检查都需要多项式时间。 图、次数数组及条目计算过程都有多项式大小的描述。

应用定理 [[translation-D#^thm-tensor-contraction|D.1]]，取规模参数 $s=n\nu$、根精度 $p=n+1$ 以及截断阶数 $\ell=n+1$。 由 [[translation-D#^eq-sharp-wire-budget|（D.3）]]，该图有 $2J$ 个顶点和 $O_{k,c}(s)$ 条连线。 对于所有充分大的 $n$，其最大度至多为 $\lceil s^{9/10}\rceil$， 精度和截断阶数为 $O(s)$，且条目求值时间至多为 $2^{O_{k,c}(s^{9/10})}$。 于是每次缩并耗费 $n^{O_{k,c}(1)}2^{O_{k,c}(s/\sqrt{\log s})}$ 次位运算 以及多项式空间。这里 $s/\sqrt{\log s}=O(n\nu/\sqrt\lambda)$。 高关联数变量的分支与次数数组使运行时间至多乘上

$$
2^{\,n/\sqrt{\lambda}+O_{k,c}(\sqrt n\log n)}.
$$

这一指数中的两项均为 $O_{k,c}(n\nu/\sqrt{\lambda})$。 依次处理各分支和数组。在每个分支上，于 $\mathcal B$ 中对缩并求和并应用 $\mathcal S_\ell$。将各分支的剩余模 $2^{n+1}$ 相加，就得到原计数， 因为原计数介于 $0$ 与 $2^n$ 之间。对有界的例外规模使用直接枚举， 即证明了所述界。

∎

**定理 [[translation-1#^thm-main|1.1]] 中任意密度界的证明。**

^proof-thm-main-arbitrary-density

按照第 [[translation-6#^subsec-general-reduction|6.4]] 节，在原来的 $n$ 个声明变量上规范化公式。 存在空子句的情形以及没有子句的公式都可立即得出答案。 当 $n\ge20$ 时，应用引理 [[translation-6#^lem-sparsify|6.3]]，取 $\sigma=1/\lceil\sqrt{\lambda}\rceil$，其中 $\lambda=\lceil\log_2 n\rceil$。 该树有 $n^{O_k(1)}2^{O(n/\sqrt{\lambda})}$ 个节点，且深度为多项式。 每个叶子的出现次数界为 $B=O_k((\sigma^{-1}\log(2/\sigma))^{k-1})=\lambda^{O_k(1)}$， 且至多有 $Bn$ 个非空子句。

对于具有 $m_G$ 个子句的非平凡叶子，使用引理 [[translation-6#^lem-sparse-checks|6.1]] 的初始奇偶检查以及引理 [[translation-6#^lem-greedy-hashes|6.2]] 的贪心过程。 每个初始行的支撑集大小至多为 $D_0$，而每个附加行的列表长度为 $P$。 这两个界都是 $\lambda^{O_k(1)}$。由 [[translation-6#^eq-hash-query|（6.1）]]， 每个行给出一个次数至多为 $k$、至多含有 $2^k\max\{P,D_0\}$ 个单项式的方程， 且每个被查询的方程组至多有 $6n$ 个方程。 对于所有充分大的 $n$，一个常数 $c=c(k)$ 同时界定方程数与变量数之比， 以及单项式数界中 $\lambda$ 的指数。 在每次贪心步骤中，使用引理 [[translation-D#^lem-tensor-sparse-query|D.2]] 为每个候选行 $h_\gamma$ 计算 $N(A;h_\gamma)$，并添加一个达到最小值的行。 这一求值算法也适用于被丢弃的候选行，即使其方程组仍接受不满足原公式的赋值。 最后再调用一次，得到所选矩阵的 $N(A)$；由引理 [[translation-6#^lem-greedy-hashes|6.2]]， 它等于该叶子的计数。

除求值开销外，构造初始检查并枚举候选行耗费 $2^{\lambda^{O_k(1)}}$ 次位运算。 每个叶子至多进行 $3n(2m_G)^P+1=2^{\lambda^{O_k(1)}}$ 次求值。 由于 $\lambda$ 的每个固定次幂都是 $o(n\log\log n/\sqrt{\log n})$，这些开销以及叶子数都被所述时间界

$$
(n+m)^{O_k(1)}2^{O_k(n\log\log n/\sqrt{\log n})}
$$

所吸收。这里 $m$ 是输入子句数。按深度优先遍历该树，并且每次只处理一个查询。 各叶子的解集两两不交，因此可用一个 $(n+1)$ 位累加器将其精确计数相加。 结合每个查询和每条树路径所需的多项式空间，就得到所述多项式空间界。

∎

一个算法即可同时达到这两种界。令 $\lambda=\lceil\log_2 n\rceil$ 且 $\nu=\lceil\log_2\lambda\rceil$， 当 $m\le n\nu$ 时使用子句网络，否则使用奇偶查询。 在第一个分支中，$n\le s=n+m=O(n\log\log n)$， 因此即使密度随规模增长，其指数也为 $O_k(n\log\log n/\sqrt{\log n})$。 对于每个固定的 $D$ 以及所有充分大的 $n$，每个满足 $m\le Dn$ 的输入 都会进入该分支，且 $s=O_D(n)$。

### D.4 缩并定理的证明

^app-tensor

在定理 [[translation-D#^thm-tensor-contraction|D.1]] 的整个证明中， $\log$ 表示以二为底的对数，$\ln$ 表示自然对数。

#### D.4.1 系数环与精确算术

^subsec-tensor-arithmetic

记 $\lambda=\lceil\log_2 s\rceil$ 且 $e=4\lambda$。 选择一个次数为 $e$ 的首一多项式 $f\in\mathbb Z[U]$， 其首项以下的系数属于 $\{0,1\}$，并且其模二约化不可约。 通过枚举 $2^e$ 个候选多项式，并在 $\mathbb F_2$ 上测试其是否被 每个正次数至多为 $e/2$ 的首一多项式整除，就可以确定性地在关于 $s$ 的多项式时间内完成这一选择。有限域上存在每个正次数的不可约多项式 〔[vzGG13](https://doi.org/10.1017/CBO9781139856065 "原引用键 vzGG13")〕。 令

$$
\mathcal O=\mathbb Z_{(2)}[U]/(f),\qquad
 \mathcal K=\mathbb Q[U]/(f),\qquad
 \mathcal A=\mathcal O[V]/(V^\ell),\qquad
 \mathcal A_p=\mathcal A/(2^p).
$$

这里 $\mathbb Z_{(2)}$ 由分母为奇数的有理数组成。 模二不可约蕴含在 $\mathbb Q$ 上不可约，所以 $\mathcal K$ 是一个域。 对于 $\mathcal K$ 的非零元素，令 $v_2$ 为它在基 $1,U,\ldots,U^{e-1}$ 下各坐标的通常2-进赋值的最小值。 $\mathcal O$ 的模二约化是域 $\mathbb F_{2^e}$。 因此，提出坐标最小2-进赋值所对应的因子可知

$$
v_2(xy)=v_2(x)+v_2(y)\qquad(x,y\ne0).
$$

$\mathcal O$ 中每个模二非零的元素都是单位，因为其乘法矩阵的行列式 在 $\mathbb Z_{(2)}$ 中可逆，所以逆矩阵的条目也属于该环。

$\mathcal A_p$ 中的算术运算使用关于 $s,p,\ell$ 的多项式时间和空间。 我们采用基 $1,U,\ldots,U^{e-1}$ 与 $1,V,\ldots,V^{\ell-1}$， 并以零至 $2^p-1$ 之间的整数剩余表示每个坐标。 标量单位的求逆可以先模二求逆再进行 Newton 提升， 也可以通过其乘法矩阵完成，使用的都是精确多项式与整数运算 〔[vzGG13](https://doi.org/10.1017/CBO9781139856065 "原引用键 vzGG13")〕。 $\mathcal A$ 中元素的整除性与精度一律逐坐标理解。

$2^e$ 个剩余域元素的二进制坐标提升给出两两之差均为单位的插值点。 因此，在其中任意所需数量的点上，Lagrange 插值在 $\mathcal A_p$ 上都有效。 我们使用的点数少于 $s^4$。若缩并的初始条目属于 $\mathcal B_{P_0,\ell}$， 则在 $\mathcal A_{P_0}$ 中计算后，结果仍属于该子环， 因为缩并是这些条目的一个多项式。

当精度增加时，我们分别提升每个张量条目。 对于一个原本模 $2^p$ 指定的条目，其*规范提升*是由其所有坐标的 整数代表得到的 $\mathcal A$ 元素。规范提升不一定保持加法或乘法。 每次递归调用都在该次调用的精度模数下缩并其指定张量。 为了定义其变形，该调用首先逐条目选择上述提升； 该次调用中的所有后续求值都针对这些相同的提升。 更明确地说，每个张量描述都附带其创建精度 $p_c$ 的标记 （原始张量的创建精度为 $P_0$）。在以后每个精度下， 其条目均先模 $2^{p_c}$ 求值，再使用这些相同的整数代表。 精度沿递归路径严格递增，所以这些代表在以后每个精度下也都是规范代表。 特别地，分包张量在整个递归中都保留其创建时的代表。

#### D.4.2 参数与碰撞打包

^subsec-tensor-packing

以下所有估计对充分大的 $s$ 都成立，阈值仅依赖于固定常数。 规模较小的一个固定有限范围通过直接求和处理。参数不等式可以直接检验。 设置

$$
H=\left\lceil\frac{s}{\lfloor\sqrt\lambda\rfloor}\right\rceil,
 \qquad r=64,\qquad \varepsilon=\frac1{128\cdot1024},
 \qquad \Delta=\lceil s^{9/10}\rceil.
$$

边数为 $M\le H$ 的调用是叶子，直接求值。 对于深度为 $d$ 的活跃调用，以根的深度为零，使用

$$
u=u_d=\left\lfloor\frac{\varepsilon\lambda}{2^d}\right\rfloor,
 \qquad a=a_d=2\sum_{j=0}^d u_j,\qquad
 a_{-1}=0,\qquad L=2^a,\qquad D_{\rm arr}=r^{2a}.\tag{D.4}
$$

^eq-tensor-parameters

我们将保证每个子调用至多有 $M/8$ 条边，且最大度至多为 $\Delta$。 这些断言蕴含：在每条活跃路径上，

$$
H<M\le Cs\,8^{-d},\qquad
 d\le\frac{\log_2\lambda}{6}+O_C(1).
$$

因此，对于所有充分大的 $s$，

$$
u=\Theta_C(\lambda/2^d),\quad
 \lambda^{4/5}\le u\le M,\quad
 a\le4\varepsilon\lambda,\quad
 L,D_{\rm arr}\le s^{1/1000}\tag{D.5}
$$

^eq-tensor-parameter-bounds

成立。特别地，每个活跃调用均满足

$$
M\ge2D_{\rm arr}^{\,2}\Delta,\qquad
 M\ge L D_{\rm arr},\qquad 2L\le\Delta.\tag{D.6}
$$

^eq-tensor-packing-conditions

例如，第一个不等式的右端为 $O(s^{9/10+2/1000})=o(H)$。 其余不等式同理可得。

> ##### 引理 D.3　分包装填
>
> 
> 
> ^lem-tensor-packets
> 
> 
>
> 在 [[translation-D#^eq-tensor-packing-conditions|（D.6）]] 的条件下，用 $[r]^a$ 中的元素 标记网络每一侧的顶点。可以确定性地构造一种标记， 并将边嵌入各有 $L$ 个槽位的分包，使其满足以下性质。
>
> 1.  分包数至多为 $3M/L$。每条边在行端与列端占据相同的槽位。 未使用的槽位没有端口。
>
> 2.  在每个分包的每个坐标中，行符号与列符号所构成的无序对是固定的。 当这两个符号不同时，槽位编号的第 $i$ 位指定它们在坐标 $i$ 中的朝向， 其中 $0\le i<a$。
>
> 3.  对于每个坐标与每个符号，每一侧至多有 $3M/r$ 个真实端口 属于在该坐标上具有该符号的顶点。
>
> 构造使用关于 $s+\mathcal L$ 的多项式时间和空间。

**证明。**

^proof-lem-tensor-packets

对于每一对标记，令 $X_\gamma$ 为具有这一标记对的边数。 独立均匀的顶点标记给出

$$
\mathbb E\sum_\gamma (X_\gamma-M/D_{\rm arr})^2\le2M\Delta.
$$

事实上，展开后，该期望可表示为对有序边对求和，每一项是它们标记相同的概率 减去 $1/D_{\rm arr}$。端点不交的边对贡献零。 包括两条边相同的情形在内，至多有 $2M\Delta$ 个有序边对共享一个端点， 且每对的贡献至多为一。条件期望法给出满足这一界的标记。 为实现该方法，依次尝试下一个顶点的 $r^a$ 种标记， 并通过枚举边对计算条件期望。每个概率至多涉及四个顶点， 因此这是一个精确的多项式时间计算。这就是通常的条件期望法 〔[Rag88](https://doi.org/10.1016/0022-0000(88)90003-7 "原引用键 Raghavan88")〕。

每个负载至多为 $M/D_{\rm arr}+\sqrt{2M\Delta}$。 将所有标记对类别都填充到共同的槽位数 $H_{\rm pad}$， 该数是将最大负载向上取整到 $L$ 的倍数所得的值。由假设得

$$
H_{\rm pad}\le M/D_{\rm arr}+\sqrt{2M\Delta}+L
              \le3M/D_{\rm arr}.
$$

固定每个坐标中的无序符号对。若有 $a'$ 个坐标的两个符号不相等， 则它们的朝向给出 $2^{a'}$ 个标记对。 将它们填充后的槽位划分成分包，每个分包从这些标记对的每一类中取 $2^{a-a'}$ 个槽位。由于 $H_{\rm pad}$ 可被 $L$ 整除，这样的划分是可行的。 将一个分包的位置编号为 $0$ 至 $L-1$。当第 $i$ 个符号对不相等时， 位置编号的第 $i$ 位指定朝向；当符号对相等时，则指定副本。 在每个分包内始终使用同一种朝向约定。

分包数为 $H_{\rm pad}D_{\rm arr}/L\le3M/L$。 在一个固定坐标中，给定符号在任意一侧都恰好出现在全部填充标记对的 $1/r$ 中。 因此，其真实端口数至多为 $H_{\rm pad}D_{\rm arr}/r\le3M/r$。

∎

#### D.4.3 Cauchy 变形与整性局部坐标

^subsec-tensor-deformation

固定一个活跃调用、它的分包以及逐条目提升后的张量。使用

$$
S=\{-L,-L+1,\ldots,L-1\},\qquad
 \mathcal C(T)=\prod_{t\in S}(T-t),\qquad \alpha=2^{a+1}.
$$

在一个分包内，对于其行槽位 $x$ 与列槽位 $y$，令

$$
W_{xy}(T)=\frac{\mathcal C(T)}
                  {\mathcal C'(0)(T-(y-x))}.\tag{D.7}
$$

^eq-tensor-cauchy

由于 $y-x\in S$，分母中的因子可以与分子中的一个因子约去。 因此这是一个 $\mathbb Q$ 上次数为 $2L-1$ 的多项式。 将不同分包之间的条目设为零，并限制到真实端口上。 在原来的边识别关系下，$W(0)=I$，因为对角条目为一， 而其他每个条目都含有一个未约去的零因子。

令 $A(Y)$ 与 $B(X)$ 分别为提升后的行张量与列张量在独立端口赋值 $Y,X\in\{0,1\}^M$ 上的乘积。记 $l_0(z)=1-z$ 且 $l_1(z)=z$。 定义

$$
F(T)=\sum_{X,Y\in\{0,1\}^M} A(Y)B(X)
                  \prod_{\text{行端口 }x}l_{Y_x}((W(T)X)_x).\tag{D.8}
$$

^eq-tensor-deformed-contraction

其系数属于 $\mathcal K[V]/(V^\ell)$，次数至多为 $M(2L-1)$， 且 $F(0)$ 是提升后张量的缩并。特别地，将 $F(0)$ 模该次调用的精度约化， 就得到所需答案。

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

中，每个由 $q\ne t$ 索引的因子均逐系数可被 $2^{v_2(t-q)}$ 整除。 将这些幂与分母约去后，上式中的多项式可被 $2^{a+1}$ 整除。 要得到 [[translation-D#^eq-tensor-cauchy|（D.7）]]，只需去掉由 $y-x$ 索引的因子。 若 $y-x=t$，则去掉的是 $\alpha z$，剩下一个具有整性的多项式。 否则，$\alpha z$ 仍保留，而所去掉因子的二进系数公因子为 $2^{v_2(t-y+x)}$，其中 $v_2(t-y+x)\le a$，所以结果仍可被二整除。 代入 [[translation-D#^eq-tensor-deformed-contraction|（D.8）]] 即证明了关于 $F$ 的断言。

求值时，首先将每个满足 $q\ne t$ 的因子 $t-q+\alpha z$ 除以已知整数 $2^{v_2(t-q)}$。所得一次多项式的两个系数都是整数。 然后如上所述，将剩余的显式二的幂与分母约去，并对分母的奇数部分模 $2^p$ 求逆。 现在可以直接在给定的 $\zeta$ 的剩余处求出该乘积的值，包括 $\zeta=0$ 的情形。 输入有 $ep$ 位，而乘积有 $O(L)$ 个因子。 所有坐标运算都使用关于 $s,p$ 的多项式时间。

∎

#### D.4.4 渐变 Hermite 恢复

^subsec-tensor-hermite

下一个引理单独给出精度估计。其中陈述的所有幂级数截断都是关于 $z$ 的通常截断。

> ##### 引理 D.5　渐变 Hermite 恢复
>
> 
> 
> ^lem-tapered-hermite
> 
> 
>
> 设整数 $u,M$ 满足 $1\le u\le a$ 且 $M\ge u$，并令 $h=\lceil3M/u\rceil$。 对于 $t\in S\setminus\{0\}$，设置
>
> $$
> i=v_2(t),\qquad q_t=q(i)=h\max(0,u-i),\qquad D_t=L/2^i.
> $$
>
> 假设 $F\in(\mathcal K[V]/(V^\ell))[T]$ 的次数至多为 $M(2L-1)$，$F(0)\in\mathcal A$，且对于每个 $t\in S$， 均有 $F(t+\alpha z)\in\mathcal A[z]$。 对于 $p\ge1$，其值 $F(0)$ 模 $2^p$ 可以从以下数据恢复：
>
> $$
> F(t+\alpha z)\pmod{2^{p_t}},
>  \qquad
>  p_t=p+8hD_t+8M(a+1),\qquad q_t>0.
> $$
>
> 只需要每个多项式的前 $q_t$ 个系数。 恢复过程使用关于 $M,L,\ell,e$ 以及各精度的多项式时间和空间。

**证明。**

^proof-lem-tapered-hermite

$S$ 中有 $L$ 个奇数点，所以 $\sum_{t\ne0}q_t\ge Lhu\ge3ML>M(2L-1)$。 此外，$h\le4M/u$，因而 $q_t\le4M$。 对于每个重数为正的 $t$，令

$$
E_t(T)=\prod_{q\in S\setminus\{0,t\}}
                    \left(\frac{T-q}{t-q}\right)^{q_q}.
$$

Hermite 插值给出

$$
F(0)=\sum_{t:q_t>0}E_t(0)
       \left(\left[\frac{F(t+\alpha z)}
                            {E_t(t+\alpha z)}\right]_{<q_t}\right)
                            (-t/\alpha).\tag{D.9}
$$

^eq-tensor-hermite-origin

为使论证完整，将右端的零替换为不定元 $T$，并将 $-t/\alpha$ 替换为 $(T-t)/\alpha$。每个加项的次数均小于 $\sum q_t$。 它在自身节点处具有规定的截断 Taylor 数据，而在每个其他节点处都按要求的阶数消失。 因此，该和与 $F$ 的差可被 $\prod_{t\ne0}(T-t)^{q_t}$ 整除， 但其次数更小，所以差为零。这就是 Hermite 插值通常采用的中国剩余构造 〔[vzGG13](https://doi.org/10.1017/CBO9781139856065 "原引用键 vzGG13")，第 5.6 节〕。

$E_t(t+\alpha z)$ 的每个因子都是 $1+\alpha z/(t-q)$ 的一个幂。 它具有整性，且常数项为一。因此，其倒数截断到 $q_t$ 后仍具有整性， 所以形成 [[translation-D#^eq-tensor-hermite-origin|（D.9）]] 中的商不会损失精度。

固定 $i=v_2(t)$ 与 $D=D_t$。由乘积直接得到

$$
\begin{aligned}
v_2(E_t(0))
 &=\sum_{q\ne0,t}q_q\bigl(v_2(q)-v_2(t-q)\bigr)\\
 &=D\sum_{j=1}^{a-i}\frac{j}{2^j}
                           \bigl(q(i+j)-q(i)\bigr)
 \ \ge -6Dh.
\end{aligned}\tag{D.10}
$$

^eq-tensor-hermite-loss

为说明第二个等号，2-进赋值小于 $i$ 的点贡献零。 对于 $1\le j\le a-i$，满足 $v_2(q)=i+j$ 的点有 $D/2^j$ 个， 满足 $v_2(t-q)=i+j$ 的点也有同样多个。 后一类点满足 $v_2(q)=i$，而这些层级涵盖了除 $t$ 外所有具有该2-进赋值的点。 这些计数来自完全剩余网格，其非零整数差的2-进赋值至多为 $a$。 最后，$q(i+j)-q(i)\ge-hj$，且 $\sum_{j\ge1}j^2/2^j=6$。

将一个次数小于 $q_t$ 的多项式在 $-t/\alpha$ 处求值， 至多额外损失 $4M(a+1)$ 个二的幂次。 因此，将每个商的系数替换为其模 $2^{p_t}$ 的剩余的任意提升， 只会使其在 [[translation-D#^eq-tensor-hermite-origin|（D.9）]] 中的贡献改变一个 $2^p\mathcal A$ 中的元素。将这些误差相加不会进一步损失精度。 重构出的和是整的，因为它与整值 $F(0)$ 之差属于 $2^p\mathcal A$。

最后的组合可以在指定的基下通过有理数算术完成。 乘子 $E_t(0)(-t/\alpha)^j$（$j<q_t$）都是多项式多个 $O(a)$ 位有理因子的乘积，其中按重数计数。 因此，其分子与分母的位长是关于 $M,L,a$ 的多项式。 这样的系数有多项式多个，所以即使将它们的所有分母相乘， 也足以作为一个多项式位长的公分母。 相加后，约去其二的幂因子，并将所得整坐标模 $2^p$ 约化。 这就证明了算法方面的断言。

∎

在输入精度为 $p$ 的调用中，以 [[translation-D#^eq-tensor-parameters|（D.4）]] 中的参数应用这个引理。 对于每个活跃的 $t$，在 $M(2L-1)+1$ 个不同剩余域元素的二进制坐标提升处求值， 并进行 Lagrange 插值，从而得到模 $2^{p_t}$ 的整个多项式 $F(t+\alpha z)$。 引理 [[translation-D#^lem-tensor-integrality|D.4]] 保证可以在 $\mathcal A_{p_t}$ 上进行此插值。 由 [[translation-D#^eq-tensor-parameter-bounds|（D.5）]]，点数少于 $s^4$。 下述求值算法向其子调用传递精度 $p_t$。

输入精度与子调用精度满足

$$
p\le s\lambda^{O(1)}2^{a_{d-1}},
 \qquad
 p_t=O_C(MD_t/u).\tag{D.11}
$$

^eq-tensor-precision-bound

第一项断言在根处成立，因为 $P_0\le Cs$。 沿一条路径，精度增量为 $8hD_t+8M(a+1)$，其中 $h\le4M/u$、$M\le Cs$ 且 $D_t\le2^{a_d}$。 将这些增量在 $O(\log\lambda)$ 个深度上相加，就证明了包括叶子在内 每次调用的第一项断言。对于第二项，$q_t>0$ 蕴含 $i<u$，从而

$$
D_t\ge2^{a_d-u}=2^{a_{d-1}+u}.
$$

由于 $M>H$ 且 $u\ge\lambda^{4/5}$，这个额外因子 $2^u$ 支配 $\lambda$ 的每个固定次幂。因此，对 $p$ 的第一个界以及 $8M(a+1)$ 都是 $O_C(MD_t/u)$。 剩余增量 $8hD_t$ 直接满足该界。 由于 $a_d\le4\varepsilon\lambda$，所有精度始终都是关于 $s$ 的多项式。

重数的渐变使这一估计中出现了因子 $1/u$。 作为比较，给每个低于 $u$ 的层级赋予相同重数 $q_*=\Theta(M)$， 而其余层级的重数为零。在最后一个保留层级 $i=u-1$ 处， 恒等式 [[translation-D#^eq-tensor-hermite-loss|（D.10）]] 将给出损失

$$
-q_*D_t\sum_{j=1}^{a-i}\frac{j}{2^j}=-\Theta(MD_t).
$$

相较之下，我们的重数每个层级只变化 $h=\Theta(M/u)$， 从而给出损失 $O(MD_t/u)$。对 $a_d$ 的累积式选取提供了额外因子 $2^u$， 用以吸收继承的精度与求值损失。 因此，更小的界在每个保留层级以及每个递归深度都成立。

#### D.4.5 组间相互作用的模态

^subsec-tensor-modes

固定一个活跃的 $t$，以及 $z$ 的一个插值值 $\zeta\in\mathcal O$。 在本小节中，$T=t+\alpha\zeta$，且所有计算均在模 $2^{p_t}$ 下进行。 令 $i=v_2(t)<u$ 且 $D=L/2^i$。 按照坐标 $i$ 中的符号对两侧的顶点分组。 $W(T)$ 中两个端口同组的条目称为局部条目，并保持不变。

这种坐标选择使 $W(t)$ 成为局部的。 事实上，除非 $y-x=t$，否则 $W_{xy}(t)=0$。 加上一个2-进赋值为 $i$ 的整数会翻转第 $i$ 位，所以一个保留下来的端口对 具有不同的第 $i$ 位。当分包在该坐标中的两个符号不同时， 这意味着行符号与列符号一致。相等的符号对已经位于同一组中。 从 $t$ 移到 $t+\alpha\zeta$ 会引入跨组项，下面将其展开。

在坐标 $i$ 中两个符号不同的分包内，行位置 $x$ 与列位置 $y$ 属于不同组，当且仅当它们的第 $i$ 位相等。将列划分为如下区块：

$$
y=y_0+2^{i+1}j,\qquad 0\le y_0<2^{i+1}.
$$

每个区块中的列组是固定的。对于跨组连接到该区块的一行，

$$
v_2(t-y_0+x)\le i.
$$

否则，$y_0$ 将与 $x+2^i$ 模 $2^{i+1}$ 同余， 这与它们的第 $i$ 位相等相矛盾。加上 $\alpha\zeta$ 不改变此2-进赋值。 因此，几何级数展开给出

$$
W_{xy}(T)=
 \sum_{\substack{b\ge0\\b+1<p_t}}
 \frac{\mathcal C(T)}
      {\mathcal C'(0)(T-y_0+x)}
 \left(\frac{2^{i+1}}{T-y_0+x}\right)^b j^b
 \pmod {2^{p_t}}.\tag{D.12}
$$

^eq-tensor-mode-expansion

事实上，第一个分式的2-进赋值至少为 $a+1-i\ge1$， 而取 $b$ 次幂的那个比值在取幂之前的2-进赋值至少为一。 几何级数的余项可被 $2^{p_t}$ 整除。 这些表达式可以通过提出已知的二的幂因子，并且只对单位求逆来计算。

对于每个这样的分包、区块及 $b$，引入权重为 $w_Z=b+1$ 的模态变量 $Z$， 之后将其替换为

$$
L_Z(X)=\sum_{\text{区块内的真实列 }y}j^bX_y.
$$

照常约定 $j^0=1$，包括 $j=0$ 的情形。 其源组是该区块的列组，目标组是该分包的坐标符号对中的另一组。 公式 [[translation-D#^eq-tensor-mode-expansion|（D.12）]] 将每个行形式表示为其局部部分， 加上以该行所属组为目标的模态的线性组合。 $Z$ 的系数可被 $2^{w_Z}$ 整除。 任一给定权重的变量至多有

$$
(3M/L)2^{i+1}=6M/D\tag{D.13}
$$

^eq-tensor-mode-multiplicity

个。

在仿射因子 $l_{Y_x}((W(T)X)_x)$ 的乘积中， 每个模态单项式 $Z^\beta$ 的系数都可被 $2^{\sum_Zw_Z\beta_Z}$ 整除。 因此只需考虑满足

$$
\sum_Zw_Z\beta_Z<p_t\tag{D.14}
$$

^eq-tensor-mode-budget

的指数元组。这些元组的个数为

$$
\exp\bigl(O(\sqrt{Mp_t/D})\bigr)
       =\exp\bigl(O_C(M/\sqrt u)\bigr).\tag{D.15}
$$

^eq-tensor-partition-count

下面给出完整的计数估计。对于任意 $\theta>0$， 生成函数乘积与 [[translation-D#^eq-tensor-mode-multiplicity|（D.13）]] 将该个数界定为至多

$$
\exp\left(\theta p_t+\frac{6M}{D}
                   \sum_{j\ge1}-\ln(1-e^{-\theta j})\right).
$$

展开对数并对几何级数求和，得到

$$
\sum_{j\ge1}-\ln(1-e^{-\theta j})
  =\sum_{h\ge1}\frac1{h(e^{\theta h}-1)}
  \le\frac1\theta\sum_{h\ge1}\frac1{h^2}.
$$

取 $\theta=\sqrt{M/(Dp_t)}$ 并使用 [[translation-D#^eq-tensor-precision-bound|（D.11）]]。 所有模态变量及其指数都有多项式大小的描述。 将变量排序，并在剩余预算约束下依次选择每个指数，就可以用多项式延迟和空间 枚举满足 [[translation-D#^eq-tensor-mode-budget|（D.14）]] 的元组。 每个可行的部分选择都有全零后续选择，因此，除去一个加法常数， 被访问的部分选择数至多等于完整元组数乘以变量数。

#### D.4.6 子网络及其描述

^subsec-tensor-children

对于 [[translation-D#^eq-tensor-mode-budget|（D.14）]] 中的一个元组 $\beta$， 为每个组 $g\in[r]$ 构造一个子网络。 将当前网络两侧所有属于组 $g$ 的顶点置于子网络的一侧。 保留它们的端口与所选的提升条目，并将这些条目模 $2^{p_t}$ 约化。 在另一侧为每个分包设置一个顶点，用边连接到该分包的每个保留端口。 其索引恰好是该分包中组 $g$ 的行比特 $Y$ 与列比特 $X$。

为定义这个新的分包张量，构造该分包内组 $g$ 的行因子 $l_{Y_x}$ 的乘积， 其自变量用局部列比特与形式模态表达。 对于该分包中所有以 $g$ 为目标的模态，提取指数为 $\beta_Z$ 的系数。 再将其乘以

$$
\prod_{\substack{Z\text{ 在此分包中}\\
                  \text{源}(Z)=g}}L_Z(X)^{\beta_Z}.
$$

空乘积等于一。若没有目标行，则只要有一个目标指数为正，提取出的系数就为零。 若 $Z$ 的源区块没有真实列，则 $L_Z(X)=0$， 其幂在 $\beta_Z=0$ 时贡献一，否则贡献零。

每个模态恰有一个目标组和一个源组。 因此，系数提取按分包与组对应的行乘积分解， 而每个模态的代入仅依赖于其源组中的比特。 对 [[translation-D#^eq-tensor-deformed-contraction|（D.8）]] 中的乘积展开， 再对各组内部相互独立的比特求和，就证明了精确恒等式

$$
F(t+\alpha\zeta)
   =\sum_{\beta:\,\sum w_Z\beta_Z<p_t}
                       \prod_{g=1}^r Z_{g,\beta}
                  \pmod {2^{p_t}},\tag{D.16}
$$

^eq-tensor-recursion-identity

其中 $Z_{g,\beta}$ 是刚刚定义的子网络的缩并。 由系数整除性，被略去的单项式均为零。

由引理 [[translation-D#^lem-tensor-packets|D.3]]，子网络至多有 $6M/r=3M/32<M/8$ 条边。旧顶点的度不变， 而一个新分包顶点至多有 $2L\le\Delta$ 个端口。 因此，[[translation-D#^eq-tensor-parameter-bounds|（D.5）]] 中使用的不变量归纳成立。

所有新张量都以隐式方式给出。为求出一个分包张量的条目， 展开其至多 $L$ 个仿射行因子的乘积。 每个因子的项数是关于 $s$ 的多项式，其中包括其局部项。 枚举这些选择，检查所需指数，再将所得各项相加，耗费

$$
\exp(O(L\log s))
$$

时间以及多项式空间。因子 $L_Z(X)^{\beta_Z}$ 通过 $\mathcal A_{p_t}$ 中通常的反复平方计算。 由于 $L\le s^{1/1000}$，这一条目计算开销为 $\exp(O(s^{9/10}))$。

新张量的描述由其分包数据、元组 $\beta$、插值值以及创建精度组成。 这些数据与局部核足以直接计算其条目。 保留的张量从其原始描述求值；若它是递归中更早创建的张量， 则从它自己的创建时描述求值。然后将其在该精度下的剩余规范地提升到当前精度。 旧描述不可变，并通过引用共享。因此，条目计算过程的复合不会随深度累积， 而且所有条目计算过程始终满足所需的时间与空间界。 沿一条路径只会添加多项式多个顶点以及多项式规模的新描述数据。

#### D.4.7 时间与空间界

^subsec-tensor-cost

**定理 [[translation-D#^thm-tensor-contraction|D.1]] 的证明。**

^proof-thm-tensor-contraction

将原始条目嵌入 $\mathcal A_{P_0}$，并执行上述递归算法。 在一个活跃调用中，对于每个重数为正的节点以及每个所需的剩余互异的插值值， 通过其子网络的缩并计算 [[translation-D#^eq-tensor-recursion-identity|（D.16）]]。 插值得到 $F(t+\alpha z)$，并应用引理 [[translation-D#^lem-tapered-hermite|D.5]]。 在叶子处，直接对所有布尔边赋值求和。 引理 [[translation-D#^lem-tensor-integrality|D.4]]、递归恒等式以及恢复引理， 从叶子开始通过归纳证明了正确性。

每次调用中的插值节点数、插值值数以及组数均为关于 $s$ 的多项式， 与 $\mathcal L$ 无关。由 [[translation-D#^eq-tensor-partition-count|（D.15）]]， 一个深度为 $d$ 的活跃调用的子调用数至多为

$$
s^{O(1)}\exp\left(
       O_C\left(\frac{s}{\sqrt\lambda}
                    \left(\frac{\sqrt2}{8}\right)^d\right)\right).
$$

事实上，$M\le Cs\,8^{-d}$ 且 $u_d=\Theta_C(\lambda/2^d)$。 将这些界在 $O_C(\log\lambda)$ 个深度上相乘， 或者用这种方式界定每层的节点数，可得总调用数至多为

$$
\exp\left(O_C(s/\sqrt\lambda)
                   +O_C(\lambda\log\lambda)\right)
       =\exp(O_C(s/\sqrt\lambda))
$$

次。在叶子处，直接求和使用至多 $2^H$ 个赋值， 且每个赋值需要多项式多次条目求值。 其开销由 $s+\mathcal L$ 的一个多项式乘以下式所界定：

$$
\exp(O_C(H)+O_{C,A}(s^{9/10}))
   =\exp(O_{C,A}(s/\sqrt\lambda)).
$$

除已界定的条目计算外，局部算术、打包、描述以及恢复对每个生成项都使用多项式时间。 依赖于描述的因子界定了每次调用的工作量。 由于分支数的界与 $\mathcal L$ 无关， 总工作量仍仅带有一个关于 $s+\mathcal L$ 的固定多项式因子。 这就证明了时间界。

对于空间，以深度优先方式遍历递归， 每次累加一个关于 $\beta$ 的和，并累乘一个关于各组的积。 存储一次调用恢复所需的多项式多个 Taylor 数据、 当前的插值索引与模态索引，以及图和新张量的描述。 它们的大小均为关于 $s+\mathcal L$ 的多项式； 由 [[translation-D#^eq-tensor-precision-bound|（D.11）]]，其中也包括精度。 栈只有 $O_C(\log\lambda)$ 层。 引理 [[translation-D#^lem-tapered-hermite|D.5]] 中的公分母计算也只使用多项式位长的整数。 每次调用都在自己的固定精度模数下累加其缩并项。 根据假设，原始条目计算过程使用多项式空间，而新过程也具有同样的性质。 这就证明了空间界。最后提取 $\mathcal A_{P_0}$ 中的基环坐标， 得到 $\mathcal B_{P_0,\ell}$ 中的答案。

∎
