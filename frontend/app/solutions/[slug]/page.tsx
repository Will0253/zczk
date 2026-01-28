import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { HighwaySolutionDetail } from '@/components/sections/HighwaySolutionDetail'
import { getSolutionBySlug, getAllSolutionSlugs } from '@/content/solutions'
import { siteConfig } from '@/content/site-config'

interface SolutionPageProps {
  params: Promise<{
    slug: string
  }>
}

// 生成静态路由参数
export async function generateStaticParams() {
  const slugs = getAllSolutionSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

// 生成动态元数据
export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params
  const solution = getSolutionBySlug(slug)
  
  if (!solution) {
    return {
      title: `解决方案未找到 | ${siteConfig.name}`,
    }
  }

  return {
    title: `${solution.title} | ${siteConfig.name}`,
    description: solution.description,
    openGraph: {
      title: `${solution.title} | ${siteConfig.name}`,
      description: solution.description,
      images: solution.image ? [{ url: solution.image }] : [],
      type: 'article',
    },
  }
}

export default async function SolutionDetailPage({ params }: SolutionPageProps) {
  const { slug } = await params
  const solution = getSolutionBySlug(slug)

  if (!solution) {
    notFound()
  }

  // 目前只有 highway-safety 有专门的详情页组件
  // 其他解决方案使用通用模板
  if (slug === 'highway-safety') {
    return <HighwaySolutionDetail />
  }

  // 通用解决方案详情页模板
  return <GenericSolutionDetail solution={solution} />
}

// 通用解决方案详情页组件
function GenericSolutionDetail({ solution }: { solution: NonNullable<ReturnType<typeof getSolutionBySlug>> }) {
  return (
    <div className="bg-white min-h-screen selection:bg-[#fdbd00] selection:text-[#11345b]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-[#11345b] overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#fdbd00]/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-white/60 text-sm mb-8">
            <Link href="/" className="hover:text-[#fdbd00] transition-colors">首页</Link>
            <span className="text-white/30">›</span>
            <Link href="/solutions" className="hover:text-[#fdbd00] transition-colors">解决方案</Link>
            <span className="text-white/30">›</span>
            <span className="text-[#fdbd00]">{solution.shortTitle}</span>
          </nav>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            {solution.title.split('解决方案')[0]}
            <br />
            <span className="text-[#fdbd00]">解决方案</span>
          </h1>
          
          <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
            {solution.description}
          </p>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 text-[#fdbd00] font-black mb-6 tracking-[0.2em] uppercase text-sm">
                <span className="w-12 h-px bg-[#fdbd00]" />
                主要痛点
              </div>
              <div className="space-y-4">
                {solution.painPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                      <span className="w-2 h-2 bg-red-500 rounded-full" />
                    </div>
                    <p className="text-gray-600">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-3 text-[#fdbd00] font-black mb-6 tracking-[0.2em] uppercase text-sm">
                <span className="w-12 h-px bg-[#fdbd00]" />
                方案价值
              </div>
              <div className="space-y-4">
                {solution.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                    </div>
                    <p className="text-gray-600">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-[#11345b] rounded-[60px] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ 
              backgroundImage: 'radial-gradient(circle at 2px 2px, #fdbd00 1px, transparent 0)', 
              backgroundSize: '40px 40px' 
            }} />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                需要了解更多？
              </h2>
              <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
                我们的专家团队随时为您提供详细的解决方案咨询和现场演示。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/contact" className="px-10 py-5 bg-[#fdbd00] text-[#11345b] font-black rounded-[32px] shadow-2xl hover:scale-105 transition-all">
                  预约专家咨询
                </Link>
                <Link href="/solutions" className="px-10 py-5 bg-white/10 text-white font-black rounded-[32px] border border-white/20 hover:bg-white/20 transition-all">
                  返回解决方案
                </Link>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-[#fdbd00]/10 rounded-full blur-[120px]" />
          </div>
        </div>
      </section>
    </div>
  )
}
