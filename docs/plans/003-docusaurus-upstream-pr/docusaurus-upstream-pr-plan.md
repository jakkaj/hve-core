# Docusaurus Upstream PR — Implementation Plan

**Mode**: Simple
**Plan Version**: 1.0.0
**Created**: 2026-02-19
**Spec**: [./docusaurus-upstream-pr-spec.md](./docusaurus-upstream-pr-spec.md)
**Status**: IN_PROGRESS

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Critical Research Findings](#critical-research-findings)
3. [Implementation (Single Phase)](#implementation-single-phase)
4. [Change Footnotes Ledger](#change-footnotes-ledger)

## Executive Summary

Extract a minimal Docusaurus 3 documentation site from the proven `jordo-explore` work into the clean `docs/docusaurus-site` branch (worktree at `../hve-core-docs-pr/`). The deliverable is a reviewable PR to `microsoft/hve-core` with scaffold, 2 sections of placeholder content, Microsoft Fluent CSS theming, deploy workflow, and instructions file. All work happens in the worktree — planning stays on `jordo-explore`.

## Critical Research Findings (Concise)

| # | Impact | Finding | Action |
|---|--------|---------|--------|
| 01 | Critical | Worktree at `../hve-core-docs-pr/` is based on `upstream/main` @ `11b93cb` — clean slate | All file operations target worktree, not current repo |
| 02 | Critical | `docusaurus.config.js` must use `microsoft.github.io` and `organizationName: 'microsoft'` | Set during scaffold, not copied from jordo-explore |
| 03 | Critical | Deploy workflow must trigger on `main` only — no `jordo-explore` test branch | Write fresh workflow, don't copy the test version |
| 04 | High | SHA pins verified 2026-02-18: checkout `de0fac2e`, setup-node `6044e13b`, configure-pages `983d7736`, upload-pages-artifact `56afc609`, deploy-pages `d6db9016` | Use these exact SHAs in workflow |
| 05 | High | `onBrokenLinks: 'throw'` means all internal links must resolve at build time | Keep placeholder pages self-contained with no cross-section links |
| 06 | High | No Microsoft Docusaurus theme package exists | Apply Fluent colors via `src/css/custom.css` (`#0078D4` primary, Segoe UI fonts) |
| 07 | High | Mermaid requires BOTH `markdown: { mermaid: true }` AND `themes: ['@docusaurus/theme-mermaid']` | Configure both in `docusaurus.config.js` |
| 08 | Medium | `baseUrl: '/hve-core/'` required for GitHub Pages asset resolution | Set in config |
| 09 | Medium | Blog must be disabled (`blog: false` in preset options) | Set in config |
| 10 | Medium | `persist-credentials: false` required on checkout per repo workflow conventions | Set in workflow |
| 11 | Medium | Path filter should include workflow self-reference `.github/workflows/deploy-docs.yml` | Include in paths array |
| 12 | Low | Default Docusaurus SVG images not needed — simple hero replaces feature cards | Can delete `static/img/undraw_*.svg` files |

## Implementation (Single Phase)

**Objective**: Create all files in the worktree (`../hve-core-docs-pr/`), verify build, make clean commits.

**Testing Approach**: Manual — `npm run build` + dev server verification
**Mock Usage**: N/A

### Tasks

| Status | ID | Task | CS | Type | Dependencies | Absolute Path(s) | Validation | Notes |
|--------|-----|------|----|------|--------------|------------------|------------|-------|
| [x] | T001 | Scaffold Docusaurus 3 in worktree: run `npx create-docusaurus@latest docusaurus classic --javascript --package-manager npm` in `../hve-core-docs-pr/docs/` | 2 | Setup | -- | `/Users/jordanknight/repos/hve-core-docs-pr/docs/docusaurus/` | `package.json` exists with docusaurus deps | Interactive `y` prompt expected |
| [x] | T002 | Install Mermaid theme: `npm install @docusaurus/theme-mermaid` in docusaurus dir | 1 | Setup | T001 | `/Users/jordanknight/repos/hve-core-docs-pr/docs/docusaurus/package.json` | Package in dependencies | |
| [x] | T003 | Configure `docusaurus.config.js`: set `url: 'https://jakkaj.github.io'` (test — change to microsoft before PR), `baseUrl: '/hve-core/'`, `organizationName: 'jakkaj'` (test — change to microsoft before PR), `projectName: 'hve-core'`, enable mermaid (both config + theme), `blog: false`, update title/tagline | 2 | Setup | T001 | `/Users/jordanknight/repos/hve-core-docs-pr/docs/docusaurus/docusaurus.config.js` | Config has all values correct, `npm start` works | |
| [x] | T004 | Apply Microsoft Fluent CSS: update `src/css/custom.css` with `--ifm-color-primary: #0078D4`, Segoe UI font stack, proper dark mode colors | 1 | Setup | T001 | `/Users/jordanknight/repos/hve-core-docs-pr/docs/docusaurus/src/css/custom.css` | Colors match Fluent palette in both light/dark | |
| [x] | T005 | Simplify landing page: replace default hero in `src/pages/index.js` with title + tagline + one "Get Started" button. Remove HomepageFeatures import. Remove default SVG images from `static/img/` | 1 | Setup | T003 | `/Users/jordanknight/repos/hve-core-docs-pr/docs/docusaurus/src/pages/index.js` | Landing shows simple hero, no feature cards | |
| [x] | T006 | Delete default blog and tutorial content: remove `blog/` dir, remove default `docs/` content | 1 | Setup | T001 | `/Users/jordanknight/repos/hve-core-docs-pr/docs/docusaurus/` | No blog dir, no tutorial files | |
| [x] | T007 | Create `docs/intro.md` with brief HVE description, Mermaid value loop diagram, and `:::caution` draft notice. Rename sidebar from `tutorialSidebar` to `docsSidebar` | 2 | Core | T006 | `/Users/jordanknight/repos/hve-core-docs-pr/docs/docusaurus/docs/intro.md`, `sidebars.js` | Page renders, Mermaid diagram works, draft notice visible | |
| [x] | T008 | Create Section 1 — `getting-started/`: `_category_.json` (position 1) + 2 placeholder pages (`overview.md` sidebar_position 1, `installation.md` sidebar_position 2) with lorem ipsum content | 1 | Core | T007 | `/Users/jordanknight/repos/hve-core-docs-pr/docs/docusaurus/docs/getting-started/` | Category appears in sidebar with 2 ordered pages | |
| [x] | T009 | Create Section 2 — `workflows/`: `_category_.json` (position 2) + 2 placeholder pages (`overview.md` sidebar_position 1, `rpi-workflow.md` sidebar_position 2) with lorem ipsum content | 1 | Core | T007 | `/Users/jordanknight/repos/hve-core-docs-pr/docs/docusaurus/docs/workflows/` | Category appears in sidebar with 2 ordered pages | |
| [x] | T010 | Copy `docusaurus-edits.instructions.md` from jordo-explore to worktree `.github/instructions/` | 1 | Core | -- | `/Users/jordanknight/repos/hve-core-docs-pr/.github/instructions/docusaurus-edits.instructions.md` | File exists with `applyTo: 'docs/docusaurus/**'` | Copy from jordo-explore, no edits needed |
| [x] | T011 | Create `.github/workflows/deploy-docs.yml` — fresh write with `main` AND `docs/docusaurus-site` branches (test branch for fork deployment, remove before upstream PR), SHA-pinned actions, path filter incl. self-reference, prerequisite comment, proper permissions. Use `jakkaj.github.io` and `organizationName: 'jakkaj'` initially for testing — switch to `microsoft` before final PR | 2 | Core | -- | `/Users/jordanknight/repos/hve-core-docs-pr/.github/workflows/deploy-docs.yml` | YAML valid, 5 SHA pins, deploys from test branch | Write from scratch per plan 002 validated pattern |
| [x] | T012 | Update `.gitignore` with `docs/docusaurus/build/` and `docs/docusaurus/.docusaurus/` entries | 1 | Setup | -- | `/Users/jordanknight/repos/hve-core-docs-pr/.gitignore` | Patterns present | Append to existing file |
| [x] | T013 | Update `justfile` with `docs-dev`, `docs-build`, `docs-serve` recipes | 1 | Setup | T001 | `/Users/jordanknight/repos/hve-core-docs-pr/justfile` | `just docs-build` works | |
| [x] | T014 | Build verification: `npm run build` in worktree docusaurus dir. Zero errors. Dev server check — all pages HTTP 200 | 1 | Validation | T001-T013 | `/Users/jordanknight/repos/hve-core-docs-pr/docs/docusaurus/` | Build succeeds, pages render | |
| [x] | T015 | Make clean commits: (1) scaffold + config + CSS, (2) content pages, (3) instructions file, (4) deploy workflow + gitignore + justfile. Push to origin. Verify deploy workflow triggers and site goes live at `jakkaj.github.io/hve-core/` | 1 | Delivery | T014 | `/Users/jordanknight/repos/hve-core-docs-pr/` | 4 clean commits, deployed, no plan files | Verify `git diff --stat` before each commit |
| [x] | T016 | Guide user through GitHub Pages environment settings if deploy job fails (Settings → Environments → github-pages → Deployment branches → allow `docs/docusaurus-site`) | 1 | Setup | T015 | N/A | Deploy job succeeds, site live | May need to add branch to environment allowed list |
| [ ] | T017 | Pre-PR cleanup (do NOT execute until ready for upstream): change `url` to `microsoft.github.io`, `organizationName` to `microsoft`, remove `docs/docusaurus-site` from workflow branches, squash or tidy commits | 1 | Delivery | T016 | `/Users/jordanknight/repos/hve-core-docs-pr/` | Config + workflow ready for microsoft/hve-core PR | Execute only when user says "ready for PR" |

### Acceptance Criteria

- [ ] `cd docs/docusaurus && npm install && npm start` opens local dev server with navigation
- [ ] Sidebar shows 2 sections with 2 placeholder pages each
- [ ] At least one page has a working Mermaid diagram
- [ ] `docusaurus-edits.instructions.md` exists with correct `applyTo`
- [ ] `deploy-docs.yml` exists with SHA pins and `main` branch only
- [ ] `.gitignore` has docusaurus build/cache patterns
- [ ] `npm run build` completes with zero errors
- [ ] PR contains zero files from `docs/plans/`
- [ ] Config has `organizationName: 'microsoft'` and `url: 'https://microsoft.github.io'`
- [ ] Commit history is 3-5 clean logical commits

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Pages not enabled on upstream repo | High | Blocking deploy | Build works regardless; document enablement as admin step |
| SHA pins stale by PR review time | Low | Low | `Test-SHAStaleness.ps1` catches in CI |
| `create-docusaurus` version changes | Low | Low | Pin to `@latest`, scaffold is simple |
| Upstream main changes during work | Low | Low | Worktree based on fresh `upstream/main`; rebase if needed |

## Change Footnotes Ledger

[^1]: [To be added during implementation via plan-6a]

---

**Next steps:**
- **Ready to implement**: `/plan-6-implement-phase --plan "/Users/jordanknight/repos/hve-core/docs/plans/003-docusaurus-upstream-pr/docusaurus-upstream-pr-plan.md"`
- **Optional validation**: `/plan-4-complete-the-plan` (recommended but optional for CS-2)
