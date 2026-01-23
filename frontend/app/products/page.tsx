import { Metadata } from 'next'
import { Products } from '@/components/sections/Products'
import { siteConfig } from '@/content/site-config'
import { buildProductCategories } from '@/lib/categories'
import { getProducts } from '@/lib/strapi'

export async function generateMetadata(): Promise<Metadata> {
  const products = await getProducts()
  const hero = products[0]
  const description = hero?.description || siteConfig.seo.defaultDescription
  const image = hero?.image || siteConfig.seo.ogImage

  return {
    title: `产品中心 | ${siteConfig.name}`,
    description,
    openGraph: {
      title: `产品中心 | ${siteConfig.name}`,
      description,
      url: `${siteConfig.seo.siteUrl}/products`,
      siteName: siteConfig.name,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: `${siteConfig.name} 产品中心`,
            },
          ]
        : [],
      locale: 'zh_CN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `产品中心 | ${siteConfig.name}`,
      description,
      images: image ? [image] : [],
    },
  }
}

export default async function ProductsPage() {
  const products = await getProducts()
  const categories = buildProductCategories(products)

  return <Products products={products} categories={categories} />
}

