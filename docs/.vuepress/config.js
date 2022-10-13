module.exports = {
  base: '/daydayup/',
  title: 'fnix-lu 的天天向上',
  description: `fnix-lu's notes and documents`,
  port: 9090,
  themeConfig: {
    logo: '/hero.jpg',
    nav: [
      { text: '首页', link: '/' },
      { text: 'GitHub', link: 'https://github.com/fnix-lu/daydayup' },
    ],
    sidebarDepth: 2,
    sidebar: [
      {
        title: '学习笔记',
        collapsable: false,
        children: [
          '/git/',
          '/cross-origin/',
          '/vue3/',
          '/redux/',
          '/typescript/',
        ],
      },
      {
        title: '代码示例',
        collapsable: false,
        children: ['/css/', '/upload/', '/at-input/'],
      },
    ],
    lastUpdated: '最近更新',
  },
}
