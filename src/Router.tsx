import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Landing from "./pages/Landing";

export default function Router() {
  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/login" Component={Login} />
      <Route path="/register" Component={Register} />
      <Route path="/" Component={Landing} />
    </>))
  return (
    <RouterProvider router={router} />
  )
}

