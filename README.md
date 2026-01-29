# ZCZK 智能交通安全网站

一个现代化的智能交通安全解决方案展示网站，基于 Next.js 15 App Router 构建，提供丰富的交互体验和专业的产品展示。

## 技术栈

### 核心框架
- **Next.js 15.1.0** - React 全栈框架，采用 App Router 架构
- **React 18.3.1** - 用户界面库
- **TypeScript 5.7.0** - 类型安全
- **Turbopack** - 高性能开发服务器（通过 `--turbopack` 启用）

### 样式与 UI
- **Tailwind CSS 4.1.0** - 原子化 CSS 框架（通过 @tailwindcss/postcss 插件）
- **Radix UI** - 无障碍组件库
  - Accordion, Alert Dialog, Avatar, Checkbox, Dialog
  - Dropdown Menu, Hover Card, Label, Menubar
  - Navigation Menu, Popover, Progress, Radio Group
  - Scroll Area, Select, Separator, Slider, Switch
  - Tabs, Toggle, Tooltip, Context Menu, Collapsible, Aspect Ratio 等
- **MUI (Material UI) 7.3.5** - Material Design 组件库
  - @mui/material
  - @mui/icons-material
- **Motion (Framer Motion) 12.23.24** - 动画库
- **Lucide React 0.487.0** - 图标库
- **next-themes 0.4.6** - 主题切换
- **Emotion 11.14.x** - CSS-in-JS 库（MUI 依赖）

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
- **react-router-dom 7.11.0** - 客户端路由
- **input-otp 1.4.2** - OTP 输入组件
- **react-popper 2.3.0** - Popover 定位
- **@popperjs/core 2.11.8** - Popper.js 核心库

### 工具库
- **clsx 2.1.1** - 条件类名
- **tailwind-merge 3.2.0** - Tailwind 类名合并
- **class-variance-authority 0.7.1** - 类名变体管理
- **tw-animate-css 1.3.8** - Tailwind 动画扩展

### 包管理器
- **pnpm** - 快速、节省磁盘空间的包管理器（前端）
- **npm** - Node.js 包管理器（后端）

### 后端技术栈
- **Strapi 5.33.4** - 开源无头 CMS
  - @strapi/plugin-cloud - 云服务插件
  - @strapi/plugin-users-permissions - 用户权限插件
- **better-sqlite3 12.4.1** - SQLite 数据库驱动
- **React 18.x** - Admin UI 框架
- **styled-components 6.x** - CSS-in-JS 样式库
- **TypeScript 5.x** - 类型安全

## 项目结构

```
zczk/
├── frontend/                     # 前端应用目录（Next.js 15）
│   ├── app/                     # Next.js App Router 目录
│   │   ├── about/               # 关于我们页面
│   │   │   └── page.tsx
│   │   ├── contact/             # 联系我们页面
│   │   │   └── page.tsx
│   │   ├── healthz/             # 健康检查端点
│   │   │   └── route.ts
│   │   ├── news/                # 新闻资讯
│   │   │   ├── page.tsx        # 新闻列表页
│   │   │   ├── [slug]/        # 动态路由
│   │   │   │   ├── page.tsx   # 新闻详情页
│   │   │   │   ├── error.tsx   # 错误页面
│   │   │   │   └── loading.tsx # 加载状态
│   │   │   ├── error.tsx       # 列表错误页
│   │   │   └── loading.tsx     # 列表加载状态
│   │   ├── products/            # 产品中心
│   │   │   ├── page.tsx        # 产品列表页
│   │   │   ├── error.tsx       # 错误页面
│   │   │   └── loading.tsx     # 加载状态
│   │   ├── solutions/           # 解决方案
│   │   │   ├── page.tsx       # 解决方案列表页
│   │   │   └── [slug]/       # 动态路由
│   │   │       └── page.tsx  # 解决方案详情页
│   │   ├── globals.css         # 全局样式（包含 Tailwind CSS）
│   │   ├── layout.tsx          # 根布局组件
│   │   ├── loading.tsx         # 全局加载状态
│   │   ├── not-found.tsx       # 404 页面
│   │   ├── error.tsx           # 错误页面
│   │   ├── page.tsx            # 首页
│   │   ├── robots.ts           # SEO robots.txt
│   │   └── sitemap.ts          # SEO sitemap.xml
│   ├── components/              # React 组件目录
│   │   ├── figma/              # Figma 相关组件
│   │   │   └── ImageWithFallback.tsx
│   │   ├── layout/             # 布局组件
│   │   │   ├── Navigation.tsx  # 导航栏
│   │   │   ├── Footer.tsx      # 页脚
│   │   │   └── ScrollProgress.tsx  # 滚动进度条
│   │   ├── providers/          # Context Providers
│   │   │   └── Providers.tsx
│   │   ├── sections/           # 页面区块组件
│   │   │   ├── Hero.tsx       # 首页英雄区域
│   │   │   ├── BusinessScenarios.tsx # 业务场景
│   │   │   ├── ProductMatrix.tsx    # 产品矩阵
│   │   │   ├── TechnicalStrength.tsx # 技术实力
│   │   │   ├── CaseStudies.tsx      # 案例研究
│   │   │   ├── Services.tsx         # 服务介绍
│   │   │   ├── NewsFeed.tsx         # 新闻列表
│   │   │   ├── NewsDetail.tsx       # 新闻详情
│   │   │   ├── ProductDetail.tsx    # 产品详情
│   │   │   ├── ProductRecommendations.tsx # 产品推荐
│   │   │   ├── HighwaySolutionDetail.tsx # 高速公路解决方案详情
│   │   │   ├── About.tsx            # 关于我们
│   │   │   ├── Contact.tsx          # 联系我们
│   │   │   ├── ContactCard.tsx      # 联系卡片
│   │   │   ├── Products.tsx         # 产品中心
│   │   │   ├── Solutions.tsx        # 解决方案
│   │   │   ├── News.tsx             # 资讯中心
│   │   │   └── Mermaid.tsx          # Mermaid 图表
│   │   └── ui/                  # UI 基础组件（基于 Radix UI）
│   │       ├── button.tsx
│   │       └── card.tsx
│   ├── content/                 # 内容数据目录
│   │   ├── index.ts            # 内容导出
│   │   ├── navigation.ts       # 导航配置
│   │   ├── news.ts            # 新闻数据
│   │   ├── products.ts        # 产品数据
│   │   ├── site-config.ts     # 网站配置
│   │   └── solutions.ts       # 解决方案数据
│   ├── lib/                    # 工具函数目录
│   │   ├── categories.ts      # 分类工具
│   │   ├── cn.ts             # 类名合并工具
│   │   ├── metadata.ts       # 元数据工具
│   │   └── strapi.ts         # Strapi API 客户端
│   ├── public/                 # 静态资源目录
│   │   └── images/            # 图片资源
│   ├── types/                  # TypeScript 类型定义
│   │   ├── index.ts
│   │   ├── navigation.ts
│   │   ├── news.ts
│   │   ├── product.ts
│   │   └── solution.ts
│   ├── .env.example           # 环境变量示例
│   ├── .eslintignore          # ESLint 忽略配置
│   ├── .eslintrc.json         # ESLint 配置
│   ├── .gitignore             # Git 忽略文件
│   ├── next.config.ts         # Next.js 配置
│   ├── package.json           # 项目配置
│   ├── pnpm-lock.yaml         # pnpm 锁文件
│   ├── postcss.config.mjs     # PostCSS 配置
│   └── tsconfig.json         # TypeScript 配置
├── backend/                    # 后端应用目录（Strapi 5）
│   ├── config/                # Strapi 配置
│   │   ├── admin.ts          # Admin UI 配置
│   │   ├── api.ts            # API 配置
│   │   ├── database.ts       # 数据库配置
│   │   ├── middlewares.ts    # 中间件配置
│   │   ├── plugins.ts        # 插件配置
│   │   └── server.ts         # 服务器配置
│   ├── database/              # 数据库目录
│   │   └── migrations/       # 数据库迁移
│   ├── public/                # 公共资源
│   │   ├── uploads/          # 上传文件
│   │   └── robots.txt        # SEO robots.txt
│   ├── scripts/               # 导入脚本
│   │   ├── import-news.mjs   # 导入新闻数据
│   │   ├── import-products.mjs # 导入产品数据
│   │   └── parse-content.mjs # 解析内容文件
│   ├── src/                   # 源代码目录
│   │   ├── admin/            # Admin UI
│   │   ├── api/              # API 端点
│   │   │   ├── news-item/    # 新闻 API
│   │   │   │   ├── content-types/
│   │   │   │   ├── controllers/
│   │   │   │   ├── routes/
│   │   │   │   └── services/
│   │   │   └── product/      # 产品 API
│   │   │       ├── content-types/
│   │   │       ├── controllers/
│   │   │       ├── routes/
│   │   │       └── services/
│   │   ├── extensions/       # Strapi 扩展
│   │   └── index.ts          # 入口文件
│   ├── types/                 # TypeScript 类型
│   │   └── generated/        # 自动生成类型
│   ├── .env                  # 环境变量（不提交）
│   ├── .env.example          # 环境变量示例
│   ├── .gitignore            # Git 忽略文件
│   ├── package.json          # 项目配置
│   ├── package-lock.json     # npm 锁文件
│   ├── tsconfig.json         # TypeScript 配置
│   └── README.md             # 后端说明文档
├── specs/                     # 规格文档目录
│   ├── 001-deployment-ops-manual/  # 部署运维规格
│   │   ├── spec.md
│   │   ├── plan.md
│   │   ├── tasks.md
│   │   ├── research.md
│   │   ├── data-model.md
│   │   ├── quickstart.md
│   │   ├── contracts/
│   │   └── checklists/
├── ops/                       # 运维部署目录
│   ├── backups/              # 备份与恢复脚本
│   │   ├── backup.sh         # 数据库和媒体备份
│   │   ├── restore.sh        # 数据库和媒体恢复
│   │   ├── retention.sh      # 备份清理脚本
│   │   └── cron.txt          # 定时备份任务
│   ├── docker/               # Docker 配置
│   │   ├── Dockerfile.backend    # 后端 Docker 镜像
│   │   ├── Dockerfile.frontend   # 前端 Docker 镜像
│   │   ├── docker-compose.dev.yml   # 开发环境编排
│   │   ├── docker-compose.prod.yml  # 生产环境编排
│   │   ├── docker-compose.verify.yml # 验证环境编排
│   │   ├── init-cert.sh       # 证书初始化脚本
│   │   ├── certbot-renew.sh   # 证书续期脚本
│   │   └── cron.txt          # 定时续期任务
│   ├── nginx/                # Nginx 配置
│   │   ├── nginx.conf        # 主配置文件
│   │   └── sites.conf        # 站点配置
│   ├── monitoring/            # 监控配置
│   │   ├── metrics.md        # 监控指标说明
│   │   └── runbook.md        # 运维手册
│   ├── .env.dev.example      # 开发环境变量模板
│   ├── .env.prod.example     # 生产环境变量模板
│   ├── DEPLOYMENT-OPS-MANUAL.md  # 部署运维手册
│   ├── deploy.sh            # 生产部署脚本
│   ├── generate-secrets.sh   # 密钥生成脚本
│   └── rollback.sh           # 版本回滚脚本
├── .github/                   # GitHub 配置
│   ├── agents/               # AI Agents 配置
│   └── prompts/              # AI Prompts
├── .qoder/                    # Qoder 配置
├── .specify/                  # Specify 配置
├── .gitignore                 # 根目录 Git 忽略文件
├── README.md                  # 项目说明文档
├── QODER.md                   # Qoder 文档
└── package.json               # 根目录配置
```

## 架构说明

### 前后端分离架构

本项目采用前后端分离的架构设计：

- **frontend/** - 前端应用（Next.js 15 + React）
  - 负责用户界面和交互
  - 使用 Next.js App Router 进行页面路由
  - 支持服务端渲染（SSR）和静态生成（SSG）
  - 提供丰富的动画和交互体验
  - 通过 `lib/strapi.ts` 与后端 Strapi CMS 进行数据交互

- **backend/** - 后端应用（Strapi 5 CMS）
  - 基于 Strapi 5.33.4 的无头 CMS
  - 提供 RESTful API 管理产品和新闻内容
  - 使用 SQLite 数据库（可配置其他数据库）
  - 包含 Admin UI 用于内容管理
  - 支持用户权限管理（@strapi/plugin-users-permissions）

### 数据流架构

```
┌─────────────┐     API      ┌─────────────┐     Database     ┌─────────────┐
│   Frontend  │ ◄──────────► │   Strapi    │ ◄──────────────► │   SQLite    │
│ (Next.js)   │   HTTP/HTTPS │   CMS 5     │                  │   (better-  │
│             │              │             │                  │  sqlite3)   │
└─────────────┘              └─────────────┘                  └─────────────┘
       │                              │
       │                              │
       ▼                              ▼
  Static Content                Admin UI
  (content/*.ts)              (localhost:1337/admin)
```

### 内容管理策略

项目支持两种内容管理模式：

1. **静态内容模式**（默认）
   - 内容存储在 `frontend/content/` 目录
   - 类型安全的数据结构
   - 适合快速开发和静态内容

2. **动态内容模式**（Strapi CMS）
   - 内容存储在 Strapi 数据库
   - 通过 `NEXT_PUBLIC_STRAPI_URL` 环境变量配置
   - 支持内容导入脚本：
     - `npm run import:products` - 导入产品数据
     - `npm run import:news` - 导入新闻数据
     - `npm run import:content` - 导入所有内容

### 部署架构

项目提供多种部署方式，支持 Docker 容器化部署和传统部署：

**1. Docker 容器化部署（推荐）**

使用 Docker Compose 编排服务，支持开发和生产环境：

- **开发环境**：`ops/docker/docker-compose.dev.yml`
  - 包含前端、后端、PostgreSQL 数据库
  - 支持热重载和开发调试

- **生产环境**：`ops/docker/docker-compose.prod.yml`
  - 包含前端、后端、PostgreSQL、Nginx、Certbot
  - 自动 SSL 证书管理（Let's Encrypt）
  - 生产级配置和优化

- **验证环境**：`ops/docker/docker-compose.verify.yml`
  - 用于部署前验证配置

**2. 传统部署**

前后端独立部署：

- **前端部署** - Vercel、Netlify 或 CDN
  - 构建命令：`pnpm build`
  - 启动命令：`pnpm start`
  - 端口：3000（默认）

- **后端部署** - 云服务器或容器化部署
  - 构建命令：`npm run build`
  - 启动命令：`npm start`
  - 端口：1337（默认）

**3. 反向代理配置**

使用 Nginx 作为反向代理和负载均衡：

- SSL/TLS 终止
- 静态资源缓存
- Gzip 压缩
- 安全头配置

**4. 通信方式**

- 前端通过 `NEXT_PUBLIC_STRAPI_URL` 指向后端 API
- 支持跨域配置（localhost、127.0.0.1、192.168.0.2）
- 生产环境通过 Nginx 内部通信

**5. 运维脚本**

- `ops/deploy.sh` - 一键生产部署
- `ops/rollback.sh` - 版本回滚
- `ops/generate-secrets.sh` - 密钥生成
- `ops/backups/backup.sh` - 数据备份
- `ops/backups/restore.sh` - 数据恢复

### 开发流程

1. 前端开发团队专注于 `frontend/` 目录
2. 后端开发团队专注于 `backend/` 目录
3. 通过 API 契约进行协作
4. 使用 TypeScript 接口定义确保类型安全

## 快速开始

### 前置要求
- Node.js >= 20.0.0 <= 24.x.x
- pnpm >= 8.0.0 (前端)
- npm >= 6.0.0 (后端)

### 安装依赖

```bash
cd frontend
pnpm install

cd ../backend
npm install
```

### 环境配置

**前端配置**（可选，使用 Strapi CMS 时需要）：
```bash
cd frontend
cp .env.example .env
# 编辑 .env 文件，设置 NEXT_PUBLIC_STRAPI_URL
```

**后端配置**：
```bash
cd backend
cp .env.example .env
# 编辑 .env 文件，设置数据库和密钥
```

### 开发模式

```bash
# 终端 1：启动后端 Strapi CMS
cd backend
npm run develop

# 终端 2：启动前端 Next.js 应用
cd frontend
pnpm dev
```

- 前端开发服务器将在 `http://localhost:3000` 启动（使用 Turbopack 加速）
- Strapi 管理后台默认在 `http://localhost:1337/admin`
- Strapi API 端点在 `http://localhost:1337/api`

### 内容导入（可选）

如果使用 Strapi CMS，可以导入现有的静态内容：

```bash
cd backend
# 设置环境变量
export STRAPI_URL="http://localhost:1337"
export STRAPI_TOKEN="<从 Admin UI 获取的 JWT Token>"

# 导入产品数据
npm run import:products

# 导入新闻数据
npm run import:news

# 导入所有内容
npm run import:content
```

### 生产构建

```bash
cd frontend
pnpm build

cd ../backend
npm run build
```

- 前端构建产物将输出到 `frontend/.next/` 目录
- 后端构建产物将输出到 `backend/.tmp/` 和 `backend/dist/` 目录

### 生产模式启动

```bash
cd frontend
pnpm start

cd ../backend
npm start
```

启动生产服务器，预览构建后的应用。

### 代码检查

```bash
cd frontend
pnpm lint
```

运行 ESLint 进行代码质量检查。

## 页面路由

### 前端路由（Next.js App Router）
- `/` - 首页
- `/healthz` - 健康检查端点（返回 JSON 状态）
- `/about` - 关于我们
- `/products` - 产品中心
- `/solutions` - 解决方案
- `/solutions/highway-safety` - 高速公路安全解决方案详情
- `/news` - 新闻资讯
- `/news/[slug]` - 新闻详情页（动态路由）
- `/contact` - 联系我们

### 后端 API 路由（Strapi）
- `/api/healthz` - 健康检查端点
- `/api/products` - 产品列表 API
- `/api/products/:id` - 产品详情 API
- `/api/news` - 新闻列表 API
- `/api/news/:id` - 新闻详情 API
- `/admin` - Strapi 管理后台

### Strapi 权限配置

**公开访问（Public Role）**：
- `Product` - `find`、`findOne`
- `News` - `find`、`findOne`

**认证访问（Authenticated Role）**：
- `Product` - `create`、`update`、`delete`
- `News` - `create`、`update`、`delete`

配置路径：Admin UI → Settings → Users & Permissions → Roles

## 功能特性

### 功能特性

#### 前端特性
- **Next.js 15 App Router** - 基于文件系统的路由，支持服务端组件和客户端组件
- **混合渲染模式** - 静态生成（SSG）、服务端渲染（SSR）和客户端渲染（CSR）结合
- **Turbopack 开发服务器** - 极速的开发体验和热更新
- **TypeScript 全栈支持** - 类型安全的开发体验
- **Strapi API 集成** - 通过 `lib/strapi.ts` 与后端 CMS 通信

#### UI/UX 特性
- 现代化的响应式设计
- 基于 Tailwind CSS 的原子化样式
- 丰富的动画效果（Motion/Framer Motion）
- 无障碍友好的 UI 组件（Radix UI）
- Material Design 组件（MUI）
- 亮色/暗色主题切换支持
- 滚动进度条指示器
- 响应式导航栏（桌面端和移动端）

#### 功能特性
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

#### 后端特性（Strapi CMS）
- **无头 CMS 架构** - 提供 RESTful API
- **内容管理** - 产品和新闻的增删改查
- **用户权限管理** - 基于角色的访问控制（RBAC）
- **媒体管理** - 图片和文件上传
- **Admin UI** - 可视化内容管理界面
- **内容导入** - 支持从静态内容文件导入数据
- **数据库迁移** - 结构化的数据库变更管理
- **API 端点** - 自定义 API 控制器和服务

#### 内容管理
- 集中式内容配置（content/ 目录）
- 类型安全的内容数据（TypeScript）
- 可扩展的内容结构
- 支持静态内容和动态 CMS 内容两种模式

#### 开发体验
- ESLint 代码检查
- 路径别名支持（@/）
- 模块化的组件架构
- 清晰的项目结构
- TypeScript 类型自动生成（Strapi）

## 配置说明

### 前端配置（Next.js）

#### Next.js 配置

项目使用 Next.js 15 作为框架，配置文件为 `frontend/next.config.ts`：

- 支持 React 18.3.1
- 启用 React 严格模式
- 图片优化配置：
  - 远程域名白名单（images.unsplash.com、localhost:1337、127.0.0.1:1337、192.168.0.2:1337）
  - 现代图片格式支持（AVIF、WebP）
  - 响应式图片尺寸配置（640, 750, 828, 1080, 1200, 1920, 2048, 3840）

#### 环境变量

前端环境变量配置文件为 `frontend/.env`：

```bash
# Strapi CMS API 地址（可选，使用动态内容时需要）
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

#### TypeScript 配置

配置文件为 `frontend/tsconfig.json`：

- 严格模式启用
- 路径别名 `@` 指向 `frontend/` 目录
- 支持 Next.js 插件
- 目标 ES2017
- 模块解析方式：bundler

#### Tailwind CSS 配置

使用 Tailwind CSS v4，通过 `@tailwindcss/postcss` 插件自动配置。全局样式定义在 `frontend/app/globals.css` 中：

- CSS 变量定义主题颜色
- 支持亮色/暗色主题切换
- 品牌色彩：`--zczk-blue: #11345b`、`--zczk-gold: #fdbd00`
- 技术风格渐变和网格背景
- 使用 `@import "tailwindcss"` 导入 Tailwind

#### PostCSS 配置

Tailwind CSS v4 自动处理所有必需的 PostCSS 插件，无需额外配置。配置文件位于 `frontend/postcss.config.mjs`。

#### Strapi API 客户端

Strapi API 客户端位于 `frontend/lib/strapi.ts`，提供以下功能：

- `getProducts()` - 获取产品列表
- `getFeaturedProducts(limit)` - 获取精选产品
- `getNewsList()` - 获取新闻列表
- `getFeaturedNews(limit)` - 获取精选新闻
- `getNewsBySlug(slug)` - 根据 slug 获取新闻详情
- `getAllNewsSlugs()` - 获取所有新闻 slug

### 后端配置（Strapi）

#### 环境变量

后端环境变量配置文件为 `backend/.env`：

```bash
# 服务器配置
HOST=0.0.0.0
PORT=1337

# 数据库配置
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# 安全密钥（生产环境必须修改）
APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
JWT_SECRET=tobemodified
ENCRYPTION_KEY=tobemodified

# 代理配置（可选，网络异常时使用）
# HTTP_PROXY=http://192.168.0.2:7897
# HTTPS_PROXY=http://192.168.0.2:7897
```

#### TypeScript 配置

配置文件为 `backend/tsconfig.json`：

- TypeScript 5.x
- 严格模式
- 目标 ES2020
- 自动生成类型（types/generated/）

#### 数据库配置

默认使用 SQLite 数据库，配置文件为 `backend/config/database.ts`：

- 数据库文件：`.tmp/data.db`
- 支持迁移系统
- 可配置其他数据库（PostgreSQL、MySQL 等）

#### API 配置

API 配置文件为 `backend/config/api.ts`：

- REST API 端点
- 响应时间限制
- 跨域配置

#### 权限配置

权限配置通过 Admin UI 管理：

1. 访问 `http://localhost:1337/admin`
2. 登录后进入 Settings → Users & Permissions → Roles
3. 配置 Public 和 Authenticated 角色的权限

**公开访问（Public）**：
- Product: find, findOne
- News: find, findOne

**认证访问（Authenticated）**：
- Product: create, update, delete
- News: create, update, delete

## 部署与运维

### Docker 部署

#### 前置条件
- Docker >= 20.10
- Docker Compose >= 2.0
- 域名已解析到服务器 IP（生产环境）

#### 开发环境部署

```bash
# 生成开发环境变量
cp ops/.env.dev.example ops/.env.dev

# 启动开发环境
docker compose -f ops/docker/docker-compose.dev.yml up -d

# 查看日志
docker compose -f ops/docker/docker-compose.dev.yml logs -f
```

#### 生产环境部署

**首次部署**：

```bash
# 1. 生成生产环境变量和密钥
./ops/generate-secrets.sh <your-domain>

# 2. 编辑 Nginx 站点配置，替换域名
vim ops/nginx/sites.conf

# 3. 构建并启动基础服务
docker compose -f ops/docker/docker-compose.prod.yml build
docker compose -f ops/docker/docker-compose.prod.yml up -d postgres backend frontend

# 4. 初始化 SSL 证书
docker compose -f ops/docker/docker-compose.prod.yml run --rm certbot /opt/init-cert.sh

# 5. 启动 Nginx 和 Certbot
docker compose -f ops/docker/docker-compose.prod.yml up -d nginx certbot
```

**更新部署**：

```bash
# 一键部署脚本
./ops/deploy.sh
```

**版本回滚**：

```bash
# 回滚到指定版本
./ops/rollback.sh <git-ref>
```

### 备份与恢复

#### 备份数据

```bash
# 执行备份
./ops/backups/backup.sh

# 查看备份文件
ls -lh ops/backups/
```

备份内容包括：
- PostgreSQL 数据库
- Strapi 上传的媒体文件
- 备份文件命名格式：`backup_<timestamp>_<db|media>.sql|tar.gz`

#### 恢复数据

```bash
# 恢复数据库
./ops/backups/restore.sh backup_20240101_120000_db.sql

# 恢复媒体文件
./ops/backups/restore.sh backup_20240101_120000_db.sql backup_20240101_120000_media.tar.gz
```

#### 定时备份

配置定时任务（编辑 `ops/backups/cron.txt`）：

```cron
# 每天凌晨 2 点执行备份
0 2 * * * /path/to/project/ops/backups/backup.sh
```

### SSL 证书管理

#### 证书初始化

```bash
docker compose -f ops/docker/docker-compose.prod.yml run --rm certbot /opt/init-cert.sh
```

确保 `ops/.env.prod` 中已配置：
- `DOMAINS` - 域名列表
- `LETSENCRYPT_EMAIL` - Let's Encrypt 邮箱

#### 证书续期

**手动续期**：

```bash
docker compose -f ops/docker/docker-compose.prod.yml exec -T certbot /opt/certbot-renew.sh
```

**自动续期**：

配置定时任务（编辑 `ops/docker/cron.txt`）：

```cron
# 每天凌晨 3 点检查并续期证书
0 3 * * * docker compose -f /path/to/project/ops/docker/docker-compose.prod.yml exec -T certbot /opt/certbot-renew.sh
```

### 健康检查

#### 前端健康检查

```bash
curl https://<your-domain>/healthz
```

返回示例：
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

#### 后端健康检查

```bash
curl https://<your-domain>/api/healthz
```

#### 服务状态检查

```bash
# 查看所有容器状态
docker compose -f ops/docker/docker-compose.prod.yml ps

# 查看特定服务日志
docker compose -f ops/docker/docker-compose.prod.yml logs -f frontend
docker compose -f ops/docker/docker-compose.prod.yml logs -f backend
```

### 监控与日志

#### 监控指标

参考 `ops/monitoring/metrics.md` 了解监控指标：
- 容器资源使用率（CPU、内存、磁盘）
- 响应时间和吞吐量
- 错误率和可用性
- 数据库连接数

#### 日志管理

```bash
# 查看实时日志
docker compose -f ops/docker/docker-compose.prod.yml logs -f

# 查看最近 100 行日志
docker compose -f ops/docker/docker-compose.prod.yml logs --tail=100

# 导出日志
docker compose -f ops/docker/docker-compose.prod.yml logs > app.log
```

### 故障排查

参考 `ops/monitoring/runbook.md` 和 `ops/DEPLOYMENT-OPS-MANUAL.md` 进行故障排查：

**常见问题**：

1. **证书获取失败**
   - 检查域名解析是否正确
   - 确认 80 端口可访问
   - 查看 Certbot 日志：`docker compose -f ops/docker/docker-compose.prod.yml logs certbot`

2. **服务启动失败**
   - 查看容器日志：`docker compose -f ops/docker/docker-compose.prod.yml logs <service>`
   - 检查环境变量配置
   - 验证端口占用情况

3. **数据库连接失败**
   - 检查 PostgreSQL 容器状态
   - 验证数据库连接配置
   - 查看数据库日志

4. **备份失败**
   - 检查备份目录权限
   - 确认磁盘空间充足
   - 验证数据库连接

### 环境配置

#### 开发环境

复制并编辑 `ops/.env.dev.example`：

```bash
cp ops/.env.dev.example ops/.env.dev
vim ops/.env.dev
```

#### 生产环境

复制并编辑 `ops/.env.prod.example`：

```bash
cp ops/.env.prod.example ops/.env.prod
vim ops/.env.prod
```

生产环境必须配置的安全变量：
- `DATABASE_PASSWORD` - 数据库密码
- `STRAPI_API_TOKEN_SALT` - API Token 盐值
- `STRAPI_ADMIN_JWT_SECRET` - Admin JWT 密钥
- `STRAPI_JWT_SECRET` - JWT 密钥
- `STRAPI_APP_KEYS` - 应用密钥（多个，逗号分隔）

### 运维文档

详细的运维文档请参考：
- [部署运维手册](ops/DEPLOYMENT-OPS-MANUAL.md)
- [运维目录说明](ops/README.md)
- [监控指标](ops/monitoring/metrics.md)
- [运维手册](ops/monitoring/runbook.md)

## 常见问题解答

### 前端相关

#### 如何添加新的产品？

1. **静态内容模式**：
   - 在 `frontend/content/products.ts` 中添加产品数据
   - 在 `frontend/types/product.ts` 中确保类型定义正确
   - 产品会自动显示在产品中心页面

2. **动态内容模式（Strapi CMS）**：
   - 登录 Strapi Admin UI (`http://localhost:1337/admin`)
   - 进入 Content Manager → Product Collection
   - 点击 "Create new entry" 添加产品
   - 填写产品信息并上传图片
   - 点击 "Save" 发布

#### 如何添加新的新闻？

1. **静态内容模式**：
   - 在 `frontend/content/news.ts` 中添加新闻数据
   - 在 `frontend/types/news.ts` 中确保类型定义正确
   - 新闻会自动显示在资讯中心页面

2. **动态内容模式（Strapi CMS）**：
   - 登录 Strapi Admin UI
   - 进入 Content Manager → News Collection
   - 点击 "Create new entry" 添加新闻
   - 填写新闻信息并上传图片
   - 点击 "Save" 发布

#### 如何修改主题颜色？

主题颜色在 `frontend/app/globals.css` 中通过 CSS 变量定义：
- `--zczk-blue` - 品牌蓝色
- `--zczk-gold` - 品牌金色

#### 如何添加新的页面？

在 `frontend/app/` 目录下创建新的文件夹和 `page.tsx` 文件，Next.js 会自动创建对应的路由。

例如，创建 `/services` 页面：
```
frontend/app/
└── services/
    └── page.tsx
```

#### 如何配置 SEO？

在各个页面的 `frontend/app/*/page.tsx` 中导出 `metadata` 对象，或使用 `generateMetadata` 函数动态生成元数据。

示例：
```typescript
export const metadata: Metadata = {
  title: '页面标题',
  description: '页面描述',
  openGraph: {
    title: '页面标题',
    description: '页面描述',
    images: ['/images/og-image.jpg'],
  },
}
```

### 后端相关

#### 如何配置数据库？

默认使用 SQLite，配置文件为 `backend/.env`：

```bash
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

如需使用其他数据库（PostgreSQL、MySQL），修改 `DATABASE_CLIENT` 并添加相应的数据库连接配置。

#### 如何重置数据库？

删除数据库文件并重启 Strapi：

```bash
cd backend
rm -f .tmp/data.db
npm run develop
```

#### 如何备份和恢复数据？

**备份数据库**：
```bash
cd backend
cp .tmp/data.db .tmp/data.db.backup
```

**恢复数据库**：
```bash
cd backend
cp .tmp/data.db.backup .tmp/data.db
```

**导出内容为 JSON**：
```bash
cd backend
npm run strapi export
```

**导入内容**：
```bash
cd backend
npm run strapi import <file>
```

#### 如何获取 API Token？

1. 登录 Strapi Admin UI
2. 进入 Settings → API Tokens
3. 点击 "Create new API Token"
4. 设置 Token 名称、描述和权限
5. 复制生成的 Token

### 开发相关

#### 如何启用 Strapi 动态内容？

1. 启动后端 Strapi CMS：`cd backend && npm run develop`
2. 在 `frontend/.env` 中设置 `NEXT_PUBLIC_STRAPI_URL=http://localhost:1337`
3. 修改前端页面代码，使用 `lib/strapi.ts` 中的 API 函数获取数据
4. 重启前端开发服务器

#### 如何导入现有内容到 Strapi？

```bash
cd backend
export STRAPI_URL="http://localhost:1337"
export STRAPI_TOKEN="<你的_API_TOKEN>"
npm run import:content
```

#### 如何调试 API 问题？

1. 检查 Strapi 日志：查看终端输出
2. 使用浏览器开发者工具查看网络请求
3. 检查权限配置：Admin UI → Settings → Users & Permissions
4. 验证环境变量：`NEXT_PUBLIC_STRAPI_URL` 是否正确

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 项目信息

### 项目状态

本项目已完成以下开发工作：

1. **前端开发**（已完成）
   - 从 React + Vite 迁移到 Next.js 15 App Router
   - 实现完整的页面路由和组件架构
   - 集成 Tailwind CSS v4 和 Radix UI 组件库
   - 实现响应式设计和主题切换功能
   - 完成产品中心、解决方案、资讯中心等核心页面

2. **后端开发**（已完成）
   - 基于 Strapi 5.33.4 搭建无头 CMS
   - 实现产品和新闻的内容管理功能
   - 配置用户权限和 API 访问控制
   - 提供内容导入脚本

3. **规格文档**
   - Next.js 迁移规格：`specs/001-nextjs-migration/`
   - Strapi 后端规格：`specs/001-strapi-backend-cms/`

### 技术支持

- **前端框架文档**：[Next.js 官方文档](https://nextjs.org/docs)
- **后端 CMS 文档**：[Strapi 官方文档](https://docs.strapi.io)
- **UI 组件文档**：[Radix UI](https://www.radix-ui.com)、[MUI](https://mui.com)
- **样式框架文档**：[Tailwind CSS](https://tailwindcss.com)

### 许可证

MIT License

### 联系方式

如有问题或建议，请联系项目维护者。

---

**公司信息**：
- 公司名称：深圳市中创智控技术有限公司
- 网站名称：中创智控
- 品牌口号：智慧交通安全预警领航者
- 联系电话：18823780560
- 邮箱：huangyan@szzczk.com
- 地址：深圳市龙华区民治街道民治大道与民新路交界处
