<template>
  <div class="relative w-screen min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col justify-between">

    <!-- Decorative Blobs -->
    <img :src="blob" alt="Blob" class="absolute top-[-150px] left-[-150px] w-[450px] h-[450px] opacity-40 mix-blend-multiply pointer-events-none"
         v-motion="{ initial: { scale: 0 }, enter: { scale: 1 }, animate: { scale: [1, 1.1, 1], transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' } } }" />
    <img :src="blob1" alt="Blob 1" class="absolute bottom-[-120px] right-[-150px] w-[400px] h-[400px] opacity-35 mix-blend-multiply pointer-events-none"
         v-motion="{ initial: { scale: 0 }, enter: { scale: 1 }, animate: { scale: [1, 1.08, 1], transition: { duration: 10, repeat: Infinity, ease: 'easeInOut' } } }" />
    <img :src="blob2" alt="Blob 2" class="absolute top-1/3 right-[-100px] w-[350px] h-[350px] opacity-30 mix-blend-multiply pointer-events-none"
         v-motion="{ initial: { scale: 0 }, enter: { scale: 1 }, animate: { scale: [1, 1.07, 1], transition: { duration: 9, repeat: Infinity, ease: 'easeInOut' } } }" />
    <img :src="blob3" alt="Blob 3" class="absolute bottom-1/3 left-[-120px] w-[300px] h-[300px] opacity-25 mix-blend-multiply pointer-events-none"
         v-motion="{ initial: { scale: 0 }, enter: { scale: 1 }, animate: { scale: [1, 1.05, 1], transition: { duration: 11, repeat: Infinity, ease: 'easeInOut' } } }" />

    <!-- Extra Hero Circle -->
    <div class="absolute top-20 right-1/4 w-24 h-24 bg-pink-300 rounded-full opacity-30 mix-blend-multiply pointer-events-none animate-spin-slow-reverse"></div>

    <!-- Hero Section -->
    <section class="relative flex flex-col justify-center items-center flex-grow max-w-[1440px] mx-auto px-6 text-center z-10">
      <h1 v-motion="{ initial: { y: -50, opacity: 0 }, enter: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } } }"
          class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight max-w-3xl">
        Welcome to TicketApp
      </h1>
      <p v-motion="{ initial: { y: -20, opacity: 0 }, enter: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.7, ease: 'easeOut' } } }"
         class="text-base sm:text-lg md:text-xl text-gray-700 mb-10 max-w-2xl">
        Manage, track, and resolve tickets efficiently — all in one place.
      </p>
      <div v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.7 } } }"
           class="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-sm">
        <RouterLink to="/auth/login"
                    class="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:scale-105 transition-transform duration-300 font-medium shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300">
          Login
        </RouterLink>
        <RouterLink to="/auth/signup"
                    class="w-full sm:w-auto border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 hover:scale-105 transition-all duration-300 font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-200">
          Get Started
        </RouterLink>
      </div>
    </section>

    <!-- Feature Section -->
    <section class="relative max-w-[1440px] mx-auto px-6 py-16 z-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl hover:scale-105 transition transform">
          <img :src="createIcon" alt="Create Tickets" class="w-16 h-16 mb-4">
          <h3 class="font-semibold text-lg mb-2">Create Tickets</h3>
          <p class="text-gray-600">Easily create tickets with title, description, and status fields.</p>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl hover:scale-105 transition transform">
          <img :src="trackIcon" alt="Track Tickets" class="w-16 h-16 mb-4">
          <h3 class="font-semibold text-lg mb-2">Track Tickets</h3>
          <p class="text-gray-600">Monitor ticket progress and status at a glance.</p>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl hover:scale-105 transition transform">
          <img :src="resolveIcon" alt="Resolve Tickets" class="w-16 h-16 mb-4">
          <h3 class="font-semibold text-lg mb-2">Resolve Tickets</h3>
          <p class="text-gray-600">Mark tickets as resolved and maintain a clean workflow.</p>
        </div>
      </div>
    </section>

    <!-- Wave SVG at Bottom -->
    <img :src="wave" alt="Wave background"
         v-motion="{ initial: { y: 50, opacity: 0 }, enter: { y: 0, opacity: 1, transition: { duration: 1 } } }"
         class="absolute bottom-0 left-0 w-full pointer-events-none" />

    <Footer />
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import Footer from "../components/Footer.vue";

import blob from "../assets/blob.svg";
import blob1 from "../assets/blob1.svg";
import blob2 from "../assets/blob2.svg";
import blob3 from "../assets/blob3.svg";
import wave from "../assets/wave.svg";

// PNG icons
import createIcon from "../assets/create.png";
import trackIcon from "../assets/track.png";
import resolveIcon from "../assets/resolve.png";
</script>

<style>
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow { animation: spin-slow 20s linear infinite; }

@keyframes spin-slow-reverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}
.animate-spin-slow-reverse { animation: spin-slow-reverse 20s linear infinite; }
</style>
