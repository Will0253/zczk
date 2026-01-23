export default function NewsLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#11345b]/20 rounded-full"></div>
          <div className="w-16 h-16 border-4 border-[#fdbd00] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="text-[#11345b] font-medium text-sm tracking-wider">正在加载资讯...</p>
      </div>
    </div>
  )
}
