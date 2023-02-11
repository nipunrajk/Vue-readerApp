import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/Homeview.vue'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'
import Articles from '../components/Articles.vue'
import CreateArticle from '../components/CreateArticle.vue'
import ViewArticle from '../components/ViewArticle.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        auth: false,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        auth: false,
      },
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles,
      meta: {
        auth: false,
      },
    },
    {
      path: '/articles/create',
      name: 'article-create',
      component: CreateArticle,
      meta: {
        auth: true,
      },
    },
    {
      path: '/articles/:articleId',
      name: 'article',
      component: ViewArticle,
      meta: {
        auth: false,
      },
    },
  ],
})

export default router
