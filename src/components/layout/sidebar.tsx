import SidebarRoutes from "./sidebar-routes";

export default function Sidebar() {
  return (
    <div className=" hidden  h-full border-r md:flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">Logo</div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
}
