import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import type { Product } from '@/types/product'

interface ProductMatrixProps {
  products: Product[]
}

const colorPalette = ['from-[#fdbd00] to-[#ffd700]', 'from-[#11345b] to-[#1a4d7a]']

function formatSpecs(product: Product) {
  if (product.shortDescription) return product.shortDescription
  if (product.features?.length) {
    return product.features.slice(0, 2).map((item) => `${item.label}${item.value}`).join(' · ')
  }
  return product.description
}

export function ProductMatrix({ products }: ProductMatrixProps) {
  const visibleProducts = products.slice(0, 6)

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
          {visibleProducts.length === 0 ? (
            <div className="col-span-full text-center py-16 text-gray-500">暂无精选产品</div>
          ) : (
            visibleProducts.map((product, index) => (
              <a
                key={product.slug}
                href={product.taobaoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white overflow-hidden rounded-2xl shadow-xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer block"
              >
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#fdbd00]/20 via-transparent to-[#11345b]/20 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 pointer-events-none"></div>
              
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                {/* Image gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-500`}></div>
                
                {/* Colored accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${colorPalette[index % colorPalette.length]}`}></div>
              </div>
              
              {/* Product Info */}
              <div className="relative p-8">
                <h3 className="text-2xl mb-4 text-[#11345b] font-bold group-hover:text-[#fdbd00] transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">{formatSpecs(product)}</p>
                
                {/* Learn more link */}
                <div className="flex items-center gap-2 text-[#11345b] group-hover:text-[#fdbd00] transition-colors duration-300">
                  <span className="text-sm font-semibold">了解详情</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
                
                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colorPalette[index % colorPalette.length]} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
              </div>
              </a>
            ))
          )}
        </div>

        <div className="text-center">
          <Link 
            href="/products"
            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#11345b] to-[#1a4d7a] text-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#fdbd00] to-[#ffd700] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
            <span className="relative z-10 font-bold text-lg group-hover:text-[#11345b] transition-colors duration-300">查看全部产品</span>
            <ArrowRight className="w-6 h-6 relative z-10 transform group-hover:translate-x-2 transition-transform duration-300 group-hover:text-[#11345b]" />
          </Link>
        </div>
      </div>
    </section>
  )
}
