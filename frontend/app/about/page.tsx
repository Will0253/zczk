import { Metadata } from 'next'
import { About } from '@/components/sections/About'
import { siteConfig } from '@/content/site-config'

export const metadata: Metadata = {
  title: `关于我们 | ${siteConfig.name}`,
  description: '了解中创智控 - 智能交通安全领域的行业领导者。成立于2015年，我们致力于通过AI技术和创新解决方案保护道路使用者安全。',
  openGraph: {
    title: `关于我们 | ${siteConfig.name}`,
    description: '了解中创智控 - 智能交通安全领域的行业领导者。成立于2015年，我们致力于通过AI技术和创新解决方案保护道路使用者安全。',
    type: 'website',
  },
}

export default function AboutPage() {
  return <About />
}
