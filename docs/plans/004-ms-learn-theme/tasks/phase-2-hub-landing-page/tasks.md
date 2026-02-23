# Phase 2: Hub Landing Page – Tasks & Alignment Brief

**Spec**: [ms-learn-theme-spec.md](../../ms-learn-theme-spec.md)
**Plan**: [ms-learn-theme-plan.md](../../ms-learn-theme-plan.md)
**Date**: 2026-02-19

## Executive Briefing

### Purpose
Replace the simple hero landing page (title + "Get Started" button) with a MS Learn Architecture Center-style hub page featuring a gradient hero with pattern overlay, icon card grids for content discovery, and box cards with link lists.

### What We're Building
- `HeroSection` component: gradient hero with "+" pattern overlay, title, subtitle, CTA
- `IconCard` / `BoxCard` / `CardGrid` components: shared CSS Module card system
- 6 SVG icon components: one per content category, `fill="currentColor"` for dark mode
- `hubCards.ts`: data-driven card content
- `index.tsx`: hub page composing all components (replaces `index.js`)

### User Value
Visitors land on a rich, professional hub page with card-based navigation surfacing all 6 content areas, instead of a bare hero with a single button.

## Tasks

| Status | ID | Task | CS | Type | Dependencies | Validation | Notes |
|--------|------|------|-----|------|--------------|------------|-------|
| [ ] | T001 | Setup: install test deps (`jest @testing-library/react @testing-library/jest-dom ts-jest identity-obj-proxy @types/jest @types/react`), create `jest.config.js`, add `"test": "jest --verbose"` to package.json | CS-2 | Setup | – | `npm test` exits clean | Docusaurus 3.x auto-generates tsconfig.json on first .tsx |
| [ ] | T002 | Create `src/components/HeroSection/index.tsx` + `styles.module.css`. Props: title, subtitle, ctaText, ctaHref. Uses `--ms-learn-hero-gradient`, `--ms-learn-hero-pattern` (background-image repeat), `--ms-learn-hero-text` | CS-2 | Core | T001 | Renders gradient hero with pattern overlay | Phase 1 exports all hero CSS variables |
| [ ] | T003 | Create `src/components/Cards/IconCard.tsx`, `BoxCard.tsx`, `CardGrid.tsx`, `styles.module.css`, `index.ts`. IconCard: icon+supertitle+title+href. BoxCard: title+links[]. CardGrid: CSS Grid 3→2→1 columns at 996px/577px breakpoints | CS-3 | Core | T001 | Cards render, grid is responsive | Shared CSS Module with variant classes |
| [ ] | T004 | Create 6 SVG icon components in `src/components/Icons/`. Each: 64×64 viewBox, `fill="currentColor"`, `aria-hidden="true"`. Simple geometric shapes | CS-2 | Core | – | Icons render at 64×64, adapt to dark mode | Placeholder shapes OK — refine later |
| [ ] | T005 | Create `src/data/hubCards.ts` with iconCards (6 entries) and boxCards arrays. Hrefs: `/docs/category/getting-started`, etc. | CS-1 | Core | T004 | Data file exports both arrays | Discovery 05: data-driven composition |
| [ ] | T006 | Rewrite `index.js` → `index.tsx`. Delete old `index.js` + `index.module.css`. Compose: Layout → HeroSection → "Explore by topic" CardGrid(IconCards) → "Deep dive" CardGrid(BoxCards) | CS-2 | Core | T002,T003,T005 | Hub page renders complete layout | CTA: "Get Started" → /docs/category/getting-started |
| [ ] | T007 | Build + test verification | CS-1 | Verify | T006 | `npm run build` passes, `npm test` passes, hub renders at /hve-core/ in both modes | |

## Discoveries & Learnings

| Date | Task | Type | Discovery | Resolution | References |
|------|------|------|-----------|------------|------------|
| | | | | | |
