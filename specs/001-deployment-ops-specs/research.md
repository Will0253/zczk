# Phase 0 Research: 部署与运维规范化

## Decision 1: 生产部署架构采用 Docker Compose + Nginx 反向代理
**Decision**: 以 Docker Compose 编排前端、后端、数据库与 Nginx，Nginx 作为统一入口与 SSL 终端。  
**Rationale**: 现有文档已明确生产部署路径，容器化便于复用与一致性，Nginx 集中处理 HTTPS、反向代理与安全头。  
**Alternatives considered**: 直接在宿主机运行进程、使用云托管平台；因现有文档与脚本均基于 Compose，故不选。

## Decision 2: 证书管理使用 Certbot 自动化续期
**Decision**: 使用 Certbot Standalone 模式申请证书，并设置定时续期与 Nginx 自动重载。  
**Rationale**: 现有部署文档已定义证书申请与续期流程，符合“HTTPS 强制”与“自动化运维”要求。  
**Alternatives considered**: 商业证书或手动续期；维护成本高且不符合自动化目标。

## Decision 3: 环境变量分层与密钥自动生成
**Decision**: 采用开发/生产分层的 .env 模板，生产密钥通过脚本生成写入 .env.prod。  
**Rationale**: 分层配置可避免敏感信息提交，脚本生成保证密钥强度并可复制。  
**Alternatives considered**: 手工维护全部密钥；易出错且不安全。

## Decision 4: 健康检查作为上线与回滚判定标准
**Decision**: 采用 /healthz 与 /api/healthz 等健康检查端点作为上线验证与回滚触发依据。  
**Rationale**: 文档已明确健康检查命令与频率，且可作为最小可用性判断。  
**Alternatives considered**: 仅依赖容器状态；不足以反映真实服务可用性。

## Decision 5: 日志管理使用 Docker json-file 轮转策略
**Decision**: 默认 json-file 日志驱动，配置单文件大小与保留数量。  
**Rationale**: 可控制磁盘占用并保留近期日志用于排障，符合文档中现有运维策略。  
**Alternatives considered**: 自建集中式日志平台作为第一期；成本更高，建议分阶段演进。

## Decision 6: 备份策略覆盖数据库与媒体文件
**Decision**: 数据库每日备份、媒体文件定期归档，保留 7 天并提供恢复脚本。  
**Rationale**: 文档已给出脚本与保留策略，满足业务连续性要求。  
**Alternatives considered**: 仅数据库备份；无法恢复媒体文件导致内容不完整。

## Decision 7: 监控指标与告警阈值
**Decision**: 以资源指标、服务可用性与业务指标为核心，设置阈值触发告警。  
**Rationale**: 与文档中的监控指标体系一致，便于落地可观测性。  
**Alternatives considered**: 无阈值监控；无法形成可执行告警流程。
