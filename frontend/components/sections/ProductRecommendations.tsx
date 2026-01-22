import { Zap } from 'lucide-react'

interface RecommendationItem {
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
}

interface ProductRecommendationsProps {
  recommendations: RecommendationItem[]
}

export function ProductRecommendations({ recommendations }: ProductRecommendationsProps) {
  return (
    <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
      <h4 className="text-xl font-bold text-[#11345b] mb-8 pb-4 border-b border-gray-50 flex items-center gap-3">
        <Zap className="w-5 h-5 text-[#fdbd00]" />
        配套推荐
      </h4>
      <div className="space-y-8">
        {recommendations.map((item, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="flex gap-5">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex-shrink-0 flex items-center justify-center group-hover:bg-[#fdbd00]/10 transition-colors">
                <item.icon className="w-6 h-6 text-[#11345b]" />
              </div>
              <div>
                <h5 className="font-bold text-[#11345b] mb-1 group-hover:text-[#fdbd00] transition-colors">{item.title}</h5>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
