---
title: Docusaurus Documentation Site — Implementation Plan
description: Implementation plan for creating a Docusaurus 3 documentation site for HVE-Core
---

# Docusaurus Documentation Site — Implementation Plan

**Plan Version**: 2.0.0
**Created**: 2026-02-17
**Updated**: 2026-02-18
**Spec**: [./docusaurus-site-spec.md](./docusaurus-site-spec.md)
**Research**: [./research-dossier.md](./research-dossier.md)
**Workshops**: [./workshops/](./workshops/) (5 workshop documents, 4,311 lines)
**Status**: DRAFT

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Technical Context](#technical-context)
3. [Critical Research Findings](#critical-research-findings)
4. [Testing Philosophy](#testing-philosophy)
5. [Phase 1: Scaffold Docusaurus Project](#phase-1-scaffold-docusaurus-project)
6. [Phase 2: Content — Getting Started & Instructions File](#phase-2-content--getting-started--instructions-file)
7. [Phase 2B: Content — Shape the Work](#phase-2b-content--shape-the-work)
8. [Phase 2C: Content — Build the Work](#phase-2c-content--build-the-work)
9. [Phase 2D: Content — Ship It & Reference](#phase-2d-content--ship-it--reference)
10. [Phase 3: GitHub Actions Deploy Workflow](#phase-3-github-actions-deploy-workflow)
11. [Phase 4: Integration and Validation](#phase-4-integration-and-validation)
12. [Cross-Cutting Concerns](#cross-cutting-concerns)
13. [Complexity Tracking](#complexity-tracking)
14. [Progress Tracking](#progress-tracking)
15. [Change Footnotes Ledger](#change-footnotes-ledger)

## Executive Summary

Create a Docusaurus 3 documentation site at `docs/docusaurus/` that serves as both a user guide and an educational resource for Hyper Velocity Engineering. The site teaches the full Software Value Delivery lifecycle (DORA, SPACE, ESSP frameworks) and shows where HVE-Core tooling fits within each phase — honestly, including gaps.

The site is organized into four delivery-aligned segments: **Shape the Work** (requirements, backlog), **Build the Work** (RPI flow, coding), **Ship It** (deployment, feedback loops), plus **Getting Started** (concepts, architecture, onboarding). A **Reference** section provides the artifact catalog and schemas.

Per workshop findings: 23 of 70+ artifacts are tagged 🟢 Core and featured prominently. 41 are 🟡 Supporting (mentioned in context). 8 are ⚪ Meta (excluded from narrative). 1 is 🔴 Cleanup (deprecated).

The implementation delivers in 5 phases: scaffold (Phase 1), getting-started content (Phase 2A), segment content skeletons (Phases 2B-2D), deploy workflow (Phase 3), integration validation (Phase 4).

## Technical Context

**Current state**: No static site generator exists. 25 GitHub Actions workflows run CI/CD but none deploy docs. Node.js 20 is the runtime. Root `package.json` has 4 devDependencies (all linting tools). `.gitignore` has `node_modules/` globally.

**Integration requirements**: The Docusaurus project lives at `docs/docusaurus/` with its own `package.json`, completely isolated from root. Root `package.json` gets convenience scripts that delegate. The deploy workflow triggers only on `docs/docusaurus/**` changes to avoid interfering with the main CI pipeline.

**Constraints**:
* SHA-pinned actions per `workflows.instructions.md`. Known existing pins: `actions/checkout@de0fac2e4500dabe0009e67214ff5f5447ce83dd # v4.2.2`, `actions/setup-node@6044e13b5dc448c55e2357c09f80417699197238 # v4.1.0`
* Pages actions (`actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`) have **no existing pins in the repo** — SHAs must be looked up fresh from GitHub during Phase 3 Task 3.1. Use `scripts/security/Update-ActionSHAPinning.ps1` as the canonical SHA source. Do **NOT** copy SHAs from the research dossier sample workflow — they are illustrative only and may be incorrect
* `baseUrl: '/hve-core/'` required for GitHub Pages asset resolution
* `ubuntu-latest` runners per workflow conventions
* `permissions` must be declared explicitly; `pages: write` and `id-token: write` at job level, not workflow level

## Critical Research Findings

Per research dossier findings:

| # | Impact | Finding | Action |
|---|---|---|---|
| 01 | Critical | `baseUrl` must be `/hve-core/` for GH Pages asset resolution | Set in `docusaurus.config.js` |
| 02 | Critical | Deploy uses `actions/deploy-pages` (not `gh-pages` branch) | Use modern Pages deployment workflow |
| 03 | High | Mermaid requires `@docusaurus/theme-mermaid` plugin | Add as dependency, enable in config |
| 04 | High | SHA pinning required on all workflow actions | Use existing repo SHA pins where available |
| 05 | High | `docs/docusaurus/build/` and `.docusaurus/` must be gitignored | Add to root `.gitignore` |
| 06 | High | Docusaurus uses `:::note` admonitions, not `> [!NOTE]` GitHub alerts | Document in instructions file |
| 07 | Medium | `sidebar_position` frontmatter controls page order within categories | Demonstrate in sample pages |
| 08 | Medium | `_category_.json` controls category order and label | Create per content directory |
| 09 | Medium | Docusaurus internal links omit `.md` extension by convention | Document in instructions file |
| 10 | Low | `save-exact=true` in `.npmrc` pins Docusaurus deps to exact versions | Good for reproducibility, no action needed |

## Testing Philosophy

**Selected Approach**: Manual validation

This is a documentation site scaffold — no application logic to unit test. Validation is:
* `npm run build` succeeds (Docusaurus build catches broken links, missing frontmatter)
* Local dev server renders pages correctly
* GitHub Pages deployment serves the site
* Mermaid diagrams render
* Sidebar ordering matches `sidebar_position` values

## Phase 1: Scaffold Docusaurus Project

**Objective**: Create the Docusaurus 3 project at `docs/docusaurus/` with a working local dev server.

**Deliverables**:
* Docusaurus project scaffolded via `npx create-docusaurus`
* `docusaurus.config.js` configured for `jakkaj.github.io/hve-core/`
* Mermaid theme plugin installed and enabled
* Blog disabled
* Default landing page intact (hero component)
* `.gitignore` updated

**Dependencies**: Node.js 20, npm

**Risks**:

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| `create-docusaurus` hangs on slow network | Low | Low | Can scaffold manually if needed |
| Mermaid plugin version incompatible | Low | Medium | Pin to known-good version |

### Tasks

| # | Status | Task | CS | Success Criteria | Log | Notes |
|---|---|---|---|---|---|---|
| 1.1 | [x] | Run `npx create-docusaurus@latest docusaurus classic --javascript --package-manager npm` in `docs/` | 1 | `docs/docusaurus/` directory exists with `package.json` | - | `--package-manager npm` avoids interactive prompt |
| 1.2 | [x] | Install Mermaid theme: `npm install @docusaurus/theme-mermaid` in `docs/docusaurus/` | 1 | Package in `dependencies` | - | |
| 1.3 | [x] | Configure `docusaurus.config.js`: set `url: 'https://jakkaj.github.io'`, `baseUrl: '/hve-core/'`, `organizationName: 'jakkaj'`, `projectName: 'hve-core'`, set `markdown: { mermaid: true }`, add `'@docusaurus/theme-mermaid'` to `themes` array, set `blog: false` inside `@docusaurus/preset-classic` options | 2 | Config has all 4 URL values, `markdown.mermaid: true` AND `themes: ['@docusaurus/theme-mermaid']`, blog disabled in preset options | - | |
| 1.4 | [x] | Remove default blog content (`docs/docusaurus/blog/`) | 1 | Directory removed | - | |
| 1.5 | [x] | Remove default docs content (`docs/docusaurus/docs/`) except create a minimal `docs/intro.md` placeholder with title and one-line description so the build succeeds between phases | 1 | Default tutorial pages removed; `docs/intro.md` exists with valid frontmatter | - | Prevents build failure before Phase 2 |
| 1.6 | [x] | Add `docs/docusaurus/build/` and `docs/docusaurus/.docusaurus/` to root `.gitignore` | 1 | Patterns present in `.gitignore` | - | |
| 1.7 | [x] | Verify `npm start` launches dev server at `localhost:3000/hve-core/` | 1 | Landing page renders with hero component | - | |
| 1.8 | [x] | Verify `npm run build` in `docs/docusaurus/` completes with zero errors | 1 | Build succeeds, `build/` directory created | - | Early build gate |
| 1.9 | [x] | Create `justfile` at project root with `docs-dev`, `docs-build`, `docs-serve` recipes that delegate to `docs/docusaurus/` | 1 | `just docs-dev` launches dev server, `just docs-build` runs production build | - | |

### Acceptance Criteria

* [x] `docs/docusaurus/package.json` exists with `@docusaurus/core` and `@docusaurus/theme-mermaid`
* [x] `npm start` in `docs/docusaurus/` shows default landing page
* [x] Blog section is not present
* [x] `.gitignore` excludes build artifacts

---

## Phase 2: Content — Getting Started & Instructions File

**Workshop**: [./workshops/overview-section.md](./workshops/overview-section.md)

**Objective**: Create the educational foundation: HVE concepts, value delivery loop, architecture explainer, role-based quick start, and the Copilot instructions file.

**Deliverables**:
* `getting-started/` category with 4 pages (position: 1)
* `_category_.json` for ordering
* Mermaid diagram on "How HVE-Core Works" page
* Admonitions demo across multiple pages
* `.github/instructions/docusaurus-edits.instructions.md`

**Dependencies**: Phase 1 complete

**Risks**:

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Educational content scope creep | Medium | Medium | Keep pages to skeleton + 2-3 paragraphs of sample content per section. Full content is a later phase |
| DORA/SPACE/ESSP framing too academic | Low | Medium | Lead with practical "why this matters to you" before frameworks |

### Tasks

| # | Status | Task | CS | Success Criteria | Log | Notes |
|---|---|---|---|---|---|---|
| 2.1 | [x] | Create `docs/docusaurus/docs/intro.md` — "What is Hyper Velocity Engineering?" with `sidebar_position: 1`. Include value delivery loop mermaid diagram, "where value leaks" framing, DORA/SPACE/ESSP summary, coverage heatmap | 2 | Page renders first in sidebar, mermaid renders, educational framing present | - | Hero concept page |
| 2.2 | [x] | Create `getting-started/` category: `_category_.json` (position: 1, label: "Getting Started") | 1 | Category appears first in sidebar | - | |
| 2.3 | [x] | Create `getting-started/value-delivery-loop.md` (sidebar_position: 1) — deep-dive on the 6 phases with per-phase: what happens, who's involved, what can go wrong, which DORA/SPACE metrics apply | 2 | Page renders with structured phase sections | - | Reference page |
| 2.4 | [x] | Create `getting-started/how-it-works.md` (sidebar_position: 2) — 4-layer architecture (Prompts→Agents→Instructions→Skills), applyTo mechanism, handoff buttons, /clear boundaries, .copilot-tracking artifact bus. Include mermaid architecture diagram | 2 | Page renders with architecture diagram, applyTo explanation clear | - | |
| 2.5 | [x] | Create `getting-started/quick-start.md` (sidebar_position: 3) — role-based decision tree: Product/Planning → Shape, Engineering → Build, Platform/Ops → Ship. Per-role: top 3 artifacts, 5-minute "try it now" prompt | 2 | Page renders with decision tree, per-role tables | - | |
| 2.6 | [x] | Create `getting-started/installation.md` (sidebar_position: 4) — Extension install + post-install setup | 1 | Page covers install steps | - | |
| 2.7 | [x] | Add admonitions (:::note, :::tip, :::warning) to at least 2 pages | 1 | Admonitions render with colored boxes | - | |
| 2.8 | [x] | Add internal links between getting-started pages (without `.md` extension) | 1 | Links navigate correctly | - | |
| 2.9 | [x] | Verify `sidebars.js` uses autogenerated config (`{ type: 'autogenerated', dirName: '.' }`). Modify default if needed | 1 | Sidebar matches `_category_.json` and `sidebar_position` ordering | - | |
| 2.10 | [x] | Create `.github/instructions/docusaurus-edits.instructions.md` with `applyTo: 'docs/docusaurus/**'` | 2 | File exists, covers all 11 conventions from Instructions File Content Requirements | - | |

### Instructions File Content Requirements

The `docusaurus-edits.instructions.md` must cover:

* **Frontmatter**: Every page requires `title`, `description`, `sidebar_position`. Optional: `sidebar_label`, `keywords`, `tags`
* **Admonitions**: Use `:::note`, `:::tip`, `:::info`, `:::warning`, `:::danger` — never `> [!NOTE]` GitHub alerts
* **Links**: Internal links use relative paths without `.md` extension (e.g., `[text](../build-the-work/rpi-workflow)` not `[text](../build-the-work/rpi-workflow.md)`)
* **Mermaid**: Use fenced ` ```mermaid ` code blocks. Use `<br>` for line breaks in nodes (not `\n`)
* **Categories**: New directories need a `_category_.json` with `label`, `position`, `collapsible`
* **Images**: Place in `docs/docusaurus/static/img/` and reference as `/img/filename.png`
* **Code blocks**: Always specify language (e.g., ` ```yaml `, ` ```javascript `)
* **Ordering**: Use sequential `sidebar_position` values (1, 2, 3...) within each category
* **Structure**: Follow the segment hierarchy (getting-started, shape-the-work, build-the-work, ship-it, reference). Discuss new top-level segments before creating
* **Educational tone**: Lead with "why this matters" before "how to use the tool". Reference DORA/SPACE/ESSP frameworks where relevant
* **Value tags**: When mentioning artifacts, note whether they are 🟢 Core, 🟡 Supporting, or ⚪ Meta per the value assessment in workshops/value-delivery-segments.md

### Acceptance Criteria

* [x] `getting-started/` category visible in sidebar with 4 ordered pages
* [x] Mermaid diagram (value delivery loop) renders on intro page
* [x] Architecture diagram renders on how-it-works page
* [x] Admonitions render with styling on at least 2 pages
* [x] Internal links navigate between pages
* [x] Instructions file has `applyTo: 'docs/docusaurus/**'`
* [x] Instructions file covers all 11 conventions listed above

---

## Phase 2B: Content — Shape the Work

**Workshop**: [./workshops/shape-the-work-section.md](./workshops/shape-the-work-section.md)

**Objective**: Create the "Shape the Work" segment covering requirements, backlog management, and ADO integration.

**Deliverables**:
* `shape-the-work/` category with 4 pages (position: 2)

**Dependencies**: Phase 2 complete (getting-started exists for cross-linking)

### Tasks

| # | Status | Task | CS | Success Criteria | Log | Notes |
|---|---|---|---|---|---|---|
| 2B.1 | [x] | Create `shape-the-work/` category: `_category_.json` (position: 2, label: "Shape the Work") | 1 | Category appears second in sidebar | - | |
| 2B.2 | [x] | Create `shape-the-work/overview.md` (sidebar_position: 1) — Why shaping prevents building the wrong thing. DORA insight: lead time starts at backlog. Mermaid: shaping workflow from PRD → Backlog → Sprint Plan | 2 | Page renders with mermaid workflow diagram | - | |
| 2B.3 | [x] | Create `shape-the-work/requirements-architecture.md` (sidebar_position: 2) — PRD/BRD/ADR/Security Plan builders. Decision matrix: when to use which. Artifact chain diagram | 2 | Decision matrix present, links to Build the Work | - | |
| 2B.4 | [x] | Create `shape-the-work/backlog-management.md` (sidebar_position: 3) — GitHub Backlog Manager flow: Discover→Triage→Sprint→Execute. 3-tier autonomy model. Handoff file contract. Mermaid: 4-workflow pipeline | 2 | Pipeline diagram renders, autonomy tiers explained | - | Crown jewel of this segment |
| 2B.5 | [x] | Create `shape-the-work/ado-integration.md` (sidebar_position: 4) — ADO parallel flow. When to use ADO vs GitHub | 1 | ADO flow documented, cross-platform comparison present | - | |

### Acceptance Criteria

* [x] `shape-the-work/` category visible with 4 ordered pages
* [x] Mermaid diagrams render on overview and backlog-management pages
* [x] Cross-links to getting-started sections work (build-the-work deferred to Phase 2C/4)

---

## Phase 2C: Content — Build the Work

**Workshop**: [./workshops/build-the-work-section.md](./workshops/build-the-work-section.md)

**Objective**: Create the "Build the Work" segment — the deepest section featuring the RPI flow.

**Deliverables**:
* `build-the-work/` category with 6 pages (position: 3)

**Dependencies**: Phase 2 complete (getting-started exists for cross-linking)

### Tasks

| # | Status | Task | CS | Success Criteria | Log | Notes |
|---|---|---|---|---|---|---|
| 2C.1 | [ ] | Create `build-the-work/` category: `_category_.json` (position: 3, label: "Build the Work") | 1 | Category appears third in sidebar | - | |
| 2C.2 | [ ] | Create `build-the-work/overview.md` (sidebar_position: 1) — Cognitive separation insight. SPACE connection: constrained phases optimize Communication + Efficiency dimensions | 2 | Educational framing present, links to RPI page | - | |
| 2C.3 | [ ] | Create `build-the-work/rpi-workflow.md` (sidebar_position: 2) — 5-phase loop diagram, strict vs autonomous modes, artifact data bus, handoff button chain, decision guide. Multiple mermaid diagrams | 3 | Full RPI flow documented with diagrams, both modes explained | - | **Crown jewel of entire site** |
| 2C.4 | [ ] | Create `build-the-work/rpi-in-practice.md` (sidebar_position: 3) — Complete walkthrough with actual prompts, artifacts produced per phase, /clear in action, iteration loop example | 2 | Walkthrough complete with code blocks showing prompts | - | |
| 2C.5 | [ ] | Create `build-the-work/code-review-prs.md` (sidebar_position: 4) — PR generation, pr-review agent, git operations, ADO PR linking | 2 | Git workflow documented, links to relevant prompts | - | |
| 2C.6 | [ ] | Create `build-the-work/coding-standards.md` (sidebar_position: 5) — applyTo mechanism, invisible guardrails, available standards list, how to add custom standards, the plan .instructions.md trick | 2 | applyTo explained clearly, language list present | - | |
| 2C.7 | [ ] | Create `build-the-work/data-science.md` (sidebar_position: 6) — Implicit pipeline: gen-data-spec → notebook → dashboard → test. Why no orchestrator (and that's okay) | 1 | Pipeline documented, honest about implicit nature | - | |

### Acceptance Criteria

* [ ] `build-the-work/` category visible with 6 ordered pages
* [ ] RPI flow page has multiple mermaid diagrams rendering correctly
* [ ] RPI in practice page has code blocks with example prompts
* [ ] Cross-links between all pages work

---

## Phase 2D: Content — Ship It & Reference

**Workshop**: [./workshops/ship-it-and-reference-sections.md](./workshops/ship-it-and-reference-sections.md)

**Objective**: Create the "Ship It" segment (honest about gaps) and the "Reference" catalog section.

**Deliverables**:
* `ship-it/` category with 4 pages (position: 4)
* `reference/` category with 4 pages (position: 5)

**Dependencies**: Phase 2 complete (getting-started exists for cross-linking)

### Tasks

| # | Status | Task | CS | Success Criteria | Log | Notes |
|---|---|---|---|---|---|---|
| 2D.1 | [ ] | Create `ship-it/` category: `_category_.json` (position: 4, label: "Ship It") | 1 | Category appears fourth | - | |
| 2D.2 | [ ] | Create `ship-it/overview.md` (sidebar_position: 1) — Why closing the loop matters. DORA: CFR + MTTR. ESSP Quality zone. Honest coverage assessment | 2 | Educational framing present, honest about gaps | - | |
| 2D.3 | [ ] | Create `ship-it/incident-response.md` (sidebar_position: 2) — incident-response + risk-register prompts. How learnings feed back to Shape the Work | 1 | Prompts documented, feedback loop to Shape explained | - | |
| 2D.4 | [ ] | Create `ship-it/infrastructure-as-code.md` (sidebar_position: 3) — Bicep + Terraform instruction files. "Writes IaC ≠ deploys IaC" distinction | 1 | Distinction clear, links to coding standards | - | |
| 2D.5 | [ ] | Create `ship-it/whats-coming.md` (sidebar_position: 4) — Honest roadmap, aspirational diagram, contribution call-to-action | 1 | Roadmap present, contribution path clear | - | |
| 2D.6 | [ ] | Create `reference/` category: `_category_.json` (position: 5, label: "Reference") | 1 | Category appears fifth | - | |
| 2D.7 | [ ] | Create `reference/artifact-types.md` (sidebar_position: 1) — 4-layer model: Agents, Prompts, Instructions, Skills. Per-type: what it does, how activated, frontmatter contract | 2 | All 4 types documented with examples | - | |
| 2D.8 | [ ] | Create `reference/frontmatter-schema.md` (sidebar_position: 2) — Complete schema tables for all 3 file types + platform support matrix (VS Code, CLI, Coding Agent, Claude Code) | 2 | Tables render correctly, platform matrix present | - | |
| 2D.9 | [ ] | Create `reference/contributing-to-docs.md` (sidebar_position: 3) — How to write new Docusaurus pages, conventions from instructions file, how to add categories | 1 | Contribution workflow clear | - | |
| 2D.10 | [ ] | Create `reference/all-artifacts.md` (sidebar_position: 4) — Complete catalog of all 70+ artifacts with name, type, description, segment, value tag (🟢/🟡/⚪/🔴) | 2 | Catalog complete, value tags present | - | |

### Acceptance Criteria

* [ ] `ship-it/` category visible with 4 ordered pages
* [ ] `reference/` category visible with 4 ordered pages
* [ ] Ship It acknowledges gaps honestly with "What's Coming" page
* [ ] Reference catalog covers all artifacts with value tags
* [ ] Cross-links to other segments work

---

## Phase 3: GitHub Actions Deploy Workflow

**Objective**: Create a workflow that builds and deploys the Docusaurus site to GitHub Pages on push to main.

**Deliverables**:
* `.github/workflows/deploy-docs.yml`
* SHA-pinned actions per repo conventions
* Path-filtered trigger (`docs/docusaurus/**`)
* Proper permissions and concurrency

**Dependencies**: Phase 1 complete (Docusaurus builds). GitHub Pages enabled in repo settings.

**Risks**:

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Pages not enabled in repo settings | High | Blocking | Manual step documented; workflow will fail gracefully |
| SHA pins for Pages actions not in existing lookup | Medium | Low | Look up correct SHAs before writing |

### Tasks

| # | Status | Task | CS | Success Criteria | Log | Notes |
|---|---|---|---|---|---|---|
| 3.1 | [ ] | Look up SHA pins for `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages` | 1 | Correct SHAs identified with version comments | - | |
| 3.2 | [ ] | Create `.github/workflows/deploy-docs.yml` with build + deploy jobs | 2 | Workflow uses SHA-pinned actions, `ubuntu-latest`, explicit permissions, path filter, concurrency group | - | |
| 3.3 | [ ] | Add `workflow_dispatch` trigger for manual deployment | 1 | Can trigger manually from Actions tab | - | |

### Workflow Requirements

* **Trigger**: `push` to `main` on `paths: ['docs/docusaurus/**']` + `workflow_dispatch`
* **Workflow-level permissions**: `contents: read` (default)
* **Build job permissions**: `contents: read` only
* **Deploy job permissions**: `pages: write`, `id-token: write` (job-level grants)
* **Concurrency**: `group: ${{ github.workflow }}-${{ github.ref }}`, `cancel-in-progress: false`
* **Build job**: `working-directory: docs/docusaurus`, Node 20, `npm ci`, `npm run build`
* **Build job**: `actions/upload-pages-artifact` with `path: docs/docusaurus/build`
* **Deploy job**: `needs: build`, `actions/deploy-pages`, `environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }`
* **Credentials**: `persist-credentials: false` on checkout

### Acceptance Criteria

* [ ] Workflow file exists at `.github/workflows/deploy-docs.yml`
* [ ] All actions are SHA-pinned with version comments
* [ ] Workflow triggers only on `docs/docusaurus/**` changes + manual dispatch
* [ ] Build job runs in `docs/docusaurus/` working directory
* [ ] Deploy job uses `github-pages` environment

---

## Phase 4: Integration and Validation

**Objective**: Wire everything together: root npm scripts, build verification, and end-to-end validation.

**Deliverables**:
* Root `package.json` npm scripts for docs
* Successful local build
* Successful local serve

**Dependencies**: Phases 1-3 complete

**Risks**:

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| markdownlint runs on Docusaurus content and fails | Medium | Low | Check if `docs/docusaurus/docs/**` is covered by existing lint glob |

### Tasks

| # | Status | Task | CS | Success Criteria | Log | Notes |
|---|---|---|---|---|---|---|
| 4.1 | [ ] | Add `docs:dev`, `docs:build`, `docs:serve` scripts to root `package.json` | 1 | Scripts delegate to `docs/docusaurus/` | - | Use `--prefix docs/docusaurus` |
| 4.2 | [ ] | Run `npm run docs:build` from root — verify clean build | 1 | Build completes with zero errors | - | |
| 4.3 | [ ] | Run `npm run docs:serve` — verify built site serves correctly | 1 | All pages, links, Mermaid, admonitions render | - | |
| 4.4 | [ ] | Resolve markdownlint interaction: run `npm run lint:md` from root. If Docusaurus `:::` admonition syntax causes failures, add `docs/docusaurus/docs/` to `.markdownlint-cli2.jsonc` ignorePatterns. Also verify `npm run format:tables` doesn't mangle Docusaurus frontmatter | 1 | `npm run lint:md` passes or Docusaurus content excluded | - | |
| 4.5 | [ ] | Resolve frontmatter schema interaction: add `docs/docusaurus/**/*.md` pattern to `scripts/linting/schemas/schema-mapping.json` BEFORE the `docs/**/*.md` pattern, pointing to a new `docusaurus-frontmatter.schema.json` that allows `sidebar_position`, `sidebar_label`, `tags`, `keywords` alongside `title` and `description`. Run `npm run lint:frontmatter` to verify | 1 | Frontmatter validation passes on Docusaurus content | - | |
| 4.6 | [ ] | Add Docusaurus terms to `.cspell/general-technical.txt`: `docusaurus`, `admonitions`, `admonition`, `mermaid` | 1 | `npm run spell-check` passes on Docusaurus content | - | |
| 4.7 | [ ] | Commit all changes, push, verify workflow triggers (if Pages enabled) | 1 | Workflow runs, site deploys to `jakkaj.github.io/hve-core/` | - | Requires manual Pages enablement first |

### Acceptance Criteria

* [ ] `npm run docs:dev` from root opens dev server
* [ ] `npm run docs:build` from root builds without errors
* [ ] All 10 acceptance criteria from spec pass

---

## Cross-Cutting Concerns

### Linting Interaction

The root `lint:md` script runs `markdownlint-cli2 "**/*.md"` which will pick up Docusaurus content. The Docusaurus sample pages should pass markdownlint, but if conflicts arise (e.g., admonition `:::` syntax), add `docs/docusaurus/docs/` to `.markdownlint-cli2.jsonc` ignore list or add inline disable comments.

### Frontmatter Validation

The existing `lint:frontmatter` script validates against schemas in `scripts/linting/schemas/`. Docusaurus pages use different frontmatter fields (`sidebar_position`, `sidebar_label`) not in existing schemas. Check if `schema-mapping.json` patterns match `docs/docusaurus/**` — if so, add a `docusaurus-frontmatter.schema.json` or exclude the path.

### Spell Check

cspell runs on `**/*.md`. Docusaurus-specific terms (`sidebar_position`, `docusaurus`, `admonitions`) may need adding to `.cspell/general-technical.txt`.

### Commit Conventions

Expected commit types/scopes per phase:

* Phase 1 → `feat(docs): scaffold Docusaurus project`
* Phase 2 → `feat(docs): add getting-started content` + `feat(instructions): add docusaurus-edits instructions`
* Phase 2B → `feat(docs): add shape-the-work content`
* Phase 2C → `feat(docs): add build-the-work content`
* Phase 2D → `feat(docs): add ship-it and reference content`
* Phase 3 → `feat(workflows): add docs deployment workflow`
* Phase 4 → `chore(build): add docs npm scripts` + `chore(settings): update gitignore and lint config`

### Content Authoring Principles

These principles apply across Phases 2, 2B, 2C, and 2D:

* **Adapt workshops, don't start from scratch**: The 5 workshop documents in `workshops/` contain diagrams, value assessments, and educational framing that are first drafts of site content. Phase 2 tasks should adapt this material into Docusaurus pages rather than writing fresh.
* **Honest gaps as a feature**: When a section has thin tooling coverage, include a "What's Coming" callout with roadmap and contribution path. Apply this consistently across all sections, not just Ship It. The "7 of 9 agent groups have Planned documentation" finding is an opportunity, not an embarrassment.
* **Self-referential proof**: Include a "How We Built This Site" callout in the RPI section showing that RPI was used to plan and build the documentation itself. The research dossier = task-researcher output, workshops = task-planner output, site = task-implementor output, plan-4 validation = task-reviewer output.
* **Elevate `applyTo:` early**: The "How It Works" page in Getting Started should feature the `applyTo:` auto-injection pattern as the "you're already getting value" moment, not bury it in Build the Work > Coding Standards.

## Complexity Tracking

| Component | CS | Label | Breakdown (S,I,D,N,F,T) | Justification |
|---|---|---|---|---|
| Overall plan | 3 | Medium | S=1,I=2,D=0,N=0,F=0,T=0 | Scaffold + 22 content pages across 5 segments + workflow + validation |

## Progress Tracking

### Phase Completion Checklist

* [x] Phase 1: Scaffold Docusaurus Project
* [x] Phase 2: Content — Getting Started & Instructions File
* [x] Phase 2B: Content — Shape the Work
* [ ] Phase 2C: Content — Build the Work
* [ ] Phase 2D: Content — Ship It & Reference
* [ ] Phase 3: GitHub Actions Deploy Workflow
* [ ] Phase 4: Integration and Validation

### STOP Rule

This plan must be validated before creating tasks. After reviewing this plan:

1. Run `/plan-4-complete-the-plan` to validate readiness
2. Only proceed to `/plan-5-phase-tasks-and-brief` after validation passes

## Change Footnotes Ledger

[^1]: Phase 1 implemented 2026-02-18. All 9 tasks complete. Docusaurus 3.9.2 scaffolded at docs/docusaurus/ with Mermaid theme, blog disabled, baseUrl /hve-core/. Justfile created. Dev server and build verified.
[^2]: Phase 2 implemented 2026-02-18. 10 tasks complete (T007 removed per DYK). 5 content pages + 1 instructions file + sidebar rename. Build verified zero errors, all pages HTTP 200.
[^3]: Phase 2B implemented 2026-02-18. 7 tasks complete. 4 content pages (shape-the-work/) + category config + cross-links to Getting Started + instructions file conventions update. Build verified zero errors.
