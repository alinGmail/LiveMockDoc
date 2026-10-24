---
sidebar_label: "🚀 快速入门"
sidebar_position: 1
---

# 🚀 快速入门

LiveMock 是一款自托管的 mock server，用于 API 开发与测试。它会返回 mock 响应、proxy 到真实 API、记录收到的每个请求，还能让你一键把捕获的请求变成 mock。

![LiveMock expectation 页面](/img/screenshots/04-expectations.png)

## ✨ 功能

- **动态 mock** —— expectation 在每次请求时都会重新求值，因此在 dashboard 里的改动能立即生效，没有任何需要重启的东西。
- **Matchers** —— 按 method、path、header、query 和请求体参数匹配请求，提供十二种比较器(comparator)（精确、包含、正则、glob、存在性，以及它们的否定形式）。
- **三种 action** —— 返回自定义响应(custom response)（JSON 或纯文本，可选由 [Mock.js](http://mockjs.com/examples.html) 渲染）、proxy 到真实主机（支持 HTTP 和 WebSocket），或从磁盘目录提供文件。
- **Expectation 分组(group)** —— 把相关的 expectation 归入分组，分组有自己的优先级(priority)和开关，并控制请求被匹配的顺序。
- **请求记录(request log)** —— 到达项目 mock 端口的每个请求都会被记录：method、path、header、请求体、响应、耗时、命中的 expectation、proxy 目标以及 WebSocket 消息。
- **请求记录筛选器(filter)** —— 预设筛选器（method、状态族）和自定义 JSON 路径筛选器，按项目保存。
- **Mock this request** —— 直接从捕获的请求生成新的 expectation，包括针对其查询参数和请求体字段的 matcher。
- **按项目划分的 mock 端口** —— 每个项目监听自己的端口，因此多个项目可以并行运行。
- **MCP server** —— 连接 Claude Code、Cursor、OpenCode 或其他 AI 客户端，在编辑器里管理项目、expectation、分组和请求记录。
- **Web 与桌面版** —— 同一个产品既以自托管 web dashboard 的形式发布，也以桌面应用的形式发布。

## 🧩 核心概念

| 概念 | 说明 |
| --- | --- |
| **项目(project)** | 一个具名的 mock server，拥有自己的端口、自己的 mock 列表和自己的请求记录。 |
| **expectation** | 一条规则：一组 matcher 加一个 action，再加上延迟(delay)和优先级(priority)。 |
| **matcher** | 针对请求某一部分的条件（method、path、header、query、param）。 |
| **action** | expectation 命中后 LiveMock 要做的事：自定义响应(custom response)、proxy 或静态目录(static directory)。 |
| **分组(group)** | 一组具名的 expectation，共享一个优先级(priority)，可以整体关闭。 |

请求会按既定顺序与项目的 expectation 逐一匹配；第一个**启用**、带有 action 且全部 matcher 都通过的 expectation 胜出。匹配顺序见 [Expectation 分组](./group.md)。

## 📚 下一步

- [安装](./install.md) —— 用 `npx livemock`、Docker 或源码运行 LiveMock。
- [快速开始](./quick-start.md) —— 从首次登录到第一个 mock 响应。
- [Expectations](./expectation/create-an-expectation.md)、[Matchers](./expectation/create-a-matcher.md)、
  [Actions](./expectation/create-an-action.md)、[Groups](./group.md)。
- [请求记录](./request-log/overview.md) —— 查看、筛选并复用捕获的流量。
- [MCP server](./mcp.md) —— 把 Claude Code、Cursor、OpenCode 或其他 AI 客户端接到 LiveMock。
- [导入 OpenAPI / Postman](./import.md)、[认证](./auth.md)、[配置](./configuration.md)。
