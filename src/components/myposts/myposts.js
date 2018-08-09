'use strict'
import Vue from 'vue'
import headermenu from '../headermenu/headermenu.vue'
import axios from 'axios'
import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)
export default {
  data: () => ({
    baseImageUrl: process.env.cloudinaryImageUrl,
    draftData: [],
    submittedData: [],
    publishedData: [],
    scheduledData: [],
    image: null,
    displayname: null,
    loadcount: 3,
    totalCountDraft: 0,
    totalCountSubmited: 0,
    totalCountPublish: 0,
    totalCountScheduled: 0,
    username: JSON.parse(Vue.localStorage.get('user')).username,
    urlArray: [
      process.env.LiveAPI + 'articles/authorposts/' + this.username + '/draft/' + this.loadcount + '/' + this.totalCountDraft,
      process.env.LiveAPI + 'articles/authorposts/' + this.username + '/submited/' + this.loadcount + '/' + this.totalCountSubmited,
      process.env.LiveAPI + 'articles/authorposts/' + this.username + '/publish/' + this.loadcount + '/' + this.totalCountPublish,
      process.env.LiveAPI + 'articles/authorposts/' + this.username + '/scheduled/' + this.loadcount + '/' + this.totalCountScheduled
    ],
    nodraftpost: false,
    nosubmitpost: false,
    nopublishpost: false,
    noschedulepost: false,
    loadmoredraftpost: true,
    loadmoresubmitpost: true,
    loadmorepublishpost: true,
    loadmoreschedulepost: true,
  }),
  components: {
    headermenu
  },
  mounted () {
    let _this = this
    if (Vue.localStorage.get('user')) {
      _this.displayname = JSON.parse(Vue.localStorage.get('user')).display_name
      _this.username = JSON.parse(Vue.localStorage.get('user')).username
      _this.image = this.baseImageUrl + JSON.parse(Vue.localStorage.get('user')).profileImagePreference
      axios.all([
        axios.get(process.env.LiveAPI + 'articles/authorposts/' + this.username + '/draft/' + this.loadcount + '/' + this.totalCountDraft).catch(null),
        axios.get(process.env.LiveAPI + 'articles/authorposts/' + this.username + '/submited/' + this.loadcount + '/' + this.totalCountSubmited).catch(null),
        axios.get(process.env.LiveAPI + 'articles/authorposts/' + this.username + '/publish/' + this.loadcount + '/' + this.totalCountPublish).catch(null),
        axios.get(process.env.LiveAPI + 'articles/authorposts/' + this.username + '/scheduled/' + this.loadcount + '/' + this.totalCountScheduled).catch(null)
      ]).then(axios.spread(function (res1, res2, res3, res4) {
        if (res1.data.articles.length) {
          _this.draftData = res1.data.articles
          _this.totalCountDraft += parseInt(res1.data.articles.length)
        } else {
          _this.nodraftpost = true
          _this.loadmoredraftpost = false
        }
        if (res2.data.articles.length) {
          _this.submittedData = res2.data.articles
          _this.totalCountSubmited += parseInt(res2.data.articles.length)
        } else {
          _this.nosubmitpost = true
          _this.loadmoresubmitpost = false
        }
        if (res3.data.articles.length) {
          _this.publishedData = res3.data.articles
          _this.totalCountPublish += parseInt(res3.data.articles.length)
        } else {
          _this.nopublishpost = true
          _this.loadmorepublishpost = false
        }
        if (res4.data.articles.length) {
          _this.scheduledData = res4.data.articles
          _this.totalCountScheduled += parseInt(res4.data.articles.length)
        } else {
          _this.noschedulepost = true
          _this.loadmoreschedulepost = false
        }
      }))
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    loadMore (total, postname) {
      let _this = this
      switch (postname) {
        case 'draft_post':
          axios.get(process.env.LiveAPI + 'articles/authorposts/' + this.username + '/draft/' + this.loadcount + '/' + this.totalCountDraft)
            .then((res) => {
              _this.draftData.push(...res.data.articles)
              _this.totalCountDraft += res.data.articles.length
              if (res.data.articles.length < _this.loadcount) {
                _this.loadmoredraftpost = false
              }
            })
          break
        case 'submit_review_post':
          axios.get(process.env.LiveAPI + 'articles/authorposts/' + this.username + '/submited/' + this.loadcount + '/' + this.totalCountSubmited)
            .then((res) => {
              _this.submittedData.push(...res.data.articles)
              _this.totalCountSubmited += res.data.articles.length
              if (res.data.articles.length < _this.loadcount) {
                _this.loadmoresubmitpost = false
              }
            })
          break
        case 'publish_post':
          axios.get(process.env.LiveAPI + 'articles/authorposts/' + this.username + '/publish/' + this.loadcount + '/' + this.totalCountPublish)
            .then((res) => {
              _this.publishedData.push(...res.data.articles)
              _this.totalCountPublish += res.data.articles.length
              if (res.data.articles.length < _this.loadcount) {
                _this.loadmorepublishpost = false
              }
            })
          break
        case 'schedule_post':
          axios.get(process.env.LiveAPI + 'articles/authorposts/' + this.username + '/scheduled/' + this.loadcount + '/' + this.totalCountScheduled)
            .then((res) => {
              _this.scheduledData.push(...res.data.articles)
              _this.totalCountScheduled += res.data.articles.length
              if (res.data.articles.length < _this.loadcount) {
                _this.loadmoreschedulepost = false
              }
            })
          break
        default:
          _this.draftData = []
          _this.submittedData = []
          _this.publishedData = []
          _this.scheduledData = []
          _this.totalCountDraft = 0
          _this.totalCountSubmited = 0
          _this.totalCountPublish = 0
          _this.totalCountScheduled = 0
          break
      }
    }
  }
}
