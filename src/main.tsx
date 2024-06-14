import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routers.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthPrivider from "./provider/auth-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { Toaster as HotToast } from "react-hot-toast";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthPrivider>
        <Toaster />
        <HotToast />
        <RouterProvider router={router} />
      </AuthPrivider>
    </QueryClientProvider>
  </React.StrictMode>
);
