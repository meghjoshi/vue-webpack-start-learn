'use strict'
import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home/home.vue'
import category from '../components/category/category.vue'
import author from '../components/author/author.vue'
import video from '../components/video/video.vue'
import singlearticle from '../components/singlearticle/singlearticle.vue'
import profile from '../components/profile/profile.vue'
import tag from '../components/tag/tag.vue'
import myposts from '../components/myposts/myposts.vue'
import post from '../components/post/post.vue'
import login from '../components/login/login.vue'
import logout from '../components/logout/logout.vue'
import PageNotFound from '../components/404/404.vue'
import register from '../components/register/register.vue'
import authorSubmissions from '../components/authorSubmissions/authorSubmissions.vue'
import pendingpost from '../components/pending-post/pending-post.vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
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
      path: '/videos',
      name: 'videos',
      component: video
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
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    },
    {
      path: '/:username/myposts',
      name: 'myposts',
      component: myposts
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/post',
      name: 'post',
      component: post
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/logout',
      name: 'logout',
      component: logout
    },
    {
      path: '/mail/verification/:verification',
      name: 'login',
      component: login
    },
    {
      path: '/authorSubmissions',
      name: 'authorSubmissions',
      component: authorSubmissions
    },
    {
      path: '/pending-post',
      name: 'pending-post',
      component: pendingpost
    },
    {
      path: '/:slug',
      name: 'SingleArticle',
      component: singlearticle
    },
    {
      path: '*',
      name: '404',
      component: PageNotFound
    }
  ],
  mode: 'history'
})
