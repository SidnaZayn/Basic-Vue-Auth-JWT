import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '../stores/auth.store';
import { toast } from 'wc-toast';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/no-auth',
      name: 'no-auth',
      component: () => import('../views/NoAuthView.vue')
    },
    {
      path: '/with-auth',
      name: 'with-auth',
      component: () => import('../views/WithAuthView.vue')
    },
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/no-auth'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired) {
    if (!authStore.user) {
      try {
        toast("Credential not found", {
          icon: { type: 'custom', content: '❌' },
          theme: {
            type: "custom",
            style: { background: "#ff3333", color: "white" },
          },
        });        
        return next('login');
      } catch (error) {
        return next('login');
      }
    } else {
      return next();
    }
  }

  return next();
});

router.beforeEach((to, from, next) => {
  const credentialCheckPages = ['/login'];
  const isCredentialPage = credentialCheckPages.includes(to.path);
  const authStore = useAuthStore();

  if (isCredentialPage) {
    if (authStore.user) {
      //back to previous page
      return next(from.path);
    } else {
      return next();
    }
  }
  return next();

})

export default router
