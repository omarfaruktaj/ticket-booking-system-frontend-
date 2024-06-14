import { LoginFormData } from "@/app/dashboard/auth/login";
import { RegisterFormData } from "@/app/dashboard/auth/register";
import axios, { AxiosError } from "axios";

export type LoginResponseData = {
  token: string;
  user: {
    id: string;
    email: string;
  };
};

export const registerUser = async (formData: RegisterFormData) => {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/auth/register",
      formData
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

export const loginUser = async (
  formData: LoginFormData
): Promise<LoginResponseData> => {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/auth/login",
      formData
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

export interface UserInterface {
  _id: string;
  name: string;
  email: string;
}

export const getMe = async (): Promise<UserInterface> => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get("http://localhost:5000/api/auth/me", {
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
