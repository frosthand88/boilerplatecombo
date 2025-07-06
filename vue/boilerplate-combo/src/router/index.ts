import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import App from "@/App.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: App,
    },
    {
      path: '/callback',
      name: 'callback',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Callback.vue'),
    },
  ],
})

export default router
