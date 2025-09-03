import { useCallback, useState, useEffect } from "react";
import { useLocation } from "react-router";

import { MenuItem, SubMenuItem } from "../../shared/types/menu";
import MenuItemNode from "../components/sidebar/MenuItemNode";

import { GridIcon, SettingsIcon, TaskIcon } from "../icons";

import { Workspace } from "../../domain/entities/workspace";
import { useWorkspaces } from "../hooks/useWorkspaces";

type MenuItemType = "main" | "workspace" | "other";

const mainItems: MenuItem[] = [
  {
    id: -1,
    name: "Inicio",
    icon: <GridIcon />,
    path: "/",
  },
  {
    id: -2,
    name: "Mis Tareas",
    path: "/task",
    icon: <TaskIcon />,
  },
];

const workspaceItems: MenuItem[] = [
  {
    id: 31,
    name: "Escuela",
    // path: "/workspace",
    icon: "",
    subItems: [
      {
        id: 32,
        name: "Programación",
      },
      {
        id: 33,
        name: "Matematicas",
      },
    ],
  },
];

const othersItems: MenuItem[] = [
  {
    id: 12,
    name: "Configuraciones",
    // path: "/setting",
    icon: <SettingsIcon />,
  },
];

const AppSidebar = () => {
  const isExpanded = true; // Replace with actual state management
  const isMobileOpen = false; // Replace with actual state management
  const isHovered = false; // Replace with actual state management

  
  const { workspaces, loading, error } = useWorkspaces();
  const location = useLocation();
  
  
  const [currentMenu, setCurrenteMenu] = useState<{
    type: MenuItemType;
    id: number;
  } | null>(null);

  const isSelectedItem = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  
  // Build Menu options
  const renderMenuItems = (items: MenuItem[], itemType: MenuItemType) => {
    console.log(`${itemType} current option: ${currentMenu}`);
    return (
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <MenuItemNode
          key={`${itemType}-${item.id}`}
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
            isCurrentLocation={() => {}}
            />
          ))}
      </ul>
    );
  };
  
  if (loading) return (<div>Cargando</div>)
  if (error) return <div>{error}</div>;

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
              {renderMenuItems(workspaces, "workspace")}
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
