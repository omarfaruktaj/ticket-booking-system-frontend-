import axios, { AxiosError } from "axios";

export interface IEvent {
  _id: string;
  title: string;
  description: string;
  date: Date;
  venue: string;
  capacity: number;
  banner: string;
  price: number;
  ticketsAvailable: number;
}

export const getEvents = async (): Promise<IEvent[]> => {
  try {
    const { data } = await axios.get(
      "https://ticket-booking-system-backend.vercel.app/api/events",
      {}
    );

    return data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message || "An error occurred");
      } else {
        throw new Error(error.message || "An error occurred");
      }
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
export const getAEvent = async (id: string): Promise<IEvent> => {
  try {
    const { data } = await axios.get(
      `https://ticket-booking-system-backend.vercel.app/api/events/${id}`
    );

    return data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message || "An error occurred");
      } else {
        throw new Error(error.message || "An error occurred");
      }
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
