---
sidebar_position: 3
---

# Actions

An action defines what LiveMock answers when an expectation matches. Three kinds of action exist:

| Action | Badge in the list | What it does |
| --- | --- | --- |
| **Custom response** | `RESPONSE` | Returns a status code, headers and a body you write yourself. |
| **Proxy** | `PROXY` | Forwards the request to another host and returns its response. Also proxies WebSocket connections. |
| **Static** | `STATIC` | Serves files from a folder on the machine running LiveMock. |

## Creating an action

In the Expectation detail view click **Add action** on the **Action** card (or the pencil, when the expectation
already has one). The dialog has three tabs - **Custom response**, **Proxy** and **Static** - and applies the change when
you click **Save action**. An expectation has exactly one action: switching the tab converts the existing action instead
of adding a second one. An expectation without any action is skipped during matching, so remember to add one - an empty
expectation matches nothing.

## Custom response

![Custom response action](/img/screenshots/07-action-custom-response.png)

| Field | Meaning |
| --- | --- |
| **HTTP status** | The status code of the response, for example `200` or `404`. |
| **Response type** | `JSON` or `TEXT`. It decides the `Content-Type` of the response. |
| **Content handler** | `NONE` returns the content as written; `MOCKJS` renders it with [Mock.js](http://mockjs.com/examples.html) templates. |
| **Response headers** | Extra headers appended to the response. |
| **Content** | The response body. |

### Mock.js templates

With the content handler set to `MOCKJS`, the content is a [Mock.js](https://github.com/nuysoft/Mock) template and the
data is generated on every request:

```json
{
  "id": "@id",
  "name": "@name",
  "email": "@email",
  "createdAt": "@datetime"
}
```

## Proxy

![Proxy action](/img/screenshots/08-action-proxy.png)

| Field | Meaning |
| --- | --- |
| **Host** | The target host, for example `api.stripe.com`. The protocol selector in front of the field chooses `http://` or `https://`; pasting a full URL moves its scheme into that selector automatically. The host must not contain a path. The port always stays the default for the protocol (80 for `http`, 443 for `https`), and there is no separate field for a target port. |
| **Prefix remove** | A path prefix removed from the request before it is forwarded, for example `/api`: a request to `/api/users` is forwarded as `/users`. |
| **Request headers** | Headers appended to the outgoing request. |
| **Response headers** | Headers appended to the response before it is sent back. |
| **Handle cross** | Adds permissive CORS headers to the response. |
| **Allow credentials** | With **Handle cross**, sends `Access-Control-Allow-Credentials: true` so browser clients can send cookies. |
| **Support websocket** | Forwards `Upgrade: websocket` connections too. The messages exchanged are recorded in the request log. |

## Static

![Static action](/img/screenshots/09-action-static.png)

| Field | Meaning |
| --- | --- |
| **Folder path** | Absolute path of the folder on the machine running LiveMock, for example `/home/user/mock-assets`. Relative paths are resolved against the working directory of the server, which in Docker is `/app`. |
| **URL prefix** | Requests under this prefix are served from the folder; the rest of the path is used as the file path. Leave it empty to serve request paths as-is. |

For example, with folder `/srv/assets` and prefix `/static`, a request to `/static/logo.svg` returns
`/srv/assets/logo.svg`. A request outside the prefix, or a file that does not exist, gets a `404`.

![Static action detail](/img/screenshots/10-static-action-detail.png)

## Delay

The delay is not part of the action: it is set on the expectation itself (**Timing & state**) and applies to every kind
of action. An expectation with a delay of `5000` waits five seconds before answering, which is handy to reproduce
timeouts in the client.

:::note

The proxy host does not have a port field: connections are made to the default port of the chosen protocol, which is why
a backend that listens on a custom port (for example `localhost:3000`) cannot be targeted directly. Put a reverse proxy
in front of such a backend, or point the host at a hostname that already resolves to the right service.

:::
