import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className="p-10">
        <Outlet />
      </div>
    </div>
  );
}
