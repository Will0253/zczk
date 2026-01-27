#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
COMPOSE_FILE="$ROOT_DIR/ops/docker/docker-compose.prod.yml"
ENV_FILE="$ROOT_DIR/ops/.env.prod"

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ 错误: ops/.env.prod 不存在"
  echo "💡 请先运行: ./ops/generate-secrets.sh <domain>"
  exit 1
fi

cd "$ROOT_DIR"

echo "🚀 开始部署生产环境..."

echo "📦 构建镜像..."
docker compose -f "$COMPOSE_FILE" build

echo "⏹️  停止旧容器..."
docker compose -f "$COMPOSE_FILE" down

echo "🚀 启动基础服务..."
docker compose -f "$COMPOSE_FILE" up -d postgres backend frontend

echo "⏳ 等待服务启动..."
sleep 30

if ! docker compose -f "$COMPOSE_FILE" exec -T nginx ls /etc/letsencrypt/live/szczk.com/fullchain.pem 2>/dev/null; then
  echo "⚠️  证书不存在，请先初始化证书:"
  echo "   docker compose -f ops/docker/docker-compose.prod.yml run --rm certbot /opt/init-cert.sh"
  exit 1
fi

echo "🌐 启动 Nginx 与 Certbot..."
docker compose -f "$COMPOSE_FILE" up -d nginx certbot

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

echo "✅ 部署完成！"
echo "🌐 访问地址: https://$DOMAIN"
docker compose -f "$COMPOSE_FILE" ps
