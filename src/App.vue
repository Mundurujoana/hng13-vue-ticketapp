<template>
  <Motion
    :initial="{ opacity: 0, scale: 0.98 }"
    :enter="{ opacity: 1, scale: 1 }"
    :transition="{ duration: 0.6, ease: 'easeOut' }"
  >
    <RouterView />
  </Motion>
</template>


<script setup>
// No script logic is needed here because routing is handled by vue-router
</script>

<style>
/* Optional: global styles can go here, but we mostly use Tailwind */
</style>
