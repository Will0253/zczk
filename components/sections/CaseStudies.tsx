'use client'

import { CheckCircle } from 'lucide-react'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'

const cases = [
  {
    title: '山西交控集团',
    description: '高速养护施工动态监管，实现施工区域防闯入与智能预警',
    image: '/images/case-studies/highway-safety.jpg',
    tag: 'G1812 槐榆高速养护监管',
  },
  {
    title: '广河高速',
    description: '预警路锥与预警精灵联动，打造施工区域多设备协同预警体系',
    image: '/images/case-studies/road-maintenance.jpg',
    tag: '多设备协同预警',
  },
  {
    title: '广东地区行人摩托车防闯入项目',
    description: '部署智能安全预警系统，解决高速非法闯入治理痛点',
    image: '/images/case-studies/toll-station.jpg',
    tag: '收费站智能预警',
  },
]

const cooperationModes = [
  '联合开发：与防撞车制造商联合开发智能预警系统',
  '方案定制：为交通管理部门提供"感知-响应-处置"闭环解决方案',
  '设备供应：为养护企业提供模块化智能设备集群',
]

export function CaseStudies() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative geometric shapes */}
      <div className="absolute top-20 left-10 w-40 h-40 border-2 border-[#fdbd00]/10 rounded-full"></div>
      <div className="absolute bottom-10 right-20 w-32 h-32 border-2 border-[#11345b]/10 rounded-lg rotate-45"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-[#11345b] font-bold tracking-tight">
            标杆案例 · 实力见证
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#fdbd00] to-[#ffd700] mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            服务全国高速公路、交通管理部门，护航万千道路安全
          </p>
        </div>

        {/* Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {cases.map((caseItem, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 relative"
            >
              {/* Animated border */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#fdbd00]/20 via-transparent to-[#11345b]/20 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={caseItem.image}
                  alt={caseItem.title}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Tag with glow */}
                <div className="absolute top-6 left-6">
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#fdbd00] to-[#ffd700] text-[#11345b] rounded-lg text-sm font-bold shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    {caseItem.tag}
                  </span>
                </div>
              </div>
              
              <div className="p-8 relative">
                <h3 className="text-xl mb-4 text-[#11345b] font-bold group-hover:text-[#fdbd00] transition-colors duration-300">
                  {caseItem.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{caseItem.description}</p>
                
                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#fdbd00] to-[#11345b] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Cooperation Modes */}
        <div className="relative bg-white rounded-2xl p-10 shadow-xl border border-gray-100 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#fdbd00]/5 to-[#11345b]/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl mb-8 text-[#11345b] font-bold text-center">合作模式</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cooperationModes.map((mode, index) => (
                <div key={index} className="group flex items-start gap-4 p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white hover:from-[#fdbd00]/10 hover:to-[#11345b]/10 transition-all duration-500 border border-gray-100 hover:border-[#fdbd00]/30 hover:-translate-y-1">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-[#11345b]/20 blur-lg rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                    <CheckCircle className="w-8 h-8 text-[#11345b] relative z-10 transform group-hover:rotate-12 transition-transform duration-500" />
                  </div>
                  <p className="text-gray-700 leading-relaxed font-medium">{mode}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
