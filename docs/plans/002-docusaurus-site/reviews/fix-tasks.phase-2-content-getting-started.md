# Phase 2: Fix Tasks

**Review**: [review.phase-2-content-getting-started.md](./review.phase-2-content-getting-started.md)
**Date**: 2026-02-18

---

## Required (Blocking)

### FIX-1: Correct extension identifier in installation.md

**Finding**: QS-1 (CRITICAL)
**File**: `docs/docusaurus/docs/getting-started/installation.md`
**Line**: 27

The CLI install command uses `microsoft.hve-core` but the actual extension identifier is `ise-hve-essentials.hve-core` (publisher: `ise-hve-essentials`, name: `hve-core`).

**Patch**:

```diff
--- a/docs/docusaurus/docs/getting-started/installation.md
+++ b/docs/docusaurus/docs/getting-started/installation.md
@@ -24,7 +24,7 @@
 Alternatively, install from the command line:
 
 ```bash
-code --install-extension microsoft.hve-core
+code --install-extension ise-hve-essentials.hve-core
 ```
```

**Verification**: Run `npm run build` — should still pass with zero errors.

---

## Recommended (Non-Blocking)

### FIX-2: Test Mermaid diagrams in dark theme

**Finding**: QS-7 (MEDIUM)
**Files**: intro.md, value-delivery-loop.md, how-it-works.md, quick-start.md

Run `npm start`, toggle to dark theme in browser, and visually verify all 6 Mermaid diagrams. If fill colors produce poor contrast, either remove `style` directives or use theme-safe values.

### FIX-3: Reword intro.md Next Steps link

**Finding**: QS-6 (MEDIUM)
**File**: `docs/docusaurus/docs/intro.md`
**Line**: 89

**Patch**:

```diff
-Start with the [Getting Started](getting-started/value-delivery-loop) pages to understand the value delivery loop in depth, learn how HVE-Core's architecture works, and find the right entry point for your role.
+Start with the [Value Delivery Loop](getting-started/value-delivery-loop) to understand the delivery model in depth, then learn [how the architecture works](getting-started/how-it-works) and find the [right entry point for your role](getting-started/quick-start).
```

### FIX-4: Update plan task 2.10 convention count

**Finding**: LV-4.5 (LOW)
**File**: `docs/plans/002-docusaurus-site/docusaurus-site-plan.md`
**Line**: 164

Change "covers all 9 conventions" to "covers all 11 conventions" in the Success Criteria column.

### FIX-5: Populate dossier footnote stubs

**Finding**: LV-2.1 (MEDIUM)
**File**: `docs/plans/002-docusaurus-site/tasks/phase-2-content-getting-started/tasks.md`
**Lines**: 373-376

Add [^2] entry to Phase Footnote Stubs table and add [^2] reference to Notes column of file-modifying tasks.

### FIX-6: Add execution log links to plan

**Finding**: LV-4.3 (MEDIUM)
**File**: `docs/plans/002-docusaurus-site/docusaurus-site-plan.md`
**Lines**: 155-164

Update Log column for Phase 2 tasks from `-` to link to execution log.
