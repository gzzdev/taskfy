import React from "react";

// type MenuItemType = "link" | "button" | "dropdown";
export type SubMenuItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
};

export type MenuItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems: SubMenuItem[];
};