import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import useAuth from "@/hooks/use-auth";

import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const auth = useAuth();

  if (auth?.isLoading) return "loadding";
  console.log(auth?.user);
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full m-6">
        <Outlet />
      </main>
    </div>
  );
}
