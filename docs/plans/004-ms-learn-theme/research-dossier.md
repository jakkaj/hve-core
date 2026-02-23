# Research Report: Microsoft Learn Theme for HVE Core Docusaurus Site

**Generated**: 2025-07-18
**Research Query**: "Update the Docusaurus website to look like learn.microsoft.com/en-us/azure/architecture/ with a top-level landing page"
**Mode**: Pre-Plan (Plan 004)
**Location**: docs/plans/004-ms-learn-theme/research-dossier.md
**FlowSpace**: Not Available
**Findings**: 55+ across 4 subagents

## Executive Summary

### What Exists Today
A clean Docusaurus 3.9.2 site at `jakkaj.github.io/hve-core/` with Microsoft Fluent CSS (`#0078D4` primary, Segoe UI), a simple hero landing page, auto-generated sidebar, and 5 content pages across 2 categories (Getting Started, Workflows). Deployed via GitHub Pages.

### What the Target Looks Like
Microsoft Learn uses **three distinct page templates**: a Hub page (full-width hero + card grids), a Conceptual page (3-column holy-grail layout with sidebar + content + TOC), and a Content Browser page (faceted search catalog). The design relies on a Bulma-based grid, utility-first CSS, Docon icon font, and heavy use of card components.

### Key Insights
1. **No Docusaurus theme package replicates Microsoft Learn** — all customization must be built via CSS variables, component swizzling, and custom React components
2. **Docusaurus has strong built-in features** that map to MS Learn patterns: sidebar, breadcrumbs, TOC, dark mode, `DocCardList`, and `generated-index` category pages
3. **The biggest gap is the Hub/landing page** — this requires a custom React page in `src/pages/` with card grid components that don't exist in Docusaurus out of the box

### Quick Stats
- **Current site**: 5 content pages, 2 categories, ~10 files
- **Target pages to analyze**: 3 distinct MS Learn templates
- **Swizzleable components**: ~100 (Safe, Unsafe, Forbidden tiers)
- **Prior learnings surfaced**: 15 from previous plans
- **CSS variables available**: 50+ Infima `--ifm-*` variables

## How It Currently Works

### Site Architecture
```
docs/docusaurus/
├── docs/                          # Content (Markdown)
│   ├── intro.md                   # Landing doc (draft)
│   ├── getting-started/           # Category 1
│   │   ├── overview.md
│   │   └── installation.md
│   └── workflows/                 # Category 2
│       ├── overview.md
│       └── rpi-workflow.md
├── src/
│   ├── css/custom.css             # Fluent CSS overrides
│   └── pages/
│       ├── index.js               # Hero landing page
│       └── index.module.css       # Landing page styles
├── docusaurus.config.js           # Site config
├── sidebars.js                    # Auto-generated sidebar
└── package.json                   # Docusaurus 3.9.2 + React 19
```

### Current Theme Configuration
- **Primary color**: `#0078D4` (Microsoft Blue)
- **Dark mode primary**: `#4DA3E5`
- **Font**: Segoe UI system stack
- **Code themes**: GitHub Light (light), Dracula (dark)
- **Mermaid**: Enabled (dual-config requirement)
- **Navbar**: Title + Microsoft logo + Docs link + GitHub link
- **Footer**: Dark style with Documentation and Community columns
- **Sidebar**: Auto-generated from docs directory structure

### Current Landing Page
Simple hero component with:
- Microsoft logo
- Title: "HVE Core"
- Tagline: "AI-Driven Software Development Across the Full Lifecycle"
- Single "Get Started" button → `/docs/intro`
- No cards, no categories, no featured content

## Microsoft Learn Design Analysis

### Three Page Templates

| Template | MS Learn Class | Layout | Docusaurus Equivalent |
|----------|---------------|--------|----------------------|
| **Hub** (landing) | `layout-single hub` | Full-width, no sidebar | Custom `src/pages/index.tsx` |
| **Conceptual** (content) | `layout-holy-grail conceptual` | 3-column (sidebar + content + TOC) | Default docs layout |
| **Browse** (catalog) | `layout-single contentbrowserpage` | Full-width JS catalog | Custom React page |

### Hub Page Pattern (Target: `/azure/architecture/`)

1. **Hero Section**: Azure blue background (`#0078D4`) with subtle "+" cross pattern, white text, `title is-1` heading, description paragraph
2. **Highlighted Content Cards**: 3-across grid (`column is-4`) of icon cards with 64×64 SVG, category supertitle, linked title
3. **Product Directory**: 4-across grid (`column is-3-desktop`) of box cards with 48×48 icon, H3 title, bulleted link lists
4. **Technology Areas**: Card sections with Docon topic icons per link
5. **Container**: `uhf-container` (max-width centered content)

### Conceptual Page Pattern (Target: `/azure/architecture/guide/`)

1. **Breadcrumbs**: Custom `<bread-crumbs>` web component with overflow popover
2. **Left sidebar**: Sticky TOC navigation, collapsible on mobile
3. **Content area**: Standard markdown with `<div class="content">` wrapper
4. **Right sidebar**: "In this article" TOC (desktop), feedback section, recommendations
5. **Article metadata**: Last updated date, contributors, edit link

### Visual Design System

#### Colors
- Primary: `#0078D4` (Azure Blue)
- Hero background: `has-background-azure` with pattern overlay
- Text on blue: `has-text-azure-invert` (white)
- Content text: `#1a1a1a` (near-black)
- Secondary text: `#525252`
- Dark mode: inverted palette

#### Typography
- Headings: `title is-1` through `is-6` (Bulma scale)
- Body: Segoe UI, system-ui fallback
- Small text: `font-size-sm` utility class
- Responsive headings: `is-responsive` modifier

#### Spacing
- Utility-first: `padding-block-sm`, `margin-top-none`, `gap-xxs`
- Container: max-width centered with horizontal padding

#### Cards
- **Icon Card**: 64×64 icon + supertitle + linked title (highlighted content)
- **Box Card**: bordered box with 48×48 icon + H3 + link list (product directory)
- **Full-height**: `is-full-height` ensures equal card heights in grid
- **Stretched link**: `stretched-link` makes entire card clickable

#### Responsive Breakpoints
| Name | Width | CSS Pattern |
|------|-------|-------------|
| Mobile | <768px | Default |
| Tablet | ≥768px | `*-tablet` classes |
| Desktop | ≥1088px | `*-desktop` classes |

## Docusaurus Capabilities Mapping

### Built-in Features That Map to MS Learn

| MS Learn Feature | Docusaurus Solution | Status |
|-----------------|--------------------|---------| 
| Left sidebar TOC | Built-in sidebar | ✅ Ready |
| Right "In this article" | Built-in TOC component | ✅ Ready |
| Breadcrumbs | Built-in (enabled by default) | ✅ Ready |
| Dark/light mode | `colorMode` config | ✅ Ready |
| Last updated time | `showLastUpdateTime` option | ✅ Ready |
| Category index pages | `generated-index` + `DocCardList` | ✅ Ready |
| Auto-generated sidebar | Autogenerated from directory | ✅ In use |
| Collapsible sidebar | `hideable: true` option | ✅ Available |

### Features Requiring Custom Work

| MS Learn Feature | Docusaurus Approach | Effort |
|-----------------|--------------------|---------| 
| Hub landing page | Custom React page in `src/pages/` | Medium |
| Icon card grid | Custom React component | Medium |
| Box card with link lists | Custom React component | Medium |
| Hero with pattern background | CSS + custom component | Low |
| Product directory sections | Custom React component | Medium |
| Utility CSS classes | Custom stylesheet or Tailwind | Low-Medium |
| Docon-style icons | SVG sprite or icon library | Low |
| "Ask Learn" chat | Out of scope (AI feature) | N/A |
| Focus/reader mode | Out of scope | N/A |
| Content browser/catalog | Custom React + search | High |

### Swizzling Opportunities

| Component | Action | Purpose |
|-----------|--------|---------|
| `DocCardList` | Eject | Customize card rendering to match MS Learn style |
| `Footer` | Wrap or Eject | Add MS Learn-style footer layout |
| `Navbar` | Wrap | Add secondary nav bar |
| `DocBreadcrumbs` | Wrap | Style to match MS Learn |
| `TOC` | Wrap | Add "In this article" heading style |
| `MDXComponents` | Wrap | Add custom callout/alert styling |

## Prior Learnings (From Plans 001-003)

### PL-01: No Microsoft Docusaurus Theme Package Exists
**Source**: Plan 003 spec, Finding #06
**Action**: All theming must be custom CSS + swizzling. Do not search for pre-built theme packages.

### PL-02: Fluent Color Palette Already Applied
**Source**: Plan 003, T004
**Action**: Extend existing `custom.css` rather than replacing. Colors `#0078D4` / `#4DA3E5` are already set.

### PL-03: Mermaid Dual-Config Gotcha
**Source**: Plan 003 spec, Finding #07
**Action**: Do not remove either Mermaid config entry when modifying `docusaurus.config.js`.

### PL-04: onBrokenLinks: 'throw' Is Active
**Source**: Plan 003 spec, Finding #05
**Action**: All new internal links must resolve at build time. Test builds after adding card links.

### PL-07: baseUrl Must Be '/hve-core/'
**Source**: Plan 003 spec, Finding #08
**Action**: All asset paths (images, SVGs for cards) must work under this base URL.

### PL-08: 5-10 Minute Page Length Target
**Source**: Plan 002 educational design research
**Action**: New landing/hub pages should be concise. Card-based navigation reduces page length.

### PL-13: Landing Page Decision Was "Simple Hero"
**Source**: Plan 003 spec, Q4
**Action**: This was the decision for the initial site. The new plan explicitly supersedes this with a richer hub page.

### PL-14: Sidebar Reflects Learning Progression
**Source**: Plan 002 educational design
**Action**: Maintain user-journey-based navigation even as visual design changes.

## Critical Discoveries

### 🚨 CD-01: Three Distinct Page Types Needed
The MS Learn Architecture Center uses three fundamentally different layouts. Docusaurus handles the "Conceptual" (docs) layout natively but requires custom React pages for "Hub" and "Browse" layouts. The hub landing page is the most impactful change.

### 🚨 CD-02: Card Components Are the Core Visual Differentiator
MS Learn's visual identity is driven by its card grid patterns — icon cards, box cards, and link-list cards. Docusaurus has `DocCardList` but it doesn't match the MS Learn aesthetic. Custom card components are the single highest-impact investment.

### 🚨 CD-03: CSS Variable Coverage Is Excellent
Docusaurus exposes 50+ `--ifm-*` CSS variables. Most of the MS Learn color palette, typography, and spacing can be achieved through CSS variable overrides alone, without swizzling.

### 🚨 CD-04: Hub-and-Spoke Navigation Is Achievable
The pattern of landing page → category pages → content is directly supported by Docusaurus through `src/pages/index.tsx` → `generated-index` categories → doc pages. No architectural changes needed.

### 🚨 CD-05: Content Browser Page Is High-Effort, Low-Priority
The MS Learn browse/catalog page with faceted search is entirely JS-rendered and would require significant custom development. This should be deferred unless explicitly needed.

## Modification Considerations

### ✅ Safe to Modify
1. `src/css/custom.css` — Add utility classes, card styles, hero patterns
2. `src/pages/index.js` — Replace with rich hub page (TypeScript recommended)
3. `src/pages/index.module.css` — Expand with card grid styles
4. `docusaurus.config.js` — Navbar, footer, sidebar options
5. New `src/components/` — Card, Hero, and grid components

### ⚠️ Modify with Caution
1. `sidebars.js` — Adding `generated-index` category links changes URL structure
2. Swizzled components — Must be maintained across Docusaurus upgrades
3. `_category_.json` files — Adding `link.type: 'generated-index'` creates new routes

### 🚫 Avoid
1. Building a full custom theme (100+ components to maintain)
2. Ejecting core layout components (high maintenance burden)
3. Adding Tailwind CSS (conflicts with Infima framework)

## Recommendations

### Implementation Approach
1. **Phase 1**: CSS-first — extend `custom.css` with MS Learn utility classes, card styles, and hero patterns
2. **Phase 2**: Components — build `HeroSection`, `IconCard`, `BoxCard`, `CardGrid` React components
3. **Phase 3**: Landing page — rebuild `src/pages/index.tsx` as a MS Learn-style hub with card grids
4. **Phase 4**: Category pages — add `generated-index` with custom `DocCardList` rendering
5. **Phase 5**: Polish — breadcrumb styling, footer layout, responsive refinement

### Technology Choices
- **No Tailwind** — use Infima variables + custom utility classes
- **No pre-built theme** — extend classic theme via CSS + swizzling
- **TypeScript for components** — better DX for React card components
- **CSS Modules for components** — scoped styles avoid global conflicts
- **SVG icons** — inline SVGs or a small icon component library (not Docon font)

## External Research Opportunities

### Research Opportunity 1: Docusaurus DocCardList Swizzling Patterns
**Why Needed**: Need to understand exactly how to customize the auto-generated category cards to match MS Learn's icon card pattern
**Impact**: Determines whether to swizzle `DocCardList` or build entirely custom category pages

### Research Opportunity 2: CSS Pattern Backgrounds in Docusaurus
**Why Needed**: MS Learn uses a subtle "+" cross pattern SVG overlay on hero sections. Need to verify this works with Docusaurus' build pipeline and dark mode
**Impact**: Visual fidelity of the hero section

---

**Research Complete**: 2025-07-18
**Report Location**: docs/plans/004-ms-learn-theme/research-dossier.md
