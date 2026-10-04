---
inclusion: manual
---

# MCP Setup for UG CloudWeld

## Recommended MCP Server

**aws-docs** — Lets Kiro query live AWS documentation while working on CloudWeld features.

## How to add it

Open `~/.kiro/settings/mcp.json` and add the following inside `"mcpServers"`:

```json
"aws-docs": {
  "command": "uvx",
  "args": ["awslabs.aws-documentation-mcp-server@latest"],
  "env": {
    "FASTMCP_LOG_LEVEL": "ERROR"
  },
  "disabled": false
}
```

`uvx` is provided by [uv](https://docs.astral.sh/uv/getting-started/installation/).
Install it with:

```powershell
pip install uv
```

After saving, reconnect from the MCP Server view in the Kiro feature panel,
or search `MCP` in the Command Palette.

## Why this is useful

When extending CloudWeld with AWS-related content (service descriptions, pricing references,
architecture patterns), Kiro can query current AWS docs directly instead of relying on
potentially stale training data.
