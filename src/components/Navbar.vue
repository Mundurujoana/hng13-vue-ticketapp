<template>
  <nav class="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
    <div class="max-w-[1440px] mx-auto px-6 py-3 flex justify-between items-center">
      <!-- Logo -->
      <RouterLink
        to="/"
        class="text-2xl font-semibold text-blue-600 hover:text-blue-700 transition"
      >
        Ticket<span class="text-gray-900">App</span>
      </RouterLink>

      <!-- Desktop Menu -->
      <div v-if="token" class="hidden md:flex items-center gap-6">
        <RouterLink
          to="/dashboard"
          class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
        >
          Dashboard
        </RouterLink>
        <RouterLink
          to="/tickets"
          class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
        >
          Tickets
        </RouterLink>

        <button
          @click="handleLogout"
          class="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md hover:from-red-600 hover:to-red-700 transition-all duration-200"
        >
          Logout
        </button>
      </div>

      <!-- Mobile Menu Button -->
      <button
        v-if="token"
        @click="isOpen = !isOpen"
        class="md:hidden text-gray-700 focus:outline-none hover:text-blue-600 transition"
      >
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            v-if="isOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Dropdown Menu -->
    <div
      v-if="isOpen && token"
      class="md:hidden bg-white border-t border-gray-100 shadow-lg px-6 py-4 space-y-3"
    >
      <RouterLink
        to="/dashboard"
        @click="isOpen = false"
        class="block text-gray-700 font-medium hover:text-blue-600 transition"
      >
        Dashboard
      </RouterLink>
      <RouterLink
        to="/tickets"
        @click="isOpen = false"
        class="block text-gray-700 font-medium hover:text-blue-600 transition"
      >
        Tickets
      </RouterLink>
      <button
        @click="logoutMobile"
        class="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";

const router = useRouter();
const token = localStorage.getItem("ticketapp_session");
const isOpen = ref(false);

const handleLogout = () => {
  localStorage.removeItem("ticketapp_session");
  router.push("/auth/login");
};

const logoutMobile = () => {
  handleLogout();
  isOpen.value = false;
};
</script>
