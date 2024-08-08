import { Badge } from "./ui/badge";

export default function PriorityBadge({ variant }: { variant: 0 | 1 | 2 }) {
  const priorites = {
    0: "low",
    1: "medium",
    2: "high",
  } as const;

  const v = priorites[variant];

  return <Badge variant={v}>{v}</Badge>;
}
