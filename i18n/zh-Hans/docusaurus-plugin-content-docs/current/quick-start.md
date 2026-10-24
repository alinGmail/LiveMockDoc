---
sidebar_label: "🧭 快速开始"
sidebar_position: 4
---

# 🧭 快速开始

这个演练会带你从首次访问走到一个可用的 mock 响应，大约需要五分钟。

## 1. 创建账号

首次访问会显示注册表单。设置用户名和密码，你就会立即登录。需要细节请见[认证](./auth.md)。

## 2. 创建第一个项目

**项目(project)** 就是一个 mock server，拥有自己的端口和自己的 expectation 列表。输入名称，端口保持 `8088`（或另选一个空闲端口），可选地设置 **Max request log** —— 即项目保留多少条请求记录。

![创建第一个项目](/img/screenshots/03-first-project.png)

你会进入新项目的 Expectation 页面。此时项目处于停止状态；应用栏显示 `stopped :8088`。

## 3. 创建 expectation

点击左侧面板中的 **Add Expectation**。给它起个名字、填一段可选描述，如有需要再选一个分组。

![添加 expectation](/img/screenshots/05-add-expectation.png)

新建的 expectation 没有 matcher，也没有 action，并且会在右侧被选中。

## 4. 添加 matcher

点击 **Matchers** 卡片上的铅笔图标，然后点击 **Add matcher**。一个 matcher 由三部分组成：类型（`method`、`path`、`header`、`query`、`param`）、比较器(comparator)（`is`、`starts with`、`contains`……）和值。

![编辑 matcher](/img/screenshots/06-matchers.png)

要匹配项目的所有请求，一个 `path` matcher、比较器选 `starts with`、值填 `/` 就够了。想试一个登录接口，可以用 `method is POST` 加上 `path is /api/login`。

## 5. 创建 action

点击 **Action** 卡片上的 **Create action**，然后选择 action 类型：

- **自定义响应(custom response)** —— 返回你自己写的状态码、响应头和响应体。响应体可以是 JSON、纯文本，或 [Mock.js](http://mockjs.com/examples.html) 模板。

  ![自定义响应 action](/img/screenshots/07-action-custom-response.png)

- **Proxy** —— 把请求转发到真实主机。

  ![Proxy action](/img/screenshots/08-action-proxy.png)

- **Static** —— 从磁盘目录提供文件。

  ![Static action](/img/screenshots/09-action-static.png)

快速开始里保持 **自定义响应(custom response)**、状态码 `200`，并输入这样的 JSON 响应体：

```json
{
  "name": "John",
  "role": "admin"
}
```

所有改动都会即时保存——页面本身没有单独的保存步骤。

## 6. 启动项目

点击应用栏里绿色的启动按钮。状态会变成 `running :8088`。现在调用 mock 端口：

```bash
curl http://localhost:8088/api/login -X POST
```

你会拿到那段 JSON 响应体，同时该请求会出现在[请求记录](./request-log/overview.md)页面。

:::tip[什么都没命中？]

- 如果请求得到的是 `404`，请检查该 expectation 是否**启用**（标题栏里的开关），以及每个 matcher 是否都命中——只要有一个 matcher 不通过，这个 expectation 就会被跳过。
- 如果有多条 expectation 可能命中，匹配顺序中靠前的那条胜出。参见 [Expectation 分组](./group.md)。

:::

## 下一步

- [Matchers](./expectation/create-a-matcher.md) —— 全部五种 matcher 类型和十二种比较器。
- [Actions](./expectation/create-an-action.md) —— 自定义响应、proxy 和静态目录的细节。
- [分组与匹配顺序](./group.md) —— 控制哪条 expectation 胜出。
- [导入 OpenAPI / Postman](./import.md) —— 把一份 API 描述变成整套 expectation。
