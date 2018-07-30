'use strict'
import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home/home.vue'
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
    }
  ],
  mode: 'history'
})
