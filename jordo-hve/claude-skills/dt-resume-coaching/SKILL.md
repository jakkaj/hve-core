---
name: dt-resume-coaching
description: "Resume an existing Design Thinking coaching session from saved state"
user-invocable: true
argument-hint: "project-slug=..."
---

# Resume Design Thinking Coaching

## Inputs

Parse from $ARGUMENTS:
- **project-slug** (Required): Kebab-case project identifier

## Load Coaching Instructions

!`cat .github/instructions/design-thinking/dt-coaching-identity.instructions.md 2>/dev/null || echo "Use Think/Speak/Empower coaching philosophy"`
!`cat .github/instructions/design-thinking/dt-coaching-state.instructions.md 2>/dev/null || echo "Read state from .copilot-tracking/dt/{project-slug}/coaching-state.md"`
!`cat .github/instructions/design-thinking/dt-method-sequencing.instructions.md 2>/dev/null || echo "Follow 9-method sequence across Problem/Solution/Implementation spaces"`

## Required Steps

### Step 1: Locate Project State

1. Look for coaching state file at `.copilot-tracking/dt/{project-slug}/coaching-state.md`
2. If not found, list directories under `.copilot-tracking/dt/` for alternatives
3. If no state file exists, suggest running `/dt-start-project`

### Step 2: Read and Summarize State

1. Read coaching state YAML — verify required fields: `project`, `current`, `methods_completed`, `transition_log`
2. Extract current method, space, and phase
3. Review `methods_completed` for overall progress
4. Check most recent `transition_log` entry for last method change
5. Check most recent `session_log` entry for previous session summary
6. Scan `artifacts` list for available project artifacts

### Step 3: Context Recovery

1. Present summary: "Last session you were working on Method [N] ([name]), in the [phase] phase. Here's where you left off: [session log summary]."
2. Show progress: which methods complete, which remain
3. Reference recent transition rationale
4. List key artifacts for current method
5. Ask user to confirm accuracy before proceeding

### Step 4: Resume Coaching

1. After confirmation, transition into active coaching at current method/phase
2. Read the relevant method instruction file for the current method
3. Continue naturally — pick up where the previous session ended
4. Update session_log with new entry for today

All artifacts scoped to `.copilot-tracking/dt/{project-slug}/`.

---

Resume the Design Thinking coaching session for the specified project.
