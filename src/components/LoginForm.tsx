import { useFormik } from "formik";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { loginSchema } from "@/schemas";
import { User } from "@/types";
import { authService } from "@/services/userService";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";

export default function LoginForm() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleOnSubmit = async (values: Omit<User, "name">) => {
    console.log(values);
    try {
      await authService.loginUser(values);
      toast({
        title: "Logged in successfully",
        description: "Welcome to your todos!",
      });
      navigate("/todos");
    } catch (error) {
      console.log(error);

      toast({
        title: "Error happened while logging in",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const { handleBlur, handleSubmit, touched, errors, values, handleChange } =
    useFormik({
      validationSchema: loginSchema,
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: handleOnSubmit,
    });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <Label>Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            onBlur={handleBlur}
            value={values.email}
            onChange={handleChange}
          />
          {touched.email && errors.email && (
            <p className="text-destructive">{errors.email}</p>
          )}
        </div>

        <div>
          <Label>Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            onBlur={handleBlur}
            value={values.password}
            onChange={handleChange}
          />
          {touched.password && errors.password && (
            <p className="text-destructive">{errors.password}</p>
          )}
        </div>

        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
