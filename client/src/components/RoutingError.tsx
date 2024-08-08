interface RoutingErrorProps {
  code?: number;
  message?: string;
}

export default function RoutingError({
  code = 404,
  message = "Not found",
}: RoutingErrorProps) {
  return (
    <div>
      <h1>{code}</h1>
      <h2>{message}</h2>
    </div>
  );
}
