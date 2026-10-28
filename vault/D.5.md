---
id: "D.5"
title: "引理 D.5：Hermite 插值恢复与精度控制"
group: "张量缩并"
kind: "引理"
status: 完整证明整合稿
source_label: "D.5"
tex_label: "lem:tapered-hermite"
publish: false
source_pages: [60, 61]
depends_on: []
---


# 引理 D.5：Hermite 插值恢复与精度控制

本页证明 [[D.1|张量缩并]] 所需的 Hermite 插值公式及精度界。不同节点使用不同的重数：节点的 2-进赋值越大，保留的系数就越少。这样的选择既能恢复多项式 $F$ 在 $0$ 处的值，又能控制计算中的精度损失。

系数环与缩并构造相同。取全局规模 $s\ge2$、$e=4\lceil\log_2s\rceil$，选择次数为 $e$ 的首一多项式 $f\in\mathbb Z[U]$，使其余系数均为 $0$ 或 $1$，且模二约化不可约。令

$$\mathcal O=\mathbb Z_{(2)}[U]/(f),\qquad \mathcal K=\mathbb Q[U]/(f),\qquad \mathcal A=\mathcal O[V]/(V^\ell),$$

其中 $\mathbb Z_{(2)}$ 是分母为奇数的有理数所成的环，整数 $\ell\ge1$ 为 $V$ 的截断阶数。用基 $1,U,\ldots,U^{e-1}$ 表示 $\mathcal K$ 中的元素；对非零元素，$v_2$ 是其非零坐标的通常 2-进赋值的最小值，在非零整数上即为通常的 2-进赋值。$\mathcal A$ 中的整性和模 $2^p$ 的精度均按 $U,V$ 的各坐标理解。

令 $a\ge1$ 为整数，$L=2^a$，并取

$$S=\{-L,-L+1,\ldots,L-1\},\qquad \alpha=2^{a+1}.$$

在每个节点 $t\in S$ 附近使用局部坐标 $T=t+\alpha z$。按 $i=v_2(t)$ 将非零节点分层。取满足 $1\le u\le a$ 的整数 $u$，只保留 $i<u$ 的节点。下面的 $q_t$ 表示节点重数，即该节点处需要保留的系数个数；$p_t$ 表示这些系数所需的输入精度，$p\ge1$ 则是恢复 $F(0)$ 的目标精度。关于 $z$ 的幂级数均按次数截断。参数 $M$ 控制 $F$ 的次数上界，在张量缩并中就是当前网络的边数。

引理适用于任何满足下列次数与整性条件的 $F$。在 [[D.1]] 的应用中，局部多项式 $F(t+\alpha z)$ 的整性由 [[D.4]] 保证。

> ##### 引理 D.5　重数递减的 Hermite 恢复
>
> ^lem-tapered-hermite
>
> 设整数 $u,M$ 满足 $1\le u\le a$、$M\ge u$，并令 $h=\lceil3M/u\rceil$。对 $t\in S\setminus\{0\}$，设
>
> $$
> i=v_2(t),\qquad q_t=q(i)=h\max(0,u-i),\qquad D_t=L/2^i.
> $$
>
> 假设 $F\in(\mathcal K[V]/(V^\ell))[T]$ 的次数至多为 $M(2L-1)$，$F(0)\in\mathcal A$，且对每个 $t\in S$ 都有 $F(t+\alpha z)\in\mathcal A[z]$。给定整数 $p\ge1$，只需以下数据就能恢复 $F(0)\bmod2^p$：
>
> $$
> F(t+\alpha z)\pmod{2^{p_t}},
>  \qquad
>  p_t=p+8hD_t+8M(a+1),\qquad q_t>0.
> $$
>
> 每个多项式只需保留 $z^0,\ldots,z^{q_t-1}$ 的系数。恢复过程只需关于 $M,L,\ell,e$ 及各精度的多项式时间和空间。

**证明。**

^proof-lem-tapered-hermite

$S$ 中有 $L$ 个奇数节点，每个节点的重数都是 $hu$，所以 $\sum_{t\ne0}q_t\ge Lhu\ge3ML>M(2L-1)$，总重数超过了 $F$ 的次数。此外，$h\le4M/u$，因而 $q_t\le4M$。对每个重数为正的节点 $t$，令

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

这里 $[\cdot]_{<q_t}$ 表示只保留次数小于 $q_t$ 的项，外面的 $(-t/\alpha)$ 表示将所得多项式在该点求值。要验证公式，把右端的 $E_t(0)$ 改为 $E_t(T)$，并将求值点 $-t/\alpha$ 改为 $(T-t)/\alpha$。每个加项的次数都小于 $\sum q_t$；在对应节点 $t$ 处，它与 $F$ 的前 $q_t$ 个 Taylor 系数相同，而在其他保留节点处，它都具有所要求的消失阶数。因此，这些加项之和与 $F$ 的差可被 $\prod_{t\ne0}(T-t)^{q_t}$ 整除，次数却小于该乘积的次数，只能为零。再令 $T=0$，便得到（D.9）。这一构造是中国剩余定理在 Hermite 插值中的应用 〔[vzGG13](https://doi.org/10.1017/CBO9781139856065 "原引用键 vzGG13")，第 5.6 节〕。

先考虑形成商多项式时的精度。$E_t(t+\alpha z)$ 的每个因子都是 $1+\alpha z/(t-q)$ 的幂。由于 $v_2(t-q)\le a$，其系数属于 $\mathcal O$，且常数项为一。它的逆幂级数截断到次数小于 $q_t$ 后，系数仍属于 $\mathcal O$，所以计算 [[D.5#^eq-tensor-hermite-origin|（D.9）]] 中的商不损失精度。

接着估计乘上 $E_t(0)$ 的影响。固定 $i=v_2(t)$、$D=D_t$，由乘积定义得

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

第二个等号可通过按节点的赋值分类计数得到。若 $v_2(q)<i$，则 $v_2(t-q)=v_2(q)$，该项为零。对 $1\le j\le a-i$，满足 $v_2(q)=i+j$ 的节点有 $D/2^j$ 个，每个贡献 $j q(i+j)$；满足 $v_2(t-q)=i+j$ 的节点也有 $D/2^j$ 个，此时 $v_2(q)=i$，每个贡献 $-j q(i)$。后一类节点随着 $j$ 变化，恰好包括所有赋值为 $i$ 且不同于 $t$ 的节点。这些计数依据两个事实：$S$ 是模 $2L$ 的完全剩余系；不同节点之差的 2-进赋值至多为 $a$。最后，用 $q(i+j)-q(i)\ge-hj$ 和 $\sum_{j\ge1}j^2/2^j=6$，即得不等式。

还需在 $-t/\alpha$ 处求值。由于 $v_2(-t/\alpha)=i-(a+1)$，且商多项式的次数小于 $q_t\le4M$，求值至多再损失 $4M(a+1)$ 位精度。加上（D.10）中的损失，总共至多损失 $6hD_t+4M(a+1)$ 位，不超过预留的增量 $p_t-p$。

因此，将每个商系数替换为其模 $2^{p_t}$ 剩余类的任意提升，只会使该节点在 [[D.5#^eq-tensor-hermite-origin|（D.9）]] 中的加项改变一个 $2^p\mathcal A$ 中的元素。各节点的误差相加仍属于 $2^p\mathcal A$，不会继续损失精度。重构的和与 $F(0)$ 之差属于 $2^p\mathcal A$，而 $F(0)\in\mathcal A$，所以这个和本身也属于 $\mathcal A$。

最后通过控制有理数运算中分子、分母的位长，估计所需的时间和空间。取商系数各坐标的规范整数代表，在指定的基下完成（D.9）的线性组合。每个乘子 $E_t(0)(-t/\alpha)^j$（$j<q_t$）都是 $O(ML)$ 个有理因子的乘积，重复因子按重数计入；每个因子的分子、分母各有 $O(a)$ 位。因此，乘子的分子、分母位长以及乘子总数，都有关于 $M,L,a$ 的多项式上界。即使把所有乘子的分母相乘作为公分母，其位长仍有关于这些参数的多项式上界。

完成加法后，由所得和的整性，各坐标分母中的二的幂都能约去。对剩余的奇数分母模 $2^p$ 求逆，即可得到结果的各坐标。结合输入系数的位长，整个恢复过程只需关于 $M,L,\ell,e$ 及各精度的多项式时间和空间。

∎
