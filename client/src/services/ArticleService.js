import Api from '@/services/Api'

export default {
  index() {
    return Api().get('articles')
  },
  post(article) {
    return Api().post('articles', article)
  },
  getTag() {
    return Api().get('tags')
  },
}
