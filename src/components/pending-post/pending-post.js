'use strict'
import Vue from 'vue'
import headermenu from '../headermenu/headermenu.vue'
import axios from 'axios'

export default {
  data: () => ({
    baseImageUrl: process.env.cloudinaryImageUrl,
    draftData: [],
    userList: [],
    urlArray: process.env.LiveAPI + 'articles/pending-post/',
    username: null,
    image: null,
    displayname: null,
    selecteduser: '',
    loadcount: 3,
    totalcount: 0,
    selected_filter: {shortCode: 'submited', text: 'Post In Review'},
    filter: [
      {shortCode: 'submited', text: 'Post In Review'},
      {shortCode: 'rejected', text: 'Rejected Post'},
      {shortCode: 'publish', text: 'Approved Post'},
      {shortCode: 'draft', text: 'Draft Post'}
    ],
    fetchedLocale: '',
    setLocale: null,
    search: '',
    articleLoadMoreButton: 1
  }),
  components: {
    headermenu
  },
  methods: {
    articleLoadMore: function (total) {
      let _this = this
      let headers = {headers: {token: Vue.localStorage.get('token')}}
      if (total == -1 && this.search.length) {
        console.log(this.userList)
        _this.totalcount = 0
        headers = {headers: {token: Vue.localStorage.get('token'), search: this.search, author: this.selecteduser}}
      } else if (total == -1) {
        _this.totalcount = 0
      }
      axios.get(_this.urlArray + _this.loadcount + '/' + _this.totalcount, headers)
        .then((res) => {
          if (res.data.length) {
            if (total == -1) {
              _this.draftData = (res.data)
              _this.totalcount = 0
            } else {
              _this.draftData.push(...res.data)
              _this.totalcount += res.data.length
            }
          } else {
            _this.draftData = {}
            this.articleLoadMoreButton = 0
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    userListchangedValue: function (value) {
      if (this.selecteduser.length) {
        let _this = this
        axios.get(process.env.LiveAPI + 'userSearch/50?search=' + this.selecteduser).then((res) => {
          _this.userList = {}
          _this.userList = res.data
        }).catch(e => {
          console.log(e)
        })
      }
    }
  },
  mounted() {
    let _this = this
    if (!Vue.localStorage.get('user')) {
      _this.$router.push('/')
    }
    axios.all([
      axios.get(_this.urlArray + _this.loadcount + '/' + _this.totalcount, {headers: {token: Vue.localStorage.get('token')}}),
      axios.get(process.env.LiveAPI + 'userSearch/50?search=')
    ]).then(axios.spread(function (res1, res2) {
      _this.draftData = res1.data
      _this.totalcount = res1.data.length
      _this.userList = (res2.data)
    })).catch(e => {
      console.log(e)
    })
  }
}
