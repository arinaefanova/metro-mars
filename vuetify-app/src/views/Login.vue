<template>
  <div class="content-container">
    <v-sheet
      class="blur-sheet"
      min-height="60vh"
      rounded="lg"
      elevation="3"
    >
      <h1 class="text-center mt-10">LOGIN</h1>

      <v-form @submit.prevent="login">
        <v-container>
          <v-row class="d-flex align-center justify-center mt-3">
              <v-text-field
                class="textField"
                autocomplete="off"
                prepend-inner-icon="mdi-email-outline"
                v-model="state.email"
                :rules="emailRules"
                label="E-mail"
                required
                variant="underlined"
              ></v-text-field>
          </v-row>
          <v-row class="d-flex align-center justify-center">
              <v-text-field
                class="textField"
                autocomplete="off"
                :append-inner-icon="state.visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="state.visible ? 'text' : 'password'"
                v-model="state.password"
                :rules="passwordRules"
                label="Password"
                required
                variant="underlined"
                @click:append-inner="state.visible = !state.visible"
              ></v-text-field>
          </v-row>
          <v-row class="text-center mt-10">
            <v-col>
              <v-btn size="x-large" class="button" type="submit" rounded="xl" elevation="8" variant="outlined">
                LOGIN
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-sheet>
  </div>

  <v-snackbar
    v-model="state.snackbarVisible"
    :color="state.snackbarColor"
    timeout="3000" show-close
  >
    {{ state.snackbarMessage }}
  </v-snackbar>

</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const state = reactive({
  email: '',
  password: '',
  error: '',
  snackbarVisible: false,
  snackbarMessage: '',
  snackbarColor: '',
});

const emailRules = computed(() => [
  (value:string) => !!value || 'E-mail is required.',
  (value:string) => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
]);

const passwordRules = computed(() => [
  (value:string) => !!value || 'Password is required.',
]);

const login = async () => {
  const { error } = await authStore.login(
    state.email, state.password);

  if (error) {
    state.error = error;
    state.snackbarVisible = true;
    state.snackbarColor='red';
    state.snackbarMessage = 'Unsuccessful login. Error: ' + state.error;
  } else {
    await router.push('/');
  }
};
</script>

<style scoped>
@import '../assets/animations.css';
@import '../assets/general.css';

.content-container {
  animation: fade-in 0.5s;
}

.textField {
  max-width: 400px;
}



</style>

