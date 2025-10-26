<template>
  <div class="relative min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800 overflow-hidden">
    
    <!-- Background Blobs -->
    <div
      class="absolute top-[-120px] left-[-100px] w-[400px] h-[400px] bg-blue-300 rounded-full blur-3xl opacity-40 mix-blend-multiply animate-spin-slow pointer-events-none transform scale-0 transition-transform duration-1000"
      :class="{ 'scale-100': loaded }"
    ></div>

    <div
      class="absolute bottom-[-150px] right-[-80px] w-[350px] h-[350px] bg-purple-300 rounded-full blur-3xl opacity-30 mix-blend-multiply animate-spin-slow-reverse pointer-events-none transform scale-0 transition-transform duration-1000"
      :class="{ 'scale-100': loaded }"
    ></div>

    <!-- Navbar -->
    <Navbar />

    <!-- Main Content -->
    <main class="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-10 relative z-10">

      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p class="text-gray-600 mt-1 text-sm">Manage and monitor all your tickets at a glance.</p>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div
          v-for="(stat, idx) in stats"
          :key="idx"
          class="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition transform hover:scale-105 flex flex-col items-center text-center"
        >
          <component :is="stat.icon" :class="`${stat.color} mb-3`" size="28" />
          <h2 class="text-sm font-semibold text-gray-500">{{ stat.title }}</h2>
          <p :class="`text-3xl font-bold mt-1 ${stat.color}`">{{ stat.value }}</p>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row justify-between items-center gap-4 transition transform opacity-0 translate-y-5" :class="{ 'opacity-100 translate-y-0': loaded }">
        <div>
          <h2 class="text-lg font-semibold">Quick Actions</h2>
          <p class="text-gray-500 text-sm">Create or manage tickets with one click.</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <RouterLink
            to="/tickets"
            class="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition font-medium"
          >
            Manage Tickets
          </RouterLink>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import { BarChart3, ClipboardList, CheckCircle } from "lucide-vue-next";

const tickets = ref([]);
const loaded = ref(false);

onMounted(() => {
  tickets.value = JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]");
  setTimeout(() => loaded.value = true, 50); // trigger animations
});

const totalTickets = computed(() => tickets.value.length);
const openTickets = computed(() => tickets.value.filter(t => t.status === "open").length);
const closedTickets = computed(() => tickets.value.filter(t => t.status === "closed").length);
const inProgress = computed(() => tickets.value.filter(t => t.status === "in_progress").length);

const stats = [
  { title: "Total Tickets", value: totalTickets, icon: ClipboardList, color: "text-blue-600" },
  { title: "In Progress", value: inProgress, icon: BarChart3, color: "text-yellow-500" },
  { title: "Open Tickets", value: openTickets, icon: CheckCircle, color: "text-green-600" },
  { title: "Closed Tickets", value: closedTickets, icon: CheckCircle, color: "text-gray-500" },
];
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
