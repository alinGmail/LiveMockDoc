---
sidebar_position: 1
slug: /request-log
---

# 请求记录(request log)

到达项目 mock 端口的每个请求都会被记录：命中了哪条 expectation（如果有）、请求、响应以及耗时。项目运行期间，**请求记录** 标签页会实时显示它们。

![请求记录](/img/screenshots/11-request-log.png)

## 布局

- **左侧** —— 捕获的请求列表，最新的在最上面。每一行显示 method、path、命中的 expectation、时间、耗时和状态码。proxy 请求带有 `PROXY` 徽章，WebSocket 会话带有 `WS` 徽章，仍在等待响应的请求显示 `pending` 而不是状态码。
- **右侧** —— 选中的请求，分为 **Overview**、**Request**、**Response**，WebSocket 会话还有 **Websocket**。

点击某一行，就会在详情面板中加载它。

## Overview

![Overview 标签页](/img/screenshots/15-log-overview.png)

请求的摘要——method、path、状态码、耗时和请求时间——后面是**命中的 expectation**。没有任何命中时，面板会明确说明，并且请求落到了 `404` 兜底。

## Request

![Request 标签页](/img/screenshots/16-log-request.png)

请求行、请求头和解析后的请求体。

## Response

![Response 标签页](/img/screenshots/17-log-response.png)

状态行、响应头和响应体。

## Websocket

![Websocket 标签页](/img/screenshots/18-log-websocket.png)

对于被代理的 WebSocket 连接，显示两个方向上交换的消息及其方向和发送时间。在 proxy 时对照真实后端检查 socket 协议，这个视图最有用。

## 实时模式与暂停

在筛选栏右侧：

- **live** 指示器表示新请求到达时会追加到列表；
- **Pause** 冻结列表，方便你在列表不动的情况下阅读某个请求；点击 **Resume** 继续；
- **Clear** 删除当前项目记录的所有请求（会要求确认）。

## 存储了什么

每条记录是一个 JSON 对象：

```json
{
  "id": 100099,
  "expectationId": "c26a2cef-8ac7-4ce4-8a4b-595c850488be",
  "proxyInfo": {
    "isProxy": false,
    "proxyHost": null,
    "proxyPath": null,
    "requestHeaders": null,
    "responseHeaders": null
  },
  "req": {
    "method": "POST",
    "path": "/api/login",
    "query": {},
    "headers": {
      "host": "localhost:8088",
      "content-type": "application/json"
    },
    "body": { "username": "jane" },
    "rawBody": "{\"username\":\"jane\"}",
    "requestTime": 1691154891042,
    "requestTimeStr": "2023-08-04T13:14:51.042Z"
  },
  "res": {
    "status": 200,
    "statusMessage": "OK",
    "duration": 12,
    "headers": { "content-type": "application/json" },
    "body": { "token": "…" },
    "rawBody": "{\"token\":\"…\"}",
    "responseTime": 1691154891054,
    "responseTimeStr": "2023-08-04T13:14:51.054Z"
  },
  "websocketInfo": null
}
```

| 字段 | 含义 |
| --- | --- |
| `id` | 请求在该项目中的序号。 |
| `expectationId` | 响应该请求的 expectation；没有任何命中时为 `null`。 |
| `proxyInfo` | 对被代理的请求：目标主机和路径，以及发往目标和从目标收到的响应头。 |
| `req` / `res` | 解析后的请求体、原始请求体、响应头和时序。`req.query` 保存解析后的查询字符串。 |
| `websocketInfo` | 对 WebSocket 会话：连接状态和交换的消息。 |

下面的自定义筛选器通过 `req.method`、`res.status` 这类 JSON 路径访问该对象的字段。反馈问题时，请求的 `id` 也很有用。

## 上限

项目保留的请求数量是有界的：在[项目设置](./../project.md)中配置 **Max request log**（默认 5000，最小 1000）。旧条目会被自动裁剪，因此长期运行的项目也不会无限增长。列表会在你滚动时按需加载更早的请求。

## 把请求变成 mock

右上角的 **Mock this request** 按钮会基于选中的请求创建一条新 expectation——参见[从请求生成 mock](./mock-from-log.md)。

## 下一步

- [筛选器](./filters.md) —— 预设筛选器和自定义筛选器。
- [列](./columns.md) —— 选择列表显示哪些内容。
