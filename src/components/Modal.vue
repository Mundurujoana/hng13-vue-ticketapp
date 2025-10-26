<!-- src/components/Modal.vue -->
<template>
  <div v-if="isOpen" class="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative">
      <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
      >
        ✕
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean;
  title: string;
}>();

defineEmits<{
  (e: 'close'): void;
}>();
</script>
