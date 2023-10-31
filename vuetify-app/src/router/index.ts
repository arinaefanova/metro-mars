// Composables
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from "@/store/auth";


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/ticket/buy',
    name: 'BuyTicket',
    component: () => import('../views/BuyTicket.vue'),
  },
  {
    path: '/ticket/sell',
    name: 'SellTicket',
    component: () => import('../views/SellTicket.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/schedule',
    name: 'StationDisplay',
    component: () => import('../views/StationDisplay.vue'),
  },
  {
    path: '/route',
    name: 'BuildRoute',
    component: () => import('../views/BuildRoute.vue'),
  },
  {
    path: '/user/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/user/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/user/roots',
    name: 'UserRoots',
    component: () => import('../views/UserRoots.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/station/crashes',
    name: 'AllCrashes',
    component: () => import('../views/AllCrashes.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import('../views/Statistics.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import('../components/Error.vue'),
  },
  {
    path: '/user',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/ticket/all-my',
    name: 'MyTickets',
    component: () => import('../views/MyTickets.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('../views/Map.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.user;

  if (requiresAuth && !isAuthenticated) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
