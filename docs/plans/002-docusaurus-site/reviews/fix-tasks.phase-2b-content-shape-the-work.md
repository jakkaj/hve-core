# Phase 2B: Fix Tasks

**Review**: [review.phase-2b-content-shape-the-work.md](./review.phase-2b-content-shape-the-work.md)
**Date**: 2026-02-18

---

## Required (Blocking)

### FIX-1: Add [^3] to Change Footnotes Ledger

**Finding**: F2 (HIGH)
**File**: `docs/plans/002-docusaurus-site/docusaurus-site-plan.md`
**Location**: End of file (after [^2])

Add a footnote entry summarizing Phase 2B:

```markdown
[^3]: Phase 2B implemented 2026-02-18. 7 tasks complete. 4 content pages (shape-the-work/) + category config + cross-links to Getting Started + instructions file conventions update. Build verified zero errors.
```

### FIX-2: Amend P2B-AC3 or uncheck

**Finding**: F1 (HIGH)
**File**: `docs/plans/002-docusaurus-site/docusaurus-site-plan.md`
**Line**: 219

The AC says "Cross-links to getting-started and build-the-work sections work" but build-the-work pages don't exist. Either:

**Option A** (recommended): Amend the AC text and keep checked:

```diff
-* [x] Cross-links to getting-started and build-the-work sections work
+* [x] Cross-links to getting-started sections work (build-the-work deferred to Phase 2C/4)
```

**Option B**: Uncheck and add footnote:

```diff
-* [x] Cross-links to getting-started and build-the-work sections work
+* [ ] Cross-links to getting-started and build-the-work sections work (getting-started ✅, build-the-work pages not yet created)
```

---

## Recommended (Non-Blocking)

### FIX-3: Log instructions file changes

**Finding**: F3 (MEDIUM)
**File**: `docs/plans/002-docusaurus-site/tasks/phase-2b-content-shape-the-work/tasks.md`
**Location**: Discoveries & Learnings table

Add entry:

```markdown
| 2026-02-18 | T002-T005 | insight | Content authoring revealed need for 4 new instruction conventions (page length, progressive disclosure, search keywords, cross-linking) | Updated docusaurus-edits.instructions.md with 4 new sections | educational-design-research.md |
```

### FIX-4: Use full ADO prompt name

**Finding**: F4 (MEDIUM)
**File**: `docs/docusaurus/docs/shape-the-work/ado-integration.md`

The prompt file is `ado-process-my-work-items-for-task-planning.prompt.md`. Either update the diagram and table to use the full slash-command name, or verify that VS Code fuzzy matching resolves the shortened form.

### FIX-5: Rename ADO table column

**Finding**: F5 (MEDIUM)
**File**: `docs/docusaurus/docs/shape-the-work/ado-integration.md`
**Line**: 30

```diff
-| ADO Prompt | Purpose | GitHub Equivalent |
+| ADO Artifact | Purpose | GitHub Equivalent |
```

### FIX-6: Remove hardcoded artifact count

**Finding**: F6 (MEDIUM)
**File**: `docs/docusaurus/docs/shape-the-work/overview.md`
**Line**: 39

```diff
-HVE-Core covers this phase with 20 artifacts organized into three areas:
+HVE-Core covers this phase with artifacts organized into three areas:
```

### FIX-7: Add back-link from backlog to requirements

**Finding**: F7 (MEDIUM)
**File**: `docs/docusaurus/docs/shape-the-work/backlog-management.md`

Add a brief mention near the Discovery row or intro connecting PRD input:

```markdown
PRDs from [Requirements & Architecture](requirements-architecture) feed directly into discovery.
```

### FIX-8: Remove duplicate arch-diagram-builder description

**Finding**: F8 (LOW)
**File**: `docs/docusaurus/docs/shape-the-work/requirements-architecture.md`
**Lines**: 87-89

The `@arch-diagram-builder` is already in the decision matrix table (line 36). Remove or shorten the Supporting Tools paragraph to avoid duplication.
