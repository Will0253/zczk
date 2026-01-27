#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
COMPOSE_FILE="$ROOT_DIR/ops/docker/docker-compose.prod.yml"
ENV_FILE="$ROOT_DIR/ops/.env.prod"

TARGET_REF=${1:-""}
if [ -z "$TARGET_REF" ]; then
  echo "❌ 用法: ./ops/rollback.sh <git-ref>"
  exit 1
fi

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ 错误: ops/.env.prod 不存在"
  exit 1
fi

cd "$ROOT_DIR"

echo "⏪ 回滚到版本: $TARGET_REF"

git fetch --all --prune

git checkout "$TARGET_REF"

echo "📦 重新构建镜像..."
docker compose -f "$COMPOSE_FILE" build --no-cache

echo "🚀 启动服务..."
docker compose -f "$COMPOSE_FILE" up -d

echo "🔍 健康检查..."
sleep 10

DOMAIN=$(grep "DOMAINS=" "$ENV_FILE" | cut -d'=' -f2 | cut -d',' -f1)

if curl -f "https://$DOMAIN/healthz" > /dev/null 2>&1; then
  echo "✅ 前端健康检查通过"
else
  echo "❌ 前端健康检查失败"
  exit 1
fi

if curl -f "https://$DOMAIN/api/healthz" > /dev/null 2>&1; then
  echo "✅ 后端健康检查通过"
else
  echo "❌ 后端健康检查失败"
  exit 1
fi

echo "✅ 回滚完成"
