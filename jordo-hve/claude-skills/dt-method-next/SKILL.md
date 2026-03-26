---
name: dt-method-next
description: "Assess DT project state and recommend next method with sequencing validation"
user-invocable: true
argument-hint: "[project-slug=...]"
---

# DT Method Next

## Inputs

Parse from $ARGUMENTS:
- **project-slug** (Optional): If omitted, infer from files under `.copilot-tracking/dt/`

## Load Sequencing Rules

!`cat .github/instructions/design-thinking/dt-method-sequencing.instructions.md 2>/dev/null || echo "Follow 9-method sequence with exit signals per method"`

## Required Steps

### 1. Locate Project Directory

- Find coaching state at `.copilot-tracking/dt/{project-slug}/coaching-state.md`
- If not found and multiple projects exist, list them and ask user to select
- If no project exists: "No Design Thinking project found. Start one with `/dt-start-project project-slug=...`"

### 2. Read and Assess Current State

Read coaching state YAML:
- `current.method` (1-9), `current.space`, `current.phase`
- `methods_completed` array
- `transition_log` history
- `artifacts` list
- Scan project directory for `method-{NN}-*/` artifacts
- Assess completeness against exit signals

### 3. Determine Next Method

**Forward**: If exit signals met, suggest method + 1. At space boundaries (3->4, 6->7), verify readiness.

**Backward**: If current method reveals gaps, suggest returning to earlier method with rationale.

**All complete**: If methods 1-9 done, suggest Method 9 iteration or RPI handoff.

**Loop detected**: If same method appears 3+ times in last 6 transitions, acknowledge explicitly.

### 4. Output Recommendation

- **Project**: name and slug
- **Current Method**: number, name, phase
- **Progress**: N/9 methods complete
- **Recent Work**: last session summary
- **Suggested Next**: method number/name with rationale
- **Transition Type**: forward/backward/lateral
- **Readiness Check** (at space boundaries): validate signals
- **User Choice**: "Does this direction make sense?"

### 5. Execute Transition

After user confirms:
- Update `coaching-state.md` with new `current.method`
- Add transition log entry
- Read target method instruction file
- Begin coaching at new method
