import AppSidebar from "./AppSidebar";
import { Outlet } from "react-router";

const LayoutContent = () => {
    
    const isExpanded = true,
      isHovered = true,
      isMobileOpen = true;

    return (
      <div className="min-h-screen xl:flex">
        <div>
          <AppSidebar />
        </div>
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${
            isExpanded || isMobileOpen ? "lg:ml-[290px]" : "lg:ml-[90px]"
          } ${isMobileOpen ? "m1-0" : ""}`}
        >
          <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    );
}

const AppLayout = () => {
    return (<LayoutContent />);
}

export default AppLayout;
