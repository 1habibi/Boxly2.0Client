import React from "react";
import { Button } from "antd";
import s from "./LoginGroup.module.scss";

export const LoginGroup = () => {
  return (
    <div className={s.loginGroup}>
      <Button size="large" type={"primary"}>
        Войти
      </Button>
      <Button size={"large"}>Регистрация</Button>
    </div>
  );
};
