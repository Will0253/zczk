'use client'

import { motion } from 'motion/react'
import { Calendar, User, Eye, Search, ChevronRight, Share2, MessageCircle, ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import { Mermaid } from '@/components/sections/Mermaid'
import type { NewsArticle, NewsCategory } from '@/types/news'

interface NewsDetailProps {
  article: NewsArticle
  allNews: NewsArticle[]
  recentNews: NewsArticle[]
  categories: NewsCategory[]
}

export function NewsDetail({ article, allNews, recentNews, categories }: NewsDetailProps) {
  const filteredRecent = recentNews.filter(n => n.slug !== article.slug).slice(0, 4)
  
  // 获取上一篇和下一篇
  const currentIndex = allNews.findIndex(n => n.slug === article.slug)
  const prevArticle = currentIndex > 0 ? allNews[currentIndex - 1] : null
  const nextArticle = currentIndex < allNews.length - 1 ? allNews[currentIndex + 1] : null

  return (
    <div className="bg-white">
      {/* Header Section */}
      <section className="relative pt-32 pb-20 bg-[#11345b] overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#fdbd00]/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#11345b]/40 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
          <div 
            className="absolute inset-0 opacity-[0.05]" 
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, white 10px, white 11px)`
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">资讯中心</h1>
            <nav className="flex items-center gap-2 text-white/60 text-sm">
              <Link href="/" className="hover:text-[#fdbd00] transition-colors">首页</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/news" className="hover:text-[#fdbd00] transition-colors">资讯中心</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-[#fdbd00] line-clamp-1 max-w-[200px]">{article.title}</span>
            </nav>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Article column */}
            <div className="lg:w-2/3">
              <motion.article
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Meta Header */}
                <div className="mb-8">
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="px-4 py-1.5 bg-[#fdbd00] text-[#11345b] text-xs font-black rounded-full shadow-sm">
                      {categories.find(c => c.id === article.category)?.name || article.category}
                    </span>
                    {article.tags?.slice(0, 2).map(tag => (
                      <span key={tag} className="px-4 py-1.5 bg-gray-100 text-[#11345b] text-xs font-black rounded-full shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#11345b] mb-6 leading-tight">
                    {article.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#fdbd00]" />
                      {article.publishedAt}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#fdbd00]" />
                      {article.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-[#fdbd00]" />
                      {Math.floor(Math.random() * 3000) + 1000} 次阅读
                    </div>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="rounded-[40px] overflow-hidden shadow-2xl mb-12 group relative aspect-video">
                  <ImageWithFallback 
                    src={article.image} 
                    alt={article.title} 
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-1000"
                  />
                </div>

                {/* Article Body */}
                <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                  {/* Summary */}
                  <p className="text-xl text-gray-700 font-medium mb-8">
                    {article.summary}
                  </p>
                  
                  {/* Content - 渲染 Markdown 内容 */}
                  <div className="space-y-6">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        img: ({ src, alt }) => (
                          <img
                            src={normalizeUrl(src)}
                            alt={alt ?? ''}
                            className="max-w-full rounded-2xl shadow-md"
                          />
                        ),
                        code: ({ className, children }) => {
                          const language = className?.replace('language-', '')
                          if (language === 'mermaid') {
                            return <Mermaid code={String(children)} />
                          }
                          return (
                            <code className={className}>
                              {children}
                            </code>
                          )
                        },
                        table: ({ children }) => (
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-sm">
                              {children}
                            </table>
                          </div>
                        ),
                        th: ({ children }) => (
                          <th className="border border-gray-200 bg-gray-50 px-3 py-2 text-left font-semibold text-gray-700">
                            {children}
                          </th>
                        ),
                        td: ({ children }) => (
                          <td className="border border-gray-200 px-3 py-2 align-top text-gray-600">
                            {children}
                          </td>
                        ),
                      }}
                    >
                      {article.content || ''}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* Footer Meta */}
                <div className="mt-16 pt-10 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-gray-400 font-bold mr-2 text-sm uppercase tracking-wider">标签:</span>
                      {article.tags?.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-500 text-xs font-bold rounded-md hover:bg-[#11345b] hover:text-white transition-colors cursor-pointer">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400 font-bold text-sm uppercase tracking-wider">分享:</span>
                      <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all">
                          <MessageCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {prevArticle ? (
                    <Link href={`/news/${prevArticle.slug}`} className="group p-8 rounded-[32px] bg-white border border-gray-100 hover:shadow-xl transition-all flex flex-col gap-2">
                      <span className="text-gray-400 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                        <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                        上一篇
                      </span>
                      <span className="text-[#11345b] font-bold group-hover:text-[#fdbd00] transition-colors line-clamp-1">
                        {prevArticle.title}
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {nextArticle ? (
                    <Link href={`/news/${nextArticle.slug}`} className="group p-8 rounded-[32px] bg-white border border-gray-100 hover:shadow-xl transition-all flex flex-col gap-2 text-right items-end">
                      <span className="text-gray-400 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                        下一篇
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="text-[#11345b] font-bold group-hover:text-[#fdbd00] transition-colors line-clamp-1">
                        {nextArticle.title}
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              </motion.article>
            </div>

            {/* Sidebar column */}
            <aside className="lg:w-1/3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-10 sticky top-28"
              >
                {/* Search */}
                <div className="bg-white p-8 rounded-[32px] shadow-lg border border-gray-100">
                  <h4 className="text-xl font-bold text-[#11345b] mb-6 flex items-center gap-2">
                    站内搜索
                  </h4>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="搜索新闻或产品..." 
                      className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 pr-12 text-sm focus:ring-2 focus:ring-[#fdbd00] transition-all"
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white p-8 rounded-[32px] shadow-lg border border-gray-100">
                  <h4 className="text-xl font-bold text-[#11345b] mb-6 border-l-4 border-[#fdbd00] pl-4">
                    资讯分类
                  </h4>
                  <div className="space-y-2">
                    {categories.filter(c => c.id !== 'all').map(cat => (
                      <Link 
                        key={cat.id} 
                        href={`/news?category=${cat.id}`}
                        className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                          cat.id === article.category ? 'bg-[#11345b] text-white' : 'hover:bg-gray-50 text-gray-600'
                        }`}
                      >
                        <span className="font-bold">{cat.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-md ${cat.id === article.category ? 'bg-white/20' : 'bg-gray-100 text-gray-400'}`}>
                          {cat.count}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Recommended Reading */}
                <div className="bg-white p-8 rounded-[32px] shadow-lg border border-gray-100">
                  <h4 className="text-xl font-bold text-[#11345b] mb-6 border-l-4 border-[#fdbd00] pl-4">
                    推荐阅读
                  </h4>
                  <div className="space-y-6">
                    {filteredRecent.map((news) => (
                      <Link key={news.slug} href={`/news/${news.slug}`} className="group block">
                        <h5 className="text-sm font-bold text-[#11345b] mb-2 group-hover:text-[#fdbd00] transition-colors line-clamp-2">
                          {news.title}
                        </h5>
                        <span className="text-xs text-gray-400">{news.publishedAt}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA Card */}
                <div className="bg-[#11345b] p-6 rounded-[32px] text-white relative overflow-hidden group aspect-square flex flex-col">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                    <div className="w-10 h-10 bg-[#fdbd00]/20 rounded-full flex items-center justify-center mb-4">
                      <MessageCircle className="w-5 h-5 text-[#fdbd00]" />
                    </div>
                    <h4 className="text-lg font-bold mb-2">关注微信公众号</h4>
                    <p className="text-white/60 text-xs mb-6 px-4">
                      获取最新的产品更新和行业洞察。
                    </p>
                    <ImageWithFallback 
                      src="/images/news/WeChat-public-account.jpg"
                      alt="微信公众号二维码"
                      width={160}
                      height={160}
                      className="w-full max-w-[160px] rounded-xl"
                    />
                  </div>
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

function normalizeUrl(url?: string | null) {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url
  }
  if (url.startsWith('/')) {
    return `${STRAPI_URL}${url}`
  }
  return `${STRAPI_URL}/${url}`
}
