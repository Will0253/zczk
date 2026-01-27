# Phase 1 Quickstart: 部署与运维规范化

> 本快速开始用于在生产环境中执行首次部署、更新、监控与备份验证的最小流程。

## 先决条件
- 已完成域名解析与基础网络配置
- 生产服务器已安装 Docker 与 Docker Compose
- 可用的运维账号与权限

## 首次部署（概览）
1. 生成生产环境密钥与变量文件（.env.prod）。
2. 替换 Nginx 站点配置中的域名。
3. 构建镜像并启动基础服务（postgres/backend/frontend）。
4. 初始化证书并启动 Nginx + Certbot。
5. 通过 /healthz 与 /api/healthz 验证健康状态。

## 更新部署（概览）
1. 拉取最新代码并重建镜像。
2. 运行生产部署脚本。
3. 健康检查通过后完成更新。
4. 若失败，执行回滚脚本并复测健康检查。

## 常用命令（参考）
- 生成密钥：`./ops/generate-secrets.sh <domain>`
- 生产部署：`./ops/deploy.sh`
- 版本回滚：`./ops/rollback.sh <git-ref>`
- 初始化证书：`docker compose -f ops/docker/docker-compose.prod.yml run --rm certbot /opt/init-cert.sh`

## 监控与告警（概览）
- 监控 CPU、内存、磁盘、响应时间、数据库连接数、错误率与证书有效期。
- 告警触发后 5 分钟内完成响应与记录。

## 备份与恢复（概览）
- 每日执行数据库与媒体文件备份，保留 7 天。
- 每月进行一次恢复演练，并记录结果。

## 验证清单
- HTTPS 强制启用且证书有效
- /healthz 与 /api/healthz 可访问且响应 < 3 秒
- 日志轮转策略启用
- 备份产物存在且可恢复
