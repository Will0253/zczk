#!/usr/bin/env bash
set -euo pipefail

BACKUP_FILE=${1:-""}
MEDIA_FILE=${2:-""}

if [ -z "$BACKUP_FILE" ]; then
  echo "❌ 用法: ./restore.sh <db_backup.sql> [media.tar.gz]"
  exit 1
fi

POSTGRES_DB=${POSTGRES_DB:-zczk}
POSTGRES_USER=${POSTGRES_USER:-zczk}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-""}
POSTGRES_HOST=${POSTGRES_HOST:-postgres}
POSTGRES_PORT=${POSTGRES_PORT:-5432}
MEDIA_DIR=${MEDIA_DIR:-/app/public/uploads}

export PGPASSWORD="$POSTGRES_PASSWORD"

echo "♻️  恢复数据库..."
psql -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f "$BACKUP_FILE"

echo "♻️  恢复媒体文件..."
if [ -n "$MEDIA_FILE" ] && [ -f "$MEDIA_FILE" ]; then
  mkdir -p "$MEDIA_DIR"
  tar -xzf "$MEDIA_FILE" -C "$MEDIA_DIR"
fi

echo "✅ 恢复完成"
