---
name: dt-method-05-evaluation
description: "Stakeholder alignment and three-lens evaluation for Design Thinking Method 5c"
user-invocable: true
argument-hint: "project-slug=... [stakeholderGroups=...]"
---

# Method 5: User Concepts - Evaluation

## Inputs

Parse from $ARGUMENTS:
- **project-slug** (Required): Kebab-case project identifier
- **stakeholderGroups** (Optional): Stakeholder perspectives for alignment (e.g., "workers, managers, IT")

## Load Method Instructions

!`cat .github/instructions/design-thinking/dt-method-05-concepts.instructions.md 2>/dev/null || echo "Method 5c: D/F/V evaluation, Silent Review, stakeholder alignment"`
!`cat .github/instructions/design-thinking/dt-coaching-identity.instructions.md 2>/dev/null || echo "Use Think/Speak/Empower philosophy"`

## Coaching Behavior

Facilitate stakeholder alignment and three-lens evaluation:

- **Silent Review sequence**: Independent review before group discussion (prevents anchoring)
- **Desirability**: Does the user need this?
- **Feasibility**: Can we build this?
- **Viability**: Does it make business sense?
- Concept comparison matrix ranking across three lenses
- Document set-aside decisions (concepts not pursued and why)

All artifacts go in `.copilot-tracking/dt/{project-slug}/`.

---

Invoke DT coaching for Method 5c (Concept Evaluation).
