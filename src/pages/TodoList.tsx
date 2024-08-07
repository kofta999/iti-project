import { useToast } from "@/components/ui/use-toast";
import { todosService } from "@/services/todosService";
import Todo from "@/components/Todo.tsx";
import { PaginationType, type Todo as TodoType } from "@/types";
import { useEffect, useState } from "react";
import PaginationBar from "@/components/PaginationBar";
import { useSearchParams } from "react-router-dom";
import TodoActions from "@/components/TodoActions";

export default function TodoList() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<boolean | null>(null);
  const [sort, setSort] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const [pagination, setPagination] = useState<PaginationType>();
  const { toast } = useToast();

  // I use this function every time updating states in server because
  // updating the local state won't respect server-side filtering
  // a little slower yeah, but it being in sync is more important imo
  const fetchData = async () => {
    setLoading(true);
    const p = page ? Number(page) : 1;
    try {
      const res = await todosService.getTodos(p, filter, sort);
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

  const handleMark = async (id: string) => {
    try {
      await todosService.markTodo(id);

      await fetchData();

      // setTodos((prev) =>
      //   prev.map((todo) => {
      //     if (todo.id === id) {
      //       toast({
      //         title: todo.status
      //           ? "Todo marked as incomplete"
      //           : "Todo marked as complete",
      //       });
      //       return { ...todo, status: !todo.status };
      //     }
      //     return todo;
      //   }),
      //)
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
      console.log(todo);

      await fetchData();
      // setTodos((prev) => prev.map((td) => (td.id === todo.id ? todo : td)));

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
      await fetchData();

      // setTodos((prev) => [newTodo, ...prev]);
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
      await fetchData();

      // setTodos((prev) => prev.filter((todo) => todo.id !== id));
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
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter, sort, toast]);

  const filterTodos = (v: boolean | null) => {
    setFilter(v);
  };

  const sortTodos = (v: string | null) => {
    setSort(v);
  };

  return (
    <div className="flex flex-col gap-10">
      <TodoActions
        handleCreate={handleCreate}
        filterTodos={filterTodos}
        sortTodos={sortTodos}
      />

      {/* TODO: Add a spinner */}
      {loading && "Loading"}

      {!loading && pagination && todos.length > 0 && (
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
