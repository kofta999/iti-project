import { authService } from "@/services/authService";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }: PropsWithChildren) {
  return authService.auth() ? <Navigate to={"/todos"} replace /> : children;
}
