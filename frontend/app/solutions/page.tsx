import { Metadata } from 'next'
import { Solutions } from '@/components/sections/Solutions'
import { siteConfig } from '@/content/site-config'

export const metadata: Metadata = {
  title: `解决方案 | ${siteConfig.name}`,
  description: '深度融合人工智能、物联网与大数据技术，针对高速公路、隧道工程、桥梁养护及城市交通等不同场景，打造"感知-决策-预警"全链路闭环。',
  openGraph: {
    title: `解决方案 | ${siteConfig.name}`,
    description: '场景化智慧交通解决方案，让交通更安全、管理更高效。',
    type: 'website',
  },
}

export default function SolutionsPage() {
  return <Solutions />
}
