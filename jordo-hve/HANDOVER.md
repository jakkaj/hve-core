# Handover: Design Thinking in HVE Core

**Date**: 2026-03-26
**From**: Claude Opus session on Jordan's machine (hve-core repo)
**For**: Any agent picking up this work on another machine
**Repo**: `https://github.com/microsoft/hve-core.git` (upstream Microsoft, NOT a fork)
**Branch**: `fix/disable-mcp-servers-by-default` (1 commit ahead of main)

---

## What We Did in This Session

Over a single extended session, we:

1. **Deep-researched** the entire Design Thinking framework in HVE Core using 8 parallel subagents
2. **Created a comprehensive dossier** (`DESIGN-THINKING-DOSSIER.md`) covering the full 9-method, 3-space framework with 11 Mermaid diagrams
3. **Validated the dossier** against 12 checks (file paths, artifact counts, method names, coaching philosophy, handoff contracts, etc.) and fixed 5 critical issues
4. **Ported all 14 DT commands** from GitHub Copilot format (`.github/prompts/`) to Claude Code skills (`.claude/skills/`)
5. **Created a meeting prep guide** (`DESIGN-THINKING-MEETING-PREP.md`) for running a DT session next week
6. **Updated the meeting prep guide** to reference Claude Code skills instead of VS Code/Copilot

---

## Repo Context

### What Is HVE Core?

HVE (Hypervelocity Engineering) Core is a **Microsoft-maintained prompt engineering framework** for GitHub Copilot. It provides 34 agents, 68 instructions, 40 prompts, and 9 skills organized into 11 collections. The core workflow is **RPI** (Research, Plan, Implement, Review) -- a constraint-based methodology that enforces verified knowledge before code generation.

### Design Thinking Is One Collection

The Design Thinking collection (58 artifacts, preview maturity) is a 9-method coaching framework that sits *upstream* of RPI. It helps teams discover the right problem before implementing solutions. It feeds into RPI at three exit points.

### The Artifact System

```
Source:       .github/agents/       → Agent definitions (.agent.md)
              .github/prompts/      → Slash commands (.prompt.md)
              .github/instructions/ → Auto-loaded guidance (.instructions.md)
              .github/skills/       → Executable packages (SKILL.md + scripts/)

Manifests:    collections/*.collection.yml  → Define what ships in each bundle

Generated:    plugins/{collection}/  → Symlinks back to .github/ (don't edit)

Distribution: VS Code Extension marketplace
```

Collections → `npm run plugin:generate` → Plugins → VS Code Extensions

---

## What Exists on Disk (Local Only, Untracked)

These files exist locally but are NOT committed or pushed:

### Files We Created

| File | What It Is | Size |
|------|-----------|------|
| `DESIGN-THINKING-DOSSIER.md` | Complete framework reference with 11 Mermaid diagrams, all 58 artifacts documented, validated against 12 checks | ~1000 lines |
| `DESIGN-THINKING-MEETING-PREP.md` | Practical meeting prep guide: checklists, commands, timeline, quick reference card | ~320 lines |
| `HANDOVER.md` | This file |
| `.claude/skills/dt-*/SKILL.md` (14 files) | Claude Code skills ported from Copilot prompts | ~710 lines total |

### Other Untracked Directories (Not Ours)

| Directory | What It Is |
|-----------|-----------|
| `.chainglass/` | Unknown tooling (pre-existing) |
| `.fs2/` | FlowSpace index data (codebase search tool) |
| `.serena/` | Unknown tooling (pre-existing) |

---

## The 14 Claude Code Skills We Created

Each maps 1:1 to a Copilot prompt in `.github/prompts/design-thinking/`:

| Claude Code Skill | Source Copilot Prompt | Purpose |
|---|---|---|
| `/dt-coach` | `dt-coach.agent.md` (agent, not prompt) | Enter DT coaching mode with Think/Speak/Empower |
| `/dt-start-project` | `dt-start-project.prompt.md` | Initialize new project, create state file, begin Method 1 |
| `/dt-resume-coaching` | `dt-resume-coaching.prompt.md` | Resume session from saved state |
| `/dt-method-next` | `dt-method-next.prompt.md` | Assess readiness, recommend next method |
| `/dt-method-04-ideation` | `dt-method-04-ideation.prompt.md` | Divergent brainstorming (15+ ideas) |
| `/dt-method-04-convergence` | `dt-method-04-convergence.prompt.md` | Philosophy-based theme clustering |
| `/dt-method-05-concepts` | `dt-method-05-concepts.prompt.md` | Concept articulation from themes |
| `/dt-method-05-evaluation` | `dt-method-05-evaluation.prompt.md` | D/F/V three-lens evaluation |
| `/dt-method-06-planning` | `dt-method-06-planning.prompt.md` | Prototype approach design |
| `/dt-method-06-building` | `dt-method-06-building.prompt.md` | Scrappy prototype construction |
| `/dt-method-06-testing` | `dt-method-06-testing.prompt.md` | Hypothesis-driven user testing |
| `/dt-handoff-problem-space` | `dt-handoff-problem-space.prompt.md` | Package Methods 1-3 for RPI |
| `/dt-handoff-solution-space` | `dt-handoff-solution-space.prompt.md` | Package Methods 4-6 for RPI |
| `/dt-handoff-implementation-space` | `dt-handoff-implementation-space.prompt.md` | Package Methods 7-9 for RPI |

### How The Skills Work

Each skill's `SKILL.md` uses `!`cat .github/instructions/design-thinking/...`` to dynamically inject the existing Copilot instruction files at runtime. This means:

- **Single source of truth**: The coaching behavior comes from the same `.github/instructions/` files that Copilot uses
- **No content duplication**: Skills are thin wrappers that load instructions on demand
- **Repo must be the working directory**: The `cat` commands need the `.github/` files to exist

### Where They Live

```
.claude/
  settings.local.json          (pre-existing)
  skills/
    dt-coach/SKILL.md
    dt-start-project/SKILL.md
    dt-resume-coaching/SKILL.md
    dt-method-next/SKILL.md
    dt-method-04-ideation/SKILL.md
    dt-method-04-convergence/SKILL.md
    dt-method-05-concepts/SKILL.md
    dt-method-05-evaluation/SKILL.md
    dt-method-06-planning/SKILL.md
    dt-method-06-building/SKILL.md
    dt-method-06-testing/SKILL.md
    dt-handoff-problem-space/SKILL.md
    dt-handoff-solution-space/SKILL.md
    dt-handoff-implementation-space/SKILL.md
```

---

## The Design Thinking Framework (Quick Reference)

### 9 Methods, 3 Spaces

| # | Method | Space | Quality Standard |
|---|--------|-------|-----------------|
| 1 | Scope Conversations | Problem | Rough & exploratory |
| 2 | Design Research | Problem | Rough & exploratory |
| 3 | Input Synthesis | Problem | Rough & exploratory |
| 4 | Brainstorming | Solution | Scrappy & concept-grade |
| 5 | User Concepts | Solution | Scrappy & concept-grade |
| 6 | Lo-Fi Prototypes | Solution | Scrappy & concept-grade |
| 7 | Hi-Fi Prototypes | Implementation | Functionally rigorous |
| 8 | User Testing | Implementation | Functionally rigorous |
| 9 | Iteration at Scale | Implementation | Functionally rigorous |

### Three Exit Points to RPI

| Exit | After | What Transfers | RPI Scope |
|------|-------|---------------|-----------|
| 1 | Methods 1-3 | Problem statement, stakeholder map, themes, constraints | Broad |
| 2 | Methods 4-6 | Exit 1 + tested concepts, D/F/V scores, constraint discoveries | Moderate |
| 3 | Methods 7-9 | Exits 1-2 + architecture, test results, deployment plan | Narrow |

All exits target **Task Researcher** as the RPI entry point. Each artifact carries confidence markers: `validated`, `assumed`, `unknown`, `conflicting`.

### Coaching Philosophy: Think/Speak/Empower

- **Think** (internal): Assess patterns, questions, blockers
- **Speak** (external): "I'm noticing..." -- 1-3 sentences, conversational
- **Empower** (response): Offer choices, not directives -- user drives the thinking

### Key Principles

- **Anti-polish**: Rough artifacts invite honest feedback; polish invites approval
- **Evidence over opinion**: Quotes, observations, metrics -- not feelings
- **Multi-source validation**: No conclusion from a single source
- **Non-linear iteration**: Going back to Method 2 from Method 5 is progress, not regression
- **Frozen vs Fluid**: Non-negotiable constraints vs redesignable aspects
- **Real-environment testing**: Test where users work, not in meeting rooms

### Session State

All coaching state persists at `.copilot-tracking/dt/{project-slug}/coaching-state.md` as YAML with:
- `project` (name, slug, created, initial_request, initial_classification)
- `current` (method, space, phase)
- `methods_completed` array
- `transition_log` (from/to method, rationale, date)
- `hint_calibration` (level 1-4, pattern notes)
- `session_log` (date, method, summary)
- `artifacts` (path, method, type)

### Industry Contexts Available

Manufacturing, Healthcare, Energy -- each provides vocabulary mapping, operational constraints, and empathy tools. Instruction files at `.github/instructions/design-thinking/dt-industry-{name}.instructions.md`.

---

## Key File Locations

### Documentation (Read These First)

| Priority | File | What You Learn |
|----------|------|---------------|
| 1 | `docs/design-thinking/README.md` | Framework overview, 9 methods, 3 spaces |
| 2 | `docs/design-thinking/dt-coach.md` | How to use the coach, example interaction, tips |
| 3 | `docs/design-thinking/why-design-thinking.md` | When to use DT vs skip to RPI |
| 4 | `docs/design-thinking/using-together.md` | Full end-to-end walkthrough (manufacturing) |
| 5 | `docs/design-thinking/dt-rpi-integration.md` | How DT feeds into RPI pipeline |
| 6 | `docs/design-thinking/tutorial-handoff-to-rpi.md` | Step-by-step handoff tutorial |

### Instruction Files (The Brain)

```
.github/instructions/design-thinking/
  dt-coaching-identity.instructions.md       ← Think/Speak/Empower philosophy
  dt-coaching-state.instructions.md          ← Session persistence YAML schema
  dt-method-sequencing.instructions.md       ← Method navigation and transitions
  dt-quality-constraints.instructions.md     ← Fidelity rules, anti-polish
  dt-rpi-handoff-contract.instructions.md    ← Exit point schemas
  dt-subagent-handoff.instructions.md        ← Handoff readiness validation
  dt-image-prompt-generation.instructions.md ← DALL-E concept visualization
  dt-rpi-{research,planning,implement,review}-context.instructions.md ← Per-RPI-agent DT context
  dt-method-{01..09}-*.instructions.md       ← 9 base + 9 deep method files
  dt-industry-{manufacturing,healthcare,energy}.instructions.md
  dt-curriculum-{01..09}-*.instructions.md   ← 9 learning modules
  dt-curriculum-scenario-manufacturing.instructions.md
```

### Collection Manifest

```
collections/design-thinking.collection.yml   ← 58 items: 2 agents, 13 prompts, 43 instructions
collections/design-thinking.collection.md    ← Human-readable description
```

### Agents (Source Definitions)

```
.github/agents/design-thinking/dt-coach.agent.md         ← Coaching agent
.github/agents/design-thinking/dt-learning-tutor.agent.md ← Curriculum agent
```

---

## Validation Issues We Found and Fixed

During validation, we caught and corrected these issues in the dossier:

| Issue | What Was Wrong | Fix Applied |
|-------|---------------|-------------|
| Space naming | Dossier said "Validation Space", state schema stores `implementation` | Changed to "Implementation Space" everywhere |
| Method 8 name | "Test & Validate" vs "User Testing" (codebase is itself inconsistent) | Changed to "User Testing" (matches README) |
| State schema | Missing `initial_classification: "frozen \| fluid"` field | Added to example YAML |
| Subagent handoff | `dt-subagent-handoff.instructions.md` not mentioned | Added "Subagent Handoff Validation" section |
| Image prompts | `dt-image-prompt-generation.instructions.md` not mentioned | Added "Image Prompt Generation" section |
| RPI per-agent context | 4 RPI context instructions omitted | Added table with all 4 files |
| Instruction inventory | No complete list of 43 instruction files | Added full categorized inventory |

---

## What the User Wants to Do Next

Jordan needs to **run a Design Thinking session next week**. They:

- Already know the problem space (or at least have a starting point)
- Want to use the DT skills in Claude Code (not VS Code/Copilot)
- Need to facilitate a meeting with stakeholders
- Were advised to start with `/dt-start-project` and let the coach guide Method 1

The meeting prep guide (`DESIGN-THINKING-MEETING-PREP.md`) has their complete preparation checklist, realistic timeline, facilitation scripts, and a printable quick reference card.

---

## How to Reproduce This Setup on Another Machine

### Prerequisites

1. Clone the upstream repo: `git clone https://github.com/microsoft/hve-core.git`
2. The `.github/instructions/design-thinking/` files ship with the repo (43 instruction files)
3. The `.github/prompts/design-thinking/` files ship with the repo (13 prompt files)

### Copy the Local-Only Files

These files are untracked and must be copied manually:

```bash
# From Jordan's machine, copy:
DESIGN-THINKING-DOSSIER.md          → repo root
DESIGN-THINKING-MEETING-PREP.md     → repo root
HANDOVER.md                         → repo root
.claude/skills/dt-*/SKILL.md        → .claude/skills/ (14 skill directories)
```

Or recreate the skills by running the same session flow:
1. The skills are thin wrappers (~50 lines each) that `cat` the instruction files
2. They can be regenerated from the source prompts in `.github/prompts/design-thinking/`

### Verify Skills Work

```bash
cd /path/to/hve-core
# In Claude Code:
# Type /dt and verify autocomplete shows all 14 DT commands
# Test: /dt-start-project project-slug=test-run
```

---

## Open Questions / Decisions Not Yet Made

1. **Should the `.claude/skills/` be committed?** They're currently untracked. If committed, other Claude Code users of hve-core get them automatically. If not, they need to be recreated per-machine.
2. **What is the meeting topic?** Jordan hasn't specified the actual problem/request for next week's session yet.
3. **Which industry context applies?** Manufacturing, Healthcare, Energy, or none?
4. **Should we contribute back to upstream?** The Claude Code skills could be a PR to microsoft/hve-core if they want to support Claude Code alongside Copilot.

---

*Generated from a single Claude Opus session covering research, validation, skill creation, and meeting preparation for HVE Core's Design Thinking framework.*
