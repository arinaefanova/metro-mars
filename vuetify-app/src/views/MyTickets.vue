<template>
  <div class="content-container">
    <v-sheet class="blur-sheet" min-height="70vh" rounded="lg" elevation="3">
      <div class="d-flex align-center justify-center">
        <h1>My tickets</h1>
      </div>
      <div class="table-container">
        <v-table class="custom-table" :headers="tableHeaders" :items="userTickets">
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-center" v-for="header in tableHeaders" :key="header.value">
                {{ header.text }}
              </th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center" v-for="ticket in userTickets" :key="ticket.id">
              <td v-for="(header, index) in tableHeaders" :key="header.value">
                <template v-if="header.value === 'ticketDate'">
                  {{ formatDate(ticket.ticketDate) }}
                </template>
                <template v-else>
                  {{ ticket[header.value] }}
                </template>
              </td>
            </tr>
            </tbody>
          </template>
        </v-table>
      </div>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { useTicketStore } from '@/store/ticket';
import { onMounted, ref } from 'vue';
import { Ticket } from "@/model/Ticket";
import router from "@/router";

const authStore = useAuthStore();
const ticketStore = useTicketStore();

const tableHeaders = [
  { text: "Ticket ID", value: "id" },
  { text: "Price", value: "price" },
  { text: "Date", value: "ticketDate" },
];

const user = ref(authStore.user);
const userId = ref(user.value?.id || -2);
const userTickets = ref<Ticket[]>([]);

const fetchAllTickets = async () => {
  try {
    userTickets.value = await ticketStore.getTicketsForUser(userId.value);
  } catch (error) {
    await router.push('/error?param1=' + error);
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const padZero = (value: number) => {
  return value.toString().padStart(2, "0");
};

onMounted(() => {
  fetchAllTickets();
});
</script>

<style scoped>
@import '../assets/animations.css';
@import '../assets/general.css';

.content-container {
  animation: fade-in 0.5s;
}

.table-container {
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
}

.custom-table {
  background-color: transparent;
}

.custom-table td,
.custom-table th {
  color: white;
}

.custom-table thead th {
  color: #d4bba4 !important;
}

</style>
