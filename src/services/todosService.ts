import axios from "axios";
import { authService } from "./authService";
import { Todo } from "@/types";

const API_URL = "http://localhost:3000/todos";

export const todosService = {
  getTodos: async (page: number = 1) => {
    const userId = authService.auth();
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const res = await axios.get(`${API_URL}/?userId=${userId}&_page=${page}`);

    if (res.status !== 200) {
      throw new Error("Error happened while fetching tasks");
    }

    console.log(res.data);
    // const { data, first, items, last, next, pages, prev } = res.data;
    const { data } = res.data;

    return data;
  },

  fetchTodo: async (todoId: string) => {
    const res = await axios.get<Todo>(`${API_URL}/${todoId}`);

    if (res.status !== 200) {
      throw new Error("Error happened while fetching task");
    }

    return res.data;
  },

  createTodo: async (todo: Todo) => {
    const userId = authService.auth();
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const res = await axios.post<Todo>(API_URL, {
      ...todo,
      status: true,
      userId,
    });

    if (res.status !== 201) {
      throw new Error("Error happened while creating task");
    }

    return res.data;
  },

  markTodo: async (todoId: string) => {
    const userId = authService.auth();
    if (!userId) {
      throw new Error("Not authenticated");
    }
    const todo = await todosService.fetchTodo(todoId);

    if (todo.userId! !== userId) {
      throw new Error("Not authroized to mark task");
    }

    const res = await axios.put(`${API_URL}/${todoId}`, {
      ...todo,
      status: !todo.status,
    });

    if (res.status !== 200) {
      throw new Error("Error happened while marking task");
    }
  },

  updateTodo: async (newTodo: Todo) => {
    const userId = authService.auth();
    if (!userId) {
      throw new Error("Not authenticated");
    }
    console.log(newTodo);
    const todo = await todosService.fetchTodo(newTodo.id!);

    if (todo.userId! !== userId) {
      throw new Error("Not authroized to update task");
    }

    const res = await axios.put(`${API_URL}/${todo.id}`, newTodo);

    if (res.status !== 200) {
      throw new Error("Error happened while updating task");
    }

    return newTodo;
  },

  deleteTodo: async (todoId: string) => {
    const userId = authService.auth();
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const todo = await todosService.fetchTodo(todoId);

    if (todo.userId! !== userId) {
      throw new Error("Not authroized to mark task");
    }

    const newRes = await axios.delete(`${API_URL}/${todoId}`);

    if (newRes.status !== 200) {
      throw new Error("Error happened while deleting task");
    }
  },
};
