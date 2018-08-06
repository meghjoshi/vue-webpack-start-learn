'use strict'
import Vue from 'vue'
import axios from 'axios'
export default {
  data: () => ({
    valid: true,
    name: '',
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ]
  }),
  mounted () {},
  methods: {
    newsletter () {
      let _this = this
      var headers = {
        'token': Vue.localStorage.get('token')
      }
      if (_this.$refs.form.validate()) {
        axios.post(process.env.LiveAPI + 'subscribe',
          {
            user: {
              'name': _this.name,
              'email': _this.email
            }
          }, {headers: headers})
          .then(res => {
            _this.clear()
          })
          .catch(e => {
            _this.clear()
          })
      }
    },
    clear () {
      let _this = this
      _this.$refs.form.reset()
    }
  }
}
