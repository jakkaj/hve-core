---
title: Installation
description: Install the HVE-Core VS Code extension and configure your workspace for AI-assisted workflows
sidebar_position: 4
---

# Installation

:::caution Draft Content
This page is not finalised. Installation steps and configuration details are working drafts subject to revision.
:::

HVE-Core is distributed as a VS Code extension that provides prompts, agents, instructions, and skills to GitHub Copilot. Installation takes under 2 minutes.

## Prerequisites

* [Visual Studio Code](https://code.visualstudio.com/) (latest stable)
* [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension installed and active
* A GitHub Copilot subscription (Individual, Business, or Enterprise)

## Install the Extension

1. Open VS Code
2. Go to the Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for "HVE Core"
4. Click **Install**

Alternatively, install from the command line:

```bash
code --install-extension ise-hve-essentials.hve-core
```

## Post-Install Setup

After installing, configure your workspace for HVE-Core workflows.

### Add `.copilot-tracking/` to `.gitignore`

HVE-Core workflows produce planning artifacts in the `.copilot-tracking/` directory. These are working files, not committed artifacts. Add the directory to your `.gitignore`:

```text
# HVE-Core workflow artifacts
.copilot-tracking/
```

### Verify the Installation

Open Copilot Chat in VS Code and try one of these commands:

```text
/rpi
```

If HVE-Core is installed correctly, the RPI agent will respond and ask for a task or issue to work on. You can cancel at this point; the goal is to confirm that the prompts and agents are loaded.

:::tip Alternative installation methods
HVE-Core supports several installation methods beyond the VS Code extension, including multi-root workspaces, git submodules, and GitHub Codespaces. See the [existing installation documentation](https://github.com/jakkaj/hve-core/tree/main/docs/getting-started) for detailed guides on each method.
:::

## Next Steps

Head to the [Quick Start](quick-start) to find the right entry point for your role, or read [How It Works](how-it-works) to understand the architecture before diving in.
