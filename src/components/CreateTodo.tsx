import { Todo } from "@/types";
import EditTodo from "./EditTodo";
import { Button } from "./ui/button";

interface CreateTodoProps {
  createTodo: (todo: Todo) => Promise<void>;
}

export default function CreateTodo({ createTodo }: CreateTodoProps) {
  return (
    <EditTodo
      todo={{ name: "", description: "", priority: "Low", dueDate: new Date() }}
      updateTodo={createTodo}
      title="Create Todo"
      trigger={
        <Button variant={"outline"} size={"lg"} className="text-xl">
          Create
        </Button>
      }
    />
  );
}
