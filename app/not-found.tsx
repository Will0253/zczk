import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      <div className="text-center">
        {/* 404 大数字 */}
        <div className="relative mb-8">
          <h1 className="text-[180px] lg:text-[240px] font-black text-[#11345b]/5 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl lg:text-8xl font-black text-[#11345b]">
              4<span className="text-[#fdbd00]">0</span>4
            </span>
          </div>
        </div>
        
        {/* 提示文字 */}
        <h2 className="text-2xl lg:text-3xl font-bold text-[#11345b] mb-4">
          页面未找到
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          抱歉，您访问的页面不存在或已被移除。请检查网址是否正确，或返回首页继续浏览。
        </p>
        
        {/* 返回首页按钮 */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#11345b] text-white rounded-xl font-bold hover:bg-[#fdbd00] hover:text-[#11345b] transition-all duration-300 shadow-lg shadow-[#11345b]/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          返回首页
        </Link>
      </div>
    </div>
  )
}
