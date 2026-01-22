// types/solution.ts

export interface SolutionScenario {
  id: string
  name: string
  icon: string
}

export interface SolutionHighlight {
  title: string
  description: string
  icon?: string
}

export interface CaseStudy {
  title: string
  client: string
  description: string
  image?: string
  results?: string[]
}

export type SolutionIndustry = 
  | 'highway'       // 高速公路
  | 'urban-traffic' // 城市交通
  | 'construction'  // 施工工地
  | 'parking'       // 停车场
  | 'other'         // 其他

export interface Solution {
  /** 唯一标识符，用于 URL slug */
  slug: string
  /** 方案标题 */
  title: string
  /** 短标题 */
  shortTitle: string
  /** 方案详细描述 */
  description: string
  /** 场景ID */
  scenario: string
  /** 主图片 URL */
  image: string
  /** 痛点列表 */
  painPoints: string[]
  /** 方案价值 */
  benefits: string[]
  /** 是否精选 */
  featured: boolean
  /** 排序权重 */
  order: number
  /** 方案亮点 */
  highlights?: SolutionHighlight[]
  /** 关联产品 slug 列表 */
  relatedProducts?: string[]
  /** 案例研究 */
  caseStudies?: CaseStudy[]
}
