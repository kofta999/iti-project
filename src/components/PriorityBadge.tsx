import { Badge } from "./ui/badge";

export default function PriorityBadge({ variant }: { variant: string }) {
  const v =
    variant === "Low"
      ? "low"
      : variant === "Medium"
        ? "medium"
        : variant === "High"
          ? "high"
          : "default";

  return <Badge variant={v}>{variant}</Badge>;
}
