---
id: "D.5"
title: "引理 D.5：锥形 Hermite 恢复与精度控制"
group: "张量缩并"
kind: "引理"
status: 完整证明整合稿
source_label: "D.5"
tex_label: "lem:tapered-hermite"
publish: false
source_pages: [60, 61]
depends_on: []
---

# 引理 D.5：锥形 Hermite 恢复与精度控制

本页独立给出 [[D.1|张量缩并]] 所用的渐变 Hermite 恢复接口。系数环沿用该构造：取全局 $s\ge2$、$e=4\lceil\log_2s\rceil$，并选次数 $e$ 的首一 $f\in\mathbb Z[U]$，首项以下系数为 $0$ 或 $1$，模二约化不可约。令

$$\mathcal O=\mathbb Z_{(2)}[U]/(f),\qquad \mathcal K=\mathbb Q[U]/(f),\qquad \mathcal A=\mathcal O[V]/(V^\ell),$$

其中 $\mathbb Z_{(2)}$ 是分母为奇数的有理数环，$\ell\ge1$ 是整数截断阶。将 $\mathcal K$ 中的元素按基 $1,U,\ldots,U^{e-1}$ 表示；$v_2$ 为非零元素各坐标2-进赋值的最小值，对非零整数即通常的2-进赋值。$\mathcal A$ 的整性与模 $2^p$ 精度按 $U,V$ 的各坐标理解。

令 $a\ge1$ 为整数网格参数、$L=2^a$，并取

$$S=\{-L,-L+1,\ldots,L-1\},\qquad \alpha=2^{a+1}.$$

$T=t+\alpha z$ 是网格点 $t$ 附近的局部坐标。参数 $M$ 用于给定 $F$ 的次数上界，在缩并应用中等于当前边数。将非零网格节点按 $i=v_2(t)$ 分层，整数 $1\le u\le a$ 指定只保留 $i<u$ 的节点。整数 $p\ge1$ 是目标精度；$q_t$ 是节点重数，$p_t$ 是该节点所需的输入精度。所有 $z$ 级数截断都是通常的次数截断，不是按赋值加权的截断。

下面的命题对满足其所列次数和整性条件的任意 $F$ 成立。应用到变形缩并时，[[D.4]] 正好保证全部局部多项式 $F(t+\alpha z)$ 的整性；本引理则说明只需保留哪些系数、多少精度以及如何恢复 $F(0)$。

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
> 假设 $F\in(\mathcal K[V]/(V^\ell))[T]$ 的次数至多为 $M(2L-1)$，$F(0)\in\mathcal A$，且对于每个 $t\in S$， 均有 $F(t+\alpha z)\in\mathcal A[z]$。 对于整数 $p\ge1$，其值 $F(0)$ 模 $2^p$ 可以从以下数据恢复：
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

$E_t(t+\alpha z)$ 的每个因子都是 $1+\alpha z/(t-q)$ 的一个幂。 它具有整性，且常数项为一。因此，其倒数截断到 $q_t$ 后仍具有整性， 所以形成 [[D.5#^eq-tensor-hermite-origin|（D.9）]] 中的商不会损失精度。

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

为说明第二个等号，2-进赋值小于 $i$ 的点贡献零。 对于 $1\le j\le a-i$，满足 $v_2(q)=i+j$ 的点有 $D/2^j$ 个， 满足 $v_2(t-q)=i+j$ 的点也有同样多个。 后一类点满足 $v_2(q)=i$，而这些层级涵盖了除 $t$ 外所有具有该2-进赋值的点。 这些计数利用了 $S$ 构成模 $2L$ 的完全剩余系这一性质；不同节点的整数差的2-进赋值至多为 $a$。 最后，$q(i+j)-q(i)\ge-hj$，且 $\sum_{j\ge1}j^2/2^j=6$。

将一个次数小于 $q_t$ 的多项式在 $-t/\alpha$ 处求值， 至多使模 $2$ 的幂的精度指数额外减少 $4M(a+1)$。 因此，将每个商的系数替换为其模 $2^{p_t}$ 的剩余的任意提升， 只会使其在 [[D.5#^eq-tensor-hermite-origin|（D.9）]] 中的贡献改变一个 $2^p\mathcal A$ 中的元素。将这些误差相加不会进一步损失精度。 重构出的和是整的，因为它与整值 $F(0)$ 之差属于 $2^p\mathcal A$。

最后的组合可以在指定的基下通过有理数算术完成。 乘子 $E_t(0)(-t/\alpha)^j$（$j<q_t$）都是 $O(ML)$ 个有理因子的乘积，因子数按重数计算，每个因子的分子、分母各有 $O(a)$ 位。因此，每个乘子的分子与分母位长都以 $M,L,a$ 的某个多项式为上界。这类乘子的数量也有关于这些参数的多项式上界，所以将它们的全部分母之积取为公分母后，公分母的位长仍有多项式上界。 相加后，约去其二的幂因子，并将所得整坐标模 $2^p$ 约化。 这就证明了算法方面的断言。

∎

