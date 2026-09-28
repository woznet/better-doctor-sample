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

## SharePoint themes

`siteDesign.theme` names a tenant theme, which a SharePoint administrator must register before a run that passes `--applyTheme` can apply it. Two palettes ship with the sample:

| Theme | File | Primary | Registered with |
| --- | --- | --- | --- |
| `bdoctor-light` | `bdoctor-light-theme.json` | `#117466` on white | no flag |
| `bdoctor-dark` | `bdoctor-dark-theme.json` | `#24baa4` on `#17181c` | `--isInverted` |

The palette files cannot carry `isInverted`, so the flag must be passed when the dark theme is registered. Without it SharePoint lays the dark palette out as a light theme. Register both with the [CLI for Microsoft 365](https://pnp.github.io/cli-microsoft365/cmd/spo/theme/theme-set/), which takes the JSON itself rather than a path:

```bash
m365 spo theme set --name bdoctor-light --theme "$(cat bdoctor-light-theme.json)"
m365 spo theme set --name bdoctor-dark --theme "$(cat bdoctor-dark-theme.json)" --isInverted
```

Both palettes are the [theme designer](https://aka.ms/themedesigner) output plus the slots it leaves out (`primaryBackground`, `primaryText`, `bodyBackground`, `bodyText`, `disabledBackground`, `disabledText`, `error` and `accent`). Body text, links and the error color reach the WCAG AA ratio of 4.5:1 on the page and on the neutral and soft section backgrounds, so regenerate the ramp and recheck the contrast when the primary changes.

### Color pair theme

`bdoctor-light-color-pairs.json` defines the light theme again in the [2.0.0 format](https://learn.microsoft.com/en-us/sharepoint/dev/declarative-customization/site-theming/sharepoint-site-theming-json-schema): 14 accent and background pairs, each at 4.5:1 or better, which authors can pick from for sections and web parts. SharePoint derives the palette from the first pair, so it is registered as a separate theme. The CLI for Microsoft 365 cannot register this format; use the SharePoint Online Management Shell:

```powershell
Connect-SPOService -Url https://<tenant>-admin.sharepoint.com
.\Add-BdoctorColorPairTheme.ps1
```

Set `siteDesign.theme` to `bdoctor-light-pairs` to use it. Color pairs support light mode only.

## Repository layout

| Path | What it holds |
| --- | --- |
| `src/` | The Markdown sources which become SharePoint pages. |
| `src/assets/` | Images referenced by the pages; uploaded to the asset library on publish. |
| `partials/` | Reusable Markdown snippets, added with `<include file="..." />` or the `partials.header` / `partials.footer` settings. |
| `shortcodes/` | Custom shortcodes, loaded through `markdown.shortcodesFolder`. |
| `bdoctor.sample.json` | The configuration to copy to `bdoctor.json`. |
| `bdoctor-light-theme.json`, `bdoctor-dark-theme.json` | The SharePoint theme palettes named by `siteDesign.theme`. |
| `bdoctor-light-color-pairs.json`, `Add-BdoctorColorPairTheme.ps1` | The light theme in the 2.0.0 color pair format, and the script which registers it. |
