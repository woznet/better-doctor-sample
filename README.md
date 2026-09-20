<h1 align="center">
  <a href="https://github.com/woznet/better-doctor-sample">
    <img alt="Better Doctor" src="./src/assets/bdoctor.svg" height="200">
  </a>
</h1>

<h2 align="center">Better Doctor Sample Project</h2>

This is a sample project which shows how [Better Doctor](https://woznet.github.io/better-doctor/) publishes a folder of Markdown files as SharePoint pages.

Every feature the CLI offers is exercised somewhere in `src/`: front matter, navigation, partials, shortcodes, extended Markdown, KaTeX math, and machine translation.

## Prerequisites

- **Node.js 22.13.0 or higher.**
- **The Better Doctor Markdown SPFx solution**, deployed by an administrator and available to your site. Installing the CLI is not enough — `bdoctor publish` stops at its availability check when the web part is missing. See the [web part deployment guide](https://woznet.github.io/better-doctor/docs/getting-started/web-part-deployment/).
- **An Azure Entra ID app registration** with the `Sites.FullControl.All` application permission and a certificate. Certificate authentication is the only type `bdoctor` supports. See the [certificate authentication guide](https://woznet.github.io/better-doctor/docs/getting-started/certificate-authentication/).

## Usage

1. Clone this repository:

   ```bash
   git clone https://github.com/woznet/better-doctor-sample
   ```

2. Install the CLI:

   ```bash
   npm i -g @woznet/better-doctor
   ```

3. Copy `bdoctor.sample.json` to `bdoctor.json` and fill in your `url`, `appId` and `tenant`. The certificate and its password are deliberately absent from the sample: pass them on each run so they stay out of source control.

4. Check what the run will do before it touches your site:

   ```bash
   bdoctor status --certificate ./cert.pfx --password <password>
   ```

5. Publish:

   ```bash
   bdoctor publish --certificate ./cert.pfx --password <password>
   ```

## What gets published

The run creates the following `QuickLaunch` structure on your site:

- **Home** — the landing page, with a custom header image and a Dutch translation.
- **Better Doctor**
  - **Documentation** — what the tool does.
    - **Options** — the command arguments and `bdoctor.json` settings.
    - **Installation** — installing the CLI, with a Dutch translation.
    - **Page creation** — the front matter every page supports.
    - **Commands** — every command the CLI offers.
    - **Table of contents** — the `toc` shortcode.
- **Test pages**
  - **Codeblocks** — syntax highlighting and the copy button.
  - **Extended markdown** — emoji, highlights, task lists, definition lists and footnotes.
  - **Math** — inline and display KaTeX.
  - **No partials** — the page level opt-out.
  - **Partials** — reusable snippets and their parameters.
  - **Shortcodes** — callouts, icons, Mermaid and a custom shortcode.
  - **Special characters** — escaping.

## Repository layout

| Path | What it holds |
| --- | --- |
| `src/` | The Markdown sources which become SharePoint pages. |
| `src/assets/` | Images referenced by the pages; uploaded to the asset library on publish. |
| `partials/` | Reusable Markdown snippets, added with `<include file="..." />` or the `partials.header` / `partials.footer` settings. |
| `shortcodes/` | Custom shortcodes, loaded through `markdown.shortcodesFolder`. |
| `bdoctor.sample.json` | The configuration to copy to `bdoctor.json`. |
