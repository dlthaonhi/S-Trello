import { createRouter, createWebHistory } from 'vue-router'
import { loadLayoutMiddleware, authMiddleware } from '@/middlewares/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: {
        layout: 'auth'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
      meta: {
        layout: 'auth'
      }
    },
    {
      path: '/activate',
      name: 'activate',
      component: () => import('../views/Activate.vue'),
      meta: {
        layout: 'auth'
      }
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/ProjectList.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/boards/:id',
      meta: {
        requireAuth: true
      },
      component: () => import('../views/boards/BoardDetailView.vue'),
      children: [
        {
          path: '',
          name: 'board-detail',
          component: () => import('../components/boards/BoardDetail.vue')
        },
        {
          path: 'members',
          component: () => import('../views/boards/BoardMemberDetail.vue'),
          name: 'board-detail-members'
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: () => import('../views/Error.vue'),
      meta: {
        layout: 'error'
      }
    },
    {
      path: '/users/:id',
      name: 'user',
      component: () => import('../views/User.vue'),
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/users/:id',
          name: 'user-profile',
          component: () => import('../components/users/Profile/Profile.vue')
        },
        {
          path: '/users/:id/activity',
          name: 'user-activity',
          component: () => import('../components/users/Activity/Activity.vue')
        }
      ]
    }
  ]
})

router.beforeEach(loadLayoutMiddleware)
router.beforeEach(authMiddleware)

export default router
