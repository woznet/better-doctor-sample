// Helpers shared by the shortcodes in this folder. Better Doctor loads every
// .js and .cjs file below `markdown.shortcodesFolder`, and skips this one
// because it exports no `name` and `render`.

// Attributes reach a shortcode exactly as the author wrote them, entities
// included. An `&amp;` is already escaped, so existing entities are kept and
// everything else is escaped.
const escapeHtml = (value) => String(value ?? "")
  .replace(/&(?!(?:#\d+|#x[\da-f]+|[a-z][\da-z]*);)/gi, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

module.exports = { escapeHtml };
