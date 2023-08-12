export const projects: Project[] = [
  {
    title: '刻晴的小站',
    description: '基于Docusaurus v2 静态网站生成器实现个人博客',
    preview: '/img/project/blog.jpg',
    website: 'https://keqingblog.netlify.app',
    source: 'https://github.com/keqing77/blog',
    tags: ['opensource', 'design', 'favorite'],
    type: 'web',
  },
  {
    title: 'kz-admin',
    description: '基于NestJs + TypeScript + TypeORM + Redis + MySql + Vben Admin编写的一款前后端分离的权限管理系统',
    preview: '/img/project/kz-admin.png',
    website: 'https://admin.kuizuo.cn',
    source: 'https://github.com/keqing77/kz-admin',
    tags: ['opensource', 'favorite', 'product', 'large'],
    type: 'web',
  },
  {
    title: 'one-last-image',
    description: '卢浮宫生成器',
    preview: '/img/project/one-last-image.jpg',
    website: 'https://lab.magiconch.com/one-last-image/',
    source: 'https://github.com/itorr/one-last-image',
    tags: ['opensource', 'favorite', 'product', 'large'],
    type: 'web',
  },
  {
    title: 'link-admin',
    description: '基于 kz-admin 编写的一次性充值链接销售系统',
    preview: '/img/project/link-admin.png',
    website: 'http://link.kuizuo.cn',
    tags: ['product', 'large'],
    type: 'other',
  },
  {
    title: 'ocr-admin',
    description: '基于 ddddocr 与 kz-admin 搭建的图像识别后台系统',
    preview: '/img/project/ocr-admin.png',
    website: 'http://ocr.kuizuo.cn',
    tags: ['product', 'large'],
    type: 'other',
  },
  {
    title: 'browser-rpc',
    description: 'WebSocket远程调用浏览器函数',
    website: 'https://github.com/keqing77/rpc-browser',
    tags: ['opensource'],
    type: 'personal'
  },
]

export type Tag = {
  label: string;
  description: string;
  color: string;
};

export type TagType =
  | 'favorite'
  | 'opensource'
  | 'product'
  | 'design'
  | 'large'
  | 'personal';

export type ProjectType =
  | 'personal'
  | 'web'
  | 'app'
  | 'toy'
  | 'other';

export type Project = {
  title: string;
  description: string;
  preview?: any;
  website: string;
  source?: string | null;
  tags: TagType[];
  type: ProjectType
};

export const Tags: Record<TagType, Tag> = {
  favorite: {
    label: '喜爱',
    description: '我最喜欢的网站，一定要去看看!',
    color: '#e9669e',
  },
  opensource: {
    label: '开源',
    description: '开源项目可以提供灵感!',
    color: '#39ca30',
  },
  product: {
    label: '产品',
    description: '与产品相关的项目!',
    color: '#dfd545',
  },
  design: {
    label: '设计',
    description: '设计漂亮的网站!',
    color: '#a44fb7',
  },
  large: {
    label: '大型',
    description: '大型项目，原多于平均数的页面',
    color: '#8c2f00',
  },
  personal: {
    label: '个人',
    description: '个人项目',
    color: '#12affa',
  },
};

export const TagList = Object.keys(Tags) as TagType[];

export const groupByProjects = projects.reduce((group, project) => {
  const { type } = project;
  group[type] = group[type] ?? [];
  group[type].push(project);
  return group;
},
  {} as Record<ProjectType, Project[]>
)

