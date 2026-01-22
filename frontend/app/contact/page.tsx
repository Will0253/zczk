import { Metadata } from 'next'
import { Contact } from '@/components/sections/Contact'
import { siteConfig } from '@/content/site-config'

export const metadata: Metadata = {
  title: `联系我们 | ${siteConfig.name}`,
  description: '联系中创智控 - 商务合作、技术支持、综合事务咨询。我们的团队随时为您提供专业的解答与支持。',
  openGraph: {
    title: `联系我们 | ${siteConfig.name}`,
    description: '联系中创智控 - 商务合作、技术支持、综合事务咨询。我们的团队随时为您提供专业的解答与支持。',
    type: 'website',
  },
}

export default function ContactPage() {
  return <Contact />
}
