<h1 align="center">
  <a href="https://github.com/woznet/better-doctor-sample">
    <img alt="Better Doctor" src="./src/assets/bdoctor.svg" height="200">
  </a>
</h1>

<h2 align="center">Better Doctor Sample Project</h2>

This is a sample project which shows how [Better Doctor](https://better-doctor.cwoz.dev/) publishes a folder of Markdown files as SharePoint pages.

Every feature the CLI offers is exercised somewhere in `src/`: front matter, navigation, partials, shortcodes, extended Markdown, KaTeX math, and machine translation.

## Prerequisites

- **Node.js 22.13.0 or higher.**
- **The Better Doctor Markdown SPFx solution**, deployed by an administrator and available to your site. Installing the CLI is not enough — `bdoctor publish` stops at its availability check when the web part is missing. See the [web part deployment guide](https://better-doctor.cwoz.dev/docs/getting-started/web-part-deployment/).
- **An Azure Entra ID app registration** with a certificate. Certificate authentication is the only type `bdoctor` supports. Grant it either `Sites.FullControl.All`, as in the [certificate authentication guide](https://better-doctor.cwoz.dev/docs/getting-started/certificate-authentication/), or `Sites.Selected` on just the site you publish to, as in the [Sites.Selected guide](https://better-doctor.cwoz.dev/docs/getting-started/sites-selected/). With `Sites.Selected`, applying the custom theme in `siteDesign.theme` also needs the optional admin app registration (`--adminAppId`).
- **A GitHub token to install the CLI.** `@woznet/better-doctor` is a private package on GitHub Packages, so npm needs a classic personal access token with the `read:packages` scope, from an account that can read the package.

## Usage

1. Clone this repository:

   ```bash
   git clone https://github.com/woznet/better-doctor-sample
   ```

2. Sign in to GitHub Packages once, using your token as the password, then install the CLI:

   ```bash
   npm login --scope=@woznet --auth-type=legacy --registry=https://npm.pkg.github.com
   npm i -g @woznet/better-doctor
   ```

   The [getting started guide](https://better-doctor.cwoz.dev/docs/getting-started/) shows the `.npmrc` alternative.

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

The palette files cannot carry `isInverted`, so the flag must be passed when the dark theme is registered. Without it SharePoint lays the dark palette out as a light theme. Register both with the [CLI for Microsoft 365](https://pnp.github.io/cli-microsoft365/cmd/spo/theme/theme-set/), signed in as a SharePoint administrator. The `@` makes the CLI read the file; keep it in quotes, as PowerShell does not accept a bare `@` there:

```bash
m365 spo theme set --name bdoctor-light --theme '@./bdoctor-light-theme.json'
m365 spo theme set --name bdoctor-dark --theme '@./bdoctor-dark-theme.json' --isInverted
```

A run applies the theme only when it passes `--applyTheme`. See the [custom theme guide](https://better-doctor.cwoz.dev/docs/getting-started/custom-theme/) for the details.

Both palettes are the [theme designer](https://aka.ms/themedesigner) output plus the slots it leaves out (`primaryBackground`, `primaryText`, `bodyBackground`, `bodyText`, `disabledBackground`, `disabledText`, `error` and `accent`). Body text, links and the error color reach the WCAG AA ratio of 4.5:1 on the page and on the neutral and soft section backgrounds, so regenerate the ramp and recheck the contrast when the primary changes.

### Color pair theme

`bdoctor-light-color-pairs.json` defines the light theme again in the [2.0.0 format](https://learn.microsoft.com/en-us/sharepoint/dev/declarative-customization/site-theming/sharepoint-site-theming-json-schema): 14 accent and background pairs, each at 4.5:1 or better, which authors can pick from for sections and web parts. It is registered as a separate theme, `bdoctor-light-pairs`, rather than as an update of `bdoctor-light`. The CLI for Microsoft 365 cannot register this format, as `m365 spo theme set` sends only the palette and `isInverted`; use the SharePoint Online Management Shell:

```powershell
Connect-SPOService -Url https://<tenant>-admin.sharepoint.com
.\Add-BdoctorColorPairTheme.ps1
```

Set `siteDesign.theme` to `bdoctor-light-pairs` to use it. Color pairs support light mode only.

> [!NOTE]
> The script has not been run against a tenant yet. Microsoft documents registering color pairs with `Add-SPOTheme` but does not name its parameter, so check `Get-Help Add-SPOTheme -Parameter ColorPairs` in your version of the module before relying on it, and check the theme in **Change the look** afterwards.

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
