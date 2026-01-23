'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function NewsDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('资讯详情错误:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      <div className="text-center max-w-md">
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
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold text-[#11345b] mb-4">资讯详情加载失败</h2>
        <p className="text-gray-500 mb-8">暂时无法获取资讯内容，请稍后重试。</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-8 py-4 bg-[#11345b] text-white rounded-xl font-bold hover:bg-[#fdbd00] hover:text-[#11345b] transition-all duration-300 shadow-lg shadow-[#11345b]/20"
          >
            重试
          </button>
          <Link
            href="/news"
            className="px-8 py-4 border-2 border-[#11345b] text-[#11345b] rounded-xl font-bold hover:bg-[#11345b] hover:text-white transition-all duration-300"
          >
            返回资讯列表
          </Link>
        </div>
      </div>
    </div>
  )
}
