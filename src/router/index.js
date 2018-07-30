'use strict'
import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home/home.vue'
import category from '../components/category/category.vue'
import author from '../components/author/author.vue'
import tag from '../components/tag/tag.vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

Vue.use(Router)
Vue.use(Vuetify)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/categories/:category',
      name: 'category',
      component: category
    },
    {
      path: '/author/:author',
      name: 'author',
      component: author
    },
    {
      path: '/tag/:tag',
      name: 'tag',
      component: tag
    }
  ],
  mode: 'history'
})
