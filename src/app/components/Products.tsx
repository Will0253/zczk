import { Search, ChevronRight, MessageSquare, ArrowRight, HardDrive, Shield, Activity, Volume2, Navigation, Layers, Mic, Cctv, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'all', name: '全部产品', count: 10 },
  { id: 'warning', name: '智能预警硬件', count: 5 },
  { id: 'sensing', name: '监测感知设备', count: 3 },
  { id: 'inspection', name: '无人巡检系统', count: 2 },
  { id: 'software', name: '软件与平台', count: 2 },
];

const productsData = [
  {
    id: 1,
    category: 'warning',
    name: '智能声光预警哨兵',
    subName: '含移动岗哨形态',
    desc: '一体化移动预警设备，集成雷达测速与声光报警功能，适配道路施工、应急布控场景',
    params: [
      { label: '总功率', value: '100W' },
      { label: '续航', value: '8小时' }
    ],
    image: 'https://images.unsplash.com/photo-1673797830131-f91f04593e46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  },
  {
    id: 2,
    category: 'warning',
    name: '中创智控二代布控球',
    desc: '应急监控设备，支持快速部署与全向高清监控，适用于应急指挥、临时安防',
    params: [
      { label: '快速部署', value: '1分钟' },
      { label: '续航时间', value: '12-20小时' }
    ],
    image: 'https://images.unsplash.com/photo-1688584177352-a40d4ba17561?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  },
  {
    id: 3,
    category: 'warning',
    name: '智能预警锥桶',
    subName: '旗舰版 C100 / 智联版 A2',
    path: '/products/smart-cone',
    desc: '物联网智能交通锥，集成了高精度北斗/GPS双模定位与姿态传感器，实现施工安全闭环管理',
    params: [
      { label: 'A1 续航', value: '12小时' },
      { label: 'A2 定位', value: 'RTK 亚米级' }
    ],
    image: 'https://images.unsplash.com/photo-1719580920868-9e7ee4c79a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  },
  {
    id: 4,
    category: 'sensing',
    name: '智能定位肩灯',
    desc: '人员安全管理设备，集成定位、预警与交互功能，适配户外作业、应急救援',
    params: [
      { label: '净重', value: '88g' },
      { label: '防护等级', value: 'IP66' }
    ],
    image: 'https://images.unsplash.com/photo-1652148555073-4b1d2ecd664c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  },
  {
    id: 5,
    category: 'warning',
    name: '智能声场预警系统',
    desc: '场景化预警系统，支持远程管控与智能响应，适用于区域安全监管',
    params: [
      { label: '覆盖范围', value: '≥200米' },
      { label: '声压级', value: '132dB' }
    ],
    image: 'https://images.unsplash.com/photo-1687858477673-267e301cb186?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  },
  {
    id: 6,
    category: 'warning',
    name: '车载防撞预警系统',
    desc: '车辆防撞设备，支持实时喊话与远距离预警，适配特种车辆安全管控',
    params: [
      { label: '峰值声压', value: '148dB' },
      { label: '语声传输', value: '1公里' }
    ],
    image: 'https://images.unsplash.com/photo-1626284142614-d8af54be478c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  },
  {
    id: 7,
    category: 'sensing',
    name: '便携式强声器',
    desc: '移动音频预警设备，支持多场景应急音频播放，适用于户外作业预警',
    params: [
      { label: '声压级', value: '138dB' },
      { label: '轻量化', value: '≤5KG' }
    ],
    image: 'https://images.unsplash.com/photo-1648522168473-dfec1d2a5cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  },
  {
    id: 8,
    category: 'sensing',
    name: '中创智控二代4G智能安全帽',
    desc: '智能防护设备，集成摄录、定位与对讲功能，适用于户外作业管理',
    params: [
      { label: '净重', value: '560g' },
      { label: '电池容量', value: '4200mAh' }
    ],
    image: 'https://images.unsplash.com/photo-1701522814779-2d0e40de3370?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  },
  {
    id: 9,
    category: 'sensing',
    name: '中创智控交通雷达测速仪',
    subName: '测速反馈屏',
    desc: '交通测速设备，支持速度监测与信息反馈，适用于道路限速管控',
    params: [
      { label: '测速范围', value: '1-240km/h' },
      { label: '可视距离', value: '1000米' }
    ],
    image: 'https://images.unsplash.com/photo-1620599464094-15206d7a2974?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  },
  {
    id: 10,
    category: 'software',
    name: '事件预警快处置系统',
    desc: '智能应急处置系统，支持事件预警与快速响应，适用于公共安全管理',
    params: [
      { label: '响应速度', value: '毫秒级' },
      { label: '处置链路', value: '全闭环' }
    ],
    image: 'https://images.unsplash.com/photo-1729184648234-7650c1484905?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  },
];

export function Products() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return productsData.filter(p => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = p.name.includes(searchQuery) || p.desc.includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="bg-[#f8fafc] min-h-screen selection:bg-[#fdbd00] selection:text-[#11345b]">
      {/* 🚀 Page Hero */}
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

      {/* 🛠 Main Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* 📂 Sidebar Navigation */}
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
                <button className="flex items-center gap-3 text-[#fdbd00] font-bold text-sm hover:translate-x-2 transition-transform relative z-10">
                  <span>咨询定制方案</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </aside>

          {/* 🧩 Products Grid */}
          <div className="flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((p, idx) => (
                  <motion.div
                    layout
                    key={p.id}
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
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
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
                        {p.subName && (
                          <div className="text-xs font-bold text-gray-400 mb-4">{p.subName}</div>
                        )}
                        <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-2">
                          {p.desc}
                        </p>

                        {/* Specs */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                          {p.params.map((param, i) => (
                            <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-transparent hover:border-[#fdbd00]/20 transition-all">
                              <div className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">{param.label}</div>
                              <div className="text-sm font-black text-[#11345b]">{param.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Link 
                        to={p.path || '#'} 
                        className="w-full py-4 bg-[#11345b] text-white font-bold rounded-2xl flex items-center justify-center gap-2 group/btn relative overflow-hidden transition-all text-center"
                      >
                        <span className="relative z-10">查看详情</span>
                        <ChevronRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-[#fdbd00] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                      </Link>
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
  );
}