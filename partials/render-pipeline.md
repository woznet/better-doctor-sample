<mermaid title="The order in which Better Doctor processes a page">
flowchart TD
  page[Page markdown] --> includes

  subgraph partials [Partials]
    includes[Expand the include tags and their parameters] --> auto[Add the header and footer partials]
  end

  auto --> before

  subgraph shortcodes [Shortcodes]
    before[Before markdown: toc, mermaid, repo-link] --> render[Render the markdown]
    render --> after[After markdown: icon, callout, keys, collapse]
  end

  after --> sanitize[Sanitize the HTML] --> published[Published page]
</mermaid>
