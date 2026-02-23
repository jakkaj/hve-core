# Microsoft Learn Theme for HVE Core Documentation Site

**Mode**: Full
**File Management**: Legacy

📚 This specification incorporates findings from research-dossier.md

✅ **Research Opportunities Resolved**
Both originally unresolved research topics were addressed during plan-2-clarify:
- Docusaurus DocCardList Swizzling Patterns → resolved: `generated-index` with CSS restyling (Q6)
- CSS Pattern Backgrounds in Docusaurus → resolved: SVG pattern via CSS custom property (Q8)

## Research Context

The plan-1a-explore research produced 55+ findings across 4 subagents, with 15 prior learnings from plans 001-003. Key takeaways:

- **Components affected**: `src/pages/index.js`, `src/css/custom.css`, `src/pages/index.module.css`, `docusaurus.config.js`, `sidebars.js`, plus new `src/components/` directory
- **Critical dependencies**: Docusaurus 3.9.2, React 19, Infima CSS framework (50+ `--ifm-*` variables), Mermaid (dual-config requirement)
- **Modification risks**: Swizzled components require maintenance across Docusaurus upgrades; `generated-index` category links change URL structure; Tailwind CSS conflicts with Infima and must be avoided
- **Link**: See `research-dossier.md` for full analysis

## Summary

Redesign the HVE Core Docusaurus documentation site to visually match the Microsoft Learn Azure Architecture Center (`learn.microsoft.com/en-us/azure/architecture/`). The redesign introduces a rich hub-style landing page with card grids and icon-based navigation, restyles content pages to follow the MS Learn conceptual page pattern (breadcrumbs, article metadata, styled TOC), and expands the site's content structure with new categories. The site remains on Docusaurus 3.9.2 deployed to GitHub Pages.

**Why**: The current site has a minimal hero landing page with a single "Get Started" button. A MS Learn-inspired design communicates professionalism, makes content discoverable through card-based navigation, and aligns visually with the Microsoft ecosystem where HVE Core's users operate. Card grids surface content that visitors would otherwise need to browse sidebar navigation to find.

## Goals

1. **Hub landing page**: Replace the simple hero with a MS Learn Architecture Center-style hub page featuring a blue gradient hero with "+" pattern overlay, icon card grids for key content areas, and box cards with link lists for deeper navigation
2. **Conceptual page restyling**: Restyle docs pages to match MS Learn's conceptual layout with breadcrumbs, article metadata (date, contributors), and an "In this article" right-side TOC
3. **Content expansion**: Structure the site around 6 categories: Getting Started, Agents & Prompts, Instructions & Skills, Workflows, Design Thinking, and Templates & Examples
4. **Custom SVG icons**: Create AI-generated 64×64 SVG icons for each content category, used on hub cards and category index pages
5. **MS Learn color palette**: Adopt the Azure Architecture Center's three-blue system (`#005ba1`, `#0078d4`, `#0f6cbd`), departing from the current single `#0078D4` primary — see Color Palette Reference
6. **Full dark mode**: Implement polished dark mode with carefully tuned card backgrounds, borders, and text colors matching MS Learn's dark theme
7. **Rich footer**: Add MS Learn-style footer with organized link columns (documentation, community, resources)
8. **Updated navbar**: Extend the current navbar (Home, Docs) with items for the new content categories
9. **Mobile responsiveness**: Ensure all new components are responsive with desktop-first design, cards stacking gracefully on mobile
10. **Safe upgrade path**: Use component wrapping (not ejection) for Docusaurus customizations to minimize maintenance burden during future upgrades

## Non-Goals

1. **Browse/catalog page**: The MS Learn Content Browser page with faceted search and filtering is excluded (high effort, low priority per CD-05)
2. **Full custom Docusaurus theme**: Not building a standalone theme package. All customization uses CSS variables, wrapped components, and custom React pages
3. **Tailwind CSS**: Conflicts with Infima framework (PL-01 research finding). Using Infima variables + custom utility classes instead
4. **MS Learn interactive features**: "Ask Learn" AI chat, focus/reader mode, and other interactive features are out of scope
5. **Docon icon font**: Using inline SVGs rather than replicating Microsoft's proprietary icon font system
6. **Content authoring**: This spec covers visual design and site structure, not writing new documentation content for the expanded categories
7. **Search upgrade**: Keeping Docusaurus built-in search; no Algolia DocSearch integration
8. **Hosting migration**: Staying on GitHub Pages; no move to Azure Static Web Apps
9. **Pixel-perfect replication**: The goal is "close to pixel-perfect" — pushing as far as practical within Docusaurus constraints, but accepting that exact replication of MS Learn's proprietary build system is impractical

## Complexity

- **Score**: CS-3 (medium)
- **Breakdown**: S=2, I=0, D=0, N=1, F=1, T=1
  - Surface Area (S=2): Cross-cutting changes spanning CSS, React components, config files, content structure, and new icon assets
  - Integration (I=0): Entirely internal — Docusaurus, custom CSS, React components, no external services
  - Data/State (D=0): No database schemas or migrations; static site content only
  - Novelty (N=1): Requirements are well-defined through 20 clarifying questions and a concrete MS Learn reference, but some visual interpretation needed for "close to pixel-perfect" fidelity
  - Non-Functional (F=1): Responsive design across breakpoints, dark mode parity, visual consistency, and build-time link validation
  - Testing/Rollout (T=1): Visual verification required across light/dark mode, mobile/desktop breakpoints, and build integrity checks
- **Confidence**: 0.82
- **Assumptions**:
  - Docusaurus 3.9.2 CSS variable system covers the majority of theming needs without ejecting core components
  - Wrapping (not ejecting) components provides sufficient customization for breadcrumbs, TOC, and footer
  - AI-generated SVG icons will be acceptable quality without professional designer involvement
  - The Azure Architecture Center teal/blue palette can be extracted from the live site and applied consistently
  - Existing content (5 pages) maps cleanly into the new 6-category structure
- **Dependencies**:
  - Git worktree at `../hve-core-docs-pr/` on `docs/docusaurus-site` branch must be available for implementation
  - GitHub Pages deployment pipeline must remain functional throughout changes
- **Risks**:
  - Component wrapping may not provide enough control for some MS Learn patterns, forcing selective ejection
  - Dark mode tuning could be time-intensive if MS Learn's dark palette uses subtle color shifts not covered by CSS variable inversion
  - New category structure with `generated-index` links changes URL paths, potentially breaking existing external references
  - AI-generated SVG icons may require multiple iterations to achieve consistent style
- **Phases**:
  1. Hub landing page (hero + card components + grid layout)
  2. Conceptual page restyling (breadcrumbs, TOC, metadata, color palette)
  3. Content restructuring (new categories, navbar, footer, icons)

## Acceptance Criteria

1. **Hub hero section**: The landing page displays a blue gradient hero with a "+" cross-hatch pattern overlay, white title text ("HVE Core"), a subtitle, and navigation to content categories
2. **Icon card grid**: The hub page shows a 3-across responsive grid of icon cards, each with a 64×64 SVG icon, category supertitle, and linked title navigating to the category index
3. **Box card section**: The hub page includes a section of box-style cards with link lists for deeper navigation into content areas
4. **Category count**: Six categories are navigable from the hub: Getting Started, Agents & Prompts, Instructions & Skills, Workflows, Design Thinking, and Templates & Examples
5. **Breadcrumbs**: Every docs page shows breadcrumb navigation at the top matching MS Learn's hierarchical pattern
6. **Right-side TOC**: Docs pages display a styled "In this article" table of contents on the right side, visually matching MS Learn's TOC treatment
7. **Article metadata**: Docs pages show last-updated date and contributor information below the page title
8. **Color palette**: The site uses the extracted Azure Architecture Center three-blue system (`#005ba1` hero, `#0078d4` cards, `#0f6cbd` primary) consistently across hero, cards, links, and accents in both light and dark modes — see Color Palette Reference
9. **Dark mode**: All new components (hero, cards, footer, breadcrumbs) render correctly in dark mode with appropriate background, border, and text color adjustments
10. **Footer**: The footer displays organized link columns (documentation, community, resources) matching MS Learn's footer layout
11. **Navbar**: The top navigation includes Home, Docs, and items for key content categories
12. **Responsive cards**: Card grids reflow from 3-across (desktop) to 2-across (tablet) to single-column (mobile) without layout breakage
13. **SVG icons**: Each of the 6 categories has a unique, consistent-style SVG icon rendered at 64×64px
14. **Build integrity**: `npm run build` completes without errors, and `onBrokenLinks: 'throw'` catches no broken internal links
15. **Component wrapping**: Customized Docusaurus components use the wrap strategy (not eject) except where wrapping is demonstrably insufficient
16. **baseUrl compatibility**: All assets, icons, and internal links function correctly under `baseUrl: '/hve-core/'`
17. **Mermaid preservation**: Mermaid diagram rendering continues to work with both `markdown.mermaid: true` and `themes: ['@docusaurus/theme-mermaid']` intact

## Risks & Assumptions

### Risks

1. **Wrap vs Eject tension**: Some MS Learn patterns (complex footer, breadcrumb popover) may require ejecting components despite the preference for wrapping, creating upgrade maintenance burden
2. **Color palette extraction**: The Azure Architecture Center teal/blue palette needs to be extracted from the live site; CSS values may change over time
3. **Icon consistency**: AI-generated SVG icons may lack visual consistency across the 6 categories, requiring manual curation or multiple generation passes
4. **URL stability**: Adding `generated-index` to categories creates new URL paths; any external links to current paths need redirect consideration
5. **Dark mode complexity**: MS Learn uses many subtle color adjustments in dark mode (card shadows, border opacity, text hierarchy) that may require significant CSS tuning beyond variable inversion
6. **Content gap**: The 6 proposed categories need content to populate them; empty categories on the hub page degrade the user experience. **Mitigated**: Stub content with real introductions will be created for all 6 categories at launch (see Clarifications Q7)

### Assumptions

1. The Docusaurus Infima CSS variable system is stable and will continue to be supported in future Docusaurus versions
2. GitHub Pages handles the static site output without special configuration beyond existing `baseUrl` settings
3. The two-directory workflow (plans on `jordo-explore`, implementation in worktree on `docs/docusaurus-site`) remains the active development model
4. Users primarily access the site on desktop browsers; mobile is a secondary concern
5. The MS Learn Architecture Center's current design (as of February 2026) is the target reference; future MS Learn redesigns do not retroactively change requirements
6. Category placeholder content is acceptable for initial launch; full content authoring is a separate effort

## Open Questions

1. ~~[RESOLVED: Color palette extracted from live Azure Architecture Center CSS]~~ — See Color Palette Reference section and Clarifications Q8
2. ~~[RESOLVED: Category pages use Docusaurus `generated-index` auto-cards with CSS restyling]~~ — See Clarifications Q6
3. ~~[RESOLVED: Stub content for all 6 categories with real introductions]~~ — See Clarifications Q7
4. ~~[RESOLVED: Hero pattern uses SVG background image applied via CSS custom property]~~ — MS Learn uses `background-image-pattern-pixie-sticks` SVG via `--background-image-pattern` CSS variable; we will create a similar "+" cross pattern SVG

## Color Palette Reference

Extracted from the live Azure Architecture Center CSS (`learn.microsoft.com`). This is the authoritative palette for the redesign.

### Hero & Banner Colors

| Token | Value | Usage |
|-------|-------|-------|
| Hero background | `#005ba1` | Primary hero/banner azure (darker than standard Azure blue) |
| Hero gradient | `linear-gradient(174.2deg, #005ba1 0%, #004d88 66.72%, #003e6e)` | Hero section gradient |
| Hero text | `#ffffff` | White text on hero |
| Card accent | `#0078d4` | Standard Azure blue, used for card-level accents |
| Hero invert gradient | `linear-gradient(174.2deg, #fff 0%, #e6e6e6 66.72%, #ccc)` | Inverted hero variant |

### Theme Primary Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--theme-primary-base` | `#0f6cbd` | Primary interactive color |
| `--theme-primary-hover` | `#115ea3` | Primary hover state |
| `--theme-primary-active` | `#0c3b5e` | Primary active/pressed state |
| `--theme-primary-dark` | `#115ea3` | Primary dark variant |
| `--theme-primary-background` | `#ebf3fc` | Light primary background |
| `--theme-primary-invert` | `#fff` | White on primary |

### Link Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--theme-hyperlink` | `#0065b3` | Default link color |
| `--theme-visited` | `#624991` | Visited link (purple) |

### Text & Background Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--theme-text` | `#161616` | Body text |
| `--theme-text-subtle` | `#505050` | Secondary/subtle text |
| `--theme-body-background` | `#fff` | Page background |
| `--theme-body-background-medium` | `#f2f2f2` | Medium background (sections) |
| `--theme-card-background` | `#fff` | Card background |
| `--theme-border` | `#e6e6e6` | Border color |
| `--theme-body-background-learn` | `#e8e6df` | Learn footer background (warm gray) |

### Semantic Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--theme-success-base` | `#107c10` | Success green |
| `--theme-danger-base` | `#bc2f32` | Danger red |

### Three-Blue System

The Architecture Center uses three distinct blues with different roles:

1. `#005ba1` — Hero/banner azure (darker, high-impact areas)
2. `#0078d4` — Card accent azure (standard Azure blue, interactive elements)
3. `#0f6cbd` — Theme primary (buttons, links, form elements)

### Dark Mode

Dark mode CSS variables were not found in the main CSS file. MS Learn loads dark theme via JavaScript theme switching or a separate stylesheet. Dark mode colors will be derived from the light palette using established contrast ratios and Docusaurus `[data-theme='dark']` selectors.

### Hero Pattern

The hero uses a `--background-image-pattern` CSS variable referencing an SVG named `background-image-pattern-pixie-sticks` — a repeating plus/cross pattern. We will create a similar lightweight SVG pattern for the Docusaurus hero.

## ADR Seeds (Optional)

### ADR-01: Card Component Architecture

- **Decision Drivers**: Need for MS Learn-style cards (icon cards, box cards); must work within Docusaurus/Infima constraints; must support dark mode; should be reusable across hub and category pages
- **Candidate Alternatives**:
  - A: Build custom React components with CSS Modules (scoped styles, full control)
  - B: Extend Docusaurus `DocCardList` via swizzle-wrap (less code, tighter coupling)
  - C: Build a generic card system with variant props (most reusable, highest upfront effort)
- **Stakeholders**: Documentation maintainers, future contributors

### ADR-02: Color Palette Strategy

- **Decision Drivers**: User chose Azure Architecture Center teal/blue over current Microsoft Blue; need consistency across 50+ Infima CSS variables; dark mode must be polished
- **Candidate Alternatives**:
  - A: Extract exact hex values from MS Learn CSS and map to Infima variables
  - B: Use a curated subset of values inspired by Architecture Center but tuned for Docusaurus
  - C: Use a Fluent UI 2 design token set as the source of truth
- **Stakeholders**: Visual design consistency, brand alignment

### ADR-03: SVG Icon Management

- **Decision Drivers**: 6 category icons needed at 64×64px; must work in both light and dark mode; should be maintainable by non-designers
- **Candidate Alternatives**:
  - A: Inline SVGs in React components (most control, largest bundle)
  - B: SVG sprite sheet (single request, CSS-controllable fill)
  - C: Individual SVG files loaded via `<img>` tags (simplest, no fill control)
- **Stakeholders**: Site performance, maintainability

## Testing Strategy

- **Approach**: Hybrid — Lightweight for CSS/config changes, TAD for React components
- **Rationale**: CSS theming and config changes are verified by build success and visual inspection. React card and layout components benefit from test-as-documentation to capture expected rendering behavior and prop contracts
- **Focus Areas**:
  - Build integrity (`npm run build` passes, `onBrokenLinks: 'throw'`)
  - React component prop validation and rendering (TAD: IconCard, BoxCard, CardGrid, HeroSection)
  - Responsive breakpoint behavior documented through TAD test cases
  - Dark mode class toggling behavior for custom components
- **Excluded**:
  - CSS visual regression testing (manual visual checks sufficient)
  - Docusaurus built-in component behavior (not our code)
  - Content correctness (separate from theme work)
- **Mock Usage**: Avoid mocks entirely — test components with real Docusaurus rendering and fixtures. No mocking of CSS, context providers, or Docusaurus internals
- **TAD-Specific**: Scratch→Promote workflow for React component tests. Test Doc comment blocks required for promoted tests. Promotion heuristic: Critical (card grid rendering), Opaque (dark mode class logic), Regression (responsive breakpoint behavior)

## Documentation Strategy

- **Location**: No new documentation
- **Rationale**: The documentation site itself is the deliverable. Component code uses JSDoc comments. Theme structure is self-documenting through file organization and CSS variable naming
- **Maintenance**: Future theme changes follow the same CSS variable and component patterns established by this work

## External Research

- **Incorporated**: None (no external-research/ directory found)
- **Key Findings**: N/A
- **Applied To**: N/A

## Unresolved Research

- **Topics**:
  1. ~~Docusaurus DocCardList Swizzling Patterns~~ — Resolved: Using `generated-index` with CSS restyling (Q6)
  2. ~~CSS Pattern Backgrounds in Docusaurus~~ — Resolved: SVG pattern via CSS custom property (Q8)
- **Impact**: Both topics resolved during plan-2-clarify
- **Recommendation**: No further research needed before plan-3-architect

## Workshop Opportunities

| Topic | Type | Why Workshop | Key Questions |
|-------|------|--------------|---------------|
| Card Component System | CLI Flow | Multiple card variants needed (icon cards, box cards, link-list cards) with different layouts, and the choice between extending DocCardList vs building custom affects all category pages | 1. What card variants are needed? 2. Should cards share a base component? 3. How do cards adapt between hub and category pages? 4. What data structure drives card content? |
| Hub Page Layout Architecture | Data Model | The hub page composition (hero → sections → card grids) needs a clear content model so sections can be reordered, added, or removed without layout breakage | 1. Should sections be config-driven or hardcoded? 2. How are section titles, descriptions, and card lists structured? 3. Should sections support different card types? 4. How does the layout degrade on mobile? |
| Color Palette & Dark Mode System | Integration Pattern | Replacing the primary color palette touches 50+ CSS variables; dark mode requires a coordinated second palette, not just color inversion | 1. Which Infima variables need overriding? 2. How does MS Learn handle dark mode card backgrounds? 3. Should we use CSS custom properties for the palette or Infima variable overrides? 4. How do hero and footer colors relate to content area colors? |

## Clarifications

### Session 2026-02-19

**Q1: Workflow Mode** — **Full** (CS-3 feature, multi-phase plan with all gates). Rationale: Cross-cutting changes spanning CSS, React, config, and content structure warrant full planning rigor.

**Q2: Testing Strategy** — **Hybrid** (lightweight for CSS/config, TAD for React components). Rationale: CSS changes verified by build + visual inspection; React card/layout components benefit from test-as-documentation. See Testing Strategy section.

**Q3: Mock Usage** — **Avoid mocks entirely**. Rationale: Test components with real Docusaurus rendering and fixtures. No mocking of CSS, context providers, or Docusaurus internals.

**Q4: Documentation Strategy** — **No new documentation**. Rationale: The documentation site itself is the deliverable. Component code uses JSDoc. Theme structure is self-documenting through file organization and CSS variable naming.

**Q5: File Management** — **Legacy** (Docusaurus conventions). Rationale: Docusaurus has its own conventions for file placement (`src/components/`, `src/css/`, `src/pages/`); PlanPak folders would fight the framework.

**Q6: Category Pages** — **Docusaurus `generated-index` with CSS restyling**. Use Docusaurus's built-in `generated-index` auto-cards for category pages, then restyle the generated cards with custom CSS to match the MS Learn visual treatment. Avoids building fully custom React category pages while achieving the desired look. Affects AC#2 and AC#4.

**Q7: Placeholder Content** — **Stub content for all 6 categories with real introductions**. Create stub/placeholder pages for all 6 categories (Getting Started, Agents & Prompts, Instructions & Skills, Workflows, Design Thinking, Templates & Examples) with real introductory text, not lorem ipsum. Mitigates Risk #6 (content gap). Content authoring remains a separate effort per Non-Goal #6.

**Q8: Color Palette** — **Adopt the full Architecture Center palette exactly**. The complete palette was extracted from live CSS at `learn.microsoft.com`. Three distinct blues: `#005ba1` (hero/banner), `#0078d4` (card accents), `#0f6cbd` (theme primary). Dark mode will be derived from the light palette. Hero pattern uses "pixie-sticks" SVG via CSS custom property. See Color Palette Reference section for full hex values.
