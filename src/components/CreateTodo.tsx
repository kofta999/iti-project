import { Todo } from "@/types";
import { Button } from "./ui/button";

interface CreateTodoProps {
  setCurrent: (newTodo: Todo) => void;
}

export default function CreateTodo({ setCurrent }: CreateTodoProps) {
  const emptyTodo: Todo = {
    name: "",
    priority: 0,
    description: "",
    id: "",
    dueDate: new Date(),
  };
  return (
    <Button
      onClick={() => setCurrent(emptyTodo)}
      variant={"outline"}
      size={"lg"}
      className="text-xl"
    >
      Create
    </Button>
  );
}
