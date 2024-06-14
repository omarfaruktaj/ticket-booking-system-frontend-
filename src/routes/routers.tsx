import Login from "@/app/dashboard/auth/login";
import Register from "@/app/dashboard/auth/register";
import Booking from "@/app/dashboard/booking";
import DashboardLayout from "@/app/dashboard/dashboard-layout";
import Home from "@/app/dashboard/home";
import SingleEventPage from "@/app/dashboard/singleEvent";
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
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/events/:id",
        element: <SingleEventPage />,
      },
      {
        path: "/bookings",
        element: <Booking />,
      },
    ],
  },
]);

export default router;
