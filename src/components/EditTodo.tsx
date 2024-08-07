import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Todo } from "@/types";
import { CalendarIcon, Edit } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ReactNode, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useFormik } from "formik";
import { todoSchema } from "@/schemas";
import { InferType } from "yup";

interface EditTodoProps {
  todo: Todo;
  updateTodo: (newTodo: Todo) => Promise<void>;
  title?: string;
  trigger?: ReactNode;
}

export default function EditTodo({
  todo,
  updateTodo,
  title = "Edit Todo",
  trigger,
}: EditTodoProps) {
  const editTodoSchema = todoSchema.omit(["status", "dueDate"]);
  const [date, setDate] = useState<Date>(new Date(todo.dueDate));
  const [open, setOpen] = useState(false);

  const handleUpdate = async (values: InferType<typeof editTodoSchema>) => {
    try {
      await updateTodo({
        ...values,
        dueDate: date,
        id: todo.id,
        userId: todo.userId,
      });
      resetForm();
      setOpen(false);
      console.log(values);
      console.log("updated todo");
    } catch (error) {
      console.error(error);
    }
  };

  const { handleSubmit, values, handleChange, setValues, resetForm } =
    useFormik({
      validationSchema: editTodoSchema,
      initialValues: {
        name: todo.name,
        description: todo.description,
        priority: todo.priority,
      },
      onSubmit: handleUpdate,
    });
  console.log(values);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? trigger : <Edit className="cursor-pointer" />}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Make changes to your todo here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              name="description"
              value={values.description}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Priority</Label>
            <Select
              name="priority"
              value={(values.priority as number).toString()}
              onValueChange={(v) =>
                setValues((prev) => ({ ...prev, priority: Number(v) }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Priority</SelectLabel>
                  <SelectItem value="0">Low</SelectItem>
                  <SelectItem value="1">Medium</SelectItem>
                  <SelectItem value="2">High</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Due date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
