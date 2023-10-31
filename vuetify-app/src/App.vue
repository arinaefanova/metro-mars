<template>
  <v-app id="inspire">
    <div class="background-image-container">
      <div class="background-image">

        <div v-if="authStore.user != null">
        <LeftPanel></LeftPanel>
        </div>

        <Header></Header>

        <v-main style="position: relative; height: 100%;">
          <v-container style="position: relative; height: 100%;">
            <v-row class="d-flex">
          <v-col
            cols="12"
            sm="2"
          >
          </v-col>

          <v-col
            cols="12"
            sm="8"
          >
            <router-view></router-view>
          </v-col>

          <v-col
            cols="12"
            sm="2"
          >
          </v-col>
        </v-row>
      </v-container>
    </v-main>
        </div>
      </div>
  </v-app>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import LeftPanel from './components/LeftPanel.vue';
import { onMounted } from "vue";

import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  authStore.reloadUser();
});

</script>

<style scoped>

.background-image-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #000000;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/background.jpg');
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  object-fit: cover;
}

@media (max-width: 1023px) {
  .background-image {
    background-image: url('/background-mobile.jpg');
  }
}


</style>

