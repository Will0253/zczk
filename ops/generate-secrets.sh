#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
ENV_FILE="$ROOT_DIR/.env.prod"

DOMAIN=${1:-""}
if [ -z "$DOMAIN" ]; then
  read -r -p "请输入生产域名（如 szzczk.com）: " DOMAIN
fi

if [ -z "$DOMAIN" ]; then
  echo "❌ 域名不能为空"
  exit 1
fi

read -r -p "请输入 Let's Encrypt 邮箱: " LETSENCRYPT_EMAIL
if [ -z "$LETSENCRYPT_EMAIL" ]; then
  echo "❌ 邮箱不能为空"
  exit 1
fi

DOMAINS="$DOMAIN"
if [[ "$DOMAIN" != *","* ]] && [[ "$DOMAIN" != www.* ]]; then
  DOMAINS="$DOMAIN,www.$DOMAIN"
fi

rand_hex() {
  openssl rand -hex 32
}

APP_KEYS="$(rand_hex),$(rand_hex),$(rand_hex),$(rand_hex)"
API_TOKEN_SALT="$(rand_hex)"
ADMIN_JWT_SECRET="$(rand_hex)"
TRANSFER_TOKEN_SALT="$(rand_hex)"
JWT_SECRET="$(rand_hex)"
ENCRYPTION_KEY="$(rand_hex)"
POSTGRES_PASSWORD="$(rand_hex)"

if [ -f "$ENV_FILE" ]; then
  cp "$ENV_FILE" "$ENV_FILE.bak.$(date +%Y%m%d%H%M%S)"
fi

cat > "$ENV_FILE" <<EOF
NODE_ENV=production
NEXT_PUBLIC_STRAPI_URL=https://$DOMAIN
DOMAINS=$DOMAINS
LETSENCRYPT_EMAIL=$LETSENCRYPT_EMAIL

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=zczk
DATABASE_USERNAME=zczk
DATABASE_PASSWORD=$POSTGRES_PASSWORD

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
EOF

echo "✅ 已生成生产环境变量文件: $ENV_FILE"
