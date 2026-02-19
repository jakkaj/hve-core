# Docusaurus Upstream PR — Execution Log

**Plan**: [docusaurus-upstream-pr-plan.md](./docusaurus-upstream-pr-plan.md)
**Mode**: Simple (inline tasks)
**Started**: 2026-02-19
**Worktree**: `/Users/jordanknight/repos/hve-core-docs-pr/`
**Branch**: `docs/docusaurus-site`

---

## T001: Scaffold Docusaurus 3
- `npx create-docusaurus@latest docusaurus classic --javascript --package-manager npm` in `docs/`
- Docusaurus 3.9.2 scaffolded successfully

## T002: Install Mermaid
- `npm install @docusaurus/theme-mermaid` — added to dependencies

## T003: Configure docusaurus.config.js
- Set `jakkaj.github.io` (test), `baseUrl: '/hve-core/'`, mermaid enabled (both markdown + theme), blog disabled, sidebar renamed to `docsSidebar`, editUrl points to `microsoft/hve-core`

## T004: Apply Fluent CSS
- Primary `#0078D4`, dark mode `#4DA3E5`, Segoe UI font stack

## T005: Simplify landing page
- Simple hero with title + tagline + "Get Started" button, removed HomepageFeatures

## T006: Delete defaults
- Removed blog/, HomepageFeatures/, tutorial-basics/, tutorial-extras/, default SVGs

## T007: Create intro.md
- Brief HVE description, Mermaid value loop diagram, draft notice

## T008: Getting Started section
- `_category_.json` (position 1) + overview.md + installation.md

## T009: Workflows section
- `_category_.json` (position 2) + overview.md + rpi-workflow.md

## T010: Copy instructions file
- Copied `docusaurus-edits.instructions.md` with `applyTo: 'docs/docusaurus/**'`

## T011: Deploy workflow
- Fresh `deploy-docs.yml` with 5 SHA-pinned actions, `main` + `docs/docusaurus-site` branches, path filter with self-reference

## T012: Update .gitignore
- Added `docs/docusaurus/build/`, `.docusaurus/`, `node_modules/` patterns

## T013: Create justfile
- `docs-dev`, `docs-build`, `docs-serve` recipes

## T014: Build verification
- `npm run build` — zero errors (only benign deprecation warnings)
- Dev server — all 6 pages HTTP 200

## T015: Commits and push
- 4 clean commits: scaffold+config → content → instructions → workflow+tooling
- Pushed to `origin/docs/docusaurus-site`

## T016: Pages environment
- User added `docs/docusaurus-site` to github-pages deployment branches
- Re-ran workflow — Build 1m12s + Deploy 9s ✅
- Site live at https://jakkaj.github.io/hve-core/

## T017: Pre-PR cleanup
- DEFERRED — execute when user says "ready for PR"
- Will change `jakkaj` → `microsoft`, remove test branch from workflow
