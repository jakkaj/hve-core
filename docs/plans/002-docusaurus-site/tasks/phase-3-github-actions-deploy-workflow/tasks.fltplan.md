# Phase 3 Flight Plan — GitHub Actions Deploy Workflow

## What This Phase Does

Creates the GitHub Actions workflow that automatically builds and deploys the Docusaurus site to GitHub Pages when documentation changes merge to main. A single workflow file with two jobs (build + deploy), all actions SHA-pinned per repo security conventions.

## Flight Status

```mermaid
flowchart LR
    classDef pending fill:#9E9E9E,stroke:#757575,color:#fff
    classDef active fill:#FF9800,stroke:#F57C00,color:#fff
    classDef done fill:#4CAF50,stroke:#388E3C,color:#fff
    classDef blocked fill:#F44336,stroke:#D32F2F,color:#fff

    S1["Stage 1\nCreate Workflow"]:::done
    S2["Stage 2\nValidation"]:::done

    S1 --> S2
```

## Stages

### Stage 1: Create Workflow

- [x] **T001** — Create `.github/workflows/deploy-docs.yml` with build + deploy jobs, SHA-pinned actions, path filter, permissions, concurrency

### Stage 2: Validation

- [x] **T002** — Validate YAML syntax, SHA pinning compliance, no forbidden tag-only refs

## Before / After

```
BEFORE (Phase 2D)                 AFTER (Phase 3)
─────────────────                 ─────────────────
25 workflow files                 26 workflow files
No docs deployment                deploy-docs.yml triggers on
                                  docs/docusaurus/** changes
                                  → builds + deploys to Pages
```
