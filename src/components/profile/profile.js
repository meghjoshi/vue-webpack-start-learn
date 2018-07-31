'use strict'
import Vue from 'vue'
import headermenu from '../headermenu/headermenu.vue'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage)
export default {
  data: () => ({
    msg: 'hello',
    userData: []
  }),
  components: {
    headermenu
  },
  mounted () {
    if (Vue.localStorage.get('user')) {
      this.userData = JSON.parse(Vue.localStorage.get('user'))
    } else {
      this.$router.push('/')
    }
  }
}
