import React from "react";
import { Menu } from "antd";
import s from "./AppMenu.module.scss";

const menuItems = [
  {
    label: "Menu1",
    key: "menu1",
  },
  {
    label: "Menu2",
    key: "menu2",
  },
  {
    label: "Menu3",
    key: "menu3",
  },
];
export const AppMenu = () => {
  return (
    <Menu
      mode={"horizontal"}
      defaultSelectedKeys={["1"]}
      items={menuItems}
      style={{
        minWidth: 0,
        border: 0,
        fontSize: "18px",
        marginRight: "30px",
        marginLeft: "auto",
      }}
    />
  );
};
