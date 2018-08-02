'use strict'
import axios from '../../../node_modules/axios/index'
import headermenu from '../headermenu/headermenu.vue'
export default {
  components: {
    headermenu
  },
  data () {
    return {
      info: {},
      totalcount: 0,
      loadCount: 6,
      loadMoreButton: 1,
      cloudinaryImageUrl: process.env.cloudinaryImageUrl
    }
  },
  mounted () {
    axios
      .get(process.env.LiveAPI + 'articles/tags/' + this.$route.params.tag + '/' + this.loadCount + '/' + (this.totalcount))
      .then(response => {
        if (response.data.length) {
          this.info = response.data
        } else {
          this.loadMoreButton = 0
        }
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    loadmore: function (count) {
      axios
        .get(process.env.LiveAPI + 'articles/tags/' + this.$route.params.tag + '/' + this.loadCount + '/' + (this.totalcount + count))
        .then(response => {
          if (response.data.length) {
            this.info.push(...response.data)
            this.totalcount = this.totalcount + response.data.length
          } else {
            this.loadMoreButton = 0
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
