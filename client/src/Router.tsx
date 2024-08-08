import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import RoutingError from "./components/RoutingError";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import TodoList from "./pages/TodoList";
import Layout from "./pages/Layout";

export default function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" Component={Layout}>
        <Route path="/" Component={Landing} />

        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Private Routes */}
        <Route
          path="/todos"
          element={
            <PrivateRoute>
              <TodoList />
            </PrivateRoute>
          }
        />

        <Route path="*" Component={RoutingError} />
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
}
