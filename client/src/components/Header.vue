<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a
        class="navbar-brand pl-5 home"
        href="#"
        @click="navigateTo({ name: 'home' })"
        >reader-App</a
      >

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto mr-5">
          <li class="nav-item active">
            <a
              class="nav-link text-decoration-none"
              @click="navigateTo({ name: 'articles' })"
              >Articles
            </a>
          </li>
          <li v-if="!$store.state.isUserLoggedIn" class="nav-item active">
            <router-link to="register">
              <a class="nav-link text-decoration-none">Sign up </a>
            </router-link>
          </li>
          <li v-if="!$store.state.isUserLoggedIn" class="nav-item">
            <a class="nav-link" href="#" @click="navigateTo({ name: 'login' })"
              >Login</a
            >
          </li>
          <li v-if="$store.state.isUserLoggedIn" class="nav-item">
            <a class="nav-link" href="#" @click="logout">Log Out</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    navigateTo(route) {
      this.$router.push(route)
    },
    async logout() {
      await this.$store.dispatch('setToken', null)
      await this.$store.dispatch('setUser', null)
      // redirect to home page
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
a:link {
  text-decoration: none;
}

.home {
  cursor: pointer;
}
</style>
