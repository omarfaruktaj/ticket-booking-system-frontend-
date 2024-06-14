import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom

// Function to generate class name for NavLink
const getNavLinkClassName = ({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) => {
  if (isActive) {
    return "p-3 gap-x-2 text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700";
  } else if (isPending) {
    return "p-3 flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20";
  } else {
    return " p-3 flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600 hover:bg-slate-300/20";
  }
};

export default function SidebarRoutes() {
  // Filter out hidden routes
  const routes = [
    {
      label: "Home",
      href: "/",
      isHidden: false,
    },
    {
      label: "Booking",
      href: "/booking",
      isHidden: false,
    },
  ];
  const visibleRoutes = routes.filter((route) => !route.isHidden);

  return (
    <div className="flex flex-col w-full gap-y-1 ">
      {visibleRoutes.map(({ label, href }) => (
        <NavLink key={label} to={href} className={getNavLinkClassName}>
          {label}
        </NavLink>
      ))}
    </div>
  );
}
