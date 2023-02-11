// import Vue from 'vue'
import { createApp, reactive, toRefs, computed } from 'vue'
import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser(state, user) {
      state.user = user
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token)
    },
    setUser({ commit }, user) {
      commit('setUser', user)
    },
  },
  getters: {
    user: (state) => state.user,
  },
})
