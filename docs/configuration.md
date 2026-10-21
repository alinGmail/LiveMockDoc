---
sidebar_label: "⚙️ Configuration"
sidebar_position: 5
---

# ⚙️ Configuration

The web version is configured through environment variables. There is no configuration file to edit.

| Variable | Default | Description |
| --- | --- | --- |
| `LIVEMOCK_PORT` | `9002` | Port the web server (dashboard + control API) listens on. |
| `LIVEMOCK_DB_PATH` | `db` | Directory where the database files are stored. In the Docker image it is `/app/data/db`. |
| `LIVEMOCK_COOKIE_SECURE` | `false` | Set to `true` when the dashboard is served over HTTPS so the session cookie is only sent over TLS. HTTPS itself is terminated by your reverse proxy. |
| `LIVEMOCK_TRUST_PROXY` | *(unset)* | Comma-separated list of reverse-proxy IPs / CIDRs whose `X-Forwarded-For` header is trusted, for example `127.0.0.1,10.0.0.0/8`. Unset or `false` ignores forwarding headers entirely. A "trust everyone" mode is intentionally not supported, and an invalid entry stops the server at startup. |

For example, to run on another port:

```bash
LIVEMOCK_PORT=8100 npx livemock
```

(or `LIVEMOCK_PORT=8100 yarn web-start` from a source checkout.)

or with Docker Compose:

```bash
LIVEMOCK_PORT=8100 LIVEMOCK_COOKIE_SECURE=true LIVEMOCK_TRUST_PROXY=127.0.0.1 docker compose up
```

## Behind a reverse proxy

The dashboard, the control API (`/api`) and the Socket.IO endpoint (`/api/socket.io`) are all served by the same
process, so a single proxy rule is enough. Two rules matter:

1. Forward WebSocket upgrades as well, otherwise the dashboard stops receiving live updates.
2. Set `LIVEMOCK_TRUST_PROXY` so the login throttle sees the real client IP, and `LIVEMOCK_COOKIE_SECURE=true` when the
   public URL is HTTPS.

Example nginx block:

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

Each project's **mock port** is a separate listener and stays public: test clients and applications call it directly
(they are not part of the dashboard origin, and they do not require a login).

## Data and backups

Everything LiveMock stores - projects, expectations, groups, filters and request logs - lives in the database directory
(`LIVEMOCK_DB_PATH`). To back up an instance, stop the server and copy that directory, or back up the Docker volume.

The request log is trimmed automatically: each project keeps at most **Max request log** entries (default 5000,
minimum 1000), set per project in the project settings.
