// import resource from 'data/resource';

const path = require('path');
const beian = '闽ICP备2020017848号-2';

const announcementBarContent = `<a href="https://firework.kuizuo.cn" target="_blank">刻晴的前端小站</a> 🎉`;

const resource = [
  {
    label: 'HTML面试题',
    to: '/interview/html',
  },
  {
    label: 'CSS面试题',
    to: '/interview/css',
  },
  {
    label: 'JavaScript面试题',
    to: '/interview/javascript',
  },
  {
    label: 'Javascript手撕代码',
    to: '/interview/javascript-hand',
  },
  {
    label: 'Vue面试题',
    to: '/interview/vue',
  },
  {
    label: 'React面试题',
    to: '/interview/react',
  },
  {
    label: 'Git面试题',
    to: '/interview/git',
  },
  {
    label: '浏览器面试题',
    to: '/interview/browser',
  },
  {
    label: '计网面试题',
    to: '/interview/network',
  },
  {
    label: '大厂面试真题',
    to: '/interview/company',
  },
  {
    label: '各地互联网公司',
    to: '/interview/city',
  },
];

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '刻晴爱前端的小站',
  titleDelimiter: '-',
  url: 'https://keqingblog.netlify.app/',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'keqing',
  projectName: 'blog',
  tagline: '热爱前端的刻晴',
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  themeConfig: {
    // image: 'img/logo.png',
    image: 'img/keqing.webp',
    announcementBar: {
      id: 'announcementBar-3',
      content: announcementBarContent,
    },
    metadata: [
      {
        name: 'keywords',
        content: '刻晴',
      },
      {
        name: 'keywords',
        content: 'blog, javascript, typescript, node, react, vue, web',
      },
      {
        name: 'keywords',
        content: '编程爱好者, Web开发者, 写过爬虫, 学过逆向，现在主攻ts全栈',
      },
    ],
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      title: '刻晴',
      logo: {
        alt: '刻晴',
        src: 'img/logo.webp',
        srcDark: 'img/logo.webp',
      },
      hideOnScroll: true,
      items: [
        {
          label: '笔记',
          position: 'left',
          to: 'docs/skill',
        },
        {
          label: '博客',
          position: 'left',
          items: [
            {
              label: '归档',
              to: 'archive',
            },
            {
              label: '标签',
              to: 'tags',
            },
          ],
        },
        {
          label: '导航',
          position: 'right',
          to: 'website',
        },
        {
          label: '项目',
          position: 'right',
          to: 'project',
        },
        {
          label: '资源',
          position: 'right',
          items: resource,
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: '学习',
          items: [
            {
              label: '标签',
              to: 'tags',
            },
            {
              label: '归档',
              to: 'archive',
            },
            {
              label: '技术笔记',
              to: 'docs/skill',
            },
            {
              label: '实战项目',
              to: 'project',
            },
            {
              label: '前端示例',
              to: 'https://example.kuizuo.cn',
            },
          ],
        },
        {
          title: '社交媒体',
          items: [
            {
              label: '关于我',
              to: '/about',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/keqing77',
            },
            {
              label: '掘金',
              href: 'https://juejin.cn/user/994371074524862',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: '友链',
              position: 'right',
              to: 'friends',
            },
            {
              label: '导航',
              position: 'right',
              to: 'website',
            },
            {
              html: `<a href="https://docusaurus.io/zh-CN/" target="_blank"><img style="height:50px;margin-top:0.5rem" src="/img/buildwith.png" /><a/>`,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Keqing | Powered by Docusaurus `,
      // | <a href="https://beian.miit.gov.cn/">粤ICP备2021040275号</a>
    },
    prism: {
      theme: require('prism-react-renderer/themes/vsLight'),
      darkTheme: require('prism-react-renderer/themes/vsDark'),
      additionalLanguages: ['java', 'php', 'rust', 'toml'],
      defaultLanguage: 'javascript',
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: {start: 'highlight-start', end: 'highlight-end'},
        },
        {
          className: 'code-block-error-line',
          line: 'This will error',
        },
      ],
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    algolia: {
      appId: '1Z2Q7RXH6R',
      apiKey: 'b753cc8e6d0d00d5426c69896a2ce76b',
      indexName: 'keqingnetlify',
    },
    zoom: {
      selector: '.markdown :not(em) > img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)',
      },
      config: {},
    },
    giscus: {
      repo: 'kuizuo/blog',
      repoId: 'MDEwOlJlcG9zaXRvcnkzOTc2MjU2MTI=',
      category: 'General',
      categoryId: 'DIC_kwDOF7NJDM4CPK95',
      mapping: 'title',
      lang: 'zh-CN',
    },
    liveCodeBlock: {
      playgroundPosition: 'top',
    },
    socials: {
      github: 'https://github.com/keqing77',
      twitter: 'https://twitter.com/lalalavard',
      juejin: 'https://juejin.cn/user/994371074524862',
      qq: 'https://wpa.qq.com/msgrd?v=3&amp;uin=1095041759&amp;site=qq',
      zhihu: 'https://www.zhihu.com/people/lai-zi-la-fu-de-lu-de-ma-nong',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          sidebarPath: 'sidebars.js',
        },
        blog: false,
        theme: {
          customCss: [require.resolve('./src/css/custom.scss')],
        },
        sitemap: {
          changefreq: 'daily',
          priority: 0.5,
        },
        gtag: {
          trackingID: 'G-S4SD5NXWXF',
          anonymizeIP: true,
        },
        // debug: true,
      }),
    ],
  ],
  // themes: ['@docusaurus/theme-live-codeblock'],
  plugins: [
    'docusaurus-plugin-image-zoom',
    'docusaurus-plugin-sass',
    path.resolve(__dirname, './src/plugin/plugin-baidu-tongji'),
    path.resolve(__dirname, './src/plugin/plugin-baidu-push'),
    [
      path.resolve(__dirname, './src/plugin/plugin-content-blog'),
      {
        path: 'blog',
        routeBasePath: '/',
        editUrl: ({locale, blogDirPath, blogPath, permalink}) =>
          `https://github.com/keqing77/blog/edit/main/${blogDirPath}/${blogPath}`,
        editLocalizedFiles: false,
        blogSidebarCount: 10,
        postsPerPage: 10,
        showReadingTime: true,
        readingTime: ({content, frontMatter, defaultReadingTime}) =>
          defaultReadingTime({content, options: {wordsPerMinute: 300}}),
        feedOptions: {
          type: 'all',
          title: '刻晴',
          copyright: `Copyright © ${new Date().getFullYear()} 刻晴 Built with Docusaurus.<p><a href="http://beian.miit.gov.cn/" class="footer_lin">${beian}</a></p>`,
        },
      },
    ],
    [
      '@docusaurus/plugin-ideal-image',
      {
        disableInDev: false,
      },
    ],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/logo.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(51 139 255)',
          },
        ],
      },
    ],
  ],
  stylesheets: [],
  i18n: {
    defaultLocale: 'zh',
    locales: ['en', 'zh'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
    },
  },
};

module.exports = config;
