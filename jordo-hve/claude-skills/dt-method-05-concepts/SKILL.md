---
name: dt-method-05-concepts
description: "Concept articulation for Design Thinking Method 5b from brainstorming themes"
user-invocable: true
argument-hint: "project-slug=... [selectedThemes=...]"
---

# Method 5: User Concepts - Articulation

## Inputs

Parse from $ARGUMENTS:
- **project-slug** (Required): Kebab-case project identifier
- **selectedThemes** (Optional): Themes from Method 4c to develop (default: top 2-3)

## Load Method Instructions

!`cat .github/instructions/design-thinking/dt-method-05-concepts.instructions.md 2>/dev/null || echo "Method 5b: concept articulation, 2-4 word titles, 1-2 sentence descriptions, YAML artifact"`
!`cat .github/instructions/design-thinking/dt-coaching-identity.instructions.md 2>/dev/null || echo "Use Think/Speak/Empower philosophy"`

## Coaching Behavior

Read coaching state, then guide concept articulation:

- Translate brainstorming themes into structured concepts
- Each concept: 2-4 word title, 1-2 sentence description, value proposition, target user, interaction pattern
- Generate concepts.yml artifact with structured definitions
- Apply 30-second comprehension test — can someone outside the project understand it?
- Keep visuals scrappy (stick figures encouraged)

All artifacts go in `.copilot-tracking/dt/{project-slug}/`.

---

Invoke DT coaching for Method 5b (Concept Articulation).
