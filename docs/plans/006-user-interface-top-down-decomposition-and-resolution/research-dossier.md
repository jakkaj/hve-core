# Research Report: UI Top-Down Decomposition & Resolution

**Generated**: 2026-02-19
**Research Query**: "Element-by-element comparison between HVE Core and MS Learn content pages"
**Mode**: Pre-Plan (Plan 006)
**Location**: docs/plans/006-user-interface-top-down-decomposition-and-resolution/research-dossier.md

## Executive Summary

This research provides a precise side-by-side comparison of every visual element on the HVE Core docs site vs the MS Learn Architecture Center, using Chrome DevTools computed style extraction. The goal is to identify every remaining difference so they can be discussed and resolved one by one.

## Element Comparison: Content Page (Dark Mode)

### Phase 1: Sidebar Navigation

| Property | MS Learn | HVE Core | Match? | Discussion |
|----------|---------|----------|--------|------------|
| Font size | **14px** | **14px** | ✅ | |
| Font weight (items) | **400** (normal) | **600** (semi-bold) | ❌ | Ours looks heavier — only section HEADERS should be 600 |
| Line height | **25.6px** | **25.6px** | ✅ | |
| Padding | `2px 0 2px 16px` | `2px 0 2px 4px` | ❌ | Our left padding is 4px vs 16px — items need more indent |
| Color | `rgb(230,230,230)` | `rgb(255,255,255)` | ❌ | Ours is pure white, MS Learn is slightly dimmer |
| Active bg | `rgb(41,41,41)` (#292929) | transparent | ❌ | MS Learn highlights the active section with a subtle bg |
| Nav width | **364px** | **300px** | ❌ | Ours is narrower |
| Nav padding | `0px` | `8px 0 8px 8px` | ❌ | Ours has extra padding |
| Chevron position | LEFT of label | LEFT (via CSS order) | ✅ | Working |
| Chevron size | ~9px indicator | scaled 55% | ~✅ | Close |

**Items to discuss**:
1. Sidebar item weight 400 vs 600 — non-header items should be lighter
2. Left padding 16px vs 4px — needs more indent
3. Sidebar text color should be dimmer (#e6e6e6 not #ffffff)
4. Active item needs subtle background highlight
5. Sidebar width 364px vs 300px — consider widening

### Phase 2: Breadcrumbs

| Property | MS Learn | HVE Core | Match? | Discussion |
|----------|---------|----------|--------|------------|
| Font size | **16px** | **12.8px** | ❌ | Ours is much smaller |
| Font weight | 400 | 400 | ✅ | |
| Color | `rgb(117,182,231)` (link blue) | `rgb(255,255,255)` (white) | ❌ | Should be link-colored |

**Items to discuss**:
1. Breadcrumb font size 16px vs 12.8px — significant difference
2. Breadcrumb color should be link blue, not white

### Phase 3: Content Area

| Property | MS Learn | HVE Core | Match? | Discussion |
|----------|---------|----------|--------|------------|
| Font size | 16px | 16px | ✅ | |
| Line height | 25.6px | 26.4px | ~✅ | Close |
| Padding | 24px | 0px | ❌ | MS Learn has content padding |
| Max width | none | calc(100% - 300px) | — | Different layout model |

### Phase 4: Headings

| Property | MS Learn H1 | HVE Core H1 | Match? | Discussion |
|----------|------------|-------------|--------|------------|
| Font size | **40px** | **48px** | ❌ | Ours is much bigger |
| Font weight | **600** | **700** (bold) | ❌ | Ours is heavier |
| Line height | 52px | 60px | ❌ | Ours is taller |
| Margin | `-10px 0 0` | `0 0 25px` | ❌ | Different spacing |

| Property | MS Learn H2 | HVE Core H2 | Match? | Discussion |
|----------|------------|-------------|--------|------------|
| Font size | **18px** | **19.2px** | ~✅ | Close |
| Font weight | **600** | **700** | ❌ | Ours heavier |

**Items to discuss**:
1. H1 is 48px vs 40px — needs to shrink
2. H1 weight 700 vs 600 — too heavy
3. H2 weight 700 vs 600 — too heavy

### Phase 5: Footer

| Property | MS Learn | HVE Core | Match? | Discussion |
|----------|---------|----------|--------|------------|
| Background | `rgb(9,31,44)` (#091f2c) | transparent | ❌ | Our footer bg may not be applying on doc pages |
| Padding | `48px 24px` | 0px | ❌ | Missing footer padding |
| Link size | 14px | 16px | ❌ | Our footer links bigger |
| Link color | white | link blue | ❌ | Different |

**Items to discuss**:
1. Footer background not applying on doc pages
2. Footer padding missing
3. Footer links should be 14px white, not 16px blue

### Phase 6: Right-Side TOC

| Property | MS Learn | HVE Core | Match? | Discussion |
|----------|---------|----------|--------|------------|
| Link font | 14px, 600 | (check) | ? | Need to verify |
| Link color | white | (check) | ? | |

### Mobile View Notes (for future plan)
- Sidebar collapses to hamburger menu — check transition
- Card grid reflow behavior at tablet breakpoint
- Hero padding on mobile
- Footer stacking on narrow viewports
- Breadcrumb overflow/truncation on small screens
- Touch target sizes for sidebar links

## Prioritized Fix Phases

### Phase 1: Sidebar (HIGH — most visually different)
- Item font weight: 600 → 400 (headers stay 600)
- Left padding: 4px → 16px
- Text color: #ffffff → #e6e6e6
- Active item background: transparent → #292929
- Consider wider sidebar

### Phase 2: Headings & Content (HIGH — text hierarchy)
- H1: 48px/700 → 40px/600
- H2: 19.2px/700 → 18px/600
- Content padding: add 24px

### Phase 3: Breadcrumbs (MEDIUM)
- Font size: 12.8px → 16px
- Color: white → link blue

### Phase 4: Footer on doc pages (MEDIUM)
- Background color not applying
- Padding and link sizing

### Phase 5: Fine-tuning (LOW)
- TOC link styling
- Active sidebar indicator styling
- Hover states on sidebar items

---

**Research Complete**: 2026-02-19
**Report Location**: docs/plans/006-user-interface-top-down-decomposition-and-resolution/research-dossier.md
