# Docusaurus Upstream PR — Minimal Viable Site

**Mode**: Simple

📚 This specification incorporates findings from `../002-docusaurus-site/` plan artifacts (research dossier, workshops, branch extraction research).

## Research Context

- **Components affected**: `docs/docusaurus/` (new), `.github/workflows/deploy-docs.yml` (new), `.github/instructions/docusaurus-edits.instructions.md` (new), `.gitignore` (modified), `justfile` (modified)
- **Critical dependencies**: Node.js 20, GitHub Pages enabled on microsoft/hve-core with "GitHub Actions" source
- **Modification risks**: Low — all new files except minor `.gitignore` and `justfile` additions
- **Prior work**: Full 24-page site built and validated on `jordo-explore` branch (plan 002). This spec covers extracting a minimal version suitable for an upstream PR.
- **Link**: See `../002-docusaurus-site/branch-extraction-research.md` for full extraction strategy

## Summary

Create a minimal Docusaurus 3 documentation site at `docs/docusaurus/` on the `docs/docusaurus-site` branch (via git worktree at `../hve-core-docs-pr/`), suitable for a PR to `microsoft/hve-core`. The site establishes the scaffold, sidebar structure, and GitHub Pages deployment. Content pages are placeholders that demonstrate the structure and conventions, with real content to follow in subsequent PRs.

This is the "get the foundation in place" PR — not the "write all the docs" PR.

## Goals

- Establish the Docusaurus 3 project skeleton at `docs/docusaurus/` with working build
- Deploy to GitHub Pages via a SHA-pinned GitHub Actions workflow
- Demonstrate the sidebar structure with placeholder pages across 2 sections (2-3 pages each, lorem ipsum style)
- Create the `docusaurus-edits.instructions.md` file so future content follows conventions automatically
- Provide `justfile` recipes for local development
- Keep the PR small and reviewable — scaffold + structure + deploy, minimal content

## Non-Goals

- Writing final documentation content (that follows in later PRs)
- Including plan files, workshops, research dossiers, or comparison reports
- Custom React components beyond the default landing page
- Blog, versioned docs, search integration, i18n
- Dark mode Mermaid verification
- Complete artifact catalog (all-artifacts.md is too large for this PR)
- Deploying from jakkaj fork — the workflow targets microsoft org

## Complexity

- **Score**: CS-2 (small)
- **Breakdown**: S=1, I=1, D=0, N=0, F=0, T=0
- **Confidence**: 0.95
- **Assumptions**: Docusaurus 3 scaffold is proven (validated on jordo-explore), GitHub Pages can be enabled on upstream repo
- **Dependencies**: GitHub Pages enabled on microsoft/hve-core with "GitHub Actions" source
- **Risks**: Pages enablement requires repo admin action
- **Phases**: Single phase — copy, curate, commit, PR

## Acceptance Criteria

1. `cd docs/docusaurus && npm install && npm start` opens a local dev server with working navigation
2. The sidebar displays 2 sections with 2-3 placeholder pages each, demonstrating category structure and sidebar ordering
3. At least one page contains a Mermaid diagram that renders correctly
4. `.github/instructions/docusaurus-edits.instructions.md` exists with `applyTo: 'docs/docusaurus/**'`
5. `.github/workflows/deploy-docs.yml` exists with SHA-pinned actions, path filter on `docs/docusaurus/**`, and `main` branch trigger only
6. `docs/docusaurus/build/` and `docs/docusaurus/.docusaurus/` are in `.gitignore`
7. `npm run build` in `docs/docusaurus/` completes with zero errors
8. The PR contains no files from `docs/plans/`, no research dossiers, no workshop documents
9. `docusaurus.config.js` has `organizationName: 'microsoft'` and `url: 'https://microsoft.github.io'`
10. Commit history is clean — 3-5 logical commits, no trigger/fix-up commits

## Risks & Assumptions

- **GitHub Pages enablement**: The upstream repo must have Pages enabled with Source "GitHub Actions". This is a manual admin step. The workflow will build correctly regardless; the deploy job fails gracefully if Pages is not configured.
- **SHA pins**: Verified on 2026-02-18. `Test-SHAStaleness.ps1` will catch drift.
- **Content is placeholder**: Pages use brief placeholder text that describes what the section will cover. Real content follows in subsequent PRs. This is intentional — keeps the PR reviewable.
- **Fork URL vs upstream URL**: The `docusaurus.config.js` must use `microsoft.github.io` not `jakkaj.github.io`. The `baseUrl` stays `/hve-core/`.

## Open Questions

All resolved — see Clarifications session below.

## ADR Seeds (Optional)

- **Decision Drivers**: Need a docs site that supports Mermaid, is Copilot-friendly, deploys to GitHub Pages, and lives alongside existing repo content without migration
- **Candidate Alternatives**: Docusaurus (selected — proven on jordo-explore), MkDocs Material, VitePress, Starlight
- **Stakeholders**: Repository maintainers (WilliamBerryiii), HVE-Core users, Copilot agent authors

## Workshop Opportunities

None needed — design decisions already made and validated in plan 002 workshops. This is an extraction and curation task.

## Testing Strategy

- **Approach**: Manual
- **Rationale**: Documentation site scaffold — no application logic. Validation is `npm run build` succeeds and dev server renders pages.
- **Focus Areas**: Build succeeds, pages render, links work, Mermaid diagrams render
- **Excluded**: No automated tests — this is static content
- **Mock Usage**: N/A

## Documentation Strategy

- **Location**: None
- **Rationale**: This PR *is* the documentation. No separate docs about the docs needed.

## Clarifications

### Session 2026-02-19

| # | Question | Answer | Updated Section |
|---|----------|--------|-----------------|
| Q1 | Workflow mode? | **Simple** — CS-2, single phase, quick path | Mode header |
| Q3 | How many pages per section? | **2 sections with a couple pages each**, lorem ipsum style. Minimal structure proof, not full 5-section layout | Acceptance Criteria, Goals |
| Q4 | Landing page style? | **Simple custom hero** — title + tagline + one "Get Started" button. No feature cards. | Goals |
| Q5 | Intro.md content? | **Brief HVE description + Mermaid diagram** to prove integration, with :::caution draft notice. Other pages are lorem ipsum. | Acceptance Criteria |
| Q6 | Visual styling? | **Custom CSS with Microsoft Fluent colors** (`#0078D4` primary, Segoe UI font stack, proper light/dark mode). No theme package exists — customise `src/css/custom.css`. | Goals |
