import type { Product, ProductCategory } from '@/types/product'

export const categories: { id: ProductCategory | 'all'; name: string; count: number }[] = [
  { id: 'all', name: '全部产品', count: 10 },
  { id: 'warning', name: '智能预警硬件', count: 5 },
  { id: 'sensing', name: '监测感知设备', count: 3 },
  { id: 'inspection', name: '无人巡检系统', count: 2 },
  { id: 'software', name: '软件与平台', count: 2 },
]

export const products: Product[] = [
  {
    slug: 'smart-sentinel',
    name: '智能声光预警哨兵',
    shortDescription: '含移动岗哨形态',
    description: '一体化移动预警设备，集成雷达测速与声光报警功能，适配道路施工、应急布控场景',
    category: 'warning',
    image: 'https://images.unsplash.com/photo-1673797830131-f91f04593e46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    features: [
      { label: '总功率', value: '100W' },
      { label: '续航', value: '8小时' }
    ],
    featured: true,
    order: 1,
  },
  {
    slug: 'control-ball-v2',
    name: '中创智控二代布控球',
    shortDescription: '',
    description: '应急监控设备，支持快速部署与全向高清监控，适用于应急指挥、临时安防',
    category: 'warning',
    image: 'https://images.unsplash.com/photo-1688584177352-a40d4ba17561?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    features: [
      { label: '快速部署', value: '1分钟' },
      { label: '续航时间', value: '12-20小时' }
    ],
    featured: false,
    order: 2,
  },
  {
    slug: 'smart-cone',
    name: '智能预警锥桶',
    shortDescription: '旗舰版 C100 / 智联版 A2',
    description: '物联网智能交通锥，集成了高精度北斗/GPS双模定位与姿态传感器，实现施工安全闭环管理',
    category: 'warning',
    image: 'https://images.unsplash.com/photo-1719580920868-9e7ee4c79a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    features: [
      { label: 'A1 续航', value: '12小时' },
      { label: 'A2 定位', value: 'RTK 亚米级' }
    ],
    featured: true,
    order: 3,
  },
  {
    slug: 'smart-shoulder-light',
    name: '智能定位肩灯',
    shortDescription: '',
    description: '人员安全管理设备，集成定位、预警与交互功能，适配户外作业、应急救援',
    category: 'sensing',
    image: 'https://images.unsplash.com/photo-1652148555073-4b1d2ecd664c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    features: [
      { label: '净重', value: '88g' },
      { label: '防护等级', value: 'IP66' }
    ],
    featured: false,
    order: 4,
  },
  {
    slug: 'sound-field-warning',
    name: '智能声场预警系统',
    shortDescription: '',
    description: '场景化预警系统，支持远程管控与智能响应，适用于区域安全监管',
    category: 'warning',
    image: 'https://images.unsplash.com/photo-1687858477673-267e301cb186?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    features: [
      { label: '覆盖范围', value: '≥200米' },
      { label: '声压级', value: '132dB' }
    ],
    featured: true,
    order: 5,
  },
  {
    slug: 'vehicle-collision-warning',
    name: '车载防撞预警系统',
    shortDescription: '',
    description: '车辆防撞设备，支持实时喊话与远距离预警，适配特种车辆安全管控',
    category: 'warning',
    image: 'https://images.unsplash.com/photo-1626284142614-d8af54be478c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    features: [
      { label: '峰值声压', value: '148dB' },
      { label: '语声传输', value: '1公里' }
    ],
    featured: false,
    order: 6,
  },
  {
    slug: 'portable-loudspeaker',
    name: '便携式强声器',
    shortDescription: '',
    description: '移动音频预警设备，支持多场景应急音频播放，适用于户外作业预警',
    category: 'sensing',
    image: 'https://images.unsplash.com/photo-1648522168473-dfec1d2a5cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    features: [
      { label: '声压级', value: '138dB' },
      { label: '轻量化', value: '≤5KG' }
    ],
    featured: false,
    order: 7,
  },
  {
    slug: 'smart-helmet-4g',
    name: '中创智控二代4G智能安全帽',
    shortDescription: '',
    description: '智能防护设备，集成摄录、定位与对讲功能，适用于户外作业管理',
    category: 'sensing',
    image: 'https://images.unsplash.com/photo-1701522814779-2d0e40de3370?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    features: [
      { label: '净重', value: '560g' },
      { label: '电池容量', value: '4200mAh' }
    ],
    featured: false,
    order: 8,
  },
  {
    slug: 'radar-speed-detector',
    name: '中创智控交通雷达测速仪',
    shortDescription: '测速反馈屏',
    description: '交通测速设备，支持速度监测与信息反馈，适用于道路限速管控',
    category: 'sensing',
    image: 'https://images.unsplash.com/photo-1620599464094-15206d7a2974?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    features: [
      { label: '测速范围', value: '1-240km/h' },
      { label: '可视距离', value: '1000米' }
    ],
    featured: false,
    order: 9,
  },
  {
    slug: 'event-warning-system',
    name: '事件预警快处置系统',
    shortDescription: '',
    description: '智能应急处置系统，支持事件预警与快速响应，适用于公共安全管理',
    category: 'software',
    image: 'https://images.unsplash.com/photo-1729184648234-7650c1484905?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    features: [
      { label: '响应速度', value: '毫秒级' },
      { label: '处置链路', value: '全闭环' }
    ],
    featured: true,
    order: 10,
  },
]

// 数据获取函数
export function getAllProducts(): Product[] {
  return products.sort((a, b) => a.order - b.order)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter(p => p.category === category).sort((a, b) => a.order - b.order)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured).sort((a, b) => a.order - b.order)
}

export function getAllProductSlugs(): string[] {
  return products.map(p => p.slug)
}
