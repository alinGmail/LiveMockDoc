---
sidebar_label: "🗂️ 分组与匹配顺序"
sidebar_position: 9
---

# 🗂️ Expectation 分组与匹配顺序

expectation 要么放在某个**分组(group)**里，要么直接位于列表底部的 **Ungrouped** 区域。分组不只是文件夹：它们参与决定哪条 expectation 响应请求，而且可以整体关闭。

![Expectation 分组](/img/screenshots/04-expectations.png)

## 创建分组

点击 **Add Expectation** 旁边的分组按钮。分组有名称、优先级(priority)和启用标志。新建 expectation 时，可以在 **Add expectation** 对话框里选择分组，直接创建到该分组中；已有 expectation 可以通过时序编辑器移动。

## 优先级与启用标志

| 字段 | 作用 |
| --- | --- |
| **优先级(priority)**（`P` 徽章） | 更高者优先。 |
| **启用开关** | 停用的分组会被整体跳过，就像它的 expectation 不存在一样。 |

两者都显示在分组标题栏中。每条 expectation 自己也有这两个字段（在 **Timing & state** 中）。

## 匹配顺序

请求到达时，LiveMock 按以下顺序遍历 expectation，并取**第一条**全部 matcher 都命中的：

1. **分组与未分组的 expectation 一起排名。** 一个分组算作一个整体块；每条未分组的 expectation 自成一个块。块按 `(priority, creation time)` 排序，两者都是**降序**——优先级高的在前，相同时创建更晚的块胜出。
2. **分组内部**，成员按同样的方式排序：`(priority, creation time)`，降序。
3. 第一条启用、**带有 action** 且全部 matcher 都通过的 expectation 响应请求。没有 action 的 expectation 会被跳过。比较永远不会回到后面的块。

换句话说：优先级更高的块先参与比较，它的*全部* expectation 都会在下一个块之前被考虑——即使下一个块里有单条优先级更高的 expectation。

:::tip[典型配置]

- 把具体的、高优先级的规则（某个失败的接口、某个错误场景）放进高优先级的分组。
- 把宽泛的兜底规则——例如返回 `404` 的 `path starts with /`——放在未分组区域，优先级设为 `0`，这样它只在没有更具体的规则命中时才生效。

:::

## 删除分组

删除分组会同时删除其中的 expectation（请求记录会保留，和删除单条 expectation 一样）。删除不可撤销，请先检查分组内容。

## 参见

- [Expectations](./expectation/create-an-expectation.md) —— 单条 expectation 的字段。
- [Matchers](./expectation/create-a-matcher.md) —— “命中”到底意味着什么。
