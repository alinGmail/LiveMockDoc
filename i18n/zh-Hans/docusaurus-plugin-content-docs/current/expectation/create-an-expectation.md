---
sidebar_position: 1
---

# 什么是 expectation

expectation 是 LiveMock 的核心构件。它表达的是：*当请求长这样时，就这样回应它。*

一条 expectation 由以下部分组成：

- 一组 **matcher** —— 每个 matcher 检查请求的某一部分（method、path、header、query 参数、请求体参数）。只有**全部** matcher 都通过时，expectation 才算命中；没有任何 matcher 的 expectation 会匹配所有请求；
- 一个 **action** —— 回应什么：自定义响应(custom response)、proxy 到另一台主机，或从磁盘提供的目录；
- **时序与状态** —— 延迟(delay)、优先级(priority)、启用标志以及可选的分组(group)。

![Expectation 详情](/img/screenshots/04-expectations.png)

## 创建 expectation

点击 Expectation 页面左侧面板中的 **Add Expectation**。输入名称、可选的描述和一个分组（默认为 **ungrouped**）。

![添加 expectation](/img/screenshots/05-add-expectation.png)

新的 expectation 会出现在列表中，并在右侧打开，此时 matcher 集合为空，也没有 action。matcher 和 action 都从详情视图的卡片中添加。

## 属性

| 属性 | 含义 |
| --- | --- |
| **Name** | 显示在列表和请求记录中（“matched”列）。 |
| **Description** | 可选的自定义文本，显示在 matcher 上方。 |
| **Group** | expectation 所属的分组，或未分组。分组会影响匹配顺序——参见[分组](./../group.md)。 |
| **Delay** | 执行 action 前等待的毫秒数。用于模拟慢速 API。 |
| **Priority** | 更高者优先参与匹配。 |
| **Active** | 停用的 expectation 会被跳过，就像它不存在一样。 |
| **Matchers** | 针对请求的条件。 |
| **Action** | 响应：自定义响应、proxy 或静态目录。 |

延迟、优先级和启用标志统一通过 **Timing & state** 卡片上的 **Edit timing and state** 编辑。

## 复制与删除

详情视图的标题栏有三个按钮：

- **启用**开关——与 **Timing & state** 中的启用标志相同；
- **Clone**——复制该 expectation，包括它的 matcher 和 action，放到同一分组中；
- **Delete**——确认后删除该 expectation。

删掉了某条 expectation 所在的分组？如果捕获的请求对应的 expectation 已不存在，**matched** 字段会显示它的 id 而不是名称。

## 下一步

- [创建 matcher](./create-a-matcher.md)
- [创建 action](./create-an-action.md)
