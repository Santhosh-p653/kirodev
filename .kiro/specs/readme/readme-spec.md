# Spec: Polished README for UG CloudWeld

## Overview

Produce a single `README.md` at the repository root that serves two audiences:
1. **Visitors / community members** — what CloudWeld is, what the site does, how to run it
2. **Developers / Kiro users** — how the project was built using Kiro's AI-powered features

The README must be accurate, builder-focused, and demonstrate real Kiro usage — no marketing fluff.

---

## Requirements

### R1 — Project identity
- Name, one-line description, and purpose of UG CloudWeld
- What the site contains (sections: Hero, Workspace, Projects, Activity, Footer)
- Tech stack (HTML5, CSS3, Vanilla JS — no frameworks, no build tools)
- How to run it (open `index.html` in a browser)

### R2 — How it was built with Kiro
Document each Kiro feature actually used in this project:

#### R2a — Spec-driven development
- What specs are (requirements → design → tasks workflow)
- The spec written for this project (`.kiro/specs/`)
- Why it helps: structured iteration before touching code

#### R2b — Steering docs
- What steering files are (always-on context injected into every session)
- The three steering files in `.kiro/steering/`: `product.md`, `tech.md`, `structure.md`
- How they enforce consistency across sessions (naming, CSS variables, file count)

#### R2c — Agents
- What custom agents are (own instructions, tools, permissions)
- The `Web Researcher` agent (`.kiro/agents/web-researcher.md`)
- How to invoke: `@Web Researcher <url or question>`

#### R2d — MCP (Model Context Protocol)
- What MCP is (connects Kiro to external tools/data)
- Servers configured: `aws-docs`, `fetch`
- What each one enables in the context of this project

#### R2e — Hooks
- What hooks are (auto-triggered agent actions on IDE events)
- Hooks in this project:
  - `kironomics.json` — PostToolUse / UserPromptSubmit / Stop: tracks usage for UG leaderboard
  - `git-sync-main.json` — SessionStart: fetch + merge origin/main, prune stale branches

### R3 — Project structure
- File tree (3 files only)
- One-line purpose per file
- Link to steering docs for full conventions

### R4 — Format & tone
- Community-driven, builder-focused tone — matches the site itself
- Use markdown headers, code blocks, and a file tree
- No fake metrics, no AWS affiliation claims
- Keep it scannable: lead with what matters, detail underneath

---

## Out of scope
- API docs, contribution guidelines, license section (not requested)
- Deployment instructions beyond "open index.html"
- Screenshots or badges
