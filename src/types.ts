import * as y from "yup"
import { registerSchema } from "./schemas"

export type User = y.InferType<typeof registerSchema> & { id?: string }
