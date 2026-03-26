---
name: dt-handoff-implementation-space
description: "Implementation Space exit handoff — compiles DT Methods 7-9 outputs into an RPI-ready artifact with tiered routing"
user-invocable: true
argument-hint: "project-slug=..."
---

# Implementation Space Exit Handoff

Compile Design Thinking Methods 7-9 outputs into an RPI-ready handoff artifact with tiered routing. This is the final DT exit point carrying cumulative artifact lineage from all nine methods.

## Inputs

Parse from $ARGUMENTS:
- **project-slug** (Required): Kebab-case project identifier

## Load Handoff Contract

!`cat .github/instructions/design-thinking/dt-rpi-handoff-contract.instructions.md 2>/dev/null || echo "Use standard exit-point schema with confidence markers and tiered routing"`

## Required Steps

### Step 1: Read Coaching State and Determine Tier

1. Read `.copilot-tracking/dt/{project-slug}/coaching-state.md`
2. Check `methods_completed` to determine exit tier:
   - Method 7 only -> Tier 1 (guided)
   - Methods 7-8 -> Tier 2 (structured)
   - Methods 7-9 -> Tier 3 (comprehensive)
3. If no Implementation Space methods complete, suggest resuming coaching

### Step 2: Compile DT Artifacts

Read all artifacts organized by method:

- **Method 7**: Architecture decisions, implementation comparisons (2-3 approaches), fidelity matrix, benchmarks, integration validation, specs
- **Method 8** (Tier 2+): Test protocols, participant profiles, behavioral observations, severity-frequency matrix, assumption validation, refinement log
- **Method 9** (Tier 3): Baselines, telemetry framework, refinement cycles, scaling assessment, deployment plan, adoption metrics

### Step 3: Readiness Assessment

Tag each readiness signal (validated/assumed/unknown/conflicting). If critical gaps exist, ask whether to proceed or address gaps.

### Step 4: Produce Handoff Artifact

Create `.copilot-tracking/dt/{project-slug}/handoff-implementation-space.md` with full cumulative artifact lineage from all completed methods.

### Step 5: Completion Ceremony

Summarize the complete DT journey, celebrate the team's work, and hand off to RPI.

---

Execute the Implementation Space exit handoff for the specified project.
