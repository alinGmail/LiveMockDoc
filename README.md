# LiveMockDoc

Documentation site for [LiveMock](https://github.com/alinGmail/LiveMock), built with
[Docusaurus 3](https://docusaurus.io/).

Published at <https://alingmail.github.io/LiveMockDoc/>.

## Local development

```bash
yarn install
yarn start        # http://localhost:3000
```

## Building

```bash
yarn build        # static site in ./build
yarn serve        # serve the built site
```

## Where things live

| Path | Contents |
| --- | --- |
| `docs/` | Documentation pages. The sidebar is generated from this folder, ordered by `sidebar_position`. |
| `docs/expectation/` | Expectation, matchers and actions. |
| `docs/request-log/` | Request log, filters, columns, mock from log. |
| `static/img/screenshots/` | Screenshots of the dashboard, captured at 1440×900 from a web instance seeded with the demo project. |

## Updating screenshots

1. Start a web instance and seed it with demo data:

   ```bash
   yarn workspace livemock-core build
   LIVEMOCK_DB_PATH=/tmp/livemock-docs yarn workspace livemock start
   ```

   Create an account and a project, stop the backend, then run the seed scripts from the LiveMock repository:

   ```bash
   yarn workspace livemock seed-demo "<project name>"
   yarn workspace livemock seed-logs "<project name>"
   ```

   Start the backend again and open `http://localhost:9002/dashboard/`.

2. Capture at a 1440×900 viewport in the dark theme. The file names in `static/img/screenshots/` match the order of the
   docs, so a replacement can be dropped in without touching any page.
