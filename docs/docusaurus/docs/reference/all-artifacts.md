---
title: All Artifacts A-Z
description: Complete catalog of every agent, prompt, instruction, and skill in HVE-Core
sidebar_position: 4
keywords: [catalog, artifacts, agents, prompts, instructions, skills, reference, inventory]
---

# All Artifacts A-Z

This is the complete catalog of every AI artifact in HVE-Core. Browse by type or use your browser's find (Ctrl+F / Cmd+F) to search for specific artifacts.

For what each type does, see [Artifact Types](artifact-types). For frontmatter field details, see [Frontmatter Schema](frontmatter-schema).

**Value tags**: 🟢 Core (featured in site narrative) · 🟡 Supporting (mentioned in context) · ⚪ Meta (internal tooling) · 🔴 Cleanup (deprecated)

## Agents

| Name | Description | Segment | Value |
|---|---|---|---|
| `@ado-prd-to-wit` | PRD analysis for Azure DevOps work item hierarchies | 📋 Shape | 🟡 Supporting |
| `@adr-creation` | Interactive architectural decision record creation | 📋 Shape | 🟡 Supporting |
| `@arch-diagram-builder` | ASCII architecture diagram generation | 📋 Shape | 🟡 Supporting |
| `@brd-builder` | Business Requirements Document creation | 📋 Shape | 🟡 Supporting |
| `@doc-ops` | Autonomous documentation quality operations | 🔨 Build | 🟡 Supporting |
| `@gen-data-spec` | Data dictionary and profile generation | 🔨 Build | 🟡 Supporting |
| `@gen-jupyter-notebook` | Exploratory data analysis notebook creation | 🔨 Build | 🟡 Supporting |
| `@gen-streamlit-dashboard` | Streamlit dashboard development | 🔨 Build | 🟡 Supporting |
| `@github-backlog-manager` | GitHub backlog orchestration (discover, triage, sprint, execute) | 📋 Shape | 🟢 Core |
| `@github-issue-manager` | ~~Deprecated~~ — replaced by github-backlog-manager | — | 🔴 Cleanup |
| `@hve-core-installer` | HVE-Core installation agent | — | ⚪ Meta |
| `@memory` | Conversation memory persistence | 🔨 Build | 🟡 Supporting |
| `@pr-review` | Pull request code review for quality and security | 🔨 Build | 🟢 Core |
| `@prd-builder` | Product Requirements Document creation through guided Q&A | 📋 Shape | 🟢 Core |
| `@prompt-builder` | Prompt engineering and artifact authoring | — | ⚪ Meta |
| `@rpi-agent` | Autonomous Research → Plan → Implement → Review orchestrator | 🔨 Build | 🟢 Core |
| `@security-plan-creator` | Cloud security plan generation | 📋 Shape | 🟡 Supporting |
| `@task-implementor` | Plan execution with progressive tracking | 🔨 Build | 🟢 Core |
| `@task-planner` | Implementation plan creation | 🔨 Build | 🟢 Core |
| `@task-researcher` | Codebase and external research | 🔨 Build | 🟢 Core |
| `@task-reviewer` | Implementation review against plan and conventions | 🔨 Build | 🟢 Core |
| `@test-streamlit-dashboard` | Automated Streamlit dashboard testing | 🔨 Build | 🟡 Supporting |

## Prompts

| Name | Description | Segment | Value |
|---|---|---|---|
| `/ado-create-pull-request` | Azure DevOps PR creation with work item linking | 🔨 Build | 🟡 Supporting |
| `/ado-get-build-info` | ADO build status and log retrieval | 🚀 Ship | 🟡 Supporting |
| `/ado-get-my-work-items` | Fetch assigned ADO work items | 📋 Shape | 🟡 Supporting |
| `/ado-process-my-work-items` | Enrich work items for task planning | 📋 Shape | 🟡 Supporting |
| `/ado-update-wit-items` | Execute planned work item changes | 📋 Shape | 🟡 Supporting |
| `/checkpoint` | Session state persistence | 🔨 Build | 🟡 Supporting |
| `/doc-ops-update` | Trigger documentation quality checks | 🔨 Build | 🟡 Supporting |
| `/git-commit` | Stage and commit with conventional messages | 🔨 Build | 🟢 Core |
| `/git-commit-message` | Generate conventional commit message only | 🔨 Build | 🟡 Supporting |
| `/git-merge` | Merge or rebase with conflict handling | 🔨 Build | 🟡 Supporting |
| `/git-setup` | One-time git configuration | 🔨 Build | 🟡 Supporting |
| `/github-add-issue` | Single GitHub issue creation | 📋 Shape | 🟡 Supporting |
| `/github-discover-issues` | Backlog gap discovery from artifacts | 📋 Shape | 🟢 Core |
| `/github-execute-backlog` | Batch issue create/update/close | 📋 Shape | 🟢 Core |
| `/github-sprint-plan` | Sprint and milestone planning | 📋 Shape | 🟢 Core |
| `/github-triage-issues` | Auto-label and prioritize issues | 📋 Shape | 🟢 Core |
| `/incident-response` | Azure incident triage, diagnosis, and RCA | 🚀 Ship | 🟡 Supporting |
| `/prompt-analyze` | Evaluate prompt engineering artifacts | — | ⚪ Meta |
| `/prompt-build` | Create prompt engineering artifacts | — | ⚪ Meta |
| `/prompt-refactor` | Refactor prompt engineering artifacts | — | ⚪ Meta |
| `/pull-request` | PR description generation | 🔨 Build | 🟢 Core |
| `/risk-register` | Qualitative risk assessment (P×I matrix) | 📋 Shape / 🚀 Ship | 🟡 Supporting |
| `/rpi` | Primary RPI flow entry point | 🔨 Build | 🟢 Core |
| `/task-implement` | RPI implementation phase entry | 🔨 Build | 🟢 Core |
| `/task-plan` | RPI planning phase entry | 🔨 Build | 🟢 Core |
| `/task-research` | RPI research phase entry | 🔨 Build | 🟢 Core |
| `/task-review` | RPI review phase entry | 🔨 Build | 🟢 Core |

## Instructions

| Name | `applyTo` | Description | Segment | Value |
|---|---|---|---|---|
| `ado-create-pull-request` | `.copilot-tracking/pr/new/**` | ADO PR creation protocol | 🔨 Build | 🟡 Supporting |
| `ado-get-build-info` | `.copilot-tracking/pr/*-build-*.md` | ADO build info protocol | 🚀 Ship | 🟡 Supporting |
| `ado-update-wit-items` | `.copilot-tracking/workitems/**/handoff-logs.md` | ADO work item execution | 📋 Shape | 🟡 Supporting |
| `ado-wit-discovery` | `.copilot-tracking/workitems/discovery/**` | ADO work item discovery | 📋 Shape | 🟡 Supporting |
| `ado-wit-planning` | `.copilot-tracking/workitems/**` | ADO work item planning hub | 📋 Shape | 🟡 Supporting |
| `bash` | `**/*.sh` | Bash 5.x conventions with ShellCheck | 🔨 Build | 🟡 Supporting |
| `bicep` | `**/bicep/**` | Azure Bicep IaC conventions | 🚀 Ship | 🟡 Supporting |
| `commit-message` | (all commits) | Conventional commit message format | 🔨 Build | 🟢 Core |
| `community-interaction` | (GitHub backlog instructions) | Contributor communication templates | 🚀 Ship | 🟡 Supporting |
| `csharp` | `**/*.cs` | C# .NET 10 / C# 14 conventions | 🔨 Build | 🟡 Supporting |
| `csharp-tests` | `**/*.cs` | C# XUnit + NSubstitute test conventions | 🔨 Build | 🟡 Supporting |
| `docusaurus-edits` | `docs/docusaurus/**` | Docusaurus content conventions | 🔨 Build | 🟡 Supporting |
| `git-merge` | (merge/rebase operations) | Git merge and rebase protocol | 🔨 Build | 🟢 Core |
| `github-backlog-discovery` | `.copilot-tracking/github-issues/discovery/**` | GitHub issue discovery protocol | 📋 Shape | 🟡 Supporting |
| `github-backlog-planning` | `.copilot-tracking/github-issues/**` | GitHub backlog planning hub | 📋 Shape | 🟡 Supporting |
| `github-backlog-triage` | `.copilot-tracking/github-issues/triage/**` | GitHub issue triage protocol | 📋 Shape | 🟡 Supporting |
| `github-backlog-update` | `.copilot-tracking/github-issues/**/handoff-logs.md` | GitHub issue execution protocol | 📋 Shape | 🟡 Supporting |
| `hve-core-location` | `**` | Internal fallback resolution | — | ⚪ Meta |
| `hve-core/workflows` | `.github/workflows/*.yml` | GitHub Actions workflow conventions | — | ⚪ Meta |
| `markdown` | `**/*.md` | Markdown linting and style conventions | 🔨 Build | 🟢 Core |
| `prompt-builder` | `**/*.prompt.md, **/*.agent.md, **/*.instructions.md` | Prompt engineering authoring standards | — | ⚪ Meta |
| `python-script` | `**/*.py` | Python 3.11+ script conventions | 🔨 Build | 🟡 Supporting |
| `terraform` | `**/*.tf, **/*.tfvars` | Terraform IaC conventions | 🚀 Ship | 🟡 Supporting |
| `uv-projects` | `**/*.py, **/*.ipynb` | Python uv environment management | 🔨 Build | 🟡 Supporting |
| `writing-style` | `**/*.md` | Voice, tone, and writing conventions | 🔨 Build | 🟢 Core |

## Skills

| Name | Description | Segment | Value |
|---|---|---|---|
| `video-to-gif` | Video-to-GIF conversion with FFmpeg two-pass optimization | 🔨 Build | 🟡 Supporting |

## Summary

| Type | Count | 🟢 Core | 🟡 Supporting | ⚪ Meta | 🔴 Cleanup |
|---|---|---|---|---|---|
| Agents | 22 | 8 | 11 | 2 | 1 |
| Prompts | 27 | 11 | 13 | 3 | 0 |
| Instructions | 25 | 4 | 17 | 4 | 0 |
| Skills | 1 | 0 | 1 | 0 | 0 |
| **Total** | **75** | **23** | **42** | **9** | **1** |

### By Segment

| Segment | Core | Supporting | Total |
|---|---|---|---|
| 📋 Shape the Work | 9 | 11 | 20 |
| 🔨 Build the Work | 14 | 16 | 30 |
| 🚀 Ship It | 0 | 8 | 8 |
| ⚪ Meta / 🔴 Cleanup | 0 | 0 | 10 |
