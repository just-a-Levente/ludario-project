import CatalogueTabularView from '@/components/CatalogueView/CatalogueTabularView.vue'
import DashboardView from '@/components/NavigationBar/DashboardView.vue'
import LoginView from '@/components/UserLogin/LoginView.vue'
import BoardGameDetailView from '@/components/BoardGameOpWindows/BoardGameDetailView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LoginView,
    },
    {
      path: '/dashboard',
      component: DashboardView,
      children: [
        {
          path: 'boardgames',
          component: CatalogueTabularView,
        },
        {
          path: 'boardgames/:id',
          component: BoardGameDetailView,
        },
      ],
    },
  ],
})

export default router
