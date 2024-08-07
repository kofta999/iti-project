import { authService } from "@/services/authService";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";

export default function Navbar() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    authService.logout();
    toast({ title: "Logged out successfully" });
    navigate("/");
  };
  return (
    <div className="flex justify-center items-center p-4">
      <h1 className="mr-auto font-bold text-3xl">Todoz</h1>
      <Button onClick={handleLogout} variant={"ghost"} className="text-xl">
        Logout
      </Button>
    </div>
  );
}
