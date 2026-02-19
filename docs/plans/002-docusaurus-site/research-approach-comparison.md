# Research Approach Comparison: plan-1a-explore vs task-research

**Generated**: 2026-02-19
**Plan**: 002-docusaurus-site
**Purpose**: Compare the two research approaches available in the HVE ecosystem to understand their differences, overlaps, and potential unification opportunities.

## The Two Systems

### task-research (HVE-Core — `.github/prompts/task-research.prompt.md`)

**Origin**: microsoft/hve-core repository. Ships with the extension.
**Activation**: `/task-research` prompt → delegates to `@task-researcher` agent
**Platform**: VS Code Copilot Chat (uses `runSubagent` tool)
**Output**: `.copilot-tracking/research/{{YYYY-MM-DD}}-<topic>-research.md` (gitignored)
**Lifecycle**: Ephemeral — lost on `git clean` or new clone

### plan-1a-explore (User Commands — `~/.claude/commands/plan-1a-explore.md`)

**Origin**: User-maintained command library (jk-tools). Not part of hve-core.
**Activation**: `/plan-1a-explore` slash command in Claude Code
**Platform**: Claude Code CLI (uses Task tool for subagents)
**Output**: `docs/plans/<ordinal>-<slug>/research-dossier.md` (committed to repo)
**Lifecycle**: Persistent — survives across sessions, branches, and clones

## Structural Comparison

| Dimension | task-research | plan-1a-explore |
|-----------|--------------|----------------|
| **Output location** | `.copilot-tracking/research/` (gitignored) | `docs/plans/<N>-<slug>/` (committed) |
| **Persistence** | Session-only, ephemeral | Permanent, version-controlled |
| **Subagent count** | Variable (dispatched as needed) | 7 specialized (launched in parallel) |
| **Subagent roles** | Generic (codebase + external docs) | Named specialists (Archaeologist, Cartographer, Scout, etc.) |
| **FlowSpace integration** | No | Yes — probes API at runtime |
| **External research** | Yes, via MCP Context7 + microsoft-docs tools | Identifies gaps, generates `/deepresearch` prompts |
| **Prior learnings** | No — cannot access previous research | Yes — Subagent 7 mines `docs/plans/*/tasks/*/tasks.md` discoveries |
| **Plan integration** | Standalone → handoff to `/task-plan` via `/clear` | Native — auto-detects plan context, creates plan folders |
| **Report structure** | Template-based (scenarios, alternatives, conventions) | Section-based (executive summary, flow, architecture, dependencies, quality) |
| **Mode options** | Single mode | Three modes: console, auto-detect plan, explicit plan |
| **Context detection** | None — always creates in `.copilot-tracking/` | Branch name, CWD, conversation history, or new folder |
| **Ordinal management** | N/A | Auto-assigns `docs/plans/<NNN>-<slug>/` ordinals |

## Philosophy Differences

### task-research: Tool-First, Session-Scoped

The HVE-Core researcher is a **session tool**. It produces a document that feeds the next RPI phase (`/task-plan`), then gets cleared (`/clear`). The research is consumed immediately and has no expectation of being revisited. The `.copilot-tracking/` directory is explicitly gitignored — the project philosophy treats these as working files, not artifacts.

Key design choices:
- Agent definition is separate from prompt (`.agent.md` + `.prompt.md` split)
- Uses `runSubagent` (VS Code Copilot's subagent API)
- Subagents dispatch dynamically based on need (not a fixed set)
- External docs via MCP integrations (Context7, microsoft-docs)
- Research document is authoritative until superseded
- Handoff is explicit: `/clear` → attach research → `/task-plan`

### plan-1a-explore: Knowledge-First, Repo-Scoped

The plan-1a command is a **knowledge builder**. It produces a research dossier that becomes part of the repository's permanent record. Future plans can reference, build on, or learn from past research. The `docs/plans/` structure is version-controlled — research is treated as a project artifact, not a throwaway.

Key design choices:
- 7 named specialist subagents run in parallel (fixed set)
- Subagent 7 (Prior Learnings Scout) mines previous plan discoveries
- FlowSpace MCP integration for enhanced code navigation
- Generates ready-to-use `/deepresearch` prompts for knowledge gaps
- Auto-detects plan context (branch name, CWD, conversation)
- Research report includes "Modification Considerations" (safe/caution/danger zones)
- Output is committed and survives across sessions

## The Institutional Memory Gap

The most significant difference is **Subagent 7: Prior Learnings Scout**. This subagent searches `docs/plans/*/tasks/*/tasks.md` for `## Discoveries & Learnings` tables from previous implementations. It surfaces gotchas, unexpected behaviors, workarounds, and decisions that past work uncovered.

This creates a feedback loop that task-research cannot achieve:

```
Plan A research → Plan A implementation → Plan A discoveries (committed)
                                                    ↓
Plan B research ← Prior Learnings Scout reads Plan A discoveries
```

The HVE-Core task-researcher has no equivalent. Because `.copilot-tracking/` is gitignored, discoveries from one research session cannot inform the next. Each `/task-research` invocation starts from zero institutional knowledge.

## What task-research Does Better

1. **External documentation tools**: Direct MCP integrations with Context7 (SDK docs), microsoft-docs (Azure), and `github_repo` (pattern search). plan-1a identifies gaps but delegates to `/deepresearch` rather than fetching itself.

2. **Alternatives analysis**: Explicit Phase 3 for evaluating multiple approaches with evidence-based selection. plan-1a focuses on understanding what exists, not comparing approaches.

3. **Agent/prompt separation**: Clean `.agent.md` + `.prompt.md` split allows the researcher to be invoked both as an agent (`@task-researcher`) and via prompt (`/task-research`). plan-1a is a single monolithic command.

4. **Convention discovery**: Phase 1 explicitly reads `.github/copilot-instructions.md` and relevant instruction files before researching. plan-1a relies on the subagents to find conventions organically.

5. **Iterative refinement**: "Refine the research document continuously without waiting for user input" — the agent autonomously iterates until satisfied. plan-1a runs subagents once and synthesizes.

## What plan-1a-explore Does Better

1. **Persistent output**: Research committed to repo creates institutional memory. Future work can reference past findings.

2. **Prior learnings**: Subagent 7 mines previous plan discoveries, preventing repeated mistakes.

3. **FlowSpace integration**: Semantic code search, node-level navigation, and smart content summaries accelerate exploration.

4. **Structured specialists**: 7 named subagents ensure comprehensive coverage (implementation, dependencies, patterns, quality, interfaces, documentation, prior learnings). task-research dispatches generically.

5. **Modification risk assessment**: Report includes safe/caution/danger zone analysis for code changes. task-research doesn't assess modification risk.

6. **Plan context awareness**: Auto-detects which plan the research belongs to (branch name, CWD, conversation). task-research is plan-agnostic.

7. **External research pipeline**: Generates ready-to-use `/deepresearch` prompts with codebase context baked in. task-research fetches docs directly but doesn't produce reusable research prompts.

## Overlap and Redundancy

Both systems:
- Dispatch subagents for parallel investigation
- Produce structured markdown research documents
- Use codebase search (semantic, grep, file reads)
- Synthesize findings into actionable recommendations
- Feed into a planning phase downstream

The core research loop is the same. The differences are in **where output goes** (ephemeral vs persistent), **what prior knowledge is available** (none vs prior learnings), and **what tools are leveraged** (MCP docs vs FlowSpace).

## Implications for the Docusaurus Site

The RPI documentation (`build-the-work/rpi-workflow.md` and `rpi-in-practice.md`) currently describes the task-researcher as producing ephemeral output in `.copilot-tracking/`. This is accurate for the shipped HVE-Core artifact.

The plan-1a approach (persistent research in `docs/plans/`) represents a different philosophy that could be documented as an advanced pattern or future direction. The key concepts worth surfacing:

1. **Durable research**: Plans committed to the repo create searchable institutional memory
2. **Prior learnings**: Future research can mine past discoveries
3. **Accumulated knowledge**: The repo gets smarter over time as more plans are completed

These concepts are independent of which tool implements them. They could apply to task-research if `.copilot-tracking/research/` were committed rather than gitignored.

## Recommendations

1. **For the docs site**: Consider adding a section about persistent vs ephemeral research as a design decision, perhaps on the RPI workflow page or What's Coming page.

2. **For HVE-Core evolution**: The prior learnings concept (Subagent 7) is the highest-value differentiator. If task-researcher gained the ability to read committed plan discoveries, it would close the biggest gap.

3. **For this project**: We've been using plan-1a throughout this documentation effort. The `docs/plans/002-docusaurus-site/` folder with its workshops, task dossiers, execution logs, and discovery tables IS the persistent research pattern in action. This project is a worked example of the concept.
