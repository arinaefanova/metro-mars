import {defineStore} from "pinia";
import {axiosInstance} from "@/code/api";


export const useScheduleStore = defineStore("schedule", () => {


  async function getNearTrains(stationId: number) {
    try {
      const response = await axiosInstance.get("/schedule/trains", { params: { stationId: stationId } });
      return response.data;
    } catch (error: any) {
      throw new Error(`Error retrieving nearest trains: ${error}`);

    }
  }

  async function getTrain(trainId: number) {
    try {
      const response = await axiosInstance.get("/schedule/train", { params: { trainId: trainId } });
      return response.data;
    } catch (error: any) {
      throw new Error(`Error retrieving train: ${error}`);
    }
  }

  async function getStationName(stationId: number) {
    try {
      const response = await axiosInstance.get("/schedule/station-name", { params: { stationId: stationId } });
      console.log("station name", response.data);
      return response.data;
    } catch (error: any) {
      throw new Error(`Error retrieving station name: ${error}`);
    }
  }


  return { getNearTrains, getTrain, getStationName };
});
