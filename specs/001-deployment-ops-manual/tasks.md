# Tasks: 部署与运维手册

**Input**: Design documents from `/specs/001-deployment-ops-manual/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Not requested.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 手册文档结构与入口准备

- [x] T001 创建手册文件结构并确定入口文档 in ops/DEPLOYMENT-OPS-MANUAL.md
- [x] T002 [P] 整理手册引用文件列表 in specs/001-deployment-ops-manual/contracts/README.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 手册统一结构与验证清单

- [x] T003 定义手册章节结构与统一验证清单 in ops/DEPLOYMENT-OPS-MANUAL.md
- [x] T004 [P] 校验脚本与配置路径引用一致性 in ops/DEPLOYMENT-OPS-MANUAL.md

**Checkpoint**: 手册框架稳定、引用一致

---

## Phase 3: User Story 1 - 首次部署手册 (Priority: P1) 🎯 MVP

**Goal**: 完整覆盖首次部署与验证路径

**Independent Test**: 仅按手册完成首次部署并通过健康检查

### Implementation for User Story 1

- [x] T005 [US1] 编写首次部署步骤与命令 in ops/DEPLOYMENT-OPS-MANUAL.md
- [x] T006 [P] [US1] 添加首次部署验证清单 in ops/DEPLOYMENT-OPS-MANUAL.md
- [x] T007 [P] [US1] 补充证书初始化步骤 in ops/DEPLOYMENT-OPS-MANUAL.md

**Checkpoint**: 首次部署章节可独立执行

---

## Phase 4: User Story 2 - 更新与回滚手册 (Priority: P2)

**Goal**: 提供更新与回滚的可执行手册

**Independent Test**: 按手册完成一次更新与回滚

### Implementation for User Story 2

- [x] T008 [US2] 编写更新部署步骤与验证 in ops/DEPLOYMENT-OPS-MANUAL.md
- [x] T009 [P] [US2] 编写回滚步骤与注意事项 in ops/DEPLOYMENT-OPS-MANUAL.md

**Checkpoint**: 更新与回滚章节可独立执行

---

## Phase 5: User Story 3 - 备份与证书运维手册 (Priority: P3)

**Goal**: 覆盖备份/恢复与证书续期流程

**Independent Test**: 按手册完成一次备份与证书续期演练

### Implementation for User Story 3

- [x] T010 [US3] 编写备份、恢复与清理流程 in ops/DEPLOYMENT-OPS-MANUAL.md
- [x] T011 [P] [US3] 编写证书续期步骤与验证 in ops/DEPLOYMENT-OPS-MANUAL.md
- [x] T012 [P] [US3] 添加常见问题与排查要点 in ops/DEPLOYMENT-OPS-MANUAL.md

**Checkpoint**: 备份与证书运维章节可独立执行

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T013 [P] 对齐 quickstart 与手册步骤 in specs/001-deployment-ops-manual/quickstart.md
- [x] T014 [P] 补充手册引用链接与路径说明 in ops/DEPLOYMENT-OPS-MANUAL.md

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

- **US1**: 独立于其它用户故事
- **US2**: 独立于其它用户故事
- **US3**: 独立于其它用户故事

### Parallel Opportunities

- T002、T004、T006、T007、T009、T011、T012、T013、T014 可并行

---

## Parallel Example: User Story 1

- T006 [P] [US1] 添加首次部署验证清单 in ops/DEPLOYMENT-OPS-MANUAL.md
- T007 [P] [US1] 补充证书初始化步骤 in ops/DEPLOYMENT-OPS-MANUAL.md

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 Phase 1: Setup
2. 完成 Phase 2: Foundational
3. 完成 Phase 3: User Story 1
4. 独立验证首次部署章节

### Incremental Delivery

1. Setup + Foundational 完成
2. US1 完成并验证
3. US2 完成并验证
4. US3 完成并验证
5. 最后执行 Phase 6
