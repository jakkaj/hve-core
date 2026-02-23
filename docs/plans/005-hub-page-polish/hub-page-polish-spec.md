# Hub Page Visual Polish — MS Learn Fidelity

**Mode**: Simple
**File Management**: Legacy

📚 This specification incorporates findings from research-dossier.md

## Research Context

The plan-1a-explore research identified 18 styling gaps between our hub page and the live MS Learn Architecture Center (`learn.microsoft.com/en-us/azure/architecture/`). The structural layout is correct (hero → icon cards → box cards) and the three-blue color system is in place, but multiple visual details diverge from the reference.

- **Components affected**: `HeroSection`, `IconCard`, `BoxCard`, `CardGrid` components + `custom.css` + `index.tsx` hub page + `hubCards.tsx` data
- **Critical dependencies**: Plan 004 implementation (all 4 phases complete), existing CSS variable system
- **Modification risks**: Low — all changes are CSS and prop adjustments to existing components; no structural rework
- **Link**: See `research-dossier.md` for full 18-gap analysis

## Summary

Refine the hub landing page styling to achieve near-exact visual parity with the Microsoft Learn Azure Architecture Center. The page structure and color system are already correct from Plan 004. This plan addresses 13 visual gaps discovered by comparing rendered HTML between our site and the live MS Learn page — covering hero layout, card styling, grid columns, section alignment, and spacing.

**Why**: The current hub page reads as "inspired by" MS Learn rather than "matching" MS Learn. The user explicitly wants it to look EXACTLY like the reference. Small details — left-aligned hero text, flat icon cards without borders, 4-column product grid, no hero button — collectively create the difference between "close" and "nailed it."

## Goals

1. **Hero matches MS Learn exactly**: Left-aligned text (not centered), no CTA button, larger title (~2.75rem), tighter vertical padding (~2.5rem), scaled pattern (40px tile)
2. **Icon cards are flat**: No border, no hover shadow — matching MS Learn's borderless card treatment. Icons hidden on mobile
3. **Box card grid is 4-column**: Desktop uses 4 columns (not 2), matching MS Learn's `is-3-desktop` grid. Blue top-accent removed
4. **Section titles left-aligned**: All section headings left-aligned with subtitle text, matching MS Learn's content alignment
5. **White section backgrounds**: Remove gray background from box card section — MS Learn uses white for all content sections
6. **Icon card descriptions removed from hub**: MS Learn icon cards show only supertitle + title, no description paragraph
7. **Spacing tightened**: Icon card section uses smaller vertical padding to match MS Learn's compact layout

## Non-Goals

1. **Adding a third "Technology Areas" section** — the MS Learn page has 3 content sections but we'll keep our 2-section structure for now (can be added later)
2. **Adding 48×48 icons to box cards** — MS Learn product cards have small icons; we'll defer this enrichment
3. **Bulma CSS framework** — we match the visual output, not the framework
4. **Content changes** — card titles, descriptions, and links are unchanged; this is purely visual
5. **Dark mode adjustments** — the existing dark mode variables handle these changes automatically via CSS custom properties

## Complexity

- **Score**: CS-1 (trivial)
- **Breakdown**: S=1, I=0, D=0, N=0, F=0, T=0
  - Surface Area (S=1): Multiple files touched but all within existing components — CSS modules, one data file, one page file
  - Integration (I=0): No external dependencies
  - Data/State (D=0): No data model changes
  - Novelty (N=0): Every change is precisely defined by the gap analysis with exact CSS values
  - Non-Functional (F=0): No performance, security, or compliance concerns
  - Testing/Rollout (T=0): Visual verification only — `npm run build` passes
- **Confidence**: 0.95
- **Assumptions**:
  - Existing CSS variable system handles dark mode automatically for all changes
  - CSS Module changes in card components don't affect generated-index card styling (separate selectors)
  - Removing the hero CTA doesn't break any navigation flow (cards below serve as navigation)
- **Dependencies**:
  - Plan 004 fully implemented (all 4 phases complete)
- **Risks**:
  - Removing icon card borders may make cards feel less interactive — mitigated by link-colored title text
- **Phases**:
  1. Single phase — all CSS/prop changes applied together

## Acceptance Criteria

1. **Hero text is left-aligned**: Title and subtitle render left-aligned within a max-width container, not centered
2. **No hero CTA button**: The hero section renders title and subtitle only; no button visible
3. **Hero title size**: Title renders at approximately 2.75rem (44px), larger than the current 2.5rem
4. **Hero padding**: Vertical padding is approximately 2.5rem (reduced from 4rem)
5. **Hero pattern scale**: The "+" cross pattern repeats at 40×40px (doubled from 20×20)
6. **Icon cards borderless**: Icon cards render with no visible border and no box-shadow on hover
7. **Icon cards hide icons on mobile**: Below 768px viewport width, the 64×64 icon container is hidden
8. **Box card grid 4-column**: Box cards render in a 4-column grid on desktop (≥996px), 2-column on tablet, 1-column on mobile
9. **Box cards no accent border**: Box cards render with uniform borders — no colored top accent line
10. **Section titles left-aligned**: "Explore by topic" and "Deep dive" headings render left-aligned
11. **White section backgrounds**: All content sections use white/default background — no gray section
12. **Icon card data has no descriptions**: The hub page's icon cards show supertitle + title only; no description paragraph
13. **Icon card section compact**: Vertical padding of the icon card section is approximately 1.5rem (reduced from 3rem)
14. **Build passes**: `npm run build` completes with zero errors

## Risks & Assumptions

### Risks

1. **Flat icon cards may feel non-interactive**: Removing borders and shadows could make cards look like plain text rather than clickable elements — mitigated by the link-colored title acting as a visual affordance
2. **4-column box card grid may be tight on smaller desktops**: At 996px-1200px viewport, 4 columns produce narrow cards — mitigated by responsive fallback to 2 columns below 996px

### Assumptions

1. The CSS variable system from Plan 004 handles dark mode transitions for all styling changes automatically
2. Removing descriptions from icon card data doesn't affect the `IconCard` component interface (description is already optional)
3. The `CardGrid` component can support a `columns={4}` option with minimal changes

## Open Questions

None — all gaps are precisely defined by the research dossier with exact CSS values and MS Learn HTML reference.

## ADR Seeds (Optional)

None — this is a visual polish pass with no architectural decisions.

## External Research

- **Incorporated**: research-dossier.md (18 gaps from live HTML comparison)
- **Key Findings**: MS Learn uses flat borderless icon cards, left-aligned hero with no CTA, 4-column product grid, and tighter spacing
- **Applied To**: All acceptance criteria derived directly from gap analysis

## Unresolved Research

None — all research opportunities resolved.

## Workshop Opportunities

None — changes are surgical CSS and prop adjustments with no design ambiguity.

## Testing Strategy

- **Approach**: Lightweight
- **Rationale**: All changes are CSS property adjustments and React prop removals — no logic to unit test. Build success and visual inspection are sufficient
- **Focus Areas**: `npm run build` passes, visual inspection in light and dark modes, responsive layout at desktop/tablet/mobile
- **Excluded**: Unit tests, integration tests, visual regression tooling
- **Mock Usage**: N/A — no tests

## Documentation Strategy

- **Location**: No new documentation
- **Rationale**: Visual CSS polish — the site itself is the deliverable. No features or APIs to document
- **Maintenance**: N/A

## Clarifications

### Session 2026-02-19

**Q1: Workflow Mode** — **Simple** (CS-1 trivial, single phase, skip optional gates). Rationale: Surgical CSS and prop changes with no architectural decisions.

**Q2: Testing Strategy** — **Lightweight** (`npm run build` + visual inspection only). Rationale: CSS property changes and prop removals have no logic to unit test. Build pass and visual check are sufficient.

**Q3: Documentation Strategy** — **No new documentation**. Rationale: Visual polish pass — the site itself is the deliverable.
