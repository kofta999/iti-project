import * as y from "yup";

// TODO: Add error messages
export const registerSchema = y.object().shape({
  name: y.string().min(5).required(),
  email: y.string().email().required(),
  password: y.string().min(6).required(),
});

export const loginSchema = registerSchema.omit(["name"]);
