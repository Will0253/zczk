# Phase 1 Data Model: 部署与运维规范化

> 本数据模型用于描述部署与运维流程中的核心概念与关系，不代表实际数据库实现。

## Entities

### Environment Configuration
- **Fields**: id, name (dev/test/prod), domain, httpsEnabled, nginxConfigRef, createdAt, updatedAt
- **Validation**: domain 必须为有效域名；httpsEnabled 在生产必须为 true

### Secret Set
- **Fields**: id, environmentId, appKeys, jwtSecret, apiTokenSalt, adminJwtSecret, transferTokenSalt, encryptionKey, postgresPassword, createdAt, rotatedAt
- **Validation**: 所有密钥必须为高强度随机值；生产环境不得为空

### Deployment Release
- **Fields**: id, versionTag, environmentId, status (pending/success/failed/rolled_back), startedAt, finishedAt, rollbackToReleaseId
- **Validation**: status 必须为枚举值；success/failed 必须有 finishedAt

### Health Check
- **Fields**: id, environmentId, target (frontend/backend/database/nginx), endpoint, intervalSeconds, timeoutSeconds, retries, lastStatus, lastCheckedAt
- **Validation**: endpoint 必须可访问；interval/timeout/retries 必须为正整数

### Monitoring Alert
- **Fields**: id, environmentId, type (resource/availability/business), metric, threshold, severity (warning/critical), triggeredAt, resolvedAt, status (open/ack/resolved)
- **Validation**: severity 与 threshold 必须匹配定义；resolvedAt 仅在 resolved 状态可填写

### Log Record
- **Fields**: id, environmentId, service, level, message, traceId, timestamp
- **Validation**: level 限定为 info/warn/error/debug；timestamp 必须为有效时间

### Backup Artifact
- **Fields**: id, environmentId, kind (database/media/config), filePath, sizeBytes, createdAt, checksum, retentionDays
- **Validation**: filePath 必须可访问；checksum 必须存在；retentionDays > 0

### Restore Job
- **Fields**: id, environmentId, backupArtifactId, status (pending/success/failed), startedAt, finishedAt, notes
- **Validation**: backupArtifactId 必须存在；success/failed 必须有 finishedAt

### Certificate
- **Fields**: id, environmentId, domain, issuer, validFrom, validTo, autoRenewEnabled, lastRenewedAt
- **Validation**: validTo > validFrom；生产环境 autoRenewEnabled 必须为 true

## Relationships
- Environment Configuration 1—1 Secret Set
- Environment Configuration 1—N Deployment Release
- Environment Configuration 1—N Health Check
- Environment Configuration 1—N Monitoring Alert
- Environment Configuration 1—N Log Record
- Environment Configuration 1—N Backup Artifact
- Backup Artifact 1—N Restore Job
- Environment Configuration 1—N Certificate

## State Transitions

### Deployment Release
- pending → success
- pending → failed → rolled_back

### Monitoring Alert
- open → ack → resolved
- open → resolved (自动恢复)

### Restore Job
- pending → success
- pending → failed
