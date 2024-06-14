import Register from "@/app/dashboard/auth/register";
import DashboardLayout from "@/app/dashboard/dashboard-layout";
import Home from "@/app/dashboard/home";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
