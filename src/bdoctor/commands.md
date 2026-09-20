---
title: Commands
slug: bdoctor/commands.aspx
draft: false

menu:
  QuickLaunch:
    id: commands
    parent: bdoctor/documentation
---

## Commands

Check the [options](./options) page to see which arguments you can pass to each command.

### Version

This command returns the installed version number of the tool.

```bash
bdoctor version
```

### Init

This command creates the initial folder structure for your documentation project: the source folder, a starter `index.md`, and a `bdoctor.json` file. Existing files are never overwritten, so it is safe to run again in an existing project.

#### Examples

Initialize a standard project:

```bash
bdoctor init
```

Initialize a project with the details of your app registration:

```bash
bdoctor init --url <url> --appId <appId> --tenant <tenant>
```

### Status

A read-only command which compares your local markdown files against the publish state stored on your site, and tells you what the next publishing run will do. It changes nothing.

```bash
bdoctor status
```

The output groups your pages as **new**, **modified**, **deleted** and **unchanged**. The unchanged ones are only listed when you pass `--verbose`.

<callout type="note">The command needs the <code>--url</code> option, as argument or in <code>bdoctor.json</code>, because it downloads the state file from your site.</callout>

### Publish

The publish command creates your static content in SharePoint. It uploads all referenced images, creates the navigation structure if provided, and publishes the translations after their source pages exist.

Only pages which are new or whose content changed are processed. Pass `--forceAll` to publish everything regardless.

#### Examples

When using a `bdoctor.json` file, you can just run the publishing command:

```bash
bdoctor publish --certificate ./cert.pfx --password <password>
```

If you want to manually pass your arguments, you can do this as follows:

```bash
bdoctor publish --url https://<tenant>.sharepoint.com/sites/<documentation>
```

Report the run to a pipeline as a single JSON document:

```bash
bdoctor publish --output json > publish.json
```

<callout type="caution">The Better Doctor Markdown web part has to be deployed and available at the target site. The run checks this before it cleans, uploads, or changes any page, and stops when the web part is missing.</callout>

### Workflow

Generates a GitHub Actions workflow or an Azure DevOps pipeline for your project, written to `bdoctor.yml`.

```bash
bdoctor workflow
```

### Setup and cleanup

Install and uninstall the `<tab>` autocompletion for your shell.

```bash
bdoctor setup
bdoctor cleanup
```

<include file="version" version="2.4.0" />
