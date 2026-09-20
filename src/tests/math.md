---
title: Math
slug: tests/math.aspx

menu:
  QuickLaunch:
    id: math
    parent: tests
---

## The intention of this page is to test the KaTeX math rendering

Math is **off by default**. This sample turns it on in `bdoctor.json`:

```json
{
  "markdown": {
    "enableMath": true
  }
}
```

A single run can override it, and an explicit `false` wins over a configured `true`:

```bash
bdoctor publish --enableMath true
bdoctor publish --enableMath false
```

<callout type="note">Math does not depend on <code>markdown.allowHtml</code>, and the value of <code>--enableMath</code> is required. A bare <code>--enableMath</code> is invalid.</callout>

## Inline math

The mass-energy equivalence is $E = mc^2$, and the golden ratio is $\varphi = \frac{1 + \sqrt{5}}{2}$.

```markdown
The mass-energy equivalence is $E = mc^2$.
```

## Display math

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

$$
\int_{0}^{\infty} e^{-x^2} \, dx = \frac{\sqrt{\pi}}{2}
$$

```markdown
$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$
```

## Escaping

With math enabled, a literal dollar sign needs a backslash: a coffee costs \$3.50 and a refill \$1.00.

```markdown
A coffee costs \$3.50 and a refill \$1.00.
```

## Math inside code stays code

Inline code such as `$E = mc^2$` is not rendered as math, and neither is a fenced block:

```text
$$
\sum_{i=1}^{n} i
$$
```

<include file="version" version="2.4.0" type="note" />
