---
title: Partials
slug: tests/partials.aspx

menu:
  QuickLaunch:
    id: partials
    parent: tests
---

## The intention of this page is to test the reusable content partials

Partials are markdown snippets which live in the <repo-link path="partials/" /> folder, and get added to your pages while `bdoctor` publishes them. The navigation you find at the bottom of every page in this sample is one of them.

They are the first thing `bdoctor` resolves, before any shortcode runs, so a partial can hold anything a page can: markdown, shortcodes, and other partials. The diagram below is a partial too, shared with the [shortcodes](./shortcodes) page:

<include file="render-pipeline" />

## Automatically added partials

The `bdoctor.json` file of this sample adds a banner at the top and the navigation at the bottom of every page:

```json
{
  "partials": {
    "folder": "./partials",
    "header": "banner",
    "footer": "navigation"
  }
}
```

The note above this page its title is the `header` partial, <repo-link path="partials/banner.md" />. The navigation below is the `footer` one, <repo-link path="partials/navigation.md" />.

Pages which do not want them can opt out in their front matter, which the [No partials](./no-partials) page does:

```markdown
---
title: Standalone page
partials: false
---
```

## Included partials

Next to the automatically added ones, a partial can be pulled in wherever you need it:

```markdown
<include file="feedback" />
```

Which renders the shared feedback callout from <repo-link path="partials/feedback.md" />:

<include file="feedback" />

## Partials with parameters

A partial does not have to be the same everywhere. Everything you add to the `include` tag next to the `file` attribute becomes a parameter:

```markdown
<include file="version" product="Better Doctor" version="2.4.0" type="note" />
```

The <repo-link path="partials/version.md" /> snippet uses them with `{{name}}` placeholders. A parameter can fill a shortcode attribute too, which is how the `type` picks the kind of callout:

```markdown
<callout type="{{type}}">This page needs <strong>{{product}}</strong> {{version}} or higher.</callout>
```

Which renders:

<include file="version" product="Better Doctor" version="2.4.0" type="note" />

### Default values

Parameters which are the same on most pages get their value from the `params` front matter of the partial:

```markdown
---
params:
  product: Better Doctor
  version: 2.4.0
  type: note
---
```

So including it without any parameters renders those defaults:

<include file="version" />

A page only mentions what is different, like this one which asks for a newer version:

```markdown
<include file="version" version="2.5.0" type="caution" />
```

<include file="version" version="2.5.0" type="caution" />

### Passing parameters on

A partial hands its own parameters to the partials it includes. The <repo-link path="partials/requirements.md" /> snippet takes a `product` and a `version`, and passes both to the version partial:

```markdown
<include file="./version" product="{{product}}" version="{{version}}" type="caution" />
```

Including it with a single parameter:

```markdown
<include file="requirements" version="2.5.0" />
```

Renders:

<include file="requirements" version="2.5.0" />

<callout type="note">A parameter which is not passed and has no default value fails the publishing run, so a typo in a parameter name does not end up on your site.</callout>

### Placeholders in code

Placeholders inside inline code and code blocks are left as they are, so a partial can show `{{name}}` syntax in its examples. To keep a literal placeholder in the text of a partial, escape it with a backslash: `\{{name}}`.

## Partials in subfolders

A partial can live in a subfolder of the partials folder, and is included by its path:

```markdown
<include file="nl/navigation" />
```

This sample uses that for its Dutch pages. The automatic partials are in English, and a translation page gets them too, so <repo-link path="src/bdoctor/installation.nl.lang.md" /> turns them off and includes the Dutch ones from <repo-link path="partials/nl/" /> itself:

```markdown
---
title: Installatie
type: translation
partials: false
---

<include file="nl/banner" />

...

<include file="nl/navigation" />
```

<callout type="caution">Prefer a folder over a language suffix. <code>bdoctor</code> only adds <code>.md</code> to a name without an extension, so <code>banner.nl</code> looks for a file called <code>banner.nl</code> and fails the run. A suffixed partial has to be written in full: <code>banner.nl.md</code>.</callout>

## Partials can carry shortcodes

Partials are expanded before any shortcode runs, so a shortcode inside a partial behaves exactly as it would on the page. The publishing flow diagram is a `mermaid` shortcode in <repo-link path="partials/publish-flow.md" />, drawn on both the [documentation](../bdoctor/documentation) and the [shortcodes](./shortcodes) page from that single source:

```markdown
<include file="publish-flow" />
```

It does not work the other way around: by the time a shortcode runs the partials are resolved, so a shortcode cannot output an `include` tag.

## Links inside a partial

A partial is used on pages in different folders, so its links are written from the sources root:

```markdown
- [Home](/home)
- [Codeblocks](/tests/codeblocks)
```

`bdoctor` rewrites them to the page which includes the partial, so they end up pointing at the right SharePoint pages.

## Partials feed the publish state

A partial is part of what a page renders from, so changing one re-publishes every page which uses it. Run `bdoctor status` after editing <repo-link path="partials/navigation.md" /> to see them all listed as modified.
