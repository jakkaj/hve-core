---
title: Frontmatter Schema Reference
description: Complete schema reference for agent, prompt, instruction, and skill frontmatter fields
sidebar_position: 2
keywords: [frontmatter, schema, YAML, fields, platform support, input variables, validation]
---

# Frontmatter Schema Reference

For what each artifact type does, see [Artifact Types](artifact-types). This page covers the YAML frontmatter fields for each type.

## Agent Frontmatter (.agent.md)

| Field | Required | Type | Description | Example |
|---|---|---|---|---|
| `description` | Yes | string | Brief description shown as placeholder in chat input | `"Code review assistant for quality and security"` |
| `name` | No | string | Display name in agent picker (default: filename) | `"Task Planner"` |
| `tools` | No | string[] | Tool restrictions; omit for all tools | `["codebase", "terminal"]` |
| `handoffs` | No | object[] | Clickable next-step buttons after response | See below |
| `model` | No | string | Lock to specific LLM | `"claude-sonnet-4"` |
| `argument-hint` | No | string | Hint text in chat input field | `"describe your task"` |
| `target` | No | string | Platform restriction | `"vscode"` or `"github-copilot"` |

### Handoffs Syntax

```yaml
handoffs:
  - label: "📋 Create Plan"
    agent: task-planner
    prompt: "/task-plan"
    send: false
```

When `tools` is omitted, all tools available in the current context are accessible. When specified, only the listed tools are available.

## Prompt Frontmatter (.prompt.md)

| Field | Required | Type | Description | Example |
|---|---|---|---|---|
| `description` | Yes | string | Brief description of the prompt | `"Stage and commit with conventional messages"` |
| `agent` | No | string | Agent to delegate execution to | `"github-backlog-manager"` |
| `argument-hint` | No | string | Hint text in the prompt picker | `"[topic] [chat={true\|false}]"` |
| `model` | No | string | Model specification | `"claude-sonnet-4"` |
| `name` | No | string | Display name for the prompt | `"git-commit"` |

### Input Variables

Prompts accept user-provided values through input variable syntax:

| Syntax | Behavior | Example |
|---|---|---|
| `${input:name}` | Required input, inferred from context | `${input:topic}` |
| `${input:name:default}` | Optional with default value | `${input:severity:3}` |

Document input variables in an `## Inputs` section within the prompt file.

## Instruction Frontmatter (.instructions.md)

| Field | Required | Type | Description | Example |
|---|---|---|---|---|
| `description` | Yes | string | Brief description of what the instruction enforces | `"C# conventions for .NET 10"` |
| `applyTo` | Yes | string | Glob pattern for file matching | `"**/*.cs"` |

Instructions are the simplest artifact type. The `applyTo` field is the key: it determines which files trigger the instruction to load. Glob patterns support `*` (single segment), `**` (recursive), `?` (single character), and `{a,b}` (alternation).

### Common applyTo Patterns

| Pattern | Matches |
|---|---|
| `**/*.cs` | All C# files |
| `**/*.py` | All Python files |
| `**/*.tf, **/*.tfvars` | All Terraform files |
| `docs/docusaurus/**` | All files under the Docusaurus project |
| `**` | Every file (use sparingly) |

## Skill Frontmatter (SKILL.md)

| Field | Required | Type | Description | Example |
|---|---|---|---|---|
| `name` | Yes | string | Skill identifier, must match directory name | `"video-to-gif"` |
| `description` | Yes | string | Brief description of the skill | `"Video-to-GIF conversion with FFmpeg"` |

Skills use `name` (not present in other types) and require it to match the containing directory name in lowercase kebab-case.

## Platform Support Matrix

Not all platforms support all frontmatter fields. This matrix shows current support:

| Field | VS Code Chat | Copilot CLI | Coding Agent | Claude Code |
|---|---|---|---|---|
| `description` | ✅ | ✅ | ✅ | ✅ |
| `tools` | ✅ | ❌ | ✅ | ❌ |
| `handoffs` | ✅ | ❌ | ❌ | ❌ |
| `agent` (delegation) | ✅ | ✅ | ✅ | ❌ |
| `argument-hint` | ✅ | ❌ | ❌ | ❌ |
| `applyTo` | ✅ | ✅ | ✅ | ✅ |
| `model` | ✅ | ✅ | ✅ | ❌ |

:::warning Platform differences
Features like `handoffs` and `tools` restrictions are VS Code Chat features. When using HVE-Core artifacts through other platforms, these fields are ignored. The core functionality (`description`, `applyTo`, `agent` delegation) works across all supported platforms.
:::

## Validation

Frontmatter is validated through schema files in `scripts/linting/schemas/`. Pattern-based mapping in `schema-mapping.json` determines which schema applies to each file.

To validate locally:

```bash
npm run lint:frontmatter
```

Schemas are available for instruction files (`instruction-frontmatter.schema.json`), agent files (`agent-frontmatter.schema.json`), and prompt files (`prompt-frontmatter.schema.json`).
