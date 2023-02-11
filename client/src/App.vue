<template>
  <div id="app">
    <pageHeader />
    <RouterView />
  </div>
</template>

<script>
import pageHeader from '@/components/Header.vue'

export default {
  name: 'app',
  components: {
    pageHeader,
  },
}
</script>

<style scoped></style>
