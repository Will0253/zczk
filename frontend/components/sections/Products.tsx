'use client'

import Link from 'next/link'
import { Search, ChevronRight, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useState, useMemo } from 'react'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import type { Product, ProductCategory } from '@/types/product'

interface ProductCategoryOption {
  id: ProductCategory | 'all'
  name: string
  count: number
}

interface ProductsProps {
  products: Product[]
  categories: ProductCategoryOption[]
}

export function Products({ products, categories }: ProductsProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  const allProducts = useMemo(() => {
    return [...products].sort((a, b) => a.order - b.order)
  }, [products])

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory
      const matchesSearch = p.name.includes(searchQuery) || p.description.includes(searchQuery)
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery, allProducts])

  return (
    <div className="bg-[#f8fafc] min-h-screen selection:bg-[#fdbd00] selection:text-[#11345b]">
      {/* Page Hero */}
      <section className="relative bg-[#11345b] pt-48 pb-32 px-4 overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', 
            backgroundSize: '40px 40px' 
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-8">
              <span className="w-2 h-2 bg-[#fdbd00] rounded-full animate-pulse" />
              <span className="text-[#fdbd00] text-xs font-black tracking-widest uppercase">Scenario-based Intelligence</span>
            </div>
            <h1 className="text-5xl lg:text-7xl text-white font-bold mb-8 tracking-tighter">
              全线智能<span className="text-[#fdbd00]">产品中心</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              汇集尖端智慧交通科技，从智能感知硬件到云端管理平台，为您提供全方位的安全预警解决方案。
            </p>
          </motion.div>
        </div>

        {/* Dynamic Background Element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fdbd00]/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      </section>

      {/* Main Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-28 space-y-8">
              
              {/* Search */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="搜索产品..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#fdbd00] transition-all"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="text-lg font-bold text-[#11345b]">产品分类</h3>
                </div>
                <div className="p-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold transition-all ${
                        activeCategory === cat.id 
                          ? 'bg-[#11345b] text-white shadow-lg' 
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        activeCategory === cat.id ? 'bg-[#fdbd00] text-[#11345b]' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Solution Card */}
              <div className="bg-gradient-to-br from-[#11345b] to-[#1a4d7a] p-8 rounded-3xl text-white relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
                <h4 className="text-xl font-bold mb-4 relative z-10">找不到需要的产品？</h4>
                <p className="text-sm text-gray-400 mb-8 relative z-10 leading-relaxed">
                  我们的工程师可以为您定制专属解决方案。
                </p>
                <Link href="/contact" className="flex items-center gap-3 text-[#fdbd00] font-bold text-sm hover:translate-x-2 transition-transform relative z-10">
                  <span>咨询定制方案</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((p, idx) => (
                  <motion.div
                    layout
                    key={p.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 overflow-hidden flex flex-col"
                  >
                    {/* Image Box */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      <ImageWithFallback 
                        src={p.image} 
                        alt={p.name}
                        fill
                        className="object-cover transform group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10px] font-black text-[#fdbd00] tracking-widest uppercase">ZCZK Tech</span>
                        </div>
                        <h3 className="text-2xl font-bold text-[#11345b] mb-1 group-hover:text-[#fdbd00] transition-colors duration-300">
                          {p.name}
                        </h3>
                        {p.shortDescription && (
                          <div className="text-xs font-bold text-gray-400 mb-4">{p.shortDescription}</div>
                        )}
                        <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-2">
                          {p.description}
                        </p>

                        {/* Specs */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                          {p.features.map((feature, i) => (
                            <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-transparent hover:border-[#fdbd00]/20 transition-all">
                              <div className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">{feature.label}</div>
                              <div className="text-sm font-black text-[#11345b]">{feature.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <a
                        href={p.taobaoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 bg-[#11345b] text-white font-bold rounded-2xl flex items-center justify-center gap-2 group/btn relative overflow-hidden transition-all text-center cursor-pointer"
                      >
                        <span className="relative z-10">查看详情</span>
                        <ChevronRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-[#fdbd00] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="py-20 text-center">
                <div className="inline-flex p-6 bg-gray-50 rounded-full mb-6">
                  <Search className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-400">未找到相关产品</h3>
                <p className="text-gray-500 mt-2">请尝试调整搜索关键词或选择其他分类</p>
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  )
}
