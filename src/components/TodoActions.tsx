import { Todo } from "@/types";
import CreateTodo from "./CreateTodo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface TodoActionsProps {
  handleCreate: (todo: Todo) => Promise<void>;
  filterTodos: (v: boolean | null) => void;
  sortTodos: (v: string | null) => void;
}

export default function TodoActions({
  handleCreate,
  filterTodos,
  sortTodos,
}: TodoActionsProps) {
  return (
    <div className="flex justify-center items-center gap-10">
      <h1 className="text-3xl font-extrabold mr-auto">Your Todos:</h1>

      <div className="flex flex-col gap-3">
        <CreateTodo createTodo={handleCreate} />
        <div className="flex gap-3">
          <Select
            onValueChange={(v) =>
              filterTodos(v === "none" ? null : v === "completed")
            }
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(v) => sortTodos(v === "none" ? null : v)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by.." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
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
