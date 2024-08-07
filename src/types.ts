import * as y from "yup";
import { registerSchema, todoSchema } from "./schemas";

export type User = y.InferType<typeof registerSchema> & {
  id?: string;
};

export type Todo = y.InferType<typeof todoSchema> & {
  id?: string;
  userId?: string;
};

export type PaginationType = {
  firstPage: number;
  todoCount: number;
  lastPage: number;
  nextPage: number;
  prevPage: number;
  totalPages: number;
  page: number;
};
