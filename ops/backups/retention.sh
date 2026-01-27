#!/usr/bin/env bash
set -euo pipefail

BACKUP_DIR=${BACKUP_DIR:-/backups}
RETENTION_DAYS=${RETENTION_DAYS:-7}

if [ ! -d "$BACKUP_DIR" ]; then
  echo "❌ 备份目录不存在: $BACKUP_DIR"
  exit 1
fi

echo "🧹 清理超过 ${RETENTION_DAYS} 天的备份文件..."
find "$BACKUP_DIR" -type f \( -name "db_*.sql" -o -name "media_*.tar.gz" \) -mtime +"$RETENTION_DAYS" -print -delete

echo "✅ 清理完成"
