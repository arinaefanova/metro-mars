import { axiosInstance, setBearerAuthToken } from "@/code/api";
import { User } from "@/model/User";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useUserStore } from "./user";


export const TOKEN_COOKIE_NAME = "auth_token";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User>();
  const userStore = useUserStore();

  function setAuthHeader(token: string) {
    setBearerAuthToken(token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  function reloadUser() {
    const token = Cookies.get(TOKEN_COOKIE_NAME);
    if (token) {
      try {
        const decodedUser = jwt_decode(token) as User;
        user.value = decodedUser;

        setBearerAuthToken(token);
        userStore.setCurrentUser(decodedUser);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }

  async function login(email: string, password: string) {
    try {
      const response = await axiosInstance.post("/user/login", {
        email,
        password,
      });

      const { token } = response.data;

      setAuthHeader(token);
      Cookies.set(TOKEN_COOKIE_NAME, token);

      user.value = jwt_decode(token);

      return { error: null };
    } catch (error: any) {
      return {
        error: error.response?.data?.message ?? "Unknown error",
      };
    }
  }

  async function register(email: string, firstname: string, lastname: string, password: string, birthdate: Date) {
    try {
      const response = await axiosInstance.post("/user/register", {
        email,
        firstname,
        lastname,
        password,
        birthdate,
      });

      return { error: null };
    } catch (error: any) {
      return {
        error: error.response?.data?.message ?? "Unknown error",
      };
    }
  }

  function hasUserRole(roleId: number): boolean {
    return user.value?.role_id === roleId;
  }

  function logout() {
    Cookies.remove(TOKEN_COOKIE_NAME);
    user.value = undefined;
    setBearerAuthToken(undefined);
  }

  return { setAuthHeader, login, register, logout, reloadUser, hasUserRole, user};
});
