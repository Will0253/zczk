import { Search, Calendar, Tag, Eye, ChevronLeft, ChevronRight, ArrowUpRight, Mail, Bell, Newspaper, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const categories = [
  { id: 'all', name: '全部资讯', count: 42 },
  { id: 'news', name: '公司新闻', count: 18 },
  { id: 'industry', name: '行业动态', count: 12 },
  { id: 'tech', name: '技术专栏', count: 8 },
  { id: 'media', name: '媒体报道', count: 4 },
];

const newsData = [
  {
    id: 1,
    featured: true,
    title: '中创智控荣获"智慧交通创新领军企业"称号',
    date: '2023-11-15',
    category: 'news',
    categoryName: '公司新闻',
    desc: '近日，在第十五届中国国际交通技术与设备展览会上，中创智控凭借其在主动安全预警领域的卓越表现，被组委会授予年度创新领军企业奖项。这标志着我司在智能交通基础设施安全领域的深耕获得了行业的高度认可。',
    image: 'https://images.unsplash.com/photo-1607016284318-d1384bf5edd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    views: '5,820'
  },
  {
    id: 2,
    title: '交通运输部发布《数字交通"十四五"发展规划》解读',
    date: '2023-10-28',
    category: 'industry',
    categoryName: '行业动态',
    desc: '深入分析规划中关于智能感知、预警系统及车路协同建设的重点方向，探讨企业如何抓住新基建机遇。',
    image: 'https://images.unsplash.com/photo-1760819887298-0d0d9da9ab7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    views: '2,341'
  },
  {
    id: 3,
    title: '毫米波雷达在极端天气下的感知性能优化研究',
    date: '2023-10-12',
    category: 'tech',
    categoryName: '技术专栏',
    desc: '针对大雾、暴雨等恶劣环境，我司研发团队提出的新型滤波算法显著提升了雷达探测的信噪比和准确率。',
    image: 'https://images.unsplash.com/photo-1765736717011-ed3dc50951f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    views: '1,892'
  },
  {
    id: 4,
    title: 'ZCZ 全新一代智能预警锥桶正式量产下线',
    date: '2023-09-25',
    category: 'news',
    categoryName: '公司新闻',
    desc: '历经18个月的研发与测试，集成了高精度北斗定位与物联网通信模块的新一代锥桶今日在苏州工厂正式投产。',
    image: 'https://images.unsplash.com/photo-1735494033199-cb0b52275d6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    views: '3,105'
  },
  {
    id: 5,
    title: '《智能交通》专访CEO张明：用科技守护每一位路面作业者',
    date: '2023-09-10',
    category: 'media',
    categoryName: '媒体报道',
    desc: '深度对话中创智控创始人，畅谈从高速公路施工安全痛点切入，构建全场景智慧安全生态的创业历程。',
    image: 'https://images.unsplash.com/photo-1742569184536-77ff9ae46c99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    views: '1,540'
  },
  {
    id: 6,
    title: '中创智控完成B轮融资，加速海外市场布局',
    date: '2023-08-15',
    category: 'news',
    categoryName: '公司新闻',
    desc: '本轮融资由知名产业基金领投，资金将主要用于欧洲和东南亚市场的渠道建设及下一代V2X技术研发。',
    image: 'https://images.unsplash.com/photo-1761735486549-5c2b19dfed09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    views: '4,120'
  },
  {
    id: 7,
    title: '智慧隧道安全监测系统架构演进',
    date: '2023-08-01',
    category: 'tech',
    categoryName: '技术专栏',
    desc: '详细解析从传统的单点监测向基于数字孪生的全域实时感知系统转变的技术路径与实践经验。',
    image: 'https://images.unsplash.com/photo-1529528574411-362bac5dbbe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    views: '1,230'
  },
];

export function News() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNews = useMemo(() => {
    return newsData.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredPost = newsData.find(item => item.featured);
  const regularPosts = filteredNews.filter(item => !item.featured || (activeCategory !== 'all' && item.featured));

  return (
    <div className="bg-[#f8fafc] min-h-screen selection:bg-[#fdbd00] selection:text-[#11345b]">
      {/* 🚀 Hero Section */}
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
              <span className="text-[#fdbd00] text-xs font-black tracking-widest uppercase">Latest Insights & News</span>
            </div>
            <h1 className="text-5xl lg:text-7xl text-white font-bold mb-8 tracking-tighter">
              资讯中心
            </h1>
            <p className="text-lg lg:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              聚焦行业前沿动态，发布最新企业资讯，解读智慧交通发展趋势。
            </p>
          </motion.div>
        </div>

        {/* Dynamic Background Element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fdbd00]/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      </section>

      {/* 🛠 Main Content Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* 📂 Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0 order-2 lg:order-1">
            <div className="sticky top-28 space-y-8">
              
              {/* Search Box */}
              <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 group focus-within:border-[#fdbd00] transition-colors">
                <h3 className="text-lg font-bold text-[#11345b] mb-4">搜索文章</h3>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#fdbd00] transition-colors" />
                  <input 
                    type="text" 
                    placeholder="输入关键词..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#fdbd00] transition-all"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="text-lg font-bold text-[#11345b]">分类浏览</h3>
                </div>
                <div className="p-4 space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                        activeCategory === cat.id 
                          ? 'bg-[#11345b] text-white shadow-lg shadow-[#11345b]/10' 
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-black ${
                        activeCategory === cat.id ? 'bg-[#fdbd00] text-[#11345b]' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter Subscription */}
              <div className="bg-[#11345b] p-10 rounded-[40px] text-white relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
                <Mail className="w-10 h-10 text-[#fdbd00] mb-6" />
                <h4 className="text-xl font-bold mb-3 relative z-10">订阅电子期刊</h4>
                <p className="text-sm text-gray-400 mb-8 relative z-10 leading-relaxed">
                  获取最新的产品更新和行业洞察。
                </p>
                <div className="space-y-4 relative z-10">
                  <input 
                    type="email" 
                    placeholder="您的邮箱地址"
                    className="w-full px-5 py-3.5 bg-white/10 border-none rounded-2xl text-sm text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#fdbd00] transition-all"
                  />
                  <button className="w-full py-4 bg-[#fdbd00] text-[#11345b] font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-[#ffd700] transition-colors shadow-xl shadow-[#fdbd00]/10">
                    <span>立即订阅</span>
                    <Bell className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </aside>

          {/* 📰 News Main Area */}
          <div className="flex-grow order-1 lg:order-2">
            
            {/* Featured Post (Only show when 'all' is active) */}
            {activeCategory === 'all' && searchQuery === '' && featuredPost && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative bg-white rounded-[60px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden mb-12"
              >
                <div className="flex flex-col xl:flex-row">
                  <div className="xl:w-1/2 aspect-[16/10] overflow-hidden relative">
                    <ImageWithFallback 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute top-8 left-8">
                      <span className="px-6 py-2.5 bg-[#fdbd00] text-[#11345b] text-xs font-black rounded-full shadow-lg flex items-center gap-2">
                        <Newspaper className="w-3.5 h-3.5" />
                        置顶
                      </span>
                    </div>
                  </div>
                  <div className="xl:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
                    <div className="flex items-center gap-6 text-xs font-bold text-gray-400 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#fdbd00]" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-[#fdbd00]" />
                        {featuredPost.categoryName}
                      </div>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#11345b] mb-8 leading-tight group-hover:text-[#fdbd00] transition-colors duration-300">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-500 text-lg leading-relaxed mb-10 line-clamp-3">
                      {featuredPost.desc}
                    </p>
                    <button className="flex items-center gap-3 text-[#11345b] font-black group/btn">
                      <span className="border-b-2 border-[#fdbd00] pb-1">阅读全文</span>
                      <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <AnimatePresence mode="popLayout">
                {regularPosts.map((item, idx) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white rounded-[50px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <ImageWithFallback 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute top-6 right-6">
                        <span className="px-5 py-2 bg-white/90 backdrop-blur-md text-[#11345b] text-[10px] font-black rounded-full shadow-sm">
                          {item.categoryName}
                        </span>
                      </div>
                    </div>

                    <div className="p-10 flex flex-col flex-grow">
                      <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 mb-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-[#fdbd00]" />
                          {item.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-3.5 h-3.5 text-[#fdbd00]" />
                          {item.views} 阅读
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-[#11345b] mb-6 leading-tight group-hover:text-[#fdbd00] transition-colors duration-300 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-10 line-clamp-2 flex-grow">
                        {item.desc}
                      </p>

                      <button className="flex items-center justify-between text-sm font-black text-[#11345b] group/btn pt-6 border-t border-gray-50">
                        <span>查看详情</span>
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover/btn:bg-[#fdbd00] transition-colors">
                          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                        </div>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Empty State */}
            {regularPosts.length === 0 && (
              <div className="py-24 text-center">
                <div className="inline-flex p-10 bg-gray-50 rounded-full mb-8">
                  <Search className="w-12 h-12 text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold text-[#11345b]">未找到相关资讯</h3>
                <p className="text-gray-500 mt-3 max-w-sm mx-auto">请尝试调整搜索关键词或选择其他分类，或者联系我们的客服获取帮助。</p>
              </div>
            )}

            {/* 🔢 Pagination */}
            {filteredNews.length > 0 && (
              <div className="mt-20 flex items-center justify-center gap-2">
                <button className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-100 bg-white text-gray-400 hover:text-[#11345b] hover:border-[#11345b] transition-all">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#11345b] text-[#fdbd00] font-black shadow-lg shadow-[#11345b]/10">
                  1
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-100 bg-white text-gray-500 font-bold hover:bg-gray-50 transition-all">
                  2
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-100 bg-white text-gray-500 font-bold hover:bg-gray-50 transition-all">
                  3
                </button>
                <span className="mx-2 text-gray-300">...</span>
                <button className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-100 bg-white text-gray-500 font-bold hover:bg-gray-50 transition-all">
                  8
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-100 bg-white text-gray-400 hover:text-[#11345b] hover:border-[#11345b] transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}