import type { NewsArticle, NewsCategory } from '@/types/news'

export const newsCategories: NewsCategory[] = [
  { id: 'all', name: '全部', count: 10 },
  { id: 'product', name: '产品动态', count: 4 },
  { id: 'tech', name: '技术迭代', count: 3 },
  { id: 'standard', name: '标准制定', count: 2 },
  { id: 'company', name: '公司新闻', count: 1 },
]

export const newsArticles: NewsArticle[] = [
  {
    slug: '5g-smart-cone',
    title: 'ZCZ发布全新5G智能锥桶系统：重新定义高速公路智慧养护安全标准',
    summary: '集成最新V2X通信技术与高精度北斗定位模块，标志着安全管理进入数字化感知时代。',
    content: `
## 全新5G智能锥桶系统发布

中创智控正式发布全新一代5G智能锥桶系统，这一革命性产品将重新定义高速公路智慧养护的安全标准。

### 核心技术突破

- **V2X通信技术**：实现车路协同，提前预警过往车辆
- **高精度北斗定位**：RTK级亚米定位精度
- **5G低延迟传输**：毫秒级数据上报

### 应用场景

新一代智能锥桶适用于：
1. 高速公路养护施工区
2. 城市道路临时管制
3. 应急事故现场布设

### 市场意义

此次发布标志着交通安全管理正式进入数字化感知时代，为智慧交通基础设施建设提供了坚实的技术支撑。
    `,
    category: 'product',
    image: '/images/products/smart-cone.jpg',
    publishedAt: '2023-10-15',
    author: '中创智控',
    featured: true,
    tags: ['5G', '智能锥桶', 'V2X', '北斗定位'],
  },
  {
    slug: 'sound-field-upgrade',
    title: '智能声场预警系统迭代升级，高声压技术突破 148dB',
    summary: '500 米范围精准覆盖，雨天自动切换专属预警语音',
    content: `
## 声场预警系统重大升级

经过一年的技术攻关，智能声场预警系统迎来重大升级，峰值声压突破148dB。

### 技术亮点

- 500米精准覆盖范围
- 148dB峰值声压
- 智能天气感知，自动切换预警语音
- 支持远程OTA升级
    `,
    category: 'tech',
    image: 'https://images.unsplash.com/photo-1663455256102-3892f6b33ab2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    publishedAt: '2025-10-15',
    author: '中创智控',
    featured: true,
    tags: ['声场预警', '技术升级'],
  },
  {
    slug: 'traffic-safety-standard',
    title: '中创智控受邀参与智慧交通安全设备标准研讨',
    summary: '助力《"十四五"全国道路交通安全规划》落地实施',
    content: `
## 参与国家标准研讨

中创智控作为智慧交通安全领域的领军企业，受邀参与智慧交通安全设备标准研讨会。

### 会议内容

本次会议围绕《"十四五"全国道路交通安全规划》展开讨论，重点研讨：

1. 智能预警设备技术标准
2. 数据互联互通规范
3. 安全评估体系建设
    `,
    category: 'standard',
    image: 'https://images.unsplash.com/photo-1560523159-94c9d18bcf27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    publishedAt: '2025-09-30',
    author: '中创智控',
    featured: false,
    tags: ['行业标准', '十四五规划'],
  },
]

// 数据获取函数
export function getAllNews(): NewsArticle[] {
  return newsArticles.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find(n => n.slug === slug)
}

export function getNewsByCategory(category: string): NewsArticle[] {
  if (category === 'all') return getAllNews()
  return newsArticles
    .filter(n => n.category === category)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getFeaturedNews(): NewsArticle[] {
  return newsArticles
    .filter(n => n.featured)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getRecentNews(limit: number = 3): NewsArticle[] {
  return getAllNews().slice(0, limit)
}

export function getAllNewsSlugs(): string[] {
  return newsArticles.map(n => n.slug)
}
