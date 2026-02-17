# HVE-Core: Complete Artifact Relationship Map

**Generated**: 2026-02-17
**Artifacts Mapped**: 70 (22 agents, 25 prompts, 24 instructions, 1 skill)
**Method**: All artifacts read via FlowSpace + subagent exploration, relationships extracted from frontmatter (`agent:`, `handoffs:`, `#file:`) and body references.

---

## Overview: How Everything Connects

The 70 artifacts organize into **8 clusters**. Most clusters are self-contained islands. Three clusters (RPI, GitHub Backlog, ADO) have internal flow structure. Cross-cluster connections are sparse — mostly coding standards instructions that auto-apply everywhere.

```mermaid
graph TB
    subgraph legend[" Legend "]
        direction LR
        L1["🟦 Agent"]
        L2["🟩 Prompt"]
        L3["🟨 Instruction"]
        L4["🟪 Skill"]
    end

    subgraph overview["Cross-Cluster Connections"]
        RPI["① RPI Flow<br>6 agents, 6 prompts<br>1 instruction"]
        GHB["② GitHub Backlog<br>2 agents, 5 prompts<br>5 instructions"]
        ADO["③ ADO Integration<br>1 agent, 5 prompts<br>5 instructions"]
        DOC["④ Document Builders<br>5 agents"]
        DAT["⑤ Data Science Pipeline<br>4 agents"]
        PRM["⑥ Prompt Engineering<br>1 agent, 3 prompts<br>1 instruction"]
        GIT["⑦ Git/DevOps<br>2 agents, 5 prompts<br>2 instructions"]
        COD["⑧ Coding Standards<br>10 instructions"]
        RSK["⑨ Risk/Incident<br>2 prompts"]
        INF["⑩ Infrastructure<br>1 agent"]
        SKL["⑪ Skills<br>1 skill"]

        RPI -->|"memory agent<br>checkpoint/resume"| GHB
        ADO -->|"handoff.md → task-planner<br>WI → RPI"| RPI
        COD -.->|"auto-applies to<br>all code files"| RPI
        COD -.->|"auto-applies"| GIT
        COD -.->|"bicep/terraform<br>read by"| DOC
        COD -.->|"uv-projects<br>used by"| DAT
        PRM -.->|"prompt-builder-instructions<br>governs all artifacts"| RPI
        PRM -.->|"governs"| GHB
        PRM -.->|"governs"| ADO
    end
```

---

## ① RPI Flow (Research → Plan → Implement → Review → Discover)

**What it is**: The core coding workflow. Takes a task from uncertainty through research, planning, implementation, and review. Two modes: manual (4 agents with `/clear` between) or autonomous (`rpi-agent` orchestrating via `runSubagent`).

**When to use**: Any coding task with unknowns — new features, refactoring, multi-file changes, unfamiliar codebases.

```mermaid
graph TB
    subgraph rpi_prompts["Prompt Entry Points"]
        rpi_p["🟩 /rpi<br>Autonomous workflow"]
        tr_p["🟩 /task-research<br>Start research"]
        tp_p["🟩 /task-plan<br>Start planning"]
        ti_p["🟩 /task-implement<br>Start implementation"]
        tv_p["🟩 /task-review<br>Start review"]
        cp_p["🟩 /checkpoint<br>Save/restore session"]
    end

    subgraph rpi_agents["Agent Execution Layer"]
        rpi_a["🟦 rpi-agent<br>━━━━━━━━━━━━━━━━━━━━<br>Autonomous orchestrator<br>5 phases, 3 autonomy modes<br>Dispatches via runSubagent<br>━━━━━━━━━━━━━━━━━━━━<br>Self-loop: 1️⃣ 2️⃣ 3️⃣ ▶️All<br>🔄Suggest 🤖Auto"]
        tr_a["🟦 task-researcher<br>━━━━━━━━━━━━━━━━━━━━<br>4 phases: Convention<br>Discovery → Planning<br>→ Alternatives → Doc"]
        tp_a["🟦 task-planner<br>━━━━━━━━━━━━━━━━━━━━<br>3 phases: Context<br>→ Planning → Completion<br>Parallelizable phases"]
        ti_a["🟦 task-implementor<br>━━━━━━━━━━━━━━━━━━━━<br>5 phases: Analyze<br>→ Dispatch → Track<br>→ Handoff → Verify"]
        tv_a["🟦 task-reviewer<br>━━━━━━━━━━━━━━━━━━━━<br>5 phases: Discover<br>→ Extract → Validate<br>→ Follow-up → Complete"]
        mem_a["🟦 memory<br>━━━━━━━━━━━━━━━━━━━━<br>3 phases: Detect<br>→ Save or Continue"]
    end

    subgraph rpi_artifacts["Artifact Data Bus (.copilot-tracking/)"]
        art_r["📄 research/<br>YYYY-MM-DD-topic-research.md"]
        art_s["📄 subagent/<br>YYYY-MM-DD/topic-research.md"]
        art_p["📄 plans/<br>YYYY-MM-DD-task-plan.instructions.md"]
        art_d["📄 details/<br>YYYY-MM-DD-task-details.md"]
        art_c["📄 changes/<br>YYYY-MM-DD-task-changes.md"]
        art_v["📄 reviews/<br>YYYY-MM-DD-task-review.md"]
        art_m["📄 memory/<br>YYYY-MM-DD/description-memory.md"]
    end

    subgraph rpi_instr["Auto-Applied Instructions"]
        cm_i["🟨 commit-message<br>Conventional commit format"]
    end

    %% Prompt → Agent delegation
    rpi_p -->|"agent:"| rpi_a
    tr_p -->|"agent:"| tr_a
    tp_p -->|"agent:"| tp_a
    ti_p -->|"agent:"| ti_a
    tv_p -->|"agent:"| tv_a
    cp_p -->|"agent:"| mem_a

    %% rpi-agent dispatches subagents
    rpi_a ==>|"runSubagent<br>Phase 1"| tr_a
    rpi_a ==>|"runSubagent<br>Phase 2"| tp_a
    rpi_a ==>|"runSubagent<br>Phase 3"| ti_a
    rpi_a ==>|"runSubagent<br>Phase 4"| tv_a

    %% Handoff button chain (manual mode)
    tr_a -->|"📋 Create Plan"| tp_a
    tp_a -->|"⚡ Implement"| ti_a
    ti_a -->|"✅ Review"| tv_a
    tv_a -->|"🔬 Research More"| tr_a
    tv_a -->|"📋 Revise Plan"| tp_a

    %% Memory handoffs
    rpi_a -->|"💾 Save"| mem_a
    mem_a -->|"🚀 Continue"| rpi_a

    %% Artifact flows
    tr_a --> art_r
    tr_a --> art_s
    tp_a --> art_p
    tp_a --> art_d
    ti_a --> art_c
    tv_a --> art_v
    mem_a --> art_m

    art_r -.->|"reads"| tp_a
    art_p -.->|"reads"| ti_a
    art_d -.->|"reads"| ti_a
    art_c -.->|"reads"| tv_a
    art_r -.->|"reads"| tv_a
    art_p -.->|"reads"| tv_a

    %% Instruction reference
    ti_a -.->|"references"| cm_i
```

---

## ② GitHub Backlog Management (Discover → Triage → Sprint → Execute)

**What it is**: Issue lifecycle management for GitHub repos. One orchestrator agent classifies requests and dispatches to 5 workflow types. Instruction files define the detailed protocols.

**When to use**: Managing GitHub issues — discovering gaps, triaging untriaged issues, planning sprints, executing batch operations.

```mermaid
graph TB
    subgraph ghb_prompts["Prompt Entry Points"]
        gd_p["🟩 /github-discover-issues<br>3 discovery paths"]
        gt_p["🟩 /github-triage-issues<br>Label + milestone + dedup"]
        gs_p["🟩 /github-sprint-plan<br>Milestone analysis"]
        ge_p["🟩 /github-execute-backlog<br>Batch operations"]
        ga_p["🟩 /github-add-issue<br>Single issue creation"]
    end

    subgraph ghb_agents["Agent Layer"]
        gbm_a["🟦 github-backlog-manager<br>━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br>Orchestrator: 3 phases<br>Phase 1: Intent Classification<br>Phase 2: Workflow Dispatch<br>Phase 3: Summary + Handoff<br>━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br>3-tier autonomy: Full|Partial|Manual<br>Self-loop: Discover|Triage|Sprint|Execute"]
        gim_a["🟦 github-issue-manager<br>⚠️ DEPRECATED"]
    end

    subgraph ghb_instr["Instruction Workflows"]
        gbp_i["🟨 github-backlog-planning<br>━━━━━━━━━━━━━━━━━━━━<br>HUB: Templates, MCP tools,<br>search protocol, similarity,<br>autonomy model, state persistence,<br>label taxonomy, milestone discovery"]
        gbd_i["🟨 github-backlog-discovery<br>Discovery protocol<br>3 paths: User|Artifact|Search"]
        gbt_i["🟨 github-backlog-triage<br>Triage protocol<br>Conventional commit → labels"]
        gbu_i["🟨 github-backlog-update<br>Execution protocol<br>Create→Update→Link→Close→Comment"]
        ci_i["🟨 community-interaction<br>20 scenario templates<br>Comment-before-closure"]
    end

    subgraph ghb_artifacts["Tracking (.copilot-tracking/github-issues/)"]
        gia["📄 discovery/scope/<br>issue-analysis.md<br>issues-plan.md"]
        gtp["📄 triage/YYYY-MM-DD/<br>triage-plan.md"]
        gsp["📄 sprint/milestone/<br>sprint-plan.md<br>handoff.md"]
        gel["📄 execution/YYYY-MM-DD/<br>handoff-logs.md"]
        gpl["📄 */planning-log.md<br>Living state across all phases"]
    end

    %% Prompt → Agent
    gd_p -->|"agent:"| gbm_a
    gt_p -->|"agent:"| gbm_a
    gs_p -->|"agent:"| gbm_a
    ge_p -->|"agent:"| gbm_a
    ga_p -->|"agent:"| gbm_a

    %% Agent → Instructions (dispatch)
    gbm_a -->|"Discovery"| gbd_i
    gbm_a -->|"Triage"| gbt_i
    gbm_a -->|"Sprint = Discovery+Triage"| gbd_i
    gbm_a -->|"Execution"| gbu_i

    %% Instruction hub dependencies
    gbd_i -->|"#file:"| gbp_i
    gbt_i -->|"#file:"| gbp_i
    gbu_i -->|"#file:"| gbp_i
    gbt_i -->|"#file:"| ci_i
    gbu_i -->|"#file:"| ci_i

    %% Artifacts
    gbd_i --> gia
    gbt_i --> gtp
    gs_p --> gsp
    gbu_i --> gel
    gbm_a --> gpl

    %% Data flow between workflows
    gia -.->|"consumed by<br>Execution"| gbu_i
    gtp -.->|"consumed by<br>Execution"| gbu_i
    gsp -.->|"consumed by<br>Execution"| gbu_i

    %% Deprecated
    gim_a -.->|"replaced by"| gbm_a
```

---

## ③ ADO Integration (Work Items + PR Creation + Build Monitoring)

**What it is**: Azure DevOps integration. Three sub-flows: PRD-to-work-items, work item management, and PR creation. Connected to RPI via artifact handoff (work items feed into task planning).

**When to use**: Teams using Azure DevOps for project management alongside VS Code + Copilot for development.

```mermaid
graph TB
    subgraph ado_prompts["Prompt Entry Points"]
        acpr_p["🟩 /ado-create-pull-request<br>7-phase gated PR creation"]
        agbi_p["🟩 /ado-get-build-info<br>Build status + logs"]
        agmw_p["🟩 /ado-get-my-work-items<br>Fetch assigned WIs"]
        apmw_p["🟩 /ado-process-my-work-items<br>Enrich WIs for task planning"]
        auwi_p["🟩 /ado-update-wit-items<br>Execute handoff operations"]
    end

    subgraph ado_agents["Agent Layer"]
        aptw_a["🟦 ado-prd-to-wit<br>━━━━━━━━━━━━━━━━━━<br>5 phases: Analyze PRD<br>→ Discover Codebase<br>→ Discover WIs<br>→ Refine → Handoff"]
    end

    subgraph ado_instr["Instructions"]
        awp_i["🟨 ado-wit-planning<br>HUB: Templates, MCP tools,<br>field defs, search protocol"]
        awd_i["🟨 ado-wit-discovery<br>3 paths: User|Artifact|Search"]
        awu_i["🟨 ado-update-wit-items<br>Create/update execution"]
        acp_i["🟨 ado-create-pull-request<br>7-phase PR protocol<br>5 confirmation gates"]
        agb_i["🟨 ado-get-build-info<br>Build retrieval protocol"]
    end

    subgraph ado_artifacts["Tracking (.copilot-tracking/)"]
        awi["📄 workitems/prds/name/<br>artifact-analysis.md<br>work-items.md<br>handoff.md"]
        amw["📄 workitems/discovery/<br>my-assigned-work-items/<br>work-items.md"]
        apr["📄 pr/new/branch/<br>pr.md, pr-analysis.md<br>reviewer-analysis.md"]
        abl["📄 pr/YYYY-MM-DD-build.md"]
        atl["📄 workitems/.../<br>task-planning-logs.md"]
    end

    %% Prompt → Instructions
    acpr_p -->|"#file:"| acp_i
    agbi_p -->|"#file:"| agb_i
    agmw_p -->|"#file:"| awp_i
    apmw_p -->|"#file:"| awp_i
    auwi_p -->|"#file:"| awu_i

    %% Agent → Instructions
    aptw_a -->|"#file:"| awp_i

    %% Instruction hub
    awd_i -->|"#file:"| awp_i
    awu_i -->|"#file:"| awp_i
    acp_i -->|"#file:"| awp_i

    %% Artifacts
    aptw_a --> awi
    agmw_p --> amw
    acpr_p --> apr
    agbi_p --> abl
    apmw_p --> atl

    %% Data flow chain
    awi -.->|"handoff.md<br>consumed by"| auwi_p
    amw -.->|"work-items.md<br>consumed by"| apmw_p
    atl -.->|"task-planning-logs.md<br>feeds into RPI"| rpi_bridge["→ RPI task-planner"]

    style rpi_bridge fill:#f9f,stroke:#333
```

---

## ④ Document Builders (5 Standalone Agents)

**What it is**: Five independent agents for creating structured documents. No inter-agent connections. Each is a self-contained conversational multi-phase workflow.

**When to use**: Requirements gathering (PRD/BRD), architecture decisions (ADR), security planning, or system diagramming.

```mermaid
graph LR
    subgraph doc_builders["Document Builders — No Inter-Agent Connections"]
        prd["🟦 prd-builder<br>7 phases<br>Assess → Discover → Create<br>→ Elicit → Integrate<br>→ Validate → Finalize<br><br>State: .copilot-tracking/<br>prd-sessions/*.state.json"]
        brd["🟦 brd-builder<br>7 phases<br>Assess → Discover → Create<br>→ Elicit → Integrate<br>→ Validate → Finalize<br><br>State: .copilot-tracking/<br>brd-sessions/*.state.json"]
        adr["🟦 adr-creation<br>4 phases<br>Discovery → Research<br>→ Build → Evaluate<br><br>State: .copilot-tracking/<br>adrs/"]
        sec["🟦 security-plan-creator<br>Multi-phase<br>Blueprint → Architecture<br>→ Threat → Generation<br><br>Output: security plan doc"]
        arch["🟦 arch-diagram-builder<br>Discovery → Parsing<br>→ Mapping → Generation<br><br>Reads: *.tf, *.bicep<br>Output: ASCII diagrams"]
    end

    arch -.->|"reads files<br>governed by"| bicep_i["🟨 bicep-instructions"]
    arch -.->|"reads files<br>governed by"| tf_i["🟨 terraform-instructions"]
```

---

## ⑤ Data Science Pipeline (Implicit Sequence, No Flow Wiring)

**What it is**: Four agents that form a logical pipeline (data spec → notebook/dashboard → testing) but have **zero** handoff buttons, no orchestrator, and no artifact contracts. The sequence is implied by output/input file patterns only.

**When to use**: Data exploration, EDA notebooks, Streamlit dashboards.

```mermaid
graph LR
    subgraph data_pipeline["Data Science — Implicit Sequence (No Handoffs)"]
        gds["🟦 gen-data-spec<br>Guided discovery<br>→ data-dictionary-*.md<br>→ data-profile-*.json<br>→ data-summary-*.md"]
        gjn["🟦 gen-jupyter-notebook<br>Context → Generate<br>→ Validate<br>Reads: data-dictionary"]
        gsd["🟦 gen-streamlit-dashboard<br>Multi-page dashboard<br>Reads: outputs/"]
        tsd["🟦 test-streamlit-dashboard<br>Playwright testing<br>5 phases"]
    end

    gds -->|"outputs/ consumed by<br>(implicit, no handoff)"| gjn
    gds -->|"outputs/ consumed by<br>(implicit, no handoff)"| gsd
    gsd -->|"dashboard tested by<br>(implicit, no handoff)"| tsd
    gsd -.->|"uses"| uv["🟨 uv-projects-instructions"]
```

---

## ⑥ Prompt Engineering (Self-Looping Refinement)

**What it is**: One agent with three self-referential modes (build, refactor, analyze) for creating and improving HVE-Core's own prompt/agent/instruction files.

**When to use**: Creating or improving `.prompt.md`, `.agent.md`, `.instructions.md`, or `SKILL.md` files.

```mermaid
graph TB
    subgraph prompt_eng["Prompt Engineering — Self-Loop"]
        pb_p["🟩 /prompt-build<br>Build/improve artifacts"]
        pr_p["🟩 /prompt-refactor<br>Refactor artifacts"]
        pa_p["🟩 /prompt-analyze<br>Read-only evaluation"]

        pb_a["🟦 prompt-builder<br>━━━━━━━━━━━━━━━━━━<br>5 phases: Baseline<br>→ Research → Build<br>→ Validate → Iterate<br>━━━━━━━━━━━━━━━━━━<br>Self-loop handoffs:<br>💡 Update/Create<br>🛠️ Refactor<br>🤔 Analyze<br>♻️ Cleanup Sandbox"]

        pbi["🟨 prompt-builder-instructions<br>applyTo: *.prompt.md,<br>*.agent.md, *.instructions.md,<br>**/SKILL.md"]
    end

    pb_p -->|"agent:"| pb_a
    pr_p -->|"agent:"| pb_a
    pb_a -->|"💡"| pb_a
    pb_a -->|"🛠️"| pb_a
    pb_a -->|"🤔"| pb_a
    pb_a -.->|"follows"| pbi
    pa_p -.->|"uses"| pbi
```

---

## ⑦ Git/DevOps (Commit, Merge, PR, Doc-Ops)

**What it is**: Standalone utilities for git operations and documentation quality. No inter-agent flow — each prompt is independently invokable.

**When to use**: Committing code, merging branches, generating PRs, or auditing documentation quality.

```mermaid
graph TB
    subgraph git_devops["Git/DevOps — Independent Utilities"]
        gc_p["🟩 /git-commit<br>Stage + commit"]
        gcm_p["🟩 /git-commit-message<br>Generate message only"]
        gm_p["🟩 /git-merge<br>Merge/rebase orchestrator"]
        gs_p2["🟩 /git-setup<br>Git config verification"]
        pr_p2["🟩 /pull-request<br>PR description generation"]

        do_p["🟩 /doc-ops-update<br>Doc QA trigger"]

        pr_a["🟦 pr-review<br>4 phases: Init → Parse<br>→ Analyze → Handoff"]
        do_a["🟦 doc-ops<br>5 phases: Discover<br>→ Plan → Implement<br>→ Validate → Complete<br>Uses subagents"]
    end

    subgraph git_instr["Instructions"]
        cm_i2["🟨 commit-message<br>Conventional commit format"]
        gm_i["🟨 git-merge<br>Merge/rebase protocol"]
        ws_i["🟨 writing-style<br>applyTo: **/*.md"]
        md_i["🟨 markdown<br>applyTo: **/*.md"]
    end

    gc_p -.->|"uses"| cm_i2
    gcm_p -.->|"uses"| cm_i2
    pr_p2 -.->|"uses"| cm_i2
    gm_p -.->|"uses"| gm_i
    do_p -->|"agent:"| do_a
    do_a -.->|"references"| ws_i
    do_a -.->|"references"| md_i
```

---

## ⑧ Coding Standards (Auto-Applied, Invisible to User)

**What it is**: 10 instruction files that auto-apply based on file type. Users never invoke these directly — they activate when Copilot edits matching files.

**When to use**: Automatically. Open a `.py` file and Python standards apply. Open a `.cs` file and C# standards apply.

```mermaid
graph LR
    subgraph coding_standards["Coding Standards — Auto-Applied by File Pattern"]
        ws["🟨 writing-style<br>**/*.md"]
        md["🟨 markdown<br>**/*.md"]
        py["🟨 python-script<br>**/*.py"]
        ba["🟨 bash<br>**/*.sh"]
        bi["🟨 bicep<br>**/bicep/**"]
        cs["🟨 csharp<br>**/*.cs"]
        ct["🟨 csharp-tests<br>**/*.cs"]
        tf["🟨 terraform<br>**/*.tf, **/*.tfvars"]
        uv["🟨 uv-projects<br>**/*.py, **/*.ipynb"]
        hl["🟨 hve-core-location<br>** (global fallback)"]
    end

    cs -->|"extends"| ct
```

---

## ⑨ Risk/Incident & ⑩ Infrastructure & ⑪ Skills (Standalone)

**What these are**: Fully independent artifacts with no connections to any other cluster.

```mermaid
graph LR
    subgraph standalone["Standalone — No Cluster Connections"]
        ir["🟩 /incident-response<br>Azure ops incident workflow<br>Triage → Diagnose → Mitigate → RCA"]
        rr["🟩 /risk-register<br>P×I risk matrix<br>Context → Identify → Assess → Mitigate"]
        hci["🟦 hve-core-installer<br>7-phase installer<br>2 branching paths:<br>Extension vs Clone"]
        vtg["🟪 video-to-gif<br>FFmpeg two-pass conversion<br>Bash + PowerShell scripts"]
    end
```

---

## Summary: The 70 Artifacts at a Glance

| Cluster | Artifacts | Internal Flow? | Documented? | Key Entry Points |
|---|---|---|---|---|
| **① RPI** | 6 agents, 6 prompts, 1 instr | ✅ Full pipeline with loops | ✅ 7 docs | `/rpi`, `/task-research` |
| **② GitHub Backlog** | 2 agents, 5 prompts, 5 instr | ✅ Orchestrator + 5 workflows | ✅ 7 docs | `/github-discover-issues` |
| **③ ADO** | 1 agent, 5 prompts, 5 instr | ⚠️ Implicit chain via files | ❌ Planned | `/ado-get-my-work-items` |
| **④ Doc Builders** | 5 agents | ❌ 5 standalone agents | ❌ Planned | Select agent directly |
| **⑤ Data Science** | 4 agents | ⚠️ Implicit via file outputs | ❌ Planned | `gen-data-spec` first |
| **⑥ Prompt Eng** | 1 agent, 3 prompts, 1 instr | ✅ Self-loop | ❌ Planned | `/prompt-build` |
| **⑦ Git/DevOps** | 2 agents, 5 prompts, 2 instr | ❌ Independent utilities | ❌ Partial | `/git-commit`, `/doc-ops-update` |
| **⑧ Coding Standards** | 10 instructions | N/A (auto-apply) | ✅ In-file | Automatic |
| **⑨ Risk/Incident** | 2 prompts | ❌ Standalone | ❌ None | `/incident-response` |
| **⑩ Infrastructure** | 1 agent | ❌ Standalone | ❌ None | Select agent directly |
| **⑪ Skills** | 1 skill | ❌ Standalone | ✅ In-file | Invoked by agents |

### The Navigation Gap

The marketplace listing presents all 70 artifacts as a flat alphabetical list. This document shows they actually organize into **11 clusters**, of which only **2 have documented workflows**. A new user installing the extension has no way to discover this structure from the listing alone.
