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

当 $\#F>0$ 时，标准自归约通过逐个固定变量并检查剩余计数为正来找到一个满足赋值。若改为根据两个条件计数选择每一位，则可得到严格均匀的随机满足赋值，其期望额外开销为 $\operatorname{poly}_k(n,m)$ 〔[JVV86](https://doi.org/10.1016/0304-3975(86)90174-X "原引用键 JVV86")，定理 3.3(1)〕。

该定理还给出了 Max-$k$-SAT 的任意精度次指数时间近似算法。

以 $\operatorname{OPT}(F)$ 表示一个赋值能够同时满足的 $F$ 的最大子句数。

> ##### 推论 1.2
>
> 
> 
> ^cor-max-sat-approximation
> 
> 
>
> 对于每个固定的 $k\ge2$ 和 $\varepsilon>0$，存在一种随机化算法：给定具有 $n\ge20$ 个变量和 $m$ 个子句的 $k$-CNF $F$，它以 $1-2^{-\Omega(n)}$ 的概率找到满足至少 $\operatorname{OPT}(F)-\varepsilon m$ 个子句的赋值，所用时间为
>
> $$
> (n+m)^{O_{k,\varepsilon}(1)}2^{O_{k,\varepsilon}(\rho(n))}
> $$
>
> 且所用空间为 $(n+m)^{O_{k,\varepsilon}(1)}$。

**证明。**

^proof-cor-max-sat-approximation

我们可以假设 $m>0$。令 $f(x)$ 为 $x$ 满足的子句比例，并令 $\widehat f(x)$ 为独立、均匀、有放回地选取 $O(n/\varepsilon^2)$ 个子句所形成样本中的这一比例。由 Hoeffding 不等式以及对全部 $2^n$ 个赋值应用联合界，以 $1-2^{-\Omega(n)}$ 的概率有

$$
|\widehat f(x)-f(x)|\le\varepsilon/2
 \qquad\text{对每个 }x\in\{0,1\}^n.
$$

因此，若 $\widehat x$ 使 $\widehat f$ 最大，则 $f(\widehat x)\ge\max_x f(x)-\varepsilon$。给定一个整数阈值 $b$，一个每个门至多有两个输入、规模为 $O_{k,\varepsilon}(n)$ 的布尔电路可以检验一个赋值是否满足至少 $b$ 个抽样子句。标准的电路到 $3$-CNF 归约 〔[Bar23](https://introtcs.org/public/lec_13_Cook_Levin.html "原引用键 Bar23")，引理 15.9–15.10〕 产生一个具有 $O_{k,\varepsilon}(n)$ 个变量和子句的公式，该公式可满足当且仅当能够达到这一阈值。于是，利用定理 [[translation-1#^thm-main|1.1]]、对阈值的二分搜索以及自归约，可在所述界内找到样本的一个精确最优解。对每个样本，在 $O(n+\log(n/\varepsilon^2))$ 次尝试后截断拒绝采样，可使最坏情形采样时间为 $\operatorname{poly}(n,m,\varepsilon^{-1})$，并使失败概率至多增加 $2^{-\Omega(n)}$。

∎

注意，形如 $2^{o(n)}$ 的运行时间界不能通过一般的多项式时间归约传递（要做到这一点，需要 $2^{n^{o(1)}}$），因此我们的结果并不意味着一般的 NP 问题具有次指数时间算法。不过，我们确实得到了对图着色和完美匹配进行计数的次指数时间算法。

> ##### 推论 1.3
>
> 
> 
> ^cor-graph-counting
> 
> 
>
> 对于具有 $v$ 个顶点和 $e$ 条边的简单图，独立集的数量，以及对于每个固定的 $q\ge2$ 的正常 $q$-着色的数量，都可以在 $2^{o(v)}$ 时间和 $\operatorname{poly}_q(v,e)$ 空间内确定性地计算。完美匹配的数量可以在 $2^{o(v+e)}$ 时间和 $\operatorname{poly}(v,e)$ 空间内确定性地计算。

**证明。**

^proof-cor-graph-counting

对于 $G=(V,E)$，为每个 $u\in V$ 引入一个布尔变量 $x_u$。

$$
\bigwedge_{\{u,w\}\in E}(\neg x_u\vee\neg x_w)
$$

的满足赋值与独立集 $\{u\in V:x_u=1\}$ 一一对应。对于正常 $q$-着色，为每个顶点和颜色的组合使用一个布尔变量，要求每个顶点恰有一种颜色，并禁止相邻顶点颜色相同。这给出一个保持计数的 $q$-CNF 编码，具有 $qv$ 个变量和 $O_q(v+e)$ 个子句。

对于完美匹配，为每条边使用一个布尔变量，并使用一个线性规模的电路检查每个顶点恰与一条选中的边关联。标准的电路到 $3$-CNF 归约 〔[Bar23](https://introtcs.org/public/lec_13_Cook_Levin.html "原引用键 Bar23")，引理 15.9–15.10〕 给出 $O(v+e)$ 个变量和子句。一旦边所对应的位固定，门变量便有唯一的值，因此这个编码也保持计数。定理 [[translation-1#^thm-main|1.1]] 给出了所述时间和空间界。

∎

定理 [[translation-1#^thm-main|1.1]] 的固定密度情形给出了 $\mathrm E^{\mathrm{NP}}$ 的一个电路下界；该类由借助 NP 预言机可在确定性时间 $2^{O(n)}$ 内判定的语言组成。

> ##### 推论 1.4
>
> 
> 
> ^cor-quantitative-circuits
> 
> 
>
> 令 $C_L(n)$ 为在 $\{0,1\}^n$ 上计算 $L$ 的电路中非输入门的最小数目，允许使用任意扇入至多为二的布尔门且不限制扇出。存在语言 $L\in\mathrm E^{\mathrm{NP}}$ 和常数 $c>0$，使得
>
> $$
> C_L(n)>c\,n\sqrt{\log n}\qquad\text{对无穷多个 }n.\tag{1.2}
> $$
> 
> ^eq-quantitative-circuit-lower-bound
> 
> 

附录 [[translation-C#^subsec-circuit-lower-bounds|C.1]] 证明该推论。附录 [[translation-C#^subsec-local-inversion|C.2]] 给出对具有常数输出局部性的布尔映射进行求逆和精确原像计数的算法。

### 1.1 相关假设与证明构造

^sec-related

#### 1.1.1 SAT 算法与指数时间假设

^subsec-related-sat

指数时间假设（ETH）断言，$3$-SAT 在最坏情形下需要 $2^{\Omega(n)}$ 确定性时间，因此对于每个固定的 $k\ge3$，$k$-SAT 也如此 〔[IP01](https://doi.org/10.1006/jcss.2000.1727 "原引用键 IP01")，定理 1〕。强指数时间假设（SETH）作出更强的预测：随着 $k$ 增长，$k$-SAT 需要 $2^{n(1-o_k(1))}$ 时间。准确地说，对于每个 $\varepsilon\in(0,1)$，都存在一个固定的 $k$，使得没有确定性算法能够在 $2^{(1-\varepsilon)n}(n+m)^{O(1)}$ 时间内求解 $k$-SAT。

间隙指数时间假设（Gap-ETH）加强了 ETH：它假设存在常数 $\delta,\gamma>0$，使得即使在 $m=O(n)$ 时，也不存在 $O(2^{\gamma n})$ 时间算法，能够区分一个可满足的 $3$-CNF 与一个每个赋值都违反至少 $\delta$ 比例子句的公式 〔[Din16](https://eccc.weizmann.ac.il/report/2016/128/ "原引用键 Din16")；[MR17](https://doi.org/10.4230/LIPIcs.ICALP.2017.78 "原引用键 MR17")〕。其随机化版本排除了具有相同运行时间、能够在每个满足承诺的输入上以至少 $2/3$ 的概率区分这两种情形的算法 〔[CCK$^{+}$20](https://doi.org/10.1137/18M1166869 "原引用键 CCK20")，猜想 2.5〕。

非确定性强指数时间假设（NSETH）断言，对于每个 $\varepsilon>0$，都存在某个固定的 $k$，使得没有非确定性 $2^{(1-\varepsilon)n}(n+m)^{O(1)}$ 时间算法能够判定一个 $k$-CNF 是否*不可满足*，或者等价地，判定一个 $k$-DNF 是否为重言式 〔[CGI$^{+}$16](https://doi.org/10.1145/2840728.2840746 "原引用键 CGIMPS16")〕。

定理 [[translation-1#^thm-main|1.1]] 否定了 ETH、SETH、Gap-ETH 和 NSETH。事实上，对于每个固定的 $k$，检验精确计数为正还是为零，就能在确定性 $2^{o(n)}(n+m)^{O_k(1)}$ 时间内同时判定可满足性和不可满足性；判定可满足性也能解决 Gap-ETH 的承诺问题。这一确定性算法还否定了 ETH 〔[DHM$^{+}$14](https://arxiv.org/abs/1206.1775 "原引用键 DHMTW")，第 1 节〕、SETH 〔[CDL$^{+}$16](https://doi.org/10.1145/2925416 "原引用键 CDL16")，定义 2.1〕 以及 Gap-ETH 的有界错误随机化版本。这与正则归结等受限证明系统的无条件指数下界并不冲突 〔[BI13](https://doi.org/10.1145/2488608.2488669 "原引用键 BeckImp13")〕。

#### 1.1.2 精确计数与计数复杂度

^subsec-related-counting

计数指数时间假设（$\#\mathrm{ETH}$）断言，精确计算一个 $3$-CNF 的满足赋值数需要 $2^{\Omega(n)}$ 确定性时间 〔[DHM$^{+}$14](https://arxiv.org/abs/1206.1775 "原引用键 DHMTW")，第 1 节〕。

我们的算法（定理 [[translation-1#^thm-main|1.1]]）在 $2^{o(n)}\operatorname{poly}(n,m)$ 时间内确定性地求解 $\#3$-SAT，因此否定了 $\#\mathrm{ETH}$。

#### 1.1.3 对细粒度复杂度的推论

^subsec-related-consequences

要从我们的 SAT 算法得到某个目标问题的更快算法，需要一个反方向的归约，即从该问题到固定宽度 SAT 的归约，并且要控制变量数。集合大小至多为 $k$ 的集合分割问题具有这样的归约 〔[CDL$^{+}$16](https://doi.org/10.1145/2925416 "原引用键 CDL16")，观察 3.6〕：为每个元素使用一个布尔变量，以指定它处于划分的哪一侧。对每个集合，一个子句要求其变量中至少有一个为真，另一个子句要求至少有一个为假。所得 $k$-CNF 对论域中的每个元素有一个变量，因此对于固定的 $k$，定理 [[translation-1#^thm-main|1.1]] 给出关于论域大小的次指数时间，仅相差一个关于输入规模的多项式因子。

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
