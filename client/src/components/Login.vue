<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header text-center">
            <h3>Login</h3>
          </div>
          <div class="card-body">
            <form name="tab-tracker-form" autocomplete="off">
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  v-model="email"
                  class="form-control"
                  placeholder="Enter your email"
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                  placeholder="Enter your password"
                  autocomplete="new-password"
                />
              </div>
              <div class="form-group">
                <p class="text-danger" v-html="error"></p>
              </div>
              <div class="form-group">
                <button class="btn btn-primary" @click.prevent="login">
                  Login
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
import AuthenticationService from '../services/AuthenticaionService'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    }
  },
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password,
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        console.log('user in the login is', this.$store.getters.user.username)
      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
      }
    },
  },
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
