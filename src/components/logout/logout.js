'use strict'
import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage)

export default {
  data: () => ({}),
  mounted () {
    if (Vue.localStorage.get('user')) {
      this.$localStorage.remove('user')
      this.$localStorage.remove('token')
      this.$router.push('/')
    }
  }
}
