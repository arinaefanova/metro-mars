<template>
<v-app-bar
  class="no-box-shadow"
  dense
  flat
  color="transparent"
>

  <div class="logo-text ml-16 mt-5 d-flex align-center logo" @click="redirectToHome">
    <span class="material-symbols-outlined icon mr-2">conversion_path</span>
    <span class="logo-text">METRO MARS</span>
  </div>
<v-tabs
  justify="end"
  align-tabs="end"
  color="grey-darken-2"
  class="flex-grow-1"
>
  <v-tab
    v-for="link in links"
    :key="link.name"
    :to="link.route"
    active-class="v-tab--active"
    style="font-size: 18px;"
  >
      {{ link.name }}
  </v-tab>
</v-tabs>
</v-app-bar>
</template>

<script setup lang="ts">
import router from '../router';

const props = defineProps({
  isHovered: {
    type: Boolean,
    default: false,
  },
  activeTab: null,
});

const links = [
  { name: 'Buy ticket', route: '/ticket/buy' },
  { name: 'Map', route: '/map' },
  { name: 'Build a route', route: '/route' },
  { name: 'Station display', route: '/schedule' },
];

const redirectToHome = (): void => {
  router.push({ name: 'Home' });
};
</script>

<style scoped>

.no-box-shadow .v-app-bar__content {
  box-shadow: none !important;
}

:deep(.v-tab:not(.v-tab--active)) {
  color: #FFFFFF !important;
}

:deep(.v-tab:not(.v-tab--active):hover) {
  color: #d4bba4 !important;
}

.logo:hover {
  animation: pulse 1s ease-in-out infinite;
  cursor: pointer;
}

.logo-text {
  font-family: 'Bebas Neue', sans-serif;
  color: #FFFFFF;
  letter-spacing: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 55px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.icon {
  font-size: 50px;
  color: white;

}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

</style>
