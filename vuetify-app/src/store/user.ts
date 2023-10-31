import {defineStore} from "pinia";
import { axiosInstance } from "@/code/api";
import { User } from "@/model/User";
import { ref } from "vue";;

export const useUserStore = defineStore("user", () => {

  const currentUser = ref<User | null>(null);

  function setCurrentUser(user: User | null) {
    currentUser.value = user;
  }

  async function getAllUsers() {
    try {
      const response = await axiosInstance.get("/user/roots");
      return response.data;
    } catch (error: any) {
      throw new Error(`Error retrieving data ${error}`);
    }
  }

  async function getRoleName(roleId: number) {
    try {
      const response = await axiosInstance.get("/user/role", { params: { roleId: roleId } });
      return response.data;
    } catch (error: any) {
      throw new Error(`Error retrieving data ${error}`);
    }
  }

  async function getRoles() {
    try {
      const response = await axiosInstance.get("/user/roots?roleId=0");
      return response.data;
    } catch (error: any) {
      throw new Error(`Error retrieving data ${error}`);
    }
  }

  async function changeUserRole(userId:number, newRole: number) {
    try {
      const response = await axiosInstance.put(`/user/change-role/${userId}`, { role: newRole });
    } catch (error) {
      console.error('Error changing user role:', error);
    }
  }

  async function changeUserPassword(userId:number, newPassword: string) {
    try {
      const response = await axiosInstance.put(`/user/update/password`, { userId: userId, newPassword: newPassword });
    } catch (error) {
      console.error('Error changing user password:', error);
    }
  }


  return { setCurrentUser, getAllUsers, getRoles, changeUserRole, getRoleName, changeUserPassword};
});
