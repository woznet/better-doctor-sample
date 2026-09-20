---
title: Extended markdown
slug: tests/extended-markdown.aspx

menu:
  QuickLaunch:
    id: extended-markdown
    parent: tests
---

## The intention of this page is to test the extended markdown syntax

The syntax on this page requires `markdown.allowHtml` to be enabled. The `markdown.extended` setting turns it on, and is enabled by default.

<callout type="note">Without <code>allowHtml</code>, the page falls back to the prepared Markdown path, which only supports the basic markdown syntax. Everything on this page would then show up as plain text.</callout>

## Emoji

:pushpin: Purpose, :pencil2: Definition and :triangular_ruler: Calculation.

```markdown
:pushpin: Purpose, :pencil2: Definition and :triangular_ruler: Calculation.
```

## Highlighted text

This sentence contains ==highlighted text== to draw attention to it.

```markdown
This sentence contains ==highlighted text== to draw attention to it.
```

## Task lists

- [x] Install Better Doctor
- [x] Create the markdown files
- [ ] Publish the documentation

```markdown
- [x] Install Better Doctor
- [x] Create the markdown files
- [ ] Publish the documentation
```

## Definition lists

Better Doctor
: Maintain your documentation on SharePoint without pain.

Shortcode
: An HTML snippet inside your content files calling a built-in or custom template.

```markdown
Better Doctor
: Maintain your documentation on SharePoint without pain.
```

## Footnotes

Better Doctor publishes your markdown files as SharePoint pages[^1], and keeps track of what it published[^state].

```markdown
Better Doctor publishes your markdown files as SharePoint pages[^1].

[^1]: The footnote content.
```

## Tables

| Syntax            | Enabled by             |
| ----------------- | ---------------------- |
| :sparkles: Emoji  | `markdown.extended`    |
| ==Highlight==     | `markdown.extended`    |
| Task lists        | `markdown.extended`    |
| Definition lists  | `markdown.extended`    |
| Footnotes         | `markdown.extended`    |

[^1]: The pages are created in the `SitePages` library of your site.
[^state]: The publish state is stored in `Shared Documents/.bdoctor/state.json` by default.
