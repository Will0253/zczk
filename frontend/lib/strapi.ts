import type { Product } from '@/types/product'
import type { NewsArticle } from '@/types/news'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

type StrapiMedia = {
  url?: string
  alternativeText?: string
  data?: {
    attributes?: {
      url?: string
      alternativeText?: string
    }
  }
}

type StrapiMediaArray = {
  data?: Array<{
    attributes?: {
      url?: string
      alternativeText?: string
    }
  }>
}

type StrapiEntry<T> = {
  id?: number
  attributes?: T
} & T

type StrapiResponse<T> = {
  data: Array<StrapiEntry<T>>
}

function resolveMediaUrl(url?: string) {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `${STRAPI_URL}${url}`
}

function getMediaUrl(media?: StrapiMedia | null) {
  if (!media) return ''
  if (media.url) return resolveMediaUrl(media.url)
  return resolveMediaUrl(media.data?.attributes?.url)
}

function getMediaArrayUrls(media?: StrapiMediaArray | Array<StrapiMedia> | null) {
  if (!media) return []
  if (Array.isArray(media)) {
    return media.map((item) => getMediaUrl(item)).filter(Boolean)
  }
  return media.data?.map((item) => resolveMediaUrl(item.attributes?.url)).filter(Boolean) || []
}

function mapProduct(entry: StrapiEntry<Record<string, unknown>>): Product {
  const attrs = (entry as { attributes?: Record<string, unknown> }).attributes ?? entry
  const image = attrs.image as StrapiMedia | undefined
  const gallery = attrs.gallery as StrapiMediaArray | Array<StrapiMedia> | undefined
  const galleryUrls = getMediaArrayUrls(gallery)
  const primaryImage = getMediaUrl(image) || galleryUrls[0] || ''

  return {
    slug: (attrs.slug as string) || '',
    name: (attrs.name as string) || '',
    shortDescription: (attrs.shortDescription as string) || '',
    description: (attrs.description as string) || '',
    category: (attrs.category as Product['category']) || 'warning',
    image: primaryImage,
    gallery: galleryUrls,
    features: (attrs.features as Product['features']) || [],
    specifications: (attrs.specifications as Product['specifications']) || undefined,
    featured: Boolean(attrs.featured),
    order: Number(attrs.order ?? 0),
    taobaoLink: (attrs.taobaoLink as string) || '',
  }
}

function mapNews(entry: StrapiEntry<Record<string, unknown>>): NewsArticle {
  const attrs = (entry as { attributes?: Record<string, unknown> }).attributes ?? entry
  const image = attrs.image as StrapiMedia | undefined
  const fallbackImage = '/images/news/news-2.jpg'

  return {
    slug: (attrs.slug as string) || '',
    title: (attrs.title as string) || '',
    summary: (attrs.summary as string) || '',
    content: (attrs.content as string) || '',
    category: (attrs.category as string) || 'product',
    image: getMediaUrl(image) || fallbackImage,
    publishedAt: (attrs.publishedAt as string) || '',
    author: (attrs.author as string) || '',
    featured: Boolean(attrs.featured),
    tags: (attrs.tags as string[]) || [],
    updatedAt: (attrs.updatedAt as string) || undefined,
    viewCount: (attrs.viewCount as number) || 0,
    relatedProducts: (attrs.relatedProducts as string[]) || undefined,
  }
}

async function fetchStrapi<T>(path: string, revalidate = 60): Promise<T> {
  const res = await fetch(`${STRAPI_URL}${path}`, {
    next: { revalidate },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Strapi request failed (${res.status}): ${text}`)
  }

  return res.json() as Promise<T>
}

export async function getProducts(): Promise<Product[]> {
  const json = await fetchStrapi<StrapiResponse<Record<string, unknown>>>(
    '/api/products?populate[0]=image&populate[1]=gallery&sort[0]=order:asc'
  )
  return json.data.map(mapProduct)
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  const json = await fetchStrapi<StrapiResponse<Record<string, unknown>>>(
    `/api/products?populate[0]=image&sort[0]=publishedAt:desc&pagination[limit]=${limit}`
  )
  return json.data.map(mapProduct)
}

export async function getNewsList(): Promise<NewsArticle[]> {
  const json = await fetchStrapi<StrapiResponse<Record<string, unknown>>>(
    '/api/news?populate[0]=image&sort[0]=publishedAt:desc'
  )
  return json.data.map(mapNews)
}

export async function getFeaturedNews(limit = 3): Promise<NewsArticle[]> {
  const json = await fetchStrapi<StrapiResponse<Record<string, unknown>>>(
    `/api/news?populate[0]=image&sort[0]=publishedAt:desc&pagination[limit]=${limit}`
  )
  return json.data.map(mapNews)
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  const json = await fetchStrapi<StrapiResponse<Record<string, unknown>>>(
    `/api/news?populate[0]=image&filters[slug][$eq]=${encodeURIComponent(slug)}`
  )
  const entry = json.data?.[0]
  return entry ? mapNews(entry) : null
}

export async function getAllNewsSlugs(): Promise<string[]> {
  const json = await fetchStrapi<StrapiResponse<Record<string, unknown>>>(
    '/api/news?fields[0]=slug&pagination[limit]=100'
  )
  return json.data.map((entry) => (entry.attributes?.slug as string) || (entry.slug as string))
}
