---
sidebar_position: 4
---

# 从请求生成 mock

与其手写一条新的 expectation，不如从真实发送过的请求出发。在请求记录中选中它，然后点击 **Mock this request**。

![从请求生成 mock](/img/screenshots/19-mock-from-log.png)

对话框会用捕获的请求预填：

| 区块 | 预填内容 |
| --- | --- |
| **Name** | `METHOD /path`，例如 `POST /api/login`。 |
| **Matchers** | `method IS` 和 `path IS`，两者都勾选。 |
| **Query** | 请求的每个查询参数及其捕获值。 |
| **Request params** | 请求的请求体字段（嵌套字段以点号形式出现，例如 `address.city`）及其捕获值。 |
| **Response** | 捕获的状态码、捕获的响应头（`content-type` 已勾选）以及响应体。 |

默认只勾选 `method` 和 `path`；查询参数和请求体字段也会列出，方便你有意识地收紧匹配。例如取消勾选 `username` 和 `password`，就能让这个 mock 匹配每次登录尝试，而不是那一次请求的具体凭据——通常这才是你想要的。

响应始终是 JSON 响应。捕获的 JSON 请求体会以格式化缩进预填；不是 JSON 的请求体（例如 ping 接口的 `text/plain`）会变成 `{}`。捕获的响应头会被一并带过来，因此原响应中的 `content-type: text/plain` 会被保留，并覆盖 JSON 内容类型——如果你希望新 mock 以 JSON 应答，就取消勾选它。点击 **Reset** 可以丢弃你的修改，恢复捕获时的值。

捕获的值会按字面保留：LiveMock 不会把 id 或时间戳变成 Mock.js 模板，因此每次都会返回相同的响应体。如果需要动态数据，可以稍后把新 expectation 的 action 切换到 `MOCKJS` content handler，并用 [Mock.js](./../expectation/create-an-action.md) 模板替换固定值。

点击 **Save** 创建 expectation。它会加入当前打开的项目（未分组、启用、延迟 `0`、优先级 `0`），并带有一段记录其来源请求的描述。
