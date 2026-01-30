#!/usr/bin/env sh
set -eu

if [ -z "${DOMAINS:-}" ]; then
  echo "DOMAINS is required"
  exit 1
fi

if [ -z "${LETSENCRYPT_EMAIL:-}" ]; then
  echo "LETSENCRYPT_EMAIL is required"
  exit 1
fi

DOMAINS_ARGS=""
IFS=","
for domain in $DOMAINS; do
  trimmed=$(echo "$domain" | xargs)
  if [ -n "$trimmed" ]; then
    DOMAINS_ARGS="$DOMAINS_ARGS -d $trimmed"
  fi
done

if [ -z "$DOMAINS_ARGS" ]; then
  echo "No valid domains provided"
  exit 1
fi

certbot certonly --standalone --non-interactive --agree-tos \
  --email "$LETSENCRYPT_EMAIL" \
  --http-01-address 0.0.0.0 \
  --http-01-port 80 \
  --keep-until-expiring \
  $DOMAINS_ARGS
