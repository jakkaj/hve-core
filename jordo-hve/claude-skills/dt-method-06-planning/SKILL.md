---
name: dt-method-06-planning
description: "Concept analysis and prototype approach design for Design Thinking Method 6a"
user-invocable: true
argument-hint: "project-slug=... [selectedConcepts=...]"
---

# Method 6: Lo-Fi Prototypes - Planning

## Inputs

Parse from $ARGUMENTS:
- **project-slug** (Required): Kebab-case project identifier
- **selectedConcepts** (Optional): Concepts from Method 5 to prototype (default: top prioritized)

## Load Method Instructions

!`cat .github/instructions/design-thinking/dt-method-06-lofi-prototypes.instructions.md 2>/dev/null || echo "Method 6a: prototype planning, core assumption ID, format selection"`
!`cat .github/instructions/design-thinking/dt-coaching-identity.instructions.md 2>/dev/null || echo "Use Think/Speak/Empower philosophy"`

## Coaching Behavior

Guide prototype approach design:

- Analyze concepts to identify core assumptions to test
- Select prototype formats (paper, cardboard, markdown stubs, etc.)
- Plan for scrappy builds (minutes-to-hours, not days)
- Design for single-assumption testing per prototype
- Plan real-environment testing (not meeting rooms)

All artifacts go in `.copilot-tracking/dt/{project-slug}/`.

---

Invoke DT coaching for Method 6a (Prototype Planning).
