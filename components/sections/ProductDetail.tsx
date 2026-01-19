'use client'

import Link from 'next/link'
import { ChevronRight, Star, Navigation, Bell, Battery, Signal, MessageSquare, Download, ArrowRight, Zap, ShieldCheck, Headphones, Radio, AlertTriangle } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import type { Product } from '@/types/product'

interface ProductDetailProps {
  product: Product
}

const highlights = [
  { icon: Navigation, label: '北斗/GPS双模定位' },
  { icon: Bell, label: '倒伏即时报警' },
  { icon: Battery, label: '30天超长续航' },
  { icon: Signal, label: '4G Cat.1 全网通' }
]

const specs = [
  { label: '通讯方式', value: '4G Cat.1 / NB-IoT (可选)' },
  { label: '定位精度', value: 'GPS+北斗，静态精度 < 2.5m' },
  { label: '续航能力', value: '内置 10000mAh 锂电池，正常工作 > 30天' },
  { label: '防护等级', value: 'IP67 防水防尘，抗跌落' },
  { label: '工作温度', value: '-40°C ~ +85°C' },
  { label: '产品尺寸', value: '700mm(高) x 380mm(底宽)' }
]

const workingSteps = [
  {
    id: 1,
    icon: Zap,
    title: '车辆撞击/倒伏',
    desc: '设备检测到外力撞击或姿态变化'
  },
  {
    id: 2,
    icon: Signal,
    title: '信号毫秒级上云',
    desc: '通过4G网络将警情数据实时上传'
  },
  {
    id: 3,
    icon: Bell,
    title: '多端联动报警',
    desc: '中控平台、手持终端、穿戴设备同步接收报警'
  }
]

const recommendations = [
  {
    icon: Radio,
    title: '施工人员穿戴式报警器',
    desc: '接收锥桶倒伏信号，振动提醒'
  },
  {
    icon: AlertTriangle,
    title: '便携式LED预警屏',
    desc: '远端显示前方施工与警报'
  }
]

export function ProductDetail({ product }: ProductDetailProps) {
  const [activeTab, setActiveTab] = useState('details')

  return (
    <div className="bg-white min-h-screen selection:bg-[#fdbd00] selection:text-[#11345b]">
      {/* Breadcrumbs */}
      <section className="relative pt-32 pb-20 bg-[#11345b] overflow-hidden">
        {/* Background Pattern and Glows Consistency */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#fdbd00]/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">产品中心</h1>
            <nav className="flex items-center gap-2 text-white/60 text-sm">
              <Link href="/" className="hover:text-[#fdbd00] transition-colors">首页</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/products" className="hover:text-[#fdbd00] transition-colors">产品中心</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#fdbd00]">{product.name}</span>
            </nav>
          </motion.div>
        </div>
      </section>

      {/* Product Hero */}
      <section className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left: Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="aspect-square bg-gray-50 rounded-[40px] overflow-hidden relative border border-gray-100 group shadow-sm">
              <ImageWithFallback 
                src={product.image} 
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {product.featured && (
                <div className="absolute top-8 left-8">
                  <span className="px-6 py-2 bg-[#fdbd00] text-[#11345b] text-xs font-black rounded-full shadow-lg">热销旗舰款</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`relative aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${i === 1 ? 'border-[#fdbd00] shadow-md shadow-[#fdbd00]/10' : 'border-gray-100 hover:border-gray-200'}`}>
                  <ImageWithFallback src={product.image} alt={`thumb-${i}`} fill className="object-cover" />
                </div>
              ))}
              <div className="aspect-square rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 border border-dashed border-gray-200">
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-[#11345b] mb-6 tracking-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-6 mb-8">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-5 h-5 fill-[#fdbd00] text-[#fdbd00]" />
                  ))}
                </div>
                <div className="h-4 w-[1px] bg-gray-200" />
                <p className="text-sm text-gray-500 font-medium">已部署 <span className="text-[#11345b] font-bold">5000+</span> 个项目现场</p>
              </div>
              <p className="text-lg text-gray-500 leading-relaxed mb-10">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-12 p-8 bg-gray-50 rounded-[32px]">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#fdbd00]">
                    <h.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-[#11345b]">{h.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 px-10 py-5 bg-[#fdbd00] text-[#11345b] font-black rounded-2xl hover:bg-[#ffd700] transition-all shadow-xl shadow-[#fdbd00]/20 flex items-center justify-center gap-3">
                <MessageSquare className="w-5 h-5" />
                <span>立即咨询报价</span>
              </button>
              <button className="flex-1 px-10 py-5 bg-white border-2 border-gray-100 text-[#11345b] font-black rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3">
                <Download className="w-5 h-5" />
                <span>下载产品白皮书</span>
              </button>
            </div>

            <div className="mt-8 p-6 bg-blue-50/50 rounded-2xl flex items-center gap-4 border border-blue-100">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div className="text-sm">
                <p className="font-bold text-[#11345b]">企业级服务保障</p>
                <p className="text-blue-600/70">支持API对接第三方平台 · 3年质保 · 7x24h紧急响应</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-12 overflow-x-auto no-scrollbar">
            {['details', 'specs', 'guide', 'download'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-8 text-sm font-black uppercase tracking-widest relative transition-colors ${activeTab === tab ? 'text-[#11345b]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {tab === 'details' && '产品详情'}
                {tab === 'specs' && '技术参数'}
                {tab === 'guide' && '应用指南'}
                {tab === 'download' && '下载资料'}
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-[#fdbd00]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Area */}
      <section className="bg-gray-50/50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20">
            
            {/* Main Content */}
            <div className="lg:w-2/3 space-y-24">
              
              {/* Description */}
              <div>
                <h3 className="text-3xl font-bold text-[#11345b] mb-8 flex items-center gap-3">
                  <span className="w-2 h-8 bg-[#fdbd00] rounded-full" />
                  全天候智能感知，重塑施工安全防线
                </h3>
                <p className="text-lg text-gray-500 leading-relaxed">
                  传统交通锥主要依靠视觉警示，难以应对夜间、雾天等低能见度环境下的突发状况。{product.name}内置高灵敏度姿态传感器，一旦受到撞击或非法移动，设备将立即唤醒并触发声光报警，同时通过4G网络将警情推送至中控平台及现场人员手持终端或穿戴设备。
                </p>

                {/* Working Principle Schematic */}
                <div className="mt-16 bg-white p-12 rounded-[40px] border border-gray-100 shadow-sm overflow-hidden relative group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#fdbd00] to-transparent opacity-50" />
                  <h4 className="text-xl font-bold text-[#11345b] mb-12 text-center uppercase tracking-widest">工作原理示意</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {workingSteps.map((step, idx) => (
                      <div key={step.id} className="relative z-10 text-center flex flex-col items-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 border border-gray-100 group-hover:bg-[#fdbd00]/10 transition-colors shadow-sm">
                          <step.icon className="w-8 h-8 text-[#11345b]" />
                        </div>
                        <h5 className="font-bold text-[#11345b] mb-3">{step.title}</h5>
                        <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                        {idx < 2 && (
                          <div className="hidden md:block absolute top-10 -right-6 text-gray-200">
                            <ArrowRight className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Specs Table */}
              <div id="specs">
                <h3 className="text-3xl font-bold text-[#11345b] mb-8 flex items-center gap-3">
                  <span className="w-2 h-8 bg-[#fdbd00] rounded-full" />
                  技术规格参数
                </h3>
                <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="px-10 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">参数项</th>
                        <th className="px-10 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">规格说明</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {specs.map((spec, i) => (
                        <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-10 py-6 text-[#11345b] font-bold">{spec.label}</td>
                          <td className="px-10 py-6 text-gray-500">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* Sidebar: Recommendations & Sales */}
            <aside className="lg:w-1/3 space-y-10">
              
              {/* Recommendations */}
              <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
                <h4 className="text-xl font-bold text-[#11345b] mb-8 pb-4 border-b border-gray-50 flex items-center gap-3">
                  <Zap className="w-5 h-5 text-[#fdbd00]" />
                  配套推荐
                </h4>
                <div className="space-y-8">
                  {recommendations.map((item, i) => (
                    <div key={i} className="group cursor-pointer">
                      <div className="flex gap-5">
                        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex-shrink-0 flex items-center justify-center group-hover:bg-[#fdbd00]/10 transition-colors">
                          <item.icon className="w-6 h-6 text-[#11345b]" />
                        </div>
                        <div>
                          <h5 className="font-bold text-[#11345b] mb-1 group-hover:text-[#fdbd00] transition-colors">{item.title}</h5>
                          <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action Card */}
              <div className="bg-[#11345b] p-12 rounded-[50px] text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-[#fdbd00] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#fdbd00]/20 group-hover:scale-110 transition-transform">
                    <Headphones className="w-8 h-8 text-[#11345b]" />
                  </div>
                  <h4 className="text-2xl font-bold mb-4">需要定制解决方案？</h4>
                  <p className="text-gray-400 text-sm mb-10 leading-relaxed">
                    我们的工程师随时准备为您提供专业的技术咨询与方案设计。
                  </p>
                  <div className="space-y-4">
                    <Link href="/contact" className="w-full py-5 bg-[#fdbd00] text-[#11345b] font-black rounded-2xl hover:bg-[#ffd700] transition-all shadow-xl shadow-[#fdbd00]/10 block text-center">
                      联系销售工程师
                    </Link>
                    <div className="text-sm">
                      <span className="text-gray-500">或拨打: </span>
                      <a href="tel:4008889999" className="text-white font-bold hover:text-[#fdbd00]">400-888-9999</a>
                    </div>
                  </div>
                </div>
              </div>

            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
