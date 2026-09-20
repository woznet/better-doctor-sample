---
title: Page creation
draft: false

metadata:
  Category: "Choice 2"
  SingleLineText: "Choice 2"

localization:
  "nl-nl":

menu:
  QuickLaunch:
    id: page-creation
    parent: bdoctor/documentation
---

## Page creation

You start by creating pages as Markdown files (`.md`) in the source folder (`./src` is the default, but you can change this). The markdown pages should contain the following front matter.

```markdown
---
title: <title>
---

Your article content starts here.
```

- **title**: `string` - The title of the page.

<callout type="info">Front Matter is the page its metadata.</callout>

Optional Front Matter properties are:

- **slug**: `string` - If a slug is not defined, the title and current folder structure are used. You can add the slug with or without the `.aspx` file extension; the tool adds it automatically.
- **draft**: `boolean` - Defines if you want to publish the article during the publishing phase.
- **description**: `string` - The page description to add. Limited to 255 characters.
- **comments**: `boolean` - Enable or disable page commenting. This page level setting always wins over the global `disableComments` option.
- **layout**: `Article` | `Home` - The page layout to use. Default: `Article`.
- **template**: `string` - The title of an existing SharePoint page template to base the page on.
- **header**: `HeaderOptions` - How to render the page header. Supports `type` (`None`, `Default` or `Custom`), `image`, `altText`, `translateX`, `translateY`, `layout`, `textAlignment`, `showTopicHeader`, `topicHeader`, `showPublishDate` and `authors`.
- **metadata**: `Metadata` - Extra column values to set on the page, keyed by the column name.
- **partials**: `boolean | { header?: boolean, footer?: boolean }` - Skip the partials which are added to every page. Check the [partials test page](../tests/partials).
- **localization**: `{ [locale name]: relative path }` - The translation pages linked to the current page. A locale with no path is machine translated when a translator is configured.
- **type**: `translation` - Set on a translation page.
- **menu**: `Menu` - Where the page gets added to the navigation structure. Check the [menu section](#menu).

When you want to create page to page links, you can provide the relative path from the current markdown file to the other markdown file (with or without the `.md` extension).

### Menu

The menu property allows you to create a navigation structure for your static content. The `Menu` object has the following properties:

- menu
  - `QuickLaunch` OR `TopNavigationBar` - Default is `QuickLaunch`
    - **id**: `string` (required) - Navigation id. This can be used to create a hierarchy in your navigation.
    - **name**: `string` (optional) - When this property is defined, it is used for the navigation item title, otherwise the page title is used.
    - **weight**: `number` (optional) - The weight of the navigation item. If you want to have it first or last.
    - **parent**: `string` (optional) - Defines the hierarchy of your page in the menu. If not provided, the item is added to the root of the navigation. When defined, it should contain the `id` value of the parent page. You can also add multi-level navigation like: `<parent-id>/<sub-parent-id>`.

<callout type="caution">During the publishing process, the navigation is re-created each time.</callout>

<callout type="caution">When using <code>QuickLaunch</code> you can only have three levels of navigation: <code>Root/sub/sub-sub</code>.</callout>

#### Example 1

The following page is added to the root of the `QuickLaunch` after the already defined links.

```markdown
---
title: Documentation
slug: documentation.aspx
draft: false

menu:
  QuickLaunch:
    id: documentation
    weight: 1
---

Write here the Better Doctor page content.
```

#### Example 2

The following page adds a subpage underneath the documentation link in the navigation.

```markdown
---
title: Tools
slug: documentation/tools.aspx
draft: false

menu:
  QuickLaunch:
    id: tools
    weight: 1
    parent: documentation
---

Write here the tools page content.
```

#### Example 3

Defines a new page under the tools section:

```markdown
---
title: Better Doctor
slug: documentation/bdoctor.aspx
draft: false

menu:
  QuickLaunch:
    id: bdoctor
    weight: 1
    parent: documentation/tools
---

Write here the Better Doctor page content.
```

<toc title="Table of contents" position="right" />
