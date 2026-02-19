# Research Report: Clean Branch Extraction Strategy

**Generated**: 2026-02-19
**Plan**: 002-docusaurus-site
**Research Query**: How to extract Docusaurus work from polluted branch into clean upstream-ready branch

## Executive Summary

### The Problem

`jordo-explore` has 17 commits ahead of upstream/main, but the diff touches **702 files** — the vast majority are upstream changes that landed on main after the branch was created, plus generated plugin files. The actual Docusaurus work is ~50 files. The branch also contains plan files, workshops, research dossiers, and comparison reports that should not go upstream.

### The Solution

**Git worktree + cherry-pick from upstream/main** is the cleanest approach. Create a worktree based on fresh upstream/main, then selectively bring over only the Docusaurus deliverables.

### Why Not Rebase or Squash

- **Rebase onto upstream/main**: Would carry all 17 commits including trigger commits, spelling fixes, plan files — messy history
- **Squash merge**: Loses the logical commit structure (scaffold → content → workflow is valuable)
- **Cherry-pick from jordo-explore**: The commits touch too many files because upstream evolved underneath

## Current State

```
upstream/main: 11b93cb (2026-02-18, latest)
origin/main:   21820be (behind upstream by ~43 commits)
jordo-explore: 2db0f35 (17 commits ahead of origin/main)

jordo-explore diff from upstream/main:
  702 total files changed
   50 files we want (docs/docusaurus/**, deploy-docs.yml, docusaurus-edits.instructions.md)
   37 plan files (don't want upstream)
  615 upstream changes + generated plugins (already in upstream/main)
```

## Recommended Approach: Worktree + Fresh Branch

### Step 1: Sync fork's main with upstream

```bash
# From jordo-explore (current branch — stays untouched)
git fetch upstream
git fetch origin

# Update origin/main to match upstream/main
git push origin upstream/main:main
# This fast-forwards origin/main to upstream/main without switching branches
```

### Step 2: Create worktree on new branch from upstream/main

```bash
# Create a worktree in a sibling directory
git worktree add ../hve-core-docs-pr upstream/main -b docs/docusaurus-site

# Now you have:
# /Users/jordanknight/repos/hve-core          ← jordo-explore (untouched)
# /Users/jordanknight/repos/hve-core-docs-pr  ← docs/docusaurus-site (clean from upstream/main)
```

### Step 3: Copy deliverables from jordo-explore to clean branch

Rather than cherry-picking commits (which carry plan files and trigger commits), **copy the final file state** of just what we want:

```bash
cd ../hve-core-docs-pr

# Copy Docusaurus project (entire directory)
cp -r ../hve-core/docs/docusaurus/ docs/docusaurus/

# Copy the deploy workflow
cp ../hve-core/.github/workflows/deploy-docs.yml .github/workflows/

# Copy the instructions file
cp ../hve-core/.github/instructions/docusaurus-edits.instructions.md .github/instructions/

# Copy the justfile (if it has docs recipes)
cp ../hve-core/justfile justfile

# Copy .gitignore additions
# (manually add the docs/docusaurus/build/ and .docusaurus/ lines)
```

### Step 4: Curate content for upstream

In the worktree, **remove or adjust** things that are fork-specific:

- Remove `jordo-explore` from deploy-docs.yml branch trigger
- Change `url: 'https://jakkaj.github.io'` → `url: 'https://microsoft.github.io'` in docusaurus.config.js
- Change `organizationName: 'jakkaj'` → `organizationName: 'microsoft'`
- Remove draft caution notices (or keep them if you want upstream review on content)
- Decide which pages to include vs stub

### Step 5: Make clean commits in the worktree

```bash
cd ../hve-core-docs-pr

# Commit 1: Scaffold
git add docs/docusaurus/package.json docs/docusaurus/docusaurus.config.js \
  docs/docusaurus/sidebars.js docs/docusaurus/src/ docs/docusaurus/static/ \
  .gitignore justfile
git commit -m "feat(docs): scaffold Docusaurus site with Mermaid support"

# Commit 2: Instructions file
git add .github/instructions/docusaurus-edits.instructions.md
git commit -m "feat(instructions): add Docusaurus content conventions"

# Commit 3: Content (could be one commit or split by section)
git add docs/docusaurus/docs/
git commit -m "feat(docs): add documentation site content"

# Commit 4: Deploy workflow
git add .github/workflows/deploy-docs.yml
git commit -m "feat(workflows): add docs deployment workflow"
```

### Step 6: Push and PR

```bash
git push origin docs/docusaurus-site
# Then create PR from jakkaj:docs/docusaurus-site → microsoft:main
```

## Why Worktree Is Perfect Here

| Concern | Worktree Solution |
|---------|-------------------|
| Don't want to leave jordo-explore | Worktree is a separate checkout — jordo-explore untouched |
| Need fresh upstream/main base | Worktree branches from upstream/main directly |
| Can work on both simultaneously | Two directories, same .git — can copy files between them |
| Need to iterate on the clean branch | Work in the worktree, push, get review feedback, fix, repeat |
| Don't lose exploration work | jordo-explore stays exactly as-is with full history |

## What Goes Upstream (Minimal Viable PR)

For a "just get us started" PR, include:

### Must Have
- `docs/docusaurus/` scaffold (package.json, config, sidebars, src/, static/)
- `.github/instructions/docusaurus-edits.instructions.md`
- `.github/workflows/deploy-docs.yml` (main branch only, no jordo-explore)
- `.gitignore` additions
- `justfile` with docs recipes

### A Few Pages (Not All 24)
- `docs/intro.md` — entry page (simplified, without draft notice)
- `docs/getting-started/_category_.json` + 2-3 pages (how-it-works, quick-start, installation)
- Maybe 1 segment with a couple pages to demonstrate the structure

### Don't Include
- `docs/plans/` — all planning artifacts stay on jordo-explore
- Comparison reports, research dossiers, workshop documents
- All the trigger/re-trigger commits
- HyperVelocity spelling fix commits (just get it right the first time)

## Alternative: Squash to Single Commit

If the upstream maintainers prefer a single commit:

```bash
cd ../hve-core-docs-pr
# Copy everything, then:
git add -A
git commit -m "feat(docs): add Docusaurus documentation site

- scaffold Docusaurus 3 at docs/docusaurus/ with Mermaid support
- add N content pages across M sections
- add deploy-docs.yml workflow for GitHub Pages
- add docusaurus-edits.instructions.md for content conventions
- add justfile recipes for docs development"
```

## Cleanup After PR Merges

Once the upstream PR is merged:

```bash
# Remove the worktree
git worktree remove ../hve-core-docs-pr

# Delete the local branch (it's merged upstream now)
git branch -d docs/docusaurus-site

# Update main from upstream
git fetch upstream
git checkout main
git merge upstream/main

# jordo-explore can be archived or deleted — its work lives in the plan folder
```

## Quick Reference: Commands

```bash
# 1. Sync fork
git fetch upstream && git push origin upstream/main:main

# 2. Create worktree
git worktree add ../hve-core-docs-pr upstream/main -b docs/docusaurus-site

# 3. Copy files (run from worktree)
cd ../hve-core-docs-pr
cp -r ../hve-core/docs/docusaurus/ docs/docusaurus/
cp ../hve-core/.github/workflows/deploy-docs.yml .github/workflows/
cp ../hve-core/.github/instructions/docusaurus-edits.instructions.md .github/instructions/
# ... etc

# 4. Edit for upstream (url, org, remove test branch trigger)
# 5. Commit cleanly
# 6. Push and PR

# After merge:
git worktree remove ../hve-core-docs-pr
```

## Risk: Origin/Main Behind Upstream

Your `origin/main` is ~43 commits behind `upstream/main`. The `git push origin upstream/main:main` in Step 1 will fast-forward it. If origin/main has diverged (it shouldn't for a fork), you'd need to force-push. Check with `git log origin/main..upstream/main --oneline | wc -l` first.
