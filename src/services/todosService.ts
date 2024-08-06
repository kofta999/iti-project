import axios from "axios";
import { authService } from "./authService";
import { User } from "@/types";

const API_URL = "http://localhost:3000/users";

// TODO: update fetching logic and make tasks a separete entity in db
export const todosService = {
  getTodos: async (page: number = 1) => {
    const userId = authService.auth();
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const res = await axios.get<User>(
      `${API_URL}/${userId}?.todos?_page=${page}`,
    );

    if (res.status !== 200) {
      throw new Error("Error happened while fetching tasks");
    }

    console.log(res.data);

    return res.data.todos!;
  },

  markTodo: async (todoId: string) => {
    const userId = authService.auth();
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const res = await axios.get<User>(`${API_URL}/${userId}`);

    if (res.status !== 200) {
      throw new Error("Error happened while fetching tasks");
    }

    const user = res.data;

    const newUser = {
      ...user,
      todos: user.todos?.map((todo) =>
        todo.id === todoId ? { ...todo, status: !todo.status } : todo,
      ),
    };

    const newRes = await axios.put(`${API_URL}/${userId}`, newUser);

    if (newRes.status !== 200) {
      throw new Error("Error happened while marking task");
    }
  },

  deleteTodo: async (todoId: string) => {
    const userId = authService.auth();
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const res = await axios.get<User>(`${API_URL}/${userId}`);

    if (res.status !== 200) {
      throw new Error("Error happened while fetching tasks");
    }

    const user = res.data;

    const newUser = {
      ...user,
      todos: user.todos?.filter((todo) => todo.id !== todoId),
    };

    const newRes = await axios.put(`${API_URL}/${userId}`, newUser);

    if (newRes.status !== 200) {
      throw new Error("Error happened while deleting task");
    }
  },
};
