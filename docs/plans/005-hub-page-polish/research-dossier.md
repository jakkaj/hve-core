# Research Report: Hub Page Styling Refinement to Match MS Learn

**Generated**: 2026-02-19
**Research Query**: "Hub page styling to look EXACTLY like learn.microsoft.com/en-us/azure/architecture/"
**Mode**: Pre-Plan (Plan 005)
**Location**: docs/plans/005-hub-page-polish/research-dossier.md
**FlowSpace**: Not Available
**Findings**: 18 gaps identified

## Executive Summary

### What Exists Today
A functional hub page with HeroSection, icon card grid, and box cards. The structural layout is correct (hero → icon cards → box cards) and the three-blue color system is implemented. However, side-by-side comparison with the live MS Learn Architecture Center reveals multiple styling gaps.

### Key Insights
1. The MS Learn hero section uses a `uhf-container` (max-width centered container) for content, with the background extending full-width — our hero content is centered but sizing differs
2. MS Learn icon cards use a `media` layout (Bulma CSS) with strict image dimensions and `.stretched-link` for full-card clickability — our flex layout is close but lacks the equal-height and stretched-link patterns
3. MS Learn product directory uses a 4-column grid on desktop (`is-3-desktop`) with `.box` cards that have distinct styling from icon cards — our box cards use a 2-column layout
4. The hero has NO CTA button on the MS Learn Architecture Center page — it's just title + description

## Gap Analysis: Our Implementation vs MS Learn

### GAP-01: Hero Has No CTA Button on MS Learn
**Severity**: HIGH — visually distinctive difference
**MS Learn**: Hero section contains only `<h1>` title and `<p>` description. No button.
**Ours**: Hero includes a "Get Started" CTA button (white background, dark text)
**Fix**: Remove CTA button from hero, or make it optional and disable it in the hub page config. Navigation happens through the card grid below.

### GAP-02: Hero Uses `uhf-container` Max-Width Container
**Severity**: MEDIUM
**MS Learn**: Hero content is wrapped in an implied max-width container (~1200px) centered within the full-width blue background. Text is LEFT-ALIGNED, not centered.
**Ours**: Hero content is center-aligned with `text-align: center` and `max-width: 800px`
**Fix**: Change hero to left-align text, increase max-width to ~1200px (matching the uhf-container), remove `text-align: center`.

### GAP-03: Hero Title Uses Bulma `title is-1` Sizing
**Severity**: MEDIUM
**MS Learn**: `<h1 class="title is-1">` — Bulma's `is-1` renders at ~3rem (48px) with weight 600-700
**Ours**: 2.5rem (40px) with weight 600
**Fix**: Increase hero title to 3rem or 2.75rem to match MS Learn's prominence.

### GAP-04: Hero Section Has Smaller Padding
**Severity**: LOW
**MS Learn**: Hero uses `hero-xs` class which applies minimal padding (~2rem vertical)
**Ours**: Hero uses 4rem vertical padding
**Fix**: Reduce hero vertical padding to ~2.5rem to match the tighter MS Learn hero.

### GAP-05: Icon Cards Container Uses `uhf-container padding-block-sm`
**Severity**: MEDIUM
**MS Learn**: Icon cards section has `<div class="uhf-container padding-block-sm">` with a centered max-width container and smaller vertical padding
**Ours**: Section has `padding: 3rem 2rem` and `maxWidth: 1200px` — close but the MS Learn version uses tighter padding (~1rem vertical)
**Fix**: Reduce icon card section vertical padding to ~1.5rem.

### GAP-06: Icon Cards Use `media` Layout Pattern (Not Flex Row)
**Severity**: HIGH — structural difference
**MS Learn**: Each icon card uses Bulma's `<div class="media">` with `<div class="media-left">` for the icon and `<div class="media-content">` for text. The icon is hidden on mobile (`display-none display-block-tablet`).
**Ours**: Uses flex row layout (`.iconCardLayout`) which is functionally similar but our icon is always visible
**Fix**: Hide icons on mobile (below 768px). Add `display: none` on `.iconContainer` at mobile breakpoint.

### GAP-07: Icon Cards Have No Border/Shadow (Flat Cards)
**Severity**: HIGH — visually distinctive
**MS Learn**: Icon cards use `<article class="card is-full-height">` with NO visible border. Cards are flat with no shadow on hover. The card just has a subtle background.
**Ours**: Cards have `border: 1px solid var(--ms-learn-card-border)` and `box-shadow` on hover
**Fix**: Remove border from icon cards. Remove hover shadow. Icon cards should be flat — borders and shadows are only for box cards in the product directory.

### GAP-08: Icon Cards Use `stretched-link` for Full-Card Click
**Severity**: MEDIUM
**MS Learn**: Uses `<a class="card-title stretched-link">` where the link title stretches to cover the entire card
**Ours**: Wraps entire card in `<Link>` — functionally equivalent but semantically different. Our approach is actually fine.

### GAP-09: Product Directory Section Title is Left-Aligned
**Severity**: MEDIUM
**MS Learn**: Section titles like "Architect workloads on Azure" are left-aligned with a `<p>` subtitle below
**Ours**: Section titles use `textAlign: 'center'`
**Fix**: Left-align section titles and add subtitle text.

### GAP-10: Product Directory Uses 4-Column Grid (`is-3-desktop`)
**Severity**: HIGH — layout difference
**MS Learn**: Box cards use `<div class="column is-6-tablet is-3-desktop">` — 4 columns on desktop, 2 on tablet
**Ours**: Box cards use `columns={2}` (2-column grid)
**Fix**: Change box card grid to 4 columns on desktop, 2 on tablet. Add `columns={4}` option to CardGrid.

### GAP-11: Box Cards Use `.box` Class (Not `.card`)
**Severity**: HIGH — visual difference
**MS Learn**: Product directory cards use `<div class="box margin-none is-full-height padding-sm">` — this is Bulma's `.box` which has a different visual treatment (white background, subtle border, no top accent)
**Ours**: Box cards have `border-top: 3px solid var(--ms-learn-card-accent)` (blue top accent)
**Fix**: Remove the blue top-accent border from box cards. Use a simpler border treatment matching Bulma's `.box` (uniform border, no accent).

### GAP-12: Box Card Icon is 48x48 (Not 64x64)
**Severity**: MEDIUM
**MS Learn**: Product cards use `<img class="image is-48x48">` — 48×48px icons
**Ours**: Box cards currently don't show icons — they only have title + link list. MS Learn box cards have a 48×48 icon above the title.
**Fix**: Add optional icon prop to BoxCard. Use 48×48 size for box card icons.

### GAP-13: Box Card Title Uses `font-size-h6` (Smaller Than Ours)
**Severity**: LOW
**MS Learn**: `<h3 class="font-size-h6">` — uses h6 font size (~0.875rem/14px)
**Ours**: `.boxCardTitle` uses `font-size: 1.125rem` (18px)
**Fix**: Reduce box card title to ~1rem (16px) to better match.

### GAP-14: Box Card Links Use `font-size-sm` and `display-block`
**Severity**: LOW
**MS Learn**: `<a class="display-block font-size-sm">` — each link is a block element with small font
**Ours**: Links are `font-size: 0.875rem` in `<li>` elements — close match

### GAP-15: Missing "Technology Areas" Section (Third Section)
**Severity**: MEDIUM
**MS Learn**: Has THREE main sections: (1) Highlighted Content (icon cards), (2) Product Directory (box cards), (3) Technology Areas/Conceptual Content (another card grid with topic-icon links)
**Ours**: Only TWO sections: icon cards + box cards
**Fix**: Consider adding a third section. The MS Learn third section uses simple cards with link lists and topic icons. This can be deferred or simplified.

### GAP-16: Hero Pattern Uses `background-size-200` Class
**Severity**: LOW
**MS Learn**: `<section class="hero has-background-azure background-image-pattern-plus background-size-200">`
**Ours**: Pattern repeats at native size (20×20). MS Learn scales the pattern to 200%.
**Fix**: Add `background-size: 40px 40px` to the hero pattern (doubling the 20×20 tile).

### GAP-17: Section Backgrounds Alternate
**Severity**: MEDIUM
**MS Learn**: Hero (blue) → Icon cards (white/default) → Product directory (white with padding-block-lg) → Technology areas (white with padding-block-lg)
**Ours**: Hero (blue) → Icon cards (white) → Box cards (gray `--ms-learn-section-bg`)
**Fix**: Remove the gray background from the box card section. MS Learn uses white backgrounds for all content sections, only the hero has a colored background.

### GAP-18: No Descriptions in Icon Cards on MS Learn
**Severity**: LOW
**MS Learn**: Icon cards have only supertitle + linked title. No description text.
**Ours**: Icon cards include an optional description
**Fix**: Remove descriptions from the hub page's icon cards data (keep the prop for reuse elsewhere).

## Recommendations

### Priority Fixes (Visually Impactful)

1. **Remove hero CTA button** (GAP-01) — biggest visual difference
2. **Left-align hero text** (GAP-02) — MS Learn is left-aligned, not centered
3. **Remove icon card borders and shadows** (GAP-07) — flat cards, no border
4. **Remove box card blue accent border** (GAP-11) — uniform border
5. **4-column box card grid** (GAP-10) — desktop layout matches MS Learn
6. **Left-align section titles** (GAP-09)
7. **Remove gray section background** (GAP-17) — all sections white

### Secondary Fixes (Polish)

8. Increase hero title size to ~2.75rem (GAP-03)
9. Reduce hero padding to ~2.5rem (GAP-04)
10. Hide icon on mobile (GAP-06)
11. Scale hero pattern to 40px (GAP-16)
12. Remove descriptions from icon card data (GAP-18)
13. Reduce icon card section padding (GAP-05)

### Deferred

14. Add third "Technology Areas" section (GAP-15) — optional enrichment
15. Add 48×48 icons to box cards (GAP-12) — nice-to-have

---

**Research Complete**: 2026-02-19
**Report Location**: docs/plans/005-hub-page-polish/research-dossier.md
