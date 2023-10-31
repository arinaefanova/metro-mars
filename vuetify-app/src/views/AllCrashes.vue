<template>
<div class="content-container">
<v-sheet
  class="blur-sheet"
  min-height="70vh"
  rounded="lg"
  elevation="3"
>
  <div class="d-flex align-center justify-center">
    <h1>All crashes</h1>
  </div>
  <div class="add-button-container d-flex justify-end mr-5">
    <v-btn @click="openAddDialog" color="#333333" size="large" rounded="xl" outlined>Add Crash</v-btn>
  </div>
  <div class="table-container">
    <v-table
      class="custom-table"
      :headers="tableHeaders"
      :items="crashes"
  >
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-center" v-for="header in tableHeaders" :key="header.value">
          {{ header.text }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="text-center" v-for="crash in crashes" :key="crash.id">
        <td v-for="header in tableHeaders" :key="header.value">
          <template v-if="header.value === 'is_working'">
      <span v-if="crash[header.value] === 0" class="not-working-text">
        not
      </span>
            <span v-else>
        {{ crash[header.value] }}
      </span>
          </template>
          <template v-else>
            {{ crash[header.value] }}
          </template>
        </td>
        <td>
          <v-icon class="delete-icon" @click="deleteCrash(crash.id)">
            mdi-wrench
          </v-icon>
        </td>
      </tr>
      </tbody>
    </template>
  </v-table>
  </div>
</v-sheet>
</div>

  <v-dialog v-model="deleteConfirmationDialog" max-width="500px">
    <v-card class="dark-card">
      <v-card-title class="dark-text text-center">Confirmation of deletion</v-card-title>
      <v-card-text class="dark-text text-center">Do you confirm that this accident has been resolved?</v-card-text>
      <v-card-actions class="text-center justify-center">
        <v-btn text @click="deleteCrashConfirmation" class="dark-text">Yes</v-btn>
        <v-btn text @click="cancelDeleteCrash" class="dark-text">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="addDialog" max-width="500px">
    <v-card class="dark-card">
      <v-card-title class="dark-text text-center">Add Crash</v-card-title>
      <v-card-text class="dark-text text-center">
        <v-select
          v-model="selectedStation"
          :items="stations"
          item-title="name"
          item-value="id"
          label="Select Station"
          outlined
        ></v-select>
      </v-card-text>
      <v-card-actions class="text-center justify-center">
        <v-btn text @click="closeAddDialog">Cancel</v-btn>
        <v-btn text @click="handleAddCrash" color="primary">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {useStationStore} from "@/store/station";
import {onMounted, ref} from "@vue/runtime-core";
import router from "@/router";

const stationStore = useStationStore();

const tableHeaders = [
  { text: "Name", value: "name" },
  { text: "Metro line", value: "metro_line" },
  { text: "Is working", value: "is_working" }
];

const crashes = ref([]);
const addDialog = ref(false);
const selectedStation = ref(null);
const stations = ref([]);


const openAddDialog = () => {
  addDialog.value = true;
};

const closeAddDialog = () => {
  addDialog.value = false;
  selectedStation.value = null;
};

const handleAddCrash = async () => {
  if (selectedStation.value) {
    try {
      await stationStore.addCrash(selectedStation.value);
      closeAddDialog();
      await getAllCrashes();
      await fetchWorkingStations();
    } catch (error) {
      console.error("Error adding crash:", error);
    }
  } else {
    console.error("No station selected");
  }
};

const deleteCrash = (crashId: number) => {
  deleteConfirmationDialog.value = true;
  deleteConfirmationCrashId.value = crashId;
};

const deleteConfirmationDialog = ref(false);
const deleteConfirmationCrashId = ref(0);

const deleteCrashConfirmation = async () => {
  try {
    await stationStore.deleteCrash(deleteConfirmationCrashId.value);
    deleteConfirmationDialog.value = false;
    await getAllCrashes();
  } catch (error) {
    console.error("Error deleting crash:", error);
  }
};
const cancelDeleteCrash = () => {
  deleteConfirmationDialog.value = false;
  deleteConfirmationCrashId.value = 0;
};

const getAllCrashes = async () => {
  try {
    const fetchedCrashes = await stationStore.getAllCrashes();
    crashes.value = fetchedCrashes;
  } catch (error) {
    await router.push('/error?param1=' + error);
  }
};

const fetchWorkingStations = async () => {
  try {
    const fetchedStations = await stationStore.getAllWorkingStations();
    stations.value = fetchedStations;
  } catch (error) {
    console.error("Error retrieving stations:", error);
  }
};

onMounted(() => {
  fetchWorkingStations();
  getAllCrashes();
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
.not-working-text {
  color: red;
}

.dark-card {
  background-color: #333333;
}

.dark-text {
  color: #ffffff;
}

</style>
