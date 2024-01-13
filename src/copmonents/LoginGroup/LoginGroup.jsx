import React from "react";
import { Button } from "antd";
import s from "./LoginGroup.module.scss";
import { Link } from "react-router-dom";
import { PATH } from "@/router/index.jsx";

export const LoginGroup = () => {
  return (
    <div className={s.loginGroup}>
      <Link to={PATH.LOGIN}>
        <Button size="large" type={"primary"}>
          Войти
        </Button>
      </Link>
      <Link to={PATH.LOGIN}>
        <Button size={"large"}>Регистрация</Button>
      </Link>
    </div>
  );
};
