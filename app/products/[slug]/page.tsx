import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductDetail } from '@/components/sections/ProductDetail'
import { getProductBySlug, getAllProductSlugs } from '@/content/products'
import { siteConfig } from '@/content/site-config'

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

// 生成静态路由参数
export async function generateStaticParams() {
  const slugs = getAllProductSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

// 生成动态元数据
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return {
      title: '产品未找到',
    }
  }

  return {
    title: `${product.name} | ${siteConfig.name}`,
    description: product.description,
    openGraph: {
      title: `${product.name} | ${siteConfig.name}`,
      description: product.description,
      url: `${siteConfig.seo.siteUrl}/products/${slug}`,
      siteName: siteConfig.name,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      locale: 'zh_CN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | ${siteConfig.name}`,
      description: product.description,
      images: [product.image],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}
