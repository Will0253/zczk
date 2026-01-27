# Implementation Plan: 部署与运维手册

**Branch**: `001-deployment-ops-manual` | **Date**: 2026-01-28 | **Spec**: [specs/001-deployment-ops-manual/spec.md](specs/001-deployment-ops-manual/spec.md)
**Input**: Feature specification from `/specs/001-deployment-ops-manual/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

产出一份基于现有脚本与配置的部署与运维手册，覆盖首次部署、更新、回滚、备份、证书获取与续期流程，并附验证清单与引用路径。

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: Node.js 20-24，TypeScript 5（前后端）  
**Primary Dependencies**: Next.js 15、Strapi 5、Docker Compose、Nginx、Certbot  
**Storage**: PostgreSQL（生产）、SQLite（开发）、文件存储（uploads）、Docker 卷  
**Testing**: 以健康检查与部署验证为主（无独立测试框架）  
**Target Platform**: Linux 服务器（Docker + Nginx）
**Project Type**: Web application（frontend + backend）  
**Performance Goals**: 健康检查响应 < 3 秒；月可用性 ≥ 99.5%  
**Constraints**: HTTPS 强制、HSTS、安全头、备份保留 7 天、回滚 < 5 分钟  
**Scale/Scope**: 运维手册文档与流程规范化

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- HTTPS 强制与 HSTS：手册明确要求并给出验证步骤
- 回滚机制：手册包含回滚流程与验证
- 监控告警：手册包含最小验证清单与排查指引
- 备份与恢复：手册包含备份/恢复流程与演练要求

结论：通过。无宪章冲突。

**Post-Design Check**: 通过。手册内容覆盖 HTTPS、回滚、备份与告警要求。

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
backend/
├── src/
│   ├── api/
│   └── extensions/
├── config/
├── database/
└── scripts/

frontend/
├── app/
├── components/
├── content/
└── lib/

ops/
  DEPLOYMENT-OPS-MANUAL.md
DEPLOYMENT.md
```

**Structure Decision**: 采用 Web application 结构（frontend + backend），手册引用 ops/ 与 DEPLOYMENT.md 作为事实来源。

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
