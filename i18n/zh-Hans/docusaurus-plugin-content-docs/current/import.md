---
sidebar_label: "📥 导入 OpenAPI / Postman"
sidebar_position: 10
---

# 📥 导入 OpenAPI 与 Postman 集合

LiveMock 可以把一份 API 描述变成一组 expectation，这样你就不必手动重建每个接口。

## 支持的格式

| 来源 | 版本 |
| --- | --- |
| OpenAPI | 3.0 / 3.1（JSON 或 YAML） |
| Swagger | 2.0（JSON 或 YAML，会先转换成 OpenAPI 3） |
| Postman Collection | v2.0 / v2.1（JSON） |

格式会自动识别。不属于以上任何格式的文件会被拒绝并给出提示。

## 导入

导入的 expectation 会追加到**当前打开的项目**中。想从零开始，可以导入到新项目，或先删除已有的 expectation。

上传文件（点击或拖拽到拖放区域），然后选择选项：

| 选项 | 默认 | 作用 |
| --- | --- | --- |
| **Path prefix** | 关闭 | 开启时，OpenAPI 文档中第一个 `servers` 条目的路径前缀会保留在每个路径前面。主机名始终被忽略；仍包含未解析 `{variable}` 的 `servers` 条目会被跳过。 |
| **Overwrite existing** | 关闭 | 开启时，导入的操作会替换 method 和 path 相同的已有 expectation。关闭时，这类操作会被跳过。 |

然后点击 **Import**。结果对话框会列出创建、覆盖、跳过了多少条 expectation，以及每一条无法导入的条目的原因。

## 生成了什么

### 每个 OpenAPI operation 生成一条 expectation

- **Matchers** —— 恰好两个：`method` 和 `path`。
  - 不带参数的路径变成 `path IS` matcher，例如 `/users`。
  - 带参数的路径变成 `path MATCH_GLOB` matcher，其中每个 `{param}` 被替换为 `*`，例如 `/users/{id}` 变成 `/users/*`。
- **状态码与响应体** —— 使用第一个 2xx 响应，优先 `200`，其次 `201`；没有 2xx 时使用 `default`（按 200 处理），否则使用第一个声明的响应。
- **响应体来源**，按优先级依次为：`examples` 的第一项、`example`、从 `schema` 采样的值（`date-time`、`email`、`uuid`、`uri`、`hostname` 等格式会生成确定性样本），最后是 `{}`。
- **响应类型** —— JSON 媒体类型会变成 JSON 响应，值会格式化缩进；其他媒体类型变成纯文本。没有响应体的 operation（例如 204）会得到空的 JSON 响应。
- **名称** —— `summary`，其次 `operationId`，最后 `METHOD /path`。
- **其他字段** —— expectation 处于启用状态，延迟(delay)为 `0`，优先级(priority)为 `0`。已废弃的 operation 与其他 operation 一样导入。

### 每个 Postman 请求生成一条 expectation

- 文件夹会被展平；禁用的条目和非 HTTP 条目（websocket、gRPC……）会被跳过并报告。
- **Method** 来自请求本身（默认 `GET`）。
- **Path** 是 URL 的 pathname，因此主机名和查询字符串会被丢弃。集合变量会用默认值解析。路径中仍含有未解析 `{{variable}}` 的会被跳过。
- 像 `:id` 这样的占位符会变成 `*`，带 `*` 的路径使用 `MATCH_GLOB`（规则与 OpenAPI 相同）。
- **状态码与响应体** 来自该请求第一个保存的 2xx 示例；没有保存示例时得到 `200` 和 `{}`。JSON 预览和可解析的响应体会变成 JSON 响应，其余为纯文本。

### 重复项

当项目中已经存在相同的 `method` 值和 `path` matcher 值时，这次导入会被视为重复。开启 **Overwrite existing** 时，已有 expectation 会保留自己的 id、时序和状态，而名称、matcher 和 action 会被替换。某一条 operation 失败不会回滚本次导入的其余部分。
