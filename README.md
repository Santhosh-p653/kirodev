# UG CloudWeld

A community workspace for cloud builders — build, learn, and ship cloud-powered projects together.

**Live site →** [ugcloudweld.github.io/kirodev](https://santhosh-p653.github.io/kirodev) &nbsp;|&nbsp; **AWS User Group Madurai**

---

## What is CloudWeld?

UG CloudWeld is a static community landing page that brings together builders experimenting with cloud technology and AI. It's not a product, not an AWS console recreation — it's a workspace hub where the community ships real things.

The site has five sections:

| Section | What it does |
|---|---|
| **Hero** | Brand statement and primary call-to-action |
| **Workspace** | Three-area overview — Build, Learn, Connect |
| **Projects** | Featured community projects grid with detail modals |
| **Activity** | Live community activity feed with animated status |
| **Footer** | Community statement and legal note |

---

## Running it

No install. No build step. Open `index.html` in any modern browser.

```
# Optional: live reload during development
python -m http.server 8080
# then open http://localhost:8080
```

Or use the VS Code **Live Server** extension — right-click `index.html` → _Open with Live Server_.

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Markup | HTML5 (semantic) | `header`, `section`, `article`, `nav`, `footer` — no templating |
| Styles | CSS3 with custom properties | Design tokens in `:root`, zero hardcoded hex values |
| Behaviour | Vanilla JavaScript (ES6+) | No frameworks, no bundler, no `npm` |

No `package.json`. No build tools. No TypeScript. The file count is intentionally fixed at three.

---

## Project Structure

```
kirodev/
├── index.html    # All markup, ARIA attributes, and page structure
├── style.css     # All styles, CSS variables, and responsive rules
└── script.js     # All interactivity and DOM logic
```

CSS sections are ordered: Reset → Utility → Buttons → Header → Hero → Workspace → Projects → Activity → Footer → Responsive.

JS sections follow HTML section names, separated by banner comments. DOM references are grouped at the top.

Responsive breakpoints: `900px` (tablet), `640px` (mobile).

---

## Built with Kiro

This project was developed using [Kiro](https://kiro.dev) — an AI-powered IDE built on VS Code. Every feature described below was actively used during development, not added as an afterthought.

### Spec-Driven Development

Before writing a single line of code, a **spec** was created to define what needed to be built and why.

Specs in Kiro follow a three-phase workflow:

```
.kiro/specs/<spec-name>/
├── requirements.md   # What to build and acceptance criteria
├── design.md         # Architecture, component design, data flow
└── tasks.md          # Discrete, trackable implementation tasks
```

Kiro builds a dependency graph from `tasks.md` and runs independent tasks concurrently in waves — so parallelisable work happens in parallel, sequential dependencies are respected automatically.

This project's specs live in `.kiro/specs/`. The UI bug fixes spec at `.kiro/specs/cloudweld-ui-fixes/` captured root cause analysis, expected behaviour, and a structured fix plan before any code changed.

Spec-driven development pays off on projects like this: it forces you to separate _what_ you're building from _how_, and gives the AI agent clear, checkable criteria to work against.

---

### Steering — Persistent Project Context

**Steering files** are Markdown documents in `.kiro/steering/` that Kiro injects into every session automatically. They eliminate the need to re-explain conventions every time you open a chat.

This project has three steering files:

| File | What it covers |
|---|---|
| `product.md` | What CloudWeld is, its sections, tone, and what not to build |
| `tech.md` | Stack constraints, CSS variable conventions, JS patterns, breakpoints |
| `structure.md` | File responsibilities, section ordering, naming conventions, accessibility patterns |

Because these run in every session, the agent never hardcodes a hex value, never creates a fourth file, and always names things in kebab-case — not because it was reminded, but because the context is always there.

Steering files support three inclusion modes:

- **Always** (default) — loaded in every interaction. Used here for all three files.
- **fileMatch** — loaded automatically when working with files matching a glob pattern.
- **Manual** — loaded on demand by typing `#steering-file-name` in chat.

---

### Agents — Specialised AI Workers

**Custom agents** in Kiro are scoped AI configurations with their own system prompt, tool access, and permissions. They live in `.kiro/agents/` and are invoked with `@agent-name` in chat.

This project has one custom agent:

**`Web Researcher`** (`.kiro/agents/web-researcher.md`)

```markdown
---
name: Web Researcher
description: Fetches live content from URLs and docs for the CloudWeld project.
tools: fetch
---
```

The Web Researcher uses the `fetch` MCP tool to pull live documentation, API references, and page content on demand — MDN for HTML/CSS/JS references, AWS docs for cloud concepts, and the live site itself to verify deployed output.

Invoke it in chat:
```
@Web Researcher https://developer.mozilla.org/en-US/docs/Web/CSS/custom-properties
@Web Researcher what does the fetch MCP server support?
```

---

### MCP — Connecting Kiro to External Tools

**MCP (Model Context Protocol)** connects Kiro to external servers that provide additional tools, data, and APIs. Servers are configured in `~/.kiro/settings/mcp.json`.

This project uses two MCP servers:

```json
{
  "mcpServers": {
    "aws-docs": {
      "command": "uvx",
      "args": ["awslabs.aws-documentation-mcp-server@latest"],
      "env": { "FASTMCP_LOG_LEVEL": "ERROR" }
    },
    "fetch": {
      "command": "uvx",
      "args": ["mcp-server-fetch@latest"]
    }
  }
}
```

| Server | What it does in this project |
|---|---|
| `aws-docs` | Pulls live AWS documentation into context — useful for cloud concept accuracy in project descriptions |
| `fetch` | Powers the Web Researcher agent — fetches any public URL and returns clean text content |

MCP tools are namespaced as `@server-name/tool-name`. No install beyond `uvx` — servers download and run automatically.

---

### Hooks — Automated Actions on IDE Events

**Hooks** are JSON files in `.kiro/hooks/` that trigger shell commands or agent prompts automatically when IDE events occur. They run without any manual step.

This project has two hook files:

#### `kironomics.json` — UG Leaderboard Tracking

Tracks Kiro usage for the [AWS UG Madurai Kiro University](https://www.awsugmdu.in/kiro) campaign leaderboard. Three hooks, zero data about file content or code:

```json
{
  "version": "v1",
  "hooks": [
    {
      "name": "Kironomics Tool Counter",
      "trigger": "PostToolUse",
      "matcher": ".*",
      "action": {
        "type": "command",
        "command": "python \"C:\\Users\\Lenovo\\.kironomics\\report.py\" count tool",
        "timeout": 5
      }
    },
    {
      "name": "Kironomics Prompt Counter",
      "trigger": "UserPromptSubmit",
      "action": {
        "type": "command",
        "command": "python \"C:\\Users\\Lenovo\\.kironomics\\report.py\" count prompt",
        "timeout": 5
      }
    },
    {
      "name": "Kironomics Session Reporter",
      "trigger": "Stop",
      "action": {
        "type": "command",
        "command": "python \"C:\\Users\\Lenovo\\.kironomics\\report.py\" send"
      }
    }
  ]
}
```

| Hook | Trigger | What it does |
|---|---|---|
| Tool Counter | `PostToolUse` | Increments a local tool-call count after every tool use |
| Prompt Counter | `UserPromptSubmit` | Increments a prompt count on every message sent |
| Session Reporter | `Stop` | Sends aggregated session counts to the UG campaign API |

#### `git-sync-main.json` — Automatic Git Hygiene

Keeps the local repo clean and in sync at the start of every session:

```json
{
  "version": "v1",
  "hooks": [
    {
      "name": "Git Sync — Fetch & Merge into main",
      "trigger": "SessionStart",
      "action": {
        "type": "command",
        "command": "cd /d \"e:\\aws\\kirodev\" && git fetch origin && git checkout main && git merge --ff-only origin/main && git remote prune origin",
        "timeout": 30
      }
    }
  ]
}
```

On every `SessionStart`: fetch from origin, fast-forward merge `main`, prune deleted remote branch refs. The repo always starts clean — no stale branches, no drift from remote.

---

## Kiro Configuration at a Glance

```
.kiro/
├── agents/
│   └── web-researcher.md        # Web Researcher custom agent (uses fetch MCP)
├── hooks/
│   ├── git-sync-main.json       # SessionStart: fetch + merge main + prune
│   └── kironomics.json          # PostToolUse / UserPromptSubmit / Stop: UG tracking
├── specs/
│   └── cloudweld-ui-fixes/      # Bugfix spec: requirements → design → tasks
│       ├── bugfix.md
│       └── .config.kiro
├── steering/
│   ├── product.md               # What CloudWeld is, tone, sections
│   ├── structure.md             # File layout, naming conventions, a11y patterns
│   └── tech.md                  # Stack, CSS variables, JS conventions, breakpoints
└── ugmdu.json                   # UG Madurai campaign manifest (no secrets)
```

---

## How It Was Developed

The full development workflow:

1. **Steering first** — `product.md`, `tech.md`, and `structure.md` were written before any feature work, so every session started with shared context.
2. **Spec before code** — the bugfix spec in `.kiro/specs/cloudweld-ui-fixes/` was written as a `bugfix.md` (root cause → expected behaviour → fix plan) before touching `index.html`.
3. **Kiro executed the tasks** — working through the spec's task list, Kiro made all file edits, ran verification, and flagged deviations from the steering rules.
4. **Hooks ran silently** — `git-sync-main` kept the repo clean on every session start; `kironomics` tracked usage for the UG leaderboard without any manual step.
5. **MCP + Agent on demand** — the `Web Researcher` agent with the `fetch` MCP server was available throughout for pulling live docs and verifying deployed output.

The result: a three-file static site with no build step, full keyboard accessibility, responsive layout, modals, an AI assistant widget, and a live activity feed — built entirely through structured, AI-assisted iteration.

---

> Community-built &middot; Not affiliated with AWS &middot; [AWS User Group Madurai](https://www.awsugmdu.in)
