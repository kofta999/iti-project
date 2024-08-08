import * as y from "yup";

// TODO: Add error messages
export const registerSchema = y.object().shape({
  name: y
    .string()
    .min(5, "Must be at least 5 characters")
    .required("Required field"),
  email: y.string().email("Must be an email").required("Required field"),
  password: y
    .string()
    .min(6, "Must be at least 6 characters")
    .required("Required field"),
});

export const loginSchema = registerSchema.omit(["name"]);

const todoPriority = y.mixed().oneOf([0, 1, 2]);

export const todoSchema = y.object().shape({
  name: y.string().required("Required field"),
  description: y.string().required("Required field"),
  priority: todoPriority.required("Required field"),
  dueDate: y.date().required("Required field"),
  status: y.boolean(),
});
