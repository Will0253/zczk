# Tasks: Next.js App Router 迁移

**Input**: Design documents from `/specs/001-nextjs-migration/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: 未明确要求测试，本任务列表不包含测试任务。如需 TDD，请在执行时添加。

**Organization**: 任务按用户故事分组，支持独立实施和测试每个故事。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可并行执行（不同文件，无依赖）
- **[Story]**: 所属用户故事（US1-US6）
- 描述中包含精确文件路径

---

## Phase 1: Setup (项目初始化)

**Purpose**: 创建 Next.js 项目并配置基础结构

- [ ] T001 初始化 Next.js 15+ 项目 `pnpm create next-app@latest`
- [ ] T002 安装核心依赖 (motion, radix-ui, mui, tailwindcss, lucide-react) in package.json
- [ ] T003 [P] 配置 TypeScript 路径别名 in tsconfig.json
- [ ] T004 [P] 配置 Tailwind CSS 4.x in tailwind.config.ts
- [ ] T005 [P] 配置 PostCSS in postcss.config.mjs
- [ ] T006 [P] 配置 Next.js 图片域名白名单 in next.config.ts
- [ ] T007 创建目录结构 (app/, components/, content/, lib/, styles/, types/, public/)

---

## Phase 2: Foundational (基础设施 - 阻塞所有用户故事)

**Purpose**: 核心基础设施必须在任何用户故事开始前完成

**⚠️ CRITICAL**: 此阶段完成前不可开始任何用户故事

### 2.1 样式系统

- [ ] T008 迁移全局样式 from src/styles/theme.css to app/globals.css
- [ ] T009 [P] 迁移字体配置 from src/styles/fonts.css to styles/fonts.css
- [ ] T010 [P] 配置品牌色彩变量 (#11345b, #fdbd00) in app/globals.css

### 2.2 类型定义

- [ ] T011 [P] 创建 Product 类型定义 in types/product.ts
- [ ] T012 [P] 创建 Solution 类型定义 in types/solution.ts
- [ ] T013 [P] 创建 NewsArticle 类型定义 in types/news.ts
- [ ] T014 [P] 创建 Navigation 类型定义 in types/navigation.ts
- [ ] T015 创建类型导出索引 in types/index.ts

### 2.3 工具函数

- [ ] T016 [P] 迁移 cn 工具函数 from src/app/components/ui/utils.ts to lib/cn.ts
- [ ] T017 [P] 创建元数据工具函数 in lib/metadata.ts

### 2.4 内容数据层

- [ ] T018 [P] 创建产品数据和获取函数 in content/products.ts
- [ ] T019 [P] 创建解决方案数据和获取函数 in content/solutions.ts
- [ ] T020 [P] 创建新闻资讯数据和获取函数 in content/news.ts
- [ ] T021 [P] 创建导航配置数据 in content/navigation.ts
- [ ] T022 [P] 创建网站全局配置 in content/site-config.ts
- [ ] T023 创建内容导出索引 in content/index.ts

### 2.5 UI 基础组件

- [ ] T024 [P] 迁移 accordion.tsx from src/app/components/ui/ to components/ui/ (添加 'use client')
- [ ] T025 [P] 迁移 button.tsx from src/app/components/ui/ to components/ui/
- [ ] T026 [P] 迁移 dialog.tsx from src/app/components/ui/ to components/ui/ (添加 'use client')
- [ ] T027 [P] 迁移 dropdown-menu.tsx from src/app/components/ui/ to components/ui/ (添加 'use client')
- [ ] T028 [P] 迁移 tabs.tsx from src/app/components/ui/ to components/ui/ (添加 'use client')
- [ ] T029 [P] 迁移 card.tsx from src/app/components/ui/ to components/ui/
- [ ] T030 [P] 迁移 badge.tsx from src/app/components/ui/ to components/ui/
- [ ] T031 [P] 迁移 separator.tsx from src/app/components/ui/ to components/ui/
- [ ] T032 [P] 迁移 scroll-area.tsx from src/app/components/ui/ to components/ui/ (添加 'use client')
- [ ] T033 [P] 迁移其他 Radix UI 组件 from src/app/components/ui/ to components/ui/

### 2.6 布局组件

- [ ] T034 迁移 Navigation 组件 from src/app/components/Navigation.tsx to components/layout/Navigation.tsx (添加 'use client', Link → next/link)
- [ ] T035 [P] 迁移 Footer 组件 from src/app/components/Footer.tsx to components/layout/Footer.tsx (Link → next/link)
- [ ] T036 [P] 创建 ScrollProgress 组件 (从 App.tsx 提取滚动进度条) in components/layout/ScrollProgress.tsx (添加 'use client')
- [ ] T037 [P] 迁移 ImageWithFallback 组件 from src/app/components/figma/ to components/figma/ImageWithFallback.tsx

### 2.7 Provider 组件

- [ ] T038 创建 Providers 包装组件 in components/providers/Providers.tsx (添加 'use client')

### 2.8 App Router 基础文件

- [ ] T039 创建 Root Layout in app/layout.tsx (整合 Navigation, Footer, ScrollProgress, Providers)
- [ ] T040 [P] 创建全局加载状态 in app/loading.tsx
- [ ] T041 [P] 创建 404 页面 in app/not-found.tsx
- [ ] T042 [P] 创建错误边界 in app/error.tsx (添加 'use client')

**Checkpoint**: 基础设施就绪 - 用户故事实施可开始

---

## Phase 3: User Story 1 - 首页访问体验 (Priority: P1) 🎯 MVP

**Goal**: 用户访问首页时快速加载，显示完整品牌展示内容，享受流畅滚动动画

**Independent Test**: 访问根路径 `/`，验证所有模块正确渲染、动画触发、LCP < 2.5s

### 首页区块组件迁移

- [ ] T043 [P] [US1] 迁移 Hero 组件 from src/app/components/Hero.tsx to components/sections/Hero.tsx (添加 'use client')
- [ ] T044 [P] [US1] 迁移 BusinessScenarios 组件 from src/app/components/BusinessScenarios.tsx to components/sections/BusinessScenarios.tsx (添加 'use client')
- [ ] T045 [P] [US1] 迁移 ProductMatrix 组件 from src/app/components/ProductMatrix.tsx to components/sections/ProductMatrix.tsx (添加 'use client')
- [ ] T046 [P] [US1] 迁移 TechnicalStrength 组件 from src/app/components/TechnicalStrength.tsx to components/sections/TechnicalStrength.tsx (添加 'use client')
- [ ] T047 [P] [US1] 迁移 CaseStudies 组件 from src/app/components/CaseStudies.tsx to components/sections/CaseStudies.tsx (添加 'use client')
- [ ] T048 [P] [US1] 迁移 Services 组件 from src/app/components/Services.tsx to components/sections/Services.tsx (添加 'use client')
- [ ] T049 [P] [US1] 迁移 NewsFeed 组件 from src/app/components/NewsFeed.tsx to components/sections/NewsFeed.tsx (添加 'use client')

### 首页整合

- [ ] T050 [US1] 创建首页 in app/page.tsx (整合所有区块组件, 配置 SSG 元数据)
- [ ] T051 [US1] 验证首页动画效果 (滚动触发淡入、缩放动画)
- [ ] T052 [US1] 验证首页 SEO 元数据 (title, description, og tags)

**Checkpoint**: User Story 1 完成 - 首页可独立访问和测试

---

## Phase 4: User Story 2 - 产品浏览与详情查看 (Priority: P1)

**Goal**: 用户可浏览产品中心，查看产品列表，点击进入详情页

**Independent Test**: 访问 `/products`，点击产品卡片导航至 `/products/smart-cone`，验证内容完整

### 产品页面组件

- [ ] T053 [P] [US2] 迁移 Products 组件 from src/app/components/Products.tsx to components/sections/Products.tsx (添加 'use client' 如有动画)
- [ ] T054 [P] [US2] 迁移 ProductDetail 组件 from src/app/components/ProductDetail.tsx to components/sections/ProductDetail.tsx (添加 'use client' 如有动画)

### 产品页面路由

- [ ] T055 [US2] 创建产品列表页 in app/products/page.tsx (SSG + ISR, 配置 revalidate)
- [ ] T056 [US2] 创建产品详情页 in app/products/[slug]/page.tsx (generateStaticParams, generateMetadata)
- [ ] T057 [US2] 验证产品页面导航 (列表 → 详情 → 返回, 浏览历史保持)

**Checkpoint**: User Story 2 完成 - 产品功能可独立测试

---

## Phase 5: User Story 3 - 解决方案了解 (Priority: P2)

**Goal**: 用户可浏览解决方案页面，了解各行业解决方案

**Independent Test**: 访问 `/solutions`，点击高速公路方案导航至详情页，验证内容完整

### 解决方案页面组件

- [ ] T058 [P] [US3] 迁移 Solutions 组件 from src/app/components/Solutions.tsx to components/sections/Solutions.tsx (添加 'use client' 如有动画)
- [ ] T059 [P] [US3] 迁移 HighwaySolutionDetail 组件 from src/app/components/HighwaySolutionDetail.tsx to components/sections/HighwaySolutionDetail.tsx (添加 'use client' 如有动画)

### 解决方案页面路由

- [ ] T060 [US3] 创建解决方案列表页 in app/solutions/page.tsx (SSG, 配置元数据)
- [ ] T061 [US3] 创建解决方案详情页 in app/solutions/[slug]/page.tsx (generateStaticParams, generateMetadata)
- [ ] T062 [US3] 验证解决方案页面导航和内容展示

**Checkpoint**: User Story 3 完成 - 解决方案功能可独立测试

---

## Phase 6: User Story 4 - 资讯阅读 (Priority: P2)

**Goal**: 用户可浏览资讯中心新闻列表，阅读新闻详情

**Independent Test**: 访问 `/news`，点击新闻导航至 `/news/5g-smart-cone`，验证内容完整

### 资讯页面组件

- [ ] T063 [P] [US4] 迁移 News 组件 from src/app/components/News.tsx to components/sections/News.tsx (添加 'use client' 如有动画)
- [ ] T064 [P] [US4] 迁移 NewsDetailPage 内容 from src/app/NewsDetailPage.tsx to components/sections/NewsDetail.tsx (添加 'use client')

### 资讯页面路由

- [ ] T065 [US4] 创建资讯列表页 in app/news/page.tsx (SSG + ISR, 配置 revalidate)
- [ ] T066 [US4] 创建新闻详情页 in app/news/[slug]/page.tsx (generateStaticParams, generateMetadata)
- [ ] T067 [US4] 验证资讯页面导航、分类筛选和侧边栏功能

**Checkpoint**: User Story 4 完成 - 资讯功能可独立测试

---

## Phase 7: User Story 5 - 响应式移动端体验 (Priority: P2)

**Goal**: 移动设备上获得适配的布局和交互体验

**Independent Test**: 使用不同设备尺寸访问各页面，验证布局适配和移动端菜单

### 响应式验证和优化

- [ ] T068 [US5] 验证 Navigation 移动端汉堡菜单展开/收起动画 in components/layout/Navigation.tsx
- [ ] T069 [US5] 验证所有页面响应式断点 (手机 < 768px, 平板 768-1024px, 桌面 > 1024px)
- [ ] T070 [US5] 验证触摸交互点击区域 (最小 44x44px)
- [ ] T071 [US5] 优化移动端图片加载 (响应式 srcSet)

**Checkpoint**: User Story 5 完成 - 响应式设计可独立测试

---

## Phase 8: User Story 6 - 联系与关于页面访问 (Priority: P3)

**Goal**: 用户可访问联系我们和关于我们页面

**Independent Test**: 访问 `/contact` 和 `/about`，验证内容完整性

### 静态页面组件

- [ ] T072 [P] [US6] 迁移 About 组件 from src/app/components/About.tsx to components/sections/About.tsx (添加 'use client' 如有动画)
- [ ] T073 [P] [US6] 迁移 Contact 组件 from src/app/components/Contact.tsx to components/sections/Contact.tsx (表单部分添加 'use client')

### 静态页面路由

- [ ] T074 [US6] 创建关于我们页 in app/about/page.tsx (SSG, 配置元数据)
- [ ] T075 [US6] 创建联系我们页 in app/contact/page.tsx (SSG, 配置元数据)
- [ ] T076 [US6] 验证静态页面内容和联系表单功能

**Checkpoint**: User Story 6 完成 - 所有页面可独立测试

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: 全站优化和最终验证

### 性能优化

- [ ] T077 [P] 配置 next/image 图片优化 (WebP/AVIF 格式)
- [ ] T078 [P] 验证并优化 Lighthouse 评分 (Performance > 90)
- [ ] T079 [P] 验证 Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)

### SEO 优化

- [ ] T080 [P] 创建 sitemap.xml 生成配置 in app/sitemap.ts
- [ ] T081 [P] 创建 robots.txt in public/robots.txt
- [ ] T082 [P] 验证所有页面 SEO 元数据完整性

### 最终验证

- [ ] T083 删除旧的 src/app/ 目录 (确认迁移完成后)
- [ ] T084 更新 package.json scripts (dev, build, start)
- [ ] T085 运行 quickstart.md 验证清单
- [ ] T086 执行跨浏览器兼容性测试 (Chrome, Firefox, Safari, Edge)
- [ ] T087 执行无障碍性验证 (WCAG 2.1 AA)

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational) ← BLOCKS ALL USER STORIES
    ↓
┌───────────────────────────────────────────────────────┐
│  User Stories can proceed in parallel or sequentially │
├───────────────────────────────────────────────────────┤
│  Phase 3 (US1-首页) ──┬── Phase 4 (US2-产品)          │
│         ↓            │         ↓                     │
│  Phase 5 (US5-响应式) │  Phase 6 (US4-资讯)           │
│                      │         ↓                     │
│                      └── Phase 7 (US3-解决方案)       │
│                              ↓                        │
│                      Phase 8 (US6-联系/关于)          │
└───────────────────────────────────────────────────────┘
    ↓
Phase 9 (Polish)
```

### User Story Dependencies

| 用户故事 | 优先级 | 依赖 | 独立测试 |
|---------|-------|------|---------|
| US1 首页 | P1 | Phase 2 | ✅ 可独立测试 |
| US2 产品 | P1 | Phase 2 | ✅ 可独立测试 |
| US3 解决方案 | P2 | Phase 2 | ✅ 可独立测试 |
| US4 资讯 | P2 | Phase 2 | ✅ 可独立测试 |
| US5 响应式 | P2 | US1 (验证基础) | ✅ 需首页完成后验证 |
| US6 联系/关于 | P3 | Phase 2 | ✅ 可独立测试 |

### Parallel Opportunities

**Phase 2 内并行 (T008-T042)**:
```bash
# 类型定义并行
T011 T012 T013 T014

# 内容数据层并行
T018 T019 T020 T021 T022

# UI 组件并行
T024 T025 T026 T027 T028 T029 T030 T031 T032 T033

# 布局组件并行 (T034 依赖后)
T035 T036 T037
```

**Phase 3 内并行 (首页区块)**:
```bash
# 所有首页区块组件并行迁移
T043 T044 T045 T046 T047 T048 T049
```

**用户故事间并行 (需多人协作)**:
```bash
# 开发者 A: US1 (T043-T052)
# 开发者 B: US2 (T053-T057)
# 开发者 C: US6 (T072-T076)
```

---

## Parallel Example: Phase 2 Foundational

```bash
# Wave 1: 样式和类型 (并行)
Task T008: "迁移全局样式 to app/globals.css"
Task T009: "迁移字体配置 to styles/fonts.css"
Task T010: "配置品牌色彩变量 in app/globals.css"
Task T011-T014: "创建类型定义 in types/"

# Wave 2: 内容数据层 (并行)
Task T018-T022: "创建内容数据 in content/"

# Wave 3: UI 组件 (并行)
Task T024-T033: "迁移 Radix UI 组件 to components/ui/"

# Wave 4: 布局组件
Task T034: "迁移 Navigation (阻塞)"
Task T035-T037: "迁移其他布局组件 (并行)"

# Wave 5: App Router 基础
Task T039: "创建 Root Layout (阻塞)"
Task T040-T042: "创建特殊路由文件 (并行)"
```

---

## Implementation Strategy

### MVP First (仅 User Story 1)

1. 完成 Phase 1: Setup
2. 完成 Phase 2: Foundational (关键 - 阻塞所有故事)
3. 完成 Phase 3: User Story 1 (首页)
4. **STOP & VALIDATE**: 独立测试首页功能
5. 可部署/演示 MVP

### Incremental Delivery

1. Setup + Foundational → 基础就绪
2. + User Story 1 → 首页可用 (MVP!)
3. + User Story 2 → 产品功能可用
4. + User Story 3 → 解决方案可用
5. + User Story 4 → 资讯功能可用
6. + User Story 5 → 响应式完善
7. + User Story 6 → 全站完成
8. + Polish → 生产就绪

### Suggested MVP Scope

**MVP = Phase 1 + Phase 2 + Phase 3 (US1 首页)**

理由：
- 首页是网站门户，优先级最高
- 包含完整的导航、布局、品牌展示
- 可独立演示和验证核心迁移效果
- 后续用户故事可增量添加

---

## Task Summary

| 阶段 | 任务数量 | 可并行 |
|-----|---------|-------|
| Phase 1: Setup | 7 | 4 |
| Phase 2: Foundational | 35 | 28 |
| Phase 3: US1 首页 | 10 | 7 |
| Phase 4: US2 产品 | 5 | 2 |
| Phase 5: US3 解决方案 | 5 | 2 |
| Phase 6: US4 资讯 | 5 | 2 |
| Phase 7: US5 响应式 | 4 | 0 |
| Phase 8: US6 联系/关于 | 5 | 2 |
| Phase 9: Polish | 11 | 5 |
| **总计** | **87** | **52** |

---

## Notes

- [P] 任务 = 不同文件，无依赖，可并行
- [USx] 标签 = 映射到具体用户故事，便于追踪
- 每个用户故事应可独立完成和测试
- 每个任务或逻辑组完成后提交
- 在任何检查点停止可验证当前故事独立性
- 避免：模糊任务、同文件冲突、破坏独立性的跨故事依赖
