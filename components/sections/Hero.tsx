'use client'

import { Zap, Shield, Activity, ArrowRight, ChevronRight } from 'lucide-react'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import { motion } from 'motion/react'
import Link from 'next/link'

export function Hero() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a1f3d]">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1699602050604-698045645108?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwaW5mcmFzdHJ1Y3R1cmUlMjBzbWFydCUyMGNpdHl8ZW58MXx8fHwxNzY2MzAyMzgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Technology Background"
          className="w-full h-full object-cover opacity-30"
          fill
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f3d]/80 via-transparent to-[#0a1f3d]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 relative z-10 py-20 lg:py-28">
        <motion.div 
          className="max-w-4xl"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Tagline Badge */}
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#11345b]/40 backdrop-blur-md rounded-full mb-8 border border-[#fdbd00]/20 shadow-[0_0_15px_rgba(253,189,0,0.1)] group cursor-default hover:border-[#fdbd00]/40 transition-colors"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fdbd00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#fdbd00]"></span>
            </span>
            <span className="text-gray-200 text-sm font-medium tracking-wide">智能交通安全预警领航者</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#fdbd00]/70 group-hover:translate-x-0.5 transition-transform" />
          </motion.div>
          
          {/* Main Title */}
          <motion.div variants={fadeInUp} className="mb-8">
            <h1 className="text-white leading-[1.1] tracking-tight font-bold">
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400">
                依托核心技术
              </span>
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-2">
                推动交通预警
              </span>
              <span className="block mt-3">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fdbd00] via-[#ffd700] to-[#fdbd00] bg-[length:200%_auto] animate-gradient text-5xl sm:text-6xl md:text-7xl lg:text-8xl filter drop-shadow-[0_0_20px_rgba(253,189,0,0.3)]">
                  智能化·主动化
                </span>
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl ml-4 text-white/90">
                   升级
                </span>
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl lg:text-2xl text-gray-300/80 mb-12 leading-relaxed tracking-wide max-w-2xl border-l-4 border-[#fdbd00]/50 pl-6"
          >
            融合雷达感知与AI识别技术，打造全天候、全方位的智能交通安全闭环系统。
          </motion.p>

          {/* Feature Tags */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-14">
            {[
              { icon: Zap, text: '毫秒级预警响应' },
              { icon: Activity, text: '99.9% 识别准确率' },
              { icon: Shield, text: '全天候稳定运行' }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-[#fdbd00]/50 hover:bg-[#11345b]/50 transition-all duration-300"
              >
                <feature.icon className="w-5 h-5 text-[#fdbd00] group-hover:drop-shadow-[0_0_8px_rgba(253,189,0,0.8)] transition-all" />
                <span className="text-gray-200 text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5">
            <Link href="/products" className="group relative px-8 py-4 bg-[#fdbd00] text-[#11345b] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(253,189,0,0.4)] hover:-translate-y-1">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out skew-y-12"></div>
              <span className="relative z-10 font-bold text-lg flex items-center justify-center gap-2">
                探索产品中心
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="/contact" className="group relative px-8 py-4 bg-transparent border border-white/20 text-white rounded-lg overflow-hidden transition-all duration-300 hover:border-[#fdbd00]/50 hover:bg-white/5 hover:-translate-y-1">
              <span className="relative z-10 font-bold text-lg flex items-center justify-center gap-2">
                立即咨询合作
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-[#fdbd00]" />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#fdbd00] to-transparent opacity-50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[#fdbd00] animate-fall"></div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
