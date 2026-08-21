# Yiyuan Lin Personal Website

这是 Yiyuan Lin 的个人学术网站。代码与内容已经分离：日常更新主要编辑 `content/`，通常不需要修改 `app/` 中的页面代码。

## 目录说明

```text
content/
├── site.json          # 姓名、职称、导航、社交链接和网站简介
├── pages/             # About、Mentorship、CV 等固定页面
├── publications/      # 每篇论文一个 Markdown 文件
├── talks/             # 每个 Talk 一个 Markdown 文件
├── teaching/          # 每门课程一个 Markdown 文件
├── robots/            # 每个机器人项目一个 Markdown 文件
└── posts/             # 每篇 Blog Post 一个 Markdown 文件

public/images/         # 页面使用的图片、GIF 和视频
templates/             # 新内容模板
scripts/               # 内容生成与检查脚本
app/                   # 页面组件和视觉样式
```

## 第一次运行

需要 Node.js 22 或更高版本。

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。启动和构建前，脚本会自动把 `content/` 中的 Markdown 转换为网站数据。

## 修改个人信息、导航和社交链接

编辑 `content/site.json`。这里可以修改姓名、中文名、职称、头像、所在地、学校、导航顺序和所有社交媒体链接。

## 修改 About、Mentorship 或 CV

分别编辑：

```text
content/pages/about.md
content/pages/mentorship.md
content/pages/cv.md
```

文件顶部 `---` 之间是页面信息，下面是 Markdown 正文。CV 中的论文、Talk 和 Teaching 列表会根据对应内容目录自动生成。

## 新增内容

推荐使用模板命令：

```bash
npm run new -- publication paper-short-name
npm run new -- talk talk-short-name
npm run new -- teaching course-short-name
npm run new -- robot robot-short-name
npm run new -- post post-short-name
npm run new -- page page-short-name
```

命令会在正确目录创建一个带有常用字段的新 Markdown 文件。完成内容后，把图片放入 `public/images/`，并在 Markdown 中使用 `/images/...` 路径引用。

也可以直接复制 `templates/` 中的模板到相应的 `content/` 子目录。

## 常用字段

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

## 检查与构建

```bash
npm run content:build  # 只检查并生成内容
npm run build          # 完整生产构建
npm test               # 构建并检查关键内容
```

如果某个文件缺少 `title` 或 `permalink`，内容生成会直接指出具体文件。

## 样式修改

大部分字体、颜色、间距和响应式布局集中在 `app/globals.css`。页面结构主要在 `app/site.tsx`，日夜模式组件位于 `app/theme-toggle.tsx`。
