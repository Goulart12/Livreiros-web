import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'main-page', component: () => import('../views/homePage.vue') },
  { path: '/create', name: 'create', component: () => import('../views/createBookStore.vue') },
  { path: '/result', name: 'result', component: () => import('../views/resultPage.vue') },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
