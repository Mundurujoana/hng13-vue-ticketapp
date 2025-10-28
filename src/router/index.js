import { createRouter, createWebHistory } from "vue-router";

// Import pages
import Landing from "../pages/Landing.vue";
import Login from "../pages/auth/Login.vue";
import Signup from "../pages/auth/Signup.vue";
import Dashboard from "../pages/Dashboard.vue";
import TicketManagement from "../pages/TicketManagement.vue";

// Define routes
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
    meta: { requiresAuth: true },
  },
  // Fallback route for unknown URLs
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // Smooth scroll to top on route change
    return { top: 0 };
  },
});

// 🔒 Global navigation guard for authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("ticketapp_session");

  // Protect routes that require authentication
  if (to.meta.requiresAuth && !token) {
    next("/auth/login");
  }
  // Prevent logged-in users from accessing login/signup pages
  else if (
    (to.path === "/auth/login" || to.path === "/auth/signup") &&
    token
  ) {
    next("/dashboard");
  }
  // Allow navigation
  else {
    next();
  }
});

export default router;
