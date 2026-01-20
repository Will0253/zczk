'use client'

import { Phone, Mail, Clock, MapPin, Bus, Car, Download, ShieldCheck, Zap, UserCheck, Settings, ArrowRight, MessageSquare, Globe, Headphones } from 'lucide-react'
import { motion } from 'motion/react'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'

const contactCategories = [
  {
    title: '商务合作',
    description: '针对大型交通项目的定制化解决方案咨询，以及区域代理商加盟洽谈。',
    icon: Globe,
    details: [
      { type: 'phone', label: '电话', value: '+86 400-123-4567', href: 'tel:+864001234567' },
      { type: 'time', label: '工作时间', value: '周一至周五 9:00 - 18:00' }
    ],
    image: '/images/contact/contact-1.jpg'
  },
  {
    title: '技术支持',
    description: '产品安装指导、系统故障排查及售后维保服务，提供7x24小时紧急响应。',
    icon: Headphones,
    details: [
      { type: 'phone', label: '电话', value: '+86 400-888-9999', href: 'tel:+864008889999' },
      { type: 'mail', label: '邮箱', value: 'support@zcz-tech.com', href: 'mailto:support@zcz-tech.com' }
    ],
    image: '/images/contact/contact-2.jpg'
  },
  {
    title: '综合事务',
    description: '媒体采访、品牌活动联络，以及人才招聘简历投递通道。',
    icon: MessageSquare,
    details: [
      { type: 'mail', label: '邮箱', value: 'contact@zcz-tech.com', href: 'mailto:contact@zcz-tech.com' },
      { type: 'department', label: '部门', value: '总部行政中心' }
    ],
    image: '/images/contact/contact-3.jpg'
  }
]

const serviceAdvantages = [
  { icon: Zap, title: '30分钟响应', desc: '快速受理客户需求' },
  { icon: UserCheck, title: '专家驻场', desc: '核心项目专人跟进' },
  { icon: Settings, title: '终身维护', desc: '持续的系统升级服务' },
  { icon: ShieldCheck, title: '原厂质保', desc: '100%正品备件保障' }
]

export function Contact() {
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
              <span className="text-[#fdbd00] text-xs font-black tracking-widest uppercase">Contact & Collaboration</span>
            </div>
            <h1 className="text-5xl lg:text-7xl text-white font-bold mb-8 tracking-tighter">
              联系我们
            </h1>
            <p className="text-lg lg:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              无论您是有业务需求、技术疑问，还是寻求合作机会，中创智控团队随时准备为您提供专业的解答与支持。
            </p>
          </motion.div>
        </div>

        {/* Dynamic Background Element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fdbd00]/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      </section>

      {/* 🗂 Contact Categories */}
      <section className="max-w-7xl mx-auto px-4 -mt-20 relative z-20 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactCategories.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white rounded-[50px] overflow-hidden border border-gray-100 shadow-xl shadow-[#11345b]/5 hover:shadow-2xl transition-all duration-500"
            >
              <div className="h-48 relative overflow-hidden">
                <ImageWithFallback 
                  src={item.image} 
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                <div className="absolute top-6 left-6 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                  <item.icon className="w-7 h-7 text-[#11345b]" />
                </div>
              </div>
              <div className="p-10 pt-4">
                <h3 className="text-2xl font-bold text-[#11345b] mb-4">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 h-12">
                  {item.description}
                </p>
                <div className="space-y-5">
                  {item.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-[#fdbd00]/10 transition-colors">
                        {detail.type === 'phone' && <Phone className="w-4 h-4 text-[#11345b]" />}
                        {detail.type === 'mail' && <Mail className="w-4 h-4 text-[#11345b]" />}
                        {detail.type === 'time' && <Clock className="w-4 h-4 text-[#11345b]" />}
                        {detail.type === 'department' && <UserCheck className="w-4 h-4 text-[#11345b]" />}
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{detail.label}</p>
                        {detail.href ? (
                          <a href={detail.href} className="text-[#11345b] font-bold hover:text-[#fdbd00] transition-colors">
                            {detail.value}
                          </a>
                        ) : (
                          <p className="text-[#11345b] font-bold">{detail.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🗺 HQ Guide */}
      <section className="bg-white py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 text-sm text-[#fdbd00] font-bold mb-6 tracking-widest uppercase">
                  <span className="w-8 h-[2px] bg-[#fdbd00]" />
                  Headquarters Guide
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-[#11345b] mb-8 tracking-tighter">
                  总部莅临指引
                </h2>
                <p className="text-lg text-gray-500 leading-relaxed mb-12">
                  欢迎莅临中创智控总部考察指导。我们的展厅全天候开放，展示最新的智慧交通预警系统与实战案例。建议您提前预约，我们将安排专人接待。
                </p>

                <div className="space-y-10">
                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-[#11345b] text-[#fdbd00] rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg shadow-[#11345b]/20">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-[#11345b] mb-2">详细地址</h4>
                      <p className="text-gray-500">某某省某某市高新区科技园路B区3号楼</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex gap-6">
                      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex-shrink-0 flex items-center justify-center">
                        <Bus className="w-6 h-6 text-[#11345b]" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-[#11345b] mb-2">公共交通</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">地铁4号线"科技园站"B出口，向东步行500米即到。</p>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex-shrink-0 flex items-center justify-center">
                        <Car className="w-6 h-6 text-[#11345b]" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-[#11345b] mb-2">自驾导航</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">导航搜索"中创智控科技园"，园区内设有访客专用停车位。</p>
                      </div>
                    </div>
                  </div>
                </div>



              </motion.div>
            </div>

            <div className="lg:w-1/2 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10 rounded-[60px] overflow-hidden shadow-2xl"
              >
                <ImageWithFallback 
                  src="/images/contact/contact-hero.jpg"
                  alt="HQ Map"
                  fill
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11345b]/80 via-transparent to-transparent" />
                <div className="absolute bottom-12 left-12 right-12 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[40px] text-white">
                  <p className="text-xs font-black text-[#fdbd00] uppercase tracking-widest mb-2">Working Hours</p>
                  <p className="text-xl font-bold">24/7 展厅开放中</p>
                  <p className="text-sm text-gray-300 mt-2">建议提前24小时通过商务咨询渠道进行参观预约</p>
                </div>
              </motion.div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#fdbd00]/20 rounded-full blur-[80px]" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" />
            </div>
          </div>
        </div>
      </section>

      {/* 🏆 Service Advantages */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceAdvantages.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-5 p-8 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-[#fdbd00]/10 rounded-2xl flex-shrink-0 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-[#11345b]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#11345b] mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
