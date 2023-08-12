export const Friends: Friend[] = [
  {
    title: '峰华前端工程师',
    description: '致力于帮助你以最直观、最快速的方式学会前端开发',
    website: 'https://zxuqian.cn',
    avatar: require('./avatar/zxuqian.png'),
  },
  {
    title: '飞鸟',
    description: ' 一只平凡的鸟罢了。',
    website: 'https://lzxjack.top/',
    avatar: require('./avatar/feiniao.jpg')
  },
  {
    title: 'Pincman',
    description: '中年老码农,专注于全栈开发与教学',
    website: 'https://pincman.com/',
    avatar: require('./avatar/pincman.png'),
  },
];

export type Friend = {
  title: string;
  description: string;
  website: string;
  avatar?: any;
};
