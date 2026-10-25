---
sidebar_label: "🛠️ 安装"
sidebar_position: 2
---

# 🛠️ 安装

LiveMock 以自托管服务的形式运行，用浏览器打开即可：它是单个进程，数据保存在你自己的服务器上，还可以放在自己的反向代理和 HTTPS 之后。从下面的方式中选择一种即可。

## 方式 A —— npm

web server 及其 dashboard 已作为 [`livemock`](https://www.npmjs.com/package/livemock) 发布到 npm，因此无需克隆或构建。需要 Node.js 18 或更高版本。

不安装任何东西，直接运行一次：

```bash
npx livemock
```

或者全局安装，让 `livemock` 命令常驻 `PATH`：

```bash
npm install -g livemock
livemock
```

两种方式下，服务都启动在 `http://localhost:9002`，dashboard 位于 `http://localhost:9002/dashboard/`。

数据库保存在**相对于启动 LiveMock 时所在目录**的 `db` 目录中，因此请选择一个固定的工作目录（或把 `LIVEMOCK_DB_PATH` 设为绝对路径，例如 `LIVEMOCK_DB_PATH=/var/lib/livemock npx livemock`）。否则，从另一个目录启动会打开一个全新的空实例。

`npx` 在后续运行时会复用缓存副本。加上 `@latest`——即 `npx livemock@latest`——才会启动最新版本；全局安装则运行 `npm install -g livemock@latest` 升级。

如果你忘记了密码，同一条命令也能重置账号：在后端停止的情况下运行 `npx livemock reset-admin <new-username>`。参见[认证](./auth.md#recovering-a-lost-password)。

## 方式 B —— Docker

仓库包含 `Dockerfile` 和 `docker-compose.yml`，因此整个构建（core 类型、dashboard、server bundle）都在镜像内部完成：

```bash
git clone https://github.com/alinGmail/LiveMock.git
cd LiveMock
docker compose up
```

之后 dashboard 位于 `http://localhost:9002/dashboard/`。数据保存在 `livemock_data` 卷中，因此容器重启后依然存在。

想把 dashboard 发布到另一个端口，就在启动 Compose 前设置 `LIVEMOCK_PORT` —— 同一个值既用于容器内的监听端口，也用于对外发布的端口：

```bash
LIVEMOCK_PORT=8100 docker compose up
```

如果要从容器外部访问项目的 mock 端口（默认 8088），需要单独发布它们。

## 方式 C —— 源码

LiveMock 使用 Yarn workspaces。需要 Node.js 18 或更高版本；仓库通过 `corepack` 固定了 Yarn 4。

1. 启用 corepack。

   ```bash
   corepack enable
   ```

2. 克隆仓库。

   ```bash
   git clone https://github.com/alinGmail/LiveMock.git
   cd LiveMock
   ```

3. 安装依赖。

   ```bash
   yarn install
   ```

4. 构建共享类型和 dashboard，然后启动服务。

   ```bash
   yarn web-build
   yarn web-start
   ```

   服务监听 `http://localhost:9002`，dashboard 位于 `http://localhost:9002/dashboard/`。

:::tip[网络较慢时]

如果你在中国大陆，可以在安装前把 `ELECTRON_MIRROR` 环境变量设为 `https://npmmirror.com/mirrors/electron/`。

:::

:::info[开发模式]

`yarn web-dev` 会在 `LIVEMOCK_PORT`（默认 9002）上启动后端，同时在 `http://localhost:5173` 启动 Vite 开发服务器。开发服务器会把 `/api` 代理到后端，因此不需要配置服务地址。

:::

## 配置

web server 通过环境变量配置。完整列表（包括反向代理相关设置）见[配置](./configuration.md)页面。

## 接入 AI 客户端（可选）

LiveMock 还附带一个 MCP server，因此 Claude Code、Cursor、OpenCode 等 AI 客户端可以通过各自的工具管理 LiveMock。用一条命令安装，或使用手动客户端配置：

```bash
npx add-mcp@2 livemock-mcp -g -a claude-code \
  --env 'LIVEMOCK_URL=http://localhost:9002' \
  --env 'LIVEMOCK_API_TOKEN=${LIVEMOCK_API_TOKEN}'
```

令牌创建、其他客户端、只读模式和疑难排查见 [MCP server](./mcp.md)页面。

