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

`bdoctor` needs **Node.js 22.13.0 or higher**. It is published to GitHub Packages as a private package for now, so npm needs a GitHub token to install it. Create a classic personal access token with the `read:packages` scope, from an account that can read the package, and sign in with it once, using the token as the password:

```bash
npm login --scope=@woznet --auth-type=legacy --registry=https://npm.pkg.github.com
```

Then install `bdoctor` via npm:

```bash
npm i -g @woznet/better-doctor
```

<collapse title="Install a pre-release build">

To try the latest changes before they are released, install the `next` tag instead:

```bash
npm i -g @woznet/better-doctor@next
```

</collapse>

## Deploy the web part

Installing the CLI is not enough. Pages are rendered by the **Better Doctor Markdown** web part, so an administrator has to deploy its SPFx solution and make it available to your site first. A publishing run checks for it before it changes anything, and stops when it is missing — there is no automatic deployment and no fallback to the built-in Markdown control.

<callout type="caution">The check cannot be skipped. Passing <code>--skipPrecheck</code> only skips the local content validation.</callout>

## Set up authentication

`bdoctor` brings no application of its own, so you bring an Azure Entra ID app registration with a certificate. Certificate authentication is the only type `bdoctor` supports. The app needs either the `Sites.FullControl.All` application permission, or `Sites.Selected` with a grant on just the site you publish to.

With `Sites.Selected`, applying a custom tenant theme goes through the tenant admin site, which needs the optional admin app registration described on the [options](./options) page.

## Try it out

To quickly get started, we provided a [sample repository](https://github.com/woznet/better-doctor-sample) which allows you to test out all the functionalities of `Better Doctor`. It is the repository this very site was published from.
