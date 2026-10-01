---
title: Options
description: Command options
draft: false

metadata:
  Category: "Choice 3"
  SingleLineText: "Choice 3"

comments: true

menu:
  QuickLaunch:
    id: options
    weight: 1
    parent: bdoctor/documentation
---

## Options

Options are specified via command arguments, or within a `bdoctor.json` file (automatically created on initialization with `bdoctor init`). An argument always wins over the same setting in `bdoctor.json`.

### Authentication

`-a, --auth <auth>`
: The authentication type to use. `certificate` is the only supported value, and the default.

`--appId <appId>`
: The client id of the Azure Entra ID app registration to authenticate with.

`--tenant <tenant>`
: The id of the tenant the app registration lives in.

`--certificate <certificate>`
: The certificate to authenticate with. A value ending in `.pfx`, `.p12` or `.pem` is treated as a file path; anything else is treated as the base64 encoded contents.

`--password <password>`
: The password of your certificate, when it is protected with one.

<callout type="caution">Keep the certificate and its password out of source control. <code>bdoctor init</code> deliberately never writes them to <code>bdoctor.json</code>; pass them on each run, ideally from a pipeline secret.</callout>

### Admin app registration

An app registration with `Sites.Selected` reaches only the sites it was granted, and a few calls go through the tenant admin site instead. These optional options set up a second app registration for those calls. `bdoctor publish` signs in as it only when a task needs it: applying a custom tenant theme with `--applyTheme`, and setting the `siteDesign.logo` when the site refuses the regular app.

`--adminAppId <appId>`
: The client id of the admin app registration. It signs in to the same `--tenant`. Set it together with `--adminCertificate`; setting only one of them fails the run.

`--adminCertificate <certificate>`
: The certificate of the admin app registration: a path to a `.pfx`, `.p12` or `.pem` file, or its base64 encoded contents.

`--adminPassword <password>`
: The password of the admin certificate, when it is protected with one.

### Content and site

`-f, --folder <folder>`
: The folder which holds your markdown files. Default: `./src`.

`-u, --url <url>`
: The URL of the site collection to publish to.

`--library <library>`
: The library which SharePoint uses to store your referenced images and the publish state file. Default: `Shared Documents`.

`--webPartTitle <title>`
: The title of the Better Doctor Markdown control to create or update on the page. Default: `bdoctor-placeholder`.

<callout type="note">The title is a label and a compatibility selector, not proof of ownership. Replacing a built-in Markdown control requires an unambiguous component id and title match, plus an explicit <code>--confirm</code>.</callout>

`--overwriteImages`
: Upload every image your markdown files reference, replacing the copies already in the SharePoint library. Without it, an image is uploaded when it is missing from the library or when its content changed since `bdoctor` last uploaded it.

`--applyTheme`
: Applies the theme named in `siteDesign.theme`. A custom theme, such as this sample's `bdoctor-light`, has to be registered in the tenant first; `bdoctor` never creates one. Pass it on the runs that should apply the theme rather than on every run.

`--skipPrecheck`
: Skips the local content validation. It does **not** skip the Better Doctor Markdown availability check, which always runs before a publishing run changes anything.

### Publish state

`bdoctor` records a fingerprint of every page it published in `.bdoctor/state.json`, inside the library given by `--library`. That state is what lets it skip pages which did not change.

The fingerprint includes the content of the local images a page shows, its header image too. Replace `src/assets/bdoctor.png` and the next run republishes the pages showing it, even though their markdown did not change. The state also records a hash of every image `bdoctor` uploaded, so the changed image replaces the copy in the library without `--overwriteImages`.

`--forceAll`
: Reprocess every page, ignoring the saved state.

`--removeDeleted`
: Recycle the pages which are tracked in the state but whose markdown file no longer exists. Requires `--confirm`.

`--disableStatePersistence`
: Do not load or save the state file at all. Every page is processed on every run.

`--stateFile <path>`
: The path of the state file within the library. Default: `.bdoctor/state.json`.

### Rendering

`--enableMath <true|false>`
: Enables or disables KaTeX math. The value is required — a bare `--enableMath` is invalid. It overrides `markdown.enableMath`, including an explicit `false` overriding a configured `true`. Math does not depend on `markdown.allowHtml`.

### Output

`--output <default|json>`
: How the command reports its result. Use `json` to silence the human output and write the result of `publish` and `status` as a single JSON document to stdout, which a pipeline can act on. An unknown value fails the run rather than falling back.

`--verbose`
: Extended logging, and a task list which keeps every task visible instead of collapsing it.

`--debug`
: Debug output on stderr. Secrets are redacted.

## `bdoctor.json`

You can provide the same flags and values as in the parameters. Be sure to use the whole argument names, and not the shorthands.

```json
{
  "$schema": "https://cloud13.blob.core.windows.net/public/bdoctor/schema/3.1.0.json",
  "folder": "./src",
  "url": "https://<tenant>.sharepoint.com/sites/<documentation>"
}
```

Some settings are nested in `bdoctor.json` and flat on the command line. `markdown.shortcodesFolder`, for example, is `--shortcodesFolder`:

```json
{
  "markdown": {
    "allowHtml": true,
    "extended": true,
    "enableMath": true,
    "theme": "Light",
    "shortcodesFolder": "./shortcodes"
  }
}
```

You can also define a static navigation structure:

```json
{
  "menu": {
    "QuickLaunch": {
      "items": [{
        "id": "documentation",
        "name": "Documentation",
        "url": ""
      }]
    }
  }
}
```

The menu property can contain a `QuickLaunch` and/or a `TopNavigationBar` element with their corresponding static navigation links under the `items` property. More information about navigation items can be found in the [page creation](./page-creation) page.

<callout type="caution">If you specify arguments during command execution, they are used instead of the values defined in the <code>bdoctor.json</code> file.</callout>

<toc title="Table of contents" position="right" />
