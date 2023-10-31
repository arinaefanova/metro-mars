<template>
  <div class="content-container">
    <v-sheet
      class="blur-sheet"
      min-height="70vh"
      rounded="lg"
      elevation="3"
    >
      <div class="d-flex align-center justify-center">
        <h1>Station Display</h1>
      </div>

      <div class="d-flex align-center justify-center mt-4">
        <v-select
          class=" ml-4 mr-4 fixed-width-select"
          :items="allStations"
          v-model="selectedStation"
          label="Select Station"
          item-title="name"
          item-value="id"
        ></v-select>
      </div>
      <div class="d-flex align-center justify-center">
        <v-btn size="large" class="button" rounded="xl" elevation="8" variant="outlined" @click="getTimetable">
          Display
        </v-btn>
      </div>

      <div class="scroll">
        <div v-if="stationIsWork !== null && stationIsWork.is_working === 0" class="d-flex align-center justify-center mt-5">
          <p>Station doesn't work</p>
        </div>
        <div v-else-if="trainsFromSchedule.length !== 0 && trainsFromDb.length !== 0">
          <div class="d-flex align-center justify-center mt-5">
            <h1>Nearest trains:</h1>
          </div>
          <div v-for="(schedule, index) in trainsFromSchedule" :key="schedule.train_id" class="ml-5">
            <p>Train ID: {{ schedule?.schedule.train_id }}</p>
            <div v-if="trainsFromDb[index] && trainsFromDb[index].train">
              <p>
                Train from: {{ allStations.find(obj => obj.id === trainsFromDb[index].train.startStation).name }}
              </p>
              <p class="ml-16">
                To: {{ allStations.find(obj => obj.id === trainsFromDb[index].train.destinationStation).name }}
              </p>
            </div>
            <p>Time: {{ getTimeString(schedule?.schedule.time) }}</p>
          </div>
        </div>
        <div v-else>
        </div>
      </div>

    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, watch} from "vue";
import {useScheduleStore} from "@/store/schedule";
import {useStationStore} from "@/store/station";
import {Train} from "@/model/Train";
import {Schedule} from "@/model/Schedule";
const stationStore = useStationStore();
const scheduleStore = useScheduleStore();

const allStations = ref([]);
const selectedStation = ref<number | null>(null);
const trainsFromSchedule = ref<{ schedule: Schedule | null }[]>([]);
const trainsFromDb = ref<{ train: Train | null }[]>([]);

const getTimeString = (time: string) => {
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${padZero(hours)}:${padZero(minutes)}`;
};

const padZero = (value: number) => {
  return value.toString().padStart(2, "0");
};

const stationIsWork = ref<number>(0);

const fetchStationIsWork = async () => {
  try {
    stationIsWork.value = await stationStore.getIsWork(selectedStation.value ?? 0);
  } catch (error) {
    console.error("Error retrieving station work status:", error);
  }
};

watch(selectedStation, fetchStationIsWork);

const getTimetable = async () => {
  try {
    if (selectedStation.value !== null ) {
      const nearestTrains = await scheduleStore.getNearTrains(selectedStation.value);
      trainsFromSchedule.value = nearestTrains.map((schedule: Schedule) => ({ schedule }));

      trainsFromDb.value = [];

      for (let i = 0; i < trainsFromSchedule.value.length; i++) {
        let trainId = trainsFromSchedule.value[i]?.schedule?.train_id;
        if (typeof trainId === "number") {
          let train = await scheduleStore.getTrain(trainId);
          trainsFromDb.value.push({ train: train });
        }
      }
    }
  } catch (error) {
    console.error("Error retrieving timetable:", error);
  }
};

onMounted(async () => {
  try {
    const fetchedStations = await stationStore.getAllStations();
    allStations.value = fetchedStations;
  } catch (error) {
    console.error("Error retrieving stations:", error);
  }
});

</script>

<style scoped>
@import '../assets/animations.css';
@import '../assets/general.css';

.content-container {
  animation: fade-in 0.5s;
}

.scroll {
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 50vh;
}

</style>
