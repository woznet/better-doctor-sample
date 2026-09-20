---
title: Installation
slug: bdoctor/installation.aspx
draft: false

metadata:
  Category: "Choice 1"
  SingleLineText: "Choice 1"

localization:
  "nl-nl": ./installation.nl.lang.md

menu:
  QuickLaunch:
    id: installation
    parent: bdoctor/documentation
---

## Installation

Thank you for your interest in `bdoctor`. The following information will help you install it.

Start by installing `bdoctor` as follows via npm:

```bash
npm i -g @woznet/better-doctor
```

If you are using `yarn`, you can do it as follows:

```bash
yarn global add @woznet/better-doctor
```

To try the latest changes before they are released, install the `next` tag instead:

```bash
npm i -g @woznet/better-doctor@next
```

## Deploy the web part

Installing the CLI is not enough. Pages are rendered by the **Better Doctor Markdown** web part, so an administrator has to deploy its SPFx solution and make it available to your site first. A publishing run checks for it before it changes anything, and stops when it is missing — there is no automatic deployment and no fallback to the built-in Markdown control.

<callout type="caution">The check cannot be skipped. Passing <code>--skipPrecheck</code> only skips the local content validation.</callout>

## Set up authentication

`bdoctor` brings no application of its own, so you bring an Azure Entra ID app registration with the `Sites.FullControl.All` application permission and a certificate. Certificate authentication is the only type `bdoctor` supports.

## Try it out

To quickly get started, we provided a [sample repository](https://github.com/woznet/better-doctor-sample) which allows you to test out all the functionalities of `Better Doctor`. It is the repository this very site was published from.
