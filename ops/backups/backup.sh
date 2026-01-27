#!/usr/bin/env bash
set -euo pipefail

BACKUP_DIR=${BACKUP_DIR:-/backups}
MEDIA_DIR=${MEDIA_DIR:-/app/public/uploads}
RETENTION_DAYS=${RETENTION_DAYS:-7}

POSTGRES_DB=${POSTGRES_DB:-zczk}
POSTGRES_USER=${POSTGRES_USER:-zczk}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-""}
POSTGRES_HOST=${POSTGRES_HOST:-postgres}
POSTGRES_PORT=${POSTGRES_PORT:-5432}

mkdir -p "$BACKUP_DIR"

TS=$(date +%Y%m%d_%H%M%S)
DB_FILE="$BACKUP_DIR/db_${POSTGRES_DB}_${TS}.sql"
MEDIA_FILE="$BACKUP_DIR/media_${TS}.tar.gz"

export PGPASSWORD="$POSTGRES_PASSWORD"

echo "📦 备份数据库..."
pg_dump -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" "$POSTGRES_DB" > "$DB_FILE"

echo "📦 备份媒体文件..."
if [ -d "$MEDIA_DIR" ]; then
  tar -czf "$MEDIA_FILE" -C "$MEDIA_DIR" .
else
  echo "⚠️  未找到媒体目录: $MEDIA_DIR"
fi

echo "✅ 备份完成：$DB_FILE"
