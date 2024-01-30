import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { PATH } from "@/router/index.jsx";

const menuItems = [
  {
    label: <Link to={PATH.HOME}>Home</Link>,
    key: "home",
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
