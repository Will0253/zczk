# Phase 1 Quickstart: 部署与运维手册

> 快速开始用于定位手册的核心路径与执行验证。

## 首次部署
1. 生成生产环境变量：`./ops/generate-secrets.sh <domain>`
2. 替换 Nginx 域名：`ops/nginx/sites.conf`
3. 构建并启动基础服务：`docker compose -f ops/docker/docker-compose.prod.yml up -d postgres backend frontend`
4. 初始化证书：`docker compose -f ops/docker/docker-compose.prod.yml run --rm certbot /opt/init-cert.sh`
5. 启动 Nginx：`docker compose -f ops/docker/docker-compose.prod.yml up -d nginx certbot`
6. 验证健康检查：`/healthz` 与 `/api/healthz`

## 更新与回滚
- 更新：`./ops/deploy.sh`
- 回滚：`./ops/rollback.sh <git-ref>`

## 备份与证书
- 备份：`./ops/backups/backup.sh`
- 续期：`docker compose -f ops/docker/docker-compose.prod.yml exec -T certbot /opt/certbot-renew.sh`
