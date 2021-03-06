module.exports = {
  base: '/daydayup/',
  title: 'fnix-lu 的笔记文档',
  description: `fnix-lu's notes and documents`,
  port: 9090,
  themeConfig: {
    logo: '/hero.jpg',
    nav: [
      { text: '首页', link: '/' },
      { text: 'GitHub', link: 'https://github.com/fnix-lu/daydayup' }
    ],
    sidebarDepth: 2,
    sidebar: [
      {
        title: '文档记录',
        collapsable: false,
        children: [
          '/git/'
        ]
      },
      {
        title: '代码示例',
        collapsable: false,
        children: [
        ]
      }
    ],
    lastUpdated: '最近更新'
  }
}
