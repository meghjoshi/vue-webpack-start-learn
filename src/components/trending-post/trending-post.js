'use strict'
import axios from 'axios'
export default {
  data: () => ({
    trending_articles: []
  }),
  mounted () {
    let _this = this
    axios.get(process.env.LiveAPI + 'trending_articles')
      .then((res) => {
        _this.trending_articles = res.data
      })
      .catch(e => {
        console.log(e)
      })
  }
}
