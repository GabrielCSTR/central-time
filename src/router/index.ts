import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/time/:nomeDoTime',
      name: 'time',
      component: () => import('../views/TeamView.vue'),
    },
  ],
})

export default router
