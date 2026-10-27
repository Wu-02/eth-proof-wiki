# ETH 证明图谱

以用户提供的证明依赖图为入口，整理论文 *The Exponential Time Hypothesis is False* 的阅读路线。当前阶段是**证明导航与思路梳理**；原文中文译文将另行逐段补齐并校核。

目标网页：<https://wu-02.github.io/eth-proof-wiki/>。实际部署状态以 GitHub Actions 与网址返回为准。

## 在 Obsidian 中打开

1. 克隆或下载本仓库。
2. Obsidian → **Open folder as vault / 打开文件夹作为仓库** → 选择 `vault/`。
3. 打开 `index.md`。文件名保持论文编号（例如 `4.1.md`、`D.1.md`），中文标题由 YAML `title` 保存。

无需社区插件、令牌或 Obsidian Sync 订阅。用常规 Git 同步即可；这里的 GitHub 仓库与最终网页都是公开的，**不要存放私人笔记或凭证**。

## 本地构建

需要 Node.js 24。依赖已锁定在 `package-lock.json`：

```sh
npm ci --ignore-scripts
npm run check
npm run preview
```

预览地址：<http://127.0.0.1:4173/eth-proof-wiki/>。

根路径构建也受支持：

```sh
BASE_PATH=/ npm run build
BASE_PATH=/ npm run preview
```

`npm run check` 执行单元测试、完整构建、内部链接/锚点校验与发布产物泄露检查。公式在构建时由 KaTeX 生成 HTML/MathML；字体和样式与站点同源，不请求外部公式服务。搜索索引也只在浏览器本地使用。

## 编辑约定

唯一内容源是 `vault/` 下的 Markdown。可发布页面必须明确包含 `publish: true`：

```yaml
---
id: D.1
title: D.1 定理 · 布尔张量网络快速收缩
publish: true
kind: theorem
group: 路线 B · 张量收缩
source_label: D.1
status: 证明思路初稿
# Obsidian 可识别的属性链接；只列实际证明依赖。
depends_on:
  - "[[D.3]]"
  - "[[D.4]]"
  - "[[D.5]]"
---
```

- 正文用 `[[D.1|显示标题]]` 链接笔记，也可用 `[显示标题](D.1.md)`。
- LaTeX 使用 `$…$`、`$$…$$`（也支持 `\(…\)`、`\[…\]`）；未知命令使构建失败，不能以渲染错误悄悄发布。
- 保留“证明思路”和“原文中文译文”两层。未译、未审内容如实标记；不要把思路摘要称作全文翻译。
- `depends_on` 描述逻辑前置；`implementation_options` 单独描述可替换实现，不混入逻辑依赖。`supporting_dependencies` 记录参数、位长等补充支撑；正文链接另行生成普通回链。
- 新增图片需经过明确审核的资源流程；生成器不会递归复制附件或私人文件夹。
- `reference/original-dependency.svg` 是原图备份；`web/dependency-reference.svg` 仅校正 C.1 上下界反向标题，构建时把节点指向 Wiki。原图箭头与校核后依赖必须区分。

## 发布 GitHub Pages

1. 仓库 **Settings → Pages → Build and deployment → Source → GitHub Actions**。
2. 推送到 `main` 或手动运行 **Validate and publish proof wiki**。
3. 检查 `build` 与 `deploy` 两项工作均成功，最后访问目标网址。

工作流只上传 `public/`，不上传仓库根目录、原始 Markdown、Obsidian 配置、原图备份、审查记录或任何源 PDF/TeX。PR 只构建检查，不能部署。发布前还会在 GitHub runner 执行真实 Chromium 的桌面/手机、搜索、图导航和公式显示回归检查；截图只留在临时测试目录，不作为产物上传。初次启用 Pages 不依靠默认 `GITHUB_TOKEN`；如果 Pages 未启用，部署会明确失败。

> `publish: true` 控制网页产物，不是 GitHub 仓库隐私开关。本仓库公开，仓库内任何已提交文件均可被阅读。

## 目录

- `vault/`：Obsidian Markdown 内容与最小配置。
- `scripts/`、`tests/`：可复现构建、预览、链接校验与回归测试。
- `web/`：站点样式、交互与经审核的原图对照资源。
- `reference/`：不进入网页产物的原图备份。
- `.github/workflows/pages.yml`：CI 和 GitHub Pages 发布流程。

## 来源与许可

原文为 OpenAI《The Exponential Time Hypothesis is False》，[官方来源](https://github.com/openai/math/tree/main/preprints/The-Exponential-Time-Hypothesis-is-False-October-25-2026)。原仓库采用 Apache-2.0，完整许可保留在 `licenses/OpenAI-math-Apache-2.0.txt`。本项目的中文证明导航/后续译文是对原文的改编；用户图仅校正 C.1 标题并增加本地导航链接，不为用户图擅自追加许可。原始作者与改编说明、第三方构建组件许可见 `THIRD-PARTY-NOTICES.md`。

## 后续全文翻译的单一来源

翻译范围为第 1–6 节、附录 A–D 中**保留的证明内容（含 `Proof` 环境外的定义、陈述与证明说明）**；按约定删除纯历史、展望与参考文献正文。33 个图节点的证明块不等于全部保留内容。后续以“原文分节译文页”保存完整译文，用稳定标题锚点定位各节点。节点的“原文中文译文”层链接到该节相应锚点，不复制另一份证明文本，避免同步漂移。

当前生成器支持 `[[分节页#标题|原文中文译文]]` 链接，**尚不支持** Obsidian 标题嵌入 `![[分节页#标题]]`；遇嵌入会明确终止构建，不会悄悄当成已经嵌入。若未来增加嵌入，需同时保留原出处导航并增加构建与 Obsidian 一致性的回归测试。


## 可选本地浏览器回归

另开终端运行预览服务后，可执行：

```sh
python -m pip install playwright==1.62.0
python -m playwright install chromium
python tests/browser-smoke.py
```

可用 `CHROMIUM_PATH` 指定已有 Chromium，`PREVIEW_URL` 指定预览地址。CI 使用相同脚本；本地沙箱若不能启动浏览器，不应把该阶段记为通过。截图与临时输出位于 `.qa/`，已被 Git 忽略。
