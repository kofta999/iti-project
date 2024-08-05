import { authService } from "@/services/userService";
import RoutingError from "./RoutingError";
import { PropsWithChildren } from "react";

export default function PrivateRoute({ children }: PropsWithChildren) {
  return authService.auth() ? children : <RoutingError />;
}
