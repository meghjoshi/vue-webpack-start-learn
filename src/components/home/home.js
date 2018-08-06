'use strict'
import Vue from 'vue'
import headermenu from '../headermenu/headermenu.vue'
import trendingpost from '../trending-post/trending-post.vue'
import dailynewsletter from '../daily-newsletter/daily-newsletter.vue'
import axios from 'axios'
import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)
export default {
  components: {
    headermenu,
    trendingpost,
    dailynewsletter
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
      trending_articles: [],
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
    let _this = this
    axios.all([
      axios.get(process.env.LiveAPI + 'articles' + '/' + _this.articleLoadCount + '/' + _this.articleTotalCount).catch(null),
      axios.get(process.env.LiveAPI + 'articles/type/video/2').catch(null),
      axios.get(process.env.LiveAPI + 'articles/categories/community-submitted/3').catch(null),
      axios.get(process.env.LiveAPI + 'trending_articles').catch(null)
    ]).then(axios.spread(function (res1, res2, res3, res4) {
      _this.articleData = res1.data
      _this.videoData = res2.data
      _this.communityData = res3.data
      _this.trending_articles = res4.data
    })).catch(e => {
      console.log(e)
    })
  },
  methods: {
    articleLoadMore: function (total) {
      let _this = this
      axios.get(process.env.LiveAPI + 'articles/' + _this.articleLoadCount + '/' + (_this.articleTotalCount + total))
        .then((res) => {
          _this.articleData.push(...res.data)
          _this.articleTotalCount += res.data.length
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
