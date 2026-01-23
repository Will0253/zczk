'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Calendar, ArrowUpRight, ArrowRight } from 'lucide-react'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import type { NewsArticle, NewsCategory } from '@/types/news'

interface NewsFeedProps {
  newsItems: NewsArticle[]
  categories: NewsCategory[]
}

export function NewsFeed({ newsItems, categories }: NewsFeedProps) {
  const visibleNews = newsItems.slice(0, 3)

  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      {/* Tech Pattern Background (Consistency with ProductMatrix) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{
             backgroundImage: `repeating-linear-gradient(
               45deg,
               transparent,
               transparent 10px,
               #11345b 10px,
               #11345b 11px
             )`
           }}>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#11345b]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#fdbd00]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Module Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#11345b] mb-6 tracking-tight">
              资讯动态
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#11345b] to-[#1a4d7a] mx-auto mb-8 rounded-full shadow-sm" />
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              实时追踪中创智控在智慧交通领域的最新科研成果、项目交付与行业贡献。
            </p>
          </motion.div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {visibleNews.length === 0 ? (
            <div className="col-span-full text-center py-16 text-gray-500">暂无资讯动态</div>
          ) : (
            visibleNews.map((item, idx) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative flex flex-col bg-white rounded-[40px] border border-gray-100 shadow-sm hover:shadow-3xl transition-all duration-500 overflow-hidden"
              >
              <Link href={`/news/${item.slug}`} className="absolute inset-0 z-20" />
              {/* Subtle Gradient Border on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#fdbd00]/10 via-transparent to-[#11345b]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <ImageWithFallback 
                  src={item.image} 
                  alt={item.title}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11345b]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-6 left-6">
                  <span className="px-5 py-2 bg-[#fdbd00] text-[#11345b] text-[10px] font-black rounded-full shadow-xl">
                    {categories.find((cat) => cat.id === item.category)?.name || item.category}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-10 flex flex-col flex-grow relative z-10">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-6">
                  <Calendar className="w-4 h-4 text-[#fdbd00]" />
                  {item.publishedAt}
                </div>
                
                <h3 className="text-xl font-bold text-[#11345b] mb-4 leading-tight group-hover:text-[#fdbd00] transition-colors duration-300 line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow line-clamp-2">
                  {item.summary}
                </p>

                <div className="pt-6 border-t border-gray-50 flex items-center justify-between mt-auto">
                  <span className="text-xs font-black text-[#11345b]/50 group-hover:text-[#11345b] transition-colors uppercase tracking-widest">
                    详情解析
                  </span>
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#fdbd00] transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-[#11345b] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Bottom Scaling Line (Consistency with ProductMatrix) */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#fdbd00] to-[#ffd700] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
              </motion.div>
            ))
          )}
        </div>

        {/* View All Button */}
        <div className="mt-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/news"
              className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#11345b] to-[#1a4d7a] text-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#fdbd00] to-[#ffd700] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
              <span className="relative z-10 font-bold text-lg group-hover:text-[#11345b] transition-colors duration-300">进入资讯中心</span>
              <ArrowRight className="w-6 h-6 relative z-10 transform group-hover:translate-x-2 transition-transform duration-300 group-hover:text-[#11345b]" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
