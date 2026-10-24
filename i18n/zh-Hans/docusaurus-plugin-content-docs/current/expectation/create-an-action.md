---
sidebar_position: 3
---

# Actions

action 定义 expectation 命中时 LiveMock 如何回应。共有三种 action：

| Action | 列表中的徽章 | 作用 |
| --- | --- | --- |
| **自定义响应(custom response)** | `RESPONSE` | 返回你自己写的状态码、响应头和响应体。 |
| **Proxy** | `PROXY` | 把请求转发到另一台主机并返回它的响应。也支持代理 WebSocket 连接。 |
| **Static** | `STATIC` | 从运行 LiveMock 的机器上的某个目录提供文件。 |

## 创建 action

在 Expectation 详情视图中点击 **Action** 卡片上的 **Add action**（如果已有 action，则点击铅笔图标）。对话框有三个标签页——**Custom response**、**Proxy** 和 **Static**——点击 **Save action** 后应用改动。一条 expectation 恰好只有一个 action：切换标签页会把现有 action 转换过去，而不是新增第二个。没有任何 action 的 expectation 在匹配时会被跳过，所以记得给它加一个——空的 expectation 匹配不了任何东西。

## 自定义响应(custom response)

![自定义响应 action](/img/screenshots/07-action-custom-response.png)

| 字段 | 含义 |
| --- | --- |
| **HTTP status** | 响应的状态码，例如 `200` 或 `404`。 |
| **Response type** | `JSON` 或 `TEXT`。它决定响应的 `Content-Type`。 |
| **Content handler** | `NONE` 按原样返回内容；`MOCKJS` 用 [Mock.js](http://mockjs.com/examples.html) 模板渲染内容。 |
| **Response headers** | 追加到响应中的额外响应头。 |
| **Content** | 响应体。 |

### Mock.js 模板

把 content handler 设为 `MOCKJS` 后，内容就是 [Mock.js](https://github.com/nuysoft/Mock) 模板，数据会在每次请求时重新生成：

```json
{
  "id": "@id",
  "name": "@name",
  "email": "@email",
  "createdAt": "@datetime"
}
```

## Proxy

![Proxy action](/img/screenshots/08-action-proxy.png)

| 字段 | 含义 |
| --- | --- |
| **Host** | 目标主机，例如 `api.stripe.com`。字段前面的协议选择器用于选择 `http://` 或 `https://`；粘贴完整 URL 时，它的协议会自动移入该选择器。主机名不能包含路径。端口始终使用协议的默认值（`http` 为 80，`https` 为 443），没有单独的目标端口字段。 |
| **Prefix remove** | 转发前从请求中移除的路径前缀，例如 `/api`：请求 `/api/users` 会被转发为 `/users`。 |
| **Request headers** | 追加到发往目标主机的请求中的请求头。 |
| **Response headers** | 在响应发回之前追加到响应中的响应头。 |
| **Handle cross** | 为响应添加宽松的 CORS 头。 |
| **Allow credentials** | 与 **Handle cross** 一起使用时，发送 `Access-Control-Allow-Credentials: true`，让浏览器客户端可以携带 cookie。 |
| **Support websocket** | 同时转发 `Upgrade: websocket` 连接。交换的消息会记录在请求记录中。 |

## Static

![Static action](/img/screenshots/09-action-static.png)

| 字段 | 含义 |
| --- | --- |
| **Folder path** | 运行 LiveMock 的机器上的目录绝对路径，例如 `/home/user/mock-assets`。相对路径会基于服务的工作目录解析，在 Docker 中该目录是 `/app`。 |
| **URL prefix** | 该前缀下的请求由这个目录提供；路径的剩余部分用作文件路径。留空则按请求路径原样提供。 |

例如，目录为 `/srv/assets`、前缀为 `/static` 时，请求 `/static/logo.svg` 会返回 `/srv/assets/logo.svg`。前缀之外的请求或不存在的文件会得到 `404`。

![Static action 详情](/img/screenshots/10-static-action-detail.png)

## 延迟(delay)

延迟不属于 action：它在 expectation 自身上设置（**Timing & state**），对每一种 action 都生效。延迟为 `5000` 的 expectation 会等待五秒再响应，很适合复现客户端的超时。

:::note

proxy 的主机名没有端口字段：连接总是发往所选协议的默认端口，因此监听自定义端口（例如 `localhost:3000`）的后端无法被直接指向。可以在这种后端前面放一个反向代理，或把主机名指向已经解析到正确服务的域名。

:::
