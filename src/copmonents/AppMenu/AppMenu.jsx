import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { PATH } from "@/router/index.jsx";
import s from "./AppMenu.module.scss";

const menuItems = [
  {
    label: (
      <Link className={s.link} to={PATH.HOME}>
        Home
      </Link>
    ),
    key: "home",
  },
  {
    label: (
      <Link className={s.link} to={PATH.WELCOME}>
        Welcome
      </Link>
    ),
    key: "welcome",
  },
  {
    label: (
      <Link className={s.link} to={PATH.USER_ME}>
        Me
      </Link>
    ),
    key: "me",
  },
  {
    label: (
      <Link className={s.link} to={PATH.MY_ORDERS}>
        Мои заказы
      </Link>
    ),
    key: "my_orders",
  },
];
export const AppMenu = ({ mode = "horizontal" }) => {
  const [current, setCurrent] = useState("home");
  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      mode={mode}
      defaultSelectedKeys={[current]}
      items={menuItems}
      style={{
        width: "100%",
        border: 0,
        fontSize: "18px",
        marginLeft: "30px",
        marginRight: "auto",
      }}
    />
  );
};
