<template>
  <div class="content-container">
    <v-sheet
      class="blur-sheet text-center"
      min-height="78vh"
      rounded="lg"
      elevation="3"
    >

      <div class="d-flex align-center justify-center">
        <h1>Your profile: </h1>
      </div>
      <div  >
        <h3 class="mb-5">{{ user.first_name }} {{ user.last_name }}</h3>
        <p> <v-text-field class="myField" :model-value="user.email"  label="Email"
                          variant="outlined" readonly density="compact"> </v-text-field> </p>
        <p> <v-text-field class="myField" :model-value="formattedBirthdate" label="Date of birth"
                          variant="outlined" readonly density="compact"> </v-text-field> </p>
        <p> <v-text-field class="myField" :model-value="role"  label="Role"
                          variant="outlined" readonly density="compact"> </v-text-field> </p>
        <p> <v-text-field class="myField" :model-value="getYesNoValue(user.is_child)"  label="Is child?"
                          variant="outlined" readonly density="compact"> </v-text-field> </p>
        <p> <v-text-field class="myField" :model-value="getYesNoValue(user.is_pensioner)"  label="Is pensioner?"
                          variant="outlined" readonly density="compact"> </v-text-field> </p>

        <p><v-row class="d-flex align-center justify-center mt-1">
          <v-btn  class="buttonSmall" size="large" rounded="xl" @click="openPasswordDialog"
                  type="submit" elevation="8" variant="outlined">
            change password
          </v-btn>
        </v-row> </p>
      </div>
    </v-sheet>
  </div>

  <v-dialog v-model="showPasswordDialog" max-width="500">
    <v-card class="dark-card">
      <v-card-title class=" dark-text text-center headline">Enter a new password</v-card-title>
      <v-card-text class="dark-text text-center">
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
        <v-text-field
          :append-inner-icon="state.visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="state.visible ? 'text' : 'password'"
          v-model="state.passwordConfirm"
          :rules="passwordConfirmRules"
          label="Repeat Password"
          required
          variant="underlined"
          @click:append-inner="state.visible = !state.visible"
        ></v-text-field>
      </v-card-text>
      <v-card-actions class="text-center justify-center">
        <v-btn color="primary"  @click="cancelPasswordUpdate">Cancel</v-btn>
        <v-btn color="primary" @click="confirmPasswordUpdate">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

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
import { useUserStore } from '@/store/user';
import {computed, onMounted, reactive, ref} from 'vue';

const authStore = useAuthStore();
const userStore = useUserStore();
const user = authStore.user;
const showPasswordDialog = ref(false);
const roleId = ref(user?.role_id || -2);
const role = ref(null);


const state = reactive({
  password: '',
  passwordConfirm: '',
  visible: false,
  snackbarVisible: false,
  snackbarMessage: '',
  snackbarColor: '',
});

function openPasswordDialog() {
  showPasswordDialog.value = true;
}
function cancelPasswordUpdate() {
  showPasswordDialog.value = false;
}

const passwordRules = computed(() => [
  (value:string) => !!value || 'Password is required.',
  (value:string) => value?.length >= 6 || 'Password must be at least 6 characters.',
]);

const passwordConfirmRules = computed(() => [
  (v: string) => !!v || 'Please confirm your password.',
  (v: string) => v === state.password || 'Passwords do not match.',
]);

const confirmPasswordUpdate = async () => {
  try {
    const response = await userStore.changeUserPassword(user?user.id:0, state.password );
    state.snackbarVisible=true;
    state.snackbarColor='green';
    state.snackbarMessage='Successful password update.';
    cancelPasswordUpdate();
  } catch (error) {
    console.error(error);
    state.snackbarVisible=true;
    state.snackbarColor='red';
    state.snackbarMessage='Unsuccessful password update.';
  }
}


const fetchRole = async () => {
  try {
    const response = await userStore.getRoleName(roleId.value);
    role.value = response.title;
  } catch (error) {
    console.error(error);
  }
}

const getYesNoValue = (value: number): string => {
  return value === 1 ? 'yes' : 'no';
};

const formattedBirthdate = computed(() => {
  const dateOfBirth = user?.date_of_birth || "";
  const date = new Date(dateOfBirth);
  const options = { year: 'numeric', month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions;
  return date.toLocaleDateString('en-US', options);
});

onMounted(() => {
  fetchRole();
});
</script>

<style scoped>
@import '../assets/animations.css';
@import '../assets/general.css';

.content-container {
  animation: fade-in 0.5s;
}

.myField {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

.buttonSmall{
  background-color: #d4bba4;
  color: #1a1a1a;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 20px;
  letter-spacing: 10px;
  width: 300px;
}

.dark-card {
  background-color: #333333;
}

.dark-text {
  color: #ffffff;
}
</style>
