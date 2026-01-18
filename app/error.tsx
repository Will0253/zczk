'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 可以在这里记录错误日志
    console.error('页面错误:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      <div className="text-center max-w-md">
        {/* 错误图标 */}
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-red-50 flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#ef4444" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" x2="12" y1="8" y2="12"/>
            <line x1="12" x2="12.01" y1="16" y2="16"/>
          </svg>
        </div>
        
        {/* 提示文字 */}
        <h2 className="text-2xl lg:text-3xl font-bold text-[#11345b] mb-4">
          页面出错了
        </h2>
        <p className="text-gray-500 mb-8">
          抱歉，页面加载时遇到了问题。请尝试刷新页面或稍后再试。
        </p>
        
        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-8 py-4 bg-[#11345b] text-white rounded-xl font-bold hover:bg-[#fdbd00] hover:text-[#11345b] transition-all duration-300 shadow-lg shadow-[#11345b]/20"
          >
            重试
          </button>
          <a 
            href="/"
            className="px-8 py-4 border-2 border-[#11345b] text-[#11345b] rounded-xl font-bold hover:bg-[#11345b] hover:text-white transition-all duration-300"
          >
            返回首页
          </a>
        </div>
      </div>
    </div>
  )
}
