import { createRouter, createWebHistory } from "vue-router";
import Landing from "../pages/Landing.vue";
import Login from "../pages/auth/Login.vue";
import Signup from "../pages/auth/Signup.vue";
import Dashboard from "../pages/Dashboard.vue";
import TicketManagement from "../pages/TicketManagement.vue"; // Import TicketManagement

const routes = [
  { path: "/", component: Landing },
  { path: "/auth/login", component: Login },
  { path: "/auth/signup", component: Signup },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/tickets",
    component: TicketManagement,
    meta: { requiresAuth: true }, // Protect this route as well
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("ticketapp_session");
  if (to.meta.requiresAuth && !token) {
    next("/auth/login");
  } else {
    next();
  }
});

export default router;
