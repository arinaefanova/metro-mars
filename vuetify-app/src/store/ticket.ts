import {defineStore} from "pinia";
import { axiosInstance } from "@/code/api";

export const useTicketStore = defineStore("ticket", () => {

  async function sellTicket(
    price: number,
    childDiscount: number,
    pensionerDiscount: number
  ) {
    try {
      const response = await axiosInstance.post('/ticket/sell', {
        price,
        childDiscount,
        pensionerDiscount,
      });

      return { error: null };
    } catch (error: any) {
      return {
        error: error.response?.data?.message ?? 'Unknown error',
      };
    }
  }

  async function getSell() {
    try {
      const response = await axiosInstance.get('/ticket/sell', {
      });

      return { error: null };
    } catch (error: any) {
      throw new Error(`Error retrieving data: ${error}`);
    }
  }

  async function buyTicket(
    price: number,
    childDiscount: number,
    pensionerDiscount: number,
    userId: number
  ) {
    try {
      const response = await axiosInstance.post('/ticket/buy', {
        price,
        childDiscount,
        pensionerDiscount,
        userId
      });

      return { error: null };
    } catch (error: any) {
      return {
        error: error.response?.data?.message ?? 'Unknown error',
      };
    }
  }

  async function getTicketsForUser(userId: number) {
    try {
      const response = await axiosInstance.get("/ticket/all-my", { params: { userId: userId } });
      return response.data;
    } catch (error: any) {
      throw new Error(`Error retrieving data ${error}`);
    }
  }

    return { sellTicket, buyTicket, getSell, getTicketsForUser };
});
