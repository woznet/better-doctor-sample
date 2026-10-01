---
title: Shortcodes
slug: tests/shortcodes.aspx

menu:
  QuickLaunch:
    id: shortcodes
    parent: tests
---

## The intention of this page is to test the shortcodes

Shortcodes are HTML-like tags which `bdoctor` expands while it publishes, so they need `markdown.allowHtml` to be enabled. Four of them are built in: `icon`, `callout`, `mermaid` and `toc`. This sample adds three of its own from the <repo-link path="shortcodes/" /> folder.

Every shortcode runs in one of two passes, before or after the markdown is rendered. The partials are resolved before either of them:

<include file="render-pipeline" />

## Partial or shortcode?

Both put reusable pieces on a page. The difference is whether the piece is content or logic:

| Use a | When | Like |
| --- | --- | --- |
| [Partial](./partials) | The same markdown appears on several pages, maybe with a few values changed. | The banner, the navigation, the version callout. |
| Shortcode | Markup has to be computed from attributes or content, or the same markup needs code to stay consistent. | A key combination, a collapsible section, a link built from a path. |

They combine: a partial can hold shortcodes, and a parameter of a partial can fill a shortcode attribute.

## Icon

<icon name="ic_fluent_settings_16_regular" />

<icon name="ic_fluent_settings_20_regular" />

<icon name="settings_24_regular" />

<icon name="settings_28_regular" />

The shortcode snippets look like this:

```html
<icon name="ic_fluent_settings_16_regular" />

<icon name="ic_fluent_settings_20_regular" />

<icon name="settings_24_regular" />

<icon name="settings_28_regular" />
```

<callout type="note">You can find all the icons on the following <a href="https://github.com/microsoft/fluentui-system-icons/blob/master/icons.md">icons list</a> page. Use the names you can find in the <strong>Android</strong> column.</callout>

## Callout

<callout type="note">The note content</callout>

<callout type="tip">The tip content</callout>

<callout type="info">The info content</callout>

<callout type="caution">The caution content</callout>

<callout type="danger">The danger content</callout>

<callout type="tip" title="Override the title">Tip content with a custom title</callout>

The shortcode snippets look like this:

```html
<callout type="note">The note content</callout>

<callout type="tip">The tip content</callout>

<callout type="info">The info content</callout>

<callout type="caution">The caution content</callout>

<callout type="danger">The danger content</callout>

<callout type="tip" title="Override the title">Tip content with a custom title</callout>
```

## Mermaid

The diagram below is published as an inert descriptor. The web part loads its bundled Mermaid renderer in the browser and draws it there, so no SVG is uploaded to your site.

<include file="publish-flow" />

The diagram lives in the <repo-link path="partials/publish-flow.md" /> partial, so the [documentation](../bdoctor/documentation) page draws the same one. Its source is a `mermaid` shortcode:

```html
<mermaid title="The Better Doctor publishing flow">
flowchart TD
  A[Write docs in Markdown] --> B[Run bdoctor publish]
  B --> C{Validation passed?}
  C -- Yes --> D[SharePoint page updated]
  C -- No --> E[Fix issues]
  E --> B
</mermaid>
```

## Table of contents

The `toc` shortcode renders a table of contents from the headings on the page. The [table of contents](../bdoctor/tableOfContents) page exercises it across every heading level.

```html
<toc title="Table of contents" position="right" />
```

## Custom shortcodes

Custom shortcodes are `.js` or `.cjs` modules in the folder given by `markdown.shortcodesFolder`, one shortcode per file. Each exports the tag it handles and a function which renders it:

```javascript
module.exports = {
  name: "my-shortcode",   // The tag: lowercase, hyphenated, not an HTML element.
  beforeMarkdown: false,  // Optional: run before the markdown is rendered.
  render: (attributes, html) => "<p>...</p>"  // May also be async.
};
```

- `attributes` holds the attributes of the tag, exactly as written.
- `html` holds the content between the opening and closing tag. After the markdown pass it is already rendered HTML; before it, it is the raw markdown.
- The return value replaces the tag. A shortcode which runs before the markdown pass may return markdown.
- An error thrown by `render` fails the page, which is how a shortcode rejects bad input.

They run in Node at publish time, which is why the browser cannot re-run them in the edit-mode preview. Changing one republishes every page.

### Keys

Open the command palette with <keys combo="Ctrl+Shift+P" />, or copy with <keys combo="Ctrl+C" />. The plus key itself works too: <keys combo="Ctrl++" />.

```html
Open the command palette with <keys combo="Ctrl+Shift+P" />.
```

The `keys` shortcode turns an attribute into markup: every key becomes a `kbd` element, nested the way HTML prescribes for a key combination. It escapes the attribute value with a helper from <repo-link path="shortcodes/lib/html.cjs" />. A file which exports no `name` and `render` is loaded but not registered, so shared helpers can sit next to the shortcodes.

<collapse title="Source of shortcodes/keys.cjs">

```javascript
const { escapeHtml } = require("./lib/html.cjs");

module.exports = {
  name: "keys",
  render: (attributes) => {
    const keys = (attributes.combo ?? "")
      .split(/\+(?=.)/)
      .map((key) => key.trim())
      .filter(Boolean);

    if (!keys.length) {
      throw new Error('The keys shortcode needs a "combo" attribute, such as combo="Ctrl+C".');
    }

    const markup = keys.map((key) => `<kbd>${escapeHtml(key)}</kbd>`).join("+");
    return keys.length > 1 ? `<kbd>${markup}</kbd>` : markup;
  }
};
```

</collapse>

### Collapse

<collapse title="What happens to a page which is not in the sources anymore?">

It stays on your site. Pass `--removeDeleted` to recycle it:

```bash
bdoctor publish --removeDeleted --confirm
```

<callout type="caution">Recycled pages can be restored from the site recycle bin, until it is emptied.</callout>

</collapse>

```html
<collapse title="What happens to a page which is not in the sources anymore?">

It stays on your site. Pass `--removeDeleted` to recycle it:

...

</collapse>
```

The `collapse` shortcode wraps its content in a `details` element. It runs after the markdown pass, so the content it receives is already rendered: the code block keeps its highlighting and copy button, and the callout is already a callout. Its source is <repo-link path="shortcodes/collapse.cjs" />.

<callout type="note">Leave a blank line after the opening tag and before the closing one. Without them, the content is an HTML block and its markdown is not rendered.</callout>

### Repo link

The markdown of this page is <repo-link path="src/tests/shortcodes.md" />, and the shortcodes it uses live in <repo-link path="shortcodes/" />.

```html
The markdown of this page is <repo-link path="src/tests/shortcodes.md" />.
```

The `repo-link` shortcode sets `beforeMarkdown: true` and returns markdown rather than HTML: a link around the path as inline code, which the markdown pass then renders. Paths ending in a `/` link to the folder view. A missing `path` throws, so a broken link fails the publishing run instead of reaching your site. Its source is <repo-link path="shortcodes/repo-link.cjs" />.

### What a custom shortcode may return

The output passes the same sanitizer as the rest of the page, so the Better Doctor Markdown web part can render it safely:

- **Use semantic HTML.** `kbd`, `details`, `figure`, tables, lists, links and images all survive.
- **Classes survive, but only the web part's own classes are styled.** There is no place for your own CSS.
- **Active content fails the run.** That is `script`, `style`, `iframe`, `object`, `embed` and `form` elements, `on*` event attributes, inline `style` attributes, and `javascript:` links.
- **`data-*` attributes and unknown elements are stripped.** The text of an unknown element is kept.
- **Built-in shortcodes in your output only render if they run later.** A `beforeMarkdown` shortcode can return a `callout` or `icon` tag, as those run in the pass after it. A shortcode in the after pass cannot.
