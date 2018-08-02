'use strict'
import Vue from 'vue'
import headermenu from '../headermenu/headermenu.vue'
import axios from 'axios'
export default {
  data: () => ({
    baseImageUrl: process.env.cloudinaryImageUrl,
    draftData: [],
    userList: [],
    urlArray: process.env.LiveAPI + 'articles/status/',
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
    setLocale: null
  }),
  components: {
    headermenu
  },
  methods: {
    articleLoadMore: function (total) {
      let _this = this
      axios.get(_this.urlArray + _this.loadcount + '/' + _this.totalcount)
        .then((res) => {
          _this.draftData.push(...res.data)
          _this.totalcount += res.data.length
        })
        .catch(e => {
          console.log(e)
        })
    },
    userListchangedValue: function (value) {
      let _this = this
      axios.get(process.env.LiveAPI + 'userSearch/50?search=' + value).then((res) => {
        alert('in api call')
        _this.userList = res.data
      }).catch(e => {
        console.log(e)
      })
    },
    changestatus: function () {
      let _this = this
      axios.get(process.env.LiveAPI + 'userSearch/50?search=' + value).then((res) => {
        alert('in api call')
        _this.userList = res.data
      }).catch(e => {
        console.log(e)
      })
    }
  },
  mounted() {
    let _this = this
    if (!Vue.localStorage.get('user')) {
      _this.$router.push('/')
    }
    _this.displayname = JSON.parse(Vue.localStorage.get('user')).display_name
    _this.username = JSON.parse(Vue.localStorage.get('user')).username
    _this.image = JSON.parse(Vue.localStorage.get('user')).profileImagePreference
    axios.all([
      axios.get(_this.urlArray + _this.loadcount + '/' + _this.totalcount),
      axios.get(process.env.LiveAPI + 'userSearch/50?search=')
    ]).then(axios.spread(function (res1, res2) {
      _this.draftData = res1.data
      _this.totalcount = res1.data.length
      _this.userList = res2.data
    })).catch(e => {
      console.log(e)
    })
  }
}
