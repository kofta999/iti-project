import axios from "axios";
import { authService } from "./authService";
import { Todo } from "@/types";

const API_URL = "http://localhost:3000/users";

export const todosService = {
  getTodos: async (
    page: number = 1,
    status: boolean | null,
    sort: string | null,
  ) => {
    const userId = authService.auth();
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const res = await axios.get(`${API_URL}/${userId}/todos`, {
      params: {
        status: status,
        _page: page,
        _limit: 3,
        _sort: sort && "-" + sort,
      },
    });

    console.log(res);

    if (res.status !== 200) {
      throw new Error("Error happened while fetching tasks");
    }

    const { data, first, items, last, next, pages, prev } = res.data;
    const pagination = {
      firstPage: first,
      todoCount: items,
      lastPage: last,
      nextPage: next,
      prevPage: prev,
      totalPages: pages,
    };

    return { data, pagination };
  },

  fetchTodo: async (todoId: string) => {
    const userId = authService.auth();
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const res = await axios.get<Todo>(`${API_URL}/${userId}/${todoId}`);

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

    const res = await axios.post<Todo>(`${API_URL}/${userId}`, {
      ...todo,
      status: false,
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

    const res = await axios.put(`${API_URL}/${userId}/${todoId}`, {
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

    const res = await axios.put(`${API_URL}/${userId}/${todo.id}`, newTodo);

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

    const newRes = await axios.delete(`${API_URL}/${userId}/${todoId}`);

    if (newRes.status !== 200) {
      throw new Error("Error happened while deleting task");
    }
  },
};
