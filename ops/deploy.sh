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

DOMAIN=$(grep "DOMAINS=" "$ENV_FILE" | cut -d'=' -f2 | cut -d',' -f1)

wait_for_health() {
  local service="$1"
  local timeout_seconds="${2:-180}"
  local start
  start=$(date +%s)
  echo "⏳ 等待 $service 健康检查就绪（最长 ${timeout_seconds}s）..."
  while true; do
    local status
    local container_id
    container_id=$(docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" ps -q "$service" 2>/dev/null || true)
    status=$(docker inspect --format '{{.State.Health.Status}}' "$container_id" 2>/dev/null || true)
    if [ "$status" = "healthy" ]; then
      echo "✅ $service 已 healthy"
      return 0
    fi

    local now
    now=$(date +%s)
    if [ $((now - start)) -ge "$timeout_seconds" ]; then
      echo "❌ 等待 $service healthy 超时"
      docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" ps
      docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" logs --tail=200 "$service" || true
      return 1
    fi
    sleep 3
  done
}

curl_check() {
  local url="$1"
  curl -fsS --connect-timeout 3 --max-time 10 \
    --retry 30 --retry-connrefused --retry-delay 2 \
    "$url" > /dev/null
}

echo "📦 构建镜像..."
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" build

echo "⏹️  停止旧容器..."
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" down

echo "🚀 启动基础服务..."
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" up -d postgres backend frontend

wait_for_health postgres 180
wait_for_health backend 240
wait_for_health frontend 240

if ! docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" run --rm --entrypoint /bin/sh certbot -c "test -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem" 2>/dev/null; then
  echo "⚠️  证书不存在，请先初始化证书:"
  echo "   docker compose --env-file ops/.env.prod -f ops/docker/docker-compose.prod.yml run --rm --service-ports certbot /opt/init-cert.sh"
  exit 1
fi

echo "🌐 启动 Nginx..."
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" up -d nginx

echo "🔍 健康检查..."

wait_for_health nginx 180

if curl_check "https://$DOMAIN/healthz"; then
  echo "✅ 前端健康检查通过"
else
  echo "❌ 前端健康检查失败"
  docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" logs --tail=200 nginx frontend || true
  exit 1
fi

if curl_check "https://$DOMAIN/api/healthz"; then
  echo "✅ 后端健康检查通过"
else
  echo "❌ 后端健康检查失败"
  docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" logs --tail=200 nginx backend || true
  exit 1
fi

echo "✅ 部署完成！"
echo "🌐 访问地址: https://$DOMAIN"
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" ps
