import { authService } from "@/services/authService";
import RoutingError from "./RoutingError";
import { PropsWithChildren } from "react";

export default function PublicRoute({ children }: PropsWithChildren) {
  return authService.auth() ? (
    <RoutingError code={401} message="Unauthorized" />
  ) : (
    children
  );
}
