---
sidebar_label: "🤖 MCP server"
sidebar_position: 11
---

# 🤖 MCP server

LiveMock 附带一个独立的 MCP server：`livemock-mcp`。借助它，Claude Code、Claude Desktop、Cursor、OpenCode 和 VS Code 等 AI 客户端无需离开编辑器就能管理项目、expectation、分组和请求记录。它通过 stdio 使用 MCP 协议，并通过正在运行的 web 实例的 `/api` 控制面(control plane)调用。

## 环境要求

- 一个正在运行的 LiveMock web 实例（默认 `http://localhost:9002`）。
- Node.js 18 或更高版本。
- 在 **Settings → API tokens** 中创建的 API 令牌(API token)。

## 1. 创建 API 令牌

打开 **Settings → API tokens → Create token**。给它起个名字，例如 `claude-code` 或 `cursor`，选择有效期或保持 **Never**，然后从对话框中复制令牌。它只显示**一次**；LiveMock 只保存哈希。

令牌拥有项目、expectation、分组、请求记录和导入的完整权限，但不能创建或吊销其他令牌，也不能修改账号密码。请像对待密码一样对待它，并在停用客户端时从同一张卡片上吊销。参见[账号设置](./settings.md#api-tokens)。

## 2. 用 add-mcp 安装

[`add-mcp`](https://github.com/neon-solutions/add-mcp) 会替你写客户端配置：

```bash
npx add-mcp@2 livemock-mcp -g -a claude-code \
  --env 'LIVEMOCK_URL=http://localhost:9002' \
  --env 'LIVEMOCK_API_TOKEN=${LIVEMOCK_API_TOKEN}'
```

`${LIVEMOCK_API_TOKEN}` 外面套单引号会让 `add-mcp` 在安装过程中提示输入该值，因此令牌不会出现在你的 shell 历史记录里。它会推断服务器名称为 `livemock`，因此不需要 `--name`。

把 `-a claude-code` 换成你使用的客户端：

| 客户端 | 标志 |
| --- | --- |
| Claude Code | `-a claude-code` |
| Claude Desktop | `-a claude-desktop` |
| Cursor | `-a cursor` |
| OpenCode | `-a opencode` |
| VS Code | `-a vscode` |

追加多个 `-a` 标志可以配置多个客户端，或用 `--all` 配置所有受支持的客户端。如果你的 LiveMock 实例不在默认端口，请修改 `LIVEMOCK_URL`。

:::caution[别把令牌带进仓库]

请使用 `-g`。它会写入用户级客户端配置。项目模式会把 `.mcp.json` 或 `.cursor/mcp.json` 写进当前仓库，真实令牌可能因此被意外提交。

`add-mcp` 把解析后的令牌存进客户端配置。它不会创建运行时环境变量引用，因此请使用可吊销的令牌，并且永远不要提交生成出来的文件。

:::

### 只读安装

只暴露列表/读取类工具：

```bash
npx add-mcp@2 livemock-mcp -g -a claude-code \
  --env 'LIVEMOCK_URL=http://localhost:9002' \
  --env 'LIVEMOCK_API_TOKEN=${LIVEMOCK_API_TOKEN}' \
  --env 'LIVEMOCK_MCP_READ_ONLY=1'
```

只读模式会从 `tools/list` 中移除写工具。这只是客户端的便利开关，**不是**安全边界：令牌仍然拥有数据面的完整权限。需要真正的访问控制时，请使用单独的令牌并在用完后吊销。

除非你确实希望 agent 不经确认就执行 `delete_expectation` 之类的写工具，否则不要加 `--auto-approve`。

## 手动配置

如果你更愿意自己编辑客户端配置，MCP server 通过 `npx` 运行：

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

### Claude Desktop 与 Cursor

把下面的内容加入 `claude_desktop_config.json` 或 `~/.cursor/mcp.json`：

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

## 环境变量

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `LIVEMOCK_URL` | `http://localhost:9002` | LiveMock web 的源地址。末尾带 `/api` 也能识别。 |
| `LIVEMOCK_API_TOKEN` | *（必填）* | 在 Settings 页面创建的令牌。以 `Authorization: Bearer` 发送。 |
| `LIVEMOCK_MCP_READ_ONLY` | *（未设置）* | 设为 `1` 可隐藏写工具。客户端便利开关，不是安全边界。 |

## server 暴露了什么

MCP server 提供的工具可以：

- 列出并管理项目，包括启动和停止 mock 监听器；
- 列出、创建、更新和删除 expectation；
- 列出、创建、更新和删除 expectation 分组；
- 读取请求记录和记录详情；
- 导入 OpenAPI 3.x、Swagger 2.0 和 Postman 集合。

expectation 使用 LiveMock 的原始 matcher 和 action。典型流程是：

1. `list_projects` 找到项目及其 mock 基地址。
2. `list_expectations` / `get_expectation` / `list_groups` 查看已有的内容。
3. `create_expectation` 或 `import_api_spec` 添加 mock。
4. `start_project` 启动 mock 监听器。
5. 向项目的 mock 基地址发送请求，然后用 `list_logs` / `get_log` 验证。

完整的工具清单、原始 expectation 示例以及 matcher/action 参考见 [`livemock-mcp` README](https://github.com/alinGmail/LiveMock/blob/main/mcp/README.zh-CN.md)。

## 疑难排查

| 现象 | 原因 / 解决办法 |
| --- | --- |
| `401` / "rejected the API token" | 令牌错误、已过期或已被吊销。请在 Settings 页面重新创建。 |
| 令牌管理接口返回 `403` | 属于预期行为：令牌管理需要浏览器会话，不能用 MCP 令牌。 |
| `Could not reach LiveMock` | 检查 `LIVEMOCK_URL`，并确认 web 服务正在运行。 |
| "project is STARTED can not modify port" | 修改端口前先停止项目。 |
| 删除时报 "project status is STARTED" | 删除前先停止项目。 |

## 安全说明

- 令牌在存储时是哈希值，且只显示一次。MCP server 从不记录令牌。
- 令牌可以操作数据面，但不能管理令牌或修改密码。
- 修改账号密码或运行 `livemock reset-admin` 会吊销所有令牌。
- 不要把令牌放进会被提交的客户端配置文件。
