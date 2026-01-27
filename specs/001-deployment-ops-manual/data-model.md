# Phase 1 Data Model: 部署与运维手册

> 手册为文档类交付，本数据模型用于明确手册信息结构，不对应数据库实现。

## Entities

### Manual Section
- **Fields**: id, title, scope (first-deploy/update/rollback/backup/cert), steps[], validations[], references[]
- **Validation**: steps 与 validations 必须非空

### Manual Step
- **Fields**: id, sectionId, description, command, expectedOutput, rollbackHint
- **Validation**: description 必须明确可执行；command 可为空但需有操作说明

### Reference
- **Fields**: id, path, description
- **Validation**: path 必须指向仓库内真实文件

### Checklist
- **Fields**: id, sectionId, items[]
- **Validation**: 每项需可验证

## Relationships
- Manual Section 1—N Manual Step
- Manual Section 1—N Checklist
- Manual Section 1—N Reference
