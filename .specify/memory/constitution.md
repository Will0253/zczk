<!--
SYNC IMPACT REPORT
==================
Version Change: Initial → 1.0.0
Modified Principles: N/A (Initial Constitution)
Added Sections: 
  - Core Principles (6 principles defined)
  - 技术与安全约束
  - 开发工作流
  - Governance
Templates Status:
  ✅ plan-template.md - Reviewed, compatible
  ✅ spec-template.md - Reviewed, compatible
  ✅ tasks-template.md - Reviewed, compatible
  ✅ README.md - Updated with constitution reference
Follow-up TODOs: None
==================
-->

# [中创智控]官网建设项目 Constitution

## Core Principles

### I. 用户体验至上

- 所有设计和开发决策 MUST 以用户需求和体验为中心
- 界面交互 MUST 直观、流畅、无障碍
- 用户操作路径 MUST 简洁清晰，减少认知负担
- 页面信息架构 MUST 符合用户心智模型

**理由**: 官网是企业与用户的第一触点，优秀的用户体验直接影响品牌印象和转化率。

### II. 品牌一致性

- 视觉设计 MUST 严格遵循中创智控品牌规范
- 色彩、字体、图标、间距等 MUST 保持全站统一
- 文案风格 MUST 符合企业品牌调性
- 所有资产 MUST 使用品牌认可的标准素材

**理由**: 一致的品牌呈现强化企业专业形象，增强用户信任。

### III. 响应式设计

- 所有页面 MUST 在桌面、平板、移动设备上完美呈现
- 布局 MUST 采用流式/弹性设计，适应不同屏幕尺寸
- 触摸交互 MUST 在移动端有合理的点击区域（最小44x44px）
- 媒体资源 MUST 根据设备能力自适应加载

**理由**: 用户通过多种设备访问官网，响应式设计确保一致的跨端体验。

### IV. 高性能加载

- 首屏内容 MUST 在2秒内完成渲染
- 图片 MUST 使用现代格式（WebP/AVIF）并启用懒加载
- 代码 MUST 经过压缩、分包优化
- 关键资源 MUST 预加载，非关键资源延迟加载

**理由**: 页面加载速度直接影响用户留存率和搜索引擎排名。

### V. SEO友好

- 页面 MUST 具备完整的元数据（title、description、keywords）
- 内容结构 MUST 语义化，正确使用HTML标签层级
- URL MUST 简洁、描述性强、支持中文友好路径
- 网站 MUST 提供sitemap.xml和robots.txt
- 关键页面 MUST 支持服务端渲染（SSR）或静态生成（SSG）

**理由**: 良好的SEO确保目标客户能够通过搜索引擎发现企业官网。

### VI. 内容可维护性

- 内容与代码 MUST 分离，采用CMS或Headless CMS架构，支持非技术人员更新
- 文案、图片等 SHOULD 支持配置化或CMS管理
- 组件设计 MUST 高度复用，降低维护成本
- 更新操作 MUST 不需要重新部署整站

**理由**: 官网内容需频繁更新，可维护性确保运营效率。

## 技术与安全约束

### 无障碍性标准
- MUST遵循 WCAG 2.1 AA 级别无障碍标准
- 所有交互元素MUST支持键盘导航
- 图片MUST配置有意义的alt文本
- 颜色对比度MUST满足最低比例要求（正常文本4.5:1，大文本3:1）
- 表单MUST提供清晰的错误提示和帮助信息

### 浏览器兼容性
- MUST支持以下浏览器最新两个主要版本：
  - Chrome / Edge (Chromium)
  - Firefox
  - Safari (包括iOS Safari)
- 在不支持的浏览器中MUST显示友好提示

### 安全要求
- **XSS防护**: MUST对所有用户输入进行清理和转义；MUST实施内容安全策略（CSP）
- **CSRF防护**: MUST在所有状态变更操作中使用CSRF令牌
- **HTTPS强制**: 所有请求MUST通过HTTPS；HTTP请求MUST自动重定向至HTTPS；MUST配置HSTS头部
- **依赖管理**: MUST定期扫描和更新依赖库，修复已知安全漏洞

### 性能标准
- 首屏加载时间: < 2秒（Fast 3G）
- Lighthouse评分: 
  - Performance > 90
  - Accessibility > 90
  - Best Practices > 90
  - SEO > 90
- 核心Web指标（Core Web Vitals）:
  - LCP (Largest Contentful Paint) < 2.5s
  - FID (First Input Delay) < 100ms
  - CLS (Cumulative Layout Shift) < 0.1

## 开发工作流

### 标准流程
1. **设计评审**: 设计稿MUST经过品牌团队和技术团队联合评审，确认可行性和一致性
2. **前端开发**: 实施响应式布局和交互功能；MUST遵循组件化开发原则
3. **内容集成**: 内容团队录入和校对内容；配置SEO元数据
4. **QA测试**: 
   - 功能测试（跨浏览器、跨设备）
   - 性能测试（Lighthouse审计）
   - 无障碍测试（屏幕阅读器、键盘导航）
   - 安全测试（OWASP Top 10检查）
5. **上线部署**: 执行部署检查清单；确认回滚机制可用

### 质量门禁
- 设计评审 → 前端开发: 设计稿MUST获得所有相关方签字批准
- 前端开发 → 内容集成: 页面MUST通过技术自测，Lighthouse各项指标达标
- 内容集成 → QA测试: 内容MUST完整录入，无占位符或lorem ipsum
- QA测试 → 上线部署: 所有P0/P1缺陷MUST修复，测试用例通过率 ≥ 95%

### 部署策略
- MUST使用蓝绿部署或金丝雀发布策略
- MUST配置完整的回滚机制（< 5分钟回滚时间）
- MUST在生产环境部署前在预发布环境完整验证
- MUST配置监控告警，及时发现和响应生产问题

## Governance

### 宪章地位
- 本宪章是[中创智控]官网建设项目的最高技术与流程准则
- 所有设计、开发、测试、部署活动MUST遵循本宪章规定
- 任何违反宪章的决策MUST在项目文档中明确记录理由和风险

### 修订流程
- 宪章修订MUST由项目负责人发起，经技术委员会评审批准
- 修订MUST包含：变更理由、影响范围分析、迁移方案（如适用）
- 修订MUST采用语义化版本控制：
  - **MAJOR**: 移除或重新定义核心原则，影响架构决策
  - **MINOR**: 新增原则或约束，扩展现有指导
  - **PATCH**: 文字澄清、错别字修正，无语义变化
- 所有修订MUST同步更新相关模板和文档（plan-template.md, spec-template.md, tasks-template.md等）

### 合规检查
- 所有PR/MR MUST在审查时验证与宪章的符合性
- 复杂度引入（如新增技术栈、架构模式）MUST提供书面理由
- QA测试MUST包含宪章合规性检查项（性能、安全、无障碍等）
- 项目复盘MUST评估宪章执行情况，识别改进机会

### 参考资料
- 运行时开发指导请参考 `.specify/templates/` 目录下的各类模板文件
- 品牌规范请参考 [中创智控]品牌手册（内部文档）
- 技术栈选型和最佳实践请参考项目 README.md

**Version**: 1.0.0 | **Ratified**: 2026-01-17 | **Last Amended**: 2026-01-17