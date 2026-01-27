# 生产环境部署方案

## 1. 项目概述

### 1.1 技术栈

**前端：**
- Next.js 15.1.0
- React 18
- TypeScript
- pnpm

**后端：**
- Strapi 5.33.4
- Node.js 24

**数据库：**
- 开发环境：SQLite
- 生产环境：PostgreSQL 16

**基础设施：**
- Docker 24.0+
- Docker Compose 2.20+
- Nginx 1.27
- Let's Encrypt (SSL)

### 1.2 域名信息

- 生产域名：szzczk.com
- 备用域名：www.szzczk.com

---

## 2. 架构设计

### 2.1 整体架构

```
┌─────────────────────────────────────────────────────────────┐
│                        生产环境                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐      ┌──────────────┐                   │
│  │   Nginx      │      │   Docker     │                   │
│  │   (反向代理)  │◄─────┤   Compose    │                   │
│  │   443/80     │      │   (编排)     │                   │
│  └──────────────┘      └──────────────┘                   │
│         │                        │                          │
│         │                        │                          │
│    ┌────┴────┐            ┌──────┴────────┐                 │
│    │         │            │               │                 │
│    ▼         ▼            ▼               ▼                 │
│ ┌──────┐ ┌──────┐   ┌──────────┐  ┌──────────────┐        │
│ │Front │ │Back  │   │PostgreSQL│  │Certbot       │        │
│ │end   │ │end   │   │Database  │  │(SSL证书)     │        │
│ │:3000 │ │:1337 │   │:5432     │  │              │        │
│ └──────┘ └──────┘   └──────────┘  └──────────────┘        │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Docker Volumes (数据持久化)                          │ │
│  │  - postgres-data: PostgreSQL 数据                      │ │
│  │  - strapi-uploads: 上传文件                            │ │
│  │  - certbot-etc: SSL 证书                               │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                        开发环境                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐      ┌──────────────┐                   │
│  │   Next.js    │      │   Strapi     │                   │
│  │   :3000      │─────►│   :1337      │                   │
│  │   (前端)     │      │   (后端)     │                   │
│  └──────────────┘      └──────┬───────┘                   │
│                                │                            │
│                                ▼                            │
│                        ┌──────────────┐                     │
│                        │   SQLite     │                     │
│                        │  (数据库)    │                     │
│                        └──────────────┘                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 网络架构

**开发环境：**
```
浏览器 → localhost:3000 (Next.js) → localhost:1337 (Strapi) → SQLite
```

**生产环境：**
```
用户浏览器 → szczk.com:443 (Nginx) → frontend:3000 (Next.js)
                                      → backend:1337 (Strapi) → postgres:5432 (PostgreSQL)
                                      → certbot (Let's Encrypt)
```

### 2.3 目录结构

```
/Users/will/Downloads/figma/zczk/
├── backend/
│   ├── .env                    # 开发环境配置（不提交）
│   ├── .env.example            # 开发环境示例
│   ├── config/
│   │   ├── database.ts         # 数据库配置
│   │   ├── middlewares.ts      # 中间件配置（含 CORS）
│   │   └── ...
│   └── ...
├── frontend/
│   ├── .env                    # 开发环境配置（不提交）
│   ├── .env.example            # 开发环境示例
│   └── ...
├── ops/                        # 运维脚本和配置
│   ├── .env.prod               # 生产环境配置（不提交）
│   ├── .env.prod.example       # 生产环境示例
│   ├── .env.dev.example        # 开发环境示例
│   ├── dev.sh                  # 开发环境启动脚本
│   ├── deploy.sh               # 生产环境部署脚本
│   ├── generate-secrets.sh     # 生成密钥脚本
│   ├── init-cert.sh            # 证书初始化脚本
│   ├── docker/
│   │   ├── Dockerfile.backend  # 后端 Dockerfile
│   │   ├── Dockerfile.frontend # 前端 Dockerfile
│   │   ├── docker-compose.dev.yml  # 开发环境编排
│   │   ├── docker-compose.prod.yml # 生产环境编排
│   │   ├── certbot-renew.sh    # 证书续期脚本
│   │   └── cron.txt            # 定时任务配置
│   ├── nginx/
│   │   ├── nginx.conf          # Nginx 主配置
│   │   ├── sites.conf          # 站点配置
│   │   └── health.conf         # 健康检查配置
│   ├── backups/
│   │   ├── backup.sh           # 数据备份脚本
│   │   ├── restore.sh          # 数据恢复脚本
│   │   ├── retention.sh        # 备份清理脚本
│   │   └── cron.txt            # 备份定时任务
│   └── import/
│       └── dev-seed.sh        # 开发数据导入脚本
└── ...
```

---

## 3. 环境配置管理

### 3.1 配置文件分层

| 配置文件 | 用途 | 提交 Git | 包含内容 |
|---------|------|----------|----------|
| `backend/.env` | 开发环境本地配置 | ❌ | SQLite 配置、本地密钥 |
| `backend/.env.example` | 开发环境示例 | ✅ | 配置模板（不含敏感信息） |
| `frontend/.env` | 开发环境本地配置 | ❌ | 本地 API URL |
| `frontend/.env.example` | 开发环境示例 | ✅ | 配置模板 |
| `ops/.env.prod` | 生产环境配置 | ❌ | PostgreSQL 配置、生产密钥 |
| `ops/.env.prod.example` | 生产环境示例 | ✅ | 所有环境变量（不含真实值） |
| `ops/.env.dev.example` | 开发环境示例 | ✅ | 开发环境变量模板 |

### 3.2 环境变量分类

**自动生成的变量（8个）：**
```env
POSTGRES_PASSWORD          # PostgreSQL 密码
APP_KEYS                   # Strapi 应用密钥（4个）
API_TOKEN_SALT             # API 令牌盐
ADMIN_JWT_SECRET           # Admin JWT 密钥
TRANSFER_TOKEN_SALT        # Transfer 令牌盐
JWT_SECRET                 # JWT 密钥
ENCRYPTION_KEY             # 加密密钥
```

**手动定义的变量（2个）：**
```env
DOMAIN                     # 网站域名（例如：szzczk.com）
LETSENCRYPT_EMAIL          # Let's Encrypt 通知邮箱
```

### 3.3 配置文件内容

**`ops/.env.prod.example`（生产环境模板）：**
```env
NODE_ENV=production
NEXT_PUBLIC_STRAPI_URL=https://szzczk.com
DOMAINS=szzczk.com,www.szzczk.com

# Database
POSTGRES_DB=zczk
POSTGRES_USER=zczk
POSTGRES_PASSWORD=change_me
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

# Strapi secrets (do NOT commit real values)
APP_KEYS=change_me
API_TOKEN_SALT=change_me
ADMIN_JWT_SECRET=change_me
TRANSFER_TOKEN_SALT=change_me
JWT_SECRET=change_me
ENCRYPTION_KEY=change_me

# Nginx / Certbot
LETSENCRYPT_EMAIL=admin@szzczk.com
```

**`ops/.env.dev.example`（开发环境模板）：**
```env
NODE_ENV=development
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=./data.db
STRAPI_HOST=0.0.0.0
STRAPI_PORT=1337

# Optional proxy (if needed)
HTTP_PROXY=
HTTPS_PROXY=
NO_PROXY=localhost,127.0.0.1
```

---

## 4. 容器构建策略

### 4.1 构建策略原则

**核心原则：部署时构建，不提前构建并提交**

| 策略 | 说明 | 原因 |
|------|------|------|
| **多阶段构建** | 使用 Docker multi-stage build | 减小最终镜像大小，提高安全性 |
| **部署时构建** | 在部署服务器上执行 `docker compose build` | 确保构建环境一致性 |
| **不提交构建产物** | dist、build、.next 等不提交到 Git | 避免代码仓库膨胀，保持代码纯净 |
| **使用构建缓存** | 利用 Docker layer cache 加速构建 | 提高构建效率 |

### 4.2 多阶段构建架构

**后端多阶段构建：**

```
┌─────────────────────────────────────────────────────────────┐
│  Stage 1: Builder (node:24-alpine)                   │
│  ├─ 安装依赖 (npm install)                              │
│  ├─ 复制源代码 (COPY backend/ ./)                       │
│  └─ 构建应用 (npm run build) → 生成 dist、build         │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  Stage 2: Production (node:24-alpine)                  │
│  ├─ 安装生产依赖 (npm ci --only=production)            │
│  ├─ 复制构建产物 (COPY --from=builder)                  │
│  └─ 启动应用 (npm start)                               │
└─────────────────────────────────────────────────────────────┘
```

**前端多阶段构建：**

```
┌─────────────────────────────────────────────────────────────┐
│  Stage 1: Builder (node:24-alpine)                   │
│  ├─ 安装 pnpm 和依赖 (pnpm install)                   │
│  ├─ 复制源代码 (COPY frontend/ ./)                      │
│  └─ 构建应用 (pnpm run build) → 生成 .next              │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  Stage 2: Production (node:24-alpine)                  │
│  ├─ 安装生产依赖 (pnpm install --production)            │
│  ├─ 复制构建产物 (COPY --from=builder)                  │
│  └─ 启动应用 (pnpm start)                               │
└─────────────────────────────────────────────────────────────┘
```

### 4.3 部署流程

**首次部署：**
```bash
# 1. 克隆代码（不包含构建产物）
git clone <repository>
cd zczk

# 2. 配置环境变量
./ops/generate-secrets.sh szczk.com

# 3. 替换 Nginx 配置中的域名
vim ops/nginx/sites.conf  # 替换 example.com 为实际域名

# 4. 构建镜像（部署时构建）
docker compose -f ops/docker/docker-compose.prod.yml build

# 5. 启动基础服务
docker compose -f ops/docker/docker-compose.prod.yml up -d postgres backend frontend

# 6. 初始化证书
docker compose -f ops/docker/docker-compose.prod.yml run --rm certbot /opt/init-cert.sh

# 7. 启动 nginx 和 certbot
docker compose -f ops/docker/docker-compose.prod.yml up -d nginx certbot

# 8. 验证部署
curl -I https://szzczk.com
```

**更新部署：**
```bash
# 1. 拉取最新代码
git pull

# 2. 重新构建镜像
docker compose -f ops/docker/docker-compose.prod.yml build --no-cache

# 3. 重启容器
docker compose -f ops/docker/docker-compose.prod.yml up -d
```

**回滚部署：**
```bash
# 回滚到指定版本（git ref）
./ops/rollback.sh <git-ref>
```

---

## 5. Let's Encrypt 证书自动化管理

### 5.1 证书管理架构

**证书获取方式：** Certbot Standalone 模式

**自动化流程：**
```
首次部署 → 手动获取证书 → 自动续期（每天检查）→ 自动重载 Nginx
```

### 5.2 证书初始化

**首次部署时运行：**
```bash
# 初始化证书
docker compose -f ops/docker/docker-compose.prod.yml run --rm \
  -e DOMAINS="szczk.com,www.szzczk.com" \
  -e LETSENCRYPT_EMAIL="admin@szczk.com" \
  certbot /opt/init-cert.sh
```

### 5.3 证书续期

**自动续期配置：**

**`ops/docker/certbot-renew.sh`：**
```bash
#!/bin/sh
set -eu

echo "🔄 检查证书续期..."
certbot renew --quiet --deploy-hook "nginx -s reload"
echo "✅ 证书续期检查完成"
```

**`ops/docker/cron.txt`：**
```cron
# 每天凌晨 3 点检查证书续期
0 3 * * * /bin/sh /opt/certbot-renew.sh >> /var/log/certbot-renew.log 2>&1
```

### 5.4 Nginx SSL 配置

**`ops/nginx/sites.conf` 关键配置：**

```nginx
# HTTP to HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name _;

    # Allow Let's Encrypt ACME challenge
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    # Redirect all other traffic to HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}

# Main HTTPS server (production)
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name szczk.com www.szzczk.com;

    # SSL/TLS Configuration
    ssl_certificate     /etc/letsencrypt/live/szczk.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/szczk.com/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache   shared:SSL:10m;
    ssl_session_timeout 10m;
    ssl_session_tickets off;

    # Security Headers
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
}
```

---

## 6. 自动化部署脚本

### 6.1 密钥生成脚本

**`ops/generate-secrets.sh`：**
```bash
#!/bin/bash
set -euo pipefail

echo "🔐 生成生产环境环境变量..."

if ! command -v openssl &> /dev/null; then
    echo "❌ 错误: openssl 未安装"
    exit 1
fi

generate_random() {
    openssl rand -hex 16
}

POSTGRES_PASSWORD=$(generate_random)
APP_KEYS=$(generate_random),$(generate_random),$(generate_random),$(generate_random)
API_TOKEN_SALT=$(generate_random)
ADMIN_JWT_SECRET=$(generate_random)
TRANSFER_TOKEN_SALT=$(generate_random)
JWT_SECRET=$(generate_random)
ENCRYPTION_KEY=$(generate_random)

if [ -n "$1" ]; then
    DOMAIN="$1"
else
    read -p "请输入你的域名（例如: szczk.com）: " DOMAIN
    if [ -z "$DOMAIN" ]; then
        echo "❌ 错误: 域名不能为空"
        exit 1
    fi
fi

read -p "请输入你的邮箱（用于 Let's Encrypt）: " EMAIL
if [ -z "$EMAIL" ]; then
    echo "❌ 错误: 邮箱不能为空"
    exit 1
fi

mkdir -p ops

if [ -f ops/.env.prod ]; then
    read -p "⚠️  ops/.env.prod 已存在，是否覆盖？(y/N): " overwrite
    if [ "$overwrite" != "y" ] && [ "$overwrite" != "Y" ]; then
        echo "❌ 操作已取消"
        exit 0
    fi
    cp ops/.env.prod ops/.env.prod.backup.$(date +%Y%m%d_%H%M%S)
    echo "📦 已备份旧文件"
fi

cat > ops/.env.prod << EOF
NODE_ENV=production
NEXT_PUBLIC_STRAPI_URL=https://\$DOMAIN
DOMAINS=\$DOMAIN,www.\$DOMAIN

# Database
POSTGRES_DB=zczk
POSTGRES_USER=zczk
POSTGRES_PASSWORD=$POSTGRES_PASSWORD
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

# Strapi secrets
APP_KEYS=$APP_KEYS
API_TOKEN_SALT=$API_TOKEN_SALT
ADMIN_JWT_SECRET=$ADMIN_JWT_SECRET
TRANSFER_TOKEN_SALT=$TRANSFER_TOKEN_SALT
JWT_SECRET=$JWT_SECRET
ENCRYPTION_KEY=$ENCRYPTION_KEY

# Nginx / Certbot
LETSENCRYPT_EMAIL=$EMAIL
EOF

echo "✅ 环境变量已生成到 ops/.env.prod"
echo "📝 请将以下域名配置替换到 ops/nginx/sites.conf:"
echo "   - example.com → $DOMAIN"
echo "   - www.example.com → www.$DOMAIN"
```

### 6.2 生产环境部署脚本

**`ops/deploy.sh`：**
```bash
#!/bin/bash
set -euo pipefail

echo "🚀 开始部署生产环境..."

cd "$(dirname "$0")"

# 检查环境变量文件
if [ ! -f ".env.prod" ]; then
    echo "❌ 错误: ops/.env.prod 不存在"
    echo "💡 请先运行: ./generate-secrets.sh <domain>"
    exit 1
fi

# 1. 拉取最新镜像
echo "📥 拉取最新镜像..."
docker compose -f ops/docker/docker-compose.prod.yml build

# 2. 停止旧容器
echo "⏹️  停止旧容器..."
docker compose -f ops/docker/docker-compose.prod.yml down

# 3. 启动基础服务
echo "🚀 启动基础服务..."
docker compose -f ops/docker/docker-compose.prod.yml up -d postgres backend frontend

# 4. 等待服务就绪
echo "⏳ 等待服务启动..."
sleep 30

# 5. 检查证书是否存在
if ! docker compose -f ops/docker/docker-compose.prod.yml exec -T nginx ls /etc/letsencrypt/live/szczk.com/fullchain.pem 2>/dev/null; then
    echo "⚠️  证书不存在，请先运行证书初始化:"
  echo "   docker compose -f ops/docker/docker-compose.prod.yml run --rm certbot /opt/init-cert.sh"
    exit 1
fi

# 6. 启动 nginx 和 certbot
echo "🌐 启动 Nginx 和 Certbot..."
docker compose -f ops/docker/docker-compose.prod.yml up -d nginx certbot

# 7. 健康检查
echo "🔍 健康检查..."
sleep 10

# 获取域名
DOMAIN=$(grep "DOMAINS=" .env.prod | cut -d'=' -f2 | cut -d',' -f1)

if curl -f https://$DOMAIN/healthz > /dev/null 2>&1; then
    echo "✅ 前端健康检查通过"
else
    echo "❌ 前端健康检查失败"
    exit 1
fi

if curl -f https://$DOMAIN/api/healthz > /dev/null 2>&1; then
    echo "✅ 后端健康检查通过"
else
    echo "❌ 后端健康检查失败"
    exit 1
fi

echo "✅ 部署完成！"
echo "🌐 访问地址: https://$DOMAIN"
docker compose -f docker/docker-compose.prod.yml ps
```

### 6.3 开发环境启动脚本

**`ops/dev.sh`：**
```bash
#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)

cd "$ROOT_DIR"

docker compose -f ops/docker/docker-compose.dev.yml up
```

---

## 7. 监控告警机制

### 7.1 健康检查

**容器健康检查配置：**

| 服务 | 健康检查命令 | 间隔 | 超时 | 重试次数 |
|------|------------|------|------|----------|
| PostgreSQL | `pg_isready -U zczk -d zczk` | 30s | 5s | 5 |
| Backend | `wget --quiet --tries=1 --spider http://localhost:1337/api/healthz` | 30s | 10s | 3 |
| Frontend | `wget --quiet --tries=1 --spider http://localhost:3000/healthz` | 30s | 10s | 3 |
| Nginx | `wget --quiet --tries=1 --spider http://localhost/healthz` | 30s | 5s | 3 |

**健康检查端点说明：**
- 前端：`/healthz`
- 后端：`/api/healthz`

### 7.2 日志管理

**日志收集策略：**
- 容器日志：Docker 默认日志驱动（json-file）
- 日志轮转：配置 Docker 日志大小限制
- 日志保留：保留最近 7 天的日志

**配置 Docker 日志轮转：**
```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "7"
  }
}
```

**日志查看命令：**
```bash
# 查看所有服务日志
docker compose -f ops/docker/docker-compose.prod.yml logs -f

# 查看特定服务日志
docker compose -f ops/docker/docker-compose.prod.yml logs -f backend
docker compose -f ops/docker/docker-compose.prod.yml logs -f frontend
docker compose -f ops/docker/docker-compose.prod.yml logs -f nginx

# 查看最近 100 行日志
docker compose -f ops/docker/docker-compose.prod.yml logs --tail=100
```

### 7.3 监控指标

**关键监控指标：**

| 指标类型 | 监控项 | 告警阈值 | 告警级别 |
|---------|--------|---------|---------|
| **系统资源** | CPU 使用率 | > 80% | Warning |
| | 内存使用率 | > 85% | Warning |
| | 磁盘使用率 | > 90% | Critical |
| **服务可用性** | 前端响应时间 | > 3s | Warning |
| | 后端响应时间 | > 2s | Warning |
| | 数据库连接数 | > 80% | Warning |
| **业务指标** | API 错误率 | > 5% | Critical |
| | 证书有效期 | < 7 天 | Critical |

**详细阈值与说明**：参见 `ops/monitoring/metrics.md`。

---

## 8. 数据备份与恢复

### 8.1 备份策略

**备份类型：**
- 数据库备份：PostgreSQL 数据库完整备份
- 文件备份：上传文件备份
- 配置备份：环境变量和配置文件备份

**备份频率：**
- 数据库：每天凌晨 2:00
- 文件：每天凌晨 2:30
- 保留策略：保留最近 7 天的备份

### 8.2 备份脚本

**`ops/backups/backup.sh`：**
```bash
#!/bin/env bash
set -euo pipefail

BACKUP_DIR=${BACKUP_DIR:-/backups}
MEDIA_DIR=${MEDIA_DIR:-/app/public/uploads}
POSTGRES_HOST=${POSTGRES_HOST:-postgres}
POSTGRES_PORT=${POSTGRES_PORT:-5432}
POSTGRES_DB=${POSTGRES_DB:-zczk}
POSTGRES_USER=${POSTGRES_USER:-zczk}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-}

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DB_DUMP="$BACKUP_DIR/db_${POSTGRES_DB}_${TIMESTAMP}.sql"
MEDIA_ARCHIVE="$BACKUP_DIR/media_${TIMESTAMP}.tar.gz"

mkdir -p "$BACKUP_DIR"

export PGPASSWORD="$POSTGRES_PASSWORD"
pg_dump -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" "$POSTGRES_DB" > "$DB_DUMP"

tar -czf "$MEDIA_ARCHIVE" -C "$MEDIA_DIR" .

echo "Backup complete: $DB_DUMP, $MEDIA_ARCHIVE"
```

**备份定时任务 `ops/backups/cron.txt`：**
```cron
# 每天凌晨 2:00 备份数据库
0 2 * * * /bin/bash /usr/local/bin/backup.sh >> /var/log/backup.log 2>&1

# 每天凌晨 2:30 清理过期备份（保留 7 天）
30 2 * * * /bin/bash /usr/local/bin/retention.sh >> /var/log/retention.log 2>&1
```

### 8.3 恢复脚本

**`ops/backups/restore.sh`：**
```bash
#!/bin/env bash
set -euo pipefail

BACKUP_DIR=${BACKUP_DIR:-/backups}
MEDIA_DIR=${MEDIA_DIR:-/app/public/uploads}
POSTGRES_HOST=${POSTGRES_HOST:-postgres}
POSTGRES_PORT=${POSTGRES_PORT:-5432}
POSTGRES_DB=${POSTGRES_DB:-zczk}
POSTGRES_USER=${POSTGRES_USER:-zczk}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-}

if [ -z "$1" ]; then
    echo "Usage: $0 <backup_file.sql>"
    exit 1
fi

BACKUP_FILE="$1"

export PGPASSWORD="$POSTGRES_PASSWORD"
psql -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" -d "$POSTGRES_DB" < "$BACKUP_FILE"

echo "Restore complete: $BACKUP_FILE"
```

### 8.4 备份清理

**`ops/backups/retention.sh`：**
```bash
#!/bin/env bash
set -euo pipefail

BACKUP_DIR=${BACKUP_DIR:-/backups}
RETENTION_DAYS=${RETENTION_DAYS:-7}

find "$BACKUP_DIR" -name "db_*.sql" -mtime +$RETENTION_DAYS -delete
find "$BACKUP_DIR" -name "media_*.tar.gz" -mtime +$RETENTION_DAYS -delete

echo "Cleaned up backups older than $RETENTION_DAYS days"
```

---

## 9. 数据迁移流程

### 9.1 数据迁移概述

**数据迁移场景：**
- 从开发环境（SQLite）迁移到生产环境（PostgreSQL）
- 从测试环境迁移到生产环境
- 从旧的生产环境迁移到新的生产环境

**支持的内容类型：**
- Products（产品）
- News（新闻）
- Media Files（媒体文件）

**迁移工具：**
- 脚本：`backend/scripts/import-dev-seed.mjs`
- 包装脚本：`ops/import/dev-seed.sh`

### 9.2 迁移前准备

**1. 获取 API Token**

在开发环境获取 API Token：

```bash
# 访问开发环境管理面板
open http://localhost:1337/admin

# 进入 Settings > API Tokens
# 创建新的 Full Access Token
# 复制 Token 值
```

在生产环境获取 API Token：

```bash
# 访问生产环境管理面板
open https://szczk.com/admin

# 进入 Settings > API Tokens
# 创建新的 Full Access Token
# 复制 Token 值
```

**2. 验证环境可访问性**

```bash
# 验证开发环境
curl -f http://localhost:1337/api/products
curl -f http://localhost:1337/api/news

# 验证生产环境
curl -f https://szczk.com/api/products
curl -f https://szczk.com/api/news
```

**3. 备份生产数据（如需要）**

```bash
# 备份当前生产数据库
docker compose -f ops/docker/docker-compose.prod.yml exec postgres pg_dump -U zczk zczk > backup_before_migration.sql

# 备份上传文件
docker compose -f ops/docker/docker-compose.prod.yml exec backend tar -czf /tmp/uploads_backup.tar.gz /app/backend/public/uploads
docker compose -f ops/docker/docker-compose.prod.yml cp backend:/tmp/uploads_backup.tar.gz ./
```

### 9.3 使用专用脚本迁移

**方法 1：使用包装脚本（推荐）**

```bash
# 设置环境变量
export DEV_STRAPI_URL=http://localhost:1337
export PROD_STRAPI_URL=https://szczk.com
export DEV_STRAPI_TOKEN=<dev_api_token>
export PROD_STRAPI_TOKEN=<prod_api_token>

# 执行迁移
./ops/import/dev-seed.sh
```

**方法 2：直接使用 Node.js 脚本**

```bash
# 进入 backend 目录
cd backend

# 执行迁移脚本
node scripts/import-dev-seed.mjs \
  --dev http://localhost:1337 \
  --prod https://szczk.com \
  --dev-token <dev_api_token> \
  --prod-token <prod_api_token>
```

### 9.4 迁移验证

**1. 验证数据完整性**

```bash
# 检查开发环境产品数量
DEV_PRODUCT_COUNT=$(curl -s http://localhost:1337/api/products | jq 'meta.pagination.total')

# 检查生产环境产品数量
PROD_PRODUCT_COUNT=$(curl -s https://szczk.com/api/products | jq 'meta.pagination.total')

# 对比数量
echo "开发环境产品数: $DEV_PRODUCT_COUNT"
echo "生产环境产品数: $PROD_PRODUCT_COUNT"

if [ "$DEV_PRODUCT_COUNT" -eq "$PROD_PRODUCT_COUNT" ]; then
    echo "✅ 产品数量一致"
else
    echo "⚠️  产品数量不一致"
fi
```

**2. 验证媒体文件**

```bash
# 检查生产环境上传文件
docker compose -f ops/docker/docker-compose.prod.yml exec backend ls -la /app/backend/public/uploads

# 访问生产环境管理面板验证
open https://szczk.com/admin
# 进入 Media Library 查看所有上传的文件
```

**3. 验证前端显示**

```bash
# 访问生产环境前端
open https://szczk.com/products
open https://szczk.com/news

# 检查产品详情页
open https://szczk.com/products/product-1

# 检查新闻详情页
open https://szczk.com/news/news-1
```

### 9.5 迁移注意事项

**1. 数据一致性**

- 确保 slug 在开发和生产环境中一致
- 检查关联关系（产品分类、新闻分类）
- 验证媒体文件引用是否正确

**2. 性能考虑**

- 大量数据迁移可能需要较长时间
- 建议在低峰期执行迁移
- 可以分批迁移，先迁移产品，再迁移新闻

**3. 错误处理**

```bash
# 迁移脚本会输出详细日志
# 查看导入进度
tail -f migration.log

# 如果某个条目导入失败，脚本会继续处理下一个
# 失败的条目会在日志中记录
```

**4. 安全考虑**

- API Token 具有完全访问权限，迁移后应删除
- 不要在公共网络传输 API Token
- 迁移完成后验证权限设置

### 9.6 回滚方案

**如果迁移失败，执行回滚：**

```bash
# 1. 停止生产环境服务
docker compose -f ops/docker/docker-compose.prod.yml down

# 2. 恢复数据库备份
docker compose -f ops/docker/docker-compose.prod.yml up -d postgres
docker compose -f ops/docker/docker-compose.prod.yml exec -T postgres psql -U zczk -d zczk < backup_before_migration.sql

# 3. 恢复上传文件
docker compose -f ops/docker/docker-compose.prod.yml exec backend tar -xzf /tmp/uploads_backup.tar.gz -C /app/backend/public/

# 4. 重启所有服务
docker compose -f ops/docker/docker-compose.prod.yml up -d

# 5. 验证恢复
curl -f https://szczk.com/healthz
```

### 9.7 迁移最佳实践

| 最佳实践 | 说明 |
|---------|------|
| **先测试后迁移** | 在测试环境先演练迁移流程 |
| **完整备份** | 迁移前备份生产数据 |
| **分批迁移** | 大量数据分批迁移，降低风险 |
| **验证每一步** | 每完成一个步骤就验证一次 |
| **保留日志** | 保存迁移日志，便于问题排查 |
| **监控性能** | 迁移过程中监控服务器资源使用 |

---

## 10. 资源配置要求

### 10.1 开发环境资源配置

| 组件 | CPU | 内存 | 磁盘 | 说明 |
|------|-----|------|------|------|
| 前端 | 1核 | 512MB | 1GB | Next.js 开发服务器 |
| 后端 | 1核 | 512MB | 1GB | Strapi 开发服务器 |
| 数据库 | 0.5核 | 256MB | 100MB | SQLite |
| **总计** | **2.5核** | **1.25GB** | **2.1GB** | - |

### 10.2 生产环境资源配置

| 组件 | CPU | 内存 | 磁盘 | 说明 |
|------|-----|------|------|------|
| 前端 | 1核 | 1GB | 2GB | Next.js 生产服务器 |
| 后端 | 2核 | 2GB | 2GB | Strapi 生产服务器 |
| PostgreSQL | 2核 | 2GB | 10GB | 生产数据库 |
| Nginx | 0.5核 | 256MB | 1GB | 反向代理 |
| Certbot | 0.1核 | 128MB | 500MB | SSL 证书管理 |
| **总计** | **5.6核** | **5.38GB** | **15.5GB** | 不含备份空间 |

**推荐服务器配置：**
- CPU：8核
- 内存：16GB
- 磁盘：100GB SSD
- 网络：100Mbps 带宽

### 10.3 资源限制配置

**Docker Compose 资源限制：**
```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 2G
        reservations:
          cpus: '1.0'
          memory: 1G

  frontend:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M

  postgres:
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 2G
        reservations:
          cpus: '1.0'
          memory: 1G
```

---

## 11. 访问权限控制

### 11.1 网络访问控制

**端口开放策略：**

| 端口 | 协议 | 用途 | 访问来源 |
|------|------|------|----------|
| 80 | HTTP | Let's Encrypt ACME Challenge | 公网 |
| 443 | HTTPS | 生产环境访问 | 公网 |
| 5432 | PostgreSQL | 数据库访问 | 容器内部 |
| 3000 | Frontend | 前端服务 | 容器内部 |
| 1337 | Backend | 后端服务 | 容器内部 |

**防火墙配置：**
```bash
# Ubuntu UFW
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw deny 5432/tcp
sudo ufw deny 3000/tcp
sudo ufw deny 1337/tcp
sudo ufw enable
```

### 11.2 容器权限控制

**非 root 用户运行：**

| 容器 | 用户 | UID | GID |
|------|------|-----|-----|
| Backend | strapi | 1001 | 1001 |
| Frontend | nextjs | 1001 | 1001 |
| Nginx | nginx | 101 | 101 |

### 11.3 API 访问控制

**Strapi CORS 配置：**
```javascript
// backend/config/middlewares.ts
export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      cors: {
        enabled: true,
        origin: ['https://szczk.com', 'http://localhost:3000'],
        credentials: true,
      },
    },
  },
];
```

**Nginx 安全头配置：**
```nginx
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
```

### 11.4 数据库访问控制

**PostgreSQL 权限配置：**
- 只允许容器内部访问（不对外暴露端口）
- 使用强密码（16位以上随机字符串）
- 定期轮换密码
- 启用连接池限制

---

## 12. 故障排查与应急预案

### 12.1 常见故障及解决方案

| 故障现象 | 可能原因 | 解决方案 |
|---------|---------|----------|
| 容器无法启动 | 端口被占用 | 检查端口占用，修改 docker-compose.yml |
| 数据库连接失败 | PostgreSQL 未启动 | 检查 PostgreSQL 健康状态，等待启动 |
| API 请求失败 | CORS 配置错误 | 检查 Strapi CORS 配置 |
| 前端无法访问 | Nginx 配置错误 | 检查 nginx.conf 配置 |
| SSL 证书过期 | 证书未续期 | 运行 certbot renew |
| 证书获取失败 | 域名未解析 | 检查 DNS 解析，确保域名指向服务器 IP |

### 12.2 故障排查流程

```bash
# 1. 检查容器状态
docker compose -f ops/docker/docker-compose.prod.yml ps

# 2. 查看日志
docker compose -f ops/docker/docker-compose.prod.yml logs -f

# 3. 检查网络连接
docker network inspect zczk_zczk-network

# 4. 检查资源使用
docker stats

# 5. 重启服务
docker compose -f ops/docker/docker-compose.prod.yml restart [service_name]
```

### 12.3 应急预案

**应急预案清单：**
- [ ] 数据备份恢复流程
- [ ] 容器回滚流程
- [ ] 服务降级方案
- [ ] 紧急联系方式
- [ ] 应急响应团队

**应急响应流程：**
```
1. 发现问题 → 2. 评估影响 → 3. 启动应急预案 → 4. 执行恢复 → 5. 验证结果 → 6. 总结改进
```

---

## 13. 测试与验证方法

### 13.1 开发环境测试

**功能测试：**
```bash
# 1. 启动开发环境
./ops/dev.sh

# 2. 访问前端
open http://localhost:3000

# 3. 测试 API
curl http://localhost:1337/api/products
curl http://localhost:1337/api/news

# 4. 测试数据库
cd backend
sqlite3 .tmp/data.db ".tables"
```

### 13.2 生产环境测试

**容器健康检查：**
```bash
# 检查所有容器状态
docker compose -f ops/docker/docker-compose.prod.yml ps

# 查看容器日志
docker compose -f ops/docker/docker-compose.prod.yml logs -f

# 测试 PostgreSQL 连接
docker compose -f ops/docker/docker-compose.prod.yml exec postgres pg_isready -U zczk

# 测试 Strapi API
curl https://szczk.com/api/products
curl https://szczk.com/api/news

# 测试前端
curl https://szczk.com
```

**性能测试：**
```bash
# 使用 Apache Bench 测试
ab -n 1000 -c 10 https://szczk.com/

# 使用 wrk 测试
wrk -t4 -c100 -d30s https://szczk.com/
```

---

## 14. 实施步骤与时间规划

### 14.1 实施步骤

**阶段 1：准备工作（1-2 天）**

| 步骤 | 任务 | 输出 |
|------|------|------|
| 1.1 | 创建密钥生成脚本 | `ops/generate-secrets.sh` |
| 1.2 | 创建部署脚本 | `ops/deploy.sh` |
| 1.3 | 创建证书初始化脚本 | `ops/docker/init-cert.sh` |
| 1.4 | 完善证书续期脚本 | `ops/docker/certbot-renew.sh` |
| 1.5 | 配置定时任务 | `ops/docker/cron.txt` |
| 1.6 | 更新 Nginx 配置 | `ops/nginx/sites.conf` |

**阶段 2：本地测试（1-2 天）**

| 步骤 | 任务 | 验证 |
|------|------|------|
| 2.1 | 生成环境变量 | `ops/.env.prod` 创建成功 |
| 2.2 | 构建容器镜像 | 镜像构建无错误 |
| 2.3 | 启动容器 | 所有容器正常运行 |
| 2.4 | 测试数据库连接 | PostgreSQL 连接成功 |
| 2.5 | 测试证书获取 | Let's Encrypt 证书获取成功 |
| 2.6 | 测试 API 接口 | API 响应正常 |

**阶段 3：生产部署（1 天）**

| 步骤 | 任务 | 验证 |
|------|------|------|
| 3.1 | 部署到服务器 | 容器在服务器上运行 |
| 3.2 | 配置域名解析 | 域名指向服务器 IP |
| 3.3 | 获取 SSL 证书 | HTTPS 访问正常 |
| 3.4 | 执行数据迁移 | 生产数据导入成功 |
| 3.5 | 全功能测试 | 所有功能正常 |
| 3.6 | 配置备份策略 | 自动备份正常运行 |

**阶段 4：优化与监控（持续）**

| 步骤 | 任务 | 频率 |
|------|------|------|
| 4.1 | 性能优化 | 按需 |
| 4.2 | 安全加固 | 按需 |
| 4.3 | 监控告警 | 持续 |
| 4.4 | 定期备份 | 每天 |
| 4.5 | 日志分析 | 每周 |

### 14.2 时间规划

| 阶段 | 时间 | 关键里程碑 |
|------|------|-----------|
| 准备工作 | 1-2 天 | 所有脚本和配置文件创建完成 |
| 本地测试 | 1-2 天 | 本地 Docker 环境运行正常 |
| 生产部署 | 1 天 | 生产环境上线 |
| 优化监控 | 持续 | 系统稳定运行 |

**总计：3-5 天完成首次部署**

---

## 15. 风险评估与应对策略

### 15.1 风险评估

| 风险 | 概率 | 影响 | 风险等级 |
|------|------|------|----------|
| 数据迁移失败 | 中 | 高 | 高 |
| 容器启动失败 | 低 | 中 | 中 |
| SSL 证书配置错误 | 中 | 中 | 中 |
| 性能不达标 | 低 | 中 | 中 |
| 安全漏洞 | 低 | 高 | 中 |
| 数据丢失 | 低 | 高 | 高 |
| 证书续期失败 | 低 | 高 | 中 |

### 15.2 应对策略

**风险 1：数据迁移失败**
- **预防措施：**
  - 在测试环境先演练迁移流程
  - 迁移前完整备份数据
  - 使用事务确保数据一致性
- **应对措施：**
  - 保留开发环境数据作为备份
  - 准备回滚方案
  - 记录详细日志便于排查

**风险 2：容器启动失败**
- **预防措施：**
  - 在本地充分测试
  - 使用健康检查机制
  - 配置自动重启策略
- **应对措施：**
  - 查看容器日志定位问题
  - 检查资源使用情况
  - 必要时回滚到旧版本

**风险 3：SSL 证书配置错误**
- **预防措施：**
  - 使用 Let's Encrypt 自动化
  - 配置自动续期
  - 在测试环境先验证
- **应对措施：**
  - 使用 HTTP 作为临时方案
  - 重新生成证书
  - 检查 Nginx 配置

**风险 4：性能不达标**
- **预防措施：**
  - 进行压力测试
  - 优化数据库查询
  - 使用 CDN 加速
- **应对措施：**
  - 增加服务器资源
  - 优化代码和配置
  - 使用负载均衡

**风险 5：安全漏洞**
- **预防措施：**
  - 定期更新依赖包
  - 使用强密码和密钥
  - 配置防火墙规则
- **应对措施：**
  - 及时修复漏洞
  - 监控异常访问
  - 准备应急响应方案

**风险 6：数据丢失**
- **预防措施：**
  - 定期自动备份
  - 使用冗余存储
  - 配置数据复制
- **应对措施：**
  - 从备份恢复数据
  - 使用数据恢复工具
  - 联系专业数据恢复服务

---

## 16. 总结

本方案提供了一个完整的开发/生产环境分离解决方案，具有以下特点：

✅ **可操作性**：详细的步骤和脚本，易于执行
✅ **可扩展性**：模块化设计，便于扩展新功能
✅ **安全性**：多层安全措施，保护敏感信息
✅ **自动化**：自动化部署和监控，减少人工操作
✅ **可维护性**：清晰的文档和日志，便于维护

**关键成功因素：**
1. 严格按照步骤执行
2. 充分测试后再部署到生产环境
3. 定期备份和监控
4. 及时处理问题和优化性能

**预期效果：**
- 开发环境快速启动，便于功能迭代
- 生产环境稳定运行，支持高并发
- 数据安全可靠，可快速恢复
- 运维自动化，减少人工干预
- SSL 证书自动管理，无需手动续期

**下一步行动：**
1. 根据本方案创建缺失的脚本文件
2. 在本地测试完整部署流程
3. 部署到生产环境
4. 配置监控和告警
5. 定期优化和维护
