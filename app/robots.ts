import { MetadataRoute } from 'next'
import { siteConfig } from '@/content/site-config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/_next/'],
    },
    sitemap: `${siteConfig.seo.siteUrl}/sitemap.xml`,
  }
}
