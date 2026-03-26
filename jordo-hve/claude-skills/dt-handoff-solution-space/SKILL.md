---
name: dt-handoff-solution-space
description: "Solution Space exit handoff — compiles DT Methods 4-6 outputs into an RPI-ready artifact targeting Task Researcher"
user-invocable: true
argument-hint: "project-slug=..."
---

# Solution Space Exit Handoff

Compile Design Thinking Methods 4-6 outputs into an RPI-ready handoff artifact targeting Task Researcher. Invoke when a team graduates from the Solution Space and chooses lateral handoff to the RPI pipeline.

## Inputs

Parse from $ARGUMENTS:
- **project-slug** (Required): Kebab-case project identifier

## Load Handoff Contract

!`cat .github/instructions/design-thinking/dt-rpi-handoff-contract.instructions.md 2>/dev/null || echo "Use standard exit-point schema with confidence markers"`

## Required Steps

### Step 1: Read Coaching State

1. Read `.copilot-tracking/dt/{project-slug}/coaching-state.md`
2. Verify Methods 4, 5, and 6 appear in `methods_completed`
3. If any incomplete, report which remain and suggest resuming coaching

### Step 2: Compile DT Artifacts

Read all Method 4-6 artifacts:

- **Method 4**: Theme clusters, selected themes, brainstorming notes
- **Method 5**: concepts.yml with D/F/V evaluations, prioritized concepts
- **Method 6**: constraint-discoveries.md, test-observations.md, prototype variations, validated/invalidated assumptions, user behavior patterns

### Step 3: Readiness Assessment

Evaluate against signals (tag each validated/assumed/unknown/conflicting):
- Lo-fi prototypes tested in real user environments
- Constraints categorized by type and severity
- Core assumptions validated or invalidated through testing
- Directions narrowed to 1-2 validated approaches
- User behavior patterns documented

### Step 4: Produce Handoff Artifact

Create `.copilot-tracking/dt/{project-slug}/handoff-solution-space.md` with YAML header:
```yaml
exit_point: "concept-validated"
dt_method: 6
dt_space: "solution"
handoff_target: "researcher"
date: "{today's date}"
```

Include: Artifacts, Constraints (with category/severity), Assumptions (with validation status), Validated Patterns, Technical Unknowns.

### Step 5: Generate RPI Entry

Create `.copilot-tracking/research/{project-slug}-research-topic.md` with:
- Research Topic, Known Constraints, Observed Context, Investigation Priorities, DT Artifact Paths

---

Execute the Solution Space exit handoff for the specified project.
