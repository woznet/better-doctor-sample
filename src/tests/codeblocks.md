---
title: Codeblocks
slug: tests/codeblocks.aspx

menu:
  QuickLaunch:
    id: codeblocks
    parent: tests
---

## The intention of this page is to test out various code blocks

Every block below is highlighted in the browser by the Better Doctor Markdown web part, and carries a copy button which copies the original source rather than the decorated markup.

```javascript
console.log("Hello from Better Doctor");
```

```typescript
console.log('Hello back, Better Doctor');
```

```csharp
if (true) {
  Console.WriteLine($"I'm always {true}");
}
```

```html
<a title="unsubscribe" href="/unsubscribe">unsubscribe</a>
```

```bash
bdoctor publish --certificate ./cert.pfx
```

```text
No language highlighting, just plain text.
```
