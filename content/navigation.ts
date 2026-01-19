import type { NavItem } from '@/types/navigation'

export const mainNavigation: NavItem[] = [
  { label: '首页', href: '/' },
  { label: '关于我们', href: '/about' },
  { label: '产品中心', href: '/products' },
  { label: '解决方案', href: '/solutions' },
  { label: '资讯中心', href: '/news' },
  { label: '联系我们', href: '/contact' },
]

export const footerNavigation = {
  quickLinks: [
    { label: '首页', href: '/' },
    { label: '关于我们', href: '/about' },
    { label: '产品中心', href: '/products' },
    { label: '解决方案', href: '/solutions' },
    { label: '资讯中心', href: '/news' },
    { label: '联系我们', href: '/contact' },
  ],
  business: [
    { label: '智能预警设备', href: '/products' },
    { label: '智慧交通安全解决方案', href: '/solutions' },
    { label: '高速养护监管平台', href: '/solutions/highway-safety' },
  ],
  legal: [
    { label: '隐私政策', href: '/privacy' },
    { label: '服务条款', href: '/terms' },
    { label: '网站地图', href: '/sitemap' },
  ],
}

export const socialLinks = [
  { icon: 'Wechat', label: '微信', href: 'https://mp.weixin.qq.com/s/6Fg4xtlouoBLiViYjYaaTg' },
  { icon: 'QQ', label: 'QQ', href: '#' },
  { icon: 'Douyin', label: '抖音', href: 'https://v.douyin.com/eGhmbVGqRz4/' },
]
