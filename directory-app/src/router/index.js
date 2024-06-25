import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

import { auth } from '../firebase';


export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    history: createWebHistory(),
  });


  Router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const currentUser = auth.currentUser;

    if (requiresAuth && !currentUser) {
      next('/login'); // Redirige a la página de inicio de sesión si se requiere autenticación pero el usuario no está autenticado
    }
    // else if (!requiresAuth && currentUser) {
    //   next('/register'); // Redirige a la página principal si el usuario está autenticado pero intenta acceder a una página como la página de registro o inicio de sesión
    // } 
    else {
      next(); // Continuar navegación normalmente
    }
  });


  return Router
})



/*

import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";


export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)


  let isAuthenticated = false;
  let isAuthResolved = false;

  // Utiliza una promesa para esperar la inicialización de Firebase Auth
  const authPromise = new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      isAuthenticated = !!user;
      isAuthResolved = true;
      resolve();
    });
  });

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    history: createWebHistory(),
  });


  Router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const currentUser = auth.currentUser;

    if (requiresAuth && !currentUser) {
      next('/login'); // Redirige a la página de inicio de sesión si se requiere autenticación pero el usuario no está autenticado
    }
    // else if (!requiresAuth && currentUser) {
    //   next('/register'); // Redirige a la página principal si el usuario está autenticado pero intenta acceder a una página como la página de registro o inicio de sesión
    // } 
    else {
      next(); // Continuar navegación normalmente
    }
  });


  return Router
})



*/