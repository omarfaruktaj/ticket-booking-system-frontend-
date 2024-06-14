import axios, { AxiosError } from "axios";

interface BookingData {
  event: string;
  ticketsBooked: number;
}

export interface BookingResponse {
  _id: string;
  user: string;
  event: string;
  ticketsBooked: number;
  status: "pending" | "confirmed" | "cancelled";
  paymentStatus: "paid" | "unpaid";
  createdAt: Date;
  updatedAt: Date;
}

export const createBooking = async (
  formData: BookingData
): Promise<BookingResponse> => {
  console.log(formData);
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(
      "http://localhost:5000/api/bookings",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
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

export const getBooking = async (): Promise<BookingResponse[]> => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get("http://localhost:5000/api/bookings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
