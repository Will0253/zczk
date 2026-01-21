import { Headphones } from 'lucide-react'
import Link from 'next/link'

interface ContactCardProps {
  title?: string
  description?: string
  buttonText?: string
  phone?: string
}

export function ContactCard({ 
  title = '需要定制解决方案？',
  description = '我们的工程师随时准备为您提供专业的技术咨询与方案设计。',
  buttonText = '联系技术支持',
  phone = '18823780560'
}: ContactCardProps) {
  return (
    <div className="bg-[#11345b] p-12 rounded-[50px] text-white relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
      <div className="relative z-10 text-center">
        <div className="w-16 h-16 bg-[#fdbd00] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#fdbd00]/20 group-hover:scale-110 transition-transform">
          <Headphones className="w-8 h-8 text-[#11345b]" />
        </div>
        <h4 className="text-2xl font-bold mb-4">{title}</h4>
        <p className="text-gray-400 text-sm mb-10 leading-relaxed">{description}</p>
        <div className="space-y-4">
          <Link href="/contact" className="w-full py-5 bg-[#fdbd00] text-[#11345b] font-black rounded-2xl hover:bg-[#ffd700] transition-all shadow-xl shadow-[#fdbd00]/10 block text-center">
            {buttonText}
          </Link>
          <div className="text-sm">
            <span className="text-gray-500">或拨打: </span>
            <a href={`tel:${phone}`} className="text-white font-bold hover:text-[#fdbd00]">{phone}</a>
          </div>
        </div>
      </div>
    </div>
  )
}
