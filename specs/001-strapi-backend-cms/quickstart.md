# Quickstart (development)

Prerequisites:
- Node.js 24 installed
- pnpm or npm available
- Git

Environment variables (development):
- `HTTP_PROXY` / `HTTPS_PROXY` — set to `http://192.168.0.2:7897` if network requires proxy
- `DATABASE_CLIENT=sqlite` (default for local dev)

1. Create the backend directory and scaffold Strapi v5 project

```bash
cd /path/to/repo
mkdir backend
cd backend
# Use Strapi v5 installer (follow Strapi docs for exact command)
# Example (adjust if installer flags change):
npx create-strapi@latest . --quickstart --no-run

# Install dependencies
pnpm install
```

2. Configure development DB (SQLite)

- Ensure `DATABASE_CLIENT=sqlite` and check `config/database.js` or Strapi configuration to use SQLite file (default: `./data.db`).

3. Configure Upload plugin for local storage (dev)

- Default Strapi upload will store files under `backend/public/uploads` in development.

4. Set permissions in Strapi admin

- In Strapi admin UI: Roles & Permissions → Public Role → allow `find` and `findOne` for `Product` and `News`.
- For write operations, create an `editor` role (or use built-in admin) and restrict create/update/delete.

5. Migration (import existing content and images)

- Use provided migration scripts under `backend/scripts/` that POST to Strapi endpoints:

# Example: upload an image
curl -X POST "http://localhost:1337/api/upload" -F "files=@/path/to/image.jpg"

# Example: create a product
curl -X POST "http://localhost:1337/api/products" \
  -H "Authorization: Bearer <ADMIN_JWT>" \
  -H "Content-Type: application/json" \
  -d '{"data": {"title": "Example", "slug": "example", "summary": "..."}}'

# Import all products and news
export STRAPI_URL="http://localhost:1337"
export STRAPI_TOKEN="<ADMIN_JWT>"
pnpm import:content

6. Run Strapi locally

```bash
pnpm develop
# or npm run develop
```

7. Update frontend to point to Strapi

- Set `NEXT_PUBLIC_STRAPI_URL=http://localhost:1337` in frontend environment for local development.

8. Proxy notes

- If you must use the proxy for `npm` or `pnpm`, set `HTTP_PROXY` and `HTTPS_PROXY` in your shell before running installs. Example:

```bash
export HTTP_PROXY="http://192.168.0.2:7897"
export HTTPS_PROXY="http://192.168.0.2:7897"
pnpm install
```

9. Agent context update

- Run: `.specify/scripts/bash/update-agent-context.sh copilot`

If anything fails or you need me to scaffold the initial Strapi project and migration scripts, tell me and I'll continue.
