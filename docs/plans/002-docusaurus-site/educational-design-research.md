# Research Dossier: Educational Docusaurus Site Design Principles

**Generated**: 2026-02-18
**Source**: Perplexity Deep Research (56 citations)
**Plan**: 002-docusaurus-site
**Purpose**: Codify best practices for educational documentation into actionable tenets for the `docusaurus-edits.instructions.md` file and guide content authoring across all phases.

---

## Executive Summary

Research across cognitive load theory, progressive disclosure patterns, developer education best practices, and leading documentation sites (React, Astro, Svelte, Remix, Docusaurus itself) reveals 10 actionable principles for building educational documentation. The key insight: documentation organized around **learning journeys** significantly outperforms documentation organized around **feature catalogs**. Our site already follows many of these principles (concept-before-tool, honest gaps, persona routing) but has opportunities to improve progressive disclosure, page length management, and visual-to-text ratio.

## The 10 Principles

### 1. Separate Learning Journeys from Reference Lookups

Create explicit sidebar sections distinguishing conceptual learning ("what is this and why does it matter?"), practical implementation ("how do I use this?"), and technical reference ("what are the specific parameters?"). Allow readers to navigate directly to their current need.

**Our status**: ✅ Already doing this. Getting Started = conceptual, Shape/Build/Ship = practical journeys, Reference = lookup. The 4-segment structure maps cleanly to this principle.

### 2. Implement Progressive Disclosure Systematically

Every page should reveal essential information immediately, provide intermediate detail in expandable or linked sections, and offer comprehensive reference without overwhelming newcomers. Essential information should always be visible; detail should be discoverable but not mandatory.

**Our status**: ⚠️ Partial. Our pages present information linearly without layering. The backlog-management page (Phase 2B) will be the first real test — the DYK decision to split concept sections from the reference section at the bottom is exactly this principle in action. We should consider `<details>` blocks or tabs for advanced content on longer pages.

### 3. Respect Cognitive Load Limits

Pages should be consumable in **5-10 minutes of focused reading**. When a section exceeds this, break it into multiple pages. Every paragraph should communicate one core idea. Complex concepts need visual support, concrete examples, and multiple explanations.

**Our status**: ⚠️ Needs attention. `value-delivery-loop.md` at ~160 lines with 6 phase sections + 3 framework mapping sections may exceed the 10-minute threshold. The SPACE × Phase matrix table alone is dense. Consider whether the framework mappings (DORA, SPACE, ESSP) should be a separate page or at minimum clearly sectioned so readers can stop at the phase descriptions.

### 4. Explain Why Before How

Every technical section should begin by explaining why the reader should care. Readers who understand purpose implement knowledge correctly; readers following mechanical instructions do not.

**Our status**: ✅ Strong. Every page opens with a "why this matters" framing before showing tools. The empathy moments (design thinking addition) reinforce this. This is our strongest principle.

### 5. Use Consistent Voice and Tone

Maintain "confident clarity": authority without academic jargon, practical without being shallow. Active voice, concrete language, abstract concepts grounded in examples.

**Our status**: ✅ Mostly good. The recent tone pass (removing "you do not need most of them", "thinnest segment", "gaps") improved this. Watch for creeping hedging language ("it should be noted that...") in future phases.

### 6. Leverage Docusaurus Features Purposefully

Admonitions for genuinely important asides, not for content that belongs in main text. Tabs for context-specific variations. MDX for interactive visuals. Sidebar hierarchy reflecting learning progression, not code structure.

**Our status**: ⚠️ Partial. Admonition usage is restrained (good). We deferred tabs on quick-start (acceptable). Sidebar reflects learning progression (good). We have zero interactive MDX components — all diagrams are static Mermaid. This is fine for Phase 2 but worth considering for the RPI walkthrough in Phase 2C.

### 7. Design Navigation to Reduce Disorientation

Breadcrumbs always visible. Cross-links connect related concepts. Persona-based navigation for complex documentation. Search index optimization.

**Our status**: ✅ Breadcrumbs are built-in (Docusaurus default). Persona-based navigation is the quick-start decision tree. Cross-links within Getting Started are solid. Search optimization is not yet addressed (Phase 4 concern — `keywords` frontmatter).

### 8. Maintain Living Documentation

Documentation reflects current reality. Versioning for different releases. Remove outdated content. The static heatmap TODO comment we added is exactly this principle — flagging content that could become stale.

**Our status**: ✅ Addressed through the TODO comment pattern and the instructions file. No versioning needed yet (single version).

### 9. Design for Multiple Learning Styles

Text-based explanations, visual diagrams, and interactive examples. Sequential narratives and direct-jump reference. Accommodate readers who read linearly and readers who search.

**Our status**: ⚠️ Partial. We have text + Mermaid diagrams (good). No interactive examples (acceptable for now). The SPACE × Phase matrix table serves visual learners well. We could improve by ensuring every major concept has both a diagram AND a text explanation (not one or the other).

### 10. Validate Through Real Users

Have representatives of each persona review documentation. Identify struggles and iterate. The "Was this page helpful?" pattern from the design thinking suggestions connects here.

**Our status**: ❌ Not yet addressed. Deferred to Phase 4 / future enhancement. The contribution path per page (from design thinking suggestion #5) is the first step.

---

## Impact Assessment: What Needs Changing

### Already-Written Content (Phases 1-2)

| Page | Issue | Principle | Severity | Action |
|---|---|---|---|---|
| `value-delivery-loop.md` | ~160 lines, 6 phases + 3 framework sections — may exceed 10-min read | P3 (cognitive load) | Medium | Consider moving DORA/SPACE/ESSP mapping sections to a separate "Measurement Frameworks" page, or add a clear "stop here if you want the overview" break after the 6 phases |
| `how-it-works.md` | 9 sections on one page covering 4-layer model + handoffs + /clear + artifact bus + ChatGPT comparison | P3 (cognitive load) | Low | Currently ~153 lines, borderline acceptable. Monitor as content expands |
| `quick-start.md` | No `keywords` frontmatter for search optimization | P7 (navigation) | Low | Add `keywords` array to frontmatter in Phase 4 integration |
| All pages | No `<details>` blocks for advanced content | P2 (progressive disclosure) | Low | Not needed on current pages — they're appropriately scoped. Apply when writing longer pages (backlog-management, rpi-workflow) |
| `intro.md` | Coverage heatmap is text-only | P9 (learning styles) | Low | Acceptable — heatmap serves as a quick visual scan. A Mermaid version would be heavier and less scannable |

### Upcoming Content (Phases 2B-2D)

| Phase | Page | Principle to Watch | Recommendation |
|---|---|---|---|
| 2B | `backlog-management.md` | P2, P3 | Apply the DYK concept/reference split. If page exceeds ~200 lines, consider breaking the autonomy model and handoff contract into expandable `<details>` sections |
| 2C | `rpi-workflow.md` | P2, P3, P9 | This is the "crown jewel" page. It needs multiple learning paths: a 5-minute overview for skimmers, a detailed walkthrough for learners, and a reference section for practitioners. Consider tabs for strict vs autonomous modes |
| 2C | `rpi-in-practice.md` | P3, P9 | Full walkthrough with code blocks. This page will naturally be long. Use clear phase headings so readers can jump to the phase they're interested in |
| 2C | `coding-standards.md` | P2 | The language standards list could use tabs (one tab per language) rather than a long sequential list |
| 2D | `all-artifacts.md` | P1, P7 | Pure reference page — search optimization matters here. Add comprehensive `keywords` frontmatter |

### Instructions File Updates Needed

The `docusaurus-edits.instructions.md` should be updated with these additional conventions derived from the research:

1. **Page length guideline**: Aim for 5-10 minute read time (~100-200 lines of content excluding code blocks and diagrams). If a page exceeds this, consider splitting or using progressive disclosure patterns.
2. **One idea per paragraph**: Each paragraph communicates one core concept. If a paragraph requires re-reading, it's trying to do too much.
3. **Visual support rule**: Every major concept (defined as something that gets its own H2 heading) should have either a diagram, a table, a code example, or a concrete real-world scenario — not just prose.
4. **Search keywords**: Include `keywords` array in frontmatter for pages that serve as reference or entry points. Keywords should include terms users might search for, not just terms used on the page.
5. **Progressive disclosure pattern**: For advanced or detailed content within a page, use Docusaurus `<details>` blocks or link to separate reference pages. Essential information stays in the main flow; advanced detail is discoverable but not mandatory.

---

## Tenets for Content Authoring

These are the codified tenets for all future content, distilled from the 10 principles:

1. **Journey first, reference second**: Organize around what the reader needs to accomplish, not what features exist.
2. **Why before how**: Open every section with why this matters before explaining how it works.
3. **5-minute pages**: Keep pages to a 5-10 minute read. If longer, split or use progressive disclosure.
4. **Show, then tell**: Lead with a diagram, example, or scenario before explaining in prose. Let the visual carry the argument; text reinforces.
5. **One idea per paragraph**: Each paragraph earns its place by communicating one thing clearly.
6. **Confident clarity**: Write with authority but in plain language. No hedging, no jargon without explanation, no "it should be noted that."
7. **Admonitions are asides, not content**: Use :::note/:::tip for genuinely tangential information. If content belongs in the main narrative, put it in the main narrative.
8. **Link with purpose**: Cross-link when the reader is likely unfamiliar with the referenced concept. Do not link every mention of a term.
9. **Concrete before abstract**: Ground abstract concepts ("deployment frequency demonstrates organizational capability") in concrete examples ("a team deploying weekly vs hourly has fundamentally different feedback loops").
10. **Respect the reader's time**: If the reader can stop reading after section 2 and have gotten value, the page is well-structured. If they must read to the end for it to make sense, restructure.

---

## Citations

56 sources from Perplexity Deep Research including:
- Docusaurus official documentation (v3.0.1, sidebar, admonitions, versioning)
- Nielsen Norman Group (progressive disclosure, cognitive load, breadcrumbs)
- React.dev, Astro, Svelte, Remix documentation patterns
- DORA metrics official guides
- Cognitive load theory research
- Information architecture for developer portals
- UX progressive disclosure patterns
- Web accessibility guidelines (WCAG 2.1)

Full citation list available in raw research output.
