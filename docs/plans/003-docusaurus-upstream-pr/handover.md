# Handover

Plan: `/Users/jordanknight/repos/hve-core/docs/plans/003-docusaurus-upstream-pr/docusaurus-upstream-pr-plan.md` • Phase: Single (Simple Mode) • Feature: `docusaurus-upstream-pr` • Progress: 16/17 (T017 deferred) • Generated: 2026-02-19T06:46:00Z

## 1) Primary Intent

- Summary: Build minimal Docusaurus 3 site on clean branch for upstream PR to microsoft/hve-core
- Quotes: "take this work on to a new branch and repeat it"; "just placeholders for a few main pages"
- Scope: IN — scaffold, 2 sections placeholder content, Fluent CSS, deploy workflow, instructions file. OUT — full 24-page content, real documentation, Microsoft theme package (none exists)

## 2) Timeline (Most Recent First)

- Just completed: T016 — deploy verified live at https://jakkaj.github.io/hve-core/
- Current focus: Handover generation after successful implementation of T001-T016
- Recent actions:
  - Committed plan 003 artifacts to jordo-explore (`22e2953`) and pushed
  - 4 clean commits on `docs/docusaurus-site` branch, pushed, deploy workflow succeeded
  - User added `docs/docusaurus-site` to github-pages environment allowed branches
  - Built and verified all 6 pages HTTP 200 via dev server

## 3) Key Technical Concepts (≤6)

- **Git worktree** — clean branch from upstream/main, work isolated from jordo-explore
- **Plan here, work there** — planning on jordo-explore, implementation in worktree at `../hve-core-docs-pr/`
- **SHA-pinned actions** — 5 actions pinned per repo security conventions
- **Fluent CSS** — `#0078D4` primary, Segoe UI, no MS theme package exists
- **onBrokenLinks: 'throw'** — build fails on broken links, placeholder pages kept self-contained
- **Test-then-swap** — `jakkaj` URLs for testing, T017 swaps to `microsoft` before PR

## 4) Code Touchpoints

- Files:
  - `/Users/jordanknight/repos/hve-core-docs-pr/docs/docusaurus/docusaurus.config.js`
  - `/Users/jordanknight/repos/hve-core-docs-pr/docs/docusaurus/src/css/custom.css`
  - `/Users/jordanknight/repos/hve-core-docs-pr/docs/docusaurus/src/pages/index.js`
  - `/Users/jordanknight/repos/hve-core-docs-pr/docs/docusaurus/sidebars.js`
  - `/Users/jordanknight/repos/hve-core-docs-pr/docs/docusaurus/docs/intro.md`
  - `/Users/jordanknight/repos/hve-core-docs-pr/.github/workflows/deploy-docs.yml`
  - `/Users/jordanknight/repos/hve-core-docs-pr/.github/instructions/docusaurus-edits.instructions.md`
  - `/Users/jordanknight/repos/hve-core-docs-pr/justfile`

## 5) Decisions & ADRs

- No ADRs for this plan
- DEC-urls — jakkaj URLs for testing; T017 swaps to microsoft before PR
- DEC-test-branch — `docs/docusaurus-site` in workflow branches for fork deploy testing
- DEC-no-theme — No Microsoft Docusaurus theme exists; custom CSS with Fluent colors instead
- DEC-sidebar — Renamed `tutorialSidebar` → `docsSidebar`
- DEC-blog — Blog disabled (`blog: false`)
- DEC-mermaid — Both `markdown.mermaid: true` AND `themes: ['@docusaurus/theme-mermaid']` required

## 6) Tasks Snapshot

- Done: T001, T002, T003, T004, T005, T006, T007, T008, T009, T010, T011, T012, T013, T014, T015, T016
- In-Progress: none
- Pending: T017 (deferred until user says "ready for PR")
- Blocked: none
- Critical deps: T017 ← user signal

## 7) Tests

- Unit: N/A • Integration: N/A • Coverage: N/A
- Notes: Manual testing — `npm run build` zero errors, dev server 6 pages HTTP 200, deploy workflow ✅

## 8) Risks (≤5)

- SHA pins may go stale by PR review — Mitigation: `Test-SHAStaleness.ps1` in CI — Watch: CI failure
- Pages not enabled on upstream microsoft/hve-core — Mitigation: build works regardless; document as admin step — Watch: deploy job failure
- Upstream main changes during PR review — Mitigation: rebase worktree branch — Watch: merge conflicts

## 9) Next Steps

- Immediate: T017 — swap jakkaj→microsoft URLs, remove test branch from workflow
  - Tasks file: `/Users/jordanknight/repos/hve-core/docs/plans/003-docusaurus-upstream-pr/docusaurus-upstream-pr-plan.md`
  - Validation: `organizationName: 'microsoft'`, `url: 'https://microsoft.github.io'`, no `docs/docusaurus-site` in workflow branches
  - Resume: `/plan-6-implement-phase --plan "/Users/jordanknight/repos/hve-core/docs/plans/003-docusaurus-upstream-pr/docusaurus-upstream-pr-plan.md"`
- Then: Create PR from `docs/docusaurus-site` to `microsoft/hve-core:main`

## 10) References

- Plan: `/Users/jordanknight/repos/hve-core/docs/plans/003-docusaurus-upstream-pr/docusaurus-upstream-pr-plan.md`
- Spec: `/Users/jordanknight/repos/hve-core/docs/plans/003-docusaurus-upstream-pr/docusaurus-upstream-pr-spec.md`
- Log: `/Users/jordanknight/repos/hve-core/docs/plans/003-docusaurus-upstream-pr/execution.log.md`
- Worktree: `/Users/jordanknight/repos/hve-core-docs-pr/` (branch `docs/docusaurus-site`)
- Prior plan (full site): `/Users/jordanknight/repos/hve-core/docs/plans/002-docusaurus-site/docusaurus-site-plan.md`
- Git commits on worktree: `4f08357`, `04c8b0c`, `1e35fef`, `32ad957`
- Live site: https://jakkaj.github.io/hve-core/

## Context for Resuming Agent

Two repos are in play:

1. **`/Users/jordanknight/repos/hve-core/`** — fork `jakkaj/hve-core`, branch `jordo-explore`. Contains all plans, research, and the full 24-page site (plan 002). Planning artifacts live here and never go to upstream.

2. **`/Users/jordanknight/repos/hve-core-docs-pr/`** — git worktree from same fork, branch `docs/docusaurus-site`, based on `upstream/main` @ `11b93cb`. Contains the minimal clean Docusaurus site for upstream PR. This is where T017 changes go.

The only remaining work is T017 (pre-PR cleanup) which the user will trigger when ready. It involves editing `docusaurus.config.js` and `deploy-docs.yml` in the worktree to swap test URLs to production values.

## Worktree Setup Guide (for new agent)

The dual-repo workflow uses a git worktree so planning stays on one branch while implementation lives on a clean branch destined for upstream. If you need to recreate this setup (the worktree directory was removed, or you're on a fresh machine after cloning `jakkaj/hve-core`):

### Prerequisites

You should already have the fork cloned:

```bash
cd /Users/jordanknight/repos/hve-core
git branch --show-current
# Should be: jordo-explore
```

### Step 1: Ensure remotes are configured

```bash
git remote -v
# origin    https://github.com/jakkaj/hve-core.git (fetch/push)
# upstream  https://github.com/microsoft/hve-core.git (fetch/push)

# If upstream is missing:
git remote add upstream https://github.com/microsoft/hve-core.git
```

### Step 2: Sync fork's main with upstream

```bash
git fetch upstream
git push origin upstream/main:main
```

### Step 3: Create the worktree

The worktree checks out the `docs/docusaurus-site` branch (which already exists on origin) into a sibling directory:

```bash
git fetch origin docs/docusaurus-site
git worktree add ../hve-core-docs-pr origin/docs/docusaurus-site
```

This creates `/Users/jordanknight/repos/hve-core-docs-pr/` with the `docs/docusaurus-site` branch checked out.

### Step 4: Install dependencies in worktree

```bash
cd /Users/jordanknight/repos/hve-core-docs-pr/docs/docusaurus
npm install
```

### Step 5: Verify

```bash
npm run build   # Should succeed with zero errors
npm start       # Dev server at localhost:3000/hve-core/
```

### The Two-Directory Rule

| Directory | Branch | Purpose | What goes here |
|-----------|--------|---------|----------------|
| `/Users/jordanknight/repos/hve-core/` | `jordo-explore` | Planning & research | `docs/plans/`, comparison reports, handover docs, full site (plan 002) |
| `/Users/jordanknight/repos/hve-core-docs-pr/` | `docs/docusaurus-site` | Implementation for upstream PR | Docusaurus site, workflow, instructions — only clean deliverables |

Plan files **never** go into the worktree. Implementation changes **never** go on jordo-explore.

### If the worktree already exists

Check with:

```bash
git worktree list
```

If it shows `../hve-core-docs-pr` already linked, just `cd` into it — no setup needed.

### Removing a worktree (cleanup)

```bash
git worktree remove ../hve-core-docs-pr
```

### GitHub Pages Environment

For the deploy workflow to succeed on the fork, the `docs/docusaurus-site` branch must be allowed in the `github-pages` environment:

**Settings → Environments → `github-pages` → Deployment branches → Add rule → `docs/docusaurus-site`**
