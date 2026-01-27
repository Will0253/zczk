# 运维目录说明

本目录用于集中管理部署与运维相关的脚本与配置。

## 目录结构

- docker/: Docker Compose 与证书相关脚本
- nginx/: Nginx 主配置与站点配置
- backups/: 备份与恢复脚本
- .env.prod.example: 生产环境变量模板
- .env.dev.example: 开发环境变量模板
- .gitignore: 运维目录内的敏感文件忽略规则

## 使用约定

- 生产环境变量文件为 ops/.env.prod，不提交至版本库
- 所有脚本需可执行（chmod +x）

## 常用脚本

- 生成生产密钥：`./ops/generate-secrets.sh <domain>`
- 生产部署：`./ops/deploy.sh`
- 版本回滚：`./ops/rollback.sh <git-ref>`
- 初始化证书：`docker compose -f ops/docker/docker-compose.prod.yml run --rm certbot /opt/init-cert.sh`
- 证书续期：`docker compose -f ops/docker/docker-compose.prod.yml exec -T certbot /opt/certbot-renew.sh`
- 备份：`./ops/backups/backup.sh`
- 恢复：`./ops/backups/restore.sh <db_backup.sql> [media.tar.gz]`
