'use strict'
import headermenu from '../headermenu/headermenu.vue'
import axios from 'axios'
export default {
  components: {
    headermenu
  },
  data: () => ({
    singlearticle: [],
    cloudinaryImageUrl: process.env.cloudinaryImageUrl
  }),
  mounted () {
    // let _this = this
    axios.get(process.env.LiveAPI + this.$route.params.slug)
      .then((res) => {
        if (res.data) {
          this.singlearticle = res.data
        } else {
          this.$router.push('/404')
        }
      })
      .catch(e => {
        console.log(e)
      })
  }
}
