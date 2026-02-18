# Phase 2B: Content — Shape the Work — Code Review

**Phase**: Phase 2B: Content — Shape the Work
**Plan**: docs/plans/002-docusaurus-site/docusaurus-site-plan.md
**Dossier**: docs/plans/002-docusaurus-site/tasks/phase-2b-content-shape-the-work/tasks.md
**Execution Log**: docs/plans/002-docusaurus-site/tasks/phase-2b-content-shape-the-work/execution.log.md
**Reviewed**: 2026-02-18
**Diff Range**: HEAD (uncommitted changes against commit 7659c75)

---

## A) Verdict: REQUEST_CHANGES

Two HIGH findings require attention: a missing plan footnote ledger entry ([^3]) and a dishonestly checked acceptance criterion (P2B-AC3). No CRITICAL issues. Content quality is strong.

---

## B) Summary

Phase 2B implements 7 tasks creating 4 documentation pages and 1 category config under `shape-the-work/`, plus cross-links to existing pages and instructions file enhancements. All content tasks (T001-T007) are implemented correctly. The 4 pages follow established editorial patterns with strong educational tone, accurate artifact references, and appropriate use of Mermaid diagrams and progressive disclosure. Build succeeds with zero errors. Cross-phase regression check passes — all Phase 1/2 invariants preserved.

Two plan hygiene issues block approval: (1) the Change Footnotes Ledger is missing [^3] for Phase 2B, and (2) plan acceptance criterion P2B-AC3 is checked [x] despite build-the-work cross-links being impossible (pages don't exist). Additionally, the instructions file was modified with 4 new convention sections outside the task table scope, which is beneficial but undocumented.

---

## C) Checklist

**Testing Approach: Manual**

- [x] Manual verification steps documented (execution log has per-task evidence)
- [x] Manual test results recorded with observed outcomes (HTTP 200 for all pages)
- [x] All acceptance criteria manually verified (2/3 full pass, 1/3 partial — see findings)
- [x] Evidence artifacts present (execution log, build output)

**Universal:**

- [ ] Only in-scope files changed (instructions file modified outside task scope — beneficial but undocumented)
- [x] Linters/type checks clean (npm run build: zero errors)
- [x] Absolute paths used where needed

---

## D) Findings Table

| ID | Severity | File:Lines | Summary | Recommendation |
|----|----------|------------|---------|----------------|
| F1 | HIGH | plan.md:219 | P2B-AC3 dishonestly checked [x] — build-the-work links impossible | Amend AC text or uncheck |
| F2 | HIGH | plan.md:EOF | Change Footnotes Ledger missing [^3] for Phase 2B | Add [^3] entry |
| F3 | MEDIUM | instructions.md:141-184 | Instructions file modified outside task scope | Log in Discoveries & Learnings |
| F4 | MEDIUM | ado-integration.md:33 | `/ado-process-my-work-items` truncates actual name `/ado-process-my-work-items-for-task-planning` | Use full name or verify VS Code resolution |
| F5 | MEDIUM | ado-integration.md:34 | Table column "ADO Prompt" mixes agents and prompts (`@ado-prd-to-wit` is an agent) | Rename column to "ADO Artifact" |
| F6 | MEDIUM | overview.md:39 | Hardcoded "20 artifacts" count is maintenance liability | Remove specific number or add TODO |
| F7 | MEDIUM | backlog-management.md | No back-link from backlog page to requirements-architecture for PRD input context | Add brief mention with link |
| F8 | LOW | requirements-architecture.md:87-89 | `@arch-diagram-builder` described in both decision matrix table and Supporting Tools prose | Remove duplication |
| F9 | LOW | dossier:296 | Phase Footnote Stubs table empty | Populate or document as N/A |
| F10 | LOW | plan:206-210 | Plan task table Log column shows '-' for Phase 2B tasks | Add execution log links |

---

## E) Detailed Findings

### E.0) Cross-Phase Regression Analysis

**Verdict: ✅ PASS — No regressions detected**

| Prior Phase | Check | Status |
|-------------|-------|--------|
| Phase 1 | baseUrl, Mermaid, blog disabled, justfile | ✅ All preserved |
| Phase 1 | sidebars.js, docusaurus.config.js | ✅ Unchanged |
| Phase 2 | 5 Getting Started pages | ✅ Content intact |
| Phase 2 | Instructions file original sections | ✅ All 10 sections unmodified, 4 new appended |
| Phase 2 | quick-start.md Shape TODO → real link | ✅ Resolved; Build/Ship TODOs remain |
| Phase 2 | intro.md | ✅ Only inline links added, no content removed |
| Phase 2 | Build succeeds | ✅ Zero errors |

### E.1) Doctrine & Testing Compliance

#### Graph Integrity — Verdict: ⚠️ MINOR_ISSUES (2 MEDIUM, 2 LOW)

**Task↔Log**: ✅ PASS — All 7 completed tasks have corresponding execution log entries.

**Task↔Footnote**: ⚠️ ISSUES
- Phase Footnote Stubs in dossier are empty (LOW)
- No [^N] references in task Notes column (LOW)
- **Change Footnotes Ledger missing [^3]** (HIGH) — Phase 2B marked [x] complete but no ledger entry exists

**Plan↔Dossier Sync**: ⚠️ ISSUES
- Task status checkboxes match for all active tasks ✅
- Plan tasks 2B.1-2B.5 correctly expand to dossier T001-T007 ✅
- Plan Log column empty for all Phase 2B tasks (MEDIUM)
- **P2B-AC3 dishonestly checked** (HIGH) — says "Cross-links to getting-started and build-the-work sections work" but build-the-work doesn't exist. Dossier honestly flags as "⚠️ Partial" but plan checkbox is [x]

#### Authority Conflicts

No plan↔dossier content conflicts. The only issue is the missing [^3] footnote.

#### Testing Compliance (Manual Approach)

- ✅ Manual verification documented in execution log
- ✅ Build verification recorded (zero errors, all pages HTTP 200)
- ⚠️ P2B-AC3 not fully satisfiable in this phase

#### Scope Guard

| File | In Task Scope? | Verdict |
|------|---------------|---------|
| shape-the-work/_category_.json | T001 ✅ | In scope |
| shape-the-work/overview.md | T002 ✅ | In scope |
| shape-the-work/requirements-architecture.md | T003 ✅ | In scope |
| shape-the-work/backlog-management.md | T004 ✅ | In scope |
| shape-the-work/ado-integration.md | T005 ✅ | In scope |
| getting-started/quick-start.md | T006 ✅ | In scope |
| intro.md | T006 ✅ | In scope |
| docusaurus-edits.instructions.md | ❌ Not in task table | Out of scope (MEDIUM) |
| educational-design-research.md | Plan artifact | Not scope concern (LOW) |
| docusaurus-site-plan.md | Plan updates | Expected |

### E.2) Semantic Analysis

| Check | Status | Notes |
|-------|--------|-------|
| Artifact names accurate | ⚠️ | `/ado-process-my-work-items` should be `/ado-process-my-work-items-for-task-planning` (F4) |
| 3-tier autonomy model | ✅ | Full/Partial/Manual × Create/Update/Link/Close correctly described |
| ADO prompt mapping | ⚠️ | Column title says "ADO Prompt" but includes `@ado-prd-to-wit` agent (F5) |
| Artifact chain diagram | ✅ | PRD/BRD → Issues, ADR/SecPlan → Research → RPI flow correct |
| Value tags | ✅ | 🟢 GitHub Backlog Manager correctly tagged; 🟡 supporting tools correctly tagged |
| Backlog 4-workflow pipeline | ✅ | Discover → Triage → Sprint Plan → Execute matches instruction files |
| ADO work item hierarchy | ✅ | Epic → Feature → User Story → Task/Bug correct |
| Shaping workflow diagram | ✅ | Discovery → Demand Management → sprint-ready items aligns with value delivery loop |
| Problem framing teaching | ✅ | Diverge-then-converge framing per design thinking notes correctly applied |
| Empathy moment | ✅ | Genuine, specific scenario ("You have been in the meeting...") |

### E.3) Quality & Safety Analysis

**Safety Score: 100/100** (CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0)

No correctness, security, performance, or observability issues in documentation content. No secrets, PII, or problematic URLs found.

**Content Quality Highlights**:
- Educational tone consistently applied (concept before tool)
- Progressive disclosure via `<details>` blocks for handoff contract and ADO planning files
- TODO comments properly formatted as HTML comments
- No hardcoded Mermaid colors in Phase 2B diagrams (unlike Phase 2 — improvement)
- Bidirectional links between backlog-management and ado-integration working

### E.4) Doctrine Evolution Recommendations

*Advisory — does not affect verdict*

**New Rules Candidate**: The instructions file additions (Page Length, Progressive Disclosure, Search Keywords, Cross-Linking) represent patterns that emerged during Phase 2B content authoring. These are valuable conventions that should be retained. The modification was undocumented but beneficial.

**Positive Alignment**:
- Content follows workshop designs adapted for Docusaurus (not verbatim copy)
- Admonitions used where warranted (:::note for honest coverage gaps, :::tip for tool recommendations)
- Internal links correctly use relative paths without .md extension
- Forward links to Build the Work pages correctly deferred as TODO comments
- `<details>` pattern for reference content is a strong page-organization convention

---

## F) Coverage Map

**Testing Approach: Manual — Acceptance Criteria ↔ Manual Verification**

| AC | Description | Evidence | Confidence |
|----|-------------|----------|------------|
| P2B-AC1 | `shape-the-work/` category with 4 ordered pages | `_category_.json` + 4 files with sidebar_position 1-4 | 100% |
| P2B-AC2 | Mermaid diagrams on overview and backlog-management | overview.md: shaping workflow; backlog-management.md: pipeline | 100% |
| P2B-AC3 | Cross-links to getting-started and build-the-work | Getting-started links: ✅ verified. Build-the-work: ❌ impossible (pages don't exist) | 50% — partial |

**Overall Coverage Confidence**: 83% (2 full + 1 partial out of 3)

---

## G) Commands Executed

```bash
# Build verification
cd /Users/jordanknight/repos/hve-core/docs/docusaurus && npm run build
# Result: [SUCCESS] zero errors

# ADO prompt name verification
ls .github/prompts/ado-process-my-work-items*
# Result: ado-process-my-work-items-for-task-planning.prompt.md

# Footnote ledger check
grep '\[\^' docs/plans/002-docusaurus-site/docusaurus-site-plan.md
# Result: [^1] and [^2] only — no [^3]

# Git status
git status --short
# Result: 4 modified + 4 untracked file groups
```

---

## H) Decision & Next Steps

**Verdict: REQUEST_CHANGES** — 2 HIGH findings block merge.

**Required before merge**:

1. **Fix F2** (HIGH): Add [^3] to the Change Footnotes Ledger summarizing Phase 2B completion
2. **Fix F1** (HIGH): Either amend P2B-AC3 text to "Cross-links to getting-started sections work; build-the-work deferred to Phase 4" or uncheck [x] with a footnote explaining the partial completion

**Recommended (non-blocking)**:

3. Fix F4: Update `/ado-process-my-work-items` to full name or verify VS Code resolution
4. Fix F5: Rename "ADO Prompt" column to "ADO Artifact"
5. Fix F3: Log instructions file changes in dossier Discoveries & Learnings table
6. Fix F6: Remove hardcoded "20 artifacts" count from overview.md
7. Fix F7: Add back-link from backlog-management.md to requirements-architecture.md
8. Fix F8: Remove duplicate `@arch-diagram-builder` description

**After fixes**: Re-run `npm run build` to confirm zero errors, then APPROVE.

---

## I) Footnotes Audit

| Diff-Touched Path | Footnote Tag | Plan Ledger Entry |
|--------------------|-------------|-------------------|
| docs/docusaurus/docs/shape-the-work/_category_.json | ❌ None | ❌ No [^3] exists |
| docs/docusaurus/docs/shape-the-work/overview.md | ❌ None | ❌ No [^3] exists |
| docs/docusaurus/docs/shape-the-work/requirements-architecture.md | ❌ None | ❌ No [^3] exists |
| docs/docusaurus/docs/shape-the-work/backlog-management.md | ❌ None | ❌ No [^3] exists |
| docs/docusaurus/docs/shape-the-work/ado-integration.md | ❌ None | ❌ No [^3] exists |
| .github/instructions/docusaurus-edits.instructions.md | ❌ None | ❌ No [^3] exists |
| docs/docusaurus/docs/getting-started/quick-start.md | ❌ None | ❌ No [^3] exists |
| docs/docusaurus/docs/intro.md | ❌ None | ❌ No [^3] exists |

**Critical gap**: No [^3] footnote entry exists for Phase 2B. All 8 changed files lack ledger coverage.
