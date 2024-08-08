import { authService } from "@/services/authService";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: PropsWithChildren) {
  return authService.auth() ? children : <Navigate to={"/login"} replace />;
}
