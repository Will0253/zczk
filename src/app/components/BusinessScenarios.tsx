import { Truck, HardHat, Mountain, Building2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const scenarios = [
  {
    icon: Truck,
    title: '高速公路安全管控',
    description: '隧道/桥梁预警、施工防闯入、事故快速处置、跨区域监管',
    image: 'https://images.unsplash.com/photo-1765121689955-a868472089d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdod2F5JTIwY29uc3RydWN0aW9uJTIwc2FmZXR5fGVufDF8fHx8MTc2NjI1NTIwMHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: HardHat,
    title: '道路养护作业安全',
    description: '人员防护、动态监控、来车声光预警、远程一体化管控',
    image: 'https://images.unsplash.com/photo-1757030689668-c7aa2975ca95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FkJTIwbWFpbnRlbmFuY2UlMjB3b3JrZXJzfGVufDF8fHx8MTc2NjI1NTIwMHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: Mountain,
    title: '景区交通分流预警',
    description: '停车场状态上报、路口分流、对接百度/高德导航',
    image: 'https://images.unsplash.com/photo-1766060735908-eb10ee2a7cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2VuaWMlMjBhcmVhJTIwdHJhZmZpY3xlbnwxfHx8fDE3NjYyNTUyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: Building2,
    title: '城市交通风险防控',
    description: '人员防护、动态监控、来车声光预警、远程一体化管控',
    image: 'https://images.unsplash.com/photo-1764777447190-f9fa6a009df3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwdHJhZmZpYyUyMG1vbml0b3Jpbmd8ZW58MXx8fHwxNzY2MjU1MjYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function BusinessScenarios() {
  return (
    <section id="solutions" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-20 w-32 h-32 border-2 border-[#fdbd00]/20 rounded-lg rotate-12"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 border-2 border-[#11345b]/20 rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-[#11345b] font-bold tracking-tight">
            核心业务场景
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#fdbd00] to-[#ffd700] mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            覆盖高速公路、道路养护、景区分流、城市交通等多场景解决方案
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {scenarios.map((scenario, index) => {
            const Icon = scenario.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 relative"
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#fdbd00]/20 via-transparent to-[#11345b]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={scenario.image}
                    alt={scenario.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-500"></div>
                  
                  {/* Icon with glow effect */}
                  <div className="absolute bottom-4 left-4 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-8 h-8 text-[#fdbd00] drop-shadow-lg" />
                  </div>
                </div>
                
                <div className="p-6 relative z-10">
                  <h3 className="text-xl mb-3 text-[#11345b] font-bold group-hover:text-[#fdbd00] transition-colors duration-300">
                    {scenario.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{scenario.description}</p>
                  
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#fdbd00]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}