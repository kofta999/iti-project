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
import { CalendarIcon, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useFormik } from "formik";
import { todoSchema } from "@/schemas";
import { InferType } from "yup";
import clsx from "clsx";

interface EditTodoProps {
  todo: Todo;
  updateTodo: (newTodo: Todo) => Promise<void>;
  title?: string;
  trigger?: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}

export default function EditTodo({
  todo,
  updateTodo,
  title = "Edit Todo",
  trigger,
  open,
  setOpen,
  loading,
}: EditTodoProps) {
  const editTodoSchema = todoSchema.omit(["status", "dueDate"]);
  const [date, setDate] = useState<Date>(new Date(todo.dueDate));
  console.log(todo);

  const handleUpdate = async (values: InferType<typeof editTodoSchema>) => {
    try {
      await updateTodo({
        ...values,
        dueDate: date,
        id: todo.id,
        userId: todo.userId,
      });
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const {
    handleSubmit,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    resetForm,
    setValues,
  } = useFormik({
    validationSchema: editTodoSchema,
    initialValues: { name: "", priority: 0, description: "" },
    onSubmit: handleUpdate,
  });

  useEffect(() => {
    setValues({
      name: todo.name,
      description: todo.description,
      priority: Number(todo.priority),
    });
    setDate(new Date(todo.dueDate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todo]);


  const reset = (v: boolean) => {
    resetForm();
    return setOpen(v);
  };

  return (
    <Dialog open={open} onOpenChange={reset}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
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
              onBlur={handleBlur}
              className={clsx([
                "col-span-3",
                {
                  "border-destructive": touched.name && errors.name,
                },
              ])}
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
              onBlur={handleBlur}
              className={clsx([
                "col-span-3",
                {
                  "border-destructive":
                    touched.description && errors.description,
                },
              ])}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Priority</Label>
            <Select
              name="priority"
              value={values.priority.toString()}
              onValueChange={(v) =>
                setValues((prev) => ({ ...prev, priority: Number(v) }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
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
                  onSelect={(e) => setDate(e!)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <DialogFooter>
            {loading ? (
              <Button disabled>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button type="submit">Save changes</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
