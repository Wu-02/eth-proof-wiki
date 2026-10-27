---
id: "D.4"
title: "引理 D.4：Cauchy 变形的二进整性"
group: "路线B"
kind: "引理"
status: "证明思路梳理"
source_label: "D.4"
tex_label: "lem:tensor-integrality"
publish: true
source_pages: [59, 60]
depends_on: []
---

# 引理 D.4：Cauchy 变形的二进整性

## 要解决的问题

Cauchy 型矩阵公式有有理分母；要在 $2$ 的幂模数上求值和插值，必须证明适当局部坐标能消去这些分母的二进障碍。这里是有限多项式变形，**不是 Cauchy 积分公式或复积分**。

## 精确结论与适用条件

沿用 [[D.1|定理 D.1]] 中的系数环 $\mathcal O=\mathbb Z_{(2)}[U]/(f)$ 与 $\mathcal A=\mathcal O[V]/(V^\ell)$。在当前调用的包内，$x,y$ 分别为行、列槽号，令 $L=2^a$、$S=\{-L,\ldots,L-1\}$、$\alpha=2^{a+1}$，并设
$$
\mathcal C(T)=\prod_{q\in S}(T-q),\qquad
W_{xy}(T)=\frac{\mathcal C(T)}{\mathcal C'(0)(T-(y-x))}.
$$
因 $y-x\in S$，分母中的线性因子约去，$W_{xy}$ 是次数 $2L-1$ 的有理多项式，且原边匹配下 $W(0)=I$。当前网络有 $M$ 条边。令 $A(Y),B(X)$ 分别为行、列张量乘积，$l_0(z)=1-z$、$l_1(z)=z$，定义
$$
F(T)=\sum_{X,Y\in\{0,1\}^M}A(Y)B(X)\prod_xl_{Y_x}((W(T)X)_x).
$$
对每个 $t\in S$，有 $W(t+\alpha z)\in\mathcal O[z]$、$F(t+\alpha z)\in\mathcal A[z]$。给定 $\zeta\bmod2^p$ 的坐标，可用 $s,p$ 的多项式位运算计算相应矩阵项。

## 连贯证明思路

$S$ 是模 $2^{a+1}$ 的完整剩余系；对任何节点 $t$，非零差 $t-q$ 的各二进赋值层的计数相同，所以 $v_2(\mathcal C'(t))=v_2(\mathcal C'(0))$。把
$$
\alpha z\prod_{q\ne t}(t-q+\alpha z)
$$
中的每个非零差因子按已知 $2$ 幂约去后，仍留下 $\alpha$ 的整除性。构造 $W$ 时若删去的是 $q=t$ 因子，就去掉 $\alpha z$ 而仍整；否则所删因子的赋值至多 $a$，故仍至少被 $2$ 整除。代入由张量和仿射布尔指示因子组成的 $F$，即得其整性。

计算时先显式约去这些已知 $2$ 幂，再只对奇数部分求逆；因此也能处理 $\zeta=0$，无须对不可逆元素直接做模除法。

## 依赖用途与下游

[[D.3|引理 D.3]] 提供包/槽构造，D.4.1提供 $\mathcal O,\mathcal A$ 的算术环境；两者属于本引理的实现语境。此结论验证 [[D.5|引理 D.5]] 的局部整性假设，并使 [[D.1|定理 D.1]] 可在扩充剩余域节点上进行精确 Lagrange 插值。
