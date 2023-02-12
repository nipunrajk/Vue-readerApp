<template>
  <div class="card my-5">
    <div class="card-header text-center">
      <p class="fs-5 text">Tags</p>
    </div>
    <div class="card-body">
      <div v-for="tag in tagName" :key="tag.id">
        <!--   -->
        <div class="card mb-2 tag-card">
          <div
            class="card-body"
            :class="{ 'bg-secondary text-white': tag.selected }"
            @click="selectTag(tag)"
          >
            {{ tag.name }}
          </div>
        </div>
        <!--  -->
      </div>
    </div>
  </div>
</template>

<script>
import ArticleService from '../services/ArticleService'
export default {
  data() {
    return {
      tagName: [],
    }
  },
  mounted() {
    this.fetchTags()
  },
  methods: {
    selectTag(tag) {
      this.tagName.forEach((t) => {
        t.selected = false
      })
      tag.selected = true
    },
    async fetchTags() {
      try {
        const result = (await ArticleService.getTag()).data
        this.tagName = result
        console.log(JSON.stringify(this.tagName))
      } catch (error) {
        this.error = error.message
      }
    },
  },
}
</script>

<style scoped>
.tag-card:hover {
  background-color: #f2f2f2;
  cursor: pointer;
}
</style>
