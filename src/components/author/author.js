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
      loadCount: 3,
      loadMoreButton: 1,
      cloudinaryImageUrl: process.env.cloudinaryImageUrl
    }
  },
  mounted () {
    this.loadmore()
  },
  watch: {
    $route () {
      this.totalcount = 0
      this.loadmore()
    }
  },
  methods: {
    loadmore: function () {
      axios
        .get(process.env.LiveAPI + 'articles/authors/' + this.$route.params.author + '/' + this.loadCount + '/' + (this.totalcount))
        .then(response => {
          if (response.data.length) {
            if (!this.info.length) {
              this.info = (response.data)
            } else {
              this.info.push(...response.data)
            }
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
