# 部署与运维手册

本文档用于指导生产环境的首次部署、更新、回滚、备份与证书运维。所有命令均基于当前仓库的 ops/ 脚本与配置。

## 目录
- 首次部署
- 更新部署
- 回滚部署
- 备份与恢复
- 证书获取
- 证书续期
- 健康检查与验证清单
- 常见问题排查

---

## 首次部署

**前置条件**
- 域名已解析到服务器 IP，80/443 端口可用
- Docker 与 Docker Compose 已安装

**步骤**
1. 生成生产环境变量
   - `./ops/generate-secrets.sh <domain>`
2. 替换 Nginx 站点配置域名
   - 编辑 `ops/nginx/sites.conf`
3. 构建并启动基础服务
   - `docker compose -f ops/docker/docker-compose.prod.yml build`
   - `docker compose -f ops/docker/docker-compose.prod.yml up -d postgres backend frontend`
4. 初始化证书
   - `docker compose -f ops/docker/docker-compose.prod.yml run --rm certbot /opt/init-cert.sh`
5. 启动 Nginx 与 Certbot
   - `docker compose -f ops/docker/docker-compose.prod.yml up -d nginx certbot`

---

## 更新部署

- `./ops/deploy.sh`

执行后需完成健康检查验证，确保服务持续可用。

---

## 回滚部署

- `./ops/rollback.sh <git-ref>`

执行后需完成健康检查验证，确保恢复成功。

---

## 备份与恢复

**备份**
- `./ops/backups/backup.sh`

**恢复**
- `./ops/backups/restore.sh <db_backup.sql> [media.tar.gz]`

**清理过期备份**
- `./ops/backups/retention.sh`

**定时任务**
- 见 `ops/backups/cron.txt`

---

## 证书获取

- `docker compose -f ops/docker/docker-compose.prod.yml run --rm certbot /opt/init-cert.sh`

确保 `ops/.env.prod` 中已配置 `DOMAINS` 与 `LETSENCRYPT_EMAIL`。

---

## 证书续期

**手动续期**
- `docker compose -f ops/docker/docker-compose.prod.yml exec -T certbot /opt/certbot-renew.sh`

**定时续期**
- 见 `ops/docker/cron.txt`

---

## 健康检查与验证清单

**验证项**
- HTTPS 强制启用且证书有效
- 前端健康检查：`/healthz`
- 后端健康检查：`/api/healthz`
- 备份产物可生成并可恢复

**验证命令示例**
- `curl -f https://<domain>/healthz`
- `curl -f https://<domain>/api/healthz`

---

## 常见问题排查

- 证书获取失败：检查域名解析与 80 端口可访问性
- 证书续期失败：检查 certbot 日志与 Nginx 重载
- 健康检查失败：查看容器日志并确认服务端口
- 备份失败：检查备份目录权限与存储空间

---

## 参考文件
- `ops/README.md`
- `DEPLOYMENT.md`
- `ops/docker/docker-compose.prod.yml`
- `ops/nginx/sites.conf`
- `ops/backups/backup.sh`
- `ops/docker/certbot-renew.sh`
