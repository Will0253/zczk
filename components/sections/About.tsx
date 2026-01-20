'use client'

import Link from 'next/link'
import { Target, Eye, Heart, Brain, Users, Award, TrendingUp, Lightbulb, ShieldCheck, Zap, ChevronRight, History, Globe, Cpu, Layers } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'

const stats = [
  { label: '研发精英', value: '100+', icon: Users, color: 'text-[#fdbd00]' },
  { label: '核心专利', value: '50+', icon: Award, color: 'text-white' },
  { label: '覆盖里程', value: '12,00km+', icon: Globe, color: 'text-[#fdbd00]' },
]

const milestones = [
  { year: '2015', title: '公司成立', desc: '中创智控于深圳成立，确立"智慧交通"发展战略。' },
  { year: '2017', title: '技术突破', desc: '发布首款AI边缘计算终端，实现施工现场实时预警。' },
  { year: '2020', title: '行业领先', desc: '多维融合感知技术成熟，市场份额跻身国内前三。' },
  { year: '2023', title: '全面升级', desc: '启动"云边端"一体化平台，定义智慧路段新标准。' },
]

const bentoAdvantages = [
  {
    title: 'AI 行为深度算法',
    desc: '基于自研深度学习架构，针对交通复杂场景优化，目标识别率 >99.8%。',
    icon: Brain,
    size: 'col-span-2 row-span-2',
    img: '/images/about/tech-dashboard.jpg',
    color: 'bg-blue-600/20',
  },
  {
    title: '多源感知融合',
    desc: '雷达+视觉+多传感器冗余架构。',
    icon: Layers,
    size: 'col-span-1 row-span-1',
    color: 'bg-[#fdbd00]/10',
  },
  {
    title: '军工级硬件',
    desc: '全天候稳定运行。',
    icon: ShieldCheck,
    size: 'col-span-1 row-span-1',
    color: 'bg-white/5',
  },
  {
    title: '云边协同架构',
    desc: '边缘端毫秒级反馈，云端大数据长周期分析，构建完整的闭环安全保障体系。',
    icon: Cpu,
    size: 'col-span-2 row-span-1',
    color: 'bg-[#11345b]/40',
  },
]

export function About() {
  const { scrollYProgress } = useScroll()

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  
  // Timeline Line Progress
  const timelineProgress = useTransform(scrollYProgress, [0.3, 0.6], [0, 1])

  return (
    <div className="relative bg-white selection:bg-[#fdbd00] selection:text-[#11345b] overflow-hidden">
      {/* 🚀 Global Tech Background Architecture */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Dark to Light Transition Background */}
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0.2, 0.3], [1, 0]) 
          }}
          className="absolute inset-0 bg-[#0a1f3d]"
        />
        
        {/* Subtle Algorithm Lines (Visible in white sections) */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%" className="stroke-[#11345b]">
            <pattern id="grid-lines" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M 200 0 L 0 0 0 200" fill="none" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="1.5" fill="#fdbd00" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-lines)" />
          </svg>
        </div>

        {/* Ambient Glows for White Theme */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-[#fdbd00] rounded-full blur-[180px]" />
          <div className="absolute bottom-[20%] left-[10%] w-[40%] h-[40%] bg-[#11345b] rounded-full blur-[180px]" />
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        {/* 1. Ultra Modern Hero Section */}
        <section className="relative min-h-screen flex items-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Section specific overlay for hero text readability */}
          <div className="absolute inset-0 bg-[#0a1f3d]/60 z-0 lg:hidden" />
          
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#fdbd00]/10 border border-[#fdbd00]/30 mb-8">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#fdbd00] animate-ping"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#fdbd00]"></div>
                  </div>
                  <span className="text-xs font-bold text-[#fdbd00] tracking-[0.2em] uppercase">Tech-Driven Safety</span>
                </div>
                <h1 className="text-5xl lg:text-8xl text-white font-bold leading-none mb-10 tracking-tighter">
                  中创智控<br />
                  <span className="relative">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#fdbd00] via-[#ffd700] to-white">
                      定义路段安全
                    </span>
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: '100%' }} 
                      transition={{ delay: 0.5, duration: 1 }}
                      className="absolute bottom-2 left-0 h-4 bg-[#fdbd00]/20 -z-0 rounded-sm"
                    ></motion.div>
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl mb-12">
                  以感知技术为核心，以AI算法为纽带，打造"看得见、管得住、预得准"的智慧交通生态。
                </p>
                
                <div className="flex flex-wrap gap-8 items-center">
                  <Link href="/products">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-[#fdbd00] text-[#11345b] font-bold rounded-full shadow-[0_0_30px_rgba(253,189,0,0.3)] hover:shadow-[0_0_50px_rgba(253,189,0,0.5)] flex items-center gap-3 group cursor-pointer"
                    >
                      探索核心技术 <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </Link>
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-2 border-[#11345b] bg-white/10 backdrop-blur-md overflow-hidden ring-2 ring-[#fdbd00]/20">
                        <ImageWithFallback src="/images/about/avatar.jpg" alt="Avatar" fill className="object-cover opacity-80" />
                      </div>
                    ))}
                    <div className="w-12 h-12 rounded-full border-2 border-[#11345b] bg-[#11345b] text-[#fdbd00] flex items-center justify-center text-xs font-bold ring-2 ring-[#fdbd00]/20">
                      +60%
                    </div>
                  </div>
                  <div className="text-sm text-gray-400 font-medium">研发占比逐年递增</div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative aspect-square"
              >
                {/* Complex Layered Image Stack */}
                <div className="absolute inset-0 rounded-[60px] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(17,52,91,0.5)] z-10">
                  <ImageWithFallback src="/images/about/tech-dashboard.jpg" alt="Tech Dashboard" fill className="object-cover grayscale-[30%]" />
                </div>
                
                {/* Floating UI Element 1 */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-10 -right-10 z-20 w-48 p-4 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#fdbd00]/20 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-[#fdbd00]" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">预警效率</span>
                  </div>
                  <div className="text-2xl font-bold text-white">+85%</div>
                  <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 2, delay: 1 }} className="h-full bg-[#fdbd00]"></motion.div>
                  </div>
                </motion.div>

                {/* Floating UI Element 2 */}
                <motion.div
                  animate={{ x: [0, 20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-12 z-20 w-56 p-5 bg-[#11345b]/80 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full border-2 border-[#fdbd00] p-1">
                        <div className="w-full h-full rounded-full bg-[#fdbd00] animate-pulse"></div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">实时感知引擎</div>
                      <div className="text-sm font-bold text-white">System Active</div>
                    </div>
                  </div>
                </motion.div>

                {/* Abstract Glass shapes */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-br from-[#fdbd00]/20 to-transparent rounded-full blur-[100px] opacity-30 animate-pulse"></div>
              </motion.div>
            </div>
          </motion.div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Scroll Explore</div>
            <div className="w-px h-16 bg-gradient-to-b from-[#fdbd00] to-transparent"></div>
          </div>
        </section>

        {/* Section Connector 1 */}
        <div className="relative h-24 flex justify-center items-center">
          <div className="w-px h-full bg-gradient-to-b from-[#fdbd00]/30 to-transparent" />
          <motion.div 
            animate={{ y: [0, 20, 0], opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-0 w-1.5 h-1.5 bg-[#fdbd00] rounded-full blur-[1px]" 
          />
        </div>

        {/* 2. Bento Grid Stats */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative p-8 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#fdbd00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="inline-flex p-4 rounded-2xl bg-[#0a1f3d]/80 border border-white/10 mb-6 group-hover:scale-110 group-hover:border-[#fdbd00]/30 transition-transform">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-5xl font-black text-white mb-2 tracking-tight group-hover:text-[#fdbd00] transition-colors">{stat.value}</div>
                  <div className="text-gray-400 font-bold uppercase tracking-widest text-sm">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section Connector 2 - Smooth Transition Bridge */}
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f3d] to-transparent z-0" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-[#fdbd00] via-[#fdbd00]/20 to-transparent z-10" />
          <motion.div 
            style={{ top: useTransform(scrollYProgress, [0.2, 0.4], ["0%", "100%"]) }}
            className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-[#fdbd00] rounded-full shadow-[0_0_15px_#fdbd00] z-20"
          />
        </div>

        {/* 3. Narrative Intro - Enhanced Parallax & Depth */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative aspect-[4/5] rounded-[60px] overflow-hidden border border-gray-100 z-10 shadow-2xl group"
              >
                <ImageWithFallback src="/images/about/company-vision.jpg" alt="Company Vision" fill className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11345b]/40 via-transparent to-transparent"></div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute -bottom-16 -right-16 w-2/3 aspect-square rounded-[40px] overflow-hidden border-8 border-white shadow-2xl z-20 hidden md:block group"
              >
                <ImageWithFallback src="/images/about/hardware-detail.jpg" alt="Hardware Detail" fill className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              </motion.div>

              <div className="absolute -top-10 -left-10 w-48 h-48 border-2 border-[#fdbd00]/10 rounded-full animate-spin-slow"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#11345b]/5 text-[#11345b] text-xs font-bold tracking-widest uppercase mb-8 border border-[#11345b]/10">
                Foundations & Philosophy
              </div>
              <h2 className="text-4xl lg:text-7xl text-[#11345b] font-bold mb-10 leading-[1.1] tracking-tighter">深耕场景<br /><span className="text-[#fdbd00]">筑牢生命防线</span></h2>
              <div className="space-y-8 text-gray-600 text-lg leading-relaxed">
                <p>
                  成立于2015年的中创智控，始终坚持"技术至简，安全至上"的研发哲学。我们不仅提供硬件，更是在构建一套能够自我学习、自我进化的交通安全大脑。
                </p>
                <p>
                  从最初的单一感应器，到如今覆盖高速、隧道、桥梁的"全息路段"解决方案，中创智控已为全球数千个项目提供了可靠的安全守护。我们的每一行代码，都在为生命争取宝贵的响应时间。
                </p>
                <div className="grid grid-cols-2 gap-10 pt-10 border-t border-gray-100">
                  <div>
                    <div className="text-[#11345b] font-black text-3xl mb-3">100%</div>
                    <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">自主研发</div>
                    <div className="text-xs text-gray-500">芯片到底层算法的完全自主可控。</div>
                  </div>
                  <div>
                    <div className="text-[#11345b] font-black text-3xl mb-3">90天</div>
                    <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">迭代周期</div>
                    <div className="text-xs text-gray-500">快速演进以适配新场景挑战。</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 4. Vertical Scroll Timeline - Optimized */}
        <section className="py-40 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white/40">
          <div className="max-w-4xl mx-auto relative">
            <div className="text-center mb-32">
              <h2 className="text-4xl lg:text-6xl text-[#11345b] font-bold mb-6 tracking-tighter">我们的征程</h2>
              <div className="w-24 h-1.5 bg-[#fdbd00] mx-auto rounded-full"></div>
            </div>

            <div className="relative pb-20">
              {/* Vertical Progress Line */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 w-0.5 h-full bg-gray-100 overflow-hidden">
                <motion.div 
                  style={{ scaleY: timelineProgress, originY: 0 }}
                  className="w-full h-full bg-[#fdbd00]"
                />
              </div>

              <div className="space-y-40">
                {milestones.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`relative flex items-center justify-between ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Content Card */}
                    <div className="w-[42%] group">
                      <div className="relative p-8 rounded-[32px] bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-full bg-[#fdbd00] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="text-5xl font-black text-[#fdbd00]/10 mb-4 group-hover:text-[#fdbd00]/20 transition-colors">{item.year}</div>
                        <h3 className="text-2xl font-bold text-[#11345b] mb-4">{item.title}</h3>
                        <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
                      </div>
                    </div>

                    {/* Timeline Node */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center z-10">
                      <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        className="w-4 h-4 rounded-full bg-[#fdbd00] shadow-[0_0_20px_rgba(253,189,0,0.6)] ring-8 ring-white"
                      />
                    </div>

                    {/* Spacer for empty side */}
                    <div className="w-[42%]" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Bento Grid Advantages - Refined White Glassmorphism */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 relative bg-[#11345b]/5">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20">
              <div className="max-w-2xl">
                <div className="text-[#fdbd00] font-bold text-sm tracking-[0.4em] uppercase mb-4">Core Competency</div>
                <h2 className="text-4xl lg:text-7xl text-[#11345b] font-bold tracking-tighter">驱动安全的核心技术</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[280px]">
              {bentoAdvantages.map((adv, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`relative rounded-[48px] p-10 overflow-hidden group border border-white/60 ${adv.size} ${adv.color?.includes('bg-[#11345b]') ? 'bg-[#11345b]' : 'bg-white/40 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]'} transition-all duration-500`}
                >
                  {adv.img && (
                    <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                      <ImageWithFallback src={adv.img} alt={adv.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                    </div>
                  )}
                  
                  {/* Refined Glass Highlight */}
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <div className={`w-14 h-14 rounded-2xl ${adv.color?.includes('bg-[#11345b]') ? 'bg-white/10 text-white' : 'bg-[#11345b]/5 text-[#11345b]'} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                        <adv.icon className="w-7 h-7" />
                      </div>
                      <h3 className={`text-2xl font-bold ${adv.color?.includes('bg-[#11345b]') ? 'text-white' : 'text-[#11345b]'} mb-4 tracking-tight`}>{adv.title}</h3>
                      <p className={`${adv.color?.includes('bg-[#11345b]') ? 'text-gray-300' : 'text-gray-500'} text-base leading-relaxed max-w-sm`}>{adv.desc}</p>
                    </div>
                    
                    <div className={`flex items-center gap-2 text-sm font-bold ${adv.color?.includes('bg-[#11345b]') ? 'text-[#fdbd00]' : 'text-[#11345b]'} opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0`}>
                      <span>了解更多</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Partner Marquee */}
        <section className="py-24 border-t border-gray-100 relative bg-white">
          <div className="max-w-7xl mx-auto px-4 text-center mb-12">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-[0.5em] mb-4">Strategic Partners</div>
          </div>
          <div className="flex overflow-hidden relative">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex gap-20 items-center whitespace-nowrap px-10"
            >
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-[#fdbd00] rounded-sm"></div>
                  </div>
                  <span className="text-xl font-black text-[#11345b] tracking-tighter">PARTNER LOGO</span>
                </div>
              ))}
            </motion.div>
            {/* Duplicated for seamless loop */}
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex gap-20 items-center whitespace-nowrap px-10"
            >
              {[...Array(10)].map((_, i) => (
                <div key={i+10} className="flex items-center gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-[#fdbd00] rounded-sm"></div>
                  </div>
                  <span className="text-xl font-black text-[#11345b] tracking-tighter">PARTNER LOGO</span>
                </div>
              ))}
            </motion.div>
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-20"></div>
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-20"></div>
          </div>
        </section>

        {/* 7. Bottom CTA */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 relative bg-white">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-12 md:p-24 rounded-[60px] bg-gray-50 border border-gray-100 relative overflow-hidden shadow-xl"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#fdbd00]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
              <h2 className="text-4xl lg:text-7xl text-[#11345b] font-bold mb-10 tracking-tighter">期待与您共同<br /><span className="text-[#fdbd00]">筑就安全未来</span></h2>
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <Link href="/contact">
                  <button className="px-10 py-5 bg-[#11345b] text-white font-bold rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-blue-900/20">立即联系我们</button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
