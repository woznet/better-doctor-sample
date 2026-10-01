const { escapeHtml } = require("./lib/html.cjs");

// <keys combo="Ctrl+Shift+P" /> renders a key combination as nested <kbd>
// elements, the markup HTML prescribes for keyboard input.
module.exports = {
  name: "keys",
  render: (attributes) => {
    // Split on every "+" followed by another character, so the plus key
    // itself still works: "Ctrl++" is Ctrl and +.
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
