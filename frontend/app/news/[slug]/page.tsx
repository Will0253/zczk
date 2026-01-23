import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NewsDetail } from '@/components/sections/NewsDetail'
import { siteConfig } from '@/content/site-config'
import { buildNewsCategories } from '@/lib/categories'
import { getAllNewsSlugs, getNewsBySlug, getNewsList } from '@/lib/strapi'

interface NewsDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

// 生成静态路由参数
export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

// 生成动态元数据
export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getNewsBySlug(slug)
  
  if (!article) {
    return {
      title: `资讯未找到 | ${siteConfig.name}`,
    }
  }

  return {
    title: `${article.title} | ${siteConfig.name}`,
    description: article.summary,
    openGraph: {
      title: `${article.title} | ${siteConfig.name}`,
      description: article.summary,
      images: article.image ? [{ url: article.image }] : [],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: article.tags,
    },
  }
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params
  const [article, allNews] = await Promise.all([
    getNewsBySlug(slug),
    getNewsList(),
  ])

  if (!article) {
    notFound()
  }

  const categories = buildNewsCategories(allNews)
  const recentNews = allNews.slice(0, 4)

  return (
    <NewsDetail
      article={article}
      allNews={allNews}
      recentNews={recentNews}
      categories={categories}
    />
  )
}
