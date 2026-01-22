import { Metadata } from 'next'
import { Products } from '@/components/sections/Products'
import { siteConfig } from '@/content/site-config'

export const metadata: Metadata = {
  title: `产品中心 | ${siteConfig.name}`,
  description: '汇集尖端智慧交通科技，从智能感知硬件到云端管理平台，为您提供全方位的安全预警解决方案。浏览智能预警路锥、AI布控球、声场预警系统等全线产品。',
  openGraph: {
    title: `产品中心 | ${siteConfig.name}`,
    description: '汇集尖端智慧交通科技，从智能感知硬件到云端管理平台，为您提供全方位的安全预警解决方案。',
    url: `${siteConfig.seo.siteUrl}/products`,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} 产品中心`,
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `产品中心 | ${siteConfig.name}`,
    description: '汇集尖端智慧交通科技，从智能感知硬件到云端管理平台，为您提供全方位的安全预警解决方案。',
    images: [siteConfig.seo.ogImage],
  },
}

export default function ProductsPage() {
  return <Products />
}
