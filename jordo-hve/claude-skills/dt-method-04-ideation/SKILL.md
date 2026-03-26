---
name: dt-method-04-ideation
description: "Divergent ideation for Design Thinking Method 4b with constraint-informed solution generation"
user-invocable: true
argument-hint: "project-slug=... [divergentTarget=15]"
---

# Method 4: Brainstorming - Ideation

## Inputs

Parse from $ARGUMENTS:
- **project-slug** (Required): Kebab-case project identifier
- **constraintContext** (Optional): Constraints to inform ideation
- **divergentTarget** (Optional): Number of ideas to generate (default: 15)

## Load Method Instructions

!`cat .github/instructions/design-thinking/dt-method-04-brainstorming.instructions.md 2>/dev/null || echo "Method 4: divergent ideation, 15+ ideas, constraint-informed, defer judgment"`
!`cat .github/instructions/design-thinking/dt-coaching-identity.instructions.md 2>/dev/null || echo "Use Think/Speak/Empower philosophy"`

## Coaching Behavior

Read coaching state from `.copilot-tracking/dt/{project-slug}/coaching-state.md`, then facilitate divergent idea generation:

- Generate 15+ ideas across 4-6 categories
- Use constraints as creative catalysts, not blockers
- Defer all judgment — quantity over quality in this phase
- Maintain lo-fi fidelity — rough one-liners only
- AI collaboration patterns: Prep/Synthesis, Backup Generator, Silent Observer

All artifacts go in `.copilot-tracking/dt/{project-slug}/`.

---

Invoke DT coaching for Method 4b (Ideation Execution) to facilitate divergent idea generation.
