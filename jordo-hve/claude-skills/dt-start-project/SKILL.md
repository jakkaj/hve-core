---
name: dt-start-project
description: "Start a new Design Thinking coaching project with state initialization and first Method 1 coaching interaction"
user-invocable: true
argument-hint: "project-slug=... [context=...] [industry=...]"
---

# Start Design Thinking Project

## Inputs

Parse from $ARGUMENTS:
- **project-slug** (Required): Kebab-case project identifier (e.g., `factory-floor-maintenance`)
- **context** (Optional): Initial project context, problem statement, or customer request
- **stakeholders** (Optional): Known stakeholder groups or key contacts
- **industry** (Optional): Industry context — manufacturing, healthcare, energy, etc.

## Load Coaching Instructions

Read core DT instructions for coaching behavior:
!`cat .github/instructions/design-thinking/dt-coaching-identity.instructions.md 2>/dev/null || echo "Use Think/Speak/Empower coaching philosophy"`
!`cat .github/instructions/design-thinking/dt-coaching-state.instructions.md 2>/dev/null || echo "Persist state at .copilot-tracking/dt/{project-slug}/coaching-state.md"`
!`cat .github/instructions/design-thinking/dt-method-01-scope.instructions.md 2>/dev/null || echo "Method 1: Scope Conversations — stakeholder discovery, frozen/fluid classification, constraint mapping"`

## Required Steps

### Step 1: Create Project Directory

Create `.copilot-tracking/dt/{project-slug}/` directory.

### Step 2: Initialize Coaching State

Create `.copilot-tracking/dt/{project-slug}/coaching-state.md` with this YAML content:

```yaml
project:
  name: "{human-readable name derived from slug}"
  slug: "{project-slug}"
  created: "{today's date YYYY-MM-DD}"
  initial_request: "{context provided verbatim, or ask user}"
  initial_classification: "pending"

current:
  method: 1
  space: "problem"
  phase: "Stakeholder discovery"

methods_completed: []

transition_log:
  - from_method: null
    to_method: 1
    rationale: "Project initialized"
    date: "{today's date}"

hint_calibration:
  level: 1
  pattern_notes: "New project — starting at Level 1"

session_log:
  - date: "{today's date}"
    method: 1
    summary: "Project initialized, beginning Method 1 coaching"

artifacts: []
```

### Step 3: Begin Method 1 Coaching

Using Think/Speak/Empower philosophy:
1. Capture the initial request verbatim
2. Begin Method 1 (Scope Conversations) coaching
3. Guide stakeholder discovery across three tiers: decision makers, direct users, affected parties
4. Start frozen vs fluid constraint classification
5. Ask one thoughtful question to begin the conversation

All artifacts go in `.copilot-tracking/dt/{project-slug}/`. Never write DT artifacts without a project-slug directory.

---

Start the Design Thinking coaching project by initializing the state directory and beginning Method 1 coaching.
