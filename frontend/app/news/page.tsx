import { Metadata } from 'next'
import { News } from '@/components/sections/News'
import { siteConfig } from '@/content/site-config'

export const metadata: Metadata = {
  title: `资讯中心 | ${siteConfig.name}`,
  description: '聚焦行业前沿动态，发布最新企业资讯，解读智慧交通发展趋势。',
  openGraph: {
    title: `资讯中心 | ${siteConfig.name}`,
    description: '聚焦行业前沿动态，发布最新企业资讯，解读智慧交通发展趋势。',
    type: 'website',
  },
}

export default function NewsPage() {
  return <News />
}
