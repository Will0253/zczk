# Research Decisions

This document records decisions made to resolve items marked `NEEDS CLARIFICATION` in the implementation plan.

## 1) Production database
- Decision: PostgreSQL (managed or self-hosted) for production; keep SQLite for local development.
- Rationale: PostgreSQL is the recommended production DB for Strapi (better concurrency, migrations, backups, and cloud provider support). SQLite is convenient for local development and fast iteration.
- Alternatives considered: MySQL (compatible but less recommended for Strapi in some hosting scenarios); MariaDB. Rejected because PostgreSQL has broader hosting and migration tooling.

## 2) Testing stack
- Decision: Jest + Supertest for unit/integration tests; Playwright for E2E and cross-browser checks.
- Rationale: Jest is standard for Node/TypeScript unit tests; Supertest makes HTTP endpoint assertions straightforward. Playwright provides reliable cross-browser automation and can run in CI for Lighthouse-like checks.
- Alternatives considered: Cypress for E2E (good option), but Playwright chosen for first-class multi-browser support and CI friendliness.

## 3) Production media storage
- Decision: Use S3-compatible object storage (AWS S3, DigitalOcean Spaces, or MinIO) in production; local filesystem for development.
- Rationale: Scalable, durable asset hosting, CDN integration, and avoids growing instance storage. MinIO can be used for on-prem or testing.
- Alternatives considered: Keep local uploads in production (rejected for scalability/backups).

## 4) Authentication & permissions
- Decision: Use Strapi's built-in role-based access control with JWT for API authentication. Public role: `find` and `findOne` on `Product` and `News`. Protected write endpoints require authenticated user with editor role or admin via Strapi.
- Rationale: Matches requirements and leverages Strapi RBAC.

## 5) Proxy configuration (development constraint)
- Decision: Document proxy usage in quickstart and configure environment variables: `HTTP_PROXY`, `HTTPS_PROXY`, and `NO_PROXY` as needed. For npm/pnpm, document `.npmrc` / `.yarnrc` proxy settings.
- Rationale: The project may encounter network restrictions; explicit developer instructions will avoid failed installs. Default proxy to use when needed: `http://192.168.0.2:7897`.

## 6) Scale assumptions
- Decision: Assume low-to-moderate traffic for infra sizing. Re-evaluate if analytics indicate higher load (thresholds to be defined later).
- Rationale: Marketing sites typically have bursty traffic; start small and scale DB/instances as needed.

## 7) Migration approach
- Decision: Create small migration scripts that read from current `content/` JS/JSON data and use Strapi's REST API or direct DB writes for initial import; upload images via Strapi upload API to populate the media library.
- Rationale: Using Strapi API preserves proper associations and triggers upload plugin behavior. Provide fallback direct DB import for bulk/large datasets if needed.

---

If any of these decisions need to be changed, update this file and the corresponding sections in `plan.md` and `quickstart.md`.
