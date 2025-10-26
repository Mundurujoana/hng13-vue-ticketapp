<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Navbar />

    <main class="flex-grow w-full flex flex-col items-center px-4 sm:px-6 lg:px-12 py-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-center w-full max-w-6xl mb-8 gap-4">
        <h1 class="text-3xl font-bold text-center sm:text-left text-gray-800">
          Ticket Management
        </h1>
        <div class="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search tickets..."
            v-model="search"
            class="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            @click="openModalForCreate"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + New Ticket
          </button>
        </div>
      </div>

      <!-- Ticket Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        <div
          v-for="ticket in filteredTickets"
          :key="ticket.id"
          class="bg-white p-6 rounded-xl shadow-md flex flex-col gap-3 hover:shadow-xl transition"
        >
          <h2 class="text-lg font-semibold">{{ ticket.title }}</h2>
          <p v-if="ticket.description" class="text-gray-600">{{ ticket.description }}</p>
          <span
            class="inline-block px-3 py-1 rounded-full text-sm"
            :class="getStatusColor(ticket.status)"
          >
            {{ ticket.status.replace('_', ' ').toUpperCase() }}
          </span>
          <div class="flex gap-2 mt-4">
            <button
              @click="openModalForEdit(ticket)"
              class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition text-sm flex-1"
            >
              Edit
            </button>
            <button
              @click="openDeleteModal(ticket)"
              class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm flex-1"
            >
              Delete
            </button>
          </div>
        </div>

        <p v-if="filteredTickets.length === 0" class="text-gray-500 col-span-full text-center">
          No tickets found.
        </p>
      </div>
    </main>

    <!-- Floating Quick Action -->
    <div ref="quickRef" class="fixed bottom-32 right-8 z-50 flex flex-col items-end gap-3">
      <transition name="fade-slide">
        <div v-if="quickOpen" class="bg-gray-900 text-white px-5 py-3 rounded-lg shadow-lg font-medium text-center w-40 sm:w-48">
          <router-link to="/dashboard">Go to Dashboard</router-link>
        </div>
      </transition>

      <button
        @click="quickOpen = !quickOpen"
        class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-4xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-transform transform"
        :class="quickOpen ? 'rotate-45' : 'rotate-0'"
      >
        +
      </button>
    </div>

    <!-- Create/Edit Modal -->
    <Modal
      :isOpen="modalOpen"
      :title="selectedTicket ? 'Edit Ticket' : 'Create New Ticket'"
      @close="modalOpen = false"
    >
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          v-model="title"
          class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
        />
        <textarea
          placeholder="Description (optional)"
          v-model="description"
          class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
        />
        <select
          v-model="status"
          class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
        >
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full">
          {{ selectedTicket ? 'Update Ticket' : 'Create Ticket' }}
        </button>
      </form>
    </Modal>

    <!-- Confirm Delete Modal -->
    <Modal
      :isOpen="confirmDeleteModalOpen"
      title="Confirm Deletion"
      @close="confirmDeleteModalOpen = false"
    >
      <div class="text-center space-y-4">
        <p class="text-gray-700 text-lg">Are you sure you want to delete this ticket?</p>
        <div class="flex justify-center gap-4 mt-6">
          <button @click="confirmDeleteModalOpen = false" class="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
            Cancel
          </button>
          <button @click="confirmDelete" class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
            Yes, Delete
          </button>
        </div>
      </div>
    </Modal>

    <Toast v-if="toast" :message="toast.message" :type="toast.type" @close="toast = null" />

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import Toast from "../components/Toast.vue";
import Modal from "../components/Modal.vue";
import { useRoute, useRouter } from "vue-router";

type TicketStatus = "open" | "in_progress" | "closed";

interface Ticket {
  id: number;
  title: string;
  description?: string;
  status: TicketStatus;
}

// State
const tickets = ref<Ticket[]>([]);
const search = ref("");
const selectedTicket = ref<Ticket | null>(null);
const modalOpen = ref(false);
const confirmDeleteModalOpen = ref(false);
const toast = ref<{ message: string; type?: "success" | "error" } | null>(null);
const quickOpen = ref(false);

// Form state
const title = ref("");
const description = ref("");
const status = ref<TicketStatus>("open");

// Load tickets
onMounted(() => {
  tickets.value = JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]");
});

// Save tickets
const saveTickets = (newTickets: Ticket[]) => {
  localStorage.setItem("ticketapp_tickets", JSON.stringify(newTickets));
  tickets.value = newTickets;
};

// Reset form
const resetForm = () => {
  title.value = "";
  description.value = "";
  status.value = "open";
  selectedTicket.value = null;
};

// Open modals
const openModalForCreate = () => {
  resetForm();
  modalOpen.value = true;
};

const openModalForEdit = (ticket: Ticket) => {
  selectedTicket.value = ticket;
  title.value = ticket.title;
  description.value = ticket.description || "";
  status.value = ticket.status;
  modalOpen.value = true;
};

const openDeleteModal = (ticket: Ticket) => {
  selectedTicket.value = ticket;
  confirmDeleteModalOpen.value = true;
};

// Submit form
const handleSubmit = () => {
  if (!title.value.trim()) {
    toast.value = { message: "Title is required.", type: "error" };
    return;
  }

  if (selectedTicket.value) {
    const updatedTickets = tickets.value.map((t) =>
      t.id === selectedTicket.value!.id ? { ...t, title: title.value, description: description.value, status: status.value } : t
    );
    saveTickets(updatedTickets);
    toast.value = { message: "Ticket updated successfully!", type: "success" };
  } else {
    const newTicket: Ticket = {
      id: Date.now(),
      title: title.value,
      description: description.value,
      status: status.value,
    };
    saveTickets([...tickets.value, newTicket]);
    toast.value = { message: "Ticket created successfully!", type: "success" };
  }

  resetForm();
  modalOpen.value = false;
};

// Confirm delete
const confirmDelete = () => {
  if (!selectedTicket.value) return;
  const updatedTickets = tickets.value.filter((t) => t.id !== selectedTicket.value!.id);
  saveTickets(updatedTickets);
  toast.value = { message: "Ticket deleted successfully!", type: "success" };
  confirmDeleteModalOpen.value = false;
};

// Status color
const getStatusColor = (status: TicketStatus) => {
  switch (status) {
    case "open":
      return "bg-green-100 text-green-700";
    case "in_progress":
      return "bg-amber-100 text-amber-700";
    case "closed":
      return "bg-gray-100 text-gray-700";
  }
};

// Computed filtered tickets
const filteredTickets = computed(() =>
  tickets.value.filter(
    (t) =>
      t.title.toLowerCase().includes(search.value.toLowerCase()) ||
      (t.description && t.description.toLowerCase().includes(search.value.toLowerCase()))
  )
);

// Floating button ref
const quickRef = ref<HTMLDivElement | null>(null);
</script>

<style>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
