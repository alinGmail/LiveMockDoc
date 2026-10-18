---
sidebar_label: "📥 Import OpenAPI / Postman"
sidebar_position: 10
---

# 📥 Import OpenAPI and Postman collections

LiveMock can turn an API description into a set of expectations, so you do not have to re-create every endpoint by
hand.

## Supported formats

| Source | Versions |
| --- | --- |
| OpenAPI | 3.0 / 3.1 (JSON or YAML) |
| Swagger | 2.0 (JSON or YAML, converted to OpenAPI 3 first) |
| Postman Collection | v2.0 / v2.1 (JSON) |

The format is detected automatically. A file that is none of the above is rejected with a message.

## Importing

Imported expectations are appended to the **currently open project**. To start from a clean slate, either import into a
new project or delete the existing expectations first.

Upload the file (click or drag it into the drop area) and choose the options:

| Option | Default | Effect |
| --- | --- | --- |
| **Path prefix** | off | When on, the path prefix of the first `servers` entry in an OpenAPI document is kept in front of every path. The host is always ignored; `servers` entries that still contain an unresolved `{variable}` are skipped. |
| **Overwrite existing** | off | When on, an imported operation replaces an existing expectation with the same method and path. When off, such operations are skipped. |

Then click **Import**. The result dialog lists how many expectations were created, overwritten and skipped, plus the
reason for every entry that could not be imported.

## What is generated

### One expectation per OpenAPI operation

- **Matchers** - exactly two: `method` and `path`.
  - A path without parameters becomes a `path IS` matcher, for example `/users`.
  - A path with parameters becomes a `path MATCH_GLOB` matcher, where each `{param}` is replaced by `*`, for example
    `/users/{id}` becomes `/users/*`.
- **Status and body** - the first 2xx response is used, preferring `200`, then `201`; when there is no 2xx, `default`
  is used (treated as 200), otherwise the first declared response.
- **Body source**, in order of preference: the first entry of `examples`, then `example`, then a value sampled from the
  `schema` (formats such as `date-time`, `email`, `uuid`, `uri` and `hostname` produce deterministic samples), and
  finally `{}`.
- **Response type** - a JSON media type becomes a JSON response with the value pretty-printed; any other media type
  becomes plain text. An operation without a body (for example a 204) gets an empty JSON response.
- **Name** - `summary`, then `operationId`, then `METHOD /path`.
- **Other fields** - the expectation is active, with delay `0` and priority `0`. Deprecated operations are imported
  like any other.

### One expectation per Postman request

- Folders are flattened; disabled items and non-HTTP items (websocket, gRPC, …) are skipped and reported.
- **Method** comes from the request (default `GET`).
- **Path** is the pathname of the URL, so the host and the query string are dropped. Collection variables are resolved
  with their default values. A path that still contains an unresolved `{{variable}}` is skipped.
- Placeholders such as `:id` become `*`, and a path with `*` uses `MATCH_GLOB` (same rule as OpenAPI).
- **Status and body** come from the first saved 2xx example of the request; without a saved example you get `200` and
  `{}`. JSON previews and parseable bodies become JSON responses, everything else plain text.

### Duplicates

An import is considered a duplicate when the `method` value and the `path` matcher value already exist in the project.
With **Overwrite existing** the existing expectation keeps its id and its timing and state, while its name, matchers
and actions are replaced. A failure on one operation does not roll back the rest of the import.
