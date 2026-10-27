---
id: translation-1
title: "原文中文译文 1 引言"
kind: translation
group: 原文中文译文
source_label: "1"
order: 100
publish: true
status: 原文中文译文（已审校）
---

## 1 引言

本文对每个固定的 $k\ge2$ 给出一种确定性算法，在次指数时间和多项式空间内计算 $k$-CNF 的满足赋值数，从而否定 ETH。

将具有 $n$ 个声明变量和 $m$ 个输入子句的输入 $k$-CNF 写成

$$
F(x_1,\ldots,x_n)=\bigwedge_{e=1}^m
 \bigl[(x_{i_{e,1}}\oplus b_{e,1})\vee\cdots\vee
       (x_{i_{e,k}}\oplus b_{e,k})\bigr],
$$

其中，$i_{e,j}\in\{1,\ldots,n\}$ 和 $b_{e,j}\in\{0,1\}$ 分别是子句 $e$ 中第 $j$ 个文字的变量索引和否定位，$\oplus$ 表示模二加法。通过重复一个文字，可以容纳文字数少于 $k$ 的子句。索引 $i_{e,j}$ 和位 $b_{e,j}$ 由 $F$ 固定；只有 $x_1,\ldots,x_n$ 随赋值而变化。我们的目标是计算

$$
\#F=\bigl|\{x\in\{0,1\}^n:F(x)=1\}\bigr|.\tag{1.1}
$$

^eq-solution-count

检验 $\#F>0$ 也能判定可满足性。当 $n$ 增长时，我们保持 $k$ 固定。全文中，$\log$ 表示自然对数。

> ##### 定理 1.1
>
> 
> 
> ^thm-main
> 
> 
>
> 对于每个固定的 $k\ge2$，存在一种确定性算法：给定具有 $n\ge20$ 个声明变量和 $m$ 个子句的 $k$-CNF $F$，它以
>
> $$
> (n+m)^{O_k(1)}2^{O_k(n\log\log n/\sqrt{\log n})}
> $$
>
> 次位运算和 $(n+m)^{O_k(1)}$ 位空间，计算 [[translation-1#^eq-solution-count|（1.1）]] 所定义的 $\#F$。对于每个固定的 $D>0$，该算法在满足 $m\le Dn$ 的输入上的运行时间为
>
> $$
> (n+m)^{O_{k,D}(1)}2^{O_{k,D}(n/\sqrt{\log n})}.
> $$

第 [[translation-6#^subsec-general-reduction|6.4]] 节中的有理插值论证给出较弱的指数 $O_k(\rho(n))$，其中

$$
\rho(n)=\frac{n(\log\log n)^2}{\sqrt{\log n}}
          =\frac{n}{(\log n)^{\frac12+o(1)}}.
$$

附录 [[translation-D#^app-quantitative|D]] 通过张量缩并证明定理 [[translation-1#^thm-main|1.1]] 中的两个界。

### 1.1 指数时间假设与证明构造

^sec-related

#### 1.1.1 SAT 算法与指数时间假设

^subsec-related-sat

指数时间假设（ETH）断言，$3$-SAT 在最坏情形下需要 $2^{\Omega(n)}$ 确定性时间，因此对于每个固定的 $k\ge3$，$k$-SAT 也如此 〔[IP01](https://doi.org/10.1006/jcss.2000.1727 "原引用键 IP01")，定理 1〕。

对于每个固定的 $k$，检验精确计数为正还是为零，就能在确定性 $2^{o(n)}(n+m)^{O_k(1)}$ 时间内判定可满足性和不可满足性。因此，定理 [[translation-1#^thm-main|1.1]] 否定了 ETH。

#### 1.1.4 代数求和与插值恢复

^subsec-related-algebraic

我们的算法是代数性的，基于对精心选择的辅助变量进行多项式插值。

第 [[translation-3#^sec-counting|3]]–[[translation-6#^sec-hashes|6]] 节中的算法在各组内枚举赋值。固定共享测量 $\vec y$，就使各组的贡献能够独立相乘。

我们的求和过程使用截断多项式环，在一次计算中保留多个系数。

我们的多项式替代将所求计数与可据以重构该计数的结构化求值联系起来。这里有用的结构是在固定少量共享测量后分离成组。

对于一个一元限制 $g$，其在 $t$ 处的 $j$ 阶 Hasse 导数是 $g(t+z)$ 中 $z^j$ 的系数。我们采用以下恢复原理：在每个允许快速求和的点计算多个 Taylor 系数，然后通过 Hermite 插值恢复原始计数。

在我们的算法中，矩阵构造提供低次数替代形式，使我们能够在固定少量共享测量后，通过快速求和计算插值点处的 Taylor 系数。

#### 1.1.5 矩阵构造

^subsec-related-spectral

我们的计数算法在布尔赋值上计算多项式乘积之和。这些多项式共享变量，因此这些和无法分解为相互独立的较小求和的乘积。我们引入依赖于一个插值参数的多项式型线性替换，使得固定少量整数线性测量后就能够进行这样的分解。一个辅助有理方阵 $M_0$ 是这些替换的基础：$\operatorname{rank}(I-M_0)$ 的界限制了测量的数量，而对 $M_0$ 的非零元素的限制使替换的次数保持较小。第 [[translation-2#^subsec-preview-auxiliary|2.7]] 节解释了这一联系。

我们的构造在一个短区间上对 $(-1)^j$ 进行插值，以得到一个关于相互交换的置换矩阵的多项式。同一个多项式同时给出 $I-M_0$ 的秩界以及对 $M_0$ 非零元素的限制。我们在第 [[translation-4#^sec-construction|4]] 节直接证明这些性质及其定量界。

#### 1.1.6 稀疏化与奇偶检验

^subsec-related-reductions

我们使用保持计数的版本 〔[DHM$^{+}$14](https://arxiv.org/abs/1206.1775 "原引用键 DHMTW")，附录 A〕 来应用稀疏化引理 〔[IPZ01](https://doi.org/10.1006/jcss.2001.1774 "原引用键 IPZ")〕，以及来自文献 〔[CIP06](https://cseweb.ucsd.edu/~paturi/myPapers/pubs/CalabroImpagliazzoPaturi_2006_ccc.pdf "原引用键 CIP")，第 6 节〕 和 〔[Cal09](https://cseweb.ucsd.edu/~ccalabro/dissertation_single_spaced.pdf "原引用键 CalabroThesis")，引理 5.14 及 式 (5.4)〕 的定量界。这将满足赋值划分到同一组布尔变量上的若干稀疏公式中。附录 [[translation-A#^app-sparsify|A]] 记录了不交分支论证，以及当其参数随输入规模变化时所需的界。

初始奇偶检验是一个 Tanner 码的约束 〔[Tan81](https://doi.org/10.1109/TIT.1981.1056404 "原引用键 Tanner81")，第 II 节〕，施加于记录一个赋值违反了哪些子句的二元向量。我们使用文献 〔[SS96](https://doi.org/10.1109/18.556667 "原引用键 SS96")，第 IV 及 VI 节〕 中基于边的扩展码构造：每条图边承载一个位，每个顶点要求与其关联的位属于一个固定的二元线性码。局部码的最小距离连同图的扩张性，迫使每个满足所有这些约束的非零向量具有较大的支撑集。这一构造和距离论证都是标准的。引理 [[translation-6#^lem-sparse-checks|6.1]] 给出这里所需的参数选择，包括检验的数量和支撑集大小的界，并通过确定性穷举搜索构造图与局部码。该图是一个 Cayley 多重图的二部双覆盖图。定义该多重图的平移使基础群上的每个非常数奇偶函数都近乎平衡：这就是小偏差条件 〔[NN93](https://doi.org/10.1137/0222053 "原引用键 NN93")；[AR94](https://doi.org/10.1002/rsa.3240050203 "原引用键 AR94")〕，在 [[translation-6#^eq-hash-walsh|（6.2）]] 中有明确表述。将未使用的边位固定为零，便得到恰有 $m$ 个坐标的码。额外的奇偶检验排除剩余的非零违反向量。我们依据条件期望法背后的平均原理 〔[Rag88](https://doi.org/10.1016/0022-0000(88)90003-7 "原引用键 Raghavan88")〕 选择这些检验，利用精确计数评估每个候选。第 [[translation-6#^sec-hashes|6]] 节给出这里所需的构造和定量界。

### 1.2 记号

^subsec-notation

对于整数 $s\ge0$，记 $[s]=\{1,\ldots,s\}$，且 $[0]=\varnothing$。对于条件 $E$，标量 $\mathbb{1}_{\{E\}}$ 在 $E$ 成立时等于一，否则等于零。我们使用自然对数，底数为二时写作 $\log_2$。在复杂度界中，$\operatorname{poly}(t_1,\ldots,t_s)$ 表示形如 $(1+t_1+\cdots+t_s)^{O(1)}$ 的界，其隐含常数为绝对常数。下标（例如 $\operatorname{poly}_{k,c}(t_1,\ldots,t_s)$）允许这些常数依赖于所标明的固定参数。整数以带符号二进制记法存储，因此一个整数 $z$ 使用 $O(\log(|z|+2))$ 位。有理数存储为一个整数分子和一个正整数分母；所述位长度界分别适用于两者。空间以位计量。算术运算次数与位运算次数加以区分。

对于有限集合 $S$，$\mathbb Q^S$ 中的向量以 $S$ 为坐标索引，除非另有说明，否则均为列向量。对于 $U\subseteq S$，示性向量 $\mathbf1_U\in\{0,1\}^S$ 的各分量为 $(\mathbf1_U)_v=\mathbb{1}_{\{v\in U\}}$，其中 $v\in S$。我们用 $\vec{0}$ 表示零向量。对于 $v\in S$，行 $\delta_v\in\mathbb Q^{1\times S}$ 选取坐标 $v$，因而 $\delta_vx=x_v$。一个以 $U\subseteq S$ 为索引的向量，通过在 $S\setminus U$ 的每个坐标处置零，扩展为以 $S$ 为索引的向量。

我们用 $\vec{X}=(X_1,\ldots,X_n)$ 表示形式变量向量，并对 $\vec{P}_{f,v}(T)$ 这样的多项式系数向量使用箭头。对于系数行 $\vec{p}=(p_i)_{i\in S}$ 和向量 $z=(z_i)_{i\in S}$，我们将它们的标量配对写作 $\langle\vec{p},z\rangle=\sum_{i\in S}p_i z_i$。特别地，$\langle\vec{P}_{f,v}(T),\vec{X}\rangle$ 是变量 $X_i$ 的一个标量线性形式。

对于关于变量 $\vec{X}$ 和变量 $z$ 的多项式 $P(\vec{X},z)$，$[z^j]P$ 表示 $z^j$ 的系数，将其视为关于 $\vec{X}$ 的多项式；$\deg_{\vec{X}} P$ 表示关于 $\vec{X}$ 的总次数。一行多项式的次数，是其中各元素次数的最大值。除非另有说明，多项式系数均为有理数，矩阵的核均在 $\mathbb Q$ 上取。
