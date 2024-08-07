import { authService } from "@/services/authService";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";

export default function Navbar() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const auth = authService.auth();

  const handleLogout = () => {
    authService.logout();
    toast({ title: "Logged out successfully" });
    navigate("/");
  };
  return (
    <div className="flex justify-center items-center p-4">
      <Button
        onClick={() => navigate("/")}
        variant={"ghost"}
        className="mr-auto font-bold text-3xl"
      >
        Todoz
      </Button>
      {auth ? (
        <>
          <Button
            onClick={() => navigate("/todos")}
            variant={"ghost"}
            className="text-xl"
          >
            My Todos
          </Button>
          <Button onClick={handleLogout} variant={"ghost"} className="text-xl">
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button onClick={() => navigate("/login")} variant={"ghost"}>
            Login
          </Button>
          <Button onClick={() => navigate("/register")}>Sign up</Button>
        </>
      )}
    </div>
  );
}
