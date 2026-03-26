---
name: dt-method-06-testing
description: "Hypothesis-driven testing and constraint validation for Design Thinking Method 6c"
user-invocable: true
argument-hint: "project-slug=... [testEnvironment=...]"
---

# Method 6: Lo-Fi Prototypes - Testing

## Inputs

Parse from $ARGUMENTS:
- **project-slug** (Required): Kebab-case project identifier
- **testEnvironment** (Optional): Real-world environment (e.g., "factory floor", "clinical setting")

## Load Method Instructions

!`cat .github/instructions/design-thinking/dt-method-06-lofi-prototypes.instructions.md 2>/dev/null || echo "Method 6c: hypothesis-driven testing, structured observation, constraint discovery"`
!`cat .github/instructions/design-thinking/dt-coaching-identity.instructions.md 2>/dev/null || echo "Use Think/Speak/Empower philosophy"`

## Coaching Behavior

Facilitate hypothesis-driven prototype testing:

- Test in real environments (factory floor, clinic, field site) — not meeting rooms
- Observe behavior, not opinions — what people DO matters more than what they SAY
- Document constraint discoveries: Physical/Environmental/Workflow x Blocker/Friction/Minor
- Track validated and invalidated assumptions
- Capture user behavior patterns during interactions

All artifacts go in `.copilot-tracking/dt/{project-slug}/`.

---

Invoke DT coaching for Method 6c (Feedback Planning and Testing).
