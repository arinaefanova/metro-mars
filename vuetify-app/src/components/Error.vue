<template>
  <div class="content-container">
    <v-sheet
      class="blur-sheet text-center"
      min-height="60vh"
      rounded="lg"
      elevation="3"
    >
    <div class="d-flex flex-column align-center justify-center">
      <h2>{{ param1 }}</h2>
      <p>The page you are looking for does not exist.</p>
      <p> <router-link :to="{ name: 'Home' }">Go home</router-link> </p>
    </div>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import { useRoute } from "vue-router";

const param1 = ref('') as Ref<string>;

onMounted(() => {
  param1.value = (useRoute().query.param1 ?? '') as string;
});
</script>


<style scoped>
@import '../assets/animations.css';
@import '../assets/general.css';

h2 {
  font-size: 3rem;
  color: red;
}
.text-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content-container {
  animation: fade-in 0.5s;
}

</style>
