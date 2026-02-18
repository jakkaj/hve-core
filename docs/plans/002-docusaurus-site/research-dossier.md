# Research Report: Adding Docusaurus to hve-core

**Generated**: 2026-02-17T22:02Z
**Research Query**: "Add Docusaurus to this repo at docs/docusaurus, deploy to GitHub Pages"
**Mode**: Plan-Associated
**Location**: `docs/plans/002-docusaurus-site/research-dossier.md`
**FlowSpace**: Available (default graph)
**Findings**: 57 findings across 7 subagents + Perplexity deep research

## Executive Summary

### Can It Be Done?

**Yes.** Docusaurus 3 can be installed in `docs/docusaurus/` as a self-contained Node.js app with its own `package.json`, completely isolated from the root package ecosystem. It deploys to GitHub Pages via a GitHub Actions workflow using the modern `actions/deploy-pages` approach (no `gh-pages` branch needed).

### What's the Effort?

**Medium.** The existing 48 docs pages have Docusaurus-ready frontmatter (`title:`, `description:`), but ~40 relative links point outside `docs/` and will break. 23 Mermaid diagrams need a plugin. GitHub alerts (`> [!NOTE]`) in ~20 files need conversion to Docusaurus admonitions (`:::note`). Zero images exist, simplifying the migration.

### Key Decision

Docusaurus can either **consume the existing `docs/` markdown in-place** (via `path` config pointing to `../`) or **copy/symlink content into its own `docs/` subdirectory**. The in-place approach is cleaner but means the existing markdown must be Docusaurus-compatible.

### Quick Stats

- **Existing docs pages**: 48 publishable (+ 4 plans, 4 templates to exclude)
- **Frontmatter ready**: 48/48 have `title:` + `description:`
- **Breaking links**: ~40 relative links escape `docs/` tree
- **Mermaid diagrams**: 23 blocks across 8 files (plugin needed)
- **GitHub alerts**: ~35 occurrences across ~20 files (syntax conversion needed)
- **Existing SSG**: None (greenfield)
- **Prior research**: Zero — first investigation of a docs site
- **GitHub Pages**: Not configured, no workflow exists

## How the Existing Docs Work

### Content Inventory

| Section | Files | Lines | Key Content |
|---|---|---|---|
| Getting Started | 12 | 2,650 | Install methods, first workflow, MCP config |
| Contributing | 10 | 3,464 | AI artifact standards, release process, roadmap |
| Agents | 8 | 1,200 | Agent catalog, GitHub backlog manager (7 sub-pages) |
| RPI | 7 | 1,416 | RPI methodology, per-agent guides, using-together |
| Architecture | 4 | 872 | AI artifacts, workflows, testing |
| Security | 2 | 944 | Threat model |
| Templates | 4 | 838 | ADR, BRD, RCA, Security Plan templates |
| **Total publishable** | **~48** | **~11,384** | |

### Current Sidebar Structure

Extracted from README.md navigation links across all sections:

```
📖 HVE Core Documentation
├── 🏠 Overview
├── 🚀 Getting Started
│   ├── Installation Methods
│   │   ├── VS Code Extension
│   │   ├── Multi-Root Workspace
│   │   ├── Submodule
│   │   ├── Peer Directory Clone
│   │   ├── Git-Ignored Folder
│   │   ├── Mounted Directory
│   │   ├── GitHub Codespaces
│   │   └── Copilot CLI Plugins
│   ├── MCP Configuration
│   └── First Workflow
├── 🤖 Agent Systems
│   ├── Agent Catalog
│   └── GitHub Backlog Manager
│       ├── Why Backlog Manager
│       ├── Discovery
│       ├── Triage
│       ├── Sprint Planning
│       ├── Execution
│       └── Using Together
├── 🔬 RPI Methodology
│   ├── Why RPI?
│   ├── Task Researcher
│   ├── Task Planner
│   ├── Task Implementor
│   ├── Task Reviewer
│   └── Using Together
├── 🏗️ Architecture
│   ├── AI Artifacts
│   ├── Build Workflows
│   └── Testing
├── 🤝 Contributing
│   ├── Common Standards
│   ├── Custom Agents / Instructions / Prompts / Skills
│   ├── Release Process / Branch Protection / Copyright
│   └── Roadmap
├── 🔒 Security
│   └── Threat Model
└── 📄 Templates
    ├── ADR / BRD / Security Plan / RCA
```

### What Must NOT Go in Docusaurus

| Category | Count | Reason |
|---|---|---|
| `.github/agents/*.agent.md` | 22 | Copilot agent definitions |
| `.github/prompts/*.prompt.md` | 27 | Copilot prompt templates |
| `.github/instructions/*.instructions.md` | 24 | Auto-applied coding standards |
| `plugins/*/README.md` | 9 | Generated output |
| `docs/plans/` | 4+ | Internal research (this file!) |
| `docs/templates/` | 4 | Template files with `{{placeholders}}` |

## Docusaurus Integration — How It Would Work

### Project Structure

```
docs/
├── docusaurus/                    # NEW — Docusaurus project
│   ├── package.json               # Docusaurus deps (isolated from root)
│   ├── docusaurus.config.js       # Site configuration
│   ├── sidebars.js                # Sidebar navigation
│   ├── src/                       # Custom pages/components (optional)
│   │   └── pages/index.js         # Landing page
│   ├── static/                    # Static assets
│   └── build/                     # Build output (gitignored)
│
├── getting-started/               # EXISTING — consumed by Docusaurus
├── rpi/                           # EXISTING — consumed by Docusaurus
├── agents/                        # EXISTING — consumed by Docusaurus
├── architecture/                  # EXISTING — consumed by Docusaurus
├── contributing/                  # EXISTING — consumed by Docusaurus
├── security/                      # EXISTING — consumed by Docusaurus
├── templates/                     # EXISTING — possibly excluded
├── plans/                         # EXISTING — excluded from site
└── README.md                      # EXISTING — becomes landing page content
```

### Key Configuration (docusaurus.config.js)

```javascript
module.exports = {
  title: 'HVE Core',
  url: 'https://jakkaj.github.io',    // or microsoft.github.io
  baseUrl: '/hve-core/',
  organizationName: 'jakkaj',          // GitHub org/user
  projectName: 'hve-core',
  
  presets: [
    ['classic', {
      docs: {
        path: '../',                    // Point UP to existing docs/
        include: [
          'getting-started/**/*.md',
          'rpi/**/*.md',
          'agents/**/*.md',
          'architecture/**/*.md',
          'contributing/**/*.md',
          'security/**/*.md',
        ],
        exclude: [
          'plans/**',                   // Exclude internal research
          'templates/**',               // Exclude templates (or include separately)
          'docusaurus/**',              // Exclude itself
        ],
        routeBasePath: 'docs',
        sidebarPath: './sidebars.js',
      },
      blog: false,                      // No blog needed
    }],
  ],
  
  markdown: {
    mermaid: true,                      // Enable Mermaid rendering
  },
  
  themes: ['@docusaurus/theme-mermaid'],
};
```

### GitHub Actions Workflow

```yaml
name: Deploy Docs

on:
  push:
    branches: [main]
    paths: ['docs/**']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: docs/docusaurus
    steps:
      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
      - uses: actions/setup-node@1d0ff469b7ec7b3cb9d8673fde0c81c44821de2a # v4.2.0
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: docs/docusaurus/package-lock.json
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@56afc609e74202658d3ffba0e8f6dda462b719fa # v3.0.1
        with:
          path: docs/docusaurus/build

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@d6db90164ac5ed86f2b6aed7e0febac2b3c603fc # v4.0.5
```

**Note**: SHA pins follow hve-core's workflow conventions. The `peaceiris/actions-gh-pages` action is already in the SHA pinning lookup table (PL-03), though the modern `actions/deploy-pages` approach is preferred.

## Compatibility Issues

### 🔴 Critical: ~40 Links Escape docs/ Tree

Links like `../../.github/CUSTOM-AGENTS.md` and `../../CONTRIBUTING.md` resolve on GitHub but 404 in Docusaurus.

**Options:**
1. **Convert to absolute GitHub URLs**: `https://github.com/jakkaj/hve-core/blob/main/.github/CUSTOM-AGENTS.md`
2. **Copy referenced files into docs tree**: Bring `CONTRIBUTING.md` etc. into Docusaurus content
3. **Docusaurus plugin**: Custom remark plugin that rewrites `../../` paths to GitHub URLs at build time

Option 3 is the cleanest — one plugin, zero manual link changes, works for all future content.

### 🟡 Medium: GitHub Alerts → Docusaurus Admonitions

~35 occurrences across ~20 files need syntax conversion:

```markdown
<!-- GitHub syntax (current) -->
> [!NOTE]
> This is important

<!-- Docusaurus syntax (needed) -->
:::note
This is important
:::
```

**Option**: A remark plugin (`remark-github-alerts` or custom) can transform these at build time, keeping source markdown GitHub-compatible.

### 🟡 Medium: Mermaid Diagrams (23 blocks)

Requires `@docusaurus/theme-mermaid` plugin + `markdown.mermaid: true` in config. The existing ````mermaid` fence syntax is identical — **no markdown changes needed**, just config.

### 🟢 Low: Custom Frontmatter Fields

`ms.date`, `ms.topic`, `estimated_reading_time` pass through without error but aren't rendered. A custom Docusaurus theme component could surface these if desired. No action required for launch.

### 🟢 Low: Missing Frontmatter on 4 Plan Files

The 4 files in `docs/plans/` lack frontmatter — but these are excluded from the site anyway.

## Existing Navigation Issues (Fix During Migration)

| Issue | Location | Severity |
|---|---|---|
| Security section missing from root nav | `docs/README.md` | Medium |
| `extension/README.md` linked but doesn't exist | `docs/README.md` Quick Links | **High — broken link** |
| `rca-template.md` orphaned (zero inbound links) | `docs/templates/` | Low |
| `copyright-headers.md` orphaned | `docs/contributing/` | Low |
| `task-reviewer.md` omitted from root nav | `docs/README.md` RPI section | Low |
| Templates section uses directory link | Won't work in Docusaurus | Medium |

## Prior Learnings

### PL-03: GitHub Pages Was Anticipated

The SHA pinning lookup table already includes `peaceiris/actions-gh-pages` entries, and `.nojekyll` is in the spell-check dictionary. Someone expected a Pages deployment would happen eventually.

### PL-07: Roadmap Plans Content, Not Infrastructure

The roadmap plans video tutorials, scenario guides, and learning paths — but says nothing about *where* they'll be published. A Docusaurus site would be the natural home for this planned content.

### PL-08: Don't Duplicate Azure Docs

The roadmap explicitly says: "Won't Do: Duplicate Azure documentation — link to authoritative sources instead." The Docusaurus site should follow this principle.

## Modification Considerations

### ✅ Safe to Add

- `docs/docusaurus/` — completely new directory, no existing files affected
- `.github/workflows/deploy-docs.yml` — new workflow, no conflicts with existing 25 workflows
- `.gitignore` additions — `docs/docusaurus/build/`, `docs/docusaurus/.docusaurus/`
- Root `package.json` — add `docs:dev`, `docs:build`, `docs:serve` scripts that delegate to subdirectory

### ⚠️ Modify with Caution

- **Existing markdown files** — if converting GitHub alerts or fixing escape links in-place, this affects GitHub rendering too
- **`docs/README.md`** — becomes both GitHub index AND Docusaurus landing content; changes must work in both contexts

### 🚫 Avoid

- Moving existing docs into `docs/docusaurus/docs/` — breaks all existing relative links, GitHub rendering, and instruction file references
- Installing Docusaurus at repo root — conflicts with existing `package.json` and its 283 dev dependencies
- Using `gh-pages` branch approach — outdated; use `actions/deploy-pages` directly

## External Research Opportunities

### Research Opportunity 1: remark-github-alerts Plugin

**Why Needed**: 35 GitHub alert occurrences need to render as Docusaurus admonitions without modifying source markdown
**Impact**: Determines whether source files need manual conversion or can stay GitHub-compatible

### Research Opportunity 2: Docusaurus External Link Rewrite Plugin

**Why Needed**: ~40 relative links escape `docs/` tree and need rewriting to GitHub URLs at build time
**Impact**: Determines migration complexity — plugin = zero manual changes; no plugin = 40+ manual edits

---

**Research Complete**: 2026-02-17
**Report Location**: `docs/plans/002-docusaurus-site/research-dossier.md`
