
# 生产环境手动部署与运维手册

本文档用于指导在一台全新 Linux 服务器上，从 0 到 1 完成生产环境部署，并覆盖日常更新、证书、备份/恢复、回滚与常见故障排查。

本仓库约定：生产环境变量文件为 `ops/.env.prod`（不会提交到 Git），部署入口脚本为 `./ops/deploy.sh`。

## 目录

- 1. 术语与架构
- 2. 前置条件（必读）
- 3. 首次部署（全新机器）
- 4. 日常更新部署
- 5. HTTPS/证书：初始化与续期
- 6. 验证清单（上线前必做）
- 7. 备份与恢复
- 8. 回滚
- 9. 常见问题与排查
- 10. 参考文件

---

## 1. 术语与架构

生产服务由以下容器组成（见 `ops/docker/docker-compose.prod.yml`）：

- `postgres`：PostgreSQL 数据库
- `backend`：Strapi（对外路径前缀 `/api/`，管理端 `/admin`）
- `frontend`：Next.js
- `nginx`：对外入口（80/443），反向代理到 `frontend` 与 `backend`
- `certbot`：仅用于签发/续期证书（通常以一次性命令运行，不建议常驻）

关键访问路径：

- `https://<domain>/`：前端站点
- `https://<domain>/healthz`：前端健康检查
- `https://<domain>/api/healthz`：后端健康检查
- `https://<domain>/admin`：Strapi 管理后台

---

## 2. 前置条件（必读）

### 2.1 服务器与网络要求

- Linux 服务器（建议至少 2C / 4G 内存）
- 域名 `<domain>` 已解析到该服务器公网 IP
- 防火墙/安全组放行端口：`80/tcp`、`443/tcp`

### 2.2 软件依赖

- Docker Engine
- Docker Compose（`docker compose` 插件方式）
- `git`
- `openssl`（用于生成随机密钥，`./ops/generate-secrets.sh` 依赖）

说明：本仓库的部署脚本不要求宿主机安装 `node`/`python`/`jq`。

### 2.3 获取代码

在服务器上选择一个目录（示例 `/opt/zczk`）：

- `git clone <your-repo-url> /opt/zczk`
- `cd /opt/zczk`

确保脚本可执行（第一次部署建议做一次）：

- `chmod +x ops/*.sh ops/docker/*.sh ops/backups/*.sh`

---

## 3. 首次部署（全新机器）

本章节按真实依赖顺序编排（先起数据库/应用，再签证书，再起 Nginx）。

### 3.1 生成生产环境变量文件

运行：

- `./ops/generate-secrets.sh <domain>`

脚本会交互式要求输入 Let's Encrypt 邮箱，并生成 `ops/.env.prod`（权限为 600）。

你可以检查（仅确认字段存在，不要将真实值提交到 Git）：

- `ls -la ops/.env.prod`
- `sed -n '1,120p' ops/.env.prod`

### 3.2 配置 Nginx 站点域名与证书路径

编辑 `ops/nginx/sites.conf`，将其中的 `server_name` 与证书路径替换为你的域名。

需要修改的点：

- `server_name <domain>;`
- `ssl_certificate /etc/letsencrypt/live/<domain>/fullchain.pem;`
- `ssl_certificate_key /etc/letsencrypt/live/<domain>/privkey.pem;`

说明：Nginx 里的 `/healthz`、`/api/`、`/admin` 以及 Strapi 插件相关路径反代规则也都在该文件里。

### 3.3 构建镜像

建议所有生产 compose 命令统一带上 env-file（避免变量缺失告警）：

- `docker compose --env-file ops/.env.prod -f ops/docker/docker-compose.prod.yml build`

### 3.4 启动基础服务（postgres/backend/frontend）

- `docker compose --env-file ops/.env.prod -f ops/docker/docker-compose.prod.yml up -d postgres backend frontend`

等待健康：

- `docker compose --env-file ops/.env.prod -f ops/docker/docker-compose.prod.yml ps`

预期：`postgres`、`backend`、`frontend` 最终显示为 `healthy`。

如不健康，优先看日志：

- `docker compose --env-file ops/.env.prod -f ops/docker/docker-compose.prod.yml logs --tail=200 postgres`
- `docker compose --env-file ops/.env.prod -f ops/docker/docker-compose.prod.yml logs --tail=200 backend`
- `docker compose --env-file ops/.env.prod -f ops/docker/docker-compose.prod.yml logs --tail=200 frontend`

### 3.5 初始化 HTTPS 证书（首次签发）

证书初始化使用 certbot standalone，需要占用宿主机 `80` 端口。

注意事项：

- 首次签证书时不要启动 Nginx（否则 80 端口被 Nginx 占用会失败）
- 确保域名解析已生效且公网能访问该服务器的 80 端口

执行签发（推荐使用 `--service-ports`）：

- `docker compose --env-file ops/.env.prod -f ops/docker/docker-compose.prod.yml run --rm --service-ports certbot /opt/init-cert.sh`

签发成功后，证书会保存在 `certbot-etc` volume（容器内路径 `/etc/letsencrypt`）。

### 3.6 启动 Nginx

- `docker compose --env-file ops/.env.prod -f ops/docker/docker-compose.prod.yml up -d nginx`

预期：`nginx` 最终显示为 `healthy`。

### 3.7 首次上线验证（建议逐条执行）

- `curl -fsS https://<domain>/healthz > /dev/null && echo OK_frontend`
- `curl -fsS https://<domain>/api/healthz > /dev/null && echo OK_backend`
- `curl -I https://<domain>/admin | head`

---

## 4. 日常更新部署

推荐使用一键部署脚本（会自动 build/down/up，并等待健康检查）：

- `./ops/deploy.sh`

脚本内部会：

- 先启动 `postgres/backend/frontend` 并等待它们健康
- 检查证书是否存在（缺失则提示先初始化证书）
- 再启动 `nginx` 并做外部 `https://<domain>/healthz`、`https://<domain>/api/healthz` 验证

---

## 5. HTTPS/证书：初始化与续期

### 5.1 初始化证书（首次）

见“3.5 初始化 HTTPS 证书”。

### 5.2 手动续期

续期建议使用一次性运行（避免与 Nginx 80 端口冲突）：

- `docker compose --env-file ops/.env.prod -f ops/docker/docker-compose.prod.yml run --rm certbot /opt/certbot-renew.sh`

如果续期导致证书更新，需要 reload Nginx：

- `docker compose --env-file ops/.env.prod -f ops/docker/docker-compose.prod.yml exec -T nginx nginx -s reload`

### 5.3 自动续期（宿主机 cron）

参考样例见 `ops/docker/cron.txt`。

---

## 6. 验证清单（上线前必做）

### 6.1 Docker 健康状态

- `docker compose --env-file ops/.env.prod -f ops/docker/docker-compose.prod.yml ps`

预期：`postgres/backend/frontend/nginx` 均为 `healthy`。

### 6.2 对外健康检查

- `curl -f https://<domain>/healthz`
- `curl -f https://<domain>/api/healthz`

### 6.3 Strapi 管理后台可用性

- `curl -I https://<domain>/admin | head`

常见误区：如果看到管理端报 “Unexpected token '<' … is not valid JSON”，通常是管理端插件 API 被错误反代到前端导致返回了 HTML。该仓库已在 Nginx 配置中将相关路径统一代理到 `backend`，如仍复现请检查 `ops/nginx/sites.conf` 是否被你本地改坏或未更新。

---

## 7. 备份与恢复

本仓库提供了备份/恢复脚本（见 `ops/backups/`），但在纯 Docker 场景下，最稳妥的是直接通过容器执行 `pg_dump/psql` 与打包 uploads volume。

### 7.1 数据库备份（推荐：从 postgres 容器导出到宿主机）

在仓库根目录执行：

- `mkdir -p ops/backups/_out`
- `docker compose --env-file ops/.env.prod -f ops/docker/docker-compose.prod.yml exec -T postgres sh -lc 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB"' > ops/backups/_out/db_$(date +%Y%m%d_%H%M%S).sql`

### 7.2 媒体文件备份（Strapi uploads）

将 `backend` 容器内的 `/app/public/uploads` 打包并导出到宿主机：

- `docker compose --env-file ops/.env.prod -f ops/docker/docker-compose.prod.yml exec -T backend sh -lc 'tar -czf - -C /app/public/uploads .' > ops/backups/_out/media_$(date +%Y%m%d_%H%M%S).tar.gz`

### 7.3 数据库恢复

- `cat ops/backups/_out/<db_backup.sql> | docker compose --env-file ops/.env.prod -f ops/docker/docker-compose.prod.yml exec -T postgres sh -lc 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"'`

### 7.4 媒体文件恢复

将媒体包解压回 `backend` 容器：

- `cat ops/backups/_out/<media.tar.gz> | docker compose --env-file ops/.env.prod -f ops/docker/docker-compose.prod.yml exec -T backend sh -lc 'mkdir -p /app/public/uploads && tar -xzf - -C /app/public/uploads'`

### 7.5 清理过期备份

如你在宿主机上做定时备份，参考 `ops/backups/cron.txt`；脚本清理工具为 `ops/backups/retention.sh`。

---

## 8. 回滚

使用脚本回滚到某个 git 版本：

- `./ops/rollback.sh <git-ref>`

回滚后务必执行验证清单（第 6 节）。

---

## 9. 常见问题与排查

### 9.1 PostgreSQL 密码认证失败（password authentication failed）

典型原因：你修改了 `ops/.env.prod` 里的 `POSTGRES_PASSWORD`，但仍沿用了旧的 `postgres-data` volume。

处理方式：

- 如果是新环境或你已经备份过数据：`docker compose --env-file ops/.env.prod -f ops/docker/docker-compose.prod.yml down -v` 后重新 `up -d`（注意：这会删除数据库卷数据）

### 9.2 证书签发失败

排查点：

- 域名是否已解析到该服务器公网 IP
- 80 端口是否对公网开放
- 签发时是否启动了 Nginx 占用 80 端口（签发需要独占 80）

### 9.3 Nginx 健康检查失败

说明：该仓库的 Nginx 健康检查使用 `http://127.0.0.1/healthz`（HTTP 80 下直接返回 200，不走跳转），避免了 IPv6 localhost 与 HTTPS 证书校验影响。

排查命令：

- `docker compose --env-file ops/.env.prod -f ops/docker/docker-compose.prod.yml logs --tail=200 nginx`

### 9.4 前端容器不健康（访问不到 /healthz）

说明：生产 compose 已明确 `HOSTNAME=0.0.0.0`、`PORT=3000` 以保证容器内服务对外监听。

排查命令：

- `docker compose --env-file ops/.env.prod -f ops/docker/docker-compose.prod.yml logs --tail=200 frontend`

### 9.5 Strapi 管理端异常（Unexpected token '<'）

典型原因：管理端插件 API 被错误反代到前端，返回了 HTML。

处理方式：

- 核对 `ops/nginx/sites.conf` 是否包含将 Strapi admin/plugin 路径代理到 `backend` 的规则
- reload Nginx：`docker compose --env-file ops/.env.prod -f ops/docker/docker-compose.prod.yml exec -T nginx nginx -s reload`

---

## 10. 参考文件

- `ops/deploy.sh`：生产一键部署
- `ops/generate-secrets.sh`：生成 `ops/.env.prod`
- `ops/docker/docker-compose.prod.yml`：生产编排
- `ops/docker/init-cert.sh`：证书初始化脚本
- `ops/docker/certbot-renew.sh`：证书续期脚本
- `ops/docker/cron.txt`：证书续期 cron 样例
- `ops/nginx/sites.conf`：站点反代/证书/healthz 配置
- `ops/backups/`：备份/恢复/清理脚本与 cron 样例
