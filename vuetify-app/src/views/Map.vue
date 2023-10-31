<template>
  <div class="content-container">
    <v-sheet
      class="blur-sheet"
      min-height="50vh"
      min-width="110vh"
      rounded="lg"
      elevation="3"
    >
      <v-img
        class="ml-4"
        src="/public/vector.png"
        alt="Metro map"
        width="800"
        height="500"
        :contain="true"
      ></v-img>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
@import '../assets/animations.css';
@import '../assets/general.css';

.content-container {
  animation: fade-in 0.5s;
}

</style>
