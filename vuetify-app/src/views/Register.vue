<template>
  <div class="content-container">
    <v-sheet
      class="blur-sheet"
      min-height="60vh"
      rounded="lg"
      elevation="3"
    >
      <h1 class="text-center">Register</h1>

        <v-form @submit.prevent="register">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                autocomplete="off"
                prepend-inner-icon="mdi-email-outline"
                v-model="state.email"
                :rules="emailRules"
                label="E-mail"
                required
                variant="underlined"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                autocomplete="off"
                v-model="state.firstname"
                :rules="nameRules"
                :counter="10"
                label="First name"
                required
                variant="underlined"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                autocomplete="off"
                v-model="state.lastname"
                :rules="nameRules"
                :counter="10"
                label="Last name"
                required
                variant="underlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
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
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                autocomplete="off"
                :append-inner-icon="state.visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="state.visible ? 'text' : 'password'"
                v-model="state.passwordConfirm"
                :rules="passwordConfirmRules"
                label="Repeat Password"
                required
                variant="underlined"
                @click:append-inner="state.visible = !state.visible"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field type="date" label="Birthdate" v-model="state.birthdate"
                            :rules="birthdateRules" variant="underlined"></v-text-field>
            </v-col>
          </v-row>
          <v-row class="text-center">
            <v-col>
            <v-btn size="x-large" class="button" type="submit" rounded="xl" elevation="8"
                   variant="outlined" >
              REGISTER
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
  firstname: '',
  lastname: '',
  password: '',
  passwordConfirm: '',
  birthdate: '',
  error: '',
  snackbar: false,
  visible: false,
  snackbarVisible: false,
  snackbarMessage: '',
  snackbarColor: '',
});

const emailRules = computed(() => [
  (value:string) => !!value || 'E-mail is required.',
  (value:string) => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
]);

const nameRules = computed(() =>[
  (value:string) => !!value || 'Name is required.',
  (value:string) => value?.length <= 10 || 'Name must be less than 10 characters.',
]);

const passwordRules = computed(() => [
  (value:string) => !!value || 'Password is required.',
  (value:string) => value?.length >= 6 || 'Password must be at least 6 characters.',
]);

const passwordConfirmRules = computed(() => [
  (v: string) => !!v || 'Please confirm your password.',
  (v: string) => v === state.password || 'Passwords do not match.',
]);

const birthdateRules = computed(() => [
  (value:string) => !!value || 'Birthdate is required.',
  (value:string) => new Date(value) <= new Date() || 'Birthdate cannot be in the future.',
]);

const register = async () => {
  const birthdate = new Date(state.birthdate);

  const { error } = await authStore.register(
    state.email, state.firstname, state.lastname, state.password, birthdate
  );

  if (error) {
    state.snackbarVisible = true;
    state.snackbarMessage = 'Registration error: ' + error;
    state.snackbarColor = 'red';
  } else {
    await router.push('/user/login');
  }
};


</script>

<style scoped>
@import '../assets/animations.css';
@import '../assets/general.css';

.content-container {
  animation: fade-in 0.5s;
}

</style>
