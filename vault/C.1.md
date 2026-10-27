---
id: "C.1"
title: "推论 C.1：E^NP 的超线性电路下界"
group: "主定理与推论"
kind: "推论"
status: "证明思路梳理"
source_label: "C.1"
tex_label: "cor:consequence-circuits"
publish: true
source_pages: [51]
depends_on: ["1.1"]
---

# 推论 C.1：E^NP 的超线性电路下界

## 要解决的问题

将次指数 3-SAT 判定算法转化为 $\mathrm E^{\mathrm{NP}}$ 中某个语言的非均匀电路下界。

## 精确结论与适用条件

原文令 $\mathrm{SIZE}(O(n))$ 表示拥有 $O(n)$ 个有界扇入 AND、OR、NOT 门的非均匀电路族所计算的语言类，并得出
$$
\mathrm E^{\mathrm{NP}}\not\subseteq\mathrm{SIZE}(O(n)).
$$
即存在一个 $\mathrm E^{\mathrm{NP}}$ 语言，不具有线性规模的非均匀电路族。这里 $\mathrm E^{\mathrm{NP}}$ 指带 NP 预言机的 $2^{O(n)}$ 确定性时间类。

## 连贯证明思路

[[1.1|定理 1.1]] 的计数器通过检查答案是否为正，给出确定性次指数3-SAT判定。外部 Williams 定理直接断言：若 ETH 为假，则 $\mathrm E^{\mathrm{NP}}$ 没有线性规模电路。原文将前述算法代入这一蕴含，完成推论。

其论证机制是：含 $n$ 个输入和 $s$ 个门的电路可编码成 $O(n+s)$ 个变量和子句的3-CNF；因此线性规模电路的满足性可被加速。Williams 再把这种速度提升与假设存在的小型见证电路结合，导出与非确定性时间层级的冲突。

## 依赖用途与结论范围

内部依赖是定理1.1的判定结果，外部依赖是 Williams（2013，定理6.1）。

[[1.4|推论 1.4]] 另给无穷多长度上的 $cn\sqrt{\log n}$ 下界。

## 中文译文

- [[translation-C#^cor-consequence-circuits|陈述]]
- [[translation-C#^proof-cor-consequence-circuits|证明]]
