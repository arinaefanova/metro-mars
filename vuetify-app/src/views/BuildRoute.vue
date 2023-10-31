<template>
  <div class="content-container">
    <v-sheet class="blur-sheet" min-height="70vh" rounded="lg" elevation="3">
      <div class="scroll">
        <div class="d-flex align-center justify-center">
          <h1>Build your route</h1>
        </div>

        <div class="d-flex align-center justify-center mt-4">
          <v-select
            class="ml-4 mr-4 fixed-width-select"
            :items="allStations"
            v-model="selectedStation1"
            label="Select Station 1"
            item-title="name"
            item-value="id"
          ></v-select>
          <v-select
            class="ml-4 mr-4 fixed-width-select"
            v-model="selectedStation2"
            :items="allStations"
            label="Select Station 2"
            item-title="name"
            item-value="id"
          ></v-select>
        </div>

        <div class="d-flex align-center justify-center mt-4">
          <v-btn
            size="large"
            class="button"
            rounded="xl"
            elevation="8"
            variant="outlined"
            @click="handleBuildRoute"
          >
            START
          </v-btn>
        </div>

        <div v-if="isDataLoaded" class="d-flex align-center justify-center mt-4 ml-5 mr-5">
          <p v-if="route && route.length > 0">{{ route }}</p>
          <p v-else>There is no connection between these stations at this time.</p>
        </div>

      </div>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { useStationStore } from "@/store/station";
import { ref, onMounted } from "vue";
import { Station } from "@/model/Station";

const stationStore = useStationStore();
const allStations = ref([]);
const selectedStation1 = ref<number | null>(null);
const selectedStation2 = ref<number | null>(null);
const route = ref<string | null>(null);
const isDataLoaded = ref(false);

onMounted(async () => {
  try {
    const fetchedStations = await stationStore.getAllStations();
    allStations.value = fetchedStations;
  } catch (error) {
    console.error("Error retrieving stations:", error);
  }
});

async function handleBuildRoute() {
  try {
    if (selectedStation1.value && selectedStation2.value) {
      const result = await stationStore.buildRoute(
        selectedStation1.value,
        selectedStation2.value
      );
      route.value = result
        ? result.map((station: Station) => station.name).join(" -> ")
        : "No route found";
      isDataLoaded.value = true;
    }
  } catch (error) {
    console.error("Error building route:", error);
  }
}
</script>

<style scoped>
@import '../assets/animations.css';
@import '../assets/general.css';

.content-container {
  animation: fade-in 0.5s;
}

.blur-sheet {
  max-height: 80vh;
}

.scroll {
  overflow-y: auto;
  max-height: calc(80vh - 56px);
}

.fixed-width-select {
  width: 200px;
}
</style>

