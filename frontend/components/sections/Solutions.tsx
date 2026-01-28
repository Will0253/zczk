'use client'

import { motion } from 'motion/react'
import { Shield, Activity, Radio, Trees, Siren, GraduationCap, ChevronRight, ArrowRight, MessageSquare, Download, CheckCircle2, AlertTriangle } from 'lucide-react'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import Link from 'next/link'
import { scenarios, getAllSolutions, getFeaturedSolutions } from '@/content/solutions'

// 图标映射
const iconMap = {
  Shield,
  Radio,
  Activity,
  Trees,
  Siren,
  GraduationCap,
} as const

// 场景导航数据
const scenarioNav = [
  { id: 'highway', name: '高速养护施工', icon: Shield },
  { id: 'tunnel', name: '隧道智慧监测', icon: Radio },
  { id: 'bridge', name: '桥梁健康监测', icon: Activity },
  { id: 'scenic', name: '智慧园区/景区', icon: Trees },
  { id: 'emergency', name: '应急指挥调度', icon: Siren },
]

// 更多场景数据
const moreScenarios = [
  {
    id: 'scenic',
    title: '智慧景区交通管理',
    desc: '解决景区高峰期人车混行难题。利用智能引导屏和流量相机，实时疏导车流，预防拥堵和交通事故。',
    icon: Trees,
    color: 'emerald',
    image: '/images/solutions/smart-scenic.jpg'
  },
  {
    id: 'emergency',
    title: '应急指挥调度',
    desc: '交通事故现场的快速部署系统。便携式雷达和预警屏可在5分钟内完成布设，为救援人员提供安全屏障。',
    icon: Siren,
    color: 'blue',
    image: '/images/solutions/emergency-dispatch.jpg'
  },
  {
    id: 'school',
    title: '校园周边安全',
    desc: '针对上下学时段的潮汐交通流，提供智能限速提醒与行人检测预警，保障学生过街安全。',
    icon: GraduationCap,
    color: 'purple',
    image: '/images/solutions/bridge-health.jpg'
  }
]

export function Solutions() {
  const featuredSolutions = getFeaturedSolutions()
  
  return (
    <div className="bg-[#f8fafc] min-h-screen selection:bg-[#fdbd00] selection:text-[#11345b]">
      {/* 🚀 Hero Section */}
      <section className="relative bg-[#11345b] pt-48 pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', 
            backgroundSize: '40px 40px' 
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
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
              场景化<span className="text-[#fdbd00]">智慧交通</span>解决方案
            </h1>
            <p className="text-lg lg:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              深度融合人工智能、物联网与大数据技术，针对高速公路、隧道工程、桥梁养护及城市交通等不同场景，打造“感知-决策-预警”全链路闭环，让交通更安全、管理更高效。
            </p>
          </motion.div>
        </div>

        {/* Floating Background Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fdbd00]/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />
      </section>

      {/* 🧭 Sticky Sub-nav */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex items-center justify-center space-x-1 py-1">
            {scenarioNav.map((s) => (
              <a 
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-2 px-6 py-4 text-sm font-bold text-gray-500 hover:text-[#11345b] hover:bg-gray-50 transition-all border-b-2 border-transparent hover:border-[#fdbd00] whitespace-nowrap"
              >
                <s.icon className="w-4 h-4" />
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 🚧 High-Speed Maintenance Section */}
      <section id="highway" className="py-32 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[16/10] rounded-[40px] overflow-hidden shadow-2xl relative">
                <ImageWithFallback 
                  src="/images/solutions/highway-safety.jpg"
                  alt="高速养护施工"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-3">
                  <div className="bg-red-500 p-2 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white text-sm font-bold">实时监测：监测到社会车辆非法闯入施工区</span>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#fdbd00]/10 rounded-full blur-3xl" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 text-[#fdbd00] font-black mb-6 tracking-[0.2em] uppercase text-sm">
                <span className="w-12 h-px bg-[#fdbd00]" />
                核心场景 01
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#11345b] mb-8 tracking-tight">
                智慧高速养护施工区<br />防闯入预警系统
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-10">
                针对高速公路占道施工场景，利用毫米波雷达与智能预警锥桶构建防闯入监测网。一旦发现社会车辆有闯入趋势，系统将在毫秒级时间内联动现场声光报警与作业人员穿戴设备，实现“车-路-人”三位一体的主动安全防御。
              </p>

              <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="space-y-4">
                  <h4 className="text-[#11345b] font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    主要痛点
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-500 font-medium">
                    <li>• 夜间及恶劣天气视线差</li>
                    <li>• 驾驶员疲劳驾驶导致闯入</li>
                    <li>• 传统锥桶倒伏无法及时发现</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[#11345b] font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    方案价值
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-500 font-medium">
                    <li>• <span className="text-[#11345b] font-black underline decoration-[#fdbd00]">0.1秒</span> 极速声光联动报警</li>
                    <li>• 锥桶状态实时上云可视化</li>
                    <li>• 降低作业区事故率40%以上</li>
                  </ul>
                </div>
              </div>

              <Link href="/solutions/highway-safety" className="inline-flex items-center gap-3 px-8 py-4 bg-[#11345b] text-white rounded-2xl font-bold group hover:shadow-xl hover:shadow-[#11345b]/20 transition-all">
                <span>查看详细配置方案</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🚇 Tunnel Monitoring Section */}
      <section id="tunnel" className="py-32 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="flex items-center gap-3 text-[#fdbd00] font-black mb-6 tracking-[0.2em] uppercase text-sm">
                <span className="w-12 h-px bg-[#fdbd00]" />
                核心场景 02
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#11345b] mb-8 tracking-tight">
                隧道施工安全与<br />环境综合监测系统
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-10">
                专为隧道及地下工程设计的综合安全管理平台。集成高精度人员定位、有毒有害气体监测、LED引导屏及应急通讯系统，解决封闭空间信号差、监管难的问题，确保施工过程全透明、可追溯。
              </p>

              <div className="space-y-6 mb-12">
                {[
                  { title: '多维环境感知', desc: '实时监测CO、瓦斯、粉尘浓度，超限自动启动风机并报警。' },
                  { title: 'UWB 人员定位', desc: '定位精度高达10cm，实时掌握洞内人员分布，支持一键SOS呼救。' },
                  { title: '步态与生命体征监测', desc: '智能分析作业人员状态，及时发现晕倒、跌落等异常情况。' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-[#f8fafc] rounded-2xl border border-gray-100 hover:border-[#fdbd00]/30 transition-colors">
                    <div className="bg-[#11345b] p-3 rounded-xl h-fit">
                      <CheckCircle2 className="w-5 h-5 text-[#fdbd00]" />
                    </div>
                    <div>
                      <h4 className="text-[#11345b] font-bold mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/*
              <button className="inline-flex items-center gap-3 text-[#11345b] font-black group">
                <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                <span className="border-b-2 border-[#fdbd00]">下载技术白皮书</span>
              </button>
              */}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 relative"
            >
              <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl relative">
                <ImageWithFallback 
                  src="/images/solutions/tunnel-monitoring.jpg"
                  alt="隧道智慧监测"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="absolute -top-6 -right-6 p-6 bg-[#fdbd00] text-[#11345b] font-black rounded-3xl shadow-xl flex items-center gap-2">
                系统运行正常
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🌉 Bridge Health Section */}
      <section id="bridge" className="py-32 px-4 relative overflow-hidden bg-[#11345b]">
        <div className="absolute inset-0 opacity-5">
           <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, rotateY: 20 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square rounded-[60px] overflow-hidden border-8 border-white/5 relative">
                <ImageWithFallback 
                  src="/images/solutions/bridge-health.jpg"
                  alt="桥梁健康监测"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11345b] via-transparent to-transparent" />
                
                {/* Stats Overlay */}
                <div className="absolute bottom-12 left-8 right-8 grid grid-cols-3 gap-4">
                  {[
                    { label: '结构应力', value: '45.2', unit: 'MPa' },
                    { label: '震动频率', value: '1.2', unit: 'Hz' },
                    { label: '索力偏差', value: '0.5', unit: '%' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                      <div className="text-[10px] text-gray-400 font-bold mb-1">{stat.label}</div>
                      <div className="text-xl font-black text-[#fdbd00]">{stat.value}</div>
                      <div className="text-[10px] text-white/60">{stat.unit}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 text-[#fdbd00] font-black mb-6 tracking-[0.2em] uppercase text-sm">
                <span className="w-12 h-px bg-[#fdbd00]" />
                核心场景 03
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight">
                大型桥梁结构健康<br />监测解决方案
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-10">
                运用物联网传感技术，对桥梁全生命周期进行健康体检。通过部署高精度传感器（应力、应变、位移、温湿度等），实时采集结构数据，利用AI算法评估桥梁健康状况，实现从“被动维养”向“预防性养护”的转变。
              </p>

              <div className="grid grid-cols-2 gap-4 mb-12">
                {[
                  '荷载响应监测', '环境腐蚀监测', '自动报表生成', '超限实时预警'
                ].map((tag) => (
                  <div key={tag} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl text-white font-medium text-sm hover:bg-white/10 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[#fdbd00]" />
                    {tag}
                  </div>
                ))}
              </div>

              {/* 🧩 Added Download Button (Consistency with Scenario 02) 
              <button className="inline-flex items-center gap-3 text-white font-black group">
                <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform text-[#fdbd00]" />
                <span className="border-b-2 border-[#fdbd00] hover:text-[#fdbd00] transition-colors">下载技术白皮书</span>
              </button>
              */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🌟 More Scenarios Grid */}
      <section className="py-32 px-4 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-[#11345b] mb-6">更多应用场景</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">从中创智控的技术积累出发，我们将安全防护延伸至更多领域。</p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {moreScenarios.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <ImageWithFallback 
                  src={item.image} 
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg">
                  <item.icon className={`w-5 h-5 text-${item.color}-600`} />
                </div>
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-bold text-[#11345b] mb-4 group-hover:text-[#fdbd00] transition-colors">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">{item.desc}</p>
                {/* 
                <button className="text-sm font-black text-[#11345b] flex items-center gap-2 group/btn">
                  <span>了解方案详情</span>
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
                */}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 💬 CTA Section */}
      <section className="py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#11345b] rounded-[60px] p-12 md:p-24 relative overflow-hidden text-center">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10" style={{ 
              backgroundImage: 'radial-gradient(circle at 2px 2px, #fdbd00 1px, transparent 0)', 
              backgroundSize: '40px 40px' 
            }} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="text-4xl lg:text-6xl text-white font-bold mb-8">找不到适合您的场景？</h2>
              <p className="text-gray-400 text-lg lg:text-xl max-w-3xl mx-auto mb-16 leading-relaxed">
                我们的工程师团队拥有丰富的定制开发经验，能够根据您的具体需求，为您量身打造专属的智慧交通预警解决方案。
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/contact" className="w-full sm:w-auto px-10 py-5 bg-[#fdbd00] text-[#11345b] font-black rounded-[32px] flex items-center justify-center gap-3 shadow-2xl hover:scale-105 transition-all">
                  <MessageSquare className="w-5 h-5" />
                  预约专家咨询
                </Link>
              </div>
            </motion.div>

            {/* Glowing orb */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-[#fdbd00]/10 rounded-full blur-[120px]" />
          </div>
        </div>
      </section>
    </div>
  )
}
