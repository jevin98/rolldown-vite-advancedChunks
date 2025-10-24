import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Login.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index/Index.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/example',
      name: 'example',
      component: () => import('@/views/example/Example.vue'),
      meta: { requiresAuth: false },
    },
  ],
});

// 路由守卫
router.beforeEach((_, _1, next) => {
  next();
});

export default router;
