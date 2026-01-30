import { Metadata } from 'next'
import { News } from '@/components/sections/News'
import { siteConfig } from '@/content/site-config'
import { buildNewsCategories } from '@/lib/categories'
import { getFeaturedNews, getNewsList } from '@/lib/strapi'
import type { NewsArticle } from '@/types/news'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  let news: NewsArticle[] = []
  try {
    news = await getNewsList()
  } catch {
    news = []
  }

  const hero = news[0]
  const description = hero?.summary || '聚焦行业前沿动态，发布最新企业资讯，解读智慧交通发展趋势。'
  const image = hero?.image || siteConfig.seo.ogImage

  return {
    title: `资讯中心 | ${siteConfig.name}`,
    description,
    openGraph: {
      title: `资讯中心 | ${siteConfig.name}`,
      description,
      images: image ? [{ url: image }] : [],
      type: 'website',
    },
  }
}

export default async function NewsPage() {
  const [news, featuredNews] = await Promise.all([getNewsList(), getFeaturedNews(3)])
  const categories = buildNewsCategories(news)

  return <News news={news} featuredNews={featuredNews} categories={categories} />
}
