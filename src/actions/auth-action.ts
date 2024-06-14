import { FormData } from "@/app/dashboard/auth/register";
import axios from "axios";

export const registerUser = async (formData: FormData) => {
  const { data } = await axios.post(
    "http://localhost:5000/api/auth/register",
    formData
  );

  return data;
};
