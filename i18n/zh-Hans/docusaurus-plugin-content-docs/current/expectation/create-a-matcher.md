---
sidebar_position: 2
---

# Matchers

matcher 是针对传入请求的一个条件。一条 expectation 的所有 matcher 都必须通过；只要其中一个失败，该 expectation 就会被跳过，转而尝试下一条。

## 创建 matcher

在 Expectation 详情视图中，点击 **Matchers** 卡片上的铅笔图标，然后点击 **Add matcher**。

![编辑 matcher](/img/screenshots/06-matchers.png)

每一行是一个 matcher，由三部分组成：

1. **Type** —— 检查请求的哪一部分。
2. **Comparator** —— 如何比较值。
3. **Value** —— 与什么比较。带名称的 matcher（`header`、`query`、`param`）还有 **name** 字段。

点击 **Save** 后才会应用改动。

## Matcher 类型

| 类型 | 检查的内容 | 示例值 |
| --- | --- | --- |
| `method` | 请求的 HTTP method。 | `POST` |
| `path` | 请求的路径，始终以 `/` 开头。 | `/api/login` |
| `header` | 某个请求头，通过名称选择。 | name `Authorization`，value `Bearer` |
| `query` | 某个查询参数，通过名称选择。 | name `page`，value `2` |
| `param` | 请求体中的某个字段，通过名称选择。适用于 JSON 请求体和表单请求体。 | name `username`，value `tom` |

:::info[method 比较不区分大小写]

比较前 `method` 的值会被转成大写，因此 `post`、`Post` 和 `POST` 都能匹配 `POST` 请求。

:::

## 比较器(comparator)

| 比较器 | 通过条件 |
| --- | --- |
| `IS` | 请求值等于 matcher 值。 |
| `IS_NOT` | 请求值不等于 matcher 值。 |
| `CONTAINS` | 请求值包含 matcher 值。 |
| `NOT_CONTAINS` | 请求值不包含 matcher 值。 |
| `START_WITH` | 请求值以 matcher 值开头。 |
| `END_WITH` | 请求值以 matcher 值结尾。 |
| `MATCH_REGEX` | 请求值匹配作为正则表达式解读的 matcher 值。 |
| `NOT_MATCH_REGEX` | 请求值不匹配该正则表达式。 |
| `SHOWED` | 请求中存在该名称（header、查询参数或请求体字段）。不需要值。 |
| `NOT_SHOWED` | 请求中不存在该名称。不需要值。 |
| `MATCH_GLOB` | 请求值匹配作为 [glob 模式](<https://en.wikipedia.org/wiki/Glob_(programming)>)解读的 matcher 值，例如 `/users/*`。 |
| `NO_MATCH_GLOB` | 请求值不匹配该 glob 模式。 |

对于 `SHOWED` 和 `NOT_SHOWED`，**value** 字段不会被使用——只有名称有意义。它们很适合区分“携带可选参数的请求”和“不带该参数的请求”，例如 `query page SHOWED`。

## 示例

- `path START_WITH /book/` 匹配所有以 `/book/` 开头的路径。
- `query teacher_name CONTAINS tom` 匹配 `teacher_name` 查询参数包含 "tom" 的请求。
- `param teacher_name IS tom` 匹配请求体中包含 `teacher_name` 且值为 `tom` 的请求：

  ```json
  {
    "teacher_name": "tom"
  }
  ```

- `path MATCH_GLOB /users/*` 匹配 `/users/1`、`/users/42` 和 `/users/jane`，但不匹配 `/users/1/posts`。
- `header Authorization SHOWED` 匹配所有发送 `Authorization` 头的请求，无论其值是什么。
- `method IS_NOT DELETE` 匹配除 `DELETE` 请求之外的一切。
