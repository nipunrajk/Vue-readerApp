<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card">
          <div class="card-header text-center">
            <h3>Add Article</h3>
          </div>
          <div class="card-body">
            <form name="tab-tracker-form" autocomplete="off">
              <div class="form-group mt-2">
                <label>Header</label>
                <input
                  type="text"
                  v-model="article.header"
                  class="form-control my-2"
                  required
                  :rules="[required]"
                />
              </div>

              <div class="form-group">
                <label>Author</label>
                <input
                  type="text"
                  v-model="article.author"
                  class="form-control my-2"
                  required
                  :rules="[required]"
                  disabled
                />
              </div>

              <div class="form-group">
                <label>Tag</label>
                <select v-model="selectedTag" class="form-control my-2">
                  <option v-for="tag in tagName" :value="tag.id">
                    {{ tag.name }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="email">Content</label>
                <textarea
                  v-model="article.content"
                  class="form-control my-2"
                  rows="5"
                  required
                  :rules="[required]"
                ></textarea>
              </div>
              <span class="error text-danger" v-if="error">{{ error }}</span>
              <div class="form-group">
                <button class="btn btn-primary my-3" @click.prevent="create">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleService from '../services/ArticleService'

export default {
  data() {
    return {
      article: {
        header: null,
        author: null,
        content: null,
        tag_id: null,
      },
      error: null,
      required: (value) => !!value || 'Required.',
      tagName: [],
    }
  },
  mounted() {
    this.article.author = this.$store.getters.user.username
    this.fetchTags()
  },
  methods: {
    async fetchTags() {
      try {
        const result = (await ArticleService.getTag()).data
        this.tagName = result
        console.log(JSON.stringify(this.tagName))
      } catch (error) {
        this.error = error.message
      }
    },
    async create() {
      this.error = null
      // const areAllFieldsFilledIn = Object.keys(this.article).every(
      //   (key) => !!this.article[key]
      // )
      const areAllFieldsFilledIn =
        Object.keys(this.article).every((key) => !!this.article[key]) &&
        !!this.selectedTag
      this.article.tag_id = this.selectedTag
      if (!areAllFieldsFilledIn) {
        this.error = 'please fill all the required fields'
        return
      }

      try {
        // call Api
        // await ArticleService.post(this.article)
        // Pass the id of the selected tag to the API
        // await ArticleService.post({ ...this.article, tagId: selectedTag.id })
        await ArticleService.post(this.article)
        console.log('result', { ...this.article, tagId: selectedTag.id })
        this.$router.push({
          name: 'articles',
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped>
.form-group.required .control-label:after {
  content: '*';
  color: red;
}
</style>
