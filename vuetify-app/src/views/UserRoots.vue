<template>
  <div class="content-container">
    <v-sheet class="blur-sheet" min-height="70vh" rounded="lg" elevation="3">
      <div class="d-flex align-center justify-center">
        <h1>User roots</h1>
      </div>
      <div class="table-container">
        <v-table class="custom-table" :headers="tableHeaders" :items="users">
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-center" v-for="header in tableHeaders" :key="header.value">
                {{ header.text }}
              </th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center" v-for="user in users" :key="user.id">
              <td v-for="(header, index) in tableHeaders" :key="header.value">
                <template v-if="header.value === 'role_id'">
                  <v-select
                    v-model="user.role_id"
                    :items="roleOptions"
                    item-text="title"
                    item-value="id"
                    @update:modelValue="openConfirmationDialog(user.id, user.role_id)"
                  ></v-select>
                </template>
                <template v-else>
                  {{ user[header.value] }}
                </template>
              </td>
            </tr>
            </tbody>
          </template>
        </v-table>
      </div>
    </v-sheet>
  </div>

  <v-dialog v-model="showConfirmationDialog" max-width="500">
    <v-card class="dark-card">
      <v-card-title class=" dark-text text-center headline">Confirm Role Change</v-card-title>
      <v-card-text class="dark-text text-center">
        Are you sure you want to change the role of this user?
      </v-card-text>
      <v-card-actions class="text-center justify-center">
        <v-btn color="primary"  @click="cancelRoleChange">Cancel</v-btn>
        <v-btn color="primary" @click="confirmRoleChange">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {onMounted, ref} from "@vue/runtime-core";
import {useUserStore} from "@/store/user";
import {User} from "@/model/User";
import router from "@/router";

const tableHeaders = [
  { text: "ID", value: "id" },
  { text: "Email", value: "email" },
  { text: "Role", value: "role_id" },
];

const userStore = useUserStore();
const users = ref<User[]>([]);
const roleOptions = ref([]);
const showConfirmationDialog = ref(false);
const selectedUserId = ref(0);
const selectedRoleId = ref(0);

function openConfirmationDialog(userId: number, roleId: number) {
  selectedUserId.value = userId;
  selectedRoleId.value = roleId;
  showConfirmationDialog.value = true;
}

function cancelRoleChange() {
  showConfirmationDialog.value = false;
}

onMounted(async () => {
  try {
    users.value = await userStore.getAllUsers();
    roleOptions.value = await userStore.getRoles();
  } catch (error) {
    await router.push('/error?param1=' + error);
  }
});

async function confirmRoleChange() {
  const userId = selectedUserId.value;
  const newRoleId = selectedRoleId.value;
  showConfirmationDialog.value = false;

  try {
    await userStore.changeUserRole(userId, newRoleId);
    const updatedUser = users.value.find((user) => user.id === userId);
    if (updatedUser) {
      updatedUser.role_id = newRoleId;
    }
    users.value = await userStore.getAllUsers();
  } catch (error) {
    console.error("Error changing user role:", error);
  }
}
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

.dark-card {
  background-color: #333333;
}

.dark-text {
  color: #ffffff;
}

</style>
