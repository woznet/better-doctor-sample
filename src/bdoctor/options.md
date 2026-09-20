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

`--certificateBase64Encoded <certificate>`
: The base64 encoded certificate contents. Useful in a pipeline, where the certificate comes from a secret rather than a file.

`--password <password>`
: The password of your certificate, when it is protected with one.

<callout type="caution">Keep the certificate and its password out of source control. <code>bdoctor init</code> deliberately never writes them to <code>bdoctor.json</code>; pass them on each run, ideally from a pipeline secret.</callout>

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
: Overwrite the images in the SharePoint library which are referenced by your markdown files.

`--skipPrecheck`
: Skips the local content validation. It does **not** skip the Better Doctor Markdown availability check, which always runs before a publishing run changes anything.

### Publish state

`bdoctor` records a fingerprint of every page it published in `.bdoctor/state.json`, inside the library given by `--library`. That state is what lets it skip pages which did not change.

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
  "$schema": "https://cloud13.blob.core.windows.net/public/bdoctor/schema/2.4.0.json",
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
