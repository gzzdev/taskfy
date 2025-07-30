import { Link, useLocation } from "react-router";

import { MenuItem } from "../../../domain/model/MenuItem";

export default function MenuItemNode({ name, icon, path, subItems }: MenuItem) {
  /** TODO: Shared side bar state */
  const isExpanded = true, isHovered = true, isMobileOpen = true;

  return (
    <li key={name}>
      {subItems ? (
        <button
          className={`menu-item group menu-item-active lg:justify-center`}
        >
          <span className="menu-item-icon-size menu-item-icon-active">
            {icon}
          </span>

          {(isExpanded || isHovered || isMobileOpen) && (
            <span className="menu-item-text">{name}</span>
          )}
        </button>
      ) : (
        path && (
          <Link to={path} className={`menu-item group ${"menu-item-active"}`}>
            <span className={`menu-item-icon-size ${"menu-item-icon-active"}`}>
              {icon}
            </span>
            {(isExpanded || isHovered || isMobileOpen) && (
              <span className="menu-item-text">{name}</span>
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