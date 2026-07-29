import axios from "axios";
import { CreateUserInput } from "../types/users";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function register(user: CreateUserInput) {
  console.log("new user data: ", user);

  const response = await axios.post(`${API_URL}/api/auth/register`, user, {
    withCredentials: true,
  });

  return response.data;
}
