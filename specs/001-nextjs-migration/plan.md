# Implementation Plan: Next.js App Router 迁移

**Branch**: `001-nextjs-migration` | **Date**: 2026-01-18 | **Spec**: [spec.md](./spec.md)
**Input**: 使用 TypeScript、Next.js 15+(App Router)、React Hooks + Context、保留 Radix UI + MUI

## Summary

将现有的 ZCZK 智能交通安全网站从 React/Vite 架构迁移至 Next.js 15+ App Router，采用混合渲染策略（SSG/SSR/CSR）以提升 SEO 和性能。迁移必须精确保留所有视觉设计元素、动画效果和交互体验，同时利用 React Server Components 优化首屏加载时间。

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 20+  
**Framework**: Next.js 15+ (App Router, React Server Components)  
**Primary Dependencies**:
- React 18.3+ (Hooks + Context for state management)
- Motion (Framer Motion) 12.x - 动画库
- Radix UI - 无障碍UI原语组件
- MUI (Material UI) 7.x - 图标和部分组件
- Tailwind CSS 4.x - 样式系统
- Lucide React - 图标库

**Storage**: N/A (静态内容，无后端数据库)  
**Testing**: Vitest + React Testing Library, Playwright (E2E)  
**Target Platform**: Web (SSR/SSG/CSR 混合), 支持现代浏览器  
**Project Type**: Web Application (Next.js App Router)  
**Performance Goals**: 
- LCP < 2.5s (3G)
- Lighthouse Performance > 90
- 动画保持 60fps

**Constraints**: 
- 必须保留所有现有视觉设计
- 必须保留所有 Motion 动画效果
- 交互组件需使用 'use client' 指令

**Scale/Scope**: 
- 6 个主页面 + 3 类动态详情页
- ~20+ 个组件需迁移
- ~50+ 个 Radix UI 组件实例

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原则 | 状态 | 说明 |
|------|------|------|
| I. 用户体验至上 | ✅ PASS | 保留所有交互和动画，提升加载速度 |
| II. 品牌一致性 | ✅ PASS | 精确保留所有视觉设计元素 |
| III. 响应式设计 | ✅ PASS | 保留现有响应式布局逻辑 |
| IV. 高性能加载 | ✅ PASS | SSR/SSG 提升首屏加载，LCP < 2.5s |
| V. SEO友好 | ✅ PASS | 服务端渲染 + 元数据 API + 结构化数据 |
| VI. 内容可维护性 | ✅ PASS | 内容与代码分离设计 |
| 无障碍性标准 | ✅ PASS | Radix UI 原生支持 WCAG 2.1 AA |
| 浏览器兼容性 | ✅ PASS | Next.js 支持目标浏览器 |
| 安全要求 | ✅ PASS | Next.js 内置 CSP 支持，HTTPS 强制 |
| 性能标准 | ✅ PASS | 目标 Lighthouse > 90，LCP < 2.5s |

**Gate Status**: ✅ ALL PASSED - 可进入 Phase 0

## Project Structure

### Documentation (this feature)

```text
specs/001-nextjs-migration/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 - 技术研究
├── data-model.md        # Phase 1 - 数据模型
├── quickstart.md        # Phase 1 - 快速开始指南
├── contracts/           # Phase 1 - API/路由契约
│   └── routes.md        # 路由结构定义
├── checklists/
│   └── requirements.md  # 需求检查清单
└── tasks.md             # Phase 2 output (by /speckit.tasks)
```

### Source Code (repository root)

```text
# Next.js 15+ App Router 结构

app/                           # App Router 根目录
├── layout.tsx                 # Root Layout (导航、页脚、全局样式)
├── page.tsx                   # 首页 (/)
├── loading.tsx                # 全局加载状态
├── not-found.tsx              # 404 页面
├── error.tsx                  # 错误边界
├── globals.css                # 全局样式入口
├── about/
│   └── page.tsx               # 关于我们 (/about)
├── products/
│   ├── page.tsx               # 产品中心 (/products)
│   └── [slug]/
│       └── page.tsx           # 产品详情 (/products/[slug])
├── solutions/
│   ├── page.tsx               # 解决方案 (/solutions)
│   └── [slug]/
│       └── page.tsx           # 方案详情 (/solutions/[slug])
├── news/
│   ├── page.tsx               # 资讯中心 (/news)
│   └── [slug]/
│       └── page.tsx           # 新闻详情 (/news/[slug])
└── contact/
    └── page.tsx               # 联系我们 (/contact)

components/                    # 组件目录
├── layout/                    # 布局组件
│   ├── Navigation.tsx         # 导航栏 (Client Component)
│   ├── Footer.tsx             # 页脚 (Server Component)
│   └── ScrollProgress.tsx     # 滚动进度条 (Client Component)
├── sections/                  # 页面区块组件
│   ├── Hero.tsx               # 英雄区域
│   ├── BusinessScenarios.tsx  # 业务场景
│   ├── ProductMatrix.tsx      # 产品矩阵
│   ├── TechnicalStrength.tsx  # 技术实力
│   ├── CaseStudies.tsx        # 案例研究
│   ├── Services.tsx           # 服务介绍
│   └── NewsFeed.tsx           # 新闻动态
├── ui/                        # UI 基础组件 (从 Radix UI 迁移)
│   ├── accordion.tsx
│   ├── button.tsx
│   ├── dialog.tsx
│   └── ... (其他 Radix UI 组件)
├── figma/                     # Figma 生成组件
│   └── ImageWithFallback.tsx
└── providers/                 # Context Providers
    └── ThemeProvider.tsx      # 主题 Provider (Client Component)

lib/                           # 工具库
├── utils.ts                   # 通用工具函数
├── cn.ts                      # className 合并工具
└── metadata.ts                # SEO 元数据工具

content/                       # 静态内容数据
├── products.ts                # 产品数据
├── solutions.ts               # 解决方案数据
└── news.ts                    # 资讯数据

styles/                        # 样式文件
├── theme.css                  # CSS 变量主题
└── fonts.css                  # 字体配置

public/                        # 静态资源
├── images/
├── fonts/
└── favicon.ico

tests/                         # 测试目录
├── e2e/                       # E2E 测试 (Playwright)
├── integration/               # 集成测试
└── unit/                      # 单元测试
```

**Structure Decision**: 采用 Next.js 15+ App Router 标准结构，将现有 `src/app/` 下的组件重构为 `app/` (路由) + `components/` (可复用组件) 分离架构。使用 React Server Components 作为默认，仅对需要交互的组件标记 `'use client'`。

## Complexity Tracking

> 无宪章违规，无需记录复杂度引入理由。

## Phase Implementation Summary

### Phase 0: Research ✅
- Next.js 15 App Router 最佳实践
- Motion 库与 RSC 兼容性方案
- Tailwind CSS 4.x + Next.js 配置
- MUI + Radix UI 共存策略

### Phase 1: Design & Contracts ✅
- 数据模型定义 (content/ 目录结构)
- 路由契约定义 (App Router 文件结构)
- 组件分类 (Server/Client Components)
- 快速开始指南

### Phase 2: Tasks (by /speckit.tasks)
- 具体实施任务分解
- 测试验证任务
