#!/bin/sh
set -eu

echo "🔄 检查证书续期..."
certbot renew --quiet --deploy-hook "nginx -s reload"
echo "✅ 证书续期检查完成"
