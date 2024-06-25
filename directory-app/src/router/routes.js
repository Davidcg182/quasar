const routes = [

  { path: '/', component: () => import('pages/MainHome.vue'), meta: { requiresAuth: true } },
  { path: '/register', component: () => import('pages/UserRegister.vue') },
  { path: '/login', component: () => import('pages/UserLogin.vue') },
  {
    path: '/document-form',
    component: () => import('pages/DocumentForm.vue'),
    meta: { requiresAuth: true },
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
