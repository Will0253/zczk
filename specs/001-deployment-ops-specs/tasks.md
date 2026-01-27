# Tasks: 部署与运维规范化

**Input**: Design documents from `/specs/001-deployment-ops-specs/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Not requested.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 建立运维目录结构与基础模板

- [x] T001 创建运维目录结构并添加说明文档 docs in ops/README.md
- [x] T002 [P] 创建生产环境变量模板 ops/.env.prod.example
- [x] T003 [P] 创建开发环境变量模板 ops/.env.dev.example
- [x] T004 [P] 添加运维目录忽略规则 ops/.gitignore
- [x] T005 [P] 创建 Docker 编排目录 ops/docker/.gitkeep
- [x] T006 [P] 创建 Nginx 配置目录 ops/nginx/.gitkeep
- [x] T007 [P] 创建备份目录与说明 ops/backups/README.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 所有用户故事共享的基础能力

- [x] T008 实现前端健康检查端点 in frontend/app/healthz/route.ts
- [x] T009 实现后端健康检查端点 routes/controllers/services in backend/src/api/healthz/*
- [x] T010 [P] 补充部署文档中的健康检查说明 in DEPLOYMENT.md
- [x] T011 [P] 在 Nginx 站点配置中加入 /healthz 代理与安全头 in ops/nginx/sites.conf

**Checkpoint**: 健康检查基础能力就绪

---

## Phase 3: User Story 1 - 首次生产上线 (Priority: P1) 🎯 MVP

**Goal**: 具备首次生产部署所需的脚本、编排与证书初始化流程

**Independent Test**: 按部署流程完成首次上线，/healthz 与 /api/healthz 可访问且 HTTPS 生效

### Implementation for User Story 1

- [x] T012 [P] [US1] 编写密钥生成脚本 in ops/generate-secrets.sh
- [x] T013 [P] [US1] 编写生产编排文件 in ops/docker/docker-compose.prod.yml
- [x] T014 [P] [US1] 编写开发编排文件 in ops/docker/docker-compose.dev.yml
- [x] T015 [P] [US1] 添加 Nginx 主配置 in ops/nginx/nginx.conf
- [x] T016 [P] [US1] 添加 Nginx 站点配置与证书路径 in ops/nginx/sites.conf
- [x] T017 [US1] 添加首次证书初始化脚本 in ops/docker/init-cert.sh
- [x] T018 [US1] 更新首次部署步骤与校验清单 in DEPLOYMENT.md

**Checkpoint**: 首次部署流程可执行并通过健康检查

---

## Phase 4: User Story 2 - 常规更新与回滚 (Priority: P2)

**Goal**: 例行更新与失败回滚可执行、可验证

**Independent Test**: 执行一次更新流程与一次回滚流程，健康检查均通过

### Implementation for User Story 2

- [x] T019 [US2] 编写更新部署脚本（含健康检查）in ops/deploy.sh
- [x] T020 [P] [US2] 编写回滚脚本 in ops/rollback.sh
- [x] T021 [P] [US2] 编写证书续期脚本 in ops/docker/certbot-renew.sh
- [x] T022 [P] [US2] 编写续期定时任务配置 in ops/docker/cron.txt
- [x] T023 [US2] 更新更新/回滚操作说明 in DEPLOYMENT.md

**Checkpoint**: 更新与回滚流程可执行且可验证

---

## Phase 5: User Story 3 - 监控与日常运维 (Priority: P3)

**Goal**: 日志、监控、备份与故障处置流程完整可执行

**Independent Test**: 触发一次告警或模拟异常，能够通过日志定位并完成恢复

### Implementation for User Story 3

- [x] T024 [P] [US3] 添加备份脚本 in ops/backups/backup.sh
- [x] T025 [P] [US3] 添加恢复脚本 in ops/backups/restore.sh
- [x] T026 [P] [US3] 添加备份清理脚本 in ops/backups/retention.sh
- [x] T027 [P] [US3] 添加备份定时任务配置 in ops/backups/cron.txt
- [x] T028 [P] [US3] 配置容器日志轮转参数 in ops/docker/docker-compose.prod.yml
- [x] T029 [US3] 输出监控指标与告警阈值说明 in ops/monitoring/metrics.md
- [x] T030 [US3] 输出故障排查与应急响应流程 in ops/monitoring/runbook.md
- [x] T031 [US3] 更新监控与备份章节 in DEPLOYMENT.md

**Checkpoint**: 监控、日志与备份/恢复流程完整可执行

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T032 [P] 统一运维脚本使用说明 in ops/README.md
- [x] T033 [P] 校验 quickstart 与部署流程一致性 in specs/001-deployment-ops-specs/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 无依赖，可立即开始
- **Foundational (Phase 2)**: 依赖 Setup 完成
- **User Story 1 (Phase 3)**: 依赖 Foundational 完成
- **User Story 2 (Phase 4)**: 依赖 Foundational 完成
- **User Story 3 (Phase 5)**: 依赖 Foundational 完成
- **Polish (Phase 6)**: 依赖所有用户故事完成

### User Story Dependencies

- **US1**: 基于健康检查与基础配置
- **US2**: 与 US1 独立，但复用部署配置
- **US3**: 与 US1/US2 独立，但复用日志与部署配置

### Parallel Opportunities

- Phase 1 中带 [P] 的任务可并行
- Phase 2 中 T010/T011 可并行
- US1 中 T012-T016 可并行
- US2 中 T020-T022 可并行
- US3 中 T024-T028 可并行

---

## Parallel Example: User Story 1

- T012 [P] [US1] 编写密钥生成脚本 in ops/generate-secrets.sh
- T013 [P] [US1] 编写生产编排文件 in ops/docker/docker-compose.prod.yml
- T014 [P] [US1] 编写开发编排文件 in ops/docker/docker-compose.dev.yml
- T015 [P] [US1] 添加 Nginx 主配置 in ops/nginx/nginx.conf
- T016 [P] [US1] 添加 Nginx 站点配置与证书路径 in ops/nginx/sites.conf

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 Phase 1: Setup
2. 完成 Phase 2: Foundational
3. 完成 Phase 3: User Story 1
4. 独立验证首次部署流程

### Incremental Delivery

1. Setup + Foundational 完成
2. US1 完成并验证
3. US2 完成并验证
4. US3 完成并验证
5. 最后执行 Phase 6
