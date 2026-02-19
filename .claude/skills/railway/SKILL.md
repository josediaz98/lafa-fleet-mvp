---
name: railway
description: Manage Railway projects, services, deployments, environments,
  databases, templates, domains, and metrics. Use when user mentions Railway,
  deploy, hosting, infrastructure, logs, or any railway CLI/API operation.
allowed-tools: Bash(railway:*), Bash(which:*), Bash(command:*), Bash(npm:*),
  Bash(npx:*), Bash(curl:*), Bash(jq:*)
---

# Railway

Unified skill for all Railway infrastructure operations.

## Prerequisites

```bash
command -v railway        # CLI installed?
railway whoami --json     # Authenticated?
railway status --json     # Project linked?
```

If CLI not installed: `npm install -g @railway/cli` or `brew install railway`
If not authenticated: `railway login`
If CLI below v4.27.3: `railway upgrade` (needed for `environment edit`)

## Decision Router

Match user intent to the right section:

| User Says | Section |
|-----------|---------|
| "setup", "init", "create project", "deploy to railway" | [Setup & Init](#setup--init) |
| "create service", "add backend", "new api" | [Setup & Init → Create Service](#create-service) |
| "what's the config", "show variables", "set env var" | [Environment & Config](#environment--config) |
| "deploy", "railway up", "push code", "ship" | [Deploy](#deploy) |
| "show logs", "redeploy", "restart", "railway down" | [Deployment Lifecycle](#deployment-lifecycle) |
| "rename service", "change icon", "service status" | [Services](#services) |
| "add postgres", "add redis", "add database" | [Templates & Databases](#templates--databases) |
| "add ghost", "add strapi", "deploy template" | [Templates & Databases](#templates--databases) |
| "add domain", "get URL", "remove domain" | [Domains](#domains) |
| "CPU usage", "memory", "performance", "metrics" | [Metrics](#metrics) |
| "list projects", "rename project", "PR deploys" | [Projects](#projects) |
| "how does Railway work", docs.railway.com URL | [Resources](#resources) |
| "railway status", "is it running", "what's deployed" | Run `railway status --json` and present |

---

## Setup & Init

Create Railway projects and add services. Handles init, link, and scaffolding.

### Decision Flow

```
railway status --json (in current dir)
     |
  Linked?
  /      \
Yes       No
 |         |
 |    Check parent: cd .. && railway status --json
 |         |
 |     Parent linked?
 |     /          \
 |   Yes           No
 |    |             |
 |  Add service   railway list --json
 |  Set rootDir      |
 |  Deploy       Match existing?
 |    |          /        \
 |    |       Yes          No
 |    |      Link        Init new
 |    |        |            |
 +----+--------+------------+
          |
    User wants service?
    /              \
  Yes               No → Done
   |
 Scaffold code
 railway add --service <name>
 Configure if needed
```

**Default**: "deploy to railway" when already linked = add a service, NOT a new project.
Only create new project when user explicitly says "new project" / "separate project".

### Init New Project

```bash
railway init -n <name>
# With workspace: railway init -n <name> --workspace <id>
```

Get workspace IDs: `railway whoami --json` → `workspaces[].{id, name}`

### Link Existing Project

```bash
railway link -p <project-name-or-id>
# Options: -e (environment), -s (service), -t (team/workspace)
```

### Create Service

```bash
railway add --service <name>
```

For GitHub repo sources: create empty service, then configure source via [Environment & Config](#environment--config). Do NOT use `railway add --repo`.

### Configure by Project Type

Reference [railpack.md](references/railpack.md) for build config.
Reference [monorepo.md](references/monorepo.md) for monorepo patterns.

| Type | Auto-detected? | Notes |
|------|---------------|-------|
| Static (Vite, CRA, Astro) | Yes | Non-standard output dir → set `RAILPACK_STATIC_FILE_ROOT` via env config |
| Node SSR (Next, Nuxt, Express) | Yes | Verify `start` script in package.json |
| Python (FastAPI, Django) | Yes | Needs `requirements.txt` or `pyproject.toml` |
| Go | Yes | Needs `go.mod` |

### Monorepo Configuration

**Isolated** (apps don't share code): Set `rootDirectory` to app subdirectory.

**Shared** (TS workspaces, Turborepo): Do NOT set rootDirectory. Set custom build/start commands:
- pnpm: `pnpm --filter <pkg> build`
- npm: `npm run build --workspace=packages/<pkg>`
- Turborepo: `turbo run build --filter=<pkg>`
- Set watch paths to prevent unnecessary rebuilds

See [monorepo.md](references/monorepo.md) for detailed patterns.

### Scaffolding Hints

| Type | Command |
|------|---------|
| Static site | Create `index.html` in root |
| Vite React | `npm create vite@latest . -- --template react` |
| Astro | `npm create astro@latest` |
| Python FastAPI | Create `main.py` + `requirements.txt` |
| Go | Create `main.go` listening on `PORT` env var |

---

## Environment & Config

Read and edit Railway environment config. Requires CLI v4.27.3+.

### Read Config

```bash
railway environment config --json
```

Returns: source, build settings, deploy settings, variables per service, shared variables.
For field reference: [environment-config.md](references/environment-config.md).
For variable syntax: [variables.md](references/variables.md).

### Rendered Variables

`environment config` returns unrendered templates (`${{shared.DOMAIN}}`).
For resolved runtime values:

```bash
railway variables --json                       # linked service
railway variables --service <name> --json      # specific service
```

### Resolve Service IDs

```bash
railway environment config --json | jq '.services | keys'   # service IDs
railway status --json                                        # service names → IDs
```

### Edit Config

Pass JSON patch — merged with existing config, triggers deploy:

```bash
railway environment edit --json <<< '<json-patch>'
railway environment edit -m "description" --json <<< '<json-patch>'
```

**Common patches:**

| Action | Patch |
|--------|-------|
| Set build command | `{"services":{"SVC_ID":{"build":{"buildCommand":"npm run build"}}}}` |
| Add variable | `{"services":{"SVC_ID":{"variables":{"KEY":{"value":"val"}}}}}` |
| Delete variable | `{"services":{"SVC_ID":{"variables":{"OLD":null}}}}` |
| Delete service | `{"services":{"SVC_ID":{"isDeleted":true}}}` |
| Set replicas | `{"services":{"SVC_ID":{"deploy":{"multiRegionConfig":{"us-west2":{"numReplicas":3}}}}}}` |
| Add shared var | `{"sharedVariables":{"DB_URL":{"value":"postgres://..."}}}` |

Batch multiple fields in one patch for atomic apply.

### Create / Switch / Duplicate Environment

```bash
railway environment new <name>
railway environment new staging --duplicate production
railway environment <name-or-id>                          # switch
```

---

## Deploy

Push local code to Railway with `railway up`.

### Usage

```bash
railway up --detach -m "Deploy description"        # fire-and-forget (default)
railway up --ci -m "Deploy description"            # stream build logs
railway up --detach --service backend -m "msg"     # specific service
railway up --project <id> --environment prod --detach -m "msg"  # unlinked
```

Always use `-m` with a descriptive commit message.

**CI mode**: logs stream inline. Do NOT run `railway logs --build` after — logs already printed.

| Flag | Description |
|------|-------------|
| `-m, --message` | Commit message (always use) |
| `-d, --detach` | Don't attach to logs |
| `-c, --ci` | Stream build logs, exit when done |
| `-s, --service` | Target service |
| `-e, --environment` | Target environment |
| `-p, --project` | Target project (requires --environment) |
| `[PATH]` | Path to deploy (defaults to cwd) |

Railway CLI walks up the directory tree to find a linked project. For subdirectory deploys, set `rootDirectory` via env config first.

---

## Deployment Lifecycle

Manage existing deployments: list, logs, redeploy, restart, remove.

**"Remove deployment" (`railway down`)** stops the deployment but keeps the service.
To delete a service: use `environment edit` with `isDeleted: true`.

### List Deployments

```bash
railway deployment list --limit 10 --json
railway deployment list --service backend --limit 10 --json
```

### View Logs

```bash
railway logs --lines 100 --json                           # deploy logs
railway logs --build --lines 100 --json                   # build logs
railway logs --latest --lines 100 --json                  # current (even if failed)
railway logs --lines 50 --filter "@level:error" --json    # errors only
railway logs --lines 50 --filter "connection refused" --json
railway logs --since 1h --lines 100 --json                # last hour
railway logs --since 30m --until 10m --lines 100 --json   # time range
railway logs <deployment-id> --lines 100 --json           # specific deployment
railway logs --build <deployment-id> --lines 100 --json   # specific build
```

Time formats: relative (`30s`, `5m`, `2h`, `1d`, `1w`) or ISO 8601.

**Note:** Deployment ID is a positional argument, NOT `--deployment <id>`.

### Redeploy / Restart

```bash
railway redeploy --service <name> -y    # rebuild + redeploy
railway restart --service <name> -y     # restart container only (no rebuild)
```

### Remove Deployment

```bash
railway down -y                        # linked service
railway down --service web -y          # specific service
```

### Presenting Logs

- Include timestamps, highlight errors/warnings
- For build failures: show error + suggest fixes
- For runtime crashes: show stack trace context
- Summarize patterns (e.g., "15 timeout errors in last 100 logs")

---

## Services

Check status, rename, change icon, link services. For creating services with local code, use [Setup & Init](#setup--init).

### Service Status

```bash
railway service status --json        # current deployment status
railway deployment list --json --limit 5   # deployment history
```

| Status | Meaning |
|--------|---------|
| SUCCESS | Running |
| FAILED | Build/deploy failed |
| DEPLOYING | In progress |
| BUILDING | Build in progress |
| CRASHED | Runtime crash |
| REMOVED | Deployment removed |

### Create Service via GraphQL

For Docker image services or advanced creation (no CLI command):

```bash
bash <<'SCRIPT'
scripts/railway-api.sh \
  'mutation createService($input: ServiceCreateInput!) {
    serviceCreate(input: $input) { id name }
  }' \
  '{"input": {"projectId": "PROJECT_ID", "name": "my-svc", "source": {"image": "nginx:latest"}}}'
SCRIPT
```

After creating, configure instance via env config with `"isCreated": true`.

### Rename Service / Change Icon

```bash
bash <<'SCRIPT'
scripts/railway-api.sh \
  'mutation updateService($id: String!, $input: ServiceUpdateInput!) {
    serviceUpdate(id: $id, input: $input) { id name icon }
  }' \
  '{"id": "SERVICE_ID", "input": {"name": "new-name", "icon": "https://devicons.railway.app/github"}}'
SCRIPT
```

Railway devicons: `https://devicons.railway.app/{query}` (github, postgres, redis, nodejs, etc.)

### Link Service

```bash
railway service link <service-name>
```

---

## Templates & Databases

Deploy pre-configured services from Railway's template marketplace.

### Common Templates

| Category | Template | Code |
|----------|----------|------|
| Database | PostgreSQL | `postgres` |
| | Redis | `redis` |
| | MySQL | `mysql` |
| | MongoDB | `mongodb` |
| CMS | Ghost | `ghost` |
| | Strapi | `strapi` |
| Storage | Minio | `minio` |
| Automation | n8n | `n8n` |
| Monitoring | Uptime Kuma | `uptime-kuma` |

### Database Decision Flow

**Always check for existing databases first** via `railway environment config --json`.
Look for `source.image` containing `ghcr.io/railway/postgres*`, `redis*`, etc.

### Deploy Template (3 steps)

**Step 1: Get context**
```bash
railway status --json   # → project.id, environment.id
bash <<'SCRIPT'
scripts/railway-api.sh \
  'query { project(id: "PROJECT_ID") { workspaceId } }' '{}'
SCRIPT
```

**Step 2: Fetch template**
```bash
bash <<'SCRIPT'
scripts/railway-api.sh \
  'query { template(code: "postgres") { id serializedConfig } }' '{}'
SCRIPT
```

**Step 3: Deploy**
```bash
bash <<'SCRIPT'
scripts/railway-api.sh \
  'mutation deploy($input: TemplateDeployV2Input!) {
    templateDeployV2(input: $input) { projectId workflowId }
  }' \
  '{"input": {
    "templateId": "TEMPLATE_ID",
    "serializedConfig": SERIALIZED_CONFIG,
    "projectId": "PROJECT_ID",
    "environmentId": "ENVIRONMENT_ID",
    "workspaceId": "WORKSPACE_ID"
  }}'
SCRIPT
```

`serializedConfig` is the exact JSON object from step 2, not a string.

### Search Templates

```bash
bash <<'SCRIPT'
scripts/railway-api.sh \
  'query { templates(first: 20, verified: true) {
    edges { node { name code description category } }
  } }' '{}'
SCRIPT
```

Rate limit: 10 req/min.

### Connecting Services to Databases

Wire via env config using reference variables:

| Database | Variable Reference |
|----------|--------------------|
| PostgreSQL | `${{Postgres.DATABASE_URL}}` |
| Redis | `${{Redis.REDIS_URL}}` |
| MySQL | `${{MySQL.MYSQL_URL}}` |
| MongoDB | `${{MongoDB.MONGO_URL}}` |

Backend services use private URLs (internal network). Frontend apps cannot access private network — route through a backend API.

For variable reference syntax: [variables.md](references/variables.md).

---

## Domains

Add, view, or remove domains for Railway services.

### Add Railway Domain

```bash
railway domain --json                          # linked service (max 1 per service)
railway domain --json --service backend        # specific service
```

### Add Custom Domain

```bash
railway domain example.com --json
```

Returns DNS records to add at your provider.

### Read Domains

Use `railway environment config --json` — domains are in `services.<id>.networking`:
- `serviceDomains` — Railway-provided
- `customDomains` — User-provided

### Remove Domain

Via env config patch:

```bash
# Custom domain
railway environment edit --json <<< '{"services":{"SVC_ID":{"networking":{"customDomains":{"DOMAIN_ID":null}}}}}'

# Railway domain
railway environment edit --json <<< '{"services":{"SVC_ID":{"networking":{"serviceDomains":{"DOMAIN_ID":null}}}}}'
```

---

## Metrics

Query resource usage via GraphQL (no CLI/MCP alternative).

### Measurements

| Measurement | Description |
|-------------|-------------|
| CPU_USAGE / CPU_LIMIT | CPU (cores) |
| MEMORY_USAGE_GB / MEMORY_LIMIT_GB | Memory (GB) |
| NETWORK_RX_GB / NETWORK_TX_GB | Network (GB) |
| DISK_USAGE_GB | Disk (GB) |
| EPHEMERAL_DISK_USAGE_GB | Ephemeral disk (GB) |

### GroupBy Tags

`DEPLOYMENT_ID`, `DEPLOYMENT_INSTANCE_ID`, `REGION`, `SERVICE_ID`

### Query Example: Last Hour CPU + Memory

```bash
bash <<'SCRIPT'
START_DATE=$(date -u -v-1H +"%Y-%m-%dT%H:%M:%SZ" 2>/dev/null || date -u -d "1 hour ago" +"%Y-%m-%dT%H:%M:%SZ")

VARS=$(jq -n \
  --arg env "ENV_ID" \
  --arg svc "SERVICE_ID" \
  --arg start "$START_DATE" \
  '{environmentId: $env, serviceId: $svc, startDate: $start, measurements: ["CPU_USAGE", "MEMORY_USAGE_GB"]}')

scripts/railway-api.sh \
  'query metrics($environmentId: String!, $serviceId: String, $startDate: DateTime!, $measurements: [MetricMeasurement!]!) {
    metrics(environmentId: $environmentId, serviceId: $serviceId, startDate: $startDate, measurements: $measurements) {
      measurement
      tags { deploymentId region serviceId }
      values { ts value }
    }
  }' \
  "$VARS"
SCRIPT
```

### All Services (grouped)

Omit `serviceId`, add `groupBy: ["SERVICE_ID"]`.

### Interpreting Results

- `ts` — ISO 8601 timestamp
- `value` — metric value (cores for CPU, GB for memory/disk/network)
- Empty metrics array → no active deployment or no traffic

Handle nulls in jq: `jq -r '.data.metrics[]? | select(.values != null and (.values | length) > 0) | ...'`

---

## Projects

List, switch, rename, and configure Railway projects.

### List Projects

```bash
railway list --json   # Can be large — extract only id, name, workspace
```

### List Workspaces

```bash
railway whoami --json   # Returns user info + all workspaces
```

### Switch Project

```bash
railway link -p <project-id-or-name>
```

### Update Project Settings

```bash
bash <<'SCRIPT'
scripts/railway-api.sh \
  'mutation updateProject($id: String!, $input: ProjectUpdateInput!) {
    projectUpdate(id: $id, input: $input) { name prDeploys isPublic botPrEnvironments }
  }' \
  '{"id": "PROJECT_ID", "input": {"name": "new-name", "prDeploys": true, "isPublic": false}}'
SCRIPT
```

| Field | Type | Description |
|-------|------|-------------|
| `name` | String | Project name |
| `description` | String | Project description |
| `isPublic` | Boolean | Public/private |
| `prDeploys` | Boolean | PR deploy environments |
| `botPrEnvironments` | Boolean | Dependabot/Renovate PR envs |

---

## Resources

| Source | URL |
|--------|-----|
| Full docs (LLM) | `https://docs.railway.com/api/llms-docs.md` |
| llms.txt index | `https://railway.com/llms.txt` |
| Templates catalog | `https://railway.com/llms-templates.md` |
| Changelog | `https://railway.com/llms-changelog.md` |
| Blog | `https://blog.railway.com/llms-blog.md` |
| Central Station | `https://station.railway.com` |
| Central Station API | `https://station-server.railway.com/api/llms-station` |

Append `.md` to any `docs.railway.com` URL for markdown version.

---

## Error Handling

| Error | Solution |
|-------|----------|
| CLI not installed | `npm install -g @railway/cli` or `brew install railway` |
| Not authenticated | `railway login` |
| CLI outdated | `railway upgrade` (need v4.27.3+ for env edit) |
| No project linked | `railway link` or `railway init` |
| No service linked | `railway service link` or `--service <name>` flag |
| Service not found | Check names with `railway status --json` |
| Permission denied | Need DEVELOPER role or higher |
| Template not found | Use codes: `postgres`, `redis`, `mysql`, `mongodb` |
| Rate limit (API) | Wait 1 minute, retry |
| Domain already exists | Max 1 railway domain per service |
| No deployments | Deploy first with `railway up` |
| Build failure (CI) | Analyze inline output — do NOT run `railway logs` after |
| `environment edit` not found | `railway upgrade` |
