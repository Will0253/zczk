# Phase 1: Route Contracts - Next.js App Router 迁移

**Feature Branch**: `001-nextjs-migration`  
**Created**: 2026-01-18  
**Status**: Complete

---

## 1. 路由结构概览

```text
app/
├── layout.tsx              # Root Layout
├── page.tsx                # / (首页)
├── loading.tsx             # 全局加载
├── not-found.tsx           # 404
├── error.tsx               # 错误边界
│
├── about/
│   └── page.tsx            # /about (关于我们)
│
├── products/
│   ├── page.tsx            # /products (产品中心)
│   └── [slug]/
│       └── page.tsx        # /products/:slug (产品详情)
│
├── solutions/
│   ├── page.tsx            # /solutions (解决方案)
│   └── [slug]/
│       └── page.tsx        # /solutions/:slug (方案详情)
│
├── news/
│   ├── page.tsx            # /news (资讯中心)
│   └── [slug]/
│       └── page.tsx        # /news/:slug (新闻详情)
│
└── contact/
    └── page.tsx            # /contact (联系我们)
```

---

## 2. 路由详细定义

### 2.1 首页 (/)

| 属性 | 值 |
|------|-----|
| **路径** | `/` |
| **文件** | `app/page.tsx` |
| **渲染策略** | SSG (Static Site Generation) |
| **组件类型** | Server Component |
| **元数据** | 静态 |

**页面结构**:
```tsx
// app/page.tsx
import { Hero } from '@/components/sections/Hero'
import { BusinessScenarios } from '@/components/sections/BusinessScenarios'
import { ProductMatrix } from '@/components/sections/ProductMatrix'
import { TechnicalStrength } from '@/components/sections/TechnicalStrength'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { Services } from '@/components/sections/Services'
import { NewsFeed } from '@/components/sections/NewsFeed'

export default function HomePage() {
  return (
    <>
      <Hero />
      <BusinessScenarios />
      <ProductMatrix />
      <TechnicalStrength />
      <CaseStudies />
      <Services />
      <NewsFeed />
    </>
  )
}
```

**元数据**:
```tsx
export const metadata = {
  title: '中创智控 - 智慧交通安全预警系统领导者',
  description: '中创智控专注于智慧交通安全预警系统，提供5G智能锥桶、V2X通信、高速公路养护安全等解决方案。',
}
```

---

### 2.2 关于我们 (/about)

| 属性 | 值 |
|------|-----|
| **路径** | `/about` |
| **文件** | `app/about/page.tsx` |
| **渲染策略** | SSG |
| **组件类型** | Server Component |

**元数据**:
```tsx
export const metadata = {
  title: '关于我们',
  description: '了解中创智控的企业使命、发展历程和核心团队。',
}
```

---

### 2.3 产品中心 (/products)

| 属性 | 值 |
|------|-----|
| **路径** | `/products` |
| **文件** | `app/products/page.tsx` |
| **渲染策略** | SSG + ISR (1小时) |
| **组件类型** | Server Component |

**元数据**:
```tsx
export const metadata = {
  title: '产品中心',
  description: '探索中创智控的智能交通安全产品线，包括智能锥桶、预警系统、监控平台等。',
}

export const revalidate = 3600 // 1小时
```

---

### 2.4 产品详情 (/products/[slug])

| 属性 | 值 |
|------|-----|
| **路径** | `/products/:slug` |
| **文件** | `app/products/[slug]/page.tsx` |
| **渲染策略** | SSG (generateStaticParams) |
| **组件类型** | Server Component |
| **动态参数** | `slug: string` |

**路由参数**:
```typescript
interface ProductDetailParams {
  params: {
    slug: string
  }
}
```

**静态路径生成**:
```tsx
import { getAllProducts } from '@/content/products'

export async function generateStaticParams() {
  const products = getAllProducts()
  return products.map((product) => ({
    slug: product.slug,
  }))
}
```

**动态元数据**:
```tsx
import { getProductBySlug } from '@/content/products'

export async function generateMetadata({ params }) {
  const product = getProductBySlug(params.slug)
  if (!product) return {}
  
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      images: [product.image],
    },
  }
}
```

**已知 Slugs**:
- `smart-cone` - 智能预警锥桶

---

### 2.5 解决方案 (/solutions)

| 属性 | 值 |
|------|-----|
| **路径** | `/solutions` |
| **文件** | `app/solutions/page.tsx` |
| **渲染策略** | SSG |
| **组件类型** | Server Component |

**元数据**:
```tsx
export const metadata = {
  title: '解决方案',
  description: '中创智控为高速公路、城市交通、施工工地等场景提供完整的智慧交通安全解决方案。',
}
```

---

### 2.6 解决方案详情 (/solutions/[slug])

| 属性 | 值 |
|------|-----|
| **路径** | `/solutions/:slug` |
| **文件** | `app/solutions/[slug]/page.tsx` |
| **渲染策略** | SSG (generateStaticParams) |
| **组件类型** | Server Component |
| **动态参数** | `slug: string` |

**静态路径生成**:
```tsx
import { getAllSolutions } from '@/content/solutions'

export async function generateStaticParams() {
  const solutions = getAllSolutions()
  return solutions.map((solution) => ({
    slug: solution.slug,
  }))
}
```

**已知 Slugs**:
- `highway-safety` - 高速公路安全解决方案

---

### 2.7 资讯中心 (/news)

| 属性 | 值 |
|------|-----|
| **路径** | `/news` |
| **文件** | `app/news/page.tsx` |
| **渲染策略** | SSG + ISR (1小时) |
| **组件类型** | Server Component |

**元数据**:
```tsx
export const metadata = {
  title: '资讯中心',
  description: '了解中创智控的最新动态、产品发布和行业观点。',
}

export const revalidate = 3600 // 1小时
```

---

### 2.8 新闻详情 (/news/[slug])

| 属性 | 值 |
|------|-----|
| **路径** | `/news/:slug` |
| **文件** | `app/news/[slug]/page.tsx` |
| **渲染策略** | SSG (generateStaticParams) |
| **组件类型** | Server Component |
| **动态参数** | `slug: string` |

**静态路径生成**:
```tsx
import { getAllNews } from '@/content/news'

export async function generateStaticParams() {
  const articles = getAllNews()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}
```

**已知 Slugs**:
- `5g-smart-cone` - 5G智能锥桶系统发布

---

### 2.9 联系我们 (/contact)

| 属性 | 值 |
|------|-----|
| **路径** | `/contact` |
| **文件** | `app/contact/page.tsx` |
| **渲染策略** | SSG |
| **组件类型** | Server Component (表单部分为 Client) |

**元数据**:
```tsx
export const metadata = {
  title: '联系我们',
  description: '联系中创智控，获取产品咨询、技术支持或商务合作。',
}
```

---

## 3. 特殊路由文件

### 3.1 Root Layout (app/layout.tsx)

```tsx
import type { Metadata } from 'next'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { Providers } from '@/components/providers/Providers'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | 中创智控',
    default: '中创智控 - 智慧交通安全预警系统领导者',
  },
  description: '中创智控专注于智慧交通安全预警系统。',
  metadataBase: new URL('https://www.zczk.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <Providers>
          <ScrollProgress />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
```

### 3.2 Loading State (app/loading.tsx)

```tsx
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#fdbd00]" />
    </div>
  )
}
```

### 3.3 Not Found (app/not-found.tsx)

```tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-[#11345b]">404</h1>
      <p className="mt-4 text-gray-600">页面未找到</p>
      <Link href="/" className="mt-8 px-6 py-3 bg-[#fdbd00] text-[#11345b] rounded-xl font-bold">
        返回首页
      </Link>
    </div>
  )
}
```

### 3.4 Error Boundary (app/error.tsx)

```tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-[#11345b]">出现错误</h2>
      <button onClick={() => reset()} className="mt-4 px-6 py-3 bg-[#fdbd00] rounded-xl">
        重试
      </button>
    </div>
  )
}
```

---

## 4. 路由迁移映射

| 原路由 (React Router) | 新路由 (App Router) | 状态 |
|----------------------|---------------------|------|
| `/` | `app/page.tsx` | 待迁移 |
| `/about` | `app/about/page.tsx` | 待迁移 |
| `/products` | `app/products/page.tsx` | 待迁移 |
| `/products/smart-cone` | `app/products/[slug]/page.tsx` | 待迁移 |
| `/solutions` | `app/solutions/page.tsx` | 待迁移 |
| `/solutions/highway-safety` | `app/solutions/[slug]/page.tsx` | 待迁移 |
| `/news` | `app/news/page.tsx` | 待迁移 |
| `/news/5g-smart-cone` | `app/news/[slug]/page.tsx` | 待迁移 |
| `/contact` | `app/contact/page.tsx` | 待迁移 |

---

## 5. 导航链接更新

所有内部链接需从 `react-router-dom` 的 `Link` 迁移至 `next/link`：

```tsx
// Before (React Router)
import { Link } from 'react-router-dom'
<Link to="/products">产品中心</Link>

// After (Next.js)
import Link from 'next/link'
<Link href="/products">产品中心</Link>
```

**注意**:
- `to` 属性改为 `href`
- 无需 `BrowserRouter` 包裹
- 支持 prefetch 预加载
