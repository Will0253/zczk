// types/news.ts

export interface NewsCategory {
  id: string
  name: string
  count: number
}

export type NewsCategoryId = 
  | 'all'       // 全部
  | 'product'   // 产品动态
  | 'tech'      // 技术迭代
  | 'standard'  // 标准制定
  | 'company'   // 公司新闻

export interface NewsArticle {
  /** 唯一标识符，用于 URL slug */
  slug: string
  /** 文章标题 */
  title: string
  /** 文章摘要 */
  summary: string
  /** 文章正文 (Markdown 或 HTML) */
  content: string
  /** 文章分类 */
  category: string
  /** 封面图片 URL */
  image: string
  /** 发布日期 (ISO 8601) */
  publishedAt: string
  /** 作者 */
  author: string
  /** 是否置顶 */
  featured: boolean
  /** 标签列表 */
  tags: string[]
  /** 更新日期 (ISO 8601) */
  updatedAt?: string
  /** 阅读次数 */
  viewCount?: number
  /** 关联产品 slug 列表 */
  relatedProducts?: string[]
}
