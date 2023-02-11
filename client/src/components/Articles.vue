<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header text-center position-relative">
            <h3>Articles</h3>
            <!-- search -->
            <div class="d-flex">
              <input
                type="text"
                class="form-control"
                v-model="searchTerm"
                placeholder="Search articles by header"
              />
              <button
                type="button"
                class="btn btn-primary ml-2"
                @click="searchArticles"
              >
                Search
              </button>
            </div>
            <!--  -->
            <button
              type="button"
              class="position-absolute top-0 end-0 btn btn-primary btn-circle"
              @click="navigateTo({ name: 'article-create' })"
            >
              <i class="fa fa-plus"></i>
            </button>
          </div>
          <div class="card-body">
            <div v-for="article in articles" :key="article.id">
              <!-- articles  -->
              <div class="card mb-2">
                <div class="card-body">
                  <h5 class="card-title">{{ article.header }}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">
                    {{ article.author }}
                  </h6>
                  <p class="card-text">
                    {{ article.content }}
                  </p>
                  <a
                    class="btn btn-primary"
                    @click="
                      navigateTo({
                        name: 'article',
                        params: { articleId: article.id },
                      })
                    "
                    >Load more</a
                  >
                </div>
              </div>
              <!--  -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ArticleService from '../services/ArticleService'

export default {
  components: {},
  data() {
    return {
      // articles: [
      //   {
      //     title: 'article1',
      //     author: 'person 1',
      //     description: 'anything',
      //   },
      // ],
      articles: null,
      searchTerm: '',
    }
  },
  computed: {
    filteredArticles() {
      return this.articles.filter((article) => {
        return article.header
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      })
    },
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route)
    },
    searchArticles() {
      // You can add the implementation to search for articles based on the header name here
    },
  },
  async mounted() {
    // do a request to the backend for all the articles
    this.articles = (await ArticleService.index()).data
    console.log(this.$store.getters.user.updatedAt)
  },
}
</script>

<style scoped>
.btn-circle {
  width: 60px;
  height: 60px;
  padding: 10px 16px;
  border-radius: 35px;
  font-size: 24px;
  line-height: 1.33;
}
</style>
