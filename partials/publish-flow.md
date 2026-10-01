<mermaid title="The Better Doctor publishing flow">
flowchart TD
  A[Write docs in Markdown] --> B[Run bdoctor publish]
  B --> C{Validation passed?}
  C -- Yes --> D[SharePoint page updated]
  C -- No --> E[Fix issues]
  E --> B

  style A fill:#e3f2fd,stroke:#1e88e5,stroke-width:2px
  style B fill:#fff3e0,stroke:#fb8c00,stroke-width:2px
  style C fill:#f3e5f5,stroke:#8e24aa,stroke-width:2px
  style D fill:#e8f5e9,stroke:#43a047,stroke-width:2px
  style E fill:#ffebee,stroke:#e53935,stroke-width:2px
</mermaid>
