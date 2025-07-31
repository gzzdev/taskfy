import { use, useState } from "react";
import { MenuItem, SubMenuItem } from "../../domain/model/MenuItem";
import MenuItemNode from "../components/sidebar/MenuItemNode";

const mainItems: MenuItem[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: <span>🏠</span>,
    subItems: [{id: 'home', name: "Home", icon: "🏠", path: "/" }],
  },
  {
    id: "tasks",
    name: "Tasks",
    icon: <span>📝</span>,
    subItems: [],
  },
];

const othersItems: MenuItem[] = [
  {
    id: "dashboard0",
    name: "DashboardO",
    icon: <span>🏠</span>,
    subItems: [],
  },
  {
    id: "task0",
    name: "TasksOther",
    icon: <span>📝</span>,
    subItems: [],
  },
];





const AppSidebar = () => {
  
  const isExpanded = true; // Replace with actual state management
  const isMobileOpen = false; // Replace with actual state management
  const isHovered = false; // Replace with actual state management
  
  const [currentMenu, setCurrenteMenu] = useState<{ type: "main" | "others"; id: number } | null>(null);
  
  const renderMenuItems = (items: MenuItem[], type: "main" | "others", ) => {
    // key={`${type}-${item.name}`}
    return (
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <MenuItemNode
            key={`${type}-${item.name}`}
            item={item}
            itemType={type}
            onSelectItem={(id, itemType) => {
              setCurrenteMenu({ type: itemType, index: items.findIndex(i => i.id === id) });
            }}
          />
        ))}
      </ul>
    );
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white light:bg-gray-900 light:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
              ${
                isExpanded || isMobileOpen
                  ? "w-[290px]"
                  : isHovered
                  ? "w-[290px]"
                  : "w-[90px]"
              } 
              ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
              lg:translate-x-0`}
    >
      {/* TODO: Icon app
          <div className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
          </div> */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-2">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                ({isExpanded || isHovered || isMobileOpen ? "Others" : "..."})
              </h2>
              {renderMenuItems(mainItems, "main")}
            </div>
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                ({isExpanded || isHovered || isMobileOpen ? "Others" : "..."})
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;