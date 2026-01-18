import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Link } from 'react-router-dom';

const products = [
  {
    name: '智能预警路锥',
    specs: '132dB 强声+24G 雷达，200 米预警',
    color: 'from-[#fdbd00] to-[#ffd700]',
    image: 'https://images.unsplash.com/photo-1763569026025-17f15c1012a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFmZmljJTIwc2FmZXR5JTIwY29uZXxlbnwxfHx8fDE3NjYyNTc2ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    name: 'AI 布控球',
    specs: '360°全景+20 倍变焦，12 小时续航',
    color: 'from-[#11345b] to-[#1a4d7a]',
    image: 'https://images.unsplash.com/photo-1692830203762-9b46dd6e4dc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJ2ZWlsbGFuY2UlMjBjYW1lcmElMjBiYWxsfGVufDF8fHx8MTc2NjI1NzY4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    name: '智能声场预警系统',
    specs: '148dB 高声压，500 米覆盖',
    color: 'from-[#fdbd00] to-[#ffd700]',
    image: 'https://images.unsplash.com/photo-1686709709573-a877d7012cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVha2VyJTIwc291bmQlMjBzeXN0ZW18ZW58MXx8fHwxNzY2MjU3NjgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    name: '智能定位肩灯',
    specs: '北斗定位+IP66 防水，5 天待机',
    color: 'from-[#11345b] to-[#1a4d7a]',
    image: 'https://images.unsplash.com/photo-1763235851965-9efe071e8bb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWQlMjBzYWZldHklMjBsaWdodHxlbnwxfHx8fDE3NjYyNTc2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    name: '便携式强声器',
    specs: '138dB 声压，1000 米传声',
    color: 'from-[#fdbd00] to-[#ffd700]',
    image: 'https://images.unsplash.com/photo-1750710583720-8b3bdd0f658a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHRlY2hub2xvZ3klMjBoYXJkd2FyZXxlbnwxfHx8fDE3NjYyNTc2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    name: '车载防撞预警系统',
    specs: '148dB 定向预警，1 公里清晰',
    color: 'from-[#11345b] to-[#1a4d7a]',
    image: 'https://images.unsplash.com/photo-1632080974800-8caa9c8e5337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWhpY2xlJTIwd2FybmluZyUyMGRldmljZXxlbnwxfHx8fDE3NjYyNTc2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function ProductMatrix() {
  return (
    <section id="products" className="py-24 bg-white relative overflow-hidden">
      {/* Tech pattern background */}
      <div className="absolute inset-0 opacity-5" 
           style={{
             backgroundImage: `repeating-linear-gradient(
               45deg,
               transparent,
               transparent 10px,
               #11345b 10px,
               #11345b 11px
             )`
           }}>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-[#11345b] font-bold tracking-tight">
            智能硬件集群
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#11345b] to-[#1a4d7a] mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            集成雷达感知、AI识别、声光预警、智能定位等核心技术
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product, index) => (
            <div
              key={index}
              className="group relative bg-white overflow-hidden rounded-2xl shadow-xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#fdbd00]/20 via-transparent to-[#11345b]/20 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 pointer-events-none"></div>
              
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                {/* Image gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-500`}></div>
                
                {/* Colored accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${product.color}`}></div>
              </div>
              
              {/* Product Info */}
              <div className="relative p-8">
                <h3 className="text-2xl mb-4 text-[#11345b] font-bold group-hover:text-[#fdbd00] transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">{product.specs}</p>
                
                {/* Learn more link */}
                <div className="flex items-center gap-2 text-[#11345b] group-hover:text-[#fdbd00] transition-colors duration-300">
                  <span className="text-sm font-semibold">了解详情</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
                
                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${product.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/products"
            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#11345b] to-[#1a4d7a] text-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#fdbd00] to-[#ffd700] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
            <span className="relative z-10 font-bold text-lg group-hover:text-[#11345b] transition-colors duration-300">查看全部产品</span>
            <ArrowRight className="w-6 h-6 relative z-10 transform group-hover:translate-x-2 transition-transform duration-300 group-hover:text-[#11345b]" />
          </Link>
        </div>
      </div>
    </section>
  );
}