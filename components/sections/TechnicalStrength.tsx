'use client'

import { Cpu, FileText, Network, ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'

const advantages = [
  {
    icon: Cpu,
    title: '核心技术',
    description: '高声压定向传播、24G 毫米波雷达、AI 边缘计算、北斗+GPS 双模定位',
    color: 'text-[#fdbd00]',
    glow: 'shadow-[0_0_20px_rgba(253,189,0,0.3)]',
  },
  {
    icon: FileText,
    title: '专利布局',
    description: '外观专利+实用性专利，一体化智能设备设计',
    color: 'text-white',
    glow: 'shadow-[0_0_20px_rgba(255,255,255,0.2)]',
  },
  {
    icon: Network,
    title: '协议兼容',
    description: '支持 JT808、GB28181 等行业标准，对接百度/高德导航',
    color: 'text-[#fdbd00]',
    glow: 'shadow-[0_0_20px_rgba(253,189,0,0.3)]',
  },
  {
    icon: ShieldCheck,
    title: '防护标准',
    description: 'IP55/IP56/IP65 防护，适应-40℃~80℃恶劣环境',
    color: 'text-white',
    glow: 'shadow-[0_0_20px_rgba(255,255,255,0.2)]',
  },
]

export function TechnicalStrength() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0, 0, 0.2, 1] as const
      }
    })
  }

  return (
    <section className="py-24 relative overflow-hidden bg-[#0a1f3d]">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f3d] via-[#11345b] to-[#0a1f3d]"></div>
        
        {/* Animated orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#fdbd00]/10 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-[#11345b] rounded-full blur-[150px]"
        />
        
        {/* Optimized Hexagonal pattern overlay */}
        <div className="absolute inset-0 opacity-[0.08] mix-blend-screen"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23fdbd00' stroke-width='0.5'/%3E%3Ccircle cx='30' cy='30' r='1.5' fill='%23fdbd00'/%3E%3C/svg%3E")`,
               backgroundSize: '60px 60px',
               maskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 80%)',
               WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 80%)'
             }}>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-white font-bold tracking-tight">
            技术实力与优势
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#fdbd00] to-[#ffd700] mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            核心专利技术护航，打造行业领先的智能预警生态系统
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon
            return (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative bg-[rgba(255,255,255,0.05)] backdrop-blur-xl rounded-2xl p-8 border border-[rgba(255,255,255,0.1)] hover:border-[rgba(253,189,0,0.4)] transition-all duration-500 overflow-hidden"
              >
                {/* Internal Glow Effect */}
                <div className="absolute -inset-24 bg-[rgba(253,189,0,0.05)] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Icon container with enhanced visibility */}
                <div className="relative mb-8 inline-block">
                  <div className={`absolute inset-0 bg-current opacity-20 blur-2xl rounded-full scale-150 group-hover:scale-175 transition-transform duration-500 ${advantage.color}`}></div>
                  <div className={`relative z-10 p-4 rounded-2xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] ${advantage.glow} group-hover:border-[rgba(253,189,0,0.3)] transition-colors duration-500`}>
                    <Icon className={`w-10 h-10 ${advantage.color} transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`} />
                  </div>
                </div>
                
                <h3 className="text-xl mb-4 text-white font-bold tracking-wide relative z-10 group-hover:text-[#fdbd00] transition-colors">{advantage.title}</h3>
                <p className="text-gray-300 leading-relaxed relative z-10 text-sm">{advantage.description}</p>
                
                {/* Tech Line Decor */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#fdbd00]/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            )
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-[rgba(255,255,255,0.05)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] rounded-2xl p-8 text-center overflow-hidden hover:border-[rgba(253,189,0,0.3)] transition-all duration-500 group"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fdbd00]/10 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
          
          <h3 className="text-2xl mb-3 text-white font-bold relative z-10">资质认证</h3>
          <p className="text-gray-200 text-lg relative z-10 leading-relaxed">
            全系列产品符合《公路养护安全作业规程》《道路交通标志和标线》等行业标准
          </p>
          
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-12 h-12 border-2 border-[#fdbd00]/30 rounded-lg rotate-12"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-[#fdbd00]/30 rounded-full"></div>
        </motion.div>
      </div>
    </section>
  )
}
