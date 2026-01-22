import type { Solution, SolutionScenario } from '@/types/solution'

export const scenarios: SolutionScenario[] = [
  { id: 'highway', name: '高速养护施工', icon: 'Shield' },
  { id: 'tunnel', name: '隧道智慧监测', icon: 'Radio' },
  { id: 'bridge', name: '桥梁健康监测', icon: 'Activity' },
  { id: 'scenic', name: '智慧园区/景区', icon: 'Trees' },
  { id: 'emergency', name: '应急指挥调度', icon: 'Siren' },
]

export const solutions: Solution[] = [
  {
    slug: 'highway-safety',
    title: '智慧高速养护施工区防闯入预警系统',
    shortTitle: '高速养护施工',
    description: '针对高速公路占道施工场景，利用毫米波雷达与智能预警锥桶构建防闯入监测网。一旦发现社会车辆有闯入趋势，系统将在毫秒级时间内联动现场声光报警与作业人员穿戴设备，实现"车-路-人"三位一体的主动安全防御。',
    scenario: 'highway',
    image: '/images/solutions/highway-safety.jpg',
    painPoints: [
      '夜间及恶劣天气视线差',
      '驾驶员疲劳驾驶导致闯入',
      '传统锥桶倒伏无法及时发现'
    ],
    benefits: [
      '0.1秒 极速声光联动报警',
      '锥桶状态实时上云可视化',
      '降低作业区事故率40%以上'
    ],
    featured: true,
    order: 1,
  },
  {
    slug: 'tunnel-monitoring',
    title: '隧道施工安全与环境综合监测系统',
    shortTitle: '隧道智慧监测',
    description: '专为隧道及地下工程设计的综合安全管理平台。集成高精度人员定位、有毒有害气体监测、LED引导屏及应急通讯系统，解决封闭空间信号差、监管难的问题，确保施工过程全透明、可追溯。',
    scenario: 'tunnel',
    image: '/images/solutions/tunnel-monitoring.jpg',
    painPoints: [
      '封闭空间信号差',
      '有毒有害气体监测困难',
      '人员位置难以追踪'
    ],
    benefits: [
      '多维环境感知',
      'UWB 人员定位精度10cm',
      '步态与生命体征监测'
    ],
    featured: true,
    order: 2,
  },
  {
    slug: 'bridge-health',
    title: '大型桥梁结构健康监测解决方案',
    shortTitle: '桥梁健康监测',
    description: '运用物联网传感技术，对桥梁全生命周期进行健康体检。通过部署高精度传感器（应力、应变、位移、温湿度等），实时采集结构数据，利用AI算法评估桥梁健康状况，实现从"被动维养"向"预防性养护"的转变。',
    scenario: 'bridge',
    image: '/images/solutions/bridge-health.jpg',
    painPoints: [
      '结构老化难以预测',
      '人工巡检效率低',
      '突发损伤难发现'
    ],
    benefits: [
      '荷载响应监测',
      '环境腐蚀监测',
      '超限实时预警'
    ],
    featured: true,
    order: 3,
  },
  {
    slug: 'smart-scenic',
    title: '智慧景区交通管理',
    shortTitle: '智慧园区/景区',
    description: '解决景区高峰期人车混行难题。利用智能引导屏和流量相机，实时疏导车流，预防拥堵和交通事故。',
    scenario: 'scenic',
    image: '/images/solutions/smart-scenic.jpg',
    painPoints: [
      '高峰期人车混行',
      '停车位难找',
      '拥堵频发'
    ],
    benefits: [
      '实时车流疏导',
      '智能停车引导',
      '预防交通事故'
    ],
    featured: false,
    order: 4,
  },
  {
    slug: 'emergency-dispatch',
    title: '应急指挥调度',
    shortTitle: '应急指挥调度',
    description: '交通事故现场的快速部署系统。便携式雷达和预警屏可在5分钟内完成布设，为救援人员提供安全屏障。',
    scenario: 'emergency',
    image: '/images/solutions/emergency-dispatch.jpg',
    painPoints: [
      '事故现场布设慢',
      '二次事故风险高',
      '救援人员安全难保障'
    ],
    benefits: [
      '5分钟快速布设',
      '360度安全屏障',
      '实时远程监控'
    ],
    featured: false,
    order: 5,
  },
]

// 数据获取函数
export function getAllSolutions(): Solution[] {
  return solutions.sort((a, b) => a.order - b.order)
}

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find(s => s.slug === slug)
}

export function getSolutionsByScenario(scenario: string): Solution[] {
  return solutions.filter(s => s.scenario === scenario).sort((a, b) => a.order - b.order)
}

export function getFeaturedSolutions(): Solution[] {
  return solutions.filter(s => s.featured).sort((a, b) => a.order - b.order)
}

export function getAllSolutionSlugs(): string[] {
  return solutions.map(s => s.slug)
}
