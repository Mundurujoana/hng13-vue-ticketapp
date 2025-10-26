<template>
  <div class="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
    <!-- Animated Blobs -->
    <div
      v-motion
      class="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] bg-blue-300 rounded-full blur-3xl opacity-40 mix-blend-multiply animate-spin-slow pointer-events-none"
      :initial="{ scale: 0 }"
      :enter="{ scale: 1, transition: { duration: 1 } }"
    />
    <div
      v-motion
      class="absolute bottom-[-100px] right-[-60px] w-[350px] h-[350px] bg-purple-300 rounded-full blur-3xl opacity-30 mix-blend-multiply animate-spin-slow-reverse pointer-events-none"
      :initial="{ scale: 0 }"
      :enter="{ scale: 1, transition: { duration: 1 } }"
    />

    <!-- Form -->
    <form
      @submit.prevent="handleSubmit"
      v-motion
      class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm flex flex-col gap-4 z-10 relative"
      :initial="{ y: 50, opacity: 0, scale: 0.95 }"
      :enter="{ y: 0, opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } }"
    >
      <h1 class="text-3xl font-extrabold mb-4 text-gray-900 text-center">Sign Up</h1>

      <!-- Error Message -->
      <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>

      <input
        type="email"
        placeholder="Email"
        v-model="email"
        class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
      />
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        v-model="confirmPassword"
        class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
      />
      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md"
      >
        Sign Up
      </button>

      <p class="text-sm text-gray-600 text-center">
        Already have an account?
        <RouterLink to="/auth/login" class="text-blue-600 hover:underline">Login</RouterLink>
      </p>
    </form>

    <!-- Toast -->
    <Toast v-if="toastMessage" :message="toastMessage" :type="toastType" @close="toastMessage = ''" />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useMotion } from "@vueuse/motion";
import Footer from "../../components/Footer.vue";
import Toast from "../../components/Toast.vue";

const router = useRouter();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");
const toastMessage = ref("");
const toastType = ref("success"); // 'success' or 'error'

const handleSubmit = () => {
  error.value = "";

  if (!email.value || !password.value || !confirmPassword.value) {
    error.value = "All fields are required.";
    toastType.value = "error";
    toastMessage.value = "All fields are required.";
    return;
  }

  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match.";
    toastType.value = "error";
    toastMessage.value = "Passwords do not match.";
    return;
  }

  const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
  if (users.find(u => u.email === email.value)) {
    error.value = "User already exists.";
    toastType.value = "error";
    toastMessage.value = "User already exists.";
    return;
  }

  users.push({ email: email.value, password: password.value });
  localStorage.setItem("ticketapp_users", JSON.stringify(users));

  toastType.value = "success";
  toastMessage.value = "Account created successfully! Redirecting to login...";

  setTimeout(() => router.push("/auth/login"), 1500);
};
</script>
