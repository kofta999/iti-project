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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";

interface TodoProps {
  todo: Todo;
  handleMark: (id: string) => void;
  handleDelete: (id: string) => void;
}

export default function Todo({ todo, handleMark, handleDelete }: TodoProps) {
  // const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{todo.name}</CardTitle>
        <CardDescription>{todo.priority as string}</CardDescription>
      </CardHeader>

      <CardContent>
        <p>{todo.description}</p>

        <h4>{todo.dueDate.toLocaleString()}</h4>
      </CardContent>

      <CardFooter>
        <Button onClick={() => handleMark(todo.id!)}>
          {todo.status ? "Mark Complete" : "Mark incomplete"}
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"}>Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                todo
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(todo.id!)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
