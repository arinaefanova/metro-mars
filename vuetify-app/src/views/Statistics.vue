<template>
  <div class="content-container">
    <v-sheet
      class="blur-sheet"
      min-height="70vh"
      rounded="lg"
      elevation="3"
    >
      <div class="d-flex align-center justify-center">
        <h1>All Statistics</h1>
      </div>

      <div class="text-center mt-10">
        <div>
          Number of all registered users: {{ countUsers }}
        </div>
        <div>
          Number of all metro stations: {{ countStations }}
        </div>
        <div>
          Number of crashes now: {{ countCrashes }}
        </div>
        <div>
          Number of all tickets sold: {{ countTickets }}
        </div>
        <div>
          Number of all tickets sold today: {{ countTodayTickets }}
        </div>
      </div>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { useStatisticsStore } from '@/store/statistics';
import { onMounted, ref } from "vue";
import router from "@/router";

const statisticsStore = useStatisticsStore();

const countUsers = ref(0);
const countTickets = ref(0);
const countTodayTickets = ref(0);
const countStations = ref(0);
const countCrashes = ref(0);

const updateStatistics = async () => {
  try {
    countUsers.value = await statisticsStore.getAllUsers();
    countTickets.value = await statisticsStore.getAllTickets();
    countTodayTickets.value = await statisticsStore.getTodayTickets();
    countStations.value = await statisticsStore.getAllStations();
    countCrashes.value = await statisticsStore.getAllCrashes();
  } catch (error) {
    await router.push('/error?param1=' + error);

  }
}
onMounted(() => {
  updateStatistics();
});
</script>

<style scoped>
@import '../assets/animations.css';
@import '../assets/general.css';

.content-container {
  animation: fade-in 0.5s;
}

</style>
