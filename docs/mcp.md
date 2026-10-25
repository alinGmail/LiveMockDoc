---
sidebar_label: "🤖 MCP server"
sidebar_position: 11
---

# 🤖 MCP server

LiveMock ships a separate MCP server, `livemock-mcp`, so AI clients such as Claude Code, Claude Desktop, Cursor,
OpenCode and VS Code can manage projects, expectations, groups and request logs without leaving the editor. It speaks
MCP over stdio and calls the running web instance through its `/api` control plane.

## Requirements

- A running LiveMock web instance (default `http://localhost:9002`).
- Node.js 18 or newer.
- An API token created in **Settings → API tokens**.

## 1. Create an API token

Open **Settings → API tokens → Create token**. Give it a name such as `claude-code` or `cursor`, choose an expiry or
leave it as **Never**, and copy the token from the dialog. It is shown **once**; LiveMock stores only a hash.

A token has full access to projects, expectations, groups, request logs and imports, but it cannot create or revoke
other tokens or change the account password. Treat it like a password, and revoke it from the same card when the client
is retired. See [Account settings](./settings.md#api-tokens).

## 2. Install with add-mcp

[`add-mcp`](https://github.com/neon-solutions/add-mcp) writes the client configuration for you:

```bash
npx add-mcp@2 livemock-mcp -g -a claude-code \
  --env 'LIVEMOCK_URL=http://localhost:9002' \
  --env 'LIVEMOCK_API_TOKEN=${LIVEMOCK_API_TOKEN}'
```

The single-quoted `${LIVEMOCK_API_TOKEN}` makes `add-mcp` prompt for the value during installation, so the token does
not appear in your shell history. It infers the server name `livemock`, so `--name` is not needed.

Replace `-a claude-code` with the client you use:

| Client | Flag |
| --- | --- |
| Claude Code | `-a claude-code` |
| Claude Desktop | `-a claude-desktop` |
| Cursor | `-a cursor` |
| OpenCode | `-a opencode` |
| VS Code | `-a vscode` |

Add several `-a` flags to configure more than one client, or use `--all` for every supported client. If your LiveMock
instance is not on the default port, change `LIVEMOCK_URL`.

:::caution[Keep the token out of the repository]

Use `-g`. It writes the user-level client configuration. Project mode writes `.mcp.json` or `.cursor/mcp.json` inside
the current repository, where a real token can be committed by accident.

`add-mcp` stores the resolved token in the client configuration. It does not create a runtime environment reference, so
use a revocable token and never commit the generated file.

:::

### Read-only install

To expose only the list/get tools:

```bash
npx add-mcp@2 livemock-mcp -g -a claude-code \
  --env 'LIVEMOCK_URL=http://localhost:9002' \
  --env 'LIVEMOCK_API_TOKEN=${LIVEMOCK_API_TOKEN}' \
  --env 'LIVEMOCK_MCP_READ_ONLY=1'
```

Read-only mode removes the write tools from `tools/list`. It is a client-side convenience, **not** a security boundary:
the token still grants full data-plane access. Use a separate token and revoke it when you need real access control.

Do not add `--auto-approve` unless you deliberately want the agent to run write tools such as `delete_expectation`
without confirmation.

## Manual configuration

If you prefer to edit the client configuration yourself, the MCP server runs through `npx`:

```bash
npx -y livemock-mcp
```

### Claude Code

```bash
claude mcp add livemock \
  -e LIVEMOCK_URL=http://localhost:9002 \
  -e LIVEMOCK_API_TOKEN=lmk_replace_me \
  -- npx -y livemock-mcp
```

### Claude Desktop and Cursor

Add this to `claude_desktop_config.json` or `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "livemock": {
      "command": "npx",
      "args": ["-y", "livemock-mcp"],
      "env": {
        "LIVEMOCK_URL": "http://localhost:9002",
        "LIVEMOCK_API_TOKEN": "lmk_replace_me"
      }
    }
  }
}
```

## Environment variables

| Variable | Default | Description |
| --- | --- | --- |
| `LIVEMOCK_URL` | `http://localhost:9002` | LiveMock web origin. A trailing `/api` is tolerated. |
| `LIVEMOCK_API_TOKEN` | *(required)* | Token created on the Settings page. Sent as `Authorization: Bearer`. |
| `LIVEMOCK_MCP_READ_ONLY` | *(unset)* | Set to `1` to hide write tools. Client-side convenience, not a security boundary. |

## What the server exposes

The MCP server exposes tools for:

- listing and managing projects, including starting and stopping the mock listener;
- listing, creating, updating and deleting expectations;
- listing, creating, updating and deleting expectation groups;
- reading request logs and log details;
- importing OpenAPI 3.x, Swagger 2.0 and Postman collections.

Expectations use LiveMock's raw matchers and actions. A typical flow is:

1. `list_projects` to find the project and its mock base URL.
2. `list_expectations` / `get_expectation` / `list_groups` to inspect what already exists.
3. `create_expectation` or `import_api_spec` to add mocks.
4. `start_project` to start the mock listener.
5. Send a request to the project's mock base URL, then verify it with `list_logs` / `get_log`.

The full tool list, raw expectation examples and matcher/action reference live in the
[`livemock-mcp` README](https://github.com/alinGmail/LiveMock/blob/main/mcp/README.md).

## Troubleshooting

| Symptom | Cause / fix |
| --- | --- |
| `401` / "rejected the API token" | The token is wrong, expired or revoked. Create a new one on the Settings page. |
| `403` on token management | Expected: token management requires a browser session, not an MCP token. |
| `Could not reach LiveMock` | Check `LIVEMOCK_URL` and that the web server is running. |
| "project is STARTED can not modify port" | Stop the project before changing its port. |
| "project status is STARTED" on delete | Stop the project before deleting it. |

## Security notes

- Tokens are hashed at rest and shown only once. The MCP server never logs the token.
- A token can drive the data plane but cannot manage tokens or change the password.
- Changing the account password or running `livemock reset-admin` revokes every token.
- Keep tokens out of committed client configuration files.
