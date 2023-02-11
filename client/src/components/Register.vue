<template>
  <!-- <div class="register-container">
    <div class="register-form">
      <div class="form-header">
        <h3Register</h3>
      </div>
      <form name="tab-tracker-form" autocomplete="off">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" placeholder="Enter your email" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            v-model="password"
            placeholder="Enter your password"
            autocomplete="new-password"
          />
        </div>
        <div class="form-group">
          <p class="danger-alert" v-html="error"></p>
        </div>
        <div class="form-group">
          <button class="btn-register" @click="register">Register</button>
        </div>
      </form>
    </div>
  </div>> -->
  <div class="container pt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header text-center">
            <h3>Register</h3>
          </div>
          <div class="card-body">
            <form name="tab-tracker-form" autocomplete="off">
              <div class="form-group">
                <label for="username">Username</label>
                <input
                  type="username"
                  v-model="username"
                  class="form-control"
                  placeholder="Enter your username"
                />
              </div>
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
                <button class="btn btn-primary" @click.prevent="register">
                  Register
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
      username: '',
      email: '',
      password: '',
      error: null,
    }
  },
  methods: {
    async register() {
      try {
        const response = await AuthenticationService.register({
          username: this.username,
          email: this.email,
          password: this.password,
        })
        console.log(response)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
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
