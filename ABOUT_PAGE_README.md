# 关于我们页面使用说明

## 文件结构

已创建了两个新文件：

1. **`/src/app/components/About.tsx`** - 关于我们的内容组件
2. **`/src/app/AboutPage.tsx`** - 完整的关于我们页面（包含导航栏、背景、Footer等）

## 使用方法

### 方法一：替换当前首页（临时查看）

如果您想临时查看"关于我们"页面，可以将 `/src/app/App.tsx` 的默认导出改为 `AboutPage`：

```tsx
// 在 /src/app/App.tsx 顶部添加导入
import AboutPage from './AboutPage';

// 将默认导出改为
export default AboutPage;
```

### 方法二：添加简单的页面切换

在 `App.tsx` 中添加一个简单的状态切换：

```tsx
import { useState } from 'react';
import HomePage from './App';  // 重命名当前的 App
import AboutPage from './AboutPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home');
  
  if (currentPage === 'about') {
    return <AboutPage />;
  }
  
  return <HomePage />;
}
```

### 方法三：集成路由系统（推荐用于生产环境）

如果需要完整的路由功能，建议安装 `react-router-dom`：

```bash
npm install react-router-dom
```

然后在 `App.tsx` 中配置路由：

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';  // 将原 App.tsx 重命名
import AboutPage from './AboutPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 页面内容

"关于我们"页面包含以下模块，完全遵循现有的设计规范：

### 1. 企业简介
- 公司成立时间、定位、核心业务
- 技术积累与产品体系介绍
- 应用场景概述

### 2. 企业数据（3个统计卡片）
- 技术团队：100+
- 核心专利：50+
- 成功案例：200+

### 3. 企业愿景与使命
- **企业使命**：依托核心技术，推动交通预警智能化、主动化升级
- **企业愿景**：成为全球最值得信赖的智慧交通安全预警专家
- **核心价值观**：专业致胜、创新不止、客户至上、安全为本

### 4. 核心技术优势（4个技术点）
- AI 行为算法
- 多维融合感知
- 云边协同
- 军工级品质

### 5. 专业团队 & 研发实力
- 团队介绍
- 产学研深度合作
- 快速响应机制

## 设计特点

页面严格遵循了 ZCZK 的品牌视觉语言：

- ✅ 配色方案：海军蓝（#11345b）+ 金黄色（#fdbd00）
- ✅ 磨砂玻璃质感（backdrop-blur-xl）
- ✅ 流光边框和发光效果
- ✅ Motion 动画库的滚动入场效果
- ✅ 复杂的 hover 微交互
- ✅ 响应式布局设计
- ✅ 科技感背景架构（网格、发光球体、六边形图案）

## 注意事项

- 当前首页（`/src/app/App.tsx`）保持完全不变
- 所有图标已验证可用（来自 lucide-react）
- 页面完全响应式，适配移动端和桌面端
- 所有动效与现有组件风格一致
