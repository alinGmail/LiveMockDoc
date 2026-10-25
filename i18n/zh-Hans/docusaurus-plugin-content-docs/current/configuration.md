---
sidebar_label: "⚙️ 配置"
sidebar_position: 5
---

# ⚙️ 配置

LiveMock 通过环境变量配置，没有需要编辑的配置文件。

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `LIVEMOCK_PORT` | `9002` | web server（dashboard + 控制 API）监听的端口。 |
| `LIVEMOCK_DB_PATH` | `db` | 数据库文件所在的目录。在 Docker 镜像中为 `/app/data/db`。 |
| `LIVEMOCK_COOKIE_SECURE` | `false` | dashboard 通过 HTTPS 提供服务时设为 `true`，这样会话 cookie 只会经 TLS 发送。HTTPS 本身由你的反向代理终止。 |
| `LIVEMOCK_TRUST_PROXY` | *（未设置）* | 以逗号分隔的反向代理 IP / CIDR 列表，其 `X-Forwarded-For` 头会被信任，例如 `127.0.0.1,10.0.0.0/8`。不设置或设为 `false` 时完全忽略转发头。故意不提供“信任所有来源”模式；条目非法会导致服务在启动时退出。 |

例如，换一个端口运行：

```bash
LIVEMOCK_PORT=8100 npx livemock
```

（在源码仓库中运行时，改用 `LIVEMOCK_PORT=8100 yarn web-start`。）

或者使用 Docker Compose：

```bash
LIVEMOCK_PORT=8100 LIVEMOCK_COOKIE_SECURE=true LIVEMOCK_TRUST_PROXY=127.0.0.1 docker compose up
```

## 部署在反向代理之后

dashboard、控制 API（`/api`）和 Socket.IO 端点（`/api/socket.io`）都由同一个进程提供，因此一条代理规则就够了。有两条规则很关键：

1. 同时转发 WebSocket upgrade，否则 dashboard 会停止接收实时更新。
2. 设置 `LIVEMOCK_TRUST_PROXY`，让登录限流看到真实客户端 IP；当公网 URL 是 HTTPS 时，再设置 `LIVEMOCK_COOKIE_SECURE=true`。

nginx 配置示例：

```nginx
server {
    listen 443 ssl;
    server_name mock.example.com;

    location / {
        proxy_pass http://127.0.0.1:9002;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        # Socket.IO needs the upgrade
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

每个项目的 **mock 端口** 是独立的监听器，始终保持公开：测试客户端和应用直接调用它（它们不属于 dashboard 的源，也不需要登录）。

## 数据与备份

LiveMock 存储的一切——项目、expectation、分组、筛选器和请求记录——都在数据库目录（`LIVEMOCK_DB_PATH`）里。要备份一个实例，请停止服务并复制该目录，或备份 Docker 卷。

请求记录会被自动裁剪：每个项目最多保留 **Max request log** 条（默认 5000，最小 1000），在项目设置中按项目配置。
