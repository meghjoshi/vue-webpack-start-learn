'use strict'

import Vue from 'vue'
import Router from 'vue-router'
import headermenu from '../headermenu/headermenu.vue'
import { validationMixin } from 'vuelidate'
import axios from 'axios'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage)
Vue.use(Router)
export default {
  mixins: [validationMixin],
  validations: {
    name: '',
    email: ''
  },
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    }
  },
  components: {
    headermenu
  },
  data () {
    return {
      show1: false,
      msg: '',
      email: '',
      password: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The email and password you entered don\'t match')
      }
    }
  },
  mounted () {
    if (Vue.localStorage.get('user')) {
      location.href = '/'
    }
    if (this.$route.params.verification) {
      axios
        .get(process.env.LocalAPI + 'verification/' + this.$route.params.verification)
        .then(response => {
          if (response.data.success) {
            this.msg = response.data.msg
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  methods: {
    submit () {
      axios
        .post(process.env.LiveAPI + 'auth/authenticate', {
          'user': {
            'email': this.email,
            'password': this.password
          }
        })
        .then(response => {
          if (response.data) {
            if (response.data.success === true) {
              Vue.localStorage.set('token', response.data.token)
              Vue.localStorage.set('user', JSON.stringify(response.data.user))
              this.$router.push('/')
            } else {
              this.email = ''
              this.password = ''
              this.msg = response.data.msg
            }
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    clear () {
      this.$v.$reset()
      this.email = ''
      this.password = ''
    }
  }
}
