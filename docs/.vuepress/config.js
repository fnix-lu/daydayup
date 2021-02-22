module.exports = {
  base: '/daydayup/',
  title: 'fnix-lu 的笔记文档',
  description: `fnix-lu's notes and documents`,
  port: 9090,
  themeConfig: {
    logo: '/hero.jpg',
    nav: [
      { text: '首页', link: '/' },
      { text: 'Github', link: 'https://github.com/fnix-lu/daydayup' }
    ],
    sidebarDepth: 2,
    sidebar: [
      '/git/'
    ]
  }
}
