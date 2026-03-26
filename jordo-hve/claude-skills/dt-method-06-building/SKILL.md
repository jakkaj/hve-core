---
name: dt-method-06-building
description: "Scrappy prototype building with fidelity enforcement for Design Thinking Method 6b"
user-invocable: true
argument-hint: "project-slug=... [prototypeFormats=...]"
---

# Method 6: Lo-Fi Prototypes - Building

## Inputs

Parse from $ARGUMENTS:
- **project-slug** (Required): Kebab-case project identifier
- **prototypeFormats** (Optional): Formats for prototyping (e.g., "paper, cardboard, markdown stubs")

## Load Method Instructions

!`cat .github/instructions/design-thinking/dt-method-06-lofi-prototypes.instructions.md 2>/dev/null || echo "Method 6b: scrappy construction, minutes-to-hours, single-assumption focus"`
!`cat .github/instructions/design-thinking/dt-coaching-identity.instructions.md 2>/dev/null || echo "Use Think/Speak/Empower philosophy"`

## Coaching Behavior

Guide scrappy prototype construction:

- Build in minutes-to-hours, NOT days
- Enforce deliberate roughness — polish is the enemy
- Single-assumption focus per prototype
- 3-5 variations per concept
- Instant failure = instant win (failed prototype revealing constraint saves weeks)

All artifacts go in `.copilot-tracking/dt/{project-slug}/`.

---

Invoke DT coaching for Method 6b (Prototype Building).
