import { useCallback, useState } from "react";
import { useLocation } from "react-router";

import { MenuItem, SubMenuItem } from "../../domain/model/MenuItem";
import MenuItemNode from "../components/sidebar/MenuItemNode";

import { GridIcon, SettingsIcon, TaskIcon,  } from "../icons";

type MenuItemType = "main" | "workspace" | "other";

const mainItems: MenuItem[] = [
  {
    id: "dashboard",
    name: "Inicio",
    icon: <GridIcon />,
    path: "/",
  },
  {
    id: "tasks",
    name: "Mis Tareas",
    path: "/task",
    icon: <TaskIcon />,
  },
];

const workspaceItems: MenuItem[] = [
  {
    id: "school",
    name: "Escuela",
    // path: "/workspace",
    icon: "",
    subItems: [
      {
        id: "123123123",
        name: "Programación",
      },
      {
        id: "23423423",
        name: "Matematicas",
      },
    ],
  },
];

const othersItems: MenuItem[] = [
  {
    id: "settings",
    name: "Configuraciones",
    // path: "/setting",
    icon: <SettingsIcon />,
  },
];


const AppSidebar = () => {
  
  const isExpanded = true; // Replace with actual state management
  const isMobileOpen = false; // Replace with actual state management
  const isHovered = false; // Replace with actual state management
  
  const location = useLocation()
  const [currentMenu, setCurrenteMenu] = useState<{ type: MenuItemType, id: string } | null>(null);

  const isSelectedItem = useCallback((path: string) => location.pathname===path, [location.pathname]);

  // Build Menu options
  const renderMenuItems = (items: MenuItem[], itemType: MenuItemType) => {
    console.log(`${itemType} current option: ${currentMenu}`)
    return (

      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <MenuItemNode
            key={`${itemType}-${item.name}`}
            item={item}
            isSelected={
              currentMenu?.type === itemType && currentMenu?.id === item.id
            }
            onSelectItem={() => {
              setCurrenteMenu({
                type: itemType,
                id: item.id,
              });
            }}
            isCurrentLocation={()=>{}}
          />
        ))}
      </ul>
    );
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200
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
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? "MENÚ" : "..."}
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
                {isExpanded || isHovered || isMobileOpen ? "OTROS" : "..."}
              </h2>
              {renderMenuItems(workspaceItems, "workspace")}

            </div>

            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? "OTROS" : "..."}
              </h2>
              {renderMenuItems(othersItems, "other")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;