import { User } from "@/types";
import axios from "axios";

const API_URL = "http://localhost:3000/users";
const TODO_API_URL = "http://localhost:3000/todos";

export const authService = {
  registerUser: async (user: User) => {
    const res = await axios.post<User>(API_URL + "/register", { ...user });

    if (res.status !== 201) {
      throw new Error("Failed to register, try again");
    }

    await axios.post<User>(TODO_API_URL, { [res.data.id!]: [] });
    return res.data;
  },

  loginUser: async (user: Omit<User, "name">) => {
    const res = await axios.post<User>(API_URL + "/login", user);

    if (res.status !== 200) {
      throw new Error("Failed to login, try again");
    }

    // 100% wouldn't work for production environment and there's no time to create a backend
    localStorage.setItem("auth", res.data.id!);
  },

  auth: () => {
    return localStorage.getItem("auth");
  },

  logout: () => {
    localStorage.removeItem("auth");
  },
};
