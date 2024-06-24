const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/IndexPage.vue') }
  //   ]
  // },

  { path: '/', component: () => import('../pages/MainHome.vue'), meta: { requiresAuth: true } },
  { path: '/register', component: () => import('../pages/UserRegister.vue') },
  { path: '/login', component: () => import('../pages/UserLogin.vue') },
  {
    path: '/document-form',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('pages/DocumentForm.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
