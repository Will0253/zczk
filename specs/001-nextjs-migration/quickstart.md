# Quickstart Guide - Next.js App Router 迁移

**Feature Branch**: `001-nextjs-migration`  
**Created**: 2026-01-18

---

## 前置条件

- Node.js 20+
- pnpm 9+
- 熟悉 React 和 TypeScript
- 了解 Next.js App Router 基础概念

---

## 1. 项目初始化

### 1.1 创建 Next.js 项目

```bash
# 在项目根目录创建新的 Next.js 应用
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
```

### 1.2 安装依赖

```bash
# 核心依赖
pnpm add motion lucide-react clsx tailwind-merge

# Radix UI 组件
pnpm add @radix-ui/react-accordion @radix-ui/react-dialog @radix-ui/react-dropdown-menu \
  @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-scroll-area \
  @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-tooltip @radix-ui/react-slot

# MUI (仅图标和必要组件)
pnpm add @mui/icons-material @mui/material @emotion/react @emotion/styled

# 其他保留依赖
pnpm add class-variance-authority date-fns
```

---

## 2. 目录结构设置

```bash
# 创建必要目录
mkdir -p app/{about,products/[slug],solutions/[slug],news/[slug],contact}
mkdir -p components/{layout,sections,ui,figma,providers}
mkdir -p content
mkdir -p lib
mkdir -p styles
mkdir -p types
mkdir -p public/{images,fonts}
```

---

## 3. 配置文件

### 3.1 next.config.ts

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 图片域名白名单
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // 严格模式
  reactStrictMode: true,
}

export default nextConfig
```

### 3.2 tailwind.config.ts

```typescript
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
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

### 3.3 tsconfig.json 路径别名

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## 4. 核心文件迁移顺序

### Phase 1: 基础设施 (1-2天)

1. **样式系统**
   - 复制 `src/styles/theme.css` → `app/globals.css`
   - 复制 `src/styles/fonts.css` → `styles/fonts.css`
   - 更新 Tailwind 配置

2. **工具函数**
   - 复制 `src/app/components/ui/utils.ts` → `lib/utils.ts`
   - 创建 `lib/cn.ts` (className 合并)

3. **类型定义**
   - 创建 `types/index.ts`
   - 定义所有实体类型

### Phase 2: 布局组件 (1-2天)

4. **Root Layout**
   - 创建 `app/layout.tsx`
   - 迁移全局背景样式
   - 设置全局元数据

5. **导航组件** (Client Component)
   - 复制 `Navigation.tsx` → `components/layout/Navigation.tsx`
   - 添加 `'use client'` 指令
   - 将 `Link` 从 react-router-dom 替换为 next/link

6. **滚动进度条** (Client Component)
   - 创建 `components/layout/ScrollProgress.tsx`
   - 从 App.tsx 提取滚动进度条逻辑

7. **页脚组件** (Server Component)
   - 复制 `Footer.tsx` → `components/layout/Footer.tsx`
   - 更新链接为 next/link

### Phase 3: 首页 (2-3天)

8. **区块组件** (大部分为 Client Components)
   - Hero.tsx
   - BusinessScenarios.tsx
   - ProductMatrix.tsx
   - TechnicalStrength.tsx
   - CaseStudies.tsx
   - Services.tsx
   - NewsFeed.tsx

9. **首页整合**
   - 创建 `app/page.tsx`
   - 整合所有区块组件

### Phase 4: 静态页面 (1-2天)

10. **关于我们**
    - 创建 `app/about/page.tsx`

11. **联系我们**
    - 创建 `app/contact/page.tsx`

### Phase 5: 动态路由页面 (2-3天)

12. **产品中心**
    - 创建 `content/products.ts` (产品数据)
    - 创建 `app/products/page.tsx`
    - 创建 `app/products/[slug]/page.tsx`

13. **解决方案**
    - 创建 `content/solutions.ts`
    - 创建 `app/solutions/page.tsx`
    - 创建 `app/solutions/[slug]/page.tsx`

14. **资讯中心**
    - 创建 `content/news.ts`
    - 创建 `app/news/page.tsx`
    - 创建 `app/news/[slug]/page.tsx`

### Phase 6: UI 组件 (1-2天)

15. **Radix UI 组件**
    - 批量复制 `src/app/components/ui/` → `components/ui/`
    - 为交互组件添加 `'use client'`

16. **ImageWithFallback**
    - 复制并更新为使用 `next/image`

---

## 5. 常见迁移模式

### 5.1 Link 组件迁移

```tsx
// Before
import { Link } from 'react-router-dom'
<Link to="/products">产品</Link>

// After
import Link from 'next/link'
<Link href="/products">产品</Link>
```

### 5.2 添加 'use client' 指令

```tsx
// 任何使用以下特性的组件需要 'use client':
// - useState, useEffect, useRef 等 hooks
// - motion 动画
// - 事件处理 (onClick 等)
// - Radix UI 交互组件

'use client'

import { useState } from 'react'
import { motion } from 'motion/react'

export function MyComponent() {
  const [state, setState] = useState(false)
  return <motion.div animate={{ opacity: state ? 1 : 0 }} />
}
```

### 5.3 Image 组件迁移

```tsx
// Before
<img src="/image.jpg" alt="描述" className="w-full" />

// After
import Image from 'next/image'
<Image src="/image.jpg" alt="描述" width={800} height={600} className="w-full" />
```

### 5.4 元数据设置

```tsx
// 静态元数据
export const metadata = {
  title: '页面标题',
  description: '页面描述',
}

// 动态元数据
export async function generateMetadata({ params }) {
  const data = await getData(params.slug)
  return {
    title: data.title,
    description: data.description,
  }
}
```

---

## 6. 开发命令

```bash
# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint
```

---

## 7. 验证清单

### 功能验证
- [ ] 所有页面可正常访问
- [ ] 动态路由正确解析
- [ ] 导航链接正常工作
- [ ] 移动端菜单正常展开/收起
- [ ] 滚动动画正常触发
- [ ] 滚动进度条正常显示

### 性能验证
- [ ] Lighthouse Performance > 90
- [ ] LCP < 2.5s
- [ ] 无 CLS 问题

### SEO 验证
- [ ] 所有页面有正确的 title
- [ ] 所有页面有正确的 description
- [ ] Open Graph 标签正确

### 样式验证
- [ ] 品牌色彩正确 (#11345b, #fdbd00)
- [ ] 字体正确加载
- [ ] 响应式布局正常

---

## 8. 常见问题

### Q: 为什么动画不工作？
A: 确保组件顶部有 `'use client'` 指令，Motion 需要客户端环境。

### Q: 为什么图片显示 404？
A: 检查 `next.config.ts` 中的 `images.remotePatterns` 配置。

### Q: 为什么样式丢失？
A: 确保 `app/globals.css` 在 `app/layout.tsx` 中正确导入。

### Q: 如何处理 hydration 错误？
A: 确保服务端和客户端渲染结果一致，避免使用 `window` 或 `document` 在服务端。

---

## 参考链接

- [Next.js App Router 文档](https://nextjs.org/docs/app)
- [Motion for React 文档](https://motion.dev/docs/react)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Radix UI 文档](https://www.radix-ui.com/docs)
