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
import { format } from "date-fns";
import PriorityBadge from "./PriorityBadge";
import DeleteTodo from "./DeleteTodo";
import { Edit, SquareCheckBig } from "lucide-react";

interface TodoProps {
  todo: Todo;
  handleMark: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  setCurrent: (newTodo: Todo) => void;
}

export default function Todo({
  todo,
  handleMark,
  handleDelete,
  setCurrent,
}: TodoProps) {
  return (
    <Card className="w-full sm:w-1/3">
      <CardHeader>
        <CardTitle className="flex gap-2 items-center mb-2">
          <div className="mr-auto">{todo.name}</div>

          <DeleteTodo todo={todo} handleDelete={handleDelete} />
          <Edit className="cursor-pointer" onClick={() => setCurrent(todo)} />
        </CardTitle>
        <CardDescription>
          <PriorityBadge variant={todo.priority as 0 | 1 | 2} />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground">{todo.description}</p>

        <h4 className="text-right font-bold">
          Due {format(todo.dueDate, "MMM dd, yyyy")}
        </h4>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button
          variant={todo.status ? "default" : "ghost"}
          onClick={() => handleMark(todo.id!)}
        >
          <SquareCheckBig />
        </Button>
      </CardFooter>
    </Card>
  );
}
