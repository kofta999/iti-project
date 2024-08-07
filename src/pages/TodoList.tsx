import { useToast } from "@/components/ui/use-toast";
import { todosService } from "@/services/todosService";
import Todo from "@/components/Todo.tsx";
import { PaginationType, type Todo as TodoType } from "@/types";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import PaginationBar from "@/components/PaginationBar";
import { useSearchParams } from "react-router-dom";
import TodoActions from "@/components/TodoActions";
import EditTodo from "@/components/EditTodo";

export default function TodoList() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<boolean | null>(null);
  const [sort, setSort] = useState<string | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<TodoType | null>(null);
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
      const todo = await todosService.markTodo(id);
      toast({
        title: todo.status
          ? "Todo marked as incomplete"
          : "Todo marked as complete",
      });

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

      await fetchData();
      // setTodos((prev) => prev.map((td) => (td.id === todo.id ? todo : td)));

      setCurrentTodo(null);

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
      await todosService.createTodo(todo);
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

  const openEditDialog = (todo: TodoType) => {
    setCurrentTodo(todo);
    setOpenEdit(true);
  };

  return (
    <div className="flex flex-col gap-10">
      {currentTodo && (
        <EditTodo
          updateTodo={handleUpdate}
          todo={currentTodo}
          open={openEdit}
          setOpen={setOpenEdit}
        />
      )}
      <TodoActions
        handleCreate={handleCreate}
        filterTodos={filterTodos}
        sortTodos={sortTodos}
      />

      {loading && <Loader2 className="animate-spin self-center size-16" />}

      {!loading && pagination && todos.length > 0 && (
        <>
          <div className="flex flex-col gap-5 justify-center items-center">
            {todos.map((todo) => (
              <Todo
                handleDelete={handleDelete}
                handleMark={handleMark}
                setCurrent={openEditDialog}
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
