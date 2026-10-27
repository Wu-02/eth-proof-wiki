# ETH 证明 Wiki

笔记内容位于 `vault/`，可直接作为 Obsidian Vault 打开。网站由 GitHub Actions 中运行的 **Obsidian 桌面应用**和社区插件 **Webpage HTML Export** 导出，再发布至 [GitHub Pages](https://wu-02.github.io/eth-proof-wiki/)。不使用自写 Markdown 渲染器。

## 修改与发布

- 修改 `vault/*.md`；Markdown 是人工维护内容的唯一来源。
- 当前内容按用户要求公开，供人工核验和修改；不表示所有页面均已完成审查。
- 每次 `main` 中的笔记变更会触发原生导出。工作流完成原生导出后直接发布；内容、链接、数学和显示问题由用户人工核验并报告。
- 上游导出采用 `A.1.html` 一类文件路径；首页位于项目根路径。
- `.github/obsidian-export.mjs` 仅调用应用内插件，不渲染 Markdown，也不执行全站内容验收。
- 导出运行于 GitHub runner，不需要在用户电脑安装软件。运行时插件和 Obsidian 配置使用临时副本，不回写笔记。
- 仓库公开，请勿提交凭证、私人资料或内部审查日志。

## 来源与许可

原文：OpenAI，《The Exponential Time Hypothesis is False》，[官方源文件](https://github.com/openai/math/tree/main/preprints/The-Exponential-Time-Hypothesis-is-False-October-25-2026)。中文证明说明与翻译为改编内容；保留的证明内容包括 Proof 环境之外的必要定义、陈述和证明说明。原作完整 Apache-2.0 许可见 `licenses/OpenAI-math-Apache-2.0.txt`；来源及改动说明见 `THIRD-PARTY-NOTICES.md`。

[Webpage HTML Export](https://github.com/KosmosisDire/obsidian-webpage-export) 使用 MIT 许可。导出固定使用其提交 `78c973ddc27eb09bf18e07d143889452bc71ffde` 和官方 Obsidian 1.9.12；Obsidian 应用本身不随网站分发。用户提供的原图保留在 `reference/`，不另行授权。
