import EditTodo from "./EditTodo";
import { Button } from "./ui/button";

interface CreateTodoProps {
  createTodo: any;
}

export default function CreateTodo({ createTodo }: CreateTodoProps) {
  return (
    <EditTodo
      todo={{ name: "", description: "", priority: "Low", dueDate: new Date() }}
      updateTodo={createTodo}
      title="Create Todo"
      trigger={<Button variant={"outline"}>Create</Button>}
    />
  );
}
