---
sidebar_label: "🧭 Quick Start"
sidebar_position: 4
---

# 🧭 Quick Start

This walkthrough takes a web instance from the first visit to a working mock response. It takes about five minutes.

## 1. Create the account

The first visit shows the registration form. Pick a username and a password and you are signed in right away. See
[Authentication](./auth.md) if you need the details.

## 2. Create your first project

A **project** is one mock server with its own port and its own list of expectations. Enter a name, leave the port at
`8088` (or pick another free port) and, optionally, set **Max request log** - how many requests the project keeps.

![Create your first project](/img/screenshots/03-first-project.png)

You land on the Expectation page of the new project. The project is stopped at this point; the app bar shows
`stopped :8088`.

## 3. Create an expectation

Click **Add Expectation** in the left panel. Give it a name, an optional description and, if you like, a group.

![Add expectation](/img/screenshots/05-add-expectation.png)

The expectation is created with no matchers and no action, and it is selected on the right.

## 4. Add a matcher

Click the pencil on the **Matchers** card, then **Add matcher**. A matcher has three parts: a type (`method`, `path`,
`header`, `query`, `param`), a comparator (`is`, `starts with`, `contains`, …) and a value.

![Edit matchers](/img/screenshots/06-matchers.png)

To match every request of the project, a single `path` matcher with `starts with` and the value `/` is enough. To try it
on a login endpoint, use `method is POST` plus `path is /api/login`.

## 5. Create the action

Click **Create action** on the **Action** card and choose the kind of action:

- **Custom response** - return your own status code, headers and body. The body can be JSON, plain text, or a
  [Mock.js](http://mockjs.com/examples.html) template.

  ![Custom response action](/img/screenshots/07-action-custom-response.png)

- **Proxy** - forward the request to a real host.

  ![Proxy action](/img/screenshots/08-action-proxy.png)

- **Static** - serve a folder from disk.

  ![Static action](/img/screenshots/09-action-static.png)

For the quick start, keep **Custom response**, status `200`, and type a JSON body such as:

```json
{
  "name": "John",
  "role": "admin"
}
```

Everything is saved as you go - there is no separate save step on the page itself.

## 6. Start the project

Click the green start button in the app bar. The status changes to `running :8088`. Now call the mock port:

```bash
curl http://localhost:8088/api/login -X POST
```

You get the JSON body back, and the request appears on the [Request Log](./request-log/overview.md) page.

:::tip[Nothing matched?]

- If the request is answered by a `404`, check that the expectation is **active** (the toggle in its header) and that
  every matcher matches - a single failing matcher is enough to skip an expectation.
- If several expectations could match, the first one in the match order wins. See
  [Expectation groups](./group.md).

:::

## Where to go next

- [Matchers](./expectation/create-a-matcher.md) - all five matcher types and twelve comparators.
- [Actions](./expectation/create-an-action.md) - custom response, proxy and static folder in detail.
- [Groups and match order](./group.md) - control which expectation wins.
- [Import OpenAPI / Postman](./import.md) - turn an API description into a full set of expectations.
