---
id: "D.5"
title: "引理 D.5：锥形 Hermite 恢复与精度控制"
group: "路线B"
kind: "引理"
status: "证明思路梳理"
source_label: "D.5"
tex_label: "lem:tapered-hermite"
publish: true
source_pages: [60, 61]
depends_on: []
---

# 引理 D.5：锥形 Hermite 恢复与精度控制

## 要解决的问题

从非零节点恢复 $F(0)$ 时，有理插值系数可能损失许多 $2$ 进精度。若所有节点采用同样重数，后面的模态枚举过贵；本引理让重数随节点的二进赋值逐层下降。

## 精确结论与适用条件

沿用 [[D.1|定理 D.1]] 的整性系数环 $\mathcal A$，以 $v_2(t)$ 表示非零整数 $t$ 中因子 $2$ 的指数，$p$ 为目标精度。取 $L=2^a$、$S=\{-L,\ldots,L-1\}$、$\alpha=2^{a+1}$。设 $1\le u\le a$、$M\ge u$，$h=\lceil3M/u\rceil$。对非零 $t\in S$ 置
$$
i=v_2(t),\quad q_t=h\max(0,u-i),\quad D_t=L/2^i.
$$
若 $\deg F\le M(2L-1)$，且 $F(0)\in\mathcal A$、所有 $F(t+\alpha z)\in\mathcal A[z]$，则仅用 $q_t>0$ 各节点的前 $q_t$ 个普通 $z$ 系数，按精度
$$p_t=p+8hD_t+8M(a+1)$$
即可恢复 $F(0)\bmod2^p$。时间、空间对参数与精度均为多项式。

## 连贯证明思路

仅奇节点的总重数已超过 $\deg F$，因此 Hermite 数据足够唯一恢复。构造在其余节点具有规定零重数、在本节点归一化的 $E_t(T)$，将 $F(t+\alpha z)/E_t(t+\alpha z)$ 截断后代入 $-t/\alpha$，再乘 $E_t(0)$ 并求和。归一化分母的常数项为一，其截断逆在整性环中，不损失精度。

关键估计是 $v_2(E_t(0))\ge-6D_th$；它来自完整剩余网格的赋值计数及 $\sum_{j\ge1}j^2/2^j=6$。代入再损失至多 $4M(a+1)$ 位，故上述余量足够。有限有理组合可取多项式位长公分母，最终消去 $2$ 幂并约回模数。

## 依赖用途与下游

引理本身是带整性假设的独立恢复结果；[[D.4|引理 D.4]] 在 [[D.1|定理 D.1]] 的具体应用中验证假设，而不是本抽象引理的证明前提。随后的 D.4.4 参数分析把工作精度化成 $p_t=O(MD_t/u)$，正是 D.4.5 将模态数降至 $\exp(O(M/\sqrt u))$ 的接口。均匀重数会损失 $\Theta(MD_t)$，无法解释所需的 $1/u$ 改善。

## 中文译文

- [[translation-D#^lem-tapered-hermite|陈述]]
- [[translation-D#^proof-lem-tapered-hermite|证明]]
