import { useToast } from "@/components/ui/use-toast";
import { todosService } from "@/services/todosService";
import Todo from "@/components/Todo.tsx";
import { PaginationType, type Todo as TodoType } from "@/types";
import { useEffect, useState } from "react";
import CreateTodo from "@/components/CreateTodo";
import PaginationBar from "@/components/PaginationBar";
import { useSearchParams } from "react-router-dom";

export default function TodoList() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const [pagination, setPagination] = useState<PaginationType>();
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

  const handleUpdate = async (todo: TodoType) => {
    try {
      await todosService.updateTodo(todo);

      setTodos((prev) => prev.map((td) => (td.id === todo.id ? todo : td)));

      toast({ title: "Updated todo successfully" });
    } catch (error) {
      console.error(error);
      toast({
        title: (error as Error).message,
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleCreate = async (todo: TodoType) => {
    try {
      const newTodo = await todosService.createTodo(todo);

      setTodos((prev) => [newTodo, ...prev]);
      toast({ title: "Created todo successfully" });
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
      toast({ title: "Deleted todo successfully" });
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
      const p = page ? Number(page) : 1;
      try {
        const res = await todosService.getTodos(p);
        setPagination({ ...res.pagination, page: p });
        setTodos(res.data);
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
    <div className="flex flex-col gap-10">
      <div className="flex">
        <h1 className="text-3xl font-extrabold mr-auto">Your Todos</h1>
        <CreateTodo createTodo={handleCreate} />
      </div>
      {/* TODO: Add a spinner */}
      {loading && "Loading"}

      {!loading && (
        <>
          <div className="flex flex-col gap-5 justify-center items-center">
            {todos.map((todo) => (
              <Todo
                handleDelete={handleDelete}
                handleMark={handleMark}
                handleUpdate={handleUpdate}
                key={todo.id}
                todo={todo}
              />
            ))}
          </div>
          <PaginationBar pagination={pagination!} />
        </>
      )}
    </div>
  );
}
