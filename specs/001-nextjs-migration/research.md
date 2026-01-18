# Phase 0: Research - Next.js App Router 迁移

**Feature Branch**: `001-nextjs-migration`  
**Created**: 2026-01-18  
**Status**: Complete

---

## 1. Next.js 15 App Router 迁移最佳实践

### Decision
采用渐进式迁移策略，将现有 React/Vite 应用迁移至 Next.js 15+ App Router。

### Rationale
- Next.js 15 的 App Router 提供了成熟的服务端渲染和静态生成能力
- React Server Components (RSC) 可显著减少客户端 JavaScript 体积
- 文件系统路由简化了路由配置
- 内置的 Metadata API 提供了优秀的 SEO 支持

### Key Patterns

**Server Component (默认)**
```tsx
// app/page.tsx - 默认是 Server Component
export default async function Page() {
  // 可以直接进行数据获取
  const data = await fetchData()
  return <div>{data.title}</div>
}
```

**Client Component (需要交互)**
```tsx
// components/Navigation.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  // 客户端交互逻辑
}
```

**混合模式 (Server + Client)**
```tsx
// app/page.tsx (Server Component)
import { ClientInteractive } from '@/components/ClientInteractive'

export default async function Page() {
  const data = await fetchData()
  return <ClientInteractive initialData={data} />
}
```

### Alternatives Considered
1. **保持 Vite + React Router** - 拒绝：无法获得 SSR/SSG SEO 优势
2. **Remix** - 拒绝：生态系统和社区支持不如 Next.js 成熟
3. **Next.js Pages Router** - 拒绝：App Router 是未来方向，RSC 提供更好的性能

---

## 2. Motion 库与 React Server Components 兼容性

### Decision
对需要动画的组件使用 `'use client'` 指令，或使用 `motion/react-client` 导入。

### Rationale
- Motion 库（原 Framer Motion）需要客户端 JavaScript 执行动画
- 两种方式均与 Next.js App Router 完全兼容
- `motion/react-client` 可减少发送到客户端的 JS 体积

### Implementation Patterns

**方式一：'use client' 指令（推荐用于复杂交互组件）**
```tsx
'use client'

import { motion } from 'motion/react'

export function AnimatedSection({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}
```

**方式二：motion/react-client 导入（减少 JS 体积）**
```tsx
import * as motion from 'motion/react-client'

export default function MyComponent() {
  return <motion.div animate={{ scale: 1.5 }} />
}
```

**服务端 CSS Springs（无运行时开销）**
```tsx
import { spring } from 'motion'

export default function ServerComponent() {
  return (
    <style>{`
      .hover-effect:hover {
        transition: transform ${spring(0.8, 0)};
        transform: scale(1.05);
      }
    `}</style>
  )
}
```

### Migration Strategy
| 组件类型 | 策略 |
|---------|------|
| 全局滚动进度条 | `'use client'` + `useScroll` |
| 导航栏动画 | `'use client'` + `AnimatePresence` |
| 页面区块淡入动画 | `'use client'` + `whileInView` |
| 按钮悬停效果 | 纯 CSS 或 `motion/react-client` |

### Alternatives Considered
1. **纯 CSS 动画** - 拒绝：无法实现复杂的滚动触发和交互动画
2. **GSAP** - 拒绝：已使用 Motion，迁移成本高
3. **CSS-only + Intersection Observer** - 拒绝：代码复杂度增加，效果不如 Motion 流畅

---

## 3. Tailwind CSS 4.x 与 Next.js 15 配置

### Decision
继续使用 Tailwind CSS 4.x，通过 PostCSS 集成到 Next.js 构建流程。

### Rationale
- 现有样式系统基于 Tailwind CSS 4.x
- Next.js 原生支持 PostCSS 和 Tailwind CSS
- 无需额外配置即可工作

### Configuration

**postcss.config.mjs**
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**tailwind.config.ts**
```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'zczk-blue': '#11345b',
        'zczk-gold': '#fdbd00',
      },
    },
  },
  plugins: [],
}
export default config
```

**CSS 变量保留**
```css
/* app/globals.css */
@import 'tailwindcss';

:root {
  --zczk-blue: #11345b;
  --zczk-gold: #fdbd00;
  /* 保留现有 theme.css 中的所有变量 */
}
```

### Alternatives Considered
1. **CSS Modules** - 拒绝：已深度使用 Tailwind，迁移成本高
2. **styled-components** - 拒绝：与 RSC 兼容性问题，性能不如 Tailwind
3. **Tailwind CSS 3.x** - 拒绝：现有项目使用 4.x，无需降级

---

## 4. MUI + Radix UI 共存策略

### Decision
保留 Radix UI 作为无障碍 UI 原语，MUI 仅用于图标和特定组件。

### Rationale
- Radix UI 提供无样式、无障碍的 UI 原语，与 Tailwind CSS 配合良好
- MUI Icons 提供丰富的图标库
- 两者可以共存，职责分明

### Component Strategy

| 组件类型 | 来源 | 理由 |
|---------|------|------|
| 基础 UI 原语 (Dialog, Dropdown, etc.) | Radix UI | 无障碍支持，无预设样式 |
| 图标 | MUI Icons + Lucide React | 现有使用，图标丰富 |
| 表单组件 | Radix UI | 与 Tailwind 集成良好 |
| 复杂数据展示 | MUI (如 DataGrid) | 仅在需要时使用 |

### Client Component Requirements
```tsx
// 所有 Radix UI 和 MUI 交互组件需要 'use client'
'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Menu } from '@mui/icons-material'
```

### Alternatives Considered
1. **仅 MUI** - 拒绝：样式重，与 Tailwind 集成困难
2. **仅 Radix UI** - 拒绝：已使用 MUI Icons，移除成本高
3. **Headless UI** - 拒绝：已使用 Radix UI，功能重叠

---

## 5. SEO 与 Metadata 实现

### Decision
使用 Next.js Metadata API 为所有页面提供 SEO 元数据。

### Rationale
- Next.js Metadata API 是官方推荐方案
- 支持静态和动态元数据生成
- 自动处理 Open Graph 和 Twitter Cards

### Implementation Patterns

**静态元数据 (layout/page)**
```tsx
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | 中创智控',
    default: '中创智控 - 智慧交通安全预警系统领导者',
  },
  description: '中创智控专注于智慧交通安全预警系统，提供5G智能锥桶、V2X通信等解决方案。',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.zczk.com',
    siteName: '中创智控',
  },
}
```

**动态元数据 (详情页)**
```tsx
// app/products/[slug]/page.tsx
import type { Metadata } from 'next'
import { getProduct } from '@/content/products'

export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProduct(params.slug)
  
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  }
}
```

**静态路径生成**
```tsx
// app/products/[slug]/page.tsx
export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({
    slug: product.slug,
  }))
}
```

---

## 6. 渲染策略决策

### Decision
根据页面特性采用混合渲染策略。

### Rendering Strategy Matrix

| 页面 | 策略 | 理由 |
|------|------|------|
| 首页 (/) | SSG | 内容稳定，性能优先 |
| 关于我们 (/about) | SSG | 内容稳定 |
| 联系我们 (/contact) | SSG | 内容稳定 |
| 产品中心 (/products) | SSG + ISR | 产品列表可增量更新 |
| 产品详情 (/products/[slug]) | SSG | generateStaticParams 预渲染 |
| 解决方案 (/solutions) | SSG | 内容稳定 |
| 方案详情 (/solutions/[slug]) | SSG | generateStaticParams 预渲染 |
| 资讯中心 (/news) | SSG + ISR | 新闻可增量更新 |
| 新闻详情 (/news/[slug]) | SSG | generateStaticParams 预渲染 |

### ISR Configuration
```tsx
// 需要增量静态再生成的页面
export const revalidate = 3600 // 1小时重新验证
```

---

## 7. 组件分类决策

### Server Components (默认)
- 页面布局组件 (Layout)
- 静态内容区块
- 页脚 (Footer)
- 数据获取包装器

### Client Components ('use client')
- Navigation (滚动检测、移动端菜单状态)
- ScrollProgress (滚动进度条)
- Hero (复杂动画)
- 所有使用 Motion 动画的区块组件
- 所有使用 useState/useEffect 的组件
- Radix UI 交互组件

### Hybrid Components
- 页面组件：Server Component 获取数据 → 传递给 Client Component 渲染

---

## Research Summary

| 研究领域 | 决策 | 风险等级 |
|---------|------|---------|
| Next.js App Router 迁移 | 采用 | 低 |
| Motion 库兼容性 | 'use client' 指令 | 低 |
| Tailwind CSS 4.x | 保留，PostCSS 集成 | 低 |
| MUI + Radix UI 共存 | 保留两者，职责分明 | 低 |
| SEO Metadata | Next.js Metadata API | 低 |
| 渲染策略 | SSG 为主，ISR 辅助 | 低 |

**所有技术研究项均已解决，无遗留 NEEDS CLARIFICATION。**
