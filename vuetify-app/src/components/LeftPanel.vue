<template>

  <v-navigation-drawer
    expand-on-hover
    rail
    class="dark-drawer"
  >
    <v-list>
      <v-list-item
        prepend-avatar="https://cdn-icons-png.flaticon.com/512/6530/6530901.png"
        :title="authStore.user.first_name + ' ' + authStore.user.last_name"
        :subtitle="authStore.user.email"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-account-cog" title="My Profile" to="/user/" ></v-list-item>
      <v-list-item prepend-icon="mdi-ticket-confirmation-outline" title="My Tickets" to="/ticket/all-my" ></v-list-item>
      <v-list-item v-if="authStore.hasUserRole(1)" prepend-icon="mdi-account-multiple" title="User roots" to="/user/roots/"></v-list-item>
      <v-list-item v-if="authStore.hasUserRole(2)" prepend-icon="mdi-account-cash" title="Sell a ticket" to="/ticket/sell"></v-list-item>
      <v-list-item v-if="authStore.hasUserRole(1)" prepend-icon="mdi-chart-bar" title="Statistics"  to="/statistics"></v-list-item>
      <v-list-item v-if="authStore.hasUserRole(3)" prepend-icon="mdi-subway-alert-variant" title="All crashes" to="/station/crashes"></v-list-item>

    </v-list>

    <template v-slot:append>
      <v-list density="compact" nav class="pa-2">
        <v-list-item prepend-icon="mdi-logout-variant" @click="logout" title="Logout" value="logout"></v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>

</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const logout = async () => {
  await authStore.logout();
  await router.push('/');
};

</script>

<style scoped>
.dark-drawer {
  background-color: #1a1a1a;
  color: #ffffff;
}

</style>
