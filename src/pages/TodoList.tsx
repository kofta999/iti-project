import { useToast } from "@/components/ui/use-toast";
import { todosService } from "@/services/todosService";
import Todo from "@/components/Todo.tsx";
import type { Todo as TodoType } from "@/types";
import { useEffect, useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { toast } = useToast();

  const handleMark = async (id: string) => {
    try {
      await todosService.markTodo(id);

      setTodos((prev) =>
        prev.map((todo) => {
          if (todo.id === id) {
            toast({
              title: todo.status
                ? "Todo marked as complete"
                : "Todo marked as incomplete",
            });
            return { ...todo, status: !todo.status };
          }
          return todo;
        }),
      );
    } catch (error) {
      console.error(error);
      toast({
        title: (error as Error).message,
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await todosService.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      toast({ title: "Todo deleted successfully" });
    } catch (error) {
      console.error(error);
      toast({
        title: (error as Error).message,
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const todos = await todosService.getTodos(page);
        setTodos(todos);
      } catch (error) {
        console.log(error);
        toast({
          title: (error as Error).message,
          description: "Please try again",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [page, toast]);

  return (
    <div>
      {loading && "Loading"}
      {!loading &&
        todos.map((todo) => (
          <Todo
            handleDelete={handleDelete}
            handleMark={handleMark}
            key={todo.id}
            todo={todo}
          />
        ))}
    </div>
  );
}
