import { Link } from "react-router";
import { MenuItem } from "../../../shared/types/menu";
import { ChevronDownIcon } from "../../icons";

interface MenuItemNodeProps {
  item: MenuItem;
  isSelected: boolean;
  onSelectItem: () => void;
  isCurrentLocation: () => void;
}

// const SubMenuItemNode = ({ SubMenuItem }: MenuItemNodeProps) => {};

export default function MenuItemNode({
  item,
  isSelected,
  onSelectItem,
  isCurrentLocation,
}: MenuItemNodeProps) {
  /** TODO: Shared side bar state */
  const isExpanded = true,
    isHovered = true,
    isMobileOpen = true;
  console.log(`${item.name} is ${item.id}`);
  return (
    <li>
      {item.subItems ? (
        <button
          onClick={onSelectItem}
          className={`menu-item group ${
            isSelected ? "menu-item-active" : "menu-item-inactive"
          } cursor-pointer ${
            !isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"
          }`}
        >
          {(isExpanded || isHovered || isMobileOpen) && (
            <ChevronDownIcon
              className={`m1-auto w-5 h-5 transition-transform duration-200 ${
                isSelected ? "rotate-180 text-brand-500" : ""
              }`}
            />
          )}
          <span
            className={`menu-item-icon-size ${
              isSelected ? "menu-item-icon-active" : "menu-item-icon-inactive"
            }`}
          >
            {item.icon}
          </span>

          {(isExpanded || isHovered || isMobileOpen) && (
            <span className="menu-item-text">{item.name}</span>
          )}
        </button>
      ) : (
        item.path && (
          <Link
            to={item.path}
            className={`menu-item group ${
              isSelected ? "menu-item-active" : "menu-item-inactive"
            }`}
          >
            <span
              className={`menu-item-icon-size ${
                isSelected ? "menu-item-active" : "menu-item-inactive"
              }`}
            >
              {item.icon}
            </span>

            {(isExpanded || isHovered || isMobileOpen) && (
              <span className="menu-item-text">{item.name}</span>
            )}
          </Link>
        )
      )}
      {item.subItems && (
        <div
          className="overflow-hidden transition-all duration-300"
          style={{
            height: isSelected ? "20px" : "0px",
          }}
        >
          <ul className="mt-2 space-y-1 ml-9">
            {item.subItems.map((subItem) => (
              <li key={`${item.id}-${subItem.id}`}>
                {/* <Link
                    to={subItem.path}
                    className={`menu-dropdown-item ${
                      
                    }`}>

                  </Link> */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
