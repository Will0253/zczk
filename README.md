# ZCZK 智能交通安全网站

一个现代化的智能交通安全解决方案展示网站，基于 React 和 Vite 构建，提供丰富的交互体验和专业的产品展示。

## 技术栈

### 核心框架
- **React 18.3.1** - 用户界面库
- **React Router DOM 7.11.0** - 路由管理
- **Vite 6.3.5** - 构建工具和开发服务器

### 样式与 UI
- **Tailwind CSS 4.1.12** - 原子化 CSS 框架
- **Radix UI** - 无障碍组件库
  - Accordion, Alert Dialog, Avatar, Checkbox, Dialog
  - Dropdown Menu, Hover Card, Label, Menubar
  - Navigation Menu, Popover, Progress, Radio Group
  - Scroll Area, Select, Separator, Slider, Switch
  - Tabs, Toggle, Tooltip 等
- **MUI (Material UI) 7.3.5** - Material Design 组件库
  - @mui/material
  - @mui/icons-material
- **Motion (Framer Motion) 12.23.24** - 动画库
- **Lucide React 0.487.0** - 图标库

### 功能库
- **date-fns 3.6.0** - 日期处理
- **recharts 2.15.2** - 图表库
- **react-hook-form 7.55.0** - 表单管理
- **react-dnd 16.0.1** - 拖拽功能
- **embla-carousel-react 8.6.0** - 轮播图
- **react-slick 0.31.0** - 滑块组件
- **sonner 2.0.3** - Toast 通知
- **next-themes 0.4.6** - 主题切换

### 工具库
- **clsx 2.1.1** - 条件类名
- **tailwind-merge 3.2.0** - Tailwind 类名合并
- **class-variance-authority 0.7.1** - 类名变体管理

### 包管理器
- **pnpm** - 快速、节省磁盘空间的包管理器

## 项目结构

```
zczk/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── figma/              # Figma 相关组件
│   │   │   │   └── ImageWithFallback.tsx
│   │   │   ├── ui/                 # UI 基础组件（基于 Radix UI）
│   │   │   │   ├── accordion.tsx
│   │   │   │   ├── alert-dialog.tsx
│   │   │   │   ├── alert.tsx
│   │   │   │   ├── aspect-ratio.tsx
│   │   │   │   ├── avatar.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── breadcrumb.tsx
│   │   │   │   ├── button.tsx
│   │   │   │   ├── calendar.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── carousel.tsx
│   │   │   │   ├── chart.tsx
│   │   │   │   ├── checkbox.tsx
│   │   │   │   ├── collapsible.tsx
│   │   │   │   ├── command.tsx
│   │   │   │   ├── context-menu.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── drawer.tsx
│   │   │   │   ├── dropdown-menu.tsx
│   │   │   │   ├── form.tsx
│   │   │   │   ├── hover-card.tsx
│   │   │   │   ├── input-otp.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── label.tsx
│   │   │   │   ├── menubar.tsx
│   │   │   │   ├── navigation-menu.tsx
│   │   │   │   ├── pagination.tsx
│   │   │   │   ├── popover.tsx
│   │   │   │   ├── progress.tsx
│   │   │   │   ├── radio-group.tsx
│   │   │   │   ├── resizable.tsx
│   │   │   │   ├── scroll-area.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── separator.tsx
│   │   │   │   ├── sheet.tsx
│   │   │   │   ├── sidebar.tsx
│   │   │   │   ├── skeleton.tsx
│   │   │   │   ├── slider.tsx
│   │   │   │   ├── sonner.tsx
│   │   │   │   ├── switch.tsx
│   │   │   │   ├── table.tsx
│   │   │   │   ├── tabs.tsx
│   │   │   │   ├── textarea.tsx
│   │   │   │   ├── toggle-group.tsx
│   │   │   │   ├── toggle.tsx
│   │   │   │   ├── tooltip.tsx
│   │   │   │   ├── use-mobile.ts
│   │   │   │   └── utils.ts
│   │   │   ├── About.tsx           # 关于我们组件
│   │   │   ├── BusinessScenarios.tsx # 业务场景组件
│   │   │   ├── CaseStudies.tsx     # 案例研究组件
│   │   │   ├── Contact.tsx         # 联系我们组件
│   │   │   ├── Footer.tsx          # 页脚组件
│   │   │   ├── Hero.tsx            # 首页英雄区域
│   │   │   ├── HighwaySolutionDetail.tsx # 高速公路解决方案详情
│   │   │   ├── Navigation.tsx      # 导航栏组件
│   │   │   ├── News.tsx            # 新闻组件
│   │   │   ├── NewsFeed.tsx        # 新闻列表组件
│   │   │   ├── ProductDetail.tsx   # 产品详情组件
│   │   │   ├── ProductMatrix.tsx   # 产品矩阵组件
│   │   │   ├── Products.tsx        # 产品组件
│   │   │   ├── ScrollToTop.tsx     # 滚动到顶部组件
│   │   │   ├── Services.tsx        # 服务组件
│   │   │   ├── Solutions.tsx       # 解决方案组件
│   │   │   └── TechnicalStrength.tsx # 技术实力组件
│   │   ├── AboutPage.tsx           # 关于我们页面
│   │   ├── App.tsx                 # 应用主组件
│   │   ├── ContactPage.tsx         # 联系我们页面
│   │   ├── HomePage.tsx            # 首页
│   │   ├── NewsDetailPage.tsx      # 新闻详情页面
│   │   ├── NewsPage.tsx            # 新闻列表页面
│   │   ├── ProductDetailPage.tsx   # 产品详情页面
│   │   ├── ProductsPage.tsx       # 产品列表页面
│   │   └── SolutionsPage.tsx       # 解决方案页面
│   ├── styles/
│   │   ├── fonts.css               # 字体样式
│   │   ├── index.css               # 全局样式
│   │   ├── tailwind.css            # Tailwind 配置
│   │   └── theme.css               # 主题样式
│   └── main.tsx                    # 应用入口
├── .gitignore                      # Git 忽略文件
├── index.html                      # HTML 模板
├── package.json                    # 项目配置
├── pnpm-lock.yaml                  # pnpm 锁文件
├── postcss.config.mjs              # PostCSS 配置
├── vite.config.ts                  # Vite 配置
└── README.md                       # 项目说明文档
```

## 安装

### 前置要求
- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
pnpm install
```

## 启动

### 开发模式

```bash
pnpm dev
```

开发服务器将在 `http://localhost:5173` 启动。

### 预览生产构建

```bash
pnpm preview
```

预览生产构建，启动本地服务器查看构建后的效果。

### 生产构建

```bash
pnpm build
```

构建产物将输出到 `dist/` 目录。

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

## 特性

- 现代化的响应式设计
- 基于 Tailwind CSS 的原子化样式
- 丰富的动画效果（Motion/Framer Motion）
- 无障碍友好的 UI 组件（Radix UI）
- Material Design 组件（MUI）
- 路由管理（React Router）
- 图表展示（Recharts）
- 表单管理（React Hook Form）
- Toast 通知（Sonner）
- 拖拽功能（React DnD）
- 轮播图（Embla Carousel）
- 主题切换支持

## 配置说明

### Vite 配置

项目使用 Vite 作为构建工具，配置文件为 `vite.config.ts`：

- 支持 React JSX
- 集成 Tailwind CSS
- 配置路径别名 `@` 指向 `src` 目录

### Tailwind CSS 配置

使用 Tailwind CSS v4，通过 `@tailwindcss/vite` 插件自动配置。

### PostCSS 配置

Tailwind CSS v4 自动处理所有必需的 PostCSS 插件，无需额外配置。

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 许可证

私有项目

## 联系方式

如有问题或建议，请联系项目维护者。
