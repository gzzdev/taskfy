import { Link, useLocation } from "react-router";

import { MenuItem } from "../../../domain/model/MenuItem";


interface SelectedItem {  
  type: "main" | "others";
  id: string;
}

interface MenuItemNodeProps {
  item: MenuItem;
  itemType: "main" | "others";
  currentSelected: ;
  onSelectItem: (id: string, itemType: "main" | "others") => void;
}


export default function MenuItemNode({item, itemType, isSelected, onSelectItem}: MenuItemNodeProps) {
  /** TODO: Shared side bar state */
  const isExpanded = true,
    isHovered = true,
    isMobileOpen = true;
  const currentMenu = { type: "main", index: 0};

  return (
    <li>
      {item.subItems ? (
        <button
          onClick={() => onSelectItem(item.id, itemType)}
          className={`menu-item group ${currentMenu?.type === itemType}`}
        >
          <span className="menu-item-icon-size menu-item-icon-active">
            {item.icon}
          </span>

          {(isExpanded || isHovered || isMobileOpen) && (
            <span className="menu-item-text">{item.name}</span>
          )}
        </button>
      ) : (
        item.path && (
          <Link to={item.path} className={`menu-item group ${"menu-item-active"}`}>
            <span className={`menu-item-icon-size ${"menu-item-icon-active"}`}>
              {item.icon}
            </span>
            {(isExpanded || isHovered || isMobileOpen) && (
              <span className="menu-item-text">{item.name}</span>
            )}
          </Link>
        )
      )}
    </li>
  );
}


// path && (
//       <Link
//         to={path}
//         className={`menu-item group ${"menu-item-active"}`}>
//         <span
//           className={`menu-item-icon-size ${"menu-item-icon-active"}`}>
//           {icon}
//         </span>
//         {(isExpanded || isHovered || isMobileOpen) && (
//           <span className="menu-item-text">{name}</span>
//         )}
//       </Link>
//     )