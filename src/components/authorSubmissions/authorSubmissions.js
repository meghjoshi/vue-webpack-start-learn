'use strict'
import Vue from 'vue'
import headermenu from '../headermenu/headermenu.vue'
import axios from 'axios'
export default {
  data: () => ({
    baseImageUrl: process.env.cloudinaryImageUrl,
    txtsearch: '',
    articleData: [],
    userList: [],
    username: null,
    authorName: '',
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
    urlArray: process.env.LiveAPI + 'articles/status/'
  }),
  components: {
    headermenu
  },
  methods: {
    articleLoadMore: function (total) {
      let _this = this
      let search = (_this.txtsearch) ? _this.txtsearch : '*'
      axios.get(_this.urlArray + _this.selected_filter.shortCode + '/' + search + '/' + _this.loadcount + '/' + _this.totalcount,
        {
          headers: {
            author: _this.authorName
          }
        })
        .then((res) => {
          _this.articleData.push(...res.data)
          _this.totalcount += res.data.length
        })
        .catch(e => {
          console.log(e)
        })
    },
    userListchangedValue: function (value) {
      let _this = this
      axios.get(process.env.LiveAPI + 'userSearch/50?search=' + value).then((res) => {
        _this.userList = res.data
      }).catch(e => {
        console.log(e)
      })
    },
    changestatus: function () {
      let _this = this
      axios.get(process.env.LiveAPI + 'userSearch/50?search=' + value).then((res) => {
        _this.userList = res.data
      }).catch(e => {
        console.log(e)
      })
    },
    onchange: function () {
      let _this = this
      _this.loadcount = 3
      _this.totalcount = 0
      let search = (_this.txtsearch) ? _this.txtsearch : '*'
      axios.get(_this.urlArray + _this.selected_filter.shortCode + '/' + search + '/' + _this.loadcount + '/' + _this.totalcount,
        {
          headers: {
            author: _this.authorName
          }
        })
        .then((res) => {
          _this.articleData = res.data
          _this.totalcount += res.data.length
        })
        .catch(e => {
          console.log(e)
        })
    },
    onauthorchange: function () {
      let _this = this
      _this.loadcount = 3
      _this.totalcount = 0
      axios.get(_this.urlArray + _this.selected_filter.shortCode + '/*/' + _this.loadcount + '/' + _this.totalcount,
        {
          headers: {
            author: _this.authorName
          }
        })
        .then((res) => {
          _this.articleData = res.data
          _this.totalcount += res.data.length
        })
        .catch(e => {
          console.log(e)
        })
    },
    searchBtn: function () {
      if (this.txtsearch !== '') {
        let _this = this
        _this.loadcount = 3
        _this.totalcount = 0
        axios.get(_this.urlArray + _this.selected_filter.shortCode + '/' + _this.txtsearch + '/' + _this.loadcount + '/' + _this.totalcount,
          {
            headers: {
              author: _this.authorName
            }
          })
          .then((res) => {
            _this.articleData = res.data
            _this.totalcount += res.data.length
          })
          .catch(e => {
            console.log(e)
          })
      }
    }
  },
  mounted () {
    let _this = this
    if (!Vue.localStorage.get('user')) {
      _this.$router.push('/')
    }
    axios.all([
      axios.get(_this.urlArray + _this.selected_filter.shortCode + '/*/' + _this.loadcount + '/' + _this.totalcount,
        {
          headers: {
            author: _this.authorName
          }
        }),
      axios.get(process.env.LiveAPI + 'userSearch/50?search=')
    ]).then(axios.spread(function (res1, res2) {
      _this.articleData = res1.data
      _this.totalcount = res1.data.length
      _this.userList = res2.data
    })).catch(e => {
      console.log(e)
    })
  }
}
