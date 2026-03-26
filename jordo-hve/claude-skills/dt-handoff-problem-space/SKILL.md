---
name: dt-handoff-problem-space
description: "Problem Space exit handoff — compiles DT Methods 1-3 outputs into an RPI-ready artifact targeting Task Researcher"
user-invocable: true
argument-hint: "project-slug=..."
---

# Problem Space Exit Handoff

Compile Design Thinking Methods 1-3 outputs into an RPI-ready handoff artifact targeting Task Researcher. Invoke when a team graduates from the Problem Space and chooses lateral handoff to the RPI pipeline.

## Inputs

Parse from $ARGUMENTS:
- **project-slug** (Required): Kebab-case project identifier

## Load Handoff Contract

!`cat .github/instructions/design-thinking/dt-rpi-handoff-contract.instructions.md 2>/dev/null || echo "Handoff contract not found — use standard exit-point schema with confidence markers"`

## Required Steps

### Step 1: Read Coaching State

1. Read `.copilot-tracking/dt/{project-slug}/coaching-state.md`
2. Verify Methods 1, 2, and 3 appear in `methods_completed`
3. If any incomplete, report which remain and suggest resuming coaching first

### Step 2: Compile DT Artifacts

Read all Method 1-3 artifacts from the coaching state `artifacts` section:

- **Method 1**: Stakeholder map, scope boundaries, assumptions log, frozen/fluid classification
- **Method 2**: Research plan, findings, interview notes, observation data
- **Method 3**: Affinity clusters, insight statements, problem definition, HMW questions

Record path, type, and evidence summary for each. Note any missing artifacts as gaps.

### Step 3: Readiness Assessment

Evaluate against these signals (tag each with validated/assumed/unknown/conflicting):
- Synthesis validated across five dimensions
- Discovered problem differs from original request
- Multiple stakeholder perspectives represented
- Environmental and workflow constraints documented

If critical gaps exist, present findings and ask whether to proceed or address gaps first.

### Step 4: Produce Handoff Artifact

Create `.copilot-tracking/dt/{project-slug}/handoff-summary.md` with YAML header:
```yaml
exit_point: "problem-statement-complete"
dt_method: 3
dt_space: "problem"
handoff_target: "researcher"
date: "{today's date}"
```

Include: Artifacts with confidence markers, Constraints with sources, Assumptions with impact ratings.

Record lateral transition in coaching state transition_log.

### Step 5: Generate RPI Entry

Create `.copilot-tracking/dt/{project-slug}/rpi-handoff-problem-space.md` with:
- Problem Statement, Stakeholder Context, Research Themes, Constraints, Investigation Targets, Coaching Notes

Inline all content — document must stand alone for the receiving RPI agent.

---

Execute the Problem Space exit handoff for the specified project.
