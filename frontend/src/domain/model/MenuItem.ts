import React from "react";

// type MenuItemType = "link" | "button" | "dropdown";
export type SubMenuItem = {
  id: string;
  name: string;
  icon: React.ReactNode;
  path?: string;
};

export type MenuItem = {
  id: string;
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems: SubMenuItem[];
};