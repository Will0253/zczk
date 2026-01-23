import type { Product, ProductCategory } from '@/types/product'
import type { NewsArticle, NewsCategory } from '@/types/news'

const productCategoryLabels: Record<ProductCategory, string> = {
  warning: '智能预警硬件',
  sensing: '监测感知设备',
  inspection: '无人巡检系统',
}

const newsCategoryLabels: Record<string, string> = {
  product: '产品动态',
  tech: '技术迭代',
  standard: '标准制定',
  company: '公司新闻',
}

export function buildProductCategories(products: Product[]) {
  const counts = products.reduce<Record<string, number>>((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1
    return acc
  }, {})

  return [
    { id: 'all' as const, name: '全部产品', count: products.length },
    ...Object.entries(productCategoryLabels).map(([id, name]) => ({
      id: id as ProductCategory,
      name,
      count: counts[id] || 0,
    })),
  ]
}

export function buildNewsCategories(news: NewsArticle[]): NewsCategory[] {
  const counts = news.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1
    return acc
  }, {})

  return [
    { id: 'all', name: '全部', count: news.length },
    ...Object.entries(newsCategoryLabels).map(([id, name]) => ({
      id,
      name,
      count: counts[id] || 0,
    })),
  ]
}
