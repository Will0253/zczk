'use client'

import { motion } from 'motion/react'
import { 
  Shield, 
  Activity, 
  Radio, 
  Zap, 
  Bell, 
  Cpu, 
  HardHat, 
  Camera, 
  Smartphone, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Target, 
  Settings, 
  Layers, 
  PlayCircle, 
  Download,
  MonitorSmartphone,
  ShieldCheck,
  Speaker,
  Info,
  Search,
  Video,
  CloudRain,
  ShieldAlert,
  RefreshCw,
  Volume2,
  Ear,
  Clock,
  Monitor,
  Cloud,
  ChevronDown
} from 'lucide-react'
import Link from 'next/link'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'

const slowLaneImg = 'https://images.unsplash.com/photo-1765121689955-a868472089d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
const fastLaneImg = 'https://images.unsplash.com/photo-1757030689668-c7aa2975ca95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'

const painPoints = [
  { title: '成本高且不可靠', desc: '传统视频监控安装难、费用高，稳定性不足', icon: Zap },
  { title: '覆盖与环境受限', desc: '无人机、机器人巡检范围有限，受天气影响大', icon: AlertTriangle },
  { title: '监管滞后被动', desc: '人员蹲守模式后知后觉，难以应对突发情况', icon: Activity },
  { title: '效率低下', desc: '人工巡检周期长、效率低，信息化设备配备率低', icon: Settings },
  { title: '数据误差大', desc: '口头报告现场情况掌握不准，易导致决策失误', icon: Target },
  { title: '协同管控难', desc: '多平台相互独立，作业过程监督困难', icon: Layers },
]

const hardwareList = [
  {
    name: '预警路锥',
    icon: Bell,
    image: 'https://images.unsplash.com/photo-1763569026025-17f15c1012a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFmZmljJTIwd2FybmluZyUyMGNvbmV8ZW58MXx8fHwxNzY2NDE4NDM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    config: '24G雷达、实时视频流、定向强声器、高亮爆闪灯',
    features: '监测距离超150米，预警阀值可调，支持超速预警联动；远程查看、超速抓拍、本地存储；最大声压126分贝；可视距离2000米。',
    extras: '加大电池容量、增高支架、远程喊话、地图平台对接。'
  },
  {
    name: '预警肩灯',
    icon: Activity,
    image: 'https://images.unsplash.com/photo-1618212624057-3ce6e5819cc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZldHklMjBzaG91bGRlciUyMGxpZ2h0fGVufDF8fHx8MTc2NjQxODQzNXww&ixlib=rb-4.1.0&q=80&w=1080',
    config: '声音报警、LORA传输、超长待机、高亮爆闪灯',
    features: 'LORA传输距离超500米，抗干扰强；待机2周；红蓝爆闪，夜间可视500米；内置蜂鸣器语音播报。',
    role: '联动路锥，提示施工人员避让，实现声光报警。'
  },
  {
    name: '防闯精灵',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1625465588028-458f59e19ee6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3Rpb24lMjBzZW5zb3IlMjBhbGFybSUyMGRldmljZXxlbnwxfHx8fDE3NjY0MTg0MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    config: '闯入报警、LORA传输、超长待机、高亮爆闪灯',
    features: '内置蜂鸣器，支持语音播报、碰撞感知与闯入报警；LORA传输距离超500米，可联动相关设备。',
    role: '实现闯入感知，联动触发声光警报，跌倒可触发预警。'
  },
  {
    name: '便携式强声器',
    icon: Speaker,
    image: 'https://images.unsplash.com/photo-1648522168473-dfec1d2a5cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY291c3RpYyUyMGhhaWxpbmclMjBkZXZpY2UlMjBtZWdhcGhvbmV8ZW58MXx8fHwxNzY2NDE4NDM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    config: '强声预警、无线喊话、灵活便携、高亮爆闪灯',
    features: '最大声压134分贝，核心声束角小于20度；LORA传输距离超300米，重量小于6KG。',
    role: '声光预警过往车辆，支持无线喊话，强声定向传播。'
  },
  {
    name: '智慧安全帽',
    icon: HardHat,
    image: 'https://images.unsplash.com/photo-1682315847217-4226cfcdd250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHNhZmV0eSUyMGhlbG1ldCUyMGNhbWVyYXxlbnwxfHx8fDE3NjY0MTg0MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    config: '高精定位、实时视频、语音对讲、安全认证',
    features: 'GPS+北斗定位，轨迹回放；400万像素远程视频、SOS求救；远程语音对讲，符合国标认证。',
    role: '监控施工细节，实现人员轨迹查询与双向语音沟通。'
  },
  {
    name: 'AI 布控球',
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1666613789626-e8b9352639fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdHolMjBkb21lJTIwY2FtZXJhJTIwc2VjdXJpdHl8ZW58MXx8fHwxNzY2NDE4NDM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    config: 'AI算法、实时视频流、本地存储、视频回放',
    features: '支持安全帽、反光衣、车牌、烟火识别；20倍变焦，360度旋转；64G TF卡存储。',
    role: '实现全场监控与360度视频记录回溯。'
  }
]

export function HighwaySolutionDetail() {
  return (
    <div className="bg-white min-h-screen selection:bg-[#fdbd00] selection:text-[#11345b]">
      {/* 🚀 Hero Section */}
      <section className="relative pt-32 pb-24 bg-[#11345b] overflow-hidden">
        {/* Background Pattern */}
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
            <nav className="flex items-center gap-2 text-white/60 text-sm mb-8">
              <Link href="/" className="hover:text-[#fdbd00] transition-colors">首页</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/solutions" className="hover:text-[#fdbd00] transition-colors">解决方案</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#fdbd00]">智慧高速养护施工区防闯入预警系统</span>
            </nav>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              智慧高速养护施工区<br />
              <span className="text-[#fdbd00]">防闯入预警系统</span>解决方案
            </h1>
            
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed mb-12">
              依托前端智能硬件集群与AI监控平台，通过4G或WiFi传输技术，深度应用于高速养护施工现场安全管理。旨在解决传统管理模式的低效、滞后等问题，大幅提升管理效率与监管水平，筑牢安全生产防线。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: '预警响应时间', value: '≤5秒', color: '#fdbd00' },
                { label: '违规行为识别率', value: '提升70%', color: '#fdbd00' },
                { label: '设备在线率', value: '≥98%', color: '#fdbd00' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                  <div className="text-sm text-white/60 mb-2">{stat.label}</div>
                  <div className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🧩 Solution Overview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 text-[#fdbd00] font-black mb-6 tracking-[0.2em] uppercase text-sm">
                <span className="w-12 h-px bg-[#fdbd00]" />
                方案总览
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#11345b] mb-8">深度融合智能硬件与AI监控</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  本方案基于稳定的物联网技术，构建高效的人员定位、可视化行为识别系统。通过精准定位作业人员位置、远程可视化通信指挥、AI语音/图像识别等功能，为统筹调度提供准确快速的信息支撑。
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    '位置定位与实时调度', '作业现场实时监控', 
                    '视频记录与事件追溯', '多维度报警数据采集', 
                    '车牌识别与烟火监测', '物联网平台一键统筹'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#fdbd00]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100"
            >
              <h3 className="text-xl font-bold text-[#11345b] mb-6 flex items-center gap-2">
                <Info className="w-5 h-5 text-[#fdbd00]" />
                设计原则与依据
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">遵循标准</h4>
                  <ul className="grid grid-cols-1 gap-2 text-sm text-gray-500">
                    <li>• 《公路养护安全作业规程》JTG -H30-2015</li>
                    <li>• 《道路交通标志和标线》JTG 5768.2/4</li>
                    <li>• 《计算机软件产品开发文件编制指南》GB8567-88</li>
                    <li>• 《信息技术设备的安全》GB4943-90</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">核心原则</h4>
                  <div className="flex flex-wrap gap-2">
                    {['技术先进', '标准统一', '经济实用', '可维护性', '可操作性', '可扩展性'].map(p => (
                      <span key={p} className="px-3 py-1 bg-[#11345b]/5 text-[#11345b] text-xs font-bold rounded-full">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ⚠️ Pain Points */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-[#11345b] mb-6">行业痛点解析</h2>
            <div className="w-20 h-1.5 bg-[#fdbd00] mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-[32px] bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#11345b]/5 flex items-center justify-center mb-6 group-hover:bg-[#11345b] transition-colors">
                  <point.icon className="w-7 h-7 text-[#11345b] group-hover:text-[#fdbd00] transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#11345b] mb-4">{point.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ⚙️ Hardware Section */}
      <section className="py-24 bg-[#11345b] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', 
            backgroundSize: '40px 40px' 
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-6">
              <span className="text-[#fdbd00] text-xs font-black tracking-widest uppercase">Hardware Cluster</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">智能硬件集群介绍</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hardwareList.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 hover:border-[#fdbd00]/50 transition-colors group flex flex-col"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-[#fdbd00] rounded-xl flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-[#11345b]" />
                  </div>
                  <div className="text-[10px] text-white/40 font-black uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
                    {i + 1 < 10 ? `0${i + 1}` : i + 1}
                  </div>
                </div>
                
                <div className="mb-8 aspect-video rounded-2xl overflow-hidden bg-[#11345b]/20 border border-white/5 group-hover:border-[#fdbd00]/30 transition-colors relative">
                  <ImageWithFallback 
                    src={item.image} 
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-[#fdbd00] transition-colors">{item.name}</h3>
                <div className="space-y-6 flex-1">
                  <div>
                    <span className="text-xs font-bold text-[#fdbd00] uppercase block mb-2">核心配置</span>
                    <p className="text-sm text-white/60">{item.config}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#fdbd00] uppercase block mb-2">核心功能</span>
                    <p className="text-sm text-white/60">{item.features}</p>
                  </div>
                  {item.role && (
                    <div className="pt-4 border-t border-white/5">
                      <span className="text-xs font-bold text-white/40 uppercase block mb-2">核心作用</span>
                      <p className="text-sm text-white/70">{item.role}</p>
                    </div>
                  )}
                  {item.extras && (
                    <div className="pt-4 border-t border-white/5">
                      <span className="text-xs font-bold text-white/40 uppercase block mb-2">可扩展功能</span>
                      <p className="text-sm text-white/70 italic">{item.extras}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 📊 System Architecture */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 text-[#fdbd00] font-black mb-6 tracking-[0.2em] uppercase text-sm">
                <span className="w-12 h-px bg-[#fdbd00]" />
                平台架构与能力
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#11345b] mb-8 leading-tight">分布式架构支撑<br />全场景安全管理</h2>
              <div className="space-y-8">
                {[
                  { title: '数据采集层', desc: '通过物联网设备采集道路状态、车辆信息、交通流量、现场视频等数据。', icon: Layers },
                  { title: '数据处理层', desc: '对采集数据进行清洗、整理与初步分析。', icon: Settings },
                  { title: '数据分析层', desc: '深度挖掘数据价值，提取关键信息与预警信号。', icon: Cpu },
                  { title: '应用层', desc: '面向用户提供管理操作、移动办公及大屏展示。', icon: MonitorSmartphone },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-[#11345b]/5 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-[#11345b]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#11345b] mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-[#f8fafc] rounded-[40px] p-10 border border-gray-100">
                <h3 className="text-xl font-bold text-[#11345b] mb-8 flex items-center gap-2">
                  <MonitorSmartphone className="w-5 h-5 text-[#fdbd00]" />
                  终端支持体系
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  {[
                    { type: 'PC端后台', features: '视频监控、录像回放、数据统计、设备配置。' },
                    { type: '移动端APP', features: '实时视频预览、报警信息接收、现场拍照上传。' },
                    { type: '可视化大屏', features: '施工态势感知、告警数据概览、全局指挥调度。' },
                  ].map((term, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                      <div>
                        <div className="font-bold text-[#11345b]">{term.type}</div>
                        <div className="text-xs text-gray-400 mt-1">{term.features}</div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#11345b] rounded-[40px] p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#fdbd00]/10 rounded-full blur-3xl" />
                <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 text-[#fdbd00]" />
                  系统工作流程
                </h3>
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#fdbd00] text-[#11345b] flex items-center justify-center font-bold text-sm">1</div>
                    <div className="text-sm font-medium">前端设备实时采集多维数据</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#fdbd00] text-[#11345b] flex items-center justify-center font-bold text-sm">2</div>
                    <div className="text-sm font-medium">4G/WiFi极速上云，数据分析提取预警</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#fdbd00] text-[#11345b] flex items-center justify-center font-bold text-sm">3</div>
                    <div className="text-sm font-medium">指挥中心三端同步接收，及时发现隐患</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#fdbd00] text-[#11345b] flex items-center justify-center font-bold text-sm">4</div>
                    <div className="text-sm font-medium">管理调度与决策部署，消除安全威胁</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🏗️ System Architecture Flow */}
      <section className="py-24 bg-slate-50/50 overflow-hidden border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#11345b]/5 border border-[#11345b]/10 rounded-full mb-6"
            >
              <div className="w-1.5 h-1.5 bg-[#fdbd00] rounded-full animate-pulse" />
              <span className="text-[#11345b] text-xs font-black tracking-widest uppercase">System Architecture</span>
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#11345b] mb-4">系统架构</h2>
            <p className="text-gray-500 font-medium">新一代 4G 互联安全网格，毫秒级响应机制</p>
          </div>

          <div className="relative">
            {/* Top: Command Center */}
            <div className="flex justify-center mb-24 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full max-w-5xl bg-white/80 backdrop-blur-2xl rounded-[40px] shadow-2xl shadow-blue-900/5 p-8 md:p-12 border border-white flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden group"
              >
                {/* Tech Background Detail */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                  <div className="absolute inset-0" style={{ 
                    backgroundImage: 'linear-gradient(#11345b 1px, transparent 1px), linear-gradient(90deg, #11345b 1px, transparent 1px)',
                    backgroundSize: '32px 32px'
                  }} />
                </div>

                <div className="flex items-center gap-8 relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <ShieldCheck className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900">指挥中心</h3>
                    <p className="text-sm text-gray-400 font-medium">集中控制 • 实时调度 • 数据可视化</p>
                  </div>
                </div>

                <div className="flex items-center gap-10 lg:border-x lg:border-gray-100 lg:px-12 h-16 relative z-10">
                  <div className="flex flex-col items-center gap-2 group/icon">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover/icon:bg-blue-50 transition-colors">
                      <Monitor className="w-5 h-5 text-gray-400 group-hover/icon:text-blue-600 transition-colors" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">工作站</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 group/icon">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover/icon:bg-blue-50 transition-colors">
                      <Smartphone className="w-5 h-5 text-gray-400 group-hover/icon:text-blue-600 transition-colors" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">移动应用</span>
                  </div>
                </div>

                <div className="flex-1 w-full relative z-10">
                  <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black text-gray-400 uppercase tracking-widest">核心系统功能</span>
                      <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-blue-600" />
                        <div className="w-1 h-1 rounded-full bg-blue-400" />
                        <div className="w-1 h-1 rounded-full bg-blue-200" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {['远程控制', '广播喊话', '实时监控', '数据分析'].map(f => (
                        <div key={f} className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-sm text-xs font-bold text-gray-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Data Flow Line Down */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 h-24 w-px bg-gradient-to-b from-blue-200 to-transparent">
                <motion.div 
                  animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full blur-[2px]"
                />
              </div>
            </div>

            {/* Bottom: Running Standards */}
            <div className="mt-20 bg-white/80 backdrop-blur-md rounded-[40px] p-8 md:p-12 border border-white shadow-2xl shadow-blue-900/5 relative overflow-hidden">
              {/* Abstract decoration */}
              <div className="absolute top-0 left-0 w-2 h-full bg-[#11345b]" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 border-b border-gray-50 pb-8">
                <div>
                  <h5 className="text-xl font-black text-gray-900 mb-1">系统运行标准</h5>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.2em]">Operating Performance Standards</p>
                </div>
                <div className="flex gap-2">
                  <div className="px-4 py-2 bg-blue-50 rounded-xl text-blue-700 text-xs font-black">ISO 9001 Certified</div>
                  <div className="px-4 py-2 bg-green-50 rounded-xl text-green-700 text-xs font-black">24/7 Monitoring</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                {[
                  { icon: Zap, title: '快速响应', desc: '触发即时反应，处理延时 <500ms', color: 'text-blue-500', bg: 'bg-blue-50' },
                  { icon: RefreshCw, title: '同步协同', desc: '全网多点同步输出，零相位差', color: 'text-cyan-500', bg: 'bg-cyan-50' },
                  { icon: Clock, title: '预警策略', desc: '15-20秒循环播报，支持分级响应', color: 'text-purple-500', bg: 'bg-purple-50' },
                  { icon: Ear, title: '现场监听', desc: '高敏度音频反馈，实时质量监测', color: 'text-orange-500', bg: 'bg-orange-50' }
                ].map((std, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -5 }}
                    className="flex flex-col gap-5"
                  >
                    <div className={`w-14 h-14 ${std.bg} rounded-2xl flex items-center justify-center`}>
                      <std.icon className={`w-7 h-7 ${std.color}`} />
                    </div>
                    <div>
                      <h5 className="text-lg font-black text-gray-900 mb-2">{std.title}</h5>
                      <p className="text-sm text-gray-500 leading-relaxed font-medium">{std.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🛣️ Scenarios Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-[#11345b] mb-6">场景化应用方案</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">针对不同等级的高速公路及施工环境，提供科学、合规的设备部署策略。</p>
          </div>

          <div className="space-y-20">
            {/* Scenario 01 */}
            <div className="bg-white rounded-[60px] p-8 md:p-12 shadow-xl border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 text-[#fdbd00] font-black mb-6 tracking-[0.2em] uppercase text-xs">
                    <span className="w-12 h-px bg-[#fdbd00]" />
                    方案场景 01
                  </div>
                  <h3 className="text-3xl font-bold text-[#11345b] mb-6">慢车道养护作业</h3>
                  <p className="text-sm text-gray-400 mb-8 italic">双向四车道临时占用二车道，限速80为例</p>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-2xl border-l-4 border-[#fdbd00]">
                      <h4 className="font-bold text-[#11345b] mb-2">作业区域划分</h4>
                      <p className="text-sm text-gray-500">警告区（2000m）→ 上游过渡区（300m）→ 纵向缓冲区（150m）→ 施工作业区 → 下游过渡区（50m）→ 终止区</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-[#11345b] mb-2">硬件部署</h4>
                        <p className="text-xs text-gray-500">合理配置预警路锥、防闯精灵、智慧安全帽、AI布控球，实现全区域覆盖。</p>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-[#11345b] mb-2">核心目标</h4>
                        <p className="text-xs text-gray-500">保障作业区域与过往车辆的安全隔离，毫秒级响应闯入风险。</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-50 relative aspect-video">
                    <ImageWithFallback src={slowLaneImg} alt="慢车道养护" fill className="object-cover" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 p-4 bg-[#fdbd00] text-[#11345b] font-black rounded-2xl shadow-xl text-xs">
                    部署示意图：限速 80km/h
                  </div>
                </div>
              </div>
            </div>

            {/* Scenario 02 */}
            <div className="bg-white rounded-[60px] p-8 md:p-12 shadow-xl border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1 relative">
                  <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-50 relative aspect-video">
                    <ImageWithFallback src={fastLaneImg} alt="快车道养护" fill className="object-cover" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 p-4 bg-[rgb(253,189,0)] text-[rgb(17,52,91)] font-black rounded-2xl shadow-xl text-xs">
                    部署示意图：限速 120km/h
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="flex items-center gap-3 text-[#fdbd00] font-black mb-6 tracking-[0.2em] uppercase text-xs">
                    <span className="w-12 h-px bg-[#fdbd00]" />
                    方案场景 02
                  </div>
                  <h3 className="text-3xl font-bold text-[#11345b] mb-6">快车道养护作业</h3>
                  <p className="text-sm text-gray-400 mb-8 italic">双向八车道占用一、二车道，限速120为例</p>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-2xl border-l-4 border-[#11345b]">
                      <h4 className="font-bold text-[#11345b] mb-2">策略升级</h4>
                      <p className="text-sm text-gray-500">加密预警路锥与防闯精灵部署密度，强化超速预警；增加AI布控球与强声器数量，扩大监控范围。</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-[#11345b] mb-2">防护增强</h4>
                        <p className="text-xs text-gray-500">应对高车速带来的瞬间冲击风险，提升拦截与主动避让强度。</p>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-[#11345b] mb-2">实时感知</h4>
                        <p className="text-xs text-gray-500">全场景高精度视频流回传，毫秒级判定非法闯入行为。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 💼 Case Study */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#11345b] rounded-[60px] p-12 md:p-20 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute inset-0" style={{ 
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 40px, white 40px, white 41px)`
              }} />
            </div>
            
            <div className="max-w-3xl relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">实例应用现场</h2>
              <p className="text-white/60 text-lg leading-relaxed mb-12">
                中创智控 (ZCZK) 系统已在多个国家级级重点项目中成功应用。我们通过便携式、车载式、AI哨兵、预警路锥等多样化应用形态，有效提升了施工安全管理水平。
              </p>
              
              <div className="flex flex-wrap gap-8 items-center mb-16">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#fdbd00] flex items-center justify-center text-[#11345b]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold">G1812 沧榆高速</div>
                    <div className="text-xs text-white/40 uppercase">路面恢复性养护工程</div>
                  </div>
                </div>
                <div className="w-px h-12 bg-white/10 hidden md:block" />
                <div className="text-sm text-white/70">
                  有效降低施工现场闯入风险事故率 <span className="text-[#fdbd00] font-black underline decoration-white/20">45%</span> 以上
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <button className="px-10 py-5 bg-[#fdbd00] text-[#11345b] font-black rounded-3xl flex items-center justify-center gap-3 shadow-2xl hover:scale-105 transition-all">
                  <Download className="w-5 h-5" />
                  下载详细 PDF 方案
                </button>
                <Link href="/contact" className="px-10 py-5 bg-white/10 text-white font-black rounded-3xl flex items-center justify-center gap-3 border border-white/20 hover:bg-white/20 transition-all">
                  预约专家视频演示
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            
            {/* Glowing Orbs */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#fdbd00]/10 rounded-full blur-[120px] translate-y-1/2 translate-x-1/4" />
          </div>
        </div>
      </section>
    </div>
  )
}
