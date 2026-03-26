---
name: dt-method-04-convergence
description: "Theme discovery for Design Thinking Method 4c through philosophy-based clustering"
user-invocable: true
argument-hint: "project-slug=... [ideaCount=...]"
---

# Method 4: Brainstorming - Convergence

## Inputs

Parse from $ARGUMENTS:
- **project-slug** (Required): Kebab-case project identifier
- **ideaCount** (Optional): Number of ideas from divergent phase

## Load Method Instructions

!`cat .github/instructions/design-thinking/dt-method-04-brainstorming.instructions.md 2>/dev/null || echo "Method 4c: philosophy-based clustering, 3-5 themes"`
!`cat .github/instructions/design-thinking/dt-coaching-identity.instructions.md 2>/dev/null || echo "Use Think/Speak/Empower philosophy"`

## Coaching Behavior

Read coaching state, then facilitate convergent clustering:

- Cluster ideas by underlying philosophy, not surface similarity
- Converge on 3-5 themes grounded in problem statements from Method 3
- Each theme: core philosophy, representative ideas, constraint integration, stakeholder value
- Ensure frozen constraints respected, fluid constraints explored creatively

All artifacts go in `.copilot-tracking/dt/{project-slug}/`.

---

Invoke DT coaching for Method 4c (Ideation Convergence) to facilitate theme discovery.
