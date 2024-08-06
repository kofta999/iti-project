import type { Todo } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import EditTodo from "./EditTodo";
import { format } from "date-fns";
import PriorityBadge from "./PriorityBadge";
import DeleteTodo from "./DeleteTodo";

interface TodoProps {
  todo: Todo;
  handleMark: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleUpdate: (newTodo: Todo) => Promise<void>;
}

export default function Todo({
  todo,
  handleMark,
  handleDelete,
  handleUpdate,
}: TodoProps) {
  return (
    <Card className="w-1/3">
      <CardHeader>
        <CardTitle className="flex gap-2 items-center mb-2">
          <div className="mr-auto">{todo.name}</div>

          <DeleteTodo todo={todo} handleDelete={handleDelete} />
          <EditTodo todo={todo} updateTodo={handleUpdate} />
        </CardTitle>
        <CardDescription>
          <PriorityBadge variant={todo.priority as string} />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground">{todo.description}</p>

        <h4 className="text-right font-bold">
          Due {format(todo.dueDate, "MMM dd, yyyy")}
        </h4>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button onClick={() => handleMark(todo.id!)}>
          {todo.status ? "Mark Complete" : "Mark incomplete"}
        </Button>
      </CardFooter>
    </Card>
  );
}
