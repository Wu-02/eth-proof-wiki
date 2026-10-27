---
id: "C.2"
title: "推论 C.2：常数输出局部布尔映射的求逆与原像计数"
group: "主定理与推论"
kind: "推论"
status: "证明思路梳理"
source_label: "C.2"
tex_label: "cor:consequence-local-inversion"
publish: true
source_pages: [52, 53]
depends_on: ["1.1"]
---

# 推论 C.2：常数输出局部布尔映射的求逆与原像计数

## 要解决的问题

每个输出仅查看常数个输入位的映射，怎样把“输出恰等于目标”的约束编码为 CNF，并保持原像数而不引入额外重数？

## 精确结论与适用条件

固定 $d$，输入映射 $G:\{0,1\}^n\to\{0,1\}^m$ 以集合 $S_i\subseteq[n]$ 和局部函数真值表描述，满足 $|S_i|\le d$、$G(x)_i=g_i(x|_{S_i})$。集合可任意重叠。对 $n\ge20$ 和目标 $b$，可精确求 $|G^{-1}(b)|$，有原像时找出一个，时间为
$$
(n+m)^{O_d(1)}2^{O_d(\rho(n))},\qquad
\rho(n)=n(\log\log n)^2/\sqrt{\log n},
$$
空间为 $(n+m)^{O_d(1)}$。

## 连贯证明思路

对每个局部赋值 $\alpha\in\{0,1\}^{S_i}$，若 $g_i(\alpha)\ne b_i$，加入恰好禁止它的子句
$$
\bigvee_{j\in S_i}\ell_{j,\alpha_j},\qquad
\ell_{j,0}=X_j,\quad\ell_{j,1}=\neg X_j.
$$
空集合对应常数约束，直接判断。所得 CNF 仍只有原来的 $n$ 个声明变量，宽度至多 $d$、子句至多 $2^dm$。满足赋值与原像完全相同，不需辅助变量或除以多重度。

调用 [[1.1|定理 1.1]]，取 $k=\max\{2,d\}$，便得精确原像计数。逐位固定变量、询问剩余计数是否为正，至多再用 $n$ 次计数即可找一个原像；查询顺序执行，保持空间界。

## 依赖用途与下游

计数和求逆的直接依赖只有定理1.1及通常的自归约。原文另提到按条件计数可精确均匀抽样原像，其期望开销多项式，援引外部 JVV 结果。对于多项式多个输出，结论排除这类常数局部映射的 $2^{\Omega(n)}$ 求逆困难性，**并不排除相对多项式时间算法的单向性**。

## 中文译文

- [[translation-C#^cor-consequence-local-inversion|陈述]]
- [[translation-C#^proof-cor-consequence-local-inversion|证明]]
