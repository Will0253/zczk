// types/navigation.ts

export interface NavItem {
  /** 导航项名称 */
  label: string
  /** 链接路径 */
  href: string
  /** 子菜单项 */
  children?: NavItem[]
  /** 是否在移动端显示 */
  showOnMobile?: boolean
}

export interface FooterSection {
  /** 分区标题 */
  title: string
  /** 链接列表 */
  links: FooterLink[]
}

export interface FooterLink {
  name: string
  href: string
  external?: boolean
}

export interface PageMetadata {
  /** 页面标题 */
  title: string
  /** 页面描述 */
  description: string
  /** Open Graph 图片 */
  ogImage?: string
  /** 关键词 */
  keywords?: string[]
  /** 是否禁止索引 */
  noIndex?: boolean
}

export interface PageConfig {
  /** 路由路径 */
  path: string
  /** 渲染策略 */
  renderingStrategy: 'ssg' | 'ssr' | 'isr' | 'csr'
  /** ISR 重新验证时间 (秒) */
  revalidate?: number
  /** 是否为动态路由 */
  dynamic: boolean
}
