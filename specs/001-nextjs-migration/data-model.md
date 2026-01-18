# Phase 1: Data Model - Next.js App Router 迁移

**Feature Branch**: `001-nextjs-migration`  
**Created**: 2026-01-18  
**Status**: Complete

---

## 1. 核心实体定义

### 1.1 Product (产品)

```typescript
// content/products.ts

interface Product {
  /** 唯一标识符，用于 URL slug */
  slug: string
  /** 产品名称 */
  name: string
  /** 产品简短描述 */
  shortDescription: string
  /** 产品详细描述 */
  description: string
  /** 产品分类 */
  category: ProductCategory
  /** 主图片 URL */
  image: string
  /** 产品图库 */
  gallery?: string[]
  /** 产品特性列表 */
  features: ProductFeature[]
  /** 技术规格 */
  specifications?: Record<string, string>
  /** 是否在首页展示 */
  featured: boolean
  /** 排序权重 (越大越靠前) */
  order: number
}

interface ProductFeature {
  title: string
  description: string
  icon?: string
}

type ProductCategory = 
  | 'smart-devices'      // 智能设备
  | 'monitoring-systems' // 监控系统
  | 'software-platforms' // 软件平台
  | 'accessories'        // 配件
```

**验证规则**:
- `slug`: 必填，唯一，仅允许小写字母、数字、连字符
- `name`: 必填，最大长度 100 字符
- `shortDescription`: 必填，最大长度 200 字符
- `image`: 必填，有效的图片 URL

---

### 1.2 Solution (解决方案)

```typescript
// content/solutions.ts

interface Solution {
  /** 唯一标识符，用于 URL slug */
  slug: string
  /** 方案名称 */
  name: string
  /** 方案简短描述 */
  shortDescription: string
  /** 方案详细描述 */
  description: string
  /** 适用行业/场景 */
  industry: SolutionIndustry
  /** 主图片 URL */
  image: string
  /** 方案亮点 */
  highlights: SolutionHighlight[]
  /** 关联产品 slug 列表 */
  relatedProducts: string[]
  /** 案例研究 */
  caseStudies?: CaseStudy[]
  /** 排序权重 */
  order: number
}

interface SolutionHighlight {
  title: string
  description: string
  icon?: string
}

interface CaseStudy {
  title: string
  client: string
  description: string
  image?: string
  results?: string[]
}

type SolutionIndustry = 
  | 'highway'       // 高速公路
  | 'urban-traffic' // 城市交通
  | 'construction'  // 施工工地
  | 'parking'       // 停车场
  | 'other'         // 其他
```

**验证规则**:
- `slug`: 必填，唯一，仅允许小写字母、数字、连字符
- `name`: 必填，最大长度 100 字符
- `industry`: 必填，必须是预定义的行业类型

---

### 1.3 NewsArticle (新闻资讯)

```typescript
// content/news.ts

interface NewsArticle {
  /** 唯一标识符，用于 URL slug */
  slug: string
  /** 文章标题 */
  title: string
  /** 文章摘要 */
  excerpt: string
  /** 文章正文 (Markdown 或 HTML) */
  content: string
  /** 文章分类 */
  category: NewsCategory
  /** 标签列表 */
  tags: string[]
  /** 封面图片 URL */
  coverImage: string
  /** 作者信息 */
  author: Author
  /** 发布日期 (ISO 8601) */
  publishedAt: string
  /** 更新日期 (ISO 8601) */
  updatedAt?: string
  /** 阅读次数 */
  viewCount?: number
  /** 关联产品 slug 列表 */
  relatedProducts?: string[]
  /** 是否置顶 */
  featured: boolean
}

interface Author {
  name: string
  avatar?: string
  department?: string
}

type NewsCategory = 
  | 'company-news'    // 公司新闻
  | 'product-updates' // 产品动态
  | 'industry-trends' // 行业成果
  | 'tech-sharing'    // 技术分享
```

**验证规则**:
- `slug`: 必填，唯一
- `title`: 必填，最大长度 200 字符
- `publishedAt`: 必填，有效的 ISO 8601 日期格式
- `category`: 必填，必须是预定义的分类

---

### 1.4 Page (页面)

```typescript
// 页面元数据类型定义

interface PageMetadata {
  /** 页面标题 */
  title: string
  /** 页面描述 */
  description: string
  /** Open Graph 图片 */
  ogImage?: string
  /** 关键词 */
  keywords?: string[]
  /** 是否禁止索引 */
  noIndex?: boolean
}

interface PageConfig {
  /** 路由路径 */
  path: string
  /** 渲染策略 */
  renderingStrategy: 'ssg' | 'ssr' | 'isr' | 'csr'
  /** ISR 重新验证时间 (秒) */
  revalidate?: number
  /** 是否为动态路由 */
  dynamic: boolean
}
```

---

### 1.5 Navigation (导航)

```typescript
// content/navigation.ts

interface NavItem {
  /** 导航项名称 */
  name: string
  /** 链接路径 */
  path: string
  /** 子菜单项 */
  children?: NavItem[]
  /** 是否在移动端显示 */
  showOnMobile: boolean
}

interface FooterSection {
  /** 分区标题 */
  title: string
  /** 链接列表 */
  links: FooterLink[]
}

interface FooterLink {
  name: string
  href: string
  external?: boolean
}
```

---

## 2. 实体关系图

```
┌─────────────┐     references     ┌─────────────┐
│   Product   │◄──────────────────│  Solution   │
│             │                    │             │
│ - slug      │                    │ - slug      │
│ - name      │                    │ - name      │
│ - category  │                    │ - industry  │
└─────────────┘                    └─────────────┘
       ▲                                  ▲
       │ references                       │ references
       │                                  │
┌──────┴──────┐                           │
│ NewsArticle │───────────────────────────┘
│             │
│ - slug      │
│ - title     │
│ - category  │
└─────────────┘
```

---

## 3. 内容数据文件结构

```text
content/
├── index.ts              # 导出所有内容获取函数
├── products.ts           # 产品数据和获取函数
├── solutions.ts          # 解决方案数据和获取函数
├── news.ts               # 新闻资讯数据和获取函数
├── navigation.ts         # 导航配置
└── site-config.ts        # 网站全局配置
```

### 内容获取函数接口

```typescript
// content/index.ts

// 产品
export function getAllProducts(): Product[]
export function getProductBySlug(slug: string): Product | undefined
export function getProductsByCategory(category: ProductCategory): Product[]
export function getFeaturedProducts(): Product[]

// 解决方案
export function getAllSolutions(): Solution[]
export function getSolutionBySlug(slug: string): Solution | undefined
export function getSolutionsByIndustry(industry: SolutionIndustry): Solution[]

// 新闻
export function getAllNews(): NewsArticle[]
export function getNewsBySlug(slug: string): NewsArticle | undefined
export function getNewsByCategory(category: NewsCategory): NewsArticle[]
export function getRecentNews(limit?: number): NewsArticle[]
export function getRelatedNews(articleSlug: string, limit?: number): NewsArticle[]
```

---

## 4. 状态管理

### 4.1 客户端状态 (React Context)

```typescript
// components/providers/NavigationContext.tsx
interface NavigationState {
  isScrolled: boolean
  isMobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

// components/providers/ThemeContext.tsx
interface ThemeState {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}
```

### 4.2 服务端状态

无需复杂状态管理，内容数据通过静态导入或 fetch 获取。

---

## 5. 类型导出

```typescript
// types/index.ts

export type {
  Product,
  ProductCategory,
  ProductFeature,
  Solution,
  SolutionIndustry,
  SolutionHighlight,
  CaseStudy,
  NewsArticle,
  NewsCategory,
  Author,
  PageMetadata,
  PageConfig,
  NavItem,
  FooterSection,
  FooterLink,
}
```
