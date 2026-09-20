---
title: Better Doctor Documentation
slug: bdoctor/documentation.aspx
draft: false
layout: Home

comments: false

menu:
  QuickLaunch:
    name: Documentation
    id: documentation
    parent: bdoctor
---

## What Better Doctor does

`bdoctor` exists because writing documentation directly in SharePoint is a poor experience for developers. It lets you author in the tools you already use — an editor, Markdown, and Git — while the result still lives on your SharePoint environment, where your colleagues expect to find it.

`bdoctor` follows the concept of many static site generators. Those generators let you write your articles in Markdown and convert them to HTML files.

`bdoctor` is a bit different: instead of creating HTML files, it creates SharePoint pages.

Pages are rendered by the **Better Doctor Markdown** web part, a custom SPFx control which an administrator deploys to your tenant once. It handles syntax highlighting, code copying, Mermaid diagrams and optional KaTeX math in the browser, so the published page stays a small, sanitized payload rather than a blob of pre-rendered HTML.

Under the hood, the CLI talks to SharePoint through the [CLI for Microsoft 365](https://pnp.github.io/cli-microsoft365/).

<include file="requirements" />
