import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { JSONFilePreset } from "lowdb/node";
import { cors } from "hono/cors";
import { v4 } from "uuid";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type Todo = {
  id: string;
  userId: string;
  name: string;
  description: string;
  dueDate: Date;
  priority: 0 | 1 | 2;
  status: boolean;
};

export type PaginationType = {
  firstPage: number;
  todoCount: number;
  lastPage: number;
  nextPage: number | null;
  prevPage: number | null;
  totalPages: number;
  page: number;
};

// Read or create db.json
const db = await JSONFilePreset<{ users: User[]; todos: Todo[] }>("db.json", {
  users: [],
  todos: [],
});

const app = new Hono();

app.use("*", cors());

// Auth
app.post("/users/register", async (c) => {
  const user = await c.req.json();

  const newUser = { ...user, id: v4() };

  await db.update(({ users }) => users.push(newUser));

  return c.json(newUser, 201);
});

app.post("/users/login", async (c) => {
  const user = await c.req.json();

  db.read();

  const data = db.data;

  const foundUser = data.users.find(
    (u) => u.email === user.email && u.password === user.password,
  );

  if (!foundUser) {
    return c.notFound();
  }

  return c.json(foundUser);
});

// Todos

app.get("/users/:id/todos", async (c) => {
  await new Promise((r) => setTimeout(r, 500));
  const userId = c.req.param("id");
  const { page = 1, perPage = 3, status, sort } = c.req.query();
  await db.read();
  let todos = db.data.todos.filter((todo) => todo.userId === userId);

  if (status === "true") {
    todos = todos.filter((todo) => todo.status === true);
  } else if (status === "false") {
    todos = todos.filter((todo) => todo.status === false);
  }

  if (sort === "dueDate") {
    todos = todos.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1));
  } else if (sort === "-priority") {
    todos = todos.sort((a, b) => b.priority - a.priority);
  } else if (sort === "-dueDate") {
    todos = todos.sort((a, b) => (a.dueDate < b.dueDate ? 1 : -1));
  } else if (sort === "priority") {
    todos = todos.sort((a, b) => a.priority - b.priority);
  }

  const pageNumber = Number(page);
  const pageSize = Number(perPage);
  const startIndex = (pageNumber - 1) * pageSize;

  const pagination = calculatePagination(todos, pageNumber, pageSize);

  todos = todos.slice(startIndex, startIndex + pageSize);

  return c.json({ data: todos, pagination });
});

app.post("/users/:id/todos", async (c) => {
  await new Promise((r) => setTimeout(r, 500));
  const todo = await c.req.json();
  const userId = c.req.param("id");

  const newTodo = { ...todo, id: v4(), userId };

  await db.update(({ todos }) => todos.push(newTodo));

  return c.json(newTodo, 201);
});

app.get("/users/:userId/todos/:todoId", async (c) => {
  const todoId = c.req.param("todoId");

  await db.read();
  const todo = db.data.todos.find((todo) => todo.id === todoId);

  return c.json(todo);
});

app.put("/users/:userId/todos/:todoId", async (c) => {
  await new Promise((r) => setTimeout(r, 500));
  const newTodo = await c.req.json();
  const { userId, todoId } = c.req.param();

  const todos = db.data.todos.map((todo) =>
    todo.id === todoId && todo.userId === userId
      ? { ...todo, ...newTodo }
      : todo,
  );

  db.data.todos = todos;
  await db.write();

  return c.json(newTodo);
});

app.delete("/users/:userId/todos/:todoId", async (c) => {
  await new Promise((r) => setTimeout(r, 500));
  const { todoId } = c.req.param();

  const todos = db.data.todos.filter((todo) => todo.id !== todoId);

  db.data.todos = todos;
  await db.write();

  return c.json({}, 200);
});

function calculatePagination(
  items: Todo[],
  currentPage: number,
  itemsPerPage: number = 10,
): PaginationType {
  const todoCount = items.length;
  const totalPages = Math.ceil(todoCount / itemsPerPage);
  const firstPage = 1;
  const lastPage = totalPages;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  const prevPage = currentPage > 1 ? currentPage - 1 : null;

  return {
    firstPage,
    todoCount,
    lastPage,
    nextPage,
    prevPage,
    totalPages,
    page: currentPage,
  };
}

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
