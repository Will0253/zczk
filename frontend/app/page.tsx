import { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { BusinessScenarios } from '@/components/sections/BusinessScenarios'
import { ProductMatrix } from '@/components/sections/ProductMatrix'
import { TechnicalStrength } from '@/components/sections/TechnicalStrength'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { Services } from '@/components/sections/Services'
import { NewsFeed } from '@/components/sections/NewsFeed'
import { siteConfig } from '@/content/site-config'
import { buildNewsCategories } from '@/lib/categories'
import { getFeaturedNews, getFeaturedProducts } from '@/lib/strapi'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription,
  openGraph: {
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    url: siteConfig.seo.siteUrl,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [siteConfig.seo.ogImage],
  },
}

export default async function HomePage() {
  const [featuredProducts, featuredNews] = await Promise.all([
    getFeaturedProducts(6),
    getFeaturedNews(3),
  ])
  const newsCategories = buildNewsCategories(featuredNews)

  return (
    <>
      {/* 首屏 Hero */}
      <Hero />
      
      {/* 核心业务场景 */}
      <BusinessScenarios />
      
      {/* 智能硬件集群 */}
      <ProductMatrix products={featuredProducts} />
      
      {/* 技术实力与优势 */}
      <TechnicalStrength />
      
      {/* 标杆案例 */}
      <CaseStudies />
      
      {/* 企业服务与保障 */}
      <Services />
      
      {/* 资讯动态 */}
      <NewsFeed newsItems={featuredNews} categories={newsCategories} />
    </>
  )
}
