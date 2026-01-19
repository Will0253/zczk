#!/bin/bash

# 图片下载脚本
# 用于从 Unsplash 下载图片到本地

set -e

# 定义颜色
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 项目根目录
PROJECT_ROOT="/Users/will/Downloads/figma/zczk"
PUBLIC_DIR="${PROJECT_ROOT}/public/images"

echo -e "${BLUE}开始下载图片到本地...${NC}\n"

# 产品图片
echo -e "${GREEN}下载产品图片...${NC}"

# 智能声光预警哨兵
curl -L "https://images.unsplash.com/photo-1673797830131-f91f04593e46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" \
  -o "${PUBLIC_DIR}/products/smart-sentinel.jpg"

# 中创智控二代布控球
curl -L "https://images.unsplash.com/photo-1688584177352-a40d4ba17561?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" \
  -o "${PUBLIC_DIR}/products/control-ball-v2.jpg"

# 智能预警锥桶
curl -L "https://images.unsplash.com/photo-1719580920868-9e7ee4c79a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" \
  -o "${PUBLIC_DIR}/products/smart-cone.jpg"

# 智能定位肩灯
curl -L "https://images.unsplash.com/photo-1652148555073-4b1d2ecd664c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" \
  -o "${PUBLIC_DIR}/products/smart-shoulder-light.jpg"

# 智能声场预警系统
curl -L "https://images.unsplash.com/photo-1687858477673-267e301cb186?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" \
  -o "${PUBLIC_DIR}/products/sound-field-warning.jpg"

# 车载防撞预警系统
curl -L "https://images.unsplash.com/photo-1626284142614-d8af54be478c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" \
  -o "${PUBLIC_DIR}/products/vehicle-collision-warning.jpg"

# 便携式强声器
curl -L "https://images.unsplash.com/photo-1648522168473-dfec1d2a5cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" \
  -o "${PUBLIC_DIR}/products/portable-loudspeaker.jpg"

# 中创智控二代4G智能安全帽
curl -L "https://images.unsplash.com/photo-1701522814779-2d0e40de3370?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" \
  -o "${PUBLIC_DIR}/products/smart-helmet-4g.jpg"

# 中创智控交通雷达测速仪
curl -L "https://images.unsplash.com/photo-1620599464094-15206d7a2974?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" \
  -o "${PUBLIC_DIR}/products/radar-speed-detector.jpg"

# 事件预警快处置系统
curl -L "https://images.unsplash.com/photo-1729184648234-7650c1484905?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" \
  -o "${PUBLIC_DIR}/products/event-warning-system.jpg"

echo -e "${GREEN}产品图片下载完成！${NC}\n"

# 解决方案图片
echo -e "${GREEN}下载解决方案图片...${NC}"

# 智慧高速养护施工区防闯入预警系统
curl -L "https://images.unsplash.com/photo-1631332419486-daf1322122c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" \
  -o "${PUBLIC_DIR}/solutions/highway-safety.jpg"

# 隧道施工安全与环境综合监测系统
curl -L "https://images.unsplash.com/photo-1722532828784-a4cdc9b73fcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" \
  -o "${PUBLIC_DIR}/solutions/tunnel-monitoring.jpg"

# 大型桥梁结构健康监测解决方案
curl -L "https://images.unsplash.com/photo-1740303226597-6521195103bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" \
  -o "${PUBLIC_DIR}/solutions/bridge-health.jpg"

# 智慧景区交通管理
curl -L "https://images.unsplash.com/photo-1614984582840-fa690383e60c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" \
  -o "${PUBLIC_DIR}/solutions/smart-scenic.jpg"

# 应急指挥调度
curl -L "https://images.unsplash.com/photo-1708807472445-d33589e6b090?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" \
  -o "${PUBLIC_DIR}/solutions/emergency-dispatch.jpg"

echo -e "${GREEN}解决方案图片下载完成！${NC}\n"

# 首页背景图
echo -e "${GREEN}下载首页背景图...${NC}"

curl -L "https://images.unsplash.com/photo-1699602050604-698045645108?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwaW5mcmFzdHJ1Y3R1cmUlMjBzbWFydCUyMGNpdHl8ZW58MXx8fHwxNzY2MzAyMzgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" \
  -o "${PUBLIC_DIR}/hero/hero-background.jpg"

echo -e "${GREEN}首页背景图下载完成！${NC}\n"

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}所有图片下载完成！${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo "图片已保存到以下目录："
echo "  - 产品图片: ${PUBLIC_DIR}/products/"
echo "  - 解决方案图片: ${PUBLIC_DIR}/solutions/"
echo "  - 首页背景图: ${PUBLIC_DIR}/hero/"
echo ""
echo "下一步：更新代码中的图片路径引用"
