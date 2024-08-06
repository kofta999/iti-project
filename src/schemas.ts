import * as y from "yup";

// TODO: Add error messages
export const registerSchema = y.object().shape({
  name: y.string().min(5).required(),
  email: y.string().email().required(),
  password: y.string().min(6).required(),
});

export const loginSchema = registerSchema.omit(["name"]);

const todoPriority = y.mixed().oneOf(["Low", "Medium", "High"]);

export const todoSchema = y.object().shape({
  name: y.string().required(),
  description: y.string().required(),
  priority: todoPriority.required(),
  dueDate: y.date().required(),
  status: y.boolean()
});
