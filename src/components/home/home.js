'use strict'
import headermenu from '../headermenu/headermenu.vue'
import axios from 'axios'

export default {
  components: {
    headermenu
  },
  data () {
    return {
      fetchLatestNews: [],
      articleLoadCount: 10,
      articleTotalCount: 0,
      cloudinaryImageUrl: process.env.cloudinaryImageUrl,
      videoData: [],
      articleData: [],
      communityData: [],
      valid: true,
      name: '',
      email: '',
      placeimage: [
        {src: 'http://via.placeholder.com/850x440', title: '1'},
        {src: 'http://via.placeholder.com/850x440', title: '2'}
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    }
  },

  mounted () {
    axios.get(process.env.LiveAPI + 'articles' + '/' + this.articleLoadCount + '/' + this.articleTotalCount)
      .then((res) => {
        this.articleData = res.data
      })
      .catch(e => {
        console.log(e)
      })

    axios.get(process.env.LiveAPI + 'articles/type/video/2')
      .then((res) => {
        this.videoData = res.data
      })
      .catch(e => {
        console.log(e)
      })
    axios.get(process.env.LiveAPI + 'articles/categories/community-submitted/3')
      .then((res) => {
        this.communityData = res.data
      })
      .catch(e => {
        console.log(e)
      })
  },
  methods: {
    articleLoadMore: function (total) {
      let _this = this
      axios.get(process.env.LiveAPI + 'articles/' + _this.articleLoadCount + '/' + (_this.articleTotalCount + total))
        .then((res) => {
          this.articleData.push(...res.data)
          this.articleTotalCount += res.data.length
        })
        .catch(e => {
          console.log(e)
        })
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
