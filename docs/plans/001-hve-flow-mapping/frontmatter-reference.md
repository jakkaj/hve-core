# GitHub Copilot Frontmatter Reference: Complete Schema

**Generated**: 2026-02-17
**Sources**: Official GitHub docs, VS Code docs, hve-core validation schemas, Perplexity research
**Location**: `docs/plans/001-hve-flow-mapping/frontmatter-reference.md`

## Overview

Three file types use YAML frontmatter to configure behavior in GitHub Copilot:

| File Type | Extension | Location | Purpose |
|---|---|---|---|
| Agent | `.agent.md` | `.github/agents/` | Defines a specialized AI persona with tools and handoffs |
| Prompt | `.prompt.md` | `.github/prompts/` | Defines a reusable slash command that can delegate to an agent |
| Instruction | `.instructions.md` | `.github/instructions/` (or anywhere in workspace) | Defines auto-injected context based on file patterns |

All frontmatter is YAML delimited by `---` on separate lines at the top of the file. The markdown body after the frontmatter closing `---` becomes the system prompt (agents), task instructions (prompts), or injected context (instructions).

---

## `.agent.md` Frontmatter

### Schema

```yaml
---
description: string        # REQUIRED — shown as placeholder in chat input
name: string               # Display name in agent picker (default: filename)
tools:                     # Restrict available tools (default: all tools)
  - string                 # Built-in: codebase, editFiles, terminal, search, fetch, etc.
  - server/*               # MCP server tools: namespace/tool-name or namespace/*
argument-hint: string      # Hint text shown in chat input field
model: string              # Lock to specific LLM (e.g., "Claude Sonnet 4")
target: string             # "vscode" | "github-copilot" (default: both)
mcp-servers:               # Inline MCP server configuration
  - type: string           # Server type
    command: string        # Server command
    args: [string]         # Command arguments
    tools: ["*"]           # Tool filter
    env:                   # Environment variables
      KEY: ${{ secrets.X }}
handoffs:                  # Clickable next-step buttons after response
  - label: string          # Button text (e.g., "📋 Create Plan")
    agent: string          # Target agent name (e.g., "task-planner")
    prompt: string         # Message sent to target (e.g., "/task-plan")
    send: boolean          # Auto-submit on click (default: false)
---
```

### Field Reference

| Field | Type | Required | What It Does |
|---|---|---|---|
| `description` | string | **Yes** | Brief overview of agent purpose. Appears as placeholder text in chat input and hover tooltips. The only required field. |
| `name` | string | No | Display name in the agent picker dropdown. Defaults to filename without `.agent.md` extension. Use when the display name needs spaces or special characters. |
| `tools` | string[] | No | Explicit allowlist of tools the agent can use. When omitted, all available tools are accessible. When specified, the agent can ONLY use listed tools. Accepts built-in tools (`codebase`, `editFiles`, `terminal`, `search`, `fetch`, `usages`, `problems`, `githubRepo`), MCP server tools (`server-name/tool-name` or `server-name/*` for all tools from a server), and extension-contributed tools. |
| `handoffs` | object[] | No | Renders clickable buttons after the agent's response completes. Each handoff creates a button that transitions to another agent. `label`: the button text. `agent`: the target agent's name. `prompt`: the message pre-filled or auto-sent to the target. `send`: when `true`, auto-submits immediately on click; when `false` or omitted, pre-fills the prompt for user review before sending. Conversation history carries forward to the target agent. |
| `model` | string | No | Locks this agent to a specific LLM. Must match a model name from the VS Code model picker dropdown. When omitted, uses whatever model the user currently has selected. |
| `argument-hint` | string | No | Guidance text shown in the chat input field to help users understand what to type. Appears as a tooltip or placeholder after selecting the agent. |
| `target` | enum | No | Restricts agent to a specific platform. `"vscode"` = VS Code only. `"github-copilot"` = GitHub cloud/coding agent only. When omitted, the agent is available in all environments. |
| `mcp-servers` | object[] | No | Inline MCP server configuration. Allows agents to declare their own MCP server dependencies. Supports environment variable syntax including `${{ secrets.VAR }}` for secret injection. Primarily used at organization/enterprise level. |

### Platform Support

| Field | VS Code | Copilot CLI | GitHub Coding Agent |
|---|---|---|---|
| `description` | ✅ | ✅ | ✅ |
| `name` | ✅ | ❌ | ✅ |
| `tools` | ✅ | ❌ | ✅ |
| `handoffs` | ✅ Renders buttons | ❌ Causes parse errors | ✅ |
| `model` | ✅ | ❌ Ignored | ✅ |
| `argument-hint` | ✅ | ❌ Ignored | ❌ |
| `target` | ✅ | ❌ | ✅ |
| `mcp-servers` | ✅ (org/enterprise) | ❌ | ✅ |

### Example

```yaml
---
description: 'Task research specialist for comprehensive project analysis'
handoffs:
  - label: "📋 Create Plan"
    agent: task-planner
    prompt: /task-plan
    send: true
---

# Task Researcher

Research codebase patterns, external documentation, and conventions...
```

---

## `.prompt.md` Frontmatter

### Schema

```yaml
---
description: string        # REQUIRED — shown when browsing slash commands
name: string               # The /command name (default: filename)
agent: string              # Route to specific agent (default: "agent")
tools:                     # Override agent's tool list for this prompt
  - string
model: string              # Lock to specific LLM for this prompt
argument-hint: string      # Hint shown after typing /command
mode: string               # "ask" for text-only (no code tools)
---
```

### Field Reference

| Field | Type | Required | What It Does |
|---|---|---|---|
| `description` | string | **Yes** | Brief description of what the prompt does. Shown when browsing available slash commands. |
| `name` | string | No | The slash command name — what users type after `/`. Defaults to the filename without `.prompt.md`. For example, `task-research.prompt.md` registers as `/task-research`. |
| `agent` | string | No | Routes this prompt's execution to a specific agent. The target agent's `.agent.md` file becomes the system prompt. Built-in values: `ask` (text only), `edit` (edit mode), `agent` (default autonomous mode). Custom values: any agent name (e.g., `task-researcher`, `github-backlog-manager`). When omitted, uses the currently selected agent. |
| `tools` | string[] | No | Overrides the target agent's tool list for this specific prompt invocation. Takes precedence over the agent's own `tools:` field. |
| `model` | string | No | Locks to a specific LLM for this prompt. Takes precedence over the agent's `model:` field. |
| `argument-hint` | string | No | Hint text shown after the user types the `/command`. Guides the user on what additional input to provide. |
| `mode` | string | No | Sets the interaction mode. `ask` = text generation only (no file editing or terminal tools). |

### Platform Support

| Field | VS Code | Copilot CLI |
|---|---|---|
| `description` | ✅ | ✅ |
| `name` | ✅ | ✅ |
| `agent` | ✅ Routes to agent | ❓ Unknown |
| `tools` | ✅ Overrides agent tools | ❓ Unknown |
| `model` | ✅ | ❌ |
| `argument-hint` | ✅ | ❌ |
| `mode` | ✅ | ❓ Unknown |

### Example

```yaml
---
description: 'Initiates research for implementation planning based on user requirements'
agent: 'task-researcher'
---

Follow the Required Steps to complete the research...
```

### The `agent:` Delegation Mechanism

When a user types `/task-research`, VS Code:

1. Finds `task-research.prompt.md` (by filename match)
2. Reads `agent: 'task-researcher'` from frontmatter
3. Switches the active agent to `task-researcher`
4. Loads `task-researcher.agent.md` as the system prompt
5. Sends the prompt file's markdown body as the initial instructions
6. The user's message (if any) is appended as additional context

This is how prompts act as **entry points into agent workflows** — the prompt is the door, the agent is the room you enter.

---

## `.instructions.md` Frontmatter

### Schema

```yaml
---
description: string        # REQUIRED — describes the instruction's purpose
name: string               # Display name (default: filename)
applyTo: string            # Glob pattern for auto-injection (comma-separated for multiple)
excludeAgent: string       # Prevent specific agents from receiving these instructions
---
```

### Field Reference

| Field | Type | Required | What It Does |
|---|---|---|---|
| `description` | string | **Yes** | Describes what conventions or standards this instruction file defines. |
| `name` | string | No | Display name for the instruction. Defaults to filename without `.instructions.md`. |
| `applyTo` | string (glob) | No | When present, VS Code auto-injects this file's markdown content into the LLM context whenever the user is working on files matching the glob pattern. Supports standard glob syntax: `**/*.py` (all Python files), `**/*.cs` (all C# files), `**/bicep/**` (all files in bicep directories). Comma-separated for multiple patterns: `**/*.py, **/*.ipynb`. When omitted, the instruction file is NOT automatically applied — it would only be used if explicitly referenced. |
| `excludeAgent` | string \| string[] | No | Prevents specific agents from receiving these instructions. Known values: `"coding-agent"`, `"code-review"`. Documented for GitHub Copilot coding agent and CLI. Not yet in hve-core's validation schema. |

### Platform Support

| Field | VS Code | Copilot CLI |
|---|---|---|
| `description` | ✅ | ✅ |
| `applyTo` | ✅ Full glob matching | ✅ Full glob matching |
| `excludeAgent` | ❓ | ✅ |

### Example: Standard Use (Coding Conventions)

```yaml
---
description: 'Instructions for Python scripting implementation'
applyTo: '**/*.py'
---

# Python Script Instructions

Use pathlib.Path exclusively, avoid os.path...
```

When a user opens any `.py` file, this content is silently injected into the LLM's context.

### Example: Clever Use (Plan-to-Changes Binding)

```yaml
---
applyTo: '.copilot-tracking/changes/2026-02-17-blob-storage-changes.md'
---

# Implementation Plan: Blob Storage

## Implementation Checklist
### [ ] Phase 1: Storage Client Setup
...
```

This plan file uses `.instructions.md` as its suffix, so VS Code discovers it. The `applyTo:` points to a specific changes file. When the implementor opens that changes file, the plan auto-injects as context — creating a file-to-file binding.

### How `applyTo:` Injection Works

```
User opens src/models/user.py
    │
    ├── VS Code scans all *.instructions.md files
    ├── Checks each file's applyTo: against "src/models/user.py"
    │
    ├── python-script.instructions.md  (applyTo: **/*.py)       → MATCH → inject
    ├── csharp.instructions.md         (applyTo: **/*.cs)       → no match
    ├── writing-style.instructions.md  (applyTo: **/*.md)       → no match
    ├── uv-projects.instructions.md    (applyTo: **/*.py)       → MATCH → inject
    │
    └── LLM context now includes: user.py content + python-script + uv-projects
```

Multiple instruction files can match the same file — they all stack. The LLM receives all matching instructions simultaneously.

### Where Instruction Files Can Live

| Location | Discovered? | Notes |
|---|---|---|
| `.github/instructions/` | ✅ Always scanned | Standard location |
| `.github/instructions/hve-core/` | ✅ Scanned but excluded from extension packaging | Repo-specific only |
| `.copilot-tracking/plans/*.instructions.md` | ✅ Scanned | The plan-binding trick works because ANY `.instructions.md` file anywhere in the workspace is discovered |
| `src/my-thing.instructions.md` | ✅ Scanned | Would work but unconventional |
| `~/.copilot/instructions/` | ✅ User-level | Personal instructions across all projects |

The discovery is suffix-based (`.instructions.md`), not directory-based. Any file with that suffix anywhere in the workspace or user profile is a candidate for `applyTo:` matching.

---

## Cross-Platform Comparison: What Works Where

| Feature | VS Code | Copilot CLI | GitHub Coding Agent | Claude Code |
|---|---|---|---|---|
| `.agent.md` discovery | ✅ `.github/agents/` | ✅ `.github/agents/` | ✅ `.github/agents/` | ❌ Uses `.claude/agents/` |
| Agent `handoffs:` buttons | ✅ Clickable UI | ❌ Parse errors | ✅ | ❌ N/A |
| Agent `tools:` restriction | ✅ | ❌ | ✅ | ❌ Different mechanism |
| `.prompt.md` slash commands | ✅ `/command` | ✅ `/command` | ❓ | ❌ Uses `.claude/commands/` |
| Prompt `agent:` delegation | ✅ Routes to agent | ❓ Unknown | ❓ | ❌ N/A |
| `.instructions.md` discovery | ✅ Anywhere with suffix | ✅ `.github/instructions/` | ✅ `.github/instructions/` | ❌ Uses `CLAUDE.md` hierarchy |
| `applyTo:` glob injection | ✅ Full support | ✅ Full support | ✅ | ❌ Directory-based instead |
| `excludeAgent:` | ❓ | ✅ | ✅ | ❌ N/A |
| `model:` override | ✅ | ❌ Ignored | ✅ | ❌ N/A |
| `target:` platform filter | ✅ | ❌ | ✅ | ❌ N/A |
| `runSubagent` tool | ✅ | ❓ Unknown | ❓ | ❌ Different subagent model |
| `/clear` context reset | ✅ | Different mechanism | N/A | `/clear` exists |
