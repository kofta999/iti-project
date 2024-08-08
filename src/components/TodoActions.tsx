import { Todo } from "@/types";
import CreateTodo from "./CreateTodo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface TodoActionsProps {
  handleCreate: (todo: Todo) => Promise<void>;
  filterTodos: (v: boolean | null) => void;
  sortTodos: (v: string | null) => void;
  loading: boolean;
}

export default function TodoActions({
  handleCreate,
  filterTodos,
  sortTodos,
  loading,
}: TodoActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-10">
      <h1 className="text-3xl font-extrabold sm:mr-auto text-center sm:text-left">
        Your Todos
      </h1>

      <div className="flex flex-col gap-3">
        <CreateTodo loading={loading} createTodo={handleCreate} />
        <div className="flex gap-3">
          <Select
            onValueChange={(v) =>
              filterTodos(v === "none" ? null : v === "completed")
            }
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Status</SelectItem>
              <SelectSeparator />
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(v) => sortTodos(v === "none" ? null : v)}>
            <SelectTrigger className="">
              <SelectValue placeholder="Sort by.." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Sort by..</SelectItem>
              <SelectSeparator />
              <SelectItem value="dueDate">Due Date (Ascending)</SelectItem>
              <SelectItem value="-dueDate">Due Date (Descending)</SelectItem>
              <SelectItem value="priority">Priority (Ascending)</SelectItem>
              <SelectItem value="-priority">Priority (Descending)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
