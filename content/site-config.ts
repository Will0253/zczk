// 网站全局配置
export const siteConfig = {
  name: '中创智控',
  fullName: '深圳市中创智控技术有限公司',
  slogan: '智慧交通安全预警领航者',
  description: '智慧交通安全预警设备研发与应用服务商，致力于通过科技创新提升道路交通安全水平，构建车路协同的智慧交通新生态。',
  
  // 联系信息
  contact: {
    phone: '18823780560',
    email: 'contact@zczk.com',
    address: '深圳市龙华区民治街道民治大道与民新路交界处',
  },
  
  // 品牌色彩
  brand: {
    primaryBlue: '#11345b',
    accentGold: '#fdbd00',
  },
  
  // SEO 默认配置
  seo: {
    titleTemplate: '%s | 中创智控',
    defaultTitle: '中创智控 - 智慧交通安全预警领航者',
    defaultDescription: '中创智控是智慧交通安全预警设备研发与应用服务商，提供智能预警锥桶、声光预警系统、车载防撞设备等产品及高速养护、隧道监测等解决方案。',
    defaultKeywords: ['智慧交通', '安全预警', '智能锥桶', '高速养护', '中创智控'],
    siteUrl: 'https://www.zczk.com',
    ogImage: '/images/og-image.svg',
  },
  
  // 社交媒体
  social: {
    wechat: '#',
    linkedin: '#',
    github: '#',
  },
  
  // 版权信息
  copyright: {
    year: new Date().getFullYear(),
    holder: '深圳市中创智控技术有限公司',
    text: '© 2025 深圳市中创智控技术有限公司 版权所有',
  },
}

export type SiteConfig = typeof siteConfig
