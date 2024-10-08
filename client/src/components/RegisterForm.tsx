import { useFormik } from "formik";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { registerSchema } from "@/schemas";
import { User } from "@/types";
import { authService } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (values: User) => {
    try {
      setLoading(true);
      await authService.registerUser(values);
      toast({
        title: "Created user successfully!",
        description: "Redirecting to login page",
      });
      navigate("/login");
    } catch (error) {
      console.error(error);

      toast({
        title: "Error happened while registering",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const { handleBlur, handleSubmit, touched, errors, values, handleChange } =
    useFormik({
      validationSchema: registerSchema,
      initialValues: {
        email: "",
        name: "",
        password: "",
      },
      onSubmit: handleOnSubmit,
    });

  return (
    <div>
      <form className="flex flex-col gap-5 w-96" onSubmit={handleSubmit}>
        <div>
          <Label>Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            onBlur={handleBlur}
            value={values.name}
            onChange={handleChange}
          />
          {touched.name && errors.name && (
            <p className="text-destructive">{errors.name}</p>
          )}
        </div>

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

        <Button disabled={loading} type="submit">
          {loading ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </div>
  );
}
