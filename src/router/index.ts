import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path:'/edit',
      name:'edit',
      component: () => import('../views/EditView.vue')
    },
    {
      path:'/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue')
    }
  ],
})

export default router
