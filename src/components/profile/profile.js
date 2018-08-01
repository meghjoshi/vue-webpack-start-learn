'use strict'
import Vue from 'vue'
import headermenu from '../headermenu/headermenu.vue'
import VueLocalStorage from 'vue-localstorage'
import { validationMixin } from 'vuelidate'
import axios from 'axios'

Vue.use(VueLocalStorage)
export default {
  mixins: [validationMixin],
  data: () => ({
    show1: false,
    show2: false,
    show3: false,
    userData: [],
    dialog: false,
    dialog1: false,
    msg: '',
    dialog2: false,
    currentpassword: '',
    newpassword: '',
    passwordagain: '',
    token: '',
    cloudinaryImageUrl:process.env.cloudinaryImageUrl,
    rules: {
      required: value => !!value || 'Required.',
      min: v => (v.length >= 8 && v.length <= 20) || 'Min 8 characters',
      passMatch: v => (v.text === this.newpassword || this.passwordagain === v.text) || 'Please Match the New Password and Password Again',
      emailMatch: () => ('The email and password you entered don\'t match')
    }
  }),
  components: {
    headermenu
  },
  mounted () {
    if (Vue.localStorage.get('user')) {
      this.userData = JSON.parse(Vue.localStorage.get('user'))
      this.token = Vue.localStorage.get('token')
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    changeProfile () {
      var headers = {
        'token': Vue.localStorage.get('token')
      }
      axios.put(process.env.LocalAPI + 'updateProfile/', {'user': this.userData},
        {headers: headers})
        .then(res => {
          if (res.data) {
            if (res.data.success) {
              this.msg = 'Profile updated successfully'
              this.clear()
            } else {
              this.msg = res.msg
              this.clear()
            }
          }
        })
        .catch(e => {
          this.clear()
        })
    },
    updatePassword () {
      var headers = {
        'token': Vue.localStorage.get('token')
      }
      if (this.currentpassword !== '' && this.newpassword === this.passwordagain) {
        axios.post(process.env.LocalAPI + 'change-password/', {
          'user': {
            'currentPassword': this.currentpassword,
            'newPassword': this.newpassword,
            'confirmNewPassword': this.passwordagain
          }, 'host': 'https://21ninety.com:443'
        }, {headers: headers})
          .then(res => {
            if (res.data) {
              if (res.data.success) {
                this.msg = res.data.msg
                this.clear()
              } else {
                this.msg = res.data.msg
                this.clear()
              }
            }
          })
          .catch(e => {
            this.clear()
          })
      }
    },
    clear () {
      this.currentpassword = ''
      this.newpassword = ''
      this.passwordagain = ''
    }
  }
}
