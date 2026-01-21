// types/product.ts

export interface ProductFeature {
  label: string
  value: string
}

export type ProductCategory = 
  | 'warning'     // 智能预警硬件
  | 'sensing'     // 监测感知设备
  | 'inspection'  // 无人巡检系统

export interface Product {
  /** 唯一标识符，用于 URL slug */
  slug: string
  /** 产品名称 */
  name: string
  /** 产品简短描述 */
  shortDescription: string
  /** 产品详细描述 */
  description: string
  /** 产品分类 */
  category: ProductCategory
  /** 主图片 URL */
  image: string
  /** 产品图库 */
  gallery?: string[]
  /** 产品特性列表 */
  features: ProductFeature[]
  /** 技术规格 */
  specifications?: Record<string, string>
  /** 是否在首页展示 */
  featured: boolean
  /** 排序权重 (越大越靠前) */
  order: number
  /** 淘宝链接 */
  taobaoLink: string
}
