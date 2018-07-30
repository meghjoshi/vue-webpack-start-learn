'use strict'

export default {
  data: () => ({
    sideNav: false,
    menuItems: [
      {title: 'Login', link: '/login'},
      {title: 'News', link: '/categories/news'},
      {title: 'Tech', link: '/categories/technology'},
      {title: 'Videos', link: '/videos'},
      {title: 'opinion', link: '/categories/opinion'},
      {title: 'finance', link: '/finance'}
    ]
  }),
  mounted () {
    this.menuItems.shift()
    this.menuItems.unshift({title: 'Create Post', link: '/create/post'})
  }
}
