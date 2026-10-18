---
sidebar_position: 1
slug: /request-log
---

# Request Log

Every request that reaches a project's mock port is recorded: which expectation matched (if any), the request, the
response and how long it took. The **Request Log** tab shows them live while the project is running.

![Request log](/img/screenshots/11-request-log.png)

## Layout

- **Left** - the list of captured requests, newest first. Each row shows the method, the path, the matched expectation,
  the time, the duration and the status code. Proxy requests carry a `PROXY` badge, WebSocket sessions a `WS` badge, and
  requests still waiting for an answer show `pending` instead of a status.
- **Right** - the selected request, split into **Overview**, **Request**, **Response** and, for WebSocket sessions,
  **Websocket**.

Clicking a row loads it in the detail pane.

## Overview

![Overview tab](/img/screenshots/15-log-overview.png)

A summary of the request - method, path, status, duration and request time - followed by the **matched expectation**.
When nothing matched, the pane says so and the request fell through to the `404` fallback.

## Request

![Request tab](/img/screenshots/16-log-request.png)

The request line, the request headers and the parsed body.

## Response

![Response tab](/img/screenshots/17-log-response.png)

The status line, the response headers and the response body.

## Websocket

![Websocket tab](/img/screenshots/18-log-websocket.png)

For proxied WebSocket connections, the messages exchanged in both directions, with their direction and send time. This
is most useful when checking a socket protocol against a real backend while proxying.

## Live mode and pausing

At the right of the filter bar:

- the **live** indicator means new requests are appended as they arrive;
- **Pause** freezes the list so you can read a request without the list moving; click **Resume** to continue;
- **Clear** deletes every request recorded for the current project (it asks for confirmation).

## What is stored

Each record is one JSON object:

```json
{
  "id": 100099,
  "expectationId": "c26a2cef-8ac7-4ce4-8a4b-595c850488be",
  "proxyInfo": {
    "isProxy": false,
    "proxyHost": null,
    "proxyPath": null,
    "requestHeaders": null,
    "responseHeaders": null
  },
  "req": {
    "method": "POST",
    "path": "/api/login",
    "query": {},
    "headers": {
      "host": "localhost:8088",
      "content-type": "application/json"
    },
    "body": { "username": "jane" },
    "rawBody": "{\"username\":\"jane\"}",
    "requestTime": 1691154891042,
    "requestTimeStr": "2023-08-04T13:14:51.042Z"
  },
  "res": {
    "status": 200,
    "statusMessage": "OK",
    "duration": 12,
    "headers": { "content-type": "application/json" },
    "body": { "token": "…" },
    "rawBody": "{\"token\":\"…\"}",
    "responseTime": 1691154891054,
    "responseTimeStr": "2023-08-04T13:14:51.054Z"
  },
  "websocketInfo": null
}
```

| Field | Meaning |
| --- | --- |
| `id` | Sequence number of the request in the project. |
| `expectationId` | The expectation that answered the request, or `null` when nothing matched. |
| `proxyInfo` | For proxied requests: the target host and path, plus the headers sent to the target and received from it. |
| `req` / `res` | The parsed body, the raw body, headers and timing. `req.query` holds the parsed query string. |
| `websocketInfo` | For WebSocket sessions: the connection status and the messages exchanged. |

The custom filter below addresses fields of this object with JSON paths such as `req.method` or `res.status`. The `id`
of a request is also handy when reporting a problem.

## Limits

A project keeps a bounded number of requests: **Max request log** in the [project settings](./../project.md) (default
5000, minimum 1000). Old entries are trimmed automatically, so a long-running project never grows without bound. The
list loads older requests on demand while you scroll.

## Turning a request into a mock

The **Mock this request** button in the top-right corner creates a new expectation from the selected request - see
[Mock this request](./mock-from-log.md).

## Next

- [Filters](./filters.md) - preset and custom filters.
- [Columns](./columns.md) - choose what the list shows.
