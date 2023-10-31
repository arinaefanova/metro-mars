import {defineStore} from "pinia";
import { axiosInstance } from "@/code/api";
import { useAuthStore } from "./auth";
import Cookies from "js-cookie";
import { TOKEN_COOKIE_NAME } from "@/store/auth";


export const useStatisticsStore = defineStore("statistics", () => {
  const authStore = useAuthStore();

  async function getAllUsers() {
    try {
      const token = Cookies.get(TOKEN_COOKIE_NAME);
      if (token === undefined) {
        throw new Error("Token is undefined");
      }
      authStore.setAuthHeader(token);
      const response = await axiosInstance.get("/statistics/all-users");
      return response.data;
    } catch (error: any) {
      throw new Error(`Error retrieving data ${error}`);
    }
  }

  async function getAllTickets() {
    try {
      const token = Cookies.get(TOKEN_COOKIE_NAME);
      if (token === undefined) {
        throw new Error("Token is undefined");
      }
      authStore.setAuthHeader(token);
      const response = await axiosInstance.get("/statistics/all-tickets");
      return response.data;
    } catch (error: any) {
      throw new Error(`Error retrieving data: ${error}`);
    }
  }

  async function getTodayTickets() {
    try {
      const token = Cookies.get(TOKEN_COOKIE_NAME);
      if (token === undefined) {
        throw new Error("Token is undefined");
      }
      authStore.setAuthHeader(token);
      const response = await axiosInstance.get("/statistics/today-tickets");
      return response.data;
    } catch (error: any) {
      throw new Error(`Error retrieving data: ${error}`);
    }
  }

  async function getAllStations() {
    try {
      const token = Cookies.get(TOKEN_COOKIE_NAME);
      if (token === undefined) {
        throw new Error("Token is undefined");
      }
      authStore.setAuthHeader(token);
      const response = await axiosInstance.get("/statistics/all-stations");
      return response.data;
    } catch (error: any) {
      throw new Error(`Error retrieving data: ${error}`);
    }
  }

  async function getAllCrashes() {
    try {
      const token = Cookies.get(TOKEN_COOKIE_NAME);
      if (token === undefined) {
        throw new Error("Token is undefined");
      }
      authStore.setAuthHeader(token);
      const response = await axiosInstance.get("/statistics/all-crashes");
      return response.data;
    } catch (error: any) {
      throw new Error(`Error retrieving data: ${error}`);
    }
  }

  return { getAllUsers, getAllTickets, getTodayTickets, getAllStations, getAllCrashes };
});
