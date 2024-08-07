import { Todo } from "@/types";
import EditTodo from "./EditTodo";
import { Button } from "./ui/button";
import { useState } from "react";

interface CreateTodoProps {
  createTodo: (todo: Todo) => Promise<void>;
}

export default function CreateTodo({ createTodo }: CreateTodoProps) {
  const [open, setOpen] = useState(false);
  return (
    <EditTodo
      todo={{ name: "", description: "", priority: 0, dueDate: new Date() }}
      updateTodo={createTodo}
      title="Create Todo"
      trigger={
        <Button variant={"outline"} size={"lg"} className="text-xl">
          Create
        </Button>
      }
      open={open}
      setOpen={setOpen}
    />
  );
}
