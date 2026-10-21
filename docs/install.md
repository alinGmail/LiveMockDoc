---
sidebar_label: "🛠️ Installation"
sidebar_position: 2
---

# 🛠️ Installation

LiveMock comes in two flavours:

- **Web** - a self-hosted server you open in a browser. This is the recommended way to run LiveMock: it is a single
  process, it keeps its data on your server, and you can put it behind your own reverse proxy and HTTPS.
- **Desktop** - an Electron app for Windows, macOS and Linux. The desktop builds are **not signed**, so the operating
  system will warn you before the first launch. If you only want to try LiveMock, prefer the web version.

## 🌐 Web version

### Option A - npm

The web server and its dashboard are published to npm as
[`livemock`](https://www.npmjs.com/package/livemock), so there is nothing to clone or build. Node.js 18 or newer is
required.

Run it once without installing anything:

```bash
npx livemock
```

Or install it globally so the `livemock` command stays on your `PATH`:

```bash
npm install -g livemock
livemock
```

Either way the server starts on `http://localhost:9002` and serves the dashboard at
`http://localhost:9002/dashboard/`.

The database is kept in a `db` directory **relative to the directory you start LiveMock from**, so pick a stable
working directory (or set `LIVEMOCK_DB_PATH` to an absolute path, for example
`LIVEMOCK_DB_PATH=/var/lib/livemock npx livemock`). Otherwise, starting from a different directory opens a fresh,
empty instance.

`npx` reuses the cached copy on later runs. Append `@latest` - `npx livemock@latest` - to start the newest release
instead, or run `npm install -g livemock@latest` to upgrade a global install.

The same command also resets the account if you lose the password: `npx livemock reset-admin <new-username>`, with the
server stopped. See [Authentication](./auth.md#recovering-a-lost-password).

### Option B - Docker

The repository contains a `Dockerfile` and a `docker-compose.yml`, so the whole build (core types, dashboard,
server bundle) happens inside the image:

```bash
git clone https://github.com/alinGmail/LiveMock.git
cd LiveMock
docker compose up
```

The dashboard is then available at `http://localhost:9002/dashboard/`. Data is stored in the `livemock_data` volume, so
it survives container restarts.

To publish the dashboard on another port, set `LIVEMOCK_PORT` before starting Compose - the same value is used for the
listener inside the container and for the published port:

```bash
LIVEMOCK_PORT=8100 docker compose up
```

The mock ports of your projects (8088 by default) must be published separately if you want to reach them from outside
the container.

### Option C - from source

LiveMock uses Yarn workspaces. Node.js 18 or newer is required; the repository pins Yarn 4 through `corepack`.

1. Enable corepack.

   ```bash
   corepack enable
   ```

2. Clone the repository.

   ```bash
   git clone https://github.com/alinGmail/LiveMock.git
   cd LiveMock
   ```

3. Install the dependencies.

   ```bash
   yarn install
   ```

4. Build the shared types and the dashboard, then start the server.

   ```bash
   yarn web-build
   yarn web-start
   ```

   The server listens on `http://localhost:9002` and serves the dashboard at
   `http://localhost:9002/dashboard/`.

:::tip[Behind a slow network]

If you are in China, you can set the `ELECTRON_MIRROR` environment variable to
`https://npmmirror.com/mirrors/electron/` before installing.

:::

:::info[Development mode]

`yarn web-dev` starts the backend on `LIVEMOCK_PORT` (9002 by default) together with the Vite dev server on
`http://localhost:5173`. The dev server proxies `/api` to the backend, so no server URL has to be configured.

:::

### Configuration

The web server is configured with environment variables. The full list, including the reverse-proxy settings, is on the
[Configuration](./configuration.md) page.

## 🖥️ Desktop version

Download the installer for your platform from the [release page](https://github.com/alinGmail/LiveMock/releases).

| Platform | Package |
| --- | --- |
| Windows | `.exe` (NSIS installer) |
| macOS | `.dmg` (Intel and Apple Silicon) |
| Linux | `.AppImage` |

The desktop builds are unsigned: Windows SmartScreen and the macOS Gatekeeper will show a warning on first launch. On
macOS you can open the app with right-click → **Open**, or from **System Settings → Privacy & Security**.

The desktop version stores its data locally, starts without a login and does not expose a web dashboard. Everything
described in this documentation - expectations, matchers, actions, groups, the request log - works the same way in both
versions.
