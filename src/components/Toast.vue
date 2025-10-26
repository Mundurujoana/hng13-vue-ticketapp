<template>
  <transition
    name="toast-fade"
    appear
  >
    <div
      v-if="visible"
      class="fixed top-3 left-1/2 transform -translate-x-1/2 z-50 w-[90%] sm:w-auto max-w-sm shadow-2xl rounded-lg sm:rounded-xl px-4 sm:px-6 py-3 bg-black text-white border border-gray-700"
    >
      <div
        class="flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-start gap-2 sm:gap-3 font-medium text-sm sm:text-base text-center sm:text-left"
      >
        <span
          :class="[
            'text-lg',
            type === 'success' ? 'text-green-400' : 'text-red-500'
          ]"
        >
          {{ type === 'success' ? '✔' : '✖' }}
        </span>
        <p class="break-words">{{ message }}</p>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

const props = defineProps({
  message: String,
  type: {
    type: String,
    default: "success",
  },
  onClose: Function,
});

const visible = ref(true);
let timer = null;

watch(
  () => props.message,
  (newVal) => {
    if (newVal) {
      visible.value = true;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        visible.value = false;
        props.onClose && props.onClose();
      }, 2500);
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
});
</script>

<style scoped>
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.4s ease-in-out;
}
.toast-fade-enter-from,
.toast-fade-leave-to {
  transform: translateY(-100px);
  opacity: 0;
}
.toast-fade-enter-to,
.toast-fade-leave-from {
  transform: translateY(30px);
  opacity: 1;
}
</style>
