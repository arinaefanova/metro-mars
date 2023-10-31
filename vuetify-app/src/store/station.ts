import {defineStore} from "pinia";
import {axiosInstance} from "@/code/api";


export const useStationStore = defineStore("station", () => {

  async function getAllCrashes() {
    try {
      const response = await axiosInstance.get("/station/crashes");
      return response.data;
    } catch (error: any) {
      throw new Error(`Error retrieving data ${error}`);
    }
  }

  async function getAllWorkingStations() {
    try {
      const response = await axiosInstance.get("/station/all");
      return response.data;
    } catch (error: any) {
      throw new Error(`Error retrieving crashes: ${error}`);
    }
  }

  async function getAllStations() {
    try {
      const response = await axiosInstance.get("/station/all-st");
      return response.data;
    } catch (error: any) {
      throw new Error(`Error retrieving crashes: ${error}`);
    }
  }

  async function deleteCrash(stationId: number) {
    const state = 1;
    try {
      const response = await axiosInstance.put("/station/crashes", {
        stationId, state
      });
    } catch (error: any) {
      throw new Error(`Error deleting crash: ${error}`);
    }
  }

  async function addCrash(stationId: number) {
    const state = 0;
    try {
      const response = await axiosInstance.put("/station/crashes", {
        stationId, state
      });
    } catch (error: any) {
      throw new Error(`Error adding crash: ${error}`);
    }
  }

  async function buildRoute(startStationId: number, endStationId: number) {
    try {
      const response = await axiosInstance.get("/station/route", {
        params: {
          startStationId,
          endStationId,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Error building route: ${error}`);
    }
  }

  async function getIsWork(stationId: number) {
    try {
      const response = await axiosInstance.get("/station/isWork", {
        params: {
          stationId
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Error building route: ${error}`);
    }
  }



  return {getAllCrashes, getAllWorkingStations, deleteCrash, addCrash, getAllStations, buildRoute, getIsWork};
});
