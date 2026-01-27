# Phase 0 Research: 部署与运维手册

## Decision 1: 手册以现有部署脚本为唯一权威来源
**Decision**: 以 ops/ 目录脚本与 DEPLOYMENT.md 为手册事实来源，避免描述与实现不一致。  
**Rationale**: 运维手册必须与实际脚本一致，便于执行与排障。  
**Alternatives considered**: 仅整理说明性流程；可能与实际操作偏离。

## Decision 2: 手册以流程分段组织（首次部署/更新回滚/备份证书）
**Decision**: 按运维高频流程拆分章节并提供验证清单。  
**Rationale**: 符合运维习惯与执行路径，便于独立演练。  
**Alternatives considered**: 按组件划分；对执行步骤不够直观。

## Decision 3: 证书获取与续期以 Certbot 容器脚本为标准
**Decision**: 以 certbot 容器脚本为手册步骤，明确命令与环境变量要求。  
**Rationale**: 证书有效性直接影响生产访问，必须标准化。  
**Alternatives considered**: 手工证书管理；维护成本高且易错。

## Decision 4: 备份与恢复以脚本为标准并要求演练
**Decision**: 备份与恢复步骤均以脚本方式描述，并要求定期演练验证。  
**Rationale**: 数据恢复可靠性是生产稳定性底线。  
**Alternatives considered**: 仅备份不演练；无法验证可恢复性。
