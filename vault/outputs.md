---
id: "outputs"
title: "主定理：精确计数的两档界"
group: "主定理"
kind: "模块总览"
status: "证明思路梳理"
publish: true
source_label: "1.1"
tex_label: "thm:main"
source_pages: [2, 53, 54, 55, 56, 57]
depends_on: ["1.1"]
---

# 主定理：精确计数的两档界

## 主结论的两个入口

[[1.1|定理 1.1]] 是固定 $k$ 的精确 #k-SAT 计数、确定性时间与多项式空间保证。一般密度指数为 $O_k(n\log\log n/\sqrt{\log n})$，固定子句密度为 $O_{k,D}(n/\sqrt{\log n})$。强界来自 [[route-b|路线B]]：固定密度由 [[D.1|定理 D.1]] 直接接入；一般密度由 [[D.2|引理 D.2]] 与 [[shared-sat|共享SAT工具]] 组合。[[6.4|命题 6.4]] 给出路线 A 的较弱上界。

## 阅读主证明

[[1.1|定理 1.1]] 给出两档精确计数界。沿 [[route-b|张量缩并路线]] 阅读较强界的证明；沿 [[route-a|有理插值路线]] 阅读已经足以否定 ETH 的较弱界。两条路线共用 [[shared-algebra|代数编码]] 和 [[shared-sat|SAT 稀疏化与校验选择]]。

返回 [[index|首页]]
