# 林翊源个人学术网站

[English](README.md) | 简体中文

这是 [Yiyuan Lin（林翊源）的个人学术网站](https://yiyuanlinxx.github.io)代码与内容仓库。

项目已经将代码与内容分离。日常更新通常只需编辑 `content/` 下的文件，不需要修改 `app/` 中的页面组件。

## 项目结构

```text
content/
├── site.json          # 个人信息、导航、社交链接和网站元数据
├── pages/             # About、Mentorship、CV 等固定页面
├── publications/      # 每篇论文一个 Markdown 文件
├── talks/             # 每个 Talk 一个 Markdown 文件
├── teaching/          # 每门课程一个 Markdown 文件
├── robots/            # 每个机器人项目一个 Markdown 文件
└── posts/             # 每篇 Blog Post 一个 Markdown 文件

public/images/         # 网站使用的图片、GIF 和视频
templates/             # 新内容模板
scripts/               # 内容生成和检查脚本
app/                   # 页面组件和视觉样式
```

## 环境要求与本地运行

需要 Node.js 22.13 或更高版本。

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。启动开发环境和生产构建前，项目会自动将 `content/` 中的 Markdown 转换为网站数据。

## 修改个人信息、导航和社交链接

编辑 `content/site.json`，可以修改：

- 姓名和中文名
- 学术职称
- 个人头像
- 所在地和学校
- 导航顺序
- 社交媒体链接
- 网站及社交分享元数据

## 修改 About、Mentorship 或 CV

编辑对应的 Markdown 文件：

```text
content/pages/about.md
content/pages/mentorship.md
content/pages/cv.md
```

文件开头两个 `---` 标记之间是页面元数据，下面是 Markdown 正文。CV 页面中的 Publication、Talk 和 Teaching 列表会根据对应内容目录自动生成。

## 新增内容

推荐使用内容创建命令：

```bash
npm run new -- publication paper-short-name
npm run new -- talk talk-short-name
npm run new -- teaching course-short-name
npm run new -- robot robot-short-name
npm run new -- post post-short-name
npm run new -- page page-short-name
```

命令会在正确的目录中创建一个包含常用字段的 Markdown 文件。把相关图片或视频放入 `public/images/`，然后在 Markdown 中使用 `/images/...` 路径引用。

也可以把 `templates/` 中的模板复制到相应的 `content/` 子目录。

## 常用 Front Matter 字段

论文示例：

```yaml
---
title: "Paper Title"
permalink: /publications/paper-short-name
date: 2026-08-20
authors: "<strong>Yiyuan Lin</strong>, Coauthor Name"
publication: "Journal or Conference"
pub_image: "/images/publications/paper-image.png"
---
```

Blog Post 示例：

```yaml
---
title: "Post Title"
permalink: /posts/2026/08/post-short-name/
date: 2026-08-20
tags:
  - Robotics
  - Navigation
---
```

## 检查与生产构建

```bash
npm run content:build  # 只检查并生成内容
npm run build          # 创建完整的生产构建
npm test               # 构建网站并运行内容测试
```

如果某个内容文件缺少必要的 `title` 或 `permalink`，内容生成脚本会直接指出对应文件。

## 部署到 GitHub Pages

仓库已经包含 `.github/workflows/deploy-pages.yml`。每次推送到 `main` 分支后，GitHub 都会自动安装依赖、构建静态网站并部署到 GitHub Pages，不需要提交生成的 `dist/` 目录。

首次部署步骤：

1. 在 GitHub 创建公开仓库 `YiyuanLinXX.github.io`，不要勾选自动创建 README。
2. 把本地仓库连接到 `git@github.com:YiyuanLinXX/YiyuanLinXX.github.io.git`，并推送 `main` 分支。
3. 打开仓库的 `Settings → Pages`，将 `Build and deployment → Source` 设置为 `GitHub Actions`。
4. 等待 `Deploy website to GitHub Pages` 工作流完成，然后访问 [https://yiyuanlinxx.github.io](https://yiyuanlinxx.github.io)。

日常更新的发布流程：

```bash
git add .
git commit -m "Update website content"
git push
```

## 样式和页面结构

大部分字体、颜色、间距和响应式布局规则集中在 `app/globals.css`。主要页面结构位于 `app/site.tsx`，日夜模式组件位于 `app/theme-toggle.tsx`。
