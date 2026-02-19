# Planning Approach Comparison: plan-1b + plan-3 vs task-planner

**Generated**: 2026-02-19
**Plan**: 002-docusaurus-site
**Purpose**: Compare the planning approaches — HVE-Core's single task-planner vs the two-stage specify+architect pattern — to understand what's equivalent, what's different, and what's novel.

## The Core Mapping

HVE-Core has **one planning agent** (`@task-planner`). The jordo tools split this into **two commands** plus several supporting phases:

```
HVE-Core (single agent)         Jordo Tools (pipeline)
─────────────────────           ──────────────────────
                                /plan-1a-explore  ← research (compared in prior report)
                                /plan-1b-specify  ← WHAT/WHY only
                                /plan-2-clarify   ← resolve ambiguities
                                /plan-2c-workshop ← detailed design docs
@task-planner ──────────────→   /plan-3-architect ← HOW (phases, tasks, structure)
                                /plan-4-complete  ← readiness gate
                                /plan-5-phase-tasks ← per-phase dossiers
```

The task-planner does **specify + architect in one pass**. The jordo tools separate them into distinct commands with gates between them.

## Structural Comparison

| Dimension | task-planner | plan-1b-specify + plan-3-architect |
|-----------|-------------|-----------------------------------|
| **Stages** | 1 agent, 3 phases (Context → Plan → Complete) | 2+ commands with user gates between |
| **Spec vs Plan** | Combined — single plan file contains both | Separate files: `*-spec.md` then `*-plan.md` |
| **Output files** | 2: plan.instructions.md + details.md | 2+: spec.md + plan.md (+ optional workshops, ADRs) |
| **Output location** | `.copilot-tracking/plans/` (gitignored) | `docs/plans/<N>-<slug>/` (committed) |
| **Persistence** | Ephemeral | Permanent, version-controlled |
| **Spec focus** | No separate spec — objectives embedded in plan | Strict WHAT/WHY only, no tech choices |
| **Complexity scoring** | Not present | CS 1-5 rubric (Surface Area, Integration, Data, Novelty, Non-Functional, Testing) |
| **Acceptance criteria** | Success criteria in plan (verifiable indicators) | Numbered, testable scenarios in spec |
| **Research integration** | Reads `.copilot-tracking/research/` if exists | Reads `research-dossier.md` + `external-research/` + workshops |
| **Workshop support** | None | `/plan-2c-workshop` creates detailed design docs BEFORE architecture |
| **ADR integration** | None | Gate checks `docs/adr/`, recommends `/plan-3a-adr` |
| **Constitution/rules** | Follows `.github/copilot-instructions.md` | Gate validates against `constitution.md`, `architecture.md`, `rules.md` |
| **Mode selection** | Single mode | Simple (inline tasks) vs Full (multi-phase with dossiers) |
| **PlanPak** | Not present | Feature-folder file organization option |
| **Testing strategy** | Generic validation phase | Explicit approach selection: Full TDD, TAD, Lightweight, Manual, Hybrid |
| **Parallelization** | Phase-level parallel markers | Same, plus per-phase task annotations |
| **Subagents** | Variable (dispatched as needed) | 4 named specialists (Pattern, Technical, Discovery, Dependency) |
| **Prior learnings** | None | Inherited from plan-1a's Subagent 7 findings |
| **Handoff** | `/clear` → attach plan → `/task-implement` | Continue in same session or `/plan-5` for dossiers |
| **Time estimates** | Not explicitly prohibited | **Strictly prohibited** — CS 1-5 only |

## What task-planner Does in One Pass

The task-planner combines these concerns into a single interaction:

1. **Context gathering** (Phase 1) — reads research, dispatches subagents if needed
2. **Scoping** — extracts objectives, requirements, files to modify
3. **Phase design** — breaks work into parallelizable phases with validation
4. **Detail generation** — creates step-level instructions with line references
5. **Handoff preparation** — structured summary for implementation

The output is two files:
- `*-plan.instructions.md` — checklist with phases and line-number cross-refs (uses `.instructions.md` extension so it auto-applies via `applyTo`)
- `*-details.md` — step-level specifications with file paths and success criteria

## What plan-1b Does Differently (Specification)

plan-1b-specify creates a **spec-only document** — deliberately excluding implementation details:

**Novel concepts not in task-planner:**
- **Complexity scoring rubric** (CS 1-5 with 6 factors scored 0-2 each)
- **Workshop Opportunities** — identifies complex areas needing detailed design BEFORE planning
- **ADR Seeds** — captures decision context without solutioning
- **NEEDS CLARIFICATION markers** — inline flags for unresolved unknowns
- **External research tracking** — incorporates `/deepresearch` results, warns about unresolved gaps
- **Strict WHAT/WHY boundary** — no framework choices, no file paths, no implementation details

The spec is a contract between "what we want" and "how we build it." task-planner merges these into one document.

## What plan-3 Does Differently (Architecture)

plan-3-architect takes the spec and produces the implementation plan — similar to task-planner's output, but with significantly more structure:

**Novel concepts not in task-planner:**
- **Validation gates** — Clarify gate (no unresolved ambiguities), Constitution gate (rule compliance), Architecture gate (layer boundaries), ADR gate (existing decisions)
- **Workshop consumption** — reads workshop documents as authoritative design decisions, skips re-discovery
- **Optimized research** — if research-dossier.md exists, reduces from 4→2 subagents (avoids redundant work)
- **Testing strategy adaptation** — generates different task structures for TDD vs TAD vs Lightweight vs Manual
- **Documentation strategy** — generates doc phases based on declared approach (README only, docs/how, hybrid)
- **Simple vs Full mode** — inline tasks for trivial features, multi-phase dossier structure for complex ones
- **PlanPak** — feature-folder file organization with Rule of Three graduation
- **Time estimate prohibition** — only CS scores allowed, validated before output
- **Change Footnotes Ledger** — tracks plan modifications across phases
- **Progress Tracking** — phase completion checklist with cross-cutting concerns section

## The Separation Argument

### Why task-planner merges spec + plan

- **Fewer context switches** — one `/clear` instead of multiple
- **Faster iteration** — straight from research to actionable plan
- **Lower ceremony** — works for quick tasks without overhead
- **VS Code native** — uses `runSubagent` and handoff buttons

### Why the jordo tools separate them

- **Spec as contract** — WHAT/WHY frozen before HOW begins, preventing scope drift
- **Workshop insertion point** — complex designs explored between spec and plan
- **Clarification gate** — ambiguities resolved before architecture commits to an approach
- **Quality ratchet** — each gate validates before proceeding (can't skip with stale unknowns)
- **Review checkpoints** — user can adjust spec without re-planning, or re-plan without re-specifying
- **Persistent record** — spec + plan + workshops committed together as project history

## The Biggest Gaps

### What task-planner lacks (highest impact)

1. **Complexity scoring** — No CS rubric means no standardized way to compare task sizes across the organization. Everything is described in prose.

2. **Workshop stage** — No mechanism to deeply explore complex designs before committing to a plan. task-planner goes straight from research to phased tasks. Complex data models, CLI flows, or API contracts get designed inline during planning.

3. **Specification boundary** — No separation between "what we want" and "how we build it." This means scope changes require re-planning, and the spec can't be reviewed independently by non-engineers.

4. **Testing strategy adaptation** — task-planner generates a generic validation phase. The jordo tools generate structurally different task sets depending on whether you're doing TDD, TAD, Lightweight, or Manual testing.

5. **Persistent output** — Plans in `.copilot-tracking/` are ephemeral. No institutional memory of planning decisions, phase structures, or lessons learned.

### What the jordo tools lack (relative to task-planner)

1. **VS Code integration** — No handoff buttons, no `runSubagent` API, no `.instructions.md` auto-apply trick. The plan file in hve-core uses `applyTo:` to auto-inject as context during implementation.

2. **Plan-as-instruction-file** — The `*-plan.instructions.md` extension means the plan automatically loads as context when the implementor edits the changes file. This is a clever use of the `applyTo` mechanism.

3. **Line-number cross-references** — task-planner maintains exact line references between plan → details → research. The jordo tools use section references but not line numbers.

4. **Lower barrier to entry** — `/task-plan` is one command. The jordo pipeline is 3-7 commands depending on complexity.

## The applyTo Trick

Worth calling out specifically: task-planner's plan file uses `.instructions.md` extension with:

```yaml
applyTo: '.copilot-tracking/changes/{{YYYY-MM-DD}}-{{task_description}}-changes.md'
```

This means when the Task Implementor creates or edits the changes tracking file, the plan automatically loads as instruction context. The plan literally follows the implementor through the file system. The jordo tools don't have an equivalent mechanism — plan context is loaded manually or through explicit file reading.

## Implications for Documentation

The RPI documentation currently describes a **3-agent pipeline** (Research → Plan → Implement) with optional Review. The actual distinction between the shipped HVE-Core approach and the jordo tools approach is:

| Aspect | HVE-Core (shipped) | Jordo Tools (extended) |
|--------|-------------------|----------------------|
| Pipeline | 3 agents, 3 context windows | 8+ commands, continuous session |
| Ceremony | Low — research → plan → implement | High — explore → specify → clarify → workshop → architect → validate → dossier → implement |
| Best for | Bounded tasks, single-session work | Multi-phase features, team coordination |
| Persistence | Ephemeral (gitignored) | Durable (committed) |
| Learning | Each task starts fresh | Prior learnings compound |

Both approaches are valid. The documentation should present the shipped RPI as the primary workflow and acknowledge that more structured approaches exist for complex multi-phase work.

## Recommendations

1. **For the docs site**: The RPI pages accurately describe the shipped task-planner. No changes needed. But the "What's Coming" page could mention the concept of separated specification and planning as a future evolution.

2. **For HVE-Core evolution**: The highest-value additions from the jordo tools would be:
   - Complexity scoring (CS 1-5) — gives teams a shared vocabulary for task sizing
   - Workshop stage — prevents planning before design is settled
   - Persistent plans — enables institutional memory
   - Testing strategy adaptation — generates the right task structure for the testing approach

3. **For this project**: We've been using the full jordo pipeline (1a → 1b → 2 → 2c → 3 → 4 → 5 → 6 → 7) throughout this documentation effort. The `docs/plans/002-docusaurus-site/` folder with its spec, 5 workshops, plan, and 7 phase dossiers IS the extended approach in action.
