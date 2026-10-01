const { escapeHtml } = require("./lib/html.cjs");

// <collapse title="...">...</collapse> folds content away behind a summary
// line. It runs after the Markdown is rendered, so `html` already holds the
// finished content: paragraphs, code blocks, and callouts included.
module.exports = {
  name: "collapse",
  render: (attributes, html) =>
    `<details><summary>${escapeHtml(attributes.title || "Details")}</summary>${html}</details>`
};
