import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import SidebarRoutes from "./sidebar-routes";

export default function Navbar() {
  return (
    <div className="p-4 border-b h-full flex items-center justify-between md:justify-end bg-white shadow-sm">
      <div className=" md:hidden">
        <Sheet>
          <SheetTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </SheetTrigger>
          <SheetContent side={"left"} className="w-[250px] p-3 ">
            <SheetHeader>
              <SheetTitle className="text-left mb-8">Logo</SheetTitle>
            </SheetHeader>
            <SidebarRoutes />
          </SheetContent>
        </Sheet>
      </div>
      <div className="">
        <Button>Login</Button>
      </div>
    </div>
  );
}
