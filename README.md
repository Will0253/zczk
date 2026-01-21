# ZCZK 智能交通安全网站

一个现代化的智能交通安全解决方案展示网站，基于 Next.js 15 App Router 构建，提供丰富的交互体验和专业的产品展示。

## 技术栈

### 核心框架
- **Next.js 15.1.0** - React 全栈框架，采用 App Router 架构
- **React 18.3.1** - 用户界面库
- **TypeScript 5.7.0** - 类型安全
- **Turbopack** - 高性能开发服务器（通过 `--turbopack` 启用）

### 样式与 UI
- **Tailwind CSS 4.1.0** - 原子化 CSS 框架
- **Radix UI** - 无障碍组件库
  - Accordion, Alert Dialog, Avatar, Checkbox, Dialog
  - Dropdown Menu, Hover Card, Label, Menubar
  - Navigation Menu, Popover, Progress, Radio Group
  - Scroll Area, Select, Separator, Slider, Switch
  - Tabs, Toggle, Tooltip, Context Menu, Collapsible 等
- **MUI (Material UI) 7.3.5** - Material Design 组件库
  - @mui/material
  - @mui/icons-material
- **Motion (Framer Motion) 12.23.24** - 动画库
- **Lucide React 0.487.0** - 图标库
- **next-themes 0.4.6** - 主题切换

### 功能库
- **date-fns 3.6.0** - 日期处理
- **recharts 2.15.2** - 图表库
- **react-hook-form 7.55.0** - 表单管理
- **react-dnd 16.0.1** - 拖拽功能
- **embla-carousel-react 8.6.0** - 轮播图
- **react-slick 0.31.0** - 滑块组件
- **sonner 2.0.3** - Toast 通知
- **cmdk 1.1.1** - 命令面板
- **vaul 1.1.2** - 抽屉组件
- **react-day-picker 8.10.1** - 日期选择器
- **react-resizable-panels 2.1.7** - 可调整面板
- **react-responsive-masonry 2.7.1** - 响应式瀑布流

### 工具库
- **clsx 2.1.1** - 条件类名
- **tailwind-merge 3.2.0** - Tailwind 类名合并
- **class-variance-authority 0.7.1** - 类名变体管理
- **tw-animate-css 1.3.8** - Tailwind 动画扩展

### 包管理器
- **pnpm** - 快速、节省磁盘空间的包管理器

## 项目结构

```
zczk/
├── app/                          # Next.js App Router 目录
│   ├── about/                    # 关于我们页面
│   │   └── page.tsx
│   ├── contact/                  # 联系我们页面
│   │   └── page.tsx
│   ├── news/                     # 新闻资讯
│   │   ├── page.tsx              # 新闻列表页
│   │   └── [slug]/              # 动态路由
│   │       └── page.tsx         # 新闻详情页
│   ├── products/                 # 产品中心
│   │   ├── page.tsx             # 产品列表页
│   │   └── [slug]/             # 动态路由
│   │       └── page.tsx        # 产品详情页
│   ├── solutions/                # 解决方案
│   │   ├── page.tsx            # 解决方案列表页
│   │   └── [slug]/            # 动态路由
│   │       └── page.tsx       # 解决方案详情页
│   ├── globals.css              # 全局样式（包含 Tailwind CSS）
│   ├── layout.tsx               # 根布局组件
│   ├── loading.tsx              # 全局加载状态
│   ├── not-found.tsx            # 404 页面
│   ├── error.tsx                # 错误页面
│   ├── page.tsx                 # 首页
│   ├── robots.ts                # SEO robots.txt
│   └── sitemap.ts               # SEO sitemap.xml
├── components/                   # React 组件目录
│   ├── figma/                   # Figma 相关组件
│   │   └── ImageWithFallback.tsx
│   ├── layout/                  # 布局组件
│   │   ├── Navigation.tsx       # 导航栏
│   │   ├── Footer.tsx           # 页脚
│   │   └── ScrollProgress.tsx   # 滚动进度条
│   ├── providers/               # Context Providers
│   │   └── Providers.tsx
│   ├── sections/                # 页面区块组件
│   │   ├── Hero.tsx             # 首页英雄区域
│   │   ├── BusinessScenarios.tsx # 业务场景
│   │   ├── ProductMatrix.tsx    # 产品矩阵
│   │   ├── TechnicalStrength.tsx # 技术实力
│   │   ├── CaseStudies.tsx      # 案例研究
│   │   ├── Services.tsx         # 服务介绍
│   │   ├── NewsFeed.tsx         # 新闻列表
│   │   ├── NewsDetail.tsx       # 新闻详情
│   │   ├── ProductDetail.tsx    # 产品详情
│   │   ├── ProductRecommendations.tsx # 产品推荐
│   │   ├── HighwaySolutionDetail.tsx # 高速公路解决方案详情
│   │   ├── About.tsx            # 关于我们
│   │   ├── Contact.tsx          # 联系我们
│   │   ├── ContactCard.tsx      # 联系卡片
│   │   ├── Products.tsx         # 产品中心
│   │   ├── Solutions.tsx        # 解决方案
│   │   └── News.tsx             # 资讯中心
│   └── ui/                      # UI 基础组件（基于 Radix UI）
│       ├── button.tsx
│       └── card.tsx
├── content/                      # 内容数据目录
│   ├── index.ts                 # 内容导出
│   ├── navigation.ts            # 导航配置
│   ├── news.ts                  # 新闻数据
│   ├── products.ts              # 产品数据
│   ├── site-config.ts           # 网站配置
│   └── solutions.ts             # 解决方案数据
├── lib/                         # 工具函数目录
│   ├── cn.ts                    # 类名合并工具
│   └── metadata.ts              # 元数据工具
├── public/                      # 静态资源目录
│   └── images/                  # 图片资源
├── types/                       # TypeScript 类型定义
│   ├── index.ts
│   ├── navigation.ts
│   ├── news.ts
│   ├── product.ts
│   └── solution.ts
├── specs/                       # 规格文档目录
│   └── 001-nextjs-migration/    # Next.js 迁移规格
│       ├── spec.md
│       ├── plan.md
│       ├── tasks.md
│       ├── research.md
│       ├── data-model.md
│       ├── contracts/
│       └── checklists/
├── .gitignore                    # Git 忽略文件
├── next.config.ts               # Next.js 配置
├── package.json                 # 项目配置
├── pnpm-lock.yaml               # pnpm 锁文件
├── postcss.config.mjs           # PostCSS 配置
├── tsconfig.json                # TypeScript 配置
└── README.md                    # 项目说明文档
```

## 快速开始

### 前置要求
- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

开发服务器将在 `http://localhost:3000` 启动（使用 Turbopack 加速）。

### 生产构建

```bash
pnpm build
```

构建产物将输出到 `.next/` 目录。

### 生产模式启动

```bash
pnpm start
```

启动生产服务器，预览构建后的应用。

### 代码检查

```bash
pnpm lint
```

运行 ESLint 进行代码质量检查。

## 页面路由

- `/` - 首页
- `/about` - 关于我们
- `/products` - 产品中心
- `/products/smart-cone` - 智能锥桶产品详情
- `/solutions` - 解决方案
- `/solutions/highway-safety` - 高速公路安全解决方案详情
- `/news` - 新闻资讯
- `/news/5g-smart-cone` - 5G 智能锥桶新闻详情
- `/contact` - 联系我们

## 功能特性

### 架构特性
- **Next.js 15 App Router** - 基于文件系统的路由，支持服务端组件和客户端组件
- **混合渲染模式** - 静态生成（SSG）、服务端渲染（SSR）和客户端渲染（CSR）结合
- **Turbopack 开发服务器** - 极速的开发体验和热更新
- **TypeScript 全栈支持** - 类型安全的开发体验

### UI/UX 特性
- 现代化的响应式设计
- 基于 Tailwind CSS 的原子化样式
- 丰富的动画效果（Motion/Framer Motion）
- 无障碍友好的 UI 组件（Radix UI）
- Material Design 组件（MUI）
- 亮色/暗色主题切换支持
- 滚动进度条指示器
- 响应式导航栏（桌面端和移动端）

### 功能特性
- 动态路由支持（产品、新闻、解决方案详情页）
- SEO 优化（元数据、Open Graph、Twitter Cards）
- 图片优化（Next.js Image 组件）
- 图表展示（Recharts）
- 表单管理（React Hook Form）
- Toast 通知（Sonner）
- 拖拽功能（React DnD）
- 轮播图（Embla Carousel）
- 命令面板（cmdk）
- 日期选择器（react-day-picker）

### 内容管理
- 集中式内容配置（content/ 目录）
- 类型安全的内容数据（TypeScript）
- 可扩展的内容结构

### 开发体验
- ESLint 代码检查
- 路径别名支持（@/）
- 模块化的组件架构
- 清晰的项目结构

## 配置说明

### Next.js 配置

项目使用 Next.js 15 作为框架，配置文件为 `next.config.ts`：

- 支持 React 18.3.1
- 启用 React 严格模式
- 图片优化配置：
  - 远程域名白名单（images.unsplash.com）
  - 现代图片格式支持（AVIF、WebP）
  - 响应式图片尺寸配置

### TypeScript 配置

配置文件为 `tsconfig.json`：

- 严格模式启用
- 路径别名 `@` 指向项目根目录
- 支持 Next.js 插件
- 目标 ES2017

### Tailwind CSS 配置

使用 Tailwind CSS v4，通过 `@tailwindcss/postcss` 插件自动配置。全局样式定义在 `app/globals.css` 中：

- CSS 变量定义主题颜色
- 支持亮色/暗色主题切换
- 品牌色彩：`--zczk-blue: #11345b`、`--zczk-gold: #fdbd00`
- 技术风格渐变和网格背景

### PostCSS 配置

Tailwind CSS v4 自动处理所有必需的 PostCSS 插件，无需额外配置。

## 常见问题解答

### 如何添加新的产品？

1. 在 `content/products.ts` 中添加产品数据
2. 在 `types/product.ts` 中确保类型定义正确
3. 在 `app/products/[slug]/page.tsx` 中会自动渲染产品详情页

### 如何修改主题颜色？

主题颜色在 `app/globals.css` 中通过 CSS 变量定义：
- `--zczk-blue` - 品牌蓝色
- `--zczk-gold` - 品牌金色

### 如何添加新的页面？

在 `app/` 目录下创建新的文件夹和 `page.tsx` 文件，Next.js 会自动创建对应的路由。

### 如何配置 SEO？

在各个页面的 `page.tsx` 中导出 `metadata` 对象，或使用 `generateMetadata` 函数动态生成元数据。

### 如何部署到生产环境？

1. 运行 `pnpm build` 构建项目
2. 将 `.next/` 目录和 `public/` 目录部署到服务器
3. 运行 `pnpm start` 启动生产服务器

或使用 Vercel、Netlify 等平台进行一键部署。

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 项目信息



### 项目状态
本项目已完成从 React + Vite 到 Next.js 15 App Router 的迁移。迁移规格文档位于 `specs/001-nextjs-migration/` 目录。

### 许可证

MIT License

### 联系方式

如有问题或建议，请联系项目维护者。
