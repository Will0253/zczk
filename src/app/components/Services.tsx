import { Headphones, Code2, Wrench, GraduationCap } from 'lucide-react';

const services = [
  {
    icon: Headphones,
    title: '技术咨询',
    description: '24 小时服务热线，专业团队答疑解惑',
    color: 'text-[#11345b]',
  },
  {
    icon: Code2,
    title: '定制开发',
    description: '私有协议对接、功能模块扩展，适配个性化需求',
    color: 'text-[#fdbd00]',
  },
  {
    icon: Wrench,
    title: '售后维护',
    description: '整机保修 1 年，电池保修半年，快速响应故障',
    color: 'text-[#11345b]',
  },
  {
    icon: GraduationCap,
    title: '培训支持',
    description: '提供设备操作、平台管理专项培训',
    color: 'text-[#fdbd00]',
  },
];

export function Services() {
  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Tech grid background */}
      <div className="absolute inset-0 opacity-5"
           style={{
             backgroundImage: `
               linear-gradient(rgba(253, 189, 0, 0.5) 1px, transparent 1px),
               linear-gradient(90deg, rgba(17, 52, 91, 0.5) 1px, transparent 1px)
             `,
             backgroundSize: '40px 40px'
           }}>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-[#11345b] font-bold tracking-tight">
            企业服务与保障
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#fdbd00] to-[#ffd700] mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            全方位技术支持，打造省心无忧的智能预警解决方案
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative text-center p-8 rounded-2xl border-2 border-gray-200 bg-white hover:border-[#fdbd00] transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#fdbd00]/0 via-[#fdbd00]/0 to-[#11345b]/0 group-hover:from-[#fdbd00]/10 group-hover:via-[#ffd700]/5 group-hover:to-[#11345b]/10 transition-all duration-700"></div>
                
                {/* Icon with glow */}
                <div className="relative mb-6 inline-block">
                  <div className={`absolute inset-0 ${service.color === 'text-[#11345b]' ? 'bg-[#11345b]' : 'bg-[#fdbd00]'}/20 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-500`}></div>
                  <Icon className={`w-14 h-14 ${service.color} mx-auto relative z-10 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500`} />
                </div>
                
                <h3 className="text-xl mb-4 text-[#11345b] font-bold relative z-10 group-hover:text-[#fdbd00] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed relative z-10">{service.description}</p>
                
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#fdbd00]/0 group-hover:border-[#fdbd00]/30 rounded-tl-2xl transition-all duration-500"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#11345b]/0 group-hover:border-[#11345b]/30 rounded-br-2xl transition-all duration-500"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}