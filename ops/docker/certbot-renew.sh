#!/bin/sh
set -eu

echo "🔄 检查证书续期..."
certbot renew --quiet
echo "✅ 证书续期检查完成"
echo "ℹ️  如证书发生更新，请在宿主机执行: docker compose -f ops/docker/docker-compose.prod.yml exec -T nginx nginx -s reload"
