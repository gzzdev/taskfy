import { useCallback, useState, useEffect } from "react";
import { useLocation } from "react-router";

import { MenuItem, SubMenuItem } from "../../shared/types/menu";
import MenuItemNode from "../components/sidebar/MenuItemNode";

import { GridIcon, SettingsIcon, TaskIcon } from "../icons";

import { Workspace } from "../../domain/model/workspace";

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

  const location = useLocation();
  // ***** WORKSPACES

  const [workspaces, setWorkspaces] = useState<MenuItem[]>([]);

  const [currentMenu, setCurrenteMenu] = useState<{
    type: MenuItemType;
    id: number;
  } | null>(null);

  const isSelectedItem = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    //a95bc910c0ebbe40a15fba2d3d1b4548ef233952;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token a95bc910c0ebbe40a15fba2d3d1b4548ef233952",
      },
    };
    async function fetchWorkspaces() {
      try {
        const res = await fetch(
          "http://localhost:8000/api/workspaces/",
          options
        );

        const data: Workspace[] = await res.json();
        const menuItems = workspaceToMenuItems(data);
        console.log("menuItems");
        console.log(menuItems);
        setWorkspaces(menuItems);
      } catch (error) {
        console.error(error);
      } finally {
        console.log("finalyy");
      }
    }
    fetchWorkspaces();
  }, []);

  function workspaceToMenuItems(workspace: Workspace[]): MenuItem[] {
    return workspace.map((ws_data) => ({
      id: ws_data.id,
      name: ws_data.name,
      description: ws_data.description,
      icon: undefined,
      subItems: [],
    }));
  }

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
