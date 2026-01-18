import { motion } from 'motion/react';
import { Calendar, User, Eye, Search, ChevronRight, Share2, MessageCircle, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

const categories = [
  { name: '公司新闻', count: 12 },
  { name: '产品动态', count: 8, active: true },
  { name: '行业成果', count: 15 },
  { name: '技术分享', count: 21 },
];

const recommendedArticles = [
  {
    title: '智慧交通发展的三个关键趋势：数字化、网联化与智能化',
    date: '2023-09-28',
    link: '#'
  },
  {
    title: '深度解析：如何利用V2X技术提升高速公路养护作业区安全系数',
    date: '2023-09-15',
    link: '#'
  },
  {
    title: 'ZCZ荣获"2023年度智慧高速优秀解决方案提供商"称号',
    date: '2023-08-30',
    link: '#'
  },
  {
    title: '高速公路改扩建工程中的交通组织难点与应对策略',
    date: '2023-08-12',
    link: '#'
  }
];

const relatedProducts = [
  {
    name: '智能预警锥桶 (Z-Cone Pro)',
    image: 'https://images.unsplash.com/photo-1763569026025-17f15c1012a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
    link: '/products/smart-cone'
  },
  {
    name: '智慧中控云平台',
    image: 'https://images.unsplash.com/photo-1692830203762-9b46dd6e4dc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
    link: '#'
  }
];

export default function NewsDetailPage() {
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
              <Link to="/" className="hover:text-[#fdbd00] transition-colors">首页</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/news" className="hover:text-[#fdbd00] transition-colors">资讯中心</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-[#fdbd00]">全新5G智能锥桶系统发布</span>
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
                    <span className="px-4 py-1.5 bg-[#fdbd00] text-[#11345b] text-xs font-black rounded-full shadow-sm">产品动态</span>
                    <span className="px-4 py-1.5 bg-gray-100 text-[#11345b] text-xs font-black rounded-full shadow-sm">技术创新</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#11345b] mb-6 leading-tight">
                    ZCZ发布全新5G智能锥桶系统：重新定义高速公路智慧养护安全标准
                  </h2>
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#fdbd00]" />
                      2023年10月15日
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#fdbd00]" />
                      ZCZ 研发中心
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-[#fdbd00]" />
                      2,845 次阅读
                    </div>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="rounded-[40px] overflow-hidden shadow-2xl mb-12 group">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1706946140241-5a2587ba9c77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHRyYWZmaWMlMjBjb25lJTIwdGVjaG5vbG9neSUyMHJvYWQlMjBzYWZldHl8ZW58MXx8fHwxNzY2NDA0MDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                    alt="5G智能锥桶系统" 
                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-1000"
                  />
                </div>

                {/* Article Body */}
                <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-8">
                  <p>
                    作为智慧交通安全预警领域的领军者，中创智控 (ZCZ) 今日正式发布了全新一代 5G 智能预警锥桶系统。这款产品集成了最新的 V2X 通信技术和高精度北斗定位模块，标志着高速公路养护作业区的安全管理进入了全数字化感知时代。
                  </p>

                  <div>
                    <h3 className="text-2xl font-bold text-[#11345b] mb-4">痛点：传统养护作业的安全隐患</h3>
                    <p>
                      在传统的高速公路养护作业中，"人肉预警"和被动反光设施往往难以应对复杂多变的路况和恶劣天气。驾驶员疲劳、视线受阻或车速过快，极易导致闯入事故，对施工人员和过往车辆造成巨大威胁。如何实现"事前预警"而非"事后救援"，一直是行业痛点。
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-[#11345b] mb-4">核心技术突破</h3>
                    <p className="mb-6">此次发布的 ZCZ 5G 智能锥桶系统在以下三个方面实现了重大突破：</p>
                    <ul className="space-y-4 list-none pl-0">
                      <li className="flex gap-4">
                        <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#fdbd00] mt-3" />
                        <div>
                          <strong className="text-[#11345b] block mb-1">毫秒级互联 (V2X Integration)</strong>
                          内置 C-V2X 模组，能够直接向支持网联的车辆发送"前方施工"预警信息，并在高德、百度等主流导航APP上实时生成施工图标，提前 2 公里告知驾驶员。
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#fdbd00] mt-3" />
                        <div>
                          <strong className="text-[#11345b] block mb-1">姿态感知与倒伏即报</strong>
                          内部集成的六轴陀螺仪可实时监测锥桶姿态。一旦发生被撞倒伏或移位，系统会在 0.5 秒内向中创智控智慧中控平台发送报警，并同步触发上游的可变情报板。
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#fdbd00] mt-3" />
                        <div>
                          <strong className="text-[#11345b] block mb-1">超长续航与极速部署</strong>
                          采用全新低功耗边缘计算芯片，结合太阳能自充技术，阴雨天续航能力提升 200%。一体化设计无需现场组装，开机即用。
                        </div>
                      </li>
                    </ul>
                  </div>

                  <blockquote className="relative p-10 bg-gray-50 rounded-[40px] border-l-8 border-[#fdbd00] italic text-gray-700">
                    <div className="absolute top-6 left-6 text-6xl text-[#fdbd00]/20 font-serif leading-none">“</div>
                    <p className="relative z-10 text-xl font-medium mb-6">
                      我们的目标不仅仅是制造一个发光的锥桶，而是构建一个能够主动思考、主动交流的道路安全节点。每一秒的提前预警，都可能挽救一个家庭。
                    </p>
                    <cite className="block text-right text-gray-500 font-bold not-italic">
                      — 中创智控 CTO 李建国
                    </cite>
                  </blockquote>

                  <div>
                    <h3 className="text-2xl font-bold text-[#11345b] mb-4">应用场景与未来展望</h3>
                    <p>
                      目前，该系统已在浙江、江苏等多条国家级高速公路改扩建项目中投入试运行。数据显示，在部署了 ZCZ 智能预警系统的路段，因后方车辆未及时减速导致的险情下降了 65%。未来，中创智控将继续深化 AI 算法在端侧的应用，让每一个交通设施都成为智慧公路的神经末梢。
                    </p>
                  </div>
                </div>

                {/* Footer Meta */}
                <div className="mt-16 pt-10 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-gray-400 font-bold mr-2 text-sm uppercase tracking-wider">标签:</span>
                      {['智慧交通', 'V2X', '安全预警'].map(tag => (
                        <Link key={tag} to="#" className="px-3 py-1 bg-gray-50 text-gray-500 text-xs font-bold rounded-md hover:bg-[#11345b] hover:text-white transition-colors">
                          {tag}
                        </Link>
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
                  <Link to="#" className="group p-8 rounded-[32px] bg-white border border-gray-100 hover:shadow-xl transition-all flex flex-col gap-2">
                    <span className="text-gray-400 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                      <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                      上一篇
                    </span>
                    <span className="text-[#11345b] font-bold group-hover:text-[#fdbd00] transition-colors">
                      荣获2023年度最佳智慧交通解决方案奖
                    </span>
                  </Link>
                  <Link to="#" className="group p-8 rounded-[32px] bg-white border border-gray-100 hover:shadow-xl transition-all flex flex-col gap-2 text-right items-end">
                    <span className="text-gray-400 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                      下一篇
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="text-[#11345b] font-bold group-hover:text-[#fdbd00] transition-colors">
                      与路建集团签署战略合作伙伴关系
                    </span>
                  </Link>
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
                    {categories.map(cat => (
                      <Link 
                        key={cat.name} 
                        to="#" 
                        className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                          cat.active ? 'bg-[#11345b] text-white' : 'hover:bg-gray-50 text-gray-600'
                        }`}
                      >
                        <span className="font-bold">{cat.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-md ${cat.active ? 'bg-white/20' : 'bg-gray-100 text-gray-400'}`}>
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
                    {recommendedArticles.map((article, idx) => (
                      <Link key={idx} to={article.link} className="group block">
                        <h5 className="text-sm font-bold text-[#11345b] mb-2 group-hover:text-[#fdbd00] transition-colors line-clamp-2">
                          {article.title}
                        </h5>
                        <span className="text-xs text-gray-400">{article.date}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Related Products */}
                <div className="bg-white p-8 rounded-[32px] shadow-lg border border-gray-100">
                  <h4 className="text-xl font-bold text-[#11345b] mb-6 border-l-4 border-[#fdbd00] pl-4">
                    相关产品
                  </h4>
                  <div className="space-y-4">
                    {relatedProducts.map((product, idx) => (
                      <Link key={idx} to={product.link} className="flex items-center gap-4 group">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-[#11345b] group-hover:text-[#fdbd00] transition-colors leading-tight mb-2">
                            {product.name}
                          </h5>
                          <span className="text-[10px] text-[#fdbd00] font-black uppercase tracking-widest flex items-center gap-1">
                            查看详情 <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA Card */}
                <div className="relative overflow-hidden rounded-[32px] bg-[#11345b] p-8 text-center text-white">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px]" />
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-[#fdbd00]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <MessageCircle className="w-6 h-6 text-[#fdbd00]" />
                    </div>
                    <h4 className="text-xl font-bold mb-4">需要定制解决方案？</h4>
                    <p className="text-white/60 text-sm mb-8">
                      我们的专家团队为您提供专业咨询与现场勘查。
                    </p>
                    <button className="w-full bg-[#fdbd00] text-[#11345b] py-4 rounded-2xl font-black text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#fdbd00]/20">
                      联系我们
                    </button>
                  </div>
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}