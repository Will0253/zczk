# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

**Language/Version**: Node.js 24 (Official LTS runtime), TypeScript 5.x
**Primary Dependencies**: Strapi v5.x (Community Edition), `@strapi/plugin-upload`, `sqlite3` (dev), `axios` or `node-fetch` (migration scripts), `formidable` (if needed by custom upload), `pnpm`/`npm` as package manager. Frontend primary dependency: Next.js (existing project).
**Storage**: SQLite for development (file-based). Production DB is not mandated by this plan — recommend PostgreSQL for production deployments (PROD DB selection: NEEDS CLARIFICATION).
**Testing**: Unit & integration: Jest + Supertest for backend endpoints; E2E: Playwright (or Cypress) for cross-browser checks (CHOICE: Playwright by default; alternative: Cypress). If the team prefers other tools, mark as NEEDS CLARIFICATION.
**Target Platform**: Linux/macOS servers (Node 24 runtime). Local dev on macOS (confirmed).
**Project Type**: Web application — hybrid architecture with dedicated `backend/` (Strapi) and existing `frontend/` (Next.js).
**Performance Goals**: Conform to constitution targets: first screen ~<2s, Lighthouse targets (Performance/Accessibility/Best Practices/SEO > 90). Homepage dynamic modules should fetch and render selected items within 1s server-side for ISR/SSG flows where applicable.
**Constraints**:
- All network operations during development (npm install, git fetch, remote API calls) MUST support the HTTP proxy `http://192.168.0.2:7897` when network issues occur; document and configure proxy env vars in the dev quickstart (`HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY`).
- Strapi will manage only two content types: `Product` and `News` (and Media assets). Other pages remain static and use `content/` directory.
- Permissions: public role MUST allow `find` and `findOne` for `Product` and `News`; `create`, `update`, `delete` MUST require authenticated users (admin/operations role). Implement JWT-based auth for write operations.
- Use SQLite for development; media files uploaded via Strapi's upload plugin and stored locally in `backend/public/uploads` (production storage TBD).
**Scale/Scope**: Small-to-medium marketing site; expected low-to-moderate traffic. Exact traffic targets and production infra sizing: NEEDS CLARIFICATION.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The project will be validated against the repository constitution (`.specify/memory/constitution.md`) focusing on these required gates:

- UX & Accessibility: UI must support WCAG 2.1 AA (keyboard nav, alt text, contrast). Strapi integration does not change front-end accessibility expectations.
- Performance: Meet first-screen and Lighthouse targets described in Constitution (aim Performance > 90). Use ISR/SSG where beneficial to meet LCP/CLS goals.
- Security: Implement XSS/CSRF mitigations, HTTPS enforced in production, authenticated write operations to CMS, dependency scans for vulnerabilities.
- SEO: Ensure meta title/description/og:image come from CMS data or fall back to content/ defaults.

Initial evaluation: Proposed stack (Strapi v5 + Next.js) can meet these gates. No constitution violations identified at this stage. Any gate failing during design or implementation must be documented and justified in the Complexity Tracking section.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: Use Option 2 (Web application) layout. Add a `backend/` top-level directory containing the Strapi project; keep existing `frontend/` as Next.js consumer. Concretely:

```text
backend/                # new Strapi v5 project (TypeScript)
  ├── package.json
  ├── src/              # Strapi source/config
  └── public/uploads    # local media during development
frontend/               # existing Next.js app (unchanged structure)
  └── app/              # Next 13+ app dir (already present)
```

Rationale: clear separation of concerns simplifies deployment, local development, and data migration. The backend will only expose REST/GraphQL endpoints for `Product` and `News` that the Next.js frontend will consume.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
