// <repo-link path="partials/banner.md" /> links to a file or folder of this
// repository on GitHub. It runs before the Markdown is rendered and returns
// Markdown rather than HTML, which markdown-it then turns into a link.
const REPOSITORY = "https://github.com/woznet/better-doctor-sample";
const BRANCH = "main";

module.exports = {
  name: "repo-link",
  beforeMarkdown: true,
  render: (attributes) => {
    const path = (attributes.path ?? "").trim().replace(/^\.?\//, "");

    if (!path) {
      throw new Error('The repo-link shortcode needs a "path" attribute, such as path="partials/banner.md".');
    }

    // GitHub shows folders under /tree and files under /blob.
    const view = path.endsWith("/") ? "tree" : "blob";
    const url = `${REPOSITORY}/${view}/${BRANCH}/${path.split("/").map(encodeURIComponent).join("/")}`;
    return `[\`${path}\`](${url})`;
  }
};
