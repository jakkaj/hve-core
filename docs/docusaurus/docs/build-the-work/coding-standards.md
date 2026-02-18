---
title: Coding Standards
description: How instruction files auto-apply language conventions, and how to add your own
sidebar_position: 5
keywords: [instructions, applyTo, conventions, coding standards, invisible guardrails]
---

# Coding Standards

HVE-Core includes instruction files that auto-apply coding conventions whenever you edit a matching file. As described in [How It Works](../getting-started/how-it-works), the `applyTo` frontmatter pattern matches files by glob, and the conventions activate without any invocation.

This page covers which standards are available, how to add your own, and a clever trick that the RPI workflow uses.

## Available Standards

| Language / Domain | File Pattern | Key Conventions |
|---|---|---|
| C# (.NET 10, C# 14) | `**/*.cs` | Primary constructors, PascalCase, XML docs, nullable refs |
| C# Tests | `**/*.cs` | XUnit + NSubstitute, BDD naming, Arrange/Act/Assert |
| Python 3.11+ | `**/*.py` | pathlib, type hints, click CLI, Google docstrings |
| Bash 5.x | `**/*.sh` | strict mode, ShellCheck, main() pattern, 2-space indent |
| Bicep 0.36+ | `**/bicep/**` | camelCase params, PascalCase types, MCP tools for schema |
| Terraform 1.6+ | `**/*.tf`, `**/*.tfvars` | snake_case resources, modules/, coalesce() over ternary |
| Markdown | `**/*.md` | markdownlint, frontmatter required, ATX headings |
| Writing Style | `**/*.md` | Voice/tone, no em dashes, no hedging, pronoun conventions |

Each instruction file targets a specific language version and includes conventions for naming, structure, error handling, documentation, and a complete example demonstrating all patterns.

The Bicep and Terraform instructions are coding standards that help you write infrastructure code correctly. For the relationship between writing IaC and deploying it, see [Infrastructure as Code](../ship-it/infrastructure-as-code).

## Adding Your Own Standards

Create a file in `.github/instructions/` with an `applyTo` pattern:

```yaml
---
description: "Project-specific API conventions for REST endpoints"
applyTo: "src/api/**/*.ts"
---

# API Conventions

* Use Zod for request validation
* Return RFC 7807 problem details for errors
* Rate limit all public endpoints
```

Every time you (or an AI agent) edits a file matching `src/api/**/*.ts`, these conventions activate. The AI follows your project's API patterns without being told.

## The Plan File Trick

The RPI workflow's plan files use the `.instructions.md` suffix intentionally:

```text
.copilot-tracking/plans/2026-02-18-auth-refactor-plan.instructions.md
```

When the Task Implementor opens the plan file, the editing environment recognizes the `.instructions.md` extension and auto-applies it as context. The plan becomes a self-activating instruction set: the implementor literally cannot ignore it because the file system makes it part of the active instructions.

This is a deliberate design choice that uses the `applyTo` mechanism for workflow continuity, not just coding standards.

:::tip Python environment management
The `uv-projects.instructions.md` file auto-applies to Python files and manages virtual environments with `uv`. When you create a new Python project, `uv init` and `uv add` handle dependencies, and the instruction file ensures consistent environment setup across the team.
:::

For how these standards are validated during code review, see [Code Review & PRs](code-review-prs). For the broader architecture that enables auto-application, see [How It Works](../getting-started/how-it-works).
