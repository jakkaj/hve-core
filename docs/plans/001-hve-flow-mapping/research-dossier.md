# Research Report: HVE-Core Workflow Flow Architecture

**Generated**: 2026-02-17T01:54:39Z
**Research Query**: "Map all distinct flows in hve-core — what makes RPI a 'flow', what other flows exist, how each is defined, and detailed flow diagrams with derivation sources"
**Mode**: Plan-Associated
**Location**: `docs/plans/001-hve-flow-mapping/research-dossier.md`
**FlowSpace**: Available (default + fs2 graphs)
**Findings**: 72 findings across 7 subagents (IA×12, DC×10, PS×10, QT×10, IC×10, DE×10, PL×15)

## Executive Summary

### What hve-core Provides

HVE-Core is a prompt-engineering framework that delivers AI-driven workflow automation for the software development lifecycle through GitHub Copilot. It contains 22 agents, 30+ prompts, 20+ instruction files, and 1 skill, organized into 9 collection packages.

### The Core Question: What Makes Something a "Flow"?

A "flow" in hve-core is **not** a runtime engine. There is no scheduler, state machine runtime, or process manager. The "engine" is the LLM itself (Copilot agent mode), steered by well-structured markdown protocol specifications.

A flow is distinguished from a standalone agent by the co-occurrence of four structural patterns:

1. **Phase-Based Protocol** — defines named states with entry/exit conditions (`## Required Phases`)
2. **Handoff Buttons** — frontmatter `handoffs:` with `send: true` creating directed graph edges between agents
3. **`/clear` Boundaries** — context isolation between phases forcing agents to communicate only through artifacts
4. **Artifact Contracts** — files in `.copilot-tracking/` serving as the typed data bus between phases

Without all four, an agent has phases but is not a flow. With all four, agents compose into a multi-agent pipeline where the filesystem is the integration layer and `/clear` is the transaction boundary.

### How Many Flows Exist?

**12 distinct workflows** identified. **2 are first-class** (fully documented with phase diagrams, orchestrator agents, handoff buttons, artifact contracts, autonomy models, iteration loops, error handling, and dedicated user guides). **10 are emergent** (varying levels of flow infrastructure, from well-structured-but-undocumented to fully implicit).

### Quick Stats

- **First-Class Flows**: 2 (RPI, GitHub Backlog Manager)
- **Emergent Flows**: 10 (varying completeness)
- **Connected Agent Subgraphs**: 3 (RPI ecosystem, GitHub Backlog ecosystem, Prompt Builder self-loop)
- **Disconnected Agents**: 13 (standalone, no handoff wiring)
- **Total Handoff Edges**: 15 distinct (source,target) pairs, 28 individual paths
- **`.copilot-tracking/` Directories**: 17 distinct subdirectories across all flows
- **Phase-Based Agents**: 20 of 22 agents use `## Required Phases`
- **Handoff-Wired Agents**: 8 of 22 have `handoffs:` frontmatter
- **Prior Learnings**: 15 institutional knowledge findings

## Flow Census: All 12 Workflows

### Completeness Matrix

| # | Flow | Orchestrator? | Phases | Handoffs? | Artifacts? | Autonomy? | Loops? | Error Handling? | Using-Together Doc? | Classification |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | RPI (Strict) | ❌ Manual | 4 | ✅ Chain | ✅ Hard | ❌ | ✅ Review→R/P | ❌ | ✅ | **FIRST-CLASS** |
| 2 | RPI (Orchestrator) | ✅ rpi-agent | 5 | ✅ Self+memory | ✅ Hard | ✅ 3-tier | ✅ Discover→1 | ✅ Basic | ✅ | **FIRST-CLASS** |
| 3 | GitHub Backlog | ✅ backlog-mgr | 3+5 dispatch | ✅ Self+memory | ✅ Hard | ✅ 3-tier | ✅ Exec→Disc | ✅ Detailed | ✅ | **FIRST-CLASS** |
| 4 | Prompt Builder | ⚠️ Self-loop | 5 | ✅ Self×3 | ⚠️ Sandbox | ❌ | ✅ Validate→2/3 | ❌ | ❌ Planned | Emergent |
| 5 | Doc-Ops | ✅ Self-orch | 5 | ❌ | ✅ Sessions | ❌ | ✅ Impl→1 | ⚠️ Minimal | ❌ | Emergent |
| 6 | Memory/Checkpoint | ⚠️ State machine | 3 | ✅ →rpi-agent | ✅ Memory files | ❌ | ❌ | ❌ | ❌ | Emergent (utility) |
| 7 | PRD Builder | ❌ | 7 | ❌ | ✅ JSON state | ❌ | ⚠️ User-driven | ⚠️ Summarization | ❌ Planned | Emergent |
| 8 | BRD Builder | ❌ | 7 | ❌ | ✅ JSON state | ❌ | ⚠️ User-driven | ⚠️ Summarization | ❌ Planned | Emergent |
| 9 | ADO PRD-to-WIT | ❌ | 5 | ❌ | ✅ Hard | ❌ | ⚠️ Resumable | ❌ | ❌ Planned | Emergent |
| 10 | ADO PR Creation | ❌ | 7 | ❌ | ✅ Hard | ❌ noGates | ❌ Branch paths | ✅ Detailed | ❌ | Emergent |
| 11 | PR Review | ❌ | 4 | ❌ | ✅ Review files | ❌ | ✅ Phase 3 iter | ❌ | ❌ | Emergent |
| 12 | Security Plan | ❌ | 4+ | ❌ | ✅ Plans | ❌ | ⚠️ Section feedback | ❌ | ❌ | Emergent |

### Undocumented Implicit Sequences (Not Flows — No Flow Infrastructure)

These agent groups have logical sequential relationships but lack all four flow patterns:

| Sequence | Agents | Evidence | Missing |
|---|---|---|---|
| **Data Science Pipeline** | gen-data-spec → gen-jupyter-notebook → gen-streamlit-dashboard → test-streamlit-dashboard | gen-data-spec body mentions downstream consumers | All 4 patterns (no handoffs, no /clear, no artifact contracts, no phase connections) |
| **Document Builders Group** | prd-builder, brd-builder, adr-creation, security-plan-creator | Cataloged as a group in `docs/agents/README.md` | Not a sequence — four independent standalone agents grouped by theme |
| **ADO WIT Chain** | ado-wit-discovery → ado-update-wit-items (instructions only, no agents) | Instruction files cross-reference via `#file:` | No agent-level handoffs; instructions-only flow |

## Detailed Flow Diagrams

### Flow 1: RPI Strict (Manual 4-Phase Pipeline)

**Derivation**: FIRST-CLASS — documented with ASCII diagram in `docs/rpi/using-together.md:22-32`

```
┌─────────────────┐  📋 Create Plan  ┌─────────────────┐  ⚡ Implement   ┌──────────────────┐  ✅ Review    ┌──────────────────┐
│ Task Researcher  │ ───────────────→ │  Task Planner    │ ─────────────→ │ Task Implementor  │ ───────────→ │  Task Reviewer    │
│ /task-research   │    [/clear]      │ /task-plan       │   [/clear]     │ /task-implement    │   [/clear]   │ /task-review      │
│                  │                  │                  │                │                    │              │                   │
│ Uncertainty      │                  │ Knowledge        │                │ Strategy           │              │ Working Code      │
│     ↓            │                  │     ↓            │                │     ↓              │              │     ↓             │
│ Knowledge        │                  │ Strategy         │                │ Working Code       │              │ Validated Code    │
└─────────────────┘                  └─────────────────┘                └──────────────────┘              └────────┬──┬────────┘
        ↓                                    ↓                                  ↓                                 │  │
   research.md                       plan.md + details.md              code + changes.md                 review.md│  │
        ↑                                    ↑                                                                    │  │
        └────── 🔬 Research More ────────────┴──────────── 📋 Revise Plan ────────────────────────────────────────┘  │
                  [/clear]                                   [/clear]                                                 │
                                                                                                                     │
                                                                                         Review Status:              │
                                                                                         • Complete → DONE           │
                                                                                         • Iterate → Phase 3 ────────┘
                                                                                         • Escalate → Phase 1 or 2
```

**Mechanism**: Handoff buttons (`send: true`) in each agent's frontmatter. User clicks button → auto-submits prompt to next agent. `/clear` between each phase is a MANUAL user action.

**Artifact contract** (hard contracts, explicit paths passed between agents):

| Phase | Produces | Consumed By |
|---|---|---|
| Research | `.copilot-tracking/research/{{YYYY-MM-DD}}-<topic>-research.md` | Plan |
| Plan | `.copilot-tracking/plans/{{YYYY-MM-DD}}-<task>-plan.instructions.md` + `details/...-details.md` | Implement |
| Implement | `.copilot-tracking/changes/{{YYYY-MM-DD}}-<task>-changes.md` + source code | Review |
| Review | `.copilot-tracking/reviews/{{YYYY-MM-DD}}-<task>-review.md` | Done / Research / Plan |

---

### Flow 2: RPI Orchestrator (Autonomous 5-Phase Loop)

**Derivation**: FIRST-CLASS — described in `.github/agents/rpi-agent.agent.md:77-215`

```
                                    ┌─────────────────────────────────────────────────────┐
                                    │              rpi-agent (orchestrator)                │
                                    │  Autonomy: Full | Partial (default) | Manual        │
                                    │  Handoffs: 1️⃣ 2️⃣ 3️⃣ ▶️All 🔄Suggest 🤖Auto 💾Save  │
                                    └───┬──────────┬──────────┬──────────┬────────────────┘
                                        │          │          │          │
                                   runSubagent runSubagent runSubagent runSubagent
                                        │          │          │          │
                                        ▼          ▼          ▼          ▼
                                   ┌─────────┐ ┌────────┐ ┌──────────┐ ┌─────────┐
                              ┌──→ │Research  │→│ Plan   │→│Implement │→│ Review  │
                              │    │ Phase 1  │ │Phase 2 │ │ Phase 3  │ │ Phase 4 │
                              │    └─────────┘ └────────┘ └──────────┘ └────┬────┘
                              │                                              │
                              │    ┌─────────────────────────────────┐       │
                              │    │ Phase 5: Discover               │←──────┘ Complete
                              │    │ ┌───────────┐ ┌────────────┐   │
                              │    │ │Conversation│ │  Artifact  │   │  Iterate → Phase 3
                              │    │ │  Analyst   │ │  Reviewer  │   │  Escalate → Phase 1/2
                              │    │ └───────────┘ └────────────┘   │
                              │    │ ┌───────────┐                  │
                              │    │ │ Codebase  │  (3 parallel     │
                              │    │ │ Scanner   │   subagents)     │
                              │    │ └───────────┘                  │
                              │    └──────────────┬──────────────────┘
                              │                   │
                              │    Full Auto: auto-continue with top item
                              └─── Partial: present options, user picks
                                   Manual: always present, wait for pick
```

**Mechanism**: `runSubagent` tool dispatches each task-* agent in an isolated context. The orchestrator maintains phase state across dispatches. Phase 5 dispatches 3 parallel discovery subagents.

**Key difference from strict RPI**: No `/clear` between phases (the orchestrator manages context), no user-clicked handoff buttons (subagent dispatch is programmatic), and Phase 5 (Discover) creates the auto-continuation loop.

---

### Flow 3: GitHub Backlog Manager (3-Phase Classifier + 5 Workflow Dispatch)

**Derivation**: FIRST-CLASS — documented with diagram in `docs/agents/github-backlog/using-together.md:19-24`

```
                         ┌────────────────────────────────────────────────────┐
                         │          github-backlog-manager                    │
                         │  Autonomy: Full | Partial (default) | Manual      │
                         │  Handoffs: Discover | Triage | Sprint | Execute   │
                         └───────────────────────┬────────────────────────────┘
                                                 │
                              Phase 1: Intent Classification
                              (keyword signals + contextual heuristics)
                                                 │
                    ┌────────────┬───────────┬────┴────────┬─────────────┐
                    ▼            ▼           ▼             ▼             ▼
              ┌──────────┐ ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
              │Discovery │ │ Triage  │ │ Sprint   │ │Execution │ │ Single   │
              │          │ │         │ │ Planning │ │          │ │  Issue   │
              └────┬─────┘ └────┬────┘ └─┬──┬────┘ └────┬─────┘ └────┬─────┘
                   │            │        │  │            │            │
                   ▼            ▼        │  │            ▼            ▼
              issue-        triage-      │  │       handoff-      (inline
              analysis.md   plan.md      │  │       logs.md       operations)
                   │            │        │  │            ↑
                   │            │        │  │            │
                   │            │     Discovery   Triage │
                   │            │     then        then   │
                   │            │     Triage      └──────┘
                   │            │        │
                   ▼            ▼        ▼
              ┌──────────────────────────────────────────┐
              │     Phase 3: Summary and Handoff          │
              │     → writes handoff.md                   │
              │     → offers handoff buttons              │
              └──────────────────────────────────────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              ▼                    ▼                    ▼
         [Discover]           [Triage]            [Execute]
         (iterate)            (iterate)           (iterate)
```

**Mechanism**: Single agent with intent classifier router. Each workflow loads a different `.instructions.md` file and writes to a different `.copilot-tracking/github-issues/<planning-type>/` subdirectory. Sprint Planning is a composite that sequences Discovery + Triage. Self-referential handoff buttons cycle between workflows.

**Artifact contract** (`.copilot-tracking/github-issues/<type>/<scope>/`):

| Workflow | Key Outputs |
|---|---|
| Discovery | `issue-analysis.md`, `issues-plan.md`, `planning-log.md`, `handoff.md` |
| Triage | `triage-plan.md`, `planning-log.md` |
| Sprint | Combines Discovery + Triage outputs |
| Execution | `handoff-logs.md` (checkbox-based resumable processing) |

---

### Flow 4: Prompt Builder (Self-Looping Test-Driven Refinement)

**Derivation**: Emergent from `.github/agents/prompt-builder.agent.md:26-131`. Has phases and self-loop handoffs but no using-together doc.

```
              ┌──────────────────────────────────────────────────────┐
              │            prompt-builder (self-loop)                │
              │  Handoffs: 💡Update/Create | 🛠️Refactor | 🤔Analyze  │
              └──────────────────────┬───────────────────────────────┘
                                     │
                    Phase 1: Baseline (dispatch test subagent)
                                     │
                    Phase 2: Research (dispatch research subagent)
                                     │
                    Phase 3: Build (dispatch implementation subagent)
                                     │
                    Phase 4: Validate (dispatch validation subagent)
                                     │
                    Phase 5: Iterate ──┬── Research gaps → Phase 2
                                       └── Implementation issues → Phase 3
                                       └── Complete → Present result
```

**Mechanism**: Unique execution/evaluation subagent pair — the builder dispatches a subagent to literally execute the prompt, then a separate subagent to evaluate the result. Sandbox state in `.copilot-tracking/sandbox/`.

---

### Flow 5: Doc-Ops (Autonomous Documentation QA)

**Derivation**: Emergent from `.github/agents/doc-ops.agent.md:134-250`. Phase-based with subagent dispatch but no handoff buttons.

```
              Phase 1: Discovery ──→ Phase 2: Planning ──→ Phase 3: Implementation
              (parallel subagents    (planning subagent     (impl subagents per
               for compliance,        creates work plan)     work item or batch)
               accuracy, gaps)              │                       │
                     ↑                      │                       │
                     └── new issues ────────┴── validation fails ───┘
```

---

### Flow 6: Memory/Checkpoint (Cross-Flow Persistence)

**Derivation**: Emergent from `.github/agents/memory.agent.md:27-153`. State machine, not a pipeline.

```
              Phase 1: Detect ──┬── existing memory found ──→ Phase 3: Continue
                                │                              (restore context)
                                └── no memory / save request ──→ Phase 2: Save
                                                                 (persist to disk)
                                                                      │
                                                                 Handoffs:
                                                                 🗑️ Clear → rpi-agent
                                                                 🚀 Continue → rpi-agent
```

**Mechanism**: Writes to `.copilot-tracking/memory/{{YYYY-MM-DD}}/`. Only outbound handoff target is `rpi-agent` (asymmetric — backlog manager can save via memory but memory only resumes to RPI).

---

### Flows 7-8: PRD/BRD Builders (7-Phase Guided Document Construction)

**Derivation**: Emergent from `.github/agents/prd-builder.agent.md` and `brd-builder.agent.md`. Conversational multi-turn with JSON session state.

```
  Assess → Discover → Create → Build/Elicit → Integrate → Validate → Finalize
    │                                                                      │
    └──── user drives phase progression through conversation ──────────────┘
                    state: .copilot-tracking/{prd,brd}-sessions/<name>.state.json
```

---

### Flow 9: ADO PRD-to-WIT (5-Phase Work Item Planning)

**Derivation**: Emergent from `.github/agents/ado-prd-to-wit.agent.md`. Phase-based with ADO MCP tool integration.

```
  Phase 1: Analyze PRD → Phase 2: Discover Codebase → Phase 3: Discover WIs → Phase 4: Refine → Phase 5: Handoff
       │                       │                            │                       │               │
       ▼                       ▼                            ▼                       ▼               ▼
  Extract reqs          Search codebase            mcp_ado_search_workitem    Similarity assess   handoff.md
                                                                              + user review
                    state: .copilot-tracking/workitems/prds/<normalized>/
```

---

### Flow 10: ADO PR Creation (7-Phase Gated)

**Derivation**: Emergent from `.github/instructions/ado-create-pull-request.instructions.md:358`. Instruction-defined (no agent file), most gate-heavy flow.

```
  Phase 1    Phase 2       Phase 3          Phase 4         Phase 5 (5 gates)      Phase 6      Phase 7
  Setup  →  PR Desc  →  Work Item     →  Reviewer    →  Gate 1: Files          →  Create PR → Recap
                         Discovery        Identification   Gate 2: Title/Desc
                            │                              Gate 3: Work Items
                         Phase 3a:                         Gate 4: Reviewers
                         Create WI                         Gate 5: Final Signoff
                         (if none found)
                                          [noGates=true → skip Phase 5 entirely]

                    state: .copilot-tracking/pr/new/<normalized-branch>/
```

---

### Flow 11: PR Review (4-Phase Collaborative)

**Derivation**: Emergent from `.github/agents/pr-review.agent.md:135`. Phase-based with iterative review cycle.

```
  Phase 1: Setup → Phase 2: Deep Analysis → Phase 3: Collaborative Review → Phase 4: Handoff
                                                  │
                                             (iterate: surface → discuss → revise)
                    state: .copilot-tracking/pr/review/<normalized-branch>/
```

---

### Flow 12: HVE-Core Installer (7-Phase Branching)

**Derivation**: Emergent from `.github/agents/hve-core-installer.agent.md:20-35`. Two explicit flow paths.

```
                    Phase 1: Detect Environment
                              │
                    Phase 2: Present Methods
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
              Extension Path      Clone-Based Path
              Phase 6: Install    Phase 3: Clone/Configure
                    │             Phase 4: Validate
                    │             Phase 5: Collection Selection
                    │             Phase 6: Install
                    │             Phase 7: Post-Install
                    ▼                   ▼
                 Complete            Complete
```

---

## The Agent-to-Agent Handoff Graph

**Derivation**: Extracted from `handoffs:` frontmatter across all 22 agent files (DC-01, DC-02).

```
                    ┌──────────────────────────────────────────────────────────────────────┐
                    │                     CONNECTED SUBGRAPH 1: RPI Ecosystem              │
                    │                                                                      │
                    │   ┌───────────────────────────────────────────────────────┐          │
                    │   │              rpi-agent (self-loop ×6)                 │          │
                    │   │         1️⃣ 2️⃣ 3️⃣ ▶️All 🔄Suggest 🤖Auto              │          │
                    │   └──┬──────────┬───────────┬───────────┬────────────────┘          │
                    │      │runSub    │runSub     │runSub     │runSub                     │
                    │      ▼          ▼           ▼           ▼                           │
                    │  ┌────────┐ ┌────────┐ ┌──────────┐ ┌────────┐                     │
                    │  │Researc-│→│Planner │→│Implement-│→│Reviewer│                     │
                    │  │  her   │ │        │ │   or     │ │        │                     │
                    │  └────────┘ └────────┘ └──────────┘ └──┬──┬──┘                     │
                    │       ↑          ↑                      │  │                        │
                    │       └──────────┴──────────────────────┘  │                        │
                    │       🔬Research More   📋Revise Plan      │                        │
                    │                                            │                        │
                    │   ┌──────────────────────────────┐         │                        │
                    │   │        memory agent           │←────💾Save                      │
                    │   │  🗑️Clear  🚀Continue with RPI │                                 │
                    │   └───────────┬───────────────────┘                                 │
                    │               │                                                     │
                    │               └──→ rpi-agent                                        │
                    │                                                                     │
                    └──────────────────────────────────────────────────────────────────────┘

                    ┌──────────────────────────────────────────────────────────────────────┐
                    │              CONNECTED SUBGRAPH 2: GitHub Backlog                    │
                    │                                                                      │
                    │   ┌──────────────────────────────────────────────┐                   │
                    │   │     github-backlog-manager (self-loop ×4)    │                   │
                    │   │     Discover | Triage | Sprint | Execute    │                   │
                    │   └────────────────────┬────────────────────────┘                   │
                    │                        │                                             │
                    │                        └──💾Save──→ memory ──→ rpi-agent            │
                    │                                    (crosses to Subgraph 1)           │
                    └──────────────────────────────────────────────────────────────────────┘

                    ┌──────────────────────────────────────────────────────────────────────┐
                    │              CONNECTED SUBGRAPH 3: Prompt Engineering                │
                    │                                                                      │
                    │   ┌──────────────────────────────────────────────┐                   │
                    │   │       prompt-builder (self-loop ×3)          │                   │
                    │   │     💡Update/Create | 🛠️Refactor | 🤔Analyze  │                   │
                    │   └──────────────────────────────────────────────┘                   │
                    └──────────────────────────────────────────────────────────────────────┘

                    DISCONNECTED NODES (13 standalone agents):
                    ado-prd-to-wit, adr-creation, arch-diagram-builder, brd-builder,
                    doc-ops, gen-data-spec, gen-jupyter-notebook, gen-streamlit-dashboard,
                    hve-core-installer, pr-review, prd-builder, security-plan-creator,
                    test-streamlit-dashboard
```

## How "Flows" Are Defined — The Two Mechanisms

### Mechanism 1: First-Class (Documented Protocol Specification)

Used by: RPI Strict, RPI Orchestrator, GitHub Backlog Manager

These flows are defined through:

1. **Dedicated orchestrator `.agent.md`** — contains `## Required Phases` with explicit phase table, entry/exit conditions, branching logic
2. **Handoff frontmatter** — `handoffs:` array with `send: true` creates UI buttons for flow transitions
3. **`runSubagent` dispatch** — programmatic agent spawning for autonomous execution
4. **Instruction files** — `*.instructions.md` with `## Required Steps` defining per-workflow behavior
5. **Dedicated documentation** — `docs/*/using-together.md` with ASCII flow diagrams, artifact lifecycle, iteration patterns
6. **Artifact contract templates** — defined in instruction files with `{{YYYY-MM-DD}}` naming patterns

The flow is FIRST-CLASS because it is **explicitly named, diagrammed, and documented as a workflow**.

### Mechanism 2: Emergent (Phase-Based Agent Without Flow Wiring)

Used by: All other 10 workflows

These flows emerge from:

1. **Phase-Based Protocol in `.agent.md`** — `## Required Phases` defines ordered states
2. **`.copilot-tracking/` artifacts** — state persistence across sessions
3. **Instruction file cross-references** — `#file:` directives creating implicit dependency chains

The flow is EMERGENT because it is **not named as a workflow, not diagrammed, and not documented with a using-together guide**. The phase structure exists within a single agent's instructions, not as a multi-agent pipeline.

### The Spectrum

```
FIRST-CLASS ◄────────────────────────────────────────────────────► STANDALONE
   RPI      GitHub    Prompt    Doc-Ops   PRD/BRD   ADO WIT   Data Science
  (both     Backlog   Builder             Builders   Chain     Pipeline
  variants)                                                    (no flow
                                                               infra at all)
```

## The Unifying Design Principle

Both first-class flows share the same root insight (PL-12): **preventing AI from doing certain things at certain times** produces better outcomes than making AI smarter.

- RPI separates "investigating" vs "implementing" — the AI cannot implement during research
- Backlog Manager separates "exploratory" vs "analytical" vs "strategic" vs "mechanical" thinking
- `/clear` is the enforcement mechanism — it physically prevents context leakage between phases

This is documented in `docs/rpi/why-rpi.md` as "the counterintuitive insight" and in `docs/agents/github-backlog/why-backlog-manager.md` as the separation of concern types.

## Prior Learnings

### PL-03: Strict RPI vs rpi-agent is Deliberate

The project maintains two RPI variants intentionally. Users start with rpi-agent for speed and escalate to strict RPI when complexity emerges. This is documented as a design decision, not an evolutionary artifact.

### PL-05: Backlog Manager Replaced github-issue-manager

The `github-issue-manager` agent was deprecated and replaced by `github-backlog-manager`, consolidating single-purpose agents into an orchestrator pattern. This confirms the project's direction toward fewer, smarter orchestrators.

### PL-13: No Custom Runtime Planned

The roadmap (`docs/contributing/ROADMAP.md:42-48`) explicitly states: the project will NOT build a custom orchestration runtime. It prefers established frameworks like LangGraph. This means the current markdown-protocol + LLM-as-engine approach is the intentional long-term architecture.

### PL-14: No ADRs Exist Yet

Despite having an `adr-creation` agent, no Architecture Decision Records have been committed. The flow design decisions documented in `why-rpi.md` and `why-backlog-manager.md` serve as informal ADRs.

## Modification Considerations

### ✅ Safe to Modify

- **Standalone agents** (13 disconnected) — no flow dependencies to break
- **Emergent flows without handoff wiring** — PRD/BRD/Security Plan builders operate independently
- **Collection manifests** — packaging configuration, not flow definition

### ⚠️ Modify with Caution

- **Instruction files** (`github-backlog-*.instructions.md`) — consumed by multiple prompts and the backlog manager agent; changes propagate widely
- **Artifact naming conventions** (`{{YYYY-MM-DD}}-<task>-*.md`) — agents use pattern matching to discover artifacts; changing patterns breaks discovery
- **Handoff frontmatter** — changing labels/prompts breaks the handoff button UX

### 🚫 Danger Zones

- **RPI task agent chain handoffs** — the 4-agent cycle (researcher→planner→implementor→reviewer→researcher) is the core flow; breaking any edge disconnects the pipeline
- **`.copilot-tracking/` directory structure** — 17 directories consumed by 22 agents; structural changes cascade
- **`rpi-agent.agent.md` phase definitions** — the orchestrator's phase table and runSubagent dispatch instructions are the flow's control logic

## External Research Opportunities

### Research Opportunity 1: LangGraph Integration Feasibility

**Why Needed**: The roadmap mentions LangGraph as a potential orchestration framework but no investigation exists.
**Impact**: Could replace the current markdown-protocol flow model with a proper runtime.
**Source Findings**: PL-13

### Research Opportunity 2: Unified SDLC Map Design

**Why Needed**: No document maps the complete SDLC coverage of all 12 flows. The term "SDLC" appears zero times in the codebase (DE-10).
**Impact**: Users currently rely on tribal knowledge to compose flows across SDLC phases.
**Source Findings**: DE-04, DE-10, QT-10

---

**Research Complete**: 2026-02-17
**Report Location**: `docs/plans/001-hve-flow-mapping/research-dossier.md`
