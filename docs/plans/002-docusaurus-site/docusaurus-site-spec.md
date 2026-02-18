# Docusaurus Documentation Site for HVE-Core

📚 This specification incorporates findings from research-dossier.md

## Research Context

The research dossier confirmed:

- Docusaurus 3 installs cleanly in `docs/docusaurus/` with isolated `package.json`
- GitHub Pages deploys via `actions/deploy-pages` (no `gh-pages` branch)
- The existing 48 docs in `docs/` are NOT being migrated — this is entirely new content
- No prior static site generator exists (greenfield)
- Node.js 20 is the target runtime (matches existing devcontainer)
- The repo has 25 existing GitHub Actions workflows; a docs deploy workflow is net-new
- `peaceiris/actions-gh-pages` SHA pins are already registered (Pages was anticipated)

## Summary

Create a Docusaurus 3 documentation site at `docs/docusaurus/` that serves as the primary user-facing guide for HVE-Core. The site explains how to use the repo's agents, prompts, instructions, and skills across the software development lifecycle. It is new content purpose-built for the site, not a migration of existing `docs/` markdown. The site deploys to GitHub Pages via GitHub Actions.

An `agents_edits.instructions.md` file ensures Copilot agents understand the Docusaurus conventions when editing site content.

## Goals

- Provide a navigable, searchable documentation site that helps users understand what HVE-Core offers and how to use it
- Establish the Docusaurus project skeleton with working local dev server (`npm run docs:dev`)
- Define the sidebar structure with sample pages demonstrating hierarchy, ordering, and frontmatter conventions
- Deploy to GitHub Pages on push to main (automated)
- Create an `.instructions.md` file so Copilot agents follow Docusaurus conventions when editing docs content
- Support Mermaid diagrams for flow visualizations
- Render correctly on GitHub Pages at `https://<org>.github.io/hve-core/`

## Non-Goals

- Migrating existing `docs/*.md` files into the Docusaurus site
- Blog functionality
- Versioned documentation (can add later)
- Custom React components beyond basic landing page
- Search integration (Docusaurus includes built-in search; advanced search like Algolia is a future enhancement)
- Internationalization / localization
- Writing all final documentation content (this spec covers the skeleton and sample pages only)

## Complexity

- **Score**: CS-2 (small)
- **Breakdown**: S=1, I=1, D=0, N=0, F=0, T=0
- **Confidence**: 0.85
- **Assumptions**: Docusaurus 3 `npx create-docusaurus` works in a subdirectory; GitHub Pages can be enabled on the fork
- **Dependencies**: Node.js 20, npm, GitHub Pages enabled on the repo
- **Risks**: GitHub Pages may need manual enablement in repo settings (Settings → Pages → Source: GitHub Actions)
- **Phases**: (1) Scaffold project, (2) Create content skeleton + instructions file, (3) Add GitHub Actions workflow

## Acceptance Criteria

1. Running `cd docs/docusaurus && npm install && npm start` opens a local dev server with working navigation
2. The sidebar displays a multi-level hierarchy with at least 3 top-level sections and 2+ pages per section
3. Pages are ordered by `sidebar_position` frontmatter, and the order matches the intended reading flow
4. At least one page contains a Mermaid diagram that renders correctly
5. A `.github/instructions/docusaurus-edits.instructions.md` file exists with `applyTo: 'docs/docusaurus/**'` and contains conventions for writing Docusaurus content
6. A `.github/workflows/deploy-docs.yml` workflow exists that builds and deploys to GitHub Pages on push to main
7. `docs/docusaurus/build/` and `docs/docusaurus/.docusaurus/` are in `.gitignore`
8. Root `package.json` has `docs:dev`, `docs:build`, `docs:serve` npm scripts that delegate to the subdirectory
9. The deployed site is accessible at `https://<org>.github.io/hve-core/`
10. Sample pages demonstrate: frontmatter with sidebar_position, admonitions (:::note, :::tip), Mermaid diagrams, internal links between pages, and a category index page

## Risks & Assumptions

- **GitHub Pages enablement**: The fork must have GitHub Pages enabled with Source set to "GitHub Actions" in repo settings. This is a manual one-time step.
- **SHA pinning**: The deploy workflow must use SHA-pinned actions per hve-core's `workflows.instructions.md` conventions.
- **Concurrent workflows**: The docs deploy should not interfere with the existing `main.yml` release pipeline. Using a separate workflow with `paths: ['docs/docusaurus/**']` filter ensures isolation.
- **Docusaurus in subdirectory**: The `baseUrl` must be set to `/hve-core/` for correct asset resolution on GitHub Pages.
- **Content is placeholder**: The sample pages are structural scaffolding, not final documentation. Real content will be written iteratively after the skeleton is in place.

## Open Questions

1. ~~Landing page~~ → Default Docusaurus hero. Content workshopped later.
2. ~~GitHub org~~ → `jakkaj` fork for now (`https://jakkaj.github.io/hve-core/`). May move to `microsoft` later.

## ADR Seeds (Optional)

- **Decision Drivers**: Need a docs site that supports Mermaid, is Copilot-friendly, deploys to GitHub Pages, and lives alongside existing repo content without migration
- **Candidate Alternatives**: Docusaurus (React-based, rich plugin ecosystem), MkDocs Material (Python-based, simpler), VitePress (Vue-based, fast), Starlight (Astro-based, modern)
- **Stakeholders**: Repository maintainers, HVE-Core users, Copilot agent authors

## Workshop Opportunities

| Topic | Type | Why Workshop | Key Questions |
|---|---|---|---|
| Information Architecture | CLI Flow | The site needs a user-journey-oriented structure, not a repo-mirroring structure. The IA determines every page, section, and navigation path | What are the primary user personas? What's their first question? What journey takes them from "I installed this" to "I'm productive"? |
| Docusaurus-Copilot Integration | Integration Pattern | The `docusaurus-edits.instructions.md` file shapes how ALL future content gets written by agents. Getting the conventions right early prevents rework | What frontmatter fields are required? What Docusaurus-specific syntax must agents use (admonitions, tabs, code blocks)? How should agents handle links? |

## Proposed Site Structure (Skeleton)

This is the initial skeleton — sections contain sample pages demonstrating the mechanics. Real content follows separately.

```
docs/docusaurus/
├── package.json
├── docusaurus.config.js
├── sidebars.js
├── static/
│   └── img/                          # Logo, favicon
├── src/
│   └── pages/
│       └── index.js                  # Landing page
└── docs/                             # Content root
    ├── intro.md                      # sidebar_position: 1
    ├── getting-started/
    │   ├── _category_.json           # label, position, collapsible
    │   ├── installation.md           # sidebar_position: 1
    │   ├── first-workflow.md         # sidebar_position: 2
    │   └── configuration.md          # sidebar_position: 3
    ├── workflows/
    │   ├── _category_.json
    │   ├── overview.md               # sidebar_position: 1
    │   ├── rpi-flow.md               # sidebar_position: 2
    │   ├── backlog-management.md     # sidebar_position: 3
    │   └── git-operations.md         # sidebar_position: 4
    ├── agents/
    │   ├── _category_.json
    │   ├── overview.md               # sidebar_position: 1
    │   ├── task-agents.md            # sidebar_position: 2
    │   └── standalone-agents.md      # sidebar_position: 3
    ├── reference/
    │   ├── _category_.json
    │   ├── frontmatter-schema.md     # sidebar_position: 1
    │   ├── artifact-contracts.md     # sidebar_position: 2
    │   └── instructions-guide.md     # sidebar_position: 3
    └── contributing/
        ├── _category_.json
        └── writing-docs.md           # sidebar_position: 1
```

### Menu Ordering Mechanism

Pages are ordered by `sidebar_position` in frontmatter. Categories are ordered by `position` in `_category_.json`. Example:

**Page frontmatter:**
```yaml
---
title: Your First Workflow
description: Walk through the RPI flow step by step
sidebar_position: 2
---
```

**Category config (`_category_.json`):**
```json
{
  "label": "Getting Started",
  "position": 2,
  "collapsible": true,
  "collapsed": false
}
```

### Instructions File (`docusaurus-edits.instructions.md`)

Located at `.github/instructions/docusaurus-edits.instructions.md` with `applyTo: 'docs/docusaurus/**'`. This file tells Copilot agents:

- Use Docusaurus frontmatter (`title`, `description`, `sidebar_position`, `sidebar_label`)
- Use Docusaurus admonitions (`:::note`, `:::tip`, `:::warning`) not GitHub alerts (`> [!NOTE]`)
- Use Mermaid via fenced code blocks (` ```mermaid `)
- Use relative links without `.md` extension for internal docs links (Docusaurus convention)
- Include `sidebar_position` in every new page
- Place new categories with `_category_.json` files
- Follow the site's information architecture
