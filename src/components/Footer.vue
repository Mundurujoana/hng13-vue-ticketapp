<template>
  <footer class="bg-white shadow-inner mt-12">
    <div class="max-w-[1440px] mx-auto px-6 py-6 text-center text-gray-600 text-sm">
      &copy; {{ currentYear }} TicketApp. All rights reserved.
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

// Get current year dynamically
const currentYear = ref(new Date().getFullYear())
</script>
