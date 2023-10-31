<template>
  <div class="d-flex justify-center align-center fixed-height">
    <v-sheet class="d-flex align-center" color="transparent">

      <div class="content-container">
        <h1 class="big-header">START A NEW TRIP</h1>

        <v-btn size="x-large" class="button" rounded="xl" elevation="8" variant="outlined" to="/ticket/buy">
          BUY TICKET
        </v-btn>
        <div v-if="authStore.user == null">
        <v-btn size="x-large" class="button" rounded="xl" elevation="8" variant="outlined"
               prepend-icon="mdi-login-variant" to="/user/register">
          REGISTER
        </v-btn>
        </div>
        <div v-if="authStore.user == null">
          <v-btn size="x-large" class="button" rounded="xl" elevation="8" variant="outlined"
                 prepend-icon="mdi-login-variant" to="/user/login">
            LOGIN
          </v-btn>
        </div>
      </div>
    </v-sheet>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();

const showContent = ref(false);
const router = useRouter();

const startAnimation = (nextPage: string): void => {
  const homePage = document.querySelector('.home-page');
  if (homePage) {
    homePage.classList.add('fade-out');
  }
  setTimeout(() => {
    navigateToNextPage(nextPage);
  }, 500);
};

const navigateToNextPage = (nextPage: string): void => {
  router.push(nextPage);
};
</script>

<style scoped>
@import '../assets/animations.css';

.big-header{
  font-family: 'Bebas Neue', sans-serif;
  font-size: 60px;
  color: #FFFFFF;
  letter-spacing: 12px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Adjust the values as needed */

}

.button{
  background-color: #d4bba4;
  color: #1a1a1a;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 30px;
  letter-spacing: 12px;
}

.fixed-height {
  height: 600px;
}

.content-container {
  display: grid;
  grid-template-rows: auto;
  justify-items: center;
  align-items: center;
  gap: 20px;
  animation: fade-in 1s;
}

.background {
  background-image: url("public/background.jpg");
  background-size: cover;
  background-position: top left;
  animation: zoom-in 0.5s;
}

@keyframes zoom-in {
  from {
    transform: scale(1.2);
  }
  to {
    transform: scale(1);
  }
}


</style>
