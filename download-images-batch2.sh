#!/bin/bash

# 第二批图片下载脚本
# 用于下载剩余的外部图片到本地

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_ROOT="/Users/will/Downloads/figma/zczk"
PUBLIC_DIR="${PROJECT_ROOT}/public/images"

echo -e "${BLUE}开始下载第二批图片到本地...${NC}\n"

# 创建必要的目录
mkdir -p "${PUBLIC_DIR}/contact"
mkdir -p "${PUBLIC_DIR}/highway"
mkdir -p "${PUBLIC_DIR}/about"
mkdir -p "${PUBLIC_DIR}/news"
mkdir -p "${PUBLIC_DIR}/case-studies"
mkdir -p "${PUBLIC_DIR}/product-matrix"
mkdir -p "${PUBLIC_DIR}/business-scenarios"
mkdir -p "${PUBLIC_DIR}/textures"

# Contact 页面图片
echo -e "${GREEN}下载 Contact 页面图片...${NC}"
curl -L "https://images.unsplash.com/photo-1475823678248-624fc6f85785" \
  -o "${PUBLIC_DIR}/contact/contact-1.jpg"
curl -L "https://images.unsplash.com/photo-1647866427893-0057366e91b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" \
  -o "${PUBLIC_DIR}/contact/contact-2.jpg"
curl -L "https://images.unsplash.com/photo-1758448721149-aa0ce8e1b2c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" \
  -o "${PUBLIC_DIR}/contact/contact-3.jpg"
curl -L "https://images.unsplash.com/photo-1758872014553-f0deb7b12d58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200" \
  -o "${PUBLIC_DIR}/contact/contact-hero.jpg"

# HighwaySolutionDetail 页面图片
echo -e "${GREEN}下载 HighwaySolutionDetail 页面图片...${NC}"
curl -L "https://images.unsplash.com/photo-1765121689955-a868472089d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" \
  -o "${PUBLIC_DIR}/highway/slow-lane.jpg"
curl -L "https://images.unsplash.com/photo-1757030689668-c7aa2975ca95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" \
  -o "${PUBLIC_DIR}/highway/fast-lane.jpg"
curl -L "https://images.unsplash.com/photo-1763569026025-17f15c1012a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFmZmljJTIwd2FybmluZyUyMGNvbmV8ZW58MXx8fHwxNzY2NDE4NDM1fDA&ixlib=rb-4.1.0&q=80&w=1080" \
  -o "${PUBLIC_DIR}/highway/traffic-warning-cone.jpg"
curl -L "https://images.unsplash.com/photo-1618212624057-3ce6e5819cc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZldHklMjBzaG91bGRlciUyMGxpZ2h0fGVufDF8fHx8MTc2NjQxODQzNXww&ixlib=rb-4.1.0&q=80&w=1080" \
  -o "${PUBLIC_DIR}/highway/safety-shoulder-light.jpg"
curl -L "https://images.unsplash.com/photo-1625465588028-458f59e19ee6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3Rpb24lMjBzZW5zb3IlMjBhbGFybSUyMGRldmljZXxlbnwxfHx8fDE3NjY0MTg0MzV8MA&ixlib=rb-4.1.0&q=80&w=1080" \
  -o "${PUBLIC_DIR}/highway/motion-sensor-alarm.jpg"
curl -L "https://images.unsplash.com/photo-1648522168473-dfec1d2a5cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY291c3RpYyUyMGhhaWxpbmclMjBkZXZpY2UlMjBtZWdhcGhvbmV8ZW58MXx8fHwxNzY2NDE4NDM1fDA&ixlib=rb-4.1.0&q=80&w=1080" \
  -o "${PUBLIC_DIR}/highway/acoustic-hailing-device.jpg"
curl -L "https://images.unsplash.com/photo-1682315847217-4226cfcdd250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHNhZmV0eSUyMGhlbG1ldCUyMGNhbWVyYXxlbnwxfHx8fDE3NjY0MTg0MzV8MA&ixlib=rb-4.1.0&q=80&w=1080" \
  -o "${PUBLIC_DIR}/highway/smart-helmet-camera.jpg"
curl -L "https://images.unsplash.com/photo-1666613789626-e8b9352639fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdHolMjBkb21lJTIwY2FtZXJhJTIwc2VjdXJpdHl8ZW58MXx8fHwxNzY2NDE4NDM1fDA&ixlib=rb-4.1.0&q=80&w=1080" \
  -o "${PUBLIC_DIR}/highway/dome-camera.jpg"

# About 页面图片
echo -e "${GREEN}下载 About 页面图片...${NC}"
curl -L "https://images.unsplash.com/photo-1749006590475-4592a5dbf99f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" \
  -o "${PUBLIC_DIR}/about/about-hero.jpg"
curl -L "https://images.unsplash.com/photo-1759884247387-a5d791ffb2bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100" \
  -o "${PUBLIC_DIR}/about/avatar.jpg"
curl -L "https://images.unsplash.com/photo-1737531691773-2d4f1b79f650?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" \
  -o "${PUBLIC_DIR}/about/tech-dashboard.jpg"
curl -L "https://images.unsplash.com/photo-1762599180260-deb643596e99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" \
  -o "${PUBLIC_DIR}/about/company-vision.jpg"
curl -L "https://images.unsplash.com/photo-1716772912302-6452fea6c2e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" \
  -o "${PUBLIC_DIR}/about/hardware-detail.jpg"

# News 图片
echo -e "${GREEN}下载 News 图片...${NC}"
curl -L "https://images.unsplash.com/photo-1663455256102-3892f6b33ab2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" \
  -o "${PUBLIC_DIR}/news/news-2.jpg"
curl -L "https://images.unsplash.com/photo-1560523159-94c9d18bcf27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" \
  -o "${PUBLIC_DIR}/news/news-3.jpg"

# CaseStudies 图片
echo -e "${GREEN}下载 CaseStudies 图片...${NC}"
curl -L "https://images.unsplash.com/photo-1765121689955-a868472089d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdod2F5JTIwY29uc3RydWN0aW9uJTIwc2FmZXR5fGVufDF8fHx8MTc2NjI1NTIwMHww&ixlib=rb-4.1.0&q=80&w=1080" \
  -o "${PUBLIC_DIR}/case-studies/highway-safety.jpg"
curl -L "https://images.unsplash.com/photo-1757030689668-c7aa2975ca95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FkJTIwbWFpbnRlbmFuY2UlMjB3b3JrZXJzfGVufDF8fHx8MTc2NjI1NTIwMHww&ixlib=rb-4.1.0&q=80&w=1080" \
  -o "${PUBLIC_DIR}/case-studies/road-maintenance.jpg"
curl -L "https://images.unsplash.com/photo-1630509867030-b7d68c7a3098?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdod2F5JTIwdG9sbCUyMHN0YXRpb258ZW58MXx8fHwxNzY2MjU1MjY0fDA&ixlib=rb-4.1.0&q=80&w=1080" \
  -o "${PUBLIC_DIR}/case-studies/toll-station.jpg"

# ProductMatrix 图片
echo -e "${GREEN}下载 ProductMatrix 图片...${NC}"
curl -L "https://images.unsplash.com/photo-1763569026025-17f15c1012a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFmZmljJTIwc2FmZXR5JTIwY29uZXxlbnwxfHx8fDE3NjYyNTc2ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" \
  -o "${PUBLIC_DIR}/product-matrix/traffic-safety-cone.jpg"
curl -L "https://images.unsplash.com/photo-1692830203762-9b46dd6e4dc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJ2ZWlsbGFuY2UlMjBjYW1lcmElMjBiYWxsfGVufDF8fHx8MTc2NjI1NzY4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" \
  -o "${PUBLIC_DIR}/product-matrix/surveillance-camera-ball.jpg"
curl -L "https://images.unsplash.com/photo-1686709709573-a877d7012cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVha2VyJTIwc291bmQlMjBzeXN0ZW18ZW58MXx8fHwxNzY2MjU3NjgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" \
  -o "${PUBLIC_DIR}/product-matrix/speaker-sound-system.jpg"
curl -L "https://images.unsplash.com/photo-1763235851965-9efe071e8bb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWQlMjBzYWZldHklMjBsaWdodHxlbnwxfHx8fDE3NjYyNTc2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" \
  -o "${PUBLIC_DIR}/product-matrix/led-safety-light.jpg"
curl -L "https://images.unsplash.com/photo-1750710583720-8b3bdd0f658a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHRlY2hub2xvZ3klMjBoYXJkd2FyZXxlbnwxfHx8fDE3NjYyNTc2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" \
  -o "${PUBLIC_DIR}/product-matrix/smart-technology-hardware.jpg"
curl -L "https://images.unsplash.com/photo-1632080974800-8caa9c8e5337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWhpY2xlJTIwd2FybmluZyUyMGRldmljZXxlbnwxfHx8fDE3NjYyNTc2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" \
  -o "${PUBLIC_DIR}/product-matrix/vehicle-warning-device.jpg"

# BusinessScenarios 图片
echo -e "${GREEN}下载 BusinessScenarios 图片...${NC}"
curl -L "https://images.unsplash.com/photo-1765121689955-a868472089d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" \
  -o "${PUBLIC_DIR}/business-scenarios/highway-construction.jpg"
curl -L "https://images.unsplash.com/photo-1757030689668-c7aa2975ca95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" \
  -o "${PUBLIC_DIR}/business-scenarios/road-maintenance.jpg"
curl -L "https://images.unsplash.com/photo-1766060735908-eb10ee2a7cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" \
  -o "${PUBLIC_DIR}/business-scenarios/bridge-inspection.jpg"

# 纹理图片
echo -e "${GREEN}下载纹理图片...${NC}"
curl -L "https://grainy-gradients.vercel.app/noise.svg" \
  -o "${PUBLIC_DIR}/textures/noise.svg"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}所有图片下载完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "图片已保存到以下目录："
echo "  - Contact: ${PUBLIC_DIR}/contact/"
echo "  - Highway: ${PUBLIC_DIR}/highway/"
echo "  - About: ${PUBLIC_DIR}/about/"
echo "  - News: ${PUBLIC_DIR}/news/"
echo "  - CaseStudies: ${PUBLIC_DIR}/case-studies/"
echo "  - ProductMatrix: ${PUBLIC_DIR}/product-matrix/"
echo "  - BusinessScenarios: ${PUBLIC_DIR}/business-scenarios/"
echo "  - Textures: ${PUBLIC_DIR}/textures/"
echo ""
echo "下一步：更新代码中的图片路径引用"
