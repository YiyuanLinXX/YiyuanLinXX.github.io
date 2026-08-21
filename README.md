# Yiyuan Lin Personal Website

English | [简体中文](README.zh-CN.md)

This repository contains the source code and content for [Yiyuan Lin's personal academic website](https://yiyuanlinxx.github.io).

The code and content are separated so that most routine updates only require editing files under `content/`. In most cases, there is no need to modify the page components in `app/`.

## Project Structure

```text
content/
├── site.json          # Profile, navigation, social links, and site metadata
├── pages/             # Static pages such as About, Mentorship, and CV
├── publications/      # One Markdown file per publication
├── talks/             # One Markdown file per talk
├── teaching/          # One Markdown file per course
├── robots/            # One Markdown file per robot project
└── posts/             # One Markdown file per blog post

public/images/         # Images, GIFs, and videos used by the website
templates/             # Templates for new content
scripts/               # Content generation and validation scripts
app/                   # Page components and visual styles
```

## Requirements and Local Development

Node.js 22.13 or later is required.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Before development and production builds, the project automatically converts the Markdown files under `content/` into website data.

## Updating Profile, Navigation, and Social Links

Edit `content/site.json` to update the following information:

- Name and Chinese name
- Academic title
- Profile photo
- Location and institution
- Navigation order
- Social media links
- Site and social-sharing metadata

## Updating About, Mentorship, or CV

Edit the corresponding Markdown file:

```text
content/pages/about.md
content/pages/mentorship.md
content/pages/cv.md
```

The content between the opening `---` markers is the page metadata. Everything below it is the Markdown body. Publication, talk, and teaching lists on the CV page are generated automatically from their respective content directories.

## Adding New Content

The recommended approach is to use the content creation command:

```bash
npm run new -- publication paper-short-name
npm run new -- talk talk-short-name
npm run new -- teaching course-short-name
npm run new -- robot robot-short-name
npm run new -- post post-short-name
npm run new -- page page-short-name
```

The command creates a Markdown file with the commonly used fields in the correct directory. Add associated media to `public/images/` and reference it in Markdown with an `/images/...` path.

Alternatively, copy a file from `templates/` into the appropriate `content/` subdirectory.

## Common Front Matter Fields

Publication example:

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

Blog post example:

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

## Validation and Production Build

```bash
npm run content:build  # Validate and generate content only
npm run build          # Create the complete production build
npm test               # Build the site and run content tests
```

If a content file is missing a required `title` or `permalink`, the content generator reports the affected file directly.

## Deployment to GitHub Pages

The repository includes `.github/workflows/deploy-pages.yml`. Every push to the `main` branch automatically installs dependencies, builds the static website, and deploys it to GitHub Pages. The generated `dist/` directory does not need to be committed.

For the initial deployment:

1. Create a public GitHub repository named `YiyuanLinXX.github.io` without automatically creating a README.
2. Connect the local repository to `git@github.com:YiyuanLinXX/YiyuanLinXX.github.io.git` and push the `main` branch.
3. Open `Settings → Pages` in the GitHub repository and set `Build and deployment → Source` to `GitHub Actions`.
4. Wait for the `Deploy website to GitHub Pages` workflow to finish, then visit [https://yiyuanlinxx.github.io](https://yiyuanlinxx.github.io).

For routine updates:

```bash
git add .
git commit -m "Update website content"
git push
```

## Styling and Layout

Most typography, colors, spacing, and responsive layout rules are defined in `app/globals.css`. The main page structure is implemented in `app/site.tsx`, and the light/dark theme control is located in `app/theme-toggle.tsx`.
