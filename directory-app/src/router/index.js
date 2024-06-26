import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

let isAuthInitialized = false;

function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createWebHistory(),
  });

  Router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (!isAuthInitialized) {
      isAuthInitialized = true;
      const currentUser = await getCurrentUser();

      if (requiresAuth && !currentUser) {
        next('/login');
      } else {
        next();
      }
    } else {
      const currentUser = auth.currentUser;
      if (requiresAuth && !currentUser) {
        next('/login');
      } else {
        next();
      }
    }
  });

  return Router;
});

