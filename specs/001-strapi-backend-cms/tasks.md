# Tasks: CMS 后端与前端动态内容

**Input**: Design documents from `/specs/001-strapi-backend-cms/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Not requested in spec.md → no test tasks included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create Strapi backend project scaffold in backend/
- [x] T002 Update backend/.env.example with SQLite dev defaults and proxy notes
- [x] T003 Add frontend/.env.example with NEXT_PUBLIC_STRAPI_URL
- [x] T004 Update specs/001-strapi-backend-cms/quickstart.md with dev setup, proxy, and run steps

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T005 [P] Define Product content type schema in backend/src/api/product/content-types/product/schema.json
- [x] T006 [P] Define News content type schema in backend/src/api/news/content-types/news/schema.json
- [x] T007 Configure upload plugin/local storage in backend/config/plugins.ts
- [x] T008 Enable public find/findOne permissions in backend/src/index.ts
- [x] T009 [P] Implement Strapi data access helpers in frontend/lib/strapi.ts
- [x] T010 [P] Implement category builders in frontend/lib/categories.ts
- [x] T011 Add content parser helper in backend/scripts/parse-content.mjs
- [x] T012 [P] Add product import script in backend/scripts/import-products.mjs
- [x] T013 [P] Add news import script in backend/scripts/import-news.mjs
- [x] T014 Add migration npm scripts in backend/package.json
- [x] T015 Document migration steps and permissions checklist in specs/001-strapi-backend-cms/quickstart.md

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - 浏览产品与资讯 (Priority: P1) 🎯 MVP

**Goal**: 访客可在产品列表、资讯列表与资讯详情中浏览 Strapi 动态内容。

**Independent Test**: 访问 /products、/news、/news/[slug]，确认数据来自 Strapi，空态与错误态正确显示。

### Implementation for User Story 1

- [x] T016 [P] [US1] Fetch products + SEO metadata from Strapi in frontend/app/products/page.tsx
- [x] T017 [P] [US1] Update Products list UI to accept props and empty state in frontend/components/sections/Products.tsx
- [x] T018 [P] [US1] Add products loading/error routes in frontend/app/products/loading.tsx and frontend/app/products/error.tsx
- [x] T019 [P] [US1] Fetch news list + SEO metadata from Strapi in frontend/app/news/page.tsx
- [x] T020 [P] [US1] Update News list UI to accept props and categories in frontend/components/sections/News.tsx
- [x] T021 [P] [US1] Fetch news detail + metadata + static params in frontend/app/news/[slug]/page.tsx
- [x] T022 [P] [US1] Update NewsDetail UI to accept lists/categories in frontend/components/sections/NewsDetail.tsx
- [x] T023 [P] [US1] Add news loading/error routes in frontend/app/news/loading.tsx, frontend/app/news/error.tsx, frontend/app/news/[slug]/loading.tsx, frontend/app/news/[slug]/error.tsx

**Checkpoint**: User Story 1 is independently functional

---

## Phase 4: User Story 2 - 首页动态模块展示 (Priority: P2)

**Goal**: 首页产品矩阵与资讯动态来自 Strapi，其他模块保持静态。

**Independent Test**: 访问首页，确认 ProductMatrix 与 NewsFeed 显示 Strapi 最新内容，其余模块不变。

### Implementation for User Story 2

- [x] T024 [P] [US2] Fetch featured products/news via Promise.all in frontend/app/page.tsx
- [x] T025 [P] [US2] Render Strapi products in ProductMatrix with empty state in frontend/components/sections/ProductMatrix.tsx
- [x] T026 [P] [US2] Render Strapi news in NewsFeed with empty state in frontend/components/sections/NewsFeed.tsx

**Checkpoint**: User Story 2 is independently functional

---

## Phase 5: User Story 3 - 内容运营与权限控制 (Priority: P3)

**Goal**: 内容运营人员可写入，未认证用户只能读。

**Independent Test**: 使用管理员/运营 Token 写入成功；未认证写入失败；公开读取成功。

### Implementation for User Story 3

- [x] T027 [P] [US3] Document roles/permissions setup in specs/001-strapi-backend-cms/quickstart.md
- [x] T028 [US3] Verify write operations require auth and document in backend/README.md
- [x] T029 [US3] Execute migration scripts and verify content visibility (document outcome in specs/001-strapi-backend-cms/quickstart.md)

**Checkpoint**: User Story 3 is independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T030 [P] Validate SEO fallbacks and metadata correctness in frontend/app/products/page.tsx and frontend/app/news/page.tsx
- [x] T031 [P] Confirm error/loading UI consistency for Strapi-backed routes in frontend/app/products/* and frontend/app/news/*
- [x] T032 [P] Update docs/README references for Strapi URL and proxy usage in README.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational - no dependency on other stories
- **User Story 2 (P2)**: Starts after Foundational - independent of US1 implementation
- **User Story 3 (P3)**: Starts after Foundational - independent of US1/US2 implementation

### Parallel Opportunities

- Setup tasks marked [P] can run in parallel
- Foundational tasks marked [P] can run in parallel
- Once Foundational completes, US1/US2/US3 can run in parallel by different owners

---

## Parallel Example: User Story 1

Run in parallel after Foundational:

- T016 [US1] Update frontend/app/products/page.tsx
- T017 [US1] Update frontend/components/sections/Products.tsx
- T018 [US1] Add frontend/app/products/loading.tsx and frontend/app/products/error.tsx
- T019 [US1] Update frontend/app/news/page.tsx
- T020 [US1] Update frontend/components/sections/News.tsx
- T021 [US1] Update frontend/app/news/[slug]/page.tsx
- T022 [US1] Update frontend/components/sections/NewsDetail.tsx
- T023 [US1] Add frontend/app/news/* loading/error routes

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Verify /products, /news, /news/[slug] work independently

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. User Story 1 → Validate → Demo MVP
3. User Story 2 → Validate → Demo homepage dynamic modules
4. User Story 3 → Validate → Demo content ops + permissions
