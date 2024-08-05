import { User } from "@/types";
import axios from "axios";

const API_URL = "http://localhost:3000/users";

export const authService = {
  registerUser: async (user: User) => {
    const res = await axios.post<User>(API_URL, user);

    if (res.status !== 201) {
      throw new Error("Failed to register, try again");
    }

    return res.data;
  },

  loginUser: async (user: Omit<User, "name">) => {
    const res = await axios.get<User[]>(API_URL);

    if (res.status !== 200) {
      throw new Error("Failed to login, try again");
    }

    // For some reason using query params doesn't get the right user, it only fetches with the first param

    const currentUser = res.data.find(
      (u) => u.email === user.email && u.password === user.password,
    );

    if (!currentUser) {
      throw new Error("User not found, register instead");
    }

    // 100% wouldn't work for production environment and there's no time to create a backend
    localStorage.setItem("auth", currentUser.id!);
  },

  auth: () => {
    return localStorage.getItem("auth");
  },
};
