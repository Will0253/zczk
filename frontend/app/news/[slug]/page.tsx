import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NewsDetail } from '@/components/sections/NewsDetail'
import { getNewsBySlug, getAllNewsSlugs } from '@/content/news'
import { siteConfig } from '@/content/site-config'

interface NewsDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

// 生成静态路由参数
export async function generateStaticParams() {
  const slugs = getAllNewsSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

// 生成动态元数据
export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getNewsBySlug(slug)
  
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
  const article = getNewsBySlug(slug)

  if (!article) {
    notFound()
  }

  return <NewsDetail article={article} />
}
