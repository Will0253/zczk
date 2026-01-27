# zczk Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-01-23

## Active Technologies
- Node.js 20-24，TypeScript 5（前后端） + Next.js 15、Strapi 5、Docker Compose、Nginx、Certbo (001-deployment-ops-specs)
- PostgreSQL（生产）、SQLite（开发）、文件存储（uploads）、Docker 卷 (001-deployment-ops-specs)

- Node.js 24 (Official LTS runtime), TypeScript 5.x + Strapi v5.x (Community Edition), `@strapi/plugin-upload`, `sqlite3` (dev), `axios` or `node-fetch` (migration scripts), `formidable` (if needed by custom upload), `pnpm`/`npm` as package manager. Frontend primary dependency: Next.js (existing project). (001-strapi-backend-cms)

## Project Structure

```text
src/
tests/
```

## Commands

npm test && npm run lint

## Code Style

Node.js 24 (Official LTS runtime), TypeScript 5.x: Follow standard conventions

## Recent Changes
- 001-deployment-ops-manual: Added Node.js 20-24，TypeScript 5（前后端） + Next.js 15、Strapi 5、Docker Compose、Nginx、Certbo
- 001-deployment-ops-specs: Added Node.js 20-24，TypeScript 5（前后端） + Next.js 15、Strapi 5、Docker Compose、Nginx、Certbo
- 001-deployment-ops-specs: Added [if applicable, e.g., PostgreSQL, CoreData, files or N/A]


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
